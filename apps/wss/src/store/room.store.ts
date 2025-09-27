class RoomStore<T> {
  private rooms: Map<string, T> = new Map();

  constructor() {}

  add(id: string, room: T) {
    this.rooms.set(id, room);
  }

  delete(id: string) {
    this.rooms.delete(id);
  }

  get(id: string) {
    return this.rooms.get(id);
  }

  has(id: string) {
    return this.rooms.has(id);
  }

  clear() {
    this.rooms.clear();
  }

  size() {
    return this.rooms.size;
  }
}

export default RoomStore;
