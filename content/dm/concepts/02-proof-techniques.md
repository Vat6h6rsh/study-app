# Direct proofs, contraposition, contradiction and counterexamples

Topic ID: `proofs`

## Choose a method from the statement

A proof of `P -> Q` must cover every object satisfying P. A direct proof starts with P and derives Q. A contrapositive proof starts with ~Q and derives ~P; these implications are equivalent. A contradiction proof assumes the hypotheses and the negation of the desired conclusion, then derives an impossibility.

To disprove `forall x P(x)`, produce one x with ~P(x). To disprove `P -> Q`, your example must satisfy P while failing Q. An example with a false hypothesis does not work.

| Method | First line | Required finish |
| --- | --- | --- |
| Direct | Let an arbitrary object satisfy the hypothesis. | Derive the conclusion. |
| Contrapositive | We prove ~Q -> ~P. | Invoke equivalence with P -> Q. |
| Contradiction | Suppose the statement is false. | Identify the exact contradiction. |
| Counterexample | Take the following object. | Verify hypothesis, refute conclusion. |

## Worked direct proof

Question: The sum of two odd integers is even.

```text
Step 1: Let a=2*r+1 and b=2*s+1, where r,s are integers.
Step 2: a+b=2*r+1+2*s+1=2*(r+s+1).
Step 3: Since r+s+1 is an integer, a+b is even.
The choice of odd integers was arbitrary, so the claim holds generally.
```

## Worked contrapositive proof

Question: If m^2 is even, prove m is even.

```text
Step 1: Prove the contrapositive: if m is odd, m^2 is odd.
Step 2: Write m=2*k+1 for an integer k.
m^2=4*k^2+4*k+1=2*(2*k^2+2*k)+1, which is odd.
Step 3: Hence m^2 even implies m even.
```

## Worked contradiction proof

For sqrt(2), assume `sqrt(2)=a/b` in lowest terms, with b nonzero. Squaring gives `a^2=2*b^2`, so a is even. Set a=2*k, giving `b^2=2*k^2`, so b is even too. This contradicts a,b being coprime. State “lowest terms” before using the contradiction; merely showing an even numerator and denominator in some fraction is insufficient.

## Existence and uniqueness

“There is a unique k” has two parts. Construct a k, verify it works, then prove any two solutions are equal. For odd n, write n=2*t+1. The equation `n=(k-2)+(k+3)` becomes `n=2*k+1`, so choose k=t. If k and l both solve it, `2*k+1=2*l+1` gives k=l.

For counterexamples in graphs, preserve required assumptions: use simple undirected graphs when that is specified. C6 and two disjoint triangles have the same degree sequence, but different component counts, so they cannot be isomorphic. K3,3 has chromatic number 2 but is nonplanar, disproving a converse of the four-color statement.

Tip: Write the hypothesis and desired conclusion before selecting a proof method.

Trap: Proving the converse does not prove the implication. Assuming the conclusion in a direct proof is circular.

Remember: A numerical check may disprove a universal claim; finitely many successful checks do not prove it.

Note: State the universe. Parity arguments require integers, and division requires a nonzero divisor.
