function sumSquareDifference(n) {
  const sum = n * (n + 1) / 2;
  const squareOfSum = sum * sum;
  const sumSquares = n * (n + 1) * (2 * n + 1) / 6;
  return squareOfSum - sumSquares;
}

console.log(sumSquareDifference(100));
