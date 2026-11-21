# Sets, functions, countable and uncountable sets

Topic ID: `sets`

## Sets and membership

`x in A` says x is an element. `A subseteq B` says every element of A is in B. These are different statements. The empty set is a subset of every set but need not be an element of that set. For A={} and B={{}}, both A in B and A subseteq B hold.

Union contains elements in either set; intersection contains elements in both; A-B contains those in A but not B. Complements require a stated universal set. A power set P(A) consists of all subsets of A and has 2^|A| elements when A is finite.

## Functions need a domain and codomain

A function f:A->B assigns exactly one output in B to each input in A. It is injective (one-to-one) if f(x)=f(y) implies x=y. It is surjective (onto) if every b in the codomain has a preimage. A bijection is both; it gives a one-to-one correspondence and an inverse function.

```text
For f:Z->Z, f(x)=2*x+1:
Step 1: If f(x)=f(y), then 2*x+1=2*y+1, so x=y.
Thus f is injective.
Step 2: Every output is odd. The codomain element 0 has no
integer preimage, so f is not surjective onto Z.
```

Change the codomain to the odd integers and the same rule becomes onto. In this bank N is explicitly specified when an example needs either {0,1,...} or {1,2,...}.

Composition `(f o g)(x)=f(g(x))` applies g first. If f o g is injective, g must be injective, but f need only be injective on the image of g. For a counterexample to f being injective, use g:{0}->{0,1}, g(0)=0, and the constant f:{0,1}->{0}. The composition has a singleton domain and is injective, while f is not.

## Cardinality

A set is countably infinite if there is a bijection with N. “Countable” often includes finite sets; specify “countably infinite” when the question requires an infinite set. Integers have listing 0,1,-1,2,-2,... . Rational numbers can be listed by increasing numerator/denominator size, skipping repeats. Any subset of a countable set is countable; a finite or countable union of countable sets is countable.

Infinite binary sequences are uncountable: from any proposed list, create a new sequence whose nth bit differs from the nth bit of sequence n. It is absent from the entire list. Real numbers are also uncountable. For decimal diagonal proofs, use digits such as 1 and 2 to avoid the 0.4999...=0.5 ambiguity.

## Worked set constructions

```text
Find uncountable A,B with A-B countably infinite.
Step 1: Let A=R and B=R-Z.
Step 2: B is uncountable, since otherwise R=(R-Z) union Z
would be a union of countable sets, hence countable.
Step 3: A-B=Z, which is countably infinite.
```

For finite difference, take R and R-{0}; for uncountable difference, take R and (-infinity,0). For countably infinite intersection, let `A=(-infinity,0) union Z`, `B=(0,infinity) union Z`; their intersection is Z. For both differences countably infinite, put all nonintegers in both sets and add even integers to A, odd integers to B.

Tip: After proposing sets, compute the requested difference/intersection explicitly.

Trap: Removing a countable subset from an uncountable set does not generally leave a countable set.

Remember: To prove onto, start with an arbitrary codomain element and construct an allowed input.

Note: Different infinite cardinalities are not distinguished by informal statements such as “both go on forever”; use a bijection or a non-listability argument.
