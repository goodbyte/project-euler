function largestPrimeFactor(n) {
  let max = -1;
  while (n % 2 === 0) { max = 2; n /= 2; }
  for (let i = 3; i * i <= n; i += 2) {
    while (n % i === 0) { max = i; n /= i; }
  }
  if (n > 1) max = n;
  return max;
}

console.log(largestPrimeFactor(600851475143)); // 6857