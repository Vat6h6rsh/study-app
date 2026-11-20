"""Authoring format: {{accepted replacement::why}} creates one labelled blank."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
questions = []
papers = []
def add(id, topic, title, task, body, expected, pool='original', fixtures=None, expected_files=None):
    blanks=[]
    def token(m):
        answer, explanation=m[1].split('::',1)
        label=chr(65+len(blanks))
        accepted=answer.split('|||')
        blanks.append(dict(id=label,accepted=accepted,explanation=explanation))
        return '__'+label+'__'
    code=re.sub(r'\{\{((?:(?!\}\})[\s\S])*?::(?:(?!\}\})[\s\S])*?)\}\}',token,body.strip())+'\n'
    assert 8 <= len(blanks) <= 12, (id,len(blanks))
    q=dict(id=id,subject='itp',topic=topic,title=title,source='Original • '+('mock paper' if pool=='mock' else 'exam-style practice'),difficulty='Exam',pool=pool,type='blanks',prompt=task+' Complete each blank. Each blank earns one mark. Input sizes and arithmetic are within the shown bounds.',code=code,blanks=blanks,expectedOutput=expected,trace=[b['explanation'] for b in blanks],runnable=True,stdin='')
    if fixtures: q['fixtures']=fixtures
    if expected_files: q['expectedFiles']=expected_files
    questions.append(q)

add('new-01','structs','Rank a student cohort','Allocate three records, compute totals, and print the name and total of the first highest scorer.',r'''
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
{{typedef::typedef gives the following structure a type name.}} struct { char name[20]; int marks[2]; int total; } Student;
int main(void) {
    Student *s = {{calloc(3, sizeof *s)::Allocate three zero-initialised Student records.}};
    if (s == {{NULL::NULL indicates allocation failure.}}) return 1;
    {{strcpy::Copy characters including the terminator into the array.}}(s[0].name,"Ada");
    strcpy(s[1].name,"Lin"); strcpy(s[2].name,"Sam");
    int scores[3][2]={{40,45},{48,47},{39,49}};
    int best={{0::The first record establishes a valid candidate.}};
    for(int i=0; i<{{3::There are three students.}}; ++i) {
        for(int j=0; j<2; ++j) s[i].total += {{scores[i][j]::Add the current subject mark to this student's total.}};
        if(s[i].total {{>::Strict greater-than keeps the first winner in a tie.}} s[best].total) best=i;
    }
    Student *p={{s + best::Pointer arithmetic selects the winning record.}};
    printf("%s %d\n",p->name,p->total);
    {{free(s)::Free the base address once, after the last use.}};
    return 0;
}''','Lin 95\n')

add('new-02','structs','Restock through a struct pointer','Restock each product costing under 50 and print the total stock.',r'''
#include <stdio.h>
typedef struct { int id, stock, price; } Product;
void restock({{Product *p::The function receives the address of a product.}}, int amount) {
    p{{->::Use -> to select a member through a pointer.}}stock {{+=::Add the delivery to the current stock.}} amount;
}
int main(void) {
    Product a[3]={{1,4,30},{2,2,80},{3,5,20}};
    int total={{0::The sum begins at zero.}};
    for(int i={{0::Arrays begin at index zero.}}; i<{{3::Visit the three products.}}; ++i) {
        if(a[i].price {{<::Only prices strictly below 50 qualify.}} 50) restock({{&a[i]::Pass the address so the function can modify this record.}},3);
        total += {{a[i].stock::Use the updated stock of each product.}};
    }
    printf("%d %d\n",a[0].stock,{{total::Print the accumulated stock, 7+2+8.}});
    return 0;
}''','7 17\n')

add('new-03','structs','Normalise a time interval','Add two durations with second-to-minute and minute-to-hour carries.',r'''
#include <stdio.h>
{{typedef::Create a named type alias.}} struct { int h,m,s; } Time;
Time sum(Time a, Time b) {
    Time t;
    t.s={{a.s + b.s::Add the seconds fields before carrying.}};
    t.m={{a.m + b.m::Add the minutes fields separately.}};
    t.h={{a.h + b.h::Add the hours fields.}};
    t.m += t.s / {{60::Every 60 seconds contributes one minute.}};
    t.s {{%=::Keep the remainder after dividing by 60.}} 60;
    t.h += {{t.m / 60::Every complete 60 minutes contributes one hour.}};
    t.m = {{t.m % 60::Retain only the minutes below one hour.}};
    return {{t::Return the entire normalised structure.}};
}
int main(void) {
    Time c={{sum((Time){1,45,50},(Time){2,30,25})::Pass two compound-literal Time values to the helper.}};
    printf("%d:%02d:%02d\n",c.h,c.m,c.s);
    return 0;
}''','4:16:15\n')

add('new-04','structs','Find a book by title','Return the first matching book through a pointer; titles are case-sensitive.',r'''
#include <stdio.h>
#include <string.h>
typedef struct { char title[24]; int copies; } Book;
Book *find({{Book a[]::An array parameter refers to the caller's Book records.}}, int n, const char *key) {
    for(int i=0; i<{{n::Use the supplied record count.}}; {{++i::Advance one record at a time.}})
        if({{strcmp::Compare the contents of two strings.}}(a[i].title,key) == {{0::strcmp returns zero for equality.}})
            return {{&a[i]::Return the address of the matching existing record.}};
    return {{NULL::No match is represented by a null pointer.}};
}
int main(void) {
    Book b[2]={{"C",4},{"Math",2}};
    Book *p={{find(b,2,"C")::Pass the records, count and sought title.}};
    if(p {{!=::Only dereference p after establishing it is non-null.}} NULL) printf("%d\n",p{{->::p points to a Book; use -> to access its field.}}copies);
    return 0;
}''','4\n')

add('new-05','structs','Sort employees by salary','Use selection sort in ascending salary order, swapping whole structures.',r'''
#include <stdio.h>
typedef struct { int id, salary; } Employee;
int main(void) {
    Employee e[3]={{101,500},{102,300},{103,400}};
    for(int i={{0::Start placement at the first record.}}; i<{{2::Three records need two selection passes.}}; ++i) {
        int k={{i::Begin with the first unsorted record as candidate.}};
        for(int j={{i+1::Search the rest of the unsorted suffix.}}; j<{{3::Do not access past the third record.}}; ++j)
            if(e[j].salary {{<::Select a smaller salary for ascending order.}} e[k].salary) k={{j::Remember the position of the smaller record.}};
        {{Employee::The temporary must preserve the whole record.}} t=e[i];
        e[i]={{e[k]::Copy the selected minimum record into position i.}};
        e[k]={{t::Complete the swap without losing the saved record.}};
    }
    for(int i=0;i<3;++i) printf("%d ",e[i].id);
    return 0;
}''','102 103 101 ')

add('new-06','memory','Allocate and reverse an integer array','Allocate five integers, reverse them in place, and release the allocation.',r'''
#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int n=5;
    int *a={{malloc(n * sizeof *a)::Allocate n complete integers, not n pointers.}};
    if(a=={{NULL::Check allocation before any array access.}}) return 1;
    for(int i=0;i<{{n::Initialise all n elements.}};++i) a[i]={{i+1::Create the sequence 1 through 5.}};
    for(int i=0;i<{{n/2::Swap only the first half to avoid undoing swaps.}};++i) {
        int j={{n-1-i::Mirror index i around the final valid index.}};
        int t={{a[i]::Save the left-hand value.}};
        a[i]={{a[j]::Move the right-hand value to the left.}};
        a[j]={{t::Restore the saved value at the right.}};
    }
    for(int i=0;i<n;++i) printf("%d ",a[i]);
    {{free(a)::Release the allocation exactly once.}};
    return 0;
}''','5 4 3 2 1 ')

add('new-07','memory','Count decimal digits with calloc','Use a dynamically allocated frequency array to count digits in 202406.',r'''
#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int *f={{calloc(10, sizeof *f)::calloc provides ten counters initially equal to zero.}};
    if(f=={{NULL::Stop if allocation fails.}}) return 1;
    int n={{202406::This is the number whose digits are counted.}};
    do {
        int d={{n%10::Remainder by ten extracts the last decimal digit.}};
        {{++f[d]::Increment the corresponding digit counter.}};
        n={{n/10::Discard the last decimal digit.}};
    } while(n {{>::Continue while unprocessed positive digits remain.}} 0);
    for(int i={{0::Digit values start at zero.}};i<{{10::There are ten decimal digits.}};++i)
        if(f[i]) printf("%d:%d ",i,f[i]);
    {{free(f)::Release the counter array.}};
    return 0;
}''','0:2 2:2 4:1 6:1 ')

add('new-08','memory','Allocate rows of unequal lengths','Build a small ragged array inside an array of structs, total all values, and free it.',r'''
#include <stdio.h>
#include <stdlib.h>
typedef struct { int n; int *v; } Row;
int main(void) {
    Row *r={{calloc(2,sizeof *r)::Allocate two zero-initialised row records.}};
    if(r=={{NULL::Check the outer allocation first.}}) return 1;
    int total=0;
    for(int i=0;i<{{2::There are two rows.}};++i) {
        r[i].n={{i+2::The row lengths are two and three.}};
        r[i].v={{malloc(r[i].n * sizeof *r[i].v)::Allocate enough integers for this row.}};
        if(!r[i].v) { for(int k=0;k<i;++k) free(r[k].v); free(r); return 1; }
        for(int j=0;j<{{r[i].n::Respect the current row's own length.}};++j) {
            r[i].v[j]={{i+j::Populate this example with row index plus column index.}};
            total+={{r[i].v[j]::Accumulate the value just stored.}};
        }
    }
    printf("%d\n",total);
    for(int i=0;i<2;++i) {{free(r[i].v)::Free each inner array before the outer records.}};
    {{free(r)::Release the array of Row structures last.}};
    return 0;
}''','7\n')

add('new-09','matrices','Transpose a rectangular matrix','Store a 2 by 3 matrix into its 3 by 2 transpose.',r'''
#include <stdio.h>
int main(void) {
    int a[2][3]={{1,2,3},{4,5,6}}, t[3][2];
    for(int i={{0::Start with the first original row.}};i<{{2::The original has two rows.}};++i)
        for(int j=0;j<{{3::The original has three columns.}};++j)
            t[{{j::An original column becomes a transpose row.}}][{{i::An original row becomes a transpose column.}}]={{a[i][j]::Copy the original cell to the reversed indices.}};
    for(int i=0;i<{{3::The transpose has three rows.}};++i) {
        for(int j=0;j<{{2::Each transpose row has two columns.}};++j) printf("%d ",{{t[i][j]::Print the stored transpose in row-major order.}});
        {{puts("")::End the current output row with a newline.}};
    }
    return 0;
}''','1 4 \n2 5 \n3 6 \n')

add('new-10','matrices','Choose the greatest column sum','Handle a matrix whose column sums are all negative and report the first maximum.',r'''
#include <stdio.h>
int main(void) {
    int a[2][3]={{-5,-1,-4},{-2,-2,-6}};
    int best={{-1::No column has been examined yet.}}, value=0;
    for(int j={{0::Columns use zero-based indexing.}};j<{{3::There are three columns.}};++j) {
        int sum={{0::Reset the sum for each new column.}};
        for(int i=0;i<{{2::Add the two row values in this column.}};++i) sum+={{a[i][j]::Keep column j fixed while row i changes.}};
        if({{best==-1 || sum>value::The first candidate establishes a baseline; later ones must be larger.}}) {
            best={{j::Save the winning column index.}};
            value={{sum::Save its actual sum, even if negative.}};
        }
    }
    printf("%d %d\n",best,{{value::Print the maximum sum paired with its index.}});
    return 0;
}''','1 -3\n')

add('new-11','matrices','Sum both diagonals once','Count the centre of a 3 by 3 matrix only once in the sum of both diagonals.',r'''
#include <stdio.h>
int main(void) {
    int n=3, a[3][3]={{1,2,3},{4,5,6},{7,8,9}};
    int sum={{0::Start the accumulated total at zero.}};
    for(int i={{0::Start at the first row.}};i<{{n::Visit all three rows.}};{{++i::Advance to the next row.}}) {
        sum+={{a[i][i]::The main diagonal has equal row and column indices.}};
        int j={{n-1-i::This is the opposite-diagonal column in row i.}};
        if(i {{!=::Skip the cell already counted on the main diagonal.}} j)
            sum+={{a[i][j]::Add the opposite diagonal only when it is a different cell.}};
    }
    printf({{"%d\n"::Print an integer followed by one newline.}},{{sum::The five distinct diagonal cells sum to 25.}});
    return 0;
}''','25\n')

add('new-12','strings','Clean and uppercase a line','Remove the newline from a fixed input line, copy it, and uppercase the copy.',r'''
#include <stdio.h>
#include <string.h>
#include <ctype.h>
int main(void) {
    char s[30]="C exam\n", out[30];
    size_t n={{strlen(s)::strlen excludes the string terminator.}};
    if(n>0 && s[n-1]=={{'\n'::Only remove a newline if one is present.}}) s[{{n-1::The last visible character is at index n-1.}}]={{'\0'::Terminate the shortened string.}};
    {{strcpy::Copy the full terminated string into the destination.}}(out,{{s::The source is the cleaned input string.}});
    for(size_t i=0;i<{{strlen(out)::Process the visible characters, excluding the terminator.}};++i)
        out[i]={{toupper((unsigned char)out[i])::Store toupper's return value; the unsigned-char cast is safe for ctype.}};
    printf("%s %zu\n",{{out::Print the modified copy.}},{{strlen(out)::The cleaned string has six visible characters.}});
    return 0;
}''','C EXAM 6\n')

add('new-13','strings','Manual string copy and compare','Copy without strcpy and count positions matching a second string.',r'''
#include <stdio.h>
int main(void) {
    char src[]="pointer", other[]="painter", dest[20];
    int i={{0::Begin at the first character.}};
    while(src[i] {{!=::Continue until the source terminator.}} {{'\0'::The null character terminates a C string.}}) {
        dest[i]={{src[i]::Copy the current character.}};
        {{++i::Advance only after copying.}};
    }
    dest[i]={{'\0'::A manual copy must explicitly copy or append the terminator.}};
    int same=0;
    for(int j=0; dest[j] && {{other[j]::Stop if either string reaches its terminator.}}; ++j)
        if(dest[j] {{==::Compare character values for equality.}} other[j]) {{++same::Count matching positions.}};
    printf("%s %d\n",{{dest::The destination is a complete printable string.}},same);
    return 0;
}''','pointer 6\n')

add('new-14','strings','Detect a case-insensitive palindrome','Check Level using two indices and ctype conversion without modifying the string.',r'''
#include <stdio.h>
#include <string.h>
#include <ctype.h>
int main(void) {
    char s[]="Level";
    int left={{0::The first character has index zero.}}, right={{(int)strlen(s)-1::The last character is one before the length.}};
    int ok={{1::Begin by assuming the string is a palindrome.}};
    while({{left<right::Compare pairs until the indices meet or cross.}}) {
        int a={{tolower((unsigned char)s[left])::Compare using lowercase character values.}};
        int b={{tolower((unsigned char)s[right])::Apply the same conversion at the right end.}};
        if(a {{!=::Any unequal pair disproves the palindrome.}} b) { ok=0; {{break::Stop at the first mismatch.}}; }
        {{++left::Move inward from the left.}};
        {{--right::Move inward from the right.}};
    }
    printf("%s\n",ok ? "yes" : "no");
    return 0;
}''','yes\n')

add('new-15','strings','Insert a separator and suffix','Build exam-ready in a dynamically allocated string of exactly sufficient capacity.',r'''
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int main(void) {
    const char *a="exam", *b="ready";
    size_t n={{strlen(a)::Count the first word's visible characters.}}+{{strlen(b)::Count the suffix's visible characters.}}+{{2::Reserve one separator and one terminating null character.}};
    char *s={{malloc(n)::char has size one, so n bytes suffice.}};
    if(s=={{NULL::Stop if storage could not be allocated.}}) return 1;
    {{strcpy::Initialise the destination as a valid terminated string.}}(s,a);
    {{strcat::Append after the current terminating null.}}(s,{{"-"::A string literal is needed, not a character literal.}});
    strcat(s,{{b::Append the second word.}});
    puts(s);
    {{free(s)::Release the allocated destination after printing.}};
    return 0;
}''','exam-ready\n')

add('new-16','files','Read marks until EOF','Read every integer from marks.txt and write the count and total to summary.txt.',r'''
#include <stdio.h>
int main(void) {
    FILE *in={{fopen("marks.txt","r")::Read mode requires the existing input file.}};
    if(in=={{NULL::Always check fopen before using the stream.}}) return 1;
    FILE *out={{fopen("summary.txt","w")::Write mode creates or truncates the output file.}};
    if(!out) { fclose(in); return 1; }
    int x, count={{0::No integers have been read yet.}}, total=0;
    while({{fscanf(in,"%d",&x)::Read into x's address and inspect the conversion count.}} == {{1::One successful integer conversion is required.}}) {
        total+={{x::Add the successfully read value.}};
        ++count;
    }
    {{fprintf(out,"%d %d\n",count,total)::Write the summary to the output stream.}};
    {{fclose(in)::Close the input after reading.}};
    {{fclose(out)::Flush and close the output after writing.}};
    printf("%d %d\n",count,total);
    return 0;
}''','4 30\n',fixtures={'marks.txt':'5 10 7 8\n'},expected_files={'summary.txt':'4 30\n'})

add('new-17','files','Copy text, then append a footer','Copy all lines into a fresh file and append END using a separate append-mode stream.',r'''
#include <stdio.h>
int main(void) {
    FILE *in=fopen("source.txt",{{"r"::Open the source for reading.}});
    FILE *out=fopen("copy.txt",{{"w"::Start with an empty destination.}});
    if(in=={{NULL::A failed open returns NULL.}} || out==NULL) {
        if(in) fclose(in); if(out) fclose(out); return 1;
    }
    char line[40];
    while({{fgets(line,sizeof line,in)::Read at most capacity minus one characters and terminate the buffer.}} != {{NULL::NULL marks EOF or a read error.}})
        {{fputs(line,out)::Write the line including its existing newline.}};
    fclose(in); {{fclose(out)::Close the writing stream before reopening.}};
    out=fopen("copy.txt",{{"a"::Append preserves the copied text.}});
    if(!out) return 1;
    {{fputs("END\n",out)::Write an explicit footer newline.}};
    {{fclose(out)::Flush and close the append stream.}};
    puts("copied");
    return 0;
}''','copied\n',fixtures={'source.txt':'one\ntwo\n'},expected_files={'copy.txt':'one\ntwo\nEND\n'})

add('new-18','files','Count characters and lines','Use an int for fgetc so that EOF is distinguishable from every byte value.',r'''
#include <stdio.h>
int main(void) {
    FILE *fp={{fopen("text.txt","r")::Read the existing text file.}};
    if(fp=={{NULL::A failed file open cannot be used.}}) return 1;
    {{int::fgetc returns an unsigned-char value converted to int, or EOF.}} ch;
    int chars={{0::Start the character counter at zero.}}, lines={{0::Count newline characters encountered.}};
    while((ch={{fgetc(fp)::Read one character from this stream.}}) != {{EOF::Test the int result against EOF before processing it.}}) {
        {{++chars::Count every character including newline.}};
        if(ch=={{'\n'::A newline completes one line in this fixture.}}) ++lines;
    }
    {{fclose(fp)::Close the stream at the end.}};
    printf("%d %d\n",chars,lines);
    return 0;
}''','5 2\n',fixtures={'text.txt':'ab\nc\n'})

add('new-19','pointers','Return minimum and maximum by address','Find both extrema without returning an array or structure.',r'''
#include <stdio.h>
void extremes(const int a[], int n, {{int *lo::Receive the address of the caller's minimum.}}, {{int *hi::Receive the address of the caller's maximum.}}) {
    *lo={{a[0]::Use an actual element as the initial minimum.}};
    *hi={{a[0]::The first element also establishes the maximum.}};
    for(int i=1;i<{{n::Visit all remaining elements.}};++i) {
        if(a[i]<*lo) {{*lo=a[i]::Store through the pointer to modify the caller's minimum.}};
        if(a[i]>*hi) {{*hi=a[i]::Store through the pointer to modify the caller's maximum.}};
    }
}
int main(void) {
    int a[]={-3,9,2,7}, lo,hi;
    extremes(a,{{4::There are four array elements.}},{{&lo::Pass an address for the minimum result.}},{{&hi::Pass an address for the maximum result.}});
    printf("%d %d\n",lo,hi);
    return 0;
}''','-3 9\n')

add('new-20','functions','Recursive digit sum','Define a recursion with a zero base case and one-digit progress.',r'''
#include <stdio.h>
{{int::The helper returns an integer sum.}} digit_sum({{int n::Pass the nonnegative number by value.}}) {
    if(n=={{0::Zero ends the recursion.}}) return {{0::Zero contributes no more digits.}};
    return {{n%10::The remainder extracts the current last digit.}} + digit_sum({{n/10::The quotient removes one digit and approaches the base case.}});
}
int main(void) {
    int n={{4702::The example input has digits 4, 7, 0 and 2.}};
    int result={{digit_sum(n)::Call the helper on the whole number.}};
    printf({{"%d\n"::Use an integer conversion and print a newline.}},{{result::The returned sum is 13.}});
    return 0;
}''','13\n')

add('new-21','functions','Recursive binary search','Return the index of 13 in a sorted array; inclusive bounds are used.',r'''
#include <stdio.h>
int search(const int a[],int lo,int hi,int key) {
    if({{lo>hi::Crossed inclusive bounds mean the interval is empty.}}) return {{-1::Use -1 to report absence.}};
    int mid={{lo+(hi-lo)/2::Choose the middle without adding both full bounds.}};
    if(a[mid]{{==::Equality identifies the target.}}key) return {{mid::Return the matching array index.}};
    if(key<a[mid]) return search(a,lo,{{mid-1::Exclude the already examined middle from the left half.}},key);
    return search(a,{{mid+1::Exclude the middle from the right half.}},hi,key);
}
int main(void) {
    int a[]={2,5,8,13,21};
    int n={{sizeof a/sizeof a[0]::sizeof recovers the count here because a is an actual array.}};
    printf("%d\n",search(a,{{0::The first valid index is zero.}},{{n-1::Inclusive upper bound is the last valid index.}},13));
    return 0;
}''','3\n')

add('new-22','loops','Reverse and test a decimal number','Preserve the original value, reverse its digits, and test for a palindrome.',r'''
#include <stdio.h>
int main(void) {
    int original=12321, n={{original::Make a working copy because division destroys digits.}};
    int reverse={{0::The reversed number begins at zero.}}, digits=0;
    do {
        int d={{n%10::Extract the rightmost digit.}};
        reverse=reverse*{{10::Shift the reversed decimal number left by one place.}}+{{d::Append the extracted digit.}};
        n={{n/10::Remove that digit from the working copy.}};
        {{++digits::Record one processed digit.}};
    } while({{n>0::Stop when every digit has been consumed.}});
    printf("%d %d %s\n",reverse,{{digits::The example has five digits.}},reverse{{==::A numeric palindrome equals its reversal.}}original ? "yes":"no");
    return 0;
}''','12321 5 yes\n')

add('new-23','loops','List primes with a divisor bound','Test divisors up to the square root without floating-point functions.',r'''
#include <stdio.h>
int prime({{int n::The helper tests one integer.}}) {
    if(n{{<::Zero, one and negative values are not prime.}}2) return {{0::Return false for numbers below two.}};
    for(int d={{2::Start with the smallest possible nontrivial divisor.}}; {{d<=n/d::Equivalent to d*d<=n for positive d without multiplication overflow.}}; {{++d::Try the next integer divisor.}})
        if(n{{%::Remainder detects exact divisibility.}}d==0) return {{0::Finding one nontrivial divisor disproves primality.}};
    return {{1::No divisor was found; the number is prime.}};
}
int main(void) {
    for(int n=1;n<=15;++n) if({{prime(n)::Print only numbers accepted by the helper.}}) printf("%d ",n);
    return 0;
}''','2 3 5 7 11 13 ')

add('new-24','arrays','Merge sorted arrays with leftovers','Merge two ascending arrays without losing elements after one input is exhausted.',r'''
#include <stdio.h>
int main(void) {
    int a[]={1,4,9},b[]={2,3},c[5];
    int i={{0::Start at the first element of a.}},j={{0::Start at the first element of b.}},k=0;
    while(i<{{3::a has three elements.}} && j<{{2::b has two elements.}}) {
        if(a[i]{{<=::Take the smaller current value, preferring a in a tie.}}b[j]) c[k++]={{a[i++]::Copy from a and then advance i.}};
        else c[k++]={{b[j++]::Copy from b and then advance j.}};
    }
    while(i<3) {{c[k++]=a[i++]::Copy all leftover elements of a.}};
    while(j<2) {{c[k++]=b[j++]::Copy all leftover elements of b.}};
    for(int p=0;p<{{k::k is the number of populated output elements.}};++p) printf("%d ",c[p]);
    return 0;
}''','1 2 3 4 9 ')

add('new-25','arrays','Compact duplicates in place','Preserve first occurrences without allocating a second array.',r'''
#include <stdio.h>
int unique(int a[],int n) {
    int k={{0::The accepted prefix is initially empty.}};
    for(int i={{0::Visit the input from its first element.}};i<{{n::Stop at the supplied input length.}};++i) {
        int j;
        for(j=0;j<{{k::Search only values already accepted.}};++j)
            if(a[j]{{==::Look for a duplicate of the current value.}}a[i]) {{break::Stop the search as soon as a duplicate is found.}};
        if(j=={{k::Reaching the end without a match means this is new.}}) a[k++]={{a[i]::Append the new value to the accepted prefix.}};
    }
    return {{k::Return the compacted logical length.}};
}
int main(void) {
    int a[]={3,1,3,2,1,4};
    int n={{unique(a,6)::Process all six input values.}};
    for(int i=0;i<n;++i) printf("%d ",a[i]);
    return 0;
}''','3 1 2 4 ')

# Mock-only questions are authored below. They never enter the practice pool.
add('mock-a1','structs','Department payroll','Allocate employee records, apply a percentage rise through a pointer, and select the highest revised salary.',r'''
#include <stdio.h>
#include <stdlib.h>
typedef struct { int id; int salary; } Employee;
void raise_pay({{Employee *p::A pointer lets the helper modify the original employee.}},int percent) {
    p->salary += {{p->salary*percent/100::Compute the integer percentage of the current salary.}};
}
int main(void) {
    int n=3, best=0;
    Employee *e={{malloc(n*sizeof *e)::Allocate space for all three records.}};
    if({{e==NULL::Check the allocation before writing records.}}) return 1;
    int pay[]={2000,3000,2500};
    for(int i=0;i<n;++i) { e[i].id=100+i; e[i].salary=pay[i]; }
    for(int i=0;i<n;++i) {
        raise_pay({{e+i::Pass a pointer to the current record.}},10);
        if({{e[i].salary>e[best].salary::Compare revised salaries to select the maximum.}}) best={{i::Retain the winning index.}};
    }
    Employee *winner={{&e[best]::Obtain the address of the chosen record.}};
    printf("%d %d\n",winner->id,{{winner->salary::Access the salary through the struct pointer.}});
    {{free(e)::Release the original allocation once.}};
    return 0;
}''','101 3300\n',pool='mock')

add('mock-a2','matrices','Compare triangular totals','Compute the totals strictly above and strictly below a square matrix diagonal.',r'''
#include <stdio.h>
void totals(int a[][3],int n,{{int *upper::The upper result is returned through an address.}},int *lower) {
    *upper={{0::Initialise the caller's upper total.}}; *lower={{0::Initialise the caller's lower total.}};
    for(int i=0;i<{{n::Visit all rows.}};++i)
        for(int j=0;j<n;++j) {
            if({{j>i::Columns to the right of the diagonal form the upper triangle.}}) *upper+={{a[i][j]::Add the current upper-triangle cell.}};
            else if({{i>j::Rows below the diagonal form the lower triangle.}}) *lower+={{a[i][j]::Add the current lower-triangle cell.}};
        }
}
int main(void) {
    int a[3][3]={{1,2,3},{4,5,6},{7,8,9}},u,l;
    totals(a,3,{{&u::Pass the upper output variable's address.}},{{&l::Pass the lower output variable's address.}});
    printf("%d %d\n",u,l);
    return 0;
}''','11 19\n',pool='mock')

add('mock-a3','files','Select passing records','Read roll and mark pairs until conversion fails; write records with marks at least 50.',r'''
#include <stdio.h>
typedef struct { int roll,mark; } Result;
int main(void) {
    FILE *in={{fopen("results.txt","r")::Open the existing records for reading.}};
    FILE *out={{fopen("passed.txt","w")::Create a fresh pass list.}};
    if(!in || !out) { if(in) fclose(in); if(out) fclose(out); return 1; }
    Result r; int count=0,total=0;
    while(fscanf(in,"%d%d",{{&r.roll::The first integer is written into the roll member.}},{{&r.mark::The second integer is written into the mark member.}})=={{2::Both integer fields must be converted successfully.}}) {
        if(r.mark {{>=::The pass threshold includes exactly 50.}} 50) {
            {{fprintf(out,"%d %d\n",r.roll,r.mark)::Write one selected record and a newline.}};
            total+=r.mark; {{++count::Count only passing records.}};
        }
    }
    {{fclose(in)::Close the consumed input stream.}}; {{fclose(out)::Flush and close the pass list.}};
    printf("%d %d\n",count,total);
    return 0;
}''','2 125\n',pool='mock',fixtures={'results.txt':'1 49\n2 50\n3 75\n'},expected_files={'passed.txt':'2 50\n3 75\n'})

add('mock-a4','functions','Reduce a fraction recursively','Use Euclid’s algorithm and modify a numerator and denominator through addresses.',r'''
#include <stdio.h>
int gcd(int a,int b) {
    if({{b==0::A zero remainder ends Euclid's recursion.}}) return {{a::The remaining value is the greatest common divisor.}};
    return gcd({{b::The old divisor becomes the next dividend.}},{{a%b::The remainder becomes the next divisor.}});
}
void reduce({{int *num::Receive the numerator's address.}},{{int *den::Receive the denominator's address.}}) {
    int g=gcd({{*num::Read the original numerator through its pointer.}},*den);
    *num {{/=::Divide the numerator by the common divisor.}} g;
    *den /= g;
}
int main(void) {
    int n=42,d=56;
    reduce({{&n::Pass the numerator by address.}},{{&d::Pass the denominator by address.}});
    printf("%d/%d\n",n,d);
    return 0;
}''','3/4\n',pool='mock')

add('mock-a5','strings','Filter letters and uppercase','Create a new string containing only alphabetic characters, in uppercase.',r'''
#include <stdio.h>
#include <ctype.h>
#include <string.h>
int main(void) {
    char in[]="C-Exam 2026!",out[30];
    int k={{0::No output characters have been accepted yet.}};
    for(int i={{0::Begin at the first input character.}};in[i]{{!=::Stop at the input terminator.}}{{'\0'::This null character terminates a C string.}};{{++i::Visit each input character once.}}) {
        unsigned char c={{(unsigned char)in[i]::ctype expects EOF or a value representable as unsigned char.}};
        if({{isalpha(c)::Only alphabetic characters are retained.}}) out[k++]={{toupper(c)::Store the uppercase value in the next free output slot.}};
    }
    out[k]={{'\0'::Terminate the compacted output string.}};
    printf("%s %zu\n",out,{{strlen(out)::Report the visible length of the finished string.}});
    return 0;
}''','CEXAM 5\n',pool='mock')

add('mock-b1','memory','Pick the largest row average','Allocate unequal row arrays and compare their arithmetic means.',r'''
#include <stdio.h>
#include <stdlib.h>
typedef struct { int n; int *v; } Vector;
int main(void) {
    Vector *p={{calloc(2,sizeof *p)::Allocate two zero-initialised Vector records.}};
    if(!p) return 1;
    int data[2][3]={{2,4,0},{5,6,7}},best=-1; double highest=0;
    for(int i=0;i<2;++i) {
        p[i].n={{i+2::The two vector lengths are two and three.}};
        p[i].v={{malloc(p[i].n*sizeof *p[i].v)::Allocate the current vector's own integer array.}};
        if(!p[i].v) { for(int j=0;j<i;++j) free(p[j].v); free(p); return 1; }
        int sum=0;
        for(int j=0;j<{{p[i].n::Traverse only this vector's valid entries.}};++j) {
            p[i].v[j]=data[i][j]; sum+={{p[i].v[j]::Accumulate the current vector's entries.}};
        }
        double mean={{(double)sum/p[i].n::Convert before division to retain fractional means.}};
        if({{best==-1 || mean>highest::Establish a baseline with the first vector and replace it only with a larger mean.}}) { best=i; highest=mean; }
    }
    printf("%d %.1f\n",best,{{highest::Print the chosen average, 6.0.}});
    for(int i=0;i<2;++i) {{free(p[i].v)::Free every nested array before its owner.}};
    {{free(p)::Release the outer Vector array last.}};
    return 0;
}''','1 6.0\n',pool='mock')

add('mock-b2','arrays','Insert into a sorted array','Insert key 6 into an ascending array with one spare slot, shifting the suffix.',r'''
#include <stdio.h>
int insert(int a[],int n,int key) {
    int pos={{0::Search from the first element.}};
    while(pos<{{n::Do not read past the populated prefix.}} && a[pos]{{<::Stop before the first value at least as large as key.}}key) {{++pos::Advance over smaller elements.}};
    for(int j={{n::The first free slot is at index n.}};j{{>::Continue until the insertion slot is free.}}pos;{{--j::Shift from the end to avoid overwriting values still needed.}})
        a[j]={{a[j-1]::Copy each preceding value one slot to the right.}};
    a[pos]={{key::Place the new value into the freed slot.}};
    return {{n+1::The logical length grows by exactly one.}};
}
int main(void) {
    int a[6]={1,3,5,7,9};
    int n=insert(a,5,6);
    for(int i=0;i<n;++i) printf("%d ",a[i]);
    return 0;
}''','1 3 5 6 7 9 ',pool='mock')

add('mock-b3','files','Merge two sorted integer files','Maintain one lookahead value from each file and write the ascending merge.',r'''
#include <stdio.h>
int main(void) {
    FILE *a=fopen("a.txt",{{"r"::Open the first sorted input for reading.}}), *b=fopen("b.txt",{{"r"::Open the second sorted input for reading.}});
    FILE *out=fopen("merged.txt",{{"w"::Create or truncate the merged output.}});
    if(!a||!b||!out) { if(a) fclose(a); if(b) fclose(b); if(out) fclose(out); return 1; }
    int x,y;
    int hasA={{fscanf(a,"%d",&x)==1::Record whether the first lookahead was read successfully.}};
    int hasB={{fscanf(b,"%d",&y)==1::Record whether the second lookahead exists.}};
    while({{hasA && hasB::Compare only while both lookahead values are valid.}}) {
        if({{x<=y::Choose the smaller value, taking a first on equality.}}) { fprintf(out,"%d ",x); hasA=fscanf(a,"%d",&x)==1; }
        else { fprintf(out,"%d ",y); hasB={{fscanf(b,"%d",&y)==1::Advance only the input whose value was emitted.}}; }
    }
    while(hasA) { fprintf(out,"%d ",x); hasA=fscanf(a,"%d",&x)==1; }
    while({{hasB::Drain any remaining valid second-input values.}}) { fprintf(out,"%d ",y); hasB=fscanf(b,"%d",&y)==1; }
    fclose(a); fclose(b); {{fclose(out)::Flush all merged values before closing.}};
    puts("merged");
    return 0;
}''','merged\n',pool='mock',fixtures={'a.txt':'1 4 9','b.txt':'2 3 10'},expected_files={'merged.txt':'1 2 3 4 9 10 '})

add('mock-b4','functions','Recursive array maximum','Solve the maximum of a nonempty array using a size-decreasing recursion.',r'''
#include <stdio.h>
int maximum(const int a[],{{int n::The count identifies the nonempty prefix to inspect.}}) {
    if(n=={{1::One element is the base case.}}) return {{a[0]::The sole element is its own maximum.}};
    int earlier={{maximum(a,n-1)::Recursively find the maximum of the shorter prefix.}};
    int last={{a[n-1]::The final valid index of a prefix of length n is n-1.}};
    return earlier{{>::Choose the greater of the prefix maximum and last element.}}last ? {{earlier::Keep the prefix maximum when it is larger.}} : {{last::Otherwise choose the last element.}};
}
int main(void) {
    int a[]={-7,-2,-9,-4};
    int n={{sizeof a/sizeof a[0]::Compute the count where a is a complete array.}};
    printf("%d\n",{{maximum(a,n)::Pass all four elements to the recursive helper.}});
    return 0;
}''','-2\n',pool='mock')

add('mock-b5','pointers','Transfer between bank accounts','Transfer only when the source has sufficient funds. Modify balances through pointers.',r'''
#include <stdio.h>
typedef struct { int id,balance; } Account;
int transfer({{Account *from::Receive a pointer to the source record.}},{{Account *to::Receive a pointer to the destination record.}},int amount) {
    if(amount{{<=::Reject zero and negative transfers.}}0 || from->balance{{<::Reject a transfer larger than the source balance.}}amount) return {{0::Failure leaves both balances unchanged.}};
    from->balance {{-=::Subtract the transferred amount from the source.}} amount;
    to->balance {{+=::Credit the destination with the same amount.}} amount;
    return {{1::Report success only after both updates.}};
}
int main(void) {
    Account a={1,900}, b={2,100};
    int ok=transfer({{&a::Pass a's address so its actual balance can change.}},{{&b::Pass b's address for the destination update.}},250);
    printf("%d %d %d\n",ok,a.balance,b.balance);
    return 0;
}''','1 650 350\n',pool='mock')

add('mock-c1','structs','Select the best sales record','Compute quantity times price for each dynamically allocated record and retain the first maximum.',r'''
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
typedef struct { char name[12]; int qty,price; } Sale;
int main(void) {
    Sale *s={{malloc(3*sizeof *s)::Reserve storage for three complete Sale objects.}};
    if(s=={{NULL::Check allocation before initialisation.}}) return 1;
    {{strcpy(s[0].name,"Pen")::Copy the first product name into its character array.}};
    strcpy(s[1].name,"Book"); strcpy(s[2].name,"Bag");
    int q[]={10,4,2},p[]={5,30,50},best=-1,revenue=0;
    for(int i=0;i<{{3::Visit each of the three records.}};++i) {
        s[i].qty=q[i]; s[i].price=p[i];
        int current={{s[i].qty*s[i].price::Revenue is quantity multiplied by unit price.}};
        if({{best==-1 || current>revenue::Use the first record as a baseline and preserve the first tied winner.}}) {
            best={{i::Save the index of the winning record.}}; revenue={{current::Save its computed revenue.}};
        }
    }
    Sale *winner=s+best;
    printf("%s %d\n",{{winner->name::Select the character array through a pointer.}},revenue);
    {{free(s)::Free the base pointer rather than the interior winner pointer.}};
    return 0;
}''','Book 120\n',pool='mock')

add('mock-c2','matrices','Multiply two small matrices','Compute C = A times B using the row-column dot product.',r'''
#include <stdio.h>
void multiply(int a[2][3],int b[3][2],int c[2][2]) {
    for(int i={{0::Start at the first output row.}};i<{{2::A has two rows, so C does too.}};++i)
        for(int j=0;j<{{2::B has two columns, so C does too.}};++j) {
            c[i][j]={{0::Reset the current dot-product accumulator.}};
            for(int k=0;k<{{3::The shared inner dimension is three.}};++k)
                c[i][j]+={{a[i][k]::Select the kth entry from A's current row.}}*{{b[k][j]::Select the kth entry from B's current column.}};
        }
}
int main(void) {
    int a[2][3]={{1,2,3},{4,5,6}},b[3][2]={{1,0},{0,1},{1,1}},c[2][2];
    multiply(a,b,{{c::The function writes into the caller's result array.}});
    for(int i=0;i<2;++i) {
        for(int j=0;j<2;++j) printf("%d ",{{c[i][j]::Print the product matrix in row-major order.}});
        {{puts("")::Print one newline after each product row.}};
    }
    return 0;
}''','4 5 \n10 11 \n',pool='mock')

add('mock-c3','files','Append uppercase log lines','Read complete chunks of a source file, uppercase them, and append to an existing log.',r'''
#include <stdio.h>
#include <ctype.h>
int main(void) {
    FILE *in={{fopen("incoming.txt","r")::Read the existing incoming file.}};
    FILE *out={{fopen("log.txt","a")::Append mode preserves existing log entries.}};
    if(in=={{NULL::Check whether the input failed to open.}} || out==NULL) { if(in) fclose(in); if(out) fclose(out); return 1; }
    char line[50]; int count=0;
    while({{fgets(line,sizeof line,in)::Read a terminated chunk, retaining its newline.}} != {{NULL::Stop when no further chunk can be read.}}) {
        for(int i=0;line[i];++i) line[i]={{toupper((unsigned char)line[i])::Store each converted character safely.}};
        {{fputs(line,out)::Append the converted chunk exactly as stored.}};
        {{++count::Count the chunks; the fixture's lines both fit the buffer.}};
    }
    {{fclose(in)::Close the read stream.}}; {{fclose(out)::Flush and close the append stream.}};
    printf("%d\n",count);
    return 0;
}''','2\n',pool='mock',fixtures={'incoming.txt':'exam\nready\n','log.txt':'START\n'},expected_files={'log.txt':'START\nEXAM\nREADY\n'})

add('mock-c4','strings','Count words with state','Count words separated by spaces, including repeated spaces and leading or trailing spaces.',r'''
#include <stdio.h>
#include <string.h>
int main(void) {
    char s[]="  learn C  every day ";
    int words={{0::No word starts have been seen yet.}}, inside={{0::Initially the scan is outside a word.}};
    for(size_t i={{0::Begin with the first character.}};i<{{strlen(s)::Stop before the null terminator.}};{{++i::Advance one character per iteration.}}) {
        if(s[i]{{==::A literal space separates words in this exercise.}}{{' '::Use a character literal for one space.}}) inside={{0::Any space returns the scanner to the outside state.}};
        else if({{!inside::Count only a transition from outside to inside.}}) {
            ++words; inside={{1::Remember that following non-space characters belong to this word.}};
        }
    }
    printf("%d\n",words);
    return 0;
}''','4\n',pool='mock')

add('mock-c5','loops','Classify three-digit cube numbers','Print three-digit numbers equal to the sum of the cubes of their digits and count them.',r'''
#include <stdio.h>
int cube_sum(int n) {
    int sum={{0::Start the sum of digit cubes at zero.}};
    while({{n>0::Continue while digits remain.}}) {
        int d={{n%10::Extract the final decimal digit.}};
        sum+={{d*d*d::C uses multiplication, not XOR, to form a cube.}};
        n={{n/10::Discard the processed digit.}};
    }
    return {{sum::Return the sum, not the consumed number.}};
}
int main(void) {
    int count=0;
    for(int n={{100::The smallest three-digit integer is 100.}};n<={{999::Include the largest three-digit integer.}};++n)
        if({{cube_sum(n)==n::A qualifying number equals its digit-cube sum.}}) { printf("%d ",n); {{++count::Count each accepted number once.}}; }
    printf("\ncount=%d\n",count);
    return 0;
}''','153 370 371 407 \ncount=4\n',pool='mock')

def output(id,topic,title,code,expected,trace):
    questions.append(dict(id=id,subject='itp',topic=topic,title=title,source='Original • output drill',difficulty='Foundation',pool='original',type='output',prompt='Predict the exact standard output. These operations are sequenced; there is no undefined increment behavior. Preserve leading spaces and line breaks.',code='#include <stdio.h>\n'+code,blanks=[],expectedOutput=expected,trace=trace,runnable=True,stdin=''))

output('out-01','operators','Separate pre- and post-increments',r'''int main(void) { int x=4; int a=x++; int b=++x; printf("%d %d %d\n",a,b,x); return 0; }''','4 6 6\n',['x++ gives a the old value 4, then x becomes 5.','++x changes x to 6, then gives b 6.','The final values are a=4, b=6, x=6.'])
output('out-02','operators','Integer division before conversion',r'''int main(void) { int a=7,b=2; printf("%d %.1f %.1f\n",a/b,(double)(a/b),(double)a/b); return 0; }''','3 3.0 3.5\n',['7/2 uses integer division and gives 3.','Casting the result of integer division gives 3.0.','Casting an operand before division gives 3.5.'])
output('out-03','operators','Signed remainder',r'''int main(void) { printf("%d %d %d\n",-17/5,-17%5,17%-5); return 0; }''','-3 -2 2\n',['C11 integer division truncates toward zero, so -17/5 is -3.','-17 = (-3)*5 + (-2), so the first remainder is -2.','A nonzero remainder has the dividend’s sign, so 17%-5 is 2.'])
output('out-04','pointers','Move a pointer before reading',r'''int main(void) { int a[]={3,6,9,12}; int *p=a+1; printf("%d ",*p++); printf("%d %td\n",*p,p-a); return 0; }''','6 9 2\n',['p initially points at a[1], whose value is 6.','*p++ reads 6 then advances p to a[2].','The new pointed value is 9 and the element offset is 2.'])
output('out-05','pointers','Pointer indexing changes the array',r'''int main(void) { int a[]={2,4,6,8}; int *p=a+1; p[1]+=3; printf("%d %d %d\n",a[2],*(p-1),p[2]); return 0; }''','9 2 8\n',['p[1] refers to a[2], changing it from 6 to 9.','p-1 points at a[0], whose value is 2.','p[2] refers to a[3], whose value remains 8.'])
output('out-06','scope','A shadowed block variable',r'''int x=9; int main(void) { int x=2; { int x=5; ++x; printf("%d ",x); } printf("%d\n",x); return 0; }''','6 2\n',['The inner block declares its own x=5, then increments it to 6.','After the block ends, the local x in main is still 2.','The global x=9 is shadowed and never printed.'])
output('out-07','scope','Static local across calls',r'''void f(void) { int a=1; static int b=1; printf("%d:%d ",a++,b++); } int main(void) { f(); f(); f(); return 0; }''','1:1 1:2 1:3 ',['The automatic a is recreated with value 1 for every call.','Static b is initialised once and retains 2 then 3 across calls.','Each post-increment prints the old value. No newline is printed.'])
output('out-08','operators','Short-circuit side effects',r'''int main(void) { int x=0,y=3; int a=x && ++y; int b=1 || ++y; printf("%d %d %d\n",a,b,y); return 0; }''','0 1 3\n',['x is zero, so && skips ++y and yields 0.','The left operand of || is true, so its ++y is also skipped and the result is 1.','y is never modified and remains 3.'])
output('out-09','operators','Post-decrement loop test',r'''int main(void) { int n=3; while(n--) printf("%d ",n); printf("|%d\n",n); return 0; }''','2 1 0 |-1\n',['Tests use old values 3, 2, and 1; after decrement the bodies print 2, 1, and 0.','The final condition tests old zero, which is false, but still decrements n to -1.','The last printf prints |-1 and a newline.'])
output('out-10','functions','Recursion prints on both sides',r'''void f(int n) { if(n==0) return; printf("%d ",n); f(n-1); printf("%d ",n); } int main(void) { f(2); return 0; }''','2 1 1 2 ',['f(2) prints 2 before calling f(1).','f(1) prints 1, calls the silent base case f(0), then prints 1.','Returning to f(2) prints 2. The program prints no newline.'])

for letter,title,description in [('a','Paper 01 · Core patterns','Records, matrices, file records, recursion and strings.'),('b','Paper 02 · Work with data','Nested allocation, insertion, file merging, recursion and pointers.'),('c','Paper 03 · Put it together','Sales records, matrix products, log files, strings and digit algorithms.')]:
    papers.append(dict(id='paper-'+letter,subject='itp',title=title,description=description,questionIds=['mock-'+letter+str(i) for i in range(1,6)]))
target=ROOT/'src/data/itp'
target.mkdir(parents=True,exist_ok=True)
(target/'original.json').write_text(json.dumps([q for q in questions if q['pool']=='original'],ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
(target/'mocks.json').write_text(json.dumps([q for q in questions if q['pool']=='mock'],ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
(target/'papers.json').write_text(json.dumps(papers,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(f'Created {len(questions)} originals: 25 practice completions, 10 output drills and 15 mock-only completions.')
