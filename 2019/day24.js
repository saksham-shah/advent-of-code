const fs = require('fs');

Array.prototype.clone = function() {
    var a = [];
    for (var i = 0; i < this.length; i++) {
        if (this[i] instanceof Array) {
            a.push(this[i].clone());
        } else {
            a.push(this[i]);
        }
    }
    return a;
}

var inp = fs.readFileSync('./inputs/day24.txt').toString();

// inp = `....#
// #..#.
// #..##
// ..#..
// #....`;

inp = inp.split('\n');

var grid = [];
for (var i = 0; i < inp.length; i++) {
    var row = [];
    for (var j = 0; j < inp[i].length; j++) {
        row.push(inp[i][j] == '#' ? 1 : 0);
    }
    grid.push(row);
}

function step(g) {
    var newGrid = [];
    for (var i = 0; i < g.length; i++) {
        var newRow = [];
        for (var j = 0; j < g[i].length; j++) {
            var neighbours = 0;
            if (i > 0) neighbours += g[i-1][j];
            if (j > 0) neighbours += g[i][j-1];
            if (i < g.length - 1) neighbours += g[i+1][j];
            if (j < g[i].length - 1) neighbours += g[i][j+1];

            if (g[i][j]) {
                newRow.push(neighbours == 1 ? 1 : 0);
            } else {
                newRow.push(neighbours == 1 || neighbours == 2 ? 1 : 0);
            }
        }
        newGrid.push(newRow);
    }
    return newGrid;
}

function biodiversity(g) {
    var weight = 1;
    var total = 0;
    for (var i = 0; i < g.length; i++) {
        for (var j = 0; j < g[i].length; j++) {
            if (g[i][j]) total += weight;
            weight *= 2;
        }
    }
    return total;
}

class BigGrid {
    constructor(initial) {
        this.levels = new Map();
        this.setLevel(0, initial);
    }

    step() {
        var nextGrid = new BigGrid();
        var max = 0;
        var min = 0;
        for (var [level, g] of this.levels.entries()) {
            var newGrid = [];
            for (var i = 0; i < g.length; i++) {
                var newRow = [];
                for (var j = 0; j < g[i].length; j++) {
                    if (i == 2 && j == 2) {
                        newRow.push(0);
                        continue;
                    }
                    var neighbours = this.getNeighbours(i, j, level);

                    if (g[i][j]) {
                        newRow.push(neighbours == 1 ? 1 : 0);
                    } else {
                        newRow.push(neighbours == 1 || neighbours == 2 ? 1 : 0);
                    }
                }
                newGrid.push(newRow);
            }
            nextGrid.setLevel(level, newGrid);
            if (level > max) max = level;
            if (level < min) min = level;
        }
        for (var level of [max+1, min-1]) {
            var newGrid = [];
            for (var i = 0; i < 5; i++) {
                var newRow = [];
                for (var j = 0; j < 5; j++) {
                    if (i == 2 && j == 2) {
                        newRow.push(0);
                        continue;
                    }

                    var neighbours = this.getNeighbours(i, j, level);

                    newRow.push(neighbours == 1 || neighbours == 2 ? 1 : 0);
                }
                newGrid.push(newRow);
            }
            nextGrid.setLevel(level, newGrid);
        }
        return nextGrid;
    }

    getNeighbours(i, j, level) {
        var n = 0;
        var thisLevel = this.getLevel(level);
        var outerLevel = this.getLevel(level - 1);
        var innerLevel = this.getLevel(level + 1);
        var total = 0;
        if (i == 0) {
            if (outerLevel) total += outerLevel[1][2];
        } else if (i == 3 && j == 2) {
            if (innerLevel) {
                for (var k = 0; k < 5; k++) {
                    total += innerLevel[4][k];
                }
            }
        } else if (thisLevel) total += thisLevel[i-1][j];
        if (j == 0) {
            if (outerLevel) total += outerLevel[2][1];
        } else if (j == 3 && i == 2) {
            if (innerLevel) {
                for (var k = 0; k < 5; k++) {
                    total += innerLevel[k][4];
                }
            }
        } else if (thisLevel) total += thisLevel[i][j-1];
        if (i == 4) {
            if (outerLevel) total += outerLevel[3][2];
        } else if (i == 1 && j == 2) {
            if (innerLevel) {
                for (var k = 0; k < 5; k++) {
                    total += innerLevel[0][k];
                }
            }
        } else if (thisLevel) total += thisLevel[i+1][j];
        if (j == 4) {
            if (outerLevel) total += outerLevel[2][3];
        } else if (j == 1 && i == 2) {
            if (innerLevel) {
                for (var k = 0; k < 5; k++) {
                    total += innerLevel[k][0];
                }
            }
        } else if (thisLevel) total += thisLevel[i][j+1];

        // console.log(i, j, total);
        
        return total;
    }

    getLevel(num) {
        if (!this.levels.has(num)) return null;
        return this.levels.get(num);
    }

    setLevel(num, grid) {
        this.levels.set(num, grid);
    }

    countBugs() {
        var total = 0;
        // console.log(this.levels.keys());
        for (var g of this.levels.values()) {
            // console.log(g);
            for (var i = 0; i < 5; i++) {
                for (var j = 0; j < 5; j++) {
                    total += g[i][j];
                    // console.log(i, j, g[i][j]);
                }
            }
        }
        return total;
    }
}

var test = new BigGrid(grid);

for (var i = 0; i < 200; i++) {
    test = test.step();

}

console.log(test.countBugs());

// var going = true;
// var ratings = [];

// while (going) {
//     var bio = biodiversity(grid);
//     if (ratings.includes(bio)) {
//         going = false;
//         console.log(bio);
//     } else {
//         ratings.push(biodiversity(grid));
//     }
//     grid = step(grid);
    
// }