---
path: '/Cracking-The-Coding-Interview--Technical-Interviews'
cover: '../Programming-Foundations-Coding-Efficiency/speed.jpg'
slug: 'Cracking-The-Coding-Interview--Technical-Interviews'
date: '2019-03-15'
title: 'Cracking the Coding Interview'
chapter: 'Chapter 7'
subtitle: 'Technical Interviews'
tags: ['Cracking the Coding Interview', 'technical interviews', 'algorithms', 'data structures']
published: true
---

# Technical Question
<br/>

## Steps
<br/>

### Listen Carefully
- Understand the problem
- Ask clarifying questions
- Keep track of _unique_ information in the problem - things that may hint toward an approach/solution (e.g., sorted vs. unsorted, if the algorithm will be run repeatedly or have a one-time use)
- Write down these unique pieces of information

### Draw an Example
- Make sure it's long enough to be representative of the problem you're trying to solve
- Make sure the example isn't a special case - for example, a perfect binary tree in a binary tree problem
- Use actual data as input to your example, such as numbers or strings

### State Brute Force
- Talk about how you'd go about solving the problem using a brute force approach
- Accept that this solution is going to be terrible and inefficient
- Explain the space and time complexity of that solution
- Don't code yet!

### Optimize
- Look for unused information (things the interviewer told you about the problem that you haven't integrated into your solution)
- Use a new example - seeing a new example sometimes jars your memory or allows you to see a pattern that wasn't apparent with a single example
- Solve incorrectly - this might put you on the path to the right solution 
- Make space and time tradeoffs
- Precompute -> can you reorganize the information in the problem or solve for parts of the problem earlier that will speed up runtime?
- Use a hash table
- Think about best conceivable runtime

### Walk Through
- When you've come up with an optimal solution, don't jump in to coding too quickly
- Walk through the algorithm to get a feel for the structure, the variables necessarhy to make it work, what elements change, etc.
- You can pseudocode during this step, but if your pseudocode starts looking like sloppily written code, you might be better off just writing real code
- **IMPORTANT**: If you don't understand what you're about to write, you will struggle to code it, it will take you longer, and it will be more likely to contain errors.

### Implement
- Actually start writing your code
- Start from top left of the whiteboard in order to give you space to write
- Be careful not to slant your writing (taking up valuable space)
- Write functions as though they exist -> refer to helper functions that haven't been created yet
- Error check -> add a todo and explain what you'd like to test (but not right now)
- Name variables so it's easy to tell what they are
- If you see something that you want to refactor, make a note of it to your interviewer but move on, coming back to it if time allows

### Test
- **Test conceptually** - walk through the solution line by line and explain what it's doing, checking to see if it does what you think it does
- **Check for weirdness** - if you see something that doesn't make sense (like using array.length - 2), check to make sure that you had a reason for writing that
- **Hot spots** -> bugs that often show up in code (integer division, base cases on recurison, null nodes in binary trees, etc)
- **Small test cases** - use 3-4 elements
- **Special cases** -> THE RETURN OF THE PERFECT BINARY TREE!
- **If you find bugs** - before you start writing code to try to kill the bug, first understand what circumstances allowed it to exist in order to better understand how to kill it

## Optimize & Solve: Technique #1: Look for BUD
**B**ottlenecks

**U**nnecessary work

**D**uplicated work

### Bottlenecks

Bottlenecks usually occur in two ways:
- One-time work that slows down the algorithm (for example, sorting an array)
- A piece of code that is run multiple times (i.e., when searching)

#### Example:
**Prompt**

Given an array of distinct integer values, count the number of pairs of integers that have a difference of *k*

**Input**

array = [1, 7, 5, 9, 2, 12, 3]
k = 2

**Expected output**

4 ([1, 3], [3, 5], [5, 7], [7, 9])

Brute force approach would be to iterate through the array.  For every index, search for a number that is *k* offset from the value of the current index.
- Bottleneck to this approach is the search

If we sort the array first, we could find the match for the value at the given index using a binary search.
- Bottleneck to this appraoch is the sorting

Optimal solution, then, would be to use a hash table - add values of the array to a hash table and iterate through the array checking if *value_of_current_index + k* or *value_of_current_index - k* has already been added to the hash table.

### Unnecessary Work
#### Example

**Prompt**

Print all the possible solutions to the equation a<sup>3</sup> + b<sup>3</sup> = c<sup>3</sup> + d<sup>3</sup> where a, b, c, and d are integers between 1 and 1000

**Brute force**
```
n = 1000
for a from 1 to n
    for b from 1 to n
        for c from 1 to n
            for d from 1 to n
                if a^3 + b^3 = c^3 + d^3
                    print a, b, c, d
```
The runtime complexity of this approach is O(N)<sup>4</sup>

By the time we get to the for loop for d, we know there's only one valid value for d, so we can just do math to figure it out rather than iterating through 1000 possibilities because d = the cube root of a<sup>3</sup> + b<sup>3</sup> - c<sup>3</sup>

```
...
    d = pow(a^3 + b^3 - c^3, 1/3) // will round to int
    if a^3 + b^3 = c^3 + d^3 // validate it works
        print a, b, c, d
```

This reduces runtime complexity to O(N)<sup>3</sup>

### Duplicated Work
Working with the same problem from unnecessary work:

You could create a list of (c, d) pairs once and when there's an (a, b) pair, find the matches within the (c, d) list.  We can locate these easily if we store them in a hash table with the sum as the key.

```
n = 1000
for c from 1 to n
    for d from 1 to n
        result = c^3 + d^3
        append (c, d) to list at value map[result]
for a from 1 to n
    for b from 1 to n
        result = a^3 + b^3
        list = map.get(result)
        for each pair in list
            print a, b, pair
```

One better: Map all of (c, d) pairs will be the same as (a, b) pairs, so we can use the map directly rather than re-computing the pairs!
```
n = 1000
for c from 1 to n
    for d from 1 to n
        result = c^3 + d^3
        append(c, d) to list at value map[result]
for each result, list in map
    for each pair1 in list
        for each pair2 in list
            print pair1, pair2
```
Now the runtime complexity is O(N<sup>2</sup>)

## Optimize & Solve: Technique #2: DIY

When given a problem, try working it through intuitively on a real example.  Bigger examples usually are easier.  Think about how you solved it and try to reverse-engineer your solution.  Make a note of any mental jumps you took in the solving of the problem, such as ignoring values based on a given critera.

## Optimize & Solve: Technique #3: Simplify & Generalize

Take a problem, remove or modify a constraint to see how to solve a simpler version of the problem.  Then try to adapt the solution to a more complex version.

### Example

**Prompt**

A ransom note is formed by cutting words out of a magazine to form a new sentence.  How do you figure out if a ransome note can be formed from a given magazine?

**Technique**

To simplify, modify so you're cutting characters out of a magazine instead of whole words - you can then solve by creating an array and counting the number of characters -> each index represents one letter of the alphabet.  Count the number of times each character appears in the note, then check the magazine for those same characters.

To generalize, we create a hash table of words and their frequencies.

## Optimize & Solve: Technique #4: Base Case & Build

Solve the problem for the base case first (e.g., n = 1) and then build from there, trying to build more complex cases from prior solutions

### Example

**Prompt**

Design an algorithm to print all permutations of a string.  For simplicity, assume uniqueness

**test input**

abcdefg

```
case "a" -> { "a" }
case "ab" -> { "ab", "ba" }
case "abc" -> ???
```

How can we generate "abc" from "ab"?

```
P("abc") = insert "c" into all locations of all strings in { "ab", "ba" }
P("abc") = merge ({ "cab", "acb", "abc" }, { "abc", "bca", "bac" })
P("abc") = { "cab", "acb", "abc", "cba", "bca", "bac" }
```

Generate all permutations by chopping off the last character, generating all permutations of the string without it, iterating through thtat list, and inserting the chopped off character at every location of the string

Base Case & Build algorithms often lend themselves to natural recursive algorithms

## Optimize & Solve: Technique #5: Data Structure Brainstorm

It's a little hacky, but effective.  Go through a list of data structures and try to apply each one.  The problem may be trivial once you find the right data structure to approach the problem with.

### Example:

**Prompt**

Numbers are randomly generated and stored in an expanding array - how do you keep track of the median?

**Thought process**
- *Linked list* - Probably not, since it's not generally useful for accessing and sorting
- *Array* - Maybe, but we have one already - could we keep it sorted?
- *Binary tree* - Maybe a good option.  Binary trees are good at maintaining order.  But the median wouldn't always be at the root of the tree (since lists with an even number of items would require taking an average of the middle two elements)
- *Heap* - Really good at ordering and keeping track of the minimum and maximum.  If you had a min heap containing the larger half of the elements and a max heap containing the smaller half, the middle element would be at the root.  If the heaps aren't the same size, you can pop an element off one heap and put it onto the other

## Best Conceivable Runtime

Best runtime you can imagine a solution to a problem having.  This is based on inputs and outpus and has no particular connectiont to a specific algorithm.
- BCR is not necessarily achievable - just guarantees that you can't do better than that estimate

## Handling Incorrect Answers

### **MYTH** Candidates need to get every question right.

- Responses are complicated and there are many factors that go into the assessing of them - code readability, how optimal the solution was, how long it took to arrive at that solution, how much coaching was needed, etc.
- Performance is evaluated comparatively to other candidates
- Many questions are difficult and shoudln't be expected to be solved quickly

## When You've Heard a Question Before

Admit this to your interviwer.  They're trying to gauge your problem solving and they can't do that if you already know how to solve the problem.
- Some people find it dishonest if you don't tell them that you've seen the question before

## "Perfect" Language for Interviewing

- Use a language that is widely used so that it's more likely that your interviewer knows it
- Some languages are more easily read than others and this should be taken into consideration
- Some languages introduce more complexity and room for error than others - such as needing to handle memory allocation and deallocation 
- Some langauges are more verbose and may therefore take longer to write solutions in
- Some languages are easier to use

Ultimately, it's up to you and you should code in the language you're most comfortable coding in.

## Writing Good Code: What Makes It Good

### Correct

The solution works on expected and unexpected inputs

### Efficient

Operates with good space and time complexity.  Be mindful of constants that don't matter in Big O but may matter in an application

### Readable

Another developer should be able to read your code and understand what it's doing.  You should comment your code where necessary.  Implementation should be understandable.

### Maintainable

Code should be able to adapt to change

## Use Data Structures Generously

### Example

**Prompt**

Write a function to add two simple mathematical expressions in the form _Ax<sup>a</sup> + Bx<sup>b</sup> + ..._ (coefficients and exponents can be any positive or negative real number) without employing the use of string parsing.  Use whatever data structure you want to hold the expressions.

#### Bad implementation

Storing the expression as an array of doubles where _kth_ element corresponds with coefficient of the _x<sup>k</sup>_ term in the expression.

**Why it's bad**

Does not support negative or non-integer exponents.  Requires an array of the length of the largest exponent.

#### Less Bad

Store expression as 2 arrays - coefficients and exponents

```
double [] coef1, double[] exp1, double[] coef2, double[] exp2
```

This approach doesn't have the same restriction the previous one did as the index is no longer directly tied to any meaning for the values in the array.  However, it's still a bit messy and complicated because you need to keep track of two arrays for a single expression.

#### Good

Create your own data structure!
```
struct ExprTerm {
    double coefficient;
    double exponent;
}
```

Now you can have an array of an expression rather than separate arrays.

## Code Reuse

If you need to do something with different input that gets manipulated the same way (i.e., converting numbers from binary as well as converting numbers from hexadecimal), build a function that can handle different instances

## Modular

Break functions apart!

## Flexibility

Allow for more general input when possible rather than the expected input.  **UNLESS GENERALIZING WILL ADD SIGNIFICANT COMPLEXITY**

## Error Checking

It's good practice to validate input through the use of assert and if statements.  If error checking is much more than a quick if statement, it might be best to leave space where the error check would go and indicate to the interviewer that you would write them when finished

## Don't Give Up
- Keep at it even when it's difficult
- Bonus points if you can show enthusiasm for solving hard problems

