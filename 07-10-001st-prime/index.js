function estimateUpperBoundForNthPrime(n) {
  if (n < 6) return 15;
  return Math.ceil(n * (Math.log(n) + Math.log(Math.log(n))));
}

function sieve(limit) {
  const isPrime = new Uint8Array(limit + 1);
  isPrime.fill(1);
  isPrime[0] = 0;
  isPrime[1] = 0;
  const primes = [];
  for (let p = 2; p * p <= limit; p++) {
    if (isPrime[p]) {
      for (let i = p * p; i <= limit; i += p) isPrime[i] = 0;
    }
  }
  for (let i = 2; i <= limit; i++) if (isPrime[i]) primes.push(i);
  return primes;
}

function nthPrime(n) {
  let limit = estimateUpperBoundForNthPrime(n);
  let primes = sieve(limit);
  while (primes.length < n) {
    limit = Math.ceil(limit * 1.5);
    primes = sieve(limit);
  }
  return primes[n - 1];
}

const result = nthPrime(10001);
console.log(result); // 104743