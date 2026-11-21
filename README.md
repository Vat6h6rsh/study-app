# Examdesk

Local BITS exam practice for **ITP (BCS ZC313)** and **Writing Practice (BCS ZC239)**. Select a subject in the sidebar; the choice persists. DM remains coming soon. React + TypeScript + plain CSS, with no added npm dependencies or external network calls.

Run from this folder:

```text
npm run dev
```

Open the localhost URL Vite prints. On PowerShell systems that block `npm.ps1`, use `npm.cmd run dev` (likewise for other commands).

The app includes topic accuracy and weakest topics, inline completion marking and self-overrides, exact-output drills with traces, mistakes review, three timed mock papers, and a GCC scratchpad. Progress and the current exam are saved in this browser with guarded localStorage access. Reset saved progress in the sidebar. The exam deadline survives reloads; it submits automatically at 2.5 hours and shows a 30-minute pace for each question.

**Learn** adds a beginner's two-day study route: 11 topic lessons in study order, an exam strategy guide and an idioms cheatsheet. Search notes, reveal worked answers with reasoning, practise the matching topic, or open a completed example in the scratchpad to experiment. Practice questions and marked reports link to their topic notes; navigating to Learn and back through Practice preserves your current answers. Notes are the Markdown files in [../docs/itp/concepts/](../docs/itp/concepts/), bundled locally with no added dependencies. Their `Topic ID` fields match the question data (including `scope`). The small renderer supports headings, paragraphs, lists, inline code/bold and fenced code; HTML is escaped.

Content: **71 past-paper exercises covering all 69 non-SKIP bank sections, 25 original 10-blank practice programs, 10 original output drills, and 15 exclusive mock questions** (3 papers × 50 blanks). All 86 completion programs now have exactly ten blanks, including 46 extended past-paper programs; completed source and output exercises are preserved. Submitted mocks become clearly labelled review questions. The source's undefined signed-overflow loop is retained as non-runnable, with an explanation. Repairs and added test drivers are labelled.

ITP practice uses a source window beside a labelled answer panel, stacking on phones with Program/Answers jump controls. Answers validate after a short typing pause; the eye reveals a key while giving up that blank's mark. Ten unrevealed correct answers check the attempt and update the streak automatically. Explain code adds beginner-friendly comments above source lines and remembers the practice preference. Mocks use neutral fields, no reveals and explanations OFF initially; marking and accepted keys appear after submission. No npm dependencies or external resources are needed. `check:ui` also runs real Chromium layout/interaction checks when Chrome/Edge is installed (or `CHROME_PATH` is set), including 390px reflow in all four themes.

The scratchpad requires local GCC. The runner checks PATH on each Run and also `%LOCALAPPDATA%\Microsoft\WinGet\Packages\BrechtSanders.WinLibs*\mingw64\bin\gcc.exe`. If absent, it explains what is missing; try again after installation. It compiles with `-std=c11 -Wall`, runs in a unique temporary folder with a 5-second execution timeout, caps output, and removes its temporary files. Run trusted C code: this is a local compiler, not a security sandbox. Run-C is a **Vite dev-server feature**; `npm run preview` serves the built UI without the runner.

Checks:

```text
npm run build
npm run check:behavior
npm run check:ui
npm run verify:content
npm run verify:concepts
node scripts/check-server.mjs
node scripts/check-render.mjs
```

The server check needs the dev server running. The render check exercises the dashboard, all 121 question/report views, and scratchpad through React server rendering. The content verifier substitutes canonical answers, compiles/runs all runnable questions when GCC is present, compares worked stdout and file expectations, and writes `src/data/itp/verification.json`. Append `-- --require-gcc` to enforce compiler availability.

The concept verifier reads every complete C example directly from the Markdown, substitutes its `Answers:` line, and compares stdout against its following `text` fence using the same local GCC runner. It writes `src/data/itp/concept-verification.json` and **fails if GCC is absent**; `-- --allow-missing-gcc` permits a structural-only check. If your running dev server has GCC but the current shell does not, use `npm run verify:concepts -- --runner-url=http://127.0.0.1:5173` (only loopback HTTP is accepted). All 21 examples have complete drivers and expected output. The render check also covers all 13 notes, topic mappings, collapsed solutions and Markdown escaping.

Current verification: build, structural validation of **121 questions**, marking/storage behavior checks, lesson/question rendering and local HTTP checks pass. **All 21 concept examples compile and run with exact expected stdout and no -Wall diagnostics through the running app's local GCC runner.** The shell cannot find GCC, so the existing content verifier passes structural checks but skips compilation of the 120 runnable bank questions; run it in a shell with GCC for that coverage. Interactive browser QA was unavailable because the browser access host was unavailable and computer use was not approved for Chrome.

To add a subject or question, see [the data schema and authoring guide](src/data/README.md). Project edits stay in this folder except the new concept notes in `../docs/itp/concepts/`; the supplied question bank remains read only.

The [UI/UX audit](../docs/study-app-ui-audit.md) records the supplied guide's numbered checklist, before/after evidence, computed light/dark contrast and remaining browser checks. `check:ui` reads colours directly from CSS and renders the screen/error/result states; it does not replace browser, keyboard or screen-reader testing. Practice drafts survive question/filter changes and trips to Learn or the scratchpad for the current app session. They are not saved across reloads until marked; mock answers retain their existing browser persistence.


## Writing Practice

WP follows the instructor?s upcoming **5-question, 9-part, 50-mark** computer-based format. Mocks assume **2.5 hours**: Q1 6+4, Q2 6+4, Q3 5+5, Q4 10, Q5 4+6. Citations/referencing, article writing and flowcharts are outside this exam. The [exam analysis](../docs/wp/00-exam-analysis.md) maps every historical task and explains changed priorities.

The local WP bank contains **38 past-paper tasks, 60 new full tasks, 60 auto-graded drills and 27 exclusive parts in three mocks**. Twelve Markdown lessons in [../docs/wp/concepts/](../docs/wp/concepts/) cover strategy, each exam skill, academic style and phrases. Past charts include the original extracted images, theme-aware SVGs and accessible data tables. Approximate readings and the traffic chart?s inconsistent axis are clearly labelled.

Writing editors provide word counts, suggested time, planning checklists, saved drafts, self-assessment rubrics and annotated models. Summary/grammar editors support `==highlight==` selections and previews. Abstract components use normalised sentence matching. Grammar shows a word-level diff and correction count with an adjustable provisional score; it is not a general language grader. MCQ and matching drills give per-item explanations and the existing feedback/confetti. In mocks, feedback remains hidden until submission; the deadline continues across navigation and reloads. Writing totals remain provisional until the rubrics are completed.

**Save for grading** requires `npm run dev`. The same-origin, 128 KiB-limited `POST /api/save-writing` endpoint resolves tasks from the local catalog and writes prompt, source/chart data, answer, word count, time and rubric ticks to `../docs/wp/submissions/YYYY-MM-DD_questionId_HHMM.md`. Mocks save all nine parts together. Same-minute saves append a new version without overwriting an answer. The app then shows: ?Saved. Ask Claude: 'grade my latest WP submission'.? Preview/static hosting retains browser drafts but cannot write submission files.

WP checks are included in `node scripts/check-ui.mjs`, `npm run check:behavior` and `npm run verify:content`; `npm run build` bundles all lessons offline. They cover every WP view/key, rubric totals, model lengths, exactly 4+4 questionnaire models, exclusive mock structure, local export validation and highlight/chart contrast in all four themes. `node scripts/check-writing-server.mjs` additionally exercises the actual local HTTP endpoint. ITP?s original checks remain in place. No network resources or new npm dependencies are used.

Final WP checks pass via server rendering and token analysis. Live browser QA was blocked because the browser access host was unavailable and Firefox control was not approved.
