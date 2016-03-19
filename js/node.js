(function (root) {
    /**
     * Вершина графа
     * @constructor
     * @param {number} x координата вершины по оси X
     * @param {number} y координата вершины по оси Y
     * @param {string} index индекс вершины
     * @param {Node} parent родительская вершина
     * @param {number} weight вес вершины
     * @param {number} g стоимость пути от начальной вершины до данной вершины
     * @param {number} h эвристическая оценка расстояния от данной вершины до конечной вершины
     *                 (расстояние Манхэттена)
     * @param {number} f значение эвристической функции f(x) = g(x) + h(x)
     */
    function Node(x, y) {
        this.x = x;
        this.y = y;
        this.index = this.x + '_' + this.y;
        this.parent = null;
        this.weight = 1;
        this.g = 0;
        this.h = 0;

        Object.defineProperty(this, 'f', {
            get: function() {
                return this.g + this.h;
            }
        })
    }

    /**
     * Проверяет является ли объект node обозначением той же вершины графа
     * @param {Node} node
     * @returns {boolean}
     */
    Node.prototype.isEqual = function(node) {
        return this.x === node.x && this.y === node.y;
    };

    root.Node = Node;

})(this);
