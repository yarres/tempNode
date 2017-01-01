const calc = require('./calc');

const numbersToAdd = [
  3,
  4,
  10,
  2
];

const result = calc.sum(numbersToAdd);
console.log(`The result is: ${result}`);


const _ = require('lodash')

var result2 = _.assign({
  'a': 1
}, {
  'b': 2
}, {
  'c': 3
});
// → { 'a': 1, 'b': 2, 'c': 3 }
console.log(result2);


const numbers = [2, 4, 1, 5, 4];

function isBiggerThanTwo(num) {
  return num > 2;
}

var numbers2 = numbers.filter(isBiggerThanTwo);
console.log(numbers2);

const fs = require('fs')

console.log('start reading a file...')

fs.readFile('file.md', 'utf-8', function (err, content) {
  if (err) {
    console.log('error happened during reading the file')
    return console.log(err)
  }

  //console.log(content)
});



console.log('end of the file')
