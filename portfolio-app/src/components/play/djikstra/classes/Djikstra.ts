import { numberComparator } from "../helpers/comparators";
import { DjikstraNodeData } from "../helpers/djikstraNodeData";
import { Node } from "../helpers/node";
import { Point } from "../helpers/point";
import { PriorityQueue } from "../helpers/priorityQueue";
import { Graph, GraphFactory } from "./Graph";

export class Djikstra {

    static djikstra(graph: Graph<number>, initialNodeKey: number, targetNodeKey: number): Graph<number> {
        let visited: Map<number, boolean> = new Map();
        let pQ = new PriorityQueue<Node<number>>();
        let outPath: Map<number, Node<number>> = new Map();

        let nodes = graph.getNodes();
        let current = nodes.get(initialNodeKey);
        if (current === undefined) return graph;
        outPath.set(initialNodeKey, current);

        let currentData = current.getData() as DjikstraNodeData;

        currentData.setVisited(true);
        currentData.setIsPath(true);
        visited.set(current.getKey(), true);

        currentData.setTentativeDistance(0);
        pQ.insertWithPriority(current, 100);
        while (!pQ.isEmpty()) {
            current = pQ.pop();
            if (current === undefined) break;

            visited.set(current.getKey(), true);
            currentData = current.getData();
            currentData.setVisited(true);
            let neighbours = current.getAdjacent();

            neighbours?.forEach(neighbour => {

                if (!visited.has(neighbour.getKey())) {
                    let nData = neighbour.getData() as DjikstraNodeData;
                    let nCost = nData.getCost();
                    let newcost = nCost + currentData.getTentativeDistance();
                    if (newcost < nData.getTentativeDistance()) {
                        nData.setTentativeDistance(newcost);
                        if (current) {
                            outPath.set(neighbour.getKey(), current)
                        }
                    }

                    pQ.insertWithPriority(neighbour, newcost);
                }
            });
        }

        let shortestPath: Map<number, Node<number>> = new Map();
        let head = outPath.get(targetNodeKey)

        while (head && head.getKey() !== initialNodeKey) {
            head.getData().setIsPath(true);

            shortestPath.set(head.getKey(), head);
            head = outPath.get(head.getKey())
        }

        let pathGraph: Graph<number> = new Graph(numberComparator);
        let graphFactory = new GraphFactory(numberComparator, shortestPath)
        pathGraph = graphFactory.generateLinearGraph();
        let targetNode = nodes.get(targetNodeKey);
        if (targetNode) targetNode.getData().setIsTarget(true);
        return pathGraph;
    }

    static generateGenericNodeListSingleValue(n: number, m: number): Map<number, DjikstraNodeData> {

        let pointMap: Map<number, DjikstraNodeData> = new Map();
        let index = 1;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                let point = new Point(i, j);
                let key = index++;
                let data = new DjikstraNodeData(1, point);

                pointMap.set(key, data);
            }
        }

        return pointMap;
    }
}

