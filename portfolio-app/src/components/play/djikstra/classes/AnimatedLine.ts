import { DjikstraNodeData } from "../helpers/djikstraNodeData";
import { Point } from "../helpers/point";
import { Graph } from "./Graph";

export class AnimatedLine {
    private a: Point;
    private b: Point;
    private s: any;
    private dx;
    private dy;
    private lineAngle;
    private lineLength = 0;
    private lineX;
    private lineY;
    private scaleX;
    private scaleY;
    private lineGrowRate = 0.5;
    private offset;
    

    constructor(a: Point, b: Point, scaleX: number, scaleY: number, s: any) {
        this.a = a;
        this.b = b;
        this.dx = this.b.getX() - this.a.getX();
        this.dy = this.b.getY() - this.a.getY();
        this.lineAngle = Math.atan2(this.dy, this.dx);
        this.lineX = this.a.getX() + Math.cos(this.lineAngle) * this.lineLength;
        this.lineY = this.a.getY() + Math.sin(this.lineAngle) * this.lineLength;
        this.s = s;
        this.scaleX = scaleX;
        this.scaleY = scaleY;
        this.offset = scaleX / 2;
    }

    setup() {

    }

    draw() {
        this.lineGrowRate += 0.02;
        this.lineLength = this.s.map(this.lineGrowRate, 0, 69, 0, 13, true);
        
        this.lineX = this.a.getX() + Math.cos(this.lineAngle) * this.lineLength;
        this.lineY = this.a.getY() + Math.sin(this.lineAngle) * this.lineLength;
        this.s.line(this.a.getX() * this.scaleX + this.offset, this.a.getY() * this.scaleY + this.offset, this.lineX * this.scaleX + this.offset, this.lineY * this.scaleY + this.offset);
    }

    static getAnimatedLinesArray(graph: Graph<any>, scaleX: number, scaleY: number, s: any): AnimatedLine[] {
        let lastPoint: Point;
        let currentPoint: Point;
        let nodes = graph.getNodes();
        let lines: AnimatedLine[] = [];
        if (nodes.size <= 0) return lines;
        let data: DjikstraNodeData;

        let first = true;
        currentPoint = nodes.entries().next().value[1].getData().getPoint() as Point;

        nodes.forEach(node => {
            data = node.getData();
            lastPoint = currentPoint;
            currentPoint = data.getPoint() as Point;

            if(!first) lines.push(new AnimatedLine(lastPoint, currentPoint, scaleX, scaleY, s));
            first = false;
        })
        return lines;
    };
}