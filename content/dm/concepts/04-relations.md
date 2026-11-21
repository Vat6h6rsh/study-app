# Relations, equivalence classes and partitions

Topic ID: `relations`

## A relation is a set of ordered pairs

A relation R on A is a subset of A x A. The notation x R y means `(x,y) in R`. Always state A: the same list of pairs can be reflexive on one universe and fail reflexivity on a larger one.

| Property | Test on all elements | A failure witness |
| --- | --- | --- |
| Reflexive | x R x for every x | one missing (x,x) |
| Irreflexive | no x R x | one present (x,x) |
| Symmetric | x R y implies y R x | (x,y) present, reverse absent |
| Antisymmetric | x R y and y R x imply x=y | both directions for distinct x,y |
| Transitive | x R y and y R z imply x R z | two-step pair with missing shortcut |

Symmetric and antisymmetric can both hold: equality is an example. “Not reflexive” does not mean irreflexive: a relation with some but not all loops is neither. An empty relation on a nonempty universe is irreflexive, symmetric, antisymmetric and transitive by the absence of violating pairs, but is not reflexive.

## Worked property check

Let A={1,2,3}, R={(1,1),(2,2),(3,3),(1,2),(2,1)}.

```text
Step 1: All three diagonal pairs occur, so R is reflexive.
Step 2: (1,2) and (2,1) are reverses; loops reverse themselves.
Thus R is symmetric.
Step 3: R is not antisymmetric because 1 R 2 and 2 R 1, but 1!=2.
Step 4: The {1,2} block contains all four ordered pairs, and 3
relates only to itself. All composable pairs have their shortcut.
Thus R is transitive.
Step 5: R is reflexive, symmetric and transitive, hence an
equivalence relation. Its partition is {1,2}; {3}.
```

## Equivalence relations and classes

An equivalence relation is reflexive, symmetric and transitive. For such a relation, `[a]={x in A: a R x}`. The classes cover A, are nonempty, and any two classes are equal or disjoint. If `[a]` and `[b]` share an element, symmetry and transitivity give a R b, so their classes coincide.

A partition is a collection of nonempty disjoint blocks whose union is A. Given a partition, declare x R y iff they lie in the same block. This gives an equivalence relation. You list each distinct class once, rather than listing [1] and [2] separately when they are equal.

## Congruence modulo m

For positive m, `x=y (mod m)` means m divides x-y. The difference x-x=0 proves reflexivity; negating a multiple proves symmetry; adding multiples proves transitivity.

```text
On A={-3,-2,-1,0,1,2,3,4,5}, use equality modulo 3.
Step 1: R is an equivalence relation by the difference tests.
Step 2: Group values by remainders 0,1,2.
[0]={-3,0,3}; [1]={-2,1,4}; [2]={-1,2,5}.
Step 3: These three disjoint classes cover A, so form its partition.
```

For the relation on all integers, `[1]={1+3*k:k in Z}` is infinite. Restricting the universe to A truncates the class; do not include values outside A.

Tip: Scan loops first, reverse pairs second, and composable two-step pairs third.

Trap: Antisymmetric does not mean every reversed pair is forbidden; loops are allowed.

Remember: Partial order requires reflexive, antisymmetric, transitive. Equivalence replaces antisymmetric with symmetric.

Note: The app stores finite relations explicitly, allowing every property and class in those exercises to be recomputed.
