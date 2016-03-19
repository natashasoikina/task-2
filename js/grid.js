(function (root) {
    var EMPTY = root.maze.EMPTY;
    var WALL = root.maze.WALL;

    /**
     * Граф
     * @constructor
     * @param {number[][]} nodes множество вершин графа представленное двумерной матрицей чисел
     * @param {number} m количество строк матрицы
     * @param {number} n количество столбцов матрицы
     * @param {Object[]} operations совокупность шагов выполнения алгоритма
     */
    function Grid(nodes) {
        this.nodes = nodes;
        this.m = this.nodes.length;
        this.n = this.nodes[0].length;
        this.operations = [];
    }

    /**
     * Возвращает значение вершины графа
     * @param {Node} node
     * @returns {number}
     */
    Grid.prototype.getNodeValue = function(node) {
        return this.nodes[node.y][node.x];
    };

    /**
     * Устанавливает новое значение вершины графа
     * @param {Node} node
     * @param {number} value
     */
    Grid.prototype.setNodeValue = function(node, value) {
        this.nodes[node.y][node.x] = value;
    };

    /**
     * Проверяет принадлежит ли данная вершина графу
     * @param {Node} node
     * @returns {boolean}
     */
    Grid.prototype.isExist = function(node) {
        return node.x >= 0 && node.x < this.n && node.y >= 0 && node.y < this.m;
    };

    /**
     * Проверяет не является ли данная вершина стеной
     * @param {Node} node
     * @returns {boolean}
     */
    Grid.prototype.isPassable = function(node) {
        return !(this.getNodeValue(node) === WALL);
    };

    /**
     * Проверяет посещалась ли ранее данная вершина
     * @param {Node} node
     * @returns {boolean}
     */
    Grid.prototype.isVisited = function(node) {
        return !(this.getNodeValue(node) === EMPTY);
    };

    /**
     * Находит соседние вершины и возвращает их список
     * @param {Node} node
     * @returns {Object[]}
     */
    Grid.prototype.getNeighbors = function(node) {
        var directions = [[1, 0], [0, 1], [-1, 0], [0, -1]],
            direction,
            neighbors = [],
            neighbor;

        for (var i = 0; i < directions.length; i++) {
            direction = directions[i];
            neighbor = new Node(node.x + direction[0], node.y + direction[1]);

            if (this.isExist(neighbor) && this.isPassable(neighbor)) {
                neighbors.push(neighbor);
            }
        };

        return neighbors;
    };

    /**
     * Логирует шаги выполнения алгоритма
     * @param {Node} node
     * @param {number} type
     */
    Grid.prototype.logOperation = function(node, type) {
        this.operations.push({
            x: node.x,
            y: node.y,
            type: type
        });
    };

    root.Grid = Grid;

})(this);
