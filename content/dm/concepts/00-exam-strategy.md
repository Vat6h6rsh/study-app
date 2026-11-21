# Exam strategy and how to type mathematics

Topic ID: `strategy`

## Start from the announced exam

The exam is on 28 November 2026, is worth 50 marks and is entirely typed. The pattern is unknown. At least half the marks will come from truth tables, induction, relations/equivalence classes, posets, recurrences, graphs and MST. First learn a complete answer method for each; then practise groups, knights/knaves, counting, sets/functions/countability and counterexamples.

## A repeatable answer method

1. Identify the task: compute, prove, disprove, classify or trace an algorithm.
2. State the relevant definition or method. Specify domains, starting indices and conventions when necessary.
3. Type numbered steps, showing substitutions and reasons rather than announcing the result.
4. Finish with the exact requested conclusion. A recurrence needs initial conditions checked; an MST needs a total weight.
5. Review signs, exponents, brackets and the domain of the claim.

For a timed mock, divide its minutes by 50 to obtain a budget per mark (2.4 minutes at 120 minutes, 3 at 150). Include checking in that budget. These are practice assumptions; the real exam duration has not been supplied. Do not let a difficult proof consume the time for several routine computations.

## Typed notation

Use `~p`, `p ^ q`, `p v q`, `p -> q`, `p <-> q`. Parenthesise implications: `(p -> q) -> r` differs from `p -> (q -> r)`. In arithmetic, `^` means power, so write `(A+B*n)*2^n`. Use `a_(n-1)` for a previous term and `2^(n+1)` for an exponent with two terms.

Use `R={(a,b),...}`, `[a]` for a class, `{}` for empty, `x in A`, `A subseteq B`, LUB and GLB. In graph answers name weighted edges as `AB(3)`. Describe Hasse diagrams with both levels and cover edges. ASCII notation is sufficient; Unicode alternatives are listed in the format guide.

## Worked typing example

Question: Solve a_n=2*a_(n-1)+1, n>=1, a_0=0.

```text
Step 1: The homogeneous recurrence has solution a_n(h)=C*2^n.
Step 2: Try a constant particular solution K.
K=2*K+1 gives K=-1.
Step 3: Thus a_n=C*2^n-1. At n=0, 0=C-1, so C=1.
Step 4: Therefore a_n=2^n-1.
Check a_0=1-1=0, and 2*(2^(n-1)-1)+1=2^n-1.
```

The auto-graded formula field contains only `2^n-1`. Keep the derivation in the written answer. Numeric agreement at test points supports checking, but cannot prove a formula for every n.

Tip: Practise typing the standard skeletons until the notation no longer slows you down.

Trap: An answer such as “MST=21” omits the required algorithm steps, even if its number is correct.

Remember: A set answer is order-insensitive, but an MST trace is order-sensitive under the chosen algorithm.

Note: The mock papers use fresh questions and 50 marks each; they are practice, not a prediction of the paper pattern.
