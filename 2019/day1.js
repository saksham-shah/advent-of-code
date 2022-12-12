var fs = require('fs');

var input = fs.readFileSync('./inputs/day1.txt').toString();
var masses = input.split('\n');

var fuelNeeded = 0;

for (var mass of masses) {
    var thisFuel = Math.floor(mass / 3) - 2;
    while (thisFuel > 0) {
        fuelNeeded += thisFuel;
        thisFuel = Math.floor(thisFuel / 3) - 2;
    }
}

debug = fuelNeeded;

console.log(debug);