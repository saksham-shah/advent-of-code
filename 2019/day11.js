var fs = require('fs');

var input = fs.readFileSync('./inputs/day11.txt').toString();
var code = input.split(',');

var code = [3,8,1005,8,324,1106,0,11,0,0,0,104,1,104,0,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,1,10,4,10,1001,8,0,29,1,1107,14,10,1006,0,63,1006,0,71,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,1,10,4,10,1002,8,1,61,1,103,18,10,1006,0,14,1,105,7,10,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,1,10,4,10,101,0,8,94,1006,0,37,1006,0,55,2,1101,15,10,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,0,10,4,10,101,0,8,126,2,1006,12,10,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,1,10,4,10,1001,8,0,152,3,8,102,-1,8,10,1001,10,1,10,4,10,108,0,8,10,4,10,101,0,8,173,1006,0,51,1006,0,26,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,0,10,4,10,1001,8,0,202,2,8,18,10,1,103,19,10,1,1102,1,10,1006,0,85,3,8,102,-1,8,10,1001,10,1,10,4,10,108,0,8,10,4,10,1001,8,0,238,2,1002,8,10,1006,0,41,3,8,102,-1,8,10,1001,10,1,10,4,10,108,0,8,10,4,10,101,0,8,267,2,1108,17,10,2,105,11,10,1006,0,59,1006,0,90,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,1,10,4,10,1001,8,0,304,101,1,9,9,1007,9,993,10,1005,10,15,99,109,646,104,0,104,1,21102,936735777688,1,1,21101,341,0,0,1105,1,445,21101,0,937264173716,1,21101,352,0,0,1106,0,445,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,21101,3245513819,0,1,21102,1,399,0,1105,1,445,21102,1,29086470235,1,21102,410,1,0,1105,1,445,3,10,104,0,104,0,3,10,104,0,104,0,21101,825544712960,0,1,21102,1,433,0,1106,0,445,21102,825460826472,1,1,21101,0,444,0,1106,0,445,99,109,2,22102,1,-1,1,21101,0,40,2,21101,0,476,3,21102,466,1,0,1105,1,509,109,-2,2105,1,0,0,1,0,0,1,109,2,3,10,204,-1,1001,471,472,487,4,0,1001,471,1,471,108,4,471,10,1006,10,503,1101,0,0,471,109,-2,2106,0,0,0,109,4,2101,0,-1,508,1207,-3,0,10,1006,10,526,21101,0,0,-3,21202,-3,1,1,21201,-2,0,2,21101,0,1,3,21101,0,545,0,1105,1,550,109,-4,2105,1,0,109,5,1207,-3,1,10,1006,10,573,2207,-4,-2,10,1006,10,573,21202,-4,1,-4,1106,0,641,21202,-4,1,1,21201,-3,-1,2,21202,-2,2,3,21101,0,592,0,1105,1,550,22101,0,1,-4,21101,1,0,-1,2207,-4,-2,10,1006,10,611,21102,1,0,-1,22202,-2,-1,-2,2107,0,-3,10,1006,10,633,22101,0,-1,1,21102,633,1,0,105,1,508,21202,-2,-1,-2,22201,-4,-2,-4,109,-5,2105,1,0];

const newOpcode = require('./intcode/intcode.js');
const emInit = require('./intcode/eventManager.js');
const intcoderInit = require('./intcode/intcoder.js');

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

var robot = {
    painted: [[0, 0, 1]],
    current: [0, 0],
    dir: 0,
    dirOutput: true
}

var em = emInit(robot);
var coder = intcoderInit('robot', code, opcodes, em);


em.on('input', (data, obj) => {
    for (var pos of obj.painted) {
        if (pos[0] == obj.current[0] && pos[1] == obj.current[1]) {
            return pos[2];
        }
    }
    return 0;
})

em.on('output', (data, obj) => {
    obj.dirOutput = !obj.dirOutput;
    if (obj.dirOutput) {
        if (data == 1) {
            obj.dir = (obj.dir + 1)% 4;
        } else {
            obj.dir = (obj.dir - 1)% 4;
        }
        if (obj.dir < 0) obj.dir += 4;

        if (obj.dir == 0) {
            obj.current[1]--;
        } else if (obj.dir == 1) {
            obj.current[0]++;
        } else if (obj.dir == 2) {
            obj.current[1]++;
        } else if (obj.dir == 3) {
            obj.current[0]--;
        }
        // console.log(obj.current, obj.dir);
    } else {
        var newPaint = obj.current.slice();
        var done = false;
        for (var paint of obj.painted) {
            if (paint[0] == newPaint[0] && paint[1] == newPaint[1]) {
                done = true;
                paint[2] = data;
            }
        }
        if (!done) {
            newPaint.push(data);
            obj.painted.push(newPaint);
        }
        
        // console.log(`PAINTED: ${newPaint[0]} ${newPaint[1]}. Colour ${newPaint[2]}`);
    }

    // console.log(`PAINTING: ${data}`);
});

em.on('debug', console.log);

em.on('stop', () => {

});



coder.runCode();

// console.log(code);

console.log(em.obj.painted);

var painted = em.obj.painted.slice();

// var maxX = 0;
// var minX = 0;
// var maxY = 0;
// var minY = 0;

// for (var paint of painted) {
//     if (maxX < paint[0]) maxX = paint[0];
//     if (minX > paint[0]) minX = paint[0];
//     if (maxY < paint[1]) maxY = paint[1];
//     if (minY > paint[1]) minY = paint[1];
// }

// console.log(maxX, minX, maxY, minY);

// max X = 42, max Y = 5

var grid = [];

for (var y = 0; y < 6; y++) {
    var row = [];
    for (var x = 0; x < 43; x++) {
        if (x == 0 && y == 0) {
            row.push(1);
        } else {
            row.push(0);
        }
    }
    grid.push(row);
}

for (var paint of painted) {
    // console.log(paint[0]);
    grid[paint[1]][paint[0]] = paint[2];
}

for (var y = 0; y < grid.length; y++) {
    var string = '';
    for (var x = 0; x < grid[y].length; x++) {
        string += grid[y][x] ? '#' : ' ';
    }
    console.log(string);
}

// console.log(string);