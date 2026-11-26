# Solving homogeneous and non-homogeneous recurrences

Topic ID: `recurrences`

## What a recurrence specifies

A recurrence defines a term from earlier terms. Initial conditions determine the particular sequence. A second-order recurrence normally needs two initial values. Record whether indexing begins at 0 or 1 before substituting.

For a simple additive recurrence, iteration often suffices:

```text
Solve H_n=H_(n-1)+1, H_1=1, n>=2.
Step 1: H_n=H_(n-2)+2=...=H_1+(n-1).
Step 2: H_n=1+n-1=n, n>=1.
Step 3: H_1=1 and H_n-H_(n-1)=1, as required.
```

For `a_n=c*a_(n-1)+d`, iteration gives `c^n*a_0+d*(1+c+...+c^(n-1))`. For c!=1 this is `c^n*a_0+d*(c^n-1)/(c-1)`; for c=1 it is `a_0+d*n`.

## Linear homogeneous, constant coefficients

“Linear” means terms a_n occur only to the first power and are not multiplied together. “Homogeneous” means there is no independent forcing term. For `a_n=c1*a_(n-1)+c2*a_(n-2)`, substitute `a_n=r^n` to obtain `r^2-c1*r-c2=0`.

| Characteristic roots | General solution |
| --- | --- |
| Distinct r1,r2 | `A*r1^n+B*r2^n` |
| Repeated root r, multiplicity 2 | `(A+B*n)*r^n` |
| Root r, multiplicity s | `(A0+A1*n+...+A_(s-1)*n^(s-1))*r^n` |

```text
Solve a_n=6*a_(n-1)-8*a_(n-2), a_0=4,a_1=10.
Step 1: r^2-6*r+8=(r-2)*(r-4)=0.
Step 2: a_n=A*2^n+B*4^n.
Step 3: A+B=4; 2*A+4*B=10. Subtract twice the first:
2*B=2, so B=1 and A=3.
Step 4: a_n=3*2^n+4^n.
Check a_0=4,a_1=10, and each root satisfies the recurrence.
```

Repeated root example: `a_n=4*a_(n-1)-4*a_(n-2)`, `a_0=3,a_1=8`. The polynomial is `(r-2)^2`, so `(A+B*n)*2^n`. Initial conditions yield A=3,B=1; answer `(3+n)*2^n`. Do not collapse the two constants into `(A+B)*2^n`.

## Non-homogeneous = homogeneous + particular

First solve the associated homogeneous recurrence. Then choose a trial for one particular solution and substitute into the complete recurrence to determine its coefficients. Finally add both parts and apply the initial conditions to the total solution.

| Forcing g(n) | Unadjusted particular trial |
| --- | --- |
| constant K | constant C |
| polynomial degree d | general polynomial degree d |
| b^n | `C*b^n` |
| polynomial degree d times b^n | `(C0+C1*n+...+Cd*n^d)*b^n` |

If b is a characteristic root of multiplicity s, multiply the **whole trial** by n^s. A polynomial forcing uses b=1. Include all lower-degree polynomial terms; a trial `C*n^2` alone generally does not suffice for arbitrary quadratic forcing.

```text
Solve a_n=2*a_(n-1)+2^n, a_0=1.
Step 1: Homogeneous part is C*2^n.
Step 2: Because 2 is a root, try a_n(p)=K*n*2^n.
Step 3: K*n*2^n=2*K*(n-1)*2^(n-1)+2^n.
Divide by 2^n: K*n=K*(n-1)+1, giving K=1.
Step 4: a_n=(C+n)*2^n. At n=0, C=1.
Step 5: a_n=(1+n)*2^n. Check a_0=1 and a_1=4.
```

For forcing n in `a_n=2*a_(n-1)+n`, use A*n+B. Comparing coefficients gives A=-1,B=-2, so with a_0=0 the answer is `2^(n+1)-n-2`. For forcing 2 in `a_n=2*a_(n-1)-a_(n-2)+2`, root 1 has multiplicity 2, so use C*n^2 and retain homogeneous A+B*n.

Tip: Write “homogeneous”, “particular”, “initial conditions”, “check” as four answer stages.

Trap: Applying initial conditions to only the homogeneous part produces the wrong constants.

Remember: Check the first order-many terms and substitute into the recurrence; a plausible-looking formula is not enough.

Note: The verifier independently iterates every stored recurrence through index 15; this finite check supplements the written algebra.

## Polynomial forcing and repeated-root resonance, fully worked

For the reported third-order recurrence, `r^3-7*r^2+16*r-12=(r-2)^2*(r-3)`. Thus the homogeneous part is `(C1+C2*n)*2^n+C3*3^n`. Because 1 is not a root, forcing `n^4` needs the full trial `A*n^4+B*n^3+C*n^2+D*n+E`, with no extra n factor. Substituting and equating coefficients gives A=-1/2, B=-11, C=-105, D=-1033/2, E=-1099. Applying a_0=-2,a_1=0,a_2=5 to the **total** solution gives C1=984,C2=-575/2,C3=113. The Slot 1 note shows each coefficient equation and the initial-condition system.

```text
Solve a_n=4*a_(n-1)-4*a_(n-2)+2^n, a_0=1,a_1=4.
The characteristic polynomial is (r-2)^2.
Homogeneous part: (A+B*n)*2^n.
Since the forcing base 2 is a double root, try p_n=C*n^2*2^n.
Substitution and division by 2^n give:
C*[n^2-2*(n-1)^2+(n-2)^2]=1.
The bracket is 2, hence C=1/2.
Therefore a_n=(A+B*n+n^2/2)*2^n.
At n=0, A=1. At n=1, 2*(1+B+1/2)=4, so B=1/2.
Hence a_n=(1+n/2+n^2/2)*2^n.
Check a_0=1, a_1=4 and a_2=16 from both recurrence and formula.
```

If forcing is `n` and root 1 is repeated twice, multiply the entire linear polynomial trial by n^2: `p_n=n^2*(A*n+B)`, not merely `A*n^2`. If forcing is `2^n` and 2 is a simple root, try `C*n*2^n`. Multiplicity is measured in the characteristic polynomial of the homogeneous recurrence, before choosing the trial.
