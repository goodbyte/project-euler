let sumSquares = 0;
let squareSum = 0;

for (let i = 1; i <= 100; i++) {
  sumSquares += i ** 2;
  squareSum += i;
}

console.log((squareSum ** 2) - sumSquares);