Add a "Learn" feature to this existing Vite+React+TS exam-practice app (you built it earlier; read README.md and src/ first). No network: do NOT add npm dependencies.

The student is a near-beginner in C, exam in 2 days (5 questions x ~10 fill-in-the-blanks in C code; no theory). They want to understand concepts, not just memorise answers.

1. Write concept notes as Markdown files in ../docs/itp/concepts/ (create the folder; one file per topic, numbered in study order, e.g. 01-basics-operators.md, 02-loops-digits.md, 03-arrays-1d-search-sort.md, 04-2d-arrays.md, 05-strings.md, 06-functions-recursion.md, 07-pointers.md, 08-structs-typedef.md, 09-dynamic-memory.md, 10-file-handling.md, plus 00-how-to-attack-blanks.md and 99-idioms-cheatsheet.md). Use the topic ids already used by the question data so the app can link them.
   Each topic file must contain, written for a beginner, concise but complete:
   - Concept from zero, and WHY it works that way (memory model where relevant: addresses, arrays decaying to pointers, '\0', stack vs heap).
   - "Blank-spotting tips": how to deduce what a blank must be from surrounding clues (declared types, later printf/scanf uses, '.' vs '->', loop bounds from array sizes, what a function returns, which header a function needs, format specifiers).
   - Common traps / wrong answers that look right, and why they're wrong.
   - 1-2 worked examples in exam style (code with blanks -> answer -> reasoning), drawn from the patterns in ../Sem 1 Term 1/Intro to Programming/Exam Prep/question_bank.md.
   - A "must memorise" mini list of idioms for that topic.
   00-how-to-attack-blanks.md: general exam strategy for fill-in-the-blank C (read whole program first, use sample output, partial marks, time per question, check semicolons, etc.).
   Accuracy is critical: compile+run every complete code example with gcc (on PATH or under %LOCALAPPDATA%\Microsoft\WinGet\Packages\BrechtSanders.WinLibs*\mingw64\bin\gcc.exe) and fix anything wrong.
2. In the app: add a "Learn" tab. Import the Markdown files via Vite `?raw` imports (import.meta.glob with query '?raw', eager) and render them with a small built-in markdown renderer (headings, paragraphs, lists, bold/italic/inline code, fenced code blocks, tables). Show a topic sidebar in study order; each topic page ends with a "Practice this topic" button that opens practice mode filtered to that topic, and the practice question feedback should show a "Review concept" link to the relevant topic.
3. Keep all existing checks passing (npm run verify:content, check:behavior, build). Update README.md briefly. Don't touch other files outside this folder except creating ../docs/itp/concepts/.
