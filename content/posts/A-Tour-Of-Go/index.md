---
path: '/A-Tour-Of-Go'
cover: '../Programming-Foundations-Coding-Efficiency/speed.jpg'
slug: 'A-Tour-Of-Go'
date: '2019-03-04'
title: 'A Tour Of Go'
subtitle: 'Basics I & II'
tags: ['Go']
published: true
---

# A Tour of Go

## Packages, Variables, and Functions

### Packages

Every Go program is made up of packages and programs start running in package `main`.

### Imports

You can import multiple packages by "factoring" them (grouping them together):

```
import (
    "fmt"
    "math/rand"
)
```

You can also import packages by writing multiple import statements, but it's good style to use the factored import statement.

### Exported names

A name is exported if capitalized. When importing a package, you can only refer to its exported names. Unexported names are inaccessible from outside the package.

### Functions

Functions can take multiple arguments (or none) and can return any number of results.

Types of arguments are given after the name of the parameter

If there are multiple arguments of the same type, the type can be given on the last parameter.

### Named return values

Go's return variables can be named and if they are, tey're treated as variables declared at the top of the function.

A return statement without arguments returns the named return values - this is known as a “naked return statement”

### Variables

The keyword `var` declares a list of variables and can be used at the package or function level.

A `var` declaration can include initializers (one per variable)

If an initializer is present, the type can be omitted - the variable takes the type of the initializer

### Short variable declarations

Inside a function, the `:=` short assignment can be used in place of a `var`declaration

Outside of a function, the `:=` construct is not available

### Basic types:

- bool
- string
- int int8 int16 int32 int64
- uint uint8 uint16 uint32 uint64 uintptr
- byte // alias for uint8
- rune // alias for int32 - represents a Unicode code point
- float32 float64
- complex64 complex128

You should use `int` unless you have a specific reason to use a sized or unsigned integer type.

Import statements and variable declarations can be “factored” into blocks

```
import (
	“fmt"
	“math/cmplx”
)

var (
	ToBe 	bool			= false
	MaxInt 	uint64		= 1<<64 - 1
	z		complex128	= complex.Sqrt(-5 + 12i)
)

func main() {
	fmt.Printf(“Type: %T Value: %v\n”, ToBe, ToBe)
	fmt.Printf(“Type: %T Value: %v\n”, MaxInt, MaxInt)
	fmt.Printf(“Type: %T Value: %v\n”, z, z)
}
```

### Zero Values

Variables declared without an explicit initial value are given their “zero value”:

- 0 for numeric types
- false for boolean type
- “” (empty string) for strings

### Type conversions

The expression `T(v)` converts the value v to the type T

```
var I int = 42
var f float64 = float64(i)
var u uint = uint(f)

i:= 42
f:=float64(i)
u:=uint(f)
```

Assignment between items of different types requires an explicit conversion

When the right hand side of the assignment contains an untyped numeric constant, the new variable may be an int, float64, or complex128 depending on the precision of the constant

```

i:= 42 // int
f := 3.142 // float64
g := 0.867 + 0.5i // complex128

```

### Constants

Constants can be character, string, boolean, or numeric values

Constants cannot be declared using the := short syntax

Constants are declared like variables but with the const keyword

### Numeric Constants

Numeric constants are high precision values - an untyped constant takes the type needed by its context. An int can store at maximum a 64-bit integer (sometimes less)

---

## Flow Control Statements: For, If, Else, Switch, and Defer

### For

Go only has one looping construct - the `for` loop.

###### Basic for loop has three components separated by semicolons:

- init statement - executed before the first iteration
- condition expression - evaluated before every iteration
- post statement - executed at the end of every iteration

Variables declared in the init statement are visible only in the scope of the `for` statement. The loop will stop iterating once the boolean condition evaluates to false.

- There are no parentheses surrounding the three components of the for statement and braces are always required

```
func main() {
    sum:= 0
    for I := 0; I < 10; I++ {
        sum += 1
    }
    fmt.Println(sum)
}

```

Init and post statements are optional in a for loop

```

func main() {
    sum:= 1
    for ; sum < 1000; {
        sum += sum
    }
    fmt.Println(sum)
}

```

You can even drop the semicolons!

```

func main() {
    sum := 1
    for sum < 1000 {
        sum += sum
    }
    fmt.Println(sum)
}

```

If you omit the loop condition, it runs forever!

### If

Like for loops, parentheses are not needed for if statements but the braces are required.

```

func sqrt(x float64) string {
    if x < 0 {
        return sqrt(-x) + “i"
    }
    return fmt.Sprint(math.Sqrt(x))
}

func main() {
    fmt.Println(sqrt(2), sqrt(-4))
}

```

### If

Like `for`, `if` statements can also start with a short statement to execute before the condition. Variables declared by that statement are only in scope until the end of the `if`.

```
func po(x, n, lim float64) float64 {
    if v:= math.Pow(x, n); v < lim {
        return v
    }
    return lim
}

func main() {
    fmt.Println(
        pow(3, 2, 10),
        pow(3, 3, 20),
    )
}

```

Variables declared inside an if short statement are available inside any of the else blocks.

### Switch

A `switch` statement is a shorter way to write a sequence of if-else statements. Unlike languages like C, Go runs the first case whose value is equal to the condition expression, as though there were a break after every case.

```

func main() {
    fmt.Println(“Go runs on “)
    switch os := runtime.GOOS; os {
    case “darwin”:
        fmt.Println(“OS X.”)
    case “linux” :
        fmt.Println(“Linux.”)
    default:
        fmt.Printf(“%s.”, os)
    }
}

```

Switch cases evaluate from top to bottom, stopping when a case succeeds.

```

switch i {
    case 0:
    case f():
}
// does not call f if i==0

```

A `switch` without a condition is the same as `switch true` - can be a clean way to write long if-then-else chains

```

func main() {
    t:= time.Now()
    switch {
    case t.Hour() < 12:
        fmt.Println(“Good morning!”)
    case t.Hour() < 17:
        fmt.Println(“Good afternoon.”)
    default:
        fmt.Println(“Good evening.”)
    }
}

```

### Defer

A defer statement defers execution of a function until the surrounding function returns. The arguments of the deferred function’s call get evaluated immediately, but the function call is not executed until the surrounding function returns.

```

func main() {
    defer fmt.Println(“world”)
    fmt.Println(“hello”)
}

```

Deferred function calls are pushed onto a stack and are executed in last-in-first-out

```

func main() {
    fmt.Println(“counting”
    for I:=0; I < 10; I++ {
        defer fmt.Println(I)
    }
    fmt.Println(“done”)
}

```
