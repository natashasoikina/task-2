(function (root) {
    var Node = root.Node;
    var Grid = root.Grid;

    /**
     * Функция находит выход из лабиринта, удовлетворяющий условию y=M
     *
     * @param {number[][]} maze карта лабиринта представленная двумерной матрицей чисел
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
     * Функция восстанавливает путь из конечной вершины лабиринта в начальную вершину
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
     * Функция рассчитывает значение эвристики (расстояние Манхэттена)
     *
     * @param {Node} a рассматриваемая вершина лабиринта
     * @param {Node} b конечная вершина лабиринта
     * @returns {number} значение эвристической функции
     */
    function heuristic(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }

    /**
     * Функция находит путь к выходу и возвращает найденный маршрут
     *
     * @param {number[][]} maze карта лабиринта представленная двумерной матрицей чисел
     * @param {number} x координата точки старта по оси X
     * @param {number} y координата точки старта по оси Y
     * @returns {[number, number][]} маршрут к выходу представленный списком пар координат
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
            isVisited;

        startNode = new Node(x, y);
        finishNode = findFinish(grid);
        startNode.h = heuristic(startNode, finishNode);
        openList.push(startNode);

        while (!openList.empty()) {
            currentNode = openList.pop();
            closedList[currentNode.index] = currentNode;

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
                } else {
                    openList.updateItem(neighborNode);
                }
            };
        }

        return path;
    }

    root.maze.solution = solution;
})(this);
