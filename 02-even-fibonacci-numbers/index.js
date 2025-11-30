const LIMIT = 4_000_000;
let e = [2, 8];
let sum = e[0] + e[1];
let cur = 0;

while ((cur = 4 * e[1] + e[0]) <= LIMIT) {
  sum += cur;
  e = [e[1], cur];
}

console.log(sum); // 4613732