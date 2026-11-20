# Pointers, addresses and caller data

Topic ID: `pointers`

## Concept from zero

Memory holds objects at addresses. If `int x = 5`, then x names the stored value and &x produces its address. `int *p = &x` creates a pointer object p holding that address. `*p` accesses the int at that address: reading *p gives 5; writing *p = 9 changes x to 9. In a declaration, * means "pointer to"; in an expression it dereferences. Do not confuse either use with multiplication.

A pointer's type tells C what kind of object is there and how far arithmetic moves. With `int a[3]`, p = a points at a[0], p + 1 points at a[1], and *(p + 1) is a[1]. The step is one whole int, not one byte. a[i] and *(a + i) name the same object. Most array expressions decay to a pointer; an array parameter is a pointer, so both `int a[]` and `int *a` parameters can change the caller's cells.

Pointer arithmetic and subtraction require the same array (or its one-past position). A one-past pointer can be compared or moved back but cannot be dereferenced. Pointer subtraction gives an element distance of type ptrdiff_t, declared in stddef.h and printed with %td. Adding two pointers is not defined C. Use %p with a cast to void * to display an object pointer; the exact printed address is not predictable.

Two pointers can alias: hold the address of the same cell. A write through one is then visible through the other. Passing addresses to a function copies those addresses, allowing the helper to write the caller's data. Returning an address of an ordinary automatic local is invalid to use after that local's lifetime ends. A pointer is usable only while it points at a live, suitably typed object; NULL is a sentinel and cannot be dereferenced.

## Blank-spotting tips

- Read the declared type: int * needs an address of int. scanf("%d", p) is already correct if p points to a writable int; do not automatically add another &.
- If a helper assigns *a and *b, its parameters need pointer types and the caller supplies &x, &y. If it assigns a and b without stars, it is changing local pointer values or local copies.
- `(*p)++` increments the pointed-to value; `p++` advances the pointer. `*p++` groups as *(p++), reading at the old pointer then advancing it. `(*p)--` changes a value, while `*p--` reads then moves the pointer backward.
- To update two outputs computed from the same old inputs, compute both into temporaries before overwriting either destination.
- stdio.h declares scanf/printf; stddef.h declares ptrdiff_t. Address and dereference operators themselves need no header.

## Common traps

- `int *p; *p = 7;` writes through an uninitialised address. First point p to valid storage or allocate it.
- `int *p, q;` declares one pointer and one int. Repeat the star for each pointer declarator.
- `swap(x, y)` supplies integer values; `swap(&x, &y)` supplies addresses to an int * helper.
- p + 1 moves by an element, while *p + 1 adds one to a stored value. Read parentheses carefully.
- A pointer may still hold an old address after free or block exit. A non-NULL address is not proof the object is alive.

## Worked example: swap caller objects

Adapted from bank section 7.4, p3 Q14, with the value-only comparison omitted.

```c
#include <stdio.h>
void swap(int *a, int *b) {
    int temp = __A__;
    *a = __B__;
    *b = temp;
}
int main(void) {
    int x = 5, y = 10;
    swap(__C__, __D__);
    printf("%d %d\n", x, y);
    return 0;
}
```

Answers: A = `*a`; B = `*b`; C = `&x`; D = `&y`.

Reasoning: a points at x and b at y. temp saves x's 5. Writing *a copies 10 into x, then writing *b places saved 5 into y. Assigning a = b instead would redirect a and leave x's value unchanged.

Output:

```text
10 5
```

## Worked example: aliasing and an element step

Adapted from bank sections 7.2–7.3, p3 Q13 / p5 Q7a, with a small combined driver.

```c
#include <stdio.h>
int main(void) {
    int a[] = {10, 20, 30};
    int *p = a + 1;
    int *q = __A__;
    *q += 5;
    printf("%d %d\n", *p, *(__B__));
    return 0;
}
```

Answers: A = `p`; B = `p + 1`.

Reasoning: p and q both point at a[1], so *q += 5 changes 20 to 25, visible through p. p + 1 points at a[2], whose value is still 30. *p + 1 would yield 26, which is a different operation.

Output:

```text
25 30
```

## Must memorise

- Address &x; value at address *p; `int *p = &x`; `a[i] == *(a + i)` as values.
- Modify caller data with pointer parameters and address arguments.
- Save old data before a swap or simultaneous sum/difference update.
- Arithmetic stays within one array or one past; never dereference one past or NULL.
- Distinguish `(*p)++`, `p++`, and `*p++` by what they change.
