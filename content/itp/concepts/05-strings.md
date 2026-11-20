# Strings and character handling

Topic ID: `strings`

## Concept from zero

A C string is a sequence of char cells ending in the zero character '\0'. `char word[] = "cat"` has four cells: 'c', 'a', 't', '\0'. The terminator tells string functions where to stop; it is not a visible '0', a space, or a newline. An array of characters without a terminator is not yet a C string.

Capacity is storage size; length is characters before '\0'. strlen(word) is 3 here and returns size_t. sizeof word is 4 where word is this actual array. A string parameter is a pointer, so sizeof on it cannot discover buffer capacity. Keep space for the terminator: 19 characters plus '\0' fit in char name[20].

Most uses of an array name give the address of its first character, so scanf("%19s", name) already receives char *. It reads one whitespace-delimited word and writes a terminator on success. Check its return value before using the string. fgets(name, sizeof name, stdin) can read spaces, reserves terminator space, and retains a newline if one was read. Check for NULL first; long lines may arrive in pieces. `scanf(" %c", &c)` uses a leading space to skip leftover whitespace, whereas `%c` alone reads the next character including a newline.

string.h declares strlen, strcpy, strcat, strcmp, strchr. strcpy copies through the source's terminator. strcat first finds the destination's terminator, then appends there; the destination must already be a valid string. Both require enough capacity and nonoverlapping source/destination. strcmp compares contents and returns zero for equality (negative/positive for ordering, not necessarily -1/1). strchr returns a pointer to a character's first occurrence, or NULL if absent.

ctype.h declares islower, isupper, toupper, tolower. Conversions return a character code; they do not write back through the argument. Store the result. Cast a char to unsigned char before passing it to ctype functions so negative char values do not violate their argument requirements (EOF is the separate allowed sentinel).

`char s[] = "cat"` makes a writable array. A pointer to a string literal, preferably declared const char *, must not be used to modify that literal. Copy into writable storage before changing characters.

## Blank-spotting tips

- A loop condition s[i] != '\0' scans a string. If a program builds a new char array, look for a missing final destination[len] = '\0'.
- `%s` in printf needs a terminated character sequence's address; `%c` needs one character value. scanf `%s` needs the array name without &, while `%c` into char c needs &c.
- If the program prints equality, `strcmp(a, b) == 0` is the key test; a == b compares addresses.
- Choose strcpy for establishing a destination from a source; choose strcat only when an existing terminated prefix is being extended.
- For alternating case, index 0 is even, so i % 2 == 0 selects the first, third, fifth characters. For every third character starting at the third, test (i + 1) % 3 == 0.

## Common traps

- `hidden[len] = '0'` stores a visible digit and does not terminate the string. Use '\0'.
- `toupper(s[i]);` throws away the converted result; assign it back.
- A char array cannot be assigned a string with = after declaration. Use strcpy with enough capacity.
- strcat on an uninitialised destination searches unknown storage for '\0'. The bank's p5 Q6c needs a repair: first strcpy the prefix, then strcat the suffix.
- `%20s` into char s[20] can need 21 cells including '\0'; use `%19s`.
- strlen counts bytes before '\0', not the array's available capacity. A char matrix row is a string only if terminated within that row.

## Worked example: alternate case

Adapted from bank section 5.3, p2 Q11; fixed writable input keeps the conversion visible.

```c
#include <stdio.h>
#include <ctype.h>
int main(void) {
    char word[] = "police";
    for (int i = 0; word[i] != __A__; ++i) {
        unsigned char c = (unsigned char)word[i];
        word[i] = (i % 2 == 0) ? __B__ : tolower(c);
    }
    printf("%s\n", word);
    return 0;
}
```

Answers: A = `'\0'`; B = `toupper(c)`.

Reasoning: indices 0, 2, 4 become uppercase; 1, 3, 5 stay lowercase. The assignment stores each returned code back into writable storage. The terminator is left in place.

Output:

```text
PoLiCe
```

## Worked example: repair concatenation

Adapted from bank section 5.6, p5 Q6c, explicitly repairing its uninitialised destination.

```c
#include <stdio.h>
#include <string.h>
int main(void) {
    char result[30];
    __A__(result, "bake");
    __B__(result, "monogatari");
    printf("%s %zu\n", result, __C__);
    return 0;
}
```

Answers: A = `strcpy`; B = `strcat`; C = `strlen(result)`.

Reasoning: strcpy establishes "bake" plus '\0'. strcat replaces that terminator with the suffix and writes a new terminator. Length is 4 + 10 = 14, so 15 cells are needed; 30 is sufficient. strlen returns size_t, hence %zu.

Output:

```text
bakemonogatari 14
```

## Must memorise

- Terminator '\0'; length excludes it; capacity must include it.
- Bounded input `scanf("%19s", name)` for char name[20]; single char `scanf(" %c", &c)`.
- Equality `strcmp(a, b) == 0`; occurrence `strchr(s, c) != NULL`.
- Copy then append: strcpy(dest, prefix), strcat(dest, suffix), with checked capacity.
- Store conversions: `s[i] = toupper((unsigned char)s[i])`; include ctype.h.
