import { Point } from "./point";

export class DjikstraNodeData {
    private cost: number;
    private tentativeDistance: number = Math.pow(10, 1000);
    private visited: boolean = false;
    private IsPath: boolean = false;
    private point: Point;
    private IsTarget: boolean = false;

    constructor(cost: number, point: Point) {
        this.cost = cost;
        this.point = point;
    }

    getCost(): number {
        return this.cost;
    }

    setTentativeDistance(tentativeDistance: number) {
        this.tentativeDistance = tentativeDistance;
    }

    getTentativeDistance(): number {
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

    isPath(): boolean {
        return this.IsPath;
    }

    setIsPath(isPath: boolean) {
        this.IsPath = isPath;
    }

    setIsTarget(isTarget: boolean) {
        this.IsTarget = isTarget;
    }

    isTarget(): boolean {
        return this.IsTarget;
    }
}