# Counting, inclusion-exclusion and pigeonhole

Topic ID: `counting`

## Choose the rule from the choices

Use the product rule when a construction has successive choices: multiply the numbers of allowed choices at each stage. Use the sum rule for disjoint alternatives. If alternatives overlap, subtract the overlap rather than counting it twice.

| Task | Formula / decision |
| --- | --- |
| Choose r from n, order matters, no repetition | n!/(n-r)! |
| Choose r from n, order irrelevant | C(n,r)=n!/(r!*(n-r)!) |
| Length n over k symbols, repetition allowed | k^n |
| Union of two finite sets | |A union B|=|A|+|B|-|A intersection B| |
| Guarantee r objects in one of k boxes | k*(r-1)+1 objects |

A 3-letter code from five distinct letters with no repetition has 5*4*3=60 possibilities. A 3-person committee from five people has C(5,3)=10: selecting the same people in a different order does not create a new committee.

## Bit strings

Each free bit has two choices. Prescribed positions remove choices. Check that simultaneous prescriptions do not conflict, especially when prefix and suffix overlap.

```text
Count 7-bit strings starting with 00 or ending with 111.
Step 1: Let A be strings starting 00. |A|=2^5=32.
Step 2: Let B be strings ending 111. |B|=2^4=16.
Step 3: In A intersection B, the first 2 and last 3 bits are fixed.
There are 7-2-3=2 free bits, so |A intersection B|=2^2=4.
Step 4: |A union B|=32+16-4=44.
```

For length 3, prefix 00 and suffix 11 conflict in the middle bit, so the intersection is empty. You cannot blindly use `2^(length-prefix_length-suffix_length)` when the blocks overlap.

## Pigeonhole: give both guarantee and minimality

The basic principle says k+1 objects in k boxes force a box containing at least 2 objects. For r objects in a box, at most r-1 per box permits k*(r-1) without the desired event; one additional object forces it. Show the threshold is necessary by describing the distribution with r-1 in each box.

```text
Six professors, integer marks from 0 to 60 inclusive.
Step 1: Boxes are ordered pairs (professor,score).
Step 2: There are 6*61=366 boxes.
Step 3: With 366 students, one in each box avoids a match.
Step 4: With 367 students, a box has two students, so two share
both professor and score. The minimum is 367.
```

## Variable-length strings

For an alphabet of 128 characters, nonempty strings of length at most 100 number `128+128^2+...+128^100=(128^101-128)/127`. The sum starts at 1, not 0, because the empty string is excluded. Add 1 to force duplicate submissions. Leave the exact geometric-sum expression in a written answer; do not round an enormous integer.

Tip: Define what constitutes one distinct outcome before counting it.

Trap: “Or” is normally inclusive, “at most 100” includes every shorter allowed length, and scores 0 through 60 give 61 choices.

Remember: “Minimum number to guarantee” requires both a forcing argument and an example one below the threshold.

Note: The verifier brute-forces small bit-string and no-repetition code exercises and uses exact integer arithmetic for large counts.
