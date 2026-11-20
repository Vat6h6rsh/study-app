# One-dimensional arrays, search and sort

Topic ID: `arrays`

## Concept from zero

An array reserves consecutive objects of one type. `int a[4]` has four int cells, indexed 0, 1, 2, 3. Index i means "move i elements from the beginning", so a[i] is the same cell as *(a + i). C does not check bounds for you. Reading a[4] here is outside the array and has undefined behaviour.

Where a is an actual array, `sizeof a / sizeof a[0]` divides total bytes by bytes per element. In most expressions an array name becomes a pointer to its first element: this is called decay. In a function parameter, `int a[]` is adjusted to `int *a`; the function has a pointer, not the original array's size. Pass the length separately. Writing a[i] in that function changes the caller's cell, because it reaches the same storage.

Linear search checks cells left to right and returns immediately at a match to give the first matching index. Return -1 after the whole loop to signal absence. An index differs from the value stored there.

Selection sort grows a sorted prefix. At position i, find the index of the smallest element in the remaining suffix and swap it into a[i]. After n - 1 placements, the last element is already in place. Save a[i] in a temporary before overwriting it. A useful invariant is "before pass i, positions below i already contain the smallest values in order".

To merge two sorted arrays, keep one reading index in each input and a writing index in the output. While both inputs have elements, copy the smaller current value and advance its index. Then copy the leftovers from whichever input remains. The output needs capacity na + nb; merging does not remove duplicates by itself.

For deduplication or union, keep an accepted prefix output[0..k-1]. Search only that prefix for each candidate. If no match is found (j == k), append at output[k] and then increment k. Searching unwritten cells would read uninitialised values. Union extends the same idea to candidates from both input arrays, preserving the requested order.

## Blank-spotting tips

- Distinguish count n from last index n - 1. A condition i < n protects access a[i].
- If the caller checks result == -1, the helper likely returns an int index, with return i inside the matching branch.
- A minIndex variable stores a position. Compare a[j] with a[minIndex], then assign minIndex = j, not a[j].
- In a merge, increment the input index only when consuming from that input; increment the output index for every copied value. Look for the two leftover loops.
- Use &a[i] with scanf("%d", ...), and a[i] with printf("%d", ...). Array algorithms need no special header; console input/output needs stdio.h.

## Common traps

- i <= n visits one cell too many. C permits forming a pointer one past the array, but not reading or writing that nonexistent element.
- `sizeof a` inside an array-parameter function is the pointer's size, so it cannot recover the element count.
- return -1 inside the loop rejects after the first nonmatch, missing later matches.
- Setting minIndex = 0 on every sort pass searches the already sorted prefix again; start at i.
- Swapping with `a[i] = a[min]; a[min] = a[i];` loses the old a[i]. Use a temporary.
- Removing duplicates is not the same as sorting. Read whether the requested original order must be preserved.

## Worked example: find the first matching character

Adapted from bank section 3.5, p3 Q9 / p5 Q4b, with a duplicate to expose the first-match rule.

```c
#include <stdio.h>
int search(char a[], int n, char key) {
    for (int i = 0; i < __A__; ++i)
        if (__B__) return __C__;
    return -1;
}
int main(void) {
    char a[] = {'a', 'c', 'c'};
    int n = (int)(sizeof a / sizeof a[0]);
    printf("%d\n", search(a, n, 'c'));
    return 0;
}
```

Answers: A = `n`; B = `a[i] == key`; C = `i`.

Reasoning: index 0 fails; index 1 matches and immediately returns 1. Returning a[i] would give the character's code instead of its index. The sizeof expression is in main, where a is still an actual array.

Output:

```text
1
```

## Worked example: place each minimum

Adapted from bank section 3.4, p5 Q4a, with an added driver.

```c
#include <stdio.h>
void sort(int a[], int n) {
    for (int i = 0; i < __A__; ++i) {
        int min = __B__;
        for (int j = i + 1; j < n; ++j)
            if (a[j] < a[min]) min = __C__;
        int temp = a[i];
        a[i] = a[min];
        a[min] = __D__;
    }
}
int main(void) {
    int a[] = {4, 1, 3};
    sort(a, 3);
    printf("%d %d %d\n", a[0], a[1], a[2]);
    return 0;
}
```

Answers: A = `n - 1`; B = `i`; C = `j`; D = `temp`.

Reasoning: pass 0 finds minimum at 1 and makes [1,4,3]. Pass 1 finds minimum at 2 and makes [1,3,4]. The pointer parameter lets the helper change main's array. The temporary preserves 4 before its slot is overwritten.

Output:

```text
1 3 4
```

## Must memorise

- Traverse `i = 0; i < n; ++i`; actual-array count `sizeof a / sizeof a[0]`; pass n separately to functions.
- First-match search: `if (a[i] == key) return i`; return -1 after the loop.
- Selection sort: min = i, j = i + 1, compare a[j] < a[min], then swap using temp.
- Merge while both indices are in range, then copy each input's leftovers.
- Dedup: search j < k; append only if j == k, using output[k++] = candidate.
