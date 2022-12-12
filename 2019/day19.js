var code = [109,424,203,1,21101,11,0,0,1106,0,282,21102,18,1,0,1106,0,259,1201,1,0,221,203,1,21102,31,1,0,1106,0,282,21101,0,38,0,1105,1,259,21002,23,1,2,21202,1,1,3,21102,1,1,1,21102,1,57,0,1105,1,303,2101,0,1,222,21002,221,1,3,21002,221,1,2,21101,0,259,1,21101,0,80,0,1105,1,225,21101,169,0,2,21101,0,91,0,1106,0,303,1202,1,1,223,20101,0,222,4,21101,259,0,3,21102,225,1,2,21102,225,1,1,21101,0,118,0,1106,0,225,20102,1,222,3,21101,94,0,2,21101,0,133,0,1106,0,303,21202,1,-1,1,22001,223,1,1,21102,148,1,0,1105,1,259,2102,1,1,223,21001,221,0,4,21002,222,1,3,21101,0,22,2,1001,132,-2,224,1002,224,2,224,1001,224,3,224,1002,132,-1,132,1,224,132,224,21001,224,1,1,21101,0,195,0,106,0,108,20207,1,223,2,21002,23,1,1,21102,1,-1,3,21102,214,1,0,1105,1,303,22101,1,1,1,204,1,99,0,0,0,0,109,5,1202,-4,1,249,21201,-3,0,1,21202,-2,1,2,22101,0,-1,3,21101,0,250,0,1106,0,225,21202,1,1,-4,109,-5,2106,0,0,109,3,22107,0,-2,-1,21202,-1,2,-1,21201,-1,-1,-1,22202,-1,-2,-2,109,-3,2105,1,0,109,3,21207,-2,0,-1,1206,-1,294,104,0,99,21202,-2,1,-2,109,-3,2105,1,0,109,5,22207,-3,-4,-1,1206,-1,346,22201,-4,-3,-4,21202,-3,-1,-1,22201,-4,-1,2,21202,2,-1,-1,22201,-4,-1,1,22101,0,-2,3,21102,343,1,0,1105,1,303,1106,0,415,22207,-2,-3,-1,1206,-1,387,22201,-3,-2,-3,21202,-2,-1,-1,22201,-3,-1,3,21202,3,-1,-1,22201,-3,-1,2,21201,-4,0,1,21101,0,384,0,1105,1,303,1106,0,415,21202,-4,-1,-4,22201,-4,-3,-4,22202,-3,-2,-2,22202,-2,-4,-4,22202,-3,-2,-3,21202,-4,-1,-2,22201,-3,-2,1,21201,1,0,-4,109,-5,2106,0,0];

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

const newOpcode = require('./intcode/intcode.js');
const emInit = require('./intcode/eventManager.js');
const intcoderInit = require('./intcode/intcoder.js');

var theGrid = [];

var opcodes = new Map();

newOpcode(1, 3, (args, coder) => {
    coder.store(coder.intcode[coder.counter + 3], 2, args[0] + args[1]);
    coder.counter += args.length + 1;
    return 1;
}, opcodes);

newOpcode(2, 3, (args, coder) => {
    coder.store(coder.intcode[coder.counter + 3], 2, args[0] * args[1]);
    coder.counter += args.length + 1;
    return 1;
}, opcodes);

newOpcode(3, 1, (args, coder) => {
    coder.store(coder.intcode[coder.counter + 1], 0, coder.em.emit('input', coder.label));
    // coder.em.emit('debug', `Received input. Stored at position ${args[0]}.`);
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
        coder.store(coder.intcode[coder.counter + 3], 2, 1);
    } else {
        coder.store(coder.intcode[coder.counter + 3], 2, 0);
    }
    coder.counter += args.length + 1;
    return 1;
}, opcodes);

newOpcode(8, 3, (args, coder) => {
    if (args[0] == args[1]) {
        coder.store(coder.intcode[coder.counter + 3], 2, 1);
    } else {
        coder.store(coder.intcode[coder.counter + 3], 2, 0);
    }
    coder.counter += args.length + 1;
    return 1;
}, opcodes);

newOpcode(9, 1, (args, coder) => {
    coder.relative += args[0];
    coder.counter += args.length + 1;
    return 1;
}, opcodes)

newOpcode(99, 0, (args, coder) => {
    coder.em.emit('stop');
    return 0;
}, opcodes);

// var startX = 600;
// var startY = 800;

var grid = [];
var affected = 0;
for (var i = 0; i<150; i++) {
    var row = [];
    for (var j = 0; j < 150; j++) {
        row.push(0);
    }
    grid.push(row);
}

// for (var i = 0; i < 22500; i++) {
//     var obj = {
//         currentIn: 'x',
//         cellNum: i,
//         grid: grid,
//         affected: 0,
//     }

//     var em = emInit(obj);
//     var coder = intcoderInit('thing', code.slice(), opcodes, em);

//     em.on('input', (data, obj) => {
//         if (obj.currentIn == 'x') {
//             obj.currentIn = 'y';
//             return obj.cellNum % 150 + startX;
//         } else if (obj.currentIn = 'y') {
//             obj.currentIn = 'x';
//             return Math.floor(obj.cellNum / 150) + startY;
//         }
//     })

//     em.on('output', (data, obj) => {
//         // console.log(Math.floor(obj.cellNum / 100), obj.cellNum % 100, ':', data)
//         grid[Math.floor(obj.cellNum / 150)][obj.cellNum % 150] = data;
//         // obj.cellNum++;
//         if (data) {
//             affected++;
//         }

//         // console.log(data);

//     });

//     em.on('debug', console.log);

//     em.on('stop', () => {

//     });

//     coder.runCode();
// }

// console.log(affected);

function setup(obj) {

    var em = emInit(obj);
    var coder = intcoderInit('thing', code.slice(), opcodes, em);

    em.on('input', (data, obj) => {
        if (obj.currentIn == 'x') {
            obj.currentIn = 'y';
            return obj.x;
        } else if (obj.currentIn = 'y') {
            obj.currentIn = 'x';
            return obj.y;
        }
    })

    em.on('output', (data, obj) => {
        // grid[obj.y][obj.x] = data;
        // if (data) {
        //     affected++;
        // }
        obj.result = data;
    });

    coder.runCode();
}

function getRange(y, minX) {
    var state = 'start';
    var currentX = minX;
    var leftmost = minX;
    while (true) {
        var obj = {
            x: currentX,
            y: y,
            currentIn: 'x'
        }
        setup(obj);
        switch (state) {
            case 'start':
                if (obj.result) {
                    state = 'going';
                    leftmost = currentX;
                }
                currentX++;
                break;
            case 'going':
                if (obj.result) {
                    currentX++;
                } else {
                    return [leftmost, currentX-1];
                }
                break;
        }
    }
}

// console.log(getRange(1000, 0));

var ranges = [];
var buffer = 600;

var previous = 0;
for (var i = 0; i < 99; i++) {
    var thisRange = getRange(i + buffer, previous);
    previous = thisRange[0];
    ranges.push(thisRange);
}

var counter = 0;
var end = false;
while (!end) {
    var thisRange = getRange(counter + 99 + buffer, previous);
    previous = thisRange[0];
    ranges.push(thisRange);

    var pastRange = ranges[counter];

    var intersect = pastRange[1] - thisRange[0] + 1;

    if (intersect >= 100) {
        console.log('x:', thisRange[0], 'y: ', counter + buffer);
        end = true;
    }

    counter++;
}

// console.log(ranges);

// for (var i = 0; i < grid.length; i++) {
//     var string = '';
//     for (var j = 0; j < grid[0].length; j++) {
//         string += grid[i][j] ? '#' : '.';
//     }
//     console.log(string);
// }