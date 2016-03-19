(function (root) {
    var map = root.maze.MAZE_Y;
    var result = root.maze.solution(map, 1, 0);

    document.querySelector('.outer').appendChild(
        root.maze.render(map)
    );

    root.maze.visualize(result.grid, result.path);

})(this);
