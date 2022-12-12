const fs = require('fs');

var input = fs.readFileSync('./inputs/day20.txt').toString();

// input = `         A           
//          A           
//   #######.#########  
//   #######.........#  
//   #######.#######.#  
//   #######.#######.#  
//   #######.#######.#  
//   #####  B    ###.#  
// BC...##  C    ###.#  
//   ##.##       ###.#  
//   ##...DE  F  ###.#  
//   #####    G  ###.#  
//   #########.#####.#  
// DE..#######...###.#  
//   #.#########.###.#  
// FG..#########.....#  
//   ###########.#####  
//              Z       
//              Z       `;

// input = `                   A               
//                    A               
//   #################.#############  
//   #.#...#...................#.#.#  
//   #.#.#.###.###.###.#########.#.#  
//   #.#.#.......#...#.....#.#.#...#  
//   #.#########.###.#####.#.#.###.#  
//   #.............#.#.....#.......#  
//   ###.###########.###.#####.#.#.#  
//   #.....#        A   C    #.#.#.#  
//   #######        S   P    #####.#  
//   #.#...#                 #......VT
//   #.#.#.#                 #.#####  
//   #...#.#               YN....#.#  
//   #.###.#                 #####.#  
// DI....#.#                 #.....#  
//   #####.#                 #.###.#  
// ZZ......#               QG....#..AS
//   ###.###                 #######  
// JO..#.#.#                 #.....#  
//   #.#.#.#                 ###.#.#  
//   #...#..DI             BU....#..LF
//   #####.#                 #.#####  
// YN......#               VT..#....QG
//   #.###.#                 #.###.#  
//   #.#...#                 #.....#  
//   ###.###    J L     J    #.#.###  
//   #.....#    O F     P    #.#...#  
//   #.###.#####.#.#####.#####.###.#  
//   #...#.#.#...#.....#.....#.#...#  
//   #.#####.###.###.#.#.#########.#  
//   #...#.#.....#...#.#.#.#.....#.#  
//   #.###.#####.###.###.#.#.#######  
//   #.#.........#...#.............#  
//   #########.###.###.#############  
//            B   J   C               
//            U   P   P               `;

// input = `             Z L X W       C                 
//              Z P Q B       K                 
//   ###########.#.#.#.#######.###############  
//   #...#.......#.#.......#.#.......#.#.#...#  
//   ###.#.#.#.#.#.#.#.###.#.#.#######.#.#.###  
//   #.#...#.#.#...#.#.#...#...#...#.#.......#  
//   #.###.#######.###.###.#.###.###.#.#######  
//   #...#.......#.#...#...#.............#...#  
//   #.#########.#######.#.#######.#######.###  
//   #...#.#    F       R I       Z    #.#.#.#  
//   #.###.#    D       E C       H    #.#.#.#  
//   #.#...#                           #...#.#  
//   #.###.#                           #.###.#  
//   #.#....OA                       WB..#.#..ZH
//   #.###.#                           #.#.#.#  
// CJ......#                           #.....#  
//   #######                           #######  
//   #.#....CK                         #......IC
//   #.###.#                           #.###.#  
//   #.....#                           #...#.#  
//   ###.###                           #.#.#.#  
// XF....#.#                         RF..#.#.#  
//   #####.#                           #######  
//   #......CJ                       NM..#...#  
//   ###.#.#                           #.###.#  
// RE....#.#                           #......RF
//   ###.###        X   X       L      #.#.#.#  
//   #.....#        F   Q       P      #.#.#.#  
//   ###.###########.###.#######.#########.###  
//   #.....#...#.....#.......#...#.....#.#...#  
//   #####.#.###.#######.#######.###.###.#.#.#  
//   #.......#.......#.#.#.#.#...#...#...#.#.#  
//   #####.###.#####.#.#.#.#.###.###.#.###.###  
//   #.......#.....#.#...#...............#...#  
//   #############.#.#.###.###################  
//                A O F   N                     
//                A A D   M                     `;

/*
One shortest path through the maze is the following:

Walk from AA to XF (16 steps)
Recurse into level 1 through XF (1 step)
Walk from XF to CK (10 steps)
Recurse into level 2 through CK (1 step)
Walk from CK to ZH (14 steps)
Recurse into level 3 through ZH (1 step)
Walk from ZH to WB (10 steps)
Recurse into level 4 through WB (1 step)
Walk from WB to IC (10 steps)
Recurse into level 5 through IC (1 step)
Walk from IC to RF (10 steps)
Recurse into level 6 through RF (1 step)
Walk from RF to NM (8 steps)
Recurse into level 7 through NM (1 step)
Walk from NM to LP (12 steps)
Recurse into level 8 through LP (1 step)
Walk from LP to FD (24 steps)
Recurse into level 9 through FD (1 step)
Walk from FD to XQ (8 steps)
Recurse into level 10 through XQ (1 step)
Walk from XQ to WB (4 steps)
Return to level 9 through WB (1 step)
Walk from WB to ZH (10 steps)
Return to level 8 through ZH (1 step)
Walk from ZH to CK (14 steps)
Return to level 7 through CK (1 step)
Walk from CK to XF (10 steps)
Return to level 6 through XF (1 step)
Walk from XF to OA (14 steps)
Return to level 5 through OA (1 step)
Walk from OA to CJ (8 steps)
Return to level 4 through CJ (1 step)
Walk from CJ to RE (8 steps)
Return to level 3 through RE (1 step)
Walk from RE to IC (4 steps)
Recurse into level 4 through IC (1 step)
Walk from IC to RF (10 steps)
Recurse into level 5 through RF (1 step)
Walk from RF to NM (8 steps)
Recurse into level 6 through NM (1 step)
Walk from NM to LP (12 steps)
Recurse into level 7 through LP (1 step)
Walk from LP to FD (24 steps)
Recurse into level 8 through FD (1 step)
Walk from FD to XQ (8 steps)
Recurse into level 9 through XQ (1 step)
Walk from XQ to WB (4 steps)
Return to level 8 through WB (1 step)
Walk from WB to ZH (10 steps)
Return to level 7 through ZH (1 step)
Walk from ZH to CK (14 steps)
Return to level 6 through CK (1 step)
Walk from CK to XF (10 steps)
Return to level 5 through XF (1 step)
Walk from XF to OA (14 steps)
Return to level 4 through OA (1 step)
Walk from OA to CJ (8 steps)
Return to level 3 through CJ (1 step)
Walk from CJ to RE (8 steps)
Return to level 2 through RE (1 step)
Walk from RE to XQ (14 steps)
Return to level 1 through XQ (1 step)
Walk from XQ to FD (8 steps)
Return to level 0 through FD (1 step)
Walk from FD to ZZ (18 steps)
This path takes a total of 396 steps to move from AA at the outermost layer to ZZ at the outermost layer.
*/

input = input.split('\n');

var grid = [];
var portals = {};

class PathMap {
    constructor(y, x, initial) {
        this.grid = [];
        this.gridup = [];
        this.initial = initial;
        for (var i = 0; i < y; i++) {
            var row = [];
            var rowup = [];
            for (var j = 0; j < x; j++) {
                row.push(initial);
                rowup.push(initial);
                // row.push({});
            }
            this.grid.push(row);
            this.gridup.push(rowup);
        }
    }

    set(pos, value) {
        // this.grid[pos.y][pos.x][pos.z] = value;
        if (pos.z == 0) {
            this.grid[pos.y][pos.x] = value;
        } else {
            this.gridup[pos.y][pos.x] = value;
        }
    }

    get(pos) {
        if (pos.z == 0) return this.grid[pos.y][pos.x];
        return this.gridup[pos.y][pos.x];
        // if (this.grid[pos.y][pos.x][pos.z] === undefined) return this.initial;
        // return this.grid[pos.y][pos.x][pos.z];
    }
}

for (var y = 0; y < input.length; y++) {
    var row = [];
    for (var x = 0; x < input[y].length; x++) {
        row.push(input[y][x]);
    }
    grid.push(row);
}

for (var y = 0; y < grid.length; y++) {
    for (var x = 0; x < grid[y].length; x++) {
        if (grid[y][x] >= 'A' && grid[y][x] <= 'Z') {
            var portal = getPortal(x, y);
            if (!portal) continue;

            var name = portal.name;
            if (portals[name]) {
                portals[name].push(portal.pos);
            } else {
                portals[name] = [portal.pos];
            }
            // if (name[0] > name[1]) name = name[1] + name[0];
            // var revName = name[1] + name[0];
            // if (!portals[name]) {
            //     portals[name] = portal.pos;
            // } else if (!portals[revName] && (portal.pos.x != portals[name].x || portal.pos.y != portals[name].y)) {
            //     portals[revName] = portal.pos;
            // }
        }
    }
}

function getPortal(x, y) {
    var one = grid[y][x];
    var two, pos;
    if (x < grid[0].length - 1 && grid[y][x+1] >= 'A' && grid[y][x+1] <= 'Z') {
        two = grid[y][x+1];
        if (x > 0 && grid[y][x-1] == '.') {
            pos = { x: x-1, y: y };
        } else if (x < grid[0].length - 2 && grid[y][x+2] == '.') {
            pos = { x: x+2, y: y };
        }
    } else if (y < grid.length - 1 && grid[y+1][x] >= 'A' && grid[y+1][x] <= 'Z') {
        two = grid[y+1][x];
        if (y > 0 && grid[y-1][x] == '.') {
            pos = { x: x, y: y-1 };
        } else if (y < grid.length - 2 && grid[y+2][x] == '.') {
            pos = { x: x, y: y+2 };
        }
    }
    if (pos) {
        pos.z = 0;
        // console.log(one+two, Math.pow(pos.x - grid[0].length / 2, 2) + Math.pow(pos.y - grid.length / 2, 2))
        console.log(isInner(pos), pos, one+two)
        return {
            name: one + two,
            pos: pos
        };
    }
    return null;
}

function getaPortal(x, y) {
    var one = grid[y][x];
    var two, otherpos;
    if (y < grid.length - 1 && grid[y+1][x] >= 'A' && grid[y+1][x] <= 'Z') {
        two = grid[y+1][x];
        otherpos = { x: x, y: y+1 };
    } else if (y > 0 && grid[y-1][x] >= 'A' && grid[y-1][x] <= 'Z') {
        two = grid[y-1][x];
        otherpos = { x: x, y: y-1 };
    } else if (x < grid[0].length && grid[y][x+1] >= 'A' && grid[y][x+1] <= 'Z') {
        two = grid[y][x+1];
        otherpos = { x: x+1, y: y };
    } else if (x > 0 && grid[y][x-1] >= 'A' && grid[y][x-1] <= 'Z') {
        two = grid[y][x-1];
        otherpos = { x: x-1, y: y };
    } else console.log(x, y);
    return {
        name: one + two,
        pos: getPortalPos({ x, y }, otherpos)
    }
}

function getPortalPos(onePos, twoPos) {
    if (onePos.x == twoPos.x) {
        if (onePos.y > twoPos.y) {
            if (onePos.y < grid.length - 1 && grid[onePos.y + 1][onePos.x] == '.') return { x: onePos.x, y: onePos.y + 1 };
            if (twoPos.y > 0 && grid[twoPos.y - 1][onePos.x] == '.') return { x: onePos.x, y: twoPos.y - 1 };
        } else {
            if (twoPos.y < grid.length - 1 && grid[twoPos.y + 1][onePos.x] == '.') return { x: onePos.x, y: twoPos.y + 1 };
            if (twoPos.y > 0 && grid[onePos.y - 1][onePos.x] == '.') return { x: onePos.x, y: onePos.y - 1 };
        }
    } else {
        if (onePos.x > twoPos.x) {
            if (onePos.x < grid[0].length - 1 && grid[onePos.y][onePos.x + 1] == '.') return { x: onePos.x + 1, y: onePos.y };
            if (twoPos.x > 0 && grid[onePos.y][twoPos.x - 1] == '.') return { x: twoPos.x - 1, y: onePos.y };
        } else {
            if (twoPos.x < grid[0].length - 1 && grid[onePos.y][twoPos.x + 1] == '.') return { x: twoPos.x + 1, y: onePos.y };
            if (onePos.x > 0 && grid[onePos.y][onePos.x - 1] == '.') return { x: onePos.x - 1, y: onePos.y };
        }
    }
    console.log('big mistake');
}

function isInner(pos) {
    return pos.x > 2 && pos.x <= grid[0].length - 2 && pos.y > 2 && pos.y <= grid.length - 2;
    // return Math.pow(pos.x - grid[0].length / 2, 2) + Math.pow(pos.y - grid.length / 2, 2) < 2000;
}

console.log(portals);


function reconstructPath(cameFrom, goal) {
    var path = [];
    while (goal) {
        path.push(goal);
        goal = cameFrom.get(goal);
    }
    return path;
}

function getPath(start, target) {
    var current;
    queue = [start];
    var cameFrom = new PathMap(grid.length, grid[0].length, null);
    var bestRoute = new PathMap(grid.length, grid[0].length, Infinity);
    var bestOverall = new PathMap(grid.length, grid[0].length, Infinity);

    bestRoute.set(start, 0);
    bestOverall.set(start, manhattan(start, target));

    while (queue.length > 0) {
        queue.sort((a,b) => bestOverall.get(a) - bestOverall.get(b));
        current = queue.shift();
        console.log(current);


        if (manhattan(current, target) == 0) {
            return reconstructPath(cameFrom, current);
        }

        var neighbours = getNeighbours(current);

        for (var n of neighbours) {
            var route = bestRoute.get(current) + 1;
            if (route < bestRoute.get(n)) {
                cameFrom.set(n, current);
                bestRoute.set(n, route);
                bestOverall.set(n, route + manhattan(n, target));
                if (!queue.find(a => a.x == n.x && a.y == n.y)) {
                    queue.push(n);
                }
            }
        }

    }

    console.log('oh no');

    return false;
    
}

function manhattan(a, b) {
    // return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    if ((Math.abs(a.x - b.x) + Math.abs(a.y - b.y) == 0) && a.z == b.z) return 0;
    return 1;
}

function getNeighbours(a) {
    var n = [];
    var potential = [{ x: a.x-1, y: a.y }, { x: a.x+1, y: a.y }, { x: a.x, y: a.y-1 }, { x: a.x, y: a.y+1 }];
    for (var b of potential) {
        if (b.x >= 0 && b.x < grid[0].length && b.y >= 0 && b.y < grid.length) {
            b.z = a.z;
            if (grid[b.y][b.x] == '.') n.push(b);
        }
    }
    for (var portal in portals) {
        if (portals[portal].length > 1) {
            var p;
            if ((a.x == portals[portal][0].x) && (a.y == portals[portal][0].y)) {
                p = portals[portal][1];
                // n.push(portals[portal][1]);
                // return n;
            }
            if ((a.x == portals[portal][1].x) && (a.y == portals[portal][1].y)) {
                // console.log(portals[portal][0]);
                // console.log('hi')
                p = portals[portal][0];
                // n.push(portals[portal][0]);
                // return n;
            }
            if (p) {
                
                var toAdd = {x: p.x, y: p.y, z: p.z}

                var inner = isInner(a);
                if (inner && a.z < 50) {
                    toAdd.z = a.z + 1;
                    console.log('add', toAdd, portal);

                    n.push(toAdd);
                    return n;
                } else if (!inner && a.z > 0) {
                    toAdd.z = a.z - 1;
                    console.log('add', toAdd, portal);

                    n.push(toAdd);
                    return n;
                }
            }
        }
    }
    return n;
}

var path = getPath(portals['AA'][0], portals['ZZ'][0]);

for (var p of path) {
    grid[p.y][p.x] = '@';
}

drawGrid();

function drawGrid() {
    for (var row of grid) {
        var string = '';
        for (var char of row) {
            string += char;
        }
        // console.log(string);
    }
}

console.log(path);
console.log(path.length - 1);