import { Board } from "./classes/Board";
import { Djikstra } from "./classes/Djikstra";
import { Graph, GraphFactory } from "./classes/Graph";
import { numberComparator } from "./helpers/comparators";
import { Node } from "./helpers/node";
import { Point } from "./helpers/point";

//Styles
const COLORS =
{
    "name": "Portfolio BG gray",
    "hex": "#ffffff",
    "light": "#c1edd9",
    "dark": "#7ca291",
    "shades": [
        "#989ca3",
        "#6f727a",
        "#484c52",
        "#25282e"
    ]
}// Portfolio BG gray;

// const DRAW_BEHAVIOUR = 0; //0 = IntervalPoints | 1 = AnimatedLine
// Animation Settings
const ANIMATION_INTERVAL_MS = 42;
const FPS = 30;

//Game Config
const BACKGROUND_COLOR = COLORS.hex;
const NUM_COLUMNS = 10;
const NUM_ROWS = 10;

//Game State
let initialKey: number = 10;
let targetKey: number = 40;
let selectMode: boolean = false;

// Viewport 
let width: number;
let height: number;

// GameObjects
let board: Board<Node<Point>>;

let gridMap = Djikstra.generateGenericNodeListSingleValue(NUM_COLUMNS, NUM_ROWS);
let graphFactory: GraphFactory<number> = new GraphFactory(numberComparator, gridMap);
let graph: Graph<number> = graphFactory.generateDiagonalGridGraph(NUM_COLUMNS, NUM_ROWS);
let path: Graph<number>;


path = Djikstra.djikstra(graph, initialKey, targetKey);

export const sketch = (s: any) => {
    let domCanvas = s.select("#djikstra_viewport");
    s.setup = () => {

        width = domCanvas.width;
        height = domCanvas.height;

        s.frameRate(FPS);

        board = new Board(s, 0, 0, width, height, NUM_COLUMNS, NUM_ROWS, ANIMATION_INTERVAL_MS);
        board.setup();

        s.resizeCanvas(width, height);
    }

    s.draw = () => {
        s.background(BACKGROUND_COLOR);
        board.drawAnimatedLineAToB();
        //board.drawDjikstraCartesianPointsGridGraphDEBUG();
    }

    s.mouseClicked = () => {
        selectMode = !selectMode;
        let point: Point = board.clickedPoint(s.mouseX, s.mouseY);
        changeColorRandom(s);

        let clickedNode = graph.linearGraphdepthFirstPointSearch(point);
        if (clickedNode && targetKey !== clickedNode.getKey()) {
            initialKey = targetKey;
            targetKey = clickedNode.getKey();

            path = Djikstra.djikstra(graph, targetKey, initialKey);
            board.setAnimatedLinesInterval(path);


            //            board.setAnimatedGridNodes(graph);

            graphFactory.resetDijkstraNodes();
        }
    }

    s.windowResized = () => {
        domCanvas = s.select("#djikstra_viewport");
        width = domCanvas.width;
        height = domCanvas.height;
        s.resizeCanvas(width, height);
        board = new Board(s, 0, 0, width, height, NUM_COLUMNS, NUM_ROWS, ANIMATION_INTERVAL_MS);
        board.setup();
    }

    function changeColorRandom(s: any) {
        let newColor = COLORS.shades[Math.floor(Math.random() * (COLORS.shades.length - 1))];
        s.fill(newColor)
    }
}

