# Dynamic memory and nested allocations

Topic ID: `memory`

## Concept from zero

An ordinary automatic local has a lifetime tied to its block or function invocation. Implementations commonly put these objects on a stack. An allocated object has a separately controlled lifetime: malloc reserves storage, and free ends that allocation's lifetime. This storage is commonly called the heap. Stack and heap are useful implementation models, not mandatory physical layouts in C. Static-duration objects are a third category and live for the whole program.

`int *p = malloc(n * sizeof *p)` requests bytes for n ints. p itself is a pointer variable; the allocation is the separate storage it points at. malloc returns NULL on failure, otherwise an address suitably aligned for ordinary object types. Its bytes are uninitialised; write elements before reading them. stdlib.h declares malloc, calloc, realloc, and free. Do not rely on an undeclared allocator. A cast on malloc's result is unnecessary in C.

calloc(n, sizeof *p) allocates the same count and zeroes the bytes (giving zero integer elements). Byte zeroing is not a portable promise of every possible pointer or floating representation. realloc can resize an allocation while preserving the old prefix up to the smaller size. It may move the allocation. Store its result in a temporary: if it fails for a positive requested size, the old block is still valid. Avoid zero-size allocation edge cases in exam reasoning unless specified.

Allocate complete objects with n * sizeof *p, not n * sizeof p (pointer size). Require a valid positive count and ensure the size multiplication fits size_t for general input. For example, for positive int n, the overflow guard is `(size_t)n > SIZE_MAX / sizeof *p` after including stdint.h. The examples below use fixed small counts. User input also needs range validation before allocating.

Nested records have multiple ownership layers. An array of Vector structs contains each size and pointer, but not each pointer's int array. Allocate the outer array, then each inner array. Free the inner arrays first, while the outer records are still accessible, then free the outer array. If an allocation fails halfway, free all earlier successful inner allocations and the outer block.

free takes the base address returned by an allocator, once. free(NULL) is harmless; freeing an interior address, automatic object, or already freed block is invalid. Setting a local pointer to NULL after free can prevent accidental reuse through that variable, but other aliases still dangle. Losing the final pointer without freeing creates a leak.

## Blank-spotting tips

- Infer the allocated type from the declaration: struct Student *ptr needs n whole Students; `sizeof *ptr` follows that type automatically.
- A later ptr[i].field proves an array of records is needed, not merely one record or one pointer.
- A pointer member v[i].arr needs its own allocation if later indexed. An embedded array name[20] does not.
- Pair every successful allocation with cleanup. Inner free loops before free(v) reveal the ownership structure.
- If a blank follows `if (ptr == NULL)`, it should handle failure before any dereference. A message blank already inside quotes needs text without another pair of quotes.
- For dynamic struct input, scanf uses &ptr[i].roll for an int and ptr[i].name for an embedded string. `%f` needs a float member's address.

## Common traps

- malloc(n) allocates n bytes, not n ints or records. Use the element's sizeof.
- sizeof p measures the pointer, not its target. sizeof *p obtains the pointed-to type's size without reading an ordinary non-VLA object.
- Allocating the outer records does not allocate buffers for pointer members.
- Freeing the outer array first loses safe access to its inner pointer fields.
- `p = realloc(p, bytes)` loses the old address on failure. Use a temporary, then replace p only on success.
- Successful allocation does not initialise malloc's contents. A non-NULL stale pointer after free is still unusable.

## Worked example: allocate and use a record array

Adapted from bank section 2.1, p3 Q15 / p4 Q8, with two fixed records and a compact driver.

```c
#include <stdio.h>
#include <stdlib.h>
struct Student { int roll; float marks; };
int main(void) {
    int n = 2;
    struct Student *p = __A__;
    if (p == NULL) return 1;
    p[0].roll = 7; p[0].marks = 80.0f;
    p[1].roll = 8; p[1].marks = 90.0f;
    printf("%d %.1f\n", (p + 1)->roll, __B__);
    free(__C__);
    return 0;
}
```

Answers: A = `malloc(n * sizeof *p)`; B = `p[1].marks`; C = `p`.

Reasoning: the allocation fits two complete records, including any padding. Both fields are written before reading. p + 1 reaches the second record; p[1] reaches the same record as an object. Free the base p after its final use.

Output:

```text
8 90.0
```

## Worked example: nested vectors and cleanup order

Adapted from bank section 2.4, p5 Q9. Sizes and values are fixed; failure paths clean earlier allocations.

```c
#include <stdio.h>
#include <stdlib.h>
struct Vector { int size; int *arr; };
int main(void) {
    struct Vector *v = malloc(2 * sizeof *v);
    if (v == NULL) return 1;
    for (int i = 0; i < 2; ++i) {
        v[i].size = i + 1;
        v[i].arr = __A__;
        if (v[i].arr == NULL) {
            for (int j = 0; j < i; ++j) free(v[j].arr);
            free(v);
            return 1;
        }
        for (int j = 0; j < v[i].size; ++j) v[i].arr[j] = 10 + j;
    }
    printf("%d\n", v[1].arr[1]);
    for (int i = 0; i < 2; ++i) free(__B__);
    free(__C__);
    return 0;
}
```

Answers: A = `malloc(v[i].size * sizeof *v[i].arr)`; B = `v[i].arr`; C = `v`.

Reasoning: there are three allocations: one outer array, an inner array of one int, and an inner array of two ints. The second inner array becomes [10,11]. Cleanup releases both inner arrays, then the records containing their addresses. If the second inner allocation fails, the first is freed by the j loop.

Output:

```text
11
```

## Must memorise

- stdlib.h; `T *p = malloc(n * sizeof *p)`; check p != NULL before use.
- calloc(count, size) zeroes bytes; malloc leaves bytes uninitialised.
- Safe resizing: assign realloc to a temporary and check before replacing the original pointer.
- Free each owned inner block, then its owner; free the base address once.
- No free for embedded arrays or automatic locals; never use an allocation after free.
