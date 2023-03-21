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
const NUM_COLUMNS = 6;
const NUM_ROWS = 4;

// Animation Settings
const DIJKSTRA_INTERVAL_MS = 500;
let current_draw_pool: any[] = [];
const FPS = 30;

//Game State
let num_columns: number;
let num_rows: number;
let initialKey: number = 2;
let targetKey: number = 22;
let selectMode: boolean = false;

//Cache
let backgroundGenericGridGraph : Graph<number>;

//Others
let width: number;
let height: number;

let cols: number;
let cols_width: number;
let rows_height: number;
let rows: number;

let board: Board<Node<Point>>;


let graph: Graph<number>; //graph = pointGraphFactory.generateLinearGraph();
let gridMap; //let suggestedPath = Djikstra.djikstra(graph, initialPoint, finalPoint);
let graphFactory: GraphFactory<number>; //console.log(suggestedPath)
let path: Graph<number>; //Djikstra.djikstra(randomPointGraph, initialPoint, finalPoint);

gridMap = Djikstra.generateGenericNodeListSingleValue(NUM_COLUMNS, NUM_ROWS);
graphFactory = new GraphFactory(numberComparator, gridMap);
graph = graphFactory.generateDiagonalGridGraph(NUM_COLUMNS, NUM_ROWS);
backgroundGenericGridGraph = graph.clone();
console.log("BACKUP: ", backgroundGenericGridGraph)

path = Djikstra.djikstra(graph, initialKey, targetKey);
let current_draw_path = graphFactory.generateEmptyGraph();
GraphFactory.pushToGraphInterval(path, current_draw_path, DIJKSTRA_INTERVAL_MS);
current_draw_pool.push(current_draw_path);

export const sketch = (s: any) => {
    s.setup = () => {

        width = s.windowWidth;
        height = s.windowHeight;

        cols_width = Math.floor(width / NUM_COLUMNS);
        rows_height = Math.floor(height / NUM_ROWS)
        s.fill(BACKGROUND_COLOR);
        s.frameRate(FPS);

        //let path = graph.djikstraPathFinding(initialPoint, finalPoint);
        //let pathGraph = pointGraphFactory.generateCustomGraph(path);
        //console.log(pathGraph)

        board = new Board(s, 0, 0, width, height, NUM_COLUMNS, NUM_ROWS, COLORS, current_draw_pool);
        board.setup();
        let canvas = s.createCanvas(width, height);
        //board.drawDjikstraCartesianPointsGridGraph();
    }

    s.draw = () => {

        s.background(BORDER_COLOR)

        board.drawDjikstraCartesianPointsGridGraph();
    }

    s.mouseClicked = () => {
        selectMode = !selectMode;
        let point: Point = board.clickedPoint(s.mouseX, s.mouseY);

        let clickedNode = graph.linearGraphdepthFirstPointSearch(point);
        if (clickedNode) {
            initialKey = targetKey;
            targetKey = clickedNode.getKey()
            graphFactory.resetDijkstraNodes();
            path = Djikstra.djikstra(graph ,targetKey, initialKey);
            current_draw_path = graphFactory.generateEmptyGraph();
            current_draw_pool.pop();
            current_draw_pool.push(current_draw_path)
            GraphFactory.pushToGraphInterval(path, current_draw_path, DIJKSTRA_INTERVAL_MS);
        }
    }
}