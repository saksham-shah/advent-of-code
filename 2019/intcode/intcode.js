module.exports = (code, args, handler, map) => {
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
                // console.log(`Fetching value ${intcode[counter + 1 + i]} from location ${counter + 1 + i} (IMMEDIATE)`)
            } else {
                var location = intcode[counter + 1 + i];
                if (addressMode == 2) {
                    location += relative;
                    // console.log('Relative below')
                }
                if (location >= intcode.length) {
                    if (memory.has(location)) {
                        theArgs.push(memory.get(location))
                        // console.log(`Fetching value ${memory.get(location)} from memory ${location} (POSITION/RELATIVE)`)
                    } else {
                        theArgs.push(0);
                        // console.log(`Fetching value 0 from memory ${location} (POSITION/RELATIVE)`)
                    }
                } else {
                    theArgs.push(intcode[location]);
                    // console.log(`Fetching value ${intcode[location]} from location ${location} (POSITION)`)
                }
            }
        }
        return theArgs;
    }

    run(intcoder) {
        return this.handler(this.getArgs(intcoder.intcode, intcoder.counter, intcoder.relative, intcoder.memory), intcoder);
    }
}