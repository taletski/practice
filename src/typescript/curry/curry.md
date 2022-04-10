# Fully Typed Currying

Create a fully typed function `magic` that can be used as follows:
```JS
const multiply = (a: number, b: number, c: number): number => a * b * c;
const one = multiply(1, 1, 1);

const magicMultiply = magic(multiply);
const six = magicMultiply(1, 2, 3);
const eight = magicMultiply(1, 2)(4);
const twentyFour = magicMultiply(2)(3)(4);
```