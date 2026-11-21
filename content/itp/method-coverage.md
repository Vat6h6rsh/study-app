# ITP method coverage

Every row lists practice blanks separately from output drills and exclusive mocks. Starred methods require two distinct practice programs; all others require one. Tags are audited against completed source. Routine visible syntax alone is not a claim of algorithm coverage.

Core means asked in a source paper or the openly shared 21 Nov P1–P5 pattern. Extra means no such evidence. A mixed exercise is Core when its main algorithm was asked; incidental syntax does not promote it. Source repairs and extensions remain labelled in the original questions.

Legacy audit: 71 past exercises, 35 original exercises and 15 original mock exercises were read before expansion. Existing practice gaps included iterative binary/bubble/insertion sorting, recursion variants, record sorting repetition, row totals, dynamic growth and update file modes. Output-only coverage did not satisfy the practice gate.

Conditional scope: the supplied complete notes mention union as a reserved word but do not teach union operations or fread/fwrite. They are excluded from the required catalog. No new npm packages are used.

| Method | Priority / source papers | Required | Practice blanks | Other existing / mock / output evidence |
| --- | --- | --- | --- | --- |
| Integer versus floating division * | Core — p1 Q2, p1 Q3, p1 Q4a–b, p1 Q5, p2 Q3, p2 Q6, p3 Q4, p3 Q8, p4 Q2c, p5 Q2a, 21 Nov P1–P5 | 2 | past-1.1, past-8.3, past-8.7, past-10.7, past-10.9, exam21-p1-1, exam21-p1-2, exam21-p1-3, exam21-decisions, exam21-series | past-3.1b, past-9.1, past-9.3, past-10.2, past-10.5, out-02, out-03 |
| Remainder % * | Core — p1 Q10, p1 Q11, p1 Q7, p1 Q8, p1 Q9, p2 Q11, p2 Q3, p2 Q6, p3 Q8, p4 Q3c, 21 Nov P1–P5 | 2 | past-4.5, past-5.3, past-8.1, past-8.2, past-8.3, past-8.4, past-8.8, new-03, new-07, new-20, new-22, new-23, exam21-p2-1, exam21-p2-2, exam21-p2-3, exam21-digit-lab, exam21-number-tools, exam21-rotate-prefix, exam21-recursive-numbers | past-9.3, past-10.1, past-10.2, out-03, mock-c5 |
| Explicit type casting * | Core — p2 Q4, p3 Q4, 21 Nov P1–P5 | 2 | exam21-p1-1, exam21-p1-2, exam21-p1-3, exam21-p3-1, exam21-p3-2, exam21-p3-3, exam21-decisions | past-10.4, past-10.5, out-02, mock-b1, mock-d1, mock-e1 |
| Pre/post increment and decrement * | Core — p1 Q11, p2 Q12, p2 Q13, p2 Q3, p2 Q5, p3 Q12, p3 Q3, p3 Q7, p4 Q2a, p5 Q2b, p5 Q2c, p5 Q3c, 21 Nov P1–P5 | 2 | past-1.3, past-1.4, past-3.6, past-8.9, past-8.11, past-10.11, new-24, exam21-p1-1, exam21-p1-2, exam21-p1-3, exam21-decisions, exam21-sentinel, exam21-insert-delete | past-7.1, past-10.1, past-10.2, past-10.3, past-10.6, past-10.10, out-01, out-04, out-07, out-08, out-09 |
| Compound assignment | Core — p2 Q12, p4 Q1c, p5 Q2c, p5 Q5b | 1 | past-1.3, past-8.6, past-10.11 | past-9.4 |
| Relational/logical short-circuit | Core — p3 Q7 | 1 | past-3.6, exam21-decisions, exam21-insertion, exam21-matrix-search, exam21-enum-record | out-08 |
| Ternary ?: | Extra — additional syllabus practice | 1 | exam21-decisions, exam21-transpose-check | mock-b4 |
| Bitwise & OR XOR and shifts | Core — p3 Q3, p4 Q3b | 1 | past-10.8, exam21-bitwork | past-10.3 |
| XOR swap | Core — p4 Q3b | 1 | past-10.8, exam21-bitwork |  |
| sizeof | Core — p3 Q9; p5 Q4b | 1 | past-3.5, new-21, exam21-binary-1, exam21-binary-2 | mock-f2 |
| Operator precedence | Core — p1 Q11, p1 Q4a–b, p2 Q3, p3 Q3, p5 Q2b | 1 | exam21-decisions | past-3.1b, past-10.1, past-10.2, past-10.3, past-10.10 |
| #define macro | Core — p1 Q10, p1 Q5, p5 Q2c, p5 Q6a | 1 | past-1.1, past-4.3, past-8.1, past-10.11, exam21-bitwork |  |
| const | Extra — additional syllabus practice | 1 | exam21-bitwork, exam21-decisions, exam21-pyramid |  |
| Character arithmetic (ASCII) | Core — p1 Q11, p2 Q4 | 1 | exam21-bitwork | past-10.1, past-10.4 |
| printf formats (%d %f %.2f %c %s %ld %lld %x and width) | Core — p1 Q4d, p2 Q4, p3 Q15; p4 Q8, p3 Q4, p4 Q1c, p4 Q2c, p4 Q5, p5 Q2a | 1 | past-1.5, past-2.1, past-8.6, past-10.7, past-10.9, exam21-bitwork | past-4.6, past-10.4, past-10.5 |
| if / else-if ladder * | Core — p5 Q2c | 2 | past-10.11, exam21-decisions |  |
| Switch with break and fall-through | Core — p1 Q8, p5 Q3b | 1 | past-8.8, exam21-sentinel | past-10.12, past-10.12b |
| for loop * | Core — p1 Q13, p1 Q14, p1 Q3, p1 Q4a–b, p1 Q5, p1 Q7, p1 Q8, p1 Q9, p2 Q10, p2 Q11, p2 Q5, p2 Q7, p2 Q9, p3 Q10, p3 Q11, p3 Q15; p4 Q8, p3 Q5, p3 Q9; p5 Q4b, p4 Q1c, p4 Q4, p4 Q6, p5 Q3c, p5 Q4a, p5 Q5b, 21 Nov P1–P5 | 2 | past-1.1, past-1.2, past-1.6, past-2.1, past-3.2, past-3.3, past-3.4, past-3.5, past-4.1, past-4.2, past-4.4, past-4.5, past-5.3, past-5.4, past-5.7, past-8.4, past-8.6, past-8.7, past-8.8, past-8.9, past-8.10, past-8.11, new-09, new-23, exam21-p1-1, exam21-p1-2, exam21-p1-3, exam21-indexed-extremes-1, exam21-indexed-extremes-2, exam21-pyramid, exam21-search-count-1, exam21-search-count-2, exam21-bubble-1, exam21-bubble-2, exam21-insert-delete, exam21-matrix-totals-1, exam21-matrix-totals-2, exam21-multiply-1, exam21-multiply-2 | past-3.1, past-9.4, mock-d1, mock-f1 |
| while loop * | Core — p1 Q10, p1 Q14, p1 Q9, p2 Q11, p2 Q12, p2 Q6, p3 Q11, p3 Q12, p3 Q17, p3 Q6, p3 Q7, p4 Q3c, 21 Nov P1–P5 | 2 | past-1.3, past-1.4, past-3.6, past-3.7, past-5.3, past-5.4, past-5.7, past-8.1, past-8.2, past-8.3, past-8.4, past-8.5, new-24, exam21-sentinel, exam21-number-tools, exam21-binary-1, exam21-binary-2 | out-09 |
| do-while loop | Extra — additional syllabus practice | 1 | new-07, new-22, exam21-digit-lab |  |
| Nested loops | Core — p1 Q3, p2 Q5 | 1 | past-8.7, past-8.9, exam21-pyramid |  |
| Triangle pattern | Core — p2 Q5 | 1 | past-8.9 |  |
| Pyramid pattern | Extra — additional syllabus practice | 1 | exam21-pyramid |  |
| Floyd triangle | Core — p2 Q5 | 1 | past-8.9 |  |
| Pascal triangle | Core — p1 Q3 | 1 | past-8.7 |  |
| break and continue | Core — p1 Q14, p1 Q9, p2 Q7 | 1 | past-3.2, past-5.7, past-8.4, new-14, new-25, exam21-sentinel |  |
| Sentinel loop | Extra — additional syllabus practice | 1 | exam21-sentinel |  |
| Digit sum * | Core — p1 Q10, p2 Q6 | 2 | past-8.1, past-8.3, exam21-digit-lab | mock-c5 |
| Digit reverse * | Extra — additional syllabus practice | 2 | new-22, exam21-digit-lab |  |
| Count digits | Extra — additional syllabus practice | 1 | new-07, new-22, exam21-digit-lab |  |
| Number palindrome | Extra — additional syllabus practice | 1 | new-22, exam21-digit-lab |  |
| Armstrong test | Core — p1 Q10, p4 Q3c | 1 | past-8.1, past-8.2 | mock-c5 |
| Prime test * | Core — p1 Q9 | 2 | past-8.4, new-23 |  |
| GCD and LCM | Extra — additional syllabus practice | 1 | exam21-number-tools |  |
| Iterative factorial | Core — p1 Q2 | 1 | exam21-number-tools | past-9.1 |
| Iterative Fibonacci | Core — p3 Q6 | 1 | past-8.5, exam21-series |  |
| Iterative power | Core — p4 Q1c | 1 | past-8.6, exam21-series |  |
| Series sum | Extra — additional syllabus practice | 1 | exam21-series |  |
| Perfect number | Extra — additional syllabus practice | 1 | exam21-number-tools |  |
| Array sum and average * | Core — p1 Q5, p5 Q9, 21 Nov P1–P5 | 2 | past-1.1, past-2.4, new-02, new-08, new-16, exam21-p1-1, exam21-p1-2, exam21-p1-3 | mock-b1, mock-d1, mock-e1, mock-e5 |
| Max/min with index * | Core — p1 Q12, p1 Q13, p2 Q15, p4 Q4, p5 Q9, 21 Nov P1–P5 | 2 | past-1.2, past-2.2, past-2.4, past-4.1, past-6.2, new-10, exam21-indexed-extremes-1, exam21-indexed-extremes-2 | mock-d5 |
| Second distinct largest | Extra — additional syllabus practice | 1 | exam21-insertion | mock-e1 |
| Linear search first index * | Core — p3 Q9; p5 Q4b, 21 Nov P1–P5 | 2 | past-3.5, exam21-p2-1, exam21-p2-2, exam21-p2-3, exam21-search-count-1, exam21-search-count-2 |  |
| Linear search last index * | Extra — additional syllabus practice | 2 | exam21-search-count-1, exam21-search-count-2 | mock-e2 |
| Linear search occurrence count * | Core — p2 Q7, p3 Q17, 21 Nov P1–P5 | 2 | past-3.2, past-3.7, exam21-p2-1, exam21-p2-2, exam21-p2-3, exam21-indexed-extremes-1, exam21-indexed-extremes-2, exam21-search-count-1, exam21-search-count-2 |  |
| Iterative binary search * | Extra — additional syllabus practice | 2 | exam21-binary-1, exam21-binary-2 | mock-d2 |
| Bubble sort * | Extra — additional syllabus practice | 2 | exam21-bubble-1, exam21-bubble-2 |  |
| Selection sort * | Core — p2 Q9, p5 Q4a | 2 | past-3.3, past-3.4, new-05, exam21-record-sort | mock-e2 |
| Insertion sort | Extra — additional syllabus practice | 1 | exam21-insertion |  |
| Reverse array in place * | Extra — additional syllabus practice | 2 | new-06, exam21-bubble-1, exam21-bubble-2 |  |
| Rotate left and right | Extra — additional syllabus practice | 1 | exam21-rotate-prefix | mock-e1 |
| Array frequency count | Extra — additional syllabus practice | 1 | new-07, exam21-indexed-extremes-1, exam21-indexed-extremes-2, exam21-search-count-1, exam21-search-count-2 |  |
| Remove duplicates | Core — p2 Q7, p3 Q17 | 1 | past-3.2, past-3.7, new-25 |  |
| Merge sorted arrays | Core — p3 Q7 | 1 | past-3.6, new-24 | mock-b3 |
| Insert and delete at position | Extra — additional syllabus practice | 1 | exam21-insert-delete | mock-b2 |
| Prefix sums | Extra — additional syllabus practice | 1 | exam21-rotate-prefix | mock-d1 |
| Separate even and odd | Extra — additional syllabus practice | 1 | exam21-rotate-prefix |  |
| Row sums * | Extra — additional syllabus practice | 2 | exam21-matrix-totals-1, exam21-matrix-totals-2, exam21-heap-matrix |  |
| Column sums * | Core — p4 Q4 | 2 | past-4.1, new-10, exam21-multiply-1, exam21-multiply-2 | mock-f4 |
| Main and secondary diagonals * | Extra — additional syllabus practice | 2 | new-11, exam21-matrix-totals-1, exam21-matrix-totals-2 |  |
| Square transpose in place * | Core — p5 Q6a | 2 | past-4.3, exam21-transpose-check |  |
| Rectangular transpose | Core — p3 Q10 | 1 | past-4.2, new-09 |  |
| Matrix addition | Core — p2 Q10 | 1 | past-4.4 |  |
| Matrix multiplication * | Extra — additional syllabus practice | 2 | exam21-multiply-1, exam21-multiply-2 | mock-c2, mock-f1 |
| Maximum per row | Extra — additional syllabus practice | 1 | exam21-matrix-totals-1, exam21-matrix-totals-2 |  |
| Symmetric and identity check | Extra — additional syllabus practice | 1 | exam21-transpose-check |  |
| Upper and lower triangles | Extra — additional syllabus practice | 1 | exam21-matrix-search | mock-a2 |
| Search matrix | Extra — additional syllabus practice | 1 | exam21-matrix-search |  |
| Manual string length * | Core — p2 Q11, p3 Q11 | 2 | past-5.3, past-5.4, new-13, exam21-character-count-1, exam21-character-count-2 |  |
| strlen * | Core — p1 Q14, p1 Q4c, p5 Q6b, 21 Nov P1–P5 | 2 | past-5.7, new-12, new-14, new-15, exam21-p3-1, exam21-p3-2, exam21-p3-3, exam21-words-substring | past-5.1, past-5.5, mock-a5, mock-c4, mock-d3, mock-e3 |
| strcpy * | Core — p4 Q5, p5 Q6b, p5 Q6c, 21 Nov P1–P5 | 2 | past-1.5, past-5.6, new-01, new-12, new-15, exam21-p4-1, exam21-p4-2, exam21-p4-3, exam21-string-sort | past-5.5, mock-c1, mock-d4 |
| strncpy * | Extra — additional syllabus practice | 2 | exam21-character-count-1, exam21-character-count-2 |  |
| strcat | Core — p5 Q6c | 1 | past-5.6, new-15, exam21-words-substring | mock-e3 |
| strcmp * | Core — p1 Q14 | 2 | past-5.7, new-04, exam21-string-sort |  |
| Manual lexicographic comparison | Extra — additional syllabus practice | 1 | exam21-string-sort |  |
| String reverse * | Core — 21 Nov P1–P5 | 2 | exam21-p3-1, exam21-p3-2, exam21-p3-3, exam21-recursive-text |  |
| String palindrome * | Extra — additional syllabus practice | 2 | new-14, exam21-palindrome-clean | mock-d3 |
| Count vowels/consonants/digits/spaces * | Core — 21 Nov P1–P5 | 2 | exam21-character-count-1, exam21-character-count-2 | mock-d3 |
| Word count | Extra — additional syllabus practice | 1 | exam21-words-substring | mock-e3 |
| toupper / tolower * | Core — p1 Q14, p1 Q4e, p2 Q11, p3 Q11, p5 Q6b | 2 | past-5.3, past-5.4, past-5.7, new-12, new-14, exam21-character-count-1, exam21-character-count-2 | past-5.2, past-5.5, mock-a5, mock-c3, mock-d3, mock-e3 |
| ASCII +/-32 case conversion | Extra — additional syllabus practice | 1 | exam21-palindrome-clean |  |
| Character frequency | Extra — additional syllabus practice | 1 | exam21-p3-1, exam21-p3-2, exam21-p3-3 |  |
| Remove spaces or a character | Extra — additional syllabus practice | 1 | exam21-palindrome-clean |  |
| strstr substring search | Extra — additional syllabus practice | 1 | exam21-words-substring |  |
| fgets and newline removal | Extra — additional syllabus practice | 1 | exam21-line-numbers |  |
| atoi | Extra — additional syllabus practice | 1 | exam21-line-numbers |  |
| Manual string-to-int | Extra — additional syllabus practice | 1 | exam21-line-numbers |  |
| Array of strings and string sorting | Extra — additional syllabus practice | 1 | exam21-string-sort |  |
| Null terminator handling * | Core — p1 Q14, p2 Q11, p3 Q11, 21 Nov P1–P5 | 2 | past-5.3, past-5.4, past-5.7, new-12, new-13, exam21-p3-1, exam21-p3-2, exam21-p3-3, exam21-character-count-1, exam21-character-count-2, exam21-palindrome-clean, exam21-line-numbers | mock-a5, mock-e3 |
| Function prototypes | Extra — additional syllabus practice | 1 | exam21-rec-factorial-1, exam21-rec-factorial-2 |  |
| Return values * | Core — p1 Q10, p1 Q13, p1 Q2, p1 Q5, p1 Q9, p2 Q7, p2 Q8, p3 Q17, p3 Q8, p3 Q9; p5 Q4b, 21 Nov P1–P5 | 2 | past-1.1, past-1.2, past-3.2, past-3.5, past-3.7, past-8.1, past-8.4, new-04, new-20, new-21, new-23, new-25, exam21-p2-1, exam21-p2-2, exam21-p2-3, exam21-binary-1, exam21-binary-2, exam21-rec-factorial-1, exam21-rec-factorial-2, exam21-recursive-numbers, exam21-recursive-text | past-9.1, past-9.2, past-9.3, out-10, mock-b4, mock-b5, mock-c5, mock-d2, mock-f2, mock-f3 |
| Void functions | Core — p2 Q12, p2 Q14, p3 Q14, p5 Q5b, p5 Q6a | 1 | past-1.3, past-4.3, new-02, exam21-swap-1, exam21-swap-2 | past-7.4, past-7.5, past-9.4, out-10, mock-c2 |
| Passing arrays * | Core — p1 Q13, p2 Q14, p2 Q7, p2 Q9, p3 Q9; p5 Q4b, p5 Q4a, 21 Nov P1–P5 | 2 | past-1.2, past-3.2, past-3.3, past-3.4, past-3.5, new-04, new-19, new-21, new-25, exam21-p2-1, exam21-p2-2, exam21-p2-3, exam21-binary-1, exam21-binary-2 | past-7.5, mock-b2, mock-b4, mock-c2, mock-d2, mock-e2, mock-f2 |
| Call by value versus by reference * | Core — p3 Q14 | 2 | exam21-swap-1, exam21-swap-2 | past-7.4 |
| Recursive factorial * | Extra — additional syllabus practice | 2 | exam21-rec-factorial-1, exam21-rec-factorial-2 | mock-f3 |
| Recursive Fibonacci | Extra — additional syllabus practice | 1 | exam21-recursive-text |  |
| Recursive digit sum * | Extra — additional syllabus practice | 2 | new-20, exam21-recursive-numbers | mock-f3 |
| Recursive power | Extra — additional syllabus practice | 1 | exam21-recursive-numbers |  |
| Recursive GCD | Extra — additional syllabus practice | 1 | exam21-recursive-numbers | mock-a4 |
| Recursive string reverse | Extra — additional syllabus practice | 1 | exam21-recursive-text |  |
| Recursive binary search | Extra — additional syllabus practice | 1 | new-21 | mock-f2 |
| Counting calls with static local | Extra — additional syllabus practice | 1 | exam21-rec-factorial-1, exam21-rec-factorial-2 |  |
| Address and dereference * | Core — p1 Q13, p2 Q13, p3 Q13, p3 Q14, p3 Q15; p4 Q8, p4 Q6, p4 Q7a, p5 Q7a, p5 Q7b, p5 Q7c, 21 Nov P1–P5 | 2 | past-1.2, past-1.6, past-1.7, past-2.1, past-2.3, past-7.6, new-19, exam21-p4-1, exam21-p4-2, exam21-p4-3, exam21-swap-1, exam21-swap-2, exam21-pointer-walk | past-7.1, past-7.2, past-7.3, past-7.4, out-04, mock-a2, mock-a4, mock-b5 |
| Pointer arithmetic over arrays * | Core — p2 Q13, p2 Q14, p3 Q13, p4 Q7a, p5 Q7a | 2 | past-1.7, exam21-pointer-walk, exam21-grow-1, exam21-grow-2 | past-7.1, past-7.2, past-7.3, past-7.5, out-04, out-05 |
| Array / pointer equivalence * | Core — p2 Q14, p3 Q13, p4 Q7a, p5 Q7a | 2 | past-1.7, exam21-pointer-walk, exam21-grow-1, exam21-grow-2 | past-7.2, past-7.3, past-7.5, out-05 |
| Pointer to pointer | Extra — additional syllabus practice | 1 | exam21-pointer-walk |  |
| Swap through pointers * | Core — p3 Q14, 21 Nov P1–P5 | 2 | exam21-swap-1, exam21-swap-2 | past-7.4 |
| Multiple outputs through pointer parameters * | Core — p3 Q12, p5 Q7b | 2 | past-1.4, past-7.6, new-19 | mock-a2, mock-a4 |
| Walking a string with char pointer | Core — p5 Q6b | 1 | exam21-pointer-walk | past-5.5 |
| NULL checks | Core — p1 Q13 | 1 | past-1.2, new-04, exam21-enum-record |  |
| Const pointer versus pointer to const | Extra — additional syllabus practice | 1 | exam21-pointer-walk |  |
| Struct definition and typedef * | Core — p1 Q5, p2 Q12, p4 Q5, p4 Q6, p4 Q7a, 21 Nov P1–P5 | 2 | past-1.1, past-1.3, past-1.5, past-1.6, past-1.7, new-01, new-03, new-05, exam21-p4-1, exam21-p4-2, exam21-p4-3, exam21-record-sort | mock-e4 |
| Nested struct | Extra — additional syllabus practice | 1 | exam21-record-sort | mock-d4 |
| Array of structs search / max by field * | Core — p1 Q12, p1 Q13 | 2 | past-1.2, past-2.2, new-01, new-04, exam21-enum-record | mock-a1, mock-c1 |
| Sort records by a field * | Extra — additional syllabus practice | 2 | new-05, exam21-record-sort | mock-e4 |
| Pointer to struct -> * | Core — p1 Q13, p3 Q12, p3 Q15; p4 Q8, p4 Q7a, 21 Nov P1–P5 | 2 | past-1.2, past-1.4, past-1.7, past-2.1, new-02, new-04, exam21-p4-1, exam21-p4-2, exam21-p4-3, exam21-enum-record | mock-a1, mock-b5, mock-c1, mock-d4, mock-e4 |
| Struct by value versus by pointer * | Core — p1 Q5, p3 Q12, 21 Nov P1–P5 | 2 | past-1.1, past-1.4, new-02, new-03, exam21-p4-1, exam21-p4-2, exam21-p4-3 | mock-a1, mock-b5, mock-d4 |
| Function returning a struct | Extra — additional syllabus practice | 1 | new-03, exam21-record-sort | mock-e4 |
| enum | Extra — additional syllabus practice | 1 | exam21-enum-record | mock-e4 |
| malloc * | Core — p1 Q12, p1 Q6, p3 Q15; p4 Q8, p5 Q6c, p5 Q7c, p5 Q9, 21 Nov P1–P5 | 2 | past-2.1, past-2.2, past-2.3, past-2.4, past-5.6, past-6.1, new-06, new-08, new-15, exam21-p5-1, exam21-p5-2, exam21-p5-3, exam21-grow-1, exam21-grow-2 | mock-a1, mock-b1, mock-c1, mock-f4 |
| Allocation NULL check * | Core — p3 Q15; p4 Q8, p5 Q6c, p5 Q7c, 21 Nov P1–P5 | 2 | past-2.1, past-2.3, past-5.6, new-01, new-06, new-07, new-08, new-15, exam21-p5-1, exam21-p5-2, exam21-p5-3, exam21-grow-1, exam21-grow-2, exam21-heap-matrix | mock-a1, mock-b1, mock-f4 |
| calloc zero initialisation * | Extra — additional syllabus practice | 2 | new-01, new-07, new-08, exam21-heap-matrix | mock-b1, mock-d5 |
| Safe realloc growth * | Extra — additional syllabus practice | 2 | exam21-grow-1, exam21-grow-2 | mock-e5 |
| free * | Core — p1 Q12, p1 Q6, p3 Q15; p4 Q8, p5 Q6c, p5 Q7c, p5 Q9, 21 Nov P1–P5 | 2 | past-2.1, past-2.2, past-2.3, past-2.4, past-5.6, past-6.1, new-01, new-06, new-07, new-08, new-15, exam21-p5-1, exam21-p5-2, exam21-p5-3, exam21-grow-1, exam21-grow-2, exam21-heap-matrix | mock-a1, mock-b1, mock-c1, mock-d5, mock-e5, mock-f4 |
| Dynamic array of structs * | Core — p1 Q12, p1 Q6, p3 Q15; p4 Q8, p5 Q7c, p5 Q9 | 2 | past-2.1, past-2.2, past-2.3, past-2.4, past-6.1, new-01, new-08 | mock-a1, mock-c1 |
| Dynamic string | Core — p1 Q12, p5 Q6c | 1 | past-2.2, past-5.6, new-15 |  |
| Dynamic 2D row pointers and freeing | Extra — additional syllabus practice | 1 | exam21-heap-matrix | mock-f4 |
| Avoiding leaks including failure paths | Extra — additional syllabus practice | 1 | new-08, exam21-p5-1, exam21-p5-2, exam21-p5-3, exam21-grow-1, exam21-grow-2, exam21-heap-matrix | mock-b1, mock-f4 |
| fopen r * | Core — p1 Q6, p2 Q15, p3 Q16; p4 Q9, p5 Q8, 21 Nov P1–P5 | 2 | past-6.1, past-6.2, past-6.3, past-6.4, new-16, new-17, new-18, exam21-p5-1, exam21-p5-2, exam21-p5-3, exam21-text-records | mock-a3, mock-b3, mock-c3, mock-d5, mock-f5 |
| fopen w * | Core — p1 Q6, p2 Q15, p5 Q8, 21 Nov P1–P5 | 2 | past-6.1, past-6.2, past-6.4, new-16, new-17, exam21-p5-1, exam21-p5-2, exam21-p5-3, exam21-text-records | mock-a3, mock-b3 |
| fopen a * | Core — p3 Q16; p4 Q9 | 2 | past-6.3, new-17 | mock-c3, mock-d5 |
| fopen r+ * | Extra — additional syllabus practice | 2 | exam21-update-modes-1, exam21-update-modes-2 | mock-e5 |
| fopen w+ * | Extra — additional syllabus practice | 2 | exam21-update-modes-1, exam21-update-modes-2 |  |
| fopen a+ * | Extra — additional syllabus practice | 2 | exam21-update-modes-1, exam21-update-modes-2 |  |
| fopen NULL check * | Core — 21 Nov P1–P5 | 2 | new-16, new-17, new-18, exam21-p5-1, exam21-p5-2, exam21-p5-3, exam21-update-modes-1, exam21-update-modes-2, exam21-file-copy-count, exam21-text-records | mock-a3, mock-b3, mock-c3, mock-f5 |
| fprintf / fscanf * | Core — p2 Q15, p5 Q8, 21 Nov P1–P5 | 2 | past-6.2, past-6.4, new-16, exam21-p5-1, exam21-p5-2, exam21-p5-3, exam21-text-records | mock-a3, mock-b3, mock-d5, mock-e5 |
| fputs / fgets * | Core — p1 Q6, p3 Q16; p4 Q9 | 2 | past-6.1, past-6.3, new-17, exam21-update-modes-1, exam21-update-modes-2 | mock-c3 |
| fputc / fgetc with EOF loop * | Extra — additional syllabus practice | 2 | new-18, exam21-file-copy-count | mock-f5 |
| Count characters/words/lines | Extra — additional syllabus practice | 1 | new-18, exam21-file-copy-count | mock-f5 |
| Copy file | Core — p3 Q16; p4 Q9 | 1 | past-6.3, new-17, exam21-file-copy-count |  |
| Append file | Core — p3 Q16; p4 Q9 | 1 | past-6.3, new-17, exam21-update-modes-1, exam21-update-modes-2 | mock-c3 |
| Text struct records | Core — p1 Q6 | 1 | past-6.1, exam21-text-records | mock-a3 |
| fclose * | Core — p1 Q6, p2 Q15, p3 Q16; p4 Q9, p5 Q8, 21 Nov P1–P5 | 2 | past-6.1, past-6.2, past-6.3, past-6.4, new-16, new-17, new-18, exam21-p5-1, exam21-p5-2, exam21-p5-3, exam21-update-modes-1, exam21-update-modes-2, exam21-file-copy-count, exam21-text-records | mock-a3, mock-b3, mock-c3, mock-f5 |
| Local / global shadowing * | Core — 21 Nov P1–P5 | 2 | exam21-p2-1, exam21-p2-2, exam21-p2-3, exam21-storage | out-06 |
| Static local persistence * | Core — p2 Q16 | 2 | exam21-rec-factorial-1, exam21-rec-factorial-2, exam21-storage | past-11.1, out-07, mock-d2 |
| Block scope | Core — p2 Q16 | 1 | exam21-storage | past-11.1, out-06, mock-e2 |
| extern declaration concept | Extra — additional syllabus practice | 1 | exam21-storage |  |
| auto and register concepts | Extra — additional syllabus practice | 1 | exam21-storage |  |

## New question manifest

GCC is not readable in this sandbox. These are the exact new IDs for a supervisor to compile using `npm run verify:content -- --require-gcc`. No verified flags are authored.

- exam21-p1-1 (core, original)
- exam21-p1-2 (core, original)
- exam21-p1-3 (core, original)
- exam21-p2-1 (core, original)
- exam21-p2-2 (core, original)
- exam21-p2-3 (core, original)
- exam21-p3-1 (core, original)
- exam21-p3-2 (core, original)
- exam21-p3-3 (core, original)
- exam21-p4-1 (core, original)
- exam21-p4-2 (core, original)
- exam21-p4-3 (core, original)
- exam21-p5-1 (core, original)
- exam21-p5-2 (core, original)
- exam21-p5-3 (core, original)
- exam21-indexed-extremes-1 (core, original)
- exam21-indexed-extremes-2 (core, original)
- exam21-bitwork (core, original)
- exam21-decisions (core, original)
- exam21-sentinel (core, original)
- exam21-pyramid (extra, original)
- exam21-digit-lab (core, original)
- exam21-number-tools (core, original)
- exam21-series (core, original)
- exam21-binary-1 (extra, original)
- exam21-binary-2 (extra, original)
- exam21-search-count-1 (core, original)
- exam21-search-count-2 (core, original)
- exam21-bubble-1 (extra, original)
- exam21-bubble-2 (extra, original)
- exam21-insertion (extra, original)
- exam21-rotate-prefix (extra, original)
- exam21-insert-delete (extra, original)
- exam21-matrix-totals-1 (extra, original)
- exam21-matrix-totals-2 (extra, original)
- exam21-transpose-check (core, original)
- exam21-multiply-1 (extra, original)
- exam21-multiply-2 (extra, original)
- exam21-matrix-search (extra, original)
- exam21-character-count-1 (core, original)
- exam21-character-count-2 (core, original)
- exam21-palindrome-clean (extra, original)
- exam21-words-substring (extra, original)
- exam21-line-numbers (extra, original)
- exam21-string-sort (extra, original)
- exam21-swap-1 (core, original)
- exam21-swap-2 (core, original)
- exam21-pointer-walk (core, original)
- exam21-rec-factorial-1 (extra, original)
- exam21-rec-factorial-2 (extra, original)
- exam21-recursive-numbers (extra, original)
- exam21-recursive-text (extra, original)
- exam21-record-sort (core, original)
- exam21-enum-record (extra, original)
- exam21-grow-1 (extra, original)
- exam21-grow-2 (extra, original)
- exam21-heap-matrix (extra, original)
- exam21-update-modes-1 (extra, original)
- exam21-update-modes-2 (extra, original)
- exam21-file-copy-count (extra, original)
- exam21-text-records (core, original)
- exam21-storage (extra, original)
- mock-d1 (core, mock)
- mock-d2 (core, mock)
- mock-d3 (core, mock)
- mock-d4 (core, mock)
- mock-d5 (core, mock)
- mock-e1 (core, mock)
- mock-e2 (core, mock)
- mock-e3 (core, mock)
- mock-e4 (core, mock)
- mock-e5 (core, mock)
- mock-f1 (extra, mock)
- mock-f2 (extra, mock)
- mock-f3 (extra, mock)
- mock-f4 (extra, mock)
- mock-f5 (extra, mock)
