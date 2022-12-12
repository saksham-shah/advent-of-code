const fs = require('fs');
var inp = fs.readFileSync('./inputs/day22.txt').toString();

inp = inp.split('\n');

var shuffle = [];

for (var step of inp) {
    var breakdown = step.split(' ');
    var last = breakdown[breakdown.length - 1];
    var first = breakdown[0];
    if (first == 'cut') {
        shuffle.push({
            type: 'cut',
            num: parseInt(last)
        });
    } else {
        last = parseInt(last);
        if (isNaN(last)) {
            shuffle.push({ type: 'deal' });
        } else {
            shuffle.push({
                type: 'increment',
                num: last
            });
        }
    }
}

// console.log(shuffle);

var deck = [];
var num = 10007;
// var num = 10;
// num = 119315717514047;

for (var i = 0; i < num; i++) {
    deck.push(i);
}

function deal(deck) {
    var newDeck = [];
    for (var i = deck.length - 1; i >= 0; i--) {
        newDeck.push(deck[i]);
    }
    return newDeck;
}

function followDeal(follow, deckNum) {
    return deckNum - follow - 1;
}

function cut(deck, num) {
    if (num > 0) {
        var right = deck.slice(0, num);
        var left = deck.slice(num, deck.length);
    } else {
        var right = deck.slice(0, deck.length + num);
        var left = deck.slice(deck.length + num, deck.length);
    }
    var newDeck = [];
    for (var i of left) newDeck.push(i);
    for (var i of right) newDeck.push(i);
    return newDeck
}

function followCut(follow, num, deckNum) {
    var r = (follow - num) % deckNum;
    if (r >= 0) return r;
    return r + deckNum;
    if (num > 0) {
        if (follow < num) {
            return follow + deckNum - num;
        }
        return follow - num
    }
    return followCut(follow, deckNum + num, deckNum);
}

function increment(deck, num) {
    var newDeck = deck.slice();
    var pointer = 0;
    for (var i of deck) {
        newDeck[pointer] = i;
        pointer = (pointer + num) % deck.length;
    }
    return newDeck;
}

function followIncrement(follow, num, deckNum) {
    return (follow * num) % deckNum;
}

function reverseIncrement(follow, num, deckNum) {
    var current = follow;
    while (current % num != 0) {
        current += deckNum
    }
    return current / num;
}

function doStep(deck, step) {
    switch (step.type) {
        case 'deal':
            return deal(deck);
        case 'cut':
            return cut(deck, step.num);
        case 'increment':
            return increment(deck, step.num);
    }
}

function followStep(follow, step, deckNum) {
    switch (step.type) {
        case 'deal':
            return followDeal(follow, deckNum);
        case 'cut':
            return followCut(follow, step.num, deckNum);
        case 'increment':
            return followIncrement(follow, step.num, deckNum);
    }
}

function followRevStep(follow, step, deckNum) {
    switch (step.type) {
        case 'deal':
            return followDeal(follow, deckNum);
        case 'cut':
            return followCut(follow, -step.num, deckNum);
        case 'increment':
            return reverseIncrement(follow, step.num, deckNum);
    }
}

function revStep(deck, step) {
    switch (step.type) {
        case 'deal':
            return deal(deck);
        case 'cut':
            return cut(deck, -step.num);
        case 'increment':
            // return increment(deck, step.num);
    }
}

var follow = 2020;
// follow = 33964639679029;

// for (var step of shuffle) {
//     follow = followStep(follow, step, 10007);
// }

//101741582076661

var prev = [];

for (var i = 0; i < 101741; i++) {
    // if (prev.includes(follow)) console.log(i, follow);
    // prev.push(follow);
    for (var j = shuffle.length - 1; j >= 0; j--) {
        follow = followRevStep(follow, shuffle[j], 119315717514047);
    }
    // console.log(follow);
}
// for (var i = shuffle.length - 1; i >= 0; i--) {
//     follow = followRevStep(follow, shuffle[i], 119315717514047);
// }

console.log(follow)

// console.log(reverseIncrement(4, 3, 10));

// console.log(followCut(4, -4, 10));

// for (var step of shuffle) {
//     deck = doStep(deck, step);
// }

// for (var i = 0; i < deck.length; i++) {
//     if (deck[i] == 2019) console.log(i);
// }

// console.log(deck);