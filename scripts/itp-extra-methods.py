# Executed by itp-exam-pattern.py, which owns add() and UTF-8 output.
for variant,data in enumerate([[5,-2,11,4,11],[8,3,-4,6,2]],1):
    lo=min(data); hi=max(data)
    add(f'indexed-extremes-{variant}','arrays','Array extrema, First indices and Frequency counting',
      'Find the minimum and maximum values with their first indices, then count how often the maximum occurs.',
      [f'Use {data}. Seed both indices at zero and compare every later entry.',
       'Use strict comparisons so equal extrema keep their first position. A second loop counts all entries equal to the selected maximum.'],r'''
#include <stdio.h>
int main(void) {
    int a[] = {DATA};
    int low = {{0::The first element is an initial candidate for the minimum.}};
    int high = {{0::The first element is also an initial candidate for the maximum.}};
    for (int i = 1; {{i < 5::Compare all later valid entries.}}; ++i) {
        if ({{a[i] < a[low]::A strict comparison preserves the first minimum index.}}) low = {{i::Remember the new minimum's position.}};
        if ({{a[i] > a[high]::A strict comparison preserves the first maximum index.}}) high = {{i::Remember the new maximum's position.}};
    }
    int frequency = {{0::No occurrences have been counted before the second scan.}};
    for (int i = 0; i < 5; ++i) {
        if ({{a[i] == a[high]::Compare each entry with the maximum value.}}) {{++frequency|||frequency++::Count every occurrence, including the first.}};
    }
    printf("Min=%d At=%d Max=%d At=%d\n", a[low], low, a[high], high);
    printf("Frequency=%d\n", frequency);
    return 0;
}'''.replace('DATA',','.join(map(str,data))),f'Min={lo} At={data.index(lo)} Max={hi} At={data.index(hi)}\nFrequency={data.count(hi)}\n',
      'extreme-index frequency linear-count for',priority='core')

add('bitwork','operators','Bit masks, XOR swaps and Formatted output',
 'Manipulate two unsigned flags, swap two distinct integers with XOR and print a typed status line.',
 ['Use flags 10 and 6; show bitwise AND, OR, XOR, a left shift by one and a right shift by one.',
  'Swap 9 and 14 using three separate XOR assignments; no variable may be read and modified without sequencing.',
  'Print integer, fixed-point, character, string, long, long long, hexadecimal and width-controlled fields using their matching types. ASCII is assumed.'],r'''
#include <stdio.h>
#define STEP 1
int main(void) {
    const unsigned x = 10, y = 6;
    unsigned both = {{x & y::AND keeps only bits present in both flags.}};
    unsigned either = {{x | y::OR keeps bits present in either flag.}};
    unsigned different = {{x ^ y::XOR keeps bits present in exactly one flag.}};
    unsigned left = {{x << STEP::Shift left one place to double this unsigned value.}};
    unsigned right = {{x >> STEP::Shift right one place to halve this unsigned value.}};
    int a = 9, b = 14;
    a {{^=::First XOR step combines the two distinct objects.}} b;
    b ^= a;
    a {{^=::The final XOR step leaves the original b in a.}} b;
    char letter = {{'A' + 2::ASCII character arithmetic advances two letters.}};
    printf("%u %u %u %u %u\n", both, either, different, left, right);
    printf("%d %d\n", a, b);
    printf({{"%d %f %.2f %c %s %ld %lld %x %4d\n"::Each conversion must match its argument type; width four pads the final integer.}},
           3, 1.5, 2.25, letter, "go", 8L, 12LL, 31u, 7);
    printf("Step=%d\n", {{STEP::Use the preprocessor constant.}});
    return 0;
}''','2 14 12 20 5\n14 9\n3 1.500000 2.25 C go 8 12 1f    7\nStep=1\n',
 'bitwise xor-swap formats ascii macro const',main=['bitwise','formats','xor-swap'])

add('decisions','operators','Short circuits, Conditional ladders and Sequenced increments',
 'Classify a score and demonstrate skipped side effects, integer versus floating division and sequenced increments.',
 ['Classify 73 as high for 80 or above, middle for 60 through 79, otherwise low.',
  'The right side of false AND and true OR must not increment the counter. Evaluate every increment or decrement in its own statement.',
  'Compare 9 divided by 4 as an integer and as a float; then choose the larger of two post-update values.'],r'''
#include <stdio.h>
int main(void) {
    int mark = 73, calls = 0;
    int a = {{0 && ++calls::False AND short-circuits before touching the counter.}};
    int b = {{1 || ++calls::True OR short-circuits before touching the counter.}};
    const char *grade;
    if ({{mark >= 80::The highest range is tested first.}}) grade = "high";
    else if ({{mark >= 60::Reaching this test already excludes the high range.}}) grade = "middle";
    else grade = "low";
    int x = 4;
    int before = {{x++::Post-increment yields the old value and then increases x.}};
    int after = {{--x::Pre-decrement changes x before yielding its value.}};
    int whole = {{9 / 4::Integer operands truncate the fractional quotient.}};
    double fraction = {{(double)9 / 4|||9 / 4.0::Convert an operand before division.}};
    int larger = {{before > after ? before : after::The conditional expression chooses the larger value.}};
    printf("%s %d %d %d\n", grade, a, b, calls);
    printf("%d %d %d %.2f %d\n", before, after, whole, fraction, larger);
    printf("Precedence=%d\n", {{2 + 3 * 4::Multiplication binds before addition.}});
    return 0;
}''','middle 0 1 0\n4 4 2 2.25 4\nPrecedence=14\n',
 'short-circuit ladder increment integer-division cast ternary precedence const')

add('sentinel','loops','Sentinel scans, Switch fall-through and Loop control',
 'Scan fixed command codes until a sentinel, ignore negative codes, and accumulate command costs using a switch.',
 ['Read the hard-coded sequence 1, -2, 2, 3, 0, 9. Zero ends processing before the final 9.',
  'Negative values are skipped. Command 1 costs 2; command 2 adds 3 then falls into command 3, which adds 5; other positive codes cost zero.',
  'Count only processed positive commands. Show the count and total cost.'],r'''
#include <stdio.h>
int main(void) {
    int command[] = {1,-2,2,3,0,9};
    int i = 0, total = 0, count = 0;
    while ({{i < 6::Keep the read inside the fixed array.}}) {
        int code = command[{{i++::Consume one command, even when it will be skipped.}}];
        if ({{code == 0::The sentinel itself must not be processed.}}) {{break::Stop before reading later commands.}};
        if ({{code < 0::Negative commands have no cost or count.}}) {{continue::Skip the remainder of this iteration.}};
        switch ({{code::Dispatch according to the current command.}}) {
            case 1: total += 2; {{break::Command one must not fall through.}};
            case 2: total += 3;
            case 3: total += {{5::Both commands two and three execute this shared cost.}}; break;
            default: break;
        }
        {{++count|||count++::Count one accepted command after its cost is applied.}};
    }
    printf("Count=%d Cost=%d\n", count, total);
    return 0;
}''','Count=3 Cost=15\n','sentinel switch break-continue while increment')

add('pyramid','loops','Nested loops, Pyramid printing and Row totals',
 'Print a centred three-row pyramid and the total number of stars used.',
 ['For row r starting at 1, print 3-r leading spaces followed by 2*r-1 stars.',
  'Print no trailing spaces. Print a newline after each row, then the total stars.'],r'''
#include <stdio.h>
int main(void) {
    const int rows = 3;
    int total = {{0::Start the star counter before the outer loop.}};
    for (int r = {{1::Rows use one-based numbering.}}; {{r <= rows::Include the final pyramid row.}}; ++r) {
        for (int space = 0; {{space < rows - r::Leading spaces shrink by one each row.}}; ++space) {
            printf({{" "::Each pass prints one leading space.}});
        }
        int stars = {{2 * r - 1::Odd row widths centre the pyramid.}};
        for (int j = 0; {{j < stars::Print exactly the computed width.}}; {{++j|||j++::Advance to the next star.}}) {
            printf("*");
            {{++total|||total++::Count each star as it is emitted.}};
        }
        printf({{"\n"::Separate the printed rows.}});
    }
    printf("Stars=%d\n", total);
    return 0;
}''','  *\n ***\n*****\nStars=9\n','pyramid for const nested-loops',main=['pyramid'])

add('digit-lab','loops','Digit reversal, Digit totals and Palindrome tests',
 'Reverse 40804 while counting and summing its digits, then report whether it is a decimal palindrome.',
 ['Process at least one digit with a do-while loop so zero would have one digit.',
  'Extract the last digit with remainder by 10, append it to the reversed value, and discard it by integer division.',
  'Compare the reverse with the saved original. The chosen input fits safely in int.'],r'''
#include <stdio.h>
int main(void) {
    int original = 40804;
    int n = {{original::Keep the original untouched for the final test.}};
    int reversed = {{0::An empty reversed number begins at zero.}};
    int count = 0, sum = 0;
    do {
        int digit = {{n % 10::Remainder extracts the last decimal digit.}};
        reversed = {{reversed * 10 + digit::Shift existing reversed digits before appending.}};
        sum {{+=::Accumulate each extracted digit.}} digit;
        {{++count|||count++::Count the processed digit, including zeros.}};
        n {{/=::Integer division discards the final decimal digit.}} 10;
    } while ({{n > 0::Continue while unprocessed digits remain.}});
    int palindrome = {{reversed == original::A palindrome equals its reversal.}};
    printf("%d %d %d\n", reversed, count, sum);
    printf("Palindrome=%s\n", {{palindrome ? "yes" : "no"::Choose the required word from the Boolean test.}});
    return 0;
}''','40804 5 16\nPalindrome=yes\n','digit-reverse digit-sum digit-count number-palindrome do-while modulo')

add('number-tools','loops','Euclidean loops, Factorials and Perfect numbers',
 'Compute the GCD and LCM of 18 and 24, the factorial of 5, and whether 28 is perfect.',
 ['Use Euclid: repeatedly replace the pair by the second value and the remainder, stopping when the second is zero.',
  'LCM = first original value divided by GCD, times the second original value. Factorial multiplies 1 through 5.',
  'A perfect positive number equals the sum of its proper positive divisors; test divisors 1 through n/2.'],r'''
#include <stdio.h>
int main(void) {
    int a = 18, b = 24, x = a, y = b;
    while ({{y != 0|||y::The second Euclidean operand controls termination.}}) {
        int rest = {{x % y::Take the remainder before replacing either operand.}};
        x = {{y::The old second operand becomes the first.}};
        y = rest;
    }
    int lcm = {{a / x * b::Divide by the GCD before multiplying.}};
    long fact = {{1::One is the identity for repeated multiplication.}};
    for (int i = 1; i <= 5; ++i) fact {{*=::Multiply by every factor.}} i;
    int n = 28, sum = 0;
    for (int d = 1; {{d <= n / 2::No proper divisor exceeds half the number.}}; ++d) {
        if ({{n % d == 0::Only exact divisors contribute.}}) sum += d;
    }
    printf("GCD=%d LCM=%d Fact=%ld\n", x, lcm, {{fact::The long result matches the long conversion.}});
    printf("Perfect=%d\n", {{sum == n::Perfect means equal to the proper-divisor sum.}});
    return 0;
}''','GCD=6 LCM=72 Fact=120\nPerfect=1\n','gcd-lcm factorial perfect while modulo',main=['gcd-lcm','factorial','perfect'])

add('series','loops','Fibonacci updates, Power loops and Series sums',
 'Generate six Fibonacci terms, compute 3 to the fourth power and sum the first four reciprocal integers.',
 ['Start Fibonacci at 0 and 1; print six terms separated by single spaces without a trailing space.',
  'Compute the power by four multiplications from an initial product of one.',
  'Add 1/i as floating division for i=1 through 4; print the series sum to two decimals.'],r'''
#include <stdio.h>
int main(void) {
    int a = 0, b = 1;
    for (int i = 0; {{i < 6::Emit exactly six Fibonacci terms.}}; ++i) {
        printf("%s%d", i ? " " : "", {{a::The first state value is the current term.}});
        int next = {{a + b::Compute the next term before replacing the state.}};
        a = {{b::Advance the first state to the old second value.}};
        b = {{next::Retain the newly computed term.}};
    }
    puts("");
    int product = {{1::Repeated multiplication starts with one.}};
    for (int i = 0; {{i < 4::One multiplication per exponent unit.}}; ++i) {
        product *= {{3::The fixed base is three.}};
    }
    double series = 0;
    for (int i = 1; i <= 4; ++i) series += {{1.0 / i::A floating numerator prevents integer truncation.}};
    printf("Power=%d Series=%.2f\n", product, {{series::Print the accumulated reciprocal series.}});
    return 0;
}''','0 1 1 2 3 5\nPower=81 Series=2.08\n','fibonacci power series integer-division',main=['series','fibonacci','power'])

for variant,(data,key) in enumerate([([2,5,8,11,14,17],11),([1,4,7,10,13,16],6)],1):
    index=data.index(key) if key in data else -1
    add(f'binary-{variant}','arrays','Binary search, Array bounds and Search outcomes',
      'Search a sorted array iteratively and print the matching zero-based index, or -1 for absence.',
      [f'Use sorted data {data} with target {key}. Maintain inclusive low and high bounds.',
       'Choose low + (high-low)/2. On an unequal comparison, exclude the midpoint from the next interval.',
       'Stop on a match or an empty interval. Never read outside the six elements.'],r'''
#include <stdio.h>
int locate(const int a[], int n, int key) {
    int low = {{0::The first valid array index is zero.}}, high = n - 1;
    while ({{low <= high::An inclusive interval remains nonempty at equality.}}) {
        int mid = {{low + (high - low) / 2::This midpoint avoids adding both bounds directly.}};
        if ({{a[mid] == key::Equality means the search succeeded.}}) return {{mid::Report the matching zero-based index.}};
        if (a[mid] < key) low = {{mid + 1::Discard the midpoint and the lower half.}};
        else high = {{mid - 1::Discard the midpoint and the upper half.}};
    }
    return {{-1::The interval was exhausted without a match.}};
}
int main(void) {
    int a[] = {DATA};
    int n = {{sizeof a / sizeof a[0]::Divide the total array size by one element's size.}};
    int index = {{locate(a, n, KEY)::Pass the sorted array and its length to the search function.}};
    printf("Index=%d\n", index);
    return 0;
}'''.replace('DATA',','.join(map(str,data))).replace('KEY',str(key)),
      f'Index={index}\n','binary-search array-parameter sizeof return while',main=['binary-search'])

for variant,(data,key) in enumerate([([6,2,6,8,6],6),([3,9,4,9,1],9)],1):
    matches=[i for i,x in enumerate(data) if x==key]
    add(f'search-count-{variant}','arrays','Linear search, Last occurrences and Frequency totals',
      'Scan an unsorted array once to obtain the first matching index, last matching index and total number of matches.',
      [f'Use {data} and target {key}. Start both index results at -1 and the count at zero.',
       'Set the first index only on the first match, update the last index on every match, and count all occurrences.'],r'''
#include <stdio.h>
int main(void) {
    int a[] = {DATA};
    int key = KEY;
    int first = {{-1::A negative index represents absence.}}, last = -1;
    int count = {{0::There are no matches before the scan.}};
    for (int i = {{0::Begin with the first element.}}; {{i < 5::Visit each valid array position once.}}; {{++i|||i++::Advance the scan.}}) {
        if ({{a[i] == key::Only matching values update the search results.}}) {
            if ({{first == -1::The first index must not be overwritten.}}) first = {{i::Save the earliest matching position.}};
            last = {{i::Always replace last with the latest matching position.}};
            {{++count|||count++::Every matching occurrence contributes one.}};
        }
    }
    printf("First=%d Last=%d Count=%d\n", first, last, count);
    return 0;
}'''.replace('DATA',','.join(map(str,data))).replace('KEY',str(key)),
      f'First={matches[0]} Last={matches[-1]} Count={len(matches)}\n','linear-first linear-last linear-count frequency for',priority='core')

for variant,data in enumerate([[9,3,7,1,5],[8,2,6,2,4]],1):
    add(f'bubble-{variant}','arrays','Bubble passes, Adjacent swaps and Array reversal',
      'Sort five integers in ascending order using adjacent comparisons, then reverse the sorted array in place.',
      [f'Use {data}. Each bubble pass moves the greatest remaining value to the right.',
       'Compare only adjacent positions still inside the unsorted prefix. Reverse by swapping symmetric pairs, visiting only half the array.'],r'''
#include <stdio.h>
int main(void) {
    int a[] = {DATA};
    int n = 5;
    for (int pass = 0; {{pass < n - 1::At most n-1 passes are needed.}}; ++pass) {
        for (int j = 0; {{j < n - 1 - pass::Keep j+1 valid and skip the sorted suffix.}}; ++j) {
            if ({{a[j] > a[j + 1]::Ascending order requires swapping an inverted pair.}}) {
                int t = {{a[j]::Save the left value before overwriting it.}};
                a[j] = {{a[j + 1]::Move the smaller adjacent value left.}};
                a[j + 1] = {{t::Place the saved larger value right.}};
            }
        }
    }
    for (int i = 0; {{i < n / 2::Each pair must be swapped only once.}}; ++i) {
        int j = {{n - 1 - i::Find the symmetric index.}};
        int t = a[i]; a[i] = {{a[j]::Bring the right-side value into the left side.}}; a[j] = t;
    }
    for (int i = 0; i < n; ++i) printf("%s%d", i ? " " : "", {{a[i]::Print the reversed sorted sequence.}});
    puts("");
    return 0;
}'''.replace('DATA',','.join(map(str,data))),' '.join(map(str,sorted(data,reverse=True)))+'\n',
      'bubble array-reverse for',priority='extra',main=['bubble','array-reverse'])

add('insertion','arrays','Insertion sort, Second largest and Distinct values',
 'Sort five values with insertion sort and find the second distinct largest value.',
 ['Use 7, 2, 9, 9, 4. Insert each key into the sorted prefix by shifting greater entries right.',
  'After sorting, scan backward past values equal to the maximum; the first smaller value is second distinct largest.'],r'''
#include <stdio.h>
int main(void) {
    int a[] = {7,2,9,9,4};
    for (int i = 1; {{i < 5::The prefix before i is already sorted.}}; ++i) {
        int key = {{a[i]::Save the insertion value before shifting.}}, j = i - 1;
        while ({{j >= 0 && a[j] > key::Check the bound before reading the array.}}) {
            a[j + 1] = {{a[j]::Move a larger prefix element one place right.}};
            {{--j|||j--::Continue searching left.}};
        }
        a[{{j + 1::The gap after the final smaller element is the insertion position.}}] = key;
    }
    int j = {{3::Start immediately before the last maximum.}};
    while (j >= 0 && {{a[j] == a[4]::Skip duplicates of the maximum.}}) --j;
    printf("Second=%d\n", {{a[j]::The fixed data guarantees a second distinct value.}});
    for (int i = 0; i < 5; ++i) printf("%s%d", i ? " " : "", {{a[i]::Print the sorted values.}});
    puts("");
    return 0;
}''','Second=7\n2 4 7 9 9\n','insertion second-largest short-circuit',priority='extra',main=['insertion','second-largest'])

add('rotate-prefix','arrays','Array rotation, Prefix sums and Parity separation',
 'Rotate a four-value array left once and then right once, build its prefix sums and separate even from odd values.',
 ['Start at 2, 5, 8, 3. Left rotation moves the first element to the end; right rotation moves the last to the front.',
  'After both rotations the array returns to its original order. Prefix[i] contains the sum through position i.',
  'Retain original relative order in both parity groups; print their counts and contents.'],r'''
#include <stdio.h>
int main(void) {
    int a[] = {2,5,8,3}, prefix[4], even[4], odd[4];
    int first = a[0];
    for (int i = 0; i < 3; ++i) a[i] = {{a[i + 1]::Shift values left before restoring the old first.}};
    a[3] = {{first::The saved first value wraps to the end.}};
    int last = a[3];
    for (int i = 3; i > 0; --i) a[i] = {{a[i - 1]::Shift right from the end to avoid overwriting.}};
    a[0] = {{last::The old last value wraps to the front.}};
    int e = 0, o = 0, sum = 0;
    for (int i = 0; i < 4; ++i) {
        sum += {{a[i]::Extend the running prefix by the current entry.}};
        prefix[i] = {{sum::Store the inclusive prefix total.}};
        if ({{a[i] % 2 == 0::An even integer has zero remainder by two.}}) even[e++] = {{a[i]::Append the even entry.}};
        else odd[o++] = {{a[i]::Append the odd entry.}};
    }
    printf("Prefix=%d %d %d %d\n", prefix[0], prefix[1], prefix[2], prefix[3]);
    printf("Even=%d %d Count=%d\n", even[0], even[1], e);
    printf("Odd=%d %d Count=%d\n", odd[0], odd[1], {{o::Print the number of retained odd entries.}});
    return 0;
}''','Prefix=2 7 15 18\nEven=2 8 Count=2\nOdd=5 3 Count=2\n','rotate prefix even-odd modulo',priority='extra')

add('insert-delete','arrays','Array insertion, Positional deletion and Stable shifts',
 'Insert 6 at zero-based position 2, then delete the value at position 1 from a fixed-capacity array.',
 ['Initial active values are 2, 4, 8, 10 in capacity six.',
  'Insertion shifts the suffix right, working backward. Deletion shifts the following suffix left. Update active length after each operation.'],r'''
#include <stdio.h>
int main(void) {
    int a[6] = {2,4,8,10};
    int n = {{4::Only the first four capacity slots are active.}};
    int pos = {{2::Insert before the existing third element.}};
    for (int i = {{n::The first free slot receives the last active element.}}; {{i > pos::Stop before overwriting the insertion position.}}; --i) {
        a[i] = {{a[i - 1]::Copy backward so the original suffix remains available.}};
    }
    a[pos] = {{6::Store the requested inserted value.}};
    {{++n|||n++::Insertion increases the active length.}};
    pos = 1;
    for (int i = pos; {{i < n - 1::The final copy reads the previous last active entry.}}; ++i) {
        a[i] = {{a[i + 1]::Closing the gap requires a forward shift.}};
    }
    {{--n|||n--::Deletion reduces the active length.}};
    for (int i = 0; i < n; ++i) printf("%s%d", i ? " " : "", a[i]);
    puts("");
    return 0;
}''','2 6 8 10\n','insert-delete increment for',priority='extra',main=['insert-delete'])

for variant,base in enumerate([1,2],1):
    a=[[base,2,3],[4,base+4,6],[7,8,base+8]]
    row=[sum(r) for r in a];diag=sum(a[i][i] for i in range(3));sec=sum(a[i][2-i] for i in range(3))
    add(f'matrix-totals-{variant}','matrices','Row totals, Diagonal sums and Row maxima',
      'Summarise each row and both diagonals of a fixed 3 by 3 matrix.',
      [f'The rows are {a}. Reset the row total and maximum for each row.',
       'Use the first entry of a row as its initial maximum. Main diagonal uses equal indices; secondary diagonal uses column 2-row.',
       'Print each row total and maximum, followed by the two separate diagonal sums; the centre belongs to both sums.'],r'''
#include <stdio.h>
int main(void) {
    int a[3][3] = {DATA};
    int main_sum = {{0::Start a separate accumulator for each diagonal.}}, other_sum = 0;
    for (int i = 0; {{i < 3::Visit each row exactly once.}}; ++i) {
        int total = {{0::Reset the row total at the start of every row.}};
        int largest = {{a[i][0]::Seed the maximum from actual row data.}};
        for (int j = 0; j < 3; ++j) {
            total += {{a[i][j]::Add the entry in the current row and column.}};
            if ({{a[i][j] > largest::Keep the greatest value seen in this row.}}) largest = {{a[i][j]::Update the row's maximum.}};
        }
        main_sum += {{a[i][i]::The main diagonal has identical row and column indices.}};
        other_sum += {{a[i][2 - i]::The secondary diagonal mirrors the column index.}};
        printf("Row%d=%d Max=%d\n", i, total, largest);
    }
    printf("Diagonals=%d %d\n", main_sum, {{other_sum::Print the secondary sum separately from the main sum.}});
    return 0;
}'''.replace('DATA',','.join('{'+','.join(map(str,r))+'}' for r in a)),
      ''.join(f'Row{i}={row[i]} Max={max(a[i])}\n' for i in range(3))+f'Diagonals={diag} {sec}\n',
      'row-sum diagonals row-max for',priority='extra',main=['row-sum','diagonals','row-max'])

add('transpose-check','matrices','In-place transpose, Symmetry checks and Identity tests',
 'Check a square matrix for symmetry and identity, then transpose it in place and print the result.',
 ['Use rows {1,2} and {3,1}. Symmetric means a[i][j] equals a[j][i] for all pairs.',
  'Identity means each diagonal entry is 1 and each off-diagonal entry is 0.',
  'Swap only entries above the main diagonal with their mirrored entries so no pair is swapped twice.'],r'''
#include <stdio.h>
int main(void) {
    int a[2][2] = {{1,2},{3,1}};
    int symmetric = {{1::Assume the property holds until a counterexample appears.}}, identity = 1;
    for (int i = 0; i < 2; ++i) {
        for (int j = 0; j < 2; ++j) {
            if ({{a[i][j] != a[j][i]::A mirrored mismatch disproves symmetry.}}) symmetric = 0;
            int wanted = {{i == j ? 1 : 0::Identity has ones on the diagonal and zeros elsewhere.}};
            if ({{a[i][j] != wanted::Check every cell against its identity value.}}) identity = 0;
        }
    }
    for (int i = 0; i < 2; ++i) {
        for (int j = {{i + 1::Start strictly above the diagonal.}}; {{j < 2::Keep the second index within bounds.}}; ++j) {
            int t = {{a[i][j]::Save the upper entry.}};
            a[i][j] = {{a[j][i]::Move the mirrored lower entry upward.}};
            a[j][i] = {{t::Complete the in-place swap.}};
        }
    }
    printf("Symmetric=%d Identity=%d\n", symmetric, identity);
    for (int i = 0; i < 2; ++i) printf("%d %d\n", a[i][0], {{a[i][1]::Print the second entry of the transposed row.}});
    return 0;
}''','Symmetric=0 Identity=0\n1 3\n2 1\n','square-transpose matrix-check ternary',priority='core')

for variant,k in enumerate([1,2],1):
    add(f'multiply-{variant}','matrices','Matrix products, Column totals and Nested accumulation',
      'Multiply a fixed 2 by 2 matrix by another matrix, then total both columns of the product.',
      [f'Use A={{{k},2}},{{3,4}} and B={{2,0}},{{1,2}}.',
       'For each output cell reset its accumulator to zero, then sum A[row][k]*B[k][column] over both inner positions.',
       'Print the product row by row and the two column totals.'],r'''
#include <stdio.h>
int main(void) {
    int a[2][2] = {{BASE,2},{3,4}};
    int b[2][2] = {{2,0},{1,2}}, c[2][2];
    for (int i = 0; {{i < 2::Visit both result rows.}}; ++i) {
        for (int j = 0; {{j < 2::Visit both result columns.}}; ++j) {
            c[i][j] = {{0::Each dot product needs a fresh accumulator.}};
            for (int k = 0; {{k < 2::The shared dimension has two entries.}}; ++k) {
                c[i][j] += {{a[i][k]::Read across the selected left row.}} * {{b[k][j]::Read down the selected right column.}};
            }
        }
    }
    for (int i = 0; i < 2; ++i) printf("%d %d\n", c[i][0], c[i][1]);
    int totals[2] = {0,0};
    for (int j = 0; j < 2; ++j) {
        for (int i = 0; i < 2; ++i) totals[{{j::Keep one accumulator per column.}}] += {{c[i][j]::Vary the row while holding the column fixed.}};
    }
    printf("Columns=%d %d\n", {{totals[0]::Print the first column sum.}}, {{totals[1]::Print the second column sum.}});
    return 0;
}'''.replace('BASE',str(k)),f'{2*k+2} 4\n10 8\nColumns={2*k+12} 12\n',
      'matrix-multiply column-sum for',priority='extra',main=['matrix-multiply'])

add('matrix-search','matrices','Matrix search, Triangular totals and Coordinate results',
 'Find the first row-major occurrence of 8 and sum entries strictly above and strictly below the diagonal.',
 ['Use rows {2,8,1}, {4,5,8}, {7,3,6}. Record only the first match.',
  'Upper entries have column greater than row; lower entries have row greater than column. Exclude the diagonal from both totals.'],r'''
#include <stdio.h>
int main(void) {
    int a[3][3] = {{2,8,1},{4,5,8},{7,3,6}};
    int row = {{-1::Use a sentinel to indicate no match yet.}}, col = -1;
    int upper = 0, lower = 0;
    for (int i = 0; {{i < 3::Traverse rows in ascending order.}}; ++i) {
        for (int j = 0; {{j < 3::Traverse columns in ascending order.}}; ++j) {
            if ({{row == -1 && a[i][j] == 8::Only the first row-major match should be retained.}}) {
                row = {{i::Save the matching row index.}};
                col = {{j::Save the matching column index.}};
            }
            if ({{j > i::These cells lie strictly above the diagonal.}}) upper += {{a[i][j]::Accumulate the upper triangular entry.}};
            if ({{i > j::These cells lie strictly below the diagonal.}}) lower += {{a[i][j]::Accumulate the lower triangular entry.}};
        }
    }
    printf("Found=%d,%d Upper=%d Lower=%d\n", row, col, upper, lower);
    return 0;
}''','Found=0,1 Upper=17 Lower=14\n','matrix-search triangles short-circuit',priority='extra',main=['matrix-search','triangles'])

for variant,s in enumerate(['A cat 42','We code 7'],1):
    vowels=sum(c.lower() in 'aeiou' for c in s); cons=sum(c.isalpha() and c.lower() not in 'aeiou' for c in s)
    add(f'character-count-{variant}','strings','Manual length, Character counts and Bounded copies',
      'Measure a fixed sentence manually, copy it safely into a shorter buffer, and count vowels, consonants, digits and spaces in the original.',
      [f'Use "{s}". Count only ASCII letters as vowels or consonants; vowels are a, e, i, o, u in either case.',
       'Copy at most four characters into a five-byte buffer with the bounded library copy, and explicitly terminate the buffer.',
       'Count digits with ctype and literal spaces separately. Print the manual length, the four-character copy and the four counts.'],r'''
#include <stdio.h>
#include <string.h>
#include <ctype.h>
int main(void) {
    char s[] = "TEXT", short_copy[5];
    int n = 0;
    while ({{s[n] != '\0'::Count only characters before the terminator.}}) {{++n|||n++::Advance the measured length one character at a time.}};
    {{strncpy::A bounded copy may omit the terminator when the source is long.}}(short_copy, s, {{sizeof short_copy - 1::Leave one byte for the terminator.}});
    short_copy[4] = {{'\0'::Explicitly terminate the truncated copy.}};
    int v = 0, c = 0, d = 0, spaces = 0;
    for (int i = 0; i < n; ++i) {
        unsigned char ch = (unsigned char)s[i];
        int lower = {{tolower(ch)::Normalise case for the vowel test.}};
        if ({{isalpha(ch)::Only letters can be vowels or consonants.}}) {
            if ({{lower == 'a' || lower == 'e' || lower == 'i' || lower == 'o' || lower == 'u'::Compare the normalised character with all five vowels.}}) ++v;
            else ++c;
        }
        if ({{isdigit(ch)::Digits are counted independently from letters.}}) ++d;
        if ({{ch == ' '::Count literal space characters.}}) ++spaces;
    }
    printf("Length=%d Copy=%s\n", n, short_copy);
    printf("V=%d C=%d D=%d S=%d\n", v, c, d, spaces);
    return 0;
}'''.replace('TEXT',s),f'Length={len(s)} Copy={s[:4]}\nV={vowels} C={cons} D={sum(c.isdigit() for c in s)} S={s.count(" ")}\n',
      'manual-length strncpy nul character-count ctype-case',priority='core',main=['character-count','ctype-case','manual-length'])

add('palindrome-clean','strings','Palindrome pairs, ASCII case and Character removal',
 'Remove spaces from a fixed mixed-case word sequence, normalise uppercase ASCII letters and check whether the cleaned result is a palindrome.',
 ['Start with "N e v e N". Ignore only literal spaces, retaining the order of all other characters.',
  'Convert uppercase ASCII letters to lowercase by adding 32, then append a null terminator.',
  'Compare symmetric positions, stopping on the first mismatch. Print the cleaned word and yes/no.'],r'''
#include <stdio.h>
int main(void) {
    char s[] = "N e v e N", clean[20];
    int k = 0;
    for (int i = 0; s[i] != '\0'; ++i) {
        char c = s[i];
        if ({{c == ' '::Ignore the selected character before copying.}}) {{continue::Skip spaces without increasing the destination length.}};
        if ({{c >= 'A' && c <= 'Z'::ASCII uppercase letters form a contiguous range.}}) c = {{c + 32::ASCII lowercase letters are 32 positions later.}};
        clean[{{k++::Append one retained character and advance the destination.}}] = c;
    }
    clean[k] = {{'\0'::Terminate the compacted string.}};
    int ok = 1;
    for (int i = 0; {{i < k / 2::Each symmetric pair needs only one comparison.}}; ++i) {
        if ({{clean[i] != clean[k - 1 - i]::Compare opposite ends of the cleaned string.}}) {
            ok = {{0::A single mismatch disproves the palindrome.}}; break;
        }
    }
    printf("%s %s\n", clean, {{ok ? "yes" : "no"::Choose the verdict from the completed comparison.}});
    return 0;
}''','neven yes\n','string-palindrome ascii-case remove-char nul',priority='extra')

add('words-substring','strings','Concatenation, Word boundaries and Substring search',
 'Join two fixed phrases, count words using state transitions, and locate a substring.',
 ['Start with "  read C" in a 40-byte destination and append "  daily ". Capacity is sufficient.',
  'A word starts when a non-space follows the start of the string or a space. Consecutive spaces do not create empty words.',
  'Search for "daily" with the substring library routine and print its zero-based offset, or -1 if absent.'],r'''
#include <stdio.h>
#include <string.h>
int main(void) {
    char text[40] = "  read C";
    {{strcat::Concatenation appends after the existing terminator.}}(text, {{"  daily "::Append the fixed suffix including its spaces.}});
    int words = {{0::No words have begun before scanning.}}, inside = 0;
    for (int i = 0; {{text[i] != '\0'::Stop at the final terminator.}}; ++i) {
        if ({{text[i] == ' '::A space ends the current word.}}) inside = 0;
        else if ({{!inside::Count a word only on entry from a gap.}}) {
            {{++words|||words++::Record one newly started word.}};
            inside = 1;
        }
    }
    char *p = {{strstr(text, "daily")::Find the first matching substring.}};
    int offset = p ? {{(int)(p - text)::Pointer difference gives the substring's index.}} : -1;
    printf("Words=%d Offset=%d\n", words, offset);
    printf("Length=%zu\n", {{strlen(text)::The final length includes retained spaces.}});
    return 0;
}''','Words=3 Offset=10\nLength=16\n','strcat word-count substring strlen',priority='extra',main=['word-count','substring'])

add('line-numbers','strings','Line input, Newline removal and Numeric conversion',
 'Write a fixed numeric line, read it with fgets, remove its newline and convert it with both library and manual algorithms.',
 ['Seed number.txt with "3142\\n" using file output, so no stdin is required.',
  'Check the fgets result, then remove only a final newline if one is present.',
  'Manual conversion starts at zero and updates value = value*10 + digit, using ASCII digit arithmetic.'],r'''
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int main(void) {
    FILE *fp = fopen("number.txt", "w");
    if (!fp) return 1;
    fputs("3142\n", fp); fclose(fp);
    fp = fopen("number.txt", "r");
    if (!fp) return 1;
    char s[20];
    if ({{fgets(s, sizeof s, fp)::Read a bounded line, preserving a newline when it fits.}} == {{NULL::A null return indicates no line was read.}}) { fclose(fp); return 1; }
    fclose(fp);
    size_t n = {{strlen(s)::Measure the stored characters before trimming.}};
    if ({{n > 0 && s[n - 1] == '\n'::Check the length before accessing the last character.}}) s[n - 1] = {{'\0'::Replace the newline with a terminator.}};
    int manual = 0;
    for (int i = 0; {{s[i] != '\0'::Process only the remaining digits.}}; ++i) {
        manual = {{manual * 10 + s[i] - '0'::Convert one digit and append it to the decimal value.}};
    }
    int library = {{atoi(s)::The library conversion handles this valid decimal string.}};
    printf("%s %d %d\n", {{s::Print the trimmed numeric text.}}, library, {{manual::Print the independently accumulated value.}});
    return 0;
}''','3142 3142 3142\n','fgets-newline atoi manual-atoi nul',priority='extra')

add('string-sort','strings','String arrays, Lexicographic sorting and Manual comparison',
 'Sort three fixed strings lexicographically, then manually compare two other strings.',
 ['Sort "pear", "apple", "lime" using strcmp; exchange entire strings through a temporary buffer.',
  'For "cat" versus "car", scan equal characters until a mismatch or terminator. Subtract the unsigned character codes to produce a signed comparison result.'],r'''
#include <stdio.h>
#include <string.h>
int main(void) {
    char words[3][12] = {"pear","apple","lime"}, temp[12];
    for (int i = 0; i < 2; ++i) {
        for (int j = i + 1; j < 3; ++j) {
            if ({{strcmp(words[i], words[j]) > 0::A positive comparison means the first word belongs later.}}) {
                {{strcpy(temp, words[i])::Preserve the first string before replacing it.}};
                {{strcpy(words[i], words[j])::Move the smaller word into the earlier slot.}};
                {{strcpy(words[j], temp)::Finish exchanging the complete strings.}};
            }
        }
    }
    const char *a = "cat", *b = "car";
    int i = {{0::Begin the manual comparison at the first character.}};
    while ({{a[i] && a[i] == b[i]::Continue only while the characters match and are not terminal.}}) {{++i|||i++::Move to the first mismatch or terminator.}};
    int difference = {{(unsigned char)a[i] - (unsigned char)b[i]::Subtract character values at the stopping position.}};
    printf("%s %s %s\n", words[0], words[1], {{words[2]::Print the final sorted word.}});
    printf("Compare=%d\n", {{difference::ASCII t minus r is positive two.}});
    return 0;
}''','apple lime pear\nCompare=2\n','string-sort manual-compare strcmp strcpy',priority='extra',main=['string-sort','manual-compare'])

# Two genuinely blank-bearing call-by-value/reference comparisons, also pointer swaps.
for variant,(a,b) in enumerate([(12,5),(7,19)],1):
    add(f'swap-{variant}','pointers','Value parameters, Pointer swaps and Address operators',
      'Compare swapping local integer copies with swapping the original values through pointers.',
      [f'Start with a={a}, b={b}. Call the by-value helper first; its swaps must not change main.',
       'Call the pointer helper with both addresses; use a temporary value so neither original is lost. Print after each call.'],r'''
#include <stdio.h>
void copies(int x, int y) {
    int t = {{x::Save the first local copy.}};
    x = {{y::The assignment changes only the local parameter.}};
    y = t;
    printf("Inside=%d %d\n", x, y);
}
void swap({{int *x::A pointer parameter can reach the caller's first object.}}, {{int *y::A second pointer reaches the other object.}}) {
    int t = {{*x::Save the pointed-to value rather than its address.}};
    {{*x::Store through the first pointer.}} = {{*y::Read the value through the second pointer.}};
    *y = {{t::Complete the swap using the saved original.}};
}
int main(void) {
    int a = LEFT, b = RIGHT;
    copies(a, b);
    printf("Value=%d %d\n", a, b);
    swap({{&a::Pass the address of main's first object.}}, {{&b::Pass the address of main's second object.}});
    printf("Reference=%d %d\n", a, b);
    return 0;
}'''.replace('LEFT',str(a)).replace('RIGHT',str(b)),
      f'Inside={b} {a}\nValue={a} {b}\nReference={b} {a}\n','value-reference pointer-swap address void',priority='core')

add('pointer-walk','pointers','Pointer arithmetic, Double indirection and Const contracts',
 'Visit an array through pointers, redirect a pointer through a pointer-to-pointer, and count characters through a read-only pointer.',
 ['Use values 3, 6, 9, 12. Advance the pointer twice through an int** helper, then show the selected value.',
  'A pointer to const may move but may not modify its target through that pointer. An int *const may modify its target but cannot be redirected.',
  'Show equivalent indexed and dereferenced access, then walk "desk" to its terminator.'],r'''
#include <stdio.h>
void advance({{int **p::Two levels of indirection allow changing the caller's pointer.}}) {
    {{++*p|||(*p)++::Advance the pointer stored in the caller.}};
}
int main(void) {
    int a[] = {3,6,9,12};
    int *p = a;
    advance({{&p::Pass the address of the pointer object.}});
    advance(&p);
    const int *read = {{a::A pointer to const starts at the array's first entry.}};
    int *const fixed = {{&a[0]::A const pointer keeps this address for its whole lifetime.}};
    {{*fixed::The pointed-to int remains writable.}} += 1;
    read += {{2::The pointer to const can still move within the array.}};
    printf("Selected=%d Read=%d\n", *p, *read);
    printf("Equivalent=%d %d\n", a[3], {{*(a + 3)::Array indexing equals pointer arithmetic followed by dereference.}});
    const char *text = "desk";
    int length = 0;
    while ({{*text != '\0'::Dereference the character pointer to test the current character.}}) { ++length; {{++text|||text++::Advance by one char until the terminator.}}; }
    printf("First=%d Length=%d\n", a[0], length);
    return 0;
}''','Selected=9 Read=9\nEquivalent=12 12\nFirst=4 Length=4\n',
 'pointer-arithmetic array-pointer double-pointer pointer-const char-pointer address',priority='core',main=['pointer-arithmetic','array-pointer'])

for variant,n in enumerate([5,6],1):
    fact=1
    for i in range(1,n+1):fact*=i
    add(f'rec-factorial-{variant}','functions','Function prototypes, Recursive factorials and Static call counts',
      'Compute a factorial recursively while reporting how many recursive calls have occurred across repeated uses.',
      [f'Compute factorial({n}) and then factorial(2). The base case is n<=1 and returns 1.',
       'A static local call counter starts at zero and persists between calls. A null-output-pointer sentinel is not used; print the counter when the base case is reached.',
       'The counter increments on entry, so the second base case reports all calls made by both computations.'],r'''
#include <stdio.h>
{{long factorial(int n)::Declare the signature before main calls the function.}};
int main(void) {
    long first = {{factorial(NUM)::Use the recursive function for the first requested argument.}};
    printf("Fact=%ld\n", first);
    long second = {{factorial(2)::The later call reuses the same persistent counter.}};
    printf("Fact=%ld\n", second);
    return 0;
}
long factorial(int n) {
    {{static::Static storage preserves the count between invocations.}} int calls = {{0::Initialisation happens only once.}};
    {{++calls|||calls++::Count every entry, including the base case.}};
    if ({{n <= 1::Both zero and one have factorial one.}}) {
        printf("Calls=%d\n", {{calls::Report cumulative entries when recursion bottoms out.}});
        return {{1::This is the multiplication identity at the base case.}};
    }
    return {{n * factorial(n - 1)::Reduce the argument and combine the recursive factorial.}};
}'''.replace('NUM',str(n)),f'Calls={n}\nFact={fact}\nCalls={n+2}\nFact=2\n',
      'prototype rec-factorial static-local static-calls return',priority='extra',main=['rec-factorial','static-calls','prototype'])

add('recursive-numbers','functions','Recursive digits, Euclidean recursion and Recursive powers',
 'Use three shrinking recursive functions to sum digits, find a GCD and compute a power.',
 ['Digit sum returns zero at n=0 and combines n%10 with the remaining digits.',
  'GCD(a,b) returns a when b=0; otherwise it recurses on b and a%b.',
  'Power(base,exponent) returns one for exponent zero. Inputs are nonnegative and all results fit int.'],r'''
#include <stdio.h>
int digits(int n) {
    if ({{n == 0::Zero has no remaining digit contribution.}}) return {{0::This is the additive identity.}};
    return {{n % 10::Extract the last digit.}} + digits({{n / 10::Discard that digit for the recursive call.}});
}
int gcd(int a, int b) {
    if ({{b == 0::The first operand is the GCD when the second reaches zero.}}) return {{a::Return the final nonzero Euclidean value.}};
    return gcd({{b::Move the second operand into the first position.}}, {{a % b::The remainder strictly reduces the problem.}});
}
int power(int base, int exponent) {
    if (exponent == 0) return {{1::Any nonzero base to power zero is one.}};
    return {{base * power(base, exponent - 1)::Remove one factor per recursive call.}};
}
int main(void) {
    printf("Digits=%d\n", digits(936));
    printf("GCD=%d\n", gcd(35, 21));
    printf("Power=%d\n", power(2, 5));
    return 0;
}''','Digits=18\nGCD=7\nPower=32\n','rec-digits rec-gcd rec-power return modulo',priority='extra',main=['rec-digits','rec-gcd','rec-power'])

add('recursive-text','functions','Recursive Fibonacci, String reversal and Base cases',
 'Compute Fibonacci(6) and reverse a fixed string by recursively swapping endpoint characters.',
 ['Fibonacci(0)=0 and Fibonacci(1)=1; higher terms are the sum of the two preceding terms.',
  'Reverse "orbit" in place: swap left/right characters then recurse inward; stop when left reaches or passes right.',
  'Leave the existing terminator in place. Print the reversed word and the Fibonacci result.'],r'''
#include <stdio.h>
#include <string.h>
int fib(int n) {
    if ({{n < 2::The first two Fibonacci terms are base cases.}}) return {{n::The base result equals the argument for zero and one.}};
    return {{fib(n - 1) + fib(n - 2)::Combine the two smaller Fibonacci subproblems.}};
}
void reverse(char s[], int left, int right) {
    if ({{left >= right::A zero- or one-character interval is already reversed.}}) return;
    char t = {{s[left]::Save the left endpoint.}};
    s[left] = {{s[right]::Bring the right endpoint to the left.}};
    s[right] = {{t::Complete the endpoint swap.}};
    reverse(s, {{left + 1::Move the left bound inward.}}, {{right - 1::Move the right bound inward.}});
}
int main(void) {
    char word[] = "orbit";
    reverse(word, 0, {{(int)strlen(word) - 1::The last character is one before the terminator.}});
    printf("%s %d\n", word, fib(6));
    return 0;
}''','tibro 8\n','rec-fibonacci rec-reverse string-reverse return',priority='extra',main=['rec-fibonacci','rec-reverse'])

add('record-sort','structs','Nested records, Field sorting and Returned structs',
 'Sort named runners by elapsed time and return the winning record by value.',
 ['A Runner contains a nested Time record with minutes and seconds. Convert time to seconds as minutes*60+seconds.',
  'Selection-sort three runners from shortest time to longest. Swap complete records.',
  'A helper receives the sorted array and returns its first record. Print winner name and time, then the final name order.'],r'''
#include <stdio.h>
typedef struct { int minutes, seconds; } Time;
{{typedef::Give the nested record a reusable type name.}} struct { char name[12]; Time time; } Runner;
int seconds(Runner r) {
    return {{r.time.minutes * 60 + r.time.seconds::Access the nested fields and convert to one unit.}};
}
{{Runner::A whole record is returned by value.}} winner(Runner a[]) { return {{a[0]::The sorted array begins with the fastest runner.}}; }
int main(void) {
    Runner a[3] = {{"Mira",{2,8}},{"Noor",{1,59}},{"Ivo",{2,3}}};
    for (int i = 0; i < 2; ++i) {
        int best = {{i::Start the selection in the unsorted suffix.}};
        for (int j = i + 1; j < 3; ++j) {
            if ({{seconds(a[j]) < seconds(a[best])::Compare the total elapsed seconds.}}) best = {{j::Remember the fastest remaining index.}};
        }
        Runner t = {{a[i]::Preserve the complete current record.}};
        a[i] = {{a[best]::Move the fastest remaining record forward.}};
        a[best] = {{t::Complete the whole-record swap.}};
    }
    Runner best = winner(a);
    printf("%s %d:%02d\n", best.name, best.time.minutes, best.time.seconds);
    printf("%s %s %s\n", a[0].name, a[1].name, a[2].name);
    return 0;
}''','Noor 1:59\nNoor Ivo Mira\n','struct-sort nested-struct struct-return typedef selection',priority='core',main=['struct-sort','selection','struct-return'])

add('enum-record','structs','Enumerated states, Record search and Pointer fields',
 'Search an array of job records by enum state and print the highest-priority ready job.',
 ['The enum values are WAITING=0, READY=1 and DONE=2. Records are {31,READY,4}, {32,DONE,9}, {33,READY,7}.',
  'Only READY records qualify. Track a pointer to the highest priority, retaining the first on a tie. Check the pointer before using arrow access.'],r'''
#include <stdio.h>
{{enum::An enumeration names a set of integer state constants.}} State { WAITING, READY, DONE };
typedef struct { int id; enum State state; int priority; } Job;
int main(void) {
    Job jobs[] = {{31,READY,4},{32,DONE,9},{33,READY,7}};
    Job *best = {{NULL::No qualifying record has been found initially.}};
    for (int i = 0; {{i < 3::Inspect all hard-coded jobs.}}; ++i) {
        if (jobs[i].state == {{READY::Only the requested enum state is eligible.}}) {
            if ({{best == NULL || jobs[i].priority > best->priority::Short-circuit protects the first pointer access.}}) {
                best = {{&jobs[i]::Remember the address of the qualifying record.}};
            }
        }
    }
    if ({{best != NULL|||best::Guard pointer dereference after the search.}}) {
        printf("Job=%d Priority=%d\n", {{best->id::Read the selected ID through a struct pointer.}}, {{best->priority::Read the winning priority through the same pointer.}});
    }
    return {{0::Return successful process status.}};
}''','Job=33 Priority=7\n','enum struct-search arrow null short-circuit',priority='extra',main=['enum'])

for variant,(initial,extra) in enumerate([([4,8],[12,16]),([3,6],[9,12])],1):
    data=initial+extra
    add(f'grow-{variant}','memory','Heap growth, Safe reallocation and Pointer traversal',
      'Allocate two integers, safely grow the allocation to four, append two values and sum all entries through pointer arithmetic.',
      [f'The initial values are {initial}; append {extra}. Allocate based on sizeof the pointed-to element.',
       'Keep the original pointer until realloc succeeds; on failure free the original block and return failure.',
       'Only the new slots need explicit values after growth. Free exactly the final successful allocation.'],r'''
#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int *a = {{malloc(2 * sizeof *a)::Allocate two elements using the element type's size.}};
    if ({{a == NULL|||!a::Check the first allocation before writing to it.}}) return 1;
    a[0] = V0; a[1] = V1;
    int *grown = {{realloc(a, 4 * sizeof *a)::Request four slots while preserving existing values.}};
    if ({{grown == NULL|||!grown::A failed growth leaves the old block owned by a.}}) {
        {{free(a)::Release the still-valid original allocation on failure.}};
        return 1;
    }
    a = {{grown::Adopt the new address only after successful growth.}};
    a[2] = V2; a[3] = V3;
    int total = {{0::The sum starts with no contribution.}};
    for (int i = 0; {{i < 4::Visit all initial and appended values.}}; ++i) {
        total += {{*(a + i)::Pointer arithmetic accesses the same element as indexing.}};
    }
    printf("Total=%d Last=%d\n", total, a[3]);
    {{free(a)::Release the final allocation after its last read.}};
    return 0;
}'''.replace('V0',str(data[0])).replace('V1',str(data[1])).replace('V2',str(data[2])).replace('V3',str(data[3])),
      f'Total={sum(data)} Last={data[-1]}\n','realloc malloc null-allocation free leaks pointer-arithmetic array-pointer',priority='extra',main=['realloc','leaks'])

add('heap-matrix','memory','Dynamic rows, Zero initialisation and Leak-free cleanup',
 'Allocate a 2 by 3 matrix as an array of row pointers, fill it and print its row totals.',
 ['Allocate the row-pointer table with calloc so unused pointers start null. Allocate each row with calloc so integers start zero.',
  'Set cell (i,j) to (i+1)*(j+2). If a row allocation fails, free all earlier rows and the table before returning.',
  'After printing, free both rows and then the pointer table. Never dereference an unallocated row.'],r'''
#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int **a = {{calloc(2, sizeof *a)::Allocate a zero-initialised table of two row pointers.}};
    if ({{a == NULL|||!a::Check the pointer table before indexing it.}}) return 1;
    for (int i = 0; i < 2; ++i) {
        a[i] = {{calloc(3, sizeof *a[i])::Allocate three zero-initialised ints for this row.}};
        if ({{a[i] == NULL|||!a[i]::Handle partial allocation failure before filling the row.}}) {
            for (int k = 0; k < i; ++k) {{free(a[k])::Release every row that was already allocated.}};
            {{free(a)::Release the pointer table on the failure path.}};
            return 1;
        }
        for (int j = 0; j < 3; ++j) a[i][j] = {{(i + 1) * (j + 2)::Use the specified deterministic cell formula.}};
    }
    for (int i = 0; i < 2; ++i) {
        int total = 0;
        for (int j = 0; j < 3; ++j) total += {{a[i][j]::Read only an allocated cell in the current row.}};
        printf("Row%d=%d\n", i, total);
    }
    for (int i = 0; i < 2; ++i) {{free(a[i])::Free each row before the table containing its address.}};
    {{free(a)::The pointer table is the final remaining allocation.}};
    return 0;
}''','Row0=9\nRow1=18\n','dynamic-matrix calloc null-allocation free leaks row-sum',priority='extra',main=['dynamic-matrix','leaks','calloc'])

# Exercise every update mode twice, including required seek transitions.
for variant,text in enumerate(['red','sun'],1):
    add(f'update-modes-{variant}','files','Update streams, Appended text and Read-write transitions',
      'Create a small file, replace its first character, append one character and read back the final text.',
      [f'Create update.txt in w+ mode and write "{text}"; rewind before reading its first character.',
       'Reopen with r+, replace the first character with X, and close. Reopen with a+, append !, then rewind before reading.',
       'Check every fopen. The seek/rewind calls make every transition between reading and writing defined.'],r'''
#include <stdio.h>
int main(void) {
    FILE *fp = fopen("update.txt", {{"w+"::Create or truncate a file for reading and writing.}});
    if ({{fp == NULL|||!fp::Check the stream before performing I/O.}}) return 1;
    {{fputs("TEXT", fp)::Write the fixed starting text.}};
    {{rewind(fp)::Seek to the beginning between output and input.}};
    int first = fgetc(fp);
    fclose(fp);
    fp = fopen("update.txt", {{"r+"::Open the existing file for updates without truncating.}});
    if (!fp) return 1;
    fputc('X', fp);
    {{fclose(fp)::Finish the replacement before reopening.}};
    fp = fopen("update.txt", {{"a+"::Open for reading and appending; writes go to the end.}});
    if (!fp) return 1;
    {{fputc('!', fp)::Append one deterministic character.}};
    rewind(fp);
    char result[20];
    if ({{fgets(result, sizeof result, fp)::Read the complete final line after seeking to the start.}} == NULL) { fclose(fp); return 1; }
    {{fclose(fp)::Release the final stream after reading.}};
    printf("First=%c Final=%s\n", first, result);
    return 0;
}'''.replace('TEXT',text),f'First={text[0]} Final=X{text[1:]}!\n',
      'file-wplus file-rplus file-aplus file-null line-file file-close file-append',priority='extra',main=['file-wplus','file-rplus','file-aplus'],files={'update.txt':'X'+text[1:]+'!'})

add('file-copy-count','files','Character copying, Word states and File statistics',
 'Create a text file, copy it character by character and count characters, words and lines while copying.',
 ['Seed source.txt with "one two\\nC\\n". Count every character including spaces and newlines.',
  'Words begin on transitions from whitespace to non-whitespace. A line is counted for each newline.',
  'Read into int so EOF is distinct from any byte. Check file openings, close both streams and verify the copied file.'],r'''
#include <stdio.h>
#include <ctype.h>
int main(void) {
    FILE *seed = fopen("source.txt", "w");
    if (!seed) return 1;
    fputs("one two\nC\n", seed); fclose(seed);
    FILE *in = fopen("source.txt", "r"), *out = fopen("copy.txt", "w");
    if (!in || !out) { if (in) fclose(in); if (out) fclose(out); return 1; }
    {{int::An int is needed to represent both every byte and EOF.}} ch;
    int chars = 0, words = 0, lines = 0, inside = 0;
    while ((ch = {{fgetc(in)::Fetch one byte from the input stream.}}) != {{EOF::The loop ends only at the end-of-file sentinel.}}) {
        {{fputc(ch, out)::Write the same byte to the destination.}};
        {{++chars|||chars++::Count every copied byte.}};
        if ({{ch == '\n'::Newline characters delimit completed lines.}}) ++lines;
        if ({{isspace((unsigned char)ch)::Whitespace ends the current word.}}) inside = 0;
        else if ({{!inside::Only the first character after whitespace starts a new word.}}) { ++words; inside = 1; }
    }
    {{fclose(in)::Close the input stream after EOF.}};
    {{fclose(out)::Flush and close the copied output.}};
    printf("Chars=%d Words=%d Lines=%d\n", chars, words, lines);
    return 0;
}''','Chars=10 Words=3 Lines=2\n','char-file file-count file-copy file-close file-null',priority='extra',main=['char-file','file-count'],files={'copy.txt':'one two\nC\n'})

add('text-records','files','Text records, Struct fields and File accumulation',
 'Write two inventory records as text, reload them into a struct and compute the total stock value.',
 ['The records are Bolt with quantity 3 and price 8, and Nut with quantity 5 and price 2.',
  'Write name, quantity and unit price separated by spaces. Read only complete three-field records, limiting names to 11 characters.',
  'Add quantity times price for every complete record; print count and total value, and close every stream.'],r'''
#include <stdio.h>
typedef struct { char name[12]; int quantity, price; } Item;
int main(void) {
    Item a[] = {{"Bolt",3,8},{"Nut",5,2}};
    FILE *fp = {{fopen("items.txt", "w")::Create the text record file.}};
    if ({{fp == NULL|||!fp::Do not write to a failed stream.}}) return 1;
    for (int i = 0; i < 2; ++i) {
        {{fprintf(fp, "%s %d %d\n", a[i].name, a[i].quantity, a[i].price)::Write the three fields in the order the reader expects.}};
    }
    {{fclose(fp)::Complete all writes before reopening.}};
    fp = {{fopen("items.txt", "r")::Read the existing records without truncation.}};
    if (!fp) return 1;
    Item current;
    int count = 0, total = 0;
    while ({{fscanf(fp, "%11s%d%d", current.name, &current.quantity, &current.price)::Use a width bound for the name and addresses for numeric fields.}} == {{3::Only a complete three-field record contributes.}}) {
        total += {{current.quantity * current.price::Compute this record's stock value.}};
        {{++count|||count++::Count every complete record once.}};
    }
    {{fclose(fp)::Close the read stream after the record loop.}};
    printf("Records=%d Value=%d\n", count, total);
    return 0;
}''','Records=2 Value=34\n','file-records formatted-file file-r file-w file-null file-close',priority='core',main=['file-records'])

add('storage','scope','External declarations, Block scope and Storage classes',
 'Observe a file-scope object through an extern declaration, shadow it in a block, and compare automatic and persistent locals.',
 ['The file-scope level is 12. Inside a block, an automatic level of 3 hides it, and a register counter increments that local value once.',
  'A helper uses an extern declaration referring to the file-scope level. Its static counter persists across two calls while its automatic scratch value resets to one.',
  'Do not take the address of a register object. Print the inner local, outer level and both helper results.'],r'''
#include <stdio.h>
int level = 12;
void observe(void) {
    {{extern::This declaration refers to the existing file-scope object.}} int level;
    {{static::This local retains its stored value between calls.}} int calls = 0;
    {{auto::An automatic local is initialised on every entry.}} int scratch = 1;
    {{++calls|||calls++::Increment the persistent counter once per call.}};
    printf("Global=%d Calls=%d Scratch=%d\n", {{level::Here the extern declaration resolves the file-scope object.}}, calls, scratch);
}
int main(void) {
    {
        int level = {{3::This block declares a different object of the same name.}};
        {{register::This storage class permits a register hint and forbids taking the object's address.}} int step = 1;
        level += {{step::Only the inner level changes.}};
        printf("Inner=%d\n", {{level::The nearest declaration controls name lookup.}});
    }
    printf("Outer=%d\n", {{level::The inner declaration has ended; lookup finds the global.}});
    observe(); observe();
    return 0;
}''','Inner=4\nOuter=12\nGlobal=12 Calls=1 Scratch=1\nGlobal=12 Calls=2 Scratch=1\n',
 'extern auto-register block-scope static-local shadow',priority='extra',main=['extern','auto-register'])
