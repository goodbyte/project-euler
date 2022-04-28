let sum = 0;
let last = [1, 1];
let term = 0;

while ((term = last[0] + last[1]) < 4e6) {
  if (term % 2 === 0) sum += term;
  last = [last[1], term];
}

console.log(sum);