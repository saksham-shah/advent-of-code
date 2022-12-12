var fs = require('fs');

var input = fs.readFileSync('./inputs/day8.txt').toString();
var values = input.split('');

// console.log(values);

var wide = 25;
var tall = 6;

var area = wide * tall;

// var layers = values.length / area;

console.log(values.length);

var layers = [];

while (values.length > 0) {
    var thisLayer = values.splice(0, area);
    layers.push(thisLayer);
}

// var record = [Infinity, 0, 0];
// for (var layer of layers) {
//     var c = count(layer);
//     if (c[0] < record[0]) {
//         record = c;
//     }
// }

// console.log(record);

var picture = [];
for (var i = 0; i < area; i++) {
    var layerCount = 0;
    var colour = 2;
    while (colour == 2) {
        colour = layers[layerCount][i];
        layerCount++;
    }
    picture.push(colour);
}

while (picture.length > 0) {
    var string = picture.splice(0, wide).join('');
    console.log(string);
}

// console.log(picture);

function count(layer) {
    var numCount = [0,0,0];
    for (var value of layer) {
        numCount[value]++;
    }
    return numCount;
}

// console.log(layers);

/*
__________________________________________________
***********p5.js code to display image************
__________________________________________________

var picture = `1000011100111101001010010
1000010010100001010010010
1000010010111001100010010
1000011100100001010010010
1000010100100001010010010
1111010010100001001001100`;

var arr = [];
var rows;

function setup() {
  createCanvas(500, 120);
  rows = picture.split('\n');
  for (var row of rows) {
    rArr = [];
    for (var char of row) {
      rArr.push(char);
    }
  }
}

function draw() {
  background(220);
  
  noStroke();
  fill(0);
  
  for (var i = 0; i < rows.length; i++) {
    for (var j = 0; j < rows[i].length; j++) {
      if (rows[i][j] == 0) {
        rect(j*20, i*20, 20, 20);
      }
    }
  }
}
*/