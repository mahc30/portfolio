import { DjikstraNodeData } from "../helpers/djikstraNodeData";
import { Node } from "../helpers/node";
import { PriorityQueue } from "../helpers/priorityQueue";
import { Graph } from "./Graph";

export class Djikstra {

    static djikstra(graph: Graph<number>, initialNodeKey: number, targetNodeKey: number): Map<number, Node<number>> {
        let visited: Map<number, boolean> = new Map();
        let path: Map<number, Node<number>> = new Map();
        let pQ = new PriorityQueue<Node<number>>();

        let nodes = graph.getNodes();
        let current = nodes.get(initialNodeKey);
        if(current === undefined) return path;

        let currentData = current?.getData() as DjikstraNodeData;
        currentData.setVisited(true);
        visited.set(current.getKey(), true);

        currentData.setTentativeDistance(0);
        pQ.insertWithPriority(current, 100);
        while (!pQ.isEmpty()) {
            let lowestDistanceNeighbor = pQ.pop();
            if(lowestDistanceNeighbor === undefined) return path;
            current = nodes.get(lowestDistanceNeighbor.getKey());
            currentData = current?.getData();

            let neighbours = current?.getAdjacent();

            neighbours?.forEach(neighbour => {

                if (!visited.has(neighbour.getKey())) {
                    let nData = neighbour.getData() as DjikstraNodeData;
                    let nCost = nData.getCost();

                    let newcost = nCost + currentData.getTentativeDistance();
                    if (newcost < nData.getTentativeDistance()) nData.setTentativeDistance(newcost);
                    
                    pQ.insertWithPriority(neighbour, 0);
                    
                    visited.set(neighbour.getKey(), true);
                    nData.setVisited(true);
                    if(visited.has(targetNodeKey)) console.log("End")
                }
            });
        }

        return path;
    }
}

