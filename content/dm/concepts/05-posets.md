# Posets, Hasse diagrams, LUB, GLB and lattices

Topic ID: `posets`

## Start with the order

A partial order is reflexive, antisymmetric and transitive. A set with a partial order is a POSET. Some pairs may be incomparable. Examples: divisibility on positive integers, and subset inclusion on sets. For divisibility, “a below b” means a divides b, not a<b in the usual numeric order. For subset order, it means A subseteq B.

In a Hasse diagram, remove loops and transitive shortcuts. An upward edge a to b is a cover: a<b and no z lies strictly between them. Recover all order comparisons by upward paths plus equality.

## How to type a Hasse diagram

For positive divisors of 12:

```text
Step 1: Elements are {1,2,3,4,6,12}; order is divisibility.
Step 2: Levels bottom to top: {1}; {2,3}; {4,6}; {12}.
Step 3: Upward cover edges:
(1,2),(1,3),(2,4),(2,6),(3,6),(4,12),(6,12).
There is no cover (1,6), since 1 divides 2 and 2 divides 6.
```

Levels describe placement; the cover list carries the order information. Edges between adjacent displayed levels are not automatically present.

## Four different extrema

| Word | Meaning |
| --- | --- |
| Minimal x | No distinct element lies below x. |
| Maximal x | No distinct element lies above x. |
| Least x | x is below every element. |
| Greatest x | x is above every element. |

There can be several minimal/maximal elements. Least/greatest, if they exist, are unique. In {1,2,3,4,5,6} under divisibility, minimal={1}, least=1, maximal={4,5,6}, and there is no greatest element. The largest number 6 does not lie above 4 or 5 under this order.

## Bounds are relative to a chosen subset

For S within the poset, an upper bound u satisfies s<=u for every s in S; u need not belong to S. A lower bound l satisfies l<=s for every s in S. The LUB is the least among all upper bounds, and the GLB is the greatest among all lower bounds. List the bounds first and compare them under the poset order.

```text
In the divisors-of-12 poset, find bounds of S={4,6}.
Step 1: An upper bound must be divisible by both 4 and 6.
Within the given set, upper bounds={12}; hence LUB(S)=12.
Step 2: A lower bound must divide both 4 and 6.
Lower bounds={1,2}; because 1 divides 2, GLB(S)=2.
```

For all positive integers under divisibility, meet is gcd and join is lcm. In a restricted set, compute bounds within that set: a gcd/lcm outside it does not automatically settle the answer. In {2,3,6,12,18}, upper bounds of {2,3} are {6,12,18} and LUB=6; upper bounds of {12,18} are empty, so no LUB.

## Lattices and subset posets

A lattice has a unique LUB and GLB for every pair. To disprove it, one failing pair suffices. A top and bottom alone do not guarantee a lattice: two incomparable minimal upper bounds may obstruct a join. For a power set ordered by inclusion, join is union and meet is intersection. A restricted family may still be a lattice with a join larger than the missing union; check actual bounds.

## Lexicographic order

Compare first coordinates first; only ties use the second. On S={a,c,e,g}, S x S is the chain `(a,a)<(a,c)<...<(a,g)<(c,a)<...<(g,g)`. Consecutive pairs are covers. This differs from coordinatewise product order, which may have incomparable pairs. A finite total order is a lattice: min and max of any pair are its meet and join.

Tip: For finite diagrams, maximal means no upward cover and minimal means no downward cover.

Trap: “No greatest element” does not mean “no maximal elements.”

Remember: LUB is least among upper bounds, not merely one minimal upper bound.

Note: Type a nonexistent LUB/GLB as an empty answer set in this bank; write “does not exist” in the exam explanation.

## Missing gcd/lcm: check actual bounds before answering

In the complete divisor set D(m), every pair has `GLB=gcd` and `LUB=lcm`: both values are divisors of m. In a restricted divisor set, these formulas still work **when the gcd/lcm belongs to the set**. When one is absent, recompute the bounds in the stated set; the bound may change or fail to exist.

```text
Example 1: A={1,2,3,4,6,24}, ordered by divisibility.
For {4,6}, gcd=2 is present, so GLB=2.
The lcm 12 is absent. The only upper bound in A is 24.
Hence LUB=24; it is not correct to say no LUB merely because 12 is absent.

Example 2: B={1,2,3,4,6,24,36,72}.
For {4,6}, upper bounds are {24,36,72}.
Neither 24 divides 36 nor 36 divides 24, so there is no least upper bound.
For {24,36}, gcd=12 is absent. Lower bounds are {1,2,3,4,6}.
The maximal lower bounds 4 and 6 are incomparable, so there is no GLB.
One failing pair is enough to show B is not a lattice.
```

In the reported set `{1,2,3,4,6,10,12,20,30,60}`, all pairwise gcds and lcms remain in the set. Therefore it is a lattice, with least/minimal 1 and greatest/maximal 60. The fact that 5 and 15 were removed does not alone decide the lattice question. See the Slot 1 note for all cover edges and the named-pair bounds table.
