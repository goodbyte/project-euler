let run = true;
let n = 20;

while (run) {
  let count = 0;

  for (let i = 1; i <= 20; i++) {
    if (n % i === 0) count++;
  }

  if (count === 20) run = false;
  else n += 20;
}

console.log(n);