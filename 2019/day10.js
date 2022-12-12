var fs = require('fs');

var input = fs.readFileSync('./inputs/day10.txt').toString();

// var input = `.#..#
// .....
// #####
// ....#
// ...##`;

// var input = `.#....#####...#..
// ##...##.#####..##
// ##...#...#.#####.
// ..#.....x...###..
// ..#.#.....#....##`;

// var input = `.#..##.###...#######
// ##.############..##.
// .#.######.########.#
// .###.#######.####.#.
// #####.##.#.##.###.##
// ..#####..#.#########
// ####################
// #.####....###.#.#.##
// ##.#################
// #####.##.###..####..
// ..######..##.#######
// ####.##.####...##..#
// .#####..#.######.###
// ##...#.####x#####...
// #.##########.#######
// .####.#.###.###.#.##
// ....##.##.###..#####
// .#.#.###########.###
// #.#.#.#####.####.###
// ###.##.####.##.#..##`

/*

.#..#
.....
#####
....#
...##

*/

var values = input.split('\n');

var asteroids = [];

var station = [30, 34];
// var station = [11, 13];

var map = [];
for (var i = 0; i < values.length; i++) {
    map.push([]);
    for (var j = 0; j < values[i].length; j++) {
        map[i].push(values[i][j]);
        if (values[i][j] == '#') {
            var thisAsteroid = [j, i];
            if (station[0] == thisAsteroid[0] && station[1] == thisAsteroid[1]) {
                console.log('not adding')
                continue;
            }
            asteroids.push(thisAsteroid);
        }
    }
}

// console.log(asteroids);

var highest = 0;
var best = null;


console.log('START');
for (var asteroid of asteroids) {
    // console.log(asteroid);
    var seen = 0;
    for (var other of asteroids) {
        if (other === asteroid) continue;
        // console.log(asteroid);
        var diffX = other[0] - asteroid[0];
        var diffY = other[1] - asteroid[1];
        var diffHCF = hcf(diffX, diffY);

        // console.log(`HCF of ${diffX} and ${diffY} is ${diffHCF}`);

        var stepX = diffX / diffHCF;
        var stepY = diffY / diffHCF;

        var [x, y] = asteroid.slice();
        // var x = asteroid[0];
        // var y = asteroid[1];

        var blocked = false;

        for (var i = 0; i < diffHCF - 1; i++) {
            x += stepX;
            y += stepY;
            if (map[y][x] == '#') {
                blocked = true;

            } else {
            }
        }

        if (!blocked) {
            seen ++;
            // console.log('SEEN', asteroid, other);

        } else {
            // console.log('BLOCKED', asteroid, other);

        }
    }

    if (seen > highest) {
        highest = seen;
        best = asteroid;
    }
}

for (var asteroid of asteroids) {
    var angle = Math.atan2(asteroid[0] - station[0], -asteroid[1] + station[1]);
    if (angle < 0) angle += Math.PI * 2;
    asteroid.push(angle);
}

asteroids.sort((a, b) => {
    // if (a == station) return -Infinity;
    // if (b == station) return Infinity;
    // console.log(a, b);
    var angleD = a[2] - b[2];
    if (angleD != 0) return angleD;
    var aDiff = Math.abs(a[0] - station[0]) + Math.abs(a[1] - station[1]);
    var bDiff = Math.abs(b[0] - station[0]) + Math.abs(b[1] - station[1]);
    return aDiff - bDiff;
});


// console.log(asteroids);
var destroyed = [];
var counter = 0;
var last = [0,0,-999];
while (asteroids.length > 0) {
    // console.log(counter, asteroids.length);
    if (last[2] != asteroids[counter][2]) {
        last = asteroids[counter];
        destroyed.push(asteroids[counter]);
        asteroids.splice(counter, 1);
    } else {
        // console.log('argh');
        counter++;
    }
    // counter++;
    if (counter >= asteroids.length) {
        counter = 0;
        last = [0, 0, -999];
    }
}

console.log(destroyed[199]);

function hcf(x, y) {
    // console.log(x, y);
    if (x < 0) return hcf(-x, y);
    if (y < 0) return hcf(x, -y);
    if (x == 0) return y;
    if (y == 0) return x;
    if (x == y) return x;
    if (x < y) return hcf(x, y-x);
    return hcf(x-y, y);
}

a = asteroids.length;
// console.log(a);

// console.log(highest, best);