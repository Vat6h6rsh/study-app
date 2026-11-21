"""Audited method catalog and legacy annotations. No generated question content here."""
import json
from pathlib import Path

# A star means two distinct blank-bearing PRACTICE exercises, excluding mocks/output drills.
GROUPS = {
 'operators': 'integer-division*:Integer versus floating division|modulo*:Remainder %|cast*:Explicit type casting|increment*:Pre/post increment and decrement|compound:Compound assignment|short-circuit:Relational/logical short-circuit|ternary:Ternary ?:|bitwise:Bitwise & OR XOR and shifts|xor-swap:XOR swap|sizeof:sizeof|precedence:Operator precedence|macro:#define macro|const:const|ascii:Character arithmetic (ASCII)|formats:printf formats (%d %f %.2f %c %s %ld %lld %x and width)',
 'loops': 'ladder*:if / else-if ladder|switch:Switch with break and fall-through|for*:for loop|while*:while loop|do-while:do-while loop|nested-loops:Nested loops|triangle:Triangle pattern|pyramid:Pyramid pattern|floyd:Floyd triangle|pascal:Pascal triangle|break-continue:break and continue|sentinel:Sentinel loop|digit-sum*:Digit sum|digit-reverse*:Digit reverse|digit-count:Count digits|number-palindrome:Number palindrome|armstrong:Armstrong test|prime*:Prime test|gcd-lcm:GCD and LCM|factorial:Iterative factorial|fibonacci:Iterative Fibonacci|power:Iterative power|series:Series sum|perfect:Perfect number',
 'arrays': 'array-total*:Array sum and average|extreme-index*:Max/min with index|second-largest:Second distinct largest|linear-first*:Linear search first index|linear-last*:Linear search last index|linear-count*:Linear search occurrence count|binary-search*:Iterative binary search|bubble*:Bubble sort|selection*:Selection sort|insertion:Insertion sort|array-reverse*:Reverse array in place|rotate:Rotate left and right|frequency:Array frequency count|deduplicate:Remove duplicates|merge:Merge sorted arrays|insert-delete:Insert and delete at position|prefix:Prefix sums|even-odd:Separate even and odd',
 'matrices': 'row-sum*:Row sums|column-sum*:Column sums|diagonals*:Main and secondary diagonals|square-transpose*:Square transpose in place|rect-transpose:Rectangular transpose|matrix-add:Matrix addition|matrix-multiply*:Matrix multiplication|row-max:Maximum per row|matrix-check:Symmetric and identity check|triangles:Upper and lower triangles|matrix-search:Search matrix',
 'strings': 'manual-length*:Manual string length|strlen*:strlen|strcpy*:strcpy|strncpy*:strncpy|strcat:strcat|strcmp*:strcmp|manual-compare:Manual lexicographic comparison|string-reverse*:String reverse|string-palindrome*:String palindrome|character-count*:Count vowels/consonants/digits/spaces|word-count:Word count|ctype-case*:toupper / tolower|ascii-case:ASCII +/-32 case conversion|char-frequency:Character frequency|remove-char:Remove spaces or a character|substring:strstr substring search|fgets-newline:fgets and newline removal|atoi:atoi|manual-atoi:Manual string-to-int|string-sort:Array of strings and string sorting|nul*:Null terminator handling',
 'functions': 'prototype:Function prototypes|return*:Return values|void:Void functions|array-parameter*:Passing arrays|value-reference*:Call by value versus by reference|rec-factorial*:Recursive factorial|rec-fibonacci:Recursive Fibonacci|rec-digits*:Recursive digit sum|rec-power:Recursive power|rec-gcd:Recursive GCD|rec-reverse:Recursive string reverse|rec-binary:Recursive binary search|static-calls:Counting calls with static local',
 'pointers': 'address*:Address and dereference|pointer-arithmetic*:Pointer arithmetic over arrays|array-pointer*:Array / pointer equivalence|double-pointer:Pointer to pointer|pointer-swap*:Swap through pointers|multiple-return*:Multiple outputs through pointer parameters|char-pointer:Walking a string with char pointer|null:NULL checks|pointer-const:Const pointer versus pointer to const',
 'structs': 'typedef*:Struct definition and typedef|nested-struct:Nested struct|struct-search*:Array of structs search / max by field|struct-sort*:Sort records by a field|arrow*:Pointer to struct ->|struct-value-pointer*:Struct by value versus by pointer|struct-return:Function returning a struct|enum:enum',
 'memory': 'malloc*:malloc|null-allocation*:Allocation NULL check|calloc*:calloc zero initialisation|realloc*:Safe realloc growth|free*:free|dynamic-struct*:Dynamic array of structs|dynamic-string:Dynamic string|dynamic-matrix:Dynamic 2D row pointers and freeing|leaks:Avoiding leaks including failure paths',
 'files': 'file-r*:fopen r|file-w*:fopen w|file-a*:fopen a|file-rplus*:fopen r+|file-wplus*:fopen w+|file-aplus*:fopen a+|file-null*:fopen NULL check|formatted-file*:fprintf / fscanf|line-file*:fputs / fgets|char-file*:fputc / fgetc with EOF loop|file-count:Count characters/words/lines|file-copy:Copy file|file-append:Append file|file-records:Text struct records|file-close*:fclose',
 'scope': 'shadow*:Local / global shadowing|static-local*:Static local persistence|block-scope:Block scope|extern:extern declaration concept|auto-register:auto and register concepts',
}

# Exact algorithm annotations after reading completed source and bank source sections.
LEGACY = {
 'past-1.1':'macro typedef struct-value-pointer array-total return integer-division for',
 'past-1.2':'struct-search arrow array-parameter extreme-index return null address for',
 'past-1.3':'typedef void compound increment while', 'past-1.4':'struct-value-pointer arrow multiple-return increment while',
 'past-1.5':'typedef strcpy formats', 'past-1.6':'typedef address for', 'past-1.7':'address pointer-arithmetic array-pointer arrow typedef',
 'past-2.1':'malloc null-allocation dynamic-struct free arrow address for formats',
 'past-2.2':'malloc dynamic-struct dynamic-string free struct-search extreme-index',
 'past-2.3':'malloc null-allocation dynamic-struct free address', 'past-2.4':'malloc dynamic-struct free array-total extreme-index',
 'past-3.1':'for', 'past-3.1b':'precedence integer-division',
 'past-3.2':'deduplicate linear-count array-parameter return break-continue for',
 'past-3.3':'selection array-parameter for', 'past-3.4':'selection array-parameter for',
 'past-3.5':'linear-first array-parameter return sizeof for', 'past-3.6':'merge short-circuit increment while',
 'past-3.7':'linear-count deduplicate while return',
 'past-4.1':'column-sum extreme-index for', 'past-4.2':'rect-transpose for', 'past-4.3':'square-transpose macro void',
 'past-4.4':'matrix-add for', 'past-4.5':'modulo for', 'past-4.6':'formats',
 'past-5.1':'strlen', 'past-5.2':'ctype-case', 'past-5.3':'manual-length ctype-case nul modulo for while',
 'past-5.4':'ctype-case nul manual-length while for', 'past-5.5':'ctype-case strcpy strlen char-pointer',
 'past-5.6':'malloc null-allocation dynamic-string strcpy strcat free',
 'past-5.7':'strlen strcmp ctype-case break-continue nul for while',
 'past-6.1':'file-r file-w line-file file-close file-records malloc dynamic-struct free',
 'past-6.2':'file-r file-w formatted-file file-close extreme-index',
 'past-6.3':'file-r file-a line-file file-close file-append file-copy',
 'past-6.4':'file-r file-w formatted-file file-close',
 'past-7.1':'address pointer-arithmetic increment', 'past-7.2':'address pointer-arithmetic array-pointer',
 'past-7.3':'address pointer-arithmetic array-pointer', 'past-7.4':'value-reference pointer-swap void address',
 'past-7.5':'array-parameter pointer-arithmetic array-pointer void', 'past-7.6':'multiple-return address',
 'past-8.1':'modulo digit-sum armstrong while return macro', 'past-8.2':'armstrong modulo while',
 'past-8.3':'digit-sum modulo integer-division while', 'past-8.4':'prime modulo break-continue return while for',
 'past-8.5':'fibonacci while', 'past-8.6':'power for compound formats',
 'past-8.7':'pascal nested-loops for integer-division', 'past-8.8':'switch modulo for', 'past-8.9':'triangle floyd increment for nested-loops',
 'past-8.10':'for', 'past-8.11':'for increment', 'past-9.1':'factorial return integer-division',
 'past-9.2':'return', 'past-9.3':'modulo integer-division return', 'past-9.4':'void for compound',
 'past-10.1':'increment modulo ascii precedence', 'past-10.2':'increment modulo precedence integer-division',
 'past-10.3':'increment bitwise precedence', 'past-10.4':'cast ascii formats', 'past-10.5':'cast integer-division formats',
 'past-10.6':'increment', 'past-10.7':'integer-division formats', 'past-10.8':'xor-swap bitwise',
 'past-10.9':'integer-division formats', 'past-10.10':'increment precedence',
 'past-10.11':'macro increment ladder compound', 'past-10.12':'switch', 'past-10.12b':'switch',
 'past-11.1':'static-local block-scope',
 'new-01':'calloc null-allocation dynamic-struct free typedef strcpy struct-search',
 'new-02':'arrow struct-value-pointer array-total void', 'new-03':'typedef struct-return struct-value-pointer modulo',
 'new-04':'struct-search strcmp arrow null array-parameter return', 'new-05':'struct-sort selection typedef',
 'new-06':'malloc null-allocation free array-reverse', 'new-07':'calloc null-allocation free frequency digit-count do-while modulo',
 'new-08':'calloc malloc null-allocation free leaks dynamic-struct array-total',
 'new-09':'rect-transpose for', 'new-10':'column-sum extreme-index', 'new-11':'diagonals',
 'new-12':'strcpy strlen ctype-case nul', 'new-13':'manual-length nul',
 'new-14':'string-palindrome strlen ctype-case break-continue', 'new-15':'strlen malloc null-allocation free dynamic-string strcpy strcat',
 'new-16':'file-r file-w file-null formatted-file file-close array-total',
 'new-17':'file-r file-w file-a file-null line-file file-close file-copy file-append',
 'new-18':'file-r file-null char-file file-count file-close', 'new-19':'multiple-return address array-parameter',
 'new-20':'rec-digits modulo return', 'new-21':'rec-binary sizeof array-parameter return',
 'new-22':'digit-reverse digit-count number-palindrome modulo do-while', 'new-23':'prime modulo return for',
 'new-24':'merge increment while', 'new-25':'deduplicate array-parameter break-continue return',
 'out-01':'increment', 'out-02':'integer-division cast', 'out-03':'modulo integer-division',
 'out-04':'pointer-arithmetic address increment', 'out-05':'array-pointer pointer-arithmetic',
 'out-06':'shadow block-scope', 'out-07':'static-local increment', 'out-08':'short-circuit increment',
 'out-09':'increment while', 'out-10':'return void',
 'mock-a1':'malloc null-allocation free dynamic-struct arrow struct-value-pointer struct-search',
 'mock-a2':'triangles multiple-return address', 'mock-a3':'file-r file-w file-null file-records formatted-file file-close',
 'mock-a4':'rec-gcd multiple-return address', 'mock-a5':'ctype-case nul strlen',
 'mock-b1':'calloc malloc free null-allocation leaks array-total cast', 'mock-b2':'insert-delete array-parameter',
 'mock-b3':'file-r file-w file-null formatted-file file-close merge', 'mock-b4':'array-parameter return ternary',
 'mock-b5':'arrow address struct-value-pointer return', 'mock-c1':'malloc free dynamic-struct strcpy arrow struct-search',
 'mock-c2':'matrix-multiply array-parameter void', 'mock-c3':'file-r file-a file-null file-close line-file ctype-case file-append',
 'mock-c4':'strlen', 'mock-c5':'armstrong digit-sum modulo return',
}

def catalog(past):
    result=[]
    for group, entries in GROUPS.items():
        for entry in entries.split('|'):
            key, label=entry.split(':',1)
            starred=key.endswith('*'); key=key.rstrip('*')
            sources=sorted({q['source'].strip() for q in past if key in LEGACY[q['id']].split()})
            # The openly shared 21 Nov pattern establishes these additional core methods.
            if key in 'array-total extreme-index linear-first linear-count modulo cast integer-division increment for while array-parameter return shadow string-reverse strlen nul character-count strcpy typedef arrow struct-value-pointer address pointer-swap malloc null-allocation free file-r file-w file-null formatted-file file-close'.split():
                sources.append('21 Nov P1–P5')
            result.append(dict(id=key,label=label,topic=group,minimum=2 if starred else 1,priority='core' if sources else 'extra',sources=sources))
    return result

def annotate(root):
    past=json.loads((root/'src/data/itp/past.json').read_text(encoding='utf-8'))
    methods=catalog(past)
    core={m['id'] for m in methods if m['priority']=='core'}
    for name in ['past','original','mocks']:
        path=root/f'src/data/itp/{name}.json'
        questions=json.loads(path.read_text(encoding='utf-8'))
        for q in questions:
            if q['id'] not in LEGACY: continue
            q['methods']=LEGACY[q['id']].split()
            # Main algorithms determine priority; routine syntax does not promote an Extra exercise.
            primary={'new-01':'struct-search','new-03':'struct-value-pointer','new-05':'selection','new-08':'dynamic-struct'}.get(q['id'],q['methods'][0])
            main=[primary]
            q['mainMethods']=main
            q['priority']='core' if q['pool']=='past' or any(m in core for m in main) else 'extra'
        path.write_text(json.dumps(questions,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    (root/'src/data/itp/methods.json').write_text(json.dumps(methods,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    return methods
