export class Stack<T> {
    private storage: T[] = [];
  
    constructor(private capacity: number = Infinity) { }
  
    push(item: T): void {
      if (this.size() === this.capacity) {
        throw Error("Queue has reached max capacity, you cannot add more items");
      }
      this.storage.push(item);
    }
  
    pop(): T | undefined {
      return this.storage.pop();
    }
  
    size(): number {
      return this.storage.length;
    }
  
    isEmpty(): boolean {
      return this.storage.length === 0;
    }
  
    getStorage() {
      return this.storage;
    }
  }