/**
 * ESTRUCTURAS DE DATOS PARA UNIBE SOCIAL NETWORK
 * 
 * Este archivo implementa las estructuras de datos fundamentales usadas en la red social:
 * - Lista Enlazada Simple: Para gestionar listas de usuarios
 * - Cola (Queue): Para implementar BFS (Búsqueda en amplitud)
 * - Pila (Stack): Para operaciones de historial y navegación
 * - Grafo No Dirigido: Para representar la red de amistades
 * 
 * Todas estas estructuras están implementadas desde cero para propósitos educativos.
 */

import { User } from '../types';

// ============= LISTA ENLAZADA SIMPLE =============

/**
 * Nodo de una lista enlazada
 * Cada nodo contiene datos y una referencia al siguiente nodo
 */
class ListNode<T> {
  data: T;
  next: ListNode<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}

/**
 * Lista Enlazada Simple
 * Estructura de datos lineal donde cada elemento apunta al siguiente
 * Útil para: Listas de usuarios, mensajes, notificaciones
 */
export class LinkedList<T> {
  private head: ListNode<T> | null;
  private size: number;

  constructor() {
    this.head = null;
    this.size = 0;
  }

  /**
   * Agrega un elemento al final de la lista
   * Complejidad: O(n)
   */
  append(data: T): void {
    const newNode = new ListNode(data);
    
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }

  /**
   * Agrega un elemento al inicio de la lista
   * Complejidad: O(1)
   */
  prepend(data: T): void {
    const newNode = new ListNode(data);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }

  /**
   * Elimina un elemento de la lista
   * Complejidad: O(n)
   */
  remove(data: T): boolean {
    if (!this.head) return false;

    if (this.head.data === data) {
      this.head = this.head.next;
      this.size--;
      return true;
    }

    let current = this.head;
    while (current.next) {
      if (current.next.data === data) {
        current.next = current.next.next;
        this.size--;
        return true;
      }
      current = current.next;
    }
    return false;
  }

  /**
   * Busca un elemento en la lista
   * Complejidad: O(n)
   */
  find(predicate: (data: T) => boolean): T | null {
    let current = this.head;
    while (current) {
      if (predicate(current.data)) {
        return current.data;
      }
      current = current.next;
    }
    return null;
  }

  /**
   * Convierte la lista a un array para facilitar su uso
   */
  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }

  /**
   * Obtiene el tamaño de la lista
   */
  getSize(): number {
    return this.size;
  }
}

// ============= COLA (QUEUE) =============

/**
 * Cola (Queue) - Estructura FIFO (First In, First Out)
 * El primer elemento en entrar es el primero en salir
 * Útil para: BFS (Búsqueda en amplitud), procesamiento de solicitudes
 */
export class Queue<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  /**
   * Agrega un elemento al final de la cola
   * Complejidad: O(1)
   */
  enqueue(item: T): void {
    this.items.push(item);
  }

  /**
   * Remueve y retorna el primer elemento de la cola
   * Complejidad: O(n) - debido al shift de array
   */
  dequeue(): T | undefined {
    return this.items.shift();
  }

  /**
   * Retorna el primer elemento sin removerlo
   */
  peek(): T | undefined {
    return this.items[0];
  }

  /**
   * Verifica si la cola está vacía
   */
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  /**
   * Retorna el tamaño de la cola
   */
  size(): number {
    return this.items.length;
  }

  /**
   * Limpia toda la cola
   */
  clear(): void {
    this.items = [];
  }
}

// ============= PILA (STACK) =============

/**
 * Pila (Stack) - Estructura LIFO (Last In, First Out)
 * El último elemento en entrar es el primero en salir
 * Útil para: Historial de navegación, operaciones de deshacer
 */
export class Stack<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  /**
   * Agrega un elemento al tope de la pila
   * Complejidad: O(1)
   */
  push(item: T): void {
    this.items.push(item);
  }

  /**
   * Remueve y retorna el elemento del tope
   * Complejidad: O(1)
   */
  pop(): T | undefined {
    return this.items.pop();
  }

  /**
   * Retorna el elemento del tope sin removerlo
   */
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  /**
   * Verifica si la pila está vacía
   */
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  /**
   * Retorna el tamaño de la pila
   */
  size(): number {
    return this.items.length;
  }

  /**
   * Limpia toda la pila
   */
  clear(): void {
    this.items = [];
  }
}

// ============= GRAFO NO DIRIGIDO =============

/**
 * Grafo No Dirigido - Representa la red social de amistades
 * En un grafo no dirigido, las conexiones son bidireccionales
 * Si A es amigo de B, entonces B es amigo de A
 * 
 * Implementación usando Lista de Adyacencia:
 * - Cada nodo (usuario) tiene una lista de sus vecinos (amigos)
 * - Más eficiente que matriz de adyacencia para grafos dispersos
 */
export class FriendshipGraph {
  private adjacencyList: Map<string, Set<string>>;

  constructor() {
    // Map: userId -> Set de userId de amigos
    this.adjacencyList = new Map();
  }

  /**
   * Agrega un nuevo usuario al grafo
   * @param userId - ID del usuario a agregar
   */
  addUser(userId: string): void {
    if (!this.adjacencyList.has(userId)) {
      this.adjacencyList.set(userId, new Set());
    }
  }

  /**
   * Crea una conexión de amistad entre dos usuarios
   * Como el grafo es no dirigido, la conexión es bidireccional
   * @param userId1 - ID del primer usuario
   * @param userId2 - ID del segundo usuario
   */
  addFriendship(userId1: string, userId2: string): void {
    // Asegurar que ambos usuarios existan en el grafo
    this.addUser(userId1);
    this.addUser(userId2);

    // Agregar la conexión bidireccional
    this.adjacencyList.get(userId1)!.add(userId2);
    this.adjacencyList.get(userId2)!.add(userId1);
  }

  /**
   * Elimina una conexión de amistad entre dos usuarios
   * @param userId1 - ID del primer usuario
   * @param userId2 - ID del segundo usuario
   */
  removeFriendship(userId1: string, userId2: string): void {
    if (this.adjacencyList.has(userId1)) {
      this.adjacencyList.get(userId1)!.delete(userId2);
    }
    if (this.adjacencyList.has(userId2)) {
      this.adjacencyList.get(userId2)!.delete(userId1);
    }
  }

  /**
   * Obtiene la lista de amigos de un usuario
   * @param userId - ID del usuario
   * @returns Array de IDs de amigos
   */
  getFriends(userId: string): string[] {
    if (!this.adjacencyList.has(userId)) {
      return [];
    }
    return Array.from(this.adjacencyList.get(userId)!);
  }

  /**
   * Verifica si dos usuarios son amigos
   * @param userId1 - ID del primer usuario
   * @param userId2 - ID del segundo usuario
   * @returns true si son amigos, false si no
   */
  areFriends(userId1: string, userId2: string): boolean {
    if (!this.adjacencyList.has(userId1)) {
      return false;
    }
    return this.adjacencyList.get(userId1)!.has(userId2);
  }

  /**
   * BFS (Búsqueda en Amplitud) - Encuentra amigos en común
   * Recorre el grafo nivel por nivel para encontrar conexiones mutuas
   * @param userId1 - ID del primer usuario
   * @param userId2 - ID del segundo usuario
   * @returns Array de IDs de amigos en común
   */
  getMutualFriends(userId1: string, userId2: string): string[] {
    const friends1 = new Set(this.getFriends(userId1));
    const friends2 = new Set(this.getFriends(userId2));
    
    // Intersección de conjuntos
    const mutual: string[] = [];
    friends1.forEach(friendId => {
      if (friends2.has(friendId)) {
        mutual.push(friendId);
      }
    });
    
    return mutual;
  }

  /**
   * BFS para sugerencias de amistad
   * Encuentra usuarios a cierta distancia (amigos de amigos)
   * @param userId - ID del usuario
   * @param maxDistance - Distancia máxima (por defecto 2 = amigos de amigos)
   * @returns Array de IDs de usuarios sugeridos
   */
  getSuggestedFriends(userId: string, maxDistance: number = 2): string[] {
    if (!this.adjacencyList.has(userId)) {
      return [];
    }

    const visited = new Set<string>();
    const suggestions = new Set<string>();
    const queue = new Queue<{ id: string; distance: number }>();

    // Inicializar BFS
    visited.add(userId);
    queue.enqueue({ id: userId, distance: 0 });

    while (!queue.isEmpty()) {
      const current = queue.dequeue()!;

      // Explorar vecinos (amigos)
      const friends = this.getFriends(current.id);
      for (const friendId of friends) {
        if (!visited.has(friendId)) {
          visited.add(friendId);
          
          const newDistance = current.distance + 1;
          
          // Si está a distancia 2 o más, es un candidato para sugerencia
          if (newDistance >= 2 && newDistance <= maxDistance) {
            suggestions.add(friendId);
          }
          
          // Continuar BFS si no hemos alcanzado la distancia máxima
          if (newDistance < maxDistance) {
            queue.enqueue({ id: friendId, distance: newDistance });
          }
        }
      }
    }

    return Array.from(suggestions);
  }

  /**
   * Calcula el camino más corto entre dos usuarios (usando BFS)
   * @param startId - ID del usuario inicial
   * @param endId - ID del usuario final
   * @returns Array con el camino de IDs, o array vacío si no hay camino
   */
  getShortestPath(startId: string, endId: string): string[] {
    if (!this.adjacencyList.has(startId) || !this.adjacencyList.has(endId)) {
      return [];
    }

    const visited = new Set<string>();
    const parent = new Map<string, string>();
    const queue = new Queue<string>();

    visited.add(startId);
    queue.enqueue(startId);

    while (!queue.isEmpty()) {
      const current = queue.dequeue()!;

      if (current === endId) {
        // Reconstruir el camino
        const path: string[] = [];
        let node: string | undefined = endId;
        while (node !== undefined) {
          path.unshift(node);
          node = parent.get(node);
        }
        return path;
      }

      const friends = this.getFriends(current);
      for (const friendId of friends) {
        if (!visited.has(friendId)) {
          visited.add(friendId);
          parent.set(friendId, current);
          queue.enqueue(friendId);
        }
      }
    }

    return []; // No hay camino
  }

  /**
   * Obtiene el grado de un nodo (número de amigos)
   * @param userId - ID del usuario
   * @returns Número de amigos del usuario
   */
  getDegree(userId: string): number {
    if (!this.adjacencyList.has(userId)) {
      return 0;
    }
    return this.adjacencyList.get(userId)!.size;
  }

  /**
   * Obtiene estadísticas del grafo
   */
  getStats(): {
    totalUsers: number;
    totalConnections: number;
    averageFriends: number;
  } {
    const totalUsers = this.adjacencyList.size;
    let totalConnections = 0;
    
    this.adjacencyList.forEach(friends => {
      totalConnections += friends.size;
    });
    
    // Dividir por 2 porque cada amistad se cuenta dos veces (no dirigido)
    totalConnections = totalConnections / 2;
    
    const averageFriends = totalUsers > 0 ? totalConnections * 2 / totalUsers : 0;
    
    return {
      totalUsers,
      totalConnections,
      averageFriends
    };
  }
}
