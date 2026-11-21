# Exam-morning methods and typed templates

Topic ID: `cheatsheet`

## Seven core topics

| Task | Typed method | Final check |
| --- | --- | --- |
| Truth table | Variables, intermediate columns, full columns; T before F | 2^k rows; compare intended full columns |
| Induction | Basis; hypothesis at arbitrary k; derive k+1; conclusion | Correct starting index; no unproved earlier case |
| Relations | Loops, reverse pairs, two-step shortcuts | Witness each failed property |
| Equivalence | Reflexive + symmetric + transitive; group classes | Classes disjoint and cover the universe |
| Poset | Reflexive + antisymmetric + transitive; upward covers | Maximal differs from greatest |
| Bounds/lattice | List upper/lower bounds; find least/greatest among them | Every pair needs LUB and GLB for lattice |
| Recurrence | Homogeneous + particular; solve constants | Initial terms and substitution |
| Graph | Identify convention; degrees and connectivity first | Euler edges, Hamilton vertices |
| MST | Kruskal components or Prim reached cut | n-1 edges, connected, total weight |

## Copyable proof skeletons

```text
Direct: Let [arbitrary object] satisfy [hypothesis]. Write [definition].
Then [algebra/logic]. Hence [desired conclusion].

Contrapositive: We prove ~Q -> ~P. Assume ~Q. [Derive ~P].
Therefore P -> Q.

Contradiction: Assume [hypotheses] and ~[conclusion].
[Derive contradiction with a stated fact]. Thus [conclusion].

Counterexample: Take [object]. It satisfies [hypothesis] because
[reason], but fails [conclusion] because [reason]. The claim is false.

Induction: Basis n=n0: [check]. Assume P(k), arbitrary k>=n0.
[Use it to prove P(k+1)]. By induction P(n) holds for all n>=n0.

Strong induction: Assume P(j) for every n0<=j<=k.
Structural induction: Check each base constructor; prove each
recursive constructor preserves the property.
```

## Formula reminders

Logic: `p->q` is `~p v q`; contrapositive is `~q->~p`. De Morgan swaps AND/OR and negates each input. Negated implication is `p ^ ~q`. Implication is not associative.

Recurrence `a_n=c1*a_(n-1)+c2*a_(n-2)` has characteristic polynomial `r^2-c1*r-c2`. Distinct roots give `A*r1^n+B*r2^n`; repeated r gives `(A+B*n)*r^n`. For forcing polynomial times b^n, try a general polynomial of the same degree times b^n; multiply by n^s if b is a characteristic root of multiplicity s. Use b=1 for polynomial forcing.

Graphs: sum degrees=2e; v-e+f=2 for connected planar embeddings. Simple planar e<=3v-6, bipartite planar e<=2v-4 (v>=3). A bipartite graph has no odd cycle. K_n has n(n-1)/2 edges; K_m,n has mn; Q_n has 2^n vertices and n*2^(n-1) edges for n>=1. W_n=C_n plus hub has n+1 vertices and 2n edges.

Counting labelled graphs: undirected loopless `2^(n*(n-1)/2)`, directed loopless `2^(n*(n-1))`, directed loops allowed `2^(n^2)`. Complement edge counts add to C(n,2). Euler circuit: connected non-isolated part and all even degrees. Open Euler trail: exactly two odd degrees. No corresponding universal degree test for Hamilton paths.

## Typed MST template

```text
Use [Kruskal / Prim starting at X].
Step 1: add edge AB (weight w). [Different components / minimum
crossing edge from reached set].
Step 2: ...
Finally all vertices are connected using n-1 edges, so this is the
MST by [algorithm]; total weight = w1+w2+... = total.
```

## Past-paper extras

Pigeonhole: define k boxes; minimum to force r in one is `k*(r-1)+1`. Inclusion-exclusion: add sizes, subtract intersection. Functions: injective uses equal outputs; onto starts from arbitrary codomain value. Countably infinite means a listing/bijection with N; diagonalisation disproves a proposed complete list. Set construction: calculate the requested intersection/differences, not just the cardinalities of A and B.

Groups: left cancellation uses left multiplication by inverse; associativity never reorders. Identity and inverse are unique. Union of 2Z and 3Z fails closure; intersection of subgroups passes the subgroup test. Knights: each knight's statement true, each knave's false, spy unrestricted; enumerate all assignments before claiming uniqueness.

Tip: Reserve time to check signs, exponents, initial indices and the final requested value.

Trap: Finite numerical verification does not prove an identity or justify a proof step.

Remember: The exam is 50 marks and typed; its pattern is unknown. All seven professor categories deserve preparation.

Note: The app's structured answer fields grade checkpoints. Your exam answer must still show numbered reasoning.
