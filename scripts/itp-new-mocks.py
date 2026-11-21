# D and E: one new question in each P1..P5 family, in that exact order.
add('mock-d1','arrays','Daily prefixes, Target counts and Usage percentages',
 'Build cumulative daily ticket sales, count target days and report the percentage of available tickets sold.',
 ['Daily sales are 6, 9, 4, 11, 5 with 12 seats available each day. Target days sell at least 8 tickets.',
  'Each prefix entry includes the current day. Unused seats = 5*12 minus total sales.',
  'Usage percentage = total sold divided by total capacity times 100, printed to one decimal.'],r'''
#include <stdio.h>
int main(void) {
    int daily[] = {6,9,4,11,5}, prefix[5];
    int total = {{0::Begin accumulation before the first day.}}, target_days = 0;
    for (int i = 0; {{i < 5::Process five daily readings.}}; ++i) {
        total += {{daily[i]::Add the current day's sales.}};
        prefix[i] = {{total::Store an inclusive cumulative sum.}};
        if ({{daily[i] >= 8::The target condition includes exactly eight.}}) {{++target_days|||target_days++::Count the qualifying day.}};
    }
    int capacity = {{5 * 12::There are twelve available seats on each day.}};
    int unused = {{capacity - total::Subtract sold tickets from available capacity.}};
    double usage = {{100.0 * total / capacity::Floating arithmetic retains the fractional percentage.}};
    printf("Prefixes=%d %d %d %d %d\n", prefix[0], prefix[1], prefix[2], prefix[3], prefix[4]);
    printf("Target=%d Unused=%d\n", target_days, unused);
    printf("Usage=%.1f%%\n", {{usage::A doubled percent sign prints a literal percent.}});
    return 0;
}''','Prefixes=6 15 19 30 35\nTarget=2 Unused=25\nUsage=58.3%\n',
 'prefix array-total cast for',pool='mock',priority='core',pattern='P1',main=['prefix'])

add('mock-d2','functions','Binary lookup, Array parameters and Persistent calls',
 'Search two targets in a sorted array using an array function that retains a static call number.',
 ['Use sorted values 3, 6, 10, 15, 21. Search 15 and then 4, returning a matching index or -1.',
  'Print the persistent call number at the start of each function entry. Use an inclusive iterative binary-search interval.',
  'The array is read-only; do not modify it while searching.'],r'''
#include <stdio.h>
int search({{const int a[]|||const int *a::Pass the array as a read-only sequence.}}, int n, int key) {
    {{static::The local call number must survive between calls.}} int calls = 0;
    printf("Call=%d\n", {{++calls::Increment before printing the call number.}});
    int low = 0, high = n - 1;
    while ({{low <= high::Inclusive bounds allow a one-element search interval.}}) {
        int mid = {{low + (high - low) / 2::Choose the midpoint of the remaining interval.}};
        if (a[mid] == key) return {{mid::A matching midpoint is the requested array index.}};
        if (a[mid] < key) low = {{mid + 1::Discard the lower half including mid.}};
        else high = {{mid - 1::Discard the upper half including mid.}};
    }
    return {{-1::An empty interval signals absence.}};
}
int main(void) {
    int values[] = {3,6,10,15,21};
    int first = {{search(values, 5, 15)::Call the search function with the first fixed target.}};
    int second = search(values, 5, 4);
    printf("Indices=%d %d\n", first, second);
    return 0;
}''','Call=1\nCall=2\nIndices=3 -1\n',
 'binary-search static-local array-parameter return',pool='mock',priority='core',pattern='P2',main=['binary-search','static-local'])

add('mock-d3','strings','Palindrome matching, Vowel counts and Case folding',
 'Test whether a fixed mixed-case word is a palindrome ignoring case and count its vowels.',
 ['Use "ReFeR". Compare lowercase forms of mirrored characters, without changing the source.',
  'Count a, e, i, o, u in either case over the whole word. Use unsigned-char inputs for ctype calls.',
  'Print a yes/no palindrome result and the vowel count.'],r'''
#include <stdio.h>
#include <string.h>
#include <ctype.h>
int main(void) {
    char s[] = "ReFeR";
    int n = {{(int)strlen(s)::Measure only the nonterminal characters.}};
    int ok = {{1::Assume symmetry until a mismatch is found.}}, vowels = 0;
    for (int i = 0; {{i < n / 2::Compare each mirrored pair once.}}; ++i) {
        int a = {{tolower((unsigned char)s[i])::Normalise the left character safely.}};
        int b = {{tolower((unsigned char)s[n - 1 - i])::Normalise the corresponding right character.}};
        if ({{a != b::A case-insensitive mismatch disproves the palindrome.}}) ok = 0;
    }
    for (int i = 0; i < n; ++i) {
        int c = {{tolower((unsigned char)s[i])::Vowel matching uses the same normalised case.}};
        if ({{c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u'::Any one of the five vowels qualifies.}}) {{++vowels|||vowels++::Count one vowel occurrence.}};
    }
    printf("Palindrome=%s Vowels=%d\n", {{ok ? "yes" : "no"::Select the requested text verdict.}}, vowels);
    return 0;
}''','Palindrome=yes Vowels=2\n',
 'string-palindrome character-count ctype-case strlen',pool='mock',priority='core',pattern='P3',main=['string-palindrome','character-count'])

add('mock-d4','structs','Nested dimensions, Pointer scaling and Value copies',
 'Scale a named panel through a pointer, contrast a change to a by-value copy and compute the resulting area.',
 ['A Panel has a char-array name and a nested Size containing width and height. Start at width 3, height 5.',
  'A by-value helper changes only its copy, while a pointer helper doubles both original dimensions.',
  'Print the copy area, then the original name, dimensions and final area.'],r'''
#include <stdio.h>
#include <string.h>
typedef struct { int width, height; } Size;
typedef struct { char name[16]; Size size; } Panel;
int copy_area({{Panel p::A by-value parameter is a separate complete record.}}) {
    p.size.width = {{1::Changing the copied width cannot affect main.}};
    return {{p.size.width * p.size.height::Compute area using the modified local copy.}};
}
void scale({{Panel *p::The address lets this helper mutate the original nested record.}}) {
    {{p->size.width::Use arrow for the outer pointer and dot for its nested value.}} *= 2;
    p->size.height {{*=::Both original dimensions are doubled.}} 2;
}
int main(void) {
    Panel p = {"", {3,5}};
    {{strcpy(p.name, "North")::Copy the fixed name into the record's character array.}};
    printf("CopyArea=%d\n", {{copy_area(p)::Passing by value leaves the original dimensions intact.}});
    scale({{&p::Pass the original record's address for persistent mutation.}});
    printf("%s %d %d Area=%d\n", p.name, p.size.width, p.size.height,
           {{p.size.width * p.size.height::Compute the scaled original area.}});
    return 0;
}''','CopyArea=5\nNorth 6 10 Area=60\n',
 'nested-struct struct-value-pointer arrow strcpy',pool='mock',priority='core',pattern='P4',main=['nested-struct','struct-value-pointer'])

add('mock-d5','files','Appended readings, Zeroed arrays and Maximum search',
 'Create two readings, append two more, load all four into zeroed heap storage and print the maximum.',
 ['Write 13 and 4 to batch.txt, close it, then append 19 and 8 using append mode.',
  'Reopen in read mode, allocate four zero-initialised ints and read exactly four successful conversions.',
  'Initialise the maximum from the first read value. Free the heap block and close every stream on success and failure.'],r'''
#include <stdio.h>
#include <stdlib.h>
int main(void) {
    FILE *fp = fopen("batch.txt", "w");
    if (!fp) return 1;
    fprintf(fp, "13\n4\n"); fclose(fp);
    fp = {{fopen("batch.txt", "a")::Append mode preserves the two existing readings.}};
    if ({{fp == NULL|||!fp::Guard the append stream.}}) return 1;
    {{fprintf(fp, "19\n8\n")::Add the two new readings as text.}};
    {{fclose(fp)::Complete the appended output before reading.}};
    fp = fopen("batch.txt", "r");
    if (!fp) return 1;
    int *a = {{calloc(4, sizeof *a)::Allocate four zeroed integer entries.}};
    if ({{a == NULL|||!a::Close the file if allocation fails.}}) { fclose(fp); return 1; }
    for (int i = 0; i < 4; ++i) {
        if ({{fscanf(fp, "%d", a + i)::Pointer arithmetic supplies the next destination address.}} != 1) { free(a); fclose(fp); return 1; }
    }
    fclose(fp);
    int largest = {{a[0]::Seed from actual data rather than an arbitrary sentinel.}};
    for (int i = 1; i < 4; ++i) if ({{a[i] > largest::Replace the maximum when a larger entry is found.}}) largest = a[i];
    printf("Maximum=%d\n", largest);
    {{free(a)::Release the array after its final use.}};
    return 0;
}''','Maximum=19\n','calloc file-a extreme-index file-r formatted-file free',pool='mock',priority='core',pattern='P5',main=['calloc','file-a','extreme-index'],files={'batch.txt':'13\n4\n19\n8\n'})

add('mock-e1','arrays','Daily rotation, Distinct rankings and Mean activity',
 'Rotate daily counts right once, find their second distinct largest value, and report the mean and below-target count.',
 ['Use 5, 12, 7, 12, 9. Rotate by moving the last entry to the front and shifting the other entries right.',
  'Track largest and second distinct largest in a single scan, ignoring repeated maxima. These positive values have at least two distinct entries.',
  'Count days with values at least 9; below-target days = five minus that count. Print the mean with one decimal.'],r'''
#include <stdio.h>
int main(void) {
    int a[] = {5,12,7,12,9};
    int last = {{a[4]::Save the final day before shifting.}};
    for (int i = 4; i > 0; --i) a[i] = {{a[i - 1]::Shift from right to left without losing earlier values.}};
    a[0] = {{last::Wrap the saved final value to the front.}};
    int best = 0, second = 0, total = 0, reached = 0;
    for (int i = 0; i < 5; ++i) {
        total += a[i];
        if (a[i] >= 9) ++reached;
        if ({{a[i] > best::A new largest demotes the previous largest.}}) {
            second = {{best::The previous maximum becomes second distinct largest.}};
            best = a[i];
        } else if ({{a[i] < best && a[i] > second::Ignore equal maxima and improve only the distinct runner-up.}}) second = {{a[i]::Keep the best qualifying runner-up.}};
    }
    printf("First=%d Second=%d\n", a[0], second);
    printf("Below=%d Mean=%.1f\n", {{5 - reached::Derive the complement of the target count.}}, {{(double)total / 5::Convert before dividing to retain the mean fraction.}});
    return {{0::Signal successful completion.}};
}''','First=9 Second=9\nBelow=2 Mean=9.0\n','rotate second-largest array-total cast',pool='mock',priority='core',pattern='P1',main=['rotate','second-largest'])

add('mock-e2','functions','Selection sorting, Last-index search and Block scope',
 'Sort an array in a user-defined function, find the last matching index and demonstrate a nested local hiding another local.',
 ['Use 8, 3, 8, 1, 6 and selection-sort ascending. Then search all entries for the last 8.',
  'The search returns -1 if absent. A block declares code=9 inside main, whose outer code=2 remains unchanged.',
  'Print the block value, the outer value and the last matching sorted index.'],r'''
#include <stdio.h>
void sort(int a[], int n) {
    for (int i = 0; i < n - 1; ++i) {
        int smallest = {{i::Start the selection at the beginning of the unsorted suffix.}};
        for (int j = i + 1; j < n; ++j) if ({{a[j] < a[smallest]::Remember the smallest remaining value.}}) smallest = j;
        int t = a[i]; a[i] = {{a[smallest]::Bring the selected minimum forward.}}; a[smallest] = t;
    }
}
int last(const int a[], int n, int key) {
    int result = {{-1::No match is represented by a negative index.}};
    for (int i = 0; i < n; ++i) if ({{a[i] == key::Each equality may replace the previous matching index.}}) result = {{i::Retain the latest matching position.}};
    return {{result::Return the final last-occurrence index.}};
}
int main(void) {
    int a[] = {8,3,8,1,6}, code = 2;
    sort({{a, 5::Pass the caller's array so sorting modifies its elements.}});
    {
        int code = 9;
        printf("Block=%d\n", {{code::The inner declaration wins inside this block.}});
    }
    printf("Outer=%d Last=%d\n", code, {{last(a, 5, 8)::Search the sorted array for the final matching index.}});
    return 0;
}''','Block=9\nOuter=2 Last=4\n','selection linear-last block-scope array-parameter',pool='mock',priority='core',pattern='P2',main=['selection','linear-last','block-scope'])

add('mock-e3','strings','Concatenated phrases, Word states and Uppercase conversion',
 'Join two hard-coded phrases, uppercase the resulting sentence and count its words.',
 ['Use a 40-byte destination initially containing "learn C" and append "  each day".',
  'Count words on transitions from a space to a non-space, so the double space creates no empty word.',
  'Store the result of toupper for each character using an unsigned-char input. Preserve spaces and termination.'],r'''
#include <stdio.h>
#include <string.h>
#include <ctype.h>
int main(void) {
    char sentence[40] = "learn C";
    {{strcat::Append after the destination's existing terminator.}}(sentence, {{"  each day"::The suffix deliberately starts with two spaces.}});
    int words = {{0::The word counter begins before any word is seen.}}, inside = 0;
    for (int i = 0; {{sentence[i] != '\0'::Do not transform or count the terminal byte.}}; ++i) {
        if ({{sentence[i] == ' '::Space leaves the current word.}}) inside = 0;
        else if ({{!inside::A non-space after a gap begins a new word.}}) {
            {{++words|||words++::Count that new word once.}};
            inside = {{1::Subsequent letters belong to the same word.}};
        }
        sentence[i] = {{toupper((unsigned char)sentence[i])::Store the conversion result back into the sentence.}};
    }
    printf("%s\nWords=%d Length=%zu\n", sentence, words, {{strlen(sentence)::Count all retained characters including spaces.}});
    return 0;
}''','LEARN C  EACH DAY\nWords=4 Length=17\n','strcat word-count ctype-case strlen nul',pool='mock',priority='core',pattern='P3',main=['strcat','word-count','ctype-case'])

add('mock-e4','structs','Enum records, Field ranking and Struct return values',
 'Sort named packages by mass, return the first package by value and print it through a struct pointer.',
 ['Package records contain name, mass and an enum zone: LOCAL=0 or REMOTE=1. Use Cedar 8/REMOTE, Ash 3/LOCAL, Elm 5/LOCAL.',
  'Selection-sort the whole records in ascending mass. A helper returns the first sorted record by value.',
  'Point to that returned record and print its name, mass and numeric enum zone with arrow access.'],r'''
#include <stdio.h>
enum Zone { LOCAL, REMOTE };
typedef struct { char name[12]; int mass; enum Zone zone; } Package;
{{Package::Return a complete record rather than a pointer to a local object.}} lightest(Package a[]) { return {{a[0]::The sorted first record has the least mass.}}; }
int main(void) {
    Package a[] = {{"Cedar",8,REMOTE},{"Ash",3,LOCAL},{"Elm",5,LOCAL}};
    for (int i = 0; i < 2; ++i) {
        int k = {{i::Begin with the current unsorted position.}};
        for (int j = i + 1; j < 3; ++j) if ({{a[j].mass < a[k].mass::Rank by the mass field.}}) k = j;
        Package t = {{a[i]::Save the complete record.}};
        a[i] = {{a[k]::Move the selected lighter record forward.}};
        a[k] = {{t::Restore the saved record in the vacated position.}};
    }
    Package chosen = lightest(a);
    Package *p = {{&chosen::Point to a record whose lifetime lasts through printing.}};
    printf("%s Mass=%d Zone=%d\n", {{p->name::Access the name field through the pointer.}}, {{p->mass::Access the selected mass through the same pointer.}}, p->zone);
    return 0;
}''','Ash Mass=3 Zone=0\n','enum struct-sort struct-return arrow typedef',pool='mock',priority='core',pattern='P4',main=['enum','struct-sort','struct-return'])

add('mock-e5','files','File updates, Dynamic growth and Reading averages',
 'Create a readings file, update its first value, grow an int array while reading and calculate the mean.',
 ['Seed values.txt with 2, 6 and 10 on separate lines. Reopen r+ and overwrite the initial one-digit 2 with one-digit 4; rewind before reading.',
  'Start capacity two and grow it to four when the third integer is read, using a temporary realloc result.',
  'On any allocation failure release owned memory and close the file. Print the successful count and floating average to one decimal.'],r'''
#include <stdio.h>
#include <stdlib.h>
int main(void) {
    FILE *fp = fopen("values.txt", "w");
    if (!fp) return 1;
    fprintf(fp, "2\n6\n10\n"); fclose(fp);
    fp = {{fopen("values.txt", "r+")::Update the existing file without truncating it.}};
    if (!fp) return 1;
    {{fputc('4', fp)::Replace the first byte with another single-digit value.}};
    {{rewind(fp)::Seek before switching from writing to reading.}};
    int capacity = 2, n = 0, value, total = 0;
    int *a = {{malloc(capacity * sizeof *a)::Reserve the initial two slots.}};
    if (!a) { fclose(fp); return 1; }
    while ({{fscanf(fp, "%d", &value)::Read a complete integer into a temporary value.}} == 1) {
        if (n == capacity) {
            capacity *= 2;
            int *next = {{realloc(a, capacity * sizeof *a)::Grow using a temporary pointer so failure cannot lose the block.}};
            if ({{next == NULL|||!next::The old allocation still belongs to a on failure.}}) { free(a); fclose(fp); return 1; }
            a = {{next::Adopt the successful grown allocation.}};
        }
        a[n++] = value;
        total += value;
    }
    fclose(fp);
    printf("Count=%d Mean=%.1f\n", n, {{(double)total / n::Convert before dividing the accumulated readings.}});
    {{free(a)::Release the final heap array.}};
    return 0;
}''','Count=3 Mean=6.7\n','file-rplus realloc array-total formatted-file free',pool='mock',priority='core',pattern='P5',main=['file-rplus','realloc','array-total'],files={'values.txt':'4\n6\n10\n'})

# F uses high-value methods outside D/E's main-method tags.
add('mock-f1','matrices','Rectangular products, Dot products and Matrix output',
 'Multiply a fixed 2 by 3 matrix by a 3 by 2 matrix and print the 2 by 2 product.',
 ['Left rows are {2,1,3} and {0,4,2}; right rows are {1,2}, {3,0}, {2,1}.',
  'Each product cell sums three pairwise products from a left row and right column. Initialise each result cell before accumulation.'],r'''
#include <stdio.h>
int main(void) {
    int a[2][3] = {{2,1,3},{0,4,2}};
    int b[3][2] = {{1,2},{3,0},{2,1}}, c[2][2];
    for (int i = {{0::Begin at the first result row.}}; {{i < 2::There are two left rows.}}; ++i) {
        for (int j = {{0::Begin at the first result column.}}; {{j < 2::There are two right columns.}}; ++j) {
            c[i][j] = {{0::Reset the dot product before adding its terms.}};
            for (int k = 0; {{k < 3::The shared inner dimension is three.}}; ++k) {
                c[i][j] {{+=::Accumulate each pairwise product.}} {{a[i][k]::Select an entry across the left row.}} * {{b[k][j]::Select an entry down the right column.}};
            }
        }
    }
    for (int i = 0; i < 2; ++i) {
        printf("%d %d\n", c[i][0], {{c[i][1]::Print both entries in the current product row.}});
    }
    return 0;
}''','11 7\n16 2\n','matrix-multiply for',pool='mock',priority='extra',main=['matrix-multiply'])

add('mock-f2','functions','Recursive search, Sorted intervals and Missing targets',
 'Search a sorted array recursively for one present and one absent target.',
 ['Use 4, 9, 16, 25, 36, 49. Search 36 and 18.',
  'The interval is inclusive. Return -1 when low exceeds high; otherwise compare the midpoint and recurse into exactly one smaller interval.'],r'''
#include <stdio.h>
int search(const int a[], int low, int high, int target) {
    if ({{low > high::An empty interval is the failure base case.}}) return {{-1::Use the absent-target sentinel.}};
    int mid = {{low + (high - low) / 2::Choose a midpoint inside the current interval.}};
    if ({{a[mid] == target::A midpoint equality is the success base case.}}) return {{mid::Return the found zero-based index.}};
    if (target < a[mid]) {
        return search(a, low, {{mid - 1::Exclude the midpoint from the lower recursive interval.}}, target);
    }
    return search(a, {{mid + 1::Exclude the midpoint from the upper recursive interval.}}, high, target);
}
int main(void) {
    int a[] = {4,9,16,25,36,49};
    int n = {{sizeof a / sizeof a[0]::Compute the number of array entries.}};
    int present = search(a, 0, {{n - 1::The final valid index is one below the length.}}, 36);
    int absent = {{search(a, 0, n - 1, 18)::Run the same recursive algorithm for the missing target.}};
    printf("Found=%d Missing=%d\n", present, absent);
    return 0;
}''','Found=4 Missing=-1\n','rec-binary array-parameter sizeof return',pool='mock',priority='extra',main=['rec-binary'])

add('mock-f3','functions','Recursive factorials, Digit recursion and Result composition',
 'Compute a factorial and the sum of its decimal digits using two separate recursive functions.',
 ['Factorial returns one when n<=1 and otherwise returns n times factorial(n-1). Use n=6.',
  'Digit sum returns zero at zero and otherwise combines the last digit with the digit sum of the remaining quotient.',
  'Store the factorial before passing it to the digit function; the chosen values fit int.'],r'''
#include <stdio.h>
int factorial(int n) {
    if ({{n <= 1::Stop before the factorial argument becomes negative.}}) return {{1::Use the factorial identity.}};
    return {{n::The current factor multiplies the smaller factorial.}} * factorial({{n - 1::Reduce the factorial argument by one.}});
}
int digits(int n) {
    if ({{n == 0::No remaining digits means no further contribution.}}) return {{0::Digit sum uses the additive identity.}};
    return {{n % 10::Extract the current last digit.}} + digits({{n / 10::Discard the processed last digit.}});
}
int main(void) {
    int result = {{factorial(6)::Compute the complete factorial first.}};
    int sum = {{digits(result)::Recurse over the computed factorial's digits.}};
    printf("Factorial=%d Digits=%d\n", result, sum);
    return 0;
}''','Factorial=720 Digits=9\n','rec-factorial rec-digits return',pool='mock',priority='extra',main=['rec-factorial','rec-digits'])

add('mock-f4','memory','Dynamic matrices, Row ownership and Column reduction',
 'Build a dynamic 3 by 2 matrix, populate it with a formula and compute the second-column sum.',
 ['Allocate three row pointers, then two ints for each row. Set cell (i,j)=10*i+j+1.',
  'If a row allocation fails, free all earlier rows and the row-pointer table.',
  'After reducing column index 1, free every row before freeing the table.'],r'''
#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int **m = {{malloc(3 * sizeof *m)::Reserve the table of three row pointers.}};
    if ({{m == NULL|||!m::Check the outer allocation first.}}) return 1;
    for (int i = 0; i < 3; ++i) {
        m[i] = {{malloc(2 * sizeof *m[i])::Reserve two integers for this row.}};
        if ({{m[i] == NULL|||!m[i]::A failed row requires partial cleanup.}}) {
            for (int k = 0; k < i; ++k) {{free(m[k])::Release only previously completed rows.}};
            free(m); return 1;
        }
        for (int j = 0; j < 2; ++j) m[i][j] = {{10 * i + j + 1::Use the specified deterministic cell formula.}};
    }
    int total = {{0::Start the selected-column sum.}};
    for (int i = 0; i < 3; ++i) total += {{m[i][1]::Vary the row and keep column one fixed.}};
    printf("Column=%d\n", total);
    for (int i = 0; i < 3; ++i) {{free(m[i])::Release each allocated row.}};
    {{free(m)::Release the outer pointer table last.}};
    return 0;
}''','Column=36\n','dynamic-matrix malloc null-allocation free leaks column-sum',pool='mock',priority='extra',main=['dynamic-matrix','leaks'])

add('mock-f5','files','Character streams, Line counts and Whitespace states',
 'Create a fixed text log, scan it byte by byte, and report characters, words and newline count.',
 ['Write "go now\\n\\nrest\\n" into log.txt, then reopen for reading.',
  'Count all bytes, count a line for every newline, and count words when non-whitespace follows whitespace or the start.',
  'Store fgetc in int to distinguish EOF. Close the file after scanning.'],r'''
#include <stdio.h>
#include <ctype.h>
int main(void) {
    FILE *fp = fopen("log.txt", "w");
    if (!fp) return 1;
    fputs("go now\n\nrest\n", fp); fclose(fp);
    fp = {{fopen("log.txt", "r")::Reopen the completed log without truncation.}};
    if ({{fp == NULL|||!fp::Check before reading.}}) return 1;
    int ch, chars = 0, words = 0, lines = 0, inside = 0;
    while ((ch = {{fgetc(fp)::Read the next byte into an int.}}) != {{EOF::Stop only at the end-of-file sentinel.}}) {
        {{++chars|||chars++::Count every successful byte read.}};
        if ({{ch == '\n'::Even an empty line contributes one newline.}}) ++lines;
        if ({{isspace((unsigned char)ch)::Any whitespace ends the current word.}}) inside = 0;
        else if ({{!inside::The first non-whitespace character starts a word.}}) { {{++words|||words++::Count the word once on entry.}}; inside = 1; }
    }
    {{fclose(fp)::Release the read stream.}};
    printf("Chars=%d Words=%d Lines=%d\n", chars, words, lines);
    return 0;
}''','Chars=13 Words=3 Lines=3\n','char-file file-count file-r file-null file-close',pool='mock',priority='extra',main=['char-file','file-count'])
