(function (root) {
    var EMPTY = root.maze.EMPTY;
    var WALL = root.maze.WALL;

    /**
     * Граф
     * @constructor
     * @param {number[][]} nodes множество вершин графа представленное двумерной матрицей чисел
     * @param {number} m количество строк матрицы
     * @param {number} n количество столбцов матрицы
     */
    function Grid(nodes) {
        this.nodes = nodes;
        this.m = this.nodes.length;
        this.n = this.nodes[0].length;
    }

    /**
     * Функция возвращает значение вершины графа
     * @param {Node} node
     * @returns {number}
     */
    Grid.prototype.getNodeValue = function(node) {
        return this.nodes[node.y][node.x];
    };

    /**
     * Функция устанавливает новое значение вершины графа
     * @param {Node} node
     * @param {number} value
     */
    Grid.prototype.setNodeValue = function(node, value) {
        this.nodes[node.y][node.x] = value;
    };

    /**
     * Функция проверяет принадлежит ли данная вершина графу
     * @param {Node} node
     * @returns {boolean}
     */
    Grid.prototype.isExist = function(node) {
        return node.x >= 0 && node.x < this.n && node.y >= 0 && node.y < this.m;
    };

    /**
     * Функция проверяет не является ли данная вершина стеной
     * @param {Node} node
     * @returns {boolean}
     */
    Grid.prototype.isPassable = function(node) {
        return !(this.getNodeValue(node) === WALL);
    };

    /**
     * Функция проверяет посещалась ли ранее данная вершина
     * @param {Node} node
     * @returns {boolean}
     */
    Grid.prototype.isVisited = function(node) {
        return !(this.getNodeValue(node) === EMPTY);
    };

    /**
     * Функция возвращает массив соседних вершин
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

    root.Grid = Grid;

})(this);
