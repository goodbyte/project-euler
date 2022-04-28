const primes = [];
let n = 600851475143;
let i = 2;

while (n !== 1) {
  if (n % i === 0) {
    n /= i;
    primes.push(i);
  }

  i === 2 ? 
    i += 1 :
    i += 2;
}

console.log(`Max prime: ${Math.max(...primes)}`);