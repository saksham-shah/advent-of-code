var fs = require('fs');

var input = fs.readFileSync('./inputs/day6.txt').toString();

// var input = `COM)B
// B)C
// C)D
// D)E
// E)F
// B)G
// G)H
// D)I
// E)J
// J)K
// K)L`;

// var input = `COM)B
// B)C
// C)D
// D)E
// E)F
// B)G
// G)H
// D)I
// E)J
// J)K
// K)L
// K)YOU
// I)SAN`;

var orbits = input.split('\n');

var objects = {}

for (var orbit of orbits) {
    var [orbiting, orbiter] = orbit.split(')');

    objects[orbiter] = orbiting;
}

function countOrbits(objName) {
    var orbits = objects[objName];
    if (orbits == 'COM') return 1;
    return countOrbits(orbits) + 1;
}

function getPath(objName) {
    if (objName == 'COM') return ['COM'];
    var orbits = objects[objName];
    var path = getPath(orbits);
    path.push(objName);
    return path;
}

var youPath = getPath('YOU');
var sanPath = getPath('SAN');

console.log(youPath, sanPath);

// var intersections = [];

var shortest = Infinity;

for (var i = youPath.length - 2; i >= 0; i--) {
    var youCount = youPath.length - 2 - i;
    for (var j = sanPath.length - 2; j >= 0; j--) {
        var sanCount = sanPath.length - 2 - j;
        
        if (youPath[i] == sanPath[j]) {
            var distance = youCount + sanCount;
            console.log(distance);
            if (distance < shortest) {
                shortest = distance;
            }
        }
    }
}

// var total = 0;
// for (var obj in objects) {
//     total += countOrbits(obj);
//     // console.log(`${obj}: ${countOrbits(obj)}`);
// }

console.log(shortest);