# Loops, digits and number patterns

Topic ID: `loops`

## Concept from zero

A loop repeats a small state change. A for loop has initialisation (once), condition (before each body), and update (after each body). A while tests before the body; a do/while tests after and therefore runs at least once. In a while, arrange your own update so the condition eventually becomes false. break exits the nearest loop; continue skips the remaining body (and a for still runs its update).

Choose an accumulator's identity: a sum starts at 0, a product or power at 1. Reset a per-item accumulator inside the outer loop; otherwise it accidentally includes earlier items. Use braces around multi-statement bodies.

For a nonnegative decimal integer, n % 10 is the last digit because n = 10 * quotient + remainder. Integer n / 10 discards that last digit. Repeating this walks right to left until n is zero. Save an original copy if a later test needs the starting number. Zero has digit sum zero; a loop using n > 0 deliberately makes zero iterations. To count zero as one digit, special-case it or use do/while.

To reverse digits, append each extracted digit with rev = rev * 10 + digit. A palindrome test compares the reversed result with the saved original. Both reversal and digit-cube sums must fit their integer types. The bank's cube-of-digits test always cubes; a general Armstrong test instead uses the number of digits as the exponent.

Other recurring jobs: primes start at 2 because 1 is not prime; test possible divisors and reset a prime flag for each candidate. With positive integers, d <= n / d avoids overflow that d * d might cause. Fibonacci needs old values: compute next from a and b, then move a to b and b to next. A repeated-multiplication power starts at 1 so exponent zero works. Nested pattern loops use the outer loop for rows and inner loop for columns; place the newline after each row. Pascal coefficients can use factorials/binomial coefficients for small inputs; factorial overflow limits those examples.

## Blank-spotting tips

- `% 10` beside an accumulator usually means digit extraction; `/ 10` is the progress update. A loop that never changes the tested number will not finish.
- If the final comparison uses the original number, find where that copy must be saved before the loop.
- Infer bounds from the goal: i < n visits n zero-based cells; i <= n visits positive integers 1 through n when starting at 1.
- A newline inside the inner loop prints one cell per line. For a rectangular pattern, it usually belongs after the inner loop.
- Modulus and integer multiplication need no maths header. printf needs stdio.h. For integer digit cubes, d*d*d avoids a floating-point pow call.

## Common traps

- Starting a product at zero makes every later product zero.
- Writing n % 10 where n / 10 is needed repeatedly keeps only a digit instead of removing it.
- Testing total == n after destroying n compares against zero; compare against the saved copy.
- Updating Fibonacci a before computing the sum can lose a term. Compute next first.
- A positive signed int that keeps increasing is not a defined infinite loop: overflow is undefined, as flagged for bank p5 Q3c.
- Negative digit input needs a stated policy. These exercises use nonnegative inputs; blindly negating INT_MIN cannot represent its positive magnitude as int.

## Worked example: sum the digits

Adapted from bank section 8.3, p2 Q6. Fixed input avoids prompt noise.

```c
#include <stdio.h>
int main(void) {
    int n = 12345, sum = 0;
    while (__A__) {
        int digit = __B__;
        sum += digit;
        n = __C__;
    }
    printf("%d\n", sum);
    return 0;
}
```

Answers: A = `n > 0`; B = `n % 10`; C = `n / 10`.

Reasoning: the (digit, sum, remaining n) states are (5,5,1234), (4,9,123), (3,12,12), (2,14,1), (1,15,0). n reaches zero; sum retains the answer.

Output:

```text
15
```

## Worked example: compare the cube sum with the original

Adapted from bank section 8.2, p4 Q3c. This is the bank's fixed cube test, not a general n-digit Armstrong algorithm.

```c
#include <stdio.h>
int main(void) {
    int n = 153, original = n, sum = 0;
    while (n > 0) {
        int d = n % 10;
        sum += __A__;
        n /= 10;
    }
    if (__B__) printf("match\n");
    else printf("no match\n");
    return 0;
}
```

Answers: A = `d * d * d`; B = `sum == original`.

Reasoning: 3 cubed + 5 cubed + 1 cubed is 27 + 125 + 1 = 153. original remains 153 although n becomes zero. For 123 the sum is 36, so the other branch would run.

Output:

```text
match
```

## Must memorise

- Last digit `n % 10`; remove digit `n /= 10`; reverse update `rev = rev * 10 + d`.
- Sum starts at 0; product/power starts at 1; save `original = n` before destructive loops.
- Array loop `for (int i = 0; i < n; ++i)`; positive range loop starts at 1.
- Fibonacci order: `next = a + b; a = b; b = next`.
- Reset per-candidate flags/sums inside the outer loop; put a pattern's newline after its inner loop.
