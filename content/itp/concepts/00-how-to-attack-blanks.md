# How to attack C code blanks

Topic ID: `strategy`

## Your job in this exam

A blank is a missing part of a working program: a type, expression, condition, address, function name, or whole statement. You do not need to invent an algorithm from scratch. Read the clues already printed. Explain each answer to yourself as a job: "this gives scanf somewhere to store an integer" is more useful than memorising an ampersand.

## A repeatable method

1. Read the whole program before filling anything. Find main, the input, any helper functions, and the final output. Describe the intended transformation in one sentence.
2. Use the sample output. Does it want an index or a value? Is the answer a minimum or maximum? Do indices start at zero? Check actual printf text if the question's prose disagrees.
3. Mark types beside the blanks. An int is a value; int * is an address of an int. scanf usually needs an address; printf usually needs the stored value. A character array already supplies its first character's address in most expressions.
4. Classify each blank before guessing. In `for (__A__)`, the blank may need all three clauses. In `if (__B__)`, it needs an expression. In `__C__;`, the printed semicolon is already supplied.
5. Fill independent, certain blanks first: header names, member access, input addresses, return values, and cleanup. One difficult loop does not prevent other marks.
6. Trace a tiny case on paper. Write columns for index, current element, accumulator, and saved best value. For a destructive digit loop, keep an original copy. For swaps, save the old value before overwriting it.
7. Check boundaries: empty/one-element input where allowed, first and last array cells, ties, zero, and negative data. Never use index n in an n-element array.
8. Read the completed program aloud, including punctuation. Balance braces and parentheses; check commas, quotes, semicolons, and whether a blank is inside quotes. Repeated labels need the same answer everywhere.

## Time and partial marks

For a 150-minute paper of five questions, budget about 5 minutes to scan, 27 minutes per question, and 10 minutes to check. Within a question, spend a few minutes understanding, fill the easy blanks, trace the harder ones, then move on at your checkpoint. Mark uncertain blanks and return later. About ten blanks per question means each small deduction matters. Follow your paper's actual marking instructions; avoid leaving a certain independent answer empty because another blank is unresolved.

## Blank-spotting tips

- Read declarations and later uses together. `printf("%d", result)` suggests an integer result; `if (result == -1)` suggests an index-search failure convention.
- Read punctuation already outside the blank. Supply `stdlib.h` inside `#include <__A__>`, and `w` inside `"__A__"`, without duplicating brackets or quotes.
- Match headers to jobs: stdio.h for console/files, stdlib.h for allocation/free, string.h for string operations, ctype.h for character classification/conversion.
- Check input formats against destinations: `%d` with int *, `%f` with float *, `%lf` with double *, `%c` with char *, and bounded `%s` with writable char storage. In printf, `%f` prints a promoted float or a double; `%zu` prints a size_t.
- For each function call, ask what is returned and whether the caller stores it. `toupper(c)` returns a character code; `strcmp(a,b)` returns zero for equality; malloc returns an address or NULL.

## Common traps

- `=` changes a variable; `==` tests equality. A compiling assignment can still make the wrong condition.
- A semicolon immediately after a for/while header makes an empty body. Extra semicolons are not always harmless.
- `a < b < c` means `(a < b) < c` in C. Write two comparisons joined by `&&`.
- Do not force a memorised answer into a broken skeleton. The bank labels repairs: its concatenation destination was uninitialised, one decrement expression was unsequenced, and the signed-overflow "infinite loop" has undefined behaviour. Use the repaired app examples and reason from the actual code.
- Compiling is necessary but does not prove bounds, lifetime, or correct output. Trace as well.

## Worked example: deduce backwards from the output

Adapted from digit summing, bank section 8.3, p2 Q6. This short driver replaces interactive input with 123.

```c
#include <stdio.h>
int main(void) {
    int n = 123, sum = 0;
    while (__A__) {
        sum += n % 10;
        n = __B__;
    }
    printf("%d\n", __C__);
    return 0;
}
```

Answers: A = `n > 0`; B = `n / 10`; C = `sum`.

Reasoning: the output asks for the sum, not n, which becomes zero. Remainder gives 3, then 2, then 1; integer division removes each processed digit. The condition stops before another iteration on zero. You can deduce C independently even if A takes longer.

Output:

```text
6
```

## Must memorise

- Read whole program, identify each blank's job, fill certain answers, trace, check punctuation.
- Valid n-element indices: 0 through n - 1; traversal normally uses i < n.
- Keep original data if later comparisons need it; save old values before overwriting them.
- Trace values and addresses separately. Check sample output including spaces and newlines.

## Two-day route

Day 1: read 01 through 07 in order, doing one related practice program after each note. Say why every blank works before revealing answers. End with structs and dynamic memory if time allows.

Day 2: finish 08 through 11, revisit yesterday's errors, then take one timed mock and study its marked blanks. Use the cheatsheet for final recall. If time is tight, prioritise high-priority bank topics after the basics; reserve sleep and a final short review rather than rushing through every question.
