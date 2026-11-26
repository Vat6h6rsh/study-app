# Exam format and typed mathematics

BCS ZC219 Discrete Mathematics (DM), Examdesk. Exam date: **28 November 2026**. The exam is **50 marks**, completely typing based, with **Slot 2 questions still unknown**. Do not infer a current blueprint, duration, open-book status or allowed aids from an old cover page. These mocks use 120–150 minutes as practice budgets only.

The professor says at least 50% will come from these seven groups: truth tables; mathematical induction; relations and equivalence classes; POSETs including Hasse diagrams, LUB/GLB, extrema and lattices; homogeneous and non-homogeneous recurrences; graphs; MST using Kruskal and Prim. This does not promise a separate question or equal marks for each group.

**Every answer needs step-by-step working.** A correct final formula, checked box or MST total in the app is a checkpoint; it is not a substitute for a typed exam answer. For proofs, identify assumptions and the conclusion. For a counterexample, verify the hypothesis and explain the failed conclusion. For induction, write P(n) and its domain, the computed basis, an explicit inductive hypothesis, the full algebraic step with an integer factor for divisibility, and a quantified conclusion citing induction. Checkpoints never replace this proof.

| Meaning | Consistent typed form | Example |
| --- | --- | --- |
| Negation | `~p` or `¬p` | `~(p v q)` |
| AND | `p ^ q` or `p ∧ q` | `p ^ (q v r)` |
| OR | `p v q` or `p ∨ q` | `~p v q` |
| Implication | `p -> q` | false only for `p=T,q=F` |
| Equivalence | `p <-> q` | `p -> q <-> ~p v q` (parenthesise both sides) |
| Term/subscript | `a_n`, `a_(n-1)` | `a_n=3*a_(n-1)+2` |
| Power | `2^n`, `n^2` | `2^(n+1)` |
| Multiplication | `*` | `(A+B*n)*2^n` |
| Membership | `x ∈ A` or `x in A` | `2 in {1,2,3}` |
| Subset | `A ⊆ B` or `A subseteq B` | `{} subseteq A` |
| Comparison | `≤`, `>=`, `<` | `n>=4` |
| Relation | ordered pairs | `R={(1,1),(1,2),(2,2)}` |
| Equivalence class | `[a]` | `[1]={1,4,7}` in the specified universe |
| Partition | separated classes | `{0,2,4}; {1,3,5}` |
| Bounds | `LUB(S)`, `GLB(S)` | `LUB({4,6})=12` under divisibility |
| Weighted edge | `AB(3)` | edge AB has weight 3 |
| Empty set | `{}` | `upper_bounds(S)={}` |
| Congruence | `x=y (mod m)` | `x=y (mod 3)` iff `3 divides x-y` |

The symbol `^` means AND inside a logical expression and power inside an arithmetic expression. The app uses separate grammars for those question types. Use explicit `*` in formula inputs: `2*3^n`, not `2 3^n` or `2(3^n)`. Use parentheses around multi-part exponents and subscripts. The formula field accepts only integers, n, + - * / ^ and parentheses; type `a_n =` in your written solution, but omit it from the formula input.

For truth tables use T before F. For variables p,q,r the rows are TTT, TTF, TFT, TFF, FTT, FTF, FFT, FFF. Add a column for every requested subexpression. State which complete columns are compared; do not compare an intermediate column by accident.

For a Hasse diagram, type bottom-to-top levels and upward cover edges. Example: `Levels: {1}; {2,3}; {6}. Covers: (1,2),(1,3),(2,6),(3,6).` Levels alone do not determine all comparabilities. A cover `(a,b)` always means a is below b, even when vertex labels are numbers.

```text
Kruskal's algorithm:
Step 1: add edge AB (weight 2). It joins different components.
Step 2: add edge BC (weight 3). It creates no cycle.
Step 3: add edge CD (weight 4). It connects the remaining vertex.
Finally all four vertices are connected using three edges, so this is
the MST by Kruskal's algorithm; total weight = 2+3+4 = 9.
```

For Prim, state the start vertex and the reached set after each addition. Choose a minimum crossing edge, not the globally cheapest remaining edge. Ties allow more than one correct trace; the total must still be optimal. The professor says no diagram is needed for the MST answer, but the total weight must always be stated.

Tip: Type one reason per step; this is faster to review and supports partial credit.

Trap: Old papers use either 150 or 50 total printed marks. Their course weightage is not the upcoming exam's mark count.

Remember: Read the actual exam instructions before choosing timing or assuming permitted resources.

Note: Models and rubrics in this bank are practice guidance, not an official marking scheme.

## Earlier Slot 1 evidence (26 November update)

Students openly reported the 5-question, 50-mark Slot 1 pattern described in [Slot 1 practice and fully worked typed solutions](slot1-pattern.md). It guides practice and Mocks 4?5; Slot 2 may differ. Q1a 5 + Q1b 5; Q2a 2 + Q2b 8; Q3 10; Q4 10; Q5 10. These are reported allocations, not an official Slot 2 blueprint.
