import { AnimatedLine, Board } from "./classes/Board";
import { Djikstra } from "./classes/Djikstra";
import { Graph, GraphFactory } from "./classes/Graph";
import { pushThenShiftArrayInterval, pushToArrayInterval, shiftArrayInterval } from "./helpers/arrayHelpers";
import { numberComparator } from "./helpers/comparators";
import { DjikstraNodeData } from "./helpers/djikstraNodeData";
import { Node } from "./helpers/node";
import { Point } from "./helpers/point";

//Styles
const COLORS =
{
    "name": "Portfolio BG gray",
    "hex": "#c3c7cf",
    "light": "#c1edd9",
    "dark": "#7ca291",
    "shades": [
        "#989ca3",
        "#6f727a",
        "#484c52",
        "#25282e"
    ]
}// Portfolio BG gray;

const BACKGROUND_COLOR = COLORS.hex;
const NUM_COLUMNS = 10;
const NUM_ROWS =8;
const DRAW_BEHAVIOUR = 0; //0 = IntervalPoints | 1 = AnimatedLine
// Animation Settings
const DIJKSTRA_INTERVAL_MS = 100;
let current_draw_pool: any[] = [];
const FPS = 30;

//Game State
let num_columns: number;
let num_rows: number;
let initialKey: number = 10;
let targetKey: number = 40;
let selectMode: boolean = false;

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
//graph = graphFactory.generateDiagonalGridGraph(NUM_COLUMNS, NUM_ROWS);
graph = graphFactory.generateGridGraph(NUM_COLUMNS, NUM_ROWS);

path = Djikstra.djikstra(graph, initialKey, targetKey);
let current_draw_path = graphFactory.generateEmptyGraph();
//GraphFactory.pushToGraphInterval(path, current_draw_path, DIJKSTRA_INTERVAL_MS);
//current_draw_pool.push(current_draw_path);
let animatedLines: AnimatedLine[];

export const sketch = (s: any) => {
    s.setup = () => {

        width = s.windowWidth;
        height = s.windowHeight;

        cols_width = Math.floor(width / NUM_COLUMNS);
        rows_height = Math.floor(height / NUM_ROWS)

        s.frameRate(FPS);

        //let path = graph.djikstraPathFinding(initialPoint, finalPoint);
        //let pathGraph = pointGraphFactory.generateCustomGraph(path);
        //console.log(pathGraph)

        animatedLines = AnimatedLine.getAnimatedLinesArray(path, cols_width, rows_height, s);
        if (animatedLines) {
            //current_draw_pool = animatedLines;
            pushThenShiftArrayInterval(current_draw_pool, animatedLines, DIJKSTRA_INTERVAL_MS);
        }

        board = new Board(s, 0, 0, width, height, NUM_COLUMNS, NUM_ROWS, COLORS, current_draw_pool);
        board.setup();
        let canvas = s.createCanvas(width, height);
        //board.drawDjikstraCartesianPointsGridGraph();
    }

    s.draw = () => {

        s.background(BACKGROUND_COLOR)
        //board.drawDjikstraCartesianPointsGridGraph();
        board.drawAnimatedLineAToB();
    }

    s.mouseClicked = () => {
        selectMode = !selectMode;
        let point: Point = board.clickedPoint(s.mouseX, s.mouseY);
        changeColorRandom(s)

        let clickedNode = graph.linearGraphdepthFirstPointSearch(point);
        if (clickedNode) {
            initialKey = targetKey;
            targetKey = clickedNode.getKey()
            path = Djikstra.djikstra(graph, targetKey, initialKey);

            //current_draw_path = graphFactory.generateEmptyGraph();
            //current_draw_pool.pop();
            //current_draw_pool.push(current_draw_path);
            //GraphFactory.pushToGraphInterval(path, current_draw_path, DIJKSTRA_INTERVAL_MS);


            animatedLines = AnimatedLine.getAnimatedLinesArray(path, cols_width, rows_height, s).slice();
            current_draw_pool = [];
            if (animatedLines) {
                pushThenShiftArrayInterval(current_draw_pool, animatedLines, DIJKSTRA_INTERVAL_MS);
                board.setDrawPool(current_draw_pool)
            }
            graphFactory.resetDijkstraNodes();
        }
    }

    function changeColorRandom(s: any) {
        let newColor = COLORS.shades[Math.floor(Math.random() * (COLORS.shades.length - 1))];
        s.fill(newColor)
    }
}

