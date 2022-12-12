var fs = require('fs');

var input = fs.readFileSync('./inputs/day3.txt').toString();
var wires = input.split('\n');

var one = wires[0].split(',');
var two = wires[1].split(',');

// function wiresIntersect(hConstant, hMin, hMax, vConstant, vMin, vMax) {
//     if (hConstant >= vMin && hConstant <= vMax && vConstant >= hMin && vConstant <= hMax) {
//         return [vConstant, hConstant];
//     }
//     return null;
// }

function wiresIntersect(h, v) {
    if (h[0] >= v[1] && h[0] <= v[2] && v[0] >= h[1] && v[0] <= h[2]) {
        var i = [v[0], h[0]];

        var steps = 0;

        if (h[3]) {
            steps += h[4] + h[2] - v[0];
        } else {
            steps += h[4] + v[0] - h[1];
        }

        if (v[3]) {
            steps += v[4] + v[2] - h[0];
        } else {
            steps += v[4] + h[0] - v[1];
        }

        return [v[0], h[0], steps];
    }
    return null;
}

// one = ['R100'];

// one = ['R8','U5','L5','D3'];
// two = ['U7','R6','D4','L4'];

var oneH = [];
var oneV = [];
var x = 0;
var y = 0;
var steps = 0;

for (var code of one) {
    var d = code[0];
    code = parseInt(code.slice(1));
    if (d == 'R') {
        oneH.push([y, x, x+code, false, steps]);
        x += code;
        steps += code;
    } else if (d == 'L') {
        oneH.push([y, x-code, x, true, steps]);
        x -= code;
        steps += code
    } else if (d == 'U') {
        oneV.push([x, y, y+code, false, steps]);
        y += code;
        steps += code
    } else if (d == 'D') {
        oneV.push([x, y-code, y, true, steps]);
        y -= code;
        steps += code;
    }
}

var intersections = [];

x = 0;
y = 0;
steps = 0;
for (var code of two) {
    var d = code[0];
    code = parseInt(code.slice(1));
    if (d == 'R') {
        var thisLine = [y, x, x+code, false, steps];
        x += code;
        steps += code;
        for (var line of oneV) {
            var i = wiresIntersect(thisLine, line);
            if (i) {
                intersections.push(i);
            }
        }
    } else if (d == 'L') {
        var thisLine = [y, x-code, x, true, steps];
        x -= code;
        steps += code;
        for (var line of oneV) {
            var i = wiresIntersect(thisLine, line);
            if (i) {
                intersections.push(i);
            }
        }
    } else if (d == 'U') {
        var thisLine = [x, y, y+code, false, steps];
        y += code;
        steps += code;
        for (var line of oneH) {
            var i = wiresIntersect(line, thisLine);
            if (i) {
                intersections.push(i);
            }
        }
    } else if (d == 'D') {
        var thisLine = [x, y-code, y, true, steps];
        y -= code;
        steps += code;
        for (var line of oneH) {
            var i = wiresIntersect(line, thisLine);
            if (i) {
                intersections.push(i);
            }
        }
    }
}

var record = [0,0,Infinity];
for (var i of intersections) {
    var manhattan = Math.abs(i[0]) + Math.abs(i[1]);
    if (manhattan == 0) continue;
    if (record[2] > i[2]) {
        record = i;
    }
}

// console.log(oneH);
console.log(record);

// console.log(wiresIntersect(-2, 0, 10, 5, -2, 20));