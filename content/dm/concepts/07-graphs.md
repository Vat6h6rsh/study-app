# Graphs: degrees, paths, connectivity, planarity and coloring

Topic ID: `graphs`

## Vocabulary and degree

A simple undirected graph has vertices and edges between distinct unordered pairs, with no loops or repeated edges. A directed graph uses ordered pairs (arcs); state whether loops are allowed. An undirected loop contributes 2 to degree. The degree sequence sorts degrees nonincreasingly.

The handshake theorem is `sum deg(v)=2*|E|`, so the number of odd-degree vertices is even. In a directed graph, total indegree and total outdegree both equal |E|. For v>0 vertices, minimum degree m and maximum degree M satisfy `m<=2*e/v<=M`: sum the bounds over all vertices, then divide by v.

| Graph (convention) | Vertices | Edges | Degrees |
| --- | --- | --- | --- |
| K_n | n | n*(n-1)/2 | all n-1 |
| C_n, n>=3 | n | n | all 2 |
| W_n = C_n plus hub, n>=3 | n+1 | 2*n | hub n, rim 3 |
| K_m,n | m+n | m*n | m vertices of degree n, n of degree m |
| Q_n, n>=1 | 2^n | n*2^(n-1) | all n |

For Q_n, vertices are n-bit strings, adjacent iff exactly one bit differs. Q_0 is one isolated vertex and has 0 edges. Wheel subscripts vary between books; this course convention matches the past-paper W4 degree sequence (4,3,3,3,3).

## Connectivity and isomorphism

A walk may repeat vertices and edges. A trail does not repeat edges. A path does not repeat vertices. A circuit is a closed trail; in the elementary cycle questions here, the intended circuit is a simple cycle. A connected undirected graph has a path between every pair. Components are maximal connected vertex sets.

An isomorphism is a bijection of vertices that preserves adjacency in both directions. To prove one, give the mapping and check edges/nonedges. To disprove one, find an invariant that differs: vertex/edge counts, degrees, components, cycles, bipartiteness. Equal degree sequences alone do not prove isomorphism.

```text
Step 1: C6 and two disjoint triangles both have degree sequence
(2,2,2,2,2,2).
Step 2: C6 is connected; two triangles have two components.
Step 3: An isomorphism preserves connectedness. Therefore these
graphs are not isomorphic, despite equal degree sequences.
```

A cut edge (bridge) increases the component count when removed. It lies on no simple cycle: a cycle supplies an alternate endpoint route, and any alternate route together with the edge creates a cycle. A cut vertex increases the component count when it and its incident edges are removed. Count components before and after; do not just count isolated vertices.

## Directed reachability and SCCs

u and v are mutually reachable if paths exist both ways. A strongly connected component is a maximal mutually reachable set. Paths of length 0 make a vertex reachable from itself. Reachability is transitive by concatenating walks and removing repeated-vertex cycles. If x lies on a path from u to v and u,v are in one SCC, then u reaches x, while x reaches v and v reaches u; hence x is in that SCC.

## Euler and Hamilton

| Task | Must use | Undirected test / caution |
| --- | --- | --- |
| Euler circuit | every edge once; closed | all non-isolated vertices connected and every degree even |
| Open Euler trail | every edge once; endpoints different | all non-isolated vertices connected and exactly two odd degrees |
| Hamilton path | every vertex once | no general degree-parity criterion |
| Hamilton circuit | every vertex once, then return | a bipartite graph needs equal part sizes |

An Euler circuit can revisit vertices. A Hamilton circuit can leave edges unused. For finite nonempty connected graphs, a Hamilton path itself forms a spanning tree, but a spanning tree does not guarantee a Hamilton path: K1,3 has three leaves and a path only two endpoints.

```text
For K2,3:
Step 1: Degrees are (3,3,2,2,2), so there are two odd vertices.
Step 2: The graph is connected; an open Euler trail exists, but
an Euler circuit does not.
Step 3: Every step in a bipartite circuit alternates between parts.
The parts have sizes 2 and 3, so no Hamilton circuit exists.
```

## Planar graphs

Planar means admitting an embedding without crossing edges, not that one supplied drawing has no crossings. For a connected planar embedding, `v-e+f=2`, counting the outer face. With c components it is `v-e+f=1+c`. For a simple planar graph with v>=3, `e<=3*v-6`. If bipartite, `e<=2*v-4`. Satisfying these bounds is necessary, not sufficient for planarity.

K5 violates 10<=9. K3,3 violates 9<=8 for bipartite planar graphs. Therefore both are nonplanar. A planar graph can be colored with at most four colors, but the converse fails: K3,3 has chromatic number 2 and is nonplanar.

## Coloring and bipartite graphs

A proper coloring assigns different colors to adjacent vertices. The chromatic number is the minimum number of colors. K_n needs n; C_n needs 2 for even n and 3 for odd n. A graph is bipartite iff it has no odd cycle. A nonempty edgeless graph has chromatic number 1; a bipartite graph with an edge has chromatic number 2. For W_n, use one new hub color: chromatic number 3 if n is even, 4 if n is odd.

To show an odd cycle cannot use two colors, alternate along its edges. The last vertex receives the same color as the first, although they are adjacent, giving a contradiction.

## Complements and graph counts

For simple G and its complement on n vertices, `|E(G)|+|E(complement G)|=n*(n-1)/2`; each pair is an edge in exactly one. Also `deg_G(v)+deg_complement(v)=n-1`.

```text
G has 20 edges and its complement has 16.
Step 1: n*(n-1)/2=36.
Step 2: n^2-n-72=(n-9)*(n+8)=0.
Step 3: Reject n=-8. Thus n=9 vertices.
```

For fixed labelled vertices, there are `2^(n*(n-1)/2)` simple loopless undirected graphs, `2^(n*(n-1))` loopless directed graphs, and `2^(n^2)` directed graphs allowing loops without parallel arcs. These count labelled graphs, not isomorphism classes.

Tip: Check counts, parity and connectedness before attempting a long construction.

Trap: An even number of odd degrees is necessary for a degree sequence but does not alone prove it is graphical.

Remember: Euler uses edges; Hamilton uses vertices. Necessary conditions are not automatically sufficient.

Note: An isolated vertex does not obstruct an edge-covering Euler traversal on the other vertices. The bank's automated Eulerian examples are connected graphs with no isolates.
