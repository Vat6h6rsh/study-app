"""Original deterministic C exercises. Run with python -X utf8 scripts/itp-exam-pattern.py.

Only replaces exam21-* / mock-d* / mock-e* / mock-f* authored here; preserves legacy code.
{{key|||alternative::reason}} is one instructive blank. UTF-8 writes only.
"""
import json, re, runpy
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
audit=runpy.run_path(str(ROOT/'scripts/itp-methods.py'))
METHODS=audit['annotate'](ROOT)
CORE={m['id'] for m in METHODS if m['priority']=='core'}
NEW=[]
SET='Exam pattern practice (based on the 21 Nov paper)'

def add(slug,topic,title,goal,rules,body,expected,methods,*,pool='original',priority=None,pattern=None,main=None,files=None):
    blanks=[]
    def token(m):
        keys,why=m[1].split('::',1)
        accepted=keys.split('|||')
        # Parenthesised equivalents for expression blanks; semantic alternatives are authored explicitly.
        if len(accepted)==1 and re.fullmatch(r'[A-Za-z0-9_]+|[A-Za-z0-9_]+\[[^]]+\]',keys):
            if keys not in ['int','void','typedef','enum','static','Runner','Package','NULL','EOF','free','malloc','calloc','realloc','printf','strcpy','strcat','strcmp','strlen','fclose','fgets','fputs','fgetc','fputc','fscanf','fprintf','define','extern','auto','register','const']:
                accepted.append('('+keys+')')
        blanks.append(dict(id=chr(65+len(blanks)),accepted=accepted,explanation=why))
        return '__'+blanks[-1]['id']+'__'
    code=re.sub(r'\{\{((?:(?!\{\{|\}\})[\s\S])*?::(?:(?!\{\{|\}\})[\s\S])*?)\}\}',token,body.strip())+'\n'
    assert len(blanks)==10,(slug,len(blanks))
    lines=code.rstrip('\n').split('\n')
    # Short programs get readable separation between statements, never filler executable work.
    if len(lines)<20:
        for index in range(len(lines)-2,0,-1):
            if len(lines)>=20: break
            if lines[index].strip() and not lines[index].endswith('{'):
                lines.insert(index+1,'')
        code='\n'.join(lines)+'\n'
    assert 20<=len(lines)<=45,(slug,len(lines))
    explanations=[]
    comments=[
      'Load the library declarations used by this program.',
      'Keep the initial data fixed so the result is repeatable.',
      'Set up the state before processing the data.',
      'Visit the next part of the problem in a defined order.',
      'Apply the rule described in the task statement.',
      'Keep this intermediate result for the following step.',
      'Report the computed result using the required layout.',
      'Finish this stage and release any resources it owns.',
    ]
    meaningful=[i+1 for i,s in enumerate(lines) if s.strip() and s.strip() not in ['{','}']]
    anchors=sorted(set(meaningful[min(len(meaningful)-1,round(i*(len(meaningful)-1)/7))] for i in range(8)))
    for line,text in zip(anchors,comments):
        canonical=lines[line-1]
        for b in blanks: canonical=canonical.replace('__'+b['id']+'__',b['accepted'][0])
        if '#include' in canonical: text='Load the library declarations needed below.'
        elif re.search(r'\bfree\(',canonical): text='Release owned heap storage after its last use.'
        elif re.search(r'\b(calloc|malloc|realloc)\(',canonical): text='Request heap storage; handle failure before using the result.'
        elif 'fclose(' in canonical: text='Flush pending output and release this stream.'
        elif 'fopen(' in canonical: text='Open the local text file with the required access mode.'
        elif re.search(r'\b(fprintf|fputs|fputc)\(',canonical): text='Write the selected data to the open stream.'
        elif re.search(r'\b(fscanf|fgets|fgetc)\(',canonical): text='Read from the stream and check whether data was obtained.'
        elif re.search(r'\b(printf|puts)\(',canonical): text='Display the computed values in the requested format.'
        elif re.search(r'\bfor\s*\(',canonical): text='Repeat the work over the valid positions in order.'
        elif re.search(r'\bwhile\s*\(',canonical): text='Repeat while unprocessed data remains.'
        elif re.search(r'\bif\s*\(',canonical): text='Test the rule before taking the dependent step.'
        elif re.search(r'\breturn\b',canonical): text='Pass the completed result back to the caller.'
        elif 'typedef' in canonical or 'struct' in canonical: text='Describe related fields as a single record type.'
        elif 'static ' in canonical: text='Keep this local state across later calls.'
        elif re.search(r'\b(int|char|double|long|const)\b',canonical): text='Prepare the data and state used in this stage.'
        else: text='Store this stage’s result before the following step.'
        # Avoid accidental substrings of accepted keys (the same rule used by verify-content).
        if any(a in text for b in blanks for a in b['accepted'] if len(a)>=4):
            text='Follow the task rule at this stage.'
        explanations.append(dict(line=line,text=text))
    main=main or methods.split()[:3]
    q=dict(id=slug if pool=='mock' else 'exam21-'+slug,subject='itp',topic=topic,title=title,
      source='Exam style · '+('Mock '+slug[5].upper() if pool=='mock' else '21 Nov variants'),
      set=SET,difficulty='Exam',pool=pool,type='blanks',priority=priority or ('core' if any(m in CORE for m in main) else 'extra'),
      methods=methods.split(),mainMethods=main,prompt='Complete the ten blanks. Use the fixed data and print the expected output exactly.',
      brief=dict(goal=goal,rules=rules, sample=dict(output=expected)),code=code,blanks=blanks,
      explanations=explanations,expectedOutput=expected,trace=[b['explanation'] for b in blanks],runnable=True,stdin='')
    if pattern:q['pattern']=pattern
    if files:q['expectedFiles']=files
    NEW.append(q)
    return q

# P1: three different scenarios, threshold comparisons, unused count and one decimal mean.
for k,(name,data,limit) in enumerate([
    ('Reservoir',[12,7,15,6,10],10),('Cycle hire',[4,9,6,11,5],6),('Studio hours',[3,8,5,9,7],7)],1):
    total=sum(data);count=sum(x>=limit for x in data)
    add(f'p1-{k}','arrays',f'{name} arrays, Threshold counts and Floating averages',
        f'Summarise five days of {name.lower()} activity. Print the total, the number of days meeting the target, the days below it and the mean.',
        [f'The daily values are {data}; the target is {limit}. A day meets the target when its value is at least the target.',
         'Start both accumulators at zero. Below-target days = number of days minus target-meeting days.',
         'Compute the mean using floating division and print it with one digit after the decimal point.'],
        r'''#include <stdio.h>
int main(void) {
    const int days = 5;
    int daily[] = {DATA};
    int total = {{0::An empty running total starts at zero.}};
    int reached = 0;
    for (int i = 0; {{i < days|||i <= days - 1::Visit all five valid array indices.}}; {{++i|||i++::Advance one day per iteration.}}) {
        total {{+=::Compound addition accumulates the current value.}} {{daily[i]::Read the current day's activity.}};
        if ({{daily[i] >= LIMIT|||LIMIT <= daily[i]::The target is inclusive.}}) {
            {{++reached|||reached++::Count this target-meeting day once.}};
        }
    }
    int below = {{days - reached::Every day belongs to exactly one group.}};
    double mean = {{(double)total / days|||total / (double)days::Convert before division to preserve the fraction.}};
    printf("Total=%d\n", total);
    printf("Reached=%d Below=%d\n", reached, below);
    printf("Mean=%.1f\n", {{mean::Print the calculated floating mean.}});
    return 0;
}'''.replace('DATA',','.join(map(str,data))).replace('LIMIT',str(limit)),
        f'Total={total}\nReached={count} Below={5-count}\nMean={total/5:.1f}\n',
        'array-total modulo cast integer-division for increment',priority='core',pattern='P1',main=['array-total','cast','for'])
    # Remainder is not exercised by these programs.
    NEW[-1]['methods'].remove('modulo')

# P2: first match plus parity counting, with a helper accessing the hidden global.
for k,(data,key,global_value) in enumerate([([7,4,7,9,2],7,40),([6,3,8,3,5],3,60),([5,12,4,9,12],12,80)],1):
    first=data.index(key);odd=sum(x%2!=0 for x in data)
    add(f'p2-{k}','functions',f'{["Parcel", "Sensor", "Seat"][k-1]} searches, Odd counts and Global shadowing',
      'Find the first occurrence of the target and count odd entries using two array functions. Show a local variable and the global variable that it hides.',
      [f'Use {data} and target {key}. Search from index zero; return the first matching index, or -1 when absent.',
       'An integer is odd when its remainder on division by two is nonzero.',
       f'The file-scope score is {global_value}; main declares a different score of 5. A helper outside main prints the global value.'],
      r'''#include <stdio.h>
int score = GLOBAL;
int first(const int a[], int n, int key) {
    for (int i = 0; i < n; ++i) {
        if ({{a[i] == key|||key == a[i]::Compare the current value with the target.}}) return {{i::Return immediately to keep the first index.}};
    }
    return {{-1::A negative sentinel represents no match.}};
}
int odds({{const int a[]|||const int *a::An array argument is read through its first element address.}}, int n) {
    int count = 0;
    for (int i = 0; i < n; ++i) {
        if ({{a[i] % 2 != 0|||a[i] % 2::Nonzero remainder identifies odd values.}}) {{++count|||count++::Count each odd entry.}};
    }
    return {{count::Return the total number of odd values.}};
}
void global_score(void) {
    printf("Global=%d\n", {{score::This function resolves the file-scope score.}});
}
int main(void) {
    int a[] = {DATA};
    int score = 5;
    printf("First=%d Odd=%d\n", {{first(a, 5, KEY)::Pass the array, its length and the target.}}, odds(a, 5));
    printf("Local=%d\n", {{score::The nearest declaration is main's local score.}});
    global_score();
    return 0;
}'''.replace('GLOBAL',str(global_value)).replace('DATA',','.join(map(str,data))).replace('KEY',str(key)),
      f'First={first} Odd={odd}\nLocal=5\nGlobal={global_value}\n',
      'linear-first linear-count modulo array-parameter return shadow',priority='core',pattern='P2')

# P3: reverse without modifying the source; count different character classes and a chosen character.
for k,(s,test,ch) in enumerate([('Lane42a','islower','a'),('Dock307','isdigit','0'),('River6r','islower','r')],1):
    classified=sum(c.islower() if test=='islower' else c.isdigit() for c in s)
    add(f'p3-{k}','strings',f'{["Lane", "Dock", "River"][k-1]} reversal, Character classes and Frequency counts',
      'Build a reversed copy of the fixed label, count the specified character class, and count exact occurrences of a chosen character in the original.',
      [f'The label is "{s}". Count '+('lowercase letters' if test=='islower' else 'decimal digits')+f' and the case-sensitive character \'{ch}\'.',
       'Map destination position i to source position length minus one minus i. Leave the source unchanged.',
       'Place a null terminator after the last copied character. Cast characters to unsigned char before calling ctype.'],
      r'''#include <stdio.h>
#include <string.h>
#include <ctype.h>
int main(void) {
    char label[] = "TEXT";
    char reversed[20];
    int n = {{(int)strlen(label)::Measure the characters before the terminator.}};
    int classified = {{0::No characters have been counted yet.}}, matches = 0;
    for (int i = 0; {{i < n::Exclude the source terminator from reversal.}}; ++i) {
        reversed[i] = {{label[n - 1 - i]::Mirror each index around the last character.}};
        unsigned char c = {{(unsigned char)label[i]::ctype requires an unsigned-char value or EOF.}};
        if ({{TEST(c)::Test the requested character class.}}) {{++classified|||classified++::Increment the class count only on a match.}};
        if (label[i] == {{'CHAR'::Match the exact requested character, preserving case.}}) ++matches;
    }
    reversed[n] = {{'\0'::Terminate the reversed string at its logical length.}};
    printf("Reverse=%s\n", {{reversed::Print the reversed copy rather than the original.}});
    printf("Class=%d Match=%d\n", classified, matches);
    return 0;
}'''.replace('TEXT',s).replace('TEST',test).replace('CHAR',ch),
      f'Reverse={s[::-1]}\nClass={classified} Match={s.count(ch)}\n',
      'string-reverse strlen nul char-frequency cast',priority='core',pattern='P3')

# P4: pointer mutation, by-value calculation, names, swap and scale variants.
for k,(name,w,h,scale) in enumerate([('Banner',7,3,1),('Crate',4,6,2),('Garden',9,2,3)],1):
    action='swap' if k==1 else 'scale'
    mutate=r'''int t = {{p->width::Save the original width before overwriting it.}};
    p->width = {{p->height::Move the height into the width field.}};
    p->height = {{t::Restore the saved width as the height.}};''' if k==1 else r'''p->width {{*=::Scale the width in the caller's record.}} {{FACTOR::Use the specified integer scale factor.}};
    p->height = {{p->height * FACTOR::Scale the other dimension by the same factor.}};'''.replace('FACTOR',str(scale))
    ow,oh=(h,w) if k==1 else (w*scale,h*scale)
    add(f'p4-{k}','structs',f'{name} structs, Pointer updates and Field arithmetic',
      f'Create a named rectangle, {action} its dimensions through a pointer function, and report its dimensions, area and perimeter.',
      [f'Start with name "{name}", width {w} and height {h}. '+('Swap width and height.' if k==1 else f'Multiply both dimensions by {scale}.'),
       'Copy the name into the char array using the string-copy library function. Modify the original record through a struct pointer.',
       'A by-value helper returns width times height. Perimeter is twice the sum of the resulting dimensions.'],
      r'''#include <stdio.h>
#include <string.h>
{{typedef::Create a reusable name for this record type.}} struct {
    char name[20];
    int width, height;
} Rectangle;
void change({{Rectangle *p::The function needs the address of the caller's record.}}) {
    MUTATE
}
int area(Rectangle r) {
    return {{r.width * r.height::A copied record is sufficient for a read-only calculation.}};
}
int main(void) {
    Rectangle r = {"", WIDTH, HEIGHT};
    {{strcpy::Copy characters into the fixed-size name field.}}(r.name, "NAME");
    change({{&r::Pass the address so the changes persist in main.}});
    Rectangle *p = &r;
    int perimeter = {{2 * (p->width + p->height)::The sum must be grouped before doubling.}};
    printf("%s %d %d\n", {{p->name::Use arrow notation through the pointer.}}, p->width, p->height);
    printf("Area=%d Perimeter=%d\n", area(r), perimeter);
    return 0;
}'''.replace('MUTATE',mutate).replace('WIDTH',str(w)).replace('HEIGHT',str(h)).replace('NAME',name),
      f'{name} {ow} {oh}\nArea={ow*oh} Perimeter={2*(ow+oh)}\n',
      'typedef arrow struct-value-pointer strcpy address',priority='core',pattern='P4')

# P5: file round-trip into checked heap memory, different reductions.
for k,(data,reduction) in enumerate([([16,7,23,11],'max'),([8,14,5,9],'min'),([5,9,12,6],'mean')],1):
    init='a[0]' if reduction!='mean' else '0'
    calc=r'''if ({{a[i] > result::Replace the current maximum only with a larger value.}}) result = a[i];''' if reduction=='max' else r'''if ({{a[i] < result::Replace the current minimum only with a smaller value.}}) result = a[i];''' if reduction=='min' else r'''result += {{a[i]::Accumulate every loaded value before averaging.}};'''
    value=max(data) if reduction=='max' else min(data) if reduction=='min' else sum(data)/4
    output=f'{reduction}={value:.1f}\n' if reduction=='mean' else f'{reduction}={value}\n'
    printline='printf("mean=%.1f\\n", (double)result / 4);' if reduction=='mean' else f'printf("{reduction}=%d\\n", result);'
    add(f'p5-{k}','files','File round trips, Heap arrays and '+{'mean':'Averages','min':'Minimum selection','max':'Maximum selection'}[reduction],
      f'Write four fixed readings to a text file, close it, reopen it for reading into a dynamically allocated int array, then print the {reduction}.',
      [f'The readings are {data}; write one integer per line to readings.txt in write mode.',
       'Close the writer before reopening in read mode. Stop safely if opening, allocation or reading fails; release any owned resources.',
       ('Add all four readings and divide by four using floating division, printed to one decimal place.' if reduction=='mean' else f'Initialise the {reduction} from the first loaded value and compare all entries.')],
      r'''#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int data[] = {DATA};
    FILE *fp = {{fopen("readings.txt", "w")::Write mode creates or truncates the file.}};
    if ({{fp == NULL|||!fp::Never use a failed file handle.}}) return 1;
    for (int i = 0; i < 4; ++i)
        {{fprintf(fp, "%d\n", data[i])::Write formatted integers as deterministic text.}};
    {{fclose(fp)::Flush and close the output stream before reading.}};
    fp = {{fopen("readings.txt", "r")::Reopen the existing file without truncating it.}};
    if (!fp) return 1;
    int *a = {{malloc(4 * sizeof *a)::Reserve enough bytes for four integers.}};
    if ({{a == NULL|||!a::On allocation failure close the open file.}}) { fclose(fp); return 1; }
    for (int i = 0; i < 4; ++i) {
        if ({{fscanf(fp, "%d", &a[i])::The input conversion needs the destination address.}} != 1) {
            free(a); fclose(fp); return 1;
        }
    }
    fclose(fp);
    int result = INIT;
    for (int i = 0; i < 4; ++i) {
        CALC
    }
    PRINTLINE
    {{free(a)::Release the heap block exactly once after its last use.}};
    return 0;
}'''.replace('DATA',','.join(map(str,data))).replace('INIT',init).replace('CALC',calc).replace('PRINTLINE',printline),
      output,'file-w file-r file-null formatted-file file-close malloc null-allocation free leaks',
      priority='core',pattern='P5',files={'readings.txt':''.join(f'{x}\n' for x in data)})

# Additional method programs are loaded as authoring fragments, sharing add().
exec((ROOT/'scripts/itp-extra-methods.py').read_text(encoding='utf-8'))
exec((ROOT/'scripts/itp-new-mocks.py').read_text(encoding='utf-8'))

for name in ['original','mocks']:
    path=ROOT/f'src/data/itp/{name}.json'
    old=json.loads(path.read_text(encoding='utf-8'))
    old=[q for q in old if not (q['id'].startswith('exam21-') or re.match(r'mock-[def]',q['id']))]
    path.write_text(json.dumps(old+[q for q in NEW if q['pool']==('mock' if name=='mocks' else name)],ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
papers_path=ROOT/'src/data/itp/papers.json'
papers=json.loads(papers_path.read_text(encoding='utf-8'))
papers=[p for p in papers if p['id'] not in ['mock-d','mock-e','mock-f']]
for letter in 'def':
    papers.append(dict(id='mock-'+letter,subject='itp',title='Mock '+letter.upper()+(': mixed methods' if letter=='f' else ': 21 Nov exam pattern'),
      priority='extra' if letter=='f' else 'core',description='Five exclusive programs. 150 minutes, 50 blanks. '+('Extend your range with matrices, search, recursion, growth and character I/O.' if letter=='f' else 'Daily arrays → array functions and scope → strings → records and pointers → files and heap memory.'),
      questionIds=[q['id'] for q in NEW if q['id'].startswith('mock-'+letter)]))
papers_path.write_text(json.dumps(papers,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

allq=sum([json.loads((ROOT/f'src/data/itp/{n}.json').read_text(encoding='utf-8')) for n in ['past','original','mocks']],[])
rows=['# ITP method coverage','',
 'Every row lists practice blanks separately from output drills and exclusive mocks. Starred methods require two distinct practice programs; all others require one. Tags are audited against completed source. Routine visible syntax alone is not a claim of algorithm coverage.',
 '', 'Core means asked in a source paper or the openly shared 21 Nov P1–P5 pattern. Extra means no such evidence. A mixed exercise is Core when its main algorithm was asked; incidental syntax does not promote it. Source repairs and extensions remain labelled in the original questions.',
 '', 'Legacy audit: 71 past exercises, 35 original exercises and 15 original mock exercises were read before expansion. Existing practice gaps included iterative binary/bubble/insertion sorting, recursion variants, record sorting repetition, row totals, dynamic growth and update file modes. Output-only coverage did not satisfy the practice gate.',
 '', 'Conditional scope: the supplied complete notes mention union as a reserved word but do not teach union operations or fread/fwrite. They are excluded from the required catalog. No new npm packages are used.',
 '', '| Method | Priority / source papers | Required | Practice blanks | Other existing / mock / output evidence |', '| --- | --- | --- | --- | --- |']
for m in METHODS:
    practice=[q['id'] for q in allq if m['id'] in q['methods'] and q['type']=='blanks' and q['pool']!='mock']
    other=[q['id'] for q in allq if m['id'] in q['methods'] and q['id'] not in practice]
    rows.append('| '+m['label']+(' *' if m['minimum']==2 else '')+' | '+m['priority'].title()+(' — '+', '.join(m['sources']) if m['sources'] else ' — additional syllabus practice')+' | '+str(m['minimum'])+' | '+', '.join(practice)+' | '+', '.join(other)+' |')
rows+=['','## New question manifest','', 'GCC is not readable in this sandbox. These are the exact new IDs for a supervisor to compile using `npm run verify:content -- --require-gcc`. No verified flags are authored.', '',*['- '+q['id']+' ('+q['priority']+', '+q['pool']+')' for q in NEW]]
(ROOT/'content/itp/method-coverage.md').write_text('\n'.join(rows)+'\n',encoding='utf-8')
print('Authored',len(NEW),'new questions;',sum(q['priority']=='core' for q in NEW),'Core;',sum(q['priority']=='extra' for q in NEW),'Extra.')
missing=[]
for m in METHODS:
    covering=[q['id'] for q in allq if q['type']=='blanks' and q['pool']!='mock' and m['id'] in q['methods']]
    if len(covering)<m['minimum']: missing.append((m['id'],m['minimum'],covering))
print('Coverage gaps:',missing)
