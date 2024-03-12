import { numberComparator } from "../helpers/comparators";
import { DjikstraNodeData } from "../helpers/djikstraNodeData";
import { Point } from "../helpers/point";
import { Graph, GraphFactory } from "./Graph";
import { Node } from "../helpers/node";
import { PriorityQueue } from "../helpers/priorityQueue";

export class Djikstra {

    static djikstraOffline(graph: Graph<number>, initialNodeKey: number, targetNodeKey: number): Graph<number> {
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

        //Get shortest Path
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

    static async djikstra(graph: Graph<number>, initialPoint: Point, targetPoint: Point, dimensionsX: number, dimensionsY: number): Promise<Graph<number>> {
        const postData = {
            rows: dimensionsX,
            columns: dimensionsY,
            startNode: `${initialPoint.getX()},${initialPoint.getY()}`,
            endNode: `${targetPoint.getX()},${targetPoint.getY()}`,
        };
    
        try {
            const response = await fetch(`https://p4n53o96di.execute-api.us-east-1.amazonaws.com/prod/shortestPath`, {
                signal: AbortSignal.timeout(512),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData)
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            
            const data = await response.text();
            
            let pathGraph: Graph<number> = new Graph<number>(numberComparator);
    
            let elements = data.substring(1, data.length - 1).split(",");
            let points: Point[] = [];
            for (let i = 0; i < elements.length; i += 2) {
                points.push(new Point(Number(elements[i]), Number(elements[i + 1])));
            }
    
            let shortestPath: Map<number, DjikstraNodeData> = new Map();
            points.forEach(point => {
                let node = graph.linearGraphdepthFirstPointSearch(point);
                if (node) shortestPath.set(node.getKey(), node.getData());
            });
    
            let graphFactory = new GraphFactory<number>(numberComparator, shortestPath);
            pathGraph = graphFactory.generateLinearGraph();
            return pathGraph;
        } catch (error) {
            throw new Error("Hermes Error");
        }
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

    
    toJson(graph: Graph<number>, initialNodeKey: number, targetNodeKey: number){
        
    }
}
