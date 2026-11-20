# Scope and storage across calls

Topic ID: `scope`

## Concept from zero

Scope answers "where can this name be used?" Lifetime answers "how long does this object exist?" They are different. A local declared inside a block has block scope. An ordinary automatic local exists for that execution of its block; a later call creates a fresh instance. Implementations commonly use a stack for this storage, but C does not require that placement.

A static local also has block scope, so other functions cannot access it by that name, but its lifetime spans the program. It is initialised once, before program startup in C, and retains later changes across calls. An uninitialised static-duration object starts at zero. A file-scope global also has static storage duration and can be named in functions where its declaration is visible. File-scope static limits a name's linkage to its source file; this differs from a static local's repeated-call behaviour.

Two different functions can each declare local; those names refer to different objects. A declaration in an inner block can hide an outer declaration of the same name (shadowing). Updating the inner object does not update the hidden outer one. Function parameters are local copies of arguments; pointer parameters can reach caller-owned objects, but the pointer variables themselves are still local copies.

Allocated storage has a lifetime from allocation until free, independently of the local pointer variable that names it. A pointer going out of scope does not automatically free its allocation. Conversely, returning the address of an automatic local does not prolong that local's lifetime.

## Blank-spotting tips

- For repeated helper calls, write separate trace columns for automatic local, static local, and global values. Reinitialise the ordinary local on every call; retain the other two objects' updates.
- If a counter must remember its value next call but should only be named inside the helper, static is the declaration clue.
- Trace the order of printf and updates. A printf before += reports the old value, not the later stored one.
- Identically named locals in different functions do not share storage. Follow the declaration visible at the use site.
- Storage keywords need no header; printf needs stdio.h, and an int value uses %d.

## Common traps

- static does not mean heap allocation or constant. A static local can change; its lifetime is what persists.
- An ordinary automatic local without initialisation does not default to zero. Static-duration objects do.
- Calling another function with its own local does not change main's local just because the names match.
- A declaration's scope does not prove the addressed object's lifetime. An address can escape a block while the object becomes invalid.

## Worked example: reset or retain?

Adapted from bank section 11.1, p2 Q16. The original calls each helper once; this shorter variant deliberately calls the helper twice to expose persistence.

```c
#include <stdio.h>
int global = 20;
void step(void) {
    int local = 10;
    __A__ int kept = 30;
    printf("%d %d %d\n", local, kept, global);
    local += 10;
    kept += 10;
    global += 1;
}
int main(void) {
    step();
    step();
    printf("%d\n", __B__);
    return 0;
}
```

Answers: A = `static`; B = `global`.

Reasoning: the first call prints 10,30,20, then stores kept = 40 and global = 21. The second gets a fresh local = 10 but retains kept = 40 and global = 21. Its updates leave global = 22. The unused later value of each automatic local disappears when its call returns.

Output:

```text
10 30 20
10 40 21
22
```

## Must memorise

- Automatic local: fresh per block execution, initialise before reading.
- Static local: one initialisation, block scope, whole-program lifetime, retained value.
- Global: static storage duration; local declarations can hide its name.
- Scope is name visibility; lifetime is object existence; heap allocations still need free.
