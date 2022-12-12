var moonpos = [
    [14,2,8],
    [7,4,10],
    [1,17,16],
    [-4,-1,1]
];

//268297
//231615
//108345

function lcm(x, y) {
    for (var i = 2; i*i < x || i*i < y; i++) {
        if (x%i == 0 && y%i == 0) {
            return i * lcm(x/i, y/i);
        }
    }
    return x * y;
}

console.log(lcm(lcm(268296,231614), 108344));

// moonpos = [
//     [-1, 0, 2],
//     [2, -10, -7],
//     [4, -8, 8],
//     [3, 5, -1]
// ];

// moonpos = [
//     [-8, -10, 0],
//     [5, 5, 10],
//     [2, -7, 3],
//     [9, -8, -3]
// ];

// moonpos = [
//     [1,2,-9],
//     [-1,-9,-4],
//     [17,6,8],
//     [12,4,2]
// ]

var moonvel = [
    [0,0,0],
    [0,0,0],
    [0,0,0],
    [0,0,0]
];

function timeStep(pos, vel) {
    // apply gravity
    for (var moon = 0; moon < pos.length; moon++) {
        for (var other = 0; other < pos.length; other++) {
            for (var i = 0; i < pos[moon].length; i++) {
                if (pos[moon][i] > pos[other][i]) {
                    vel[moon][i] -= 1;
                    // vel[other][i] += 1;
                } else if (pos[moon][i] < pos[other][i]) {
                    vel[moon][i] += 1;
                    // vel[other][i] -= 1;
                }
            }
        }
    }

    // apply velocity
    for (var moon = 0; moon < pos.length; moon++) {
        for (var i = 0; i < pos[moon].length; i++) {
            pos[moon][i] += vel[moon][i];
        }
    }
}

function XStep(pos, vel, i) {
    // apply gravity
    for (var moon = 0; moon < pos.length; moon++) {
        for (var other = 0; other < pos.length; other++) {
            if (pos[moon][i] > pos[other][i]) {
                vel[moon][i] -= 1;
                // vel[other][i] += 1;
            } else if (pos[moon][i] < pos[other][i]) {
                vel[moon][i] += 1;
                // vel[other][i] -= 1;
            }
        }
    }

    // apply velocity
    for (var moon = 0; moon < pos.length; moon++) {
        pos[moon][i] += vel[moon][i];
    }
}

function reverseStep(pos, vel) {
    // apply velocity
    for (var moon = 0; moon < pos.length; moon++) {
        for (var i = 0; i < pos[moon].length; i++) {
            pos[moon][i] -= vel[moon][i];
        }
    }

    // apply gravity
    for (var moon = 0; moon < pos.length; moon++) {
        for (var other = 0; other < pos.length; other++) {
            for (var i = 0; i < pos[moon].length; i++) {
                if (pos[moon][i] > pos[other][i]) {
                    vel[moon][i] += 1;
                    // vel[other][i] += 1;
                } else if (pos[moon][i] < pos[other][i]) {
                    vel[moon][i] -= 1;
                    // vel[other][i] -= 1;
                }
            }
        }
    }
}

function getEnergy(pos, vel) {
    var energy = 0;
    for (var moon = 0; moon < pos.length; moon++) {
        var pe = 0;
        for (var i = 0; i < pos[moon].length; i++) {
            pe += Math.abs(pos[moon][i]);
        }

        var ke = 0;
        for (var i = 0; i < pos[moon].length; i++) {
            ke += Math.abs(vel[moon][i]);
        }

        energy += ke*pe;
    }

    return energy;
}

// for (var i = 0; i < 1000; i++) {
//     // console.log('STEP', i+1);
//     timeStep(moonpos, moonvel);

//     // console.log(moonvel);
// }

// console.log(getEnergy(moonpos, moonvel));

// timeStep(moonpos, moonvel);

// console.log(moonpos);

function getSteps(pos, vel) {

    var initialpos = [];
    for (var moon = 0; moon < pos.length; moon++) {
        initialpos.push([]);
        for (var i = 0; i < pos[moon].length; i++) {
            initialpos[moon].push(pos[moon][i]);
        }
    }

    var initialvel = [];
    for (var moon = 0; moon < vel.length; moon++) {
        initialvel.push([]);
        for (var i = 0; i < vel[moon].length; i++) {
            initialvel[moon].push(vel[moon][i]);
        }
    }

    console.log(vel);

    var steps = 0;
    while (steps < 4686774930) {
        steps++;
        timeStep(pos, vel);
        console.log(vel);
        // console.log(pos, vel);

        // console.log(pos[0][2]);

        var equal = true;

        for (var moon = 0; moon < pos.length; moon++) {
            if (pos[moon][0] != initialpos[moon][0] || pos[moon][1] != initialpos[moon][1] || pos[moon][2] != initialpos[moon][2]) {
                equal = false;
            }

            if (vel[moon][0] != initialvel[moon][0] || vel[moon][1] != initialvel[moon][1] || vel[moon][2] != initialvel[moon][2]) {
                equal = false;
            }
        }

        if (equal) {
            console.log(steps)
            return steps;
        }
    }

    // var states = [[pos.clone(), vel.clone()]];
    // var steps = 0;

    

    // while (steps < 3000) {
    //     console.log(pos, vel);
    //     steps++;
    //     timeStep(pos, vel);
    //     console.log(pos, vel);

    //     var thisState = [pos.clone(), vel.clone()];

    //     for (var state of states) {
    //         var stateEqual = true;
    //         for (var i = 0; i < state.length; i++) {
    //             for (var j = 0; j < state[i].length; j++) {
    //                 for (var k = 0; k < state[i][k].length; k++) {
    //                     if (state[i][j][k] != thisState[i][j][k]) stateEqual = false;
    //                 }
    //             }
    //         }
    //         if (stateEqual == true) {
    //             return steps;
    //         }
    //         states.push(thisState);
    //     }
    // }

    // return null;
}

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

// console.log(getSteps(moonpos, moonvel));
// console.log([2,3,4].clone());

// getSteps(moonpos, moonvel);

function getRepeats(pos, vel) {
    var revPos = pos.clone();
    var revVel = vel.clone();
    var initPos = pos.clone();
    var repeats = [
        [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ],
        [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]
    ];

    repeats = [
        [
            [0, 1, 1],
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1]
        ],
        [
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1]
        ]
    ];

    var sequences = [
        [
            [[], [], []],
            [[], [], []],
            [[], [], []],
            [[], [], []]
        ],
        [
            [[], [], []],
            [[], [], []],
            [[], [], []],
            [[], [], []]
        ]
    ];

    function checkDone(arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] instanceof Array) {
                var done = checkDone(arr[i]);
                if (!done) return false;
            }
            if (arr[i] == 0) return false;;
        }
        return true;
    }

    console.log(checkDone(repeats));

    function checkRepeating(arr) {
        if (arr.length < 3 || (arr.length%2) == 1) return 0;
        var left = arr.slice(0, arr.length / 2);
        var right = arr.slice(arr.length / 2, arr.length);

        // console.log(left, right);

        for (var i = 0; i < left.length; i++) {
            // if (i > 100) return left.length;
            if (left[i] != right[i]) {
                // console.log(left, right);
                return 0;
            }
        }
        console.log('yay', left.length);
        return left.length;

    }

    var steps = 0;

    // for (var i = 0; i < 10000000; i++) {
    //     timeStep(pos, vel);
    // }

    console.log('starting');

    var last = 0;

    while (!checkDone(repeats)) {
        steps++;

        for (var i = 0; i < 0; i++) {
            sequences[0][i][0].push(pos[i][0]);
            // sequences[0][i][1].push(pos[i][1]);
            // sequences[0][i][2].push(pos[i][2]);

            // sequences[1][i][0].push(vel[i][0]);
            // sequences[1][i][1].push(vel[i][1]);
            // sequences[1][i][2].push(vel[i][2]);

            if (repeats[0][i][0] == 0) repeats[0][i][0] = checkRepeating(sequences[0][i][0]);
            // if (repeats[0][i][1] == 0) repeats[0][i][1] = checkRepeating(sequences[0][i][1]);
            // if (repeats[0][i][2] == 0) repeats[0][i][2] = checkRepeating(sequences[0][i][2]);

            // if (repeats[1][i][0] == 0) repeats[1][i][0] = checkRepeating(sequences[1][i][0]);
            // if (repeats[1][i][1] == 0) repeats[1][i][1] = checkRepeating(sequences[1][i][1]);
            // if (repeats[1][i][2] == 0) repeats[1][i][2] = checkRepeating(sequences[1][i][2]);

        }

        if (steps % 10000 == 0) console.log(steps);

        // if (vel[0][0][0] == 0 && vel[0][0][1] == 0 && vel[0][0][2] == 0) console.log(steps);

        if (initPos[0][2] == pos[0][2] && vel[0][2] == 0 && initPos[1][2] == pos[1][2] && vel[1][2] == 0 && initPos[2][2] == pos[2][2] && vel[2][2] == 0 && initPos[3][2] == pos[3][2] && vel[3][2] == 0) {
            if (steps > 10) {
                console.log(steps);
                return steps;
            }
        };
        // checkRepeating(sequences)

        // console.log(pos, revPos);

        timeStep(pos, vel);
        // reverseStep(revPos, revVel);

        // console.log(psos);

        // if (vel[0][0] == 0) {
        //     // console.log(steps - last);
        //     last = steps;
        // };
        // console.log(pos[0][0]);

        // if (repeats[0][i][0] != 0) console.log('wow what');

    }
    console.log(repeats);
    return repeats;
}

// timeStep(moonpos, moonvel);
// console.log(moonpos, moonvel);
// reverseStep(moonpos, moonvel);
// console.log(moonpos, moonvel);
// reverseStep(moonpos, moonvel);
// console.log(moonpos, moonvel);

// getRepeats(moonpos, moonvel);