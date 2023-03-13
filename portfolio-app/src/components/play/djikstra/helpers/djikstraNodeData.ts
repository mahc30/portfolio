export class DjikstraNodeData {
    private cost : number;
    private tentativeDistance: number = Math.pow(10,1000);
    private visited: boolean = false;

    constructor(cost : number) {
        this.cost = cost;        
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
}