# Mathematical induction: weak, strong and structural

Topic ID: `induction`

## Why induction works

To prove P(n) for every integer n>=n0, establish the first case and a step from an arbitrary proved case to its successor. The inductive hypothesis is a temporary assumption for that arbitrary index, not an assumption that the whole theorem is true.

```text
Basis: At n=n0, evaluate both sides, so P(n0) holds.
Inductive hypothesis: Assume P(k) for an arbitrary integer k>=n0.
Inductive step: [derive P(k+1), using P(k) explicitly].
Conclusion: By mathematical induction, P(n) holds for every n>=n0.
```

## Fully worked sum identity

```text
Prove 1+3+...+(2*n-1)=n^2 for all n>=1.
Step 1 (basis): n=1 gives 1=1^2.
Step 2 (hypothesis): Assume 1+3+...+(2*k-1)=k^2, k>=1.
Step 3 (step): The next term is 2*(k+1)-1=2*k+1.
The sum through k+1 is k^2+2*k+1=(k+1)^2.
Step 4: By induction the identity holds for every n>=1.
```

For divisibility, write the hypothesis as `expression=m*t`, with integer t, then show the next expression is m times an integer. Example: if `4^k-1=3*t`, then `4^(k+1)-1=4*(4^k-1)+3=3*(4*t+1)`.

## Inequalities need the final comparison

```text
Prove 2^n>=n+12 for n>=4.
Step 1: At n=4, 16=4+12.
Step 2: Assume 2^k>=k+12, k>=4.
Step 3: 2^(k+1)>=2*k+24.
Since 2*k+24-(k+13)=k+11>=0, we get
2^(k+1)>=k+13=(k+1)+12.
Step 4: The result follows for every n>=4 by induction.
```

Multiplication by a positive quantity preserves an inequality; a negative quantity reverses it. Never omit the comparison from your hypothesis-derived bound to the target at k+1.

## Strong induction

Assume P(j) for every n0<=j<=k, then prove P(k+1). This helps when the next object decomposes into earlier objects of several possible sizes. For prime factorisation, if k+1 is composite it equals a*b with 2<=a,b<=k, so both factors have prime factorizations by the strong hypothesis.

A recurrence using two earlier indices may need two basis cases. For the stamp problem 4*a+5*b, establish 12,13,14,15 first, then subtract 4 from the target. One basis case cannot bridge four separate residue classes.

## Structural induction

For recursively generated objects, prove the property for each basic object and prove each construction preserves it. Do not induct on all positive integers if only recursively generated integers are in the set.

```text
S: 1 is in S; n in S implies 3*n+2 and n^2 are in S.
Basis: 1=1 (mod 4).
Hypothesis: n=1 (mod 4) for a generated n.
Constructors: 3*n+2=5=1 (mod 4), and n^2=1 (mod 4).
Conclusion: Every element generated in S is 1 modulo 4.
```

Tip: Prepare the k+1 target first on scratch space, then transform your hypothesis toward it.

Trap: A step using P(k-1) when k is the first basis index may refer to an unproved case.

Remember: State the exact lower bound n0 in both the basis and conclusion.

Note: Weak and strong induction have the same proving power; choose the clearer hypothesis for the problem.

## Divisibility: write the full proof, not just a checkpoint

The exam answer is the complete typed proof. A basis number or a final factor alone cannot earn the proof marks. A useful 5-mark practice rubric is: statement and computed basis 1, explicit hypothesis 1, algebra exposing the hypothesis 1, substitution and integer factor 1, quantified induction conclusion 1.

```text
Let P(n) be the statement that 57 divides 7^(n+2)+8^(2*n+1),
for every integer n>=0.

Basis: At n=0, 7^2+8^1=49+8=57=57*1.
Thus P(0) is true.

Inductive hypothesis: Let k>=0 be an arbitrary integer.
Assume P(k): 7^(k+2)+8^(2*k+1)=57*m for some integer m.

Inductive step: Start with the expression in P(k+1):
7^(k+3)+8^(2*k+3)
= 7*7^(k+2)+64*8^(2*k+1)
= 7*(7^(k+2)+8^(2*k+1))+(64-7)*8^(2*k+1)
= 7*(57*m)+57*8^(2*k+1)
= 57*(7*m+8^(2*k+1)).
Let t=7*m+8^(2*k+1). Since m and k are integers and k>=0,
t is an integer. Hence P(k+1) is true.

Conclusion: By the principle of mathematical induction, 57 divides
7^(n+2)+8^(2*n+1) for every integer n>=0.
```

For a new divisor d, copy the structure, then replace the expression, starting index and algebra. Find a multiplier c such that `E(k+1)=c*E(k)+d*R(k)`. After the hypothesis `E(k)=d*m`, write `E(k+1)=d*(c*m+R(k))` and explain why the bracket is an integer. If the expression contains a power such as `12^(2*n-1)`, check the domain: the 133-divisibility exercise starts at n=1, not n=0.

Common mark-losing mistakes:

- Omitting the statement P(n), its domain, or the numerical basis calculation.
- Saying ?assume true? without writing the actual hypothesis and integer multiple.
- Assuming P(k+1), which is what must be proved, rather than deriving it.
- Reaching a similar-looking expression without substituting the hypothesis.
- Saying ?therefore divisible? without displaying d times a named integer.
- Ending after algebra with no conclusion citing induction and the full domain.

Tip: Type the proof first; optional auto-graded basis/factor fields are only checks.
