# C programming question bank — BITS BCS ZC313

Prepared for the announced computer-based exam: **5 C-code questions, about 10 blanks each, partial credit per blank; no theory or flowcharts.** Study the HIGH topics first. Practise filling one expression, condition, loop header, address, allocation, or statement at a time.

Sources, following `papers_text/INDEX.txt`:

| Tag | Paper |
|---|---|
| p1 | 2022–23 Sem 2 EC-3, 04-03-2023 |
| p2 | 2022–23 Sem 2 EC-3 Make-up, 24-02-2023 |
| p3 | 2022–23 Sem 2 EC-3 Regular, 19-02-2023 |
| p4 | 2023–24 Sem 1 EC-3 Slot 1, 08-10-2023 |
| p5 | 2023–24 Sem 1 EC-3 Slot 2, 13-10-2023 |

The text of p4/p5 has an inconsistent semester heading; the index and dates above identify the papers. p1's header says 13 questions, but its text contains **Q1–Q14**; all are covered here.

**Reading conventions.** `__A__`, etc. are placeholders to replace, not literal C. A semicolon already outside a blank must not be supplied twice. Answer tables give replacement text; multi-statement blocks may contain their own internal semicolons. Identical questions are combined with all source tags. Long input exercises have repetitive prompts shortened, but retain every original blank and the relevant logic. Output-prediction programs preserve their printed text. Output blocks show line breaks; trailing spaces and missing final newlines are stated separately. Ordinary examples assume valid input, successful allocation/file opening, positive sizes, and arithmetic within range unless a defect is discussed. ASCII is assumed for letter arithmetic and ordinary IEEE-754 floating point for the numerical traces.

**Reconstruction policy.** Broken formatting, lost operators, invalid format specifiers, and actual algorithm defects are explicitly distinguished below. An undefined C program has **no guaranteed exact output**; an apparent examiner-intended answer is not presented as a valid C result.

## Topic frequency

Each paper totals 100 marks; denominator = **500 marks**. For marks, each question/subquestion is assigned once to its principal task. Thus rows sum to 500, with **418 code marks (83.6%)** and **82 theory/flowchart marks (16.4%)**. “Papers” counts papers that exercise the topic, including hybrid questions; a paper may count in several topic rows. The source column lists the questions whose **marks** are assigned to that row. For example, allocation inside p1 Q6 contributes to allocation's paper count, but its marks are assigned to files. This avoids counting the same marks twice while recognising recurring concepts.

| Topic / principal task | Papers | Marks share of all 500 | Priority for new format | Sources counted |
|---|---:|---:|---|---|
| Struct records, member access, struct pointers, record selection | 5/5 | 64 (12.8%) | **HIGH** | p1 Q5,Q13; p2 Q12; p3 Q12; p4 Q5,Q6,Q7a |
| Dynamic allocation, struct arrays, nested allocation/free | 4/5 | 34 (6.8%) | **HIGH** | p1 Q12; p3 Q15; p4 Q8; p5 Q7c,Q9 |
| 1D arrays, search, selection sort, merge, duplicates, union | 5/5 | 64 (12.8%) | **HIGH** | p1 Q4a–b; p2 Q7,Q9; p3 Q7,Q9,Q17; p5 Q4a–b |
| 2D arrays, matrix transpose, column sums, stored patterns | 5/5 | 37 (7.4%) | **HIGH** | p1 Q4d,Q7; p2 Q10; p3 Q10; p4 Q4; p5 Q6a |
| Strings, indexing, case conversion, string functions | 5/5 | 31 (6.2%) | **HIGH** | p1 Q4c,Q4e,Q14; p2 Q11; p3 Q11; p5 Q6b–c |
| File handling, merging records, extrema, append, output files | 5/5 | 37 (7.4%) | **HIGH** | p1 Q6; p2 Q15; p3 Q16; p4 Q9; p5 Q8 |
| Pointers, pointer arithmetic, modifying caller data | 5/5 | 25 (5.0%) | **HIGH** | p2 Q13–14; p3 Q13–14; p5 Q7a–b |
| Loop bounds, digit algorithms, number tests, printed patterns | 5/5 | 55 (11.0%) | **HIGH** | p1 Q3,Q8–10; p2 Q5–6; p3 Q5–6; p4 Q1c,Q3c; p5 Q3c |
| Function execution, recurrence, recursion | 4/5 | 13 (2.6%) | **HIGH** | p1 Q2; p2 Q8; p3 Q8; p5 Q5b |
| Operators, increments, conversions, macros, switch, XOR | 5/5 | 50 (10.0%) | **MED** | p1 Q11; p2 Q3–4; p3 Q3–4; p4 Q2a,Q2c,Q3b; p5 Q2a–c,Q3b |
| Scope/storage demonstrated by executable code | 1/5 | 8 (1.6%) | **MED** | p2 Q16 |
| Flowchart-only exercises | 5/5 | 35 (7.0%) | **SKIP** | p1 Q1; p2 Q2; p3 Q2; p4 Q1a; p5 Q1c |
| Computer hardware, languages, OS: theory only | 4/5 | 15 (3.0%) | **SKIP** | p2 Q1; p3 Q1; p4 Q1b; p5 Q1a–b |
| C terminology/theory-only blanks and true/false | 2/5 | 32 (6.4%) | **SKIP** | p4 Q2b,Q2d,Q3a,Q7b–c,Q10a–b; p5 Q2d,Q3a,Q5a,Q5c |
| **Total** | **5 papers** | **500 (100%)** | | |

Hybrid appearances explaining the broader paper counts include structs in p5 Q9, 1D mark arrays in p4 Q6, string copying in p4 Q5, and pointers in p1 Q13/p4 Q7a. Search/sort/merge specifically occurs in p2, p3, and p5 (3/5); the broader 1D-array row includes their prerequisites. User-defined helper-function/recursion questions occur in p1,p2,p3,p5; p4's programs use `main` without such helper exercises.

The 3-mark label between p3 Q7's driver and Q8 is attributed to **Q8**; Q7 already explicitly has 12 marks. This yields that paper's 100-mark total. Historical shares describe these papers, not a prediction of the new paper's exact distribution.

## 1. Structs and pointers to records — HIGH

### 1.1 Salary deductions [p1 Q5] — 6 marks

```c
#include <stdio.h>
#define MAX_VACATION_DAYS 6
struct Employee {
    char name[30];
    int salary;
    int vacation_days_used;
};
struct Employee emp[5] = {
    {"Rohan", 20000, 0}, {"Shivam", 25000, 8},
    {"Tanveer", 24000, 4}, {"Aniket", 18000, 12},
    {"Kaustab", 22000, 1}
};
int deducted_salary(struct Employee e) {
    __C__
}
int main(void) {
    int total_salary_deducted = 0;
    for (__A__) {
        __B__;
    }
    printf("Total deducted salary = %d\n", total_salary_deducted);
    return 0;
}
```

| Blank | Correct replacement | Reason |
|---|---|---|
| A | `int i = 0; i < 5; ++i` | Visit all five records, at indices 0–4. |
| B | `total_salary_deducted += deducted_salary(emp[i])` | Add this employee's deduction to the running total. |
| C | `if (e.vacation_days_used > MAX_VACATION_DAYS) return e.salary / 10; return 0;` | Only more than six days triggers a 10% deduction. |

Alternative C: `return e.vacation_days_used > MAX_VACATION_DAYS ? (int)(e.salary * 0.1) : 0;`. For these salaries both forms agree; an integer return cannot represent fractional currency. Trace: deductions = 0, 2500, 0, 1800, 0; total = 4300.

```text
Total deducted salary = 4300
```

### 1.2 Find the tallest student below an age limit [p1 Q13] — 10 marks

```c
#include <stdio.h>
#include <stdlib.h>
struct student {
    char name[20];
    int id, age, height;
};
struct student *findMaxHeight(__A__, int n, int age) {
    int curMax = -1;
    struct student *curMaxStudent = __B__;
    for (int i = 0; i < n; ++i) {
        if (s[i].age __C__) {
            if (__D__) {
                curMax = s[i].height;
                curMaxStudent = &s[i];
            }
        }
    }
    return __E__;
}
int main(void) {
    struct student s[5] = {
        {"John",123,20,180}, {"Mary",456,21,170},
        {"Peter",789,19,175}, {"Alice",101,20,165},
        {"Bob",112,19,185}
    };
    struct student *p = findMaxHeight(s, 5, 20);
    if (p == NULL)
        printf("No student found younger than 20 years.\n");
    else
        printf("The student younger than 20 years with the maximum height is %s with height.%d\n",
               p->name, p->height);
    p = findMaxHeight(s, 5, 19);
    if (p == NULL)
        printf("No student found younger than 19 years.\n");
    else
        printf("The student younger than 19 years with the maximum height is %s with height.%d\n",
               p->name, p->height);
    return 0;
}
```

| Blank | Correct replacement | Reason |
|---|---|---|
| A | `struct student s[]` | An array parameter lets the function inspect the caller's students. |
| B | `NULL` | There is initially no eligible result. |
| C | `< age` | “Younger than” is strict; do not use `<=`. |
| D | `s[i].height > curMax` | Replace the best record only with a taller eligible one. |
| E | `curMaxStudent` | Return the address of an existing record, or NULL. |

Alternative A: `struct student *s`. Alternative D: `curMax < s[i].height`; using `>=` instead of `>` also meets “maximum height” but chooses the last tied student. No allocation or modification of `s` is needed.

Trace: for age limit 20, John/Mary/Alice fail the age test; Peter sets 175 and Bob replaces it with 185. For age limit 19 nobody qualifies. Exact output of the printed format strings:

```text
The student younger than 20 years with the maximum height is Bob with height.185
No student found younger than 19 years.
```

**Source inconsistency:** the paper's illustrated output omits words/punctuation present in its `printf`. The block above follows the code, retaining its odd `height.` punctuation. Broken string lines have been joined.

### 1.3 Add distances and carry inches [p2 Q12] — 8 marks

```c
#include <stdio.h>
struct Distance {
    int feet, inch;
} dist1, dist2, sum;
/* dist1 and dist2 have already been populated by the caller. */
void add_dist(void) {
    __A__;
    __B__;
    while (sum.inch >= 12) {
        __C__;
        __D__;
    }
    printf("\nSum of distances = %d feet,%d inches", sum.feet, sum.inch);
}
```

| Blank | Correct replacement | Reason |
|---|---|---|
| A | `sum.feet = dist1.feet + dist2.feet` | Add the feet fields. |
| B | `sum.inch = dist1.inch + dist2.inch` | Add the inch fields separately. |
| C | `sum.inch -= 12` | Remove each group of 12 inches. |
| D | `++sum.feet` | Carry each removed group into feet. |

A/B may be exchanged; C/D may be exchanged. Alternatives `sum.feet += 1` and `sum.inch = sum.inch - 12` are equivalent. Exactly 12 inches must carry, so the condition includes equality. No new variable is needed.

### 1.4 Time difference with borrowing and midnight wrap [p3 Q12] — 8 marks

```c
struct TIME { int seconds, minutes, hours; };
void difference(struct TIME begin, struct TIME end, struct TIME *diff) {
    while (end.seconds < begin.seconds) {
        --end.minutes;
        end.seconds += 60;
    }
    __A__;
    while (end.minutes < begin.minutes) {
        --end.hours;
        end.minutes += 60;
    }
    __B__;
    while (end.hours < begin.hours) {
        __C__;
    }
    __D__;
}
```

| Blank | Correct replacement | Reason |
|---|---|---|
| A | `diff->seconds = end.seconds - begin.seconds` | Subtract seconds after borrowing a minute if needed. |
| B | `diff->minutes = end.minutes - begin.minutes` | Subtract minutes after borrowing an hour if needed. |
| C | `end.hours += 24` | Treat an earlier ending clock time as the next day. |
| D | `diff->hours = end.hours - begin.hours` | Store the remaining hour difference. |

Alternatives: replace `diff->field` by `(*diff).field`. The structs `begin`/`end` are local copies; `diff` points to the caller's result. Checks: 18:30:20→22:05:54 borrows an hour, giving 3:35:34; 16:05:35→02:10:45 adds 24 hours, giving 10:05:10. Identical times produce 0; a full 24-hour interval cannot be distinguished without a date or extra convention.

### 1.5 Define a typedef and copy a name [p4 Q5] — 10 marks

```c
#include <stdio.h>
#include <string.h>
__A__ struct {
    int ID;
    char name[20];
    int age;
} __B__;
int main(void) {
    Information info;
    __C__ = 1;
    __D__(__E__, "Jack Hobbes");
    printf("ID: %d, Name: %s\n", __C__, __E__);
    return 0;
}
```

| Blank | Correct replacement | Reason |
|---|---|---|
| A | `typedef` | Introduce a type alias. |
| B | `Information` | This is the type name used in `main`. |
| C (both occurrences) | `info.ID` | Use `.` on a struct object. |
| D | `strcpy` | A character array cannot be assigned a string with `=`. |
| E (both occurrences) | `info.name` | The array supplies the destination address and later the printable name. |

Output after filling: `ID: 1, Name: Jack Hobbes` followed by a newline. `age` is not read, so its uninitialised value is irrelevant. Alternative D `strcat` is **not** valid here because `info.name` was not initialised to an empty string.

### 1.6 Array of student records; swap chemistry marks [p4 Q6] — 10 marks

```c
#include <stdio.h>
typedef struct { int ID; int marks[3]; } Record;
int main(void) {
    Record __A__;
    int i, j;
    for (i = 0; i < __B__; ++i) {
        scanf("%d", &records[i].ID);
        for (j = 0; j < __C__; ++j)
            scanf("%d", __D__);
    }
    int t = __E__;
    records[3].marks[1] = records[2].marks[1];
    __F__ = t;
    return 0;
}
```

| Blank | Correct replacement | Reason |
|---|---|---|
| A | `records[5]` | Five students require five struct objects. |
| B | `5` | Student indices run from 0 to 4. |
| C | `3` | Each student has three subject marks. |
| D | `&records[i].marks[j]` | `%d` needs the address of the integer being read. |
| E | `records[3].marks[1]` | Save the fourth student's chemistry mark before overwriting it. |
| F | `records[2].marks[1]` | Put the saved mark into the third student's chemistry slot. |

Chemistry is subject index 1, not 2. Equivalent pointer expressions such as `records[i].marks + j` are valid for D.

### 1.7 Two ways to access coordinates using pointers [p4 Q7a] — 12 marks

```c
#include <stdio.h>
typedef struct { int x, y, z; } Coordinate;
int main(void) {
    Coordinate c[5];
    for (int i = 0; i < 5; ++i) {
        scanf("%d", &c[i].x);
        scanf("%d", &c[i].y);
        scanf("%d", &c[i].z);
    }
    printf("5th point: x = %d\n", (*(__A__)).x);
    printf("3rd point: y = %d\n", (*(__B__)).y);
    printf("1st point: z = %d\n", (*(__C__)).z);
    printf("5th point: x = %d\n", (__D__)->__E__);
    printf("3rd point: y = %d\n", (__F__)->__G__);
    printf("1st point: z = %d\n", (__H__)->__I__);
    return 0;
}
```

| Blank | Correct replacement | Reason |
|---|---|---|
| A | `c + 4` | The fifth element is four objects beyond `c`. |
| B | `c + 2` | The third element has index 2. |
| C | `c` | The first element has index 0. |
| D | `c + 4` | Point to the fifth Coordinate. |
| E | `x` | Select its x field. |
| F | `c + 2` | Point to the third Coordinate. |
| G | `y` | Select its y field. |
| H | `c` | Point to the first Coordinate. |
| I | `z` | Select its z field. |

Alternatives: `&c[4]`, `&c[2]`, and `&c[0]` for the corresponding pointers. **Syntax repair:** the extraction prints `->(__E__)`, etc.; C requires an unparenthesised member identifier after `->`, so those literal parentheses were removed. `(*(c+i)).x` and `(c+i)->x` access the same member.

## 2. Dynamic memory and nested records — HIGH

### 2.1 Allocate students, use `->`, and free [p3 Q15; p4 Q8] — 6 marks in each

```c
#include <stdio.h>
#include <stdlib.h>
struct Student { int rollNo; char name[20]; float marks; };
int main(void) {
    int n;
    printf("Enter the number of students: ");
    scanf("%d", &n);
    struct Student *ptr;
    ptr = __A__;
    if (ptr == NULL) {
        printf("__B__");
        return 0;
    }
    for (int i = 0; i < n; ++i) {
        printf("Enter the details of student %d:\n", i + 1);
        printf("Enter roll number: ");
        scanf("%d", &(ptr + i)->rollNo);
        printf("Enter name: ");
        scanf("%19s", (ptr + i)->name);
        printf("Enter marks: ");
        scanf("%f", &(ptr + i)->marks);
    }
    printf("The details of the students are:\n");
    for (int i = 0; i < n; ++i) {
        printf("Details of student %d:\n", i + 1);
        printf("Roll number: %d\n", (ptr + i)->rollNo);
        printf("Name: %s\n", (ptr + i)->name);
        printf("Marks: %.2f\n", (ptr + i)->marks);
    }
    free(__C__);
    return 0;
}
```

| Blank | Correct replacement | Reason |
|---|---|---|
| A | `malloc(n * sizeof *ptr)` | Reserve space for n complete Student objects. |
| B | `Memory allocation failed\n` | Supply explanatory text inside the existing string quotes. |
| C | `ptr` | Free the base address returned by the allocator. |

Alternative A: `(struct Student *)malloc(n * sizeof(struct Student))`; the cast is optional in C. `calloc(n, sizeof *ptr)` is also correct and additionally zero-initialises the storage. **B is not unique:** any sensible failure message is acceptable; do not put extra quotation marks inside the existing ones.

**Extraction repair:** all missing `->` operators in `(ptr+i) rollNo/name/marks` have been restored. String input is bounded to 19 characters plus `\0`; the source's unbounded `%s` assumes short names. Numeric fields need `&`; the name array already becomes a pointer to its first character.

### 2.2 Cricketers: allocate strings, score, select, and free [p1 Q12] — 10 marks

```c
#include <stdio.h>
#include <stdlib.h>
struct cricketer {
    char *name, *country;
    int age, height, wickets, total_runs;
};
int main(void) {
    struct cricketer *arr;
    int n;
    scanf("%d", &n);                 /* assume n > 0 */
    arr = __A__;
    for (int i = 0; i < n; ++i) {
        arr[i].name = __B__;
        scanf("%19s", arr[i].name);
        arr[i].country = __C__;
        scanf("%19s", arr[i].country);
        scanf("%d", &arr[i].age);
        scanf("%d", &arr[i].height);
        scanf("%d", &arr[i].wickets);
        scanf("%d", &arr[i].total_runs);
    }
    int max = 0, index = 0;
    for (int i = 0; i < n; ++i) {
        int score = __D__;
        if (score > max) {
            max = score;
            index = i;
        }
    }
    printf("The cricketer with the highest score is %s from %s with a score of %d\n",
           __E__);
    for (int i = 0; i < n; ++i) {
        __F__;
        __G__;
    }
    __H__;
    return 0;
}
```

| Blank | Correct replacement | Reason |
|---|---|---|
| A | `malloc(n * sizeof *arr)` | Allocate the outer array of structs. |
| B | `malloc(20 * sizeof(char))` | Allocate a separate character buffer for this name. |
| C | `malloc(20 * sizeof(char))` | Allocate another buffer for this country. |
| D | `arr[i].wickets * arr[i].total_runs` | The defined score is their product. |
| E | `arr[index].name, arr[index].country, max` | Match the two `%s` arguments and the `%d` score. |
| F | `free(arr[i].name)` | Release the current nested name buffer. |
| G | `free(arr[i].country)` | Release the current nested country buffer. |
| H | `free(arr)` | Release the outer array last. |

Alternatives: cast each `malloc` to the appropriate pointer type; `malloc(20)` is equivalent for character buffers; F/G can be exchanged. Twenty allocated bytes hold **19 ordinary characters plus the terminator**; use 21 bytes if “20 characters” means 20 visible characters. This cleaned version bounds `%s` accordingly.

**Source repairs/caveats:** the broken `printf` string and `__E__;);` punctuation are repaired. The introductory phrase “maximum runs” contradicts the score definition and code; the answer follows **maximum wickets × runs**. Initial `max = 0` works for nonnegative scores; `>` chooses the first tied maximum. Allocation-failure checks are absent from the source; the exercise assumes success.

### 2.3 Allocate an Employee array [p5 Q7c] — 2 marks

```c
#include <stdio.h>
#include <stdlib.h>
struct Employee { int id; char name[20]; float salary; };
int main(void) {
    int n;
    printf("Enter the number of employees: ");
    scanf("%d", &n);
    struct Employee *empArray;
    empArray = __A__;
    if (empArray == NULL) {
        printf("Memory allocation failed\n");
        return 0;
    }
    /* Use the records here. */
    free(empArray);
    return 0;
}
```

**A = `malloc(n * sizeof *empArray)`**: n records need n times the size of one record, not n times the size of a pointer. Alternatives: `(struct Employee *)malloc(n * sizeof(struct Employee))` or `calloc(n, sizeof *empArray)`.

### 2.4 Vectors containing dynamically allocated arrays [p5 Q9] — 10 marks

```c
#include <stdio.h>
#include <stdlib.h>
struct Vector { int size; int *arr; };
int main(void) {
    struct Vector *v;
    int n;
    scanf("%d", &n);                 /* assume n > 0 */
    __A__;
    for (int i = 0; i < n; ++i) {
        scanf("%d", &v[i].size);
        __B__;
        for (int j = 0; j < v[i].size; ++j)
            scanf("%d", &v[i].arr[j]);
    }
    int max_sum = 0, index = 0;        /* source initialisation; see correction */
    for (int i = 0; i < n; ++i) {
        int temp_sum = 0;
        __C__;
        if (temp_sum > max_sum) {
            __D__;
        }
    }
    printf("The vector with the largest sum is %d with sum = %d.\n", index, max_sum);
    for (int i = 0; i < n; ++i) {
        __E__;
    }
    __F__;
    return 0;
}
```

| Blank | Correct replacement | Reason |
|---|---|---|
| A | `v = malloc(n * sizeof *v)` | Allocate all Vector records. |
| B | `v[i].arr = malloc(v[i].size * sizeof *v[i].arr)` | Each vector owns a separate array of integers. |
| C | `for (int j = 0; j < v[i].size; ++j) temp_sum += v[i].arr[j]` | Reset then sum the current vector's elements. |
| D | `max_sum = temp_sum; index = i` | Save both the winning value and its index. |
| E | `free(v[i].arr)` | Release each inner allocation first. |
| F | `free(v)` | Release the records after their arrays. |

**Source algorithm defect:** initial `max_sum = 0` fails when every vector sum is negative. For a fully correct reconstruction, change the comparison to `if (i == 0 || temp_sum > max_sum)`; the first vector then establishes the baseline. Example sums −5,−2 should select index 1 with sum −2, not invent a zero maximum. This fix is outside the original blanks. An alternative within block C is to append `if (i == 0) max_sum = temp_sum;` after its sum loop. With `>` ties keep the first index. Casted `malloc`/suitably sized `calloc` allocations are also acceptable.

## 3. One-dimensional arrays, search, sort, merge — HIGH

### 3.1 Array indexing in expressions [p1 Q4a–b] — 2 + 2 marks

Part (a):

```c
#include <stdio.h>
int main(void) {
    int four_to_the[5] = {1, 4, 16, 64, 256};
    for (int i = 0; i < 5; ++i)
        printf("%d ", i * four_to_the[i]);
    return 0;
}
```

Trace: i = 0→0×1=0; 1→1×4=4; 2→2×16=32; 3→3×64=192; 4→4×256=1024.

```text
0 4 32 192 1024 
```

There is one trailing space and **no newline**.

Part (b):

```c
#include <stdio.h>
int main(void) {
    int four_to_the[5] = {1, 4, 16, 64, 256};
    printf("%d", four_to_the[1] * four_to_the[4] / four_to_the[3]
                 != four_to_the[2]);
    return 0;
}
```

Trace: 4×256/64 = 16; `16 != 16` is false, whose integer value is 0. Exact output: `0` with **no newline**.

### 3.2 Remove duplicate integers, preserving order [p2 Q7] — 10 marks

```c
#include <stdio.h>
int removeDuplicates(__B__) {
    int i, j, k = 0;
    for (i = 0; i < size; ++i) {
        int found = 0;
        for (j = 0; j < k; ++j) {
            if (__C__) {
                found = 1;
                break;
            }
        }
        if (!found) {
            __D__;
            ++k;
        }
    }
    return __E__;
}
int main(void) {
    int arr[] = {1,2,2,3,4,4,4,5};
    int size = sizeof arr / sizeof arr[0];
    int newArr[size];
    int newSize = removeDuplicates(__A__);
    printf("The array with duplicates removed is: ");
    for (int i = 0; i < newSize; ++i) printf("%d ", newArr[i]);
    printf("\n");
    return 0;
}
```

| Blank | Correct replacement | Reason |
|---|---|---|
| A | `arr, size, newArr` | Pass the input, its length, and the output buffer. |
| B | `int arr[], int size, int newArr[]` | The array parameters refer to the caller's storage. |
| C | `arr[i] == newArr[j]` | Search only the k elements already accepted. |
| D | `newArr[k] = arr[i]` | Append the first occurrence of a value. |
| E | `k` | Return the number of accepted elements. |

Pointer parameter spellings `int *arr`/`int *newArr` are equivalent; changing parameter order is acceptable only if A changes consistently. Trace of k after each input: 1,2,2,3,4,4,4,5.

```text
The array with duplicates removed is: 1 2 3 4 5 
```

There is a space after 5 before the newline.

### 3.3 Selection sort of characters [p2 Q9] — 7 marks

```c
#include <stdio.h>
void selectionSort(__B__) {
    int i, j, minIndex;
    char temp;
    for (__C__) {
        minIndex = i;
        for (__D__) {
            if (arr[j] < arr[minIndex]) minIndex = j;
        }
        if (__E__) {
            temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
}
int main(void) {
    char arr[] = {'e','d','c','b','a'};
    int size = sizeof arr / sizeof arr[0];
    selectionSort(__A__);
    printf("Sorted array: ");
    for (int i = 0; i < size; ++i) printf("%c ", arr[i]);
    printf("\n");
    return 0;
}
```

| Blank | Correct replacement | Reason |
|---|---|---|
| A | `arr, size` | Supply the array and its length. |
| B | `char arr[], int size` | Elements are characters, not integers. |
| C | `i = 0; i < size - 1; ++i` | Position the minimum in each remaining prefix slot. |
| D | `j = i + 1; j < size; ++j` | Search the unsorted suffix. |
| E | `minIndex != i` | Skip a swap when the minimum is already correctly placed. |

Alternatives: B may use `char *arr`; C may use `i < size` (one harmless final pass); D may start `j = i`; E may be `i != minIndex`, `arr[i] != arr[minIndex]`, or even `1` (a harmless self-swap is permitted).

Trace: `edcba`→`adcbe`→`abcde`; the remaining positions stay sorted. Exact completed output is `Sorted array: a b c d e ` followed by a newline.

### 3.4 Selection sort of integers [p5 Q4a] — 12 marks

```c
void selectionSort(int arr[], int n) {
    int i, j, minIndex, temp;
    for (i = 0; i < __A__; ++i) {
        __B__ = i;
        for (j = __C__; j < __D__; ++j) {
            if (arr[__E__] < arr[minIndex]) minIndex = j;
        }
        __F__ = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
}
```

| Blank | Correct replacement | Reason |
|---|---|---|
| A | `n - 1` | n−1 placements suffice; the final element then fits automatically. |
| B | `minIndex` | Start by treating the first unsorted element as the minimum. |
| C | `i + 1` | Examine elements after the current position. |
| D | `n` | The last valid element has index n−1. |
| E | `j` | Compare the element currently being examined. |
| F | `temp` | Preserve arr[i] before overwriting it in the swap. |

Alternatives: A = `n` adds one harmless pass; C = `i` adds one self-comparison. `n` is the element count, so `j <= n` would access outside the array.

### 3.5 Linear search for the first character match [p3 Q9; p5 Q4b] — 5 / 4 marks

```c
#include <stdio.h>
int linearSearch(__B__) {
    int i;
    for (i = 0; i < size; ++i) {
        if (__C__) __D__;
    }
    return -1;
}
int main(void) {
    char arr[] = {'a','b','c','d','e'};
    int size = sizeof arr / sizeof arr[0];
    char key = 'c';
    int result = linearSearch(__A__);
    if (result == -1) printf("Element not found\n");
    else printf("Element found at index %d\n", result);
    return 0;
}
```

| Blank | Correct replacement | Reason |
|---|---|---|
| A | `arr, size, key` | Pass the array, number of elements, and wanted character. |
| B | `char arr[], int size, char key` | Declare the matching parameter types and names. |
| C | `arr[i] == key` | Equality identifies a matching character. |
| D | `return i` | Returning immediately guarantees the first matching index. |

Alternative B uses `char *arr`. Trace: index 0 ('a') fails, 1 ('b') fails, 2 ('c') succeeds; the function returns 2.

```text
Element found at index 2
```

### 3.6 Merge two sorted arrays [p3 Q7] — 12 marks

```c
void merge(int arr1[], int n1, int arr2[], int n2, int arr3[], int n3) {
    int i = 0, j = 0, k = 0;
    while (i < n1 && j < n2) {
        if (arr1[i] < arr2[j]) arr3[k++] = __A__;
        else arr3[k++] = __B__;
    }
    while (__C__) __D__;
    while (__E__) __F__;
}
int main(void) {
    int arr1[] = {1,3,5,7}, arr2[] = {2,4,6,8};
    int n1 = sizeof arr1 / sizeof arr1[0];
    int n2 = sizeof arr2 / sizeof arr2[0];
    int arr3[n1 + n2];
    merge(arr1, n1, arr2, n2, arr3, n1 + n2);
    return 0;
}
```

| Blank | Correct replacement | Reason |
|---|---|---|
| A | `arr1[i++]` | Copy and advance the smaller current element from the first array. |
| B | `arr2[j++]` | Otherwise copy and advance the second array's current element. |
| C | `i < n1` | Check for unused elements in the first array. |
| D | `arr3[k++] = arr1[i++]` | Copy each remaining first-array element. |
| E | `j < n2` | Check for unused elements in the second array. |
| F | `arr3[k++] = arr2[j++]` | Copy each remaining second-array element. |

Trace of copied values: 1 from arr1, 2 from arr2, 3,4,5,6,7 alternately, then the remaining 8 from arr2. Resulting `arr3` is `{1,2,3,4,5,6,7,8}`. **Exact standard output is empty:** the paper claims an output sequence, but the supplied driver has no print statement. To display it, add a loop after `merge`. `n3` is unused; callers must provide capacity at least n1+n2. Equal values are retained from both arrays: merging is not deduplication.

### 3.7 Union of two unsorted arrays [p3 Q17] — 10 marks

```c
int union1(int arr1[], int size1, int arr2[], int size2,
           int arr3[], int size3) {
    int i = 0, j = 0, k = 0, flag = 0;
    while (i < size1) {
        __A__;
        ++i;
        ++k;
    }
    i = 0;
    while (i < size2) {
        flag = 0;
        j = 0;
        while (j < k) {
            if (__B__) {
                __C__;
                break;
            }
            __D__;
        }
        if (flag == 0) {
            __E__;
            ++k;
        }
        ++i;
    }
    return k;
}
```

| Blank | Intended replacement | Reason |
|---|---|---|
| A | `arr3[k] = arr1[i]` | Start by copying the first array. |
| B | `arr2[i] == arr3[j]` | Check whether this second-array element is already present. |
| C | `flag = 1` | Remember a match so the element is not appended again. |
| D | `++j` | Continue searching the accepted elements. |
| E | `arr3[k] = arr2[i]` | Append a second-array value only when no match was found. |

Alternative B reverses the operands; D may be `j++` or `j += 1`. For the paper's example, the accepted prefix evolves `{4,3,6,7}`→skip 4→append 10, returning k=5. Unused preinitialised −1 slots remain unchanged; −1 is not used as a search sentinel.

**Source limitation:** A copies duplicates already in arr1, so these standard answers implement a true set union only when arr1 is initially unique. Duplicates in arr2 are handled. For arbitrary inputs, replace the first `while` with this corrected block (capacity still must be at least size1+size2):

```c
while (i < size1) {
    for (j = 0; j < k; ++j)
        if (arr3[j] == arr1[i]) break;
    if (j == k) arr3[k++] = arr1[i];
    ++i;
}
```

Alternatively, a correct, longer A that fits the existing skeleton is `for (j = 0; j < k; ++j) if (arr3[j] == arr1[i]) break; if (j < k) { ++i; continue; } arr3[k] = arr1[i]`. Its `continue` prevents the outer k increment for duplicates. The text mentions a driver but supplies none in the extracted Q17, so no driver output is invented.

## 4. Two-dimensional arrays and matrices — HIGH

### 4.1 Column with the minimum sum [p4 Q4] — 7 marks

```c
#include <stdio.h>
int main(void) {
    int n, m;
    scanf("%d%d", &n, &m);
    int arr[n][m];
    for (int i = 0; i < n; ++i)
        for (int j = 0; j < m; ++j) {
            __A__;
        }
    int column = -1;
    int minimum_sum = 1000000000;
    for (__B__) {
        int temp_sum = 0;
        __C__;
        if (temp_sum < minimum_sum) {
            __D__;
        }
    }
    printf("Column %d has minimum sum = %d.\n", column, minimum_sum);
    return 0;
}
```

| Blank | Correct replacement | Reason |
|---|---|---|
| A | `scanf("%d", &arr[i][j])` | Read into the address of one matrix cell. |
| B | `int j = 0; j < m; ++j` | There are m columns, regardless of the number of rows. |
| C | `for (int i = 0; i < n; ++i) temp_sum += arr[i][j]` | Hold the column fixed and sum over every row. |
| D | `minimum_sum = temp_sum; column = j` | Save both the minimum sum and its column. |

Trace for rows `{3,4,2}`, `{1,0,-5}`, `{10,8,2}`: column sums 14,12,−1; saved pair changes (0,14)→(1,12)→(2,−1).

```text
Column 2 has minimum sum = -1.
```

**Source correction:** the comment saying “largest sum” conflicts with the question and `<`; it means **minimum**. The finite sentinel 1000000000 assumes a smaller column sum exists. A general correction is `if (column == -1 || temp_sum < minimum_sum)`; this also handles sums equal to the sentinel. Keep sums within `int` range and require n,m>0. Strict `<` keeps the first tied column.

### 4.2 Print the transpose of a rectangular matrix [p3 Q10] — 7 marks

```c
#include <stdio.h>
int main(void) {
    int m, n;
    printf("Enter the number of rows: ");
    scanf("%d", &m);
    printf("Enter the number of columns: ");
    scanf("%d", &n);
    int a[m][n];
    printf("Enter the elements of the matrix:\n");
    for (int i = 0; i < m; ++i)
        for (int j = 0; j < n; ++j) scanf("%d", &a[i][j]);
    printf("The transpose of the matrix is:\n");
    for (__A__) {
        for (__B__) {
            __C__
        }
        __D__
    }
    return 0;
}
```

| Blank | Correct replacement | Reason |
|---|---|---|
| A | `int i = 0; i < n; ++i` | The transpose has n rows: one for each original column. |
| B | `int j = 0; j < m; ++j` | Each transpose row has m original-row values. |
| C | `printf("%d ", a[j][i]);` | Reverse the original row/column indices. |
| D | `printf("\n");` | End each output row. |

Alternative C: `printf("%d\t", a[j][i]);` gives a tab-separated layout. For input m=2,n=3 and rows 1 2 3 / 4 5 6, the **matrix portion** is:

```text
1 4 
2 5 
3 6 
```

Each displayed row has a trailing space. The original matrix itself is not modified.

### 4.3 Transpose a square matrix in place [p5 Q6a] — 4 marks

```c
/* N is a previously defined positive compile-time constant. */
void transpose(int mat[N][N]) {
    int temp;
    for (int i = __A__; i < __B__; ++i) {
        for (int j = __C__; j < __D__; ++j) {
            temp = mat[i][j];
            mat[i][j] = mat[j][i];
            mat[j][i] = temp;
        }
    }
}
```

**A = `0`, B = `N`, C = `i + 1`, D = `N`.** Only visit cells strictly above the diagonal; swapping (i,j) exchanges it with (j,i). Visiting the entire square would swap every pair twice and undo the transpose.

Acceptable complete alternatives: `(A,B,C,D) = (0,N,i,N)` includes harmless diagonal swaps; `(0,N,0,i)` visits only below the diagonal; `(0,N-1,i+1,N)` omits an empty last outer pass. Choose one consistent set.

### 4.4 Add unequal matrix elements, multiply equal ones [p2 Q10] — 7 marks

```c
#include <stdio.h>
int main(void) {
    int m, n, i, j;
    int mat1[100][100], mat2[100][100], result[100][100];
    scanf("%d%d", &m, &n);           /* 1 <= m,n <= 100 */
    for (i = 0; i < m; ++i)
        for (j = 0; j < n; ++j) scanf("%d", &mat1[i][j]);
    for (i = 0; i < m; ++i)
        for (j = 0; j < n; ++j) scanf("%d", &mat2[i][j]);
    for (__A__) {
        for (__B__) {
            if (__C__) {
                __D__;
            } else {
                __E__;
            }
        }
    }
    /* The paper explicitly omits the result-printing loop. */
    return 0;
}
```

| Blank | Correct replacement | Reason |
|---|---|---|
| A | `i = 0; i < m; ++i` | Visit the m rows. |
| B | `j = 0; j < n; ++j` | Visit the n columns within each row. |
| C | `mat1[i][j] != mat2[i][j]` | Different values must be added. |
| D | `result[i][j] = mat1[i][j] + mat2[i][j]` | Store the addition in the corresponding result cell. |
| E | `result[i][j] = mat1[i][j] * mat2[i][j]` | Equal values must be multiplied. |

Alternative paired answer: C uses `==`, D uses multiplication, E uses addition. Do not reverse the condition without also reversing both branches.

### 4.5 Store and print a tree in an 8×5 array [p1 Q7] — 10 marks

```c
#include <stdio.h>
int main(void) {
    char array[8][5] = {
        "     ", "     ", "     ", "     ",
        "     ", "     ", "     ", "     "
    };
    int i, j;
    for (i = 0; i < 5; ++i) {
        for (j = 0; j < 5; ++j) {
            if (__A__) array[i][j] = __B__;
            else array[i][j] = __C__;
        }
    }
    for (__D__) array[i][2] = '|';
    for (__E__) {
        for (__F__) printf("%c", array[i][j]);
        printf("\n");
    }
    return 0;
}
```

| Blank | Correct replacement | Reason |
|---|---|---|
| A | `j % 2 == 0` | Displayed columns 1,3,5 are indices 0,2,4. |
| B | `'*'` | Even column indices hold asterisks. |
| C | `'#'` | Odd column indices hold hashes. |
| D | `i = 5; i < 8; ++i` | Put the trunk in the final three rows. |
| E | `i = 0; i < 8; ++i` | Print every row. |
| F | `j = 0; j < 5; ++j` | Print every column. |

Alternative consistent triple: A = `j % 2 != 0`, B = `'#'`, C = `'*'`. **Reconstruction:** the source's space-filled initialiser is badly broken. Each reconstructed row has exactly five space characters; these rows are cells, not null-terminated strings. The question's prose says A–E, but there is also an F blank, answered here.

```text
*#*#*
*#*#*
*#*#*
*#*#*
*#*#*
  |  
  |  
  |  
```

The last three lines have two leading and two trailing spaces; there is no extra blank row between canopy and trunk in this code.

### 4.6 Character matrix indexing [p1 Q4d] — 2 marks

```c
#include <stdio.h>
int main(void) {
    char matrix[5][5] = {"xyz", "dtf", "alt", "pyb", "mna"};
    printf("%c%c%c%c\n", matrix[2][0], matrix[1][1],
           matrix[2][1], matrix[4][2]);
    return 0;
}
```

Trace: row 2, column 0→'a'; row 1, column 1→'t'; row 2, column 1→'l'; row 4, column 2→'a'. Exact output:

```text
atla
```

## 5. Strings and character handling — HIGH

### 5.1 String indexing and length [p1 Q4c] — 2 marks

```c
#include <stdio.h>
#include <string.h>
int main(void) {
    char sample[20] = "Comprehensive";
    char a = sample[5];
    char b = sample[strlen(sample) - 6];
    if (b == a) printf("Same");
    else printf("Different");
    return 0;
}
```

Trace: indices are C0,o1,m2,p3,r4,e5,h6,e7,n8,s9,i10,v11,e12. Length=13, so b=sample[7]='e'; a=sample[5]='e'. Exact output: `Same`, **no newline**. `strlen` excludes the terminating `\0`.

### 5.2 Calling `toupper` does not change the array by itself [p1 Q4e] — 2 marks

```c
#include <stdio.h>
#include <ctype.h>
int main(void) {
    char str[20] = "Kwisatz Haderach";
    toupper(str[5]);
    toupper(str[12]);
    toupper(str[7]);
    printf("%s", str);
    return 0;
}
```

Trace: indices 5,12,7 hold 't','r',' '. The calls return 'T','R',' ', respectively, but none is assigned back. The array stays unchanged. Exact output: `Kwisatz Haderach`, **no newline**. To modify a character use `str[i] = toupper((unsigned char)str[i]);`.

### 5.3 Uppercase even indices, lowercase odd indices [p2 Q11] — 7 marks

```c
#include <stdio.h>
#include <ctype.h>
int main(void) {
    int size, i = 0;
    char name[50];
    printf("Enter a string: ");
    scanf("%49s", name);
    while (name[i] != '\0') ++i;
    size = i;
    printf("\nOriginal Name: %s\n", name);
    for (__A__) {
        if (__B__) {
            if (__C__) name[i] = __D__;
        } else {
            if (__E__) name[i] = __F__;
        }
    }
    printf("Alternate Toggled Name: %s\n", name);
    return 0;
}
```

| Blank | Correct replacement | Reason |
|---|---|---|
| A | `i = 0; i < size; ++i` | Restart at zero after measuring the length. |
| B | `i % 2 == 0` | The first, third, etc. characters have even zero-based indices. |
| C | `islower((unsigned char)name[i])` | Convert an even-index character if it is lowercase. |
| D | `toupper((unsigned char)name[i])` | Store the uppercase return value. |
| E | `isupper((unsigned char)name[i])` | Convert an odd-index character if it is uppercase. |
| F | `tolower((unsigned char)name[i])` | Store the lowercase return value. |

Equivalent tests: B = `!(i % 2)`; ASCII range tests can replace C/E. Since case-conversion functions leave other characters unchanged, C/E may also both be `1`. For ordinary ASCII letters the unsigned-char casts may be omitted; the casts make ctype calls safe for other byte values. `%49s` bounds the source's `%s` to the array capacity. Checks: `Police`→`PoLiCe`; `malayalam`→`MaLaYaLaM`.

### 5.4 Toggle every alphabet's case [p3 Q11] — 8 marks

```c
#include <stdio.h>
#include <ctype.h>
int main(void) {
    int size, i = 0;
    char name[50];
    printf("Enter a String: \n");
    name[0] = getchar();
    while (name[i] != '\n') {        /* assume a short line and no EOF */
        ++i;
        name[i] = getchar();
    }
    name[i] = '\0';                 /* repaired: source has name[i + 1] */
    size = i;
    printf("\nOriginal Name: %s\n", name);
    for (__A__) {
        if (__B__) name[i] = __C__;
        else name[i] = __D__;
    }
    printf("Toggled Name: %s\n", name);
    return 0;
}
```

| Blank | Correct replacement | Reason |
|---|---|---|
| A | `i = 0; i < size; ++i` | Visit exactly the input letters. |
| B | `islower((unsigned char)name[i])` | Identify lowercase characters. |
| C | `toupper((unsigned char)name[i])` | Lowercase becomes uppercase. |
| D | `tolower((unsigned char)name[i])` | The remaining uppercase letters become lowercase. |

Alternative consistent B/C/D: `isupper((unsigned char)name[i])`, `tolower((unsigned char)name[i])`, `toupper((unsigned char)name[i])`. Input is assumed alphabetic. **Source defect:** `name[i+1]='\0'` leaves the input newline at `name[i]`; its original `%s\n` printouts therefore each include an extra newline. The cleaned version terminates at `name[i]` instead. Example: `AbC`→`aBc`. The original input loop also lacks bounds/EOF handling; a bounded `fgets` is preferable outside this exercise.

### 5.5 Uppercase every third character [p5 Q6b] — 2 marks

```c
#include <stdio.h>
#include <string.h>
#include <ctype.h>
void func(char *str) {
    int len = strlen(str);
    for (int i = 2; i < len; i += 3) {
        if (islower(str[i])) str[i] = toupper(str[i]);
    }
}
int main(void) {
    char str[100];
    strcpy(str, "bakemonogatari");
    func(str);
    printf("%s\n", str);
    return 0;
}
```

Trace: `bakemonogatari` has indices b0,a1,k2,e3,m4,o5,n6,o7,g8,a9,t10,a11,r12,i13. The loop changes indices **2,5,8,11**: k→K, o→O, g→G, a→A. Exact output:

```text
baKemOnoGatAri
```

### 5.6 Concatenate strings: the printed skeleton is defective [p5 Q6c] — 4 marks

The original structure, with its blanks intact:

```c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
int main(void) {
    char first[4][15] = {"bake", "nise", "neko", "hana"};
    char second[20] = "monogatari";
    char *temp = __A__(sizeof(char) * 30);
    for (int i = 0; i < 4; ++i) {
        temp = __B__(first[i], second);
        __C__(temp, __D__);
        printf("%s\n", temp);
    }
    free(temp);
    return 0;
}
```

A plausible intended key is **A=`malloc`, B=`strcat`, C=`strcpy`, D=`first[i]`**, but **that is not a correct C solution**. `strcat(first[i], second)` returns `first[i]`, replacing and leaking the allocated pointer. The following `strcpy(temp, first[i])` then copies overlapping storage onto itself, and the final `free(temp)` attempts to free an automatic array row. There is no guaranteed exact output for that completion. `strcat` returns its destination; it does not allocate a new result. The overlap rule is specified in the [WG14 C draft, §7.24.2.3](https://www.open-std.org/jtc1/sc22/wg14/www/docs/n2310.pdf).

**Corrected reconstruction:** change the first loop statement's arguments to use the allocated buffer, then append the suffix:

```c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
int main(void) {
    char first[4][15] = {"bake", "nise", "neko", "hana"};
    char second[20] = "monogatari";
    char *temp = __A__(sizeof(char) * 30);
    if (temp == NULL) return 1;
    for (int i = 0; i < 4; ++i) {
        temp = __B__(temp, first[i]); /* repaired destination/source */
        __C__(temp, __D__);
        printf("%s\n", temp);
    }
    free(temp);
    return 0;
}
```

| Blank | Correct replacement in repaired code | Reason |
|---|---|---|
| A | `malloc` | Allocate writable space for the concatenated string. |
| B | `strcpy` | Reset the buffer to the next prefix, including its terminator. |
| C | `strcat` | Append after that terminator, leaving a new terminator at the end. |
| D | `second` | Use the shared suffix. |

Trace: each iteration first replaces temp with `bake`/`nise`/`neko`/`hana`, then adds the 10-letter suffix. Each result has 14 letters plus `\0`, which fits 30 bytes. Exact **repaired-program** output:

```text
bakemonogatari
nisemonogatari
nekomonogatari
hanamonogatari
```

### 5.7 Word-guessing game [p1 Q14] — 6 marks

```c
#include <stdio.h>
#include <string.h>
#include <ctype.h>
#define MAX_GUESSES 6
int main(void) {
    char secret_word[20], guessed_word[20], guessed_letters[26] = {0};
    int num_guesses = 0, num_incorrect_guesses = 0;
    printf("Enter a secret word: ");
    scanf("%19s", secret_word);
    int word_length = strlen(secret_word);
    for (int i = 0; i < word_length; ++i) guessed_word[i] = '_';
    guessed_word[word_length] = '\0';
    printf("Welcome to the word guessing game!\n");
    printf("The secret word has %d letters. You have %d guesses to guess the word.\n",
           word_length, MAX_GUESSES);
    while (num_guesses < __A__ && strcmp(secret_word, guessed_word) != 0) {
        printf("\nCurrent guess: %s\n", guessed_word);
        printf("Guess a letter: ");
        char guess;
        scanf(" %c", &guess);
        guess = tolower((unsigned char)guess);
        if (!isalpha((unsigned char)guess)) {
            printf("Invalid guess. Please enter a letter.\n");
            continue;
        }
        if (strchr(guessed_letters, guess)) {
            printf("You already guessed that letter. Please try again.\n");
            __B__;
        }
        guessed_letters[num_guesses] = guess;
        ++num_guesses;
        int correct_guess = 0;
        for (int i = 0; i < word_length; ++i) {
            if (secret_word[i] == guess) {
                __C__;
                correct_guess = 1;
            }
        }
        if (correct_guess) printf("Correct guess!\n");
        else {
            __D__;
            printf("Incorrect guess! You have %d guesses left.\n",
                   MAX_GUESSES - num_guesses);
        }
    }
    if (strcmp(secret_word, guessed_word) == 0)
        printf("\nCongratulations! You guessed the word %s in %d guesses.\n",
               secret_word, num_guesses);
    else
        printf("\nSorry, you ran out of guesses. The word was %s.\n", secret_word);
    return 0;
}
```

| Blank | Correct replacement | Reason |
|---|---|---|
| A | `MAX_GUESSES` | Stop after six accepted, distinct letter guesses. |
| B | `continue` | A repeated letter should not consume an attempt. |
| C | `guessed_word[i] = guess` | Reveal every matching position in the secret. |
| D | `++num_incorrect_guesses` | Count accepted guesses that match no position. |

Alternatives: A=`6`; C=`guessed_word[i] = secret_word[i]`; D=`num_incorrect_guesses += 1`. The initial zeroes after the written letters keep `guessed_letters` terminated within the six-guess cap. `%19s` and ctype casts are small input-safety cleanups to the source.

**Behavior caveats:** the printed code limits **total accepted guesses**, including correct guesses, not six wrong guesses; D is only a statistic. It lowercases guesses but not the secret, so assume a lowercase secret or normalise it too. `%c` reads one character and does not validate that an entire submitted line contains only one letter. No exact complete game output is possible without a secret and a guess sequence.

## 6. File handling — HIGH

### 6.1 Merge usernames and emails through a struct array [p1 Q6] — 7 marks

```c
#include <stdio.h>
#include <stdlib.h>
typedef struct { char username[30]; char email[30]; } Student;
Student *create_record(int count) {
    FILE *fp1, *fp2;
    __A__
    Student *rec = malloc(count * sizeof(Student));
    for (__B__) {
        fgets(rec[i].username, 30, fp1);
        fgets(rec[i].email, 30, fp2);
    }
    fclose(fp1);
    fclose(fp2);
    return rec;
}
void store_record(Student *rec, int count) {
    FILE *fp;
    __C__
    for (__D__) {
        fputs(rec[i].username, fp);
        fputs(rec[i].email, fp);
    }
    fclose(fp);
}
int main(void) {
    int n = 5;
    Student *rec = create_record(n);
    store_record(rec, n);
    free(rec);                       /* cleanup added to the source */
    return 0;
}
```

| Blank | Correct replacement | Reason |
|---|---|---|
| A, exactly two lines | `fp1 = fopen("dataU.txt", "r");` then `fp2 = fopen("dataE.txt", "r");` | Open both existing inputs for reading. |
| B | `int i = 0; i < count; ++i` | Read one matching username/email pair per record. |
| C, one line | `fp = fopen("result/dataW.txt", "w");` | Create/truncate the merged output in the result subdirectory. |
| D | `int i = 0; i < count; ++i` | Write pairs in their original matching order. |

Alternative Windows path: `"result\\dataW.txt"`. The `result` directory must already exist: `fopen` does not create directories. `fgets` keeps an input newline; `fputs` adds none. For short, newline-terminated records, the file alternates username then email on successive lines. For the two-record example (use count=2):

```text
john_doe
john.doe@gmail.com
sumit_gupta
sumit_1983@gmail.com
```

If a username lacks its final newline or an input line exceeds 29 characters, the unmodified program may join/split records. The exercise assumes five valid records fitting the buffers. File/allocator checks would be needed for arbitrary inputs. This program prints nothing to standard output.

### 6.2 Read ten integers and write minimum/maximum files [p2 Q15] — 12 marks

```c
#include <stdio.h>
int main(void) {
    FILE *fp_in = __A__;
    FILE *max_out = __B__;
    FILE *min_out = __C__;
    int min_element = 1000000000;
    int max_element = -1000000000;
    int temp_element;
    for (int i = 0; i < 10; ++i) {
        fscanf(__D__);
        if (temp_element > max_element) { __E__; }
        if (temp_element < min_element) { __F__; }
    }
    fprintf(max_out, "%d", max_element);
    fprintf(min_out, "%d", min_element);
    fclose(fp_in);
    fclose(max_out);
    fclose(min_out);
    return 0;
}
```

| Blank | Correct replacement | Reason |
|---|---|---|
| A | `fopen("data.in", "r")` | Open the existing input without changing it. |
| B | `fopen("maxElement.txt", "w")` | Create/truncate the maximum-output file. |
| C | `fopen("minElement.txt", "w")` | Create/truncate the minimum-output file. |
| D | `fp_in, "%d", &temp_element` | Read an integer into its address. |
| E | `max_element = temp_element` | Replace the maximum when a larger integer is seen. |
| F | `min_element = temp_element` | Replace the minimum when a smaller integer is seen. |

Trace for 1,2,10,−9,20,3,−4,25,15,−1:

| Read | Running minimum | Running maximum |
|---:|---:|---:|
| 1 | 1 | 1 |
| 2 | 1 | 2 |
| 10 | 1 | 10 |
| −9 | −9 | 10 |
| 20 | −9 | 20 |
| 3 | −9 | 20 |
| −4 | −9 | 20 |
| 25 | −9 | 25 |
| 15 | −9 | 25 |
| −1 | −9 | 25 |

Exact file contents: `maxElement.txt` = `25`; `minElement.txt` = `-9`, **neither with a newline**. Standard output is empty. The fixed sentinels work for these data; a general solution reads the first value to initialise both extrema, then processes the remaining nine values.

### 6.3 Append one file's contents to another [p3 Q16; p4 Q9] — 4 marks in each

```c
#include <stdio.h>
int main(void) {
    char buff[500];
    FILE *fp1 = fopen("dataR.txt", "r");
    FILE *fp2 = fopen("dataW.txt", "a");
    fputs("\n", fp2);
    while (fgets(buff, 500, fp1) != NULL) fputs(buff, fp2);
    fclose(fp1);
    fclose(fp2);
    return 0;
}
```

Initial contents, with no unstated trailing newlines: `dataR.txt` = `Hello World`; `dataW.txt` = `How are you?`.

Trace: read mode leaves dataR unchanged; append mode preserves dataW; first append a newline; `fgets` reads `Hello World`; `fputs` appends those characters; the next read reaches EOF. Final `dataR.txt` is exactly `Hello World` (no newline). Final `dataW.txt` is:

```text
How are you?
Hello World
```

There is **no newline after World**, and standard output is empty. If an initial file already has a trailing newline, that existing newline is preserved; the display above follows the literal contents stated in the question.

### 6.4 Sum corresponding integers from two files [p5 Q8] — 10 marks

```c
#include <stdio.h>
int main(void) {
    FILE *fp1, *fp2;
    __A__;
    FILE *fout;
    __B__;
    for (int i = 0; i < 5; ++i) {
        int in1, in2, res;
        __C__;
        res = in1 + in2;
        __D__;
    }
    __E__;
    return 0;
}
```

| Blank | Correct replacement | Reason |
|---|---|---|
| A | `fp1 = fopen("data1.in", "r"); fp2 = fopen("data2.in", "r")` | Open both inputs for reading. |
| B | `fout = fopen("result.txt", "w")` | Create or replace the result file. |
| C | `fscanf(fp1, "%d", &in1); fscanf(fp2, "%d", &in2)` | Read the next corresponding pair into integer addresses. |
| D | `fprintf(fout, "%d\n", res)` | Write each sum followed by a line break. |
| E | `fclose(fp1); fclose(fp2); fclose(fout)` | Close all three streams. |

Trace: 1+7=8; 3+4=7; 2+(−3)=−1; 5+0=5; −10+2=−8. Exact `result.txt` contents:

```text
8
7
-1
5
-8
```

There is a final newline. The program has no standard output. Input closing order can be exchanged; all streams must be closed.

## 7. Pointer arithmetic and modifying caller data — HIGH

### 7.1 Pointer post-decrement, subtraction, and dereferencing [p2 Q13] — 5 marks

```c
#include <stdio.h>
int main(void) {
    int arr[] = {2,4,6,8,10};
    int *ptr = arr + 4;
    int *ptr1 = arr;
    int *ptr2 = arr + 3;
    printf("A :%d\n", *ptr);
    printf("B : %d\n", *ptr--);
    printf("C : %d\n", *ptr);
    printf("D : %td\n", ptr2 - ptr1); /* portable correction from %ld */
    printf("E : %d\n", *ptr2 - *ptr1);
    return 0;
}
```

Trace: ptr starts at index 4→10. `*ptr--` means `*(ptr--)`: print the old pointed value 10, then move ptr to index 3. C therefore prints 8. `ptr2-ptr1` counts elements, giving 3; `*ptr2-*ptr1` subtracts values, giving 8−2=6.

```text
A :10
B : 10
C : 8
D : 3
E : 6
```

**Portability repair:** pointer subtraction has type `ptrdiff_t`; `%td` prints it correctly. The source's `%ld` is correct only on implementations where that result's type is `long`; elsewhere the format/type mismatch is undefined behavior. The intended numbers above follow the corrected format.

### 7.2 Value addition versus pointer addition [p3 Q13] — 3 marks

```c
#include <stdio.h>
int main(void) {
    int arr[] = {2,4,6,8,10};
    int *ptr = arr;
    printf("A : %d\n", *ptr + 2);
    printf("B : %d\n", *(ptr + 2));
    printf("C : %d\n", *ptr + *(ptr + 2));
    return 0;
}
```

Trace: `*ptr=2`; A adds 2 to that value→4; B moves two elements before dereferencing→arr[2]=6; C adds 2+6→8. Exact output:

```text
A : 4
B : 6
C : 8
```

### 7.3 Aliasing two pointers to the same array cell [p5 Q7a] — 4 marks

```c
#include <stdio.h>
int main(void) {
    int arr[] = {10,20,30,40};
    int *ptr1 = &arr[0], *ptr2 = &arr[2];
    printf("A: %d\n", *ptr1);
    ptr1 = ptr2;
    printf("B: %d\n", *ptr1);
    *ptr2 = 50;
    printf("C: %d\n", arr[2]);
    printf("D: %d\n", *(ptr1 + 1));
    return 0;
}
```

Trace: A reads arr[0]=10; pointer assignment makes ptr1 point to arr[2], so B=30; storing through ptr2 changes arr[2] to 50, so C=50; ptr1+1 points to arr[3], so D=40.

```text
A: 10
B: 30
C: 50
D: 40
```

### 7.4 Swap by pointer versus swapping local copies [p3 Q14] — 4 marks

```c
#include <stdio.h>
void swapByValue(int x, int y) {
    int temp = x; x = y; y = temp;
}
void swapByReference(int *x, int *y) {
    int temp = *x; *x = *y; *y = temp;
}
int main(void) {
    int a = 5, b = 10;
    printf("A : Before swap by reference: a = %d, b = %d\n", a, b);
    swapByReference(&a, &b);
    printf("B : After swap by reference: a = %d, b = %d\n", a, b);
    printf("C : Before swap by value: a = %d, b = %d\n", a, b);
    swapByValue(a, b);
    printf("D : After swap by value: a = %d, b = %d\n\n", a, b);
    return 0;
}
```

Trace: a,b begin 5,10; writes through their addresses change them to 10,5. The second function swaps only its local copies, leaving a,b at 10,5.

```text
A : Before swap by reference: a = 5, b = 10
B : After swap by reference: a = 10, b = 5
C : Before swap by value: a = 10, b = 5
D : After swap by value: a = 10, b = 5

```

The final `\n\n` produces an extra empty line. C passes all arguments by value; passing copied pointer values lets a function modify the pointed-to caller objects. “By reference” is the paper's informal name for that technique.

### 7.5 Both array-parameter forms modify the original array [p2 Q14] — 3 marks

```c
#include <stdio.h>
void modifyArrayByValue(int a[], int size) {
    for (int i = 0; i < size; ++i) a[i] *= 2;
}
void modifyArrayByReference(int *a, int size) {
    for (int i = 0; i < size; ++i) *(a + i) *= 2;
}
int main(void) {
    int arr[5] = {1,2,3,4,5};
    int size = sizeof arr / sizeof arr[0];
    printf("A : Array elements before modification by value:\n");
    for (int i = 0; i < size; ++i) printf("%d ", arr[i]);
    printf("\n");
    modifyArrayByReference(arr, size);
    printf("B : Array elements after modification by reference:\n");
    for (int i = 0; i < size; ++i) printf("%d ", arr[i]);
    printf("\n");
    modifyArrayByValue(arr, size);
    printf("C: Array elements after modification by value:\n");
    for (int i = 0; i < size; ++i) printf("%d ", arr[i]);
    printf("\n");
    return 0;
}
```

Trace: the pointer-form function doubles the original elements to 2,4,6,8,10. An array parameter `int a[]` is adjusted to `int *a`; despite its name, the other function doubles that same storage again to 4,8,12,16,20.

```text
A : Array elements before modification by value:
1 2 3 4 5 
B : Array elements after modification by reference:
2 4 6 8 10 
C: Array elements after modification by value:
4 8 12 16 20 
```

Each number line has a trailing space. Broken string lines in the extraction have been joined; no semantic change is made.

### 7.6 Store sum and absolute difference through pointers [p5 Q7b] — 6 marks

```c
#include <stdio.h>
void update(int *a, int *b) {
    int sum = __A__;
    int abs_diff;
    if (*a > *b) abs_diff = __B__;
    else abs_diff = __C__;
    *a = sum;
    *b = abs_diff;
}
int main(void) {
    int a, b;
    int *pa = &a, *pb = &b;
    scanf("%d %d", &a, &b);
    update(pa, pb);
    printf("%d\n%d", a, b);
    return 0;
}
```

| Blank | Correct replacement | Reason |
|---|---|---|
| A | `*a + *b` | Compute the sum from the two original values. |
| B | `*a - *b` | When a's value is larger, subtract the smaller b value. |
| C | `*b - *a` | Otherwise reverse the subtraction to avoid a negative result. |

Parenthesised forms are equivalent. Saving both results before either store prevents the first update from corrupting the second calculation. Example input `4 5` produces `9\n1` (no final newline). The two pointers in this driver refer to distinct integers; assume representable sums and differences.

## 8. Loops, digits, number tests, and printed patterns — HIGH

### 8.1 Cube-of-digits numbers from 1 to 1000 [p1 Q10] — 5 marks

```c
#include <stdio.h>
#define n __A__
long long int sum_of_cubes_of_digits(int k) {
    __B__ sum = 0;
    int current_last_digit;
    while (k > 0) {
        current_last_digit = __C__;
        sum += __D__;
        k /= 10;
    }
    return sum;
}
int main(void) {
    for (int i = 1; i <= n; ++i)
        __E__
            printf("%d\n", i);
    printf("\n");
    return 0;
}
```

| Blank | Correct replacement | Reason |
|---|---|---|
| A | `1000` | Include candidates 1 through 1000. |
| B | `long long int` | This matches the function's result type. |
| C | `k % 10` | Remainder by 10 extracts the last decimal digit. |
| D | `current_last_digit * current_last_digit * current_last_digit` | Cube the digit using multiplication; `^` is XOR in C. |
| E | `if (sum_of_cubes_of_digits(i) == i)` | Print a candidate only when it equals its digit-cube sum. |

B is **not unique**: `long long`, `long`, `int`, or corresponding unsigned integer types also hold these small sums; `int` suffices here. Do not initialise any additional variables, as the question forbids them.

Trace for 153: digit 3→sum27,k15; digit5→sum152,k1; digit1→sum153,k0. Qualifying candidates are 1,153,370,371,407. Exact output:

```text
1
153
370
371
407

```

The extra final `printf("\n")` adds an empty line. **Definition caveat:** this question explicitly tests the sum of **cubes**, not the general digit-count-power Armstrong definition. Thus 2–9 do not qualify here, although they are general one-digit Armstrong numbers. Zero satisfies the cube test but is outside the printed range.

### 8.2 Check a number against its digit-cube sum [p4 Q3c] — 4 marks

```c
#include <stdio.h>
int main(void) {
    int x, y, total = 0, buff;
    printf("Please enter a number: ");
    scanf("%d", &x);
    buff = x;
    __A__
    {
        y = x % 10;
        total = total + y * y * y;
        x = x / 10;
    }
    __B__
        printf("Number is Armstrong ");
    else
        printf("Number is not an Armstrong number");
    return 0;
}
```

**A = `while (x > 0)`; B = `if (total == buff)`.** Save the original value because repeated `/10` destroys x. Alternative A `while (x != 0)` works for the intended nonnegative inputs. For 123, total=27+8+1=36≠123, so reject; for 153, total=27+125+1=153, so accept.

**Source mismatch:** its prose defines general Armstrong numbers, but its fixed body cubes every digit. The answer checks cube-of-digits equality (the usual three-digit exercise), not the full general definition. The sample prompt “Please provide an input” also differs from the actual `printf`. No final newline is printed; the success message has a trailing space. For input 153, stdout is exactly `Please enter a number: Number is Armstrong `, excluding terminal input echo.

### 8.3 Sum the digits of an integer [p2 Q6] — 5 marks

```c
#include <stdio.h>
int main(void) {
    int num, sum, rem;
    printf("Enter a Number : ");
    scanf("%d", &num);
    sum = 0;
    while (__A__) {
        rem = __B__;
        sum = sum + rem;
        num = __C__;
    }
    printf("\nThe sum of digits is %d", __D__);
    return 0;
}
```

| Blank | Correct replacement | Reason |
|---|---|---|
| A | `num > 0` | Continue while positive decimal digits remain. |
| B | `num % 10` | Extract the current last digit. |
| C | `num / 10` | Integer division removes that digit. |
| D | `sum` | Print the accumulated digits, not the now-zero input. |

Alternative A `num != 0` is equivalent for nonnegative inputs. For negative inputs it computes a negative digit sum unless magnitude is handled separately. Trace for 12345: (rem,sum,num-after-division) = (5,5,1234),(4,9,123),(3,12,12),(2,14,1),(1,15,0).

Exact stdout, excluding echoed input, is `Enter a Number : \nThe sum of digits is 15` with no final newline.

### 8.4 Print primes up to n, excluding 1 [p1 Q9] — 5 marks

```c
#include <stdio.h>
int prime(int n) {
    int i = 1, num_factors = 0;
    while (i <= n) {
        if (n % i == 0) ++num_factors;
        if (num_factors > 2) __A__;
        __B__;
    }
    if (num_factors > 2) return __C__;
    else return __D__;
}
int main(void) {
    int n;
    scanf(" %d", &n);
    __E__
        if (prime(i)) printf("%d\n", i);
    return 0;
}
```

| Blank | Correct replacement | Reason |
|---|---|---|
| A | `break` | A third divisor is already enough to reject a candidate. |
| B | `++i` | Try the next possible divisor. |
| C | `0` | More than two divisors means non-prime. |
| D | `num_factors == 2` | Exactly two positive divisors are required; 1 has only one. |
| E | `for (int i = 1; i <= n; ++i)` | Visit the requested range 1 through n. |

**Paired alternative:** D=`1` and E=`for (int i = 2; i <= n; ++i)` correctly print the primes in the range, but that version of `prime` itself incorrectly reports `prime(1)` as true. Prefer the complete predicate above. A=`return 0` is another valid single-statement early rejection; `i++` is equivalent for B. Trace: n=1 has one divisor→false; 2 has two→true; 4 finds 1,2,4→false. For input 10, output is 2,3,5,7, each on a separate line.

### 8.5 Fibonacci values not exceeding a limit [p3 Q6] — 5 marks

```c
#include <stdio.h>
int main(void) {
    int i, n, j, k;
    printf("Enter the limit : ");
    scanf("%d", &n);
    i = 0; j = 1;
    printf("%d %d", i, j);
    __A__;
    while (__B__) {
        printf(" %d", k);
        __C__;
        __D__;
        k = i + j;
    }
    return 0;
}
```

| Blank | Correct replacement | Reason |
|---|---|---|
| A | `k = i + j` | Compute the first pending value, 1. |
| B | `k <= n` | Include the last Fibonacci value equal to the limit. |
| C | `i = j` | Advance the older term to the previous newer term. |
| D | `j = k` | Advance the newer term to the value just printed. |

Do not exchange C/D: their assignment order matters. Trace after each shift: (i,j,k-next)=(1,1,2),(1,2,3),(2,3,5),(3,5,8),(5,8,13). For input 10, exact stdout is `Enter the limit : 0 1 1 2 3 5 8`, with no final newline. Limit 15 appends 13; limit 55 ends with 34 55. **Source limitation:** initial `0 1` is printed unconditionally, so the advertised rule requires n≥1; n=0 wrongly includes 1. Avoid limits that make the next sum overflow `int`.

### 8.6 Integer power by repeated multiplication [p4 Q1c] — 5 marks

```c
#include <stdio.h>
int main(void) {
    int base, exponent, i;
    long int power = 1;
    printf("Base of the number is: ");
    scanf("%d", &base);
    printf("Exponent of the number is: ");
    scanf("%d", &exponent);
    for (__A__) {
        __B__;
    }
    printf("%d %d %ld", base, exponent, power);
    return 0;
}
```

**A = `i = 0; i < exponent; ++i`; B = `power *= base`.** Multiply exactly exponent times, starting with the multiplicative identity1. Alternative A=`i = 1; i <= exponent; ++i`; B=`power = power * base`.

Trace for base 5,exponent 3: power 1→5→25→125. Exact stdout excluding input echo: `Base of the number is: Exponent of the number is: 5 3 125` (no newline). **Format repair:** the source declares `long int power` but prints it with `%lld`; use `%ld`, or change the declaration to `long long int` and retain `%lld`. The mismatched original has undefined behavior. This loop handles nonnegative exponents only; exponent 0 returns 1.

### 8.7 Pascal triangle [p1 Q3] — 6 marks

```c
#include <stdio.h>
int main(void) {
    int rows = 5, num = 1, space, i, j;
    for (i = 0; i < rows; ++i) {
        for (space = 1; space <= rows - i; ++space) printf(__A__);
        for (j = 0; j <= i; ++j) {
            if (j == 0 || i == 0) num = __B__;
            else num = num * (i - j + 1) / j;
            printf("%d", num);
            printf(" ");
        }
        printf(__C__);
    }
    return 0;
}
```

**A = `" "`; B = `1`; C = `"\n"`.** Start each row with 1; end each row with a newline. Each next entry is the previous binomial coefficient times `(i-j+1)/j`. A controls indentation, so other space widths are possible if the required visual alignment changes.

For the selected single-space A, rows i=0–4 contain 1 / 1 1 / 1 2 1 / 1 3 3 1 / 1 4 6 4 1. Exact output:

```text
     1 
    1 1 
   1 2 1 
  1 3 3 1 
 1 4 6 4 1 
```

Every number has a following space. **Source inconsistency:** the illustration includes a sixth row `1 5 10 10 5 1`, but `rows=5` prints only five rows. Set `rows=6` outside the blanks to obtain all six illustrated rows; that also changes indentation.

### 8.8 Alternating number lines and plus/minus lines [p1 Q8] — 8 marks

```c
#include <stdio.h>
int main(void) {
    int n, i, k, num, symbols;
    __A__;
    __B__ {
        if (i % 2 == 0) {
            num = __C__;
            printf("%d\n", num);
        } else {
            symbols = __D__;
            for (k = 0; k < symbols; ++k) {
                switch (__E__) {
                    case 1: printf("+"); break;
                    case 3: printf("-"); break;
                    default: break;
                }
            }
            printf("\n");
        }
    }
    return 0;
}
```

| Blank | Correct replacement | Reason |
|---|---|---|
| A | `scanf("%d", &n)` | Read the requested count. |
| B | `for (i = 0; i < 2 * n; ++i)` | Each number requires a number line and a symbol line. |
| C | `i / 2 + 1` | Even indices 0,2,4,... correspond to numbers1,2,3,... |
| D | `i` | Odd indices 1,3,5,... give the required symbol counts. |
| E | `i % 4` | Odd lines alternate case 1 ('+') and case 3 ('−'). |

Equivalent expressions for C include `(i + 2) / 2`; D may be `2 * ((i + 1) / 2) - 1` for these odd i values. For n = 4, trace i=0:number1;1:one+;2:number2;3:three−;4:number3;5:five+;6:number4;7:seven−.

```text
1
+
2
---
3
+++++
4
-------
```

For n = 1 only the first two lines print; n = 5 adds `5` and nine pluses.

### 8.9 Triangle of consecutive integers [p2 Q5] — 5 marks

```c
#include <stdio.h>
int main(void) {
    int x = 1, i, j;
    for (i = 1; i <= 5; ++i) {
        for (j = 1; j <= 5; ++j) {
            if (__A__) {
                printf("%d ", __B__);
                __C__;
            } else __D__
        }
        printf("\n");
    }
    return 0;
}
```

**A = `j <= i`; B = `x`; C = `++x`; D = `printf(" ");`.** Row i prints i consecutive numbers; later columns print spaces. Alternative D=`printf("  ");` changes only the unused trailing padding, or `;` is a valid empty statement if trailing spaces are irrelevant. A coordinated alternative is B=`x++`, C=`(void)0`, but the simple separate increment best matches the skeleton.

Number portions by row are `1`, `2 3`, `4 5 6`, `7 8 9 10`, `11 12 13 14 15`. **Extraction note:** the displayed `56` is interpreted as the separately printed values 5 and 6; `printf("%d ")` always separates them. The last number on each row has a following space, plus the chosen else-padding.

### 8.10 Alternating rows of ones and zeroes [p3 Q5] — 5 marks

```c
#include <stdio.h>
int main(void) {
    int x = 1, y = 0, i, j;
    for (__A__) {
        for (__B__) {
            if (__C__) printf("%d", x);
            else printf("%d", y);
        }
        __D__
    }
    return 0;
}
```

**A = `i = 1; i <= 5; ++i`; B = `j = 1; j <= 5; ++j`; C = `i % 2 != 0`; D = `printf("\n");`.** The row index alone chooses the digit, so all five cells of each row match. Alternative consistent A/C: `i = 0; i < 5; ++i` and `i % 2 == 0`; B can independently use zero-based bounds.

```text
11111
00000
11111
00000
11111
```

### 8.11 Finite versus supposedly infinite loop [p5 Q3c] — 2 marks

```c
#include <stdio.h>
int main(void) {
    int i = 13;
    for (; i __A__ 20; ++i) printf("Not Infinite\n");
    i = 15;
    for (; i __B__ 10; ++i) printf("Infinite\n");
    return 0;
}
```

**Intended A=`<`; B=`>`.** The first loop prints seven lines for i13–19; the second condition stays true as i grows mathematically. Alternatives for A: `<=` prints eight lines; `!=` prints seven. `>` or `>=` or `==` makes A false immediately and is finite with zero iterations; the intended exercise presumably wants a loop that executes. B alternatives: `>=` or `!=` remain true while the increasing integer is representable.

**C correctness caveat:** no such increasing signed-`int` loop is a defined infinite loop: eventually `i++` overflows and behavior is undefined. A truly endless version would use `for (;;)`, removing the increment. Thus “infinite” is the examiner's simplified intention, not a standards-guaranteed execution. There is no finite exact complete output for the intended second loop.

## 9. Function calls, recursion, and recurrence — HIGH

### 9.1 Factorial helper used to compute a binomial coefficient [p1 Q2] — 3 marks

```c
#include <stdio.h>
int compute_factorial(int n) {
    int factorial = 1;
    for (int i = 2; i <= n; ++i) factorial *= i;
    return factorial;
}
int func(int n, int k) {
    int numerator = compute_factorial(n);
    int denominator = compute_factorial(k) * compute_factorial(n - k);
    return numerator / denominator;
}
int main(void) {
    int n = 5, k = 3;
    int result = func(n, k);
    printf("The func(%d, %d) is: %d\n", n, k, result);
    return 0;
}
```

Trace: factorial5 accumulates1→2→6→24→120; factorial3=6; factorial2=2. Denominator=6×2=12; result120/12=10.

```text
The func(5, 3) is: 10
```

### 9.2 Transfer one unit per recursive call [p2 Q8] — 3 marks

```c
#include <stdio.h>
int func(int n, int m) {
    if (n == 0) return m;
    return func(n - 1, m + 1);
}
int main(void) {
    int n = 4, m = 5;
    printf("%d\n", func(n, m));
    return 0;
}
```

Trace: func(4,5)→func(3,6)→func(2,7)→func(1,8)→func(0,9). The base call returns 9; each waiting call returns that same 9. Exact output:

```text
9
```

The invariant is n+m=9. The recursion needs nonnegative n to reach its base case by repeatedly subtracting1.

### 9.3 Compare the last two digits with the leading quotient [p3 Q8] — 3 marks

```c
#include <stdio.h>
int Fun(int n) {
    if (n % 100 == n / 100) return 1;
    else return 0;
}
int main(void) {
    int i, n = 2020;
    if (Fun(n)) printf("Yes");
    else printf("No");
    return 0;
}
```

Trace: 2020%100=20 and 2020/100=20; equality is true, so Fun returns 1. Exact output: `Yes`, **no newline**. The unused i has no effect. This is not recursion: `Fun` never calls itself.

### 9.4 Generate a geometric sequence [p5 Q5b] — 4 marks

```c
#include <stdio.h>
void foo(int shirou, int rin, int sakura) {
    int term = shirou;
    for (int i = 0; i < sakura; ++i) {
        printf("%d ", term);
        term *= rin;
    }
}
int main(void) {
    int a = 1, b = 2, c = 5;
    foo(a, b, c);
    return 0;
}
```

Trace of (printed term,next term): (1,2),(2,4),(4,8),(8,16),(16,32). Exactly five terms are printed;32 is computed but never printed.

```text
1 2 4 8 16 
```

One trailing space, **no newline**.

## 10. Operators, conversions, macros, and switch — MED

### 10.1 Post-increment, chained comparisons, remainder, characters [p1 Q11] — 4 marks

```c
#include <stdio.h>
int main(void) {
    int a = 0;
    if (a++) a = 5;
    else a = 10;
    printf("a = %d\n", a);
    int b = (10 > 5 > 2);
    printf("b = %d\n", b);
    int c = 13;
    c %= (c / 3);
    printf("c = %d\n", c);
    char d = 'a' + 5;
    printf("d = %c\n", d);
    return 0;
}
```

Trace: `a++` tests the old 0 (false), increments a to 1, then the else assigns 10. Relational operators associate left to right: `(10>5)>2` is `1>2`, false 0. Integer `c/3` is 4;13%4=1. Under ASCII, 'a'+5 is 'f'.

```text
a = 10
b = 0
c = 1
d = f
```

### 10.2 Arithmetic with one undefined expression [p2 Q3] — 8 marks

```c
#include <stdio.h>
int main(void) {
    int p = 20, q = 10, r = 15, s = 5;
    int A, B, C, D;
    A = p % s + q * r / s;
    printf("Value of p %% s + q * r / s is : %d\n", A);
    p=20; q=10; r=15; s=5;
    B = p++ + q * r / s;
    printf("Value of p++ + q * r / s is : %d\n", B);
    p=20; q=10; r=15; s=5;
    C = p-- + --q - q * r / s; /* UNDEFINED: modification/read of q */
    printf("Value of p-- + --q - q * r / s is : %d\n", C);
    p=20; q=10; r=15; s=5;
    D = (++p / (q - 3)) * s - r;
    printf("Value of (++p / (q-3))* s - r is : %d\n", D);
    return 0;
}
```

| Part | Trace / answer |
|---|---|
| A, in isolation | 20%5=0;10×15/5=30; result **30**. `%%` prints one literal percent sign. |
| B, in isolation | p++ contributes 20, then p becomes 21;20+30=**50**. |
| C | **Undefined behavior**, because `--q` modifies q while another unsequenced operand reads q. There is no correct numeric answer. |
| D, in isolation | ++p gives 21;(q−3)=7;21/7=3;3×5−15=**0**. |

The whole original program has **no guaranteed exact output**, including no guarantee about printing a prefix before the undefined operation. Precedence and associativity determine grouping, not a left-to-right evaluation order for operands of `+`/`-`. The relevant rule is in the [WG14 C draft, §6.5 paragraph 2](https://www.open-std.org/jtc1/sc22/wg14/www/docs/n2310.pdf).

If the intended operation was to decrement q first, a defined repair replaces only the C assignment with:

```c
--q;
C = p-- + q - q * r / s;
```

Now q=9, p's old value20 is used, and C=20+9−27=2. Keeping the original print labels, the exact **repaired-program** output is:

```text
Value of p % s + q * r / s is : 30
Value of p++ + q * r / s is : 50
Value of p-- + --q - q * r / s is : 2
Value of (++p / (q-3))* s - r is : 0
```

### 10.3 Arithmetic, increments, and XOR [p3 Q3] — 8 marks

```c
#include <stdio.h>
int main(void) {
    int p=20, q=5, r=80, s=10;
    int A, B, C, D;
    A = (p + q) * r / s;
    printf("Value of (p + q) * r / s is : %d\n", A);
    p=20; q=5; r=80; s=10;
    B = (p++) + (-q) * (r--) + s;
    printf("Value of (p++) + (-q) * (r--) + s is : %d\n", B);
    p=20; q=5; r=80; s=10;
    C = p ^ q * r / s;
    printf("Value of p ^ q * r / s is : %d\n", C);
    p=20; q=5; r=80; s=10;
    D = p + (q * r) / s;
    printf("Value of p + (q * r) / s is : %d\n", D);
    return 0;
}
```

Trace: A=(20+5)×80/10=200. B uses old p20 and old r80:20−5×80+10=−370; then p21,r79, but both are reset. Multiplication/division bind more tightly than XOR: C=20^(5×80/10)=20^40=60 (`010100 ^ 101000 = 111100`). D=20+400/10=60.

```text
Value of (p + q) * r / s is : 200
Value of (p++) + (-q) * (r--) + s is : -370
Value of p ^ q * r / s is : 60
Value of p + (q * r) / s is : 60
```

### 10.4 Integer/character and double/float conversions [p2 Q4] — 2 marks

```c
#include <stdio.h>
int main(void) {
    int num = 10;
    char c = 'T';                  /* paper specifies ASCII 84 */
    int A;
    A = num + c;
    printf("Value of A : %d\n", A);
    int num1 = 20;
    double num2 = 50.3512897382;
    float B;
    B = num1 + (float)num2;
    printf("Value of B is: %f\n", B);
    return 0;
}
```

Trace: c is implicitly promoted to int84, so A = 94. The explicit cast rounds num2 to float; num1 is converted to float for the addition. With ordinary binary32 rounding, B is approximately70.3512878418. For `printf`, that float is promoted to double, and `%f` prints six decimal places.

```text
Value of A : 94
Value of B is: 70.351288
```

**Precision caveat:** the last digits assume usual IEEE binary32 arithmetic with rounding to nearest and no retained excess precision. The C language permits implementations with different floating formats/evaluation precision; a hand answer `70.351290` obtained by rounding the original decimal directly ignores the cast and intermediate rounding on the usual implementation.

### 10.5 Widening a float and explicit floating division [p3 Q4] — 2 marks

```c
#include <stdio.h>
int main(void) {
    float X = 0.2;
    double A = X / 0.1;
    printf("A = %lf\n", A);
    int p = 3, q = 100;
    double B;
    B = q / (double)p;
    printf("B = %lf\n", B);
    return 0;
}
```

Trace: X is stored as a float, typically 0.20000000298023224. Literal 0.1 is double, so X is implicitly converted to double before division; A≈2.000000029802322, printed to six decimals as 2.000000. Explicitly casting p to double makes q convert to double too;100/3≈33.3333333333, rather than integer 33.

```text
A = 2.000000
B = 33.333333
```

In `printf`, `%lf` has the same effect as `%f` in modern C. Do not transfer this rule to `scanf`: `%f` there needs `float *`, while `%lf` needs `double *`.

### 10.6 Track successive increments across print statements [p4 Q2a] — 5 marks

```c
#include <stdio.h>
int main(void) {
    int x = 5, y = 6, z = 7, w = 3;
    printf("A: %d ", ++x + ++y);
    printf("B: %d ", w + y + x++);
    printf("C: %d ", z++ + w++);
    printf("D: %d ", x-- + --w);
    printf("E: %d %d %d %d", x, y, z, w);
    return 0;
}
```

| Print | Calculation | State afterwards (x,y,z,w) |
|---|---|---|
| A | 6+7=13 | (6,7,7,3) |
| B | 3+7+old 6=16 | (7,7,7,3) |
| C | old 7+old 3=10 | (7,7,8,4) |
| D | old 7+new 3=10 | (6,7,8,3) |
| E | Print current state | (6,7,8,3) |

Exact output, **one line with no newline**:

```text
A: 13 B: 16 C: 10 D: 10 E: 6 7 8 3
```

Each expression modifies different variables, so these examples do not have p2 Q3's unsequenced modification/read problem.

### 10.7 Celsius to Fahrenheit [p4 Q2c] — 2 marks

```c
#include <stdio.h>
int main(void) {
    float f, c;
    c = 24;
    __A__
    printf("\n\n Temperature is: %f", f);
    return 0;
}
```

The unlabelled original blank is called A here. **A = `f = c * 9.0f / 5.0f + 32.0f;`.** Convert using F=9C/5+32, which gives 75.2. Alternatives: `f = c * 1.8f + 32;` or `f = (9.0 / 5.0) * c + 32;`. Avoid `(9 / 5) * c + 32`, because integer 9/5 is 1. `c * 9 / 5 + 32` is valid because c makes the multiplication floating point first.

On usual IEEE binary32, f≈75.1999969482, so exact stdout is `\n\n Temperature is: 75.199997`, **no final newline**. The mathematical value is 75.2; `%f` exposes the stored float's rounding.

### 10.8 Swap using XOR [p4 Q3b] — 6 marks

```c
#include <stdio.h>
int main(void) {
    int a = 10, b = 20;
    printf("%d %d", a, b);
    __A__
    __B__
    __C__
    printf("After swapping the values of a and b are :%d and %d", a, b);
    return 0;
}
```

**A = `a = a ^ b;`; B = `b = a ^ b;`; C = `a = a ^ b;`.** Equivalent: `a ^= b; b ^= a; a ^= b;`. Symmetric alternative: `b ^= a; a ^= b; b ^= a;`. The three lines must be separate sequenced statements.

Trace: (a,b)=(10,20)→(30,20)→(30,10)→(20,10). Exact stdout of this code is:

```text
10 20After swapping the values of a and b are :20 and 10
```

There is **no newline anywhere**. The paper's sample shows a line break that its first `printf` does not print. A temporary-variable swap is usually clearer; this exercise explicitly asks for bitwise operators. XOR swapping through pointers requires two distinct objects, because using one location for both operands would zero it.

### 10.9 Centimetres to inches and feet [p5 Q2a] — 3 marks

```c
#include <stdio.h>
int main(void) {
    int cm;
    scanf("%d", &cm);
    float inch = __A__;
    printf("%.2f\n", inch);
    float feet = inch / __B__;
    printf("%.2f\n", feet);
    return 0;
}
```

**A = `cm / 2.54f`; B = `12.0f`.** One inch is 2.54cm and one foot is 12 inches. Alternatives A=`cm / 2.54`, B=`12` or `12.0`; inch is already float, so division by integer 12 is floating point. Example input 30 gives `11.81\n0.98\n`.

### 10.10 Pre-increment and post-decrement [p5 Q2b] — 3 marks

```c
#include <stdio.h>
int main(void) {
    int a, b, c;
    a = 2 * 5 - 3;
    b = 3 * 2 - 5;
    c = ++a + b--;
    printf("%d %d %d\n", a, b, c);
    return 0;
}
```

Trace: a=7,b=1; ++a changes a to 8 and contributes 8; b-- contributes old 1 then stores 0; c=9.

```text
8 0 9
```

### 10.11 Macro, post-increment, and an if/else chain [p5 Q2c] — 3 marks

```c
#include <stdio.h>
#__X__ CONST_VAR 10
int main(void) {
    int a, b, c;
    a = 35;
    b = a++;
    c = 45;
    if (a + CONST_VAR == c) printf("1st Floor\n");
    else if (b + CONST_VAR == c) printf("2nd Floor\n");
    else printf("3rd Floor\n");
    --c;
    a += c;
    printf("%d %d\n", a, c);
    return 0;
}
```

**X = `define`**, producing `#define CONST_VAR 10` with no semicolon. Trace: b receives old 35, a becomes 36;36+10≠45;35+10=45, so the second branch prints. Then c=44 and a=36+44=80.

```text
2nd Floor
80 44
```

### 10.12 Switch fall-through [p5 Q3b] — 4 marks

```c
#include <stdio.h>
int main(void) {
    int ch = 3;                       /* repeat with ch = 2 */
    switch (ch) {
        case 1: printf("1st Floor\n"); break;
        case 2: printf("2nd Floor\n");
        case 3: printf("3rd Floor\n");
        default: printf("Invalid Floor\n"); break;
    }
    return 0;
}
```

Trace for ch 3: enter case 3; no break follows it, so continue into default. Exact output:

```text
3rd Floor
Invalid Floor
```

Trace for ch 2: enter case 2, then fall through case 3 and default. Exact output:

```text
2nd Floor
3rd Floor
Invalid Floor
```

`default` is an ordinary possible fall-through destination; it is not skipped merely because a case matched.

## 11. Scope and storage in executable code — MED

### 11.1 Local, static local, and global variables [p2 Q16] — 8 marks

```c
#include <stdio.h>
int global = 20;
void func1(void) {
    int local = 10;
    static int static_var = 30;
    printf("C : Local variable in func1: %d\n", local);
    printf("D : Static variable in func1: %d\n", static_var);
    local += 10;
    static_var += 10;
}
void func2(void) {
    int local = 100;
    static int static_var = 300;
    printf("E : Local variable in func2: %d\n", local);
    printf("F : Static variable in func2: %d\n", static_var);
    local += 100;
    static_var += 100;
}
int main(void) {
    int local = 1;
    printf("A : Local variable in main: %d\n", local);
    printf("B : Global variable in main: %d\n", global);
    local += 1;
    global += 1;
    func1();
    func2();
    printf("G : Local variable in main: %d\n", local);
    printf("H : Global variable in main: %d\n", global);
    return 0;
}
```

Trace: main prints 1,20, then changes its local to 2 and global to 21. func1 prints its own 10,30 before changing those to 20,40. func2 prints 100,300 before changing those to 200,400. Neither function's local named `local` changes main's variable. Return to main and print 2,21.

```text
A : Local variable in main: 1
B : Global variable in main: 20
C : Local variable in func1: 10
D : Static variable in func1: 30
E : Local variable in func2: 100
F : Static variable in func2: 300
G : Local variable in main: 2
H : Global variable in main: 21
```

If called again, func1 would start with local 10/static 40 and func2 with local 100/static 400. Those extra calls are **not** in this program and do not add output here.

## Appendix — theory and flowcharts: SKIP for the announced exam

These are retained for completeness, with short answers. They are low priority because the instructor explicitly excludes theory and flowcharts. A textual theory blank is not counted as a code blank. Lost diagram details are not guessed as facts.

| Source | Brief question and one-line answer |
|---|---|
| [p1 Q1], 10 marks | Teacher-grade flowchart: total=0; read/add N marks; avg=total/N using floating division; grade Good for avg≥80, Avg for60≤avg<80, otherwise Poor. The extracted text lacks the diagram's eight labelled blanks, so their exact label mapping cannot be recovered; assume N>0. |
| [p2 Q1], 3 marks | A=secondary storage (disk), B=main memory/RAM, C=CPU; strictly, loading into RAM is a loading/execution step, not a necessary consequence of compilation itself. |
| [p2 Q2], 7 marks | Sum-of-squares flowchart: input N; sum=0; for i=1..N add i*i; output sum (N5→55). |
| [p3 Q1], 3 marks | A=high-level language, B=machine language, C=binary/machine code; practical compilation can involve intermediate assembly/object code. |
| [p3 Q2], 7 marks | Power flowchart: reject a≤0 or b≤0; otherwise result=1 and multiply by a exactly b times, then print; repeated multiplication assumes integer exponent b. |
| [p4 Q1a], 6 marks | Even/odd flowchart: if n≤0 print invalid input; otherwise n%2==0 means even, else odd. |
| [p4 Q1b], 3 marks | A=hardware, B=software/applications (users is also common OS-interface wording), C=programs; OS manages resources and runs programs. |
| [p4 Q2b], 2 marks | Result type after explicit conversion: **unanswerable from the supplied extraction**, because the expression itself is missing; use the cast and usual arithmetic conversions once the expression is available. |
| [p4 Q2d], 2 marks | Explicit conversion is called casting/type casting, or explicit/forced type conversion. |
| [p4 Q3a], 3 marks | X=precedence, Y=precedence, Z=associativity; these determine expression grouping, not a general runtime operand evaluation order. |
| [p4 Q7b], 2 marks | Intended A=hexadecimal (the usual written address representation), B=dereference/indirection; an address is not inherently hexadecimal. |
| [p4 Q7c], 4 marks | A=copy, B=does not, C=address, D=does (when writing through that address); formally C always passes values, including pointer values. |
| [p4 Q10a], 5 marks | A=`r`, B=`w`, C=`r+`, D=`w+`, E=`a`; `r+` requires an existing file and preserves contents on open; `w+` truncates/creates. C's loose “read and write” description could also include `a+`, which forces writes to the end. |
| [p4 Q10b], 2 marks | A=`malloc`, B=`free`: allocate a block, then release its allocation. |
| [p5 Q1a], 3 marks | Likely A=input unit, B=CPU/processing unit, C=output unit, **but the block diagram/arrows are missing from the text, so the exact label mapping is not verifiable**. |
| [p5 Q1b], 3 marks | A=operating system, B=CPU/processor, C/D=Windows and Linux (other valid OS examples also acceptable). |
| [p5 Q1c], 5 marks | Factorial flowchart: input x>0; fact=1; multiply by i for i = 1..x; output fact. |
| [p5 Q2d], 2 marks | A=automatic/auto variable, B=static variable; automatic lifetime ends with its block, static lifetime spans program execution. Stack/data segments are typical implementation details, not C requirements. |
| [p5 Q3a], 4 marks | A/B=`for` and `while` in either order (`do...while` is another valid loop kind); C=`break`, D=`continue`. |
| [p5 Q5a], 3 marks | A=block/local scope, B=stack in the usual implementation, C=indeterminate (“garbage”) if not initialised; automatic objects are not guaranteed to be placed on a physical stack. |
| [p5 Q5c], 3 marks | (i) True: functions support reuse; (ii) False: static duration is not heap allocation; (iii) False as a general claim: recursion usually needs extra call-stack space, though optimisation can change this. |

## Recurring patterns / idioms to memorise

These are minimal C fragments. A fragment may assume the surrounding declarations shown in its comment; add the appropriate headers (`stdio.h`, `stdlib.h`, `string.h`, `ctype.h`) in a complete program. Practise the exact operators: `%` extracts a digit, `/` removes it, `&` obtains an address, `*` dereferences, `.` selects from an object, and `->` selects through a pointer.

### Digit extraction and accumulation — p1 Q10; p2 Q6; p4 Q3c

```c
/* int n >= 0; sum its digits without preserving n */
int sum = 0;
while (n > 0) {
    int digit = n % 10;
    sum += digit;
    n /= 10;
}
```

```c
/* Cube-of-digits check; original is a nonnegative int. */
int n = original, sum = 0;
while (n > 0) {
    int d = n % 10;
    sum += d * d * d;
    n /= 10;
}
if (sum == original) { /* qualifies for the cube test */ }
```

### Traverse arrays, compute length, and pass it explicitly — all five papers

```c
int a[] = {10,20,30};
int n = sizeof a / sizeof a[0]; /* valid here: a is an actual array */
for (int i = 0; i < n; ++i) {
    printf("%d ", a[i]);
}
```

```c
void double_elements(int a[], int n) {
    for (int i = 0; i < n; ++i) a[i] *= 2;
}
/* In this parameter, a is a pointer; sizeof a cannot recover array length. */
```

### Column-sum loop and selecting an extreme — p4 Q4; related p5 Q9

```c
/* int a[rows][cols]; rows > 0, cols > 0; sums fit int. */
int best_col = -1, best_sum = 0;
for (int j = 0; j < cols; ++j) {
    int sum = 0;
    for (int i = 0; i < rows; ++i) sum += a[i][j];
    if (best_col == -1 || sum < best_sum) {
        best_col = j;
        best_sum = sum;
    }
}
```

For a maximum, change `<` to `>`. Establishing the first candidate avoids a fabricated zero maximum or an arbitrary sentinel bound. Keep the index and value together; reset each candidate's sum inside the outer loop.

### Two transpose idioms — p3 Q10; p5 Q6a

```c
/* Print the transpose of int a[rows][cols]. */
for (int j = 0; j < cols; ++j) {
    for (int i = 0; i < rows; ++i) printf("%d ", a[i][j]);
    printf("\n");
}
```

```c
/* Transpose int a[n][n] in place: visit just one triangle. */
for (int i = 0; i < n; ++i)
    for (int j = i + 1; j < n; ++j) {
        int t = a[i][j];
        a[i][j] = a[j][i];
        a[j][i] = t;
    }
```

### Linear search, first occurrence — p3 Q9; p5 Q4b

```c
int search(char a[], int n, char key) {
    for (int i = 0; i < n; ++i)
        if (a[i] == key) return i;
    return -1;
}
```

### Selection sort and a temporary-variable swap — p2 Q9; p5 Q4a

```c
/* Sort int a[n] in ascending order. */
for (int i = 0; i < n - 1; ++i) {
    int min = i;
    for (int j = i + 1; j < n; ++j)
        if (a[j] < a[min]) min = j;
    int t = a[i];
    a[i] = a[min];
    a[min] = t;
}
```

### Merge two sorted arrays, including leftovers — p3 Q7

```c
/* a[na], b[nb] sorted; out has capacity na+nb. */
int i = 0, j = 0, k = 0;
while (i < na && j < nb) {
    if (a[i] < b[j]) out[k++] = a[i++];
    else out[k++] = b[j++];
}
while (i < na) out[k++] = a[i++];
while (j < nb) out[k++] = b[j++];
```

### Search the accepted prefix before appending — p2 Q7; p3 Q17

```c
/* Deduplicate int input[n] into output[n], preserving order. */
int k = 0;
for (int i = 0; i < n; ++i) {
    int j;
    for (j = 0; j < k; ++j)
        if (output[j] == input[i]) break;
    if (j == k) output[k++] = input[i];
}
```

### Allocate a struct array and access its members — p1 Q12; p3 Q15; p4 Q8; p5 Q7c

```c
struct Student { int rollNo; char name[20]; float marks; };
/* n > 0; inside a function */
struct Student *ptr = malloc(n * sizeof *ptr);
if (ptr == NULL) return 1;            /* in main */
scanf("%d", &(ptr + i)->rollNo);      /* 0 <= i < n */
scanf("%19s", (ptr + i)->name);
scanf("%f", &(ptr + i)->marks);
printf("%d\n", ptr[i].rollNo);
free(ptr);
```

```c
/* Equivalent member access, for a valid index i: */
ptr[i].rollNo = 7;
(ptr + i)->rollNo = 7;
(*(ptr + i)).rollNo = 7;
```

### Nested allocation and reverse-order cleanup — p1 Q12; p5 Q9

```c
struct Vector { int size; int *arr; };
/* Inside main: assume n > 0, allocation succeeds, size is supplied. */
struct Vector *v = malloc(n * sizeof *v);
for (int i = 0; i < n; ++i) {
    scanf("%d", &v[i].size);
    v[i].arr = malloc(v[i].size * sizeof *v[i].arr);
}
/* Use each inner array before cleanup. */
for (int i = 0; i < n; ++i) free(v[i].arr);
free(v);
```

`char *name` needs its own allocation (for example `malloc(20)`); `char name[20]` is already contained in the struct and must not be separately freed.

### Read and write files with the correct modes — p1 Q6; p2 Q15; p3 Q16; p4 Q9; p5 Q8

```c
FILE *in = fopen("data.in", "r");     /* existing file; read */
FILE *out = fopen("result.txt", "w"); /* create/truncate; write */
if (in == NULL || out == NULL) {
    if (in != NULL) fclose(in);
    if (out != NULL) fclose(out);
    return 1;                         /* in main */
}
int value;
while (fscanf(in, "%d", &value) == 1)
    fprintf(out, "%d\n", value);
fclose(in);
fclose(out);
```

Mode strings to recognise in blanks: `"r"` read existing; `"w"` create/truncate for writing; `"a"` create/append; `"r+"` read/write existing without truncation; `"w+"` create/truncate for read/write; `"a+"` read plus forced append writes. For the append question, use:

```c
/* in/out are successfully opened streams, out opened with "a". */
char line[500];
fputs("\n", out);
while (fgets(line, sizeof line, in) != NULL) fputs(line, out);
/* fgets keeps a newline if read; fputs never adds one. */
```

### String termination, comparison, copy, and concatenation — p1 Q14; p4 Q5; p5 Q6c

```c
char word[20];
scanf("%19s", word);                /* no & before a character array */
int len = strlen(word);            /* excludes '\0' */
char hidden[20];
for (int i = 0; i < len; ++i) hidden[i] = '_';
hidden[len] = '\0';
if (strcmp(word, hidden) == 0) { /* strings equal */ }
if (strchr(word, 'a') != NULL) { /* 'a' occurs */ }
```

```c
char result[30];
strcpy(result, "bake");            /* establish a terminated string */
strcat(result, "monogatari");      /* bakemonogatari; capacity includes '\0' */
```

### Store case-conversion results — p1 Q4e; p2 Q11; p3 Q11; p5 Q6b

```c
/* char word[] is writable and terminated. */
for (int i = 0; word[i] != '\0'; ++i) {
    unsigned char c = (unsigned char)word[i];
    word[i] = islower(c) ? toupper(c) : tolower(c);
}
```

For alternating case use `word[i] = (i % 2 == 0) ? toupper(c) : tolower(c);`. A bare `toupper(word[i]);` discards the converted character.

### Mutate two caller variables using pointers — p3 Q14; p5 Q7b

```c
void swap(int *a, int *b) {
    int t = *a;
    *a = *b;
    *b = t;
}
/* Call with swap(&x, &y); */
```

```c
void update(int *a, int *b) {
    int sum = *a + *b;
    int diff = (*a > *b) ? *a - *b : *b - *a;
    *a = sum;
    *b = diff;
}
```

### XOR swap — p4 Q3b

```c
/* Two distinct integer variables a and b. */
a ^= b;
b ^= a;
a ^= b;
```

### Carry, borrow, and wrap — p2 Q12; p3 Q12

```c
/* Nonnegative struct distance fields. */
while (sum.inch >= 12) {
    sum.inch -= 12;
    ++sum.feet;
}
```

```c
/* Normalised clock fields; elapsed time below 24 hours. */
if (end.seconds < begin.seconds) { end.seconds += 60; --end.minutes; }
diff.seconds = end.seconds - begin.seconds;
if (end.minutes < begin.minutes) { end.minutes += 60; --end.hours; }
diff.minutes = end.minutes - begin.minutes;
if (end.hours < begin.hours) end.hours += 24;
diff.hours = end.hours - begin.hours;
```

### Initial value, update order, and a recursion base case — p1 Q2; p2 Q8; p3 Q6; p4 Q1c

```c
/* Integer exponent >= 0, result fits. */
long power = 1;
for (int i = 0; i < exponent; ++i) power *= base;
```

```c
/* Fibonacci terms after initial 0 and 1; limit >= 1. */
int a = 0, b = 1, next = a + b;
while (next <= limit) {
    printf("%d ", next);
    a = b;
    b = next;
    next = a + b;
}
```

```c
int transfer(int n, int m) {          /* n >= 0; sums fit int */
    if (n == 0) return m;            /* base case */
    return transfer(n - 1, m + 1);  /* move toward base case */
}
```

For partial credit, identify each blank's role first: type, expression, condition, loop header, address, or statement block. Check zero-based indices, loop endpoints, original versus updated values, and whether a library function returns a value that must be stored.

