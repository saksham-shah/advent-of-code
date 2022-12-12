function checkPassword(num) {
    var tempdouble = false;
    var double = false;
    var justdoubled = false;
    var strNum = '' + num;
    var prev = 0;
    for (var digit of strNum) {
        if (prev > digit) {
            return false;
        }
        if (prev == digit) {
            if (justdoubled) {
                tempdouble = false;
            } else{
                tempdouble = true;
            }
            justdoubled = true;
        } else {
            if (tempdouble) {
                double = true;
            }
            tempdouble = false;
            justdoubled = false;
        }
        prev = digit;
    }
    if (!double && !tempdouble) {
        return false;
    }
    return true;
}

var count = 0;
for (var i = 382345; i < 843168; i++) {
    if (checkPassword(i)) {
        count++;
    }
}

console.log(count);
// console.log(checkPassword(111222));
