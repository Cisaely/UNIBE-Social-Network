# UNIBE Social Network

## 📋 Descripción del Proyecto

UNIBE Social Network es una red social educativa diseñada exclusivamente para estudiantes de la Universidad Iberoamericana (UNIBE). La aplicación permite a los estudiantes conectarse, compartir experiencias, enviar mensajes y construir su red profesional de manera segura.

## 🎯 Características Principales

### 1. **Seguridad y Autenticación**
- ✅ Validación estricta de correos institucionales (@est.unibe.edu.do)
- ✅ Validación de matrícula (formato: AA-####, ejemplo: 24-1197)
- ✅ Contraseñas seguras (mínimo 8 caracteres, mayúsculas, minúsculas, caracteres especiales)
- ✅ Sistema de acceso restringido solo para estudiantes registrados
- ✅ Persistencia de datos en localStorage

### 2. **Red de Amistades (Grafo No Dirigido)**
- Implementación de un grafo no dirigido para representar la red social
- Las conexiones de amistad son bidireccionales
- Estructura de datos eficiente usando listas de adyacencia

### 3. **Búsqueda Inteligente**
- Búsqueda por nombre, carrera o matrícula
- Filtros avanzados por carrera y cuatrimestre
- Solo muestra usuarios realmente registrados

### 4. **Sugerencias de Amigos (BFS)**
- Algoritmo BFS para encontrar "amigos de amigos"
- Sugerencias inteligentes basadas en:
  - Misma carrera
  - Mismo cuatrimestre
  - Conexiones en común

### 5. **Sistema de Mensajería**
- Chat individual en tiempo real
- Indicador de mensajes leídos/no leídos
- Lista de conversaciones recientes
- Notificaciones de nuevos mensajes

### 6. **Perfiles de Usuario**
- Foto de perfil personalizable
- Información académica (carrera, cuatrimestre, matrícula)
- Bio personal
- Lista de amigos
- Estado en línea (punto verde/gris)

### 7. **Características Adicionales**
- Modo oscuro funcional
- Diseño responsivo (móvil, tablet, desktop)
- Animaciones suaves
- Notificaciones visuales
- Sistema de reportes

## 🏗️ Estructuras de Datos Implementadas

### 1. **Lista Enlazada Simple**
```typescript
class LinkedList<T>
```
- **Uso:** Gestión de listas de usuarios, mensajes, notificaciones
- **Métodos principales:**
  - `append(data)`: Agrega al final - O(n)
  - `prepend(data)`: Agrega al inicio - O(1)
  - `remove(data)`: Elimina un elemento - O(n)
  - `find(predicate)`: Busca un elemento - O(n)
  - `toArray()`: Convierte a array

### 2. **Cola (Queue - FIFO)**
```typescript
class Queue<T>
```
- **Uso:** Procesamiento de solicitudes, implementación de BFS
- **Métodos principales:**
  - `enqueue(item)`: Agrega al final - O(1)
  - `dequeue()`: Remueve del inicio - O(n)
  - `peek()`: Ver el primero sin remover
  - `isEmpty()`: Verifica si está vacía

### 3. **Pila (Stack - LIFO)**
```typescript
class Stack<T>
```
- **Uso:** Historial de navegación, operaciones de deshacer
- **Métodos principales:**
  - `push(item)`: Agrega al tope - O(1)
  - `pop()`: Remueve del tope - O(1)
  - `peek()`: Ver el tope sin remover
  - `isEmpty()`: Verifica si está vacía

### 4. **Grafo No Dirigido**
```typescript
class FriendshipGraph
```
- **Uso:** Representación de la red social de amistades
- **Implementación:** Lista de adyacencia (Map<string, Set<string>>)
- **Métodos principales:**
  - `addUser(userId)`: Agrega un usuario al grafo
  - `addFriendship(user1, user2)`: Crea conexión bidireccional
  - `removeFriendship(user1, user2)`: Elimina conexión
  - `getFriends(userId)`: Obtiene lista de amigos
  - `areFriends(user1, user2)`: Verifica si son amigos
  - `getMutualFriends(user1, user2)`: Amigos en común usando intersección de conjuntos
  - `getSuggestedFriends(userId, maxDistance)`: Sugerencias usando BFS
  - `getShortestPath(start, end)`: Camino más corto usando BFS
  - `getDegree(userId)`: Número de amigos
  - `getStats()`: Estadísticas de la red

### 5. **Algoritmo BFS (Búsqueda en Amplitud)**
Implementado en el grafo para:
- **Sugerencias de amigos:** Encuentra usuarios a distancia 2 (amigos de amigos)
- **Amigos en común:** Intersección de conjuntos de amigos
- **Camino más corto:** Encuentra la menor cantidad de conexiones entre dos usuarios

## 📁 Estructura del Proyecto

```
/
├── App.tsx                      # Componente principal con lógica del grafo
├── types/
│   └── index.ts                 # Definiciones de tipos TypeScript
├── utils/
│   ├── validation.ts            # Funciones de validación
│   ├── mockData.ts              # Datos iniciales (vacío por defecto)
│   └── graphDataStructures.ts  # Implementación de estructuras de datos
├── contexts/
│   └── ThemeContext.tsx         # Contexto para modo oscuro
├── components/
│   ├── Button.tsx               # Botón reutilizable
│   ├── Input.tsx                # Input reutilizable
│   ├── UserCard.tsx             # Tarjeta de usuario
│   ├── Logo.tsx                 # Logo de UNIBE
│   ├── NavBar.tsx               # Barra de navegación
│   ├── OnlineIndicator.tsx      # Indicador de estado en línea
│   ├── NotificationBadge.tsx    # Badge de notificaciones
│   ├── SearchFilters.tsx        # Filtros de búsqueda
│   ├── ConversationCard.tsx     # Tarjeta de conversación
│   ├── MessageBubble.tsx        # Burbuja de mensaje
│   ├── FriendRequestCard.tsx    # Tarjeta de solicitud
│   ├── SecureRoute.tsx          # Protección de rutas
│   └── screens/
│       ├── ImprovedLoginScreen.tsx
│       ├── ImprovedCreateProfileScreen.tsx
│       ├── HomeScreen.tsx
│       ├── SearchScreen.tsx
│       ├── MessagesScreen.tsx
│       ├── ChatScreen.tsx
│       ├── RequestsScreen.tsx
│       ├── ProfileScreen.tsx
│       ├── MutualFriendsScreen.tsx
│       ├── SuggestionsScreen.tsx
│       └── SettingsScreen.tsx
└── styles/
    └── globals.css              # Estilos globales con Tailwind
```

## 🔄 Flujo de la Aplicación

### 1. **Registro de Usuario**
```
Usuario → Pantalla de Registro → Validaciones → Crear Perfil → Agregar al Grafo → Home
```

**Validaciones aplicadas:**
- Correo: @est.unibe.edu.do
- Matrícula: AA-#### (ej: 24-1197)
- Contraseña: 8+ caracteres, mayúsculas, minúsculas, especiales
- Foto: Opcional, desde dispositivo
- Carrera y Cuatrimestre: Obligatorios

### 2. **Inicio de Sesión**
```
Usuario → Pantalla de Login → Validar Credenciales → Marcar como Online → Home
```

### 3. **Búsqueda de Estudiantes**
```
Usuario → Búsqueda → Filtros (Carrera/Cuatrimestre) → Ver Perfil → Enviar Solicitud
```

### 4. **Conexión de Amigos**
```
Usuario A envía solicitud → Se crea arista en el grafo → Usuario B acepta → Amigos conectados
```

**Actualización del grafo:**
```typescript
friendshipGraph.addFriendship(userA.id, userB.id);
// Esto crea una conexión bidireccional en el grafo
```

### 5. **Sugerencias Inteligentes (BFS)**
```
Usuario → Sugerencias → BFS del grafo → Usuarios a distancia 2 → Mostrar sugerencias
```

**Algoritmo:**
1. Iniciar desde el usuario actual
2. Explorar todos sus amigos (distancia 1)
3. Explorar amigos de amigos (distancia 2)
4. Filtrar usuarios no conectados
5. Priorizar por carrera y cuatrimestre

### 6. **Amigos en Común**
```
Ver Perfil → Amigos en Común → Intersección de conjuntos → Mostrar lista
```

### 7. **Mensajería**
```
Seleccionar Amigo → Abrir Chat → Enviar Mensaje → Almacenar en lista → Notificar
```

## 🎨 Lista de Carreras

1. TICS / Ingeniería en Tecnologías Computacionales
2. Medicina
3. Arquitectura
4. Gestión Empresarial
5. Psicología
6. Ingeniería Industrial
7. Derecho
8. Comunicación
9. Contabilidad
10. BBA
11. Estudios Liberales

## 📊 Cuatrimestres
Del 1 al 18 (seleccionable en dropdown con scroll)

## 💾 Persistencia de Datos

Los datos se almacenan en `localStorage` del navegador:
- **Clave:** `unibe-users`
- **Formato:** JSON array de usuarios
- **Sincronización:** Automática en cada cambio

## 🔐 Reglas de Seguridad

### Correo Institucional
```regex
/^[a-zA-Z0-9._-]+@est\.unibe\.edu\.do$/
```

### Matrícula
```regex
/^\d{2}-\d{4}$/
```
Ejemplo: 24-1197, 23-0456

### Contraseña
- Mínimo 8 caracteres
- Al menos una mayúscula (A-Z)
- Al menos una minúscula (a-z)
- Al menos un carácter especial (!@#$%^&*()_+-=[]{}|;:'",.<>?/)

## 🚀 Cómo Usar la Aplicación

### Para Nuevos Usuarios:
1. Abrir la aplicación
2. Clic en "Crear cuenta nueva"
3. Completar el formulario:
   - Subir foto de perfil (opcional)
   - Nombre completo
   - Matrícula (formato: AA-####)
   - Correo institucional (@est.unibe.edu.do)
   - Contraseña segura
   - Carrera
   - Cuatrimestre (1-18)
   - Bio (opcional)
4. Clic en "Crear perfil"
5. Serás redirigido al Home

### Para Usuarios Existentes:
1. Ingresar correo institucional
2. Ingresar contraseña
3. Clic en "Iniciar sesión segura"

### Buscar Estudiantes:
1. Ir a la pestaña "Buscar"
2. Usar la barra de búsqueda (nombre, carrera, matrícula)
3. Aplicar filtros si es necesario
4. Clic en un usuario para ver su perfil
5. Clic en "Agregar" para conectar

### Ver Sugerencias:
1. Desde Home, clic en "Sugerencias"
2. Ver usuarios sugeridos por categoría:
   - De tu misma carrera
   - Del mismo cuatrimestre
   - Otros estudiantes
3. Clic en "Agregar" para conectar

### Enviar Mensajes:
1. Ir a la pestaña "Mensajes"
2. Seleccionar una conversación
3. Escribir mensaje
4. Presionar Enter o clic en enviar
5. Ver confirmación de lectura (✓ o ✓✓)

### Cambiar a Modo Oscuro:
1. Ir a "Ajustes"
2. Activar "Modo oscuro"
3. La interfaz cambiará automáticamente

## 🎓 Conceptos Educativos

Este proyecto demuestra el uso práctico de:

### Estructuras de Datos:
- **Listas Enlazadas:** Gestión dinámica de colecciones
- **Colas:** Procesamiento ordenado FIFO
- **Pilas:** Historial y navegación LIFO
- **Grafos:** Modelado de redes sociales
- **Conjuntos:** Operaciones de intersección para amigos comunes

### Algoritmos:
- **BFS (Breadth-First Search):** Exploración por niveles
- **Búsqueda Lineal:** En listas de usuarios
- **Intersección de Conjuntos:** Para amigos comunes

### Patrones de Diseño:
- **Context API:** Para estado global (tema)
- **Component Composition:** Componentes reutilizables
- **Hooks Personalizados:** useTheme
- **Validación en Capas:** Separación de concerns

## 🐛 Debugging y Logs

Para ver el estado del grafo en consola:
```typescript
console.log(friendshipGraph.getStats());
// Output: { totalUsers: X, totalConnections: Y, averageFriends: Z }
```

## ✅ Checklist de Mejoras Implementadas

- [x] Validación estricta de @est.unibe.edu.do
- [x] Formato de matrícula AA-####
- [x] Validación de contraseña segura con indicadores visuales
- [x] Selector de foto de perfil desde dispositivo
- [x] Avatar genérico por defecto
- [x] Lista actualizada de carreras
- [x] Cuatrimestres del 1 al 18 con scroll
- [x] Sin solicitudes pendientes por defecto
- [x] Modo oscuro funcional
- [x] Solo perfiles reales registrados
- [x] Grafo no dirigido para amistades
- [x] BFS para sugerencias
- [x] BFS para amigos en común
- [x] Persistencia en localStorage
- [x] Código bien documentado
- [x] Estructuras de datos educativas

## 📝 Notas Importantes

- La aplicación NO guarda datos en un servidor externo
- Todos los datos se almacenan localmente en el navegador
- Si se borra el caché del navegador, se pierden los usuarios registrados
- Para producción, se necesitaría un backend real con base de datos

## 👥 Autor

Proyecto desarrollado para la materia de Estructuras de Datos
Universidad Iberoamericana (UNIBE)
