# Trees, spanning trees and minimum spanning trees

Topic ID: `mst`

## Trees first

A tree is a connected undirected graph with no cycles. A tree with n vertices has n-1 edges and a unique simple path between any two vertices. Removing any tree edge disconnects it; adding an edge between two tree vertices creates a cycle. A spanning tree uses every vertex of the original connected graph and a subset of its edges. A disconnected graph has no spanning tree, but has a spanning forest.

An MST is a spanning tree of minimum total edge weight. It minimises the sum of all chosen weights, not the distance from a start vertex. Negative weights do not invalidate Prim or Kruskal. Distinct edge weights ensure a unique MST; ties may or may not lead to different MSTs.

## Kruskal's method

1. Sort all edges by nondecreasing weight.
2. Start with each vertex as a separate component.
3. Take a lightest remaining edge that joins different components; reject an edge whose endpoints are already connected.
4. Stop after n-1 accepted edges, once every vertex is connected.
5. State the selected edges and total weight.

The reason is the cut property: a lightest edge crossing an appropriate component cut can safely belong to an MST. An accepted edge cannot create a cycle. Rejected candidates may be mentioned in prose but are not entered into the bank's accepted-edge trace.

## Prim's method

Choose the prescribed start vertex. Repeatedly choose a minimum-weight edge with exactly one endpoint in the reached set. Add that edge and its new endpoint. An edge with two unreached endpoints is ineligible, however cheap it is; an edge with two reached endpoints creates a cycle. Stop after n-1 accepted edges and state the sum. Prim also follows the cut property.

## Fully worked typed answers

Use V={A,B,C,D,E}; edges AB(1), AC(4), BC(2), BD(5), CD(3), CE(6), DE(2).

```text
Kruskal:
Step 1: add edge AB (weight 1). It joins components {A} and {B}.
Step 2: add edge BC (weight 2). It joins {A,B} to {C}.
Step 3: add edge DE (weight 2). It joins {D} and {E}.
Step 4: add edge CD (weight 3). It joins {A,B,C} to {D,E}.
Finally all five vertices are connected using four edges, so this
is the MST by Kruskal's algorithm; total weight = 1+2+2+3 = 8.
```

The two weight-2 edges may be interchanged in that Kruskal run. Both orders obey the component and minimum-weight rules.

```text
Prim, start A:
Step 1: add edge AB (weight 1), the cheapest edge leaving {A}.
Reached={A,B}.
Step 2: add edge BC (weight 2), the cheapest crossing edge.
Reached={A,B,C}.
Step 3: add edge CD (weight 3), the cheapest crossing edge.
Reached={A,B,C,D}.
Step 4: add edge DE (weight 2), the cheapest crossing edge.
Reached={A,B,C,D,E}.
Finally all five vertices are connected, so this is the MST by
Prim's algorithm; total weight = 1+2+3+2 = 8.
```

Prim's accepted weights need not be nondecreasing: the final weight 2 becomes eligible only after D is reached. That is why an MST edge set alone does not establish a valid Prim trace.

## Ties, checking and exam style

If several eligible edges share the minimum weight, any is allowed. State your choice; continue checking components or the reached cut after each addition. A different valid MST can have the same optimal total. The verifier accepts all valid tie orders, not only the printed model sequence. It rejects a trace that happens to be an MST but violates the stated algorithm along the way.

Tip: Keep a component list for Kruskal and a reached set for Prim after every accepted edge.

Trap: n-1 edges without connectedness need not form a spanning tree. “Pick the smallest unused edge” is insufficient for Prim.

Remember: The professor requires numbered additions and the total weight. No diagram is required for an MST answer.

Note: Source graph PNGs are stored in public/dm/source-images; the same graphs are also transcribed into vertices and weighted edges for SVG drawing and verification.
