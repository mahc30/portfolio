import { Board } from "./classes/Board";
import { Djikstra } from "./classes/Djikstra";
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
const NUM_COLUMNS = 4;
const NUM_ROWS = 4;

//Others
let width: number;
let height: number;

let cols: number;
let cols_width: number;
let rows_height: number;
let rows: number;

let board: Board<Node<Point>>;

let initialPoint = 1;
let finalPoint = 14;

let squareGridPointMap = new Map<number, Object>([
    [initialPoint, new DjikstraNodeData(1, new Point(0, 0))],
    [2, new DjikstraNodeData(100, new Point(0, 1))],
    [3, new DjikstraNodeData(120, new Point(0, 2))],
    [4, new DjikstraNodeData(150, new Point(0, 3))],
    [5, new DjikstraNodeData(100, new Point(1, 0))],
    [6, new DjikstraNodeData(100, new Point(1, 1))],
    [7, new DjikstraNodeData(100, new Point(1, 2))],
    [8, new DjikstraNodeData(130, new Point(1, 3))],
    [9, new DjikstraNodeData(100, new Point(2, 0))],
    [10, new DjikstraNodeData(100, new Point(2, 1))],
    [11, new DjikstraNodeData(10, new Point(2, 2))],
    [12, new DjikstraNodeData(0, new Point(2, 3))],
    [13, new DjikstraNodeData(100, new Point(3, 0))],
    [finalPoint, new DjikstraNodeData(100, new Point(3, 1))],
    [15, new DjikstraNodeData(100, new Point(3, 2))],
    [16, new DjikstraNodeData(100, new Point(3, 3))]
]);
function comparator(a: number, b: number) {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
}

let pointGraphFactory = new GraphFactory<number>(comparator, squareGridPointMap);

pointGraphFactory.object = squareGridPointMap;
let cartesianGridGraph = pointGraphFactory.generateGridGraph(NUM_ROWS, NUM_COLUMNS);
//Djikstra.djikstra(cartesianGridGraph, initialPoint, finalPoint);
let linearPointGraph = pointGraphFactory.generateLinearGraph();
//Djikstra.djikstra(linearPointGraph, initialPoint, finalPoint);

let randomPointGraph = pointGraphFactory.generateRandomGraph();
Djikstra.djikstra(randomPointGraph, initialPoint, finalPoint);

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
        s.frameRate()

        //let path = cartesianGridGraph.djikstraPathFinding(initialPoint, finalPoint);
        //let pathGraph = pointGraphFactory.generateCustomGraph(path);
        //console.log(pathGraph)

        board = new Board(s, 0,0, board_w, board_h, NUM_COLUMNS, NUM_ROWS, COLORS, randomPointGraph);
        board.setup();
        let canvas = s.createCanvas(board_w, board_h);

    }

    s.draw = () => {

        s.background(BORDER_COLOR)
        board.drawDjikstraCartesianPointsGridGraph();

    }
}