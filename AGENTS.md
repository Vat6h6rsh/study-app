# AGENTS.md: Examdesk (study-app)

Read this first. It is the handover for any agent (human or AI) picking up this app, now or years from now. It records **what exists, why it was built that way, how to verify changes, and the traps already hit**. Keep it current: when you finish a meaningful piece of work, update §4 (state), §8 (timeline) and §9 (backlog).

## 1. What this is and who it's for
- A personal exam-practice web app for a **BITS Pilani Online B.Sc. Computer Science** student (Sem 1, Term 1, Nov 2026). The student also shares it with classmates. It will grow with future terms: more subjects get added the same way.
- Subjects so far: **ITP** (BCS ZC313, Introduction to Programming, C), **WP** (BCS ZC239, Writing Practice), **DM** (BCS ZC219, Discrete Mathematics).
- Exams: ITP and WP sat **21 Nov 2026** (went well). DM on **28 Nov 2026**.
- Deployed on **Vercel** from GitHub `Vat6h6rsh/study-app`; every push to `main` redeploys. **Used mostly on a phone**, so mobile layout and navigation matter most.
- The student learns best by being taught from zero and then drilled. Content style: plain English, step by step, worked examples, traps, then practice.
- Built from 19 Nov 2026 by one manager agent (Claude Code) delegating heavy work to **Codex CLI (`gpt-6.1-sol`)** and, when Codex usage ran out, **Sonnet subagents**. The manager verified every result and made the commits.

## 2. House rules (must follow)
1. **Commits: no `Co-Authored-By` or any attribution lines.** Clear messages. When the user asks for one combined commit, batch.
2. **Accuracy over volume.** Every auto-graded answer is machine-verified: C answers compiled and run with gcc (`npm run verify:content`); maths keys recomputed (`scripts/verify-dm*.mjs`). Never ship unverified keys.
3. **Real exam papers the student sat are not published verbatim.** The local file `Bits_res/docs/agent-prompts/assesment.md` (outside the repo) holds them: never copy it into the repo. Practising from the *patterns* is fine: the course openly discusses questions and the user explicitly asked for exam-pattern practice ("Exam pattern practice (based on the 21 Nov paper)").
4. **UI standard:** `../ui-ux-learning-guide.md` (Bits_res root, outside the repo). Audit history: `content/study-app-ui-audit.md`. Keep the 4 themes, accessibility, reduced-motion handling and AA contrast (asserted in `scripts/check-ui.mjs`).
5. **No new npm dependencies** unless truly needed (agents usually had no network). Plain CSS, small hand-written components.
6. **Mobile first.** Check 390px width; no horizontal page overflow.
7. **Never leave a blank answer leaking:** comments, briefs and concept notes must not contain a blank's accepted answer (checked by verify-content).

## 3. Architecture
- **Stack:** Vite + React + TypeScript, plain CSS (`src/index.css`, theme tokens on `:root[data-theme=…]`). No router: view state lives in the URL query (`?view=home|learn|practice|exam|scratch&topic=…`) with history support.
- **Shell:** `App.tsx` (views, subject switch), `Sidebar.tsx` (desktop sidebar, collapsible; theme switcher), `TabBar.tsx` (mobile bottom tabs), `Sheet.tsx` (mobile sheets), `src/lib/viewport.ts`, `src/preferences.ts` (theme/sidebar), `src/topicColors.ts`, `src/streak.ts`.
- **ITP practice:** `CodeQuestion.tsx` = two panes: program with `Blank1..10` chips (and an **Explain code** switch showing per-line comments) | 10 password-style answer boxes with eye reveal and live red/green. `QuestionBrief.tsx` ("What this program does"), `ConceptNote.tsx` (concept fold-out with link to Learn), `TopicPicker.tsx` + `src/lib/practiceNavigation.ts` (grouping by Learn order, Core/Extra), `src/lib/practice.ts`, `src/lib/grading.ts` (normalised per-blank marking), `Report.tsx` (marked reports), `Delight.tsx` (confetti, shake, streak).
- **WP:** `WPQuestion.tsx`, `WPExams.tsx`, `Chart.tsx` (SVG charts + data tables), `src/lib/wp.ts`.
- **Learn:** `Learn.tsx` renders Markdown notes from `content/<subject>/concepts/*.md`, loaded by `src/data/concepts.ts` via `import.meta.glob(..., '?raw')`. Each note must begin with `# Title` then a line ``Topic ID: `id` ``. Callout lines `Tip:` `Trap:` `Remember:` `Note:` render as coloured boxes.
- **Data:** `src/data/<subject>/*.json`; types in `src/data/types.ts` (DM may add `src/data/dm/types.ts`); schema documented in `src/data/README.md`. ITP files: `past.json` (from past papers), `original.json` (written practice, incl. exam-pattern set), `mocks.json` (mock-only questions), `papers.json` (mock paper definitions), `methods.json` (method-coverage catalogue), `verification.json` (last gcc run).
- **Dev-only server plugins** (`vite.config.ts`, `server/`): `/api/run-c` (gcc runner for the Scratchpad) and `/api/save-writing` (saves WP answers to `content/wp/submissions/`, gitignored). They do not exist on Vercel; the UI shows a clear message.
- **Progress** is localStorage per device (wrapped in try/catch).
- **Source material** (past-paper PDFs, extracted text, course notes) lives OUTSIDE the repo in `Bits_res/Sem 1 Term 1/<Subject>/` (`Exam Prep/text/*.txt` are pdftotext extractions). A fresh clone does not have it; ask the user for it if needed.

## 4. Current state (21 Nov 2026)
- **ITP:** 71 past-paper questions, 97 original (including 77 added on 21 Nov: 43 Core / 34 Extra exam-pattern questions), 30 mock questions (Mocks A–F). Every fill-in program has **exactly 10 blanks**, a brief, expected output, `priority: core|extra`, `methods` tags, beginner `explanations` and (being merged) a `concept` note. **197/197 runnable questions verified with gcc.** Method coverage: 148 methods, all starred methods covered twice (`content/itp/method-coverage.md`). 13 Learn notes.
- **WP:** 38 past tasks, 120 original (writing tasks, abstract parts, grammar rewrites, 60 drills), 3 mocks in the instructor's 50-mark Q1A–Q5B format. 12 notes + cheatsheet. Format: `content/wp/00-exam-format.md`.
- **DM:** content being produced (notes, auto-gradable question types: truth tables, formulas, MST edge sequences, poset sets, partitions; step-by-step proofs with rubrics; 3 mocks) under `content/dm/` and `src/data/dm/`, verified by `scripts/verify-dm*.mjs`. **UI integration not yet built** (see §9).
- Study docs for the student: `content/README.md`, `content/exam-day-plan.md`, `content/itp/progress.md`, question banks as Markdown in `content/*/question-bank.md`.

## 5. Definition of done: verify before every commit
Run from an **upper-case** `Y:\…\study-app` path (see §6):
```
npm run verify:content     # ITP structure + gcc compile/run of every runnable question; WP validation
npm run check:behavior     # marking logic, storage
node scripts/check-ui.mjs  # contrast (all 4 themes), render/UI assertions, WP UI checks
npm run build              # tsc + vite build
```
Plus subject-specific verifiers (e.g. `node scripts/verify-dm-math.mjs`, `verify-dm-build.mjs`, `verify-itp-methods.mjs`, `verify-concepts.mjs`) and browser checks (`scripts/check-two-pane-browser.mjs`) where relevant.
- gcc: WinLibs via winget at `%LOCALAPPDATA%\Microsoft\WinGet\Packages\BrechtSanders.WinLibs.POSIX.UCRT_Microsoft.Winget.Source_8wekyb3d8bbwe\mingw64\bin\gcc.exe` (also on PATH in new terminals).
- If `src/data/itp/verification.json` changed only its timestamp, revert it before committing.
- Regenerate Markdown exports after content changes (e.g. `node scripts/export-wp-bank.mjs`).

## 6. Known pitfalls (already hit; don't repeat)
- **Drive-letter casing:** running node scripts from `y:\` (lower case) loads React twice → "Invalid hook call" in render checks. Use `Y:\`.
- **PowerShell 5.1 `Get-Content`/`Set-Content` corrupts UTF-8** (reads as ANSI, writes double-encoded: `·` → `Â·`). Use file-edit tools or Python with `encoding='utf-8'`. Repair: `s.encode('cp1252').decode('utf-8')`.
- **Python escapes:** writing `'\0'` inside a normal Python string produced real NUL bytes in a Markdown file. Use raw strings or byte-level fixes.
- **Codex sandbox (`-s workspace-write`) blocks gcc and writes to `.git`**, and sometimes edits to files outside the workspace. Pattern that works: Codex writes code/content and runs non-gcc checks; the manager runs gcc verification and commits. For audit appendices, have agents write a separate file and merge it.
- **Parallel agents must own disjoint files.** For bulk content edits on shared JSON, have each agent write `tmp-patches/<slice>.json` and merge by id afterwards (merge script pattern: apply, re-check leaks and line numbers, then delete `tmp-patches/`).
- **Codex usage limits** reset after hours; fall back to Sonnet subagents (high effort) instead of stalling.
- **Notes must live inside the repo** (`content/`): Vercel builds only the repo; a glob pointing outside silently yields no notes.
- **Bash heredocs with quotes** broke a prompt launch once; write prompts to files and pipe them: `Get-Content -Raw -Encoding UTF8 prompt.md | codex exec --skip-git-repo-check -s workspace-write -m gpt-6.1-sol -c model_reasoning_effort=xhigh -`.
- CRLF warnings from git are harmless.
- Agents' browser QA is limited (Chrome access often blocked); layout is checked with scripted render/iframe checks. Real-device checks (iOS keyboard, screen readers) are still owed.

## 7. How work was run (and should continue)
- Prompts for every delegated job are archived in `docs/agent-history/` (index in its README) so the reasoning behind each feature is recoverable. Write new prompts there before launching.
- Pattern: manager writes a precise prompt (goal, constraints, file ownership, definition of done) → agent works in the background → manager verifies with the checks above, fixes or re-delegates, commits.
- Content always cites its source: `source` field ("Past paper 4 Q6", "Original", "Exam pattern"), and Core/Extra priority reflects what has actually been asked (past papers + the 21 Nov paper).

## 8. Timeline
- **19 Nov 2026:** topic-sorted ITP question bank from 5 past papers; app scaffolded; ITP practice, mocks, C scratchpad; all answers gcc-verified; Learn tab with 13 notes; UI audit against the guide (502 items) and fixes; 4 themes, collapsible sidebar, topic colours, confetti/shake, streaks; "What this program does" briefs.
- **20 Nov 2026:** WP subject built around the instructor's 50-mark format (notes, 185 tasks, mocks, save-for-grading); WP cheatsheet and question bank; notes moved into `content/` for Vercel; mobile navigation (sticky top bar, bottom tab bar, sheets, Learn/Practice flow).
- **21 Nov 2026:** ITP and WP exams sat. ITP practice rebuilt as two panes with exactly 10 blanks, password-style answer boxes, Explain-code comments; expected output under programs; 77 exam-pattern questions + method coverage (148 methods) + Core/Extra + topic grouping + Mocks D/E/F; beginner-level comments and concept notes rewritten in parallel slices; reveal fills the program + Reveal all; DM content job started (exam 28 Nov).

## 9. Backlog / next steps
- Merge `tmp-patches/` (ITP comments + concept notes), set `REQUIRE_CONCEPT = true` in `scripts/verify-content.mjs`, run §5, commit.
- **DM UI integration**: renderers for the DM question types (truth-table grid, formula evaluator, MST edge-sequence builder with SVG graph, set/partition inputs, properties checkboxes, steps + rubric), Learn/Practice/Mock wiring, DM active in the subject list, checks. Then DM exam-day plan.
- Real-device QA on a phone (iOS Safari keyboard, Android, screen reader).
- Main JS chunk is ~1 MB: code-split per subject.
- Future terms: add a subject = `src/data/<id>/`, `content/<id>/concepts/`, a subject entry (active), types/renderers if new question types, verifiers, and update this file.
