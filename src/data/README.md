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
  type: 'blanks',                // blanks | output
  prompt: 'Complete the missing expression.',
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

Use `__A__`, `__B__`, … in `code`. Every token needs a matching `blanks` entry; repeated labels share an answer and earn one mark. Put punctuation outside a blank where practical. Use complete programs, or add a clearly labelled sample driver to source fragments. Output questions have `blanks: []`, complete code, an `expectedOutput` string (including its exact final newline), and an explicit step-by-step `trace`.

One correct blank earns one mark. Comparison removes all whitespace and final semicolons, then matches any accepted spelling. It does not reason about semantic equivalence. Students can override an incorrect mark after submission; the original entered answer is retained. Output comparison converts CRLF to LF and removes spaces/tabs at each line's end. Leading whitespace, blank lines, and the presence of a final newline still matter.

Fixtures use simple filenames only. The verifier seeds them in the disposable working directory and checks `expectedFiles`. The scratchpad includes a visible C harness that seeds these files and displays resulting file contents; the HTTP runner accepts only `{code, stdin}`. C executables run locally, so use trusted code.

## ITP content and provenance

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
