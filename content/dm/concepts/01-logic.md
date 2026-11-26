# Logic, truth tables and knights and knaves

Topic ID: `logic`

## Concept from zero

A proposition is a statement with a truth value T or F. `~p` reverses p. `p ^ q` is true only when both are true. `p v q` is inclusive OR: at least one true. `p -> q` is false only when p is true and q is false; it is equivalent to `~p v q`. `p <-> q` is true when their truth values agree.

| p | q | ~p | p ^ q | p v q | p -> q | p <-> q |
| --- | --- | --- | --- | --- | --- | --- |
| T | T | F | T | T | T | T |
| T | F | F | F | T | F | F |
| F | T | T | F | T | T | F |
| F | F | T | F | F | T | T |

A tautology is true in every row; a contradiction is false in every row; a contingency has both kinds. Two formulas are equivalent iff their full columns agree in every row. One differing row disproves equivalence.

## Build a table step by step

For k variables use 2^k rows. Put variables first, then inner subexpressions, then full statements. For p,q,r the row order is TTT,TTF,TFT,TFF,FTT,FTF,FFT,FFF. Evaluate parentheses first, then negation, AND, OR, implication and biconditional. Explicit parentheses remove precedence doubt.

Question: Verify De Morgan's law for AND.

```text
Step 1: Construct the table in row order TT,TF,FT,FF.
p q | p^q | ~(p^q) | ~p | ~q | ~p v ~q
T T |  T  |    F   | F  | F  |    F
T F |  F  |    T   | F  | T  |    T
F T |  F  |    T   | T  | F  |    T
F F |  F  |    T   | T  | T  |    T
Step 2: The columns ~(p^q) and ~p v ~q agree in all rows.
Therefore ~(p^q) <-> (~p v ~q) is a tautology.
```

De Morgan's other law is `~(p v q) <-> (~p ^ ~q)`. The contrapositive `~q -> ~p` is equivalent to `p -> q`. The converse `q -> p` and inverse `~p -> ~q` need not be equivalent to the original. Negating `p -> q` gives `p ^ ~q`, not `~p -> ~q`.

Implication is not associative: for p=F,q=T,r=F, `(p -> q) -> r` is F but `p -> (q -> r)` is T. Preserve the supplied grouping.

## Knights, knaves and spies

A knight always makes a true statement, a knave always makes a false statement. Let a mean “A is a knight.” If A says S, enforce `a <-> S`. Do this separately for every speaker. Enumerate all assignments; do not stop at the first plausible one. A spy has no truth constraint, but a question may require exactly one of each type.

```text
A says: B is a knight. B says: If A is a knight, C is a knight.
Step 1: Let a,b,c indicate knight status. Then a=b and b=(a->c).
Step 2: If a=F, b=F; however a->c=T, contradicting b=F.
Step 3: Thus a=b=T. Then a->c=c, so c=T.
Conclusion: A,B,C are all knights; this is the unique solution.
```

Tip: Add an intermediate column for every difficult implication before evaluating the full statement.

Trap: A false antecedent makes an implication true; it does not make the speaker a liar automatically.

Remember: “Equivalent” refers to all rows, not the row representing the actual story.

Note: The exactly-one quantifier can be expressed as `exists x (P(x) ^ forall y (P(y) -> y=x))`.

## Nested implications with four variables

A four-variable table has 16 rows: TTTT, TTTF, TTFT, TTFF, TFTT, TFTF, TFFT, TFFF, FTTT, FTTF, FTFT, FTFF, FFTT, FFTF, FFFT, FFFF. The first variable changes every eight rows, then every four, every two, every row.

For `((p -> q) -> r) -> s`, name `A=p -> q`, `B=A -> r`, `C=B -> s`. Evaluate A, then B, then C on each row. Do not regroup it as `p -> (q -> (r -> s))`. For example at p=T,q=F,r=F,s=F, A=F, B=T, C=F. A false antecedent made B true, then that true antecedent with s=F made C false. The full 16-row worked table is in the Slot 1 Learn note.

To test equivalence, compare the two complete expression columns on all rows. To classify a single expression, all T means tautology, all F means contradiction, and mixed entries mean contingency. The reported nested expression is a contingency.
