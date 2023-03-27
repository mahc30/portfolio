import { DjikstraNodeData } from "../helpers/djikstraNodeData";
import { Point } from "../helpers/point";
import { Graph } from "./Graph";

export class Board<T> {
    private s;
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private num_cols: number;
    private num_rows: number;
    private cols_width: number;
    private rows_height: number;
    private offset: number;
    private draw_pool: any[];

    constructor(s: any, x: number, y: number, width: number, height: number, num_cols: number, num_rows: number, draw_pool?: any[]) {
        this.s = s;
        this.width = width;
        this.height = height;
        this.num_cols = num_cols;
        this.num_rows = num_rows;
        this.x = x;
        this.y = y;
        this.cols_width = width / num_cols;
        this.rows_height = height / num_rows;
        this.offset = this.cols_width / 2;
        this.draw_pool = draw_pool || [];
    }

    setDrawPool(draw_pool: any[]){
        this.draw_pool = draw_pool;
    }
    
    setup() {

        this.s.stroke(255);
        this.s.strokeWeight(1);
    }

    drawGrid() {
        //Grid
        for (let i = 0; i < this.num_cols; i++) {
            this.s.line(this.x + (this.cols_width * i), this.y, this.x + (this.cols_width * i), this.height);
        }

        for (let i = 0; i < this.num_rows; i++) {
            this.s.line(this.x, this.y + (this.rows_height * i), this.width, this.y + (this.rows_height * i));
        }
    }

    drawDjikstraCartesianPointsGridGraph() {
        if (typeof this.draw_pool === undefined) return;

        for (let i = 0; i < this.draw_pool.length; i++) {

            let graph: Graph<T> = this.draw_pool[i] as Graph<T>;
            let nodes = graph.getNodes();
            let data: DjikstraNodeData;
            if (nodes.size <= 0) return;

            nodes.forEach(node => {

                data = node.getData() as DjikstraNodeData;
                //this.s.noFill()
                //this.s.rect(data.getPoint().getX() * this.cols_width, data.getPoint().getY() * this.rows_height, this.cols_width, this.rows_height);

                this.s.circle(data.getPoint().getX() * this.cols_width + this.offset, data.getPoint().getY() * this.rows_height + this.offset, this.cols_width / 16);

                // node.getAdjacent().forEach(neighbor => {
                //     let nData = neighbor.getData() as DjikstraNodeData;

                //     this.s.line(
                //         data.getPoint().getX() * this.cols_width + this.offset,
                //         data.getPoint().getY() * this.rows_height + this.offset,
                //         nData.getPoint().getX() * this.cols_width + this.offset,
                //         nData.getPoint().getY() * this.rows_height + this.offset,
                //     )
                // })

                //this.s.fill("white");
                //this.s.text(`k: ${node.getKey()}\n${data.getPoint().getX()},${data.getPoint().getY()}`, data.getPoint().getX() * this.cols_width + this.offset, data.getPoint().getY() * this.rows_height + this.offset);
                //this.s.text(`k: ${node.getKey()}\n${data.getPoint().getX()},${data.getPoint().getY()}\nCost: ${data.getCost()}\nTentativeD: ${data.getTentativeDistance()}`, data.getPoint().getX() * this.cols_width + this.offset, data.getPoint().getY() * this.rows_height + this.offset);
            })
        }
    }

    clickedPoint(x: number, y: number) {
        let clickedX = Math.floor(x / this.cols_width);
        let clickedY = Math.floor(y / this.rows_height);

        return new Point(clickedX, clickedY);
    }

    drawAnimatedLineAToB() {

        this.s.stroke(0);
        this.s.strokeWeight(1);
        if (typeof this.draw_pool === undefined) return;
        //console.log(this.draw_pool)
        for (let i = 0; i < this.draw_pool.length; i++) {
            (this.draw_pool[i] as AnimatedLine).draw();
        };
    }
}


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
    }

    setup() {

    }

    draw() {
        this.lineLength += this.lineGrowRate;

        this.lineX = this.a.getX() + Math.cos(this.lineAngle) * this.lineLength;
        this.lineY = this.a.getY() + Math.sin(this.lineAngle) * this.lineLength;
        this.s.line(this.a.getX() * this.scaleX, this.a.getY() * this.scaleY, this.lineX * this.scaleX, this.lineY * this.scaleY);
        //console.log("Drawin: ", this.a, " ---> ", this.b);
        //console.log(this.a.getX() * this.scaleX, this.a.getY() * this.scaleY, this.lineX * this.scaleX, this.lineY * this.scaleY)
    }

    static getAnimatedLinesArray(graph: Graph<any>, scaleX: number, scaleY: number, s: any) : AnimatedLine[] {
        let lastPoint: Point;
        let currentPoint: Point;
        let nodes = graph.getNodes();
        let lines: AnimatedLine[] = [];
        if (nodes.size <= 0) return lines;
        let data: DjikstraNodeData;

        currentPoint = nodes.entries().next().value[1].getData().getPoint() as Point;

        nodes.forEach(node => {
            data = node.getData();
            lastPoint = currentPoint;
            currentPoint = data.getPoint() as Point;
            lines.push(new AnimatedLine(lastPoint, currentPoint, scaleX, scaleY, s));

        })

        return lines;
    };
}