function sumMultiples(multiples, limit = 1000) {
  const sumFor = (n) => {
    const k = Math.floor((limit - 1) / n);
    return n * k * (k + 1) / 2;
  };

  const sum = multiples.reduce((acc, m) => acc + sumFor(m), 0);
  const exclude = sumFor(multiples.reduce((acc, m) => acc * m, 1));

  return sum - (multiples.length > 1 ? exclude : 0);
}

console.log(sumMultiples([3, 5])); // 233168