var readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

var code = [3,225,1,225,6,6,1100,1,238,225,104,0,1102,7,85,225,1102,67,12,225,102,36,65,224,1001,224,-3096,224,4,224,1002,223,8,223,101,4,224,224,1,224,223,223,1001,17,31,224,1001,224,-98,224,4,224,1002,223,8,223,101,5,224,224,1,223,224,223,1101,86,19,225,1101,5,27,225,1102,18,37,225,2,125,74,224,1001,224,-1406,224,4,224,102,8,223,223,101,2,224,224,1,224,223,223,1102,13,47,225,1,99,14,224,1001,224,-98,224,4,224,102,8,223,223,1001,224,2,224,1,224,223,223,1101,38,88,225,1102,91,36,224,101,-3276,224,224,4,224,1002,223,8,223,101,3,224,224,1,224,223,223,1101,59,76,224,1001,224,-135,224,4,224,102,8,223,223,1001,224,6,224,1,223,224,223,101,90,195,224,1001,224,-112,224,4,224,102,8,223,223,1001,224,7,224,1,224,223,223,1102,22,28,225,1002,69,47,224,1001,224,-235,224,4,224,1002,223,8,223,101,5,224,224,1,223,224,223,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,107,226,226,224,102,2,223,223,1006,224,329,1001,223,1,223,1107,677,226,224,1002,223,2,223,1005,224,344,101,1,223,223,108,677,226,224,102,2,223,223,1006,224,359,101,1,223,223,7,677,226,224,102,2,223,223,1005,224,374,101,1,223,223,1008,677,226,224,1002,223,2,223,1006,224,389,1001,223,1,223,7,226,677,224,102,2,223,223,1005,224,404,101,1,223,223,1007,226,226,224,102,2,223,223,1006,224,419,101,1,223,223,7,226,226,224,102,2,223,223,1005,224,434,1001,223,1,223,8,226,226,224,1002,223,2,223,1006,224,449,101,1,223,223,1007,677,677,224,102,2,223,223,1006,224,464,101,1,223,223,1007,226,677,224,1002,223,2,223,1006,224,479,101,1,223,223,108,226,226,224,102,2,223,223,1005,224,494,1001,223,1,223,1108,677,677,224,102,2,223,223,1005,224,509,1001,223,1,223,107,226,677,224,1002,223,2,223,1005,224,524,101,1,223,223,1108,677,226,224,1002,223,2,223,1005,224,539,1001,223,1,223,1008,677,677,224,1002,223,2,223,1006,224,554,101,1,223,223,1008,226,226,224,102,2,223,223,1005,224,569,1001,223,1,223,8,677,226,224,102,2,223,223,1006,224,584,101,1,223,223,107,677,677,224,102,2,223,223,1006,224,599,101,1,223,223,8,226,677,224,102,2,223,223,1006,224,614,101,1,223,223,1107,226,677,224,102,2,223,223,1006,224,629,101,1,223,223,108,677,677,224,1002,223,2,223,1005,224,644,1001,223,1,223,1107,226,226,224,102,2,223,223,1005,224,659,101,1,223,223,1108,226,677,224,102,2,223,223,1005,224,674,101,1,223,223,4,223,99,226];

async function runCode(intcode) {
    var counter = 0;
    var stop = false;
    do {
        var opcode = intcode[counter];
        var rawcode = opcode % 100;
        if (rawcode == 1) {
            var addressMode1 = (opcode % 1000 - opcode % 100) / 100;
            var addressMode2 = (opcode % 10000 - opcode % 1000) / 1000;
            if (addressMode1) {
                input1 = intcode[counter + 1];
            } else {
                input1 = intcode[intcode[counter + 1]];
            }
            if (addressMode2) {
                input2 = intcode[counter + 2];
            } else {
                input2 = intcode[intcode[counter + 2]];
            }
            intcode[intcode[counter + 3]] = input1 + input2;
            counter += 4;
        } else if (rawcode == 2) {
            var addressMode1 = (opcode % 1000 - opcode % 100) / 100;
            var addressMode2 = (opcode % 10000 - opcode % 1000) / 1000;
            if (addressMode1) {
                input1 = intcode[counter + 1];
            } else {
                input1 = intcode[intcode[counter + 1]];
            }
            if (addressMode2) {
                input2 = intcode[counter + 2];
            } else {
                input2 = intcode[intcode[counter + 2]];
            }
            intcode[intcode[counter + 3]] = input1 * input2;
            counter += 4;
        } else if (rawcode == 3) {

            // var input = await rl.question('INPUT: ');
            // // TODO: Log the answer in a database
            // // console.log(`Thank you for your valuable feedback: ${answer}`);
            
            // rl.close();

            intcode[intcode[counter + 1]] = 5;
            counter += 2;



            // var input = parseInt(readline());
            // intcode[intcode[counter + 1]] = input;
            // counter += 2;
        } else if (rawcode == 4) {
            var addressMode = (opcode % 1000 - opcode % 100) / 100;
            if (addressMode) {
                output = intcode[counter + 1];
            } else {
                output = intcode[intcode[counter + 1]];
            }
            counter += 2;
            console.log(`OUTPUT: ${output}`);
        } else if (rawcode == 5) {
            var addressMode1 = (opcode % 1000 - opcode % 100) / 100;
            var addressMode2 = (opcode % 10000 - opcode % 1000) / 1000;
            if (addressMode1) {
                input1 = intcode[counter + 1];
            } else {
                input1 = intcode[intcode[counter + 1]];
            }
            if (addressMode2) {
                input2 = intcode[counter + 2];
            } else {
                input2 = intcode[intcode[counter + 2]];
            }
            if (input1 != 0) {
                counter = input2;
            } else {
                counter += 3;
            }
        } else if (rawcode == 6) {
            var addressMode1 = (opcode % 1000 - opcode % 100) / 100;
            var addressMode2 = (opcode % 10000 - opcode % 1000) / 1000;
            if (addressMode1) {
                input1 = intcode[counter + 1];
            } else {
                input1 = intcode[intcode[counter + 1]];
            }
            if (addressMode2) {
                input2 = intcode[counter + 2];
            } else {
                input2 = intcode[intcode[counter + 2]];
            }
            if (input1 == 0) {
                counter = input2;
            } else {
                counter += 3;
            }
        } else if (rawcode == 7) {
            var addressMode1 = (opcode % 1000 - opcode % 100) / 100;
            var addressMode2 = (opcode % 10000 - opcode % 1000) / 1000;
            if (addressMode1) {
                input1 = intcode[counter + 1];
            } else {
                input1 = intcode[intcode[counter + 1]];
            }
            if (addressMode2) {
                input2 = intcode[counter + 2];
            } else {
                input2 = intcode[intcode[counter + 2]];
            }
            if (input1 < input2) {
                intcode[intcode[counter + 3]] = 1;
            } else {
                intcode[intcode[counter + 3]] = 0;
            }
            counter += 4;
        } else if (rawcode == 8) {
            var addressMode1 = (opcode % 1000 - opcode % 100) / 100;
            var addressMode2 = (opcode % 10000 - opcode % 1000) / 1000;
            if (addressMode1) {
                input1 = intcode[counter + 1];
            } else {
                input1 = intcode[intcode[counter + 1]];
            }
            if (addressMode2) {
                input2 = intcode[counter + 2];
            } else {
                input2 = intcode[intcode[counter + 2]];
            }
            if (input1 == input2) {
                intcode[intcode[counter + 3]] = 1;
            } else {
                intcode[intcode[counter + 3]] = 0;
            }
            counter += 4;
        } else {
            console.log('stop code: ', opcode);
            stop = true;
        }
    
    } while (!stop);
    return intcode;
}

runCode(code);