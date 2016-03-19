(function (root) {
    var OPEN = root.maze.OPEN;
    var CLOSED = root.maze.CLOSED;
    var Node = root.Node;
    var Grid = root.Grid;

    /**
     * Находит выход из лабиринта, удовлетворяющий условию y=M
     *
     * @param {Grid} grid граф представляющий лабиринт
     * @returns {Node} конечная вершина лабиринта
     */
    function findFinish(grid) {
        var y = grid.m - 1,
            node;

        for (var x = 0; x < grid.n; x++) {
            node = new Node(x, y);
            if (grid.isPassable(node)) {
                return node;
            }
        }
    }

    /**
     * Восстанавливает путь из конечной вершины лабиринта в начальную вершину
     *
     * @param {Node} node конечная вершина лабиринта
     * @returns {[number, number][]} маршрут к выходу представленный списком пар координат
     */
    function getPathTo(node) {
        var path = [];

        while (node) {
            path.push([node.x, node.y]);
            node = node.parent;
        }

        return path.reverse();
    };

    /**
     * Рассчитывает значение эвристики (расстояние Манхэттена)
     *
     * @param {Node} a рассматриваемая вершина лабиринта
     * @param {Node} b конечная вершина лабиринта
     * @returns {number} эвристическая оценка расстояния от рассматриваемой вершины до конечной вершины
     */
    function heuristic(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }

    /**
     * Функция находит путь к выходу и возвращает найденный маршрут
     * В качестве алгоритма поиска кратчайшего пути используется алгоритм А*
     *
     * @param {number[][]} maze карта лабиринта представленная двумерной матрицей чисел
     * @param {number} x координата точки старта по оси X
     * @param {number} y координата точки старта по оси Y
     * @returns {{grid: {Grid}, path: [number, number][]}}
     *          grid - граф представляющий лабиринт
     *          path - маршрут к выходу представленный списком пар координат
     */
    function solution(maze, x, y) {
        var grid = new Grid(maze),
            openList = new Heap(function(a, b) {
                return a.f - b.f;
            }),
            closedList = {},
            path = [],
            startNode,
            finishNode,
            currentNode,
            neighborNode,
            neighbors,
            cost,
            isVisited,
            time;

        time = performance.now();

        startNode = new Node(x, y);
        finishNode = findFinish(grid);
        startNode.h = heuristic(startNode, finishNode);
        openList.push(startNode);
        grid.logOperation(startNode, OPEN);

        while (!openList.empty()) {
            currentNode = openList.pop();
            closedList[currentNode.index] = currentNode;
            grid.logOperation(currentNode, CLOSED);

            if (currentNode.isEqual(finishNode)) {
                path = getPathTo(currentNode);
                break;
            }

            neighbors = grid.getNeighbors(currentNode);

            for (var i = 0; i < neighbors.length; i++) {
                neighborNode = neighbors[i];
                isVisited = grid.isVisited(neighborNode);
                cost = currentNode.g + neighborNode.weight;

                if (closedList[neighborNode.index] ||
                   (isVisited && cost >= grid.getNodeValue(neighborNode))) {
                    continue;
                }

                neighborNode.g = cost;
                grid.setNodeValue(neighborNode, cost);
                neighborNode.parent = currentNode;

                if (!isVisited) {
                    neighborNode.h = heuristic(neighborNode, finishNode);
                    openList.push(neighborNode);
                    grid.logOperation(neighborNode, OPEN);
                } else {
                    openList.updateItem(neighborNode);
                }
            };
        }

        time = performance.now() - time;

        console.log('length: ' + path.length + '\n' +
                    'time: ' + time.toFixed(4) + 'ms' + '\n' +
                    'operations: ' + grid.operations.length);

        return {
            grid: grid,
            path: path
        };
    }

    root.maze.solution = solution;
})(this);
