module.exports = (label, code, opcodes, em) => new Intcoder(label, code, opcodes, em);

class Intcoder {
    constructor(label, code, opcodes, em) {
        this.label = label;
        this.counter = 0;
        this.intcode = code;
        this.opcodes = opcodes;
        this.em = em;
        this.running = true;
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
            console.log('Unrecognised code')// intcode[counter]);
            return true;
        }
        this.running = true;
        return false;
    }

    store(location, data) {
        if (location >= this.intcode.length) {
            console.log('hi');
            this.memory.set(location, data);
        } else {
            this.intcode[location] = data;
        }
    }
}