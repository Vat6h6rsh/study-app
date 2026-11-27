# Slot 1 lessons: every question solved and explained

Topic ID: `slot1lessons`

Every Slot 1 pattern practice question and every part of Mocks 4 and 5, explained like a teacher: what is asked, what you need to know, each step and why, how to write it in the exam, common mistakes, and a quick self-check. Read a topic's lessons in a row: each one shows the same method from a slightly different angle.

Tip: Read the first lesson of a topic slowly, then skim the rest looking only at "Solving it step by step"; the pattern repeats.

Trap: The answers are verified, but marks come from showing the steps. Always write the method, not just the final value.

Remember: Induction answers must be full proofs: statement, basis, hypothesis, inductive step, conclusion.

Note: The same lessons appear under each question in Practice and in the Mock 4/5 reports.

## The five answer shapes to type

```text
Truth table: rows 2^n; columns innermost bracket first; final column; conclusion.
Induction: P(n) statement; basis; hypothesis P(k); step to P(k+1); conclusion by induction.
Poset: levels; cover edges; maximal/minimal; LUB/GLB for each pair; lattice or not, with reason.
Equivalence: reflexive, symmetric, transitive checks; list every class; count them.
Recurrence: characteristic equation; roots; homogeneous form; particular guess; constants; final a_n.
Kruskal: sort edges; Step i add/reject XY(w) with reason; stop at V-1 edges; total weight.
```

## Q1a · Truth tables

### Slot 1 Q1a: reported nested implication

#### 🎯 What is being asked

This is a truth-table question (logic). You must build a table for ((p -> q) -> r) -> s. It has four variables p, q, r, s, so there are 2^4 = 16 rows. You show three working columns (p -> q, then (p -> q) -> r, then the whole formula) and finally say whether the last column is a tautology (always T), a contradiction (always F) or a contingency (a mix of T and F).

#### ✍️ What to write in the exam

```text
Rows in order TTTT ... FFFF (16 rows). Columns: p -> q ; (p -> q) -> r ; ((p -> q) -> r) -> s.
pqrs | p -> q | (p -> q) -> r | ((p -> q) -> r) -> s
TTTT | T | T | T
TTTF | T | T | F
TTFT | T | F | T
TTFF | T | F | T
TFTT | F | T | T
TFTF | F | T | F
TFFT | F | T | T
TFFF | F | T | F
FTTT | T | T | T
FTTF | T | T | F
FTFT | T | F | T
FTFF | T | F | T
FFTT | T | T | T
FFTF | T | T | F
FFFT | T | F | T
FFFF | T | F | T
Each implication is F only when its left side is T and its right side is F.
The final column contains both T and F, so ((p -> q) -> r) -> s is a contingency.
```

#### 🪜 How it is solved, step by step

1. List the 16 rows. Column p: 8 T then 8 F; q: 4 T, 4 F, 4 T, 4 F; r: pairs TTFF...; s: alternating T, F.
2. Column p -> q. It is F only when p=T and q=F: rows 5, 6, 7, 8. All other rows are T.
3. Column (p -> q) -> r. Left part = the column from step 2, right part = r. It is F only when (p -> q)=T and r=F. Rows with r=F are 3, 4, 7, 8, 11, 12, 15, 16. Rows 7 and 8 have p -> q = F, so they turn T. The F rows are 3, 4, 11, 12, 15, 16.
4. Last column = (step 3 column) -> s. It is F only when the step 3 column is T and s=F. Rows with s=F are the even rows 2, 4, ..., 16. Remove those where step 3 was F (rows 4, 12, 16). The F rows are 2, 6, 8, 10, 14.
5. The last column contains both T and F, so it is a contingency.

```text
pqrs | p -> q | (p -> q) -> r | ((p -> q) -> r) -> s
TTTT | T | T | T
TTTF | T | T | F
TTFT | T | F | T
TTFF | T | F | T
TFTT | F | T | T
TFTF | F | T | F
TFFT | F | T | T
TFFF | F | T | F
FTTT | T | T | T
FTTF | T | T | F
FTFT | T | F | T
FTFF | T | F | T
FFTT | T | T | T
FFTF | T | T | F
FFFT | T | F | T
FFFF | T | F | T
```

(Each row lists the values of p, q, r, s as four letters, then the three columns.)

#### 📘 Concept refresher

The only connective is the implication p -> q, read "if p then q". It is false in exactly ONE case: p is T and q is F. Every other case is T. Example: the promise "if it rains (T) I stay home (F)" is broken only in that one combination; if it does not rain the promise is never broken.

A formula with implications inside implications is evaluated from the innermost bracket outward, so each layer gets its own column. Rows are written T before F with p changing slowest: TTTT, TTTF, TTFT, ... FFFF.

#### ⚠️ Common mistakes

- Treating p -> q as false whenever p is F. When p is F the implication is T.
- Computing the last column straight from p, q, r, s instead of from the previous column.
- Writing the rows with F before T, or listing only 8 rows for 4 variables.
- Giving no classification sentence, which loses the final mark.

#### ✅ Check yourself

1. Which rows make (p -> q) -> r false? Answer: rows where p -> q is T and r is F: rows 3, 4, 11, 12, 15, 16.
2. What would you write if the last column were all T? Answer: tautology.

### Slot 1 Q1a: implication variant 1

#### 🎯 What is being asked

Build the truth table for ((p -> q) ^ (q -> r)) -> (p -> r) with three variables (8 rows), showing the columns p -> q, q -> r and the full formula, then classify the final column.

#### ✍️ What to write in the exam

```text
Columns: p -> q ; q -> r ; ((p -> q) ^ (q -> r)) -> (p -> r)
pqr | p -> q | q -> r | ((p -> q) ^ (q -> r)) -> (p -> r)
TTT | T | T | T
TTF | T | F | T
TFT | F | T | T
TFF | F | T | T
FTT | T | T | T
FTF | T | F | T
FFT | T | T | T
FFF | T | T | T
The final column is T in all 8 rows, so the formula is a tautology.
```

#### 🪜 How it is solved, step by step

1. Write the 8 rows TTT, TTF, TFT, TFF, FTT, FTF, FFT, FFF.
2. p -> q is F when p=T, q=F: rows 3 and 4. Everything else T.
3. q -> r is F when q=T, r=F: rows 2 and 6. Everything else T.
4. The left side (p -> q) ^ (q -> r) is T only when neither column is F: rows 1, 5, 7, 8. In rows 2, 3, 4, 6 the left side is F, so the whole implication is automatically T (F -> anything is T).
5. In rows 1, 5, 7, 8 look at the right side p -> r: row 1 (T,T,T) gives T; row 5 (F,T,T) gives T; row 7 (F,F,T) gives T; row 8 (F,F,F) gives T. So the whole formula is T there too.
6. The final column is all T: tautology.

```text
pqr | p -> q | q -> r | ((p -> q) ^ (q -> r)) -> (p -> r)
TTT | T | T | T
TTF | T | F | T
TFT | F | T | T
TFF | F | T | T
FTT | T | T | T
FTF | T | F | T
FFT | T | T | T
FFF | T | T | T
```

#### 📘 Concept refresher

Implication p -> q is false only for p=T, q=F. The symbol ^ means AND: A ^ B is T only when both A and B are T. A tautology is T in every row. This formula is the "chain rule" (hypothetical syllogism): if p leads to q and q leads to r, then p leads to r.

A clever way to see the answer: a big implication can only be false if its left side is T and its right side is F. So ask whether that can ever happen.

#### ⚠️ Common mistakes

- Reading ^ as OR.
- Forgetting that F -> anything is T, which fills in the rows where the left side is F.
- Listing only the final column without the two required working columns.
- Writing "valid" instead of the requested word tautology.

#### ✅ Check yourself

1. In which rows is (p -> q) ^ (q -> r) true? Answer: rows 1, 5, 7, 8.
2. Could the formula ever be F? Answer: it would need p -> r false (p=T, r=F) with the left side true, but then p -> q forces q=T and q -> r forces r=T, a contradiction. So never.

### Slot 1 Q1a: implication variant 2

#### 🎯 What is being asked

Make a truth table with the two columns p -> (q -> r) and (p ^ q) -> r, then decide whether these two complete expressions are logically equivalent (the same value in every row). The answer is Yes, and the table is the proof.

#### ✍️ What to write in the exam

```text
Columns: p -> (q -> r) ; (p ^ q) -> r
pqr | p -> (q -> r) | (p ^ q) -> r
TTT | T | T
TTF | F | F
TFT | T | T
TFF | T | T
FTT | T | T
FTF | T | T
FFT | T | T
FFF | T | T
The two complete columns agree in all 8 rows (each is F only for p=T,q=T,r=F),
so p -> (q -> r) and (p ^ q) -> r are logically equivalent.
```

#### 🪜 How it is solved, step by step

1. Write the 8 rows for p, q, r in T-before-F order.
2. For p -> (q -> r): first the inner q -> r, which is F only when q=T, r=F (rows 2 and 6). Then p -> (inner) is F only when p=T and inner = F. Row 2 (T,T,F): p=T, inner F, so F. Row 6 (F,T,F): p=F, so T. The only F is row 2.
3. For (p ^ q) -> r: p ^ q is T only in rows 1 and 2. A T -> r is F only if r=F. Row 2 (T,T,F): T -> F = F. Row 1: T -> T = T. All other rows have p ^ q = F so the implication is T. The only F is row 2.
4. Compare the two columns row by row: both are F in row 2 and T everywhere else, so they are identical.
5. Conclusion: they are equivalent.

```text
pqr | p -> (q -> r) | (p ^ q) -> r
TTT | T | T
TTF | F | F
TFT | T | T
TFF | T | T
FTT | T | T
FTF | T | T
FFT | T | T
FFF | T | T
```

#### 📘 Concept refresher

Two formulas are logically equivalent when their columns are identical row by row. This particular fact is called exportation: "if p then (if q then r)" means the same as "if p and q, then r". Implication is false only for T -> F.

#### ⚠️ Common mistakes

- Evaluating p -> (q -> r) as (p -> q) -> r. Brackets matter: the inner part is q -> r.
- Comparing an intermediate column (like q -> r) with the other formula by mistake.
- Saying "they look equal" without stating which columns were compared.
- Leaving out the conclusion sentence.

#### ✅ Check yourself

1. Where does the single F come from? Answer: only p=T, q=T, r=F makes the hypotheses true and the conclusion r false.
2. What is this equivalence called? Answer: exportation.

### Slot 1 Q1a: implication variant 3

#### 🎯 What is being asked

Build the table for the two formulas (p -> q) -> r and p -> (q -> r) and say whether they are equivalent. The correct answer is No, and the proof is a row where they differ.

#### ✍️ What to write in the exam

```text
Columns: (p -> q) -> r ; p -> (q -> r)
pqr | (p -> q) -> r | p -> (q -> r)
TTT | T | T
TTF | F | F
TFT | T | T
TFF | T | T
FTT | T | T
FTF | F | T
FFT | T | T
FFF | F | T
The columns differ, for example in the row p=F,q=T,r=F (F versus T),
so (p -> q) -> r and p -> (q -> r) are not equivalent.
```

#### 🪜 How it is solved, step by step

1. Rows for p, q, r: TTT, TTF, TFT, TFF, FTT, FTF, FFT, FFF.
2. (p -> q) -> r. First p -> q is F in rows 3 and 4 (p=T, q=F) and T elsewhere. Then (p -> q) -> r is F only when p -> q is T and r=F: row 2 (T,T,F), row 6 (F,T,F), row 8 (F,F,F). Row 4 has p -> q = F, so it is T. F rows: 2, 6, 8.
3. p -> (q -> r). q -> r is F when q=T, r=F (rows 2, 6). The formula is F only if p=T and q -> r is F: row 2 only. Row 6 has p=F, so it is T.
4. Compare: row 2 both F; row 6 first F, second T; row 8 first F, second T. The columns differ.
5. Counterexample row: p=F, q=T, r=F. Then p -> q is T, so (p -> q) -> r = T -> F = F, but p is F, so p -> (q -> r) = T.

```text
pqr | (p -> q) -> r | p -> (q -> r)
TTT | T | T
TTF | F | F
TFT | T | T
TFF | T | T
FTT | T | T
FTF | F | T
FFT | T | T
FFF | F | T
```

#### 📘 Concept refresher

Implication is NOT associative: the brackets change the meaning. To show two formulas are NOT equivalent you only need ONE row where their values differ. To show equivalence you would need every row to match.

#### ⚠️ Common mistakes

- Assuming implication is associative and answering Yes.
- Saying No without naming a differing row.
- Computing the first formula as p -> (q -> r) by ignoring the brackets.
- Forgetting that p -> (...) is automatically T when p is F.

#### ✅ Check yourself

1. How many rows differ? Answer: two, rows 6 (FTF) and 8 (FFF).
2. Is one differing row enough to prove non-equivalence? Answer: yes.

### Slot 1 Q1a: implication variant 4

#### 🎯 What is being asked

Four variables, so 16 rows, with the working columns p -> q, r -> s and the full formula ((p -> q) ^ (r -> s)) -> ((p ^ r) -> (q ^ s)). Then classify the final column.

#### ✍️ What to write in the exam

```text
Columns: p -> q ; r -> s ; ((p -> q) ^ (r -> s)) -> ((p ^ r) -> (q ^ s))
pqrs | p -> q | r -> s | ((p -> q) ^ (r -> s)) -> ((p ^ r) -> (q ^ s))
TTTT | T | T | T
TTTF | T | F | T
TTFT | T | T | T
TTFF | T | T | T
TFTT | F | T | T
TFTF | F | F | T
TFFT | F | T | T
TFFF | F | T | T
FTTT | T | T | T
FTTF | T | F | T
FTFT | T | T | T
FTFF | T | T | T
FFTT | T | T | T
FFTF | T | F | T
FFFT | T | T | T
FFFF | T | T | T
The final column is T in every row, so the formula is a tautology.
```

#### 🪜 How it is solved, step by step

1. Write the 16 rows (p slowest, s fastest, T before F).
2. p -> q is F when p=T, q=F: rows 5 to 8.
3. r -> s is F when r=T, s=F: rows 2, 6, 10, 14.
4. The hypothesis (p -> q) ^ (r -> s) is T only in rows where neither column is F. In the other rows it is F, so the whole formula is T automatically.
5. In the hypothesis-true rows check the conclusion (p ^ r) -> (q ^ s). If p ^ r is F it is T. If p=T and r=T, then p -> q being T forces q=T and r -> s being T forces s=T, so q ^ s = T and the conclusion is T.
6. So the final column is T in all 16 rows: tautology.

```text
pqrs | p -> q | r -> s | ((p -> q) ^ (r -> s)) -> ((p ^ r) -> (q ^ s))
TTTT | T | T | T
TTTF | T | F | T
TTFT | T | T | T
TTFF | T | T | T
TFTT | F | T | T
TFTF | F | F | T
TFFT | F | T | T
TFFF | F | T | T
FTTT | T | T | T
FTTF | T | F | T
FTFT | T | T | T
FTFF | T | T | T
FFTT | T | T | T
FFTF | T | F | T
FFFT | T | T | T
FFFF | T | T | T
```

#### 📘 Concept refresher

Implication is false only for T -> F. A ^ B is T only when both are T. Read the formula as: "if p implies q, and r implies s, then (p and r) implies (q and s)". Intuitively that is always true: if p and r both hold, then q and s both follow. So we expect a tautology, and the table confirms it.

#### ⚠️ Common mistakes

- Not building the two small implications first and guessing the big column.
- Mis-ordering rows: p must change slowest.
- Evaluating (p ^ r) -> (q ^ s) without looking at the hypothesis column first.
- Leaving out the word tautology.

#### ✅ Check yourself

1. Which rows make r -> s false? Answer: r=T, s=F: rows 2, 6, 10, 14.
2. If the final column had one F, what is the classification? Answer: contingency.

## Q1b · Induction proofs (divisibility)

### Slot 1 Q1b: reported divisibility proof

#### 🎯 What is being asked

Prove by mathematical induction that 57 divides 7^(n+2) + 8^(2*n+1) for all integers n >= 0. You must give all five parts: the statement P(n), the basis, the hypothesis with an integer m, the inductive step with algebra, and a conclusion sentence.

#### ✍️ What to write in the exam

```text
Let P(n) be the statement: 57 divides 7^(n+2)+8^(2*n+1), for every integer n>=0.
Basis: at n=0, 7^(0+2)+8^(2*0+1)=49+8=57=57*1. Thus P(0) holds.
Inductive hypothesis: let k>=0 be arbitrary and assume P(k). Then 7^(k+2)+8^(2*k+1)=57*m for some integer m.
Inductive step: we prove P(k+1).
7^(k+3)+8^(2*k+3)
= 7*(7^(k+2)+8^(2*k+1))+57*8^(2*k+1)   [since 64=7+57]
= 57*(7*m+8^(2*k+1))
Let t = 7*m+8^(2*k+1). Since k and m are integers, t is an integer.
Hence the expression in P(k+1) equals 57*t, so 57 divides it and P(k+1) holds.
Conclusion: the basis and the inductive step are proved, so by the principle of
mathematical induction P(n) holds for every integer n>=0.
```

#### 🪜 How it is solved, step by step

1. P(n): 57 divides 7^(n+2) + 8^(2n+1), domain n >= 0.
2. Basis n=0: 7^2 + 8^1 = 49 + 8 = 57 = 57*1. True.
3. Hypothesis: 7^(k+2) + 8^(2k+1) = 57m for some integer m.
4. P(k+1) is 7^(k+3) + 8^(2k+3). Powers: 7^(k+3) = 7*7^(k+2), and 8^(2k+3) = 8^2 * 8^(2k+1) = 64*8^(2k+1).
5. We need the same multiplier (7) on both terms so the hypothesis bracket can be factored out. So split 64 = 7 + 57: 64*8^(2k+1) = 7*8^(2k+1) + 57*8^(2k+1).
6. Then 7^(k+3) + 8^(2k+3) = 7*(7^(k+2) + 8^(2k+1)) + 57*8^(2k+1).
7. Replace the bracket by 57m: 7*57m + 57*8^(2k+1) = 57*(7m + 8^(2k+1)). The factor t = 7m + 8^(2k+1) is an integer.

#### 📘 Concept refresher

"57 divides X" means X = 57 times an integer. Induction has two jobs: (1) show the statement is true for the first value (the basis); (2) show that if it is true for some k then it is true for k+1. Think of dominoes: the first one falls, and each one knocks over the next.

For divisibility, assume 7^(k+2) + 8^(2k+1) = 57m, then rewrite the (k+1) expression so that this exact bracket appears, plus something that is visibly a multiple of 57.

#### ⚠️ Common mistakes

- Starting the inductive step by assuming P(k+1). You must begin from the expression for k+1 and finish at a multiple of 57.
- Not splitting 64 = 7 + 57, so the leftover is not visibly a multiple of 57.
- Writing "57m" for the whole thing but never naming the new integer t.
- Leaving out the final conclusion sentence mentioning induction.

#### ✅ Check yourself

1. How is 64 split and why? Answer: 7 + 57, so one part matches the multiplier 7 and the other is a multiple of 57.
2. Check n=1: 7^3 + 8^3 = 343 + 512 = 855 = 57*15. Correct.

### Slot 1 Q1b: divisibility variant 1

#### 🎯 What is being asked

Prove by induction that 133 divides 11^(n+1) + 12^(2*n-1) for all integers n >= 1. Note that the start is n=1, not 0.

#### ✍️ What to write in the exam

```text
Let P(n) be the statement: 133 divides 11^(n+1)+12^(2*n-1), for every integer n>=1.
Basis: at n=1, 11^(1+1)+12^(2*1-1)=121+12=133=133*1. Thus P(1) holds.
Inductive hypothesis: let k>=1 be arbitrary and assume P(k). Then 11^(k+1)+12^(2*k-1)=133*m for some integer m.
Inductive step: we prove P(k+1).
11^(k+2)+12^(2*k+1)
= 11*(11^(k+1)+12^(2*k-1))+133*12^(2*k-1)   [since 144=11+133]
= 133*(11*m+12^(2*k-1))
Let t = 11*m+12^(2*k-1). Since k and m are integers, t is an integer.
Hence the expression in P(k+1) equals 133*t, so 133 divides it and P(k+1) holds.
Conclusion: the basis and the inductive step are proved, so by the principle of
mathematical induction P(n) holds for every integer n>=1.
```

#### 🪜 How it is solved, step by step

1. P(n): 133 divides 11^(n+1) + 12^(2n-1), n >= 1.
2. Basis n=1: 11^2 + 12^1 = 121 + 12 = 133 = 133*1.
3. Hypothesis: 11^(k+1) + 12^(2k-1) = 133m, k >= 1.
4. For k+1: 11^(k+2) + 12^(2(k+1)-1) = 11^(k+2) + 12^(2k+1). Now 11^(k+2) = 11*11^(k+1), and 12^(2k+1) = 144*12^(2k-1) because 2k+1 = (2k-1)+2 and 12^2 = 144.
5. We want multiplier 11 on both terms. Split 144 = 11 + 133, so 144*12^(2k-1) = 11*12^(2k-1) + 133*12^(2k-1).
6. Sum: 11*(11^(k+1) + 12^(2k-1)) + 133*12^(2k-1) = 11*133m + 133*12^(2k-1) = 133*(11m + 12^(2k-1)).
7. t = 11m + 12^(2k-1) is an integer (for k >= 1 the exponent 2k-1 is a positive integer).

#### 📘 Concept refresher

Induction starts at whatever value the question gives (here n=1), and the conclusion must be stated for that domain. "133 divides X" means X = 133*m for an integer m. Plan: assume it for k, then show k+1 gives 133 times another integer.

#### ⚠️ Common mistakes

- Using the basis n=0, which is outside the domain and gives a negative exponent.
- Writing 2(k+1)-1 wrongly instead of 2k+1.
- Splitting 144 incorrectly; always check 11 + 133 = 144.
- Concluding "for all n >= 0" instead of n >= 1.

#### ✅ Check yourself

1. Where does 144 come from? Answer: 12^2, because the exponent goes from 2k-1 to 2k+1.
2. Check n=2: 11^3 + 12^3 = 1331 + 1728 = 3059 = 133*23. Correct.

### Slot 1 Q1b: divisibility variant 2

#### 🎯 What is being asked

Prove by induction that 24 divides 5^(2*n) - 1 for every integer n >= 0, with the full five-part layout.

#### ✍️ What to write in the exam

```text
Let P(n) be the statement: 24 divides 5^(2*n)-1, for every integer n>=0.
Basis: at n=0, 5^(2*0)-1=0=24*0. Thus P(0) holds.
Inductive hypothesis: let k>=0 be arbitrary and assume P(k). Then 5^(2*k)-1=24*m for some integer m.
Inductive step: we prove P(k+1).
5^(2*(k+1))-1
= 25*(5^(2*k)-1)+24
= 24*(25*m+1)
Let t = 25*m+1. Since k and m are integers, t is an integer.
Hence the expression in P(k+1) equals 24*t, so 24 divides it and P(k+1) holds.
Conclusion: the basis and the inductive step are proved, so by the principle of
mathematical induction P(n) holds for every integer n>=0.
```

#### 🪜 How it is solved, step by step

1. P(n): 24 divides 5^(2n) - 1, n >= 0.
2. Basis n=0: 5^0 - 1 = 1 - 1 = 0 = 24*0. True (0 is a multiple of 24).
3. Hypothesis: 5^(2k) - 1 = 24m.
4. For k+1: 5^(2(k+1)) - 1 = 5^(2k+2) - 1 = 25*5^(2k) - 1.
5. To make the bracket (5^(2k) - 1) appear: 25*5^(2k) - 1 = 25*(5^(2k) - 1) + 25 - 1 = 25*(5^(2k) - 1) + 24.
6. Substitute: 25*24m + 24 = 24*(25m + 1).
7. t = 25m + 1 is an integer, so 24 divides the expression for k+1.

#### 📘 Concept refresher

"24 divides X" means X = 24 times an integer. A "minus 1" expression is the easiest case: write the next term as (a multiplier) times the old bracket plus a multiple of 24. Here 5^(2n) = 25^n, so each step multiplies by 25, and 25 - 1 = 24.

#### ⚠️ Common mistakes

- Not accepting 0 as a multiple of 24 in the basis (0 = 24*0).
- Writing 25*(5^(2k)-1) and forgetting the extra +24.
- Using multiplier 5 instead of 25 (the exponent rises by 2).
- No conclusion sentence.

#### ✅ Check yourself

1. Why +24? Answer: 25*(x-1) = 25x - 25, so we add 24 to get 25x - 1.
2. Check n=1: 25 - 1 = 24 = 24*1. Correct.

### Slot 1 Q1b: divisibility variant 3

#### 🎯 What is being asked

Prove by induction that 7 divides 3^(2*n+1) + 2^(n+2) for all integers n >= 0.

#### ✍️ What to write in the exam

```text
Let P(n) be the statement: 7 divides 3^(2*n+1)+2^(n+2), for every integer n>=0.
Basis: at n=0, 3^(2*0+1)+2^(0+2)=3+4=7=7*1. Thus P(0) holds.
Inductive hypothesis: let k>=0 be arbitrary and assume P(k). Then 3^(2*k+1)+2^(k+2)=7*m for some integer m.
Inductive step: we prove P(k+1).
3^(2*k+3)+2^(k+3)
= 9*(3^(2*k+1)+2^(k+2))-7*2^(k+2)   [since 9-2=7]
= 7*(9*m-2^(k+2))
Let t = 9*m-2^(k+2). Since k and m are integers, t is an integer.
Hence the expression in P(k+1) equals 7*t, so 7 divides it and P(k+1) holds.
Conclusion: the basis and the inductive step are proved, so by the principle of
mathematical induction P(n) holds for every integer n>=0.
```

#### 🪜 How it is solved, step by step

1. P(n): 7 divides 3^(2n+1) + 2^(n+2), n >= 0.
2. Basis n=0: 3^1 + 2^2 = 3 + 4 = 7 = 7*1.
3. Hypothesis: 3^(2k+1) + 2^(k+2) = 7m.
4. For k+1: 3^(2k+3) + 2^(k+3). Now 3^(2k+3) = 9*3^(2k+1) and 2^(k+3) = 2*2^(k+2).
5. Take multiplier 9 on the whole bracket: 9*(3^(2k+1) + 2^(k+2)) = 3^(2k+3) + 9*2^(k+2). The target only has 2*2^(k+2), so we must remove 7*2^(k+2) (since 9 - 2 = 7).
6. So 3^(2k+3) + 2^(k+3) = 9*(3^(2k+1) + 2^(k+2)) - 7*2^(k+2).
7. Substitute: 9*7m - 7*2^(k+2) = 7*(9m - 2^(k+2)). t = 9m - 2^(k+2) is an integer.

#### 📘 Concept refresher

"7 divides X" means X = 7m. When the two powers grow at different rates (the first is multiplied by 9 per step, the second by 2), you pick one multiplier for the hypothesis bracket and correct the other term with a multiple of 7. The correction may be a subtraction, so t may contain a minus sign; it is still an integer.

#### ⚠️ Common mistakes

- Choosing the multiplier 3 or 2 so the bracket does not match.
- Getting the sign of the correction wrong; expand back to check.
- Writing 3^(2k+3) as 3^(2k)+3 (exponent rules: add exponents when multiplying).
- Thinking t must be positive; it only has to be an integer.

#### ✅ Check yourself

1. Why subtract 7*2^(k+2)? Answer: 9*2^(k+2) is 7*2^(k+2) too big compared with 2*2^(k+2).
2. Check n=1: 3^3 + 2^3 = 27 + 8 = 35 = 7*5. Correct.

### Slot 1 Q1b: divisibility variant 4

#### 🎯 What is being asked

Prove by induction that 3 divides n^3 + 2*n for every integer n >= 0. Unlike the other divisibility questions, this one is a polynomial, not an exponential.

#### ✍️ What to write in the exam

```text
Let P(n) be the statement: 3 divides n^3+2*n, for every integer n>=0.
Basis: at n=0, 0^3+2*0=0=3*0. Thus P(0) holds.
Inductive hypothesis: let k>=0 be arbitrary and assume P(k). Then k^3+2*k=3*m for some integer m.
Inductive step: we prove P(k+1).
(k+1)^3+2*(k+1)
= (k^3+2*k)+3*(k^2+k+1)
= 3*(m+k^2+k+1)
Let t = m+k^2+k+1. Since k and m are integers, t is an integer.
Hence the expression in P(k+1) equals 3*t, so 3 divides it and P(k+1) holds.
Conclusion: the basis and the inductive step are proved, so by the principle of
mathematical induction P(n) holds for every integer n>=0.
```

#### 🪜 How it is solved, step by step

1. P(n): 3 divides n^3 + 2n, n >= 0.
2. Basis n=0: 0^3 + 2*0 = 0 = 3*0.
3. Hypothesis: k^3 + 2k = 3m.
4. For k+1: (k+1)^3 + 2(k+1) = k^3 + 3k^2 + 3k + 1 + 2k + 2.
5. Regroup: (k^3 + 2k) + (3k^2 + 3k + 3) = (k^3 + 2k) + 3*(k^2 + k + 1).
6. Substitute 3m for the first bracket: 3m + 3*(k^2 + k + 1) = 3*(m + k^2 + k + 1).
7. t = m + k^2 + k + 1 is an integer because k and m are.

#### 📘 Concept refresher

For polynomials, expand (k+1)^3 using (k+1)^3 = k^3 + 3k^2 + 3k + 1, then group the terms into "the hypothesis expression" plus "something with a visible factor 3". "3 divides X" means X = 3m.

#### ⚠️ Common mistakes

- Expanding (k+1)^3 as k^3 + 1.
- Not grouping k^3 + 2k so that the hypothesis appears.
- Dropping the 2 in 2(k+1) = 2k + 2.
- Forgetting the conclusion sentence.

#### ✅ Check yourself

1. What is (k+1)^3? Answer: k^3 + 3k^2 + 3k + 1.
2. Check n=2: 8 + 4 = 12 = 3*4. Correct.

### Slot 1 Q1b: divisibility variant 5

#### 🎯 What is being asked

Prove by induction that 5 divides 6^n - 1 for every integer n >= 0. This is the simplest pattern and a model for all "a^n - 1" proofs.

#### ✍️ What to write in the exam

```text
Let P(n) be the statement: 5 divides 6^n-1, for every integer n>=0.
Basis: at n=0, 6^0-1=0=5*0. Thus P(0) holds.
Inductive hypothesis: let k>=0 be arbitrary and assume P(k). Then 6^k-1=5*m for some integer m.
Inductive step: we prove P(k+1).
6^(k+1)-1
= 6*(6^k-1)+5
= 5*(6*m+1)
Let t = 6*m+1. Since k and m are integers, t is an integer.
Hence the expression in P(k+1) equals 5*t, so 5 divides it and P(k+1) holds.
Conclusion: the basis and the inductive step are proved, so by the principle of
mathematical induction P(n) holds for every integer n>=0.
```

#### 🪜 How it is solved, step by step

1. P(n): 5 divides 6^n - 1, n >= 0.
2. Basis n=0: 6^0 - 1 = 0 = 5*0.
3. Hypothesis: 6^k - 1 = 5m.
4. For k+1: 6^(k+1) - 1 = 6*6^k - 1.
5. Add and subtract 6: 6*6^k - 6 + 6 - 1 = 6*(6^k - 1) + 5.
6. Substitute 5m: 6*5m + 5 = 5*(6m + 1).
7. t = 6m + 1 is an integer.

#### 📘 Concept refresher

"5 divides X" means X = 5 times an integer. The trick for a^n - 1: a^(k+1) - 1 = a*(a^k - 1) + (a - 1). The last part, a - 1 = 5, is automatically a multiple of 5.

#### ⚠️ Common mistakes

- Writing 6^(k+1) - 1 = 6*(6^k - 1) without the +5.
- Skipping the integer factor name t.
- Treating the hypothesis as the claim for k+1.
- Writing no concluding sentence.

#### ✅ Check yourself

1. Where does the +5 come from? Answer: 6*(x-1) = 6x - 6, so adding 5 gives 6x - 1.
2. Check n=2: 36 - 1 = 35 = 5*7. Correct.

## Q2a · Sets

### Slot 1 Q2a: set operations

#### 🎯 What is being asked

Topic: **sets** (2 marks). Given A={1,2,3} and B={2,3,4}, compute A union B, A intersection B, A-B and the Cartesian product A x B, then say which of these operations are **commutative** (swapping the two sets never changes the answer). The answer is four explicit sets plus a sentence about commutativity with a reason.

#### ✍️ What to write in the exam

```text
A union B = {1,2,3,4}
A intersection B = {2,3}
A - B = {1}
A x B = {(1,2),(1,3),(1,4),(2,2),(2,3),(2,4),(3,2),(3,3),(3,4)}   (|A x B| = 3*3 = 9 ordered pairs)

Commutative: union (A union B = B union A) and intersection (A intersection B = B intersection A), because membership in 'A or B' / 'A and B' does not depend on the order of the sets.
Not commutative: difference, since A - B = {1} but B - A = {4}; and Cartesian product, since (1,2) is in A x B but not in B x A (1 is not in B).
```
Curly brackets for sets, round brackets for pairs, and state the pair count.

#### 🪜 How it is solved, step by step

**Step 1.** **Build a membership table.** List every element that appears anywhere ({1,2,3,4}) and ask two questions about each: is it in A, is it in B? Then read off the three answers.

| element | in A? | in B? | union | intersection | A-B |
|---|---|---|---|---|---|
| 1 | yes | no | yes | no | yes |
| 2 | yes | yes | yes | yes | no |
| 3 | yes | yes | yes | yes | no |
| 4 | no | yes | yes | no | no |

Column 'union' is yes for every row, so A union B={1,2,3,4}. The 'intersection' column is yes only where both answers are yes, so A intersection B={2,3}. The 'A-B' column is yes only for 'in A, not in B', so A-B={1}.

**Step 2.** **Cartesian product with a grid.** Put A down the side and B across the top; each cell is the ordered pair (row element, column element), with the A element first.

| A \ B | 2 | 3 | 4 |
|---|---|---|---|
| 1 | (1,2) | (1,3) | (1,4) |
| 2 | (2,2) | (2,3) | (2,4) |
| 3 | (3,2) | (3,3) | (3,4) |

Collecting every cell: A x B={(1,2),(1,3),(1,4),(2,2),(2,3),(2,4),(3,2),(3,3),(3,4)}. Count check: |A|*|B| = 3*3 = 9 pairs, and the grid has 9 cells.

**Step 3.** **Size check on the union.** |A union B| = |A| + |B| - |A intersection B| = 3 + 3 - 2 = 4, and {1,2,3,4} really has 4 elements. (We subtract the intersection because the shared elements were counted twice.)

**Step 4.** **Test commutativity by actually swapping.** B union A={1,2,3,4}, the same as A union B, because 'in A or in B' does not care about order. B intersection A={2,3}, the same, because 'in both' is symmetric. But B-A={4}, while A-B={1}, so difference is **not** commutative. For the product, B x A={(2,1),(2,2),(2,3),(3,1),(3,2),(3,3),(4,1),(4,2),(4,3)}. Compare with A x B: the pair (1,2) is in A x B, but it is not in B x A because 1 is not in B. So A x B is not equal to B x A.

#### 📘 Concept refresher

Think of a set as a bag of distinct things; order and repeats do not matter, so {1,2,2} is just {1,2}.

- **Union** A union B: everything that is in A, or in B, or in both. Write each element once.
- **Intersection** A intersection B: only what is in **both** A and B.
- **Difference** A-B: what is in A but **not** in B. Order matters: A-B and B-A are different questions.
- **Cartesian product** A x B: all **ordered pairs** (x,y) with x from A and y from B. The first coordinate always comes from the first set. So (1,2) and (2,1) are different pairs, and |A x B| = |A| * |B|.
- **Commutative** operation: swapping the two sets gives the same result.

Tiny example with X={a,b,c}, Y={b,c,d}: X union Y={a,b,c,d}, X intersection Y={b,c}, X-Y={a}.

#### ⚠️ Common mistakes

- Writing the pairs of A x B as sets, {1,2}, instead of ordered pairs (1,2). Order matters in a pair.
- Listing a shared element twice in the union (a set never repeats elements).
- Doing B-A when the question says A-B. Check which set comes first.
- Claiming difference or Cartesian product is commutative. Only union and intersection are.
- Missing pairs in A x B. Use a grid or 'one first coordinate at a time' so you get all 9.

#### ✅ Check yourself

1. What is B-A, and is it equal to A-B? **Answer:** B-A={4}; A-B={1}, so they are not equal.
2. How many pairs are in B x A, and does that equal A x B? **Answer:** 9 pairs (|B|*|A|), the same count as A x B, but the pairs themselves differ, so B x A is not equal to A x B.

### Slot 1 Q2a: set operations

#### 🎯 What is being asked

This is a **sets** question worth 2 marks. Given A={0,2,4} and B={1,2,4}, list A union B, A intersection B, A-B and A x B, then decide for each operation whether A op B always equals B op A. Your answer must contain the four sets written out in full, and a clear statement of which operations are commutative and which are not.

#### ✍️ What to write in the exam

```text
A union B = {0,1,2,4}
A intersection B = {2,4}
A - B = {0}
A x B = {(0,1),(0,2),(0,4),(2,1),(2,2),(2,4),(4,1),(4,2),(4,4)}   (|A x B| = 3*3 = 9 ordered pairs)

Commutative: union (A union B = B union A) and intersection (A intersection B = B intersection A), because membership in 'A or B' / 'A and B' does not depend on the order of the sets.
Not commutative: difference, since A - B = {0} but B - A = {1}; and Cartesian product, since (0,1) is in A x B but not in B x A (0 is not in B).
```
Curly brackets for sets, round brackets for pairs, and state the pair count.

#### 🪜 How it is solved, step by step

**Step 1.** **Split everything into three regions** (think of a two-circle Venn diagram). Only A (in A, not in B): {0}. In both: {2,4}. Only B (in B, not in A): {1}.

**Step 2.** **Read the answers off the regions.** Union = all three regions together = {0,1,2,4}. Intersection = the middle region = {2,4}. A-B = the 'only A' region = {0} (the middle region is thrown away, because those elements are also in B).

**Step 3.** **Cartesian product by first coordinate.** Take each element of A in turn and pair it with every element of B. With 0: (0,1),(0,2),(0,4). With 2: (2,1),(2,2),(2,4). With 4: (4,1),(4,2),(4,4). Joining these gives A x B={(0,1),(0,2),(0,4),(2,1),(2,2),(2,4),(4,1),(4,2),(4,4)}. Count check: |A|*|B| = 3*3 = 9, and we wrote 9 pairs.

**Step 4.** **Size check on the union.** |A union B| = |A| + |B| - |A intersection B| = 3 + 3 - 2 = 4, and {0,1,2,4} really has 4 elements. (We subtract the intersection because the shared elements were counted twice.)

**Step 5.** **Test commutativity by actually swapping.** B union A={0,1,2,4}, the same as A union B, because 'in A or in B' does not care about order. B intersection A={2,4}, the same, because 'in both' is symmetric. But B-A={1}, while A-B={0}, so difference is **not** commutative. For the product, B x A={(1,0),(1,2),(1,4),(2,0),(2,2),(2,4),(4,0),(4,2),(4,4)}. Compare with A x B: the pair (0,1) is in A x B, but it is not in B x A because 0 is not in B. So A x B is not equal to B x A.

#### 📘 Concept refresher

Think of a set as a bag of distinct things; order and repeats do not matter, so {1,2,2} is just {1,2}.

- **Union** A union B: everything that is in A, or in B, or in both. Write each element once.
- **Intersection** A intersection B: only what is in **both** A and B.
- **Difference** A-B: what is in A but **not** in B. Order matters: A-B and B-A are different questions.
- **Cartesian product** A x B: all **ordered pairs** (x,y) with x from A and y from B. The first coordinate always comes from the first set. So (1,2) and (2,1) are different pairs, and |A x B| = |A| * |B|.
- **Commutative** operation: swapping the two sets gives the same result.

Tiny example with P={5,6}, Q={6,7}: P union Q={5,6,7}, P intersection Q={6}, P-Q={5}.

#### ⚠️ Common mistakes

- Writing the pairs of A x B as sets, {0,1}, instead of ordered pairs (0,1). Order matters in a pair.
- Missing pairs in A x B. Use a grid or 'one first coordinate at a time' so you get all 9.
- Doing B-A when the question says A-B. Check which set comes first.
- Claiming difference or Cartesian product is commutative. Only union and intersection are.
- Listing a shared element twice in the union (a set never repeats elements).

#### ✅ Check yourself

1. How many elements does A union B have, using the formula? **Answer:** 3+3-2 = 4.
2. If A and B were the **same** set, would A x B equal B x A? **Answer:** Yes. Then both are A x A. Commutativity of the product fails only when the two sets differ (and neither is empty).

### Slot 1 Q2a: set operations

#### 🎯 What is being asked

Two finite sets are given: A={1,3} and B={2,3}. Compute the union, the intersection, the difference A-B and the Cartesian product A x B, and then comment on commutativity. The marks are split: 1 mark for the first three operations, 1 mark for the ordered product and the commutativity remark.

#### ✍️ What to write in the exam

```text
A union B = {1,2,3}
A intersection B = {3}
A - B = {1}
A x B = {(1,2),(1,3),(3,2),(3,3)}   (|A x B| = 2*2 = 4 ordered pairs)

Commutative: union (A union B = B union A) and intersection (A intersection B = B intersection A), because membership in 'A or B' / 'A and B' does not depend on the order of the sets.
Not commutative: difference, since A - B = {1} but B - A = {2}; and Cartesian product, since (1,2) is in A x B but not in B x A (1 is not in B).
```
Curly brackets for sets, round brackets for pairs, and state the pair count.

#### 🪜 How it is solved, step by step

**Step 1.** **Union by scanning.** Start with all of A: {1,3}. Now go through B one element at a time and add it only if it is not already there. 2 is new, add it. 3 is already there, skip it. So A union B={1,2,3}.

**Step 2.** **Intersection by scanning.** Go through A and keep the elements that also appear in B: 1 goes, 3 stays. So A intersection B={3}.

**Step 3.** **Difference.** From A={1,3} delete everything that is also in B (that is exactly the intersection {3}). What is left is A-B={1}.

**Step 4.** **Cartesian product with a grid.** Put A down the side and B across the top; each cell is the ordered pair (row element, column element), with the A element first.

| A \ B | 2 | 3 |
|---|---|---|
| 1 | (1,2) | (1,3) |
| 3 | (3,2) | (3,3) |

Collecting every cell: A x B={(1,2),(1,3),(3,2),(3,3)}. Count check: |A|*|B| = 2*2 = 4 pairs, and the grid has 4 cells.

**Step 5.** **Size check on the union.** |A union B| = |A| + |B| - |A intersection B| = 2 + 2 - 1 = 3, and {1,2,3} really has 3 elements. (We subtract the intersection because the shared elements were counted twice.)

**Step 6.** **Test commutativity by actually swapping.** B union A={1,2,3}, the same as A union B, because 'in A or in B' does not care about order. B intersection A={3}, the same, because 'in both' is symmetric. But B-A={2}, while A-B={1}, so difference is **not** commutative. For the product, B x A={(2,1),(2,3),(3,1),(3,3)}. Compare with A x B: the pair (1,2) is in A x B, but it is not in B x A because 1 is not in B. So A x B is not equal to B x A.

#### 📘 Concept refresher

Think of a set as a bag of distinct things; order and repeats do not matter, so {1,2,2} is just {1,2}.

- **Union** A union B: everything that is in A, or in B, or in both. Write each element once.
- **Intersection** A intersection B: only what is in **both** A and B.
- **Difference** A-B: what is in A but **not** in B. Order matters: A-B and B-A are different questions.
- **Cartesian product** A x B: all **ordered pairs** (x,y) with x from A and y from B. The first coordinate always comes from the first set. So (1,2) and (2,1) are different pairs, and |A x B| = |A| * |B|.
- **Commutative** operation: swapping the two sets gives the same result.

Tiny example with S={red,blue}, T={blue,green}: S union T={red,blue,green}, S intersection T={blue}, S-T={red}.

#### ⚠️ Common mistakes

- Writing the pairs of A x B as sets, {1,2}, instead of ordered pairs (1,2). Order matters in a pair.
- Listing a shared element twice in the union (a set never repeats elements).
- Doing B-A when the question says A-B. Check which set comes first.
- Claiming difference or Cartesian product is commutative. Only union and intersection are.
- Missing pairs in A x B. Use a grid or 'one first coordinate at a time' so you get all 4.

#### ✅ Check yourself

1. What is B-A, and is it equal to A-B? **Answer:** B-A={2}; A-B={1}, so they are not equal.
2. How many pairs are in B x A, and does that equal A x B? **Answer:** 4 pairs (|B|*|A|), the same count as A x B, but the pairs themselves differ, so B x A is not equal to A x B.

### Slot 1 Q2a: set operations

#### 🎯 What is being asked

Topic: **sets** (2 marks). Given A={2,4,6} and B={4,6,8}, compute A union B, A intersection B, A-B and the Cartesian product A x B, then say which of these operations are **commutative** (swapping the two sets never changes the answer). The answer is four explicit sets plus a sentence about commutativity with a reason.

#### ✍️ What to write in the exam

```text
A union B = {2,4,6,8}
A intersection B = {4,6}
A - B = {2}
A x B = {(2,4),(2,6),(2,8),(4,4),(4,6),(4,8),(6,4),(6,6),(6,8)}   (|A x B| = 3*3 = 9 ordered pairs)

Commutative: union (A union B = B union A) and intersection (A intersection B = B intersection A), because membership in 'A or B' / 'A and B' does not depend on the order of the sets.
Not commutative: difference, since A - B = {2} but B - A = {8}; and Cartesian product, since (2,4) is in A x B but not in B x A (2 is not in B).
```
Curly brackets for sets, round brackets for pairs, and state the pair count.

#### 🪜 How it is solved, step by step

**Step 1.** **Union by scanning.** Start with all of A: {2,4,6}. Now go through B one element at a time and add it only if it is not already there. 4 is already there, skip it. 6 is already there, skip it. 8 is new, add it. So A union B={2,4,6,8}.

**Step 2.** **Intersection by scanning.** Go through A and keep the elements that also appear in B: 2 goes, 4 stays, 6 stays. So A intersection B={4,6}.

**Step 3.** **Difference.** From A={2,4,6} delete everything that is also in B (that is exactly the intersection {4,6}). What is left is A-B={2}.

**Step 4.** **Cartesian product by first coordinate.** Take each element of A in turn and pair it with every element of B. With 2: (2,4),(2,6),(2,8). With 4: (4,4),(4,6),(4,8). With 6: (6,4),(6,6),(6,8). Joining these gives A x B={(2,4),(2,6),(2,8),(4,4),(4,6),(4,8),(6,4),(6,6),(6,8)}. Count check: |A|*|B| = 3*3 = 9, and we wrote 9 pairs.

**Step 5.** **Size check on the union.** |A union B| = |A| + |B| - |A intersection B| = 3 + 3 - 2 = 4, and {2,4,6,8} really has 4 elements. (We subtract the intersection because the shared elements were counted twice.)

**Step 6.** **Test commutativity by actually swapping.** B union A={2,4,6,8}, the same as A union B, because 'in A or in B' does not care about order. B intersection A={4,6}, the same, because 'in both' is symmetric. But B-A={8}, while A-B={2}, so difference is **not** commutative. For the product, B x A={(4,2),(4,4),(4,6),(6,2),(6,4),(6,6),(8,2),(8,4),(8,6)}. Compare with A x B: the pair (2,4) is in A x B, but it is not in B x A because 2 is not in B. So A x B is not equal to B x A.

#### 📘 Concept refresher

Think of a set as a bag of distinct things; order and repeats do not matter, so {1,2,2} is just {1,2}.

- **Union** A union B: everything that is in A, or in B, or in both. Write each element once.
- **Intersection** A intersection B: only what is in **both** A and B.
- **Difference** A-B: what is in A but **not** in B. Order matters: A-B and B-A are different questions.
- **Cartesian product** A x B: all **ordered pairs** (x,y) with x from A and y from B. The first coordinate always comes from the first set. So (1,2) and (2,1) are different pairs, and |A x B| = |A| * |B|.
- **Commutative** operation: swapping the two sets gives the same result.

Tiny example with U={10,20,30}, V={20,40}: U union V={10,20,30,40}, U intersection V={20}, U-V={10,30}.

#### ⚠️ Common mistakes

- Writing the pairs of A x B as sets, {2,4}, instead of ordered pairs (2,4). Order matters in a pair.
- Missing pairs in A x B. Use a grid or 'one first coordinate at a time' so you get all 9.
- Doing B-A when the question says A-B. Check which set comes first.
- Claiming difference or Cartesian product is commutative. Only union and intersection are.
- Listing a shared element twice in the union (a set never repeats elements).

#### ✅ Check yourself

1. How many elements does A union B have, using the formula? **Answer:** 3+3-2 = 4.
2. If A and B were the **same** set, would A x B equal B x A? **Answer:** Yes. Then both are A x A. Commutativity of the product fails only when the two sets differ (and neither is empty).

### Slot 1 Q2a: set operations

#### 🎯 What is being asked

This is a **sets** question worth 2 marks. Given A={0,1} and B={1,2,3}, list A union B, A intersection B, A-B and A x B, then decide for each operation whether A op B always equals B op A. Your answer must contain the four sets written out in full, and a clear statement of which operations are commutative and which are not.

#### ✍️ What to write in the exam

```text
A union B = {0,1,2,3}
A intersection B = {1}
A - B = {0}
A x B = {(0,1),(0,2),(0,3),(1,1),(1,2),(1,3)}   (|A x B| = 2*3 = 6 ordered pairs)

Commutative: union (A union B = B union A) and intersection (A intersection B = B intersection A), because membership in 'A or B' / 'A and B' does not depend on the order of the sets.
Not commutative: difference, since A - B = {0} but B - A = {2,3}; and Cartesian product, since (0,1) is in A x B but not in B x A (0 is not in B).
```
Curly brackets for sets, round brackets for pairs, and state the pair count.

#### 🪜 How it is solved, step by step

**Step 1.** **Build a membership table.** List every element that appears anywhere ({0,1,2,3}) and ask two questions about each: is it in A, is it in B? Then read off the three answers.

| element | in A? | in B? | union | intersection | A-B |
|---|---|---|---|---|---|
| 0 | yes | no | yes | no | yes |
| 1 | yes | yes | yes | yes | no |
| 2 | no | yes | yes | no | no |
| 3 | no | yes | yes | no | no |

Column 'union' is yes for every row, so A union B={0,1,2,3}. The 'intersection' column is yes only where both answers are yes, so A intersection B={1}. The 'A-B' column is yes only for 'in A, not in B', so A-B={0}.

**Step 2.** **Cartesian product with a grid.** Put A down the side and B across the top; each cell is the ordered pair (row element, column element), with the A element first.

| A \ B | 1 | 2 | 3 |
|---|---|---|---|
| 0 | (0,1) | (0,2) | (0,3) |
| 1 | (1,1) | (1,2) | (1,3) |

Collecting every cell: A x B={(0,1),(0,2),(0,3),(1,1),(1,2),(1,3)}. Count check: |A|*|B| = 2*3 = 6 pairs, and the grid has 6 cells.

**Step 3.** **Size check on the union.** |A union B| = |A| + |B| - |A intersection B| = 2 + 3 - 1 = 4, and {0,1,2,3} really has 4 elements. (We subtract the intersection because the shared elements were counted twice.)

**Step 4.** **Test commutativity by actually swapping.** B union A={0,1,2,3}, the same as A union B, because 'in A or in B' does not care about order. B intersection A={1}, the same, because 'in both' is symmetric. But B-A={2,3}, while A-B={0}, so difference is **not** commutative. For the product, B x A={(1,0),(1,1),(2,0),(2,1),(3,0),(3,1)}. Compare with A x B: the pair (0,1) is in A x B, but it is not in B x A because 0 is not in B. So A x B is not equal to B x A.

#### 📘 Concept refresher

Think of a set as a bag of distinct things; order and repeats do not matter, so {1,2,2} is just {1,2}.

- **Union** A union B: everything that is in A, or in B, or in both. Write each element once.
- **Intersection** A intersection B: only what is in **both** A and B.
- **Difference** A-B: what is in A but **not** in B. Order matters: A-B and B-A are different questions.
- **Cartesian product** A x B: all **ordered pairs** (x,y) with x from A and y from B. The first coordinate always comes from the first set. So (1,2) and (2,1) are different pairs, and |A x B| = |A| * |B|.
- **Commutative** operation: swapping the two sets gives the same result.

Tiny example with X={a,b,c}, Y={b,c,d}: X union Y={a,b,c,d}, X intersection Y={b,c}, X-Y={a}.

#### ⚠️ Common mistakes

- Writing the pairs of A x B as sets, {0,1}, instead of ordered pairs (0,1). Order matters in a pair.
- Listing a shared element twice in the union (a set never repeats elements).
- Doing B-A when the question says A-B. Check which set comes first.
- Claiming difference or Cartesian product is commutative. Only union and intersection are.
- Missing pairs in A x B. Use a grid or 'one first coordinate at a time' so you get all 6.

#### ✅ Check yourself

1. What is B-A, and is it equal to A-B? **Answer:** B-A={2,3}; A-B={0}, so they are not equal.
2. How many pairs are in B x A, and does that equal A x B? **Answer:** 6 pairs (|B|*|A|), the same count as A x B, but the pairs themselves differ, so B x A is not equal to A x B.

## Q2b · Hasse diagrams, LUB and GLB

### Slot 1 Q2b: reported divisors of 60 with 5 and 15 removed

#### 🎯 What is being asked

Topic: **posets**, 8 marks. A={1,2,3,4,6,10,12,20,30,60} is the divisors of 60 **except 5 and 15**, ordered by divisibility. Give the Hasse diagram (levels and upward covers), the minimal, maximal, least and greatest elements, the LUB and GLB of five named pairs, and decide whether A is a lattice, with a reason. The twist: two divisors are missing, so check that gcd and lcm stay in the set

#### ✍️ What to write in the exam

```text
Elements: A={1,2,3,4,6,10,12,20,30,60}, ordered by divisibility (a <= b iff a divides b).
Levels (bottom to top): {1}; {2,3}; {4,6,10}; {12,20,30}; {60}.
Covers: (1,2),(1,3),(2,4),(2,6),(2,10),(3,6),(4,12),(4,20),(6,12),(6,30),(10,20),(10,30),(12,60),(20,60),(30,60).
Minimal={1}; maximal={60}; least=1; greatest=60.
{4,6}: lower bounds {1,2}, GLB=2; upper bounds {12,60}, LUB=12.
{10,12}: lower bounds {1,2}, GLB=2; upper bounds {60}, LUB=60.
{20,30}: lower bounds {1,2,10}, GLB=10; upper bounds {60}, LUB=60.
{2,3}: lower bounds {1}, GLB=1; upper bounds {6,12,30,60}, LUB=6.
{10,30}: lower bounds {1,2,10}, GLB=10; upper bounds {30,60}, LUB=30.
Lattice: yes. Every pair has a GLB and a LUB: gcd(a,b) and lcm(a,b) divide 60 and cannot be the removed 5 or 15 (retained multiples of 5 are even; the retained divisors of 15 are only 1 and 3), so they stay in A.
```
List the bounds before naming LUB/GLB; the marks are for the bound lists as well as the final answers.

#### 🪜 How it is solved, step by step

**Step 1.** **Levels (bottom to top).** Since 60=2^2*3*5, every element is 2^a*3^b*5^c with a<=2, b<=1, c<=1, and the level is the number of prime factors counted with repeats (a+b+c). Note 5 and 15 are missing, so 1 can only step up to 2 and 3, and 3 can only step up to 6. Result: level 0 = {1}; level 1 = {2,3}; level 2 = {4,6,10}; level 3 = {12,20,30}; level 4 = {60}.

**Step 2.** **Cover edges (upward).** For each element, list what sits **directly** above it: 1 -> 2,3; 2 -> 4,6,10; 3 -> 6; 4 -> 12,20; 6 -> 12,30; 10 -> 20,30; 12 -> 60; 20 -> 60; 30 -> 60. That is 15 edges (typed in full below). No (1,4) edge appears, because an element lies between them.

**Step 3.** **Extrema.** Nothing is below 1, and 1 is below everything, so minimal={1} and least=1. Nothing is above 60, and everything is below it, so maximal={60} and greatest=60.

**Step 4.** **Bounds for the named pairs.** Write the common divisors and common multiples (or common subsets/supersets) **inside A**, then take the GLB = largest lower bound and LUB = smallest upper bound.

- **{4,6}**: lower bounds {1,2}, GLB=2; upper bounds {12,60}, LUB=12 (gcd=2, lcm=12).
- **{10,12}**: lower bounds {1,2}, GLB=2; upper bounds {60}, LUB=60 (gcd=2, lcm=60).
- **{20,30}**: lower bounds {1,2,10}, GLB=10; upper bounds {60}, LUB=60 (gcd=10, lcm=60).
- **{2,3}**: lower bounds {1}, GLB=1; upper bounds {6,12,30,60}, LUB=6 (gcd=1, lcm=6).
- **{10,30}**: lower bounds {1,2,10}, GLB=10; upper bounds {30,60}, LUB=30 (gcd=10, lcm=30).

**Step 5.** **Lattice or not?** Every named pair has a GLB and a LUB, and the same holds for all pairs, because gcd and lcm of retained divisors never become 5 or 15. The gcd could be 5 or 15 only if both numbers were multiples of 5, but every retained multiple of 5 (10, 20, 30, 60) is even, so their gcd is even. The lcm could be 5 or 15 only if both numbers divided 15, but the retained divisors of 15 are just 1 and 3. So gcd and lcm always stay in A and A is a lattice.

#### 📘 Concept refresher

**The order.** On divisors, 'a is below b' means a divides b, so 4 and 6 are incomparable (neither divides the other). A **cover** (a,b) means a < b with nothing strictly between; a Hasse diagram keeps only covers (no loops, no shortcuts), and you type levels bottom to top plus the upward covers.

**Extrema.** Minimal = nothing below it; maximal = nothing above it; least = below **every** element; greatest = above **every** element.

**Bounds.** An upper bound of a pair is an element both are below (a common multiple inside the set); the **LUB** is the upper bound that is below all the other upper bounds. GLB is the mirror image: among the common divisors, the one above all the others. A **lattice** needs a LUB and a GLB for every pair; one bad pair kills it.

Tiny example on {1,2,3,6}: covers (1,2),(1,3),(2,6),(3,6); LUB(2,3)=6 and GLB(2,3)=1; (1,6) is not a cover because 2 lies between.

#### ⚠️ Common mistakes

- Typing every comparable pair as an edge. Only covers count: (1,4) is comparable (1 divides 4) but it is a shortcut, so leave it out.
- Treating the missing 5 and 15 as if they were present (for instance writing the edge (1,5)).
- Writing only the final LUB/GLB values with no lists of bounds: the marks are for the working.

#### ✅ Check yourself

1. Why is (1,4) not a cover edge? **Answer:** Because 2 lies between: 1 divides 2 and 2 divides 4, so (1,2) and (2,4) are the covers.
2. Suppose 6 were removed as well, A'={1,2,3,4,10,12,20,30,60}. Does {2,3} still have a LUB? **Answer:** No. Common multiples of 2 and 3 in A' are 12, 30, 60; the lowest candidates 12 and 30 are incomparable (neither divides the other), so there is no LUB and A' is not a lattice.

### Slot 1 Q2b: divisors of 36

#### 🎯 What is being asked

Topic: **posets**, 8 marks. A={1,2,3,4,6,9,12,18,36} is the set of **all** divisors of 36, ordered by divisibility. Give the levels and upward covers of the Hasse diagram, the four kinds of extremum, LUB and GLB of {4,6}, {9,12}, {6,18}, and decide whether A is a lattice.

#### ✍️ What to write in the exam

```text
Elements: A={1,2,3,4,6,9,12,18,36}, ordered by divisibility (a <= b iff a divides b).
Levels (bottom to top): {1}; {2,3}; {4,6,9}; {12,18}; {36}.
Covers: (1,2),(1,3),(2,4),(2,6),(3,6),(3,9),(4,12),(6,12),(6,18),(9,18),(12,36),(18,36).
Minimal={1}; maximal={36}; least=1; greatest=36.
{4,6}: lower bounds {1,2}, GLB=2; upper bounds {12,36}, LUB=12.
{9,12}: lower bounds {1,3}, GLB=3; upper bounds {36}, LUB=36.
{6,18}: lower bounds {1,2,3,6}, GLB=6; upper bounds {18,36}, LUB=18.
Lattice: yes. A is all divisors of 36, so for any a,b both gcd(a,b) and lcm(a,b) divide 36 and lie in A; they are the GLB and LUB. (Equivalently, taking min and max of the exponents of 2 and 3 stays inside the 3x3 exponent grid.)
```
List the bounds before naming LUB/GLB; the marks are for the bound lists as well as the final answers.

#### 🪜 How it is solved, step by step

**Step 1.** **Levels (bottom to top).** A cleaner way to see the picture: 36=2^2*3^2, so every divisor is 2^a*3^b with a,b in {0,1,2}. That gives a 3-by-3 grid of 9 elements; the level is a+b, and moving up one cover means multiplying by one prime (2 or 3). Result: level 0 = {1}; level 1 = {2,3}; level 2 = {4,6,9}; level 3 = {12,18}; level 4 = {36}.

**Step 2.** **Cover edges (upward).** For each element, list what sits **directly** above it: 1 -> 2,3; 2 -> 4,6; 3 -> 6,9; 4 -> 12; 6 -> 12,18; 9 -> 18; 12 -> 36; 18 -> 36. That is 12 edges (typed in full below). No (1,4) edge appears, because an element lies between them.

**Step 3.** **Extrema.** Nothing is below 1, and 1 is below everything, so minimal={1} and least=1. Nothing is above 36, and everything is below it, so maximal={36} and greatest=36.

**Step 4.** **Bounds for the named pairs.** Write the common divisors and common multiples (or common subsets/supersets) **inside A**, then take the GLB = largest lower bound and LUB = smallest upper bound.

- **{4,6}**: lower bounds {1,2}, GLB=2; upper bounds {12,36}, LUB=12 (gcd=2, lcm=12).
- **{9,12}**: lower bounds {1,3}, GLB=3; upper bounds {36}, LUB=36 (gcd=3, lcm=36).
- **{6,18}**: lower bounds {1,2,3,6}, GLB=6; upper bounds {18,36}, LUB=18 (gcd=6, lcm=18).

**Step 5.** **Lattice.** Every pair has a GLB and a LUB. Reason: A is the full set of divisors of 36. For any a, b in A, gcd(a,b) and lcm(a,b) both divide 36, so they are in A; and they are the GLB and LUB under divisibility. In exponent language, the GLB takes the smaller exponent of each prime and the LUB the larger, which always gives exponents at most 2. So A is a lattice.

#### 📘 Concept refresher

**Reading 'a <= b'.** Here it means 'a divides b'. Two numbers are comparable only if one divides the other. In the Hasse diagram an edge (a,b) is drawn only for a **cover**: a < b and no c in the set with a < c < b. Everything else is recovered by walking upward, so shortcuts are omitted.

**Four extrema.** Minimal/maximal are 'nothing strictly below/above' (there can be several); least/greatest are 'below/above everything' (at most one, maybe none).

**LUB and GLB.** List the upper bounds of the pair; the LUB is the one that divides all the others. List the lower bounds; the GLB is the one that all the others divide. If two best candidates are incomparable, the LUB/GLB does not exist. A poset is a **lattice** when every pair has both.

Tiny example on {1,2,3,4,12}: covers (1,2),(1,3),(2,4),(3,12),(4,12); the pair {2,3} has only the common multiple 12, so LUB=12 (even though 2*3=6 is absent).

#### ⚠️ Common mistakes

- Typing every comparable pair as an edge. Only covers count: (1,4) is comparable (1 divides 4) but it is a shortcut, so leave it out.
- Skipping 'why it is a lattice'. Say gcd and lcm of divisors of 36 are again divisors of 36.
- Forgetting that 4 and 9 are on the **same** level but are incomparable; the level number tells nothing about divisibility.
- Writing only the final LUB/GLB values with no lists of bounds: the marks are for the working.

#### ✅ Check yourself

1. Which elements does 36 cover, and how many edges does the diagram have in total? **Answer:** 36 covers 12 and 18 (36/3 and 36/2). There are 12 edges in total (see the list above).
2. Where does the grid picture put 18, and what are the exponents of 12? **Answer:** 18=2^1*3^2 is at grid position (1,2), level 3. 12=2^2*3^1 is at (2,1), also level 3, so 12 and 18 are incomparable.

### Slot 1 Q2b: divisors of 72

#### 🎯 What is being asked

Topic: **posets**, 8 marks. A={1,2,3,4,6,8,9,12,18,24,36,72}, the divisors of 72 under divisibility, has 12 elements, so the diagram is bigger than usual. Produce levels and covers, minimal/maximal/least/greatest, the LUB and GLB of {8,12}, {9,24} and {6,18}, and a lattice verdict.

#### ✍️ What to write in the exam

```text
Elements: A={1,2,3,4,6,8,9,12,18,24,36,72}, ordered by divisibility (a <= b iff a divides b).
Levels (bottom to top): {1}; {2,3}; {4,6,9}; {8,12,18}; {24,36}; {72}.
Covers: (1,2),(1,3),(2,4),(2,6),(3,6),(3,9),(4,8),(4,12),(6,12),(6,18),(8,24),(9,18),(12,24),(12,36),(18,36),(24,72),(36,72).
Minimal={1}; maximal={72}; least=1; greatest=72.
{8,12}: lower bounds {1,2,4}, GLB=4; upper bounds {24,72}, LUB=24.
{9,24}: lower bounds {1,3}, GLB=3; upper bounds {72}, LUB=72.
{6,18}: lower bounds {1,2,3,6}, GLB=6; upper bounds {18,36,72}, LUB=18.
Lattice: yes. A is the set of all divisors of 72. For any a,b, gcd(a,b) and lcm(a,b) divide 72, hence lie in A, and they are the GLB and LUB.
```
List the bounds before naming LUB/GLB; the marks are for the bound lists as well as the final answers.

#### 🪜 How it is solved, step by step

**Step 1.** **Levels (bottom to top).** Since 72=2^3*3^2, every element is 2^a*3^b with a in {0,1,2,3} and b in {0,1,2}: a 4-by-3 grid of 12 elements. The level is a+b. This tells you the shape (levels of sizes 1,2,3,3,2,1) and a quick check that you have not missed an element. Result: level 0 = {1}; level 1 = {2,3}; level 2 = {4,6,9}; level 3 = {8,12,18}; level 4 = {24,36}; level 5 = {72}.

**Step 2.** **Cover edges (upward).** For each element, list what sits **directly** above it: 1 -> 2,3; 2 -> 4,6; 3 -> 6,9; 4 -> 8,12; 6 -> 12,18; 8 -> 24; 9 -> 18; 12 -> 24,36; 18 -> 36; 24 -> 72; 36 -> 72. That is 17 edges (typed in full below). No (1,4) edge appears, because an element lies between them.

**Step 3.** **Extrema.** Nothing is below 1, and 1 is below everything, so minimal={1} and least=1. Nothing is above 72, and everything is below it, so maximal={72} and greatest=72.

**Step 4.** **Bounds for the named pairs.** Write the common divisors and common multiples (or common subsets/supersets) **inside A**, then take the GLB = largest lower bound and LUB = smallest upper bound.

- **{8,12}**: lower bounds {1,2,4}, GLB=4; upper bounds {24,72}, LUB=24 (gcd=4, lcm=24).
- **{9,24}**: lower bounds {1,3}, GLB=3; upper bounds {72}, LUB=72 (gcd=3, lcm=72).
- **{6,18}**: lower bounds {1,2,3,6}, GLB=6; upper bounds {18,36,72}, LUB=18 (gcd=6, lcm=18).

**Step 5.** **Lattice.** A is the full divisor set of 72, so for any pair gcd and lcm are divisors of 72 and therefore in A. Exponent view: GLB(8,12): 8=2^3, 12=2^2*3, take the smaller exponents, 2^2*3^0=4. LUB(8,12): larger exponents, 2^3*3^1=24. Since the maximum and minimum of exponents never leave the ranges 0..3 and 0..2, every pair has a LUB and GLB, and A is a lattice.

#### 📘 Concept refresher

**Divisibility poset.** Under 'a <= b iff a divides b' some pairs are incomparable (2 and 3). Draw smaller elements lower; the diagram contains only **covers** (a,b): a < b with no element strictly between. You describe it as levels (bottom to top) and a list of upward covers.

**Extrema.** Minimal: nothing below. Maximal: nothing above. Least: below all. Greatest: above all. A least element, if it exists, is the only minimal element.

**Bounds.** For a pair {x,y} write the common multiples in the set (upper bounds) and the common divisors in the set (lower bounds). LUB = the least upper bound (the one dividing all other upper bounds); GLB = the greatest lower bound (the one divisible by all other lower bounds). **Lattice** = every pair has a LUB and a GLB.

Tiny example on {2,3,6,12,18}: upper bounds of {2,3} are {6,12,18} so LUB=6; upper bounds of {12,18} are empty, so no LUB, and this set is not a lattice.

#### ⚠️ Common mistakes

- Typing every comparable pair as an edge. Only covers count: (1,4) is comparable (1 divides 4) but it is a shortcut, so leave it out.
- Missing an element of the middle levels: the sizes should be 1,2,3,3,2,1, which adds up to 12 elements.
- Computing lcm(9,24) as 9*24=216: the numbers share a factor 3, so lcm=72.
- Writing only the final LUB/GLB values with no lists of bounds: the marks are for the working.

#### ✅ Check yourself

1. Which elements does 72 cover? **Answer:** 24 and 36, since 72/3=24 and 72/2=36, and both are in A.
2. Find LUB({6,18}) from the exponents of 6=2*3 and 18=2*3^2. **Answer:** Take larger exponents: 2^1*3^2=18. Also 6 divides 18, so the pair is comparable and LUB=18, GLB=6.

### Slot 1 Q2b: divisors of 30

#### 🎯 What is being asked

Topic: **posets**, 8 marks. A={1,2,3,5,6,10,15,30} is the set of all divisors of 30 under divisibility. State the levels and cover edges, minimal/maximal/least/greatest, the LUB and GLB of {6,10}, {3,5}, {10,15}, and whether A is a lattice.

#### ✍️ What to write in the exam

```text
Elements: A={1,2,3,5,6,10,15,30}, ordered by divisibility (a <= b iff a divides b).
Levels (bottom to top): {1}; {2,3,5}; {6,10,15}; {30}.
Covers: (1,2),(1,3),(1,5),(2,6),(2,10),(3,6),(3,15),(5,10),(5,15),(6,30),(10,30),(15,30).
Minimal={1}; maximal={30}; least=1; greatest=30.
{6,10}: lower bounds {1,2}, GLB=2; upper bounds {30}, LUB=30.
{3,5}: lower bounds {1}, GLB=1; upper bounds {15,30}, LUB=15.
{10,15}: lower bounds {1,5}, GLB=5; upper bounds {30}, LUB=30.
Lattice: yes. A is all divisors of 30, so for any a,b both gcd(a,b) and lcm(a,b) divide 30 and are in A; they are the GLB and LUB. (Equivalently A is the cube of subsets of {2,3,5} with intersection and union.)
```
List the bounds before naming LUB/GLB; the marks are for the bound lists as well as the final answers.

#### 🪜 How it is solved, step by step

**Step 1.** **Levels (bottom to top).** Since 30=2*3*5 is a product of three different primes, the picture is a **cube**: bottom 1, the three primes 2,3,5 above it, then the three products of two primes 6,10,15, then 30 on top. Each element is just a subset of {2,3,5} (6 is {2,3}), and the level is the size of that subset. Result: level 0 = {1}; level 1 = {2,3,5}; level 2 = {6,10,15}; level 3 = {30}.

**Step 2.** **Cover edges (upward).** For each element, list what sits **directly** above it: 1 -> 2,3,5; 2 -> 6,10; 3 -> 6,15; 5 -> 10,15; 6 -> 30; 10 -> 30; 15 -> 30. That is 12 edges (typed in full below). No (1,6) edge appears, because an element lies between them.

**Step 3.** **Extrema.** Nothing is below 1, and 1 is below everything, so minimal={1} and least=1. Nothing is above 30, and everything is below it, so maximal={30} and greatest=30.

**Step 4.** **Bounds for the named pairs.** Write the common divisors and common multiples (or common subsets/supersets) **inside A**, then take the GLB = largest lower bound and LUB = smallest upper bound.

- **{6,10}**: lower bounds {1,2}, GLB=2; upper bounds {30}, LUB=30 (gcd=2, lcm=30).
- **{3,5}**: lower bounds {1}, GLB=1; upper bounds {15,30}, LUB=15 (gcd=1, lcm=15).
- **{10,15}**: lower bounds {1,5}, GLB=5; upper bounds {30}, LUB=30 (gcd=5, lcm=30).

**Step 5.** **Lattice.** A is the full divisor set of 30, so gcd and lcm of any two elements divide 30 and are in A. Concretely this is the 'cube' of subsets of {2,3,5}: GLB is the intersection of the prime sets and LUB is their union, and both are again subsets of {2,3,5}. So every pair has a LUB and a GLB and A is a lattice (in fact a Boolean lattice).

#### 📘 Concept refresher

**The order.** On divisors, 'a is below b' means a divides b, so 4 and 6 are incomparable (neither divides the other). A **cover** (a,b) means a < b with nothing strictly between; a Hasse diagram keeps only covers (no loops, no shortcuts), and you type levels bottom to top plus the upward covers.

**Extrema.** Minimal = nothing below it; maximal = nothing above it; least = below **every** element; greatest = above **every** element.

**Bounds.** An upper bound of a pair is an element both are below (a common multiple inside the set); the **LUB** is the upper bound that is below all the other upper bounds. GLB is the mirror image: among the common divisors, the one above all the others. A **lattice** needs a LUB and a GLB for every pair; one bad pair kills it.

Tiny example on {1,2,3,6}: covers (1,2),(1,3),(2,6),(3,6); LUB(2,3)=6 and GLB(2,3)=1; (1,6) is not a cover because 2 lies between.

#### ⚠️ Common mistakes

- Typing every comparable pair as an edge. Only covers count: (1,6) is comparable (1 divides 6) but it is a shortcut, so leave it out.
- Joining 1 to 6, 10 or 15 directly. 1 lies two levels below them; the covers from 1 are only to 2, 3, 5.
- Thinking 3 and 5 have no LUB because 15 is not 'next to' them. LUB means the least common multiple in A, here 15.
- Writing only the final LUB/GLB values with no lists of bounds: the marks are for the working.

#### ✅ Check yourself

1. How many elements and how many cover edges does the cube have? **Answer:** 8 elements and 12 edges: 1 to each prime (3 edges), each prime to two products (6 edges), each product to 30 (3 edges), total 3+6+3=12.
2. What is GLB of {6,10,15}, three elements at once? **Answer:** Common divisors of 6, 10, 15 in A: only 1, so GLB=1. (gcd(6,10)=2 and gcd(2,15)=1.)

### Slot 1 Q2b: divisors of 90

#### 🎯 What is being asked

Topic: **posets**, 8 marks. A={1,2,3,5,6,9,10,15,18,30,45,90} is the set of all 12 divisors of 90 under divisibility. You must give the Hasse diagram as levels plus upward covers, the four extrema, LUB/GLB of {9,10}, {6,15}, {18,30}, and decide whether A is a lattice. This has more edges than the earlier ones, so organise your work.

#### ✍️ What to write in the exam

```text
Elements: A={1,2,3,5,6,9,10,15,18,30,45,90}, ordered by divisibility (a <= b iff a divides b).
Levels (bottom to top): {1}; {2,3,5}; {6,9,10,15}; {18,30,45}; {90}.
Covers: (1,2),(1,3),(1,5),(2,6),(2,10),(3,6),(3,9),(3,15),(5,10),(5,15),(6,18),(6,30),(9,18),(9,45),(10,30),(15,30),(15,45),(18,90),(30,90),(45,90).
Minimal={1}; maximal={90}; least=1; greatest=90.
{9,10}: lower bounds {1}, GLB=1; upper bounds {90}, LUB=90.
{6,15}: lower bounds {1,3}, GLB=3; upper bounds {30,90}, LUB=30.
{18,30}: lower bounds {1,2,3,6}, GLB=6; upper bounds {90}, LUB=90.
Lattice: yes. A is the set of all divisors of 90; for any a,b, gcd(a,b) and lcm(a,b) divide 90 and belong to A, and are the GLB and LUB.
```
List the bounds before naming LUB/GLB; the marks are for the bound lists as well as the final answers.

#### 🪜 How it is solved, step by step

**Step 1.** **Levels (bottom to top).** Factorise: 90=2*3^2*5. The level of an element is the number of prime factors counted with repeats: 1 has 0, 2/3/5 have 1, 6=2*3, 9=3^2, 10=2*5, 15=3*5 have 2, 18=2*3^2, 30=2*3*5, 45=3^2*5 have 3, and 90 has 4. A cover multiplies by exactly **one** prime. Result: level 0 = {1}; level 1 = {2,3,5}; level 2 = {6,9,10,15}; level 3 = {18,30,45}; level 4 = {90}.

**Step 2.** **Cover edges (upward).** For each element, list what sits **directly** above it: 1 -> 2,3,5; 2 -> 6,10; 3 -> 6,9,15; 5 -> 10,15; 6 -> 18,30; 9 -> 18,45; 10 -> 30; 15 -> 30,45; 18 -> 90; 30 -> 90; 45 -> 90. That is 20 edges (typed in full below). No (1,6) edge appears, because an element lies between them.

**Step 3.** **Extrema.** Nothing is below 1, and 1 is below everything, so minimal={1} and least=1. Nothing is above 90, and everything is below it, so maximal={90} and greatest=90.

**Step 4.** **Bounds for the named pairs.** Write the common divisors and common multiples (or common subsets/supersets) **inside A**, then take the GLB = largest lower bound and LUB = smallest upper bound.

- **{9,10}**: lower bounds {1}, GLB=1; upper bounds {90}, LUB=90 (gcd=1, lcm=90).
- **{6,15}**: lower bounds {1,3}, GLB=3; upper bounds {30,90}, LUB=30 (gcd=3, lcm=30).
- **{18,30}**: lower bounds {1,2,3,6}, GLB=6; upper bounds {90}, LUB=90 (gcd=6, lcm=90).

**Step 5.** **Lattice.** A is the full divisor set of 90: for all a,b in A, gcd(a,b) and lcm(a,b) divide 90 and so lie in A, and they are the GLB and LUB. Hence every pair has both, and A is a lattice. (Sanity check on the table: gcd(18,30)=6 and lcm(18,30)=90, matching the GLB and LUB found by listing bounds.)

#### 📘 Concept refresher

**Reading 'a <= b'.** Here it means 'a divides b'. Two numbers are comparable only if one divides the other. In the Hasse diagram an edge (a,b) is drawn only for a **cover**: a < b and no c in the set with a < c < b. Everything else is recovered by walking upward, so shortcuts are omitted.

**Four extrema.** Minimal/maximal are 'nothing strictly below/above' (there can be several); least/greatest are 'below/above everything' (at most one, maybe none).

**LUB and GLB.** List the upper bounds of the pair; the LUB is the one that divides all the others. List the lower bounds; the GLB is the one that all the others divide. If two best candidates are incomparable, the LUB/GLB does not exist. A poset is a **lattice** when every pair has both.

Tiny example on {1,2,3,4,12}: covers (1,2),(1,3),(2,4),(3,12),(4,12); the pair {2,3} has only the common multiple 12, so LUB=12 (even though 2*3=6 is absent).

#### ⚠️ Common mistakes

- Typing every comparable pair as an edge. Only covers count: (1,6) is comparable (1 divides 6) but it is a shortcut, so leave it out.
- Forgetting edges that multiply by a prime already used (like 3 to 9 or 6 to 18): repeated primes are allowed.
- Missing an element in a level. The sizes should be 1,3,4,3,1, which adds up to 12.
- Writing only the final LUB/GLB values with no lists of bounds: the marks are for the working.

#### ✅ Check yourself

1. Which elements does 45 cover? **Answer:** 9 and 15 (45/5=9 and 45/3=15), and both are in A.
2. Is 9 below 30? **Answer:** No. 9 does not divide 30 (30/9 is not an integer), so 9 and 30 are incomparable.

### Slot 1 Q2b: restricted divisors with missing gcd/lcm

#### 🎯 What is being asked

Topic: **posets**, 8 marks. Here the set is **not** all divisors of 72: A={1,2,3,4,6,24,36,72} has 8, 9, 12 and 18 missing. Give the levels and covers, the extrema, the LUB/GLB of {4,6}, {24,36}, {2,3} (if they exist), and decide whether A is a lattice. This is the 'trap' version: gcd and lcm cannot be trusted, so recompute the bounds inside A.

#### ✍️ What to write in the exam

```text
Elements: A={1,2,3,4,6,24,36,72}, ordered by divisibility (a <= b iff a divides b).
Levels (bottom to top): {1}; {2,3}; {4,6}; {24,36}; {72}.
Covers: (1,2),(1,3),(2,4),(2,6),(3,6),(4,24),(4,36),(6,24),(6,36),(24,72),(36,72).
Minimal={1}; maximal={72}; least=1; greatest=72.
{4,6}: lower bounds {1,2}, GLB=2; upper bounds {24,36,72}, LUB=does not exist.
{24,36}: lower bounds {1,2,3,4,6}, GLB=does not exist; upper bounds {72}, LUB=72.
{2,3}: lower bounds {1}, GLB=1; upper bounds {6,24,36,72}, LUB=6.
Lattice: no. For {4,6} the upper bounds in A are 24, 36, 72, and 24 and 36 are incomparable, so LUB({4,6}) does not exist. Hence A is not a lattice. (Also GLB({24,36}) does not exist: lower bounds 1,2,3,4,6 have incomparable maximal elements 4 and 6.)
```
List the bounds before naming LUB/GLB; the marks are for the bound lists as well as the final answers.

#### 🪜 How it is solved, step by step

**Step 1.** **Levels (bottom to top).** Elements: 1; 2,3; 4,6; 24,36; 72. Because 8, 9, 12, 18 are missing, 4 and 6 have **no** common multiple until 24 and 36, and the chain 4-12-24 is broken: 4 jumps straight to 24 and 36 (nothing in A lies between them). Result: level 0 = {1}; level 1 = {2,3}; level 2 = {4,6}; level 3 = {24,36}; level 4 = {72}.

**Step 2.** **Cover edges (upward).** For each element, list what sits **directly** above it: 1 -> 2,3; 2 -> 4,6; 3 -> 6; 4 -> 24,36; 6 -> 24,36; 24 -> 72; 36 -> 72. That is 11 edges (typed in full below). No (1,4) edge appears, because an element lies between them.

**Step 3.** **Extrema.** Nothing is below 1, and 1 is below everything, so minimal={1} and least=1. Nothing is above 72, and everything is below it, so maximal={72} and greatest=72.

**Step 4.** **Bounds for the named pairs.** Write the common divisors and common multiples (or common subsets/supersets) **inside A**, then take the GLB = largest lower bound and LUB = smallest upper bound.

- **{4,6}**: lower bounds {1,2}, GLB=2; upper bounds {24,36,72}, no LUB (no single smallest upper bound) (gcd=2, lcm=12 not in A).
- **{24,36}**: lower bounds {1,2,3,4,6}, no GLB (no single largest lower bound); upper bounds {72}, LUB=72 (gcd=12 not in A, lcm=72).
- **{2,3}**: lower bounds {1}, GLB=1; upper bounds {6,24,36,72}, LUB=6 (gcd=1, lcm=6).

**Step 5.** **Lattice? No.** Take {4,6}. Upper bounds in A: the common multiples 24, 36, 72. The smallest candidates 24 and 36 are incomparable (24 does not divide 36 and 36 does not divide 24), so there is no least upper bound. One failing pair is enough, so A is **not** a lattice. (Also {24,36} has no GLB: its lower bounds 1,2,3,4,6 have two maximal ones, 4 and 6, incomparable. And {3,4} has no LUB for the same reason.) Note the true lcm 12 is not in A; 'LUB does not exist' is the correct conclusion, not 'LUB=24'.

#### 📘 Concept refresher

**Divisibility poset.** Under 'a <= b iff a divides b' some pairs are incomparable (2 and 3). Draw smaller elements lower; the diagram contains only **covers** (a,b): a < b with no element strictly between. You describe it as levels (bottom to top) and a list of upward covers.

**Extrema.** Minimal: nothing below. Maximal: nothing above. Least: below all. Greatest: above all. A least element, if it exists, is the only minimal element.

**Bounds.** For a pair {x,y} write the common multiples in the set (upper bounds) and the common divisors in the set (lower bounds). LUB = the least upper bound (the one dividing all other upper bounds); GLB = the greatest lower bound (the one divisible by all other lower bounds). **Lattice** = every pair has a LUB and a GLB.

Tiny example on {2,3,6,12,18}: upper bounds of {2,3} are {6,12,18} so LUB=6; upper bounds of {12,18} are empty, so no LUB, and this set is not a lattice.

#### ⚠️ Common mistakes

- Typing every comparable pair as an edge. Only covers count: (1,4) is comparable (1 divides 4) but it is a shortcut, so leave it out.
- Using lcm(4,6)=12 as the LUB even though 12 is not in A. The LUB must be an element of A.
- Saying LUB={24,36}, or picking one of 24 or 36 arbitrarily. A LUB must be below **all** other upper bounds.
- Writing a cover (4,12) or (6,12): 12 is not an element of A.

#### ✅ Check yourself

1. If 12 were added to A, would {4,6} get a LUB? **Answer:** Yes, LUB=12, since 12 divides 24, 36 and 72 and is a multiple of both 4 and 6. (For the new set that pair stops being a problem.)
2. Why does {2,3} still behave well here? **Answer:** Common multiples of 2 and 3 in A are 6,24,36,72 and 6 divides all of them, so LUB=6; the only common divisor is 1, so GLB=1.

### Slot 1 Q2b: restricted subset family under inclusion

#### 🎯 What is being asked

Topic: **posets** with the **subset order**, 8 marks. A={{},{a},{b},{a,b},{a,c},{b,c}} (six sets; note {c} and {a,b,c} are not in A) is ordered by inclusion: X is below Y when X is a subset of Y. Give levels and covers, the extrema, the LUB/GLB of {{a},{b}}, {{a,b},{a,c}} and {{a,c},{b,c}} (or say they do not exist), and decide whether A is a lattice.

#### ✍️ What to write in the exam

```text
Elements: A={{},{a},{b},{a,b},{a,c},{b,c}}, ordered by subset inclusion.
Levels (bottom to top): {{}}; {{a},{b}}; {{a,b},{a,c},{b,c}}.
Covers: ({},{a}),({},{b}),({a},{a,b}),({a},{a,c}),({b},{a,b}),({b},{b,c}).
Minimal={{}}; maximal={{a,b},{a,c},{b,c}}; least={}; greatest=does not exist.
{{a},{b}}: lower bounds {{}}, GLB={}; upper bounds {{a,b}}, LUB={a,b}.
{{a,b},{a,c}}: lower bounds {{},{a}}, GLB={a}; upper bounds none, LUB=does not exist.
{{a,c},{b,c}}: lower bounds {{}}, GLB={}; upper bounds none, LUB=does not exist.
Lattice: no. For {{a,b},{a,c}} an upper bound would have to contain a, b and c; no set in A does, so the pair has no upper bounds and no LUB. One such pair shows A is not a lattice.
```
List the bounds before naming LUB/GLB; the marks are for the bound lists as well as the final answers.

#### 🪜 How it is solved, step by step

**Step 1.** **Levels (bottom to top).** Level = size of the set: size 0 is {}; size 1 are {a},{b}; size 2 are {a,b},{a,c},{b,c}. Because {c} is not in A, {a,c} has only {a} directly below it (not {c}), and {b,c} has only {b} directly below it. Two different sets of the same size are incomparable. Result: level 0 = {{}}; level 1 = {{a},{b}}; level 2 = {{a,b},{a,c},{b,c}}.

**Step 2.** **Cover edges (upward).** For each element, list what sits **directly** above it: {} -> {a},{b}; {a} -> {a,b},{a,c}; {b} -> {a,b},{b,c}. That is 6 edges (typed in full below). No ({},{a,b}) edge appears, because an element lies between them.

**Step 3.** **Extrema.** Minimal={{}}: nothing lies below it. Least={}: it is below every element. Maximal={{a,b},{a,c},{b,c}}: nothing lies above any of these, and they are different elements that are not comparable. Greatest=does not exist: no single element is above all the others (each maximal element fails to be above the other maximal ones).

**Step 4.** **Bounds for the named pairs.** Write the common divisors and common multiples (or common subsets/supersets) **inside A**, then take the GLB = largest lower bound and LUB = smallest upper bound.

- **{{a},{b}}**: lower bounds {{}}, GLB={}; upper bounds {{a,b}}, LUB={a,b}.
- **{{a,b},{a,c}}**: lower bounds {{},{a}}, GLB={a}; upper bounds none, no LUB (no single smallest upper bound).
- **{{a,c},{b,c}}**: lower bounds {{}}, GLB={}; upper bounds none, no LUB (no single smallest upper bound).

**Step 5.** **Lattice? No.** Take {a,b} and {a,c}. An upper bound must contain both, so it must contain a, b and c, but A has no such set ({a,b,c} is missing). So there are no upper bounds and no LUB. One failing pair is enough: A is **not** a lattice. (Another failing pair is {a} and {b,c}.) Note that the GLBs exist for these pairs (e.g. {a}), so it is the joins that fail.

#### 📘 Concept refresher

**The order.** Here 'X is below Y' means X is a subset of Y. Many sets are incomparable ({a} and {b}). A **cover** (X,Y) means X is a proper subset of Y with no set of A strictly between; the diagram shows only covers, typed as levels plus upward covers.

**Extrema.** Minimal = nothing below; maximal = nothing above; least = below every set; greatest = above every set.

**Bounds.** An upper bound of a pair is a set of A that contains both; the LUB is the smallest such set (inside A, not just the plain union). A lower bound is a set of A contained in both; the GLB is the largest. A **lattice** needs a LUB and a GLB for every pair; one bad pair is enough to fail.

Tiny example on subsets of {x,y}: {} is least, {x,y} is greatest, LUB({x},{y})={x,y}, GLB({x},{y})={}.

#### ⚠️ Common mistakes

- Writing {a,b,c} as an upper bound or the greatest element. It is not in A, so no greatest element exists.
- Saying GLB({a,c},{b,c}) is {c}. {c} is not in A; the only common lower bound in A is {}, so GLB={}.
- Calling the three 2-element sets 'the greatest': they are **maximal**, but none is above all the others.
- Typing a shortcut such as ({},{a,b}). {a} lies between {} and {a,b}, so only direct covers count.

#### ✅ Check yourself

1. If {a,b,c} were added to A, would every pair then have a LUB? **Answer:** Yes. {a,b,c} contains everything, so it becomes the greatest element and is an upper bound of every pair; for {{a,b},{a,c}} the LUB is {a,b,c}. (With it, this particular set is a lattice.)
2. What is LUB({{a},{b}}) and how do you know? **Answer:** Upper bounds of {a} and {b} in A must contain a and b: only {a,b}. So LUB={a,b}.

## Q3 · Equivalence relations and classes

### Slot 1 Q3: reported RGB triangle under 120-degree rotations

#### 🎯 What is being asked

This is a **relations / equivalence classes** question (Q3, 10 marks). Each vertex of a triangle gets one of three colours R, G, B, so there are 3 x 3 x 3 = 27 colourings. Two colourings count as "the same" when you can turn one into the other by **rotating** the triangle. You must (1) prove that "related by a rotation" is an equivalence relation, (2) list every class (the complete partition), and (3) state how many classes there are. Final answer: **11 classes**.

#### ✍️ What to write in the exam

Let A = the set of all 27 words over {R,G,B}; x ~ y iff y is obtained from x by a rotation.
Reflexive: rotation by 0 degrees maps x to x. Symmetric: the inverse of a rotation is a rotation. Transitive: two rotations in a row make a rotation. So ~ is an equivalence relation.
Classes: [RRR]={RRR}; [RRG]={RRG,RGR,GRR}; [RRB]={RRB,RBR,BRR}; [RGG]={RGG,GRG,GGR}; [RGB]={RGB,GBR,BRG}; [RBG]={RBG,GRB,BGR}; [RBB]={RBB,BRB,BBR}; [GGG]={GGG}; [GGB]={GGB,GBG,BGG}; [GBB]={GBB,BGB,BBG}; [BBB]={BBB}.
These are disjoint and 3*1 + 8*3 = 27 = |A|, so they partition A. Number of classes = 11.

#### 🪜 How it is solved, step by step

1. **Proof it is an equivalence relation.** Rotating by 0 degrees changes nothing, so x ~ x (reflexive). If a rotation takes x to y, the opposite rotation takes y back to x (symmetric). Doing one rotation and then another is again a rotation (0, 120 or 240), so x ~ y and y ~ z give x ~ z (transitive).
2. **Find the classes by type of word.** Rotate a word and collect what you get.
   - All letters the same: RRR, GGG, BBB do not change when rotated. Three classes of size 1.
   - Two letters the same, one different, e.g. RRG -> RGR -> GRR. Choose the repeated colour (3 ways) and the odd colour (2 ways): 6 classes of size 3: {RRG,RGR,GRR}, {RRB,RBR,BRR}, {RGG,GRG,GGR}, {RBB,BRB,BBR}, {GGB,GBG,BGG}, {GBB,BGB,BBG}.
   - All three different: 6 words RGB, RBG, GRB, GBR, BRG, BGR. RGB -> GBR -> BRG is one class; RBG -> BGR -> GRB is the other. Two classes of size 3. RGB and RBG are **different** because turning a triangle never reverses its clockwise order (that would need a reflection).
3. **Count and check.** 3 + 6 + 2 = 11 classes. Sizes: 3*1 + 8*3 = 27, so every word is used exactly once.

#### 📘 Concept refresher

- A **relation** on A is a set of ordered pairs from A. Here x ~ y means "y is a rotation of x".
- An **equivalence relation** must be **reflexive** (x ~ x), **symmetric** (x ~ y gives y ~ x) and **transitive** (x ~ y and y ~ z give x ~ z).
- The **equivalence class** of x is [x] = the set of everything related to x. Classes never overlap and together they cover A: that is a **partition**.
- Write a colouring as a 3-letter word read clockwise, e.g. RGB. A 120-degree rotation moves every letter one place round: RGB -> GBR -> BRG -> RGB. The three rotations (0, 120, 240 degrees) give at most 3 words per class.

#### ⚠️ Common mistakes

- Dividing 27 by 3 to get 9. That only works if every word moves; RRR, GGG, BBB do not, so they are classes of size 1.
- Putting RGB and RBG in one class. Without reflections they are separate.
- Listing the same class twice (once from RGB, once from GBR). Each class is written once.
- Forgetting to prove all three properties, or proving them without saying why rotations compose and invert.

#### ✅ Check yourself

1. Which class contains GRB? Answer: {RBG,GRB,BGR}.
2. If reflections were also allowed, how many classes? Answer: 10, because the two size-3 classes {RGB,...} and {RBG,...} merge into one class of 6.

### Slot 1 Q3: binary square under 90-degree rotations

#### 🎯 What is being asked

**Relations and equivalence classes** again, but now a **square** with 4 labelled vertices coloured R or B. That gives 2^4 = 16 colourings. Two colourings are equivalent when one is a **rotation** (0, 90, 180 or 270 degrees) of the other. Prove it is an equivalence relation, list all classes, count them. Final answer: **6 classes**.

#### ✍️ What to write in the exam

A = all 16 words over {R,B} of length 4; x ~ y iff y is a rotation of x by 0, 90, 180 or 270 degrees.
Reflexive: 0-degree rotation. Symmetric: the inverse of a rotation is a rotation. Transitive: composing rotations gives a rotation. Hence ~ is an equivalence relation.
Classes: {RRRR}; {RRRB,RRBR,RBRR,BRRR}; {RRBB,RBBR,BRRB,BBRR}; {RBRB,BRBR}; {RBBB,BRBB,BBRB,BBBR}; {BBBB}.
They are disjoint; sizes 1+4+4+2+4+1 = 16 = |A|. Number of classes = 6.

#### 🪜 How it is solved, step by step

1. **Equivalence proof.** 0-degree turn: x ~ x. Undo a turn by turning the rest of the way round (a 90-degree turn is undone by 270): symmetric. Two turns make a turn: transitive.
2. **Group the words by how many B's they contain** (turning cannot change the number of B's).
   - 0 B's: RRRR alone. 4 B's: BBBB alone.
   - 1 B: RRRB, RRBR, RBRR, BRRR. One class of 4: the B just moves round.
   - 3 B's: RBBB, BRBB, BBRB, BBBR. One class of 4 (the single R moves round).
   - 2 B's: C(4,2) = 6 words. Two B's can be **next to each other**: RRBB, RBBR, BBRR, BRRB (class of 4), or **opposite**: RBRB, BRBR (class of 2, because after a 180-degree turn RBRB is back to itself).
3. **Count and check.** Classes: 1 + 1 + 1 + 1 + 1 + 1 = 6. Sizes: 1 + 4 + 4 + 2 + 4 + 1 = 16, which equals 2^4, so every word is used exactly once.

#### 📘 Concept refresher

- **Equivalence relation** = reflexive + symmetric + transitive. Its **classes** are the groups of mutually related elements; they split the set into non-overlapping blocks (a **partition**).
- Write each colouring as a 4-letter word read clockwise, e.g. RRBR. A 90-degree turn moves every letter one place along, wrapping the last letter to the front: RRBR -> RRRB -> BRRR -> RBRR -> RRBR.
- The class of a word is everything you can reach by 0, 1, 2 or 3 such shifts. It has at most 4 words, but a word with a repeating pattern comes back early, so its class can be smaller (size 2 or 1).

#### ⚠️ Common mistakes

- Assuming every class has 4 words and answering 16/4 = 4. RRRR, BBBB and the RBRB pair are smaller.
- Missing the class {RBRB,BRBR}, or putting RRBB and RBRB together (the two B's are adjacent in one and opposite in the other).
- Listing BRRB separately from RRBB; rotate it and you see it is in that class.
- Mixing up "word" order: always read clockwise from the same starting vertex.

#### ✅ Check yourself

1. What is the class of BRBR? Answer: {RBRB,BRBR}.
2. The class of RRBB has 4 words but the class of RBRB has only 2. Why? Answer: turning RBRB by 180 degrees (two places) gives RBRB again, so only two different words ever appear.

### Slot 1 Q3: RGB triangle under rotations and reflections

#### 🎯 What is being asked

The same RGB triangle as before (27 colourings of 3 labelled vertices with R, G, B), but now two colourings are equivalent when related by a **rotation or a reflection**. Prove the relation is an equivalence relation, list the partition, count the classes. Final answer: **10 classes**.

#### ✍️ What to write in the exam

A = all 27 words over {R,G,B} of length 3; x ~ y iff y is obtained from x by a rotation or a reflection of the triangle.
Reflexive: identity. Symmetric: each symmetry has an inverse symmetry. Transitive: composition of two symmetries is a symmetry. So ~ is an equivalence relation.
Classes: {RRR}; {RRG,RGR,GRR}; {RRB,RBR,BRR}; {RGG,GRG,GGR}; {RGB,RBG,GRB,GBR,BRG,BGR}; {RBB,BRB,BBR}; {GGG}; {GGB,GBG,BGG}; {GBB,BGB,BBG}; {BBB}.
Sizes: 1+3+3+3+6+3+1+3+3+1 = 27 = |A|. Number of classes = 10.

#### 🪜 How it is solved, step by step

1. **Proof.** Identity (do nothing) gives reflexive. Every rotation or reflection can be undone by another one in the set, so symmetric. Doing one symmetry then another gives a symmetry (6 moves are closed under composition), so transitive.
2. **Words with a repeated letter are unaffected by adding reflections.** Take RRG: rotations give RGR and GRR. Reflection RRG -> RGR (swap positions 2 and 3) lands inside the same class. So these classes are the same as before: {RRR}, {GGG}, {BBB} (size 1) and {RRG,RGR,GRR}, {RRB,RBR,BRR}, {RGG,GRG,GGR}, {RBB,BRB,BBR}, {GGB,GBG,BGG}, {GBB,BGB,BBG} (size 3). That is 3 + 6 = 9 classes.
3. **The all-different words now merge.** Without reflections, RGB's class was {RGB,GBR,BRG} and RBG's was {RBG,BGR,GRB}. The reflection RGB -> RBG connects them, so they form one class of 6: {RGB,RBG,GRB,GBR,BRG,BGR}.
4. **Count and check.** 9 + 1 = 10 classes. Sizes: 3*1 + 6*3 + 6 = 27. Every word appears once.

#### 📘 Concept refresher

- **Equivalence relation**: reflexive, symmetric, transitive; classes partition the set.
- The symmetries of a triangle form a set of 6 moves: 3 rotations (0, 120, 240 degrees) and 3 reflections (flip over the line through one vertex and the middle of the opposite side). Together they are closed under composing and under undoing, which is exactly what we need for the proof.
- On a word like RGB read clockwise, a rotation shifts letters round (RGB -> GBR -> BRG). A reflection **reverses the direction**: it keeps one letter and swaps the other two, e.g. RGB -> RBG.
- So a class is now: all words reachable by shifting **and/or** reversing.

#### ⚠️ Common mistakes

- Still answering 11 because you copied the rotation-only answer.
- Merging more than needed: a reflection does not turn RRG into a word with different colour counts.
- Forgetting that the new class has 6 words, not 3.
- Forgetting to say that the 6 symmetries are closed under composing and under undoing; that is what proves symmetric and transitive.

#### ✅ Check yourself

1. Is RBG ~ GBR now? Answer: yes, both are in the 6-word class.
2. Why does adding reflections reduce 11 classes to exactly 10? Answer: only the two all-different classes merge; all other words already had every reordering reachable by rotation.

### Slot 1 Q3: congruence modulo 4 on {-3,...,8}

#### 🎯 What is being asked

A **congruence modulo 4** question on a small universe: A = {-3,-2,-1,0,1,2,3,4,5,6,7,8} (12 integers). Define x ~ y iff x = y (mod 4). Prove it is an equivalence relation, list the partition (classes), count them. Final answer: **4 classes**, each of size 3.

#### ✍️ What to write in the exam

Let A = {-3,-2,-1,0,1,2,3,4,5,6,7,8}; x ~ y iff 4 divides x - y.
Reflexive: x - x = 0 = 4*0. Symmetric: x - y = 4k implies y - x = 4(-k). Transitive: x - y = 4k and y - z = 4m imply x - z = 4(k+m). Hence ~ is an equivalence relation.
Classes: [0] = {0,4,8}; [1] = {-3,1,5}; [2] = {-2,2,6}; [3] = {-1,3,7}.
They are disjoint and 3+3+3+3 = 12 = |A|. Number of classes = 4.

#### 🪜 How it is solved, step by step

1. **Reflexive.** x - x = 0 = 4*0, so 4 divides x - x: x ~ x.
2. **Symmetric.** If x - y = 4k then y - x = 4*(-k), so y ~ x.
3. **Transitive.** If x - y = 4k and y - z = 4m, adding gives x - z = 4(k + m), so x ~ z.
4. **Find the classes: sort by remainder.** Go through A and add multiples of 4 until you land in 0..3:
   - remainder 0: 0, 4, 8 (also -4, but -4 is not in A)
   - remainder 1: -3 (since -3 + 4 = 1), 1, 5
   - remainder 2: -2, 2, 6
   - remainder 3: -1, 3, 7
5. **Check.** 3 + 3 + 3 + 3 = 12 elements, matching |A|. Four disjoint classes, so there are 4 classes.

#### 📘 Concept refresher

- x = y (mod 4) means **4 divides x - y** (x - y is a multiple of 4). Examples: 5 = 1 (mod 4) since 5 - 1 = 4; also -3 = 1 (mod 4) since -3 - 1 = -4.
- Equivalent idea: x and y leave the **same remainder** when divided by 4. For negatives, remainder always means a value 0, 1, 2 or 3 reached by adding multiples of 4: -3 + 4 = 1, so -3 has remainder 1.
- An **equivalence class** [a] = {x in A : x = a (mod 4)}. Only list elements of the given set A, not integers outside it.

#### ⚠️ Common mistakes

- Putting -3 with 3 (or in the remainder-3 class). -3 - 3 = -6 is not a multiple of 4; -3 - 1 = -4 is, so -3 belongs with 1.
- Listing infinite classes such as {..., -3, 1, 5, 9, ...}. Restrict to A.
- Writing "x - y divisible by 4" in the proof but never saying why it works for transitivity (you must add the two differences).
- Giving only the count 4 without listing the classes when the question says "list".

#### ✅ Check yourself

1. Is -2 related to 6? Answer: yes, -2 - 6 = -8 = 4*(-2).
2. How many classes if the same relation is taken mod 3 on the same set? Answer: 3 (remainders 0, 1, 2).

### Slot 1 Q3: equal-length strings in a finite universe

#### 🎯 What is being asked

Equivalence relation on **strings**, with a finite universe: A = {epsilon, a, b, aa, ab, ba, bb, aaa, abb, bbb} where epsilon is the empty string. Define x ~ y iff |x| = |y| (same length). Prove the relation is an equivalence relation, list the classes and count them. Final answer: **4 classes**.

#### ✍️ What to write in the exam

Let A = {epsilon, a, b, aa, ab, ba, bb, aaa, abb, bbb} and x ~ y iff |x| = |y|.
Reflexive: |x| = |x|. Symmetric: |x| = |y| gives |y| = |x|. Transitive: |x| = |y| and |y| = |z| give |x| = |z|. So ~ is an equivalence relation.
Classes: [epsilon] = {epsilon}; [a] = {a,b}; [aa] = {aa,ab,ba,bb}; [aaa] = {aaa,abb,bbb}.
These are disjoint with 1+2+4+3 = 10 = |A| elements, so they partition A. Number of classes = 4.

#### 🪜 How it is solved, step by step

1. **Reflexive.** |x| = |x| for every x, so x ~ x.
2. **Symmetric.** If |x| = |y| then |y| = |x|.
3. **Transitive.** If |x| = |y| and |y| = |z| then |x| = |z| (equality of numbers is transitive).
4. **Group the ten strings by length.**
   - length 0: epsilon
   - length 1: a, b
   - length 2: aa, ab, ba, bb
   - length 3: aaa, abb, bbb (only these three appear in A)
5. **Count and check.** 4 classes. Sizes 1 + 2 + 4 + 3 = 10 = |A|, so nothing is missed or repeated.

#### 📘 Concept refresher

- |x| means the **length** of the string x (number of letters). epsilon has length 0.
- A relation defined by "has the same value of some function" is an equivalence relation, because it inherits the properties of equality of numbers. Here the function is length.
- The **class** of x is [x] = all strings in A with the same length as x. Strings with the same length are grouped; different lengths go to different classes.
- Remember the universe: only the strings **listed** in A count, even if other strings of length 3 (like aab) exist in real life.

#### ⚠️ Common mistakes

- Leaving out epsilon. It is a string of length 0 and forms its own class.
- Adding extra strings of length 3 (aab, aba, ...) that are not in A, or writing {aaa,aab,...,bbb} with all 8 strings.
- Thinking a and aa are related because they use the same letter. Only length matters, not content.
- Describing the relation as "equal strings"; two different strings of equal length are related.

#### ✅ Check yourself

1. Is ab ~ ba? Answer: yes, both have length 2.
2. What if A also contained all 8 strings of length 3? Answer: the class of length 3 would have 8 elements, but the number of classes would still be 4.

### Slot 1 Q3: (a,b)~(c,d) iff a+d=b+c on {0,1,2,3} x {0,1,2,3}

#### 🎯 What is being asked

A relation on **ordered pairs**: A = {0,1,2,3} x {0,1,2,3}, which has 16 pairs. (a,b) ~ (c,d) iff a + d = b + c. Prove this is an equivalence relation, list all classes, count them. Final answer: **7 classes**.

#### ✍️ What to write in the exam

(a,b) ~ (c,d) iff a + d = b + c, equivalently a - b = c - d.
Reflexive: a + b = b + a. Symmetric: a + d = b + c gives c + b = d + a. Transitive: a + d = b + c and c + f = d + e add to give a + f = b + e. So ~ is an equivalence relation.
Classes (by a - b): {(0,0),(1,1),(2,2),(3,3)}; {(0,1),(1,2),(2,3)}; {(0,2),(1,3)}; {(0,3)}; {(1,0),(2,1),(3,2)}; {(2,0),(3,1)}; {(3,0)}.
Sizes 4+3+2+1+3+2+1 = 16 = |A|. Number of classes = 7.

#### 🪜 How it is solved, step by step

1. **Reflexive.** (a,b) ~ (a,b) needs a + b = b + a, true.
2. **Symmetric.** (a,b) ~ (c,d) means a + d = b + c. Then c + b = d + a, which is the condition for (c,d) ~ (a,b).
3. **Transitive.** Suppose a + d = b + c and c + f = d + e. Add the equations: a + d + c + f = b + c + d + e. Cancel c and d: a + f = b + e, so (a,b) ~ (e,f).
4. **Find the classes by difference a - b.** It can be -3, -2, -1, 0, 1, 2, 3.
   - difference 0: (0,0),(1,1),(2,2),(3,3)
   - difference -1: (0,1),(1,2),(2,3)
   - difference -2: (0,2),(1,3)
   - difference -3: (0,3)
   - difference 1: (1,0),(2,1),(3,2)
   - difference 2: (2,0),(3,1)
   - difference 3: (3,0)
5. **Count and check.** 7 differences give 7 classes. Sizes 4 + 3 + 2 + 1 + 3 + 2 + 1 = 16 = |A|.

#### 📘 Concept refresher

- Ordered pair (a,b) is a point with first and second coordinate; (1,0) and (0,1) are different pairs.
- To prove an equivalence relation: reflexive, symmetric, transitive. Here you need to show each using **algebra** on the equation a + d = b + c.
- **Key trick:** rewrite a + d = b + c as **a - b = c - d**. So (a,b) ~ (c,d) exactly when the two pairs have the same **difference** (first minus second). A relation of the form "same value of something" is an equivalence relation, and its classes are the groups with the same value.
- The class of (a,b) inside A is {(c,d) in A : c - d = a - b}.

#### ⚠️ Common mistakes

- Testing a few pairs instead of proving the relation algebraically.
- Mixing up a - b and b - a, or grouping pairs with the same sum (a + b). Same sum is a different relation.
- Stopping at differences >= 0 and forgetting the negative ones; there are 7 differences from -3 to 3, not 4.
- Writing pairs without parentheses, or sorting the elements of a class inconsistently.

#### ✅ Check yourself

1. Is (2,1) ~ (3,2)? Answer: yes, 2 + 2 = 1 + 3 = 4, or 2 - 1 = 3 - 2 = 1.
2. If the universe was {0,1,2} x {0,1,2}, how many classes? Answer: 5 (differences -2 to 2).

## Q4 · Recurrence relations

### Slot 1 Q4: reported third-order recurrence

#### 🎯 What is being asked

**Non-homogeneous linear recurrence** (Q4, 10 marks): a_n = 7*a_(n-1) - 16*a_(n-2) + 12*a_(n-3) + n^4 for n >= 3, with a_0 = -2, a_1 = 0, a_2 = 5. You must give the characteristic equation and its roots, the particular solution with all coefficients, and the closed form with every constant found. Final answer: a_n = 984*2^n - (575/2)*n*2^n + 113*3^n - (1/2)*n^4 - 11*n^3 - 105*n^2 - (1033/2)*n - 1099.

#### ✍️ What to write in the exam

Characteristic equation: r^3 - 7r^2 + 16r - 12 = (r-2)^2 (r-3) = 0; roots 2, 2, 3.
Homogeneous solution: C1*2^n + C2*n*2^n + C3*3^n.
Forcing n^4 (base 1 is not a root), so try p_n = A*n^4 + B*n^3 + C*n^2 + D*n + E. Substituting and equating coefficients gives -2A = 1, 44A - 2B = 0, -306A + 33B - 2C = 0, 812A - 153B + 22C - 2D = 0, -723A + 203B - 51C + 11D - 2E = 0, so A = -1/2, B = -11, C = -105, D = -1033/2, E = -1099.
General solution: a_n = C1*2^n + C2*n*2^n + C3*3^n + p_n. With a_0 = -2, a_1 = 0, a_2 = 5: C1 = 984, C2 = -575/2, C3 = 113.
Hence a_n = 984*2^n - (575/2)*n*2^n + 113*3^n - (1/2)*n^4 - 11*n^3 - 105*n^2 - (1033/2)*n - 1099, n >= 0. Check: a_3 = 92 from both the recurrence and the formula.

#### 🪜 How it is solved, step by step

1. **Characteristic equation.** Move everything to one side: r^3 - 7r^2 + 16r - 12 = 0. Try r = 2: 8 - 28 + 32 - 12 = 0, so (r - 2) is a factor. Divide: (r - 2)(r^2 - 5r + 6) = (r - 2)(r - 2)(r - 3). Roots: 2, 2, 3.
2. **Homogeneous solution.** 2 is repeated, so C1*2^n + C2*n*2^n + C3*3^n.
3. **Particular guess.** Forcing n^4 has base 1. Is 1 a root? No, so no extra factor of n. Use the full polynomial: p_n = A*n^4 + B*n^3 + C*n^2 + D*n + E (include every lower power).
4. **Substitute.** p_n - 7p_(n-1) + 16p_(n-2) - 12p_(n-3) must equal n^4. Expanding (n-1)^4, (n-2)^4, (n-3)^4 and collecting powers: the n^4 coefficient from A is 1 - 7 + 16 - 12 = -2; the n^3 coefficient is -7(-4) + 16(-8) - 12(-12) = 44, and so on. Equating coefficients of n^4 ... n^0:
   -2A = 1; 44A - 2B = 0; -306A + 33B - 2C = 0; 812A - 153B + 22C - 2D = 0; -723A + 203B - 51C + 11D - 2E = 0.
   Solving top to bottom: A = -1/2, B = -11, C = -105, D = -1033/2, E = -1099.
5. **Initial conditions on the total** a_n = C1*2^n + C2*n*2^n + C3*3^n + p_n. Values p_0 = -1099, p_1 = -1732, p_2 = -2648. So: C1 + C3 = 1097; 2C1 + 2C2 + 3C3 = 1732; 4C1 + 8C2 + 9C3 = 2653. Equation 2 minus 2*(eq 1): 2C2 + C3 = -462. Equation 3 minus 4*(eq 1): 8C2 + 5C3 = -1735. Subtract 4*(first new) from second: C3 = 113; then C2 = -575/2 and C1 = 984.
6. **Self-check.** From the recurrence, a_3 = 7*5 - 16*0 + 12*(-2) + 81 = 92. The formula at n = 3 gives 7872 - 6900 + 3051 - 81/2 - 297 - 945 - 3099/2 - 1099 = 92. It matches.

#### 📘 Concept refresher

- **Linear, constant coefficients**: a_n is built from earlier terms times fixed numbers. **Non-homogeneous** means an extra "forcing" term (here n^4) is added.
- The answer is always **a_n = (homogeneous solution) + (particular solution)**.
- **Characteristic equation**: replace a_(n-k) by r^(n-k) in the homogeneous part and divide by a power of r. Each root r gives a piece r^n; a root repeated twice gives r^n and n*r^n.
- **Particular solution**: any single solution of the full recurrence. For polynomial forcing of degree d, guess a general polynomial of degree d. If the forcing base (1 for a polynomial) is itself a root of the characteristic equation, multiply the guess by n for each time the root is repeated (the "multiply by n" rule).

#### ⚠️ Common mistakes

- Applying a_0, a_1, a_2 to the homogeneous part only; they must be used on the whole solution.
- Guessing only A*n^4 instead of all powers down to a constant.
- Writing C1*2^n + C2*2^n for a repeated root. The second piece needs the factor n.
- Sign slips in the coefficient equations: the minus signs in front of the earlier terms (-7, +16, -12) matter.
- Not verifying with one computed term.

#### ✅ Check yourself

1. If the forcing were 3^n instead of n^4, what would the guess be? Answer: 3 is a simple root, so p_n = A*n*3^n.
2. If forcing were n^4 but 1 were a root of the characteristic equation, what changes? Answer: multiply the whole polynomial guess by n (or n^2 if repeated).

### Slot 1 Q4: non-homogeneous variant 1

#### 🎯 What is being asked

Solve a_n = 4*a_(n-1) - 4*a_(n-2) + n^2 for n >= 2 with a_0 = 1, a_1 = 2. Give the characteristic equation and roots, the particular solution coefficients, and the closed form with all constants. Final answer: a_n = -19*2^n + (11/2)*n*2^n + n^2 + 8n + 20.

#### ✍️ What to write in the exam

Characteristic equation: r^2 - 4r + 4 = (r-2)^2 = 0, so r = 2 (double root).
Homogeneous solution: C1*2^n + C2*n*2^n.
Forcing n^2 has base 1, not a root, so try p_n = A*n^2 + B*n + C. Substituting into p_n - 4p_(n-1) + 4p_(n-2) = n^2 and equating coefficients: A = 1, -8A + B = 0, 12A - 4B + C = 0, so A = 1, B = 8, C = 20.
General solution a_n = C1*2^n + C2*n*2^n + n^2 + 8n + 20.
a_0 = 1 gives C1 + 20 = 1, so C1 = -19. a_1 = 2 gives 2C1 + 2C2 + 29 = 2, so C2 = 11/2.
Therefore a_n = -19*2^n + (11/2)*n*2^n + n^2 + 8n + 20, n >= 0. Check: a_2 = 8 from the recurrence and from the formula.

#### 🪜 How it is solved, step by step

1. **Characteristic equation.** r^2 = 4r - 4, so r^2 - 4r + 4 = (r - 2)^2 = 0. Root 2 with multiplicity 2.
2. **Homogeneous solution.** C1*2^n + C2*n*2^n.
3. **Guess.** p_n = A*n^2 + B*n + C. No extra n since 1 is not a root.
4. **Substitute** into p_n - 4p_(n-1) + 4p_(n-2) = n^2. Use p_(n-1) = A(n^2 - 2n + 1) + B(n - 1) + C and p_(n-2) = A(n^2 - 4n + 4) + B(n - 2) + C. Collect:
   - n^2: A - 4A + 4A = A
   - n: B - 4(-2A + B) + 4(-4A + B) = -8A + B
   - constant: C - 4(A - B + C) + 4(4A - 2B + C) = 12A - 4B + C
   Match n^2 + 0n + 0: A = 1; -8A + B = 0 gives B = 8; 12A - 4B + C = 0 gives C = -12 + 32 = 20. So p_n = n^2 + 8n + 20.
5. **Constants from the total** a_n = C1*2^n + C2*n*2^n + n^2 + 8n + 20.
   n = 0: C1 + 20 = 1, so C1 = -19.
   n = 1: 2C1 + 2C2 + 29 = 2, so -38 + 2C2 = -27, so C2 = 11/2.
6. **Check.** a_2 = 4*2 - 4*1 + 4 = 8. Formula: -19*4 + (11/2)*2*4 + 4 + 16 + 20 = -76 + 44 + 40 = 8.

#### 📘 Concept refresher

- Solve a **non-homogeneous recurrence** in two parts: a_n = (homogeneous part) + (particular part).
- **Homogeneous part**: drop n^2, set a_n = r^n, get the characteristic equation. A **repeated root** r (multiplicity 2) gives two pieces: r^n and n*r^n.
- **Particular part**: a guess that looks like the forcing. For forcing n^2, guess A*n^2 + B*n + C.
- **When to multiply by n**: only if the *forcing's base* is a root. A polynomial forcing has base 1. Here the repeated root is 2, not 1, so there is no clash and no extra n. Don't confuse "the equation has a repeated root" with "the guess must be multiplied".

#### ⚠️ Common mistakes

- Multiplying the guess by n^2 because the characteristic root is repeated. That rule applies to the forcing's base, and here it is 1.
- Leaving out the B*n or C terms in the guess.
- Using the homogeneous solution alone with a_0 and a_1 (forgetting p_0 = 20 and p_1 = 29).
- Algebra mistakes when expanding (n-2)^2: it is n^2 - 4n + 4.

#### ✅ Check yourself

1. What would the guess be if forcing were 2^n instead of n^2? Answer: 2 is a double root, so A*n^2*2^n.
2. What is p_1? Answer: 1 + 8 + 20 = 29.

### Slot 1 Q4: non-homogeneous variant 2

#### 🎯 What is being asked

Solve a_n = 4*a_(n-1) - 4*a_(n-2) + 2^n for n >= 2 with a_0 = 1, a_1 = 4. State the characteristic equation and roots, find the particular solution and the closed form with all constants. This is the **resonance** case: the forcing 2^n matches a repeated characteristic root. Final answer: a_n = 2^n + (1/2)*n*2^n + (1/2)*n^2*2^n = (1 + n/2 + n^2/2)*2^n.

#### ✍️ What to write in the exam

Characteristic equation: r^2 - 4r + 4 = (r-2)^2 = 0, root r = 2 of multiplicity 2.
Homogeneous solution: C1*2^n + C2*n*2^n.
The forcing 2^n has base 2, a double root, so try p_n = A*n^2*2^n. Substituting into p_n - 4p_(n-1) + 4p_(n-2) = 2^n and dividing by 2^n: A[n^2 - 2(n-1)^2 + (n-2)^2] = 1, i.e. 2A = 1, so A = 1/2.
General solution a_n = C1*2^n + C2*n*2^n + (1/2)*n^2*2^n.
a_0 = 1 gives C1 = 1. a_1 = 4 gives 2 + 2C2 + 1 = 4, so C2 = 1/2.
Therefore a_n = 2^n + (1/2)*n*2^n + (1/2)*n^2*2^n for n >= 0. Check: a_2 = 16 both ways.

#### 🪜 How it is solved, step by step

1. **Characteristic equation.** r^2 - 4r + 4 = (r - 2)^2 = 0. Root 2, twice.
2. **Homogeneous solution.** C1*2^n + C2*n*2^n.
3. **Guess.** Forcing base 2 is a double root, so multiply by n^2: p_n = A*n^2*2^n.
4. **Substitute.** p_n - 4p_(n-1) + 4p_(n-2) = 2^n. Write p_(n-1) = A(n-1)^2*2^(n-1) and p_(n-2) = A(n-2)^2*2^(n-2). Divide everything by 2^n:
   A[ n^2 - 4(n-1)^2/2 + 4(n-2)^2/4 ] = 1, i.e. A[ n^2 - 2(n-1)^2 + (n-2)^2 ] = 1.
   Expand: n^2 - 2n^2 + 4n - 2 + n^2 - 4n + 4 = 2. So 2A = 1, A = 1/2, and p_n = (1/2)*n^2*2^n.
5. **Constants.** a_n = C1*2^n + C2*n*2^n + (1/2)*n^2*2^n.
   n = 0: C1 = 1 (the n-terms vanish).
   n = 1: 2C1 + 2C2 + (1/2)*1*2 = 4, i.e. 2 + 2C2 + 1 = 4, so C2 = 1/2.
6. **Check.** Recurrence: a_2 = 4*4 - 4*1 + 4 = 16. Formula: (1 + 1 + 2)*4 = 16.

#### 📘 Concept refresher

- Answer = **homogeneous solution + particular solution**.
- If the forcing term is b^n and b is a root of the characteristic equation of multiplicity s, then plain C*b^n already solves the homogeneous equation, so it cannot also produce 2^n on the right. The fix: multiply by n^s. For b = 2 as a **double** root, try C*n^2*2^n.
- Quick idea: a trial that is "already a solution" gives 0 when substituted into the homogeneous equation, so it can never equal 2^n. Multiplying by n^s makes it genuinely new.

#### ⚠️ Common mistakes

- Trying A*2^n or A*n*2^n. Both are solutions of the homogeneous equation and substitute to 0.
- Dividing by 2^n incorrectly: 2^(n-1) = 2^n/2 and 2^(n-2) = 2^n/4.
- Forgetting that C2 still appears in the final answer: the n*2^n term from the homogeneous part is separate from n^2*2^n.
- Using a_1 = 4 without adding p_1 = 1.

#### ✅ Check yourself

1. What is p_1? Answer: (1/2)*1*2 = 1.
2. Compute a_3 from the recurrence and the formula. Answer: a_3 = 4*16 - 4*4 + 8 = 56; formula (1 + 3/2 + 9/2)*8 = 7*8 = 56.

### Slot 1 Q4: non-homogeneous variant 3

#### 🎯 What is being asked

Solve a_n = 3*a_(n-1) - 2*a_(n-2) + 2^n for n >= 2 with a_0 = 0, a_1 = 1. Give the characteristic equation and roots, the particular solution and the closed form with all constants. Final answer: a_n = 3 - 3*2^n + 2*n*2^n.

#### ✍️ What to write in the exam

Characteristic equation: r^2 - 3r + 2 = (r-1)(r-2) = 0, roots r = 1, 2.
Homogeneous solution: C1 + C2*2^n.
Forcing 2^n: base 2 is a simple root, so try p_n = A*n*2^n. Substituting and dividing by 2^n: A[n - 3(n-1)/2 + (n-2)/2] = 1, so A/2 = 1, A = 2, p_n = 2*n*2^n.
General solution a_n = C1 + C2*2^n + 2*n*2^n.
a_0 = 0: C1 + C2 = 0. a_1 = 1: C1 + 2C2 + 4 = 1. So C2 = -3, C1 = 3.
Therefore a_n = 3 - 3*2^n + 2*n*2^n, n >= 0. Check: a_2 = 7 and a_3 = 27 from the recurrence and from the formula.

#### 🪜 How it is solved, step by step

1. **Characteristic equation.** r^2 - 3r + 2 = (r - 1)(r - 2) = 0. Roots 1 and 2, each once.
2. **Homogeneous solution.** C1*1^n + C2*2^n = C1 + C2*2^n.
3. **Guess.** The forcing 2^n has base 2, which is a root once, so try p_n = A*n*2^n.
4. **Substitute.** p_n - 3p_(n-1) + 2p_(n-2) = 2^n. With p_(n-1) = A(n-1)*2^(n-1) and p_(n-2) = A(n-2)*2^(n-2), divide by 2^n:
   A[ n - 3(n-1)/2 + 2(n-2)/4 ] = 1.
   Inside the bracket: n - 3n/2 + 3/2 + n/2 - 1 = 1/2. So A/2 = 1, A = 2. p_n = 2*n*2^n.
5. **Constants.** a_n = C1 + C2*2^n + 2*n*2^n. p_0 = 0, p_1 = 2*1*2 = 4.
   n = 0: C1 + C2 = 0.
   n = 1: C1 + 2C2 + 4 = 1, so C1 + 2C2 = -3.
   Subtract: C2 = -3, hence C1 = 3.
6. **Check.** Recurrence: a_2 = 3*1 - 2*0 + 4 = 7. Formula: 3 - 12 + 2*2*4 = 7. Also a_3 = 3*7 - 2*1 + 8 = 27 and the formula gives 3 - 24 + 48 = 27.

#### 📘 Concept refresher

- The solution of a non-homogeneous recurrence is **homogeneous part + particular part**.
- With **distinct roots** r1, r2 the homogeneous part is C1*r1^n + C2*r2^n. Note that 1^n = 1, so a root 1 contributes just a constant C1.
- **Resonance rule**: if the forcing is b^n and b equals a root with multiplicity s, multiply the guess by n^s. Here the forcing base is 2 and 2 is a **simple** root (multiplicity 1), so the guess is A*n*2^n.
- The particular solution is found by substituting the guess into the recurrence and comparing coefficients.

#### ⚠️ Common mistakes

- Using A*2^n as the guess; 2^n is already in the homogeneous solution.
- Using n^2 as well. n^2 is only for a double root; here 2 is a single root.
- Writing the root 1 as C1*1 and then losing the constant, or forgetting it is just a constant.
- Not adding p_1 = 4 before applying a_1 = 1.

#### ✅ Check yourself

1. If the recurrence were a_n = 3*a_(n-1) - 2*a_(n-2) + 3^n, what would the guess be? Answer: 3 is not a root, so A*3^n with no n.
2. What does a_4 equal? Answer: 3*27 - 2*7 + 16 = 83; formula 3 - 48 + 128 = 83.

### Slot 1 Q4: non-homogeneous variant 4

#### 🎯 What is being asked

Solve a_n = 2*a_(n-1) - a_(n-2) + n for n >= 2 with a_0 = 0, a_1 = 1. Give the characteristic equation and roots, the particular solution coefficients and the closed form. The trap here is that the forcing is a **polynomial** (base 1) and 1 is a **double** root. Final answer: a_n = (1/3)*n + (1/2)*n^2 + (1/6)*n^3 = n(n+1)(n+2)/6.

#### ✍️ What to write in the exam

Characteristic equation: r^2 - 2r + 1 = (r-1)^2 = 0, root r = 1 of multiplicity 2.
Homogeneous solution: C1 + C2*n.
The forcing n has base 1, a double root, so try p_n = n^2(A*n + B) = A*n^3 + B*n^2. Substituting into p_n - 2p_(n-1) + p_(n-2) = n gives A(6n - 6) + 2B = n, so 6A = 1 and -6A + 2B = 0: A = 1/6, B = 1/2.
General solution a_n = C1 + C2*n + (1/6)n^3 + (1/2)n^2.
a_0 = 0 gives C1 = 0; a_1 = 1 gives C2 + 2/3 = 1, so C2 = 1/3.
Hence a_n = (1/3)n + (1/2)n^2 + (1/6)n^3, n >= 0. Check: a_2 = 4, a_3 = 10 from both recurrence and formula.

#### 🪜 How it is solved, step by step

1. **Characteristic equation.** r^2 - 2r + 1 = (r - 1)^2 = 0. Root 1, twice.
2. **Homogeneous solution.** C1*1^n + C2*n*1^n = C1 + C2*n.
3. **Guess.** Base 1 is a double root: p_n = n^2(A*n + B) = A*n^3 + B*n^2.
4. **Substitute** into p_n - 2p_(n-1) + p_(n-2) = n. Expand (n-1)^3 = n^3 - 3n^2 + 3n - 1 and (n-2)^3 = n^3 - 6n^2 + 12n - 8, and likewise for squares:
   - for n^3: n^3 - 2(n-1)^3 + (n-2)^3 = 6n - 6
   - for n^2: n^2 - 2(n-1)^2 + (n-2)^2 = 2
   So A(6n - 6) + 2B = n. Compare n: 6A = 1, A = 1/6. Compare constants: -6A + 2B = 0, so B = 1/2. p_n = (1/6)n^3 + (1/2)n^2.
5. **Constants.** a_n = C1 + C2*n + (1/6)n^3 + (1/2)n^2. p_0 = 0, p_1 = 1/6 + 1/2 = 2/3.
   n = 0: C1 = 0.
   n = 1: C1 + C2 + 2/3 = 1, so C2 = 1/3.
6. **Check.** Terms from the recurrence: a_2 = 2*1 - 0 + 2 = 4, a_3 = 2*4 - 1 + 3 = 10, a_4 = 2*10 - 4 + 4 = 20. Formula at n = 3: 1 + 9/2 + 27/6 = 1 + 4.5 + 4.5 = 10. The values 0, 1, 4, 10, 20 are the tetrahedral numbers n(n+1)(n+2)/6, which equals the formula.

#### 📘 Concept refresher

- Answer = homogeneous solution + particular solution.
- A polynomial forcing means "b^n with b = 1". So it clashes with a characteristic root 1.
- If 1 is a root of multiplicity s, multiply the whole polynomial guess by n^s. For forcing n (degree 1) and s = 2, start from A*n + B and multiply by n^2: A*n^3 + B*n^2. Any lower terms (like n or a constant) would only repeat the homogeneous solution, so they are not needed.
- Why: the homogeneous solution here is C1 + C2*n. A trial with terms in n^0 or n^1 would substitute to 0.

#### ⚠️ Common mistakes

- Guessing A*n + B (no clash handling). It collapses into the homogeneous part and gives 0 = n.
- Multiplying by only n (one factor) when the root is double.
- Including A*n^3 + B*n^2 + C*n + D. Extra terms are harmless but unnecessary; the n and constant terms get absorbed into C1 and C2.
- Forgetting p_1 = 2/3 in the initial condition.

#### ✅ Check yourself

1. What would the guess be if forcing were n^2 with the same characteristic equation? Answer: n^2(A*n^2 + B*n + C).
2. Compute a_4 from the formula. Answer: 4/3 + 8 + 64/6 = 20.

## Q5 · Minimum spanning tree (Kruskal)

### Slot 1 Q5: constructed graph illustrating the reported Kruskal task

#### 🎯 What is being asked

This is a **minimum spanning tree (MST)** question on a graph with 7 vertices A to G and 11 weighted edges: AB(1),BC(1),AC(2),CD(3),BD(4),DE(5),CE(5),EF(6),DF(7),FG(8),EG(9). You must run **Kruskal's algorithm**: write every candidate edge in order, say whether it is **accepted or rejected and why**, stop when 6 edges are accepted, and finish with the **total weight**. This one has a tie at the very start: two edges of weight 1. The question is worth 10 marks: 2 for sorting, 6 for the six additions, 2 for the spanning-tree statement and the total.

#### ✍️ What to write in the exam

```text
Kruskal's algorithm.
Sorted edges: AB(1), BC(1), AC(2), CD(3), BD(4), DE(5), CE(5), EF(6), DF(7), FG(8), EG(9)
Step 1: add AB(1), joins different components: {A,B}; {C}; {D}; {E}; {F}; {G}.
Step 2: add BC(1), joins different components: {A,B,C}; {D}; {E}; {F}; {G}.
Reject AC(2): endpoints already in the same component (cycle).
Step 3: add CD(3), joins different components: {A,B,C,D}; {E}; {F}; {G}.
Reject BD(4): endpoints already in the same component (cycle).
Step 4: add DE(5), joins different components: {A,B,C,D,E}; {F}; {G}.
Reject CE(5): endpoints already in the same component (cycle).
Step 5: add EF(6), joins different components: {A,B,C,D,E,F}; {G}.
Reject DF(7): endpoints already in the same component (cycle).
Step 6: add FG(8), joins different components: {A,B,C,D,E,F,G}.
Finally all seven vertices are connected using six edges, so this is the MST by Kruskal's algorithm.
MST edges: AB, BC, CD, DE, EF, FG. Total weight = 1 + 1 + 3 + 5 + 6 + 8 = 24.
```
Write the accepted AND rejected edges in order, one reason per line, and always state the total.

#### 🪜 How it is solved, step by step

1. **Sort** all edges by weight, smallest first (keep the printed order among equal weights). Sorted list: AB(1), BC(1), AC(2), CD(3), BD(4), DE(5), CE(5), EF(6), DF(7), FG(8), EG(9). We sort first so nothing cheaper is still waiting when we meet an edge.
2. **Start** with seven single-vertex pieces: {A}; {B}; {C}; {D}; {E}; {F}; {G}.
3. **Go down the list**, testing each edge with the piece rule:
   - **AB(1)**: different pieces, so **add** (edge 1 of 6). Now: {A,B}; {C}; {D}; {E}; {F}; {G}.
   - **BC(1)**: different pieces, so **add** (edge 2 of 6). Now: {A,B,C}; {D}; {E}; {F}; {G}.
   - **AC(2)**: same piece already, a cycle: **reject**.
   - **CD(3)**: different pieces, so **add** (edge 3 of 6). Now: {A,B,C,D}; {E}; {F}; {G}.
   - **BD(4)**: same piece already, a cycle: **reject**.
   - **DE(5)**: different pieces, so **add** (edge 4 of 6). Now: {A,B,C,D,E}; {F}; {G}.
   - **CE(5)**: same piece already, a cycle: **reject**.
   - **EF(6)**: different pieces, so **add** (edge 5 of 6). Now: {A,B,C,D,E,F}; {G}.
   - **DF(7)**: same piece already, a cycle: **reject**.
   - **FG(8)**: different pieces, so **add** (edge 6 of 6). Now: {A,B,C,D,E,F,G}.
4. **Stop** when 6 edges are accepted: all seven vertices are now one piece. The remaining edges (EG(9)) are not examined.
5. **Add the weights** of the accepted edges AB, BC, CD, DE, EF, FG: 1 + 1 + 3 + 5 + 6 + 8 = **24**.
6. **Sanity check:** 6 edges for 7 vertices, one piece, no cycle. Rejected edges: AC, BD, CE, DF. Look at the first tie: AB(1) and BC(1) both have weight 1, and AC(2) closes the triangle A, B, C. The triangle can only ever contribute two of its three edges.

#### 📘 Concept refresher

- A **spanning tree** touches every vertex and has no cycles. With V = 7 vertices it always has exactly V - 1 = **6 edges**.
- A **minimum** spanning tree is the one with the smallest total weight.
- **Kruskal's rule in one line:** always take the cheapest edge that does not make a cycle.
- How to detect a cycle without drawing: keep track of **components** (pieces that are already connected). At the start every vertex is its own piece. An edge whose two ends lie in **different pieces** is safe: add it and merge the two pieces. An edge whose two ends lie in the **same piece** would close a loop: reject it.
- Ties (equal weights): either order is allowed; the total is the same.

Tiny example: triangle XY(1), YZ(1), XZ(2). Take XY, then YZ; now X, Y, Z are one piece, so XZ is rejected. Total = 2.

#### ⚠️ Common mistakes

- Forgetting to sort first, or sorting wrongly. Re-read the sorted list once against the edge list: it must have 11 edges.
- Accepting an edge just because it is cheap. Always ask: are its two ends already in the same piece?
- Rejecting an edge only because one end is already used. A vertex can have many edges; only an edge whose two ends are already connected is rejected.
- Continuing after 6 edges, or stopping at 5. A tree on 7 vertices has exactly 6 edges.
- Totalling rejected edges too. Add only the 6 accepted weights.

#### ✅ Check yourself

1. How many edges does the MST of this graph have? Answer: 6, because a tree on 7 vertices has V - 1 = 6 edges.
2. If you took tied edges in the opposite order, would the total change? Answer: the chosen edges might differ, but the total stays 24, because ties only choose between equal weights.

### Slot 1 Q5: Kruskal variant 1

#### 🎯 What is being asked

This is a **minimum spanning tree (MST)** question on a graph with 7 vertices A to G and 11 weighted edges: AB(2),BC(1),AC(1),CD(4),BD(3),DE(6),CE(5),EF(7),DF(4),FG(8),EG(9). You must run **Kruskal's algorithm**: write every candidate edge in order, say whether it is **accepted or rejected and why**, stop when 6 edges are accepted, and finish with the **total weight**. Watch the triangle A-B-C and the two weight-4 edges. The question is worth 10 marks: 2 for sorting, 6 for the six additions, 2 for the spanning-tree statement and the total.

#### ✍️ What to write in the exam

```text
Kruskal's algorithm.
Sorted edges: BC(1), AC(1), AB(2), BD(3), CD(4), DF(4), CE(5), DE(6), EF(7), FG(8), EG(9)
Step 1: add BC(1), joins different components: {A}; {B,C}; {D}; {E}; {F}; {G}.
Step 2: add AC(1), joins different components: {A,B,C}; {D}; {E}; {F}; {G}.
Reject AB(2): endpoints already in the same component (cycle).
Step 3: add BD(3), joins different components: {A,B,C,D}; {E}; {F}; {G}.
Reject CD(4): endpoints already in the same component (cycle).
Step 4: add DF(4), joins different components: {A,B,C,D,F}; {E}; {G}.
Step 5: add CE(5), joins different components: {A,B,C,D,E,F}; {G}.
Reject DE(6): endpoints already in the same component (cycle).
Reject EF(7): endpoints already in the same component (cycle).
Step 6: add FG(8), joins different components: {A,B,C,D,E,F,G}.
Finally all seven vertices are connected using six edges, so this is the MST by Kruskal's algorithm.
MST edges: BC, AC, BD, DF, CE, FG. Total weight = 1 + 1 + 3 + 4 + 5 + 8 = 22.
```
Write the accepted AND rejected edges in order, one reason per line, and always state the total.

#### 🪜 How it is solved, step by step

1. **Sort** all edges by weight, smallest first (keep the printed order among equal weights). Sorted list: BC(1), AC(1), AB(2), BD(3), CD(4), DF(4), CE(5), DE(6), EF(7), FG(8), EG(9). We sort first so nothing cheaper is still waiting when we meet an edge.
2. **Start** with seven single-vertex pieces: {A}; {B}; {C}; {D}; {E}; {F}; {G}.
3. **Go down the list**, testing each edge with the piece rule:
   - **BC(1)**: different pieces, so **add** (edge 1 of 6). Now: {A}; {B,C}; {D}; {E}; {F}; {G}.
   - **AC(1)**: different pieces, so **add** (edge 2 of 6). Now: {A,B,C}; {D}; {E}; {F}; {G}.
   - **AB(2)**: same piece already, a cycle: **reject**.
   - **BD(3)**: different pieces, so **add** (edge 3 of 6). Now: {A,B,C,D}; {E}; {F}; {G}.
   - **CD(4)**: same piece already, a cycle: **reject**.
   - **DF(4)**: different pieces, so **add** (edge 4 of 6). Now: {A,B,C,D,F}; {E}; {G}.
   - **CE(5)**: different pieces, so **add** (edge 5 of 6). Now: {A,B,C,D,E,F}; {G}.
   - **DE(6)**: same piece already, a cycle: **reject**.
   - **EF(7)**: same piece already, a cycle: **reject**.
   - **FG(8)**: different pieces, so **add** (edge 6 of 6). Now: {A,B,C,D,E,F,G}.
4. **Stop** when 6 edges are accepted: all seven vertices are now one piece. The remaining edges (EG(9)) are not examined.
5. **Add the weights** of the accepted edges BC, AC, BD, DF, CE, FG: 1 + 1 + 3 + 4 + 5 + 8 = **22**.
6. **Sanity check:** 6 edges for 7 vertices, one piece, no cycle. Rejected edges: AB, CD, DE, EF. The triangle A, B, C contributes only two edges; the third is always a cycle. The two weight-4 edges CD and DF are not rivals here: one is a cycle edge and the other joins a new vertex.

#### 📘 Concept refresher

- A **spanning tree** touches every vertex and has no cycles. With V = 7 vertices it always has exactly V - 1 = **6 edges**.
- A **minimum** spanning tree is the one with the smallest total weight.
- **Kruskal's rule in one line:** always take the cheapest edge that does not make a cycle.
- How to detect a cycle without drawing: keep track of **components** (pieces that are already connected). At the start every vertex is its own piece. An edge whose two ends lie in **different pieces** is safe: add it and merge the two pieces. An edge whose two ends lie in the **same piece** would close a loop: reject it.
- Ties (equal weights): either order is allowed; the total is the same.

Tiny example: triangle XY(1), YZ(1), XZ(2). Take XY, then YZ; now X, Y, Z are one piece, so XZ is rejected. Total = 2.

#### ⚠️ Common mistakes

- Forgetting to sort first, or sorting wrongly. Re-read the sorted list once against the edge list: it must have 11 edges.
- Accepting an edge just because it is cheap. Always ask: are its two ends already in the same piece?
- Rejecting an edge only because one end is already used. A vertex can have many edges; only an edge whose two ends are already connected is rejected.
- Continuing after 6 edges, or stopping at 5. A tree on 7 vertices has exactly 6 edges.
- Totalling rejected edges too. Add only the 6 accepted weights.

#### ✅ Check yourself

1. How many edges does the MST of this graph have? Answer: 6, because a tree on 7 vertices has V - 1 = 6 edges.
2. If you took tied edges in the opposite order, would the total change? Answer: the chosen edges might differ, but the total stays 22, because ties only choose between equal weights.

### Slot 1 Q5: Kruskal variant 2

#### 🎯 What is being asked

This is a **minimum spanning tree (MST)** question on a graph with 7 vertices A to G and 11 weighted edges: AB(3),BC(2),AC(1),CD(1),BD(4),DE(5),CE(6),EF(2),DF(7),FG(8),EG(9). You must run **Kruskal's algorithm**: write every candidate edge in order, say whether it is **accepted or rejected and why**, stop when 6 edges are accepted, and finish with the **total weight**. This graph has two cheap clusters that must later be bridged. The question is worth 10 marks: 2 for sorting, 6 for the six additions, 2 for the spanning-tree statement and the total.

#### ✍️ What to write in the exam

```text
Kruskal's algorithm.
Sorted edges: AC(1), CD(1), BC(2), EF(2), AB(3), BD(4), DE(5), CE(6), DF(7), FG(8), EG(9)
Step 1: add AC(1), joins different components: {A,C}; {B}; {D}; {E}; {F}; {G}.
Step 2: add CD(1), joins different components: {A,C,D}; {B}; {E}; {F}; {G}.
Step 3: add BC(2), joins different components: {A,B,C,D}; {E}; {F}; {G}.
Step 4: add EF(2), joins different components: {A,B,C,D}; {E,F}; {G}.
Reject AB(3): endpoints already in the same component (cycle).
Reject BD(4): endpoints already in the same component (cycle).
Step 5: add DE(5), joins different components: {A,B,C,D,E,F}; {G}.
Reject CE(6): endpoints already in the same component (cycle).
Reject DF(7): endpoints already in the same component (cycle).
Step 6: add FG(8), joins different components: {A,B,C,D,E,F,G}.
Finally all seven vertices are connected using six edges, so this is the MST by Kruskal's algorithm.
MST edges: AC, CD, BC, EF, DE, FG. Total weight = 1 + 1 + 2 + 2 + 5 + 8 = 19.
```
Write the accepted AND rejected edges in order, one reason per line, and always state the total.

#### 🪜 How it is solved, step by step

1. **Sort** all edges by weight, smallest first (keep the printed order among equal weights). Sorted list: AC(1), CD(1), BC(2), EF(2), AB(3), BD(4), DE(5), CE(6), DF(7), FG(8), EG(9). We sort first so nothing cheaper is still waiting when we meet an edge.
2. **Start** with seven single-vertex pieces: {A}; {B}; {C}; {D}; {E}; {F}; {G}.
3. **Go down the list**, testing each edge with the piece rule:
   - **AC(1)**: different pieces, so **add** (edge 1 of 6). Now: {A,C}; {B}; {D}; {E}; {F}; {G}.
   - **CD(1)**: different pieces, so **add** (edge 2 of 6). Now: {A,C,D}; {B}; {E}; {F}; {G}.
   - **BC(2)**: different pieces, so **add** (edge 3 of 6). Now: {A,B,C,D}; {E}; {F}; {G}.
   - **EF(2)**: different pieces, so **add** (edge 4 of 6). Now: {A,B,C,D}; {E,F}; {G}.
   - **AB(3)**: same piece already, a cycle: **reject**.
   - **BD(4)**: same piece already, a cycle: **reject**.
   - **DE(5)**: different pieces, so **add** (edge 5 of 6). Now: {A,B,C,D,E,F}; {G}.
   - **CE(6)**: same piece already, a cycle: **reject**.
   - **DF(7)**: same piece already, a cycle: **reject**.
   - **FG(8)**: different pieces, so **add** (edge 6 of 6). Now: {A,B,C,D,E,F,G}.
4. **Stop** when 6 edges are accepted: all seven vertices are now one piece. The remaining edges (EG(9)) are not examined.
5. **Add the weights** of the accepted edges AC, CD, BC, EF, DE, FG: 1 + 1 + 2 + 2 + 5 + 8 = **19**.
6. **Sanity check:** 6 edges for 7 vertices, one piece, no cycle. Rejected edges: AB, BD, CE, DF. Two cheap clusters grow separately ({A,B,C,D} and {E,F}) and are then joined by the cheapest edge between them. This shows Kruskal grows a forest of pieces, not one single tree.

#### 📘 Concept refresher

- A **spanning tree** touches every vertex and has no cycles. With V = 7 vertices it always has exactly V - 1 = **6 edges**.
- A **minimum** spanning tree is the one with the smallest total weight.
- **Kruskal's rule in one line:** always take the cheapest edge that does not make a cycle.
- How to detect a cycle without drawing: keep track of **components** (pieces that are already connected). At the start every vertex is its own piece. An edge whose two ends lie in **different pieces** is safe: add it and merge the two pieces. An edge whose two ends lie in the **same piece** would close a loop: reject it.
- Ties (equal weights): either order is allowed; the total is the same.

Tiny example: triangle XY(1), YZ(1), XZ(2). Take XY, then YZ; now X, Y, Z are one piece, so XZ is rejected. Total = 2.

#### ⚠️ Common mistakes

- Forgetting to sort first, or sorting wrongly. Re-read the sorted list once against the edge list: it must have 11 edges.
- Accepting an edge just because it is cheap. Always ask: are its two ends already in the same piece?
- Rejecting an edge only because one end is already used. A vertex can have many edges; only an edge whose two ends are already connected is rejected.
- Continuing after 6 edges, or stopping at 5. A tree on 7 vertices has exactly 6 edges.
- Totalling rejected edges too. Add only the 6 accepted weights.

#### ✅ Check yourself

1. How many edges does the MST of this graph have? Answer: 6, because a tree on 7 vertices has V - 1 = 6 edges.
2. If you took tied edges in the opposite order, would the total change? Answer: the chosen edges might differ, but the total stays 19, because ties only choose between equal weights.

### Slot 1 Q5: Kruskal variant 3

#### 🎯 What is being asked

This is a **minimum spanning tree (MST)** question on a graph with 7 vertices A to G and 11 weighted edges: AB(1),BC(3),AC(2),CD(4),BD(2),DE(5),CE(6),EF(7),DF(3),FG(8),EG(9). You must run **Kruskal's algorithm**: write every candidate edge in order, say whether it is **accepted or rejected and why**, stop when 6 edges are accepted, and finish with the **total weight**. Several weights repeat here, so you meet several tie decisions. The question is worth 10 marks: 2 for sorting, 6 for the six additions, 2 for the spanning-tree statement and the total.

#### ✍️ What to write in the exam

```text
Kruskal's algorithm.
Sorted edges: AB(1), AC(2), BD(2), BC(3), DF(3), CD(4), DE(5), CE(6), EF(7), FG(8), EG(9)
Step 1: add AB(1), joins different components: {A,B}; {C}; {D}; {E}; {F}; {G}.
Step 2: add AC(2), joins different components: {A,B,C}; {D}; {E}; {F}; {G}.
Step 3: add BD(2), joins different components: {A,B,C,D}; {E}; {F}; {G}.
Reject BC(3): endpoints already in the same component (cycle).
Step 4: add DF(3), joins different components: {A,B,C,D,F}; {E}; {G}.
Reject CD(4): endpoints already in the same component (cycle).
Step 5: add DE(5), joins different components: {A,B,C,D,E,F}; {G}.
Reject CE(6): endpoints already in the same component (cycle).
Reject EF(7): endpoints already in the same component (cycle).
Step 6: add FG(8), joins different components: {A,B,C,D,E,F,G}.
Finally all seven vertices are connected using six edges, so this is the MST by Kruskal's algorithm.
MST edges: AB, AC, BD, DF, DE, FG. Total weight = 1 + 2 + 2 + 3 + 5 + 8 = 21.
```
Write the accepted AND rejected edges in order, one reason per line, and always state the total.

#### 🪜 How it is solved, step by step

1. **Sort** all edges by weight, smallest first (keep the printed order among equal weights). Sorted list: AB(1), AC(2), BD(2), BC(3), DF(3), CD(4), DE(5), CE(6), EF(7), FG(8), EG(9). We sort first so nothing cheaper is still waiting when we meet an edge.
2. **Start** with seven single-vertex pieces: {A}; {B}; {C}; {D}; {E}; {F}; {G}.
3. **Go down the list**, testing each edge with the piece rule:
   - **AB(1)**: different pieces, so **add** (edge 1 of 6). Now: {A,B}; {C}; {D}; {E}; {F}; {G}.
   - **AC(2)**: different pieces, so **add** (edge 2 of 6). Now: {A,B,C}; {D}; {E}; {F}; {G}.
   - **BD(2)**: different pieces, so **add** (edge 3 of 6). Now: {A,B,C,D}; {E}; {F}; {G}.
   - **BC(3)**: same piece already, a cycle: **reject**.
   - **DF(3)**: different pieces, so **add** (edge 4 of 6). Now: {A,B,C,D,F}; {E}; {G}.
   - **CD(4)**: same piece already, a cycle: **reject**.
   - **DE(5)**: different pieces, so **add** (edge 5 of 6). Now: {A,B,C,D,E,F}; {G}.
   - **CE(6)**: same piece already, a cycle: **reject**.
   - **EF(7)**: same piece already, a cycle: **reject**.
   - **FG(8)**: different pieces, so **add** (edge 6 of 6). Now: {A,B,C,D,E,F,G}.
4. **Stop** when 6 edges are accepted: all seven vertices are now one piece. The remaining edges (EG(9)) are not examined.
5. **Add the weights** of the accepted edges AB, AC, BD, DF, DE, FG: 1 + 2 + 2 + 3 + 5 + 8 = **21**.
6. **Sanity check:** 6 edges for 7 vertices, one piece, no cycle. Rejected edges: BC, CD, CE, EF. Several ties appear (for example two edges of weight 2 and two of weight 3). Any order among equal weights is allowed, provided every edge is still tested in sorted order.

#### 📘 Concept refresher

- A **spanning tree** touches every vertex and has no cycles. With V = 7 vertices it always has exactly V - 1 = **6 edges**.
- A **minimum** spanning tree is the one with the smallest total weight.
- **Kruskal's rule in one line:** always take the cheapest edge that does not make a cycle.
- How to detect a cycle without drawing: keep track of **components** (pieces that are already connected). At the start every vertex is its own piece. An edge whose two ends lie in **different pieces** is safe: add it and merge the two pieces. An edge whose two ends lie in the **same piece** would close a loop: reject it.
- Ties (equal weights): either order is allowed; the total is the same.

Tiny example: triangle XY(1), YZ(1), XZ(2). Take XY, then YZ; now X, Y, Z are one piece, so XZ is rejected. Total = 2.

#### ⚠️ Common mistakes

- Forgetting to sort first, or sorting wrongly. Re-read the sorted list once against the edge list: it must have 11 edges.
- Accepting an edge just because it is cheap. Always ask: are its two ends already in the same piece?
- Rejecting an edge only because one end is already used. A vertex can have many edges; only an edge whose two ends are already connected is rejected.
- Continuing after 6 edges, or stopping at 5. A tree on 7 vertices has exactly 6 edges.
- Totalling rejected edges too. Add only the 6 accepted weights.

#### ✅ Check yourself

1. How many edges does the MST of this graph have? Answer: 6, because a tree on 7 vertices has V - 1 = 6 edges.
2. If you took tied edges in the opposite order, would the total change? Answer: the chosen edges might differ, but the total stays 21, because ties only choose between equal weights.

### Slot 1 Q5: Kruskal variant 4

#### 🎯 What is being asked

This is a **minimum spanning tree (MST)** question on a graph with 7 vertices A to G and 11 weighted edges: AB(2),BC(2),AC(1),CD(3),BD(5),DE(4),CE(6),EF(7),DF(4),FG(9),EG(8). You must run **Kruskal's algorithm**: write every candidate edge in order, say whether it is **accepted or rejected and why**, stop when 6 edges are accepted, and finish with the **total weight**. The last vertex G can be reached by two edges, and you must pick the cheaper one. The question is worth 10 marks: 2 for sorting, 6 for the six additions, 2 for the spanning-tree statement and the total.

#### ✍️ What to write in the exam

```text
Kruskal's algorithm.
Sorted edges: AC(1), AB(2), BC(2), CD(3), DE(4), DF(4), BD(5), CE(6), EF(7), EG(8), FG(9)
Step 1: add AC(1), joins different components: {A,C}; {B}; {D}; {E}; {F}; {G}.
Step 2: add AB(2), joins different components: {A,B,C}; {D}; {E}; {F}; {G}.
Reject BC(2): endpoints already in the same component (cycle).
Step 3: add CD(3), joins different components: {A,B,C,D}; {E}; {F}; {G}.
Step 4: add DE(4), joins different components: {A,B,C,D,E}; {F}; {G}.
Step 5: add DF(4), joins different components: {A,B,C,D,E,F}; {G}.
Reject BD(5): endpoints already in the same component (cycle).
Reject CE(6): endpoints already in the same component (cycle).
Reject EF(7): endpoints already in the same component (cycle).
Step 6: add EG(8), joins different components: {A,B,C,D,E,F,G}.
Finally all seven vertices are connected using six edges, so this is the MST by Kruskal's algorithm.
MST edges: AC, AB, CD, DE, DF, EG. Total weight = 1 + 2 + 3 + 4 + 4 + 8 = 22.
```
Write the accepted AND rejected edges in order, one reason per line, and always state the total.

#### 🪜 How it is solved, step by step

1. **Sort** all edges by weight, smallest first (keep the printed order among equal weights). Sorted list: AC(1), AB(2), BC(2), CD(3), DE(4), DF(4), BD(5), CE(6), EF(7), EG(8), FG(9). We sort first so nothing cheaper is still waiting when we meet an edge.
2. **Start** with seven single-vertex pieces: {A}; {B}; {C}; {D}; {E}; {F}; {G}.
3. **Go down the list**, testing each edge with the piece rule:
   - **AC(1)**: different pieces, so **add** (edge 1 of 6). Now: {A,C}; {B}; {D}; {E}; {F}; {G}.
   - **AB(2)**: different pieces, so **add** (edge 2 of 6). Now: {A,B,C}; {D}; {E}; {F}; {G}.
   - **BC(2)**: same piece already, a cycle: **reject**.
   - **CD(3)**: different pieces, so **add** (edge 3 of 6). Now: {A,B,C,D}; {E}; {F}; {G}.
   - **DE(4)**: different pieces, so **add** (edge 4 of 6). Now: {A,B,C,D,E}; {F}; {G}.
   - **DF(4)**: different pieces, so **add** (edge 5 of 6). Now: {A,B,C,D,E,F}; {G}.
   - **BD(5)**: same piece already, a cycle: **reject**.
   - **CE(6)**: same piece already, a cycle: **reject**.
   - **EF(7)**: same piece already, a cycle: **reject**.
   - **EG(8)**: different pieces, so **add** (edge 6 of 6). Now: {A,B,C,D,E,F,G}.
4. **Stop** when 6 edges are accepted: all seven vertices are now one piece. The remaining edges (FG(9)) are not examined.
5. **Add the weights** of the accepted edges AC, AB, CD, DE, DF, EG: 1 + 2 + 3 + 4 + 4 + 8 = **22**.
6. **Sanity check:** 6 edges for 7 vertices, one piece, no cycle. Rejected edges: BC, BD, CE, EF. At the end the choice for reaching G is between EG(8) and FG(9). Kruskal takes the cheaper one that joins different pieces. Always check the last vertex's cheapest edge.

#### 📘 Concept refresher

- A **spanning tree** touches every vertex and has no cycles. With V = 7 vertices it always has exactly V - 1 = **6 edges**.
- A **minimum** spanning tree is the one with the smallest total weight.
- **Kruskal's rule in one line:** always take the cheapest edge that does not make a cycle.
- How to detect a cycle without drawing: keep track of **components** (pieces that are already connected). At the start every vertex is its own piece. An edge whose two ends lie in **different pieces** is safe: add it and merge the two pieces. An edge whose two ends lie in the **same piece** would close a loop: reject it.
- Ties (equal weights): either order is allowed; the total is the same.

Tiny example: triangle XY(1), YZ(1), XZ(2). Take XY, then YZ; now X, Y, Z are one piece, so XZ is rejected. Total = 2.

#### ⚠️ Common mistakes

- Forgetting to sort first, or sorting wrongly. Re-read the sorted list once against the edge list: it must have 11 edges.
- Accepting an edge just because it is cheap. Always ask: are its two ends already in the same piece?
- Rejecting an edge only because one end is already used. A vertex can have many edges; only an edge whose two ends are already connected is rejected.
- Continuing after 6 edges, or stopping at 5. A tree on 7 vertices has exactly 6 edges.
- Totalling rejected edges too. Add only the 6 accepted weights.

#### ✅ Check yourself

1. How many edges does the MST of this graph have? Answer: 6, because a tree on 7 vertices has V - 1 = 6 edges.
2. If you took tied edges in the opposite order, would the total change? Answer: the chosen edges might differ, but the total stays 22, because ties only choose between equal weights.

## DM Mock 4: Slot 1 pattern

### Slot 1 Q1a: implication variant 5

#### 🎯 What is being asked

Truth table with 4 variables (16 rows) with columns p -> r, q -> s and the full formula ((p -> r) ^ (q -> s)) -> ((p v q) -> (r v s)). Then classify the final column.

#### ✍️ What to write in the exam

```text
Columns: p -> r ; q -> s ; ((p -> r) ^ (q -> s)) -> ((p v q) -> (r v s))
pqrs | p -> r | q -> s | ((p -> r) ^ (q -> s)) -> ((p v q) -> (r v s))
TTTT | T | T | T
TTTF | T | F | T
TTFT | F | T | T
TTFF | F | F | T
TFTT | T | T | T
TFTF | T | T | T
TFFT | F | T | T
TFFF | F | T | T
FTTT | T | T | T
FTTF | T | F | T
FTFT | T | T | T
FTFF | T | F | T
FFTT | T | T | T
FFTF | T | T | T
FFFT | T | T | T
FFFF | T | T | T
The final column is T in all 16 rows, so the formula is a tautology.
```

#### 🪜 How it is solved, step by step

1. Write 16 rows with p slowest.
2. p -> r is F when p=T and r=F: rows 3, 4, 7, 8.
3. q -> s is F when q=T and s=F: rows 2, 4, 10, 12.
4. The left side (AND of the two columns) is F in rows 2, 3, 4, 7, 8, 10, 12, so the whole formula is T there (F -> anything is T). It is T in the other nine rows.
5. In a row with left side T, the right side (p v q) -> (r v s) could be F only if p v q is T and r v s is F, which needs r=F and s=F. But then p -> r being T forces p=F, and q -> s being T forces q=F, so p v q is F. Contradiction, so the right side is T.
6. Therefore the final column is all T: tautology.

```text
pqrs | p -> r | q -> s | ((p -> r) ^ (q -> s)) -> ((p v q) -> (r v s))
TTTT | T | T | T
TTTF | T | F | T
TTFT | F | T | T
TTFF | F | F | T
TFTT | T | T | T
TFTF | T | T | T
TFFT | F | T | T
TFFF | F | T | T
FTTT | T | T | T
FTTF | T | F | T
FTFT | T | T | T
FTFF | T | F | T
FFTT | T | T | T
FFTF | T | T | T
FFFT | T | T | T
FFFF | T | T | T
```

#### 📘 Concept refresher

Implication is false only for T -> F. A v B (OR) is T when at least one side is T. A ^ B (AND) is T when both are T. The formula says: "if p gives r and q gives s, then (p or q) gives (r or s)". This is the "constructive dilemma" rule, so it should always hold.

#### ⚠️ Common mistakes

- Using p -> q and r -> s (from a different question) instead of p -> r and q -> s: read the column list carefully.
- Treating v (OR) as AND.
- Forgetting that a false left side makes the whole implication T.
- Not writing the classification.

#### ✅ Check yourself

1. Which rows make q -> s false? Answer: rows 2, 4, 10, 12.
2. Can the right side be F while the left side is T? Answer: no, as shown in step 5.

### Slot 1 Q1b: divisibility variant 6

#### 🎯 What is being asked

Prove by induction that 15 divides 4^(2*n) - 1 for all integers n >= 0.

#### ✍️ What to write in the exam

```text
Let P(n) be the statement: 15 divides 4^(2*n)-1, for every integer n>=0.
Basis: at n=0, 4^(2*0)-1=0=15*0. Thus P(0) holds.
Inductive hypothesis: let k>=0 be arbitrary and assume P(k). Then 4^(2*k)-1=15*m for some integer m.
Inductive step: we prove P(k+1).
4^(2*(k+1))-1
= 16*(4^(2*k)-1)+15
= 15*(16*m+1)
Let t = 16*m+1. Since k and m are integers, t is an integer.
Hence the expression in P(k+1) equals 15*t, so 15 divides it and P(k+1) holds.
Conclusion: the basis and the inductive step are proved, so by the principle of
mathematical induction P(n) holds for every integer n>=0.
```

#### 🪜 How it is solved, step by step

1. P(n): 15 divides 4^(2n) - 1, n >= 0.
2. Basis n=0: 4^0 - 1 = 0 = 15*0.
3. Hypothesis: 4^(2k) - 1 = 15m.
4. For k+1: 4^(2(k+1)) - 1 = 4^(2k+2) - 1 = 16*4^(2k) - 1.
5. 16*4^(2k) - 1 = 16*(4^(2k) - 1) + 16 - 1 = 16*(4^(2k) - 1) + 15.
6. Substitute: 16*15m + 15 = 15*(16m + 1).
7. t = 16m + 1 is an integer.

#### 📘 Concept refresher

Note 4^(2n) = 16^n, so each step multiplies by 16, and 16 - 1 = 15. So the same trick as for 6^n - 1 works: a^(k+1) - 1 = a*(a^k - 1) + (a - 1), with a = 16.

#### ⚠️ Common mistakes

- Using 4 as the multiplier instead of 16 (the exponent goes up by 2).
- Forgetting the +15.
- Not naming the integer t.
- Missing the conclusion.

#### ✅ Check yourself

1. Why 16? Answer: 4^(2k+2) = 4^2 * 4^(2k) = 16*4^(2k).
2. Check n=1: 16 - 1 = 15 = 15*1. Correct.

### Slot 1 Q2a: set operations

#### 🎯 What is being asked

Two finite sets are given: A={1,4} and B={4,7}. Compute the union, the intersection, the difference A-B and the Cartesian product A x B, and then comment on commutativity. The marks are split: 1 mark for the first three operations, 1 mark for the ordered product and the commutativity remark.

#### ✍️ What to write in the exam

```text
A union B = {1,4,7}
A intersection B = {4}
A - B = {1}
A x B = {(1,4),(1,7),(4,4),(4,7)}   (|A x B| = 2*2 = 4 ordered pairs)

Commutative: union (A union B = B union A) and intersection (A intersection B = B intersection A), because membership in 'A or B' / 'A and B' does not depend on the order of the sets.
Not commutative: difference, since A - B = {1} but B - A = {7}; and Cartesian product, since (1,4) is in A x B but not in B x A (1 is not in B).
```
Curly brackets for sets, round brackets for pairs, and state the pair count.

#### 🪜 How it is solved, step by step

**Step 1.** **Split everything into three regions** (think of a two-circle Venn diagram). Only A (in A, not in B): {1}. In both: {4}. Only B (in B, not in A): {7}.

**Step 2.** **Read the answers off the regions.** Union = all three regions together = {1,4,7}. Intersection = the middle region = {4}. A-B = the 'only A' region = {1} (the middle region is thrown away, because those elements are also in B).

**Step 3.** **Cartesian product by first coordinate.** Take each element of A in turn and pair it with every element of B. With 1: (1,4),(1,7). With 4: (4,4),(4,7). Joining these gives A x B={(1,4),(1,7),(4,4),(4,7)}. Count check: |A|*|B| = 2*2 = 4, and we wrote 4 pairs.

**Step 4.** **Size check on the union.** |A union B| = |A| + |B| - |A intersection B| = 2 + 2 - 1 = 3, and {1,4,7} really has 3 elements. (We subtract the intersection because the shared elements were counted twice.)

**Step 5.** **Test commutativity by actually swapping.** B union A={1,4,7}, the same as A union B, because 'in A or in B' does not care about order. B intersection A={4}, the same, because 'in both' is symmetric. But B-A={7}, while A-B={1}, so difference is **not** commutative. For the product, B x A={(4,1),(4,4),(7,1),(7,4)}. Compare with A x B: the pair (1,4) is in A x B, but it is not in B x A because 1 is not in B. So A x B is not equal to B x A.

#### 📘 Concept refresher

Think of a set as a bag of distinct things; order and repeats do not matter, so {1,2,2} is just {1,2}.

- **Union** A union B: everything that is in A, or in B, or in both. Write each element once.
- **Intersection** A intersection B: only what is in **both** A and B.
- **Difference** A-B: what is in A but **not** in B. Order matters: A-B and B-A are different questions.
- **Cartesian product** A x B: all **ordered pairs** (x,y) with x from A and y from B. The first coordinate always comes from the first set. So (1,2) and (2,1) are different pairs, and |A x B| = |A| * |B|.
- **Commutative** operation: swapping the two sets gives the same result.

Tiny example with P={5,6}, Q={6,7}: P union Q={5,6,7}, P intersection Q={6}, P-Q={5}.

#### ⚠️ Common mistakes

- Writing the pairs of A x B as sets, {1,4}, instead of ordered pairs (1,4). Order matters in a pair.
- Missing pairs in A x B. Use a grid or 'one first coordinate at a time' so you get all 4.
- Doing B-A when the question says A-B. Check which set comes first.
- Claiming difference or Cartesian product is commutative. Only union and intersection are.
- Listing a shared element twice in the union (a set never repeats elements).

#### ✅ Check yourself

1. How many elements does A union B have, using the formula? **Answer:** 2+2-1 = 3.
2. If A and B were the **same** set, would A x B equal B x A? **Answer:** Yes. Then both are A x A. Commutativity of the product fails only when the two sets differ (and neither is empty).

### Slot 1 Q2b: divisors of 24

#### 🎯 What is being asked

Topic: **posets**, the 8-mark part of mock 4. A={1,2,3,4,6,8,12,24} is the set of all divisors of 24 under divisibility. The marking guide is roughly 2 marks for levels and covers, 2 for the four extrema, 2 for the three named bounds, and 2 for the lattice verdict with its reason. Aim to spend about 12 minutes on it.

#### ✍️ What to write in the exam

```text
Elements: A={1,2,3,4,6,8,12,24}, ordered by divisibility (a <= b iff a divides b).
Levels (bottom to top): {1}; {2,3}; {4,6}; {8,12}; {24}.
Covers: (1,2),(1,3),(2,4),(2,6),(3,6),(4,8),(4,12),(6,12),(8,24),(12,24).
Minimal={1}; maximal={24}; least=1; greatest=24.
{4,6}: lower bounds {1,2}, GLB=2; upper bounds {12,24}, LUB=12.
{8,12}: lower bounds {1,2,4}, GLB=4; upper bounds {24}, LUB=24.
{3,8}: lower bounds {1}, GLB=1; upper bounds {24}, LUB=24.
Lattice: yes. A is all divisors of 24, so for any pair gcd and lcm divide 24, hence lie in A, and are the GLB and LUB.
```
List the bounds before naming LUB/GLB; the marks are for the bound lists as well as the final answers.

#### 🪜 How it is solved, step by step

**Step 1.** **Levels (bottom to top).** 24=2^3*3, so every element is 2^a*3^b with a in {0,1,2,3}, b in {0,1}: a 4-by-2 ladder. The level is a+b, and a cover multiplies by one prime. This is the standard textbook example: if you can do it fast, you can do every divisor poset. Result: level 0 = {1}; level 1 = {2,3}; level 2 = {4,6}; level 3 = {8,12}; level 4 = {24}.

**Step 2.** **Cover edges (upward).** For each element, list what sits **directly** above it: 1 -> 2,3; 2 -> 4,6; 3 -> 6; 4 -> 8,12; 6 -> 12; 8 -> 24; 12 -> 24. That is 10 edges (typed in full below). No (1,4) edge appears, because an element lies between them.

**Step 3.** **Extrema.** Nothing is below 1, and 1 is below everything, so minimal={1} and least=1. Nothing is above 24, and everything is below it, so maximal={24} and greatest=24.

**Step 4.** **Bounds for the named pairs.** Write the common divisors and common multiples (or common subsets/supersets) **inside A**, then take the GLB = largest lower bound and LUB = smallest upper bound.

- **{4,6}**: lower bounds {1,2}, GLB=2; upper bounds {12,24}, LUB=12 (gcd=2, lcm=12).
- **{8,12}**: lower bounds {1,2,4}, GLB=4; upper bounds {24}, LUB=24 (gcd=4, lcm=24).
- **{3,8}**: lower bounds {1}, GLB=1; upper bounds {24}, LUB=24 (gcd=1, lcm=24).

**Step 5.** **Lattice.** A is all divisors of 24, so for any a,b both gcd(a,b) and lcm(a,b) divide 24 and lie in A; they are the GLB and LUB. Hence every pair has a unique LUB and GLB and A is a lattice.

#### 📘 Concept refresher

**Reading 'a <= b'.** Here it means 'a divides b'. Two numbers are comparable only if one divides the other. In the Hasse diagram an edge (a,b) is drawn only for a **cover**: a < b and no c in the set with a < c < b. Everything else is recovered by walking upward, so shortcuts are omitted.

**Four extrema.** Minimal/maximal are 'nothing strictly below/above' (there can be several); least/greatest are 'below/above everything' (at most one, maybe none).

**LUB and GLB.** List the upper bounds of the pair; the LUB is the one that divides all the others. List the lower bounds; the GLB is the one that all the others divide. If two best candidates are incomparable, the LUB/GLB does not exist. A poset is a **lattice** when every pair has both.

Tiny example on {1,2,3,4,12}: covers (1,2),(1,3),(2,4),(3,12),(4,12); the pair {2,3} has only the common multiple 12, so LUB=12 (even though 2*3=6 is absent).

#### ⚠️ Common mistakes

- Typing every comparable pair as an edge. Only covers count: (1,4) is comparable (1 divides 4) but it is a shortcut, so leave it out.
- Writing only the final LUB/GLB values with no lists of bounds: the marks are for the working.
- Mixing up minimal with least, or maximal with greatest. Least/greatest must be comparable to every element.
- Forgetting the lattice reason: 'yes' alone earns little. State that gcd and lcm stay in A.

#### ✅ Check yourself

1. How many cover edges are in this diagram? **Answer:** 10 edges: 1->2,3; 2->4,6; 3->6; 4->8,12; 6->12; 8->24; 12->24.
2. Is 8 below 12? **Answer:** No: 8 does not divide 12. They are incomparable, LUB=24 and GLB=4.

### Slot 1 Q3: two-colour triangle under rotations

#### 🎯 What is being asked

**Equivalence relation from symmetry** (Q3, 10 marks). Colour the 3 labelled vertices of a triangle with X or Y: 2 x 2 x 2 = 8 colourings. Two colourings are equivalent if one is a **rotation** of the other. Prove this is an equivalence relation, list the complete partition, and count the classes. Final answer: **4 classes**.

#### ✍️ What to write in the exam

Let A = {XXX,XXY,XYX,XYY,YXX,YXY,YYX,YYY} (colourings read clockwise); x ~ y iff y is a rotation of x by 0, 120 or 240 degrees.
Reflexive: the 0-degree rotation maps x to x. Symmetric: if a rotation maps x to y, the inverse rotation maps y to x. Transitive: two rotations compose to a rotation. So ~ is an equivalence relation.
Classes: [XXX]={XXX}; [XXY]={XXY,XYX,YXX}; [XYY]={XYY,YXY,YYX}; [YYY]={YYY}.
They are disjoint and 1+3+3+1 = 8 = |A|, so they form a partition. Number of classes = 4.

#### 🪜 How it is solved, step by step

1. **List the universe.** A = {XXX, XXY, XYX, XYY, YXX, YXY, YYX, YYY}.
2. **Equivalence proof.** Rotation by 0 degrees gives x ~ x. If a rotation takes x to y, the reverse rotation takes y to x. Two rotations in sequence make another rotation (0, 120 or 240 degrees), so transitive.
3. **Build the classes by rotating.**
   - XXX rotates to itself: {XXX}.
   - XXY -> XYX -> YXX: {XXY, XYX, YXX} (one Y among X's, the Y just moves round).
   - XYY -> YYX -> YXY: {XYY, YYX, YXY} (one X among Y's).
   - YYY: {YYY}.
4. **Check.** 1 + 3 + 3 + 1 = 8, the size of A, and no word is repeated. So there are 4 classes.
   Shortcut: the number of Y's cannot change under rotation, and with 3 vertices each count 0, 1, 2, 3 gives exactly one class, so 4 classes.

#### 📘 Concept refresher

- An **equivalence relation** is reflexive (x ~ x), symmetric (x ~ y gives y ~ x) and transitive (x ~ y, y ~ z give x ~ z).
- An **equivalence class** [x] is everything related to x. Different classes never overlap, and all classes together make the whole set: a **partition**.
- Write each colouring as a 3-letter word read clockwise, like XXY. Rotating by 120 degrees moves each letter one place: XXY -> XYX -> YXX -> XXY. So each class has at most 3 words.
- A word with all letters equal (XXX) does not change when rotated, so its class has just 1 word.

#### ⚠️ Common mistakes

- Treating XXY and XYY as related. Rotation never changes how many X's the word has.
- Forgetting that XXX and YYY are singletons and dividing 8 by 3.
- Listing the same class more than once (XXY, XYX and YXX are one class, not three).
- Skipping the proof or only saying "obviously an equivalence relation".

#### ✅ Check yourself

1. Which class holds YXY? Answer: {XYY, YXY, YYX}.
2. Would reflections change the number of classes here? Answer: no. Every non-constant word is already reachable by rotation from its reflection, so there would still be 4 classes.

### Slot 1 Q4: non-homogeneous variant 5

#### 🎯 What is being asked

Solve the **third-order non-homogeneous recurrence** a_n = 5*a_(n-1) - 8*a_(n-2) + 4*a_(n-3) + n^3 for n >= 3 with a_0 = 1, a_1 = 0, a_2 = 2. Give the characteristic equation and roots, the particular solution coefficients, and the closed form. Final answer: a_n = 297 - 296*2^n + 49*n*2^n + (1/4)n^4 + (9/2)n^3 + (145/4)n^2 + 156n.

#### ✍️ What to write in the exam

Characteristic equation: r^3 - 5r^2 + 8r - 4 = (r-1)(r-2)^2 = 0; roots 1, 2, 2.
Homogeneous solution: C1 + C2*2^n + C3*n*2^n.
Forcing n^3 has base 1, a simple root, so try p_n = A*n^4 + B*n^3 + C*n^2 + D*n. Substituting and equating coefficients: 4A = 1, -54A + 3B = 0, 196A - 27B + 2C = 0, -201A + 49B - 9C + D = 0, giving A = 1/4, B = 9/2, C = 145/4, D = 156.
General solution: a_n = C1 + C2*2^n + C3*n*2^n + p_n. Using a_0 = 1, a_1 = 0, a_2 = 2: C1 + C2 = 1, C1 + 2C2 + 2C3 = -197, C1 + 4C2 + 8C3 = -495, so C1 = 297, C2 = -296, C3 = 49.
Therefore a_n = 297 - 296*2^n + 49*n*2^n + (1/4)n^4 + (9/2)n^3 + (145/4)n^2 + 156n, n >= 0. Check: a_3 = 41 from both the recurrence and the formula.

#### 🪜 How it is solved, step by step

1. **Characteristic equation.** r^3 - 5r^2 + 8r - 4 = 0. Try r = 1: 1 - 5 + 8 - 4 = 0, so (r - 1) is a factor. Divide: (r - 1)(r^2 - 4r + 4) = (r - 1)(r - 2)^2. Roots 1, 2, 2.
2. **Homogeneous solution.** C1 + C2*2^n + C3*n*2^n.
3. **Guess.** Base 1 is a single root, so multiply by n: p_n = A*n^4 + B*n^3 + C*n^2 + D*n. (No constant term: it would repeat C1.)
4. **Substitute** into p_n - 5p_(n-1) + 8p_(n-2) - 4p_(n-3) = n^3. Expanding the shifted powers and collecting gives the operator values: n^4 -> 4n^3 - 54n^2 + 196n - 201 (the n^4 terms cancel because 1 - 5 + 8 - 4 = 0); n^3 -> 3n^2 - 27n + 49; n^2 -> 2n - 9; n -> 1. Equate coefficients of n^3, n^2, n, 1:
   4A = 1; -54A + 3B = 0; 196A - 27B + 2C = 0; -201A + 49B - 9C + D = 0.
   So A = 1/4, B = 9/2, C = 145/4, D = 156. (For example B: 3B = 54/4 so B = 9/2.)
5. **Initial conditions on the total.** p_0 = 0, p_1 = 1/4 + 9/2 + 145/4 + 156 = 197, p_2 = 4 + 36 + 145 + 312 = 497. Then:
   n = 0: C1 + C2 = 1.
   n = 1: C1 + 2C2 + 2C3 = -197.
   n = 2: C1 + 4C2 + 8C3 = -495.
   Subtract eq 1 from eq 2: C2 + 2C3 = -198. Subtract eq 1 from eq 3: 3C2 + 8C3 = -496. Then 3*(first) - second: -2C3 = -98, so C3 = 49. Hence C2 = -296, C1 = 297.
6. **Check.** From the recurrence a_3 = 5*2 - 8*0 + 4*1 + 27 = 41. The formula at n = 3: 297 - 2368 + 49*24 + 81/4 + 243/2 + 1305/4 + 468 = 297 - 2368 + 1176 + 20.25 + 121.5 + 326.25 + 468 = 41.

#### 📘 Concept refresher

- Answer = **homogeneous solution + particular solution**; apply the initial values to the **total**.
- Characteristic equation: from a_n = c1*a_(n-1) + c2*a_(n-2) + c3*a_(n-3), get r^3 = c1*r^2 + c2*r + c3. A repeated root r gives r^n and n*r^n. A root 1 gives a plain constant.
- **Polynomial forcing has base 1.** If 1 is also a characteristic root (once), the usual polynomial guess is multiplied by n. The forcing n^3 would normally use A*n^3 + B*n^2 + C*n + D, so with the extra n the guess is n*(A*n^3 + B*n^2 + C*n + D) = A*n^4 + B*n^3 + C*n^2 + D*n.

#### ⚠️ Common mistakes

- Forgetting to multiply the guess by n although 1 is a root; the n^4-equation then makes no sense (0 = 1).
- Keeping a constant term E in the guess: it duplicates C1.
- Mis-factoring: (r-1)(r-2)^2 gives roots 1, 2, 2 (not 1, 2, 4).
- Using the homogeneous part with the initial values and ignoring p_0, p_1, p_2.

#### ✅ Check yourself

1. What is a_4 from the recurrence? Answer: 5*41 - 8*2 + 4*0 + 64 = 253.
2. If the forcing were 2^n instead of n^3, what guess? Answer: 2 is a double root, so A*n^2*2^n.

### Slot 1 Q5: Kruskal variant 5

#### 🎯 What is being asked

This is a **minimum spanning tree (MST)** question on a graph with 7 vertices A to G and 11 weighted edges: AB(3),BC(1),AC(2),CD(2),BD(4),DE(6),CE(5),EF(7),DF(5),FG(8),EG(9). You must run **Kruskal's algorithm**: write every candidate edge in order, say whether it is **accepted or rejected and why**, stop when 6 edges are accepted, and finish with the **total weight**. Here two tied weight-5 edges are both accepted. The question is worth 10 marks: 2 for sorting, 6 for the six additions, 2 for the spanning-tree statement and the total.

#### ✍️ What to write in the exam

```text
Kruskal's algorithm.
Sorted edges: BC(1), AC(2), CD(2), AB(3), BD(4), CE(5), DF(5), DE(6), EF(7), FG(8), EG(9)
Step 1: add BC(1), joins different components: {A}; {B,C}; {D}; {E}; {F}; {G}.
Step 2: add AC(2), joins different components: {A,B,C}; {D}; {E}; {F}; {G}.
Step 3: add CD(2), joins different components: {A,B,C,D}; {E}; {F}; {G}.
Reject AB(3): endpoints already in the same component (cycle).
Reject BD(4): endpoints already in the same component (cycle).
Step 4: add CE(5), joins different components: {A,B,C,D,E}; {F}; {G}.
Step 5: add DF(5), joins different components: {A,B,C,D,E,F}; {G}.
Reject DE(6): endpoints already in the same component (cycle).
Reject EF(7): endpoints already in the same component (cycle).
Step 6: add FG(8), joins different components: {A,B,C,D,E,F,G}.
Finally all seven vertices are connected using six edges, so this is the MST by Kruskal's algorithm.
MST edges: BC, AC, CD, CE, DF, FG. Total weight = 1 + 2 + 2 + 5 + 5 + 8 = 23.
```
Write the accepted AND rejected edges in order, one reason per line, and always state the total.

#### 🪜 How it is solved, step by step

1. **Sort** all edges by weight, smallest first (keep the printed order among equal weights). Sorted list: BC(1), AC(2), CD(2), AB(3), BD(4), CE(5), DF(5), DE(6), EF(7), FG(8), EG(9). We sort first so nothing cheaper is still waiting when we meet an edge.
2. **Start** with seven single-vertex pieces: {A}; {B}; {C}; {D}; {E}; {F}; {G}.
3. **Go down the list**, testing each edge with the piece rule:
   - **BC(1)**: different pieces, so **add** (edge 1 of 6). Now: {A}; {B,C}; {D}; {E}; {F}; {G}.
   - **AC(2)**: different pieces, so **add** (edge 2 of 6). Now: {A,B,C}; {D}; {E}; {F}; {G}.
   - **CD(2)**: different pieces, so **add** (edge 3 of 6). Now: {A,B,C,D}; {E}; {F}; {G}.
   - **AB(3)**: same piece already, a cycle: **reject**.
   - **BD(4)**: same piece already, a cycle: **reject**.
   - **CE(5)**: different pieces, so **add** (edge 4 of 6). Now: {A,B,C,D,E}; {F}; {G}.
   - **DF(5)**: different pieces, so **add** (edge 5 of 6). Now: {A,B,C,D,E,F}; {G}.
   - **DE(6)**: same piece already, a cycle: **reject**.
   - **EF(7)**: same piece already, a cycle: **reject**.
   - **FG(8)**: different pieces, so **add** (edge 6 of 6). Now: {A,B,C,D,E,F,G}.
4. **Stop** when 6 edges are accepted: all seven vertices are now one piece. The remaining edges (EG(9)) are not examined.
5. **Add the weights** of the accepted edges BC, AC, CD, CE, DF, FG: 1 + 2 + 2 + 5 + 5 + 8 = **23**.
6. **Sanity check:** 6 edges for 7 vertices, one piece, no cycle. Rejected edges: AB, BD, DE, EF. Ties do not always cause a rejection: CE(5) and DF(5) have the same weight and are both accepted, because each joins different pieces at the moment it is examined.

#### 📘 Concept refresher

- A **spanning tree** touches every vertex and has no cycles. With V = 7 vertices it always has exactly V - 1 = **6 edges**.
- A **minimum** spanning tree is the one with the smallest total weight.
- **Kruskal's rule in one line:** always take the cheapest edge that does not make a cycle.
- How to detect a cycle without drawing: keep track of **components** (pieces that are already connected). At the start every vertex is its own piece. An edge whose two ends lie in **different pieces** is safe: add it and merge the two pieces. An edge whose two ends lie in the **same piece** would close a loop: reject it.
- Ties (equal weights): either order is allowed; the total is the same.

Tiny example: triangle XY(1), YZ(1), XZ(2). Take XY, then YZ; now X, Y, Z are one piece, so XZ is rejected. Total = 2.

#### ⚠️ Common mistakes

- Forgetting to sort first, or sorting wrongly. Re-read the sorted list once against the edge list: it must have 11 edges.
- Accepting an edge just because it is cheap. Always ask: are its two ends already in the same piece?
- Rejecting an edge only because one end is already used. A vertex can have many edges; only an edge whose two ends are already connected is rejected.
- Continuing after 6 edges, or stopping at 5. A tree on 7 vertices has exactly 6 edges.
- Totalling rejected edges too. Add only the 6 accepted weights.

#### ✅ Check yourself

1. How many edges does the MST of this graph have? Answer: 6, because a tree on 7 vertices has V - 1 = 6 edges.
2. If you took tied edges in the opposite order, would the total change? Answer: the chosen edges might differ, but the total stays 23, because ties only choose between equal weights.

## DM Mock 5: Slot 1 pattern

### Slot 1 Q1a: implication variant 6

#### 🎯 What is being asked

Truth table with 3 variables (8 rows) for ((p -> q) ^ (~q -> r)) -> (p -> (q v r)), with working columns p -> q, ~q -> r and the whole formula. Classify the final column.

#### ✍️ What to write in the exam

```text
Columns: p -> q ; ~q -> r ; ((p -> q) ^ (~q -> r)) -> (p -> (q v r))
pqr | p -> q | ~q -> r | ((p -> q) ^ (~q -> r)) -> (p -> (q v r))
TTT | T | T | T
TTF | T | T | T
TFT | F | T | T
TFF | F | F | T
FTT | T | T | T
FTF | T | T | T
FFT | T | T | T
FFF | T | F | T
The final column is T in all rows, so the formula is a tautology.
```

#### 🪜 How it is solved, step by step

1. Write the 8 rows TTT ... FFF.
2. p -> q is F when p=T, q=F: rows 3 and 4.
3. ~q -> r: ~q is T in rows where q=F (3, 4, 7, 8). The implication is F when ~q=T and r=F: rows 4 and 8.
4. Left side (AND of steps 2 and 3): F in rows 3, 4, 8; T in rows 1, 2, 5, 6, 7.
5. Right side p -> (q v r): q v r is F only in rows 4 and 8 (q=F, r=F). Then p -> F is F only if p=T: row 4. So the right side is F only in row 4, but row 4 has left side F, so the whole formula is T there.
6. All rows are T: tautology.

```text
pqr | p -> q | ~q -> r | ((p -> q) ^ (~q -> r)) -> (p -> (q v r))
TTT | T | T | T
TTF | T | T | T
TFT | F | T | T
TFF | F | F | T
FTT | T | T | T
FTF | T | T | T
FFT | T | T | T
FFF | T | F | T
```

#### 📘 Concept refresher

~q means NOT q: it flips T and F. The implication ~q -> r is F only when ~q is T (so q is F) and r is F. A v B is T if either one is T. If the last column is all T it is a tautology.

#### ⚠️ Common mistakes

- Forgetting to flip q when evaluating ~q -> r.
- Writing the column for q -> r instead of ~q -> r.
- Evaluating q v r wrongly in rows where only one of them is T.
- Not mentioning the classification.

#### ✅ Check yourself

1. Which rows make ~q -> r false? Answer: rows 4 (TFF) and 8 (FFF).
2. Why is row 4 still T in the final column? Answer: its left side is F (p -> q is F), so the implication is T.

### Slot 1 Q1b: divisibility variant 7

#### 🎯 What is being asked

Prove by induction that 13 divides 3^(n+2) + 4^(2*n+1) for all integers n >= 0.

#### ✍️ What to write in the exam

```text
Let P(n) be the statement: 13 divides 3^(n+2)+4^(2*n+1), for every integer n>=0.
Basis: at n=0, 3^(0+2)+4^(2*0+1)=9+4=13=13*1. Thus P(0) holds.
Inductive hypothesis: let k>=0 be arbitrary and assume P(k). Then 3^(k+2)+4^(2*k+1)=13*m for some integer m.
Inductive step: we prove P(k+1).
3^(k+3)+4^(2*k+3)
= 3*(3^(k+2)+4^(2*k+1))+13*4^(2*k+1)   [since 16=3+13]
= 13*(3*m+4^(2*k+1))
Let t = 3*m+4^(2*k+1). Since k and m are integers, t is an integer.
Hence the expression in P(k+1) equals 13*t, so 13 divides it and P(k+1) holds.
Conclusion: the basis and the inductive step are proved, so by the principle of
mathematical induction P(n) holds for every integer n>=0.
```

#### 🪜 How it is solved, step by step

1. P(n): 13 divides 3^(n+2) + 4^(2n+1), n >= 0.
2. Basis n=0: 3^2 + 4^1 = 9 + 4 = 13 = 13*1.
3. Hypothesis: 3^(k+2) + 4^(2k+1) = 13m.
4. For k+1: 3^(k+3) + 4^(2k+3). Here 3^(k+3) = 3*3^(k+2) and 4^(2k+3) = 16*4^(2k+1).
5. Use multiplier 3 on both terms: split 16 = 3 + 13, so 16*4^(2k+1) = 3*4^(2k+1) + 13*4^(2k+1).
6. The sum equals 3*(3^(k+2) + 4^(2k+1)) + 13*4^(2k+1).
7. Substitute: 3*13m + 13*4^(2k+1) = 13*(3m + 4^(2k+1)). t = 3m + 4^(2k+1) is an integer.

#### 📘 Concept refresher

Two powers grow at different rates: the first by 3 per step, the second by 16 per step (4^(2n+1) gains a factor 4^2). Choose one multiplier for the bracket and fix the other term with a multiple of 13. The key fact is 16 = 3 + 13.

#### ⚠️ Common mistakes

- Forgetting that 4^(2k+3) = 16*4^(2k+1).
- Not splitting 16 so the bracket factors out.
- Dropping the 13*4^(2k+1) leftover term.
- No conclusion sentence.

#### ✅ Check yourself

1. Why split 16 = 3 + 13? Answer: we need the same multiplier 3 as on the first term, with a leftover multiple of 13.
2. Check n=1: 27 + 64 = 91 = 13*7. Correct.

### Slot 1 Q2a: set operations

#### 🎯 What is being asked

Topic: **sets** (2 marks). Given A={2,5} and B={2,6}, compute A union B, A intersection B, A-B and the Cartesian product A x B, then say which of these operations are **commutative** (swapping the two sets never changes the answer). The answer is four explicit sets plus a sentence about commutativity with a reason.

#### ✍️ What to write in the exam

```text
A union B = {2,5,6}
A intersection B = {2}
A - B = {5}
A x B = {(2,2),(2,6),(5,2),(5,6)}   (|A x B| = 2*2 = 4 ordered pairs)

Commutative: union (A union B = B union A) and intersection (A intersection B = B intersection A), because membership in 'A or B' / 'A and B' does not depend on the order of the sets.
Not commutative: difference, since A - B = {5} but B - A = {6}; and Cartesian product, since (2,6) is in A x B but not in B x A (6 is not in A).
```
Curly brackets for sets, round brackets for pairs, and state the pair count.

#### 🪜 How it is solved, step by step

**Step 1.** **Union by scanning.** Start with all of A: {2,5}. Now go through B one element at a time and add it only if it is not already there. 2 is already there, skip it. 6 is new, add it. So A union B={2,5,6}.

**Step 2.** **Intersection by scanning.** Go through A and keep the elements that also appear in B: 2 stays, 5 goes. So A intersection B={2}.

**Step 3.** **Difference.** From A={2,5} delete everything that is also in B (that is exactly the intersection {2}). What is left is A-B={5}.

**Step 4.** **Cartesian product with a grid.** Put A down the side and B across the top; each cell is the ordered pair (row element, column element), with the A element first.

| A \ B | 2 | 6 |
|---|---|---|
| 2 | (2,2) | (2,6) |
| 5 | (5,2) | (5,6) |

Collecting every cell: A x B={(2,2),(2,6),(5,2),(5,6)}. Count check: |A|*|B| = 2*2 = 4 pairs, and the grid has 4 cells.

**Step 5.** **Size check on the union.** |A union B| = |A| + |B| - |A intersection B| = 2 + 2 - 1 = 3, and {2,5,6} really has 3 elements. (We subtract the intersection because the shared elements were counted twice.)

**Step 6.** **Test commutativity by actually swapping.** B union A={2,5,6}, the same as A union B, because 'in A or in B' does not care about order. B intersection A={2}, the same, because 'in both' is symmetric. But B-A={6}, while A-B={5}, so difference is **not** commutative. For the product, B x A={(2,2),(2,5),(6,2),(6,5)}. Compare with A x B: the pair (2,6) is in A x B, but it is not in B x A because 6 is not in A. So A x B is not equal to B x A.

#### 📘 Concept refresher

Think of a set as a bag of distinct things; order and repeats do not matter, so {1,2,2} is just {1,2}.

- **Union** A union B: everything that is in A, or in B, or in both. Write each element once.
- **Intersection** A intersection B: only what is in **both** A and B.
- **Difference** A-B: what is in A but **not** in B. Order matters: A-B and B-A are different questions.
- **Cartesian product** A x B: all **ordered pairs** (x,y) with x from A and y from B. The first coordinate always comes from the first set. So (1,2) and (2,1) are different pairs, and |A x B| = |A| * |B|.
- **Commutative** operation: swapping the two sets gives the same result.

Tiny example with S={red,blue}, T={blue,green}: S union T={red,blue,green}, S intersection T={blue}, S-T={red}.

#### ⚠️ Common mistakes

- Writing the pairs of A x B as sets, {2,6}, instead of ordered pairs (2,6). Order matters in a pair.
- Listing a shared element twice in the union (a set never repeats elements).
- Doing B-A when the question says A-B. Check which set comes first.
- Claiming difference or Cartesian product is commutative. Only union and intersection are.
- Missing pairs in A x B. Use a grid or 'one first coordinate at a time' so you get all 4.

#### ✅ Check yourself

1. What is B-A, and is it equal to A-B? **Answer:** B-A={6}; A-B={5}, so they are not equal.
2. How many pairs are in B x A, and does that equal A x B? **Answer:** 4 pairs (|B|*|A|), the same count as A x B, but the pairs themselves differ, so B x A is not equal to A x B.

### Slot 1 Q2b: divisors of 48

#### 🎯 What is being asked

Topic: **posets**, the 8-mark part of mock 5. A={1,2,3,4,6,8,12,16,24,48} is the set of all divisors of 48 under divisibility. Give levels and covers, minimal/maximal/least/greatest, the LUB and GLB of {6,8}, {12,16}, {3,4}, and whether A is a lattice.

#### ✍️ What to write in the exam

```text
Elements: A={1,2,3,4,6,8,12,16,24,48}, ordered by divisibility (a <= b iff a divides b).
Levels (bottom to top): {1}; {2,3}; {4,6}; {8,12}; {16,24}; {48}.
Covers: (1,2),(1,3),(2,4),(2,6),(3,6),(4,8),(4,12),(6,12),(8,16),(8,24),(12,24),(16,48),(24,48).
Minimal={1}; maximal={48}; least=1; greatest=48.
{6,8}: lower bounds {1,2}, GLB=2; upper bounds {24,48}, LUB=24.
{12,16}: lower bounds {1,2,4}, GLB=4; upper bounds {48}, LUB=48.
{3,4}: lower bounds {1}, GLB=1; upper bounds {12,24,48}, LUB=12.
Lattice: yes. A is all divisors of 48, so for every pair gcd and lcm divide 48 and lie in A; they are the GLB and LUB.
```
List the bounds before naming LUB/GLB; the marks are for the bound lists as well as the final answers.

#### 🪜 How it is solved, step by step

**Step 1.** **Levels (bottom to top).** 48=2^4*3, so every divisor is 2^a*3^b with a in {0,..,4}, b in {0,1}: a 5-by-2 ladder of 10 elements, with levels of sizes 1,2,2,2,2,1. Note 16=2^4 has only one cover below it (8), and above it only 48 (16*3), because 32 does not divide 48. Result: level 0 = {1}; level 1 = {2,3}; level 2 = {4,6}; level 3 = {8,12}; level 4 = {16,24}; level 5 = {48}.

**Step 2.** **Cover edges (upward).** For each element, list what sits **directly** above it: 1 -> 2,3; 2 -> 4,6; 3 -> 6; 4 -> 8,12; 6 -> 12; 8 -> 16,24; 12 -> 24; 16 -> 48; 24 -> 48. That is 13 edges (typed in full below). No (1,4) edge appears, because an element lies between them.

**Step 3.** **Extrema.** Nothing is below 1, and 1 is below everything, so minimal={1} and least=1. Nothing is above 48, and everything is below it, so maximal={48} and greatest=48.

**Step 4.** **Bounds for the named pairs.** Write the common divisors and common multiples (or common subsets/supersets) **inside A**, then take the GLB = largest lower bound and LUB = smallest upper bound.

- **{6,8}**: lower bounds {1,2}, GLB=2; upper bounds {24,48}, LUB=24 (gcd=2, lcm=24).
- **{12,16}**: lower bounds {1,2,4}, GLB=4; upper bounds {48}, LUB=48 (gcd=4, lcm=48).
- **{3,4}**: lower bounds {1}, GLB=1; upper bounds {12,24,48}, LUB=12 (gcd=1, lcm=12).

**Step 5.** **Lattice.** A is the full divisor set of 48, so gcd and lcm of any pair divide 48 and are in A. A useful self-check for each named pair is gcd(a,b)*lcm(a,b)=a*b: for {6,8}, 2*24=48=6*8; for {12,16}, 4*48=192=12*16; for {3,4}, 1*12=12=3*4. All the bounds found by listing agree with this. So A is a lattice.

#### 📘 Concept refresher

**Divisibility poset.** Under 'a <= b iff a divides b' some pairs are incomparable (2 and 3). Draw smaller elements lower; the diagram contains only **covers** (a,b): a < b with no element strictly between. You describe it as levels (bottom to top) and a list of upward covers.

**Extrema.** Minimal: nothing below. Maximal: nothing above. Least: below all. Greatest: above all. A least element, if it exists, is the only minimal element.

**Bounds.** For a pair {x,y} write the common multiples in the set (upper bounds) and the common divisors in the set (lower bounds). LUB = the least upper bound (the one dividing all other upper bounds); GLB = the greatest lower bound (the one divisible by all other lower bounds). **Lattice** = every pair has a LUB and a GLB.

Tiny example on {2,3,6,12,18}: upper bounds of {2,3} are {6,12,18} so LUB=6; upper bounds of {12,18} are empty, so no LUB, and this set is not a lattice.

#### ⚠️ Common mistakes

- Typing every comparable pair as an edge. Only covers count: (1,4) is comparable (1 divides 4) but it is a shortcut, so leave it out.
- Writing only the final LUB/GLB values with no lists of bounds: the marks are for the working.
- Thinking 16 and 24 are comparable. 16 does not divide 24, so they are on the same level and incomparable.
- Mixing up minimal with least, or maximal with greatest. Least/greatest must be comparable to every element.

#### ✅ Check yourself

1. What is LUB({12,16}) from the exponents of 12=2^2*3 and 16=2^4? **Answer:** Larger exponents: 2^4*3=48.
2. Which elements does 48 cover? **Answer:** 16 and 24 (48/3=16, 48/2=24).

### Slot 1 Q3: congruence modulo 5 on {-5,...,9}

#### 🎯 What is being asked

**Congruence modulo 5** on the finite set A = {-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9} (15 integers). x ~ y iff x = y (mod 5). Prove the relation is an equivalence relation, list all classes and count them. Final answer: **5 classes**, each of size 3.

#### ✍️ What to write in the exam

Let A = {-5,...,9}; x ~ y iff 5 divides x - y.
Reflexive: x - x = 0 = 5*0. Symmetric: x - y = 5k implies y - x = 5(-k). Transitive: x - y = 5k and y - z = 5m imply x - z = 5(k+m). So ~ is an equivalence relation.
Classes: [0]={-5,0,5}; [1]={-4,1,6}; [2]={-3,2,7}; [3]={-2,3,8}; [4]={-1,4,9}.
Disjoint, and 5*3 = 15 = |A|, so they partition A. Number of classes = 5.

#### 🪜 How it is solved, step by step

1. **Reflexive.** x - x = 0 = 5*0, so x ~ x.
2. **Symmetric.** If x - y = 5k then y - x = 5(-k), so y ~ x.
3. **Transitive.** If x - y = 5k and y - z = 5m, adding gives x - z = 5(k + m), so x ~ z.
4. **Classes by remainder.** Take each remainder and list the members of A:
   - remainder 0: -5, 0, 5
   - remainder 1: -4 (since -4 + 5 = 1), 1, 6
   - remainder 2: -3, 2, 7
   - remainder 3: -2, 3, 8
   - remainder 4: -1, 4, 9
5. **Check.** 5 classes of size 3 each: 15 = |A|. They are disjoint (a number has one remainder). Notice the pattern: the elements of a class are 5 apart, such as -5, 0, 5 and -1, 4, 9.

#### 📘 Concept refresher

- x = y (mod 5) means **5 divides x - y**. So 7 = 2 (mod 5) because 7 - 2 = 5. Also -4 = 1 (mod 5) because -4 - 1 = -5.
- Same idea as remainders: each integer has a remainder 0, 1, 2, 3 or 4 on division by 5, even for negatives (add 5 until you are in 0..4).
- An **equivalence class** [a] is the set of all elements of A related to a. Because A is finite, list only elements of A.
- A **partition** is a set of non-empty, non-overlapping blocks covering A.

#### ⚠️ Common mistakes

- Putting -4 into the class of 4 (it is "minus 4", not remainder 4). Test: -4 - 4 = -8 is not a multiple of 5, while -4 - 1 = -5 is.
- Leaving out negative numbers, or counting 0 only in a class with positive numbers.
- Giving infinite classes like {..., 1, 6, 11, ...}. Only elements of A.
- Saying "5 classes" without listing them when asked to list.

#### ✅ Check yourself

1. Is -3 ~ 7? Answer: yes, -3 - 7 = -10 = 5*(-2).
2. How many classes if A were {0,1,2,3,4,5,6}? Answer: still 5, but sizes differ: [0]={0,5}, [1]={1,6}, and [2], [3], [4] have 1 element each.

### Slot 1 Q4: non-homogeneous variant 6

#### 🎯 What is being asked

Solve a_n = 6*a_(n-1) - 9*a_(n-2) + 3^n for n >= 2 with a_0 = 2, a_1 = 9. Find the characteristic equation and roots, the particular solution coefficient, and the closed form with all constants. Final answer: a_n = 2*3^n + (1/2)*n*3^n + (1/2)*n^2*3^n.

#### ✍️ What to write in the exam

Characteristic equation: r^2 - 6r + 9 = (r-3)^2 = 0, so r = 3 (multiplicity 2).
Homogeneous solution: C1*3^n + C2*n*3^n.
The forcing 3^n has base 3, a double root, so try p_n = A*n^2*3^n. Substituting into p_n - 6p_(n-1) + 9p_(n-2) = 3^n and dividing by 3^n gives A[n^2 - 2(n-1)^2 + (n-2)^2] = 1, i.e. 2A = 1, A = 1/2.
General solution a_n = C1*3^n + C2*n*3^n + (1/2)*n^2*3^n.
a_0 = 2 gives C1 = 2. a_1 = 9 gives 6 + 3C2 + 3/2 = 9, so C2 = 1/2.
Therefore a_n = 2*3^n + (1/2)*n*3^n + (1/2)*n^2*3^n for n >= 0. Check: a_2 = 45 and a_3 = 216 from both recurrence and formula.

#### 🪜 How it is solved, step by step

1. **Characteristic equation.** r^2 - 6r + 9 = (r - 3)^2 = 0. Root 3, twice.
2. **Homogeneous solution.** C1*3^n + C2*n*3^n.
3. **Guess.** p_n = A*n^2*3^n.
4. **Substitute** into p_n - 6p_(n-1) + 9p_(n-2) = 3^n. Use p_(n-1) = A(n-1)^2*3^(n-1) and p_(n-2) = A(n-2)^2*3^(n-2). Divide by 3^n: 3^(n-1)/3^n = 1/3 and 3^(n-2)/3^n = 1/9, so
   A[ n^2 - 6(n-1)^2/3 + 9(n-2)^2/9 ] = 1, i.e. A[ n^2 - 2(n-1)^2 + (n-2)^2 ] = 1.
   The bracket is n^2 - 2n^2 + 4n - 2 + n^2 - 4n + 4 = 2. So 2A = 1 and A = 1/2. p_n = (1/2)*n^2*3^n.
5. **Constants.** a_n = C1*3^n + C2*n*3^n + (1/2)*n^2*3^n. p_0 = 0, p_1 = (1/2)*1*3 = 3/2.
   n = 0: C1 = 2.
   n = 1: 3C1 + 3C2 + 3/2 = 9. With C1 = 2: 6 + 3C2 + 3/2 = 9, so 3C2 = 3/2, C2 = 1/2.
6. **Check.** From the recurrence: a_2 = 6*9 - 9*2 + 9 = 45. Formula: (2 + 1 + 2)*9 = 5*9 = 45. Next, a_3 = 6*45 - 9*9 + 27 = 216; formula (2 + 3/2 + 9/2)*27 = 8*27 = 216.

#### 📘 Concept refresher

- A **non-homogeneous** linear recurrence has solution **homogeneous part + particular part**.
- Characteristic equation: set a_n = r^n in the homogeneous part. A **repeated root** r gives two independent solutions r^n and n*r^n.
- **Resonance**: if the forcing is b^n and b is a characteristic root of multiplicity s, multiply the trial C*b^n by n^s. Here the forcing is 3^n and 3 is a **double** root, so use n^2.
- Why: C*3^n and C*n*3^n are already solutions of the homogeneous equation; substituting them gives 0, which cannot equal 3^n.

#### ⚠️ Common mistakes

- Using A*3^n or A*n*3^n; both are already homogeneous solutions.
- Mistakes with the division: 3^(n-1) = 3^n / 3 and 3^(n-2) = 3^n / 9.
- Forgetting the p_1 = 3/2 term when using a_1 = 9.
- Treating (r-3)^2 as roots 3 and 6 (or writing only C*3^n for the homogeneous part).

#### ✅ Check yourself

1. If the forcing were 5^n, what would the particular guess be? Answer: 5 is not a root, so A*5^n.
2. Check a_4 from the recurrence. Answer: 6*216 - 9*45 + 81 = 972; formula (2 + 2 + 8)*81 = 12*81 = 972.

### Slot 1 Q5: Kruskal variant 6

#### 🎯 What is being asked

This is a **minimum spanning tree (MST)** question on a graph with 7 vertices A to G and 11 weighted edges: AB(1),BC(2),AC(3),CD(2),BD(5),DE(4),CE(6),EF(3),DF(7),FG(9),EG(8). You must run **Kruskal's algorithm**: write every candidate edge in order, say whether it is **accepted or rejected and why**, stop when 6 edges are accepted, and finish with the **total weight**. Here the ties hide a cycle: one weight-3 edge is rejected and the other accepted. The question is worth 10 marks: 2 for sorting, 6 for the six additions, 2 for the spanning-tree statement and the total.

#### ✍️ What to write in the exam

```text
Kruskal's algorithm.
Sorted edges: AB(1), BC(2), CD(2), AC(3), EF(3), DE(4), BD(5), CE(6), DF(7), EG(8), FG(9)
Step 1: add AB(1), joins different components: {A,B}; {C}; {D}; {E}; {F}; {G}.
Step 2: add BC(2), joins different components: {A,B,C}; {D}; {E}; {F}; {G}.
Step 3: add CD(2), joins different components: {A,B,C,D}; {E}; {F}; {G}.
Reject AC(3): endpoints already in the same component (cycle).
Step 4: add EF(3), joins different components: {A,B,C,D}; {E,F}; {G}.
Step 5: add DE(4), joins different components: {A,B,C,D,E,F}; {G}.
Reject BD(5): endpoints already in the same component (cycle).
Reject CE(6): endpoints already in the same component (cycle).
Reject DF(7): endpoints already in the same component (cycle).
Step 6: add EG(8), joins different components: {A,B,C,D,E,F,G}.
Finally all seven vertices are connected using six edges, so this is the MST by Kruskal's algorithm.
MST edges: AB, BC, CD, EF, DE, EG. Total weight = 1 + 2 + 2 + 3 + 4 + 8 = 20.
```
Write the accepted AND rejected edges in order, one reason per line, and always state the total.

#### 🪜 How it is solved, step by step

1. **Sort** all edges by weight, smallest first (keep the printed order among equal weights). Sorted list: AB(1), BC(2), CD(2), AC(3), EF(3), DE(4), BD(5), CE(6), DF(7), EG(8), FG(9). We sort first so nothing cheaper is still waiting when we meet an edge.
2. **Start** with seven single-vertex pieces: {A}; {B}; {C}; {D}; {E}; {F}; {G}.
3. **Go down the list**, testing each edge with the piece rule:
   - **AB(1)**: different pieces, so **add** (edge 1 of 6). Now: {A,B}; {C}; {D}; {E}; {F}; {G}.
   - **BC(2)**: different pieces, so **add** (edge 2 of 6). Now: {A,B,C}; {D}; {E}; {F}; {G}.
   - **CD(2)**: different pieces, so **add** (edge 3 of 6). Now: {A,B,C,D}; {E}; {F}; {G}.
   - **AC(3)**: same piece already, a cycle: **reject**.
   - **EF(3)**: different pieces, so **add** (edge 4 of 6). Now: {A,B,C,D}; {E,F}; {G}.
   - **DE(4)**: different pieces, so **add** (edge 5 of 6). Now: {A,B,C,D,E,F}; {G}.
   - **BD(5)**: same piece already, a cycle: **reject**.
   - **CE(6)**: same piece already, a cycle: **reject**.
   - **DF(7)**: same piece already, a cycle: **reject**.
   - **EG(8)**: different pieces, so **add** (edge 6 of 6). Now: {A,B,C,D,E,F,G}.
4. **Stop** when 6 edges are accepted: all seven vertices are now one piece. The remaining edges (FG(9)) are not examined.
5. **Add the weights** of the accepted edges AB, BC, CD, EF, DE, EG: 1 + 2 + 2 + 3 + 4 + 8 = **20**.
6. **Sanity check:** 6 edges for 7 vertices, one piece, no cycle. Rejected edges: AC, BD, CE, DF. A tie can hide a cycle: AC(3) and EF(3) have equal weight, but AC is rejected (A, B, C are already joined) while EF is accepted. Never judge by weight alone; judge by pieces.

#### 📘 Concept refresher

- A **spanning tree** touches every vertex and has no cycles. With V = 7 vertices it always has exactly V - 1 = **6 edges**.
- A **minimum** spanning tree is the one with the smallest total weight.
- **Kruskal's rule in one line:** always take the cheapest edge that does not make a cycle.
- How to detect a cycle without drawing: keep track of **components** (pieces that are already connected). At the start every vertex is its own piece. An edge whose two ends lie in **different pieces** is safe: add it and merge the two pieces. An edge whose two ends lie in the **same piece** would close a loop: reject it.
- Ties (equal weights): either order is allowed; the total is the same.

Tiny example: triangle XY(1), YZ(1), XZ(2). Take XY, then YZ; now X, Y, Z are one piece, so XZ is rejected. Total = 2.

#### ⚠️ Common mistakes

- Forgetting to sort first, or sorting wrongly. Re-read the sorted list once against the edge list: it must have 11 edges.
- Accepting an edge just because it is cheap. Always ask: are its two ends already in the same piece?
- Rejecting an edge only because one end is already used. A vertex can have many edges; only an edge whose two ends are already connected is rejected.
- Continuing after 6 edges, or stopping at 5. A tree on 7 vertices has exactly 6 edges.
- Totalling rejected edges too. Add only the 6 accepted weights.

#### ✅ Check yourself

1. How many edges does the MST of this graph have? Answer: 6, because a tree on 7 vertices has V - 1 = 6 edges.
2. If you took tied edges in the opposite order, would the total change? Answer: the chosen edges might differ, but the total stays 20, because ties only choose between equal weights.

