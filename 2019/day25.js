const fs = require('fs');

// const readline = require('readline-promise');

var inp = fs.readFileSync('./inputs/day25.txt').toString().split(',');

// const rlp = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//     terminal: true
// });

// async function hi() {
//     var answer = await rlp.questionAsync('hi? ');
//     console.log(answer);
// }

// hi();


var code = [];
for (var num of inp) {
    code.push(parseInt(num));
}

// console.log(code);


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

var pathToSecurity = `east
east
east
east
north
east
0`; // [5, 1]

var objInp = `east
east
take tambourine
east
take fuel cell
east
take boulder
west
west
west
west
north
east
take cake
east
north
take pointer
south
west
west
north
take mutex
east
take antenna
west
south
south
west
west
west
take coin
east
east
east
east
east
east
east
north
east
0`;

// objInp = `north
// east
// take cake
// 0`

var items = ['tambourine', 'fuel cell', 'boulder', 'cake', 'pointer', 'mutex', 'antenna', 'coin'];

function tryNum(num) {
    var output = ''
    for (var i = 0; i < items.length; i++) {
        if (num & Math.pow(2,i)) {
            output += 'drop ' + items[i] + '\n';
        } else {
            output += 'take ' + items[i] + '\n';
        }
    }
    return output + 'east\n'
}

/*

E - giant electromagnet X
EE - tambourine
EEE - fuel cell
EEEE - boulder

N - infinite loop X
NE - cake
NEE - escape pod X
NEEN - pointer
NN - mutex
NNE - antenna

W - photons X
WWN - molten lava X
WWW - coin


*/

var instructions = objInp.split('\n');

for (var i = 0; i < 0; i++) {
    
    var obj = {
        string: '',
        line: '',
        inp: [],
        allLines: instructions,
        id: i
        // input: objInp.split('')
    }

    var em = emInit(obj);
    var coder = intcoderInit('thing', code.slice(), opcodes, em);

    em.on('input', (data, obj) => {
        if (obj.inp.length == 0) {
            // console.log('We have a problem')
            obj.inp = obj.allLines.shift();

            // if (obj.inp[0] == 't') {
            //     var thisItem = obj.inp.split(' ');
            //     thisItem.shift();
            //     thisItem = thisItem.join(' ');
            //     var itemNum = items.indexOf(thisItem);
            //     if (obj.id & Math.pow(2, itemNum)) {
            //         obj.inp = obj.allLines.shift();
            //     }
            // }

            obj.inp = obj.inp.split('');

            return 10;
        }
        return obj.inp.shift().charCodeAt();
    })

    em.on('output', (data, obj) => {
        // console.log(data);
        // if (data > 127) console.log(data); return;
        var char = String.fromCharCode(data);
        // console.log(char);
        // return;
        // console.log(char, data);
        // obj.line += char;
        obj.string += char;

        if (char == '\n') {
            console.log(obj.line);
            obj.line = '';
        } else {
            obj.line += char;
        }
    });

    coder.runCode();
}


var obj = {
    string: '',
    line: '',
    inp: [],
    allLines: instructions,
    id: 0
    // input: objInp.split('')
}

var em = emInit(obj);
var coder = intcoderInit('thing', code.slice(), opcodes, em);

em.on('input', (data, obj) => {
    if (obj.inp.length == 0) {
        // console.log('We have a problem')
        obj.inp = obj.allLines.shift();

        // if (obj.inp[0] == 't') {
        //     var thisItem = obj.inp.split(' ');
        //     thisItem.shift();
        //     thisItem = thisItem.join(' ');
        //     var itemNum = items.indexOf(thisItem);
        //     if (obj.id & Math.pow(2, itemNum)) {
        //         console.log(thisItem);
        //         obj.inp = obj.allLines.shift();
        //     }
        // }

        // if (obj.inp == undefined) {

        //     obj.inp = tryNum(obj.id);


        //     if (obj.id < 255) {
        //         obj.id ++;
        //     } else {
        //         askdaksjd = asd
        //     }
        // }
        
        obj.inp = obj.inp.split('');


        return 10;
    }
    return obj.inp.shift().charCodeAt();
})

em.on('output', (data, obj) => {
    // console.log(data);
    // if (data > 127) console.log(data); return;
    var char = String.fromCharCode(data);
    // console.log(char);
    // return;
    // console.log(char, data);
    // obj.line += char;
    obj.string += char;

    if (char == '\n') {
        console.log(obj.line);
        obj.line = '';
    } else {
        obj.line += char;
    }
});

coder.runCode();

answer: 19357180

console.log(obj.string);