let largestPalindrome = 0;

const isPalindrome = (num) => {
  const str = num.toString();
  return str === str.split('').reverse().join('');
};

for (let i = 999; i >= 100; i--) {
  for (let j = 999; j >= 100; j--) {
    const product = i * j;
    
    if (product <= largestPalindrome) break;
    
    if (isPalindrome(product)) {
      largestPalindrome = product;
    }
  }
}

console.log(largestPalindrome); // 906609