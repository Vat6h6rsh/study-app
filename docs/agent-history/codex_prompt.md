You are preparing exam study material for a beginner C programming student (BITS BCS ZC313 Introduction to Programming).

Input: papers_text/p1.txt .. p5.txt (pdftotext of 5 past comprehensive exam papers; see papers_text/INDEX.txt). Code in them may have PDF extraction damage (e.g. missing "->" or "." operators, broken lines) - reconstruct sensibly and note it.

Upcoming exam format (from the instructor): computer based, NO theory and NO flowchart questions; 5 questions, each ~10 fill-in-the-blanks in C code; partial marks per blank. Weeks 5-9 of the course matter most (roughly: loops/arrays, strings, functions/recursion, pointers, structs, dynamic memory, file handling).

Write ONE file: question_bank.md, containing:
1. "Topic frequency" table: each topic, how many papers it appeared in, marks share, and a priority (HIGH/MED/LOW) given the format above. Mark theory/flowchart-only items as SKIP.
2. Questions grouped BY TOPIC (not by paper), most important topics first. For every code/fill-in-the-blank/output-prediction question: the cleaned-up code with blanks, source tag like [p4 Q6], the correct answer for every blank, and a 1-2 line plain-English reason. For output-prediction questions, trace step by step and give exact output. Be careful and double-check every answer by mental execution; flag any blank where more than one answer is acceptable and list alternatives.
3. A final section "Recurring patterns / idioms to memorise": the exact code idioms that keep reappearing (e.g. digit-extraction loop, column-sum loop, malloc of struct array, (ptr+i)->field, fopen modes, swap via XOR), each as a minimal correct snippet.
Theory-only questions: list them briefly in an appendix with one-line answers (low priority).
Do not modify the papers_text files. Be accurate over fast.
