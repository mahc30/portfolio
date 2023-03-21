import { Node } from "../helpers/node";
import { Queue } from "../helpers/queue";
import { listToNxMMatrix } from "../helpers/arrayHelpers";
import { DjikstraNodeData } from "../helpers/djikstraNodeData";
import { Point } from "../helpers/point";

export class Graph<T> {
    private nodes: Map<T, Node<T>> = new Map();
    comparator: (a: T, b: T) => number;
    constructor(comparator: (a: T, b: T) => number, nodes?: Map<T, Node<T>>) {
        this.comparator = comparator;
        if (nodes) this.nodes = nodes;
    }

    getNodes(): Map<T, Node<T>> {
        return this.nodes;
    }
    /**
     * Add a new node if it was not added before
     *
     * @param {T} key
     * @returns {Node<T>}
     */
    addNode(key: T, data?: T): Node<T> {
        let node = this.nodes.get(key);
        if (node) return node;

        node = new Node(this.comparator, key, data);
        this.nodes.set(key, node);
        return node;
    }
    /**
     * Remove a node, also remove it from other nodes adjacency list
     *
     * @param {T} key
     * @returns {Node<T> | null}
     */
    removeNode(key: T): Node<T> | null {
        const nodeToRemove = this.nodes.get(key);
        if (!nodeToRemove) return null;

        this.nodes.forEach((node) => {
            node.removeAdjacent(nodeToRemove.getKey());
        });
        this.nodes.delete(key);
        return nodeToRemove;
    }

    /**
     * Create an edge between two nodes
     *
     * @param {T} source
     * @param {T} destination
     */

    addEdge(source: T, destination: T): void {
        const sourceNode = this.addNode(source);
        const destinationNode = this.addNode(destination);
        sourceNode.addAdjacent(destinationNode);
    }

    /**
     * Remove an edge between two nodes
     *
     * @param {T} source
     * @param {T} destination
     */
    removeEdge(source: T, destination: T): void {
        const sourceNode = this.nodes.get(source);
        const destinationNode = this.nodes.get(destination);
        if (sourceNode && destinationNode) {
            sourceNode.removeAdjacent(destination);
        }
    }

    /**
     * Depth-first search
     *
     * @param {T} key
     * @param {Map<T, boolean>} visited
     * @returns
     */

    private depthFirstSearchAux(node: Node<T>, visited: Map<T, boolean>): void {
        if (!node) return;
        visited.set(node.getKey(), true);

        node.getAdjacent().forEach((node) => {
            if (!visited.has(node.getKey())) {
                this.depthFirstSearchAux(node, visited);
            }
        });
    }
    depthFirstSearch() {
        const visited: Map<T, boolean> = new Map();
        this.nodes.forEach((node) => {
            if (!visited.has(node.getKey())) {
                this.depthFirstSearchAux(node, visited);
            }
        });
    }

    linearGraphdepthFirstPointSearch(point: Point): Node<T> | undefined {
        const visited: Map<T, boolean> = new Map();
        let iterator = this.nodes.entries();
        let head = iterator.next()

        while (head.value) {
            let node = head.value[1] as Node<T>;
            let data = node.getData() as DjikstraNodeData;

            if (data.getPoint().getX() === point.getX() && data.getPoint().getY() === point.getY()) break;
            head = iterator.next();
        }

        return head.value ? head.value[1] as Node<T> : undefined;
    }
    /**
     * Breadth-first search
     *
     * @param {T} key
     * @returns
     */

    private breadthFirstSearchAux(node: Node<T> | undefined, visited: Map<T, boolean>): void {
        if (!node) return;
        const queue: Queue<Node<T>> = new Queue();
        queue.push(node);
        visited.set(node.getKey(), true);
        while (!queue.isEmpty()) {
            node = queue.pop();
            if (!node) continue;

            node.getAdjacent().forEach((neighborNode) => {
                if (!visited.has(neighborNode.getKey())) {
                    visited.set(neighborNode.getKey(), true);
                    queue.push(neighborNode);
                }
            });
        }
    }

    breadthFirstSearch() {
        const visited: Map<T, boolean> = new Map();
        this.nodes.forEach((node) => {
            if (!visited.has(node.getKey())) {
                this.breadthFirstSearchAux(node, visited);
            }
        });
    }

    clone() {
        return new Graph(this.comparator, this.nodes)
    }

}

export class GraphFactory<T> {

    comparator: (a: T, b: T) => number;
    object: Map<T, any>;

    constructor(comparator: (a: T, b: T) => number, object: Map<T, any>) {
        this.comparator = comparator;
        this.object = object;
    }

    generateEmptyGraph(): Graph<T> {
        return new Graph(this.comparator);
    }

    generateLinearGraph(): Graph<T> {
        let graph: Graph<T> = new Graph<T>(this.comparator);
        let nodes: Node<T>[] = [];

        let objectIterator = this.object.keys();
        let head = objectIterator.next();

        while (head.value) {
            nodes.push(graph.addNode(head.value, this.object.get(head.value)))
            head = objectIterator.next();
        }

        let last_node = nodes[0];
        for (let i = 1; i < nodes.length; i++) {
            let current = nodes[i];
            graph.addEdge(last_node.getKey(), current.getKey())
            last_node = current;
        }

        return graph;
    }

    generateRandomGraph(): Graph<T> {
        let graph: Graph<T> = new Graph<T>(this.comparator);
        let nodes: Node<T>[] = [];

        let objectIterator = this.object.keys();
        let head = objectIterator.next();

        while (head.value) {
            nodes.push(graph.addNode(head.value, this.object.get(head.value)))
            head = objectIterator.next();
        }


        for (let i = 0; i < nodes.length; i++) {
            let randNode = Math.floor(Math.random() * nodes.length);
            graph.addEdge(nodes[i].getKey(), nodes[randNode].getKey())
        }

        return graph;
    }

    generateGridGraph(n: number, m: number): Graph<T> {
        let graph: Graph<T> = new Graph<T>(this.comparator);
        let points: T[] = [];

        let objectIterator = this.object.keys();
        let head = objectIterator.next();

        while (head.value) {
            points.push(head.value);
            graph.addNode(head.value, this.object.get(head.value))
            head = objectIterator.next();
        }

        let grid: T[][] = listToNxMMatrix(points, n, m);

        for (let x = 0; x < grid.length; x++) {
            let edgeRight: boolean = grid[x + 1] !== undefined;
            let edgeLeft: boolean = grid[x - 1] !== undefined;
            for (let y = 0; y < grid[x].length; y++) {
                if (edgeRight) {
                    if (grid[x][y + 1]) graph.addEdge(grid[x][y], grid[x + 1][y + 1]);
                    if (grid[x][y - 1]) graph.addEdge(grid[x][y], grid[x + 1][y - 1]);
                    graph.addEdge(grid[x][y], grid[x + 1][y]);
                }

                if (edgeLeft) {
                    if (grid[x - 1][y - 1]) graph.addEdge(grid[x][y], grid[x - 1][y - 1]);
                    if (grid[x - 1][y + 1]) graph.addEdge(grid[x][y], grid[x - 1][y + 1]);
                    graph.addEdge(grid[x][y], grid[x - 1][y]);
                }

                if (grid[x][y + 1]) graph.addEdge(grid[x][y], grid[x][y + 1]);
                if (grid[x][y - 1]) graph.addEdge(grid[x][y], grid[x][y - 1]);
            }
        }

        return graph;
    }

    generateDiagonalGridGraph(n: number, m: number): Graph<T> {
        let graph: Graph<T> = new Graph<T>(this.comparator);
        let points: T[] = [];

        let objectIterator = this.object.keys();
        let head = objectIterator.next();

        while (head.value) {
            points.push(head.value);
            graph.addNode(head.value, this.object.get(head.value))
            head = objectIterator.next();
        }

        let grid: T[][] = listToNxMMatrix(points, n, m);

        for (let x = 0; x < grid.length; x++) {
            let edgeRight: boolean = grid[x + 1] !== undefined;
            let edgeLeft: boolean = grid[x - 1] !== undefined;
            for (let y = 0; y < grid[x].length; y++) {
                if (edgeRight) {
                    if (grid[x][y + 1]) graph.addEdge(grid[x][y], grid[x + 1][y + 1]);
                    if (grid[x][y - 1]) graph.addEdge(grid[x][y], grid[x + 1][y - 1]);
                }

                if (edgeLeft) {
                    if (grid[x - 1][y - 1]) graph.addEdge(grid[x][y], grid[x - 1][y - 1]);
                    if (grid[x - 1][y + 1]) graph.addEdge(grid[x][y], grid[x - 1][y + 1]);
                }

                if (grid[x][y + 1]) graph.addEdge(grid[x][y], grid[x][y + 1]);
                if (grid[x][y - 1]) graph.addEdge(grid[x][y], grid[x][y - 1]);
            }
        }

        return graph;
    }


    generateCustomGraph(map: Map<T, Node<T>>): Graph<T> {
        let graph: Graph<T> = new Graph(this.comparator);
        map.forEach(node => {
            graph.addNode(node.getKey(), node.getData());
        });

        return graph;
    }


    static pushToGraphInterval(currentGraph: Graph<any>, graphToPush: Graph<any>, interval: number) {
        let intervalCum = 0;
        currentGraph.getNodes().forEach(item => {

            setTimeout(() => {
                if (item.getAdjacent().length > 0) {
                    graphToPush.addNode(item.getKey(), item.getData())
                    graphToPush.addNode(item.getAdjacent()[0].getKey(), item.getAdjacent()[0].getData())
                    graphToPush.addEdge(item.getKey(), item.getAdjacent()[0].getKey());
                }
            }, intervalCum);

            intervalCum += interval;
        });
    }

    resetDijkstraNodes() {
        let iterator = this.object.entries();
        let head = iterator.next();

        while (head.value) {

            let data = head.value[1] as DjikstraNodeData;

            data.setIsPath(false);
            data.setIsTarget(false);
            data.setTentativeDistance(10000000000000);
            data.setVisited(false);

            head = iterator.next();
        }
    }
}
