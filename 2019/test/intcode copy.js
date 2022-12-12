module.exports = (code, args, handler, map) => {
    map.set(code, new Instruction(code, args, handler));
};

class Instruction {
    constructor(code, args, handler) {
        this.code = code;
        this.args = args;
        this.handler = handler;
    }

    getArgs(intcode, counter) {
        var thisCode = intcode[counter];
        var theArgs = [];
        for (var i = 0; i < this.args; i++) {
            var addressMode = (thisCode % Math.pow(10, i + 3) - thisCode % Math.pow(10, i + 2)) / Math.pow(100, i + 2);
            if (addressMode) {
                theArgs.push(intcode[counter + 1 + i])
            } else {
                theArgs.push(intcode[intcode[counter + 1 + i]]);
            }
        }
        return theArgs;
    }

    run(intcoder) {
        return this.handler(this.getArgs(intcoder.intcode, intcoder.counter), intcoder);
    }
}