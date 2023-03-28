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

        let shortestPath: Map<number, DjikstraNodeData> = new Map();
        let nodes = graph.getNodes();
        let current = nodes.get(initialNodeKey);
        let targetNode = nodes.get(targetNodeKey);
        if (!current || !targetNode || current.getKey() === targetNodeKey) return graph;
        let currentData = current.getData() as DjikstraNodeData;

        outPath.set(initialNodeKey, current);
        currentData.setVisited(true);
        currentData.setIsPath(true);
        visited.set(current.getKey(), true);
        currentData.setTentativeDistance(0);
        pQ.insertWithPriority(current, 100);

        while (!pQ.isEmpty()) {
            current = pQ.pop();
            if (current === undefined || current.getKey() === targetNodeKey) break;

            visited.set(current.getKey(), true);
            currentData = current.getData();
            currentData.setVisited(true);
            
            current.getAdjacent()?.forEach(neighbour => {

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

        let pathGraph: Graph<number> = new Graph(numberComparator);
        let head = outPath.get(targetNodeKey);

        shortestPath.set(targetNodeKey, targetNode.getData());
        while (head) {
            head.getData().setIsPath(true);

            shortestPath.set(head.getKey(), head.getData());
            if (head.getKey() === initialNodeKey) break;
            head = outPath.get(head.getKey());
        }

        let graphFactory = new GraphFactory(numberComparator, shortestPath)
        pathGraph = graphFactory.generateLinearGraph();
        targetNode.getData().setIsTarget(true);

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
