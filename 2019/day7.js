const newOpcode = require('./intcode/intcode.js');
const em = require('./intcode/eventManager.js')();
const intcoderInit = require('./intcode/intcoder.js');

var opcodes = new Map();

newOpcode(1, 3, (args, coder) => {
    coder.intcode[coder.intcode[coder.counter + 3]] = args[0] + args[1];
    coder.counter += args.length + 1;
    return 1;
}, opcodes);

newOpcode(2, 3, (args, coder) => {
    coder.intcode[coder.intcode[coder.counter + 3]] = args[0] * args[1];
    coder.counter += args.length + 1;
    return 1;
}, opcodes);

newOpcode(3, 1, (args, coder) => {
    coder.intcode[coder.intcode[coder.counter + 1]] = coder.em.emit('input', coder.label);
    // coder.em.emit('debug', `Received input. Stored at position ${coder.intcode[coder.counter + 1]}.`);
    coder.counter += args.length + 1;
    return 1;
}, opcodes);

newOpcode(4, 1, (args, coder) => {
    coder.em.emit('output', args[0]);
    coder.counter += args.length + 1;
    return 1;
}, opcodes);

newOpcode(5, 2, (args, coder) => {
    if (args[0] != 0) {
        coder.counter = args[1]
        return 2;
    }
    coder.counter += args.length + 1;
    return 1;
}, opcodes);

newOpcode(6, 2, (args, coder) => {
    if (args[0] == 0) {
        coder.counter = args[1]
        return 2;
    }
    coder.counter += args.length + 1;
    return 1;
}, opcodes);

newOpcode(7, 3, (args, coder) => {
    if (args[0] < args[1]) {
        coder.intcode[coder.intcode[coder.counter + 3]] = 1;
    } else {
        coder.intcode[coder.intcode[coder.counter + 3]] = 0;
    }
    coder.counter += args.length + 1;
    return 1;
}, opcodes);

newOpcode(8, 3, (args, coder) => {
    if (args[0] == args[1]) {
        coder.intcode[coder.intcode[coder.counter + 3]] = 1;
    } else {
        coder.intcode[coder.intcode[coder.counter + 3]] = 0;
    }
    coder.counter += args.length + 1;
    return 1;
}, opcodes);

newOpcode(99, 0, (args, coder) => {
    coder.em.emit('stop');
    return 0;
}, opcodes);

var code = [3,8,1001,8,10,8,105,1,0,0,21,42,51,76,93,110,191,272,353,434,99999,3,9,1002,9,2,9,1001,9,3,9,1002,9,3,9,1001,9,2,9,4,9,99,3,9,1002,9,3,9,4,9,99,3,9,1002,9,4,9,101,5,9,9,1002,9,3,9,1001,9,4,9,1002,9,5,9,4,9,99,3,9,1002,9,5,9,101,3,9,9,102,5,9,9,4,9,99,3,9,1002,9,5,9,101,5,9,9,1002,9,2,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,99];
// var code = [3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0];
// var code = [3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0];
// var code = [3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0];
// var code = [3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5];
// var code = [3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10];

function getPermutations(items) {
    if (items.length == 1) {
        return [items];
    }
    var perms = [];
    for (var item of items) {
        var newItemsArr = [];
        for (var tempitem of items) {
            if (item !== tempitem) newItemsArr.push(tempitem);
        }
        var tempperms = getPermutations(newItemsArr);
        for (var perm of tempperms) {
            var thisPerm = [item];
            for (var tempitem of perm) {
                thisPerm.push(tempitem);
            }
            perms.push(thisPerm)
        }
    }
    return perms;
}

// console.log(getPermutations([1, 2, 3, 4, 5]).length);

var nextInput, needPhase, phaseSettings, intcoders, currentCoder;

var permutations = getPermutations([5,6,7,8,9]);

em.on('input', data => {
    if (phaseSettings.length >= 5 - data) {
        // needPhase = false;

        var input = phaseSettings.shift();
    } else {
        var input = nextInput;
    }
    // needPhase = true;
    // console.log(`INPUT: ${input}`)
    return input;
})

em.on('output', data => {
    // console.log(`OUTPUT: ${data}`);
    // console.log(data);
    nextInput = data;
    currentCoder = (currentCoder + 1) % 5;
    // console.log(currentCoder);
    // console.log('hi');
});

em.on('debug', console.log);

em.on('stop', () => {
    // ended = true;
    // console.log('ENDED');
});

var highest = -Infinity;

// for (var perm of permutations) {
//     needPhase = true;
//     nextInput = 0;
//     phaseSettings = perm;

//     for (var i = 0; i < 5; i++) {
//         var intcoder = intcoderInit(code.slice(), opcodes, em);
//         var output = intcoder.runCode();
//         if (nextInput > highest) {
//             highest = nextInput;
//         }
//         // console.log(nextInput);
//     }
// }

// for (var perm of permutations) {
//     needPhase = true;
//     nextInput = 0;
//     phaseSettings = perm;

//     intcoders = [];

//     var end = false;

//     for (var i = 0; i < 5; i++) {
//         intcoders.push(intcoderInit(code.slice(), opcodes, em));
//     }

//     currentCoder = 0;

//     while (!end) {
//         if (intcoders[currentCoder].stepCode()) {
//             end = true;
//             console.log('AAAAAA', currentCoder);
//         }
//     }

//     console.log(nextInput);
//     if (nextInput > highest) {
//         highest = nextInput;
//     }
// }

for (var perm of permutations) {
    // needPhase = true;
    // nextInput = 0;
    phaseSettings = perm;

    intcoders = [];
    var end = false;
    nextInput = 0;

    for (var i = 0; i < 5; i++) {
        intcoders.push(intcoderInit(i, code.slice(), opcodes, em));
    }

    var currentCoder = 0;

    while (!end) {
        var ended = intcoders[currentCoder].stepCode();
        if (ended) {
            currentCoder++;
            // console.log('ENDED:',currentCoder)
            if (currentCoder == 4) {
                end = true;
            }
        }
    }

    // console.log(nextInput);
    if (nextInput > highest) {
        highest = nextInput;
    }
}
    
// console.log(highest);

// intcoder.runCode();

// var phaseSettings = [9,8,7,6,5];
// var intcoders = [];
// var end = false;
// var nextInput = 0;

// for (var i = 0; i < 5; i++) {
//     intcoders.push(intcoderInit(i, code.slice(), opcodes, em));
// }

// var currentCoder = 0;

// while (!end) {
//     var ended = intcoders[currentCoder].stepCode();
//     if (ended) {
//         currentCoder++;
//         console.log('ENDED:',currentCoder)
//         if (currentCoder == 4) {
//             end = true;
//         }
//     }
// }

console.log(highest);

