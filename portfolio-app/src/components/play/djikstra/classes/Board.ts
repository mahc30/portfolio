import { pushThenShiftArrayInterval, pushToArrayInterval, shiftArrayInterval } from "../helpers/arrayHelpers";
import { DjikstraNodeData } from "../helpers/djikstraNodeData";
import { Point } from "../helpers/point";
import { AnimatedLine } from "./AnimatedLine";
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
    private draw_pool: any[] = [];
    private animation_interval: number = 0;

    constructor(s: any, x: number, y: number, width: number, height: number, num_cols: number, num_rows: number, animation_interval: number) {
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
        this.animation_interval = animation_interval;
    }

    setDrawPool(draw_pool: any[]) {
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

    drawDjikstraCartesianPointsGridGraphDEBUG() {
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

                node.getAdjacent().forEach(neighbor => {
                    let nData = neighbor.getData() as DjikstraNodeData;

                    this.s.line(
                        data.getPoint().getX() * this.cols_width + this.offset,
                        data.getPoint().getY() * this.rows_height + this.offset,
                        nData.getPoint().getX() * this.cols_width + this.offset,
                        nData.getPoint().getY() * this.rows_height + this.offset,
                    )
                })

                this.s.fill("white");
                this.s.text(`k: ${node.getKey()}\n${data.getPoint().getX()},${data.getPoint().getY()}`, data.getPoint().getX() * this.cols_width + this.offset, data.getPoint().getY() * this.rows_height + this.offset);
                this.s.text(`k: ${node.getKey()}\n${data.getPoint().getX()},${data.getPoint().getY()}\nCost: ${data.getCost()}\nTentativeD: ${data.getTentativeDistance()}`, data.getPoint().getX() * this.cols_width + this.offset, data.getPoint().getY() * this.rows_height + this.offset);
            })
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
                this.s.circle(data.getPoint().getX() * this.cols_width + this.offset, data.getPoint().getY() * this.rows_height + this.offset, this.cols_width / 16);
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

    setAnimatedLinesInterval(graph: Graph<number>) {
        let animatedLines = AnimatedLine.getAnimatedLinesArray(graph, this.cols_width, this.rows_height, this.s).slice();
        if (animatedLines) pushThenShiftArrayInterval(this.draw_pool, animatedLines, this.animation_interval);
    }

    setAnimatedGridNodes(graph: Graph<number>) {
        this.draw_pool.push(graph);
    }
}