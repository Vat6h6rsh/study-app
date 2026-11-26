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

## Equivalence from symmetry: colourings are whole labelled words

For a triangle, write the colours at the three labelled vertices clockwise as a word, for example RGB. There are `3^3=27` words over R,G,B. A 120-degree rotation sends RGB to GBR, then BRG, then RGB. These three words form one class. RBG rotates to BGR and GRB, so it is a different class when reflections are forbidden.

```text
Reflexive: rotating by 0 degrees takes every word to itself.
Symmetric: the inverse of an allowed rotation is an allowed rotation.
Transitive: composing two allowed rotations gives an allowed rotation.
Thus being related by a rotation is an equivalence relation.

Monochromatic words RRR, GGG, BBB each form a singleton class.
Every other word has orbit size 3 (it is not fixed by a 120-degree turn).
The remaining 24 words form 24/3=8 classes.
Total classes = 3+8=11.
```

List each orbit once, not once for every representative. If reflections are also allowed, RGB and RBG merge; the full triangle symmetry group gives 10 classes instead. A square under rotations uses 0,90,180,270 degrees; some words have orbit size 2, so never divide the total number of words by the group size without checking fixed words.

For equal-length strings the invariant is length. For `(a,b)~(c,d)` iff `a+d=b+c`, rewrite as `a-b=c-d`; the invariant is the difference. In a finite universe list only its elements. On all integer pairs the class is `{(c,d):c-d=a-b}`.
