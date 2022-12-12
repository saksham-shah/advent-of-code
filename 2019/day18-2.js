const fs = require('fs');

var input = fs.readFileSync('./inputs/day18.txt').toString().split('\n');

// input = `#############
// #g#f.D#..h#l#
// #F###e#E###.#
// #dCba1#4BcIJ#
// #############
// #nK.L2#3G...#
// #M###N#H###.#
// #o#m..#i#jk.#
// #############`.split('\n');

// input = `#############
// #DcBa.#.GhKl#
// #.###1#2#I###
// #e#d#####j#k#
// ###C#4#3###J#
// #fEbA.#.FgHi#
// #############`.split('\n');

var grid = [];
var keys = {};
var doors = {};
var bots = {};
var numKeys = 0;

for (var y = 0; y < input.length; y++) {
    var row = [];
    for (var x = 0; x < input[y].length; x++) {
        row.push(input[y][x]);
        if (input[y][x] >= '1' && input[y][x] <= '4') {
            bots[input[y][x]] = { x, y }
        } else if (input[y][x] >= 'a' && input[y][x] <= 'z') {
            keys[input[y][x]] = { x, y }
            numKeys++;
        } else if (input[y][x] >= 'A' && input[y][x] <= 'Z') {
            doors[input[y][x].toLowerCase()] = { x, y }
        }
    }
    grid.push(row);
}


class PathMap {
    constructor(y, x, initial) {
        this.grid = [];
        for (var i = 0; i < y; i++) {
            var row = [];
            for (var j = 0; j < x; j++) {
                row.push(initial);
            }
            this.grid.push(row);
        }
    }

    set(pos, value) {
        this.grid[pos.y][pos.x] = value;
    }

    get(pos) {
        return this.grid[pos.y][pos.x];
    }
}

// console.log(checkPath(main, keys['p']));

// console.log(keys);

// console.log(bestWay(0, main, []));

var pathDict = {
    '1': {},
    '2': {},
    '3': {},
    '4': {}
};

for (var key in keys) {
    pathDict[key] = {};
    for (var bot in bots) {
        var path = checkPath(bots[bot], keys[key]);
        if (path) pathDict[bot][key] = path;
    }
    // var path = checkPath(main, keys[key]);
    // pathDict['@'][key] = path;
    for (var other in keys) {
        if (key != other) {
            var path = checkPath(keys[key], keys[other]);
            if (path) pathDict[key][other] = path;
        }
    }
    // console.log(key, path.steps, path.doors);
}

// console.log(pathDict);

class State {
    constructor(current, keys) {
        this.current = current.slice();
        this.current.sort();
        this.keys = keys.slice();
        this.keys.sort();
    }

    isEqualTo(state) {
        for (var i = 0; i < this.current.length; i++) {
            if (this.current[i] != state.current[i]) return false;
        }
        if (state.keys.length != this.keys.length) return false;
        for (var i = 0; i < this.keys.length; i++) {
            if (this.keys[i] != state.keys[i]) return false;
        }
        // console.log('hi');
        return true;
    }

    getScore(states) {
        for (var state of states.keys()) {
            if (this.isEqualTo(state)) {
                return states.get(state);
            }
        }
        return -1;
    }

    addToDict(states, score) {
        states.set(this, score);
    }
}

states = new Map();

// var x = new State('p', ['a','b','p','q']);
// var y = new State('p', ['b','a','p','q']);

// console.log(x.isEqualTo(y));

console.log(steps(['1', '2', '3', '4'], []));


function steps(currentKeys, keysCollected) {

    var minimum = Infinity;

    // console.log(`Calculating score for state: current = ${currentKey}, keys = ${keysCollected}`)

    var thisState = new State(currentKeys, keysCollected);
    var score = thisState.getScore(states);
    if (score > -1) {
        return score;
    };

    for (var i = 0; i < currentKeys.length; i++) {
        var currentKey = currentKeys[i];
        var copyCurrent = currentKeys.slice()
        copyCurrent.splice(i, 1);
        for (var nextKey in pathDict[currentKey]) {
            if (keysCollected.includes(nextKey)) continue;
            var thisPath = pathDict[currentKey][nextKey];
            var possible = true;
            var copyKeys = keysCollected.slice();
            var newCurrent = copyCurrent.slice();
            copyKeys.push(nextKey);
            newCurrent.push(nextKey)
            for (var keyNeeded of thisPath.doors) {
                if (!copyKeys.includes(keyNeeded.toLowerCase())) {
                    possible = false;
                }
            }
            if (!possible) continue;
            var stepsForThis = steps(newCurrent, copyKeys) + thisPath.steps;
            if (stepsForThis < minimum) {
                minimum = stepsForThis;
            }
        }
    }
    

    if (minimum == Infinity) {
        score = 0;
    } else {
        score = minimum;
    }

    thisState.addToDict(states, score);

    return score;
}



function bestWay(stepsSoFar, keysCollected) {
    // Recursion end condition
    if (keysCollected.length == numKeys) return stepsSoFar;

    var possibleNext = {};

    for (var key in keys) {
        // Only check a key if you don't already have it
        if (!keysCollected.includes(key)) {
            // checkPath returns the length of the path, keys collected and doors passed on the way
            // var thisPath = checkPath(pos, keys[key]);
            var pos = keysCollected.length > 0 ? keysCollected[keysCollected.length - 1] : '@';
            var thisPath = pathDict[pos][key];

            // Boolean flag to see if the path is doable with the keys you have right now
            var possible = true;
            var copyKeys = keysCollected.slice();

            for (var keysGot of thisPath.keys) {
                // Add any new keys to the array
                if (!copyKeys.includes(keysGot)) copyKeys.push(keysGot);
            }
            for (var keyNeeded of thisPath.doors) {
                if (!copyKeys.includes(keyNeeded.toLowerCase())) {
                    // If a locked door is found, this path is not possible
                    possible = false;
                }
            }
            if (possible) {
                // If the path is possible, do recursion stuff
                possibleNext[key] = bestWay(stepsSoFar + thisPath.steps, copyKeys);
            }
        }
    }

    // Return the shortest path
    var bestScore = Infinity;
    for (var next in possibleNext) {
        if (possibleNext[next] < bestScore) {
            best = next;
            bestScore = possibleNext[next];
        }
    }
    return bestScore;
}

function checkPath(start, end) {
    var keys = [];
    var doors = [];
    // console.log(start, end);
    var path = getPath(start, end);
    if (!path) return false;
    for (var cell of path) {
        var gridCell = grid[cell.y][cell.x];
        if (gridCell >= 'a' && gridCell <= 'z') {
            keys.push(gridCell);
        } else if (gridCell >= 'A' && gridCell <= 'Z') {
            doors.push(gridCell);
        }
    }
    return { steps: path.length - 1, keys, doors };
}

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
                    // console.log(current, n);
                }
            }
        }

    }

    // console.log('oh no');

    return false;
    
}

function manhattan(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function getNeighbours(a) {
    var n = [];
    var potential = [{ x: a.x-1, y: a.y }, { x: a.x+1, y: a.y }, { x: a.x, y: a.y-1 }, { x: a.x, y: a.y+1 }];
    for (var b of potential) {
        if (b.x >= 0 && b.x < grid[0].length && b.y >= 0 && b.y < grid.length) {
            if (grid[b.y][b.x] != '#') n.push(b);
        }
    }
    return n;
}

// console.log(main);