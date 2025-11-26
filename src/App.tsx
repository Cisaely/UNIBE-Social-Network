/**
 * APLICACIÓN PRINCIPAL - UNIBE SOCIAL NETWORK
 *
 * Esta es la aplicación principal que coordina toda la red social.
 * Implementa:
 * - Grafo no dirigido para la red de amistades
 * - BFS para sugerencias y amigos en común
 * - Gestión de usuarios registrados
 * - Sistema de mensajería
 * - Navegación entre pantallas
 *
 * FLUJO DE LA APLICACIÓN:
 * 1. Usuario entra a login
 * 2. Si no tiene cuenta, va a registro
 * 3. Al registrarse, se agrega al grafo de usuarios
 * 4. Puede buscar otros usuarios registrados
 * 5. Puede enviar solicitudes de amistad
 * 6. Al aceptar, se crea una arista en el grafo
 * 7. Puede chatear con amigos
 * 8. El sistema sugiere amigos usando BFS
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SecureRoute } from "./components/SecureRoute";
import { ImprovedLoginScreen } from "./components/screens/ImprovedLoginScreen";
import { ImprovedCreateProfileScreen } from "./components/screens/ImprovedCreateProfileScreen";
import { HomeScreen } from "./components/screens/HomeScreen";
import { SearchScreen } from "./components/screens/SearchScreen";
import { RequestsScreen } from "./components/screens/RequestsScreen";
import { ProfileScreen } from "./components/screens/ProfileScreen";
import { MutualFriendsScreen } from "./components/screens/MutualFriendsScreen";
import { SuggestionsScreen } from "./components/screens/SuggestionsScreen";
import { MessagesScreen } from "./components/screens/MessagesScreen";
import { ChatScreen } from "./components/screens/ChatScreen";
import { SettingsScreen } from "./components/screens/SettingsScreen";
import { User, FriendRequest, Message, Screen } from "./types";
import { mockUsers } from "./utils/mockData";
import { FriendshipGraph } from "./utils/graphDataStructures";
import { ThemeProvider } from "./contexts/ThemeContext";

export default function App() {
  // ========== ESTADO DE LA APLICACIÓN ==========

  const [currentScreen, setCurrentScreen] =
    useState<Screen>("login");
  const [currentUser, setCurrentUser] = useState<User | null>(
    null,
  );
  const [selectedUser, setSelectedUser] = useState<User | null>(
    null,
  );
  const [users, setUsers] = useState<User[]>(mockUsers);

  // Lista de solicitudes de amistad pendientes (inicialmente vacía)
  const [friendRequests, setFriendRequests] = useState<
    FriendRequest[]
  >([]);

  // Lista de mensajes entre usuarios
  const [messages, setMessages] = useState<Message[]>([]);

  const [chatUserId, setChatUserId] = useState<string | null>(
    null,
  );

  // ========== GRAFO DE AMISTADES ==========
  // Estructura de datos principal que representa la red social
  const [friendshipGraph] = useState(
    () => new FriendshipGraph(),
  );

  /**
   * Inicializa el grafo con los usuarios existentes
   * Se ejecuta cuando cambia la lista de usuarios
   */
  useEffect(() => {
    // Agregar todos los usuarios al grafo
    users.forEach((user) => {
      friendshipGraph.addUser(user.id);

      // Agregar las amistades existentes
      user.friends.forEach((friendId) => {
        if (!friendshipGraph.areFriends(user.id, friendId)) {
          friendshipGraph.addFriendship(user.id, friendId);
        }
      });
    });
  }, [users, friendshipGraph]);

  /**
   * Cargar usuarios del localStorage al iniciar
   * Esto permite persistencia entre sesiones
   */
  useEffect(() => {
    const savedUsers = localStorage.getItem("unibe-users");
    if (savedUsers) {
      try {
        const parsedUsers = JSON.parse(savedUsers);
        setUsers(parsedUsers);
      } catch (e) {
        console.error("Error al cargar usuarios:", e);
      }
    }
  }, []);

  /**
   * Guardar usuarios en localStorage cuando cambien
   */
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem(
        "unibe-users",
        JSON.stringify(users),
      );
    }
  }, [users]);

  // ========== CÁLCULO DE NOTIFICACIONES ==========

  const requestCount = friendRequests.length;
  const messageCount = messages.filter(
    (m) => m.receiverId === currentUser?.id && !m.read,
  ).length;

  const existingEmails = users.map((u) =>
    u.email.toLowerCase(),
  );

  // ========== HANDLERS DE AUTENTICACIÓN ==========

  /**
   * Maneja el inicio de sesión
   * Busca el usuario en la lista y lo marca como online
   */
  const handleLogin = (email: string, password: string) => {
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
    if (user) {
      const updatedUser = { ...user, isOnline: true };
      setCurrentUser(updatedUser);
      setUsers(
        users.map((u) => (u.id === user.id ? updatedUser : u)),
      );
      setCurrentScreen("home");
    }
  };

  /**
   * Maneja la creación de un nuevo perfil
   * Agrega el usuario al sistema y al grafo de amistades
   */
  const handleCreateProfile = (
    profileData: Omit<User, "id" | "friends" | "isOnline">,
  ) => {
    const newUser: User = {
      id: Date.now().toString(),
      ...profileData,
      friends: [],
      isOnline: true,
    };

    // Agregar al grafo de amistades
    friendshipGraph.addUser(newUser.id);

    setCurrentUser(newUser);
    setUsers([...users, newUser]);
    setCurrentScreen("home");
  };

  // ========== HANDLERS DE AMISTADES ==========

  /**
   * Envía una solicitud de amistad
   * Crea una conexión bidireccional en el grafo
   */
  const handleSendRequest = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (
      user &&
      currentUser &&
      !currentUser.friends.includes(userId)
    ) {
      // Actualizar el grafo de amistades
      friendshipGraph.addFriendship(currentUser.id, userId);

      // Actualizar la lista de amigos del usuario actual
      const updatedUser = {
        ...currentUser,
        friends: [...currentUser.friends, userId],
      };

      // Actualizar la lista de amigos del otro usuario
      const updatedOtherUser = {
        ...user,
        friends: [...user.friends, currentUser.id],
      };

      setCurrentUser(updatedUser);
      setUsers(
        users.map((u) => {
          if (u.id === currentUser.id) return updatedUser;
          if (u.id === userId) return updatedOtherUser;
          return u;
        }),
      );
    }
  };

  /**
   * Acepta una solicitud de amistad
   * Actualiza el grafo y las listas de amigos
   */
  const handleAcceptRequest = (requestId: string) => {
    const request = friendRequests.find(
      (r) => r.id === requestId,
    );
    if (request && currentUser) {
      // Actualizar el grafo
      friendshipGraph.addFriendship(
        currentUser.id,
        request.from.id,
      );

      const updatedUser = {
        ...currentUser,
        friends: [...currentUser.friends, request.from.id],
      };

      const updatedFromUser = users.find(
        (u) => u.id === request.from.id,
      );
      if (updatedFromUser) {
        const newFromUser = {
          ...updatedFromUser,
          friends: [...updatedFromUser.friends, currentUser.id],
        };
        setUsers(
          users.map((u) => {
            if (u.id === currentUser.id) return updatedUser;
            if (u.id === request.from.id) return newFromUser;
            return u;
          }),
        );
      }

      setCurrentUser(updatedUser);
      setFriendRequests(
        friendRequests.filter((r) => r.id !== requestId),
      );
    }
  };

  /**
   * Rechaza una solicitud de amistad
   */
  const handleRejectRequest = (requestId: string) => {
    setFriendRequests(
      friendRequests.filter((r) => r.id !== requestId),
    );
  };

  // ========== HANDLERS DE NAVEGACIÓN ==========

  /**
   * Navega al perfil de un usuario
   */
  const handleViewProfile = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setSelectedUser(user);
      setCurrentScreen("userProfile");
    }
  };

  // ========== HANDLERS DE MENSAJERÍA ==========

  /**
   * Envía un mensaje a otro usuario
   */
  const handleSendMessage = (content: string) => {
    if (!currentUser || !chatUserId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      receiverId: chatUserId,
      content,
      timestamp: new Date(),
      read: false,
    };

    setMessages([...messages, newMessage]);
  };

  /**
   * Abre el chat con un usuario específico
   * Marca los mensajes como leídos
   */
  const handleSelectChat = (userId: string) => {
    setChatUserId(userId);
    setCurrentScreen("chat");

    setMessages(
      messages.map((m) =>
        m.senderId === userId &&
        m.receiverId === currentUser?.id
          ? { ...m, read: true }
          : m,
      ),
    );
  };

  /**
   * Cierra la sesión del usuario
   * Marca el usuario como offline
   */
  const handleLogout = () => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        isOnline: false,
        lastSeen: new Date(),
      };
      setUsers(
        users.map((u) =>
          u.id === currentUser.id ? updatedUser : u,
        ),
      );
    }
    setCurrentUser(null);
    setCurrentScreen("login");
  };

  /**
   * Navega a una pantalla específica
   */
  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  // ========== CONFIGURACIÓN DE ANIMACIONES ==========

  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  };

  const isAuthenticated = currentUser !== null;

  // ========== RENDERIZADO ==========

  // Pantallas públicas (no requieren autenticación)
  if (
    currentScreen === "login" ||
    currentScreen === "createProfile"
  ) {
    return (
      <ThemeProvider>
        <AnimatePresence mode="wait">
          {currentScreen === "login" && (
            <motion.div key="login" {...pageTransition}>
              <ImprovedLoginScreen
                onLogin={handleLogin}
                onGoToRegister={() =>
                  setCurrentScreen("createProfile")
                }
                existingEmails={existingEmails}
              />
            </motion.div>
          )}

          {currentScreen === "createProfile" && (
            <motion.div key="createProfile" {...pageTransition}>
              <ImprovedCreateProfileScreen
                onCreateProfile={handleCreateProfile}
                existingEmails={existingEmails}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </ThemeProvider>
    );
  }

  // Pantallas protegidas (requieren autenticación)
  return (
    <ThemeProvider>
      <SecureRoute
        isAuthenticated={isAuthenticated}
        onLogin={() => setCurrentScreen("login")}
      >
        <AnimatePresence mode="wait">
          {currentScreen === "home" && currentUser && (
            <motion.div key="home" {...pageTransition}>
              <HomeScreen
                user={currentUser}
                onNavigate={navigateToScreen}
                onViewSuggestions={() =>
                  setCurrentScreen("suggestions")
                }
                requestCount={requestCount}
                messageCount={messageCount}
              />
            </motion.div>
          )}

          {currentScreen === "search" && currentUser && (
            <motion.div key="search" {...pageTransition}>
              <SearchScreen
                currentUser={currentUser}
                users={users}
                onNavigate={navigateToScreen}
                onSendRequest={handleSendRequest}
                onViewProfile={handleViewProfile}
                requestCount={requestCount}
                messageCount={messageCount}
              />
            </motion.div>
          )}

          {currentScreen === "messages" && currentUser && (
            <motion.div key="messages" {...pageTransition}>
              <MessagesScreen
                currentUser={currentUser}
                users={users}
                messages={messages}
                onNavigate={navigateToScreen}
                onSelectChat={handleSelectChat}
                requestCount={requestCount}
                messageCount={messageCount}
              />
            </motion.div>
          )}

          {currentScreen === "chat" &&
            currentUser &&
            chatUserId && (
              <motion.div key="chat" {...pageTransition}>
                <ChatScreen
                  currentUser={currentUser}
                  otherUser={
                    users.find((u) => u.id === chatUserId)!
                  }
                  messages={messages}
                  onBack={() => setCurrentScreen("messages")}
                  onSendMessage={handleSendMessage}
                />
              </motion.div>
            )}

          {currentScreen === "requests" && currentUser && (
            <motion.div key="requests" {...pageTransition}>
              <RequestsScreen
                requests={friendRequests}
                onNavigate={navigateToScreen}
                onAccept={handleAcceptRequest}
                onReject={handleRejectRequest}
                requestCount={requestCount}
                messageCount={messageCount}
              />
            </motion.div>
          )}

          {currentScreen === "profile" && currentUser && (
            <motion.div key="profile" {...pageTransition}>
              <ProfileScreen
                user={currentUser}
                users={users}
                onNavigate={navigateToScreen}
                isOwnProfile={true}
                onViewProfile={handleViewProfile}
                requestCount={requestCount}
                messageCount={messageCount}
              />
            </motion.div>
          )}

          {currentScreen === "userProfile" &&
            selectedUser &&
            currentUser && (
              <motion.div key="userProfile" {...pageTransition}>
                <ProfileScreen
                  user={selectedUser}
                  users={users}
                  onNavigate={navigateToScreen}
                  isOwnProfile={false}
                  currentUserId={currentUser.id}
                  onSendRequest={handleSendRequest}
                  onViewProfile={handleViewProfile}
                  onViewMutualFriends={() =>
                    setCurrentScreen("mutualFriends")
                  }
                  requestCount={requestCount}
                  messageCount={messageCount}
                />
              </motion.div>
            )}

          {currentScreen === "mutualFriends" &&
            selectedUser &&
            currentUser && (
              <motion.div
                key="mutualFriends"
                {...pageTransition}
              >
                <MutualFriendsScreen
                  user1={currentUser}
                  user2={selectedUser}
                  users={users}
                  onBack={() => setCurrentScreen("userProfile")}
                />
              </motion.div>
            )}

          {currentScreen === "suggestions" && currentUser && (
            <motion.div key="suggestions" {...pageTransition}>
              <SuggestionsScreen
                currentUser={currentUser}
                users={users}
                onBack={() => setCurrentScreen("home")}
                onSendRequest={handleSendRequest}
              />
            </motion.div>
          )}

          {currentScreen === "settings" && currentUser && (
            <motion.div key="settings" {...pageTransition}>
              <SettingsScreen
                onNavigate={navigateToScreen}
                onLogout={handleLogout}
                requestCount={requestCount}
                messageCount={messageCount}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </SecureRoute>
    </ThemeProvider>
  );
}