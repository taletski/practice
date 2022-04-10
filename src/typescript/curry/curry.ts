/**
 * Type of the function that was curried (see example).
 * @param NeededArgs - tuple of arguments that original function needs
 * @param R - return type of the original function
 *
 * @example
 * const greet = (name: string, age: number, location: string) => 
 *  `Hi, my name is ${name}; I am ${age} and I live in ${location}`
 * const curry = <NeededArgs extends unknown[], R>(
 * fn: (...neededArgs: NeededArgs) => R
 * ): Curried<NeededArgs, R> => { // (!) note the use of `Curried<NeededArgs, R>` here
 *  //...
 * }
 *
 * const curriedGreet = curry(greet)
 *
 * const result1 = curriedGreet("John", 42, "US")
 * const result2 = curriedGreet("John", 42)("US")
 * const result3 = curriedGreet("John")(42)("US")

 * const error1 = curriedGreet(0, 42, "US") // return type is `never` - first argument has incorrect type
 * const error2 = curriedGreet("John", 42)(false) // return type is `never` - last argument has incorrect type
 * const error3 = curriedGreet("John", 42)("US", "wrong") // return type is `never` - too many arguements
 */

type Curried<NeededArgs extends unknown[], R> = <
  ProvidedArgs extends unknown[]
>(
  ...providedArgs: ProvidedArgs
) => CurriedFnReturn<NeededArgs, ProvidedArgs, R>;

/**
 * Return type of curried function (@see {@link Curried}).
 * @param NeedeArgs - tuple of arguments required by the original function
 * @param ProvidedArgs - tuple of arguments provided to the curried function at some point
 * @param R - return type of the original function
 * @returns - if `ProvidedArgs` is not a subset of `NeededArgs` returns `never`;
 * If `ProvidedArgs` exactly matches `NeededArgs` returns
 */
type CurriedFnReturn<
  NeededArgs extends unknown[],
  ProvidedArgs extends unknown[],
  R
> = ProvidedArgs extends FirstElemsOf<NeededArgs, ProvidedArgs['length']>
  ? [] extends RestArgs<NeededArgs, ProvidedArgs>
    ? R
    : Curried<RestArgs<NeededArgs, ProvidedArgs>, R>
  : never;

/**
 * Return type - tuple first N elements of the provided tuple
 */
type FirstElemsOf<
  Tuple extends unknown[],
  N extends number,
  R extends unknown[] = []
> = R['length'] extends N
  ? R
  : Tuple extends [infer First, ...infer Rest]
  ? FirstElemsOf<Rest, N, [...R, First]>
  : R;

/**
 * Alias for {@link TuplesRelativeComplement tuples relative complement}
 */
type RestArgs<
  ProvidedArgs extends unknown[],
  NeededArgs extends unknown[]
> = TuplesRelativeComplement<ProvidedArgs, NeededArgs>;

/**
 * For tuples `A` and `B` returns the tuple of elements that belong to `A` and do not belong to `B`
 * @example
 * type A = [number, string, boolean, number]
 * type B = [number, string]
 *
 * type Result = TuplesRelativeComplement<A, B> // [boolean, number]
 */
type TuplesRelativeComplement<
  A extends unknown[],
  B extends unknown[]
> = A extends [...B, ...infer Rest] ? Rest : [];

/**
 * Returns a curried version `cFn` of `fn` that in case when `fn` accepts three arguments
 * can be called like the following:
 * - cFn(arg1, arg2, arg3)
 * - cFn(arg1, arg2)(arg3)
 * - cFn(arg1)(arg2)(arg3)
 *
 * Limitations:
 * - Types will not work as expected for generics e.g. `fn<A, B, C>(a: A, b: B, c: C)`
 * - Return type will always be `never` for functions with unlimited number of args
 * e.g. `fn(...args: number[]) => number`
 *
 * @see {@link Curried} for more examples on how to use the function.
 * @param fn - function to curry
 */
export function curry<NeededArgs extends unknown[], R>(
  fn: (...neededArgs: NeededArgs) => R
): Curried<NeededArgs, R> {
  return <ProvidedArgs extends unknown[]>(
    ...providedArgs: ProvidedArgs
  ): CurriedFnReturn<NeededArgs, ProvidedArgs, R> => {
    if (providedArgs.length >= fn.length) {
      return fn(...(providedArgs as any)) as any;
    } else {
      return curry((fn as any).bind(null, ...providedArgs)) as any;
    }
  };
}

/**
 *
 * Task
 *
 */

const multiply = (a: number, b: number, c: number): number => a * b * c;
const one = multiply(1, 1, 1);

const magic = curry;
const magicMultiply = magic(multiply);
const six = magicMultiply(1, 2, 3);
const eight = magicMultiply(1, 2)(4);
const twentyFour = magicMultiply(2)(3)(4);

console.log(six, eight, twentyFour);

/**
 *
 * Generic args type safety
 *
 */

const greet = (name: string, age: number, location: string) =>
  `Hi, my name is ${name}; I am ${age} and I live in ${location}`;

const curriedGreet = curry(greet);

const result1 = curriedGreet('John', 42, 'US');
const result2 = curriedGreet('John', 42)('US');
const result3 = curriedGreet('John')(42)('US');

console.log(result1, result2, result3);

const error1 = curriedGreet(0, 42, 'US'); // return type is `never` - first argument has incorrect type
const error2 = curriedGreet('John', 42)(false); // return type is `never` - last argument has incorrect type
const error3 = curriedGreet('John', 42)('US', 'wrong'); // return type is `never` - too many arguements
