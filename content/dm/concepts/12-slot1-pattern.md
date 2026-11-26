# Slot 1 pattern: fully typed solutions and final revision

Topic ID: `slot1`

BCS ZC219; student exam: **28 November 2026, Slot 2**. Earlier Slot 1 students openly reported this pattern. It is evidence for practice, not a guarantee of Slot 2 questions or an official marking scheme. The exact Q2a sets, named bound pairs and Q5 graph were not supplied; the examples below explicitly supply constructed data.

| Slot | Task | Marks | Practice marking guide |
| --- | --- | --- | --- |
| Q1a | Nested implications, 4 variables | 5 | Rows 1; intermediate/final columns 3; conclusion 1 |
| Q1b | Full divisibility induction proof | 5 | Statement+basis 1; hypothesis 1; rewrite 1; substitution/integer 1; conclusion 1 |
| Q2a | Sets | 2 | Basic operations 1; ordered product/properties 1 |
| Q2b | Hasse diagram and bounds | 8 | Levels+covers 2; extrema 2; named bounds 2; lattice justification 2 |
| Q3 | Equivalence and classes | 10 | Three properties 3; invariant/orbit 2; classes 4; count 1 |
| Q4 | Non-homogeneous recurrence | 10 | Roots 1; homogeneous 1; trial 1; coefficients 3; constants 3; check 1 |
| Q5 | Kruskal | 10 | Sort 2; six additions/rejections 6; spanning check+sum 2 |

These allocations are study rubrics. In mocks, checkpoints are included in the parent marks and never increase the 50-mark total.

## Slot 1 Q1a: reported nested implication

Construct a complete truth table for ((p -> q) -> r) -> s. Include columns p -> q; (p -> q) -> r; ((p -> q) -> r) -> s. Classify the final column.

```text
Write 16 rows, T before F, with p changing slowest. (1 mark for row order; 1 each for the three stages, or 3 for the two compared expressions; 1 for the conclusion.)

Columns: p | q | r | s | p -> q | (p -> q) -> r | ((p -> q) -> r) -> s

T | T | T | T | T | T | T

T | T | T | F | T | T | F

T | T | F | T | T | F | T

T | T | F | F | T | F | T

T | F | T | T | F | T | T

T | F | T | F | F | T | F

T | F | F | T | F | T | T

T | F | F | F | F | T | F

F | T | T | T | T | T | T

F | T | T | F | T | T | F

F | T | F | T | T | F | T

F | T | F | F | T | F | T

F | F | T | T | T | T | T

F | F | T | F | T | T | F

F | F | F | T | T | F | T

F | F | F | F | T | F | T

The final column is a contingency because it contains both T and F.
```

## Slot 1 Q1b: reported divisibility proof

Write a FULL typed proof by mathematical induction that 57 divides 7^(n+2)+8^(2*n+1) for all integers n>=0. State P(n), compute the basis, state the hypothesis with an integer m, derive P(k+1), name its integer factor, and conclude. Checkpoints alone are not the answer.

```text
Let P(n) be the statement that 57 divides 7^(n+2)+8^(2*n+1), for every integer n>=0. Basis: at n=0, 7^(0+2)+8^(2*0+1)=57=57*1. Thus P(0) holds.

Inductive hypothesis: let k>=0 be arbitrary and assume P(k). Then 7^(k+2)+8^(2*k+1)=57*m for some integer m.

For the inductive step, start from the expression in P(k+1):
7^(k+3)+8^(2*k+3)
= 7*(7^(k+2)+8^(2*k+1))+57*8^(2*k+1). This exposes the expression in the inductive hypothesis.

Substituting the hypothesis gives
7^(k+3)+8^(2*k+3)=57*(7*m+8^(2*k+1)).
Let t=7*m+8^(2*k+1). Since k and m are integers and all powers here have nonnegative integer exponents, t is an integer. Hence 57 divides the expression in P(k+1).

The basis and inductive step have been proved. By the principle of mathematical induction, 57 divides 7^(n+2)+8^(2*n+1) for every integer n>=0.
```

## Slot 1 Q2a: set operations

For A={1,2,3} and B={2,3,4}, find A union B, A intersection B, A-B and A x B. State which operations are commutative. The reported slot gave the method, not exact sets; these are constructed data.

```text
By membership, A union B={1,2,3,4} and A intersection B={2,3}. Also A-B={1}. (1 mark for these operations.)

The Cartesian product is ordered: A x B={(1,2),(1,3),(1,4),(2,2),(2,3),(2,4),(3,2),(3,3),(3,4)}. It has |A|*|B|=3*3=9 pairs. Union and intersection are commutative; difference and Cartesian product generally are not. For example (1,2) lies in A x B but not B x A. (1 mark.)
```

## Slot 1 Q2b: reported divisors of 60 with 5 and 15 removed

In A={1,2,3,4,6,10,12,20,30,60}, ordered by divisibility, describe the Hasse diagram using levels and upward cover edges. Find minimal, maximal, least and greatest elements; find LUB/GLB for {4,6}; {10,12}; {20,30}; {2,3}; {10,30}; decide whether A is a lattice.

```text
Use a <= b iff a divides b on A={1,2,3,4,6,10,12,20,30,60}. Bottom-to-top levels are {1}; {2,3}; {4,6,10}; {12,20,30}; {60}.

The upward Hasse cover edges are (1,2),(1,3),(2,4),(2,6),(2,10),(3,6),(4,12),(4,20),(6,12),(6,30),(10,20),(10,30),(12,60),(20,60),(30,60). Each has no element of A strictly between its endpoints; omit loops and all transitive edges.

Minimal={1}; maximal={60}; least={1}; greatest={60}. A maximal/minimal element has nothing strictly above/below it; greatest/least must compare with every element.

Pair | lower bounds | GLB | upper bounds | LUB
{4,6} | {1,2} | {2} | {12,60} | {12}
{10,12} | {1,2} | {2} | {60} | {60}
{20,30} | {1,2,10} | {10} | {60} | {60}
{2,3} | {1} | {1} | {6,12,30,60} | {6}
{10,30} | {1,2,10} | {10} | {30,60} | {30}

Every pair in A has a unique GLB and LUB, so this is a lattice. For any two retained divisors, their gcd and lcm divide 60. Neither missing value can arise: a retained multiple of 5 is always even, so the gcd of two retained multiples of 5 cannot be the odd number 5 or 15. The retained divisors of 15 are only 1 and 3 (and of 5 only 1), so no retained pair has lcm 15 or 5. Thus both gcd and lcm remain in A for every pair, proving the lattice claim.
```

## Slot 1 Q3: reported RGB triangle under 120-degree rotations

Colour each of the 3 labelled vertices using R/G/B. All 27 colourings are allowed. Two are equivalent iff related by a rotation only. Prove this is an equivalence relation, list the complete partition and count the classes.

```text
The identity rotation proves reflexivity. Every allowed symmetry has an allowed inverse, proving symmetry. Composition of allowed symmetries is allowed, proving transitivity.

A class is the orbit obtained by applying every allowed symmetry to one colouring. Positions are labelled in clockwise order. R=Red, G=Green, B=Blue (or the two stated colours); repeated identical words are listed only once.

The complete universe is A={RRR,RRG,RRB,RGR,RGG,RGB,RBR,RBG,RBB,GRR,GRG,GRB,GGR,GGG,GGB,GBR,GBG,GBB,BRR,BRG,BRB,BGR,BGG,BGB,BBR,BBG,BBB}. The distinct classes are:
{RRR}; {RRG,RGR,GRR}; {RRB,RBR,BRR}; {RGG,GRG,GGR}; {RGB,GBR,BRG}; {RBG,GRB,BGR}; {RBB,BRB,BBR}; {GGG}; {GGB,GBG,BGG}; {GBB,BGB,BBG}; {BBB}.

There are 11 classes. Their sizes sum to 27; the classes are disjoint and cover A. There are 3 monochromatic singleton classes and 8 size-3 classes, so 3+8*3=27. RGB and RBG belong to different rotation classes; reflection is not allowed.
```

## Slot 1 Q4: reported third-order recurrence

Solve a_n=7*a_(n-1)-16*a_(n-2)+12*a_(n-3)+n^4, n>=3; a_0=-2,a_1=0,a_2=5. Find the characteristic equation and roots, particular solution coefficients, and closed form with all constants.

```text
The associated homogeneous characteristic equation is r^3-7*r^2+16*r-12=(r-2)^2*(r-3)=0. Thus its roots, with multiplicity, are 2,2,3.

The homogeneous solution is C1*(2^n)+C2*(n*2^n)+C3*(3^n). Repeated roots require successive powers of n.

The forcing is n^4, with base 1. This base has multiplicity 0 in the characteristic polynomial. Try p_n=A*(n^4)+B*(n^3)+C*(n^2)+D*(n)+E*(1). No n factor is needed because 1 is not a root.

Substitute p_n into p_n-(7)*p_(n-1)-(-16)*p_(n-2)-(12)*p_(n-3)=n^4. After expansion and cancellation of 1^n, equate coefficients of n^4 down to n^0:
-2*A=1
44*A-2*B=0
-306*A+33*B-2*C=0
812*A-153*B+22*C-2*D=0
-723*A+203*B-51*C+11*D-2*E=0
Therefore A=(-1/2),B=-11,C=-105,D=(-1033/2),E=-1099, and p_n=(-1/2)*(n^4)-11*(n^3)-105*(n^2)+(-1033/2)*(n)-1099.

Add homogeneous and particular parts. The initial conditions give:
1*C1+0*C2+1*C3=-2-(-1099)
2*C1+2*C2+3*C3=0-(-1732)
4*C1+8*C2+9*C3=5-(-2648)
Subtract twice the first equation from the second: 2*C2+C3=-462. Subtract four times the first from the third: 8*C2+5*C3=-1735. Subtract four times the new second equation from the new third: C3=113. Then C2=(-462-113)/2=-575/2 and C1=1097-113=984. Solving yields C1=984,C2=(-575/2),C3=113.

Hence a_n=984*(2^n)+(-575/2)*(n*2^n)+113*(3^n)+(-1/2)*(n^4)-11*(n^3)-105*(n^2)+(-1033/2)*(n)-1099, for every integer n>=0. Equivalently, a_n=(984-575*n/2)*2^n+113*3^n-(n^4+22*n^3+210*n^2+1033*n+2198)/2. Substituting the first 3 terms gives a_0=-2,a_1=0,a_2=5; substitution into the recurrence gives the stated forcing. This, with the initial values, determines the sequence uniquely.
```

## Slot 1 Q5: constructed graph illustrating the reported Kruskal task

Constructed graph (the reported sketch's exact edges were not supplied): V={A,B,C,D,E,F,G}, edges AB(1),BC(1),AC(2),CD(3),BD(4),DE(5),CE(5),EF(6),DF(7),FG(8),EG(9). Use Kruskal. Type each accepted AND rejected candidate in order with a reason, stop at six accepted edges, and state total weight. Any valid tie order is allowed. (Sort 2, six additions 6, spanning/total 2 marks.)

```text
Sort all edges by nondecreasing weight (break ties by the displayed edge order): AB(1),BC(1),AC(2),CD(3),BD(4),DE(5),CE(5),EF(6),DF(7),FG(8),EG(9). Start with seven singleton components. (2 marks.)

Step 1: add edge AB (weight 1). It joins different components and is a lightest eligible edge. Components now: {A,B}; {C}; {D}; {E}; {F}; {G}. (1 mark.)

Step 2: add edge BC (weight 1). It joins different components and is a lightest eligible edge. Components now: {A,B,C}; {D}; {E}; {F}; {G}. (1 mark.)

Reject edge AC (weight 2): its endpoints already lie in the same component, so it creates a cycle.

Step 3: add edge CD (weight 3). It joins different components and is a lightest eligible edge. Components now: {A,B,C,D}; {E}; {F}; {G}. (1 mark.)

Reject edge BD (weight 4): its endpoints already lie in the same component, so it creates a cycle.

Step 4: add edge DE (weight 5). It joins different components and is a lightest eligible edge. Components now: {A,B,C,D,E}; {F}; {G}. (1 mark.)

Reject edge CE (weight 5): its endpoints already lie in the same component, so it creates a cycle.

Step 5: add edge EF (weight 6). It joins different components and is a lightest eligible edge. Components now: {A,B,C,D,E,F}; {G}. (1 mark.)

Reject edge DF (weight 7): its endpoints already lie in the same component, so it creates a cycle.

Step 6: add edge FG (weight 8). It joins different components and is a lightest eligible edge. Components now: {A,B,C,D,E,F,G}. (1 mark.)

Finally all seven vertices are connected with six accepted edges. Stop; later edges are not examined. This is an MST by Kruskal's algorithm; total weight = 1 + 1 + 3 + 5 + 6 + 8 = 24. (2 marks for spanning-tree check and sum.)
```

## Last 48 hours: 26–28 November

1. **26 November, first session:** read 01-logic.md and 03-induction.md. Do dm-slot1-truth-0 through -4 and dm-slot1-induction-0 through -5. Type every proof from a blank page; compare each of the five proof parts.
2. **26 November, second session:** read 10-sets-functions.md (or the sets note in Learn), 05-posets.md and 04-relations.md. Do dm-slot1-sets-0 through -4, dm-slot1-poset-0 through -6, and dm-slot1-relation-0 through -5. Recreate covers and classes without viewing the key.
3. **27 November, morning:** read 06-recurrences.md and 08-trees-mst.md. Do dm-slot1-recurrence-0 through -4, especially resonance n and n^2, then dm-slot1-mst-0 through -4. Type each rejected edge and the total.
4. **27 November, afternoon:** attempt DM Mock 4 in one timed sitting using the duration on the real exam notice (150 minutes is only the app practice budget). Mark full working with the rubric, then redo every missed method.
5. **27 November, evening:** attempt DM Mock 5 if rested and time permits; otherwise use its weakest slots as targeted drills. Revisit 07-graphs.md and the cheatsheet for broader Slot 2 coverage, because the paper can differ. Stop intensive work early enough to sleep.
6. **28 November, before Slot 2:** review the truth-table row order, five induction parts, extrema definitions, resonance rule and Kruskal tie rule. Read the actual exam instructions and check the required login/time. Do not start a new topic just before the exam.

Tip: Use the practice IDs above to keep drills in the same order as the paper.

Trap: A final checkpoint answer is not a full proof or recurrence derivation.

Remember: Reported pattern data is not a promise about Slot 2. Prepare the broader core notes too.

Note: All new keys are recomputed; divisibility uses exact integers through n=20 and recurrences are iterated through n=15.
