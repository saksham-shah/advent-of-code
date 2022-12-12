const fs = require('fs');

var input = fs.readFileSync('./inputs/day16.txt').toString();

// input = '69317163492948606335995924319873';

input = input.split('');
var nums = input.map(s => +s);

console.log(nums.length);

function step(nums) {
    var newNums = [];
    for (var i = 0; i < nums.length; i++) {
        var basePattern = [];
        for (var j = 0; j < i+1; j++) {
            basePattern.push(0);
        }
        for (var j = 0; j < i+1; j++) {
            basePattern.push(1);
        }
        for (var j = 0; j < i+1; j++) {
            basePattern.push(0);
        }
        for (var j = 0; j < i+1; j++) {
            basePattern.push(-1);
        }

        var total = 0;
        for (var j = 0; j < nums.length; j++) {
            var mult = basePattern[(j+1) % basePattern.length];
            // console.log(nums[j]);
            total += nums[j] * mult;
        }
        // console.log();
        newNums.push(Math.abs(total)%10);
    }
    return newNums;
}

for (var i = 0; i < 100; i++) {
    nums = step(nums);
}

// console.log(nums.join(''));