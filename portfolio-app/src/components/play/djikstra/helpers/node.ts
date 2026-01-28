export class Node<T> {
    private adjacent: Node<T>[] = [];
    private key: T;
    private data: any | undefined;

    comparator: (a: T, b: T) => number;

    getData(): any | undefined {
        return this.data;
    }

    setData(data: T): void {
        this.data = data;
    }

    getKey(): T {
        return this.key;
    }

    setKey(key: any): void {
        this.key = key;
    }

    getAdjacent(): Node<T>[] {
        return this.adjacent;
    }

    constructor(comparator: (a: T, b: T) => number, key: T,  data?: any) {
        this.comparator = comparator;
        this.key = key;
        if (typeof data !== undefined) this.data = data;
    }

    addAdjacent(node: Node<T>): void {
        this.adjacent.push(node);
    }

    removeAdjacent(key: T): Node<T> | null {
        const index = this.adjacent.findIndex(
            (node) => this.comparator(node.getKey(), key) === 0
        );
        if (index > -1) {
            return this.adjacent.splice(index, 1)[0];
        }
        return null;
    }
}