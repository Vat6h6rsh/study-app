Write TEACHER-STYLE LESSONS for Discrete Mathematics practice questions in the study app at Y:\bits-assignments\Bits_res\study-app. The student's DM exam is TODAY; they say they are lost in this subject and will read these lessons to learn how every question is solved. Read AGENTS.md (rules), content/dm/00-exam-format.md (how to type maths in the exam), content/dm/slot1-pattern.md, and the relevant Learn notes in content/dm/concepts/ for terminology. Do NOT edit any existing file. Do NOT run git. Work fast but be accurate.

YOUR SLICE: __SLICE__
Questions live in src/data/dm/slot1-pattern.json (array) and inside src/data/dm/mocks.json (mocks dm-mock-4 and dm-mock-5, field `questions`). Each question has prompt, answer/columns/key fields and a `solution` (the verified model solution). The answers are VERIFIED: never change or contradict them; explain them. If you believe a key is wrong, do not change it; flag it in your report with the reason.

OUTPUT: create ONE new file `tmp-patches/__NAME__.json`: a JSON array of `{ "id": "<question id>", "lesson": "<markdown>" }`, one per question in your slice. Valid JSON (escape newlines as \n), UTF-8. Use Python with encoding='utf-8' or your file tools; never PowerShell Set-Content.

## The lesson (Markdown, about 250-600 words; write like a patient teacher talking to a beginner)
Use exactly these headings (### level):
### What the question is asking
Plain-English restatement; name the topic and what the final answer must contain.
### What you need to know first
The concept(s) from zero, defined simply, with a tiny example (e.g. what p -> q means and its one false case; what an equivalence class is; LUB = least upper bound = the smallest element above both; characteristic equation; Kruskal = always take the cheapest edge that doesn't make a cycle).
### Solving it step by step
Numbered steps that walk through THIS question's actual numbers, saying WHAT is done and WHY at each step (e.g. "we split 64 = 7 + 57 because we need the same multiplier on both terms so the hypothesis bracket can be factored out"). Show the intermediate values. For truth tables: build columns innermost-first and explain the pattern (where the F rows come from); include the full table. For posets: levels, cover edges, how each LUB/GLB was found (lcm/gcd in divisor posets when present, otherwise from the diagram). For equivalence relations: check reflexive/symmetric/transitive or list classes and why each element is in its class, count them. For recurrences: characteristic equation and how it factors, roots and multiplicity, homogeneous form, the particular-solution guess and why (incl. the multiply-by-n rule), solving for coefficients, constants from initial conditions, self-check with a computed term. For MST: sort edges, each edge added or rejected and why (cycle), stop at V-1 edges, total weight. For sets: compute each set operation explicitly.
### How to write it in the exam
The exam-ready typed answer (concise, in the plain-text notation from 00-exam-format.md), the way it would earn full marks. For induction ALWAYS the full 5-part proof (statement, basis, hypothesis, inductive step with algebra, conclusion sentence).
### Common mistakes
3-5 bullets specific to this question type.
### Check yourself
1-2 quick questions with answers (e.g. "What would change if ...? Answer: ...").
Vary the explanations naturally between similar questions (the student reads many on the same topic; each should reinforce the method from a slightly different angle), but always accurate.

## Self-check before finishing
Run a small Python script (in tmp-patches/, delete it after) that loads your output and asserts: every id in your slice present exactly once, each lesson has all six headings, 150-900 words, valid JSON. Report: number of lessons written and any suspected key problems.
