Build a local exam-practice web app in THIS folder (an already-scaffolded Vite + React + TypeScript project; deps installed; no network available, so do NOT add new npm dependencies - use only react/react-dom and plain CSS).

PURPOSE: a student has a computer-based C programming exam (BITS BCS ZC313 Introduction to Programming) in 2 days. Format: 5 questions, each a C program with ~10 fill-in-the-blanks, ~30 min per question, partial marks per blank (no partial within a blank). No theory, no flowcharts. Later the app will gain other subjects (DM = Discrete Maths, WP = Writing Practice), so make it subject-driven.

SOURCE MATERIAL: "../Sem 1 Term 1/Intro to Programming/Exam Prep/question_bank.md" (topic-sorted past-paper questions with verified answers) and ../Sem 1 Term 1/Intro to Programming/Exam Prep/papers_text/*.txt (raw papers).

FEATURES
1. Home: subject picker (ITP active; DM, WP shown as "coming soon"), topic dashboard showing accuracy per topic from saved progress, and a "weakest topics" list.
2. Practice mode: pick a topic (or "all" / "only my mistakes"). Question types:
   - "blanks": C code rendered monospace with inline <input>s where blanks are; label each blank (A, B, ...). Submit -> per-blank right/wrong, score x/N, show correct answers + explanation per blank. Comparison: normalise by stripping all whitespace and trailing semicolons; each blank has a list of accepted answers. Also add an "I was actually right" override per blank (code answers can be equivalent).
   - "output": predict exact program output (textarea); compare after trimming each line's trailing whitespace; show step-by-step trace explanation.
3. Mock exam mode: 5 questions x ~10 blanks, a countdown timer (2.5 h total, show per-question 30 min pace), no feedback until "Submit exam", then a full marked report. Provide at least 3 distinct mock papers.
4. Run-C scratchpad page: a code textarea (Tab inserts 4 spaces) + stdin box + Run button. Implement via a Vite dev-server plugin in vite.config.ts exposing POST /api/run-c {code, stdin} -> writes to os.tmpdir() unique dir, compiles with gcc (-std=c11 -Wall), runs with 5 s timeout, returns {compileOutput, stdout, stderr, exitCode}. Find gcc via PATH; if absent also search %LOCALAPPDATA%\Microsoft\WinGet\Packages\BrechtSanders.WinLibs*\mingw64\bin\gcc.exe. If no gcc, show a clear message. In practice mode, add a "Run with my answers" button that substitutes the student's blanks into the code and runs it in the scratchpad (only for questions marked runnable).
5. Progress persisted in localStorage (wrap in try/catch): attempts, per-blank results, per-topic accuracy, mistakes list. Reset button.
6. Clean, readable UI with dark mode via prefers-color-scheme; works on laptop width. Keyboard friendly (Enter moves to next blank).

CONTENT (most important - accuracy over quantity):
- Data lives in src/data/<subject>/ as TypeScript or JSON modules; one schema documented in src/data/README.md so new subjects/questions can be added easily.
- ITP: convert EVERY non-SKIP code question from question_bank.md into blanks/output questions (tag topic, source like "p4 Q6", difficulty). Where the original had only 2-4 blanks, it's fine as is.
- Then write at least 25 NEW original questions in the exam style, each with 8-12 blanks, weighted to: structs/typedef/array of structs, pointers & ->, malloc/calloc/free, 2D arrays, strings (strlen/strcpy/strcmp/toupper, manual loops), file handling (fopen modes, fgets/fputs/fscanf/fprintf/fclose, EOF/NULL checks), functions & call by reference, recursion, loops/digit algorithms, sorting/searching. Also ~10 short output-prediction questions on ++/--, integer division, %, pointer arithmetic, scope.
- The 3 mock papers should be built from new questions (not shared with practice pool, or clearly separate) at real-exam difficulty.
- VERIFY: for every runnable question, substitute the accepted answer and compile+run with gcc if gcc is available (check PATH and the WinGet path above; it may be installing right now - retry later in your run). Fix any question whose answer doesn't compile or produces the wrong output. For output questions, confirm the expected output by running. Report how many were verified.

Finally: make sure `npm run build` passes (tsc + vite build). Write a short README.md (how to run: npm run dev; how to add a subject/question). Do not touch anything outside this folder.
