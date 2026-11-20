# C blank-filling idioms cheatsheet

Topic ID: `idioms`

## Recall the job before the spelling

These are fragments, not standalone programs. Their names assume the declarations described in each bullet. Use the topic notes for full worked programs and explanations. All patterns are drawn from the recurring idioms in the supplied question bank; small integer inputs are assumed to keep arithmetic in range.

## Headers and formats

- stdio.h: printf, scanf, FILE, fopen, fclose, fprintf, fscanf, fgets, fputs, fgetc, EOF.
- stdlib.h: malloc, calloc, realloc, free. string.h: strlen, strcpy, strcat, strcmp, strchr. ctype.h: islower, isupper, toupper, tolower.
- scanf: int needs `%d` and int *; float needs `%f` and float *; double needs `%lf` and double *; char needs `%c` and char *. For char name[20], `%19s` and name reserve room for '\0'.
- printf: int `%d`; char value `%c`; terminated char sequence `%s`; promoted float or double `%f`; size_t `%zu`; pointer `%p` with (void *) cast; ptrdiff_t `%td` with stddef.h.

## Values, addresses, arrays and records

- int x: x is the value, &x is its address; int *p: p holds an address, *p accesses its target. scanf writes through an address; printf normally reads a value.
- a[i] is *(a + i). For an actual array, count = sizeof a / sizeof a[0]. Array parameters are pointers and need a separate count.
- struct object s: s.field. Struct pointer p: p->field is (*p).field. Array element p[i] is an object, so p[i].field is correct.
- char name[20] is contained storage; char *name needs valid storage elsewhere. A string ends at '\0'; its length excludes that cell.

## Digits, totals and loops

- Nonnegative n: digit = n % 10; n /= 10; sum += digit. Save original before the loop. Reverse with rev = rev * 10 + digit; ensure no overflow.
- Sum starts at 0; product/power at 1. Traverse n cells with i = 0; i < n; ++i.
- Fibonacci: next = a + b before a = b and b = next. A prime candidate is at least 2; reset its flag before testing divisors.
- For nested patterns, outer loop chooses a row, inner loop prints its contents, then print a newline.

## Search, sort, merge and deduplication

- First-match search: if (a[i] == key) return i inside the loop; return -1 after it.
- Selection sort: outer i < n - 1; min = i; inner j = i + 1 and j < n; if (a[j] < a[min]) min = j; swap a[i], a[min].
- Swap: temp = a; a = b; b = temp. Pointer swap: temp = *a; *a = *b; *b = temp.
- Merge: while (i < na && j < nb), copy the smaller current value to out[k++], advancing only its input index. Then copy each input's leftovers. Capacity must be at least na + nb.
- Deduplicate: search output[0..k-1] for input[i]; if j == k, append output[k++] = input[i]. Union applies this to both inputs.

## Matrices and extremes

- a[rows][cols]: row i < rows; column j < cols. Column sum holds j fixed and loops over i; reset sum at each j.
- Minimum selection: if (best_index == -1 || sum < best_sum), save index and sum together. Change < to > for a maximum. This first-candidate rule handles negative values.
- Printed transpose: outer original column, inner original row, print a[row][col], newline after the inner loop.
- Square in-place transpose: i = 0..n-1, j = i+1..n-1, swap a[i][j] and a[j][i] once per pair.

## Strings and case

- strcpy(dest, source) establishes a string; strcat(dest, suffix) extends a valid one. Check capacity including the final '\0'. Never strcat into uninitialised storage.
- Equality: strcmp(a, b) == 0. Character found: strchr(s, c) != NULL. Manual length: count until s[i] == '\0'.
- Store the conversion: s[i] = toupper((unsigned char)s[i]). Alternating case uses i % 2 == 0; every third starting at the third uses (i + 1) % 3 == 0.
- After constructing hidden[0..len-1], set hidden[len] = '\0'.

## Allocation and cleanup

- T *p = malloc(n * sizeof *p); check p == NULL before dereferencing. n is a validated positive count and multiplication must fit size_t.
- Nested vectors: allocate v, then each v[i].arr. Free each v[i].arr before free(v). On failure, clean all previously successful allocations.
- free the base address once; never free an embedded array or a local automatic object. Do not access freed storage. Use a temporary for realloc.

## Files, recurrence and records

- Read existing: fopen(path, "r"); replace/create: "w"; preserve and append: "a". + adds the other access direction; r+ still requires an existing file, w+ still truncates.
- Read int: fscanf(in, "%d", &x) == 1. Write int: fprintf(out, "%d\n", x). Line copy: while (fgets(buf, sizeof buf, in) != NULL) fputs(buf, out).
- Check fopen for NULL and close each successful stream. fgets retains a read newline; fputs adds none. fgetc needs int to preserve EOF.
- Recursion: base return first, then return the smaller call's result. transfer(n,m) uses n == 0 -> return m, otherwise return transfer(n - 1, m + 1).
- Carry inches: while (inch >= 12), subtract 12 and increment feet. Borrow seconds/minutes: add 60 to the deficient field and decrement the next; midnight wrap assumes less than 24 hours elapsed.
- Automatic locals reset on each call; static locals retain updates. Scope controls visible names; lifetime controls valid storage.

## Last-minute traps

- = assigns; == tests. ^ is XOR, not power. Cast before integer division to retain fractions.
- Never use a[n] in an n-element array. Do not derive an array parameter's length with sizeof.
- Do not double the quotes/semicolons already printed around a blank. Do not put a stray semicolon after a loop header.
- A returned value must be stored or used. Keep original values before overwriting them. Avoid unsequenced increments and signed overflow.
- Read all the blanks together once at the end: types, headers, format specifiers, bounds, termination, ownership, and exact output.
