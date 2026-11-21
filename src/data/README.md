# Question and subject data

The schema is defined in `types.ts`. Register subjects and import their question arrays in `index.ts`. All IDs must be globally unique. Data is bundled locally; no network or account is required.

## Add a subject

1. Create `src/data/<subject-id>/questions.json` (or a TypeScript module).
2. Add a `Subject` in `index.ts`: `id`, `shortName`, `name`, optional `code`, `active`, and `topics` (`id`, `name`, `priority`: `High` or `Medium`). Set `active: true` when content is ready. WP is active; DM remains coming soon.
3. Import its question array and include it in `questions`. Practice, accuracy, mistakes and saved attempts are filtered by `subject` and `topic`. Extend question types/renderers for non-code subjects as needed; renderers implement C completion/output and the WP types described below.
4. Add subject-specific mock papers to `mockPapers` (`id`, `subject`, `title`, `description`, `questionIds`). They are filtered by the active subject. ITP and WP have separate mock sessions and paper structures.

## Question schema

```ts
{
  id: 'itp-example-01',
  subject: 'itp',                 // registered subject ID
  topic: 'loops',                // registered topic ID
  title: 'Accumulate a total',
  source: 'Original',            // or "p4 Q6"; keep all combined sources
  difficulty: 'Foundation',      // Foundation | Exam | Challenge
  pool: 'original',              // past | original | mock
  priority: 'core',              // required on EVERY ITP question: core | extra
  methods: ['array-total'],      // audited IDs in itp/methods.json
  mainMethods: ['array-total'],  // optional 1–3 main algorithms; incidental syntax does not set priority
  set: 'Exam pattern practice (based on the 21 Nov paper)', // optional named set
  pattern: 'P1',                 // optional P1..P5 family, for ordered exam-pattern mocks
  type: 'blanks',                // blanks | output
  prompt: 'Complete the missing expression.',
  concept: 'An accumulator keeps a running total as a loop visits each value. Start from a suitable initial total and update it once per visit.', // optional, answer-free
  code: '#include <stdio.h>\nint main(void) { int s=0; for(int i=1;i<=3;++i) s+=__A__; printf("%d\\n",s); return 0; }\n',
  blanks: [{
    id: 'A',
    accepted: ['i', '(i)'],       // first answer is the canonical runnable key
    explanation: 'Add the current value of i.'
  }],
  expectedOutput: '6\n',         // required for output exercises; used to verify runnable completions too
  trace: ['i=1 gives s=1.', 'i=2 gives s=3.', 'i=3 gives s=6.'],
  notes: 'Optional source corrections and alternative-answer discussion.',
  runnable: true,                // false for intentionally non-executable/undefined fragments
  stdin: '',
  fixtures: { 'input.txt': 'optional contents\n' },
  expectedFiles: { 'result.txt': 'optional expected contents\n' },
  verified: false                // maintained by verify:content; never claim true manually
}
```

Use `__A__`, `__B__`, … `__J__` in `code`, once each in order, with ten matching `blanks` entries (the schema excerpt above is abbreviated). Put punctuation outside a blank where practical. Use complete programs, or add a clearly labelled sample driver to source fragments. Output questions have `blanks: []`, complete code, an `expectedOutput` string (including its exact final newline), and an explicit step-by-step `trace`.

One correct blank earns one mark. Comparison removes all whitespace and final semicolons, then matches any accepted spelling. It does not reason about semantic equivalence. Students can override an incorrect mark after submission; the original entered answer is retained. Output comparison converts CRLF to LF and removes spaces/tabs at each line's end. Leading whitespace, blank lines, and the presence of a final newline still matter.

Fixtures use simple filenames only. The verifier seeds them in the disposable working directory and checks `expectedFiles`. The scratchpad includes a visible C harness that seeds these files and displays resulting file contents; the HTTP runner accepts only `{code, stdin}`. C executables run locally, so use trusted code.

## ITP content and provenance

Current bank: **198 exercises**, including **163 ten-blank programs** and **35 output drills**. Practice contains 71 past exercises and 97 originals (87 completion programs plus 10 output drills). Six exclusive mock papers contain 30 programs, never available in initial practice. Newly authored content comprises **62 practice programs (33 Core, 29 Extra)** and **15 mock programs (D/E: 10 Core; F: 5 Extra)**, all 20–45 lines with hard-coded data and exactly ten blanks.

`priority` and `methods` are required on every ITP exercise, including output drills and old mocks. Core means all past-paper questions, every P1–P5 practice variant, D/E, and exercises whose main algorithms were asked in the source papers or the openly shared 21 Nov pattern. Extra covers additional methods; F is Extra. `mainMethods` records the 1–3 determining algorithms, excluding incidental loop syntax, checks and cleanup. The method catalog records Core source papers and the required practice count (two for starred methods, one otherwise).

`content/itp/method-coverage.md` is the student-facing audit and exact compiler handoff manifest. `itp/methods.json` is its machine-readable catalog: **148 methods (81 Core, 67 Extra)**; **68** require two distinct blank-bearing practice exercises. Mocks and output drills are evidence in the table but never satisfy that practice gate. Union operations and binary I/O are conditional exclusions: the supplied complete notes mention the union keyword but do not teach those operations.

Expected stdout (or a brief sample fallback) appears directly below the program, in both practice and mocks. Stdin samples appear above that output. Empty stdout is labelled as file output; the preserved non-runnable overflow source explicitly has no defined output. Predict-the-output questions never display this block. The brief contains the goal and rules; it no longer repeats stdout above the source.

Topics follow Learn note order. Each picker group shows the note title, colour, counts, latest-attempt progress and a note link. Core appears before Extra, then Foundation → Exam → Challenge and past → original → submitted mock. All is the default priority filter and keeps Extra visible. Topic, type, bank, named set, priority and mistakes filters compose. Previous/next stays inside a topic; its last question offers the next eligible topic and topic mistake review. WP uses the same groups in exam-part order while preserving past full tasks before original drills. Practice answers and the Learn return path remain intact.

Rebuild only this new content with `python -X utf8 scripts/itp-exam-pattern.py`. It reads the audited legacy annotations in `scripts/itp-methods.py` and the original authoring fragments `itp-extra-methods.py` / `itp-new-mocks.py`, preserves legacy completed C, and replaces only its own question IDs. It does not author verified flags. Run all checks from upper-case `Y:\` on Windows. `verify:content` validates tags, method minimums, the coverage document, question lengths/briefs, exclusive papers, D/E slot families and distinct D/E/F main methods; it compiles and compares stdout/files only when GCC is readable.

The counts in the following historical provenance bullets describe the bank before the 21 Nov expansion; the totals above are current.

Every ITP `blanks` program has exactly **10 distinct markers, `__A__` through `__J__`, once each in source order**. The UI presents these as Blank 1 through Blank 10. Repeated occurrences must be separate blanks, each with its own accepted list. `output` questions have no markers or blanks. Preserve source whitespace and indentation; the program window renders the original code without input controls.

`explanations?: { line: number; text: string }[]` adds optional C-style teaching comments above original source lines. `line` is 1-based in `code`, before inserted comments, including empty lines. All 86 current blanks programs have 6–15 short comments covering declarations, input, the algorithm and cleanup/output. Match the target line's indentation; never place comments inside a blank. Explain intent without giving the answer: “Visit only valid positions” rather than the missing loop condition. No accepted answer of four or more characters may occur verbatim anywhere in a comment (even as a substring). The verifier enforces counts, marker order, line bounds and leaks. The Explain code switch conditionally renders comments, remembers practice preference with guarded storage, and starts OFF in each running mock.

`concept?: string` is a short plain-text note about the question's underlying idea, shown in a closed-by-default “Concept: <topic>” disclosure in practice and marked feedback. Write 2–4 sentences (20–600 characters), without any accepted blank answer of 3+ characters, even as a substring or with different capitalisation. If omitted, the UI uses the first prose paragraph of the matching Learn note. The arrow link opens that lesson and retains the existing return-to-question flow. `REQUIRE_CONCEPT = false` near the top of `scripts/verify-content.mjs` keeps this field optional during the content merge; setting it to `true` requires a valid concept on every ITP question, including output drills and mocks.

Practice validation uses the same whitespace/trailing-semicolon normalisation as marking and all accepted alternatives. Eye reveals retain the student's input; once revealed, that blank earns no mark for that attempt even after hiding or retyping, and cannot be self-overridden. Reveals are recorded separately on the attempt. Ten correct, unrevealed answers automatically check the attempt once, updating the existing streak and celebration. Mock inputs remain neutral and expose no reveal controls until the submitted report supplies marking and accepted keys.

Visible eye reveals temporarily show the canonical key in the answer box and replace its program marker with an amber, eye-labelled code token. Hide restores the saved input and marker. “Reveal all” / “Hide all” in the answers header uses the same reveal history atomically for all ten blanks. Correct unrevealed typed answers fill their program markers in green; wrong or empty inputs leave markers in place. Filled tokens remain inline within the source viewport's horizontal scroll. Running mocks have no reveal controls or live correct tokens.

- `itp/past.json`: **71 exercises from every one of the 69 non-SKIP numbered sections** in the supplied `question_bank.md`. Combined duplicate sources retain all source tags. Two output variants are separate exercises.
- `itp/coverage.json`: section-to-exercise mapping. Theory, flowcharts and recurring-idiom appendix examples are not separate exam questions.
- `itp/original.json`: **25 new programs with 10 blanks each** and **10 new output drills**.
- `itp/mocks.json` and `itp/papers.json`: **15 exclusive new programs**, arranged into **3 disjoint papers of 5 × 10 blanks**. They are excluded from initial practice. After submitting an exam, its questions are available under the clearly labelled “Submitted mock review” filter and in mistakes review.
- `itp/verification.json`: latest structural/compiler verification results and captured output, including counts and any failures.

Source repairs are explicit in prompts/notes: corrupted `->` and string literals, the concatenation destination, sequencing the decrement in p2 Q3, negative-vector/column-sentinel handling, sample drivers, observable result printing, and the local file-output path. The intended signed-int “infinite” loop (p5 Q3c) is kept with a correctness caveat and `runnable: false`; it is never assigned a guaranteed output. Numeric traces assume ASCII and ordinary IEEE-754 formats, as the bank specifies.

Authoring scripts are optional and use only Python's standard library:

```text
python scripts/import-bank.py
python scripts/create-originals.py
```

The importer reads the supplied bank at its original sibling path without changing it. Original authoring uses `{{answer::explanation}}` to generate labelled blanks. If editing generated JSON directly, do not rerun these scripts without also updating the authoring source.

Validate with `npm run verify:content`. This checks IDs, token/answer coverage, source-section coverage, metadata, question counts, and disjoint mocks. When GCC is available, it substitutes canonical answers, compiles with `-std=c11 -Wall`, runs every runnable program with its input/fixtures, compares stdout and expected files, and records `verified`. Use `npm run verify:content -- --require-gcc` to fail when GCC is absent. Every question also needs a `brief` (non-empty `goal`, at least one `rule`); `brief.sample` is optional, must not appear on `output` questions (it would reveal the answer), and for runnable questions its `output` is compared with the real program output (using `sample.input` as stdin when present, else the question stdin). Omit `sample` rather than leave it empty, e.g. for file-only programs. The verifier prints `LEAK?` for any blank answer of 5+ characters that appears verbatim inside a rule; review those by hand (a type or variable name already visible in the code is fine, an answer written as code is not). Re-run verification and the build after changing data.


## WP schema and authoring

`Question` is a union of the unchanged ITP `CodeQuestion` fields and five WP variants in `types.ts`: `writing`, `abstract-parts`, `grammar-rewrite`, `mcq`, `match`. `codeQuestions` / `codeQuestionById` retain a typed ITP bank; the general exports include both subjects. All WP IDs start with `wp-` and map to one of the ten WP topics.

WP metadata includes `partLabel`, `marks`, `suggestedMinutes` and optional `originalMarks` / `originalPrompt`. Historical writing tasks retain their original marks and instructions. Old abstract matching becomes four typed components on the new 4-mark scale, with original metadata visible. Three old conclusion tasks remain report-function matching drills.

- `writing`: `task`, `modelAnswer`, `annotations`, `checklist`, `rubric: {id,label,marks}[]`, optional `wordTarget: {min,max}`, `passage`, `chart`, `image`. Rubric marks must sum to task marks. Questionnaire models also have canonical `questionnaire: {intro,open,closed}` with exactly four entries in each list. Models use `==...==` for highlights.
- `chart`: `kind: bar|line|pie|table`, `title`, `xLabel`, `yLabel`, `labels`, `series: {name,values}[]`, optional `note`. Series lengths match labels. Values are non-negative. Pie data has one series. Source image provenance is in `public/wp/sources.json`; uncertain readings must be labelled.
- `abstract-parts`: `abstract`, exactly four `parts: {id,name,accepted: string[],explanation}[]`. Keys contain sentence text, not source letters. Matching ignores case, whitespace and trailing punctuation, and accepts listed alternatives. Overlapping functions are explained, not forced into false certainty.
- `grammar-rewrite`: `original`, `corrected`, 6?10 `errors: {id,error,correction,rule,accepted?}[]`, `explanation`. The original prefills the editor. Phrase checks require the corrected token sequence and absence of the erroneous sequence; the full token diff exposes omissions/additions. Provisional marks are proportional to detected corrections and may be self-adjusted. Highlight quality still needs human review.
- `mcq`: `options: {id,text,explanation}[]`, `answer` containing one valid option ID.
- `match`: `categories`, `items: {id,text,answer,explanation}[]` with a valid category for each item. Categories may repeat.

Files: `wp/past.json` (38 tasks), `wp/original.json` (60 full tasks + 60 drills), `wp/mocks.json` (27 exclusive parts), `wp/papers.json` (three ordered papers). Mocks must match `wpPartFormat` in `lib/wp.ts` exactly and total 50 marks. Their content is unavailable in initial practice; submitted mock attempts unlock review.

Recreate authored content and notes with `python -I -X utf8 scripts/wp-author.py`. It reads the sibling source texts without changing them and executes the `wp-*.py` content modules. The strategy and phrase-bank Markdown are hand-authored. Do not rerun the generator after direct JSON/lesson edits unless the authoring source is updated too. `scripts/extract-wp.py` uses installed pypdf as an offline fallback because PyMuPDF was unavailable in the checked isolated interpreters; run it with an interpreter containing pypdf. No package installation is required by the app.

Run the standard build, behavior and UI checks plus `npm run verify:content`. WP structural validation is in `scripts/verify-wp.mjs`; it requires correct keys, all requested minimum counts, rubric sums, model lengths within 15% of target bounds, all nine exact mock parts, and all twelve lesson files. New essays are additionally required to be exactly 250 words. All stored/exported writing scores are self-assessed or explicitly provisional; no external grading service is called.
