(function (root) {
    var EMPTY = root.maze.EMPTY;
    var WALL = root.maze.WALL;
    var PATH = root.maze.PATH;
    var CURRENT = root.maze.CURRENT;
    var OPEN = root.maze.OPEN;
    var CLOSED = root.maze.CLOSED;

    /**
     * Создает HTML элемент заданного типа с заданным CSS классом
     *
     * @param {string} type тип создаваемого HTML элемента
     * @param {string} className CSS класс
     * @returns {HTMLElement} HTML элемент
     */
    function element(type, className) {
        var elem = document.createElement(type);
        elem.className = className;

        return elem;
    }

    /**
     * Определяет тип элемента соответствующий переданному значению
     *
     * @param {number} value
     * @returns {string} type
     */
    function defineType(value) {
        var type;

        switch (value) {
            case WALL:
                 type = 'wall';
                 break;
            case PATH:
                 type = 'path';
                 break;
            case CURRENT:
                 type = 'current';
                 break;
            case OPEN:
                 type = 'open';
                 break;
            case CLOSED:
                 type = 'closed';
                 break;
            default:
                 type = undefined;
        }

        return type;
    }

    /**
     * Создает визуализацию лабиринта по его схеме
     *
     * @param {number[][]} maze схема лабиринта
     * @returns {HTMLElement} HTML элемент
     */
    function render(maze) {
        var containerElem = element('div', 'maze'),
            rowElem,
            type,
            row,
            cell,
            x,
            y;

        for (y = 0; y < maze.length; y++) {
            row = maze[y];
            rowElem = element('div', 'maze__row');

            for (x = 0; x < row.length; x++) {
                cell = row[x];
                type = defineType(cell);
                rowElem.appendChild(
                    element('div', 'maze__cell' + (type ? ' maze__cell_' + type : ''))
                );
            }

            containerElem.appendChild(rowElem);
        }

        return containerElem;
    }

    /**
     * Создает визуализацию выполнения алгоритма поиска и найденного пути
     *
     * @param {Grid} граф представляющий лабиринт
     * @param {[number, number][]} path маршрут к выходу представленный списком пар координат
     */
    function visualize(grid, path) {
        var points = document.querySelectorAll('.maze__cell'),
            operations = grid.operations;

        function renderPath(path) {
            if (path && path.length) {
                var point,
                    pointElem,
                    type;

                for (var i = 0; i < path.length; i++) {
                    point = path[i];
                    pointElem = points[grid.n * point[1] + point[0]];
                    type = (i === (path.length - 1) ? defineType(CURRENT) : defineType(PATH));
                    pointElem.className = 'maze__cell' + (type ? ' maze__cell_' + type : '');
                }
            }
        }

        function drawStep() {
            var operation,
                pointElem,
                type;

                if (operations.length > 0) {
                    operation = operations.shift();
                    pointElem = points[grid.n * operation.y + operation.x];
                    type = defineType(operation.type);
                    pointElem.className = 'maze__cell' + (type ? ' maze__cell_' + type : '');
                    requestAnimationFrame(drawStep);
                } else {
                    renderPath(path);
                }
        }

        drawStep();
    }

    root.maze.render = render;
    root.maze.visualize = visualize;
})(this);
