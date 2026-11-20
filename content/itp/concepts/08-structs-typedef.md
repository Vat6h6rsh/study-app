# Structs, typedef and records

Topic ID: `structs`

## Concept from zero

A struct groups different fields into one object: a student can have an integer roll number, a name array, and float marks. Members occupy storage within the record; padding may appear between them. sizeof a complete struct includes any padding, so use sizeof rather than adding guessed field sizes.

`struct Student s` creates an object of that type. s.roll accesses a member of an object with dot. `struct Student *p = &s` creates a pointer; p->roll means (*p).roll. For an array of records, students[i].roll selects the ith object's field; (students + i)->roll reaches the same field through a pointer. Brackets select an object before dot is applied.

typedef creates another name for a type; it does not create an object or allocate extra storage. With `typedef struct { int id; } Record;`, Record is usable as a type name. Without a typedef, a tagged type generally needs its struct keyword, as in struct Student.

A member `char name[20]` is storage inside each record. No separate allocation is needed; strcpy can write characters into it if they fit. A member `char *name` stores only an address and needs valid character storage elsewhere. Struct assignment copies the whole record, including embedded arrays, but copies only addresses in pointer members; it does not duplicate pointed-to allocations. Thus two copied records can alias the same dynamic buffer.

Record algorithms use ordinary loops: inspect each student's age, compare height, and remember the best index. Establish a valid first candidate so "none qualifies" and all-negative values can be handled. For distances, carry every 12 inches into a foot. For time differences, borrow 60 seconds/minutes from the next field; if the end clock is earlier, the bank assumes a midnight wrap within 24 hours.

## Blank-spotting tips

- Infer dot or arrow from the expression immediately to its left: info is an object, ptr is a pointer, and ptr[i] is an object.
- Later `Information info;` reveals the alias required after `typedef struct { ... }`.
- scanf("%d", &p->roll) needs a member's address; scanf("%19s", p->name) already has a character address. float marks uses &p->marks with `%f`; printf("%.2f", p->marks) receives a promoted value.
- If a name destination is uninitialised, choose strcpy, not strcat. string.h declares these; stdio.h handles record input/output.
- In a carry loop, `while (inch >= 12)` handles both exactly 12 and more than one carry. In a best-record search, update the saved index when updating the best value.

## Common traps

- p.roll on a struct pointer does not dereference it; use p->roll or (*p).roll.
- `*p.roll` has the wrong grouping for a pointer p; member access binds before the unary star.
- `s.name = "Jack"` cannot assign to an array member. Copy the characters, or initialise the member when defining the object.
- Typedef aliases and variables look similar in syntax but have different jobs. A bare alias name as the malloc result is not an allocated object.
- Freeing an embedded name array is invalid. Only separately allocated storage is freed separately.
- Using a pointer member after freeing its shared allocation remains invalid even in a copied record.

## Worked example: reconstruct an alias and a name copy

Adapted from bank section 1.5, p4 Q5; zero initialisation makes every field defined.

```c
#include <stdio.h>
#include <string.h>
__A__ struct {
    int ID;
    char name[20];
} __B__;
int main(void) {
    Information info = {0};
    info.ID = 1;
    __C__(__D__, "Jack Hobbes");
    printf("%d %s\n", info.ID, info.name);
    return 0;
}
```

Answers: A = `typedef`; B = `Information`; C = `strcpy`; D = `info.name`.

Reasoning: main tells us Information must be a type name. info is an object, so its embedded array is info.name. strcpy establishes the full string including '\0'. Eleven visible characters plus the terminator fit in 20 cells.

Output:

```text
1 Jack Hobbes
```

## Worked example: follow two forms of access

Adapted from bank section 1.7, p4 Q7a, with a short record-array driver.

Complete the program so the second point becomes (7, 4), and it prints those two coordinates.

```c
#include <stdio.h>
struct Point { int x, y; };
int main(void) {
    struct Point points[2] = {{1, 2}, {3, 4}};
    struct Point *p = points;
    (p + 1)->x = __A__;
    printf("%d %d\n", points[1].x, __B__);
    return 0;
}
```

Answers: A = `7`; B = `p[1].y`.

Reasoning: p + 1 points at the second record, so arrow updates its x to 7. p[1] is that record object, so dot reads its unchanged y = 4. The indexing moves in whole Point objects, including any padding.

Output:

```text
7 4
```

## Must memorise

- Object member s.field; pointer member p->field; `p[i].field` equals `(p + i)->field`.
- Alias pattern `typedef struct { ... } Name;`.
- Input numeric member &p->field; input bounded embedded name p->name.
- char name[20] contains storage; char *name only holds an address.
- Carry inches with >= 12; borrow seconds/minutes by 60; save best index with its value.
