function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

function knightMoves(coor1, coor2) {
    // Create adjacency list to mimic the graph
    // each square is a node with coordinates and possible knight moves from its position
    // i = x coor and j = y coor
    class Vertex {
        constructor(coor, list) {
            this.coor = coor;
            this.list = list;
        }
    }

    let adjacencyList = [];
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            adjacencyList.push(new Vertex([i, j]));
        }
    }
    adjacencyList.forEach( (vertex) => {
        const possibleMoves = [];
        let i = vertex.coor[0];
        let j = vertex.coor[1];

        // Assign possible moves
        if (i + 2 <= 7 && i + 2 >= 0 &&
            j + 1 <= 7 && j + 1 >= 0
        ) possibleMoves.push([i+2, j+1]);
        if (i + 1 <= 7 && i + 1 >= 0 &&
            j + 2 <= 7 && j + 2 >= 0
        ) possibleMoves.push([i+1, j+2]);
        if (i + 2 <= 7 && i + 2 >= 0 &&
            j - 1 <= 7 && j - 1 >= 0
        ) possibleMoves.push([i+2, j-1]);
        if (i + 1 <= 7 && i + 1 >= 0 &&
            j - 2 <= 7 && j - 2 >= 0
        ) possibleMoves.push([i+1, j-2]);
        if (i - 1 <= 7 && i - 1 >= 0 &&
            j - 2 <= 7 && j - 2 >= 0
        ) possibleMoves.push([i-1, j-2]);
        if (i - 2 <= 7 && i - 2 >= 0 &&
            j - 1 <= 7 && j - 1 >= 0
        ) possibleMoves.push([i-2, j-1]);
        if (i - 2 <= 7 && i - 2 >= 0 &&
            j + 1 <= 7 && j + 1 >= 0
        ) possibleMoves.push([i-2, j+1]);
        if (i - 1 <= 7 && i - 1 >= 0 &&
            j + 2 <= 7 && j + 2 >= 0
        ) possibleMoves.push([i-1, j+2]);

        for (let coor of possibleMoves) {
            for (let v of adjacencyList) {
                if (v.coor == coor) {
                    vertex.list.push(v);
                    break;
                }
            }
        }
        vertex.list = possibleMoves;
    });


    // Create visited and predecessors list
    // Use BFS to traverse
    // Display output
    let start;
    for (let vertex of adjacencyList) {
        if (arraysAreEqual(vertex.coor, coor1)) {
            start = vertex;
            break;
        }
    }
    let queue = [start];
    let visited = { [start.coor]: true }
    let predecessor = {}

    if (arraysAreEqual(coor1, coor2)) return start.coor;

    while (queue.length > 0) {
        let curr = queue.shift();
        for (let neighbor of curr.list) {
            if (visited[neighbor]) continue;
            visited[neighbor] = true;
            if (arraysAreEqual(neighbor, coor2)) {
                let path = [neighbor];
                while (!arraysAreEqual(curr.coor, start.coor)) {
                    path.push(curr.coor);
                    for (let vertex of adjacencyList) {
                        if (arraysAreEqual(vertex.coor, predecessor[curr.coor])) {
                            curr = vertex;
                            break;
                        }
                    }
                }
                path.push(curr.coor);
                return path.toReversed();
            }
            predecessor[neighbor] = curr.coor;

            for (let vertex of adjacencyList) {
                if (arraysAreEqual(vertex.coor, neighbor)) {
                    queue.push(vertex);
                    break;
                }
            } 
        }
    }

}

let path = knightMoves([0,0], [7,7]);
console.log(`You made it in ${path.length - 1} moves! Here's your path:`)
for (let coor of path) console.log(coor);