import { Board } from "./classes/Board";
import { Djikstra } from "./classes/Djikstra";
import { Graph, GraphFactory } from "./classes/Graph";
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
const NUM_COLUMNS = 10;
const NUM_ROWS = 5;

//Game State
let num_columns: number;
let num_rows: number;

//Others
let width: number;
let height: number;

let cols: number;
let cols_width: number;
let rows_height: number;
let rows: number;

let board: Board<Node<Point>>;


let graph : Graph<number>; //graph = pointGraphFactory.generateLinearGraph();
let gridMap; //let suggestedPath = Djikstra.djikstra(graph, initialPoint, finalPoint);
let graphFactory: GraphFactory<number>; //console.log(suggestedPath)
let path; //Djikstra.djikstra(randomPointGraph, initialPoint, finalPoint);

export const sketch = (s: any) => {
    s.setup = () => {

        width = s.windowWidth;
        height = s.windowHeight;
        
        cols_width = Math.floor(width / NUM_COLUMNS);
        rows_height = Math.floor(height / NUM_ROWS)
        console.log(NUM_COLUMNS*NUM_ROWS)
        gridMap = Djikstra.generateGenericNodeListSingleValue(NUM_COLUMNS, NUM_ROWS);
        graphFactory = new GraphFactory(numberComparator, gridMap);
        graph = graphFactory.generateGridGraph(NUM_COLUMNS, NUM_ROWS);
        path = Djikstra.djikstra(graph, 26, 2);
        console.log(path)
        s.fill(BACKGROUND_COLOR);
        s.frameRate();

        //let path = graph.djikstraPathFinding(initialPoint, finalPoint);
        //let pathGraph = pointGraphFactory.generateCustomGraph(path);
        //console.log(pathGraph)

        board = new Board(s, 0, 0, width, height, NUM_COLUMNS, NUM_ROWS, COLORS, graph);
        board.setup();
        let canvas = s.createCanvas(width, height);
        board.drawDjikstraCartesianPointsGridGraph();
    }

    s.draw = () => {

        //s.background(BORDER_COLOR)
        board.drawDjikstraCartesianPointsGridGraph();

    }
}