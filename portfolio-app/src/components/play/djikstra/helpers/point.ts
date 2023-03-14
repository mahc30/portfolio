export class Point {
    private x: number;
    private y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    getX() : number {
        return this.x;
    }

    getY() : number {
        return this.y;
    }

    static comparator(a : Point, b: Point) {
        if(a.y != b.y) return -1;
        if(a.x != b.x) return 1;
        return 0;
    }

    static distance(a: Point, b: Point){
        return Math.sqrt(Math.pow(a.getX(),2) - Math.pow(b.getX(),2) + Math.pow(a.getY(), 2) - Math.pow(b.getY(), 2));
    }
}