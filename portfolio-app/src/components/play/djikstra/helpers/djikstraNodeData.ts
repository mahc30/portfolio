import { Point } from "./point";

export class DjikstraNodeData {
    private cost : number;
    private tentativeDistance: number = Math.pow(10,1000);
    private visited: boolean = false;
    private point: Point;

    constructor(cost : number, point: Point) {
        this.cost = cost;        
        this.point = point;
    }

    getCost() : number {
        return this.cost;
    }

    setTentativeDistance(tentativeDistance: number) {
        this.tentativeDistance = tentativeDistance;
    }

    getTentativeDistance(): number{
        return this.tentativeDistance;
    }

    isVisited(): boolean {
        return this.visited === true;
    }

    setVisited(visited: boolean) {
        this.visited = visited;
    }

    getPoint(): Point {
        return this.point;
    }
}