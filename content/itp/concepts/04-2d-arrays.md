# Two-dimensional arrays and matrices

Topic ID: `matrices`

## Concept from zero

`int a[2][3]` is an array of two rows, each an array of three ints. a[i][j] means row i, column j. Elements are stored row by row: a[0][0], a[0][1], a[0][2], a[1][0], and so on. The element offset is i * columns + j. Both indices must stay inside their own dimensions.

In most expressions a decays to a pointer to its first row, not int **. With three columns the pointer type is int (*)[3]; adding one moves by an entire row. A helper parameter such as `int a[][3]` must know the column count to compute that stride. A true 2D array differs from separately allocated rows addressed by int **. GCC also supports the bank's C variable-length arrays; dimensions must be positive and reasonably small before declaring one.

To total a row, hold its row index fixed and vary the column. To total a column, hold its column fixed and vary the row. Reset the sum for each new candidate. Save both the winning sum and its index. Initialise from a real candidate (or use a first-candidate flag) so negative numbers and large sums work. Assume arithmetic fits int in these short exercises.

A transpose exchanges rows and columns. Printing a rectangular transpose only changes traversal: an R by C matrix prints as C lines with R values per line. It does not modify storage. For an in-place square transpose, swap a[i][j] with a[j][i] above the diagonal only; the diagonal stays put.

For combining two same-sized matrices, loop through both dimensions and operate on corresponding cells. In the bank's conditional addition/multiplication example, test equality of the two current values before choosing the operation. Character matrices, including printed tree patterns, obey the same bounds; a row is not automatically a string unless it contains a terminator within its capacity.

## Blank-spotting tips

- Read the declaration's dimensions before filling loop bounds. a[rows][cols] means row < rows and col < cols, even if the variable names are m and n in an unusual order.
- For column sums, the outer loop chooses j < cols; the inner loop sums a[i][j] for i < rows.
- For a printed transpose, the outer loop runs over original columns. Place the newline after all original rows have been printed for one column.
- A scanf cell needs &a[i][j] for `%d`; a printed cell needs a[i][j]. Include stdio.h for these calls.
- In an in-place transpose, j = i + 1 is a clue to visit one triangle. A strict comparison when choosing an extreme retains the first tied index.

## Common traps

- Reversing indices without reversing their loop ranges can access outside a rectangular matrix.
- Swapping over the whole square undoes each pair on its second visit.
- Initialising a maximum sum to zero fails when all candidate sums are negative. A fabricated huge minimum also needs an unjustified bound; establish the first candidate instead.
- Resetting the sum outside the outer loop accumulates all columns together.
- int ** is not the type of a contiguous 2D array after decay; its row representation is different.

## Worked example: print a rectangular transpose

Adapted from bank section 4.2, p3 Q10. Fixed data and separators make output exact.

```c
#include <stdio.h>
int main(void) {
    int a[2][3] = {{1, 2, 3}, {4, 5, 6}};
    for (int j = 0; j < __A__; ++j) {
        for (int i = 0; i < __B__; ++i)
            printf("%d%c", __C__, i == 1 ? '\n' : ' ');
    }
    return 0;
}
```

Answers: A = `3`; B = `2`; C = `a[i][j]`.

Reasoning: column 0 contributes 1 and 4, column 1 gives 2 and 5, column 2 gives 3 and 6. Each printed line has two values, although each original row has three.

Output:

```text
1 4
2 5
3 6
```

## Worked example: minimum column sum

Adapted from bank section 4.1, p4 Q4, using the bank's sample data and its first-candidate repair.

```c
#include <stdio.h>
int main(void) {
    int a[3][3] = {{3, 4, 2}, {1, 0, -5}, {10, 8, 2}};
    int column = -1, best = 0;
    for (int j = 0; j < 3; ++j) {
        int sum = __A__;
        for (int i = 0; i < 3; ++i) sum += __B__;
        if (column == -1 || __C__) {
            best = sum;
            column = j;
        }
    }
    printf("%d %d\n", column, best);
    return 0;
}
```

Answers: A = `0`; B = `a[i][j]`; C = `sum < best`.

Reasoning: the sums are 14, 12, -1. column == -1 accepts the first actual column even though best initially holds zero. Each later smaller sum replaces both saved fields. Column 2 wins.

Output:

```text
2 -1
```

## Must memorise

- a[row][col], row < rows, col < cols; read a cell with &a[row][col].
- Column sum: outer col, reset sum, inner row. Row sum: reverse those roles.
- Printed transpose: outer original column, inner original row, print a[row][col].
- Square in-place transpose: i from 0, j from i + 1; swap a[i][j] and a[j][i].
- Update an extreme's index and value together; initialise from the first candidate.
