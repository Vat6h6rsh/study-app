# ITP progress log

## Status
- 19 Nov: Lesson 1 done (basics). Next: Lesson 2 (loops + 1D arrays).
- Practice app ✅ `study-app/` → `npm run dev` → http://127.0.0.1:5173. 71 past-paper + 35 original + 3 mock papers; 120/120 answers verified by compiling with gcc.
- Learn tab ✅ 13 concept notes in `docs/itp/concepts/` (21 examples gcc-verified).
- UI/UX audit ✅ vs `ui-ux-learning-guide.md` → `docs/study-app-ui-audit.md` (502 items: 261 pass / 219 fail→fixed / 118 n.a.). Real-browser visual check still pending.
- 19 Nov: 4 themes (Paper/Sky/Midnight/Ember + System), collapsible sidebar, per-topic colours, confetti/shake feedback, streaks, "What this program does" brief on all 121 questions (81 samples gcc-verified). Codex hit usage limit (resets 3:49 PM); Sonnet agents finished the work.
- Lesson 2 graded; selection sort taught; check (trace {3,1,2}, descending sort) pending.
- 20 Nov: BOTH ITP and WP exams on 21 Nov. Plan today: structs/malloc (Lesson 3 taught) → files → strings/2D → ITP timed mock → WP top-up (report + grammar) → sleep. gcc 16.2 installed via winget (WinLibs) ✅. Open a NEW terminal, then: `gcc file.c -o file.exe` and `./file.exe`.
- Lesson 2 (loops + 1D arrays) taught 19 Nov; quiz pending.

## Weak spots / mistakes to re-drill
- Forgot `&` in scanf (19 Nov)
- Loop termination condition for digit loops: `n > 0`, not `n >= 0` (19 Nov)

- Loop bounds: `i <= 9` prints 1..9 not 1..10 (19 Nov, L2 Q1)
- Nested indexing `a[a[0]/10]`: evaluate inside-out (19 Nov, L2 Q4)
- Selection sort: didn't know → taught 19 Nov, re-check
- Lesson: always read the program's GOAL before filling blanks (L2 Q2 was vague → app now shows a brief per question)

## Strong
- Linear search with `pos = i; break;` (L2 Q3)
- Integer division and `%`; pre/post increment in expressions.
