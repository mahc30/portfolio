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
let ANIMATION_INTERVAL_MS = 13;
const FPS = 30;

//Game Config
const BACKGROUND_COLOR = COLORS.hex;
let NUM_COLUMNS = 100;
let NUM_ROWS = 100;

//Game State
let initialKey: number = 10;
let targetKey: number = 40;
let selectMode: boolean = false;
let currentPoint = new Point(0, 0);

// Viewport 
let width: number;
let height: number;

// GameObjects
let board: Board<Node<Point>>;
let path: Graph<number>;

let gridMap = Djikstra.generateGenericNodeListSingleValue(NUM_COLUMNS, NUM_ROWS);
let graphFactory: GraphFactory<number> = new GraphFactory(numberComparator, gridMap);
//let graph: Graph<number> = graphFactory.generateDiagonalGridGraph(NUM_COLUMNS, NUM_ROWS);
let graph: Graph<number> = graphFactory.generateGridGraph(NUM_COLUMNS, NUM_ROWS);

//Server
let hermes_online = true;

path = graphFactory.generateEmptyGraph();

export const sketch = (s: any) => {
    let domCanvas = s.select("#djikstra_viewport");
    startHermesHealthcheck();

    s.setup = () => {

        width = domCanvas.width;
        height = domCanvas.height;

        s.frameRate(FPS);

        board = new Board(s, 0, 0, width, height, NUM_COLUMNS, NUM_ROWS, ANIMATION_INTERVAL_MS);
        board.setup();

        s.resizeCanvas(width, height);

        setupGraph();
    }

    s.draw = () => {
        s.background(BACKGROUND_COLOR);
        board.drawAnimatedLineAToB();
        //board.drawDjikstraCartesianPointsGridGraphDEBUG();
    }

    s.mouseClicked = async () => {
        selectMode = !selectMode;
        let newPoint: Point = board.clickedPoint(s.mouseX, s.mouseY);
        changeColorRandom(s);

        let clickedNode = graph.linearGraphdepthFirstPointSearch(newPoint);
        if (clickedNode && targetKey !== clickedNode.getKey()) {
            initialKey = targetKey;
            targetKey = clickedNode.getKey();
            if (hermes_online) {
                try {
                    path = await Djikstra.djikstra(graph, currentPoint, newPoint, NUM_COLUMNS, NUM_ROWS);
                    setupOnlineValues();
                } catch (error) {
                    setupOfflineValues();
                };
                s.setup()
            }
            else {
                if (NUM_COLUMNS <= 100 && NUM_ROWS <= 100 && initialKey <= 100 && targetKey <= 100)
                    path = Djikstra.djikstraOffline(graph, targetKey, initialKey);
            }
            board.setAnimatedLinesInterval(path);
            //board.setAnimatedGridNodes(graph);
            graphFactory.resetDijkstraNodes();
        }
        currentPoint = newPoint;
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

function setupGraph() {
    gridMap = Djikstra.generateGenericNodeListSingleValue(NUM_COLUMNS, NUM_ROWS);
    graphFactory = new GraphFactory(numberComparator, gridMap);
    graph = graphFactory.generateDiagonalGridGraph(NUM_COLUMNS, NUM_ROWS);
    //graph = graphFactory.generateGridGraph(NUM_COLUMNS, NUM_ROWS);
}

function startHermesHealthcheck() {
    //Reattempt hermes connection
    setInterval(async () => {
        const response = await fetch(`https://p4n53o96di.execute-api.us-east-1.amazonaws.com/prod/shortestPath`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        response.status === 504 ? setupOfflineValues() : setupOnlineValues();
    }, 42000);
}

function setupOnlineValues() {
    hermes_online = true;
    NUM_COLUMNS = 100;
    NUM_ROWS = 100;
    ANIMATION_INTERVAL_MS = 13;
}

function setupOfflineValues() {
    hermes_online = false;
    NUM_COLUMNS = 10;
    NUM_ROWS = 10;
    ANIMATION_INTERVAL_MS = 69;
    initialKey = 13;
    targetKey = 69;
}