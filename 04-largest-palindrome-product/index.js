let result = 0;

for (let i = 999; i > 99; i--) {
  for (let n = 999; n > 99; n--) {
    const num = (i * n).toString();
    const cut = Math.floor(num.length / 2);
    const firstPart = num.slice(0, cut);
    const lastPart = num.slice(cut).split('').reverse().join('');

    if (
      firstPart === lastPart &&
      +num > +result
    ) {
      result = num;
    }
  }
}

console.log(`Biggest palindrome: ${result}`);