# Lesson 1: Program skeleton, I/O, operators, ++/--

```c
#include <stdio.h>      // printf, scanf
int main() {
    int age; float temp; char grade;
    scanf("%d", &age);  // & = "address of"
    printf("Age is %d\n", age);
    return 0;
}
```

## Format specifiers
`%d` int · `%f` float · `%lf` double (in scanf) · `%c` char · `%s` string · `%ld` long · `%lld` long long

## Rules
1. **scanf needs `&`** before the variable: `scanf("%d", &n);`. Exception: strings (`char name[20]; scanf("%s", name);`) because an array name is already an address.
2. **Integer division drops decimals:** `29/4 = 7`, `29%4 = 1`. If either side is a float, the result is a float: `9/5 = 1` but `9.0/5 = 1.8`.
   - Celsius→Fahrenheit blank from a paper: `f = c * 9 / 5 + 32;` or `f = (9.0/5)*c + 32;`. **Never** `(9/5)*c + 32` (that's `1*c + 32`).
3. **Digit tricks:** `n % 10` = last digit; `n / 10` = drop last digit; `(n/10) % 10` = second-last digit.
4. **`x++` (post):** use old value, then add 1. **`++x` (pre):** add 1 first, then use.

## Digit-loop idiom (appears in nearly every paper: sum of digits, Armstrong, reverse)
```c
while (n > 0) {          // or n != 0. NOT n >= 0 (infinite loop: 0/10 stays 0)
    digit = n % 10;
    sum = sum + digit;
    n = n / 10;
}
```
Armstrong check needs a copy first: `buff = x;` … loop … `if (total == buff)`.

## Quiz results (19 Nov)
| Q | Your answer | Correct | Note |
|---|---|---|---|
| `scanf("%d", __)` | `n` | `&n` | ❌ forgot & (the most common blank) |
| `29/4, 29%4` | 7, 1 | 7 1 | ✅ |
| 7 from 472 | (question unclear) | `(n/10)%10` | 472/10=47, 47%10=7 |
| `++a + b++` | 8, 4 5 | `8 4 5` | ✅ |
| digit-sum loop | `n>=0`? | `n > 0`, `n = n / 10` | ⚠️ `n>=0` never ends |
