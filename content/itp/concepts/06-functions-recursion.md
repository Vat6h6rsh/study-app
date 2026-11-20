# Functions and recursion

Topic ID: `functions`

## Concept from zero

A function gives a reusable piece of work a name. Its declaration tells the compiler its return type and parameter types. `int f(int n)` takes an int and returns an int; `void swap(int *a, int *b)` returns no value. A declaration/prototype must be visible before a call; defining the helper above main is one way. In C, `(void)` means no parameters.

Every C argument is passed by value: the parameter receives a copy. Changing a copied int changes only that local object. A copied pointer still points at the caller's object, so writing through it can change the caller's storage. An array parameter is adjusted to a pointer; pass its length separately. To return an answer, use return and make the caller store or use it; printing a result inside a helper is not the same as returning it.

Each ordinary function invocation has its own automatic variables and parameters. Implementations commonly keep this call state on a stack, with later calls above earlier ones. Returning resumes the waiting caller with a result. C does not require a physical stack, and optimisations can remove some call frames, but separate call state is a useful way to trace recursion.

Recursion is a function calling itself on a smaller problem. It needs a base case that returns without another recursive call, progress toward that case, and a rule that uses or returns the smaller answer. For factorial of a nonnegative small n, factorial(0) = 1 and factorial(n) = n * factorial(n - 1). The multiplication happens as calls return. In the bank's transfer(n,m), each call moves one unit from n to m, preserving n + m, until n is zero.

Some recurrences use iteration instead. For a geometric sequence, initialise a term, print/use it, then multiply by the ratio to reach the next term. Whether the first term is processed before or after the update depends on the requested sequence. Small-input assumptions matter: factorial and geometric terms quickly exceed integer limits, and very deep recursion can exhaust available call storage.

## Blank-spotting tips

- Match the call's argument types with the parameters and the caller's later use with the return type. An assigned integer result needs an integer-returning helper.
- If the helper's answer disappears on the way back, look for a missing return before the recursive call. A bare recursive call followed by falling off an int-returning helper is not an answer.
- Locate the stopping test first. Then check that each recursive argument moves toward it: n - 1 reaches zero only for the intended nonnegative n.
- A factorial product starts at 1; this also makes factorial(0) correct. A binomial coefficient uses n! / (r! * (n-r)!), with 0 <= r <= n and all intermediate results fitting.
- User-defined helpers need declarations, not an invented header. stdio.h supplies printf in drivers; no library header is needed for your own recursion.

## Common traps

- Passing x to a helper expecting int * is a type mismatch; pass &x. Calling a value-only helper cannot modify x by assigning its parameter.
- Base case n == 0 plus recursive n + 1 moves away from zero for positive inputs.
- Returning n instead of 1 at factorial's n == 0 base case makes every product zero.
- Forgetting return on a recursive result loses the value the caller needs.
- A local variable in one recursive call is separate from the identically named local in another. A static local is shared across calls; see scope and storage.

## Worked example: follow calls down and returns up

Adapted from bank section 9.2, p2 Q8, made into completion blanks.

```c
#include <stdio.h>
int transfer(int n, int m) {
    if (__A__) return __B__;
    return transfer(__C__, m + 1);
}
int main(void) {
    printf("%d\n", transfer(4, 5));
    return 0;
}
```

Answers: A = `n == 0`; B = `m`; C = `n - 1`.

Reasoning: calls are (4,5), (3,6), (2,7), (1,8), (0,9). At the base, m is 9. Each waiting return passes that same answer back. n + m remains 9 throughout; this is a useful check without expanding every return.

Output:

```text
9
```

## Worked example: factorial identity and return type

Adapted from the factorial helper in bank section 9.1, p1 Q2, with a small test driver.

```c
#include <stdio.h>
int factorial(int n) {
    int product = __A__;
    for (int i = 1; i <= n; ++i) product *= __B__;
    return __C__;
}
int main(void) {
    printf("%d %d\n", factorial(0), factorial(4));
    return 0;
}
```

Answers: A = `1`; B = `i`; C = `product`.

Reasoning: zero makes no loop iterations, leaving the multiplicative identity 1. Four multiplies 1 * 1 * 2 * 3 * 4 = 24. The int return type matches the two %d arguments. The inputs here are nonnegative and small enough for int.

Output:

```text
1 24
```

## Must memorise

- Function declaration: return type, name, typed parameters; match the call.
- C passes values, including pointer values; use &x to supply x's address.
- Recursion: base case, progress, return of the smaller result. Trace arguments down and returned values up.
- Factorial identity 1; n! = n * (n - 1)!; keep inputs small enough to avoid overflow.
- Array helpers need an explicit length parameter.
