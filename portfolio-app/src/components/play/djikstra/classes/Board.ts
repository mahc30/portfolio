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
    private colors: any;
    private BACKGROUND_COLOR;
    private BOARD_BACKGROUND_COLOR
    private BORDER_COLOR;
    private BOARD_GRID_COLOR;
    private custom: any;
    private offset: number;

    constructor(s: any, x: number, y: number, width: number, height: number, num_cols: number, num_rows: number, colors: object, custom?: any) {
        this.s = s;
        this.width = width;
        this.height = height;
        this.num_cols = num_cols;
        this.num_rows = num_rows;
        this.x = x;
        this.y = y;
        this.cols_width = width / num_cols;
        this.rows_height = height / num_rows;
        this.colors = colors;
        this.BACKGROUND_COLOR = this.colors[2].light;
        this.BOARD_BACKGROUND_COLOR = this.colors[7].hex
        this.BORDER_COLOR = this.colors[7].dark;
        this.BOARD_GRID_COLOR = this.colors[7].dark;
        this.custom = custom;
        this.offset = this.cols_width / 2;
    }

    setup() {
        this.s.stroke(this.BORDER_COLOR)
        this.s.stroke(this.BOARD_GRID_COLOR)
        this.s.strokeWeight(2)
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

    drawCartesianPointsGridGraph() {
        if (typeof this.custom === undefined) return;
        let graph: Graph<Point> = this.custom as Graph<Point>;
        let nodes = graph.getNodes();
        let data: DjikstraNodeData;
        nodes.forEach(node => {
            data = node.getData() as DjikstraNodeData;
            this.s.noFill()
            this.s.rect(node.getKey().getX() * this.cols_width, node.getKey().getY() * this.rows_height, this.cols_width, this.rows_height);

            this.s.fill("BLUE");
            this.s.circle(node.getKey().getX() * this.cols_width + this.offset, node.getKey().getY() * this.rows_height + this.offset, this.offset);

            node.getAdjacent().forEach(neighbor => {
                this.s.line(node.getKey().getX() * this.cols_width + this.offset,
                    node.getKey().getY() * this.rows_height + this.offset,

                    neighbor.getKey().getX() * this.cols_width + this.offset,
                    neighbor.getKey().getY() * this.rows_height + this.offset,

                )
            })

            data.isVisited() ? this.s.fill("RED") : this.s.fill("WHITE");
            this.s.text(`${node.getKey().getX()},${node.getKey().getY()}\nCost: ${data.getCost()}\nTentativeD: ${data.getTentativeDistance()}`, node.getKey().getX() * this.cols_width + this.offset, node.getKey().getY() * this.rows_height + this.offset);
        })
    }
}