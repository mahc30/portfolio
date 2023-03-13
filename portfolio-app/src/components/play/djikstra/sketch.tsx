import { Board } from "./classes/Board";
import { GraphFactory } from "./classes/Graph";
import { DjikstraNodeData } from "./helpers/djikstraNodeData";
import { Node } from "./helpers/node";
import { Point } from "./helpers/point";

//Styles
const COLORS =
    [{ "name": "Pale Spring Bud", "hex": "#eeefc8", "light": "#D9DC8A", "dark": "#8a8b6a" }, // Beach
    { "name": "Wisteria", "hex": "#BA9EDC", "light": "#c1a8e0", "dark": "#826f9a" }, //Light Purple
    { "name": "Radical Red", "hex": "#FD3F60", "light": "#fd5270", "dark": "#b12c43" }, //Red
    { "name": "Star Command Blue", "hex": "#117EBE", "light": "#298bc5", "dark": "#0c5885" }, //Blue
    { "name": "Sky Blue Crayola", "hex": "#10b2da", "light": "#58c9e5", "dark": "#0b7d99" }, // Light Blue
    { "name": "Orange", "hex": "#ff6205", "light": "#ff8137", "dark": "#b34504" }, //Orange
    { "name": "Green", "hex": "#60FD3F", "light": "#80fd65", "dark": "#3a9826" }, //Green
    { "name": "Complementary Beach", "hex": "#B1E8CF", "light": "#c1edd9", "dark": "#7ca291" }, //Complementary Beach
    ];


const BACKGROUND_COLOR = COLORS[2].light;
const BOARD_BACKGROUND_COLOR = COLORS[7].hex
const BORDER_COLOR = COLORS[7].dark;
const BOARD_GRID_COLOR = COLORS[7].dark;

//Game State
const NUM_COLUMNS = 3;
const NUM_ROWS = 3;

//Others
let width: number;
let height: number;

let cols: number;
let cols_width: number;
let rows_height: number;
let rows: number;

let board: Board<Node<Point>>;

let initialPoint = new Point(0, 0);
let finalPoint = new Point(2,2);

let squareGridPointMap = new Map<Point, Object>([
    [initialPoint, new DjikstraNodeData(1)],
    [new Point(0, 1), new DjikstraNodeData(3)],
    [new Point(0, 2), new DjikstraNodeData(4)],
    [new Point(1, 0), new DjikstraNodeData(5)],
    [new Point(1, 1), new DjikstraNodeData(6)],
    [new Point(1, 2), new DjikstraNodeData(7)],
    [new Point(2, 0), new DjikstraNodeData(8)],
    [new Point(2, 1), new DjikstraNodeData(9)],
    [finalPoint, new DjikstraNodeData(1)]
]);

let pointGraphFactory = new GraphFactory<Point>(Point.comparator, squareGridPointMap);

pointGraphFactory.object = squareGridPointMap;
let cartesianGridGraph = pointGraphFactory.generateGridGraph(3,3);
let linearPointGraph = pointGraphFactory.generateLinearGraph();
let randomPointGraph = pointGraphFactory.generateRandomGraph();

export const sketch = (s: any) => {
    s.setup = () => {
        //Mobile Ver
        if (s.windowHeight > s.windowWidth) {
            cols_width = (s.windowWidth * 2 / 3) / NUM_COLUMNS; //Divide 2/3 of screen by number of cols
        } else {
            cols_width = s.windowHeight / NUM_ROWS - 1 // -1 is a small offset so game doesn't takes the entire window
        }

        rows_height = cols_width;  //Grid should always be squares

        let board_w = cols_width * NUM_COLUMNS
        let board_h = rows_height * NUM_ROWS;

        s.fill(BACKGROUND_COLOR)

        board = new Board(s, 0,0, board_w, board_h, NUM_COLUMNS, NUM_ROWS, COLORS, randomPointGraph);
        board.setup();
        let canvas = s.createCanvas(board_w, board_h);
        cartesianGridGraph.djikstraPathFinding(initialPoint, finalPoint);
    }

    s.draw = () => {

        s.background(BORDER_COLOR)
        board.drawCartesianPointsGridGraph();
    }
}