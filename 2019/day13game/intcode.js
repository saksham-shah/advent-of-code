const newOpcode = (code, args, handler, map) => {
    map.set(code, new Instruction(code, args, handler));
};

class Instruction {
    constructor(code, args, handler) {
        this.code = code;
        this.args = args;
        this.handler = handler;
    }

    getArgs(intcode, counter, relative, memory) {
        var thisCode = intcode[counter];
        var theArgs = [];
        for (var i = 0; i < this.args; i++) {
            var addressMode = (thisCode % Math.pow(10, i + 3) - thisCode % Math.pow(10, i + 2)) / Math.pow(10, i + 2);
            if (addressMode == 1) {
                theArgs.push(intcode[counter + 1 + i])
            } else {
                var location = intcode[counter + 1 + i];
                if (addressMode == 2) {
                    location += relative;
                }
                if (location >= intcode.length) {
                    if (memory.has(location)) {
                        theArgs.push(memory.get(location))
                    } else {
                        theArgs.push(0);
                    }
                } else {
                    theArgs.push(intcode[location]);
                }
            }
        }
        return theArgs;
    }

    async run(intcoder) {
        return await this.handler(this.getArgs(intcoder.intcode, intcoder.counter, intcoder.relative, intcoder.memory), intcoder);
    }
}