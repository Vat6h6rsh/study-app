CONTENT TASK for this study app (read src/data/types.ts, src/data/README.md, src/data/itp/*.json, scripts/verify-content.mjs).

Problem: practice questions show code with blanks but don't state clearly what the program is supposed to do, so the student can't infer the formula/condition a blank needs. Real exam questions DO state the task (e.g. "An Armstrong number equals the sum of its digits each cubed").

Do: add a `brief` (type QuestionBrief, already defined in src/data/types.ts - do not change types.ts) to EVERY question in src/data/itp/past.json, original.json, mocks.json (and any other question file):
- goal: 1-2 short plain sentences, what the finished program does.
- rules: 2-6 short bullets giving the formulas, conditions, definitions, loop ranges, data layout (e.g. struct fields, array sizes), file names and modes - everything a student needs to reason out the blanks. State rules as the exam would; do NOT literally write blank answers (e.g. say "a number is Armstrong if the sum of the cubes of its digits equals the number" - fine; don't say "blank C is total == buff").
- sample: input/output exactly as the program prints it (use the question's stdin/expectedOutput when available). For output-prediction questions, omit sample (that's the answer) and keep goal/rules about what to trace.
Use the original paper wording from ../Sem 1 Term 1/Intro to Programming/Exam Prep/papers_text/ for past questions where possible.
Then extend scripts/verify-content.mjs: every question must have a non-empty brief.goal and >=1 rule; where sample.output exists for a runnable question, verify it equals the actual gcc output with accepted answers substituted. gcc is at %LOCALAPPDATA%\Microsoft\WinGet\Packages\BrechtSanders.WinLibs.POSIX.UCRT_Microsoft.Winget.Source_8wekyb3d8bbwe\mingw64\bin\gcc.exe if not on PATH.
Only edit files under src/data/ and scripts/verify-content.mjs and src/data/README.md. Another agent is editing CSS/components concurrently - do NOT touch src/components, src/App.tsx, src/index.css.
Run npm run verify:content and npm run check:behavior; both must pass.
