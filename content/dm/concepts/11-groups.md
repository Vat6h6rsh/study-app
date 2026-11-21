# Groups, inverses, subgroups and abelian proofs

Topic ID: `groups`

## Definitions from zero

A group (G,*) has closure, associativity, an identity e and an inverse for every element. Associativity permits regrouping; it does not permit reordering. A group is abelian if a*b=b*a for every a,b in G. A subgroup is a subset that is itself a group under the same operation. Examples: (Z,+) is abelian with identity 0, and 2Z is a subgroup.

| Law | Allowed manipulation |
| --- | --- |
| Associativity | (a*b)*c=a*(b*c) |
| Identity | e*a=a*e=a |
| Inverse | a^(-1)*a=a*a^(-1)=e |
| Left cancellation | a*b=a*c implies b=c |
| Right cancellation | b*a=c*a implies b=c |

Cancellation follows by multiplying on the correct side by an inverse. Never replace group operations by division without defining what that means, and never commute factors unless abelianity is known.

## Worked uniqueness of inverse

```text
Given a*b=e, prove b=a^(-1).
Step 1: Left multiply by a^(-1):
a^(-1)*(a*b)=a^(-1)*e.
Step 2: By associativity, (a^(-1)*a)*b=a^(-1).
Step 3: e*b=a^(-1), so b=a^(-1).
```

For identity uniqueness, if e and f are identities, `e*f=f` using e and `e*f=e` using f, so e=f. For `a*b=a`, left multiply by a^(-1) to get b=e.

## Subgroups

For a nonempty H within a group, a useful test is: if x,y in H imply x*y^(-1) in H, then H is a subgroup. Intersections of subgroups satisfy this test because each operation stays in both. A union need not be closed.

```text
Step 1: In (Z,+), let H=2Z and K=3Z. Both are subgroups.
Step 2: 2 and 3 belong to H union K.
Step 3: Their sum is 5, which belongs to neither subgroup.
Step 4: Thus H union K is not closed under addition and is not
a subgroup. This disproves the universal union claim.
```

## A past-paper abelianity proof

Assume for every x,y,z in G, `x*y=z*x` implies y=z. To prove abelian, take arbitrary x,y and create a z that makes the premise true.

```text
Step 1: Put z=x*y*x^(-1).
Step 2: z*x=(x*y*x^(-1))*x=x*y, by associativity and inverse laws.
Step 3: The assumed implication gives y=z=x*y*x^(-1).
Step 4: Right multiply by x: y*x=x*y.
Since x,y were arbitrary, G is abelian.
```

The inverse of a product reverses order: `(a*b)^(-1)=b^(-1)*a^(-1)`. Check by multiplying on both sides and cancelling adjacent inverse pairs. Reversing order is essential in nonabelian groups.

Tip: Name the side of multiplication in every cancellation proof.

Trap: A subset containing the identity is not automatically a subgroup; closure and inverses must also hold.

Remember: Use only associativity to move parentheses, and use commutativity only after it has been proved or supplied.

Note: Groups are past-paper extras rather than one of the professor's seven core categories, but appeared in four of the five supplied papers.
