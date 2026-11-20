# Basics, operators and conversions

Topic ID: `operators`

## Concept from zero

A variable names storage with a type. `int n = 3` creates an integer object holding 3; `double x = 3.0` holds a floating-point approximation. A declaration tells C how much storage and which operations to use. Initialise before reading: an uninitialised automatic int is not a useful random starting value.

Statements run in sequence within braces. An if chooses a branch based on zero (false) or nonzero (true). A function's return value is a result passed back to its caller. main returning zero reports successful termination. Include headers so the compiler sees library declarations.

Integer operands give integer division: 100 / 3 is 33. Converting the result afterward cannot recover the fraction. `(double)100 / 3` converts before division and gives about 33.333333. For integers, `%` is the remainder; do not divide or take a remainder by zero. Arithmetic must stay within the type's range; signed overflow has undefined behaviour.

`+ - * / %` compute; `=`, `+=`, `-=` store; `== != < <= > >=` compare and produce 0 or 1. `&&`, `||`, `!` combine truth values. `&&` and `||` short-circuit, so `p != NULL && *p > 0` does not read through a null pointer. `&`, `|`, `^` on integers are bitwise operators: `^` is XOR, never exponentiation. The same `&` is address-of when it has one operand.

`i++` yields the old value and increments; `++i` increments and yields the new value. In a standalone increment statement they have the same final effect. Precedence groups expressions; it does not generally specify operand evaluation order. Avoid reading and changing the same variable in unsequenced operands, such as `i++ + i`.

Character constants such as 'A' have integer codes; '0' is a character, 0 is a number, and "0" is a string containing a character and a terminator. ASCII letter-code questions assume ASCII as stated in the bank. Do not assume every machine gives arbitrary character constants a specific numeric code.

## Blank-spotting tips

- If a fractional answer is required, locate the first division and cast one operand there. `double result = intA / intB` still performs integer division.
- Match the declaration and format: scanf `%d` needs &n for int n, `%f` needs &f for float f, `%lf` needs &d for double d. printf `%d` needs an int and `%f` a double (float is promoted). `%zu` is for sizeof/strlen results, which have type size_t.
- Choose stdio.h for printf/scanf. A cast's type comes from the required arithmetic, not merely the destination variable.
- A switch compares an integer expression against constant case labels. Without break, execution continues through following case bodies; default handles unmatched values. Trace from the matching label, not from the switch's first statement.
- For a macro such as `#define RATE 5`, substitution happens before compilation. Parenthesise expression macros; do not assume a macro behaves like a function or evaluates an argument only once.

## Common traps

- `(double)(q / p)` is too late to prevent integer truncation.
- `scanf("%f", &d)` for a double d has the wrong pointer type; printf's `%f` and `%lf` equivalence does not apply to scanf.
- `if (n = 0)` sets n to zero and chooses false. Use `n == 0` for a test.
- `0 < n < 10` is not a range test. Use `0 < n && n < 10`.
- `#define SQUARE(x) ((x)*(x))` still evaluates x twice; SQUARE(i++) is unsafe. Parentheses fix grouping, not repeated side effects.
- Floating-point values approximate most decimal fractions. Printing six decimals can hide tiny differences; widening a stored float to double does not regain lost precision.

## Worked example: where should the cast go?

Adapted from bank section 10.5, p3 Q4, with a shorter driver and explicit precision.

```c
#include <stdio.h>
int main(void) {
    int p = 3, q = 100;
    double result = q / (__A__)p;
    printf("%.6f\n", __B__);
    return 0;
}
```

Answers: A = `double`; B = `result`.

Reasoning: casting p makes the division floating-point; q is then converted too. printf receives the computed value, not its address. Without the cast, output would be 33.000000.

Output:

```text
33.333333
```

## Worked example: distinguish old and new values

Adapted from bank section 10.10, p5 Q2b. Separate statements make sequencing explicit.

Use one post-increment and one pre-increment so old receives 5, then next and n both become 7.

```c
#include <stdio.h>
int main(void) {
    int n = 5;
    int old = __A__;
    int next = __B__;
    printf("%d %d %d\n", old, next, n);
    return 0;
}
```

Answers: A = `n++`; B = `++n`.

Reasoning: old gets 5, then n becomes 6. The next statement increments to 7 before assigning next. Both next and n are now 7. Do not combine these updates into unsequenced printf arguments.

Output:

```text
5 7 7
```

## Must memorise

- Fractional division: `(double)a / b`; compound updates: `sum += value`.
- Equality `==`; assignment `=`; range `lo <= x && x <= hi`.
- Input address for int: `scanf("%d", &n)`; check its return equals 1 before using n.
- Pre-increment returns new; post-increment returns old. Separate side effects into statements.
- stdio.h for input/output; `^` is XOR; use break to stop switch fall-through.
