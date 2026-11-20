# Exam-day reading list: 21 Nov 2026
**WP 9:30 AM** · break 12–1 PM · **ITP 1:00 PM**. Everything below is in the app (Learn / Practice). Read in this order; stop a block when its time is up.

## Tonight, until you fall asleep: ITP (phone)
1. **ITP → Learn → "C blank-filling idioms cheatsheet"**: the patterns that repeat in every paper. *Most important single read.*
2. **ITP → Learn → Structs, typedef and records**: 5/5 papers, biggest marks.
3. **ITP → Learn → Dynamic memory**: `malloc`, `(ptr+i)->field`, `free`.
4. **ITP → Learn → File handling**: fopen modes, fgets/fputs, fclose.
5. Still awake? **ITP → Practice → topic Structs → past-paper questions.** Read the brief, try the blanks, check.

## 5:00–8:30 AM: WP (exam order = marks)
| # | App → WP → Learn | Then Practice | Time |
|---|---|---|---|
| 1 | **Exam-morning cheatsheet** | — | 15 min |
| 2 | **Q4 Investigation report** (10 marks) | 1 report task, timed 30 min → compare with the model | 60 min |
| 3 | **Q5B Grammar correction** (6) | 2 grammar rewrites (auto diff) | 30 min |
| 4 | **Q5A Abstract parts** (4) | 2 abstract sets (auto-marked) | 20 min |
| 5 | **Q2B Questionnaire**, **Q3A Graphs**, **Q3B Summary**: templates + traps | 1 graph task if time | 40 min |
| 6 | **Q2A Email**, **Q1B Paraphrase**: templates | — | 20 min |
| 7 | **Phrase bank** | — | 15 min |
| — | Q1A Essay: you're already strong; just remember **250 words: 35 / 65 / 65 / 55 / 30** | — | 2 min |
8:30: stop, eat, get set up.

### WP rules you must not forget
- Essay **250 words**: thesis → 2 reasons → counter-argument + rebuttal → conclusion.
- Questionnaire: **exactly 4 open + 4 closed**; no leading or double-barrelled questions.
- Graph: **overview first**, then key numbers and comparisons; no opinions unless asked.
- Summary: **title** + **highlight keywords** + about half the length + no opinions.
- Report: headings (Title, Abstract, Introduction, Methodology, Findings, Conclusion, Recommendations).
- Abstract parts: copy the **exact sentence(s)** for each part asked.
- Grammar: rewrite the **whole** paragraph and **mark every correction**.
- Answer every part. No citations needed. Watch the clock per part (~3 min per mark).

## 12:00–1:00 PM: ITP (no new topics)
1. The **ITP traps** below (5 min).
2. **ITP → Learn → idioms cheatsheet** again (20 min).
3. **ITP → Practice → Structs / Dynamic memory / Files**: 1 past question each, as time allows.

### ITP traps
- `scanf("%d", &x)` needs **&** (not for strings: `scanf("%s", name)`).
- Digit loop: `while (n > 0) { d = n % 10; ... n = n / 10; }`
- Nth item = **index N−1** (4th student → `[3]`, 5th point → `c + 4`).
- `.` on a struct variable, `->` on a pointer. `(ptr + i)->f` == `ptr[i].f` == `(*(ptr + i)).f`
- Strings: `strcpy(dst, src)`, never `dst = "..."`. `strcmp(a, b) == 0` means equal.
- malloc: `ptr = (struct Student *) malloc(n * sizeof(struct Student));` → check `ptr == NULL` → `free(ptr);`
- Struct definition ends with `};`. typedef: `typedef struct { ... } Name;`
- 2D column sum: outer loop over columns `j`, inner over rows `i`: `sum += a[i][j]`.
- Integer division: `9/5 == 1`. Use `9.0/5`.
- File modes: `"r"` read, `"w"` overwrite/create, `"a"` append, `"r+"` read+write, `"w+"` read+write (clears), `"a+"` read+append.

### ITP exam tactics
1. Read the program's GOAL + sample output first. The blank is whatever makes that output.
2. Use clues: declared types, later printf/scanf, array sizes, `.` vs `->`.
3. Fill easy blanks first. Each blank is marked separately, so **never leave one empty**.
4. About 30 min per question; move on and come back.
