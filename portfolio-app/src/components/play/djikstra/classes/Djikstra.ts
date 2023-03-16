import { DjikstraNodeData } from "../helpers/djikstraNodeData";
import { Node } from "../helpers/node";
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
                    console.log(newcost, `(${current?.getKey()}, ${neighbour.getKey()})`);
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

        console.log(outPath)
        let shortestPath : Map<Number, Node<number>> = new Map();
        let head = outPath.get(targetNodeKey)

        while(head && head.getKey() !== initialNodeKey){
            head.getData().setIsPath(true);

            shortestPath.set(head.getKey(), head);
            head = outPath.get(head.getKey())
        }

        let pathGraph: Graph<number> = new Graph(graph.comparator);
        let graphFactory = new GraphFactory(graph.comparator, outPath)
        pathGraph = graphFactory.generateLinearGraph();
        let targetNode = nodes.get(targetNodeKey);
        if(targetNode) targetNode.getData().setIsTarget(true);
        return pathGraph;
    }
}

