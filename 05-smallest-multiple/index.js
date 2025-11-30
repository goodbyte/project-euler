function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

let result = 1;

for (let i = 1; i <= 20; i++) {
  result = lcm(result, i);
}

console.log(result); // 232792560