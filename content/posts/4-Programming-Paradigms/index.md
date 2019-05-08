---
path: '/4-Programming-Paradigms'
cover: '../Programming-Foundations-Coding-Efficiency/speed.jpg'
slug: '4-Programming-Paradigms'
date: '2019-05-07'
title: '4 Programming Paradigms in 40 Minutes'
tags: ['languages', 'programming', 'object-oriented', 'functional', 'logic/constraint', 'procedural']
published: true
---

# 4 Programming Padigms in 40 Minutes

[Link to Youtube video](https://www.youtube.com/watch?v=cgVVZMfLjEI)

## Object-Oriented (Ruby)

* Everything is an object

**Object:** A way to encapsulate state and behavior. 

**State:** Fields, instance variables, etc.
Behavior: What you do with state (methods, etc)

Objects are responsible for manipulating internal state.

Objects interact with each other

```ruby
class BankAccount
    attr_reader :balance

    def initialize
        @balance = 0
    end

    def deposit amount
        @balance += amount
    end

    def withdraw amount
        @balance -= amount
    end
end
```

#### Strengths

- Good at modeling real-life things
- Reusability
- Ease of testing

#### Example (Making Change)

```ruby
class CashRegister
    attr_reader :drawer

    def initialize
        @drawer = [2000, 1000,
                    500, 100,
                     25, 10,
                      5, 1]
    end

    def make_change owed, tendered
        difference = tendered - owed

        change = []
        i = 0
        denomination = @drawer[i]

        while difference > 0 do
            if difference < denomination
                i += 1
                denomination = @drawer[i]
                next
            end

            change << denomination
            difference -= denomination
        end

        change
    end
end
```

## Functional (Racket)

Functions take in data and output data

Pure functional - functions don't store state and don't mutate incoming data

Data and procedures are separated

Infix vs. Prefix:

- Infix: 1 * 2 * 3
- Prefix: * 1 2 3

```racket
(define (square n)
    (* n n))

(square 5)
    25
```

```racket
(define (abs x)
    (cond
        ((> x 0)
        x)
        ((= x 0)
        0)
        (else
            (- x))))
```

Lists in racket:
- Represented as set of items separated by spaces in parentheses with a tick in front to separate from function call

```racket
'(1 2 3)
```

```racket
(car '(1 2 3))
1
(cdr '(1 2 3))
'(2 3)
```

```racket
(cons '1 '(2 3))
'(1 2 3)
```

```racket
(define (fact n)
    (cond
        ((<= n 1)
            1)
        (else
            (* n (fact (- n 1))))))
```

```racket
(define (fib n)
    (cond ((<= n 0)
        0)
          ((= n 1)
            1)
        (else
            (+
                (fib (- n 1))
                (fib (- n 2))))))
```

#### Strengths

- Don't have to worry about concurrency and threading because everything is a read operation

- Easier to test because state doesn't matter

- Reusability

- Brevity

#### Example (Making Change)

```racket
(define (make-change x denoms)
    (cond
        ((= x 0)
            '())
        ((empty? denoms)
            false)
        ((< x (car denoms))
            (make-change x (cdr denoms)))
        (else
            (cons (car denoms) 
                  (make-change (- x (car denoms)) denoms)))))
```

## Logic/Constraint (Prolog)

Formal Logic (like in philosophy/math)

Prolog functions are made up of facts and clauses

Describe the what of the situation, not how

#### Syntax

Variables start with capital

Constants start lowercase

Facts end with period

```prolog
state(washington).
border(washington, oregon).
border(washington, idaho).
border(oregon, california).
```

Rules specify relationships between facts:

```prolog
adjacent(X, Y) :- border(X, Y).
```

`:-` is a logical implication

Pattern matching!

```prolog
border(washington, oregon).
border(washington, idaho).

adjacent(X, Y) :- border(X, Y).

?- adjacent(washington, oregon).
yes

?- adjacent(oregon, washington).
no
```

Prolog is very literal, does not know when reflexive cases are true.

#### Example (Ancestors)

```prolog
father(homer, bart).
father(homer, lisa).
mother(marge, bart).
mother(marge, lisa).
```

```prolog
?- mother(X, bart).
X = marge

?- mother(marge, Y).
Y = bart ? ;
Y = lisa
```

```prolog
sibling(X, Y) :-
    mother(Z, X),
    mother(Z, Y),
    X \== Y.

sibling(X, Y) :-
    father(Z, X),
    father(Z, Y),
    X \== Y.

?- sibling(X, Y).
X = bart
Y = lisa
```

#### Lists

```
[]
[1, 2, 3]
[apples, bananas]
[apples, [1, 3], mangos]
```

Bar notation

[1, 2, 3]
[F | R]
F = 1
R = [2, 3]

Racket can also use `_` to say you don't care about a variable

```racket
member(X, [X | _).
member(X, [_ | R) :- member(X, R).
```

#### Strengths

- Programs can be run backwards and forwards
- Constraints 

#### Example (Make Change)

```prolog
change(amount, coins, change)

change(0, _, []).
change(A, [F | R], [F | X]) :-
    A >= F,
    B is A - F,
    change(B, [F | R], X).
change(A, [_ | R], X) :-
    A > 0,
    change(A, R, X).
```

## Procedural (Assembly)

Limited vocabulary, limited standard library

#### Syntax

Two registers:
- D (data register)
- A (could be data register or address register)
- M (memory - actually what A is pointing to)

`car` - Contents of A register
`cdr` - Contents of D register

#### Computations

A + D

D - A

A - D

[A or D] + 1

[A or D] - 1

bitwise !&| 

-[A or D]

(Any place you can use A, you can use M)

No multiplication, no division, no lists.  

Can assign to values

- D = M + 1
- D = D - A
- MD = A + 1

constants: @Integer (can only go into A register)
val;jump type

Jumps:

- JGT (jump greater than)
- JEQ (jump if equal)
- JLT (jump less than)
- JLE (jump less than or equal to)
- JGE (jump greater than or equal to)
- JMP (jump)

#### Examples (Add)

```asm
@2
D=A
@3
D=D+A
@0
M=D
```

### Example (Adding 1 - 5)

```asm
@0
M=0
@5
D=A
@1
M=D
(LOOP)
@1
D=M
@0
M=M+D
@1
MD=M-1
@END
D;JLE
@LOOP
0;JMP
```

#### Strengths 

- Simple
- Scripting
- Easy to write

#### Example (Making Change)

- R0: Amount to make
- R1 - R4: Coin denominations
- R5 - R8: Number of each coin to use

```asm

@67
D=A
@R0
M=D

// Load Denominations
@25
D=A
@R1
M=D
@10
D=A
@R2
M=D

@5
D=A
@R3
M=D

@1
D=A
@R4
M=D

(QUARTERS)
@R0
D=M
@R1
D=D-M
@DIMES
D;JLT
@R0
M=D
@R5
M=M+1
@QUARTERS
0;JMP

(DIMES)
@R0
D=m
@R2
D=D-M
@NICKELS
D;JLT
@R0
M=D
@R6
M=M+1
@DIMES
0;JMP

(NICKELS)
@R0
D=M
@R3
D=D-M
@PENNIES
D;JLT
@R0
M=D
@R7
M=M+1
@NICKELS
0;JMP

(PENNIES)
@R0
D=M
@R4
D=D-M
@END
D;JLT
@R0
M=D
@R8
M=M+1
@PENNIES
0;JMP

(END)
@END
0;JMP
```