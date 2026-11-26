# Discrete mathematics practice bank

BCS ZC219. Exam: 28 November 2026. All answers use typed steps. Mocks live separately in mocks.json and are excluded from this practice export.

## counting

### dm-counting-1: Seven-bit union

Original | 5 marks | past | standard | numeric

How many bit strings of length 7 start with 00 or end with 111?

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Starting with 00 leaves 5 free bits: 2^5=32.
Step 2: Ending with 111 leaves 4 free bits: 2^4=16. Both conditions leave 2 free bits: 2^2=4.
Step 3: By inclusion-exclusion: 32+16-4=44.
```

Concept: Identify distinct outcomes and overlaps first. For a minimum guarantee, show both the forcing threshold and why one fewer can avoid the event.

</details>

### dm-counting-2: Eight-bit intersection

Original | 5 marks | past | standard | numeric

How many 8-bit strings start with 10 and end with 01?

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: The prescribed first two and last two positions do not overlap.
Step 2: Four positions are free, each with 2 choices.
Step 3: There are 2^4=16 strings.
```

Concept: Identify distinct outcomes and overlaps first. For a minimum guarantee, show both the forcing threshold and why one fewer can avoid the event.

</details>

### dm-counting-3: Birthday months

Original | 5 marks | past | standard | numeric

How many people guarantee two with the same birth month?

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: There are 12 month boxes.
Step 2: With 12 people, one person per month is still possible.
Step 3: The 13th person forces a repeated month. Answer: 13.
```

Concept: Identify distinct outcomes and overlaps first. For a minimum guarantee, show both the forcing threshold and why one fewer can avoid the event.

</details>

### dm-counting-4: Three matching residues

Original | 5 marks | past | standard | numeric

How many integers guarantee three in the same residue class modulo 5?

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: There are 5 residue boxes.
Step 2: At most 2 in each box permits 10 integers without a triple.
Step 3: The next integer forces a triple: 5*(3-1)+1=11.
```

Concept: Identify distinct outcomes and overlaps first. For a minimum guarantee, show both the forcing threshold and why one fewer can avoid the event.

</details>

### dm-counting-5: Choose a committee

Original | 5 marks | past | standard | numeric

How many 3-person committees can be chosen from 8 distinct people?

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Order does not matter, so use combinations.
Step 2: C(8,3)=8*7*6/(3*2*1).
Step 3: The answer is 56.
```

Concept: Identify distinct outcomes and overlaps first. For a minimum guarantee, show both the forcing threshold and why one fewer can avoid the event.

</details>

### dm-counting-6: Professors and scores

Original | 5 marks | past | standard | numeric

Six professors give integer scores from 0 through 60. How many students guarantee two with the same professor and score?

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use a box for each ordered pair (professor,score).
Step 2: There are 6*61=366 boxes, since both 0 and 60 are included.
Step 3: With 367 students, two share a box. With 366, one per box is possible. Thus the minimum is 367.
```

Concept: Identify distinct outcomes and overlaps first. For a minimum guarantee, show both the forcing threshold and why one fewer can avoid the event.

</details>

### dm-counting-7: Product rule with no repetition

Original | 5 marks | past | standard | numeric

How many 3-letter codes can be made from A,B,C,D,E without repeating letters?

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: There are 5 choices for the first letter, 4 for the second and 3 for the third.
Step 2: By the product rule, 5*4*3=60.
Step 3: Order matters because the objects are codes.
```

Concept: Identify distinct outcomes and overlaps first. For a minimum guarantee, show both the forcing threshold and why one fewer can avoid the event.

</details>

### dm-p3-q5: Identical programs pigeonhole

Past paper 3 Q5 | 15 marks | past | standard | numeric

An alphabet has 128 characters. Students submit nonempty strings of length at most 100. What minimum class size guarantees two identical submissions?

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: There are 128^i strings of length i. All nonempty lengths 1 through 100 are possible boxes.
Step 2: The number of boxes is S=sum_(i=1)^100 128^i=(128^101-128)/127.
Step 3: S submissions could all be distinct. By the pigeonhole principle S+1 submissions force a duplicate.
Step 4: Minimum = (128^101-128)/127+1. This exact expression is preferable to expanding the very large integer.
```

Concept: Identify distinct outcomes and overlaps first. For a minimum guarantee, show both the forcing threshold and why one fewer can avoid the event.

</details>

### dm-p4-q5: Professors and scores

Past paper 4 Q5 | 5 marks | past | standard | numeric

Six professors give integer scores from 0 through 60. How many students guarantee two with the same professor and score?

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use a box for each ordered pair (professor,score).
Step 2: There are 6*61=366 boxes, since both 0 and 60 are included.
Step 3: With 367 students, two share a box. With 366, one per box is possible. Thus the minimum is 367.
```

Concept: Identify distinct outcomes and overlaps first. For a minimum guarantee, show both the forcing threshold and why one fewer can avoid the event.

</details>

### dm-p5-q5: Seven-bit union

Past paper 5 Q5 | 5 marks | past | standard | numeric

How many bit strings of length 7 start with 00 or end with 111?

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Starting with 00 leaves 5 free bits: 2^5=32.
Step 2: Ending with 111 leaves 4 free bits: 2^4=16. Both conditions leave 2 free bits: 2^2=4.
Step 3: By inclusion-exclusion: 32+16-4=44.
```

Concept: Identify distinct outcomes and overlaps first. For a minimum guarantee, show both the forcing threshold and why one fewer can avoid the event.

</details>

## graphs

### dm-graphs-1: Edges of K5

Original | 5 marks | core | standard | numeric

For V={1,2,3,4,5}, E={(1,2),(1,3),(1,4),(1,5),(2,3),(2,4),(2,5),(3,4),(3,5),(4,5)}, find edges. Show your reasoning.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: List adjacency information from the given edges. There are 5 vertices and 10 edges.
Step 2: The nonincreasing degree sequence is (4,4,4,4,4); its sum is 20=2*|E|.
Step 3: For edges, the answer is 10. Count the requested quantity directly from the definitions.
```

Concept: Use the precise graph definition and invariants; equal necessary invariants alone do not prove isomorphism or existence of a traversal.

</details>

### dm-graphs-2: Odd degrees of K4

Original | 5 marks | core | standard | numeric

For V={1,2,3,4}, E={(1,2),(1,3),(1,4),(2,3),(2,4),(3,4)}, find oddDegrees. Show your reasoning.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: List adjacency information from the given edges. There are 4 vertices and 6 edges.
Step 2: The nonincreasing degree sequence is (3,3,3,3); its sum is 12=2*|E|.
Step 3: For oddDegrees, the answer is 4. Count the requested quantity directly from the definitions.
```

Concept: Use the precise graph definition and invariants; equal necessary invariants alone do not prove isomorphism or existence of a traversal.

</details>

### dm-graphs-3: Chromatic number of C5

Original | 5 marks | core | standard | numeric

For V={1,2,3,4,5}, E={(1,2),(2,3),(3,4),(4,5),(5,1)}, find chromatic. Show your reasoning.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: List adjacency information from the given edges. There are 5 vertices and 5 edges.
Step 2: The nonincreasing degree sequence is (2,2,2,2,2); its sum is 10=2*|E|.
Step 3: For chromatic, the answer is 3. A 3-coloring exists; fewer colors fail the edge constraints (check adjacent vertices).
```

Concept: Use the precise graph definition and invariants; equal necessary invariants alone do not prove isomorphism or existence of a traversal.

</details>

### dm-graphs-4: Chromatic number of K3,4

Original | 5 marks | core | standard | numeric

For V={a1,a2,a3,b1,b2,b3,b4}, E={(a1,b1),(a1,b2),(a1,b3),(a1,b4),(a2,b1),(a2,b2),(a2,b3),(a2,b4),(a3,b1),(a3,b2),(a3,b3),(a3,b4)}, find chromatic. Show your reasoning.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: List adjacency information from the given edges. There are 7 vertices and 12 edges.
Step 2: The nonincreasing degree sequence is (4,4,4,3,3,3,3); its sum is 24=2*|E|.
Step 3: For chromatic, the answer is 2. A 2-coloring exists; fewer colors fail the edge constraints (check adjacent vertices).
```

Concept: Use the precise graph definition and invariants; equal necessary invariants alone do not prove isomorphism or existence of a traversal.

</details>

### dm-graphs-5: Edges of K2,5

Original | 5 marks | core | standard | numeric

For V={a1,a2,b1,b2,b3,b4,b5}, E={(a1,b1),(a1,b2),(a1,b3),(a1,b4),(a1,b5),(a2,b1),(a2,b2),(a2,b3),(a2,b4),(a2,b5)}, find edges. Show your reasoning.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: List adjacency information from the given edges. There are 7 vertices and 10 edges.
Step 2: The nonincreasing degree sequence is (5,5,2,2,2,2,2); its sum is 20=2*|E|.
Step 3: For edges, the answer is 10. Count the requested quantity directly from the definitions.
```

Concept: Use the precise graph definition and invariants; equal necessary invariants alone do not prove isomorphism or existence of a traversal.

</details>

### dm-graphs-6: Components with an isolate

Original | 5 marks | core | standard | numeric

For V={a,b,c,d,e,f}, E={(a,b),(b,c),(a,c),(d,e)}, find components. Show your reasoning.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: List adjacency information from the given edges. There are 6 vertices and 4 edges.
Step 2: The nonincreasing degree sequence is (2,2,2,1,1,0); its sum is 8=2*|E|.
Step 3: For components, the answer is 3. A search from one unvisited vertex at a time gives 3 components.
```

Concept: Use the precise graph definition and invariants; equal necessary invariants alone do not prove isomorphism or existence of a traversal.

</details>

### dm-graphs-7: Graph properties 1

Original | 5 marks | core | standard | properties

For V={1,2,3,4,5,6}, E={(1,2),(2,3),(3,4),(4,5),(5,6),(6,1)}, decide bipartite, Eulerian (has an Euler circuit), and Hamiltonian (has a Hamilton circuit).

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: The degree sequence is (2,2,2,2,2,2) and the graph is connected.
Step 2: Eulerian=true: an undirected connected graph has an Euler circuit iff every degree is even.
Step 3: Bipartite=true: try alternating colors along edges; an odd cycle is an obstruction.
Step 4: Hamiltonian=true: the cyclic vertex order in a cycle (or 1,2,3,4,1 in K4) gives a Hamilton circuit.
```

Concept: Use the precise graph definition and invariants; equal necessary invariants alone do not prove isomorphism or existence of a traversal.

</details>

### dm-graphs-8: Graph properties 2

Original | 5 marks | core | standard | properties

For V={1,2,3,4,5}, E={(1,2),(2,3),(3,4),(4,5),(5,1)}, decide bipartite, Eulerian (has an Euler circuit), and Hamiltonian (has a Hamilton circuit).

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: The degree sequence is (2,2,2,2,2) and the graph is connected.
Step 2: Eulerian=true: an undirected connected graph has an Euler circuit iff every degree is even.
Step 3: Bipartite=false: try alternating colors along edges; an odd cycle is an obstruction.
Step 4: Hamiltonian=true: the cyclic vertex order in a cycle (or 1,2,3,4,1 in K4) gives a Hamilton circuit.
```

Concept: Use the precise graph definition and invariants; equal necessary invariants alone do not prove isomorphism or existence of a traversal.

</details>

### dm-graphs-9: Graph properties 3

Original | 5 marks | core | standard | properties

For V={1,2,3,4}, E={(1,2),(1,3),(1,4),(2,3),(2,4),(3,4)}, decide bipartite, Eulerian (has an Euler circuit), and Hamiltonian (has a Hamilton circuit).

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: The degree sequence is (3,3,3,3) and the graph is connected.
Step 2: Eulerian=false: an undirected connected graph has an Euler circuit iff every degree is even.
Step 3: Bipartite=false: try alternating colors along edges; an odd cycle is an obstruction.
Step 4: Hamiltonian=true: the cyclic vertex order in a cycle (or 1,2,3,4,1 in K4) gives a Hamilton circuit.
```

Concept: Use the precise graph definition and invariants; equal necessary invariants alone do not prove isomorphism or existence of a traversal.

</details>

### dm-graphs-10: Graph properties 4

Original | 5 marks | core | standard | properties

For V={a1,a2,b1,b2,b3}, E={(a1,b1),(a1,b2),(a1,b3),(a2,b1),(a2,b2),(a2,b3)}, decide bipartite, Eulerian (has an Euler circuit), and Hamiltonian (has a Hamilton circuit).

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: The degree sequence is (3,3,2,2,2) and the graph is connected.
Step 2: Eulerian=false: an undirected connected graph has an Euler circuit iff every degree is even.
Step 3: Bipartite=true: try alternating colors along edges; an odd cycle is an obstruction.
Step 4: Hamiltonian=false: the two parts have different sizes, so an alternating circuit cannot visit all vertices.
```

Concept: Use the precise graph definition and invariants; equal necessary invariants alone do not prove isomorphism or existence of a traversal.

</details>

### dm-graphs-11: cutEdges

Original | 5 marks | core | standard | set-answer

V={a,b,c,d,e}, E={a-b,b-c,c-a,c-d,d-e}. Find cutEdges; justify by deletion.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Initially the graph has 1 connected component.
Step 2: Delete each candidate edge and its incident edges as appropriate. A cut object increases the number of components.
Step 3: Exactly {c-d,d-e} have this property. Triangle edges have alternate routes.
```

Concept: Use the precise graph definition and invariants; equal necessary invariants alone do not prove isomorphism or existence of a traversal.

</details>

### dm-graphs-12: cutVertices

Original | 5 marks | core | standard | set-answer

V={a,b,c,d,e}, E={a-b,b-c,c-a,c-d,d-e}. Find cutVertices; justify by deletion.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Initially the graph has 1 connected component.
Step 2: Delete each candidate vertex and its incident edges as appropriate. A cut object increases the number of components.
Step 3: Exactly {c,d} have this property. Triangle edges have alternate routes.
```

Concept: Use the precise graph definition and invariants; equal necessary invariants alone do not prove isomorphism or existence of a traversal.

</details>

### dm-graphs-13: Count labelled simple graphs

Original | 5 marks | core | standard | formula

How many simple undirected loopless graphs have a fixed labelled vertex set of size n?

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: There are n*(n-1)/2 unordered pairs of distinct vertices.
Step 2: Each possible edge is independently present or absent.
Step 3: By the product rule the answer is 2^(n*(n-1)/2).
```

Concept: Use the precise graph definition and invariants; equal necessary invariants alone do not prove isomorphism or existence of a traversal.

</details>

### dm-graphs-14: Count labelled directed graphs

Original | 5 marks | core | standard | formula

How many directed graphs on n fixed labelled vertices allow loops but no parallel arcs?

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Each ordered pair (u,v), including u=v, can be an arc. There are n^2 pairs.
Step 2: Choose present or absent independently for each pair.
Step 3: The count is 2^(n^2).
```

Concept: Use the precise graph definition and invariants; equal necessary invariants alone do not prove isomorphism or existence of a traversal.

</details>

### dm-graphs-15: Planarity obstruction

Original | 5 marks | core | standard | steps

Prove K3,3 is nonplanar.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: K3,3 is simple, connected and bipartite, with v=6 and e=9.
Step 2: In a simple bipartite planar graph with v>=3, every face boundary has length at least 4; Euler's formula gives e<=2*v-4.
Step 3: Here 9>2*6-4=8, contradicting the planar bound. Hence K3,3 is nonplanar.
```

Concept: Use the precise graph definition and invariants; equal necessary invariants alone do not prove isomorphism or existence of a traversal.

</details>

### dm-graphs-16: Planar faces

Original | 5 marks | core | standard | numeric

A connected planar graph has 8 vertices and 12 edges. How many faces, including the unbounded face?

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Euler's formula is v-e+f=2 for a connected planar embedding.
Step 2: Substitute v=8,e=12: 8-12+f=2.
Step 3: Therefore f=6, including the unbounded face.
```

Concept: Use the precise graph definition and invariants; equal necessary invariants alone do not prove isomorphism or existence of a traversal.

</details>

### dm-graphs-17: Hypercube and wheel counts

Original | 5 marks | core | standard | steps

Find vertices, edges and degrees of Q4 and W5. Use W_n = C_n plus one hub.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Q4 has all 4-bit strings as vertices, hence 2^4=16 vertices. Each vertex has degree 4 by flipping one bit.
Step 2: The handshake theorem gives |E(Q4)|=16*4/2=32.
Step 3: W5 has 5 rim vertices and one hub, hence 6 vertices. There are 5 rim edges and 5 spokes, hence 10 edges.
Step 4: The hub has degree 5 and each rim vertex degree 3, giving degree sequence (5,3,3,3,3,3).
```

Concept: Use the precise graph definition and invariants; equal necessary invariants alone do not prove isomorphism or existence of a traversal.

</details>

### dm-graphs-18: Isomorphism requires adjacency

Original | 5 marks | core | standard | steps

Prove two triangles and a cycle C6 have the same degree sequence but are not isomorphic.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Both graphs have 6 vertices, each of degree 2. Their degree sequences are (2,2,2,2,2,2).
Step 2: The disjoint union of two triangles has 2 connected components; C6 has 1.
Step 3: An isomorphism preserves paths and therefore connected components.
Step 4: Since the component counts differ, the graphs are not isomorphic.
```

Concept: Use the precise graph definition and invariants; equal necessary invariants alone do not prove isomorphism or existence of a traversal.

</details>

### dm-trap-4: Bipartite coloring trap

Original | 5 marks | core | standard | mcq

What is the chromatic number of K2,3?

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: The graph has two independent parts; color one part red and the other blue.
Step 2: There is at least one edge, so one color cannot suffice.
Step 3: Therefore the chromatic number is 2.
```

Concept: Use the precise graph definition and invariants; equal necessary invariants alone do not prove isomorphism or existence of a traversal.

</details>

### dm-p1-q4: Directed graph count

Past paper 1 Q4 | 15 marks | core | standard | formula

For V={v1,...,vn}, how many distinct directed graphs have vertex set V? State the loop convention.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use the course convention of directed graphs with loops permitted and no parallel arcs.
Step 2: There are n^2 possible ordered pairs, each independently selected or omitted. Thus there are 2^(n^2) graphs.
Step 3: If the intended convention excludes loops, the alternative is 2^(n*(n-1)). State the convention explicitly.
```

Concept: Use the precise graph definition and invariants; equal necessary invariants alone do not prove isomorphism or existence of a traversal.

</details>

### dm-p1-q5a: Degree sequence of K_m,n

Past paper 1 Q5a | 5 marks | core | standard | steps

Give the degree sequence of K_m,n, m,n positive integers, in nonincreasing order.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Each of the m vertices in the first part is adjacent to all n vertices in the other part, so has degree n.
Step 2: Each of the n vertices in the second part has degree m.
Step 3: The degree multiset is n repeated m times and m repeated n times. For m<=n put the n entries first; for m>n put the m entries first.
```

Concept: Use the precise graph definition and invariants; equal necessary invariants alone do not prove isomorphism or existence of a traversal.

</details>

### dm-p1-q5b: Degree sequence does not imply isomorphism

Past paper 1 Q5b | 20 marks | core | standard | steps

Prove two triangles and a cycle C6 have the same degree sequence but are not isomorphic.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Both graphs have 6 vertices, each of degree 2. Their degree sequences are (2,2,2,2,2,2).
Step 2: The disjoint union of two triangles has 2 connected components; C6 has 1.
Step 3: An isomorphism preserves paths and therefore connected components.
Step 4: Since the component counts differ, the graphs are not isomorphic.
```

Concept: Use the precise graph definition and invariants; equal necessary invariants alone do not prove isomorphism or existence of a traversal.

</details>

### dm-p1-q6: A path stays in its SCC

Past paper 1 Q6 | 15 marks | core | standard | steps

Prove every vertex on a directed path between two vertices in the same strongly connected component is also in that component.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Let u and v be in one SCC, and x lie on a directed path from u to v.
Step 2: The path provides u->...->x and x->...->v. Since v and u are in one SCC, there is a path v->...->u.
Step 3: Concatenate x->...->v->...->u to show x reaches u, while u reaches x.
Step 4: Thus x is mutually reachable with u and belongs to the same SCC.
```

Concept: Use the precise graph definition and invariants; equal necessary invariants alone do not prove isomorphism or existence of a traversal.

</details>

### dm-p2-q4: Undirected labelled graph count

Past paper 2 Q4 | 15 marks | core | standard | formula

How many distinct simple undirected loopless graphs have V={v1,...,vn}?

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: There are n*(n-1)/2 unordered pairs of distinct vertices.
Step 2: Each possible edge is independently present or absent.
Step 3: By the product rule the answer is 2^(n*(n-1)/2).
```

Concept: Use the precise graph definition and invariants; equal necessary invariants alone do not prove isomorphism or existence of a traversal.

</details>

### dm-p2-q5: Same chromatic number does not imply isomorphism

Past paper 2 Q5 | 20 marks | core | standard | steps

Disprove: two simple undirected graphs with the same chromatic number are isomorphic.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Take P3 with edges {12,23} and P4 with edges {12,23,34}.
Step 2: Both have an edge and are bipartite, so both have chromatic number 2.
Step 3: They have different numbers of vertices (3 and 4), so no vertex bijection exists. They are not isomorphic.
```

Concept: Use the precise graph definition and invariants; equal necessary invariants alone do not prove isomorphism or existence of a traversal.

</details>

### dm-p2-q7a: Hamilton path gives a spanning tree

Past paper 2 Q7a | 10 marks | core | standard | steps

Prove if a simple undirected graph has a Hamilton path, then it has a spanning tree.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Let v1,...,vn be the Hamilton path, visiting each vertex once.
Step 2: Keep only its n-1 consecutive path edges. These edges connect every vertex.
Step 3: A path has no cycle, so this connected spanning subgraph is a tree. Thus it is a spanning tree of G.
```

Concept: Use the precise graph definition and invariants; equal necessary invariants alone do not prove isomorphism or existence of a traversal.

</details>

### dm-p2-q7b: Spanning tree does not give a Hamilton path

Past paper 2 Q7b | 10 marks | core | standard | steps

Disprove the converse: if G has a spanning tree, then G has a Hamilton path.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Take the star K1,3, with centre c and leaves a,b,d. It is already a spanning tree of itself.
Step 2: Every leaf has degree 1, so if a Hamilton path existed each leaf would have to be an endpoint.
Step 3: A path has only two endpoints, but this star has three leaves. Thus it has no Hamilton path.
```

Concept: Use the precise graph definition and invariants; equal necessary invariants alone do not prove isomorphism or existence of a traversal.

</details>

### dm-p3-q6: Four colors do not imply planar

Past paper 3 Q6 | 20 marks | core | standard | steps

Is every graph with chromatic number at most 4 planar? Prove or disprove.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: No. Take K3,3. It is bipartite and has an edge, so its chromatic number is 2<=4.
Step 2: It has v=6,e=9. A simple bipartite planar graph with v>=3 has e<=2*v-4=8.
Step 3: Since 9>8, K3,3 is nonplanar. Thus the proposed converse is false.
```

Concept: Use the precise graph definition and invariants; equal necessary invariants alone do not prove isomorphism or existence of a traversal.

</details>

### dm-p3-q8: Bridge iff no cycle

Past paper 3 Q8 | 20 marks | core | standard | steps

Show an edge e in a simple undirected graph is a cut edge iff it lies on no simple circuit.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: If e lies on a simple circuit, the other circuit edges give an alternate path between its endpoints after deleting e. Every route using e can be rerouted, so deleting e does not increase the number of components. Thus e is not a cut edge.
Step 2: Conversely, suppose e=uv is not a cut edge. Its endpoints remain connected in G-e. Choose a simple u-v path there.
Step 3: Adding e to that path creates a simple circuit containing e.
Step 4: Thus e is a cut edge exactly when it belongs to no simple circuit.
```

Concept: Use the precise graph definition and invariants; equal necessary invariants alone do not prove isomorphism or existence of a traversal.

</details>

### dm-p4-q7: Mutual reachability transitive

Past paper 4 Q7 | 5 marks | core | standard | steps

If u,v are mutually reachable and v,w are mutually reachable in a directed graph, prove u,w are mutually reachable.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: There are paths u->...->v and v->...->w. Concatenate to obtain a directed walk from u to w. Remove repeated-vertex cycles to obtain a path.
Step 2: Likewise w->...->v followed by v->...->u gives a path from w to u.
Step 3: Thus u reaches w and w reaches u, so they are mutually reachable.
```

Concept: Use the precise graph definition and invariants; equal necessary invariants alone do not prove isomorphism or existence of a traversal.

</details>

### dm-p4-q8a: Average degree lower bound

Past paper 4 Q8a | 3 marks | core | standard | steps

For a graph with v>0 vertices, e edges, minimum degree m, prove 2*e/v >= m.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Every degree is at least m, so sum deg(x)>=v*m.
Step 2: By the handshake theorem sum deg(x)=2*e.
Step 3: Divide by v>0 to obtain 2*e/v>=m.
```

Concept: Use the precise graph definition and invariants; equal necessary invariants alone do not prove isomorphism or existence of a traversal.

</details>

### dm-p4-q8b: Average degree upper bound

Past paper 4 Q8b | 2 marks | core | standard | steps

For a graph with v>0 vertices, e edges, maximum degree M, prove 2*e/v <= M.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Every degree is at most M, so sum deg(x)<=v*M.
Step 2: By the handshake theorem sum deg(x)=2*e.
Step 3: Divide by v>0 to obtain 2*e/v<=M.
```

Concept: Use the precise graph definition and invariants; equal necessary invariants alone do not prove isomorphism or existence of a traversal.

</details>

### dm-p5-q8: Odd circuit forbids two colors

Past paper 5 Q8 | 5 marks | core | standard | steps

Show a simple graph containing a circuit with an odd number of vertices cannot be colored with two colors.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Let the odd cycle be v1,v2,...,v_(2*k+1),v1.
Step 2: In a proper two-coloring, adjacent cycle vertices must alternate colors. Thus odd-indexed vertices have the color of v1 and even-indexed vertices the other color.
Step 3: Since 2*k+1 is odd, v_(2*k+1) and v1 have the same color but are adjacent. This is impossible.
Step 4: Therefore the graph cannot be colored using two colors.
```

Concept: Use the precise graph definition and invariants; equal necessary invariants alone do not prove isomorphism or existence of a traversal.

</details>

### dm-p5-q9: Complement edge count

Past paper 5 Q9 | 5 marks | core | standard | numeric

A simple graph G has 20 edges and its complement has 16. How many vertices does G have?

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Every unordered pair of distinct vertices is an edge in exactly one of G and its complement.
Step 2: Therefore n*(n-1)/2=20+16=36, so n^2-n-72=0.
Step 3: Factor: (n-9)*(n+8)=0. Reject the negative root; n=9.
```

Concept: Use the precise graph definition and invariants; equal necessary invariants alone do not prove isomorphism or existence of a traversal.

</details>

## groups

### dm-groups-1: Uniqueness of identity

Original | 5 marks | past | standard | steps

Prove a group has a unique identity element.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Let e and f both be identities.
Step 2: Since e is an identity, e*f=f. Since f is an identity, e*f=e.
Step 3: Thus e=f, proving uniqueness.
```

Concept: Associativity changes parentheses, not factor order. Multiply by inverses on the correct side and prove closure before calling a subset a subgroup.

</details>

### dm-groups-2: Uniqueness of inverse

Original | 5 marks | past | standard | steps

If a*b=e in a group, prove b=a^(-1).

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Left multiply a*b=e by a^(-1): a^(-1)*(a*b)=a^(-1)*e.
Step 2: Associativity gives (a^(-1)*a)*b=a^(-1).
Step 3: Hence e*b=a^(-1), so b=a^(-1).
```

Concept: Associativity changes parentheses, not factor order. Multiply by inverses on the correct side and prove closure before calling a subset a subgroup.

</details>

### dm-groups-3: Cancellation yields identity

Original | 5 marks | past | standard | steps

In a group, a*b=a. Prove b=e.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Left multiply by a^(-1).
Step 2: Associativity gives (a^(-1)*a)*b=a^(-1)*a, hence e*b=e.
Step 3: Therefore b=e.
```

Concept: Associativity changes parentheses, not factor order. Multiply by inverses on the correct side and prove closure before calling a subset a subgroup.

</details>

### dm-groups-4: Union of subgroups can fail

Original | 5 marks | past | standard | steps

Show a union of two subgroups need not be a subgroup.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: In (Z,+), take H=2Z and K=3Z; both are subgroups.
Step 2: The numbers 2 and 3 belong to H union K.
Step 3: But 2+3=5 is in neither 2Z nor 3Z, so the union is not closed under addition.
Step 4: Therefore H union K need not be a subgroup.
```

Concept: Associativity changes parentheses, not factor order. Multiply by inverses on the correct side and prove closure before calling a subset a subgroup.

</details>

### dm-groups-5: Intersection of subgroups

Original | 5 marks | past | standard | steps

Prove H intersection K is a subgroup if H,K are subgroups of G.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: The identity belongs to both H and K, so the intersection is nonempty.
Step 2: If x,y are in H intersection K, then x*y^(-1) is in H and in K by their subgroup properties.
Step 3: Thus x*y^(-1) belongs to the intersection. By the subgroup test it is a subgroup.
```

Concept: Associativity changes parentheses, not factor order. Multiply by inverses on the correct side and prove closure before calling a subset a subgroup.

</details>

### dm-groups-6: A cancellation-like condition

Original | 5 marks | past | standard | steps

Suppose a group satisfies: for every x,y,z, x*y=z*x implies y=z. Prove the group is abelian.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Choose arbitrary x,y in the group, and put z=x*y*x^(-1).
Step 2: Then z*x=(x*y*x^(-1))*x=x*y by associativity and inverse laws.
Step 3: The assumed implication yields y=z=x*y*x^(-1). Right multiply by x to obtain y*x=x*y.
Step 4: Since x,y were arbitrary, every pair commutes and the group is abelian.
```

Concept: Associativity changes parentheses, not factor order. Multiply by inverses on the correct side and prove closure before calling a subset a subgroup.

</details>

### dm-p1-q8: Union of subgroups can fail

Past paper 1 Q8 | 20 marks | past | standard | steps

Show a union of two subgroups need not be a subgroup.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: In (Z,+), take H=2Z and K=3Z; both are subgroups.
Step 2: The numbers 2 and 3 belong to H union K.
Step 3: But 2+3=5 is in neither 2Z nor 3Z, so the union is not closed under addition.
Step 4: Therefore H union K need not be a subgroup.
```

Concept: Associativity changes parentheses, not factor order. Multiply by inverses on the correct side and prove closure before calling a subset a subgroup.

</details>

### dm-p2-q8: Uniqueness of inverse

Past paper 2 Q8 | 20 marks | past | standard | steps

If a*b=e in a group, prove b=a^(-1).

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Left multiply a*b=e by a^(-1): a^(-1)*(a*b)=a^(-1)*e.
Step 2: Associativity gives (a^(-1)*a)*b=a^(-1).
Step 3: Hence e*b=a^(-1), so b=a^(-1).
```

Concept: Associativity changes parentheses, not factor order. Multiply by inverses on the correct side and prove closure before calling a subset a subgroup.

</details>

### dm-p3-q9: Cancellation yields identity

Past paper 3 Q9 | 15 marks | past | standard | steps

In a group, a*b=a. Prove b=e.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Left multiply by a^(-1).
Step 2: Associativity gives (a^(-1)*a)*b=a^(-1)*a, hence e*b=e.
Step 3: Therefore b=e.
```

Concept: Associativity changes parentheses, not factor order. Multiply by inverses on the correct side and prove closure before calling a subset a subgroup.

</details>

### dm-p5-q7: A cancellation-like condition

Past paper 5 Q7 | 5 marks | past | standard | steps

Suppose a group satisfies: for every x,y,z, x*y=z*x implies y=z. Prove the group is abelian.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Choose arbitrary x,y in the group, and put z=x*y*x^(-1).
Step 2: Then z*x=(x*y*x^(-1))*x=x*y by associativity and inverse laws.
Step 3: The assumed implication yields y=z=x*y*x^(-1). Right multiply by x to obtain y*x=x*y.
Step 4: Since x,y were arbitrary, every pair commutes and the group is abelian.
```

Concept: Associativity changes parentheses, not factor order. Multiply by inverses on the correct side and prove closure before calling a subset a subgroup.

</details>

## induction

### dm-induction-1: Sum of first n integers

Original | 5 marks | core | foundation | steps

Prove 1+2+...+n = n*(n+1)/2 for n >= 1.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Let P(n) be the assertion: 1+2+...+n = n*(n+1)/2 for n >= 1. Induction is on this integer index in the stated domain. Basis n=1: 1=1*2/2.
Step 2: Inductive hypothesis: for an arbitrary k>=1, 1+...+k=k*(k+1)/2.
Step 3: Add k+1: 1+...+k+(k+1)=k*(k+1)/2+(k+1)=(k+1)*(k+2)/2.
Thus the statement holds at k+1. By induction it holds for every n>=1.
Step 4: The displayed derivation establishes P at the successor index using the hypothesis at established earlier indices.
Step 5: The computed basis and inductive step prove the claim. By the principle of mathematical induction, 1+2+...+n = n*(n+1)/2 for n >= 1.
```

Concept: Establish the correct basis, state a hypothesis for arbitrary earlier indices, and justify every transition to the next case.

</details>

### dm-induction-2: Sum of odd integers

Original | 5 marks | core | foundation | steps

Prove 1+3+...+(2*n-1)=n^2 for n>=1.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Let P(n) be the assertion: 1+3+...+(2*n-1)=n^2 for n>=1. Induction is on this integer index in the stated domain. Basis n=1: 1=1^2.
Step 2: Inductive hypothesis: Assume 1+3+...+(2*k-1)=k^2 for an arbitrary k>=1.
Step 3: The next term is 2*(k+1)-1=2*k+1. The new sum is k^2+2*k+1=(k+1)^2.
Therefore the formula holds for every n>=1 by induction.
Step 4: The displayed derivation establishes P at the successor index using the hypothesis at established earlier indices.
Step 5: The computed basis and inductive step prove the claim. By the principle of mathematical induction, 1+3+...+(2*n-1)=n^2 for n>=1.
```

Concept: Establish the correct basis, state a hypothesis for arbitrary earlier indices, and justify every transition to the next case.

</details>

### dm-induction-3: Geometric sum

Original | 5 marks | core | foundation | steps

Prove 1+2+...+2^n=2^(n+1)-1 for n>=0.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Let P(n) be the assertion: 1+2+...+2^n=2^(n+1)-1 for n>=0. Induction is on this integer index in the stated domain. Basis n=0: 1=2^1-1.
Step 2: Inductive hypothesis: for an arbitrary integer k>=0, assume sum_(i=0)^k 2^i=2^(k+1)-1.
Step 3: Add 2^(k+1): the sum through k+1 is 2*(2^(k+1))-1=2^(k+2)-1.
The basis and step prove the formula for all n>=0.
Step 4: The displayed derivation establishes P at the successor index using the hypothesis at established earlier indices.
Step 5: The computed basis and inductive step prove the claim. By the principle of mathematical induction, 1+2+...+2^n=2^(n+1)-1 for n>=0.
```

Concept: Establish the correct basis, state a hypothesis for arbitrary earlier indices, and justify every transition to the next case.

</details>

### dm-induction-4: Sum of squares

Original | 5 marks | core | standard | steps

Prove sum_(i=1)^n i^2=n*(n+1)*(2*n+1)/6 for n>=1.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Let P(n) be the assertion: sum_(i=1)^n i^2=n*(n+1)*(2*n+1)/6 for n>=1. Induction is on this integer index in the stated domain. Basis n=1 gives 1=1*2*3/6.
Step 2: Inductive hypothesis: for an arbitrary integer k>=1, assume sum_(i=1)^k i^2=k*(k+1)*(2*k+1)/6.
Step 3: Add (k+1)^2: the new sum equals (k+1)*[k*(2*k+1)+6*(k+1)]/6.
The bracket is 2*k^2+7*k+6=(k+2)*(2*k+3), giving (k+1)*(k+2)*(2*k+3)/6.
By induction, the formula holds for every n>=1.
Step 4: The displayed derivation establishes P at the successor index using the hypothesis at established earlier indices.
Step 5: The computed basis and inductive step prove the claim. By the principle of mathematical induction, sum_(i=1)^n i^2=n*(n+1)*(2*n+1)/6 for n>=1.
```

Concept: Establish the correct basis, state a hypothesis for arbitrary earlier indices, and justify every transition to the next case.

</details>

### dm-induction-5: Divisibility by three

Original | 5 marks | core | standard | steps

Prove 3 divides 4^n-1 for n>=0.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Let P(n) assert that 3 divides 4^n-1 for every integer n>=0. Basis: 4^0-1=0=3*0, so P(0) holds.
Step 2: Inductive hypothesis: let k>=0 be arbitrary and assume 4^k-1=3*m for some integer m.
Step 3: For P(k+1), 4^(k+1)-1=4*(4^k-1)+3. This exposes the hypothesis.
Step 4: Substituting gives 4^(k+1)-1=4*(3*m)+3=3*(4*m+1). Let t=4*m+1; t is an integer, so P(k+1) holds.
Step 5: By the principle of mathematical induction, 3 divides 4^n-1 for every integer n>=0.
```

Concept: Establish the correct basis, state a hypothesis for arbitrary earlier indices, and justify every transition to the next case.

</details>

### dm-induction-6: Divisibility by six

Original | 5 marks | core | standard | steps

Prove 6 divides n^3-n for n>=1.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Let P(n) assert that 6 divides n^3-n for every integer n>=1. Basis: 1^3-1=0=6*0, so P(1) holds.
Step 2: Inductive hypothesis: let k>=1 be arbitrary and assume k^3-k=6*m for some integer m.
Step 3: For P(k+1), (k+1)^3-(k+1)=(k^3-k)+3*k*(k+1).
Step 4: Since k and k+1 are consecutive, k*(k+1)=2*u for some integer u. Substituting the hypothesis gives (k+1)^3-(k+1)=6*m+6*u=6*(m+u). Let t=m+u, an integer. Thus P(k+1) holds.
Step 5: The computed basis and inductive step prove the claim. By the principle of mathematical induction, 6 divides n^3-n for n>=1.
```

Concept: Establish the correct basis, state a hypothesis for arbitrary earlier indices, and justify every transition to the next case.

</details>

### dm-induction-7: Exponential lower bound

Original | 5 marks | core | standard | steps

Prove 2^n >= n+1 for n>=0.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Let P(n) be the assertion: 2^n >= n+1 for n>=0. Induction is on this integer index in the stated domain. Basis n=0: 1>=1.
Step 2: Inductive hypothesis: Assume 2^k>=k+1 for k>=0.
Step 3: 2^(k+1)=2*2^k>=2*k+2>=k+2 because k>=0.
Thus the result holds for all n>=0.
Step 4: The displayed derivation establishes P at the successor index using the hypothesis at established earlier indices.
Step 5: The computed basis and inductive step prove the claim. By the principle of mathematical induction, 2^n >= n+1 for n>=0.
```

Concept: Establish the correct basis, state a hypothesis for arbitrary earlier indices, and justify every transition to the next case.

</details>

### dm-induction-8: Factorial lower bound

Original | 5 marks | core | standard | steps

Prove n! >= 2^(n-1) for n>=1.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Let P(n) be the assertion: n! >= 2^(n-1) for n>=1. Induction is on this integer index in the stated domain. Basis n=1: 1!=1=2^0.
Step 2: Inductive hypothesis: Assume k!>=2^(k-1), k>=1.
Step 3: (k+1)!=(k+1)*k!>=2*2^(k-1)=2^k because k+1>=2.
Hence the inequality holds for every n>=1.
Step 4: The displayed derivation establishes P at the successor index using the hypothesis at established earlier indices.
Step 5: The computed basis and inductive step prove the claim. By the principle of mathematical induction, n! >= 2^(n-1) for n>=1.
```

Concept: Establish the correct basis, state a hypothesis for arbitrary earlier indices, and justify every transition to the next case.

</details>

### dm-induction-9: Exponential beats a square

Original | 5 marks | core | standard | steps

Prove 2^n>=n^2 for n>=4.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Let P(n) be the assertion: 2^n>=n^2 for n>=4. Induction is on this integer index in the stated domain. Basis n=4: 16=4^2.
Step 2: Inductive hypothesis: Assume 2^k>=k^2 for k>=4.
Step 3: 2^(k+1)>=2*k^2. Also 2*k^2-(k+1)^2=k^2-2*k-1>=7>0 for k>=4.
Therefore 2^(k+1)>=(k+1)^2. By induction the claim holds for n>=4.
Step 4: The displayed derivation establishes P at the successor index using the hypothesis at established earlier indices.
Step 5: The computed basis and inductive step prove the claim. By the principle of mathematical induction, 2^n>=n^2 for n>=4.
```

Concept: Establish the correct basis, state a hypothesis for arbitrary earlier indices, and justify every transition to the next case.

</details>

### dm-induction-10: Strong induction and stamps

Original | 5 marks | core | exam | steps

Prove every integer n>=12 equals 4*a+5*b for some nonnegative integers a,b.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Let P(n) be the assertion: every integer n>=12 equals 4*a+5*b for some nonnegative integers a,b. Induction is on this integer index in the stated domain. Basis: 12=3*4, 13=2*4+5, 14=4+2*5, 15=3*5.
Step 2: Strong hypothesis: assume every integer from 12 through k is representable, where k>=15.
Step 3: For k+1, we have 12<=k-3<=k. By the hypothesis k-3=4*a+5*b.
Then k+1=4*(a+1)+5*b, with nonnegative coefficients. Hence all n>=12 are representable.
Step 4: The displayed derivation establishes P at the successor index using the hypothesis at established earlier indices.
Step 5: The computed basis and inductive step prove the claim. By the principle of strong mathematical induction, every integer n>=12 equals 4*a+5*b for some nonnegative integers a,b.
```

Concept: Establish the correct basis, state a hypothesis for arbitrary earlier indices, and justify every transition to the next case.

</details>

### dm-induction-11: Prime factorisation exists

Original | 5 marks | core | exam | steps

Use strong induction to prove every integer n>=2 is a product of primes.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Let P(n) be the assertion: every integer n>=2 is a product of primes. Induction is on this integer index in the stated domain. Basis n=2 is itself prime.
Step 2: Strong inductive hypothesis: for an arbitrary integer k>=2, assume every integer j with 2<=j<=k is a product of primes.
Step 3: If k+1 is prime, it is a one-factor product. Otherwise k+1=a*b with 2<=a,b<=k.
Both a and b are products of primes by the strong hypothesis, so their product is too. The result follows.
Step 4: The displayed derivation establishes P at the successor index using the hypothesis at established earlier indices.
Step 5: The computed basis and inductive step prove the claim. By the principle of strong mathematical induction, every integer n>=2 is a product of primes.
```

Concept: Establish the correct basis, state a hypothesis for arbitrary earlier indices, and justify every transition to the next case.

</details>

### dm-induction-12: Binary strings structural induction

Original | 5 marks | core | exam | steps

Binary strings are built from the empty string by appending 0 or 1. Prove length(s)=number_of_0s(s)+number_of_1s(s).

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Let P be the stated property of each recursively generated object: length(s)=number_of_0s(s)+number_of_1s(s). Basis: the empty string has length 0 and zero of both symbols.
Step 2: Structural hypothesis: assume the equality holds for a constructed string s.
Step 3: Appending 0 increases length and number of 0s by 1, leaving number of 1s unchanged. Appending 1 increases length and number of 1s by 1.
Each constructor preserves the equality. Thus it holds for every generated binary string.
Step 4: The property has been proved for every allowed constructor, using only the property of its previously generated inputs.
Step 5: Each constructor preserves the asserted property. By structural induction it holds for every generated object in the stated domain.
```

Concept: Establish the correct basis, state a hypothesis for arbitrary earlier indices, and justify every transition to the next case.

</details>

### dm-induction-13: Full binary tree leaves

Original | 5 marks | core | exam | steps

Prove by structural induction that a full binary tree has leaves = internal vertices + 1.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Let P be the stated property of each recursively generated object: a full binary tree has leaves = internal vertices + 1. Basis: a single leaf has L=1 and I=0.
Step 2: Inductive hypothesis: A non-leaf full binary tree consists of a root and two smaller full binary trees. Assume L1=I1+1 and L2=I2+1.
Step 3: The combined tree has L=L1+L2=I1+I2+2 and I=1+I1+I2. Therefore L=I+1.
By structural induction the identity holds for all full binary trees.
Step 4: The property has been proved for every allowed constructor, using only the property of its previously generated inputs.
Step 5: Each constructor preserves the asserted property. By structural induction it holds for every generated object in the stated domain.
```

Concept: Establish the correct basis, state a hypothesis for arbitrary earlier indices, and justify every transition to the next case.

</details>

### dm-induction-14: Fibonacci bound

Original | 5 marks | core | exam | steps

Let F_0=0,F_1=1,F_n=F_(n-1)+F_(n-2). Prove F_n<=2^(n-1) for n>=1.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Let P(n) be the assertion: F_n<=2^(n-1) for n>=1. Induction is on this integer index in the stated domain. Basis: F_1=1<=1 and F_2=1<=2.
Step 2: Strong inductive hypothesis: for an arbitrary integer k>=2, assume F_j<=2^(j-1) for every integer j with 1<=j<=k.
Step 3: F_(k+1)=F_k+F_(k-1)<=2^(k-1)+2^(k-2)=3*2^(k-2)<=4*2^(k-2)=2^k.
Thus strong induction establishes the bound for all n>=1.
Step 4: The displayed derivation establishes P at the successor index using the hypothesis at established earlier indices.
Step 5: The computed basis and inductive step prove the claim. By the principle of strong mathematical induction, F_n<=2^(n-1) for n>=1.
```

Concept: Establish the correct basis, state a hypothesis for arbitrary earlier indices, and justify every transition to the next case.

</details>

### dm-induction-15: Spot an invalid induction

Original | 5 marks | core | exam | steps

A claimed proof of 2^n=1 starts at n=0 and uses 2^(k+1)=2^k*2^k/2^(k-1). Explain the error.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: The basis n=0 is true, but n=1 gives 2, so the conclusion is false.
Step 2: The recurrence step requires k-1>=0 to apply the hypothesis. At the first step k=0, it invokes n=-1, which is outside the established range.
Step 3: A valid two-term step needs enough basis cases. Adding n=1 exposes the false claim immediately.
Step 4: Therefore the alleged induction does not establish the statement.
```

Concept: Establish the correct basis, state a hypothesis for arbitrary earlier indices, and justify every transition to the next case.

</details>

### dm-p2-q2: Ternary tree height bound

Past paper 2 Q2 | 20 marks | core | standard | steps

Prove by strong induction on height h (root height 0) that a ternary tree of height h has at most 4^h nodes.

Note: Reconstructed notation. Superscript restored as 4^h from flattened text "4h"; full-page renderer unavailable. Height convention stated explicitly.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Let P(h) be the assertion: a ternary tree of height h has at most 4^h nodes. Induction is on this integer index in the stated domain. Basis h=0: the tree contains one root, and 1=4^0.
Step 2: Strong hypothesis: every ternary tree of height j<=k has at most 4^j nodes.
Step 3: A tree of height k+1 consists of its root and at most three subtrees, each of height at most k. Each has at most 4^k nodes.
Thus total nodes <=1+3*4^k<=4^k+3*4^k=4^(k+1), because 4^k>=1.
By strong induction the bound holds for all h>=0.
Step 4: The displayed derivation establishes P at the successor index using the hypothesis at established earlier indices.
Step 5: The computed basis and inductive step prove the claim. By the principle of strong mathematical induction, a ternary tree of height h has at most 4^h nodes.
```

Concept: Establish the correct basis, state a hypothesis for arbitrary earlier indices, and justify every transition to the next case.

</details>

### dm-p3-q3: A recovered induction inequality

Past paper 3 Q3 | 15 marks | core | standard | steps

Prove by induction that 2^n >= n+12 for all natural numbers n>=4.

Note: Reconstructed notation. Flattened text "2n n + 12" restored as 2^n >= n+12, as explicitly clarified in the user-supplied source warning.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Let P(n) be the assertion: 2^n >= n+12 for all natural numbers n>=4. Induction is on this integer index in the stated domain. Basis n=4: 2^4=16=4+12.
Step 2: Inductive hypothesis: Assume 2^k>=k+12 for an arbitrary k>=4.
Step 3: 2^(k+1)=2*2^k>=2*k+24. Also 2*k+24-(k+13)=k+11>=0.
Hence 2^(k+1)>=k+13=(k+1)+12. By induction the inequality holds for all n>=4.
Step 4: The displayed derivation establishes P at the successor index using the hypothesis at established earlier indices.
Step 5: The computed basis and inductive step prove the claim. By the principle of mathematical induction, 2^n >= n+12 for all natural numbers n>=4.
```

Concept: Establish the correct basis, state a hypothesis for arbitrary earlier indices, and justify every transition to the next case.

</details>

### dm-p4-q6: Structural congruence

Past paper 4 Q6 | 5 marks | core | standard | steps

S is recursively generated: 1 in S; if n in S then 3*n+2 and n^2 are in S. Prove every n in S is congruent to 1 modulo 4.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Let P be the stated property of each recursively generated object: every n in S is congruent to 1 modulo 4. Basis: 1=1 (mod 4).
Step 2: Structural hypothesis: take a generated n with n=1 (mod 4).
Step 3: Then 3*n+2=3*1+2=5=1 (mod 4), and n^2=1^2=1 (mod 4).
Both constructors preserve the property. Hence by structural induction every element of S is congruent to 1 modulo 4.
Step 4: The property has been proved for every allowed constructor, using only the property of its previously generated inputs.
Step 5: Each constructor preserves the asserted property. By structural induction it holds for every generated object in the stated domain.
```

Concept: Establish the correct basis, state a hypothesis for arbitrary earlier indices, and justify every transition to the next case.

</details>

### dm-p5-q2: Strict exponential inequality

Past paper 5 Q2 | 5 marks | core | standard | steps

Prove 2^(n+1) < 1+(n+1)*2^n for every positive integer n, using induction.

Note: Reconstructed notation. Superscripts restored from flattened "2n+1 < 1 + (n + 1)2n"; full-page rendering unavailable. Stated positive-integer domain checked.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Let P(n) be the assertion: 2^(n+1) < 1+(n+1)*2^n for every positive integer n, using induction. Induction is on this integer index in the stated domain. Basis n=1: 2^2=4<1+2*2=5.
Step 2: Inductive hypothesis: Assume 2^(k+1)<1+(k+1)*2^k for an arbitrary k>=1.
Step 3: Multiply by 2: 2^(k+2)<2+(k+1)*2^(k+1).
Since 1<=2^(k+1), we have 2+(k+1)*2^(k+1)<=1+(k+2)*2^(k+1).
Hence 2^(k+2)<1+(k+2)*2^(k+1), proving the step and the claim.
Step 4: The displayed derivation establishes P at the successor index using the hypothesis at established earlier indices.
Step 5: The computed basis and inductive step prove the claim. By the principle of mathematical induction, 2^(n+1) < 1+(n+1)*2^n for every positive integer n, using induction.
```

Concept: Establish the correct basis, state a hypothesis for arbitrary earlier indices, and justify every transition to the next case.

</details>

### dm-slot1-induction-0: Slot 1 Q1b: reported divisibility proof

Slot 1 exam pattern | 5 marks | core | exam | steps

Write a FULL typed proof by mathematical induction that 57 divides 7^(n+2)+8^(2*n+1) for all integers n>=0. State P(n), compute the basis, state the hypothesis with an integer m, derive P(k+1), name its integer factor, and conclude. Checkpoints alone are not the answer.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Let P(n) be the statement that 57 divides 7^(n+2)+8^(2*n+1), for every integer n>=0. Basis: at n=0, 7^(0+2)+8^(2*0+1)=57=57*1. Thus P(0) holds.
Step 2: Inductive hypothesis: let k>=0 be arbitrary and assume P(k). Then 7^(k+2)+8^(2*k+1)=57*m for some integer m.
Step 3: For the inductive step, start from the expression in P(k+1):
7^(k+3)+8^(2*k+3)
= 7*(7^(k+2)+8^(2*k+1))+57*8^(2*k+1). This exposes the expression in the inductive hypothesis.
Step 4: Substituting the hypothesis gives
7^(k+3)+8^(2*k+3)=57*(7*m+8^(2*k+1)).
Let t=7*m+8^(2*k+1). Since k and m are integers and all powers here have nonnegative integer exponents, t is an integer. Hence 57 divides the expression in P(k+1).
Step 5: The basis and inductive step have been proved. By the principle of mathematical induction, 57 divides 7^(n+2)+8^(2*n+1) for every integer n>=0.
```

Concept: Write the complete proof: statement and domain, computed basis, explicit hypothesis, algebra exposing that hypothesis, integer factor, and induction conclusion.

</details>

### dm-slot1-induction-1: Slot 1 Q1b: divisibility variant 1

Slot 1 exam pattern | 5 marks | core | exam | steps

Write a FULL typed proof by mathematical induction that 133 divides 11^(n+1)+12^(2*n-1) for all integers n>=1. State P(n), compute the basis, state the hypothesis with an integer m, derive P(k+1), name its integer factor, and conclude. Checkpoints alone are not the answer.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Let P(n) be the statement that 133 divides 11^(n+1)+12^(2*n-1), for every integer n>=1. Basis: at n=1, 11^(1+1)+12^(2*1-1)=133=133*1. Thus P(1) holds.
Step 2: Inductive hypothesis: let k>=1 be arbitrary and assume P(k). Then 11^(k+1)+12^(2*k-1)=133*m for some integer m.
Step 3: For the inductive step, start from the expression in P(k+1):
11^(k+2)+12^(2*k+1)
= 11*(11^(k+1)+12^(2*k-1))+133*12^(2*k-1). This exposes the expression in the inductive hypothesis.
Step 4: Substituting the hypothesis gives
11^(k+2)+12^(2*k+1)=133*(11*m+12^(2*k-1)).
Let t=11*m+12^(2*k-1). Since k and m are integers and all powers here have nonnegative integer exponents, t is an integer. Hence 133 divides the expression in P(k+1).
Step 5: The basis and inductive step have been proved. By the principle of mathematical induction, 133 divides 11^(n+1)+12^(2*n-1) for every integer n>=1.
```

Concept: Write the complete proof: statement and domain, computed basis, explicit hypothesis, algebra exposing that hypothesis, integer factor, and induction conclusion.

</details>

### dm-slot1-induction-2: Slot 1 Q1b: divisibility variant 2

Slot 1 exam pattern | 5 marks | core | exam | steps

Write a FULL typed proof by mathematical induction that 24 divides 5^(2*n)-1 for all integers n>=0. State P(n), compute the basis, state the hypothesis with an integer m, derive P(k+1), name its integer factor, and conclude. Checkpoints alone are not the answer.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Let P(n) be the statement that 24 divides 5^(2*n)-1, for every integer n>=0. Basis: at n=0, 5^(2*0)-1=0=24*0. Thus P(0) holds.
Step 2: Inductive hypothesis: let k>=0 be arbitrary and assume P(k). Then 5^(2*k)-1=24*m for some integer m.
Step 3: For the inductive step, start from the expression in P(k+1):
5^(2*(k+1))-1
= 25*(5^(2*k)-1)+24. This exposes the expression in the inductive hypothesis.
Step 4: Substituting the hypothesis gives
5^(2*(k+1))-1=24*(25*m+1).
Let t=25*m+1. Since k and m are integers and all powers here have nonnegative integer exponents, t is an integer. Hence 24 divides the expression in P(k+1).
Step 5: The basis and inductive step have been proved. By the principle of mathematical induction, 24 divides 5^(2*n)-1 for every integer n>=0.
```

Concept: Write the complete proof: statement and domain, computed basis, explicit hypothesis, algebra exposing that hypothesis, integer factor, and induction conclusion.

</details>

### dm-slot1-induction-3: Slot 1 Q1b: divisibility variant 3

Slot 1 exam pattern | 5 marks | core | exam | steps

Write a FULL typed proof by mathematical induction that 7 divides 3^(2*n+1)+2^(n+2) for all integers n>=0. State P(n), compute the basis, state the hypothesis with an integer m, derive P(k+1), name its integer factor, and conclude. Checkpoints alone are not the answer.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Let P(n) be the statement that 7 divides 3^(2*n+1)+2^(n+2), for every integer n>=0. Basis: at n=0, 3^(2*0+1)+2^(0+2)=7=7*1. Thus P(0) holds.
Step 2: Inductive hypothesis: let k>=0 be arbitrary and assume P(k). Then 3^(2*k+1)+2^(k+2)=7*m for some integer m.
Step 3: For the inductive step, start from the expression in P(k+1):
3^(2*k+3)+2^(k+3)
= 9*(3^(2*k+1)+2^(k+2))-7*2^(k+2). This exposes the expression in the inductive hypothesis.
Step 4: Substituting the hypothesis gives
3^(2*k+3)+2^(k+3)=7*(9*m-2^(k+2)).
Let t=9*m-2^(k+2). Since k and m are integers and all powers here have nonnegative integer exponents, t is an integer. Hence 7 divides the expression in P(k+1).
Step 5: The basis and inductive step have been proved. By the principle of mathematical induction, 7 divides 3^(2*n+1)+2^(n+2) for every integer n>=0.
```

Concept: Write the complete proof: statement and domain, computed basis, explicit hypothesis, algebra exposing that hypothesis, integer factor, and induction conclusion.

</details>

### dm-slot1-induction-4: Slot 1 Q1b: divisibility variant 4

Slot 1 exam pattern | 5 marks | core | exam | steps

Write a FULL typed proof by mathematical induction that 3 divides n^3+2*n for all integers n>=0. State P(n), compute the basis, state the hypothesis with an integer m, derive P(k+1), name its integer factor, and conclude. Checkpoints alone are not the answer.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Let P(n) be the statement that 3 divides n^3+2*n, for every integer n>=0. Basis: at n=0, 0^3+2*0=0=3*0. Thus P(0) holds.
Step 2: Inductive hypothesis: let k>=0 be arbitrary and assume P(k). Then k^3+2*k=3*m for some integer m.
Step 3: For the inductive step, start from the expression in P(k+1):
(k+1)^3+2*(k+1)
= (k^3+2*k)+3*(k^2+k+1). This exposes the expression in the inductive hypothesis.
Step 4: Substituting the hypothesis gives
(k+1)^3+2*(k+1)=3*(m+k^2+k+1).
Let t=m+k^2+k+1. Since k and m are integers and all powers here have nonnegative integer exponents, t is an integer. Hence 3 divides the expression in P(k+1).
Step 5: The basis and inductive step have been proved. By the principle of mathematical induction, 3 divides n^3+2*n for every integer n>=0.
```

Concept: Write the complete proof: statement and domain, computed basis, explicit hypothesis, algebra exposing that hypothesis, integer factor, and induction conclusion.

</details>

### dm-slot1-induction-5: Slot 1 Q1b: divisibility variant 5

Slot 1 exam pattern | 5 marks | core | exam | steps

Write a FULL typed proof by mathematical induction that 5 divides 6^n-1 for all integers n>=0. State P(n), compute the basis, state the hypothesis with an integer m, derive P(k+1), name its integer factor, and conclude. Checkpoints alone are not the answer.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Let P(n) be the statement that 5 divides 6^n-1, for every integer n>=0. Basis: at n=0, 6^0-1=0=5*0. Thus P(0) holds.
Step 2: Inductive hypothesis: let k>=0 be arbitrary and assume P(k). Then 6^k-1=5*m for some integer m.
Step 3: For the inductive step, start from the expression in P(k+1):
6^(k+1)-1
= 6*(6^k-1)+5. This exposes the expression in the inductive hypothesis.
Step 4: Substituting the hypothesis gives
6^(k+1)-1=5*(6*m+1).
Let t=6*m+1. Since k and m are integers and all powers here have nonnegative integer exponents, t is an integer. Hence 5 divides the expression in P(k+1).
Step 5: The basis and inductive step have been proved. By the principle of mathematical induction, 5 divides 6^n-1 for every integer n>=0.
```

Concept: Write the complete proof: statement and domain, computed basis, explicit hypothesis, algebra exposing that hypothesis, integer factor, and induction conclusion.

</details>

## logic

### dm-logic-01: Implication as an OR

Original | 5 marks | core | foundation | truth-table

Construct the truth table, including every listed intermediate column: ~p; p -> q; ~p v q. Show your row order.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use row order p, q with T before F. Compute ~ first, then ^, then v, then ->, then <-> unless parentheses specify otherwise.
Step 2: Columns: p | q | ~p | p -> q | ~p v q.
Step 3: T | T | F | T | T
Step 4: T | F | F | F | F
Step 5: F | T | T | T | T
Step 6: F | F | T | T | T
Step 7: The last two columns agree in every row, so they are logically equivalent.
```

Concept: Evaluate each connective using its truth condition; equivalence requires agreement in every row, and speakers must satisfy their truth constraints.

</details>

### dm-logic-02: De Morgan for AND

Original | 5 marks | core | foundation | truth-table

Construct the truth table, including every listed intermediate column: p ^ q; ~(p ^ q); ~p v ~q. Show your row order.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use row order p, q with T before F. Compute ~ first, then ^, then v, then ->, then <-> unless parentheses specify otherwise.
Step 2: Columns: p | q | p ^ q | ~(p ^ q) | ~p v ~q.
Step 3: T | T | T | F | F
Step 4: T | F | F | T | T
Step 5: F | T | F | T | T
Step 6: F | F | F | T | T
Step 7: The last two columns agree in every row, so they are logically equivalent.
```

Concept: Evaluate each connective using its truth condition; equivalence requires agreement in every row, and speakers must satisfy their truth constraints.

</details>

### dm-logic-03: De Morgan for OR

Original | 5 marks | core | foundation | truth-table

Construct the truth table, including every listed intermediate column: p v q; ~(p v q); ~p ^ ~q. Show your row order.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use row order p, q with T before F. Compute ~ first, then ^, then v, then ->, then <-> unless parentheses specify otherwise.
Step 2: Columns: p | q | p v q | ~(p v q) | ~p ^ ~q.
Step 3: T | T | T | F | F
Step 4: T | F | T | F | F
Step 5: F | T | T | F | F
Step 6: F | F | F | T | T
Step 7: The last two columns agree in every row, so they are logically equivalent.
```

Concept: Evaluate each connective using its truth condition; equivalence requires agreement in every row, and speakers must satisfy their truth constraints.

</details>

### dm-logic-04: Contrapositive

Original | 5 marks | core | foundation | truth-table

Construct the truth table, including every listed intermediate column: p -> q; ~q -> ~p. Show your row order.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use row order p, q with T before F. Compute ~ first, then ^, then v, then ->, then <-> unless parentheses specify otherwise.
Step 2: Columns: p | q | p -> q | ~q -> ~p.
Step 3: T | T | T | T
Step 4: T | F | F | F
Step 5: F | T | T | T
Step 6: F | F | T | T
Step 7: The last two columns agree in every row, so they are logically equivalent.
```

Concept: Evaluate each connective using its truth condition; equivalence requires agreement in every row, and speakers must satisfy their truth constraints.

</details>

### dm-logic-05: Converse trap

Original | 5 marks | core | foundation | truth-table

Construct the truth table, including every listed intermediate column: p -> q; q -> p. Show your row order.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use row order p, q with T before F. Compute ~ first, then ^, then v, then ->, then <-> unless parentheses specify otherwise.
Step 2: Columns: p | q | p -> q | q -> p.
Step 3: T | T | T | T
Step 4: T | F | F | T
Step 5: F | T | T | F
Step 6: F | F | T | T
Step 7: The last two columns differ in at least one row, so they are not equivalent.
```

Concept: Evaluate each connective using its truth condition; equivalence requires agreement in every row, and speakers must satisfy their truth constraints.

</details>

### dm-logic-06: Biconditional

Original | 5 marks | core | foundation | truth-table

Construct the truth table, including every listed intermediate column: p -> q; q -> p; (p -> q) ^ (q -> p); p <-> q. Show your row order.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use row order p, q with T before F. Compute ~ first, then ^, then v, then ->, then <-> unless parentheses specify otherwise.
Step 2: Columns: p | q | p -> q | q -> p | (p -> q) ^ (q -> p) | p <-> q.
Step 3: T | T | T | T | T | T
Step 4: T | F | F | T | F | F
Step 5: F | T | T | F | F | F
Step 6: F | F | T | T | T | T
Step 7: The last two columns agree in every row, so they are logically equivalent.
```

Concept: Evaluate each connective using its truth condition; equivalence requires agreement in every row, and speakers must satisfy their truth constraints.

</details>

### dm-logic-07: Exclusive OR

Original | 5 marks | core | foundation | truth-table

Construct the truth table, including every listed intermediate column: p v q; p ^ q; (p v q) ^ ~(p ^ q). Show your row order.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use row order p, q with T before F. Compute ~ first, then ^, then v, then ->, then <-> unless parentheses specify otherwise.
Step 2: Columns: p | q | p v q | p ^ q | (p v q) ^ ~(p ^ q).
Step 3: T | T | T | T | F
Step 4: T | F | T | F | T
Step 5: F | T | T | F | T
Step 6: F | F | F | F | F
```

Concept: Evaluate each connective using its truth condition; equivalence requires agreement in every row, and speakers must satisfy their truth constraints.

</details>

### dm-logic-08: Excluded middle

Original | 5 marks | core | exam | truth-table

Construct the truth table, including every listed intermediate column: ~p; p v ~p. Show your row order.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use row order p with T before F. Compute ~ first, then ^, then v, then ->, then <-> unless parentheses specify otherwise.
Step 2: Columns: p | ~p | p v ~p.
Step 3: T | F | T
Step 4: F | T | T
```

Concept: Evaluate each connective using its truth condition; equivalence requires agreement in every row, and speakers must satisfy their truth constraints.

</details>

### dm-logic-09: Contradiction

Original | 5 marks | core | exam | truth-table

Construct the truth table, including every listed intermediate column: ~p; p ^ ~p. Show your row order.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use row order p with T before F. Compute ~ first, then ^, then v, then ->, then <-> unless parentheses specify otherwise.
Step 2: Columns: p | ~p | p ^ ~p.
Step 3: T | F | F
Step 4: F | T | F
```

Concept: Evaluate each connective using its truth condition; equivalence requires agreement in every row, and speakers must satisfy their truth constraints.

</details>

### dm-logic-10: Modus ponens

Original | 5 marks | core | foundation | truth-table

Construct the truth table, including every listed intermediate column: p -> q; p ^ (p -> q); (p ^ (p -> q)) -> q. Show your row order.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use row order p, q with T before F. Compute ~ first, then ^, then v, then ->, then <-> unless parentheses specify otherwise.
Step 2: Columns: p | q | p -> q | p ^ (p -> q) | (p ^ (p -> q)) -> q.
Step 3: T | T | T | T | T
Step 4: T | F | F | F | T
Step 5: F | T | T | F | T
Step 6: F | F | T | F | T
```

Concept: Evaluate each connective using its truth condition; equivalence requires agreement in every row, and speakers must satisfy their truth constraints.

</details>

### dm-logic-11: Distributive law

Original | 5 marks | core | exam | truth-table

Construct the truth table, including every listed intermediate column: q v r; p ^ (q v r); (p ^ q) v (p ^ r). Show your row order.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use row order p, q, r with T before F. Compute ~ first, then ^, then v, then ->, then <-> unless parentheses specify otherwise.
Step 2: Columns: p | q | r | q v r | p ^ (q v r) | (p ^ q) v (p ^ r).
Step 3: T | T | T | T | T | T
Step 4: T | T | F | T | T | T
Step 5: T | F | T | T | T | T
Step 6: T | F | F | F | F | F
Step 7: F | T | T | T | F | F
Step 8: F | T | F | T | F | F
Step 9: F | F | T | T | F | F
Step 10: F | F | F | F | F | F
Step 11: The last two columns agree in every row, so they are logically equivalent.
```

Concept: Evaluate each connective using its truth condition; equivalence requires agreement in every row, and speakers must satisfy their truth constraints.

</details>

### dm-logic-12: Implication is not associative

Original | 5 marks | core | exam | truth-table

Construct the truth table, including every listed intermediate column: p -> q; q -> r; (p -> q) -> r; p -> (q -> r). Show your row order.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use row order p, q, r with T before F. Compute ~ first, then ^, then v, then ->, then <-> unless parentheses specify otherwise.
Step 2: Columns: p | q | r | p -> q | q -> r | (p -> q) -> r | p -> (q -> r).
Step 3: T | T | T | T | T | T | T
Step 4: T | T | F | T | F | F | F
Step 5: T | F | T | F | T | T | T
Step 6: T | F | F | F | T | T | T
Step 7: F | T | T | T | T | T | T
Step 8: F | T | F | T | F | F | T
Step 9: F | F | T | T | T | T | T
Step 10: F | F | F | T | T | F | T
Step 11: The last two columns differ in at least one row, so they are not equivalent.
```

Concept: Evaluate each connective using its truth condition; equivalence requires agreement in every row, and speakers must satisfy their truth constraints.

</details>

### dm-logic-13: Transitivity of implication

Original | 5 marks | core | exam | truth-table

Construct the truth table, including every listed intermediate column: p -> q; q -> r; p -> r; ((p -> q) ^ (q -> r)) -> (p -> r). Show your row order.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use row order p, q, r with T before F. Compute ~ first, then ^, then v, then ->, then <-> unless parentheses specify otherwise.
Step 2: Columns: p | q | r | p -> q | q -> r | p -> r | ((p -> q) ^ (q -> r)) -> (p -> r).
Step 3: T | T | T | T | T | T | T
Step 4: T | T | F | T | F | F | T
Step 5: T | F | T | F | T | T | T
Step 6: T | F | F | F | T | F | T
Step 7: F | T | T | T | T | T | T
Step 8: F | T | F | T | F | T | T
Step 9: F | F | T | T | T | T | T
Step 10: F | F | F | T | T | T | T
```

Concept: Evaluate each connective using its truth condition; equivalence requires agreement in every row, and speakers must satisfy their truth constraints.

</details>

### dm-logic-14: Negating an implication

Original | 5 marks | core | foundation | truth-table

Construct the truth table, including every listed intermediate column: p -> q; ~(p -> q); p ^ ~q. Show your row order.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use row order p, q with T before F. Compute ~ first, then ^, then v, then ->, then <-> unless parentheses specify otherwise.
Step 2: Columns: p | q | p -> q | ~(p -> q) | p ^ ~q.
Step 3: T | T | T | F | F
Step 4: T | F | F | T | T
Step 5: F | T | T | F | F
Step 6: F | F | T | F | F
Step 7: The last two columns agree in every row, so they are logically equivalent.
```

Concept: Evaluate each connective using its truth condition; equivalence requires agreement in every row, and speakers must satisfy their truth constraints.

</details>

### dm-logic-15: Absorption

Original | 5 marks | core | foundation | truth-table

Construct the truth table, including every listed intermediate column: p ^ q; p v (p ^ q); p. Show your row order.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use row order p, q with T before F. Compute ~ first, then ^, then v, then ->, then <-> unless parentheses specify otherwise.
Step 2: Columns: p | q | p ^ q | p v (p ^ q) | p.
Step 3: T | T | T | T | T
Step 4: T | F | F | T | T
Step 5: F | T | F | F | F
Step 6: F | F | F | F | F
Step 7: The last two columns agree in every row, so they are logically equivalent.
```

Concept: Evaluate each connective using its truth condition; equivalence requires agreement in every row, and speakers must satisfy their truth constraints.

</details>

### dm-knights-1: A praises B

Original | 5 marks | past | standard | steps

A, B are each a knight (K) or knave (N). A lowercase letter means that person is a knight. Statements in person order: A says b; B says ~a. Determine every consistent assignment.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: A knight's statement must be true and a knave's statement must be false.
Step 2: Test all 4 assignments; for each speaker check statement truth against their type.
Step 3: The complete consistent list is: no assignments.
Step 4: Thus the statements are inconsistent.
```

Concept: Evaluate each connective using its truth condition; equivalence requires agreement in every row, and speakers must satisfy their truth constraints.

</details>

### dm-knights-2: Both claim the other is a knight

Original | 5 marks | past | standard | steps

A, B are each a knight (K) or knave (N). A lowercase letter means that person is a knight. Statements in person order: A says b; B says a. Determine every consistent assignment.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: A knight's statement must be true and a knave's statement must be false.
Step 2: Test all 4 assignments; for each speaker check statement truth against their type.
Step 3: The complete consistent list is: A=N, B=N; A=K, B=K.
Step 4: Thus the information does not determine a unique assignment.
```

Concept: Evaluate each connective using its truth condition; equivalence requires agreement in every row, and speakers must satisfy their truth constraints.

</details>

### dm-knights-3: A says they differ

Original | 5 marks | past | standard | steps

A, B are each a knight (K) or knave (N). A lowercase letter means that person is a knight. Statements in person order: A says ~(a <-> b); B says a. Determine every consistent assignment.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: A knight's statement must be true and a knave's statement must be false.
Step 2: Test all 4 assignments; for each speaker check statement truth against their type.
Step 3: The complete consistent list is: A=N, B=N.
Step 4: Thus the solution is unique.
```

Concept: Evaluate each connective using its truth condition; equivalence requires agreement in every row, and speakers must satisfy their truth constraints.

</details>

### dm-knights-4: An OR statement

Original | 5 marks | past | standard | steps

A, B are each a knight (K) or knave (N). A lowercase letter means that person is a knight. Statements in person order: A says a v b; B says ~a. Determine every consistent assignment.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: A knight's statement must be true and a knave's statement must be false.
Step 2: Test all 4 assignments; for each speaker check statement truth against their type.
Step 3: The complete consistent list is: A=K, B=N.
Step 4: Thus the solution is unique.
```

Concept: Evaluate each connective using its truth condition; equivalence requires agreement in every row, and speakers must satisfy their truth constraints.

</details>

### dm-knights-5: A three-person chain

Original | 5 marks | past | standard | steps

A, B, C are each a knight (K) or knave (N). A lowercase letter means that person is a knight. Statements in person order: A says b; B says c; C says a. Determine every consistent assignment.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: A knight's statement must be true and a knave's statement must be false.
Step 2: Test all 8 assignments; for each speaker check statement truth against their type.
Step 3: The complete consistent list is: A=N, B=N, C=N; A=K, B=K, C=K.
Step 4: Thus the information does not determine a unique assignment.
```

Concept: Evaluate each connective using its truth condition; equivalence requires agreement in every row, and speakers must satisfy their truth constraints.

</details>

### dm-knights-6: Exactly one spy

Original | 5 marks | past | standard | steps

A, B, C are one knight (K), one knave (N), one spy (S). A lowercase letter means that person is a knight. Statements in person order: A says a; B says ~a; C says ~b. Determine every consistent assignment.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: A knight's statement must be true and a knave's statement must be false. A spy may say either.
Step 2: Test the six permutations of K,N,S; for each speaker check statement truth against their type.
Step 3: The complete consistent list is: A=K, B=N, C=S; A=N, B=K, C=S; A=N, B=S, C=K; A=S, B=K, C=N.
Step 4: Thus the information does not determine a unique assignment.
```

Concept: Evaluate each connective using its truth condition; equivalence requires agreement in every row, and speakers must satisfy their truth constraints.

</details>

### dm-trap-3: False antecedent

Original | 5 marks | core | standard | mcq

When is p -> q false?

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Implication is equivalent to ~p v q.
Step 2: This OR is false only if ~p=F and q=F.
Step 3: Thus p=T,q=F is the unique false row.
```

Concept: Evaluate each connective using its truth condition; equivalence requires agreement in every row, and speakers must satisfy their truth constraints.

</details>

### dm-p2-q1: Knights: implication with three inhabitants

Past paper 2 Q1 | 20 marks | past | standard | steps

A says "B is a knight." B says "If A is a knight, so is C." A,B,C are each knights or knaves. Determine their types.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Let a,b,c denote that A,B,C respectively are knights. Then a=b and b=(a->c).
Step 2: If a=F, then b=F, but a->c is T. This contradicts B being a knave.
Step 3: Therefore a=T and b=T. B's implication with a=T forces c=T.
Step 4: Hence A,B,C are all knights, uniquely.
```

Concept: Evaluate each connective using its truth condition; equivalence requires agreement in every row, and speakers must satisfy their truth constraints.

</details>

### dm-p3-q1: Is implication associative?

Past paper 3 Q1 | 15 marks | core | exam | truth-table

Construct the truth table, including every listed intermediate column: p -> q; q -> r; (p -> q) -> r; p -> (q -> r). Show your row order.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use row order p, q, r with T before F. Compute ~ first, then ^, then v, then ->, then <-> unless parentheses specify otherwise.
Step 2: Columns: p | q | r | p -> q | q -> r | (p -> q) -> r | p -> (q -> r).
Step 3: T | T | T | T | T | T | T
Step 4: T | T | F | T | F | F | F
Step 5: T | F | T | F | T | T | T
Step 6: T | F | F | F | T | T | T
Step 7: F | T | T | T | T | T | T
Step 8: F | T | F | T | F | F | T
Step 9: F | F | T | T | T | T | T
Step 10: F | F | F | T | T | F | T
Step 11: For p=F,q=T,r=F, the left-associated statement is F while the right-associated statement is T. Therefore implication is not associative.
```

Concept: Evaluate each connective using its truth condition; equivalence requires agreement in every row, and speakers must satisfy their truth constraints.

</details>

### dm-p3-q2: Exactly one quantifier

Past paper 3 Q2 | 15 marks | extra | standard | steps

Express "there exists exactly one x such that P(x)" using only standard quantifiers, connectives and equality.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: An existence clause is exists x P(x).
Step 2: Require every witness y to equal the chosen x.
Step 3: The complete formula is: exists x (P(x) ^ forall y (P(y) -> y=x)).
```

Concept: Evaluate each connective using its truth condition; equivalence requires agreement in every row, and speakers must satisfy their truth constraints.

</details>

### dm-p4-q1: Knight, knave and spy

Past paper 4 Q1 | 8 marks | past | standard | steps

Exactly one of A,B,C is a knight, one a knave, one a spy. A says "I am the knight"; B says "A is not the knave"; C says "B is not the knave". Find every consistent assignment.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: If A is the knight, B cannot be the knave because B's statement would be true. Then B is the spy and C is the knave, but C's statement is true, impossible.
Step 2: If A is the knave, B says something false and so must be the spy; C is then the knight. All three statements fit their types. This gives (A=N,B=S,C=K).
Step 3: If A is the spy, B's statement is true, so B must be the knight and C the knave. But C's statement is true, impossible.
Step 4: Therefore the unique solution is A=knave, B=spy, C=knight.
```

Concept: Evaluate each connective using its truth condition; equivalence requires agreement in every row, and speakers must satisfy their truth constraints.

</details>

### dm-p5-q1: Recovered compound statements

Past paper 5 Q1 | 5 marks | core | exam | truth-table

Construct the truth table, including every listed intermediate column: ~q; ~q v r; p -> (~q v r); p -> ~q; p -> r; (p -> ~q) v (p -> r). Show your row order.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use row order p, q, r with T before F. Compute ~ first, then ^, then v, then ->, then <-> unless parentheses specify otherwise.
Step 2: Columns: p | q | r | ~q | ~q v r | p -> (~q v r) | p -> ~q | p -> r | (p -> ~q) v (p -> r).
Step 3: T | T | T | F | T | T | F | T | T
Step 4: T | T | F | F | F | F | F | F | F
Step 5: T | F | T | T | T | T | T | T | T
Step 6: T | F | F | T | T | T | T | F | T
Step 7: F | T | T | F | T | T | T | T | T
Step 8: F | T | F | F | F | T | T | T | T
Step 9: F | F | T | T | T | T | T | T | T
Step 10: F | F | F | T | T | T | T | T | T
Step 11: The full statements agree in all eight rows; therefore they are equivalent.
```

Concept: Evaluate each connective using its truth condition; equivalence requires agreement in every row, and speakers must satisfy their truth constraints.

</details>

### dm-slot1-truth-0: Slot 1 Q1a: reported nested implication

Slot 1 exam pattern | 5 marks | core | exam | truth-table

Construct a complete truth table for ((p -> q) -> r) -> s. Include columns p -> q; (p -> q) -> r; ((p -> q) -> r) -> s. Classify the final column.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Write 16 rows, T before F, with p changing slowest. (1 mark for row order; 1 each for the three stages, or 3 for the two compared expressions; 1 for the conclusion.)
Step 2: Columns: p | q | r | s | p -> q | (p -> q) -> r | ((p -> q) -> r) -> s
Step 3: T | T | T | T | T | T | T
Step 4: T | T | T | F | T | T | F
Step 5: T | T | F | T | T | F | T
Step 6: T | T | F | F | T | F | T
Step 7: T | F | T | T | F | T | T
Step 8: T | F | T | F | F | T | F
Step 9: T | F | F | T | F | T | T
Step 10: T | F | F | F | F | T | F
Step 11: F | T | T | T | T | T | T
Step 12: F | T | T | F | T | T | F
Step 13: F | T | F | T | T | F | T
Step 14: F | T | F | F | T | F | T
Step 15: F | F | T | T | T | T | T
Step 16: F | F | T | F | T | T | F
Step 17: F | F | F | T | T | F | T
Step 18: F | F | F | F | T | F | T
Step 19: The final column is a contingency because it contains both T and F.
```

Concept: Work from the innermost implication outward; an implication is false only for T -> F.

</details>

### dm-slot1-truth-1: Slot 1 Q1a: implication variant 1

Slot 1 exam pattern | 5 marks | core | exam | truth-table

Construct a complete truth table for ((p -> q) ^ (q -> r)) -> (p -> r). Include columns p -> q; q -> r; ((p -> q) ^ (q -> r)) -> (p -> r). Classify the final column.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Write 8 rows, T before F, with p changing slowest. (1 mark for row order; 1 each for the three stages, or 3 for the two compared expressions; 1 for the conclusion.)
Step 2: Columns: p | q | r | p -> q | q -> r | ((p -> q) ^ (q -> r)) -> (p -> r)
Step 3: T | T | T | T | T | T
Step 4: T | T | F | T | F | T
Step 5: T | F | T | F | T | T
Step 6: T | F | F | F | T | T
Step 7: F | T | T | T | T | T
Step 8: F | T | F | T | F | T
Step 9: F | F | T | T | T | T
Step 10: F | F | F | T | T | T
Step 11: The final column is a tautology because all entries are T.
```

Concept: Work from the innermost implication outward; an implication is false only for T -> F.

</details>

### dm-slot1-truth-2: Slot 1 Q1a: implication variant 2

Slot 1 exam pattern | 5 marks | core | exam | truth-table

Construct a complete truth table for (p ^ q) -> r. Include columns p -> (q -> r); (p ^ q) -> r. Are the last two complete expressions equivalent?

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Write 8 rows, T before F, with p changing slowest. (1 mark for row order; 1 each for the three stages, or 3 for the two compared expressions; 1 for the conclusion.)
Step 2: Columns: p | q | r | p -> (q -> r) | (p ^ q) -> r
Step 3: T | T | T | T | T
Step 4: T | T | F | F | F
Step 5: T | F | T | T | T
Step 6: T | F | F | T | T
Step 7: F | T | T | T | T
Step 8: F | T | F | T | T
Step 9: F | F | T | T | T
Step 10: F | F | F | T | T
Step 11: The two complete columns agree in every row, so they are equivalent.
```

Concept: Work from the innermost implication outward; an implication is false only for T -> F.

</details>

### dm-slot1-truth-3: Slot 1 Q1a: implication variant 3

Slot 1 exam pattern | 5 marks | core | exam | truth-table

Construct a complete truth table for p -> (q -> r). Include columns (p -> q) -> r; p -> (q -> r). Are the last two complete expressions equivalent?

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Write 8 rows, T before F, with p changing slowest. (1 mark for row order; 1 each for the three stages, or 3 for the two compared expressions; 1 for the conclusion.)
Step 2: Columns: p | q | r | (p -> q) -> r | p -> (q -> r)
Step 3: T | T | T | T | T
Step 4: T | T | F | F | F
Step 5: T | F | T | T | T
Step 6: T | F | F | T | T
Step 7: F | T | T | T | T
Step 8: F | T | F | F | T
Step 9: F | F | T | T | T
Step 10: F | F | F | F | T
Step 11: The two complete columns differ (for example p=F,q=T,r=F), so they are not equivalent.
```

Concept: Work from the innermost implication outward; an implication is false only for T -> F.

</details>

### dm-slot1-truth-4: Slot 1 Q1a: implication variant 4

Slot 1 exam pattern | 5 marks | core | exam | truth-table

Construct a complete truth table for ((p -> q) ^ (r -> s)) -> ((p ^ r) -> (q ^ s)). Include columns p -> q; r -> s; ((p -> q) ^ (r -> s)) -> ((p ^ r) -> (q ^ s)). Classify the final column.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Write 16 rows, T before F, with p changing slowest. (1 mark for row order; 1 each for the three stages, or 3 for the two compared expressions; 1 for the conclusion.)
Step 2: Columns: p | q | r | s | p -> q | r -> s | ((p -> q) ^ (r -> s)) -> ((p ^ r) -> (q ^ s))
Step 3: T | T | T | T | T | T | T
Step 4: T | T | T | F | T | F | T
Step 5: T | T | F | T | T | T | T
Step 6: T | T | F | F | T | T | T
Step 7: T | F | T | T | F | T | T
Step 8: T | F | T | F | F | F | T
Step 9: T | F | F | T | F | T | T
Step 10: T | F | F | F | F | T | T
Step 11: F | T | T | T | T | T | T
Step 12: F | T | T | F | T | F | T
Step 13: F | T | F | T | T | T | T
Step 14: F | T | F | F | T | T | T
Step 15: F | F | T | T | T | T | T
Step 16: F | F | T | F | T | F | T
Step 17: F | F | F | T | T | T | T
Step 18: F | F | F | F | T | T | T
Step 19: The final column is a tautology because all entries are T.
```

Concept: Work from the innermost implication outward; an implication is false only for T -> F.

</details>

## mst

### dm-mst-kruskal-1: 5-vertex kruskal trace 1

Original | 5 marks | core | foundation | mst

Find an MST using Kruskal's algorithm. V={A,B,C,D,E}; edges: AB(1), BC(4), CD(7), DE(1), EA(4), AC(3), BD(3), CE(3). Type each accepted edge in order, justify it, and state total weight.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: add edge AB (weight 1). Consider edges in nondecreasing weight order. It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 2: add edge DE (weight 1). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 3: add edge AC (weight 3). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 4: add edge BD (weight 3). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 5: Finally all 5 vertices are connected using 4 edges, so this is the MST by Kruskal's algorithm; total weight = 1 + 1 + 3 + 3 = 8.
```

Concept: Kruskal joins different components; Prim crosses the reached cut. Ties permit alternative traces, but every result must be a spanning tree of minimum total weight.

</details>

### dm-mst-prim-1: 5-vertex prim trace 1

Original | 5 marks | core | foundation | mst

Find an MST using Prim's algorithm, starting at A. V={A,B,C,D,E}; edges: AB(1), BC(4), CD(7), DE(1), EA(4), AC(3), BD(3), CE(3). Type each accepted edge in order, justify it, and state total weight.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: add edge AB (weight 1). Start at A. It is a minimum-weight crossing edge. Reached vertices are {A, B}.
Step 2: add edge AC (weight 3). It is a minimum-weight crossing edge. Reached vertices are {A, B, C}.
Step 3: add edge BD (weight 3). It is a minimum-weight crossing edge. Reached vertices are {A, B, C, D}.
Step 4: add edge DE (weight 1). It is a minimum-weight crossing edge. Reached vertices are {A, B, C, D, E}.
Step 5: Finally all 5 vertices are connected using 4 edges, so this is the MST by Prim's algorithm; total weight = 1 + 3 + 3 + 1 = 8.
```

Concept: Kruskal joins different components; Prim crosses the reached cut. Ties permit alternative traces, but every result must be a spanning tree of minimum total weight.

</details>

### dm-mst-kruskal-2: 6-vertex kruskal trace 2

Original | 5 marks | core | foundation | mst

Find an MST using Kruskal's algorithm. V={A,B,C,D,E,F}; edges: AB(3), BC(6), CD(9), DE(3), EF(6), FA(9), AC(3), BD(8), CE(2), DF(7). Type each accepted edge in order, justify it, and state total weight.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: add edge CE (weight 2). Consider edges in nondecreasing weight order. It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 2: add edge AB (weight 3). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 3: add edge DE (weight 3). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 4: add edge AC (weight 3). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 5: add edge EF (weight 6). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 6: Finally all 6 vertices are connected using 5 edges, so this is the MST by Kruskal's algorithm; total weight = 2 + 3 + 3 + 3 + 6 = 17.
```

Concept: Kruskal joins different components; Prim crosses the reached cut. Ties permit alternative traces, but every result must be a spanning tree of minimum total weight.

</details>

### dm-mst-prim-2: 6-vertex prim trace 2

Original | 5 marks | core | foundation | mst

Find an MST using Prim's algorithm, starting at B. V={A,B,C,D,E,F}; edges: AB(3), BC(6), CD(9), DE(3), EF(6), FA(9), AC(3), BD(8), CE(2), DF(7). Type each accepted edge in order, justify it, and state total weight.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: add edge AB (weight 3). Start at B. It is a minimum-weight crossing edge. Reached vertices are {B, A}.
Step 2: add edge AC (weight 3). It is a minimum-weight crossing edge. Reached vertices are {B, A, C}.
Step 3: add edge CE (weight 2). It is a minimum-weight crossing edge. Reached vertices are {B, A, C, E}.
Step 4: add edge DE (weight 3). It is a minimum-weight crossing edge. Reached vertices are {B, A, C, E, D}.
Step 5: add edge EF (weight 6). It is a minimum-weight crossing edge. Reached vertices are {B, A, C, E, D, F}.
Step 6: Finally all 6 vertices are connected using 5 edges, so this is the MST by Prim's algorithm; total weight = 3 + 3 + 2 + 3 + 6 = 17.
```

Concept: Kruskal joins different components; Prim crosses the reached cut. Ties permit alternative traces, but every result must be a spanning tree of minimum total weight.

</details>

### dm-mst-kruskal-3: 7-vertex kruskal trace 3

Original | 5 marks | core | standard | mst

Find an MST using Kruskal's algorithm. V={A,B,C,D,E,F,G}; edges: AB(5), BC(8), CD(2), DE(5), EF(8), FG(2), GA(5), AC(4), BD(9), CE(3), DF(8), EG(2). Type each accepted edge in order, justify it, and state total weight.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: add edge CD (weight 2). Consider edges in nondecreasing weight order. It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 2: add edge FG (weight 2). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 3: add edge EG (weight 2). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 4: add edge CE (weight 3). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 5: add edge AC (weight 4). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 6: add edge AB (weight 5). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 7: Finally all 7 vertices are connected using 6 edges, so this is the MST by Kruskal's algorithm; total weight = 2 + 2 + 2 + 3 + 4 + 5 = 18.
```

Concept: Kruskal joins different components; Prim crosses the reached cut. Ties permit alternative traces, but every result must be a spanning tree of minimum total weight.

</details>

### dm-mst-prim-3: 7-vertex prim trace 3

Original | 5 marks | core | standard | mst

Find an MST using Prim's algorithm, starting at C. V={A,B,C,D,E,F,G}; edges: AB(5), BC(8), CD(2), DE(5), EF(8), FG(2), GA(5), AC(4), BD(9), CE(3), DF(8), EG(2). Type each accepted edge in order, justify it, and state total weight.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: add edge CD (weight 2). Start at C. It is a minimum-weight crossing edge. Reached vertices are {C, D}.
Step 2: add edge CE (weight 3). It is a minimum-weight crossing edge. Reached vertices are {C, D, E}.
Step 3: add edge EG (weight 2). It is a minimum-weight crossing edge. Reached vertices are {C, D, E, G}.
Step 4: add edge FG (weight 2). It is a minimum-weight crossing edge. Reached vertices are {C, D, E, G, F}.
Step 5: add edge AC (weight 4). It is a minimum-weight crossing edge. Reached vertices are {C, D, E, G, F, A}.
Step 6: add edge AB (weight 5). It is a minimum-weight crossing edge. Reached vertices are {C, D, E, G, F, A, B}.
Step 7: Finally all 7 vertices are connected using 6 edges, so this is the MST by Prim's algorithm; total weight = 2 + 3 + 2 + 2 + 4 + 5 = 18.
```

Concept: Kruskal joins different components; Prim crosses the reached cut. Ties permit alternative traces, but every result must be a spanning tree of minimum total weight.

</details>

### dm-mst-kruskal-4: 8-vertex kruskal trace 4

Original | 5 marks | core | standard | mst

Find an MST using Kruskal's algorithm. V={A,B,C,D,E,F,G,H}; edges: AB(7), BC(1), CD(4), DE(7), EF(1), FG(4), GH(7), HA(1), AC(3), BD(3), CE(3), DF(3), EG(3), FH(3). Type each accepted edge in order, justify it, and state total weight.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: add edge BC (weight 1). Consider edges in nondecreasing weight order. It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 2: add edge EF (weight 1). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 3: add edge HA (weight 1). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 4: add edge AC (weight 3). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 5: add edge BD (weight 3). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 6: add edge CE (weight 3). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 7: add edge EG (weight 3). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 8: Finally all 8 vertices are connected using 7 edges, so this is the MST by Kruskal's algorithm; total weight = 1 + 1 + 1 + 3 + 3 + 3 + 3 = 15.
```

Concept: Kruskal joins different components; Prim crosses the reached cut. Ties permit alternative traces, but every result must be a spanning tree of minimum total weight.

</details>

### dm-mst-prim-4: 8-vertex prim trace 4

Original | 5 marks | core | standard | mst

Find an MST using Prim's algorithm, starting at D. V={A,B,C,D,E,F,G,H}; edges: AB(7), BC(1), CD(4), DE(7), EF(1), FG(4), GH(7), HA(1), AC(3), BD(3), CE(3), DF(3), EG(3), FH(3). Type each accepted edge in order, justify it, and state total weight.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: add edge BD (weight 3). Start at D. It is a minimum-weight crossing edge. Reached vertices are {D, B}.
Step 2: add edge BC (weight 1). It is a minimum-weight crossing edge. Reached vertices are {D, B, C}.
Step 3: add edge AC (weight 3). It is a minimum-weight crossing edge. Reached vertices are {D, B, C, A}.
Step 4: add edge HA (weight 1). It is a minimum-weight crossing edge. Reached vertices are {D, B, C, A, H}.
Step 5: add edge CE (weight 3). It is a minimum-weight crossing edge. Reached vertices are {D, B, C, A, H, E}.
Step 6: add edge EF (weight 1). It is a minimum-weight crossing edge. Reached vertices are {D, B, C, A, H, E, F}.
Step 7: add edge EG (weight 3). It is a minimum-weight crossing edge. Reached vertices are {D, B, C, A, H, E, F, G}.
Step 8: Finally all 8 vertices are connected using 7 edges, so this is the MST by Prim's algorithm; total weight = 3 + 1 + 3 + 1 + 3 + 1 + 3 = 15.
```

Concept: Kruskal joins different components; Prim crosses the reached cut. Ties permit alternative traces, but every result must be a spanning tree of minimum total weight.

</details>

### dm-mst-kruskal-5: 5-vertex kruskal trace 5

Original | 5 marks | core | standard | mst

Find an MST using Kruskal's algorithm. V={A,B,C,D,E}; edges: AB(9), BC(3), CD(6), DE(9), EA(3), AC(6), BD(11), CE(5). Type each accepted edge in order, justify it, and state total weight.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: add edge BC (weight 3). Consider edges in nondecreasing weight order. It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 2: add edge EA (weight 3). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 3: add edge CE (weight 5). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 4: add edge CD (weight 6). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 5: Finally all 5 vertices are connected using 4 edges, so this is the MST by Kruskal's algorithm; total weight = 3 + 3 + 5 + 6 = 17.
```

Concept: Kruskal joins different components; Prim crosses the reached cut. Ties permit alternative traces, but every result must be a spanning tree of minimum total weight.

</details>

### dm-mst-prim-5: 5-vertex prim trace 5

Original | 5 marks | core | standard | mst

Find an MST using Prim's algorithm, starting at E. V={A,B,C,D,E}; edges: AB(9), BC(3), CD(6), DE(9), EA(3), AC(6), BD(11), CE(5). Type each accepted edge in order, justify it, and state total weight.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: add edge EA (weight 3). Start at E. It is a minimum-weight crossing edge. Reached vertices are {E, A}.
Step 2: add edge CE (weight 5). It is a minimum-weight crossing edge. Reached vertices are {E, A, C}.
Step 3: add edge BC (weight 3). It is a minimum-weight crossing edge. Reached vertices are {E, A, C, B}.
Step 4: add edge CD (weight 6). It is a minimum-weight crossing edge. Reached vertices are {E, A, C, B, D}.
Step 5: Finally all 5 vertices are connected using 4 edges, so this is the MST by Prim's algorithm; total weight = 3 + 5 + 3 + 6 = 17.
```

Concept: Kruskal joins different components; Prim crosses the reached cut. Ties permit alternative traces, but every result must be a spanning tree of minimum total weight.

</details>

### dm-mst-kruskal-6: 6-vertex kruskal trace 6

Original | 5 marks | core | standard | mst

Find an MST using Kruskal's algorithm. V={A,B,C,D,E,F}; edges: AB(2), BC(5), CD(8), DE(2), EF(5), FA(8), AC(7), BD(12), CE(6), DF(11). Type each accepted edge in order, justify it, and state total weight.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: add edge AB (weight 2). Consider edges in nondecreasing weight order. It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 2: add edge DE (weight 2). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 3: add edge BC (weight 5). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 4: add edge EF (weight 5). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 5: add edge CE (weight 6). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 6: Finally all 6 vertices are connected using 5 edges, so this is the MST by Kruskal's algorithm; total weight = 2 + 2 + 5 + 5 + 6 = 20.
```

Concept: Kruskal joins different components; Prim crosses the reached cut. Ties permit alternative traces, but every result must be a spanning tree of minimum total weight.

</details>

### dm-mst-prim-6: 6-vertex prim trace 6

Original | 5 marks | core | standard | mst

Find an MST using Prim's algorithm, starting at F. V={A,B,C,D,E,F}; edges: AB(2), BC(5), CD(8), DE(2), EF(5), FA(8), AC(7), BD(12), CE(6), DF(11). Type each accepted edge in order, justify it, and state total weight.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: add edge EF (weight 5). Start at F. It is a minimum-weight crossing edge. Reached vertices are {F, E}.
Step 2: add edge DE (weight 2). It is a minimum-weight crossing edge. Reached vertices are {F, E, D}.
Step 3: add edge CE (weight 6). It is a minimum-weight crossing edge. Reached vertices are {F, E, D, C}.
Step 4: add edge BC (weight 5). It is a minimum-weight crossing edge. Reached vertices are {F, E, D, C, B}.
Step 5: add edge AB (weight 2). It is a minimum-weight crossing edge. Reached vertices are {F, E, D, C, B, A}.
Step 6: Finally all 6 vertices are connected using 5 edges, so this is the MST by Prim's algorithm; total weight = 5 + 2 + 6 + 5 + 2 = 20.
```

Concept: Kruskal joins different components; Prim crosses the reached cut. Ties permit alternative traces, but every result must be a spanning tree of minimum total weight.

</details>

### dm-mst-kruskal-7: 7-vertex kruskal trace 7

Original | 5 marks | core | exam | mst

Find an MST using Kruskal's algorithm. V={A,B,C,D,E,F,G}; edges: AB(4), BC(7), CD(1), DE(4), EF(7), FG(1), GA(4), AC(3), BD(3), CE(3), DF(3), EG(3). Type each accepted edge in order, justify it, and state total weight.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: add edge CD (weight 1). Consider edges in nondecreasing weight order. It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 2: add edge FG (weight 1). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 3: add edge AC (weight 3). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 4: add edge BD (weight 3). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 5: add edge CE (weight 3). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 6: add edge DF (weight 3). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 7: Finally all 7 vertices are connected using 6 edges, so this is the MST by Kruskal's algorithm; total weight = 1 + 1 + 3 + 3 + 3 + 3 = 14.
```

Concept: Kruskal joins different components; Prim crosses the reached cut. Ties permit alternative traces, but every result must be a spanning tree of minimum total weight.

</details>

### dm-mst-prim-7: 7-vertex prim trace 7

Original | 5 marks | core | exam | mst

Find an MST using Prim's algorithm, starting at G. V={A,B,C,D,E,F,G}; edges: AB(4), BC(7), CD(1), DE(4), EF(7), FG(1), GA(4), AC(3), BD(3), CE(3), DF(3), EG(3). Type each accepted edge in order, justify it, and state total weight.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: add edge FG (weight 1). Start at G. It is a minimum-weight crossing edge. Reached vertices are {G, F}.
Step 2: add edge DF (weight 3). It is a minimum-weight crossing edge. Reached vertices are {G, F, D}.
Step 3: add edge CD (weight 1). It is a minimum-weight crossing edge. Reached vertices are {G, F, D, C}.
Step 4: add edge AC (weight 3). It is a minimum-weight crossing edge. Reached vertices are {G, F, D, C, A}.
Step 5: add edge BD (weight 3). It is a minimum-weight crossing edge. Reached vertices are {G, F, D, C, A, B}.
Step 6: add edge CE (weight 3). It is a minimum-weight crossing edge. Reached vertices are {G, F, D, C, A, B, E}.
Step 7: Finally all 7 vertices are connected using 6 edges, so this is the MST by Prim's algorithm; total weight = 1 + 3 + 1 + 3 + 3 + 3 = 14.
```

Concept: Kruskal joins different components; Prim crosses the reached cut. Ties permit alternative traces, but every result must be a spanning tree of minimum total weight.

</details>

### dm-mst-kruskal-8: 8-vertex kruskal trace 8

Original | 5 marks | core | exam | mst

Find an MST using Kruskal's algorithm. V={A,B,C,D,E,F,G,H}; edges: AB(6), BC(9), CD(3), DE(6), EF(9), FG(3), GH(6), HA(9), AC(9), BD(3), CE(8), DF(2), EG(7), FH(12). Type each accepted edge in order, justify it, and state total weight.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: add edge DF (weight 2). Consider edges in nondecreasing weight order. It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 2: add edge CD (weight 3). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 3: add edge FG (weight 3). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 4: add edge BD (weight 3). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 5: add edge AB (weight 6). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 6: add edge DE (weight 6). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 7: add edge GH (weight 6). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 8: Finally all 8 vertices are connected using 7 edges, so this is the MST by Kruskal's algorithm; total weight = 2 + 3 + 3 + 3 + 6 + 6 + 6 = 29.
```

Concept: Kruskal joins different components; Prim crosses the reached cut. Ties permit alternative traces, but every result must be a spanning tree of minimum total weight.

</details>

### dm-mst-prim-8: 8-vertex prim trace 8

Original | 5 marks | core | exam | mst

Find an MST using Prim's algorithm, starting at H. V={A,B,C,D,E,F,G,H}; edges: AB(6), BC(9), CD(3), DE(6), EF(9), FG(3), GH(6), HA(9), AC(9), BD(3), CE(8), DF(2), EG(7), FH(12). Type each accepted edge in order, justify it, and state total weight.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: add edge GH (weight 6). Start at H. It is a minimum-weight crossing edge. Reached vertices are {H, G}.
Step 2: add edge FG (weight 3). It is a minimum-weight crossing edge. Reached vertices are {H, G, F}.
Step 3: add edge DF (weight 2). It is a minimum-weight crossing edge. Reached vertices are {H, G, F, D}.
Step 4: add edge CD (weight 3). It is a minimum-weight crossing edge. Reached vertices are {H, G, F, D, C}.
Step 5: add edge BD (weight 3). It is a minimum-weight crossing edge. Reached vertices are {H, G, F, D, C, B}.
Step 6: add edge AB (weight 6). It is a minimum-weight crossing edge. Reached vertices are {H, G, F, D, C, B, A}.
Step 7: add edge DE (weight 6). It is a minimum-weight crossing edge. Reached vertices are {H, G, F, D, C, B, A, E}.
Step 8: Finally all 8 vertices are connected using 7 edges, so this is the MST by Prim's algorithm; total weight = 6 + 3 + 2 + 3 + 3 + 6 + 6 = 29.
```

Concept: Kruskal joins different components; Prim crosses the reached cut. Ties permit alternative traces, but every result must be a spanning tree of minimum total weight.

</details>

### dm-mst-kruskal-9: 5-vertex kruskal trace 9

Original | 5 marks | core | exam | mst

Find an MST using Kruskal's algorithm. V={A,B,C,D,E}; edges: AB(8), BC(2), CD(5), DE(8), EA(2), AC(10), BD(4), CE(9). Type each accepted edge in order, justify it, and state total weight.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: add edge BC (weight 2). Consider edges in nondecreasing weight order. It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 2: add edge EA (weight 2). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 3: add edge BD (weight 4). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 4: add edge AB (weight 8). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 5: Finally all 5 vertices are connected using 4 edges, so this is the MST by Kruskal's algorithm; total weight = 2 + 2 + 4 + 8 = 16.
```

Concept: Kruskal joins different components; Prim crosses the reached cut. Ties permit alternative traces, but every result must be a spanning tree of minimum total weight.

</details>

### dm-mst-prim-9: 5-vertex prim trace 9

Original | 5 marks | core | exam | mst

Find an MST using Prim's algorithm, starting at D. V={A,B,C,D,E}; edges: AB(8), BC(2), CD(5), DE(8), EA(2), AC(10), BD(4), CE(9). Type each accepted edge in order, justify it, and state total weight.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: add edge BD (weight 4). Start at D. It is a minimum-weight crossing edge. Reached vertices are {D, B}.
Step 2: add edge BC (weight 2). It is a minimum-weight crossing edge. Reached vertices are {D, B, C}.
Step 3: add edge AB (weight 8). It is a minimum-weight crossing edge. Reached vertices are {D, B, C, A}.
Step 4: add edge EA (weight 2). It is a minimum-weight crossing edge. Reached vertices are {D, B, C, A, E}.
Step 5: Finally all 5 vertices are connected using 4 edges, so this is the MST by Prim's algorithm; total weight = 4 + 2 + 8 + 2 = 16.
```

Concept: Kruskal joins different components; Prim crosses the reached cut. Ties permit alternative traces, but every result must be a spanning tree of minimum total weight.

</details>

### dm-mst-kruskal-10: 6-vertex kruskal trace 10

Original | 5 marks | core | exam | mst

Find an MST using Kruskal's algorithm. V={A,B,C,D,E,F}; edges: AB(1), BC(4), CD(7), DE(1), EF(4), FA(7), AC(3), BD(3), CE(3), DF(3). Type each accepted edge in order, justify it, and state total weight.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: add edge AB (weight 1). Consider edges in nondecreasing weight order. It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 2: add edge DE (weight 1). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 3: add edge AC (weight 3). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 4: add edge BD (weight 3). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 5: add edge DF (weight 3). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 6: Finally all 6 vertices are connected using 5 edges, so this is the MST by Kruskal's algorithm; total weight = 1 + 1 + 3 + 3 + 3 = 11.
```

Concept: Kruskal joins different components; Prim crosses the reached cut. Ties permit alternative traces, but every result must be a spanning tree of minimum total weight.

</details>

### dm-mst-prim-10: 6-vertex prim trace 10

Original | 5 marks | core | exam | mst

Find an MST using Prim's algorithm, starting at D. V={A,B,C,D,E,F}; edges: AB(1), BC(4), CD(7), DE(1), EF(4), FA(7), AC(3), BD(3), CE(3), DF(3). Type each accepted edge in order, justify it, and state total weight.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: add edge DE (weight 1). Start at D. It is a minimum-weight crossing edge. Reached vertices are {D, E}.
Step 2: add edge BD (weight 3). It is a minimum-weight crossing edge. Reached vertices are {D, E, B}.
Step 3: add edge AB (weight 1). It is a minimum-weight crossing edge. Reached vertices are {D, E, B, A}.
Step 4: add edge AC (weight 3). It is a minimum-weight crossing edge. Reached vertices are {D, E, B, A, C}.
Step 5: add edge DF (weight 3). It is a minimum-weight crossing edge. Reached vertices are {D, E, B, A, C, F}.
Step 6: Finally all 6 vertices are connected using 5 edges, so this is the MST by Prim's algorithm; total weight = 1 + 3 + 1 + 3 + 3 = 11.
```

Concept: Kruskal joins different components; Prim crosses the reached cut. Ties permit alternative traces, but every result must be a spanning tree of minimum total weight.

</details>

### dm-p1-q7a: Recovered graph: prim

Past paper 1 Q7a | 10 marks | core | standard | mst

Find an MST using Prim's algorithm, starting at 1. V={1,2,3,4,5,6}; edges: 14(2), 13(3), 65(4), 46(5), 43(6), 42(7), 25(8), 45(9). Type each accepted edge in order, justify it, and state total weight.

![Source graph](/dm/source-images/paper1-image116.png)

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: add edge 14 (weight 2). Start at 1. It is a minimum-weight crossing edge. Reached vertices are {1, 4}.
Step 2: add edge 13 (weight 3). It is a minimum-weight crossing edge. Reached vertices are {1, 4, 3}.
Step 3: add edge 46 (weight 5). It is a minimum-weight crossing edge. Reached vertices are {1, 4, 3, 6}.
Step 4: add edge 65 (weight 4). It is a minimum-weight crossing edge. Reached vertices are {1, 4, 3, 6, 5}.
Step 5: add edge 42 (weight 7). It is a minimum-weight crossing edge. Reached vertices are {1, 4, 3, 6, 5, 2}.
Step 6: Finally all 6 vertices are connected using 5 edges, so this is the MST by Prim's algorithm; total weight = 2 + 3 + 5 + 4 + 7 = 21.
```

Concept: Kruskal joins different components; Prim crosses the reached cut. Ties permit alternative traces, but every result must be a spanning tree of minimum total weight.

</details>

### dm-p1-q7b: Recovered graph: kruskal

Past paper 1 Q7b | 10 marks | core | standard | mst

Find an MST using Kruskal's algorithm. V={1,2,3,4,5,6}; edges: 14(2), 13(3), 65(4), 46(5), 43(6), 42(7), 25(8), 45(9). Type each accepted edge in order, justify it, and state total weight.

![Source graph](/dm/source-images/paper1-image116.png)

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: add edge 14 (weight 2). Consider edges in nondecreasing weight order. It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 2: add edge 13 (weight 3). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 3: add edge 65 (weight 4). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 4: add edge 46 (weight 5). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 5: add edge 42 (weight 7). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 6: Finally all 6 vertices are connected using 5 edges, so this is the MST by Kruskal's algorithm; total weight = 2 + 3 + 4 + 5 + 7 = 21.
```

Concept: Kruskal joins different components; Prim crosses the reached cut. Ties permit alternative traces, but every result must be a spanning tree of minimum total weight.

</details>

### dm-p4-q9: Recovered seven-vertex Kruskal graph

Past paper 4 Q9 | 5 marks | core | standard | mst

Find an MST using Kruskal's algorithm. V={a,b,c,d,e,f,g}; edges: ab(5), ac(10), bc(15), bd(5), bf(6), cd(7), cg(12), ce(30), df(9), dg(8), fg(14), ge(20). Type each accepted edge in order, justify it, and state total weight.

![Source graph](/dm/source-images/paper4-image97.png)

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: add edge ab (weight 5). Consider edges in nondecreasing weight order. It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 2: add edge bd (weight 5). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 3: add edge bf (weight 6). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 4: add edge cd (weight 7). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 5: add edge dg (weight 8). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 6: add edge ge (weight 20). It is a minimum-weight edge joining two current components, so no cycle is formed.
Step 7: Finally all 7 vertices are connected using 6 edges, so this is the MST by Kruskal's algorithm; total weight = 5 + 5 + 6 + 7 + 8 + 20 = 51.
```

Concept: Kruskal joins different components; Prim crosses the reached cut. Ties permit alternative traces, but every result must be a spanning tree of minimum total weight.

</details>

### dm-slot1-mst-0: Slot 1 Q5: constructed graph illustrating the reported Kruskal task

Slot 1 exam pattern | 10 marks | core | exam | mst

Constructed graph (the reported sketch's exact edges were not supplied): V={A,B,C,D,E,F,G}, edges AB(1),BC(1),AC(2),CD(3),BD(4),DE(5),CE(5),EF(6),DF(7),FG(8),EG(9). Use Kruskal. Type each accepted AND rejected candidate in order with a reason, stop at six accepted edges, and state total weight. Any valid tie order is allowed. (Sort 2, six additions 6, spanning/total 2 marks.)

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Sort all edges by nondecreasing weight (break ties by the displayed edge order): AB(1),BC(1),AC(2),CD(3),BD(4),DE(5),CE(5),EF(6),DF(7),FG(8),EG(9). Start with seven singleton components. (2 marks.)
Step 1: add edge AB (weight 1). It joins different components and is a lightest eligible edge. Components now: {A,B}; {C}; {D}; {E}; {F}; {G}. (1 mark.)
Step 2: add edge BC (weight 1). It joins different components and is a lightest eligible edge. Components now: {A,B,C}; {D}; {E}; {F}; {G}. (1 mark.)
Step 4: Reject edge AC (weight 2): its endpoints already lie in the same component, so it creates a cycle.
Step 3: add edge CD (weight 3). It joins different components and is a lightest eligible edge. Components now: {A,B,C,D}; {E}; {F}; {G}. (1 mark.)
Step 6: Reject edge BD (weight 4): its endpoints already lie in the same component, so it creates a cycle.
Step 4: add edge DE (weight 5). It joins different components and is a lightest eligible edge. Components now: {A,B,C,D,E}; {F}; {G}. (1 mark.)
Step 8: Reject edge CE (weight 5): its endpoints already lie in the same component, so it creates a cycle.
Step 5: add edge EF (weight 6). It joins different components and is a lightest eligible edge. Components now: {A,B,C,D,E,F}; {G}. (1 mark.)
Step 10: Reject edge DF (weight 7): its endpoints already lie in the same component, so it creates a cycle.
Step 6: add edge FG (weight 8). It joins different components and is a lightest eligible edge. Components now: {A,B,C,D,E,F,G}. (1 mark.)
Step 12: Finally all seven vertices are connected with six accepted edges. Stop; later edges are not examined. This is an MST by Kruskal's algorithm; total weight = 1 + 1 + 3 + 5 + 6 + 8 = 24. (2 marks for spanning-tree check and sum.)
```

Concept: Sort by weight and check components at every candidate. Ties allow alternatives; cycle edges are rejected and the total is compulsory.

</details>

### dm-slot1-mst-1: Slot 1 Q5: Kruskal variant 1

Slot 1 exam pattern | 10 marks | core | exam | mst

Constructed graph (the reported sketch's exact edges were not supplied): V={A,B,C,D,E,F,G}, edges AB(2),BC(1),AC(1),CD(4),BD(3),DE(6),CE(5),EF(7),DF(4),FG(8),EG(9). Use Kruskal. Type each accepted AND rejected candidate in order with a reason, stop at six accepted edges, and state total weight. Any valid tie order is allowed. (Sort 2, six additions 6, spanning/total 2 marks.)

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Sort all edges by nondecreasing weight (break ties by the displayed edge order): BC(1),AC(1),AB(2),BD(3),CD(4),DF(4),CE(5),DE(6),EF(7),FG(8),EG(9). Start with seven singleton components. (2 marks.)
Step 1: add edge BC (weight 1). It joins different components and is a lightest eligible edge. Components now: {A}; {B,C}; {D}; {E}; {F}; {G}. (1 mark.)
Step 2: add edge AC (weight 1). It joins different components and is a lightest eligible edge. Components now: {A,B,C}; {D}; {E}; {F}; {G}. (1 mark.)
Step 4: Reject edge AB (weight 2): its endpoints already lie in the same component, so it creates a cycle.
Step 3: add edge BD (weight 3). It joins different components and is a lightest eligible edge. Components now: {A,B,C,D}; {E}; {F}; {G}. (1 mark.)
Step 6: Reject edge CD (weight 4): its endpoints already lie in the same component, so it creates a cycle.
Step 4: add edge DF (weight 4). It joins different components and is a lightest eligible edge. Components now: {A,B,C,D,F}; {E}; {G}. (1 mark.)
Step 5: add edge CE (weight 5). It joins different components and is a lightest eligible edge. Components now: {A,B,C,D,E,F}; {G}. (1 mark.)
Step 9: Reject edge DE (weight 6): its endpoints already lie in the same component, so it creates a cycle.
Step 10: Reject edge EF (weight 7): its endpoints already lie in the same component, so it creates a cycle.
Step 6: add edge FG (weight 8). It joins different components and is a lightest eligible edge. Components now: {A,B,C,D,E,F,G}. (1 mark.)
Step 12: Finally all seven vertices are connected with six accepted edges. Stop; later edges are not examined. This is an MST by Kruskal's algorithm; total weight = 1 + 1 + 3 + 4 + 5 + 8 = 22. (2 marks for spanning-tree check and sum.)
```

Concept: Sort by weight and check components at every candidate. Ties allow alternatives; cycle edges are rejected and the total is compulsory.

</details>

### dm-slot1-mst-2: Slot 1 Q5: Kruskal variant 2

Slot 1 exam pattern | 10 marks | core | exam | mst

Constructed graph (the reported sketch's exact edges were not supplied): V={A,B,C,D,E,F,G}, edges AB(3),BC(2),AC(1),CD(1),BD(4),DE(5),CE(6),EF(2),DF(7),FG(8),EG(9). Use Kruskal. Type each accepted AND rejected candidate in order with a reason, stop at six accepted edges, and state total weight. Any valid tie order is allowed. (Sort 2, six additions 6, spanning/total 2 marks.)

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Sort all edges by nondecreasing weight (break ties by the displayed edge order): AC(1),CD(1),BC(2),EF(2),AB(3),BD(4),DE(5),CE(6),DF(7),FG(8),EG(9). Start with seven singleton components. (2 marks.)
Step 1: add edge AC (weight 1). It joins different components and is a lightest eligible edge. Components now: {A,C}; {B}; {D}; {E}; {F}; {G}. (1 mark.)
Step 2: add edge CD (weight 1). It joins different components and is a lightest eligible edge. Components now: {A,C,D}; {B}; {E}; {F}; {G}. (1 mark.)
Step 3: add edge BC (weight 2). It joins different components and is a lightest eligible edge. Components now: {A,B,C,D}; {E}; {F}; {G}. (1 mark.)
Step 4: add edge EF (weight 2). It joins different components and is a lightest eligible edge. Components now: {A,B,C,D}; {E,F}; {G}. (1 mark.)
Step 6: Reject edge AB (weight 3): its endpoints already lie in the same component, so it creates a cycle.
Step 7: Reject edge BD (weight 4): its endpoints already lie in the same component, so it creates a cycle.
Step 5: add edge DE (weight 5). It joins different components and is a lightest eligible edge. Components now: {A,B,C,D,E,F}; {G}. (1 mark.)
Step 9: Reject edge CE (weight 6): its endpoints already lie in the same component, so it creates a cycle.
Step 10: Reject edge DF (weight 7): its endpoints already lie in the same component, so it creates a cycle.
Step 6: add edge FG (weight 8). It joins different components and is a lightest eligible edge. Components now: {A,B,C,D,E,F,G}. (1 mark.)
Step 12: Finally all seven vertices are connected with six accepted edges. Stop; later edges are not examined. This is an MST by Kruskal's algorithm; total weight = 1 + 1 + 2 + 2 + 5 + 8 = 19. (2 marks for spanning-tree check and sum.)
```

Concept: Sort by weight and check components at every candidate. Ties allow alternatives; cycle edges are rejected and the total is compulsory.

</details>

### dm-slot1-mst-3: Slot 1 Q5: Kruskal variant 3

Slot 1 exam pattern | 10 marks | core | exam | mst

Constructed graph (the reported sketch's exact edges were not supplied): V={A,B,C,D,E,F,G}, edges AB(1),BC(3),AC(2),CD(4),BD(2),DE(5),CE(6),EF(7),DF(3),FG(8),EG(9). Use Kruskal. Type each accepted AND rejected candidate in order with a reason, stop at six accepted edges, and state total weight. Any valid tie order is allowed. (Sort 2, six additions 6, spanning/total 2 marks.)

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Sort all edges by nondecreasing weight (break ties by the displayed edge order): AB(1),AC(2),BD(2),BC(3),DF(3),CD(4),DE(5),CE(6),EF(7),FG(8),EG(9). Start with seven singleton components. (2 marks.)
Step 1: add edge AB (weight 1). It joins different components and is a lightest eligible edge. Components now: {A,B}; {C}; {D}; {E}; {F}; {G}. (1 mark.)
Step 2: add edge AC (weight 2). It joins different components and is a lightest eligible edge. Components now: {A,B,C}; {D}; {E}; {F}; {G}. (1 mark.)
Step 3: add edge BD (weight 2). It joins different components and is a lightest eligible edge. Components now: {A,B,C,D}; {E}; {F}; {G}. (1 mark.)
Step 5: Reject edge BC (weight 3): its endpoints already lie in the same component, so it creates a cycle.
Step 4: add edge DF (weight 3). It joins different components and is a lightest eligible edge. Components now: {A,B,C,D,F}; {E}; {G}. (1 mark.)
Step 7: Reject edge CD (weight 4): its endpoints already lie in the same component, so it creates a cycle.
Step 5: add edge DE (weight 5). It joins different components and is a lightest eligible edge. Components now: {A,B,C,D,E,F}; {G}. (1 mark.)
Step 9: Reject edge CE (weight 6): its endpoints already lie in the same component, so it creates a cycle.
Step 10: Reject edge EF (weight 7): its endpoints already lie in the same component, so it creates a cycle.
Step 6: add edge FG (weight 8). It joins different components and is a lightest eligible edge. Components now: {A,B,C,D,E,F,G}. (1 mark.)
Step 12: Finally all seven vertices are connected with six accepted edges. Stop; later edges are not examined. This is an MST by Kruskal's algorithm; total weight = 1 + 2 + 2 + 3 + 5 + 8 = 21. (2 marks for spanning-tree check and sum.)
```

Concept: Sort by weight and check components at every candidate. Ties allow alternatives; cycle edges are rejected and the total is compulsory.

</details>

### dm-slot1-mst-4: Slot 1 Q5: Kruskal variant 4

Slot 1 exam pattern | 10 marks | core | exam | mst

Constructed graph (the reported sketch's exact edges were not supplied): V={A,B,C,D,E,F,G}, edges AB(2),BC(2),AC(1),CD(3),BD(5),DE(4),CE(6),EF(7),DF(4),FG(9),EG(8). Use Kruskal. Type each accepted AND rejected candidate in order with a reason, stop at six accepted edges, and state total weight. Any valid tie order is allowed. (Sort 2, six additions 6, spanning/total 2 marks.)

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Sort all edges by nondecreasing weight (break ties by the displayed edge order): AC(1),AB(2),BC(2),CD(3),DE(4),DF(4),BD(5),CE(6),EF(7),EG(8),FG(9). Start with seven singleton components. (2 marks.)
Step 1: add edge AC (weight 1). It joins different components and is a lightest eligible edge. Components now: {A,C}; {B}; {D}; {E}; {F}; {G}. (1 mark.)
Step 2: add edge AB (weight 2). It joins different components and is a lightest eligible edge. Components now: {A,B,C}; {D}; {E}; {F}; {G}. (1 mark.)
Step 4: Reject edge BC (weight 2): its endpoints already lie in the same component, so it creates a cycle.
Step 3: add edge CD (weight 3). It joins different components and is a lightest eligible edge. Components now: {A,B,C,D}; {E}; {F}; {G}. (1 mark.)
Step 4: add edge DE (weight 4). It joins different components and is a lightest eligible edge. Components now: {A,B,C,D,E}; {F}; {G}. (1 mark.)
Step 5: add edge DF (weight 4). It joins different components and is a lightest eligible edge. Components now: {A,B,C,D,E,F}; {G}. (1 mark.)
Step 8: Reject edge BD (weight 5): its endpoints already lie in the same component, so it creates a cycle.
Step 9: Reject edge CE (weight 6): its endpoints already lie in the same component, so it creates a cycle.
Step 10: Reject edge EF (weight 7): its endpoints already lie in the same component, so it creates a cycle.
Step 6: add edge EG (weight 8). It joins different components and is a lightest eligible edge. Components now: {A,B,C,D,E,F,G}. (1 mark.)
Step 12: Finally all seven vertices are connected with six accepted edges. Stop; later edges are not examined. This is an MST by Kruskal's algorithm; total weight = 1 + 2 + 3 + 4 + 4 + 8 = 22. (2 marks for spanning-tree check and sum.)
```

Concept: Sort by weight and check components at every candidate. Ties allow alternatives; cycle edges are rejected and the total is compulsory.

</details>

## posets

### dm-posets-1: Divisors: maximal

Original | 5 marks | core | foundation | set-answer

In the poset A={1,2,3,4,6,12}, R={(1,1), (1,2), (1,3), (1,4), (1,6), (1,12), (2,2), (2,4), (2,6), (2,12), (3,3), (3,6), (3,12), (4,4), (4,12), (6,6), (6,12), (12,12)}, find maximal. Explain the comparisons.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use x<=y exactly when (x,y) is in R. Omit reflexive and transitive edges when describing Hasse covers.
Step 2: Minimal={1}; maximal={12}; least={1}; greatest={12}.
Step 3: Cover edges, directed from lower to upper, are (1,2), (1,3), (2,4), (2,6), (3,6), (4,12), (6,12).
Step 4: The requested maximal set is {12}. Every pair has a unique LUB and GLB; this poset is a lattice.
```

Concept: All comparisons and bounds are taken within the stated poset. Maximal/minimal do not mean greatest/least, and lattices require a join and meet for every pair.

</details>

### dm-posets-2: Divisors: minimal

Original | 5 marks | core | foundation | set-answer

In the poset A={1,2,3,4,6,12}, R={(1,1), (1,2), (1,3), (1,4), (1,6), (1,12), (2,2), (2,4), (2,6), (2,12), (3,3), (3,6), (3,12), (4,4), (4,12), (6,6), (6,12), (12,12)}, find minimal. Explain the comparisons.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use x<=y exactly when (x,y) is in R. Omit reflexive and transitive edges when describing Hasse covers.
Step 2: Minimal={1}; maximal={12}; least={1}; greatest={12}.
Step 3: Cover edges, directed from lower to upper, are (1,2), (1,3), (2,4), (2,6), (3,6), (4,12), (6,12).
Step 4: The requested minimal set is {1}. Every pair has a unique LUB and GLB; this poset is a lattice.
```

Concept: All comparisons and bounds are taken within the stated poset. Maximal/minimal do not mean greatest/least, and lattices require a join and meet for every pair.

</details>

### dm-posets-3: Divisors: greatest

Original | 5 marks | core | foundation | set-answer

In the poset A={1,2,3,4,6,12}, R={(1,1), (1,2), (1,3), (1,4), (1,6), (1,12), (2,2), (2,4), (2,6), (2,12), (3,3), (3,6), (3,12), (4,4), (4,12), (6,6), (6,12), (12,12)}, find greatest. Explain the comparisons.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use x<=y exactly when (x,y) is in R. Omit reflexive and transitive edges when describing Hasse covers.
Step 2: Minimal={1}; maximal={12}; least={1}; greatest={12}.
Step 3: Cover edges, directed from lower to upper, are (1,2), (1,3), (2,4), (2,6), (3,6), (4,12), (6,12).
Step 4: The requested greatest set is {12}. Every pair has a unique LUB and GLB; this poset is a lattice.
```

Concept: All comparisons and bounds are taken within the stated poset. Maximal/minimal do not mean greatest/least, and lattices require a join and meet for every pair.

</details>

### dm-posets-4: Divisors: least

Original | 5 marks | core | foundation | set-answer

In the poset A={1,2,3,4,6,12}, R={(1,1), (1,2), (1,3), (1,4), (1,6), (1,12), (2,2), (2,4), (2,6), (2,12), (3,3), (3,6), (3,12), (4,4), (4,12), (6,6), (6,12), (12,12)}, find least. Explain the comparisons.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use x<=y exactly when (x,y) is in R. Omit reflexive and transitive edges when describing Hasse covers.
Step 2: Minimal={1}; maximal={12}; least={1}; greatest={12}.
Step 3: Cover edges, directed from lower to upper, are (1,2), (1,3), (2,4), (2,6), (3,6), (4,12), (6,12).
Step 4: The requested least set is {1}. Every pair has a unique LUB and GLB; this poset is a lattice.
```

Concept: All comparisons and bounds are taken within the stated poset. Maximal/minimal do not mean greatest/least, and lattices require a join and meet for every pair.

</details>

### dm-posets-5: Divisors: upper bounds

Original | 5 marks | core | standard | set-answer

In the poset A={1,2,3,4,6,12}, R={(1,1), (1,2), (1,3), (1,4), (1,6), (1,12), (2,2), (2,4), (2,6), (2,12), (3,3), (3,6), (3,12), (4,4), (4,12), (6,6), (6,12), (12,12)}, for S={2,3}, find upperBounds. Explain the comparisons.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use x<=y exactly when (x,y) is in R. Omit reflexive and transitive edges when describing Hasse covers.
Step 2: Minimal={1}; maximal={12}; least={1}; greatest={12}.
Step 3: Cover edges, directed from lower to upper, are (1,2), (1,3), (2,4), (2,6), (3,6), (4,12), (6,12).
Step 4: Upper bounds of S={6,12}; lower bounds={1}.
Step 5: LUB={6}; GLB={1}. A missing singleton answer means no such bound in this poset.
Step 6: The requested upperBounds set is {6,12}. Every pair has a unique LUB and GLB; this poset is a lattice.
```

Concept: All comparisons and bounds are taken within the stated poset. Maximal/minimal do not mean greatest/least, and lattices require a join and meet for every pair.

</details>

### dm-posets-6: Divisors: lower bounds

Original | 5 marks | core | standard | set-answer

In the poset A={1,2,3,4,6,12}, R={(1,1), (1,2), (1,3), (1,4), (1,6), (1,12), (2,2), (2,4), (2,6), (2,12), (3,3), (3,6), (3,12), (4,4), (4,12), (6,6), (6,12), (12,12)}, for S={4,6}, find lowerBounds. Explain the comparisons.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use x<=y exactly when (x,y) is in R. Omit reflexive and transitive edges when describing Hasse covers.
Step 2: Minimal={1}; maximal={12}; least={1}; greatest={12}.
Step 3: Cover edges, directed from lower to upper, are (1,2), (1,3), (2,4), (2,6), (3,6), (4,12), (6,12).
Step 4: Upper bounds of S={12}; lower bounds={1,2}.
Step 5: LUB={12}; GLB={2}. A missing singleton answer means no such bound in this poset.
Step 6: The requested lowerBounds set is {1,2}. Every pair has a unique LUB and GLB; this poset is a lattice.
```

Concept: All comparisons and bounds are taken within the stated poset. Maximal/minimal do not mean greatest/least, and lattices require a join and meet for every pair.

</details>

### dm-posets-7: Divisors: LUB

Original | 5 marks | core | standard | set-answer

In the poset A={1,2,3,4,6,12}, R={(1,1), (1,2), (1,3), (1,4), (1,6), (1,12), (2,2), (2,4), (2,6), (2,12), (3,3), (3,6), (3,12), (4,4), (4,12), (6,6), (6,12), (12,12)}, for S={4,6}, find lub. Explain the comparisons.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use x<=y exactly when (x,y) is in R. Omit reflexive and transitive edges when describing Hasse covers.
Step 2: Minimal={1}; maximal={12}; least={1}; greatest={12}.
Step 3: Cover edges, directed from lower to upper, are (1,2), (1,3), (2,4), (2,6), (3,6), (4,12), (6,12).
Step 4: Upper bounds of S={12}; lower bounds={1,2}.
Step 5: LUB={12}; GLB={2}. A missing singleton answer means no such bound in this poset.
Step 6: The requested lub set is {12}. Every pair has a unique LUB and GLB; this poset is a lattice.
```

Concept: All comparisons and bounds are taken within the stated poset. Maximal/minimal do not mean greatest/least, and lattices require a join and meet for every pair.

</details>

### dm-posets-8: Divisors: GLB

Original | 5 marks | core | standard | set-answer

In the poset A={1,2,3,4,6,12}, R={(1,1), (1,2), (1,3), (1,4), (1,6), (1,12), (2,2), (2,4), (2,6), (2,12), (3,3), (3,6), (3,12), (4,4), (4,12), (6,6), (6,12), (12,12)}, for S={4,6}, find glb. Explain the comparisons.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use x<=y exactly when (x,y) is in R. Omit reflexive and transitive edges when describing Hasse covers.
Step 2: Minimal={1}; maximal={12}; least={1}; greatest={12}.
Step 3: Cover edges, directed from lower to upper, are (1,2), (1,3), (2,4), (2,6), (3,6), (4,12), (6,12).
Step 4: Upper bounds of S={12}; lower bounds={1,2}.
Step 5: LUB={12}; GLB={2}. A missing singleton answer means no such bound in this poset.
Step 6: The requested glb set is {2}. Every pair has a unique LUB and GLB; this poset is a lattice.
```

Concept: All comparisons and bounds are taken within the stated poset. Maximal/minimal do not mean greatest/least, and lattices require a join and meet for every pair.

</details>

### dm-posets-9: Divisors: Hasse covers

Original | 5 marks | core | standard | set-answer

In the poset A={1,2,3,4,6,12}, R={(1,1), (1,2), (1,3), (1,4), (1,6), (1,12), (2,2), (2,4), (2,6), (2,12), (3,3), (3,6), (3,12), (4,4), (4,12), (6,6), (6,12), (12,12)}, find covers. Explain the comparisons.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use x<=y exactly when (x,y) is in R. Omit reflexive and transitive edges when describing Hasse covers.
Step 2: Minimal={1}; maximal={12}; least={1}; greatest={12}.
Step 3: Cover edges, directed from lower to upper, are (1,2), (1,3), (2,4), (2,6), (3,6), (4,12), (6,12).
Step 4: The requested covers set is {(1,2),(1,3),(2,4),(2,6),(3,6),(4,12),(6,12)}. Every pair has a unique LUB and GLB; this poset is a lattice.
```

Concept: All comparisons and bounds are taken within the stated poset. Maximal/minimal do not mean greatest/least, and lattices require a join and meet for every pair.

</details>

### dm-posets-10: No greatest element

Original | 5 marks | core | exam | set-answer

In the poset A={2,3,6,12,18}, R={(2,2), (2,6), (2,12), (2,18), (3,3), (3,6), (3,12), (3,18), (6,6), (6,12), (6,18), (12,12), (18,18)}, find greatest. Explain the comparisons.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use x<=y exactly when (x,y) is in R. Omit reflexive and transitive edges when describing Hasse covers.
Step 2: Minimal={2,3}; maximal={12,18}; least={}; greatest={}.
Step 3: Cover edges, directed from lower to upper, are (2,6), (3,6), (6,12), (6,18).
Step 4: The requested greatest set is {}. At least one pair lacks a LUB or GLB; this poset is not a lattice.
```

Concept: All comparisons and bounds are taken within the stated poset. Maximal/minimal do not mean greatest/least, and lattices require a join and meet for every pair.

</details>

### dm-posets-11: Two minimal elements

Original | 5 marks | core | exam | set-answer

In the poset A={2,3,6,12,18}, R={(2,2), (2,6), (2,12), (2,18), (3,3), (3,6), (3,12), (3,18), (6,6), (6,12), (6,18), (12,12), (18,18)}, find minimal. Explain the comparisons.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use x<=y exactly when (x,y) is in R. Omit reflexive and transitive edges when describing Hasse covers.
Step 2: Minimal={2,3}; maximal={12,18}; least={}; greatest={}.
Step 3: Cover edges, directed from lower to upper, are (2,6), (3,6), (6,12), (6,18).
Step 4: The requested minimal set is {2,3}. At least one pair lacks a LUB or GLB; this poset is not a lattice.
```

Concept: All comparisons and bounds are taken within the stated poset. Maximal/minimal do not mean greatest/least, and lattices require a join and meet for every pair.

</details>

### dm-posets-12: Two incomparable upper bounds

Original | 5 marks | core | exam | set-answer

In the poset A={2,3,6,12,18}, R={(2,2), (2,6), (2,12), (2,18), (3,3), (3,6), (3,12), (3,18), (6,6), (6,12), (6,18), (12,12), (18,18)}, for S={2,3}, find lub. Explain the comparisons.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use x<=y exactly when (x,y) is in R. Omit reflexive and transitive edges when describing Hasse covers.
Step 2: Minimal={2,3}; maximal={12,18}; least={}; greatest={}.
Step 3: Cover edges, directed from lower to upper, are (2,6), (3,6), (6,12), (6,18).
Step 4: Upper bounds of S={6,12,18}; lower bounds={}.
Step 5: LUB={6}; GLB={}. A missing singleton answer means no such bound in this poset.
Step 6: The requested lub set is {6}. At least one pair lacks a LUB or GLB; this poset is not a lattice.
```

Concept: All comparisons and bounds are taken within the stated poset. Maximal/minimal do not mean greatest/least, and lattices require a join and meet for every pair.

</details>

### dm-posets-13: Fork has no join

Original | 5 marks | core | exam | set-answer

In the poset A={a,b,c}, R={(a,a), (a,b), (a,c), (b,b), (c,c)}, for S={b,c}, find lub. Explain the comparisons.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use x<=y exactly when (x,y) is in R. Omit reflexive and transitive edges when describing Hasse covers.
Step 2: Minimal={a}; maximal={b,c}; least={a}; greatest={}.
Step 3: Cover edges, directed from lower to upper, are (a,b), (a,c).
Step 4: Upper bounds of S={}; lower bounds={a}.
Step 5: LUB={}; GLB={a}. A missing singleton answer means no such bound in this poset.
Step 6: The requested lub set is {}. At least one pair lacks a LUB or GLB; this poset is not a lattice.
```

Concept: All comparisons and bounds are taken within the stated poset. Maximal/minimal do not mean greatest/least, and lattices require a join and meet for every pair.

</details>

### dm-posets-14: Subset diamond join

Original | 5 marks | core | exam | set-answer

In the poset A={{},{a},{b},{a,b}}, R={({},{}), ({},{a}), ({},{b}), ({},{a,b}), ({a},{a}), ({a},{a,b}), ({b},{b}), ({b},{a,b}), ({a,b},{a,b})}, for S={{a},{b}}, find lub. Explain the comparisons.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use x<=y exactly when (x,y) is in R. Omit reflexive and transitive edges when describing Hasse covers.
Step 2: Minimal={{}}; maximal={{a,b}}; least={{}}; greatest={{a,b}}.
Step 3: Cover edges, directed from lower to upper, are ({},{a}), ({},{b}), ({a},{a,b}), ({b},{a,b}).
Step 4: Upper bounds of S={{a,b}}; lower bounds={{}}.
Step 5: LUB={{a,b}}; GLB={{}}. A missing singleton answer means no such bound in this poset.
Step 6: The requested lub set is {{a,b}}. Every pair has a unique LUB and GLB; this poset is a lattice.
```

Concept: All comparisons and bounds are taken within the stated poset. Maximal/minimal do not mean greatest/least, and lattices require a join and meet for every pair.

</details>

### dm-posets-15: Subset diamond meet

Original | 5 marks | core | exam | set-answer

In the poset A={{},{a},{b},{a,b}}, R={({},{}), ({},{a}), ({},{b}), ({},{a,b}), ({a},{a}), ({a},{a,b}), ({b},{b}), ({b},{a,b}), ({a,b},{a,b})}, for S={{a},{b}}, find glb. Explain the comparisons.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use x<=y exactly when (x,y) is in R. Omit reflexive and transitive edges when describing Hasse covers.
Step 2: Minimal={{}}; maximal={{a,b}}; least={{}}; greatest={{a,b}}.
Step 3: Cover edges, directed from lower to upper, are ({},{a}), ({},{b}), ({a},{a,b}), ({b},{a,b}).
Step 4: Upper bounds of S={{a,b}}; lower bounds={{}}.
Step 5: LUB={{a,b}}; GLB={{}}. A missing singleton answer means no such bound in this poset.
Step 6: The requested glb set is {{}}. Every pair has a unique LUB and GLB; this poset is a lattice.
```

Concept: All comparisons and bounds are taken within the stated poset. Maximal/minimal do not mean greatest/least, and lattices require a join and meet for every pair.

</details>

### dm-trap-1: Maximal versus greatest

Original | 5 marks | core | standard | mcq

A finite poset has two incomparable maximal elements. Which conclusion follows?

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: A greatest element must be above every element.
Step 2: If a greatest element existed, each maximal element would have to equal it.
Step 3: Two distinct incomparable maximal elements therefore rule out a greatest element.
```

Concept: All comparisons and bounds are taken within the stated poset. Maximal/minimal do not mean greatest/least, and lattices require a join and meet for every pair.

</details>

### dm-p2-q3a: Subset Hasse covers

Past paper 2 Q3a | 10 marks | core | standard | set-answer

For S1={a,b,c,d}, S2={b,c}, S3={a,d}, S4={a}, S5={d}, S6={c}, S7={} under subset inclusion. Describe the Hasse diagram using levels and cover edges.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Levels bottom to top: {S7}; {S4,S5,S6}; {S3,S2}; {S1}.
Step 2: Use x<=y exactly when (x,y) is in R. Omit reflexive and transitive edges when describing Hasse covers.
Step 3: Minimal={S7}; maximal={S1}; least={S7}; greatest={S1}.
Step 4: Cover edges, directed from lower to upper, are (S2,S1), (S3,S1), (S4,S3), (S5,S3), (S6,S2), (S7,S4), (S7,S5), (S7,S6).
Step 5: The requested covers set is {(S2,S1),(S3,S1),(S4,S3),(S5,S3),(S6,S2),(S7,S4),(S7,S5),(S7,S6)}. Every pair has a unique LUB and GLB; this poset is a lattice.
```

Concept: All comparisons and bounds are taken within the stated poset. Maximal/minimal do not mean greatest/least, and lattices require a join and meet for every pair.

</details>

### dm-p2-q3b: Subset maximal and minimal

Past paper 2 Q3b | 5 marks | core | standard | steps

For S1={a,b,c,d}, S2={b,c}, S3={a,d}, S4={a}, S5={d}, S6={c}, S7={} under subset inclusion. Find maximal and minimal elements.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Maximal means no distinct larger member; only S1 qualifies.
Step 2: Minimal means no distinct smaller member; only S7={} qualifies.
Step 3: Therefore maximal={S1}, minimal={S7}.
```

Concept: All comparisons and bounds are taken within the stated poset. Maximal/minimal do not mean greatest/least, and lattices require a join and meet for every pair.

</details>

### dm-p2-q3c: Subset lattice

Past paper 2 Q3c | 5 marks | core | standard | steps

Is the poset S1={a,b,c,d}, S2={b,c}, S3={a,d}, S4={a}, S5={d}, S6={c}, S7={} under subset inclusion. a lattice? Justify.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: S7 is a bottom and S1 a top. For comparable pairs, the smaller is the meet and the larger is the join.
Step 2: For incomparable pairs: S4,S5 have join S3; S2 with S3,S4 or S5 has join S1; S6 with S4 or S5 has join S1. Each of these pairs has meet S7.
Step 3: The remaining incomparable pair S3,S6 has join S1 and meet S7. Hence every pair has a unique join and meet, so this poset is a lattice.
Step 4: The absent set {b} does not by itself prevent a lattice: bounds are taken within the given poset.
```

Concept: All comparisons and bounds are taken within the stated poset. Maximal/minimal do not mean greatest/least, and lattices require a join and meet for every pair.

</details>

### dm-p3-q4a: Divisibility Hasse covers

Past paper 3 Q4a | 10 marks | core | standard | set-answer

In the poset A={2,6,8,16,18,32,36}, R={(2,2), (2,6), (2,8), (2,16), (2,18), (2,32), (2,36), (6,6), (6,18), (6,36), (8,8), (8,16), (8,32), (16,16), (16,32), (18,18), (18,36), (32,32), (36,36)}, find covers. Explain the comparisons.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Hasse levels bottom to top: {2}; {6,8}; {18,16}; {36,32}. Place 18 below 36 and 16 below 32.
Step 2: Use x<=y exactly when (x,y) is in R. Omit reflexive and transitive edges when describing Hasse covers.
Step 3: Minimal={2}; maximal={32,36}; least={2}; greatest={}.
Step 4: Cover edges, directed from lower to upper, are (2,6), (2,8), (6,18), (8,16), (16,32), (18,36).
Step 5: The requested covers set is {(2,6),(2,8),(6,18),(8,16),(16,32),(18,36)}. At least one pair lacks a LUB or GLB; this poset is not a lattice.
```

Concept: All comparisons and bounds are taken within the stated poset. Maximal/minimal do not mean greatest/least, and lattices require a join and meet for every pair.

</details>

### dm-p3-q4b: Divisibility extrema

Past paper 3 Q4b | 5 marks | core | standard | steps

For {2,6,8,16,18,32,36} ordered by divisibility, find maximal and minimal elements.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: The maximal elements are 32 and 36, since neither divides a distinct member of the set.
Step 2: The only minimal element is 2, which divides every member.
Step 3: Thus maximal={32,36}, minimal={2}.
```

Concept: All comparisons and bounds are taken within the stated poset. Maximal/minimal do not mean greatest/least, and lattices require a join and meet for every pair.

</details>

### dm-p3-q4c: Divisibility lattice failure

Past paper 3 Q4c | 5 marks | core | standard | steps

Is {2,6,8,16,18,32,36}, ordered by divisibility, a lattice?

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Consider 32 and 36. No member of this set is divisible by both.
Step 2: Thus the pair has no upper bound in the set, and no LUB.
Step 3: A lattice requires a LUB and GLB for every pair. Hence this poset is not a lattice.
```

Concept: All comparisons and bounds are taken within the stated poset. Maximal/minimal do not mean greatest/least, and lattices require a join and meet for every pair.

</details>

### dm-p4-q4a: Divisibility: covers

Past paper 4 Q4a | 2 marks | core | standard | set-answer

In the poset A={1,2,3,4,5,6}, R={(1,1), (1,2), (1,3), (1,4), (1,5), (1,6), (2,2), (2,4), (2,6), (3,3), (3,6), (4,4), (5,5), (6,6)}, find covers. Explain the comparisons.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use x<=y exactly when (x,y) is in R. Omit reflexive and transitive edges when describing Hasse covers.
Step 2: Minimal={1}; maximal={4,5,6}; least={1}; greatest={}.
Step 3: Cover edges, directed from lower to upper, are (1,2), (1,3), (1,5), (2,4), (2,6), (3,6).
Step 4: The requested covers set is {(1,2),(1,3),(1,5),(2,4),(2,6),(3,6)}. At least one pair lacks a LUB or GLB; this poset is not a lattice.
```

Concept: All comparisons and bounds are taken within the stated poset. Maximal/minimal do not mean greatest/least, and lattices require a join and meet for every pair.

</details>

### dm-p4-q4b: Divisibility: maximal

Past paper 4 Q4b | 2 marks | core | standard | set-answer

In the poset A={1,2,3,4,5,6}, R={(1,1), (1,2), (1,3), (1,4), (1,5), (1,6), (2,2), (2,4), (2,6), (3,3), (3,6), (4,4), (5,5), (6,6)}, find maximal. Explain the comparisons.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use x<=y exactly when (x,y) is in R. Omit reflexive and transitive edges when describing Hasse covers.
Step 2: Minimal={1}; maximal={4,5,6}; least={1}; greatest={}.
Step 3: Cover edges, directed from lower to upper, are (1,2), (1,3), (1,5), (2,4), (2,6), (3,6).
Step 4: The requested maximal set is {4,5,6}. At least one pair lacks a LUB or GLB; this poset is not a lattice.
```

Concept: All comparisons and bounds are taken within the stated poset. Maximal/minimal do not mean greatest/least, and lattices require a join and meet for every pair.

</details>

### dm-p4-q4c: Divisibility: greatest

Past paper 4 Q4c | 2 marks | core | standard | set-answer

In the poset A={1,2,3,4,5,6}, R={(1,1), (1,2), (1,3), (1,4), (1,5), (1,6), (2,2), (2,4), (2,6), (3,3), (3,6), (4,4), (5,5), (6,6)}, find greatest. Explain the comparisons.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use x<=y exactly when (x,y) is in R. Omit reflexive and transitive edges when describing Hasse covers.
Step 2: Minimal={1}; maximal={4,5,6}; least={1}; greatest={}.
Step 3: Cover edges, directed from lower to upper, are (1,2), (1,3), (1,5), (2,4), (2,6), (3,6).
Step 4: The requested greatest set is {}. At least one pair lacks a LUB or GLB; this poset is not a lattice.
```

Concept: All comparisons and bounds are taken within the stated poset. Maximal/minimal do not mean greatest/least, and lattices require a join and meet for every pair.

</details>

### dm-p4-q4d: Divisibility: minimal

Past paper 4 Q4d | 2 marks | core | standard | set-answer

In the poset A={1,2,3,4,5,6}, R={(1,1), (1,2), (1,3), (1,4), (1,5), (1,6), (2,2), (2,4), (2,6), (3,3), (3,6), (4,4), (5,5), (6,6)}, find minimal. Explain the comparisons.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use x<=y exactly when (x,y) is in R. Omit reflexive and transitive edges when describing Hasse covers.
Step 2: Minimal={1}; maximal={4,5,6}; least={1}; greatest={}.
Step 3: Cover edges, directed from lower to upper, are (1,2), (1,3), (1,5), (2,4), (2,6), (3,6).
Step 4: The requested minimal set is {1}. At least one pair lacks a LUB or GLB; this poset is not a lattice.
```

Concept: All comparisons and bounds are taken within the stated poset. Maximal/minimal do not mean greatest/least, and lattices require a join and meet for every pair.

</details>

### dm-p4-q4e: Divisibility: least

Past paper 4 Q4e | 2 marks | core | standard | set-answer

In the poset A={1,2,3,4,5,6}, R={(1,1), (1,2), (1,3), (1,4), (1,5), (1,6), (2,2), (2,4), (2,6), (3,3), (3,6), (4,4), (5,5), (6,6)}, find least. Explain the comparisons.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use x<=y exactly when (x,y) is in R. Omit reflexive and transitive edges when describing Hasse covers.
Step 2: Minimal={1}; maximal={4,5,6}; least={1}; greatest={}.
Step 3: Cover edges, directed from lower to upper, are (1,2), (1,3), (1,5), (2,4), (2,6), (3,6).
Step 4: The requested least set is {1}. At least one pair lacks a LUB or GLB; this poset is not a lattice.
```

Concept: All comparisons and bounds are taken within the stated poset. Maximal/minimal do not mean greatest/least, and lattices require a join and meet for every pair.

</details>

### dm-p5-q4a: Lexicographic predecessors

Past paper 5 Q4a | 2 marks | core | standard | set-answer

S={a,c,e,g}. List all pairs in S x S lexicographically less than (c,e).

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Compare first coordinates first; only if they tie compare second coordinates.
Step 2: All four pairs starting with a precede (c,e). Among pairs starting with c, only (c,a) and (c,c) precede it.
Step 3: Answer: {(a,a),(a,c),(a,e),(a,g),(c,a),(c,c)}.
```

Concept: All comparisons and bounds are taken within the stated poset. Maximal/minimal do not mean greatest/least, and lattices require a join and meet for every pair.

</details>

### dm-p5-q4b: Lexicographic successors

Past paper 5 Q4b | 2 marks | core | standard | set-answer

S={a,c,e,g}. List all pairs lexicographically greater than (e,a).

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Within the e block, (e,c),(e,e),(e,g) follow (e,a).
Step 2: Every pair starting with g is larger, regardless of its second coordinate.
Step 3: Answer: {(e,c),(e,e),(e,g),(g,a),(g,c),(g,e),(g,g)}.
```

Concept: All comparisons and bounds are taken within the stated poset. Maximal/minimal do not mean greatest/least, and lattices require a join and meet for every pair.

</details>

### dm-p5-q4c: Lexicographic Hasse chain

Past paper 5 Q4c | 4 marks | core | standard | set-answer

S={a,c,e,g}. Describe the Hasse diagram of (S x S, lexicographic <=) as levels and cover pairs.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: There are 16 singleton levels, bottom to top: (a,a) < (a,c) < (a,e) < (a,g) < (c,a) < (c,c) < (c,e) < (c,g) < (e,a) < (e,c) < (e,e) < (e,g) < (g,a) < (g,c) < (g,e) < (g,g). Join consecutive levels only.
Step 2: Use x<=y exactly when (x,y) is in R. Omit reflexive and transitive edges when describing Hasse covers.
Step 3: Minimal={(a,a)}; maximal={(g,g)}; least={(a,a)}; greatest={(g,g)}.
Step 4: Cover edges, directed from lower to upper, are ((a,a),(a,c)), ((a,c),(a,e)), ((a,e),(a,g)), ((a,g),(c,a)), ((c,a),(c,c)), ((c,c),(c,e)), ((c,e),(c,g)), ((c,g),(e,a)), ((e,a),(e,c)), ((e,c),(e,e)), ((e,e),(e,g)), ((e,g),(g,a)), ((g,a),(g,c)), ((g,c),(g,e)), ((g,e),(g,g)).
Step 5: The requested covers set is {((a,a),(a,c)),((a,c),(a,e)),((a,e),(a,g)),((a,g),(c,a)),((c,a),(c,c)),((c,c),(c,e)),((c,e),(c,g)),((c,g),(e,a)),((e,a),(e,c)),((e,c),(e,e)),((e,e),(e,g)),((e,g),(g,a)),((g,a),(g,c)),((g,c),(g,e)),((g,e),(g,g))}. Every pair has a unique LUB and GLB; this poset is a lattice.
```

Concept: All comparisons and bounds are taken within the stated poset. Maximal/minimal do not mean greatest/least, and lattices require a join and meet for every pair.

</details>

### dm-p5-q4d: A finite chain is a lattice

Past paper 5 Q4d | 2 marks | core | standard | steps

Is S x S with lexicographic order, S={a,c,e,g}, a lattice?

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Lexicographic order totally orders these 16 pairs.
Step 2: For any two pairs x,y, the smaller is their GLB and the larger is their LUB.
Step 3: Both belong to S x S. Thus every pair has a unique GLB and LUB, so this poset is a lattice.
```

Concept: All comparisons and bounds are taken within the stated poset. Maximal/minimal do not mean greatest/least, and lattices require a join and meet for every pair.

</details>

### dm-slot1-poset-0: Slot 1 Q2b: reported divisors of 60 with 5 and 15 removed

Slot 1 exam pattern | 8 marks | core | exam | steps

In A={1,2,3,4,6,10,12,20,30,60}, ordered by divisibility, describe the Hasse diagram using levels and upward cover edges. Find minimal, maximal, least and greatest elements; find LUB/GLB for {4,6}; {10,12}; {20,30}; {2,3}; {10,30}; decide whether A is a lattice.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use a <= b iff a divides b on A={1,2,3,4,6,10,12,20,30,60}. Bottom-to-top levels are {1}; {2,3}; {4,6,10}; {12,20,30}; {60}.
Step 2: The upward Hasse cover edges are (1,2),(1,3),(2,4),(2,6),(2,10),(3,6),(4,12),(4,20),(6,12),(6,30),(10,20),(10,30),(12,60),(20,60),(30,60). Each has no element of A strictly between its endpoints; omit loops and all transitive edges.
Step 3: Minimal={1}; maximal={60}; least={1}; greatest={60}. A maximal/minimal element has nothing strictly above/below it; greatest/least must compare with every element.
Step 4: Pair | lower bounds | GLB | upper bounds | LUB
{4,6} | {1,2} | {2} | {12,60} | {12}
{10,12} | {1,2} | {2} | {60} | {60}
{20,30} | {1,2,10} | {10} | {60} | {60}
{2,3} | {1} | {1} | {6,12,30,60} | {6}
{10,30} | {1,2,10} | {10} | {30,60} | {30}
Step 5: Every pair in A has a unique GLB and LUB, so this is a lattice. For any two retained divisors, their gcd and lcm divide 60. Neither missing value can arise: a retained multiple of 5 is always even, so the gcd of two retained multiples of 5 cannot be the odd number 5 or 15. The retained divisors of 15 are only 1 and 3 (and of 5 only 1), so no retained pair has lcm 15 or 5. Thus both gcd and lcm remain in A for every pair, proving the lattice claim.
```

Concept: Compute all comparisons inside the stated universe. Covers omit intermediate elements; a missing gcd or lcm requires checking the remaining bounds.

</details>

### dm-slot1-poset-1: Slot 1 Q2b: divisors of 36

Slot 1 exam pattern | 8 marks | core | exam | steps

In A={1,2,3,4,6,9,12,18,36}, ordered by divisibility, describe the Hasse diagram using levels and upward cover edges. Find minimal, maximal, least and greatest elements; find LUB/GLB for {4,6}; {9,12}; {6,18}; decide whether A is a lattice.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use a <= b iff a divides b on A={1,2,3,4,6,9,12,18,36}. Bottom-to-top levels are {1}; {2,3}; {4,6,9}; {12,18}; {36}.
Step 2: The upward Hasse cover edges are (1,2),(1,3),(2,4),(2,6),(3,6),(3,9),(4,12),(6,12),(6,18),(9,18),(12,36),(18,36). Each has no element of A strictly between its endpoints; omit loops and all transitive edges.
Step 3: Minimal={1}; maximal={36}; least={1}; greatest={36}. A maximal/minimal element has nothing strictly above/below it; greatest/least must compare with every element.
Step 4: Pair | lower bounds | GLB | upper bounds | LUB
{4,6} | {1,2} | {2} | {12,36} | {12}
{9,12} | {1,3} | {3} | {36} | {36}
{6,18} | {1,2,3,6} | {6} | {18,36} | {18}
Step 5: Every pair in A has a unique GLB and LUB, so this is a lattice. 
```

Concept: Compute all comparisons inside the stated universe. Covers omit intermediate elements; a missing gcd or lcm requires checking the remaining bounds.

</details>

### dm-slot1-poset-2: Slot 1 Q2b: divisors of 72

Slot 1 exam pattern | 8 marks | core | exam | steps

In A={1,2,3,4,6,8,9,12,18,24,36,72}, ordered by divisibility, describe the Hasse diagram using levels and upward cover edges. Find minimal, maximal, least and greatest elements; find LUB/GLB for {8,12}; {9,24}; {6,18}; decide whether A is a lattice.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use a <= b iff a divides b on A={1,2,3,4,6,8,9,12,18,24,36,72}. Bottom-to-top levels are {1}; {2,3}; {4,6,9}; {8,12,18}; {24,36}; {72}.
Step 2: The upward Hasse cover edges are (1,2),(1,3),(2,4),(2,6),(3,6),(3,9),(4,8),(4,12),(6,12),(6,18),(8,24),(9,18),(12,24),(12,36),(18,36),(24,72),(36,72). Each has no element of A strictly between its endpoints; omit loops and all transitive edges.
Step 3: Minimal={1}; maximal={72}; least={1}; greatest={72}. A maximal/minimal element has nothing strictly above/below it; greatest/least must compare with every element.
Step 4: Pair | lower bounds | GLB | upper bounds | LUB
{8,12} | {1,2,4} | {4} | {24,72} | {24}
{9,24} | {1,3} | {3} | {72} | {72}
{6,18} | {1,2,3,6} | {6} | {18,36,72} | {18}
Step 5: Every pair in A has a unique GLB and LUB, so this is a lattice. 
```

Concept: Compute all comparisons inside the stated universe. Covers omit intermediate elements; a missing gcd or lcm requires checking the remaining bounds.

</details>

### dm-slot1-poset-3: Slot 1 Q2b: divisors of 30

Slot 1 exam pattern | 8 marks | core | exam | steps

In A={1,2,3,5,6,10,15,30}, ordered by divisibility, describe the Hasse diagram using levels and upward cover edges. Find minimal, maximal, least and greatest elements; find LUB/GLB for {6,10}; {3,5}; {10,15}; decide whether A is a lattice.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use a <= b iff a divides b on A={1,2,3,5,6,10,15,30}. Bottom-to-top levels are {1}; {2,3,5}; {6,10,15}; {30}.
Step 2: The upward Hasse cover edges are (1,2),(1,3),(1,5),(2,6),(2,10),(3,6),(3,15),(5,10),(5,15),(6,30),(10,30),(15,30). Each has no element of A strictly between its endpoints; omit loops and all transitive edges.
Step 3: Minimal={1}; maximal={30}; least={1}; greatest={30}. A maximal/minimal element has nothing strictly above/below it; greatest/least must compare with every element.
Step 4: Pair | lower bounds | GLB | upper bounds | LUB
{6,10} | {1,2} | {2} | {30} | {30}
{3,5} | {1} | {1} | {15,30} | {15}
{10,15} | {1,5} | {5} | {30} | {30}
Step 5: Every pair in A has a unique GLB and LUB, so this is a lattice. 
```

Concept: Compute all comparisons inside the stated universe. Covers omit intermediate elements; a missing gcd or lcm requires checking the remaining bounds.

</details>

### dm-slot1-poset-4: Slot 1 Q2b: divisors of 90

Slot 1 exam pattern | 8 marks | core | exam | steps

In A={1,2,3,5,6,9,10,15,18,30,45,90}, ordered by divisibility, describe the Hasse diagram using levels and upward cover edges. Find minimal, maximal, least and greatest elements; find LUB/GLB for {9,10}; {6,15}; {18,30}; decide whether A is a lattice.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use a <= b iff a divides b on A={1,2,3,5,6,9,10,15,18,30,45,90}. Bottom-to-top levels are {1}; {2,3,5}; {6,9,10,15}; {18,30,45}; {90}.
Step 2: The upward Hasse cover edges are (1,2),(1,3),(1,5),(2,6),(2,10),(3,6),(3,9),(3,15),(5,10),(5,15),(6,18),(6,30),(9,18),(9,45),(10,30),(15,30),(15,45),(18,90),(30,90),(45,90). Each has no element of A strictly between its endpoints; omit loops and all transitive edges.
Step 3: Minimal={1}; maximal={90}; least={1}; greatest={90}. A maximal/minimal element has nothing strictly above/below it; greatest/least must compare with every element.
Step 4: Pair | lower bounds | GLB | upper bounds | LUB
{9,10} | {1} | {1} | {90} | {90}
{6,15} | {1,3} | {3} | {30,90} | {30}
{18,30} | {1,2,3,6} | {6} | {90} | {90}
Step 5: Every pair in A has a unique GLB and LUB, so this is a lattice. 
```

Concept: Compute all comparisons inside the stated universe. Covers omit intermediate elements; a missing gcd or lcm requires checking the remaining bounds.

</details>

### dm-slot1-poset-5: Slot 1 Q2b: restricted divisors with missing gcd/lcm

Slot 1 exam pattern | 8 marks | core | exam | steps

In A={1,2,3,4,6,24,36,72}, ordered by divisibility, describe the Hasse diagram using levels and upward cover edges. Find minimal, maximal, least and greatest elements; find LUB/GLB for {4,6}; {24,36}; {2,3}; decide whether A is a lattice.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use a <= b iff a divides b on A={1,2,3,4,6,24,36,72}. Bottom-to-top levels are {1}; {2,3}; {4,6}; {24,36}; {72}.
Step 2: The upward Hasse cover edges are (1,2),(1,3),(2,4),(2,6),(3,6),(4,24),(4,36),(6,24),(6,36),(24,72),(36,72). Each has no element of A strictly between its endpoints; omit loops and all transitive edges.
Step 3: Minimal={1}; maximal={72}; least={1}; greatest={72}. A maximal/minimal element has nothing strictly above/below it; greatest/least must compare with every element.
Step 4: Pair | lower bounds | GLB | upper bounds | LUB
{4,6} | {1,2} | {2} | {24,36,72} | does not exist
{24,36} | {1,2,3,4,6} | does not exist | {72} | {72}
{2,3} | {1} | {1} | {6,24,36,72} | {6}
Step 5: For {3,4}, upper bounds={24,36,72}, lower bounds={1}. A LUB does not exist, so this poset is not a lattice.
```

Concept: Compute all comparisons inside the stated universe. Covers omit intermediate elements; a missing gcd or lcm requires checking the remaining bounds.

</details>

### dm-slot1-poset-6: Slot 1 Q2b: restricted subset family under inclusion

Slot 1 exam pattern | 8 marks | core | exam | steps

In A={{},{a},{b},{a,b},{a,c},{b,c}}, ordered by subset inclusion, describe the Hasse diagram using levels and upward cover edges. Find minimal, maximal, least and greatest elements; find LUB/GLB for {{a},{b}}; {{a,b},{a,c}}; {{a,c},{b,c}}; decide whether A is a lattice.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use subset inclusion on A={{},{a},{b},{a,b},{a,c},{b,c}}. Bottom-to-top levels are {{}}; {{a},{b}}; {{a,b},{a,c},{b,c}}.
Step 2: The upward Hasse cover edges are ({},{a}),({},{b}),({a},{a,b}),({a},{a,c}),({b},{a,b}),({b},{b,c}). Each has no element of A strictly between its endpoints; omit loops and all transitive edges.
Step 3: Minimal={{}}; maximal={{a,b},{a,c},{b,c}}; least={{}}; greatest=does not exist. A maximal/minimal element has nothing strictly above/below it; greatest/least must compare with every element.
Step 4: Pair | lower bounds | GLB | upper bounds | LUB
{{a},{b}} | {{}} | {{}} | {{a,b}} | {{a,b}}
{{a,b},{a,c}} | {{},{a}} | {{a}} | does not exist | does not exist
{{a,c},{b,c}} | {{}} | {{}} | does not exist | does not exist
Step 5: For {{a},{b,c}}, upper bounds=does not exist, lower bounds={{}}. A LUB does not exist, so this poset is not a lattice.
```

Concept: Compute all comparisons inside the stated universe. Covers omit intermediate elements; a missing gcd or lcm requires checking the remaining bounds.

</details>

## proofs

### dm-proofs-1: Even plus even

Original | 5 marks | past | foundation | steps

Prove the sum of two even integers is even.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Let a=2*r and b=2*s for integers r,s.
Step 2: Then a+b=2*(r+s).
Step 3: Since r+s is an integer, a+b is even.
```

Concept: A proof must cover every allowed case; a counterexample must satisfy the hypothesis and fail the conclusion.

</details>

### dm-proofs-2: Odd square contrapositive

Original | 5 marks | past | foundation | steps

Prove if n^2 is odd, then n is odd.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use the contrapositive: if n is even then n^2 is even.
Step 2: Write n=2*k, with integer k. Then n^2=4*k^2=2*(2*k^2), which is even.
Step 3: Therefore the original implication is true.
```

Concept: A proof must cover every allowed case; a counterexample must satisfy the hypothesis and fail the conclusion.

</details>

### dm-proofs-3: Irrational square root

Original | 5 marks | past | standard | steps

Prove sqrt(2) is irrational.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Assume sqrt(2)=a/b with coprime positive integers a,b.
Step 2: Then a^2=2*b^2, so a is even. Write a=2*k.
Step 3: Substitution gives b^2=2*k^2, so b is even too.
Step 4: Both a and b are even, contradicting coprimality. Hence sqrt(2) is irrational.
```

Concept: A proof must cover every allowed case; a counterexample must satisfy the hypothesis and fail the conclusion.

</details>

### dm-proofs-4: A failed universal claim

Original | 5 marks | past | standard | steps

Disprove: every prime number is odd.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: A universal statement is false if one example satisfies the hypothesis and violates the conclusion.
Step 2: The integer 2 is prime because its only positive divisors are 1 and 2.
Step 3: But 2 is even. Thus 2 is a counterexample.
```

Concept: A proof must cover every allowed case; a counterexample must satisfy the hypothesis and fail the conclusion.

</details>

### dm-proofs-5: Uniqueness of an integer

Original | 5 marks | past | standard | steps

Prove that if n is odd, there is a unique integer k with n=(k-2)+(k+3).

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Existence: n=2*t+1 for an integer t. Choose k=t. Then (k-2)+(k+3)=2*t+1=n.
Step 2: Uniqueness: if k and l both work, 2*k+1=n=2*l+1.
Step 3: Subtract 1 and divide by 2 to get k=l. Therefore the integer exists and is unique.
```

Concept: A proof must cover every allowed case; a counterexample must satisfy the hypothesis and fail the conclusion.

</details>

### dm-proofs-6: Rational sum direct proof

Original | 5 marks | past | standard | steps

Prove a sum of two rational numbers is rational.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Let x=a/b and y=c/d, where a,b,c,d are integers and b,d are nonzero.
Step 2: x+y=(a*d+b*c)/(b*d).
Step 3: The numerator and denominator are integers, and b*d is nonzero. Hence x+y is rational.
```

Concept: A proof must cover every allowed case; a counterexample must satisfy the hypothesis and fail the conclusion.

</details>

### dm-p1-q1: An even square has an even root

Past paper 1 Q1 | 20 marks | past | standard | steps

Suppose n=m^2, n and m are integers, and n is even. Prove m is even.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use the contrapositive: if m is odd, then m^2 is odd.
Step 2: Write m=2*k+1 for an integer k. Then m^2=4*k^2+4*k+1=2*(2*k^2+2*k)+1, which is odd.
Step 3: Therefore if n=m^2 is even, m cannot be odd; hence m is even.
```

Concept: A proof must cover every allowed case; a counterexample must satisfy the hypothesis and fail the conclusion.

</details>

### dm-p4-q2a: Uniqueness of an integer

Past paper 4 Q2a | 3 marks | past | standard | steps

Prove that if n is odd, there is a unique integer k with n=(k-2)+(k+3).

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Existence: n=2*t+1 for an integer t. Choose k=t. Then (k-2)+(k+3)=2*t+1=n.
Step 2: Uniqueness: if k and l both work, 2*k+1=n=2*l+1.
Step 3: Subtract 1 and divide by 2 to get k=l. Therefore the integer exists and is unique.
```

Concept: A proof must cover every allowed case; a counterexample must satisfy the hypothesis and fail the conclusion.

</details>

### dm-p4-q2b: Three squares counterexample

Past paper 4 Q2b | 2 marks | past | standard | steps

Find a counterexample: every positive integer is a sum of squares of three integers.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Use 7. Squares of integers of absolute value at most 2 are 0,1,4; larger squares already exceed 7.
Step 2: To total 7, two 4s are too large. With one 4 the other two squares would need sum 3, impossible using 0,1,4. With no 4 the maximum is 3.
Step 3: Thus 7 is not a sum of three integer squares and is a counterexample.
```

Concept: A proof must cover every allowed case; a counterexample must satisfy the hypothesis and fail the conclusion.

</details>

## recurrences

### dm-recurrences-1: First-order growth

Original | 5 marks | core | foundation | formula

Solve a_n=(3)*a_(n-1)+(0), n>=1; a_0=2. Show the method and check initial conditions.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: The homogeneous characteristic equation is r-3=0, so a_n=C*3^n.
Step 2: a_0=2 gives C=2.
Step 3: Hence a_n=2*3^n.
Step 4: Check: a_0=2=2. Substitution into the recurrence gives the stated forcing term.
```

Concept: Use characteristic roots for the homogeneous part, adjust particular trials for resonance, and apply initial conditions to the whole solution.

</details>

### dm-recurrences-2: Two distinct roots

Original | 5 marks | core | foundation | formula

Solve a_n=(5)*a_(n-1)+(-6)*a_(n-2)+(0), n>=2; a_0=3, a_1=7. Show the method and check initial conditions.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: r^2-5*r+6=(r-2)*(r-3), so a_n=A*2^n+B*3^n.
Step 2: A+B=3 and 2*A+3*B=7 give A=2, B=1.
Step 3: Hence a_n=2*2^n+3^n.
Step 4: Check: a_0=3=3; a_1=7=7. Substitution into the recurrence gives the stated forcing term.
```

Concept: Use characteristic roots for the homogeneous part, adjust particular trials for resonance, and apply initial conditions to the whole solution.

</details>

### dm-recurrences-3: Distinct roots with negative coefficient

Original | 5 marks | core | standard | formula

Solve a_n=(1)*a_(n-1)+(2)*a_(n-2)+(0), n>=2; a_0=2, a_1=1. Show the method and check initial conditions.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: r^2-r-2=(r-2)*(r+1), so a_n=A*2^n+B*(-1)^n.
Step 2: A+B=2 and 2*A-B=1 give A=B=1.
Step 3: Hence a_n=2^n+(-1)^n.
Step 4: Check: a_0=2=2; a_1=1=1. Substitution into the recurrence gives the stated forcing term.
```

Concept: Use characteristic roots for the homogeneous part, adjust particular trials for resonance, and apply initial conditions to the whole solution.

</details>

### dm-recurrences-4: Repeated root two

Original | 5 marks | core | standard | formula

Solve a_n=(4)*a_(n-1)+(-4)*a_(n-2)+(0), n>=2; a_0=3, a_1=8. Show the method and check initial conditions.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: r^2-4*r+4=(r-2)^2; hence a_n=(A+B*n)*2^n.
Step 2: a_0=3 gives A=3. a_1=8 gives 2*(3+B)=8, so B=1.
Step 3: Hence a_n=(3+n)*2^n.
Step 4: Check: a_0=3=3; a_1=8=8. Substitution into the recurrence gives the stated forcing term.
```

Concept: Use characteristic roots for the homogeneous part, adjust particular trials for resonance, and apply initial conditions to the whole solution.

</details>

### dm-recurrences-5: Repeated root one

Original | 5 marks | core | standard | formula

Solve a_n=(2)*a_(n-1)+(-1)*a_(n-2)+(0), n>=2; a_0=2, a_1=5. Show the method and check initial conditions.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: r^2-2*r+1=(r-1)^2; hence a_n=A+B*n.
Step 2: a_0=2 gives A=2, and a_1=5 gives B=3.
Step 3: Hence a_n=2+3*n.
Step 4: Check: a_0=2=2; a_1=5=5. Substitution into the recurrence gives the stated forcing term.
```

Concept: Use characteristic roots for the homogeneous part, adjust particular trials for resonance, and apply initial conditions to the whole solution.

</details>

### dm-recurrences-6: Alternating repeated root

Original | 5 marks | core | standard | formula

Solve a_n=(-2)*a_(n-1)+(-1)*a_(n-2)+(0), n>=2; a_0=1, a_1=-3. Show the method and check initial conditions.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: r^2+2*r+1=(r+1)^2; hence a_n=(A+B*n)*(-1)^n.
Step 2: a_0=1 gives A=1. a_1=-3 gives -(1+B)=-3, so B=2.
Step 3: Hence a_n=(1+2*n)*(-1)^n.
Step 4: Check: a_0=1=1; a_1=-3=-3. Substitution into the recurrence gives the stated forcing term.
```

Concept: Use characteristic roots for the homogeneous part, adjust particular trials for resonance, and apply initial conditions to the whole solution.

</details>

### dm-recurrences-7: Constant forcing

Original | 5 marks | core | standard | formula

Solve a_n=(2)*a_(n-1)+(3), n>=1; a_0=1. Show the method and check initial conditions.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: The homogeneous solution is C*2^n. Try a constant particular solution K.
Step 2: K=2*K+3 gives K=-3. a_0=1 gives C-3=1, so C=4.
Step 3: Hence a_n=4*2^n-3.
Step 4: Check: a_0=1=1. Substitution into the recurrence gives the stated forcing term.
```

Concept: Use characteristic roots for the homogeneous part, adjust particular trials for resonance, and apply initial conditions to the whole solution.

</details>

### dm-recurrences-8: Resonant constant forcing

Original | 5 marks | core | standard | formula

Solve a_n=(1)*a_(n-1)+(4), n>=1; a_0=2. Show the method and check initial conditions.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: The homogeneous solution is C. A constant trial overlaps, so try K*n.
Step 2: K*n=K*(n-1)+4 gives K=4. a_0=2 gives C=2.
Step 3: Hence a_n=2+4*n.
Step 4: Check: a_0=2=2. Substitution into the recurrence gives the stated forcing term.
```

Concept: Use characteristic roots for the homogeneous part, adjust particular trials for resonance, and apply initial conditions to the whole solution.

</details>

### dm-recurrences-9: Linear forcing

Original | 5 marks | core | exam | formula

Solve a_n=(2)*a_(n-1)+(n), n>=1; a_0=0. Show the method and check initial conditions.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: The homogeneous solution is C*2^n. Try A*n+B.
Step 2: A*n+B=2*(A*(n-1)+B)+n. Coefficient comparison gives A=-1, B=-2.
Step 3: a_0=0 gives C=2.
Step 4: Hence a_n=2^(n+1)-n-2.
Step 5: Check: a_0=0=0. Substitution into the recurrence gives the stated forcing term.
```

Concept: Use characteristic roots for the homogeneous part, adjust particular trials for resonance, and apply initial conditions to the whole solution.

</details>

### dm-recurrences-10: Exponential forcing distinct

Original | 5 marks | core | exam | formula

Solve a_n=(2)*a_(n-1)+(3^n), n>=1; a_0=0. Show the method and check initial conditions.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: The homogeneous solution is C*2^n. Try K*3^n.
Step 2: K*3^n=2*K*3^(n-1)+3^n gives K=3.
Step 3: a_0=0 gives C=-3.
Step 4: Hence a_n=3*3^n-3*2^n.
Step 5: Check: a_0=0=0. Substitution into the recurrence gives the stated forcing term.
```

Concept: Use characteristic roots for the homogeneous part, adjust particular trials for resonance, and apply initial conditions to the whole solution.

</details>

### dm-recurrences-11: Exponential resonance

Original | 5 marks | core | exam | formula

Solve a_n=(2)*a_(n-1)+(2^n), n>=1; a_0=1. Show the method and check initial conditions.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: The root 2 already occurs in the homogeneous solution C*2^n. Try K*n*2^n.
Step 2: After division by 2^n: K*n=K*(n-1)+1, so K=1.
Step 3: a_0=1 gives C=1.
Step 4: Hence a_n=(1+n)*2^n.
Step 5: Check: a_0=1=1. Substitution into the recurrence gives the stated forcing term.
```

Concept: Use characteristic roots for the homogeneous part, adjust particular trials for resonance, and apply initial conditions to the whole solution.

</details>

### dm-recurrences-12: Second-order constant forcing

Original | 5 marks | core | exam | formula

Solve a_n=(3)*a_(n-1)+(-2)*a_(n-2)+(1), n>=2; a_0=0, a_1=0. Show the method and check initial conditions.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: The roots of r^2-3*r+2=0 are 1 and 2. The homogeneous solution is A+B*2^n.
Step 2: A constant trial overlaps root 1, so try C*n. Substitution gives C*n=C*n+C+1, so C=-1.
Step 3: a_0=0 gives A+B=0. a_1=0 gives A+2*B-1=0. Thus B=1, A=-1.
Step 4: Hence a_n=2^n-n-1.
Step 5: Check: a_0=0=0; a_1=0=0. Substitution into the recurrence gives the stated forcing term.
```

Concept: Use characteristic roots for the homogeneous part, adjust particular trials for resonance, and apply initial conditions to the whole solution.

</details>

### dm-recurrences-13: Repeated resonance with constant

Original | 5 marks | core | exam | formula

Solve a_n=(2)*a_(n-1)+(-1)*a_(n-2)+(2), n>=2; a_0=0, a_1=1. Show the method and check initial conditions.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: The characteristic polynomial is (r-1)^2. Homogeneous solution is A+B*n.
Step 2: A constant forcing overlaps a root of multiplicity 2, so try C*n^2. Its second difference is 2*C; hence C=1.
Step 3: a_0=0 gives A=0. a_1=1 gives B=0.
Step 4: Hence a_n=n^2.
Step 5: Check: a_0=0=0; a_1=1=1. Substitution into the recurrence gives the stated forcing term.
```

Concept: Use characteristic roots for the homogeneous part, adjust particular trials for resonance, and apply initial conditions to the whole solution.

</details>

### dm-recurrences-14: Quadratic forcing accumulation

Original | 5 marks | core | exam | formula

Solve a_n=(1)*a_(n-1)+(n^2), n>=1; a_0=0. Show the method and check initial conditions.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Iterate a_n=a_(n-1)+n^2 to obtain a_n=a_0+sum_(i=1)^n i^2.
Step 2: Since a_0=0, use sum of squares to get n*(n+1)*(2*n+1)/6.
Step 3: Hence a_n=n*(n+1)*(2*n+1)/6.
Step 4: Check: a_0=0=0. Substitution into the recurrence gives the stated forcing term.
```

Concept: Use characteristic roots for the homogeneous part, adjust particular trials for resonance, and apply initial conditions to the whole solution.

</details>

### dm-recurrences-15: Two roots with exponential forcing

Original | 5 marks | core | exam | formula

Solve a_n=(5)*a_(n-1)+(-6)*a_(n-2)+(4^n), n>=2; a_0=1, a_1=4. Show the method and check initial conditions.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: The homogeneous solution is A*2^n+B*3^n. Try C*4^n.
Step 2: Substitution gives C*(16-20+6)=16, so C=8.
Step 3: a_0=1 gives A+B=-7. a_1=4 gives 2*A+3*B=-28. Thus B=-14, A=7.
Step 4: Hence a_n=8*4^n-14*3^n+7*2^n.
Step 5: Check: a_0=1=1; a_1=4=4. Substitution into the recurrence gives the stated forcing term.
```

Concept: Use characteristic roots for the homogeneous part, adjust particular trials for resonance, and apply initial conditions to the whole solution.

</details>

### dm-recurrences-16: Resonance at a repeated root

Original | 5 marks | core | exam | formula

Solve a_n=(4)*a_(n-1)+(-4)*a_(n-2)+(2^n), n>=2; a_0=0, a_1=2. Show the method and check initial conditions.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: The homogeneous solution is (A+B*n)*2^n. Divide by 2^n and put b_n=a_n/2^n.
Step 2: Then b_n=2*b_(n-1)-b_(n-2)+1, b_0=0,b_1=1. Thus b_n=n*(n+1)/2.
Step 3: Therefore a_n=n*(n+1)*2^(n-1).
Step 4: Hence a_n=n*(n+1)*2^(n-1).
Step 5: Check: a_0=0=0; a_1=2=2. Substitution into the recurrence gives the stated forcing term.
```

Concept: Use characteristic roots for the homogeneous part, adjust particular trials for resonance, and apply initial conditions to the whole solution.

</details>

### dm-recurrences-17: Iteration with constant decrement

Original | 5 marks | core | exam | formula

Solve a_n=(1)*a_(n-1)+(-3), n>=1; a_0=10. Show the method and check initial conditions.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Iterating gives a_n=a_(n-1)-3=a_(n-2)-6=...=a_0-3*n.
Step 2: Since a_0=10, a_n=10-3*n.
Step 3: Hence a_n=10-3*n.
Step 4: Check: a_0=10=10. Substitution into the recurrence gives the stated forcing term.
```

Concept: Use characteristic roots for the homogeneous part, adjust particular trials for resonance, and apply initial conditions to the whole solution.

</details>

### dm-recurrences-18: Third-order roots

Original | 5 marks | core | exam | formula

Solve a_n=(6)*a_(n-1)+(-11)*a_(n-2)+(6)*a_(n-3)+(0), n>=3; a_0=3, a_1=6, a_2=14. Show the method and check initial conditions.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: r^3-6*r^2+11*r-6=(r-1)*(r-2)*(r-3).
Step 2: The form is A+B*2^n+C*3^n. Initial values give A+B+C=3, A+2*B+3*C=6, A+4*B+9*C=14.
Step 3: Subtract equations: B+2*C=3 and 2*B+6*C=8, so C=1,B=1,A=1.
Step 4: Hence a_n=1+2^n+3^n.
Step 5: Check: a_0=3=3; a_1=6=6; a_2=14=14. Substitution into the recurrence gives the stated forcing term.
```

Concept: Use characteristic roots for the homogeneous part, adjust particular trials for resonance, and apply initial conditions to the whole solution.

</details>

### dm-trap-2: Repeated-root trial

Original | 5 marks | core | standard | mcq

The characteristic polynomial is (r-2)^2 and the forcing is 2^n. Which particular trial is appropriate?

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: The unadjusted trial C*2^n overlaps the root 2.
Step 2: Root 2 has multiplicity 2, so multiply by n^2.
Step 3: Use a_n(particular)=C*n^2*2^n, then substitute to solve C.
```

Concept: Use characteristic roots for the homogeneous part, adjust particular trials for resonance, and apply initial conditions to the whole solution.

</details>

### dm-p2-q6: Factorial operation count

Past paper 2 Q6 | 15 marks | core | standard | formula

Solve H_n=H_(n-1)+1, n>=2, H_1=1.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Iterate: H_n=H_(n-1)+1=H_(n-2)+2=...=H_1+(n-1).
Step 2: Substitute H_1=1 to obtain H_n=n, n>=1.
Step 3: Check H_1=1 and H_n-H_(n-1)=n-(n-1)=1.
```

Concept: Use characteristic roots for the homogeneous part, adjust particular trials for resonance, and apply initial conditions to the whole solution.

</details>

### dm-p3-q7: Add two recurrence

Past paper 3 Q7 | 15 marks | core | standard | formula

Solve f(0)=2, f(n)=f(n-1)+2 for n>=1.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Iterate: f(n)=f(n-1)+2=f(n-2)+4=...=f(0)+2*n.
Step 2: Therefore f(n)=2+2*n.
Step 3: Check f(0)=2 and f(n)-f(n-1)=2.
```

Concept: Use characteristic roots for the homogeneous part, adjust particular trials for resonance, and apply initial conditions to the whole solution.

</details>

### dm-p5-q6: Roots two and four

Past paper 5 Q6 | 5 marks | core | standard | formula

Solve a_n=6*a_(n-1)-8*a_(n-2), n>=2, a_0=4,a_1=10.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Characteristic equation: r^2-6*r+8=(r-2)*(r-4)=0.
Step 2: Thus a_n=A*2^n+B*4^n.
Step 3: Initial conditions give A+B=4 and 2*A+4*B=10. Subtract twice the first equation: 2*B=2, so B=1 and A=3.
Step 4: Hence a_n=3*2^n+4^n. Check a_0=4 and a_1=10.
```

Concept: Use characteristic roots for the homogeneous part, adjust particular trials for resonance, and apply initial conditions to the whole solution.

</details>

### dm-slot1-recurrence-0: Slot 1 Q4: reported third-order recurrence

Slot 1 exam pattern | 10 marks | core | exam | steps

Solve a_n=7*a_(n-1)-16*a_(n-2)+12*a_(n-3)+n^4, n>=3; a_0=-2,a_1=0,a_2=5. Find the characteristic equation and roots, particular solution coefficients, and closed form with all constants.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: The associated homogeneous characteristic equation is r^3-7*r^2+16*r-12=(r-2)^2*(r-3)=0. Thus its roots, with multiplicity, are 2,2,3.
Step 2: The homogeneous solution is C1*(2^n)+C2*(n*2^n)+C3*(3^n). Repeated roots require successive powers of n.
Step 3: The forcing is n^4, with base 1. This base has multiplicity 0 in the characteristic polynomial. Try p_n=A*(n^4)+B*(n^3)+C*(n^2)+D*(n)+E*(1). No n factor is needed because 1 is not a root.
Step 4: Substitute p_n into p_n-(7)*p_(n-1)-(-16)*p_(n-2)-(12)*p_(n-3)=n^4. After expansion and cancellation of 1^n, equate coefficients of n^4 down to n^0:
-2*A=1
44*A-2*B=0
-306*A+33*B-2*C=0
812*A-153*B+22*C-2*D=0
-723*A+203*B-51*C+11*D-2*E=0
Therefore A=(-1/2),B=-11,C=-105,D=(-1033/2),E=-1099, and p_n=(-1/2)*(n^4)-11*(n^3)-105*(n^2)+(-1033/2)*(n)-1099.
Step 5: Add homogeneous and particular parts. The initial conditions give:
1*C1+0*C2+1*C3=-2-(-1099)
2*C1+2*C2+3*C3=0-(-1732)
4*C1+8*C2+9*C3=5-(-2648)
Subtract twice the first equation from the second: 2*C2+C3=-462. Subtract four times the first from the third: 8*C2+5*C3=-1735. Subtract four times the new second equation from the new third: C3=113. Then C2=(-462-113)/2=-575/2 and C1=1097-113=984. Solving yields C1=984,C2=(-575/2),C3=113.
Step 6: Hence a_n=984*(2^n)+(-575/2)*(n*2^n)+113*(3^n)+(-1/2)*(n^4)-11*(n^3)-105*(n^2)+(-1033/2)*(n)-1099, for every integer n>=0. Equivalently, a_n=(984-575*n/2)*2^n+113*3^n-(n^4+22*n^3+210*n^2+1033*n+2198)/2. Substituting the first 3 terms gives a_0=-2,a_1=0,a_2=5; substitution into the recurrence gives the stated forcing. This, with the initial values, determines the sequence uniquely.
```

Concept: Solve the homogeneous part, choose the full particular trial with the resonance factor, compare coefficients, then apply all initial conditions to the total.

</details>

### dm-slot1-recurrence-1: Slot 1 Q4: non-homogeneous variant 1

Slot 1 exam pattern | 10 marks | core | exam | steps

Solve a_n=4*a_(n-1)-4*a_(n-2)+n^2, n>=2; a_0=1,a_1=2. Find the characteristic equation and roots, particular solution coefficients, and closed form with all constants.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: The associated homogeneous characteristic equation is r^2-4*r+4=(r-2)^2=0. Thus its roots, with multiplicity, are 2,2.
Step 2: The homogeneous solution is C1*(2^n)+C2*(n*2^n). Repeated roots require successive powers of n.
Step 3: The forcing is n^2, with base 1. This base has multiplicity 0 in the characteristic polynomial. Try p_n=A*(n^2)+B*(n)+C*(1). No n factor is needed because 1 is not a root.
Step 4: Substitute p_n into p_n-(4)*p_(n-1)-(-4)*p_(n-2)=n^2. After expansion and cancellation of 1^n, equate coefficients of n^2 down to n^0:
1*A=1
-8*A+1*B=0
12*A-4*B+1*C=0
Therefore A=1,B=8,C=20, and p_n=1*(n^2)+8*(n)+20.
Step 5: Add homogeneous and particular parts. The initial conditions give:
1*C1+0*C2=1-(20)
2*C1+2*C2=2-(29)
Solving yields C1=-19,C2=(11/2).
Step 6: Hence a_n=-19*(2^n)+(11/2)*(n*2^n)+1*(n^2)+8*(n)+20, for every integer n>=0. Substituting the first 2 terms gives a_0=1,a_1=2; substitution into the recurrence gives the stated forcing. This, with the initial values, determines the sequence uniquely.
```

Concept: Solve the homogeneous part, choose the full particular trial with the resonance factor, compare coefficients, then apply all initial conditions to the total.

</details>

### dm-slot1-recurrence-2: Slot 1 Q4: non-homogeneous variant 2

Slot 1 exam pattern | 10 marks | core | exam | steps

Solve a_n=4*a_(n-1)-4*a_(n-2)+2^n, n>=2; a_0=1,a_1=4. Find the characteristic equation and roots, particular solution coefficients, and closed form with all constants.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: The associated homogeneous characteristic equation is r^2-4*r+4=(r-2)^2=0. Thus its roots, with multiplicity, are 2,2.
Step 2: The homogeneous solution is C1*(2^n)+C2*(n*2^n). Repeated roots require successive powers of n.
Step 3: The forcing is 2^n, with base 2. This base has multiplicity 2 in the characteristic polynomial. Try p_n=A*(n^2*2^n). The factor n^2 avoids overlap with the homogeneous solution.
Step 4: Substitute p_n into p_n-(4)*p_(n-1)-(-4)*p_(n-2)=2^n. After expansion and cancellation of 2^n, equate coefficients of n^0 down to n^0:
2*A=1
Therefore A=(1/2), and p_n=(1/2)*(n^2*2^n).
Step 5: Add homogeneous and particular parts. The initial conditions give:
1*C1+0*C2=1-(0)
2*C1+2*C2=4-(1)
Solving yields C1=1,C2=(1/2).
Step 6: Hence a_n=1*(2^n)+(1/2)*(n*2^n)+(1/2)*(n^2*2^n), for every integer n>=0. Substituting the first 2 terms gives a_0=1,a_1=4; substitution into the recurrence gives the stated forcing. This, with the initial values, determines the sequence uniquely.
```

Concept: Solve the homogeneous part, choose the full particular trial with the resonance factor, compare coefficients, then apply all initial conditions to the total.

</details>

### dm-slot1-recurrence-3: Slot 1 Q4: non-homogeneous variant 3

Slot 1 exam pattern | 10 marks | core | exam | steps

Solve a_n=3*a_(n-1)-2*a_(n-2)+2^n, n>=2; a_0=0,a_1=1. Find the characteristic equation and roots, particular solution coefficients, and closed form with all constants.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: The associated homogeneous characteristic equation is r^2-3*r+2=(r-1)*(r-2)=0. Thus its roots, with multiplicity, are 1,2.
Step 2: The homogeneous solution is C1*(1)+C2*(2^n). Repeated roots require successive powers of n.
Step 3: The forcing is 2^n, with base 2. This base has multiplicity 1 in the characteristic polynomial. Try p_n=A*(n*2^n). The factor n^1 avoids overlap with the homogeneous solution.
Step 4: Substitute p_n into p_n-(3)*p_(n-1)-(-2)*p_(n-2)=2^n. After expansion and cancellation of 2^n, equate coefficients of n^0 down to n^0:
(1/2)*A=1
Therefore A=2, and p_n=2*(n*2^n).
Step 5: Add homogeneous and particular parts. The initial conditions give:
1*C1+1*C2=0-(0)
1*C1+2*C2=1-(4)
Solving yields C1=3,C2=-3.
Step 6: Hence a_n=3-3*(2^n)+2*(n*2^n), for every integer n>=0. Substituting the first 2 terms gives a_0=0,a_1=1; substitution into the recurrence gives the stated forcing. This, with the initial values, determines the sequence uniquely.
```

Concept: Solve the homogeneous part, choose the full particular trial with the resonance factor, compare coefficients, then apply all initial conditions to the total.

</details>

### dm-slot1-recurrence-4: Slot 1 Q4: non-homogeneous variant 4

Slot 1 exam pattern | 10 marks | core | exam | steps

Solve a_n=2*a_(n-1)-1*a_(n-2)+n, n>=2; a_0=0,a_1=1. Find the characteristic equation and roots, particular solution coefficients, and closed form with all constants.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: The associated homogeneous characteristic equation is r^2-2*r+1=(r-1)^2=0. Thus its roots, with multiplicity, are 1,1.
Step 2: The homogeneous solution is C1*(1)+C2*(n). Repeated roots require successive powers of n.
Step 3: The forcing is n, with base 1. This base has multiplicity 2 in the characteristic polynomial. Try p_n=A*(n^3)+B*(n^2). The factor n^2 avoids overlap with the homogeneous solution.
Step 4: Substitute p_n into p_n-(2)*p_(n-1)-(-1)*p_(n-2)=n. After expansion and cancellation of 1^n, equate coefficients of n^1 down to n^0:
6*A=1
-6*A+2*B=0
Therefore A=(1/6),B=(1/2), and p_n=(1/6)*(n^3)+(1/2)*(n^2).
Step 5: Add homogeneous and particular parts. The initial conditions give:
1*C1+0*C2=0-(0)
1*C1+1*C2=1-((2/3))
Solving yields C1=0,C2=(1/3).
Step 6: Hence a_n=(1/3)*(n)+(1/6)*(n^3)+(1/2)*(n^2), for every integer n>=0. Substituting the first 2 terms gives a_0=0,a_1=1; substitution into the recurrence gives the stated forcing. This, with the initial values, determines the sequence uniquely.
```

Concept: Solve the homogeneous part, choose the full particular trial with the resonance factor, compare coefficients, then apply all initial conditions to the total.

</details>

## relations

### dm-relations-1: Equality on three elements

Original | 5 marks | core | foundation | properties

On A={1,2,3}, R={(1,1), (2,2), (3,3)}. Decide each listed property, giving definitions or witnesses.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: reflexive: yes. All diagonal pairs (1,1),(2,2),(3,3) occur.
Step 2: irreflexive: no. (1,1) is present.
Step 3: symmetric: yes. Every displayed pair has its reversed pair in the displayed list.
Step 4: antisymmetric: yes. No distinct x,y have both (x,y) and (y,x) in the list.
Step 5: transitive: yes. Checking each composable pair in the finite list produces an already listed endpoint pair.
Step 6: equivalence relation: yes. Reflexivity, symmetry and transitivity all hold.
Step 7: partial order: yes. Reflexivity, antisymmetry and transitivity all hold.
```

Concept: Equivalence means reflexive, symmetric and transitive; partial order replaces symmetry with antisymmetry. Classes are relative to the specified universe.

</details>

### dm-relations-2: At most on four integers

Original | 5 marks | core | foundation | properties

On A={1,2,3,4}, R={(1,1), (1,2), (1,3), (1,4), (2,2), (2,3), (2,4), (3,3), (3,4), (4,4)}. Decide each listed property, giving definitions or witnesses.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: reflexive: yes. All diagonal pairs (1,1),(2,2),(3,3),(4,4) occur.
Step 2: irreflexive: no. (1,1) is present.
Step 3: symmetric: no. (1,2) is present but (2,1) is absent.
Step 4: antisymmetric: yes. No distinct x,y have both (x,y) and (y,x) in the list.
Step 5: transitive: yes. Checking each composable pair in the finite list produces an already listed endpoint pair.
Step 6: equivalence relation: no. It fails symmetric.
Step 7: partial order: yes. Reflexivity, antisymmetry and transitivity all hold.
```

Concept: Equivalence means reflexive, symmetric and transitive; partial order replaces symmetry with antisymmetry. Classes are relative to the specified universe.

</details>

### dm-relations-3: Strictly less

Original | 5 marks | core | foundation | properties

On A={1,2,3}, R={(1,2), (1,3), (2,3)}. Decide each listed property, giving definitions or witnesses.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: reflexive: no. (1,1) is missing.
Step 2: irreflexive: yes. There are no diagonal pairs.
Step 3: symmetric: no. (1,2) is present but (2,1) is absent.
Step 4: antisymmetric: yes. No distinct x,y have both (x,y) and (y,x) in the list.
Step 5: transitive: yes. Checking each composable pair in the finite list produces an already listed endpoint pair.
Step 6: equivalence relation: no. It fails reflexive, symmetric.
Step 7: partial order: no. It fails reflexive.
```

Concept: Equivalence means reflexive, symmetric and transitive; partial order replaces symmetry with antisymmetry. Classes are relative to the specified universe.

</details>

### dm-relations-4: Unequal integers

Original | 5 marks | core | standard | properties

On A={1,2,3}, R={(1,2), (1,3), (2,1), (2,3), (3,1), (3,2)}. Decide each listed property, giving definitions or witnesses.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: reflexive: no. (1,1) is missing.
Step 2: irreflexive: yes. There are no diagonal pairs.
Step 3: symmetric: yes. Every displayed pair has its reversed pair in the displayed list.
Step 4: antisymmetric: no. (1,2) and (2,1) both occur with 1!=2.
Step 5: transitive: no. (1,2) and (2,1) occur but (1,1) does not.
Step 6: equivalence relation: no. It fails reflexive, transitive.
Step 7: partial order: no. It fails reflexive, antisymmetric, transitive.
```

Concept: Equivalence means reflexive, symmetric and transitive; partial order replaces symmetry with antisymmetry. Classes are relative to the specified universe.

</details>

### dm-relations-5: Same parity

Original | 5 marks | core | standard | properties

On A={0,1,2,3,4,5}, R={(0,0), (0,2), (0,4), (1,1), (1,3), (1,5), (2,0), (2,2), (2,4), (3,1), (3,3), (3,5), (4,0), (4,2), (4,4), (5,1), (5,3), (5,5)}. Decide each listed property, giving definitions or witnesses.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: reflexive: yes. All diagonal pairs (0,0),(1,1),(2,2),(3,3),(4,4),(5,5) occur.
Step 2: irreflexive: no. (0,0) is present.
Step 3: symmetric: yes. Every displayed pair has its reversed pair in the displayed list.
Step 4: antisymmetric: no. (0,2) and (2,0) both occur with 0!=2.
Step 5: transitive: yes. Checking each composable pair in the finite list produces an already listed endpoint pair.
Step 6: equivalence relation: yes. Reflexivity, symmetry and transitivity all hold.
Step 7: partial order: no. It fails antisymmetric.
```

Concept: Equivalence means reflexive, symmetric and transitive; partial order replaces symmetry with antisymmetry. Classes are relative to the specified universe.

</details>

### dm-relations-6: Distance at most one

Original | 5 marks | core | standard | properties

On A={1,2,3}, R={(1,1), (1,2), (2,1), (2,2), (2,3), (3,2), (3,3)}. Decide each listed property, giving definitions or witnesses.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: reflexive: yes. All diagonal pairs (1,1),(2,2),(3,3) occur.
Step 2: irreflexive: no. (1,1) is present.
Step 3: symmetric: yes. Every displayed pair has its reversed pair in the displayed list.
Step 4: antisymmetric: no. (1,2) and (2,1) both occur with 1!=2.
Step 5: transitive: no. (1,2) and (2,3) occur but (1,3) does not.
Step 6: equivalence relation: no. It fails transitive.
Step 7: partial order: no. It fails antisymmetric, transitive.
```

Concept: Equivalence means reflexive, symmetric and transitive; partial order replaces symmetry with antisymmetry. Classes are relative to the specified universe.

</details>

### dm-relations-7: Divisibility

Original | 5 marks | core | standard | properties

On A={1,2,3,6}, R={(1,1), (1,2), (1,3), (1,6), (2,2), (2,6), (3,3), (3,6), (6,6)}. Decide each listed property, giving definitions or witnesses.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: reflexive: yes. All diagonal pairs (1,1),(2,2),(3,3),(6,6) occur.
Step 2: irreflexive: no. (1,1) is present.
Step 3: symmetric: no. (1,2) is present but (2,1) is absent.
Step 4: antisymmetric: yes. No distinct x,y have both (x,y) and (y,x) in the list.
Step 5: transitive: yes. Checking each composable pair in the finite list produces an already listed endpoint pair.
Step 6: equivalence relation: no. It fails symmetric.
Step 7: partial order: yes. Reflexivity, antisymmetry and transitivity all hold.
```

Concept: Equivalence means reflexive, symmetric and transitive; partial order replaces symmetry with antisymmetry. Classes are relative to the specified universe.

</details>

### dm-relations-8: Empty relation

Original | 5 marks | core | standard | properties

On A={1,2}, R={}. Decide each listed property, giving definitions or witnesses.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: reflexive: no. (1,1) is missing.
Step 2: irreflexive: yes. There are no diagonal pairs.
Step 3: symmetric: yes. Every displayed pair has its reversed pair in the displayed list.
Step 4: antisymmetric: yes. No distinct x,y have both (x,y) and (y,x) in the list.
Step 5: transitive: yes. Checking each composable pair in the finite list produces an already listed endpoint pair.
Step 6: equivalence relation: no. It fails reflexive.
Step 7: partial order: no. It fails reflexive.
```

Concept: Equivalence means reflexive, symmetric and transitive; partial order replaces symmetry with antisymmetry. Classes are relative to the specified universe.

</details>

### dm-relations-9: Partition modulo 2

Original | 5 marks | core | standard | partition

On A={0,1,2,3,4,5,6,7,8,9}, define x R y iff x=y (mod 2). List the equivalence classes as a partition.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Reflexive: m divides x-x=0. Symmetric: if m divides x-y it divides y-x. Transitive: add x-y and y-z.
Step 2: The class [a] contains all x in A with the same remainder as a modulo 2.
Step 3: Distinct classes are {0,2,4,6,8}; {1,3,5,7,9}.
Step 4: These classes are disjoint and cover A, so they form the required partition.
```

Concept: Equivalence means reflexive, symmetric and transitive; partial order replaces symmetry with antisymmetry. Classes are relative to the specified universe.

</details>

### dm-relations-10: Partition modulo 3

Original | 5 marks | core | standard | partition

On A={0,1,2,3,4,5,6,7,8,9}, define x R y iff x=y (mod 3). List the equivalence classes as a partition.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Reflexive: m divides x-x=0. Symmetric: if m divides x-y it divides y-x. Transitive: add x-y and y-z.
Step 2: The class [a] contains all x in A with the same remainder as a modulo 3.
Step 3: Distinct classes are {0,3,6,9}; {1,4,7}; {2,5,8}.
Step 4: These classes are disjoint and cover A, so they form the required partition.
```

Concept: Equivalence means reflexive, symmetric and transitive; partial order replaces symmetry with antisymmetry. Classes are relative to the specified universe.

</details>

### dm-relations-11: Partition modulo 4

Original | 5 marks | core | standard | partition

On A={0,1,2,3,4,5,6,7,8,9}, define x R y iff x=y (mod 4). List the equivalence classes as a partition.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Reflexive: m divides x-x=0. Symmetric: if m divides x-y it divides y-x. Transitive: add x-y and y-z.
Step 2: The class [a] contains all x in A with the same remainder as a modulo 4.
Step 3: Distinct classes are {0,4,8}; {1,5,9}; {2,6}; {3,7}.
Step 4: These classes are disjoint and cover A, so they form the required partition.
```

Concept: Equivalence means reflexive, symmetric and transitive; partial order replaces symmetry with antisymmetry. Classes are relative to the specified universe.

</details>

### dm-relations-12: Partition modulo 5

Original | 5 marks | core | standard | partition

On A={0,1,2,3,4,5,6,7,8,9}, define x R y iff x=y (mod 5). List the equivalence classes as a partition.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Reflexive: m divides x-x=0. Symmetric: if m divides x-y it divides y-x. Transitive: add x-y and y-z.
Step 2: The class [a] contains all x in A with the same remainder as a modulo 5.
Step 3: Distinct classes are {0,5}; {1,6}; {2,7}; {3,8}; {4,9}.
Step 4: These classes are disjoint and cover A, so they form the required partition.
```

Concept: Equivalence means reflexive, symmetric and transitive; partial order replaces symmetry with antisymmetry. Classes are relative to the specified universe.

</details>

### dm-relations-13: A finite congruence class modulo 3

Original | 5 marks | core | standard | set-answer

On A={-6,-5,...,6}, x R y iff 3 divides x-y. Find [1].

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: By definition [1]={x in A: 3 divides x-1}.
Step 2: Test x=1+3*k while -6<=x<=6.
Step 3: The resulting class is {-5,-2,1,4}.
```

Concept: Equivalence means reflexive, symmetric and transitive; partial order replaces symmetry with antisymmetry. Classes are relative to the specified universe.

</details>

### dm-relations-14: A finite congruence class modulo 4

Original | 5 marks | core | standard | set-answer

On A={-6,-5,...,6}, x R y iff 4 divides x-y. Find [2].

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: By definition [2]={x in A: 4 divides x-2}.
Step 2: Test x=2+4*k while -6<=x<=6.
Step 3: The resulting class is {-6,-2,2,6}.
```

Concept: Equivalence means reflexive, symmetric and transitive; partial order replaces symmetry with antisymmetry. Classes are relative to the specified universe.

</details>

### dm-relations-15: A finite congruence class modulo 5

Original | 5 marks | core | standard | set-answer

On A={-6,-5,...,6}, x R y iff 5 divides x-y. Find [0].

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: By definition [0]={x in A: 5 divides x-0}.
Step 2: Test x=0+5*k while -6<=x<=6.
Step 3: The resulting class is {-5,0,5}.
```

Concept: Equivalence means reflexive, symmetric and transitive; partial order replaces symmetry with antisymmetry. Classes are relative to the specified universe.

</details>

### dm-trap-5: Antisymmetric is not asymmetric

Original | 5 marks | core | standard | mcq

Which relation on {1,2} is both symmetric and antisymmetric?

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Symmetry requires every reversed pair.
Step 2: Antisymmetry forbids a two-way pair only for distinct elements.
Step 3: The diagonal-only relation satisfies both. The other choices have both (1,2) and (2,1).
```

Concept: Equivalence means reflexive, symmetric and transitive; partial order replaces symmetry with antisymmetry. Classes are relative to the specified universe.

</details>

### dm-slot1-relation-0: Slot 1 Q3: reported RGB triangle under 120-degree rotations

Slot 1 exam pattern | 10 marks | core | exam | steps

Colour each of the 3 labelled vertices using R/G/B. All 27 colourings are allowed. Two are equivalent iff related by a rotation only. Prove this is an equivalence relation, list the complete partition and count the classes.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: The identity rotation proves reflexivity. Every allowed symmetry has an allowed inverse, proving symmetry. Composition of allowed symmetries is allowed, proving transitivity.
Step 2: A class is the orbit obtained by applying every allowed symmetry to one colouring. Positions are labelled in clockwise order. R=Red, G=Green, B=Blue (or the two stated colours); repeated identical words are listed only once.
Step 3: The complete universe is A={RRR,RRG,RRB,RGR,RGG,RGB,RBR,RBG,RBB,GRR,GRG,GRB,GGR,GGG,GGB,GBR,GBG,GBB,BRR,BRG,BRB,BGR,BGG,BGB,BBR,BBG,BBB}. The distinct classes are:
{RRR}; {RRG,RGR,GRR}; {RRB,RBR,BRR}; {RGG,GRG,GGR}; {RGB,GBR,BRG}; {RBG,GRB,BGR}; {RBB,BRB,BBR}; {GGG}; {GGB,GBG,BGG}; {GBB,BGB,BBG}; {BBB}.
Step 4: There are 11 classes. Their sizes sum to 27; the classes are disjoint and cover A. There are 3 monochromatic singleton classes and 8 size-3 classes, so 3+8*3=27. RGB and RBG belong to different rotation classes; reflection is not allowed.
```

Concept: An equivalence class is the whole orbit or invariant block inside the stated universe. Prove reflexivity, symmetry and transitivity.

</details>

### dm-slot1-relation-1: Slot 1 Q3: binary square under 90-degree rotations

Slot 1 exam pattern | 10 marks | core | exam | steps

Colour each of the 4 labelled vertices using R/B. All 16 colourings are allowed. Two are equivalent iff related by a rotation only. Prove this is an equivalence relation, list the complete partition and count the classes.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: The identity rotation proves reflexivity. Every allowed symmetry has an allowed inverse, proving symmetry. Composition of allowed symmetries is allowed, proving transitivity.
Step 2: A class is the orbit obtained by applying every allowed symmetry to one colouring. Positions are labelled in clockwise order. R=Red, G=Green, B=Blue (or the two stated colours); repeated identical words are listed only once.
Step 3: The complete universe is A={RRRR,RRRB,RRBR,RRBB,RBRR,RBRB,RBBR,RBBB,BRRR,BRRB,BRBR,BRBB,BBRR,BBRB,BBBR,BBBB}. The distinct classes are:
{RRRR}; {RRRB,RRBR,RBRR,BRRR}; {RRBB,RBBR,BRRB,BBRR}; {RBRB,BRBR}; {RBBB,BRBB,BBRB,BBBR}; {BBBB}.
Step 4: There are 6 classes. Their sizes sum to 16; the classes are disjoint and cover A. 
```

Concept: An equivalence class is the whole orbit or invariant block inside the stated universe. Prove reflexivity, symmetry and transitivity.

</details>

### dm-slot1-relation-2: Slot 1 Q3: RGB triangle under rotations and reflections

Slot 1 exam pattern | 10 marks | core | exam | steps

Colour each of the 3 labelled vertices using R/G/B. All 27 colourings are allowed. Two are equivalent iff related by a rotation or reflection. Prove this is an equivalence relation, list the complete partition and count the classes.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: The identity rotation proves reflexivity. Every allowed symmetry has an allowed inverse, proving symmetry. Composition of allowed symmetries is allowed, proving transitivity.
Step 2: A class is the orbit obtained by applying every allowed symmetry to one colouring. Positions are labelled in clockwise order. R=Red, G=Green, B=Blue (or the two stated colours); repeated identical words are listed only once.
Step 3: The complete universe is A={RRR,RRG,RRB,RGR,RGG,RGB,RBR,RBG,RBB,GRR,GRG,GRB,GGR,GGG,GGB,GBR,GBG,GBB,BRR,BRG,BRB,BGR,BGG,BGB,BBR,BBG,BBB}. The distinct classes are:
{RRR}; {RRG,RGR,GRR}; {RRB,RBR,BRR}; {RGG,GRG,GGR}; {RGB,RBG,GRB,GBR,BRG,BGR}; {RBB,BRB,BBR}; {GGG}; {GGB,GBG,BGG}; {GBB,BGB,BBG}; {BBB}.
Step 4: There are 10 classes. Their sizes sum to 27; the classes are disjoint and cover A. 
```

Concept: An equivalence class is the whole orbit or invariant block inside the stated universe. Prove reflexivity, symmetry and transitivity.

</details>

### dm-slot1-relation-3: Slot 1 Q3: congruence modulo 4 on {-3,...,8}

Slot 1 exam pattern | 10 marks | core | exam | steps

On A={-3,-2,-1,0,1,2,3,4,5,6,7,8}, x~y iff x=y (mod 4). Prove this is an equivalence relation, list the complete partition and count the classes.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Reflexivity: 4 divides x-x=0. Symmetry: negate a divisible difference. Transitivity: add x-y and y-z to obtain x-z.
Step 2: The invariant is the remainder modulo 4, restricted to A.
Step 3: The complete universe is A={-3,-2,-1,0,1,2,3,4,5,6,7,8}. The distinct classes are:
{-3,1,5}; {-2,2,6}; {-1,3,7}; {0,4,8}.
Step 4: There are 4 classes. Their sizes sum to 12; the classes are disjoint and cover A. 
```

Concept: An equivalence class is the whole orbit or invariant block inside the stated universe. Prove reflexivity, symmetry and transitivity.

</details>

### dm-slot1-relation-4: Slot 1 Q3: equal-length strings in a finite universe

Slot 1 exam pattern | 10 marks | core | exam | steps

On A={epsilon,a,b,aa,ab,ba,bb,aaa,abb,bbb}, x~y iff |x|=|y|. Prove this is an equivalence relation, list the complete partition and count the classes.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Equality of lengths is reflexive and symmetric. If |x|=|y| and |y|=|z|, then |x|=|z|, proving transitivity.
Step 2: Group strings by their lengths; epsilon denotes the empty string.
Step 3: The complete universe is A={epsilon,a,b,aa,ab,ba,bb,aaa,abb,bbb}. The distinct classes are:
{epsilon}; {a,b}; {aa,ab,ba,bb}; {aaa,abb,bbb}.
Step 4: There are 4 classes. Their sizes sum to 10; the classes are disjoint and cover A. 
```

Concept: An equivalence class is the whole orbit or invariant block inside the stated universe. Prove reflexivity, symmetry and transitivity.

</details>

### dm-slot1-relation-5: Slot 1 Q3: (a,b)~(c,d) iff a+d=b+c on {0,1,2,3} x {0,1,2,3}

Slot 1 exam pattern | 10 marks | core | exam | steps

On A={(0,0),(0,1),(0,2),(0,3),(1,0),(1,1),(1,2),(1,3),(2,0),(2,1),(2,2),(2,3),(3,0),(3,1),(3,2),(3,3)}, (a,b)~(c,d) iff a+d=b+c. Prove this is an equivalence relation, list the complete partition and count the classes.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Rewrite a+d=b+c as a-b=c-d. Equality of these differences is reflexive, symmetric and transitive, so the relation is an equivalence relation.
Step 2: The class of (a,b) is {(c,d) in A:a-b=c-d}; group pairs by their difference.
Step 3: The complete universe is A={(0,0),(0,1),(0,2),(0,3),(1,0),(1,1),(1,2),(1,3),(2,0),(2,1),(2,2),(2,3),(3,0),(3,1),(3,2),(3,3)}. The distinct classes are:
{(0,0),(1,1),(2,2),(3,3)}; {(0,1),(1,2),(2,3)}; {(0,2),(1,3)}; {(0,3)}; {(1,0),(2,1),(3,2)}; {(2,0),(3,1)}; {(3,0)}.
Step 4: There are 7 classes. Their sizes sum to 16; the classes are disjoint and cover A. 
```

Concept: An equivalence class is the whole orbit or invariant block inside the stated universe. Prove reflexivity, symmetry and transitivity.

</details>

## sets

### dm-sets-1: A nonidentity bijection

Original | 5 marks | past | standard | steps

Give a bijection N->N that is not the identity. Use N={0,1,2,...}.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Define f(0)=1, f(1)=0, and f(n)=n for n>=2.
Step 2: The values 0 and 1 are swapped and every other value is fixed. Thus each output has exactly one preimage.
Step 3: Hence f is injective and surjective, and f(0)!=0 so it is not the identity.
```

Concept: Membership, subset inclusion and cardinality are different claims. Function properties depend on both domain and codomain.

</details>

### dm-sets-2: Neither injective nor onto

Original | 5 marks | past | standard | steps

Give f:N->N that is neither injective nor surjective. Use N={0,1,2,...}.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Define f(n)=0 for every n.
Step 2: Since f(0)=f(1), the function is not one-to-one.
Step 3: The number 1 has no preimage, so the function is not onto.
```

Concept: Membership, subset inclusion and cardinality are different claims. Function properties depend on both domain and codomain.

</details>

### dm-sets-3: Composition injection trap

Original | 5 marks | past | standard | steps

Disprove: if f composed with g is one-to-one, then f is one-to-one.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Let g:{0}->{0,1} send 0 to 0. Let f:{0,1}->{0} send both inputs to 0.
Step 2: The composition f o g has a singleton domain, so it is injective.
Step 3: But f(0)=f(1) with 0!=1, so f is not injective.
```

Concept: Membership, subset inclusion and cardinality are different claims. Function properties depend on both domain and codomain.

</details>

### dm-sets-4: Countability of integers

Original | 5 marks | past | standard | steps

Show Z is countably infinite.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: List the integers as 0,1,-1,2,-2,3,-3,... .
Step 2: Every integer occurs once: 0 first, each positive k at index 2*k-1, and -k at index 2*k.
Step 3: This gives a bijection from N={0,1,...} to Z, so Z is countably infinite.
```

Concept: Membership, subset inclusion and cardinality are different claims. Function properties depend on both domain and codomain.

</details>

### dm-sets-5: Uncountable sets with countable difference

Original | 5 marks | past | standard | steps

Give uncountable A,B for which A-B is countably infinite.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Take A=R and B=R-Z.
Step 2: B is uncountable: otherwise R=B union Z would be a union of two countable sets and thus countable.
Step 3: A-B=Z, which is countably infinite. Both required sets are uncountable.
```

Concept: Membership, subset inclusion and cardinality are different claims. Function properties depend on both domain and codomain.

</details>

### dm-sets-6: Uncountability diagonal argument

Original | 5 marks | past | standard | steps

Explain why the set of infinite binary sequences is uncountable.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Assume a list s1,s2,... contains every infinite binary sequence.
Step 2: Define t by choosing its nth bit different from the nth bit of sn.
Step 3: Then t differs from sn in position n for each n, so t is missing from the list.
Step 4: This contradiction shows no countable list exists. The set is uncountable.
```

Concept: Membership, subset inclusion and cardinality are different claims. Function properties depend on both domain and codomain.

</details>

### dm-trap-6: Countability trap

Original | 5 marks | past | standard | steps

Explain why infinite binary sequences are uncountable while finite binary strings and the rational numbers are countable.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Finite binary strings can be listed by length, then lexicographically; rationals have a countable diagonal listing.
Step 2: For any proposed list of infinite binary sequences, flip the nth bit of the nth sequence.
Step 3: The resulting sequence is absent from the list, proving uncountability.
```

Concept: Membership, subset inclusion and cardinality are different claims. Function properties depend on both domain and codomain.

</details>

### dm-p1-q2: Composition injection trap

Past paper 1 Q2 | 20 marks | past | standard | steps

Disprove: if f composed with g is one-to-one, then f is one-to-one.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Let g:{0}->{0,1} send 0 to 0. Let f:{0,1}->{0} send both inputs to 0.
Step 2: The composition f o g has a singleton domain, so it is injective.
Step 3: But f(0)=f(1) with 0!=1, so f is not injective.
```

Concept: Membership, subset inclusion and cardinality are different claims. Function properties depend on both domain and codomain.

</details>

### dm-p1-q3a: Finite difference of uncountable sets

Past paper 1 Q3a | 5 marks | past | standard | steps

Give uncountably infinite A and B such that A-B is finite.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Take A=R and B=R-{0}. Both are uncountable.
Step 2: Then A-B={0}, which is finite.
```

Concept: Membership, subset inclusion and cardinality are different claims. Function properties depend on both domain and codomain.

</details>

### dm-p1-q3b: Countably infinite difference of uncountable sets

Past paper 1 Q3b | 5 marks | past | standard | steps

Give uncountably infinite A and B such that A-B is countably infinite.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Take A=R and B=R-Z.
Step 2: B is uncountable: otherwise R=B union Z would be a union of two countable sets and thus countable.
Step 3: A-B=Z, which is countably infinite. Both required sets are uncountable.
```

Concept: Membership, subset inclusion and cardinality are different claims. Function properties depend on both domain and codomain.

</details>

### dm-p1-q3c: Uncountably infinite difference

Past paper 1 Q3c | 5 marks | past | standard | steps

Give uncountably infinite A and B such that A-B is uncountably infinite.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Take A=R and B=(-infinity,0). Both are uncountable.
Step 2: Then A-B=[0,infinity), which is uncountable.
```

Concept: Membership, subset inclusion and cardinality are different claims. Function properties depend on both domain and codomain.

</details>

### dm-p4-q3a: A nonidentity bijection

Past paper 4 Q3a | 1 marks | past | standard | steps

Give a bijection N->N that is not the identity. Use N={0,1,2,...}.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Define f(0)=1, f(1)=0, and f(n)=n for n>=2.
Step 2: The values 0 and 1 are swapped and every other value is fixed. Thus each output has exactly one preimage.
Step 3: Hence f is injective and surjective, and f(0)!=0 so it is not the identity.
```

Concept: Membership, subset inclusion and cardinality are different claims. Function properties depend on both domain and codomain.

</details>

### dm-p4-q3b: Neither injective nor onto

Past paper 4 Q3b | 1 marks | past | standard | steps

Give f:N->N that is neither injective nor surjective. Use N={0,1,2,...}.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Define f(n)=0 for every n.
Step 2: Since f(0)=f(1), the function is not one-to-one.
Step 3: The number 1 has no preimage, so the function is not onto.
```

Concept: Membership, subset inclusion and cardinality are different claims. Function properties depend on both domain and codomain.

</details>

### dm-p5-q3a: Membership and subset together

Past paper 5 Q3a | 1 marks | past | standard | steps

Find sets A,B such that A in B and A subseteq B.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Take A={} and B={{}}.
Step 2: A={} is the sole element of B, so A in B.
Step 3: The empty set is a subset of every set, so A subseteq B.
```

Concept: Membership, subset inclusion and cardinality are different claims. Function properties depend on both domain and codomain.

</details>

### dm-p5-q3b: Uncountable sets with countable intersection

Past paper 5 Q3b | 2 marks | past | standard | steps

Find uncountable A,B such that A intersection B is countably infinite.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Take A=(-infinity,0) union Z and B=(0,infinity) union Z.
Step 2: Each set contains an interval, so each is uncountable.
Step 3: Their intersection is exactly Z, which is countably infinite.
```

Concept: Membership, subset inclusion and cardinality are different claims. Function properties depend on both domain and codomain.

</details>

### dm-p5-q3c: Both differences countably infinite

Past paper 5 Q3c | 2 marks | past | standard | steps

Find uncountable A,B such that A-B and B-A are both countably infinite.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: Let I=R-Z, E={2*k:k in Z}, O={2*k+1:k in Z}. Define A=I union E and B=I union O.
Step 2: I is uncountable, so A and B are uncountable. E and O are disjoint.
Step 3: A-B=E and B-A=O, both countably infinite.
```

Concept: Membership, subset inclusion and cardinality are different claims. Function properties depend on both domain and codomain.

</details>

### dm-slot1-sets-0: Slot 1 Q2a: set operations

Slot 1 exam pattern | 2 marks | core | exam | steps

For A={1,2,3} and B={2,3,4}, find A union B, A intersection B, A-B and A x B. State which operations are commutative. The reported slot gave the method, not exact sets; these are constructed data.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: By membership, A union B={1,2,3,4} and A intersection B={2,3}. Also A-B={1}. (1 mark for these operations.)
Step 2: The Cartesian product is ordered: A x B={(1,2),(1,3),(1,4),(2,2),(2,3),(2,4),(3,2),(3,3),(3,4)}. It has |A|*|B|=3*3=9 pairs. Union and intersection are commutative; difference and Cartesian product generally are not. For example (1,2) lies in A x B but not B x A. (1 mark.)
```

Concept: Compute membership one element at a time; ordered pairs in a Cartesian product have a fixed orientation.

</details>

### dm-slot1-sets-1: Slot 1 Q2a: set operations

Slot 1 exam pattern | 2 marks | core | exam | steps

For A={0,2,4} and B={1,2,4}, find A union B, A intersection B, A-B and A x B. State which operations are commutative. The reported slot gave the method, not exact sets; these are constructed data.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: By membership, A union B={0,1,2,4} and A intersection B={2,4}. Also A-B={0}. (1 mark for these operations.)
Step 2: The Cartesian product is ordered: A x B={(0,1),(0,2),(0,4),(2,1),(2,2),(2,4),(4,1),(4,2),(4,4)}. It has |A|*|B|=3*3=9 pairs. Union and intersection are commutative; difference and Cartesian product generally are not. For example (0,1) lies in A x B but not B x A. (1 mark.)
```

Concept: Compute membership one element at a time; ordered pairs in a Cartesian product have a fixed orientation.

</details>

### dm-slot1-sets-2: Slot 1 Q2a: set operations

Slot 1 exam pattern | 2 marks | core | exam | steps

For A={1,3} and B={2,3}, find A union B, A intersection B, A-B and A x B. State which operations are commutative. The reported slot gave the method, not exact sets; these are constructed data.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: By membership, A union B={1,2,3} and A intersection B={3}. Also A-B={1}. (1 mark for these operations.)
Step 2: The Cartesian product is ordered: A x B={(1,2),(1,3),(3,2),(3,3)}. It has |A|*|B|=2*2=4 pairs. Union and intersection are commutative; difference and Cartesian product generally are not. For example (1,2) lies in A x B but not B x A. (1 mark.)
```

Concept: Compute membership one element at a time; ordered pairs in a Cartesian product have a fixed orientation.

</details>

### dm-slot1-sets-3: Slot 1 Q2a: set operations

Slot 1 exam pattern | 2 marks | core | exam | steps

For A={2,4,6} and B={4,6,8}, find A union B, A intersection B, A-B and A x B. State which operations are commutative. The reported slot gave the method, not exact sets; these are constructed data.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: By membership, A union B={2,4,6,8} and A intersection B={4,6}. Also A-B={2}. (1 mark for these operations.)
Step 2: The Cartesian product is ordered: A x B={(2,4),(2,6),(2,8),(4,4),(4,6),(4,8),(6,4),(6,6),(6,8)}. It has |A|*|B|=3*3=9 pairs. Union and intersection are commutative; difference and Cartesian product generally are not. For example (2,4) lies in A x B but not B x A. (1 mark.)
```

Concept: Compute membership one element at a time; ordered pairs in a Cartesian product have a fixed orientation.

</details>

### dm-slot1-sets-4: Slot 1 Q2a: set operations

Slot 1 exam pattern | 2 marks | core | exam | steps

For A={0,1} and B={1,2,3}, find A union B, A intersection B, A-B and A x B. State which operations are commutative. The reported slot gave the method, not exact sets; these are constructed data.

<details>
<summary>Step-by-step model solution</summary>

```text
Step 1: By membership, A union B={0,1,2,3} and A intersection B={1}. Also A-B={0}. (1 mark for these operations.)
Step 2: The Cartesian product is ordered: A x B={(0,1),(0,2),(0,3),(1,1),(1,2),(1,3)}. It has |A|*|B|=2*3=6 pairs. Union and intersection are commutative; difference and Cartesian product generally are not. For example (0,1) lies in A x B but not B x A. (1 mark.)
```

Concept: Compute membership one element at a time; ordered pairs in a Cartesian product have a fixed orientation.

</details>

