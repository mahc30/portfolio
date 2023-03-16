//Works as Stack won't rename it
export class PriorityQueue<T> {
    data: [number, T][] = [];
    constructor() {
    }

    insertWithPriority(i: T, p: number) {
        if (this.data.length == 0) {
            this.data.push([p, i])
            return
        }

        for (let index = 0; index < this.data.length; index++) {
            if (index == this.data.length - 1) {
                this.data.push([p, i])
                return
            }

            if (this.data[index][0] < p) {
                this.data.splice(index, 0, [p, i])
                return
            }
        }
    }

    pop() {
        if (this.data.length === 0) return null as T;
        let obj = this.data.pop();
        if(obj) return obj[1] as T;
    }

    size(): number {
        return this.data.length;
    }

    isEmpty(): boolean {
        return this.data.length === 0;
    }
}