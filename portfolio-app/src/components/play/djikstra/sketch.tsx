import { Board } from "./classes/Board";
import { Djikstra } from "./classes/Djikstra";
import { GraphFactory } from "./classes/Graph";
import { numberComparator } from "./helpers/comparators";
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
const NUM_COLUMNS = 6;
const NUM_ROWS = 6;

//Others
let width: number;
let height: number;

let cols: number;
let cols_width: number;
let rows_height: number;
let rows: number;

let board: Board<Node<Point>>;

let initialPoint = 12;
let finalPoint = 35;

let squareGridPointMap = new Map<number, Object>([
    [1, new DjikstraNodeData(0, new Point(0, 0))],
    [2, new DjikstraNodeData(1, new Point(0, 1))],
    [3, new DjikstraNodeData(1, new Point(0, 2))],
    [4, new DjikstraNodeData(1, new Point(0, 3))],
    [5, new DjikstraNodeData(1, new Point(0, 4))],
    [6, new DjikstraNodeData(1, new Point(0, 5))],
    [10, new DjikstraNodeData(1, new Point(1, 0))],
    [11, new DjikstraNodeData(1, new Point(1, 1))],
    [initialPoint, new DjikstraNodeData(1, new Point(1, 2))],
    [13, new DjikstraNodeData(1, new Point(1, 3))],
    [14, new DjikstraNodeData(1, new Point(1, 4))],
    [15, new DjikstraNodeData(1, new Point(1, 5))],
    [20, new DjikstraNodeData(1, new Point(2, 0))],
    [21, new DjikstraNodeData(1, new Point(2, 1))],
    [22, new DjikstraNodeData(1, new Point(2, 2))],
    [23, new DjikstraNodeData(1, new Point(2, 3))],
    [24, new DjikstraNodeData(1, new Point(2, 4))],
    [25, new DjikstraNodeData(1, new Point(2, 5))],
    [30, new DjikstraNodeData(1, new Point(3, 0))],
    [31, new DjikstraNodeData(1, new Point(3, 1))],
    [32, new DjikstraNodeData(1, new Point(3, 2))],
    [33, new DjikstraNodeData(1, new Point(3, 3))],
    [34, new DjikstraNodeData(1, new Point(3, 4))],
    [finalPoint, new DjikstraNodeData(1, new Point(3, 5))],
    [40, new DjikstraNodeData(1, new Point(4, 0))],
    [41, new DjikstraNodeData(1, new Point(4, 1))],
    [42, new DjikstraNodeData(1, new Point(4, 2))],
    [43, new DjikstraNodeData(1, new Point(4, 3))],
    [44, new DjikstraNodeData(1, new Point(4, 4))],
    [45, new DjikstraNodeData(1, new Point(4, 5))],
    [50, new DjikstraNodeData(1, new Point(5, 0))],
    [51, new DjikstraNodeData(1, new Point(5, 1))],
    [52, new DjikstraNodeData(1, new Point(5, 2))],
    [53, new DjikstraNodeData(1, new Point(5, 3))],
    [54, new DjikstraNodeData(1, new Point(5, 4))],
    [55, new DjikstraNodeData(1, new Point(5, 5))],
]);

let pointGraphFactory = new GraphFactory<number>(numberComparator, squareGridPointMap);

pointGraphFactory.object = squareGridPointMap;
let graph = pointGraphFactory.generateRandomGraph();
let path = Djikstra.djikstra(graph, initialPoint, finalPoint);
console.log(path)
//graph = pointGraphFactory.generateLinearGraph();

//let suggestedPath = Djikstra.djikstra(graph, initialPoint, finalPoint);
//console.log(suggestedPath)
let randomPointGraph = pointGraphFactory.generateRandomGraph();
//Djikstra.djikstra(randomPointGraph, initialPoint, finalPoint);

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

        //let path = graph.djikstraPathFinding(initialPoint, finalPoint);
        //let pathGraph = pointGraphFactory.generateCustomGraph(path);
        //console.log(pathGraph)

        board = new Board(s, 0,0, board_w, board_h, NUM_COLUMNS, NUM_ROWS, COLORS, graph);
        board.setup();
        let canvas = s.createCanvas(board_w, board_h);

    }

    s.draw = () => {

        s.background(BORDER_COLOR)
        board.drawDjikstraCartesianPointsGridGraph();

    }
}