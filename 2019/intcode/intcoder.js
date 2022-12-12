module.exports = (label, code, opcodes, em) => new Intcoder(label, code, opcodes, em);

class Intcoder {
    constructor(label, code, opcodes, em) {
        this.label = label;
        this.counter = 0;
        this.intcode = code;
        this.opcodes = opcodes;
        this.em = em;
        this.running = true;
        this.relative = 0;
        this.memory = new Map();
    }

    runCode() {
        var end = false;
        while (!end) {
            end = this.stepCode();
        }
        return this.intcode;
    }

    stepCode() {
        this.running = false;
        var opcode = this.intcode[this.counter] % 100;
        if (this.opcodes.has(opcode)) {
            var instruction = this.opcodes.get(opcode);
            var output = instruction.run(this);
            if (output == 0) return true;
        } else {
            console.log('Unrecognised code', this.intcode[this.counter]);
            return true;
        }
        this.running = true;
        return false;
    }

    store(location, argNum, data) {
        location = this.getStoreLocation(argNum, location);
        if (location >= this.intcode.length) {
            this.memory.set(location, data);
            // console.log(`Storing value ${data} in memory location ${location}`)
        } else {
            this.intcode[location] = data;
            // console.log(`Storing value ${data} in location ${location}`)
        }
    }

    getStoreLocation(argNum, location) {
        var thisCode = this.intcode[this.counter];
        var addressMode = (thisCode % Math.pow(10, argNum + 3) - thisCode % Math.pow(10, argNum + 2)) / Math.pow(10, argNum + 2);
        if (addressMode == 2) {
            location += this.relative
            // console.log('Relative below')
        };
        return location;
    }
}