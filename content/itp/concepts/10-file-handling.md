# File handling

Topic ID: `files`

## Concept from zero

A file persists bytes outside a running program. C uses a FILE * stream to track an open file and its current position; stdio.h declares FILE and the file functions. fopen returns a stream pointer on success or NULL on failure. A relative filename is resolved from the program's working directory. In this app, the runner uses a fresh temporary directory; practice fixtures supply its initial files.

Modes determine what opening does: "r" reads an existing file and fails if absent; "w" creates or truncates a file for writing; "a" creates or preserves it and forces writes to the end. "r+" reads/writes an existing file without truncation; "w+" creates/truncates for reading/writing; "a+" permits reading and forces writes to the end. To read existing contents from the beginning of an a+ stream, explicitly position it there. On an update stream, changing direction requires the appropriate flush or positioning operation; using separate read/write streams is simpler in these exercises.

fscanf is like scanf with a FILE * first; fprintf is like printf with a FILE * first. fscanf returns the number of successful assignments. For one int, `fscanf(in, "%d", &value) == 1` means value is usable; zero means a conversion failed and EOF can indicate end or an input error before assignment. If a loop expects two integers, require a return of 2.

fgets(buf, capacity, in) reads at most capacity - 1 characters, keeps a newline if one was read, and terminates on success. NULL means it did not return a string. fputs writes a string without adding a newline. fgetc returns an unsigned-character value converted to int, or EOF; store its result in int so EOF stays distinguishable. feof only reports after a read has encountered end-of-file; it cannot predict the next read's success. Use ferror to distinguish an input error after a reading loop when needed.

fclose releases the stream and flushes buffered output; check its result when successful writing matters. Close all successfully opened streams on both success and failure paths. Opening a file is a resource acquisition, not a guarantee that all later reads or writes succeed. File contents, stdout, and terminal input echo are separate: writing result.txt does not print it on screen.

## Blank-spotting tips

- If existing contents must survive and new text belongs at the end, choose "a", not "w". For a fresh result file choose "w".
- Read destinations need addresses: fscanf(in, "%d", &x); write values do not: fprintf(out, "%d\n", x).
- Determine where output goes from the first argument: fprintf needs a stream; printf goes to stdout. Both declarations are in stdio.h.
- An input loop's condition should test the read itself: == 1 for one integer, != NULL for fgets, != EOF for fgetc stored in int.
- A blank that closes three files can require three statements. Check which semicolon is already printed outside the blank.
- Exact file-output questions depend on initial newlines. Appending "\n" creates one newline; fputs does not add another.

## Common traps

- "w" destroys existing file contents on successful open. "r" cannot create a missing input file.
- `while (!feof(in))` can use an old value once more after the final read fails. Test fscanf/fgets instead.
- `fscanf(in, "%d", x)` passes an int where an int * is required; use &x.
- Calling fgets or fprintf with a NULL stream after fopen failed is invalid.
- Storing fgetc in char can lose the distinct EOF value. Use int.
- A successful final fprintf can still be followed by a failing fclose; handle the close result when checking a complete example.

## Worked example: sum corresponding file integers

Adapted from bank section 6.4, p5 Q8. The added seed helper writes two tiny input files in the runner's temporary directory. The added read-back prints result.txt so you can observe its contents. These setup and inspection steps are not additional exam blanks. Successful run removes the three temporary files.

```c
#include <stdio.h>
int seed(const char *path, const char *text) {
    FILE *f = fopen(path, "w");
    if (f == NULL) return 0;
    int written = fputs(text, f);
    int closed = fclose(f);
    return written != EOF && closed != EOF;
}
int main(void) {
    if (!seed("data1.in", "1 3\n") || !seed("data2.in", "7 4\n")) return 1;
    FILE *in1 = fopen("data1.in", __A__);
    FILE *in2 = fopen("data2.in", "r");
    FILE *out = fopen("result.txt", __B__);
    if (in1 == NULL || in2 == NULL || out == NULL) {
        if (in1 != NULL) fclose(in1);
        if (in2 != NULL) fclose(in2);
        if (out != NULL) fclose(out);
        return 1;
    }
    int x, y, failed = 0;
    while (fscanf(in1, "%d", __C__) == 1 &&
           fscanf(in2, "%d", &y) == 1) {
        if (fprintf(out, "%d\n", __D__) < 0) { failed = 1; break; }
    }
    if (ferror(in1) || ferror(in2)) failed = 1;
    if (fclose(in1) == EOF) failed = 1;
    if (fclose(in2) == EOF) failed = 1;
    if (fclose(out) == EOF) failed = 1;
    if (failed) return 1;
    out = fopen("result.txt", "r");
    if (out == NULL) return 1;
    int c;
    while ((c = fgetc(out)) != EOF) putchar(c);
    if (ferror(out)) failed = 1;
    if (fclose(out) == EOF) failed = 1;
    remove("data1.in"); remove("data2.in"); remove("result.txt");
    return failed;
}
```

Answers: A = `"r"`; B = `"w"`; C = `&x`; D = `x + y`.

Reasoning: inputs open for reading, while result opens for replacement. Each successful pair yields 1 + 7 = 8 and 3 + 4 = 7. Addresses let fscanf store the values; fprintf uses their sum. Both inputs here contain exactly two valid integers. For arbitrary files, separately handle malformed input and unequal lengths. Short-circuit && reads the second file only if the first read succeeded. The error flags are checked before closing streams; no stream is used after fclose.

Output (also the result file's contents before cleanup):

```text
8
7
```

## Must memorise

- stdio.h; FILE *; fopen; check NULL; fclose every opened stream.
- Modes: r existing read, w replace/create, a append; + adds the other access direction.
- `fscanf(in, "%d", &x) == 1`; `fprintf(out, "%d\n", x)`.
- `while (fgets(buf, sizeof buf, in) != NULL) fputs(buf, out)` for line copying.
- fputs adds no newline; fgets keeps one if read; fgetc needs an int for EOF.
