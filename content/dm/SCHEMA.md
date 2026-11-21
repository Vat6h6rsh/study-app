# DM data schema and UI integration

Schema version: **1**. Canonical TypeScript definitions: `src/data/dm/types.ts`. DM types are standalone; they do not import or alter the shared subject types. Content is ready for a later UI adapter. Nothing in this task registers a subject in the shared application.

## Files and entry points

| Path | Shape / role |
| --- | --- |
| `src/data/dm/manifest.json` | Version, exam date, explicit practice file list, coverage counts, mock summaries, source recovery inventory |
| `src/data/dm/{topic}.json` | `Question[]` for that topic; includes originals and past-paper parts |
| `src/data/dm/mocks.json` | `MockPaper[]`; nested fresh questions; never merge into the practice pool |
| `src/data/dm/types.ts` | Discriminated unions and structured mathematical models |
| `content/dm/concepts/*.md` | 13 notes; first line title, then Topic ID; includes strategy and cheatsheet |
| `content/dm/00-exam-analysis.md` | All 64 past-paper parts, frequencies, priorities and provenance caveats |
| `content/dm/00-exam-format.md` | Authoritative guidance and typing conventions |
| `content/dm/question-bank.md` | Every practice question with collapsible solutions; excludes mocks |
| `public/dm/source-images/*.png` | Original embedded raster images, including both MST graphs |
| `scripts/verify-dm.mjs` | Read-only schema, mathematical and coverage verifier; exits nonzero on mismatch |
| `scripts/verify-dm-math.mjs` | Pure checking helpers, safe parsers and finite-model computations |
| `scripts/verify-dm-build.mjs` | Opt-in authoring/rebuild source; writes only DM data and documentation |
| `content/dm/extract-source-images.py` | Reproduces embedded PNG extraction with Python -I, without dependencies |

Use `manifest.practiceFiles` to whitelist practice JSON imports. Do not interpret every JSON file as a question array: the manifest is an object, and mocks are paper objects. A Vite eager JSON glob can collect modules, then the adapter can select filenames from this manifest. Keep practice IDs, mock IDs and checkpoint IDs stable for saved progress.

Topic IDs are `strategy`, `logic`, `proofs`, `induction`, `relations`, `posets`, `recurrences`, `graphs`, `mst`, `counting`, `sets`, `groups`, `cheatsheet`. Strategy and cheatsheet have notes but no practice JSON. Knights/knaves are filed under logic, tagged `knights-knaves`, with priority `past`. The unique-quantifier past question is `extra`. Other logic truth tables are `core`.

## Common question fields

All questions have `id`, `subject: "dm"`, `topic`, `title`, `source` (`Original` or `Past paper N Qm`), `priority` (`core`, `past`, `extra`), `difficulty` (`foundation`, `standard`, `exam`), integer positive `marks`, `prompt`, `solution`, and `conceptNote`.

`solution` is an ordered array of `{step: 1, text: "..."}` objects, numbered consecutively. Render the text with preserved newlines and accessible monospace for tables. Most text omits a literal Step prefix, since `step` supplies the label. MST additions already include the professor's literal `Step 1: add edge ...` wording: avoid adding a duplicate visible prefix. The final MST step includes the algorithm and total sum.

Optional `provenance` contains paper number, exact subpart label, original printed group marks, one-based page number and recovery notes/image. `marks` is the bank item's allocation. If the paper printed a shared mark for several subparts, `provenance.printedMarks` retains that group mark and `marksNote` explicitly labels the bank split editorial. Never sum `printedMarks` across subparts. Paper totals obtained by summing item `marks` are 150,150,150,50,50.

`reconstructed: true` always has `reconstructionNote`. It indicates restored notation from flattened source text, not an unknown computed answer. The three flagged items are P2 Q2 (4^h), P3 Q3 (2^n>=n+12), and P5 Q2 (2^(n+1)<1+(n+1)*2^n). Both MST graphs and the P5 truth-table formulas were visually confirmed from their embedded images, with no reconstructed weights.

`verification` stores independent mathematical input, not just an answer checksum. It can contain a finite relation, graph or counting model. It is valuable to a renderer as well as the verifier. A question's response key lives in its type-specific answer fields; do not show it until review.

## Response types and grading

| Type | Response / data | Checker contract |
| --- | --- | --- |
| `truth-table` | `variables`, `columns`, boolean matrix `answer` | Grade every requested column in every row; answer matrix excludes variable-input columns |
| `formula` | `answer` expression, `testPoints`; optional `recurrence` | Safely evaluate candidate at every supplied n; compare finite results within relative tolerance 1e-9 |
| `numeric` | `answer` number or exact integer string, `tolerance: 0` | Exact match; preserve large integer strings with BigInt |
| `set-answer` | unique string elements, `elementFormat`, `inputHint` | Compare normalised elements ignoring set order; preserve ordered-pair orientation |
| `properties` | `options` and boolean answer record | Grade each listed property, including false ones; do not accept ticking everything |
| `partition` | array of nonempty class arrays | Ignore class order and element order; require each universe element exactly once |
| `mst` | `graph`, `algorithm`, optional `startVertex`, accepted-edge sequence and total | Check each algorithm step and total; accept all valid ties |
| `steps` | numbered model + `rubric`; optional nested `checkpoints` | Human/self assessment of written reasoning; auto-grade checkpoints separately |
| `mcq` | labelled `options`, `correctIndex`; optional `optionValues` | Select one zero-based option; verifier recomputes it from encoded models |

The 50-mark mock score must count its question marks only. Embedded checkpoints are advisory and **do not add marks** to the parent question or mock total. A checkpoint uses the same complete auto-question schema and a globally unique ID. Some rubric steps have zero marks because an old 1- or 2-mark subpart still benefits from a three-step explanation; positive rubric allocations sum exactly to the parent mark. Rubrics are editorial practice guidance, not official schemes.

For tables, enumerate assignments T before F, leftmost variable slowest. For p,q,r use TTT,TTF,TFT,TFF,FTT,FTF,FFT,FFF. Expression columns use `~`, `^` for AND, `v` for inclusive OR, `->`, `<->` and parentheses. Precedence is negation, AND, OR, implication, equivalence. Chained implication is right-associative, but prompts use parentheses where grouping matters. `followUp.compareColumns` names the two complete columns by zero-based index; do not assume the last two are always the intended full statements. The recovered P5 question compares columns 2 and 5.

For arithmetic, support only integers, `n`, `+ - * / ^` and parentheses. Require explicit multiplication: `2*3^n`, not `2(3^n)`. `^` is right-associative. Exponentiation binds more tightly than unary minus: `-2^2=-4`, while `(-2)^2=4`. A submitted formula omits `a_n=`. Reject unknown identifiers, calls, accessors, nonfinite values and trailing tokens. Never use `eval` or `Function`; the dependency-free parser in verify-dm-math.mjs is a reference. Add reasonable input-length and evaluation-work limits in the UI for arbitrary student input. Matching finitely many points is useful feedback, not a symbolic proof.

`recurrence.coefficients[j]` multiplies `a_(n-j-1)`. `initial[i]` is the term at `startIndex+i`; `forcing` is a safe expression in n. A recurrence starts applying after the initial block. The verifier iterates independently to actual n=12, compares the closed form to every term, and tests the stored points. For H_1=1, startIndex is 1: do not invent H_0 as an initial condition.

## Sets, pairs and empty answers

Elements are strings, including numeric labels (`"12"`), subset labels (`"{a,b}"`), ordered pairs (`"(a,c)"`), and nested cover pairs (`"((a,a),(a,c))"`). Split only on commas at bracket/parenthesis depth zero. Strip harmless whitespace around punctuation; do not split inside a pair or set label. A simple `.split(',')` will fail these questions.

Use `NONE` or an explicit empty-answer UI control when the expected array is `[]`. The literal label `{}` is itself an element in the subset poset, so it must remain distinguishable from an empty response. In prose exam answers, “does not exist” is appropriate for missing LUB/GLB. A singleton array `["12"]` represents a unique LUB, while `[]` means none exists. Upper/lower bound arrays can contain multiple elements.

For `elementFormat: "pair"`, order inside each pair matters (lower,upper for a Hasse cover); order of the pairs in the answer does not. For `elementFormat: "edge"`, IDs such as `c-d` represent undirected edges and either endpoint order should be accepted after resolving to the graph edge ID. Do not impose set semantics on a degree sequence; multiplicity matters, which is why the degree-sequence proofs here retain written working.

## Relations, posets and graph rendering

`Relation` is `{elements: string[], pairs: [string,string][]}`. It explicitly includes reflexive and transitive pairs. Derive Hasse covers by removing diagonal pairs and every comparison with an intermediate element. A poset query is minimal/maximal/least/greatest, upper/lower bounds, lub/glb, covers, or strictLower/strictUpper with one pivot (used for lexicographic pair lists). For rendering, derive topological levels from covers; levels plus edges are also provided in written source solutions. Never confuse lexicographic order with coordinatewise product order.

`Graph` includes vertex labels, edges `{id,u,v,weight}`, optional `directed`, `layout` and source `image`. Every edge has a weight, even if it is simply 1 in an unweighted exercise. Layout coordinates are drawing suggestions only (roughly within a 300 by 300 canvas), not mathematical evidence. Label SVG edges with their stored weights for MST. The source PNG is an alternative view; data drives grading.

For Kruskal, at each accepted step the edge must have minimum weight among all edges joining different current components. Cycle-forming candidates may be silently skipped. For Prim, the edge must have minimum weight across the reached/unreached cut, starting at `startVertex`. Require n-1 distinct accepted edges, connectedness and exact total. Check the student's trace against these rules rather than string-equality with the model sequence. A different valid tied sequence is correct; a minimum tree in an invalid Prim order is not a valid trace.

`Eulerian` in stored properties means “has an Euler circuit,” and `Hamiltonian` means “has a Hamilton circuit.” The automated property examples are connected, simple undirected graphs with no isolated vertices; graphFacts currently uses that connected convention. Notes give the more general non-isolated-component Euler condition. Do not reuse the undirected property logic for directed Euler questions. Planarity and arbitrary free-text proofs are not automatically decided by this bank's checker.

## Verification and rebuild

```text
node scripts/verify-dm.mjs
```

The verifier checks field shapes, IDs, metadata, mock totals/coverage, note titles/Topic IDs/callouts, source references and readable-export coverage. It recomputes truth tables; relation properties/classes; poset extrema, bounds, covers and pairwise lattice status; recurrence values through n=12; formula values; numeric/counting keys; and encoded MCQ keys. Counting includes brute-force bit strings, combinations and no-repetition codes, exact BigInt sums for large string counts, and the pigeonhole threshold. Graph checks include exhaustive small-graph coloring, Hamilton-cycle search and deletion-based cut objects.

MST verification validates the actual trace, cross-checks both greedy algorithms, and independently enumerates every n-1-edge subset to confirm minimum total weight. Parser known-answer tests, tie acceptance/rejection cases and in-memory corrupted-key tests guard against a checker that passes everything. No snapshot of a generated answer is treated as sufficient verification.

To rebuild generated JSON and the readable export after editing the authoring source:

```text
node scripts/verify-dm-build.mjs
node scripts/verify-dm.mjs
```

The build overwrites topic JSON, mocks, manifest, analysis, counts and question-bank export. Concept notes, this schema guide, types and verification report are hand-authored and remain separate. Do not run the build after hand-editing generated JSON unless those edits have also been made in its authoring source. There are no new npm dependencies or package.json changes.

## Source limitations

The supplied text files and five local past PDFs are the source corpus. Extracted mathematical symbols were not trusted blindly. PyMuPDF was unavailable under isolated Python and network installation was blocked; native viewer access was also denied. Exact embedded RGB images and masks were recovered with standard-library zlib/PNG code and visually inspected. This recovers the original graphs and image formulas, but is not a full-page PDF rendering. The three superscript reconstructions remain visibly flagged for review. The upcoming format comes from the user's professor guidance, not historical exam covers.
