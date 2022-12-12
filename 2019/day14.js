const fs = require('fs');

var input = fs.readFileSync('./inputs/day14.txt').toString();

// input = `10 ORE => 10 A
// 1 ORE => 1 B
// 7 A, 1 B => 1 C
// 7 A, 1 C => 1 D
// 7 A, 1 D => 1 E
// 7 A, 1 E => 1 FUEL`;

// input = `9 ORE => 2 A
// 8 ORE => 3 B
// 7 ORE => 5 C
// 3 A, 4 B => 1 AB
// 5 B, 7 C => 1 BC
// 4 C, 1 A => 1 CA
// 2 AB, 3 BC, 4 CA => 1 FUEL`;

var rs = input.split('\n');

var reactions = [];
for (var r of rs) {
    reactions.push(r.split(' => '));
}

var reactionsObj = {};

for (var reaction of reactions) {
    var out = reaction[1].split(' ');
    var inps = reaction[0].split(', ');
    var thisReaction = {
        input: [],
        output: []
    };
    for (var _inp of inps) {
        var inp = _inp.split(' ');
        // thisReaction.input[inp[1]] = inp[0];
        thisReaction.input.push([inp[1], inp[0]]);
    }
    thisReaction.output = [out[1], out[0]];
    reactionsObj[out[1]] = thisReaction;
}

// console.log(reactionsObj.C);

// function makeOne(chemical) {
//     var need = reactionsObj[chemical].input;
//     for (var chem in need) {
//         var chemsNeeded = everythingRequired(chem);
//         var doNext = true;
//         for (var other in need) {
//             if (chem == other) continue;
//             if (chemsNeeded.includes(other)) doNext = false;
//         }
//         if (!doNext) continue;
//         var thisNeed = reactionsObj[chem].input;
//         for (var tempChem in thisNeed) {
//             if (!need[tempChem]) need[tempChem] = 0;
//             var amountNeeded = need[chem];

//             need[tempChem] += thisNeed[tempChem] * need[chem];
//         }
//         delete need[chem];
//     }

//     return need;
// }

function make(chemical, num) {
    var needToMake = [[chemical, num]];
    // var chemicalsNeeded = [];
    var oreNeeded = 0;
    while (needToMake.length > 0) {
        var thisChemical = needToMake.shift();
        var skip = false;
        if (thisChemical[0] == 'ORE') {
            oreNeeded += thisChemical[1];
            skip = true;
        } 
        for (var chem of needToMake) {
            var chemsNeededForThis = everythingRequired(chem[0]);
            if (chemsNeededForThis.includes(thisChemical[0])) {
                skip = true;
            }
        }
        if (skip) {
            if (thisChemical[0] != 'ORE') needToMake.push(thisChemical);
            continue;
        }
        var reaction = reactionsObj[thisChemical[0]];
        var inputs = reaction.input;
        var amountOfTimes = Math.ceil(thisChemical[1] / reaction.output[1]);
        // console.log(`Need to do ${thisChemical[0]} reaction: ${amountOfTimes} times.`)
        for (var chem of inputs) {
            var added = false;
            for (var existingChem of needToMake) {
                if (existingChem[0] == chem[0]) {
                    existingChem[1] += chem[1] * amountOfTimes;
                    added = true;
                }
            }
            if (!added) {
                needToMake.push([chem[0], chem[1] * amountOfTimes]);
            }
        }
    }

    return oreNeeded;
}

function everythingRequired(chemical) {
    var chemicals = [];
    var queue = [chemical];
    while (queue.length > 0) {
        var thisChem = queue.shift();
        chemicals.push(thisChem);
        if (thisChem != 'ORE') {
            var chemsNeeded = reactionsObj[thisChem].input;
            for (var chem of chemsNeeded) {
                if (!chemicals.includes(chem[0])) queue.push(chem[0]);
            }
        }
    }
    return chemicals;
}

console.log(make('FUEL', 1));

var orePerFuel = make('FUEL', 1);
var oreTarget = 1000000000000;

var maxTheoretical = Math.ceil(oreTarget / orePerFuel);

// console.log(maxTheoretical);

function binarySearch(min, max) {
    if (min == max) return min;
    var guess = Math.floor((min + max) / 2);
    var result = make('FUEL', guess);
    if (result > oreTarget) return binarySearch(min, guess - 1);
    if (result < oreTarget) return binarySearch(guess, max);
    return guess;
}

console.log(binarySearch(1, 10000000));