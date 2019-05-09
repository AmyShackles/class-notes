---
path: '/Big-O-Notation'
cover: '../Programming-Foundations-Coding-Efficiency/speed.jpg'
slug: 'Big-O-Notation'
date: '2019-04-20'
title: 'Big O Notation'
tags: ['Big O Notation', 'time complexity']
published: true
---

### Space complexity
Aamount of storage space for the function and how that changes relative to input size.

### Time complexity
Measure of time / performance, calculated by the number of steps or operations taken in a function, and how that changes relative to size of input.

### Rules:

  1) If an algorithm has more than one time complexity involved, the lowest performing complexity is the one used to describe the algorithm - if you have one function that runs in _O(n)_ time and another that runs in _O(n log n)_ time and they work together to form an algorithm, the algorithm is said to be _O(n log n)_ - assuming that the same _n_ is used in both.

  2) Constants get dropped (for the most part).  In the big picture sense, an algorithm that runs a for loop twice (_O(2n)_) vs an algorithm that runs a for loop three times (_O(3n)_) both equate to _O(n)_.  However, when dealing with time/performance pressure, the constants will matter, so it's good to be mindful of them even if you don't take them into account during Big O analysis

  3) If an algorithm works on different inputs, each input has to be evaluated separately for Big O.

### Examples for Rule 3:

```javascript{numberLines: true}
  function summingTwoArrays(a, b) {
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
      sum += a[i];
    }
    for (let j = 0; j < b.length; j++) {
      sum += b[i];
    }
  }
```

In this `summingTwoArrays` function, each for loop works on every element of a given array independent of one another.  Because they are different input and can't be simplified, we would characterize the Big O to be _O(n + m)_ because it is _O(n)_ and then _O(m)_ and we have to add those together to get the time complexity.

```javascript{numberLines: true}
  function bothContainNumber(a, b) {
    for (let j = 0; j < a.length; j++) {
      for (let i = 0; i < b.length; i++) {
        if (a[j] === b[i]) {
          return true;
        }
      }
    }
    return false;
  }
```

In `bothContainNumber`, we operate on both inputs nested together so that for every instance of an element in one input, we loop through the other input in its entirety.  While it might be tempting to call this _O(n<sup>2</sup>)_, for the same reasons as our earlier example, each input has to be regarded separately, giving this the Big O of _O(nm)_.

### Time Complexities:

**_O(1)_** - AKA: **Constant time**

- The amount of steps/operations a function takes is independent from the size of the input

**_O(log n)_** - AKA: **Logarithmic time**

- As the function progresses, the number of steps is halfed

**_O(n)_** - AKA: **Linear time**

- The amount of steps/operations is directly related to the size of the input

**_O(n log n)_** - AKA: **Log-linear/Linearithmic**
    
- Requires iterating over every element of the input and then the number of steps is halfed each iteration

**_O(n<sup>2</sup>)_** - AKA: **N-squared/Quadratic time**
    
- The number of operations taken by a function is the square of the input size

**_O(c<sup>n</sup>)_** - AKA: **Exponential**

- `c` represents a constant greater than 1 and `n` still represents input size

**_O(n!)_** - AKA: **Factorial**
    
- Given an input size of 5, the number of steps/ops taken would be calculated as `5 * 4 * 3 * 2 * 1`

### O(1) - Constant time example

```javascript{numberLines: true}
function isFirstElementEven(arr) {
  return arr[0] % 2 === 0;
}

isFirstElementEven([10,2,1])
```

### O(log(n)) - Logarithmic time example

#### Function

```javascript{numberLines: true}
function findNeedleInSortedHaystack(needle, haystack) {
  let length = haystack.length;
  let mid = Math.floor(length/2);
  let currentPosition = 0;
  let count = 0;
  let currentPositions = [];
  let answer;
  while (mid > 0) {
     
    while ((currentPosition + mid) < length && haystack[currentPosition + mid] <= needle) {    
      count++;     
      console.log('currentPosition', currentPosition, 'mid', mid)
      currentPositions.push(currentPosition);
      currentPosition += mid;
    }
    mid = Math.floor(mid/2);    
    if (haystack[currentPosition] === needle) {
        break;
      }
  }    
  count++; 
  currentPositions.push(currentPosition);

  console.log('currentPosition', currentPosition, 'mid', mid)
  if (haystack[currentPosition] === needle) {
    answer = currentPosition;
    return { '# of loops in while': count, 'list of positions': currentPositions, 'size of input': length, 'percentage of array input accessed': `${(count / length) * 100}%`}
  }
}

findNeedleInSortedHaystack(100, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100])
```

#### Console Output:

```html 

currentPosition 0 mid 50
currentPosition 50 mid 25
currentPosition 75 mid 12
currentPosition 87 mid 12
currentPosition 99 mid 6
=> { '# of loops in while': 5,
  'list of positions': [ 0, 50, 75, 87, 99 ],
  'size of input': 100,
  'percentage of array input accessed': '5%' }
```

### O(n) - Linear time example

#### Function:

```javascript{numberLines: true}
function reverseString(n) {
  let reversed = "";
  let count = 0;
  for (let i = n.length - 1; i >= 0; i--) {
    reversed += n[i];
    count++;
    console.log('reversed', reversed)
    console.log('count', count)
  }
  console.log('size of input', n.length)
  return {'# of loops of i': count, 'size of input': n.length}
}

reverseString("Wobblewobble")
```

#### Console Output:

reversed e
count 1
reversed el
count 2
reversed elb
count 3
reversed elbb
count 4
reversed elbbo
count 5
reversed elbbow
count 6
reversed elbbowe
count 7
reversed elbbowel
count 8
reversed elbbowelb
count 9
reversed elbbowelbb
count 10
reversed elbbowelbbo
count 11
reversed elbbowelbboW
count 12
size of input 12
=> { '# of loops of i': 12, 'size of input': 12 }

#Advice: Not all Nested Loops are Quadratic

#### Example with nested loops that doesn't equate to n^2:

Some people consider this to be O(n) because they're counting each element in the matrix as a part of a single 'n' and you only access each element once.  

Others consider it O(nm) where n is number of rows and m is number of columns

#### Function:

```javascript{numberLines: true}
function nWithNesting(matrix) {
  let count = [0,0];
  let rows = [];
  for (let i = 0; i < matrix.length; i++) {
    ++count[0];
    for (let j = 0; j < matrix.length; j++) {
      ++count[1];
      if (count[1] < 10) {
        console.log('count', count, '\t\ti', i, 'j', j);
      } else {
        console.log('count', count, '\ti', i, 'j', j);
      }

    }
    console.log('\n')       
  }

  return { '# of loops of i': count[0], '# of total loops': count[1], 'size of input': matrix.length * matrix.length}
}

let matrix = [
  [,,2,6,,,3,4,],
  [,5,1,,9,4,8,2,],
  [,,,,2,1,,,6],
  [,3,,,8,,6,,],
  [4,6,,,,,,8,2],
  [,,5,,6,,,9,],
  [3,,,8,7,,,,],
  [,1,8,2,4,,7,6,],
  [,9,4,,,6,2,,]
]

console.log(nWithNesting(matrix))
```

#### Console Output

```html 

count [ 1, 1 ] 		i 0 j 0
count [ 1, 2 ] 		i 0 j 1
count [ 1, 3 ] 		i 0 j 2
count [ 1, 4 ] 		i 0 j 3
count [ 1, 5 ] 		i 0 j 4
count [ 1, 6 ] 		i 0 j 5
count [ 1, 7 ] 		i 0 j 6
count [ 1, 8 ] 		i 0 j 7
count [ 1, 9 ] 		i 0 j 8

count [ 2, 10 ] 	i 1 j 0
count [ 2, 11 ] 	i 1 j 1
count [ 2, 12 ] 	i 1 j 2
count [ 2, 13 ] 	i 1 j 3
count [ 2, 14 ] 	i 1 j 4
count [ 2, 15 ] 	i 1 j 5
count [ 2, 16 ] 	i 1 j 6
count [ 2, 17 ] 	i 1 j 7
count [ 2, 18 ] 	i 1 j 8

count [ 3, 19 ] 	i 2 j 0
count [ 3, 20 ] 	i 2 j 1
count [ 3, 21 ] 	i 2 j 2
count [ 3, 22 ] 	i 2 j 3
count [ 3, 23 ] 	i 2 j 4
count [ 3, 24 ] 	i 2 j 5
count [ 3, 25 ] 	i 2 j 6
count [ 3, 26 ] 	i 2 j 7
count [ 3, 27 ] 	i 2 j 8

count [ 4, 28 ] 	i 3 j 0
count [ 4, 29 ] 	i 3 j 1
count [ 4, 30 ] 	i 3 j 2
count [ 4, 31 ] 	i 3 j 3
count [ 4, 32 ] 	i 3 j 4
count [ 4, 33 ] 	i 3 j 5
count [ 4, 34 ] 	i 3 j 6
count [ 4, 35 ] 	i 3 j 7
count [ 4, 36 ] 	i 3 j 8

count [ 5, 37 ] 	i 4 j 0
count [ 5, 38 ] 	i 4 j 1
count [ 5, 39 ] 	i 4 j 2
count [ 5, 40 ] 	i 4 j 3
count [ 5, 41 ] 	i 4 j 4
count [ 5, 42 ] 	i 4 j 5
count [ 5, 43 ] 	i 4 j 6
count [ 5, 44 ] 	i 4 j 7
count [ 5, 45 ] 	i 4 j 8

count [ 6, 46 ] 	i 5 j 0
count [ 6, 47 ] 	i 5 j 1
count [ 6, 48 ] 	i 5 j 2
count [ 6, 49 ] 	i 5 j 3
count [ 6, 50 ] 	i 5 j 4
count [ 6, 51 ] 	i 5 j 5
count [ 6, 52 ] 	i 5 j 6
count [ 6, 53 ] 	i 5 j 7
count [ 6, 54 ] 	i 5 j 8

count [ 7, 55 ] 	i 6 j 0
count [ 7, 56 ] 	i 6 j 1
count [ 7, 57 ] 	i 6 j 2
count [ 7, 58 ] 	i 6 j 3
count [ 7, 59 ] 	i 6 j 4
count [ 7, 60 ] 	i 6 j 5
count [ 7, 61 ] 	i 6 j 6
count [ 7, 62 ] 	i 6 j 7
count [ 7, 63 ] 	i 6 j 8

count [ 8, 64 ] 	i 7 j 0
count [ 8, 65 ] 	i 7 j 1
count [ 8, 66 ] 	i 7 j 2
count [ 8, 67 ] 	i 7 j 3
count [ 8, 68 ] 	i 7 j 4
count [ 8, 69 ] 	i 7 j 5
count [ 8, 70 ] 	i 7 j 6
count [ 8, 71 ] 	i 7 j 7
count [ 8, 72 ] 	i 7 j 8

count [ 9, 73 ] 	i 8 j 0
count [ 9, 74 ] 	i 8 j 1
count [ 9, 75 ] 	i 8 j 2
count [ 9, 76 ] 	i 8 j 3
count [ 9, 77 ] 	i 8 j 4
count [ 9, 78 ] 	i 8 j 5
count [ 9, 79 ] 	i 8 j 6
count [ 9, 80 ] 	i 8 j 7
count [ 9, 81 ] 	i 8 j 8

{ '# of loops of i': 9,
  '# of total loops': 81,
  'size of input': 81 }
```

# Another example where nested loops !== O(n^2)

#### Function:

```javascript{numberLines: true}
function printCurrentNum(arr) {
  let count = 0;
   for (let i = arr; i > 0; i--) {
    for (let j = i; j < arr; j++) {
        ++count;
      }
   }
    console.log('count', count)
}
printCurrentNum(9);
```

#### Console Output

count 36

### O(n log(n)) - Linearithmic/Log-linear example
This is the best time complexity achievable by comparison-based sorting algorithms.

#### Function

```javascript{numberLines: true}
let length;
function quickSort(nums) {
   console.count('Number of times quickSort is called');
  if (!length) {
    length = nums.length;
  }
  if (nums.length <= 1) return nums;
  
  const pivot = nums[nums.length - 1];
  let left = [];
  let right = [];
   console.log('lengthOfInput:', length);
  for (let i = 0; i < nums.length - 1; i++) {
    console.count('Number of times an index is accessed in a for loop');
   
    if (nums[i] < pivot) {
      left.push(nums[i]);
    } else {
      right.push(nums[i]);
    }
  }
  console.log('right', right, 'left', left);  
  return [...quickSort(left), pivot, ...quickSort(right)];
}

console.log(quickSort([1,2, 5, 4, 3,6, 8, 7, 12,10]));
console.log('\n');
console.countReset('Number of times quickSort is called');
console.log(quickSort([5,2,8,9,4,5,1,3,7,6]));
console.log('\n');
console.countReset('Number of times quickSort is called');
console.log(quickSort([1,2,3,4,5,6,7,8,9,10,11,12,13]));
// This last quickSort example is the worst case for quicksort because the pivot is always the same end of the array and the array is always sorted, which results in the split between left/right being one empty array and one array with all of the other elements.  This is the situation where quickSort has a time complexity of O(n^2) - but it's so rare in practice that we still consider quickSort to be O(n log n);
```

#### Console Output

```html
Number of times quickSort is called: 1
lengthOfInput: 10
Number of times an index is accessed in a for loop: 1
Number of times an index is accessed in a for loop: 2
Number of times an index is accessed in a for loop: 3
Number of times an index is accessed in a for loop: 4
Number of times an index is accessed in a for loop: 5
Number of times an index is accessed in a for loop: 6
Number of times an index is accessed in a for loop: 7
Number of times an index is accessed in a for loop: 8
Number of times an index is accessed in a for loop: 9
right [ 12 ] left [ 1, 2, 5, 4, 3, 6, 8, 7 ]

Number of times quickSort is called: 2
lengthOfInput: 10
Number of times an index is accessed in a for loop: 1
Number of times an index is accessed in a for loop: 2
Number of times an index is accessed in a for loop: 3
Number of times an index is accessed in a for loop: 4
Number of times an index is accessed in a for loop: 5
Number of times an index is accessed in a for loop: 6
Number of times an index is accessed in a for loop: 7
right [ 8 ] left [ 1, 2, 5, 4, 3, 6 ]

Number of times quickSort is called: 3
lengthOfInput: 10
Number of times an index is accessed in a for loop: 1
Number of times an index is accessed in a for loop: 2
Number of times an index is accessed in a for loop: 3

Number of times an index is accessed in a for loop: 4
Number of times an index is accessed in a for loop: 5
right [] left [ 1, 2, 5, 4, 3 ]

Number of times quickSort is called: 4
lengthOfInput: 10
Number of times an index is accessed in a for loop: 1
Number of times an index is accessed in a for loop: 2
Number of times an index is accessed in a for loop: 3
Number of times an index is accessed in a for loop: 4
right [ 5, 4 ] left [ 1, 2 ]

Number of times quickSort is called: 5
lengthOfInput: 10
Number of times an index is accessed in a for loop: 1
right [] left [ 1 ]

Number of times quickSort is called: 6

Number of times quickSort is called: 7

Number of times quickSort is called: 8
lengthOfInput: 10

Number of times an index is accessed in a for loop: 1
right [ 5 ] left []

Number of times quickSort is called: 9

Number of times quickSort is called: 10

Number of times quickSort is called: 11

Number of times quickSort is called: 12

Number of times quickSort is called: 13
[ 1, 2, 3, 4, 5, 6, 7, 8, 10, 12 ]


Number of times quickSort is called: 1
lengthOfInput: 10

Number of times an index is accessed in a for loop: 1
Number of times an index is accessed in a for loop: 2
Number of times an index is accessed in a for loop: 3
Number of times an index is accessed in a for loop: 4
Number of times an index is accessed in a for loop: 5
Number of times an index is accessed in a for loop: 6
Number of times an index is accessed in a for loop: 7
Number of times an index is accessed in a for loop: 8
Number of times an index is accessed in a for loop: 9
right [ 8, 9, 7 ] left [ 5, 2, 4, 5, 1, 3 ]

 Number of times quickSort is called: 2
lengthOfInput: 10
Number of times an index is accessed in a for loop: 1
Number of times an index is accessed in a for loop: 2
Number of times an index is accessed in a for loop: 3
Number of times an index is accessed in a for loop: 4
Number of times an index is accessed in a for loop: 5
right [ 5, 4, 5 ] left [ 2, 1 ]

Number of times quickSort is called: 3
lengthOfInput: 10
Number of times an index is accessed in a for loop: 1
right [ 2 ] left []

Number of times quickSort is called: 4

Number of times quickSort is called: 5

Number of times quickSort is called: 6
lengthOfInput: 10
Number of times an index is accessed in a for loop: 1
Number of times an index is accessed in a for loop: 2
right [ 5 ] left [ 4 ]

Number of times quickSort is called: 7

Number of times quickSort is called: 8

Number of times quickSort is called: 9
lengthOfInput: 10
Number of times an index is accessed in a for loop: 1
Number of times an index is accessed in a for loop: 2
right [ 8, 9 ] left []

Number of times quickSort is called: 10

Number of times quickSort is called: 11
lengthOfInput: 10
Number of times an index is accessed in a for loop: 1
right [] left [ 8 ]

Number of times quickSort is called: 12

Number of times quickSort is called: 13
[ 1, 2, 3, 4, 5, 5, 6, 7, 8, 9 ]

Number of times quickSort is called: 1
lengthOfInput: 10
Number of times an index is accessed in a for loop: 1
Number of times an index is accessed in a for loop: 2
Number of times an index is accessed in a for loop: 3
Number of times an index is accessed in a for loop: 4
Number of times an index is accessed in a for loop: 5
Number of times an index is accessed in a for loop: 6
Number of times an index is accessed in a for loop: 7
Number of times an index is accessed in a for loop: 8
Number of times an index is accessed in a for loop: 9
Number of times an index is accessed in a for loop: 10
Number of times an index is accessed in a for loop: 11
Number of times an index is accessed in a for loop: 12
right [] left [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]

Number of times quickSort is called: 2
lengthOfInput: 10
Number of times an index is accessed in a for loop: 1
Number of times an index is accessed in a for loop: 2
Number of times an index is accessed in a for loop: 3
Number of times an index is accessed in a for loop: 4
Number of times an index is accessed in a for loop: 5
Number of times an index is accessed in a for loop: 6
Number of times an index is accessed in a for loop: 7
Number of times an index is accessed in a for loop: 8
Number of times an index is accessed in a for loop: 9
Number of times an index is accessed in a for loop: 10
Number of times an index is accessed in a for loop: 11
right [] left [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ]

Number of times quickSort is called: 3
lengthOfInput: 10
Number of times an index is accessed in a for loop: 1
Number of times an index is accessed in a for loop: 2
Number of times an index is accessed in a for loop: 3
Number of times an index is accessed in a for loop: 4
Number of times an index is accessed in a for loop: 5
Number of times an index is accessed in a for loop: 6
Number of times an index is accessed in a for loop: 7
Number of times an index is accessed in a for loop: 8
Number of times an index is accessed in a for loop: 9
Number of times an index is accessed in a for loop: 10
right [] left [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]

Number of times quickSort is called: 4
lengthOfInput: 10
Number of times an index is accessed in a for loop: 1
Number of times an index is accessed in a for loop: 2
Number of times an index is accessed in a for loop: 3
Number of times an index is accessed in a for loop: 4
Number of times an index is accessed in a for loop: 5
Number of times an index is accessed in a for loop: 6
Number of times an index is accessed in a for loop: 7
Number of times an index is accessed in a for loop: 8
Number of times an index is accessed in a for loop: 9
right [] left [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

Number of times quickSort is called: 5
lengthOfInput: 10
Number of times an index is accessed in a for loop: 1
Number of times an index is accessed in a for loop: 2
Number of times an index is accessed in a for loop: 3
Number of times an index is accessed in a for loop: 4
Number of times an index is accessed in a for loop: 5
Number of times an index is accessed in a for loop: 6
Number of times an index is accessed in a for loop: 7
Number of times an index is accessed in a for loop: 8
right [] left [ 1, 2, 3, 4, 5, 6, 7, 8 ]

Number of times quickSort is called: 6
lengthOfInput: 10
Number of times an index is accessed in a for loop: 1
Number of times an index is accessed in a for loop: 2
Number of times an index is accessed in a for loop: 3
Number of times an index is accessed in a for loop: 4
Number of times an index is accessed in a for loop: 5
Number of times an index is accessed in a for loop: 6
Number of times an index is accessed in a for loop: 7
right [] left [ 1, 2, 3, 4, 5, 6, 7 ]

Number of times quickSort is called: 7
lengthOfInput: 10
Number of times an index is accessed in a for loop: 1
Number of times an index is accessed in a for loop: 2
Number of times an index is accessed in a for loop: 3
Number of times an index is accessed in a for loop: 4
Number of times an index is accessed in a for loop: 5
Number of times an index is accessed in a for loop: 6
right [] left [ 1, 2, 3, 4, 5, 6 ]

Number of times quickSort is called: 8
lengthOfInput: 10
Number of times an index is accessed in a for loop: 1
Number of times an index is accessed in a for loop: 2
Number of times an index is accessed in a for loop: 3
Number of times an index is accessed in a for loop: 4
Number of times an index is accessed in a for loop: 5
right [] left [ 1, 2, 3, 4, 5 ]

Number of times quickSort is called: 9
lengthOfInput: 10
Number of times an index is accessed in a for loop: 1
Number of times an index is accessed in a for loop: 2
Number of times an index is accessed in a for loop: 3
Number of times an index is accessed in a for loop: 4
right [] left [ 1, 2, 3, 4 ]

Number of times quickSort is called: 10
lengthOfInput: 10
Number of times an index is accessed in a for loop: 1
Number of times an index is accessed in a for loop: 2
Number of times an index is accessed in a for loop: 3
right [] left [ 1, 2, 3 ]

Number of times quickSort is called: 11
lengthOfInput: 10
Number of times an index is accessed in a for loop: 1
Number of times an index is accessed in a for loop: 2
right [] left [ 1, 2 ]

Number of times quickSort is called: 12
lengthOfInput: 10
Number of times an index is accessed in a for loop: 1
right [] left [ 1 ]
Number of times quickSort is called: 13
Number of times quickSort is called: 14
Number of times quickSort is called: 15
Number of times quickSort is called: 16
Number of times quickSort is called: 17
Number of times quickSort is called: 18
Number of times quickSort is called: 19
Number of times quickSort is called: 20
Number of times quickSort is called: 21
Number of times quickSort is called: 22
Number of times quickSort is called: 23
Number of times quickSort is called: 24
Number of times quickSort is called: 25
[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ]
```

# O(n^2) - Quadratic time example

As the input size increases, performance is directly proprotional to the square of `n`.
#### Function

```javascript{numberLines: true}
function containsDuplicates(string) {
  let count = [0, 0]
  let truth;
  let inputSize = string.length;
  for (let i = 0; i < string.length; i++) {
    count[0]++;
    for (let j = 0; j < string.length; j++) {
      count[1]++;
      if (j === i) {
        continue;
      }
      if (string[i] === string[j]) {
        truth = true;
      }
      if (count[1] < 10) {
        console.log('count', count, '\t\ti', i, 'j', j)
      } else {
        console.log('count', count, '\ti', i, 'j', j)
      }

    }
      console.log('\n')
  }
  truth = false;
  return {'# of i loops': count[0], '# of total loops': count[1], 'inputSize': inputSize, 'inputSizeSquared': Math.pow(inputSize, 2)}
}

console.log(containsDuplicates('fasteeee'))
console.log(containsDuplicates('fastereee'))
```

#### Console Output

```html

count [ 1, 2 ] 		i 0 j 1    
count [ 1, 3 ] 		i 0 j 2    
count [ 1, 4 ] 		i 0 j 3    
count [ 1, 5 ] 		i 0 j 4    
count [ 1, 6 ] 		i 0 j 5    
count [ 1, 7 ] 		i 0 j 6    
count [ 1, 8 ] 		i 0 j 7    

count [ 2, 9 ] 		i 1 j 0
count [ 2, 11 ] 	i 1 j 2
count [ 2, 12 ] 	i 1 j 3
count [ 2, 13 ] 	i 1 j 4
count [ 2, 14 ] 	i 1 j 5
count [ 2, 15 ] 	i 1 j 6
count [ 2, 16 ] 	i 1 j 7
    
count [ 3, 17 ] 	i 2 j 0    
count [ 3, 18 ] 	i 2 j 1    
count [ 3, 20 ] 	i 2 j 3    
count [ 3, 21 ] 	i 2 j 4    
count [ 3, 22 ] 	i 2 j 5    
count [ 3, 23 ] 	i 2 j 6    
count [ 3, 24 ] 	i 2 j 7    

count [ 4, 25 ] 	i 3 j 0
count [ 4, 26 ] 	i 3 j 1
count [ 4, 27 ] 	i 3 j 2
count [ 4, 29 ] 	i 3 j 4
count [ 4, 30 ] 	i 3 j 5
count [ 4, 31 ] 	i 3 j 6
count [ 4, 32 ] 	i 3 j 7
    
count [ 5, 33 ] 	i 4 j 0    
count [ 5, 34 ] 	i 4 j 1    
count [ 5, 35 ] 	i 4 j 2    
count [ 5, 36 ] 	i 4 j 3    
count [ 5, 38 ] 	i 4 j 5    
count [ 5, 39 ] 	i 4 j 6    
count [ 5, 40 ] 	i 4 j 7    
    
count [ 6, 41 ] 	i 5 j 0
count [ 6, 42 ] 	i 5 j 1
count [ 6, 43 ] 	i 5 j 2
count [ 6, 44 ] 	i 5 j 3
count [ 6, 45 ] 	i 5 j 4
count [ 6, 47 ] 	i 5 j 6
count [ 6, 48 ] 	i 5 j 7
    
count [ 7, 49 ] 	i 6 j 0    
count [ 7, 50 ] 	i 6 j 1    
count [ 7, 51 ] 	i 6 j 2    
count [ 7, 52 ] 	i 6 j 3    
count [ 7, 53 ] 	i 6 j 4    
count [ 7, 54 ] 	i 6 j 5    
count [ 7, 56 ] 	i 6 j 7
    
count [ 8, 57 ] 	i 7 j 0    
count [ 8, 58 ] 	i 7 j 1    
count [ 8, 59 ] 	i 7 j 2    
count [ 8, 60 ] 	i 7 j 3    
count [ 8, 61 ] 	i 7 j 4    
count [ 8, 62 ] 	i 7 j 5    
count [ 8, 63 ] 	i 7 j 6    

{ '# of i loops': 8,
  '# of total loops': 64,
  inputSize: 8,
  inputSizeSquared: 64 
}

count [ 1, 2 ] 		i 0 j 1
count [ 1, 3 ] 		i 0 j 2
count [ 1, 4 ] 		i 0 j 3
count [ 1, 5 ] 		i 0 j 4
count [ 1, 6 ] 		i 0 j 5
count [ 1, 7 ] 		i 0 j 6
count [ 1, 8 ] 		i 0 j 7
count [ 1, 9 ] 		i 0 j 8
    
count [ 2, 10 ] 	i 1 j 0    
count [ 2, 12 ] 	i 1 j 2    
count [ 2, 13 ] 	i 1 j 3    
count [ 2, 14 ] 	i 1 j 4    
count [ 2, 15 ] 	i 1 j 5    
count [ 2, 16 ] 	i 1 j 6    
count [ 2, 17 ] 	i 1 j 7    
count [ 2, 18 ] 	i 1 j 8  
  
count [ 3, 19 ] 	i 2 j 0
count [ 3, 20 ] 	i 2 j 1
count [ 3, 22 ] 	i 2 j 3
count [ 3, 23 ] 	i 2 j 4
count [ 3, 24 ] 	i 2 j 5
count [ 3, 25 ] 	i 2 j 6
count [ 3, 26 ] 	i 2 j 7
count [ 3, 27 ] 	i 2 j 8
    
count [ 4, 28 ] 	i 3 j 0    
count [ 4, 29 ] 	i 3 j 1    
count [ 4, 30 ] 	i 3 j 2    
count [ 4, 32 ] 	i 3 j 4    
count [ 4, 33 ] 	i 3 j 5    
count [ 4, 34 ] 	i 3 j 6    
count [ 4, 35 ] 	i 3 j 7    
count [ 4, 36 ] 	i 3 j 8   

count [ 5, 37 ] 	i 4 j 0
count [ 5, 38 ] 	i 4 j 1
count [ 5, 39 ] 	i 4 j 2
count [ 5, 40 ] 	i 4 j 3
count [ 5, 42 ] 	i 4 j 5
count [ 5, 43 ] 	i 4 j 6
count [ 5, 44 ] 	i 4 j 7
count [ 5, 45 ] 	i 4 j 8
    
count [ 6, 46 ] 	i 5 j 0    
count [ 6, 47 ] 	i 5 j 1    
count [ 6, 48 ] 	i 5 j 2    
count [ 6, 49 ] 	i 5 j 3    
count [ 6, 50 ] 	i 5 j 4    
count [ 6, 52 ] 	i 5 j 6    
count [ 6, 53 ] 	i 5 j 7    
count [ 6, 54 ] 	i 5 j 8    

count [ 7, 55 ] 	i 6 j 0
count [ 7, 56 ] 	i 6 j 1
count [ 7, 57 ] 	i 6 j 2
count [ 7, 58 ] 	i 6 j 3
count [ 7, 59 ] 	i 6 j 4
count [ 7, 60 ] 	i 6 j 5
count [ 7, 62 ] 	i 6 j 7
count [ 7, 63 ] 	i 6 j 8
    
count [ 8, 64 ] 	i 7 j 0    
count [ 8, 65 ] 	i 7 j 1    
count [ 8, 66 ] 	i 7 j 2    
count [ 8, 67 ] 	i 7 j 3    
count [ 8, 68 ] 	i 7 j 4    
count [ 8, 69 ] 	i 7 j 5    
count [ 8, 70 ] 	i 7 j 6    
count [ 8, 72 ] 	i 7 j 8    

count [ 9, 73 ] 	i 8 j 0
count [ 9, 74 ] 	i 8 j 1
count [ 9, 75 ] 	i 8 j 2
count [ 9, 76 ] 	i 8 j 3
count [ 9, 77 ] 	i 8 j 4
count [ 9, 78 ] 	i 8 j 5
count [ 9, 79 ] 	i 8 j 6
count [ 9, 80 ] 	i 8 j 7

{ '# of i loops': 9,
  '# of total loops': 8
  inputSize: 9,
  inputzeSquared: 81 
}
```

### O(c^n) - Exponential time example
Function taken from [here](https://adrianmejia.com/blog/2018/04/05/most-popular-algorithms-time-complexity-every-programmer-should-know-free-online-tutorial-course/)

#### Function

```javascript{numberLines: true}
function getSubsets(n = '') {
  const array = Array.from(n);
  const base = [''];
  console.log('base length', base[0])

  const results = array.reduce((previous, element) => {
    const previousPlusElement = previous.map(el => {
      return `${el}${element}`;
    });
    return previous.concat(previousPlusElement);
  }, base);

  console.log(`getSubsets(${n}) // ${results.slice(0, 15).join(', ')}... `);
  console.log(`n: ${array.length}, counter: ${results.length};`);
  return results;
}

getSubsets('abacab')
```

#### Console Output

```javascript{numberLines: true}
getSubsets(abacab) // , a, b, ab, a, aa, ba, aba, c, ac, bc, abc, ac, aac, bac... 
n: 6, counter: 64;
=> [ '',
  'a',
  'b',
  'ab',
  'a',
  'aa',
  'ba',
  'aba',
  'c',
  'ac',
  'bc',
  'abc',
  'ac',
  'aac',
  'bac',
  'abac',
  'a',
  'aa',
  'ba',
  'aba',
  'aa',
  'aaa',
  'baa',
  'abaa',
  'ca',
  'aca',
  'bca',
  'abca',
  'aca',
  'aaca',
  'baca',
  'abaca',
  'b',
  'ab',
  'bb',
  'abb',
  'ab',
  'aab',
  'bab',
  'abab',
  'cb',
  'acb',
  'bcb',
  'abcb',
  'acb',
  'aacb',
  'bacb',
  'abacb',
  'ab',
  'aab',
  'bab',
  'abab',
  'aab',
  'aaab',
  'baab',
  'abaab',
  'cab',
  'acab',
  'bcab',
  'abcab',
  'acab',
  'aacab',
  'bacab',
  'abacab' ]
```
<div class="fibTree">

### Another O(c^n) example

Recursive fibonacci exmaple:

In order to compute fib(5), a tree 

<div class="tree">
&nbsp;&nbsp;fib(5)
&nbsp;&nbsp;/\
&nbsp;&nbsp;/&nbsp;\
&nbsp;&nbsp;/&nbsp;\
&nbsp;&nbsp;/&nbsp;\
&nbsp;&nbsp;/&nbsp;\
&nbsp;&nbsp;/&nbsp;\&nbsp;&nbsp;fib(4)&nbsp;&nbsp;fib(3)
/&nbsp;&nbsp;\&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;\&nbsp;&nbsp;/&nbsp;&nbsp;\&nbsp;&nbsp;/&nbsp;\&nbsp;&nbsp;fib(3)fib(2)fib(2)&nbsp;fib(1)
&nbsp;&nbsp;/&nbsp;\&nbsp;&nbsp;/\/&nbsp;\&nbsp;|
&nbsp;/\&nbsp;&nbsp;&nbsp;/\/\&nbsp;&nbsp;1 
fib(2)&nbsp;&nbsp;&nbsp;fib(1)&nbsp;&nbsp;fib(1)fib(0)fib(1)fib(0)&nbsp;&nbsp;/\||||&nbsp;&nbsp;|fib(1)fib(0)||||&nbsp;&nbsp;|
    |&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;1&nbsp;&nbsp;&nbsp;1&nbsp;&nbsp;&nbsp;0&nbsp;&nbsp;&nbsp;1&nbsp;0&nbsp;<br>1&nbsp;0
    </div>
  </div>

#### Function

This illustrative example found on [Stack Overflow](https://stackoverflow.com/questions/8845154/how-does-the-fibonacci-recursive-function-work)

```javascript{numberLines: true}
let calls = 0;
function fibonacci(n, c) {
  calls++;
    var indent = "";
    for (var i = 0; i < c; i++) {
        indent += " ";
    }
    console.log(indent + "fibonacci(" + n + ")");
    
    if (n < 2) {
        return 1;
    } else {
        return fibonacci(n - 2, c + 4) + fibonacci(n - 1, c + 4);
    }
}

console.log({'n': 7, 'answer': fibonacci(7, 0), '# of calls': calls});
calls = 0;
console.log('\n');
console.log({'n': 8, 'answer': fibonacci(8, 0), '# of calls': calls});
```

#### Console Output

```html 

    fibonacci(7)
        fibonacci(5)
            fibonacci(3)
                fibonacci(1)
                fibonacci(2)
                    fibonacci(0)
                    fibonacci(1)
            fibonacci(4)
                fibonacci(2)
                    fibonacci(0)
                    fibonacci(1)
                fibonacci(3)
                    fibonacci(1)
                    fibonacci(2)
                        fibonacci(0)
                        fibonacci(1)
        fibonacci(6)
            fibonacci(4)
                fibonacci(2)
                    fibonacci(0)
                    fibonacci(1)
                fibonacci(3)
                    fibonacci(1)
                    fibonacci(2)
                        fibonacci(0)
                        fibonacci(1)
            fibonacci(5)
                fibonacci(3)
                    fibonacci(1)
                    fibonacci(2)
                        fibonacci(0)
                        fibonacci(1)
                fibonacci(4)
                    fibonacci(2)
                        fibonacci(0)
                        fibonacci(1)
                    fibonacci(3)
                        fibonacci(1)
                        fibonacci(2)
                            fibonacci(0)
                            fibonacci(1)
    { n: 7, answer: 21, '# of calls': 41 }
    
    fibonacci(8)
        fibonacci(6)
            fibonacci(4)
                fibonacci(2)
                    fibonacci(0)
                    fibonacci(1)
                fibonacci(3)
                    fibonacci(1)
                    fibonacci(2)
                        fibonacci(0)
                        fibonacci(1)
            fibonacci(5)
                fibonacci(3)
                    fibonacci(1)
                    fibonacci(2)
                        fibonacci(0)
                        fibonacci(1)
                fibonacci(4)
                    fibonacci(2)
                        fibonacci(0)
                        fibonacci(1)
                    fibonacci(3)
                        fibonacci(1)
                        fibonacci(2)
                            fibonacci(0)
                            fibonacci(1)
        fibonacci(7)
            fibonacci(5)
                fibonacci(3)
                    fibonacci(1)
                    fibonacci(2)
                        fibonacci(0)
                        fibonacci(1)
                fibonacci(4)
                    fibonacci(2)
                        fibonacci(0)
                        fibonacci(1)
                    fibonacci(3)
                        fibonacci(1)
                        fibonacci(2)
                            fibonacci(0)
                            fibonacci(1)
            fibonacci(6)
                fibonacci(4)
                    fibonacci(2)
                        fibonacci(0)
                        fibonacci(1)
                    fibonacci(3)
                        fibonacci(1)
                        fibonacci(2)
                            fibonacci(0)
                            fibonacci(1)
                fibonacci(5)
                    fibonacci(3)
                        fibonacci(1)
                        fibonacci(2)
                            fibonacci(0)
                            fibonacci(1)
                    fibonacci(4)
                        fibonacci(2)
                            fibonacci(0)
                            fibonacci(1)
                        fibonacci(3)
                            fibonacci(1)
                            fibonacci(2)
                                fibonacci(0)
                                fibonacci(1)
    { n: 8, answer: 34, '# of calls': 67 }
```

### O(n!) - Factorial time example

Function taken from [here](https://adrianmejia.com/blog/2018/04/05/most-popular-algorithms-time-complexity-every-programmer-should-know-free-online-tutorial-course/)

#### Function

```javascript{numberLines: true}
function getPermutations(string, prefix = '') {
  console.log('prefix', prefix)
  if(string.length <= 1) {
    console.count('Number of times getPermutations is run');
    return [prefix + string];
  }

  return Array.from(string).reduce((result, char, index) => {
    const reminder = string.slice(0, index) + string.slice(index+1);
    result = result.concat(getPermutations(reminder, prefix + char));
    return result;
  }, []);
}

getPermutations('abacab')
```

#### Console Output

```md
prefix 
prefix a
prefix ab
prefix aba
prefix abac
prefix abaca
Number of times getPermutations is run: 1
prefix abacb
Number of times getPermutations is run: 2
prefix abaa
prefix abaac
Number of times getPermutations is run: 3
prefix abaab
Number of times getPermutations is run: 4
prefix abab
prefix ababc
Number of times getPermutations is run: 5
prefix ababa
Number of times getPermutations is run: 6
prefix abc
prefix abca
prefix abcaa
Number of times getPermutations is run: 7
prefix abcab
Number of times getPermutations is run: 8
prefix abca
prefix abcaa
Number of times getPermutations is run: 9
prefix abcab
Number of times getPermutations is run: 10
prefix abcb
prefix abcba
Number of times getPermutations is run: 11
prefix abcba
Number of times getPermutations is run: 12
prefix aba
prefix abaa
prefix abaac
Number of times getPermutations is run: 13
prefix abaab
Number of times getPermutations is run: 14
prefix abac
prefix abaca
Number of times getPermutations is run: 15
prefix abacb
Number of times getPermutations is run: 16
prefix abab
prefix ababa
Number of times getPermutations is run: 17
prefix ababc
Number of times getPermutations is run: 18
prefix abb
prefix abba
prefix abbac
Number of times getPermutations is run: 19
prefix abbaa
Number of times getPermutations is run: 20
prefix abbc
prefix abbca
Number of times getPermutations is run: 21
prefix abbca
Number of times getPermutations is run: 22
prefix abba
prefix abbaa
Number of times getPermutations is run: 23
prefix abbac
Number of times getPermutations is run: 24
prefix aa
prefix aab
prefix aabc
prefix aabca
Number of times getPermutations is run: 25
prefix aabcb
Number of times getPermutations is run: 26
prefix aaba
prefix aabac
Number of times getPermutations is run: 27
prefix aabab
Number of times getPermutations is run: 28
prefix aabb
prefix aabbc
Number of times getPermutations is run: 29
prefix aabba
Number of times getPermutations is run: 30
prefix aac
prefix aacb
prefix aacba
Number of times getPermutations is run: 31
prefix aacbb
Number of times getPermutations is run: 32
prefix aaca
prefix aacab
Number of times getPermutations is run: 33
prefix aacab
Number of times getPermutations is run: 34
prefix aacb
prefix aacbb
Number of times getPermutations is run: 35
prefix aacba
Number of times getPermutations is run: 36
prefix aaa
prefix aaab
prefix aaabc
Number of times getPermutations is run: 37
prefix aaabb
Number of times getPermutations is run: 38
prefix aaac
prefix aaacb
Number of times getPermutations is run: 39
prefix aaacb
Number of times getPermutations is run: 40
prefix aaab
prefix aaabb
Number of times getPermutations is run: 41
prefix aaabc
Number of times getPermutations is run: 42
prefix aab
prefix aabb
prefix aabbc
Number of times getPermutations is run: 43
prefix aabba
Number of times getPermutations is run: 44
prefix aabc
prefix aabcb
Number of times getPermutations is run: 45
prefix aabca
Number of times getPermutations is run: 46
prefix aaba
prefix aabab
Number of times getPermutations is run: 47
prefix aabac
Number of times getPermutations is run: 48
prefix ac
prefix acb
prefix acba
prefix acbaa
Number of times getPermutations is run: 49
prefix acbab
Number of times getPermutations is run: 50
prefix acba
prefix acbaa
Number of times getPermutations is run: 51
prefix acbab
Number of times getPermutations is run: 52
prefix acbb
prefix acbba
Number of times getPermutations is run: 53
prefix acbba
Number of times getPermutations is run: 54
prefix aca
prefix acab
prefix acaba
Number of times getPermutations is run: 55
prefix acabb
Number of times getPermutations is run: 56
prefix acaa
prefix acaab
Number of times getPermutations is run: 57
prefix acaab
Number of times getPermutations is run: 58
prefix acab
prefix acabb
Number of times getPermutations is run: 59
prefix acaba
Number of times getPermutations is run: 60
prefix aca
prefix acab
prefix acaba
Number of times getPermutations is run: 61
prefix acabb
Number of times getPermutations is run: 62
prefix acaa
prefix acaab
Number of times getPermutations is run: 63
prefix acaab
Number of times getPermutations is run: 64
prefix acab
prefix acabb
Number of times getPermutations is run: 65
prefix acaba
Number of times getPermutations is run: 66
prefix acb
prefix acbb
prefix acbba
Number of times getPermutations is run: 67
prefix acbba
Number of times getPermutations is run: 68
prefix acba
prefix acbab
Number of times getPermutations is run: 69
prefix acbaa
Number of times getPermutations is run: 70
prefix acba
prefix acbab
Number of times getPermutations is run: 71
prefix acbaa
Number of times getPermutations is run: 72
prefix aa
prefix aab
prefix aaba
prefix aabac
Number of times getPermutations is run: 73
prefix aabab
Number of times getPermutations is run: 74
prefix aabc
prefix aabca
Number of times getPermutations is run: 75
prefix aabcb
Number of times getPermutations is run: 76
prefix aabb
prefix aabba
Number of times getPermutations is run: 77
prefix aabbc
Number of times getPermutations is run: 78
prefix aaa
prefix aaab
prefix aaabc
Number of times getPermutations is run: 79
prefix aaabb
Number of times getPermutations is run: 80
prefix aaac
prefix aaacb
Number of times getPermutations is run: 81
prefix aaacb
Number of times getPermutations is run: 82
prefix aaab
prefix aaabb
Number of times getPermutations is run: 83
prefix aaabc
Number of times getPermutations is run: 84
prefix aac
prefix aacb
prefix aacba
Number of times getPermutations is run: 85
prefix aacbb
Number of times getPermutations is run: 86
prefix aaca
prefix aacab
Number of times getPermutations is run: 87
prefix aacab
Number of times getPermutations is run: 88
prefix aacb
prefix aacbb
Number of times getPermutations is run: 89
prefix aacba
Number of times getPermutations is run: 90
prefix aab
prefix aabb
prefix aabba
Number of times getPermutations is run: 91
prefix aabbc
Number of times getPermutations is run: 92
prefix aaba
prefix aabab
Number of times getPermutations is run: 93
prefix aabac
Number of times getPermutations is run: 94
prefix aabc
prefix aabcb
Number of times getPermutations is run: 95
prefix aabca
Number of times getPermutations is run: 96
prefix ab
prefix abb
prefix abba
prefix abbac
Number of times getPermutations is run: 97
prefix abbaa
Number of times getPermutations is run: 98
prefix abbc
prefix abbca
Number of times getPermutations is run: 99
prefix abbca
Number of times getPermutations is run: 100
```

```md
  efix abba
prefix abbaa
Number of times getPermutations is run: 101
prefix abbac
Number of times getPermutations is run: 102
prefix aba
prefix abab
prefix ababc
Number of times getPermutations is run: 103
prefix ababa
Number of times getPermutations is run: 104
prefix abac
prefix abacb
Number of times getPermutations is run: 105
prefix abaca
Number of times getPermutations is run: 106
prefix abaa
prefix abaab
Number of times getPermutations is run: 107
prefix abaac
Number of times getPermutations is run: 108
prefix abc
prefix abcb
prefix abcba
Number of times getPermutations is run: 109
prefix abcba
Number of times getPermutations is run: 110
prefix abca
prefix abcab
Number of times getPermutations is run: 111
prefix abcaa
Number of times getPermutations is run: 112
prefix abca
prefix abcab
Number of times getPermutations is run: 113
prefix abcaa
Number of times getPermutations is run: 114
prefix aba
prefix abab
prefix ababa
Number of times getPermutations is run: 115
prefix ababc
Number of times getPermutations is run: 116
prefix abaa
prefix abaab
Number of times getPermutations is run: 117
prefix abaac
Number of times getPermutations is run: 118
prefix abac
prefix abacb
Number of times getPermutations is run: 119
prefix abaca
Number of times getPermutations is run: 120
prefix b
prefix ba
prefix baa
prefix baac
prefix baaca
Number of times getPermutations is run: 121
prefix baacb
Number of times getPermutations is run: 122
prefix baaa
prefix baaac
Number of times getPermutations is run: 123
prefix baaab
Number of times getPermutations is run: 124
prefix baab
prefix baabc
Number of times getPermutations is run: 125
prefix baaba
Number of times getPermutations is run: 126
prefix bac
prefix baca
prefix bacaa
Number of times getPermutations is run: 127
prefix bacab
Number of times getPermutations is run: 128
prefix baca
prefix bacaa
Number of times getPermutations is run: 129
prefix bacab
Number of times getPermutations is run: 130
prefix bacb
prefix bacba
Number of times getPermutations is run: 131
prefix bacba
Number of times getPermutations is run: 132
prefix baa
prefix baaa
prefix baaac
Number of times getPermutations is run: 133
prefix baaab
Number of times getPermutations is run: 134
prefix baac
prefix baaca
Number of times getPermutations is run: 135
prefix baacb
Number of times getPermutations is run: 136
prefix baab
prefix baaba
Number of times getPermutations is run: 137
prefix baabc
Number of times getPermutations is run: 138
prefix bab
prefix baba
prefix babac
Number of times getPermutations is run: 139
prefix babaa
Number of times getPermutations is run: 140
prefix babc
prefix babca
Number of times getPermutations is run: 141
prefix babca
Number of times getPermutations is run: 142
prefix baba
prefix babaa
Number of times getPermutations is run: 143
prefix babac
Number of times getPermutations is run: 144

prefix ba    
prefix baa    
prefix baac    
prefix baaca    
Number of times getPermutations is run: 145    
prefix baacb    
Number of times getPermutations is run: 146    
prefix baaa    
prefix baaac    
Number of times getPermutations is run: 147    
prefix baaab    
Number of times getPermutations is run: 148    
prefix baab    
prefix baabc    
Number of times getPermutations is run: 149    
prefix baaba    
Number of times getPermutations is run: 150    
prefix bac    
prefix baca    
prefix bacaa    
Number of times getPermutations is run: 151    
prefix bacab    
Number of times getPermutations is run: 152    
prefix baca    
prefix bacaa    
Number of times getPermutations is run: 153    
prefix bacab    
Number of times getPermutations is run: 154    
prefix bacb    
prefix bacba    
Number of times getPermutations is run: 155    
prefix bacba    
Number of times getPermutations is run: 156    
prefix baa    
prefix baaa    
prefix baaac    
Number of times getPermutations is run: 157    
prefix baaab    
Number of times getPermutations is run: 158    
prefix baac    
prefix baaca    
Number of times getPermutations is run: 159    
prefix baacb    
Number of times getPermutations is run: 160    
prefix baab    
prefix baaba    
Number of times getPermutations is run: 161    
prefix baabc    
Number of times getPermutations is run: 162    
prefix bab    
prefix baba    
prefix babac    
Number of times getPermutations is run: 163    
prefix babaa    
Number of times getPermutations is run: 164    
prefix babc    
prefix babca    
Number of times getPermutations is run: 165    
prefix babca    
Number of times getPermutations is run: 166    
prefix baba    
prefix babaa    
Number of times getPermutations is run: 167    
prefix babac    
Number of times getPermutations is run: 168    
prefix bc    
prefix bca    
prefix bcaa    
prefix bcaaa    
Number of times getPermutations is run: 169    
prefix bcaab    
Number of times getPermutations is run: 170    
prefix bcaa    
prefix bcaaa    
Number of times getPermutations is run: 171    
prefix bcaab    
Number of times getPermutations is run: 172    
prefix bcab    
prefix bcaba    
Number of times getPermutations is run: 173    
prefix bcaba    
Number of times getPermutations is run: 174    
prefix bca    
prefix bcaa    
prefix bcaaa    
Number of times getPermutations is run: 175    
prefix bcaab    
Number of times getPermutations is run: 176    
prefix bcaa    
prefix bcaaa    
Number of times getPermutations is run: 177    
prefix bcaab    
Number of times getPermutations is run: 178    
prefix bcab    
prefix bcaba    
Number of times getPermutations is run: 179    
prefix bcaba    
Number of times getPermutations is run: 180    
prefix bca    
prefix bcaa    
prefix bcaaa    
Number of times getPermutations is run: 181    
prefix bcaab    
Number of times getPermutations is run: 182    
prefix bcaa    
prefix bcaaa    
Number of times getPermutations is run: 183    
prefix bcaab    
Number of times getPermutations is run: 184    
prefix bcab    
prefix bcaba    
Number of times getPermutations is run: 185    
prefix bcaba    
Number of times getPermutations is run: 186    
prefix bcb    
prefix bcba    
prefix bcbaa    
Number of times getPermutations is run: 187    
prefix bcbaa    
Number of times getPermutations is run: 188    
prefix bcba    
prefix bcbaa    
Number of times getPermutations is run: 189    
prefix bcbaa    
Number of times getPermutations is run: 190    
prefix bcba    
prefix bcbaa    
Number of times getPermutations is run: 191    
prefix bcbaa    
Number of times getPermutations is run: 192    
prefix ba    
prefix baa    
prefix baaa    
prefix baaac    
Number of times getPermutations is run: 193    
prefix baaab    
Number of times getPermutations is run: 194    
prefix baac    
prefix baaca    
Number of times getPermutations is run: 195    
prefix baacb    
Number of times getPermutations is run: 196    
prefix baab    
prefix baaba    
Number of times getPermutations is run: 197    
prefix baabc    
Number of times getPermutations is run: 198    
prefix baa    
prefix baaa    
prefix baaac    
Number of times getPermutations is run: 199    
prefix baaab    
Number of times getPermutations is run: 200    
```
```md
prefix baac    
prefix baaca    
Number of times getPermutations is run: 201    
prefix baacb    
Number of times getPermutations is run: 202    
prefix baab    
prefix baaba    
Number of times getPermutations is run: 203    
prefix baabc    
Number of times getPermutations is run: 204    
prefix bac    
prefix baca    
prefix bacaa    
Number of times getPermutations is run: 205    
prefix bacab    
Number of times getPermutations is run: 206    
prefix baca    
prefix bacaa    
Number of times getPermutations is run: 207    
prefix bacab    
Number of times getPermutations is run: 208    
prefix bacb    
prefix bacba    
Number of times getPermutations is run: 209    
prefix bacba    
Number of times getPermutations is run: 210    
prefix bab    
prefix baba    
prefix babaa    
Number of times getPermutations is run: 211    
prefix babac    
Number of times getPermutations is run: 212    
prefix baba    
prefix babaa    
Number of times getPermutations is run: 213    
prefix babac    
Number of times getPermutations is run: 214    
prefix babc    
prefix babca    
Number of times getPermutations is run: 215    
prefix babca    
Number of times getPermutations is run: 216    
prefix bb    
prefix bba    
prefix bbaa    
prefix bbaac    
Number of times getPermutations is run: 217    
prefix bbaaa    
Number of times getPermutations is run: 218    
prefix bbac    
prefix bbaca    
Number of times getPermutations is run: 219    
prefix bbaca    
Number of times getPermutations is run: 220    
prefix bbaa    
prefix bbaaa    
Number of times getPermutations is run: 221    
prefix bbaac    
Number of times getPermutations is run: 222    
prefix bba    
prefix bbaa    
prefix bbaac    
Number of times getPermutations is run: 223    
prefix bbaaa    
Number of times getPermutations is run: 224    
prefix bbac    
prefix bbaca    
Number of times getPermutations is run: 225    
prefix bbaca    
Number of times getPermutations is run: 226    
prefix bbaa    
prefix bbaaa    
Number of times getPermutations is run: 227    
prefix bbaac    
Number of times getPermutations is run: 228    
prefix bbc    
prefix bbca    
prefix bbcaa    
Number of times getPermutations is run: 229    
prefix bbcaa    
Number of times getPermutations is run: 230    
prefix bbca    
prefix bbcaa    
Number of times getPermutations is run: 231    
prefix bbcaa    
Number of times getPermutations is run: 232    
prefix bbca    
prefix bbcaa    
Number of times getPermutations is run: 233    
prefix bbcaa    
Number of times getPermutations is run: 234    
prefix bba    
prefix bbaa    
prefix bbaaa    
Number of times getPermutations is run: 235    
prefix bbaac    
Number of times getPermutations is run: 236    
prefix bbaa    
prefix bbaaa    
Number of times getPermutations is run: 237    
prefix bbaac    
Number of times getPermutations is run: 238    
prefix bbac    
prefix bbaca    
Number of times getPermutations is run: 239    
prefix bbaca    
Number of times getPermutations is run: 240    
prefix a    
prefix aa    
prefix aab    
prefix aabc    
prefix aabca    
Number of times getPermutations is run: 241    
prefix aabcb    
Number of times getPermutations is run: 242    
prefix aaba    
prefix aabac    
Number of times getPermutations is run: 243    
prefix aabab    
Number of times getPermutations is run: 244    
prefix aabb    
prefix aabbc    
Number of times getPermutations is run: 245    
prefix aabba    
Number of times getPermutations is run: 246    
prefix aac    
prefix aacb    
prefix aacba    
Number of times getPermutations is run: 247    
prefix aacbb    
Number of times getPermutations is run: 248    
prefix aaca    
prefix aacab    
Number of times getPermutations is run: 249    
prefix aacab    
Number of times getPermutations is run: 250    
prefix aacb    
prefix aacbb    
Number of times getPermutations is run: 251    
prefix aacba    
Number of times getPermutations is run: 252    
prefix aaa    
prefix aaab    
prefix aaabc    
Number of times getPermutations is run: 253    
prefix aaabb    
Number of times getPermutations is run: 254    
prefix aaac    
prefix aaacb    
Number of times getPermutations is run: 255    
prefix aaacb    
Number of times getPermutations is run: 256    
prefix aaab    
prefix aaabb    
Number of times getPermutations is run: 257    
prefix aaabc    
Number of times getPermutations is run: 258    
prefix aab    
prefix aabb    
prefix aabbc    
Number of times getPermutations is run: 259    
prefix aabba    
Number of times getPermutations is run: 260    
prefix aabc    
prefix aabcb    
Number of times getPermutations is run: 261    
prefix aabca    
Number of times getPermutations is run: 262    
prefix aaba    
prefix aabab    
Number of times getPermutations is run: 263    
prefix aabac    
Number of times getPermutations is run: 264    
prefix ab    
prefix aba    
prefix abac    
prefix abaca    
Number of times getPermutations is run: 265    
prefix abacb    
Number of times getPermutations is run: 266    
prefix abaa    
prefix abaac    
Number of times getPermutations is run: 267    
prefix abaab    
Number of times getPermutations is run: 268    
prefix abab    
prefix ababc    
Number of times getPermutations is run: 269    
prefix ababa    
Number of times getPermutations is run: 270    
prefix abc    
prefix abca    
prefix abcaa    
Number of times getPermutations is run: 271    
prefix abcab    
Number of times getPermutations is run: 272    
prefix abca    
prefix abcaa    
Number of times getPermutations is run: 273    
prefix abcab    
Number of times getPermutations is run: 274    
prefix abcb    
prefix abcba    
Number of times getPermutations is run: 275    
prefix abcba    
Number of times getPermutations is run: 276    
prefix aba    
prefix abaa    
prefix abaac    
Number of times getPermutations is run: 277    
prefix abaab    
Number of times getPermutations is run: 278    
prefix abac    
prefix abaca    
Number of times getPermutations is run: 279    
prefix abacb    
Number of times getPermutations is run: 280    
prefix abab    
prefix ababa    
Number of times getPermutations is run: 281    
prefix ababc    
Number of times getPermutations is run: 282    
prefix abb    
prefix abba    
prefix abbac    
Number of times getPermutations is run: 283    
prefix abbaa    
Number of times getPermutations is run: 284    
prefix abbc    
prefix abbca    
Number of times getPermutations is run: 285    
prefix abbca    
Number of times getPermutations is run: 286    
prefix abba    
prefix abbaa    
Number of times getPermutations is run: 287    
prefix abbac    
Number of times getPermutations is run: 288    
prefix ac    
prefix aca    
prefix acab    
prefix acaba    
Number of times getPermutations is run: 289    
prefix acabb    
Number of times getPermutations is run: 290    
prefix acaa    
prefix acaab    
Number of times getPermutations is run: 291    
prefix acaab    
Number of times getPermutations is run: 292    
prefix acab    
prefix acabb    
Number of times getPermutations is run: 293    
prefix acaba    
Number of times getPermutations is run: 294    
prefix acb    
prefix acba    
prefix acbaa    
Number of times getPermutations is run: 295    
prefix acbab    
Number of times getPermutations is run: 296    
prefix acba    
prefix acbaa    
Number of times getPermutations is run: 297    
prefix acbab    
Number of times getPermutations is run: 298    
prefix acbb    
prefix acbba    
Number of times getPermutations is run: 299    
prefix acbba    
Number of times getPermutations is run: 300    
```
```md
prix aca    
prefix acaa    
prefix acaab    
Number of times getPermutations is run: 301    
prefix acaab    
Number of times getPermutations is run: 302    
prefix acab    
prefix acaba    
Number of times getPermutations is run: 303    
prefix acabb    
Number of times getPermutations is run: 304    
prefix acab    
prefix acaba    
Number of times getPermutations is run: 305    
prefix acabb    
Number of times getPermutations is run: 306    
prefix acb    
prefix acba    
prefix acbab    
Number of times getPermutations is run: 307    
prefix acbaa    
Number of times getPermutations is run: 308    
prefix acbb    
prefix acbba    
Number of times getPermutations is run: 309    
prefix acbba    
Number of times getPermutations is run: 310    
prefix acba    
prefix acbaa    
Number of times getPermutations is run: 311    
prefix acbab    
Number of times getPermutations is run: 312    
prefix aa    
prefix aaa    
prefix aaab    
prefix aaabc    
Number of times getPermutations is run: 313    
prefix aaabb    
Number of times getPermutations is run: 314    
prefix aaac    
prefix aaacb    
Number of times getPermutations is run: 315    
prefix aaacb    
Number of times getPermutations is run: 316    
prefix aaab    
prefix aaabb    
Number of times getPermutations is run: 317    
prefix aaabc    
Number of times getPermutations is run: 318    
prefix aab    
prefix aaba    
prefix aabac    
Number of times getPermutations is run: 319    
prefix aabab    
Number of times getPermutations is run: 320    
prefix aabc    
prefix aabca    
Number of times getPermutations is run: 321    
prefix aabcb    
Number of times getPermutations is run: 322    
prefix aabb    
prefix aabba    
Number of times getPermutations is run: 323    
prefix aabbc    
Number of times getPermutations is run: 324    
prefix aac    
prefix aaca    
prefix aacab    
Number of times getPermutations is run: 325    
prefix aacab    
Number of times getPermutations is run: 326    
prefix aacb    
prefix aacba    
Number of times getPermutations is run: 327    
prefix aacbb    
Number of times getPermutations is run: 328    
prefix aacb    
prefix aacba    
Number of times getPermutations is run: 329    
prefix aacbb    
Number of times getPermutations is run: 330    
prefix aab    
prefix aaba    
prefix aabab    
Number of times getPermutations is run: 331    
prefix aabac    
Number of times getPermutations is run: 332    
prefix aabb    
prefix aabba    
Number of times getPermutations is run: 333    
prefix aabbc    
Number of times getPermutations is run: 334    
prefix aabc    
prefix aabca    
Number of times getPermutations is run: 335    
prefix aabcb    
Number of times getPermutations is run: 336    
prefix ab    
prefix aba    
prefix abab    
prefix ababc    
Number of times getPermutations is run: 337    
prefix ababa    
Number of times getPermutations is run: 338    
prefix abac    
prefix abacb    
Number of times getPermutations is run: 339    
prefix abaca    
Number of times getPermutations is run: 340    
prefix abaa    
prefix abaab    
Number of times getPermutations is run: 341    
prefix abaac    
Number of times getPermutations is run: 342    
prefix abb    
prefix abba    
prefix abbac    
Number of times getPermutations is run: 343    
prefix abbaa    
Number of times getPermutations is run: 344    
prefix abbc    
prefix abbca    
Number of times getPermutations is run: 345    
prefix abbca    
Number of times getPermutations is run: 346    
prefix abba    
prefix abbaa    
Number of times getPermutations is run: 347    
prefix abbac    
Number of times getPermutations is run: 348    
prefix abc    
prefix abca    
prefix abcab    
Number of times getPermutations is run: 349    
prefix abcaa    
Number of times getPermutations is run: 350    
prefix abcb    
prefix abcba    
Number of times getPermutations is run: 351    
prefix abcba    
Number of times getPermutations is run: 352    
prefix abca    
prefix abcaa    
Number of times getPermutations is run: 353    
prefix abcab    
Number of times getPermutations is run: 354    
prefix aba    
prefix abaa    
prefix abaab    
Number of times getPermutations is run: 355    
prefix abaac    
Number of times getPermutations is run: 356    
prefix abab    
prefix ababa    
Number of times getPermutations is run: 357    
prefix ababc    
Number of times getPermutations is run: 358    
prefix abac    
prefix abaca    
Number of times getPermutations is run: 359    
prefix abacb    
Number of times getPermutations is run: 360    
prefix c    
prefix ca    
prefix cab    
prefix caba    
prefix cabaa    
Number of times getPermutations is run: 361    
prefix cabab    
Number of times getPermutations is run: 362    
prefix caba    
prefix cabaa    
Number of times getPermutations is run: 363    
prefix cabab    
Number of times getPermutations is run: 364    
prefix cabb    
prefix cabba    
Number of times getPermutations is run: 365    
prefix cabba    
Number of times getPermutations is run: 366    
prefix caa    
prefix caab    
prefix caaba    
Number of times getPermutations is run: 367    
prefix caabb    
Number of times getPermutations is run: 368    
prefix caaa    
prefix caaab    
Number of times getPermutations is run: 369    
prefix caaab    
Number of times getPermutations is run: 370    
prefix caab    
prefix caabb    
Number of times getPermutations is run: 371    
prefix caaba    
Number of times getPermutations is run: 372    
prefix caa    
prefix caab    
prefix caaba    
Number of times getPermutations is run: 373    
prefix caabb    
Number of times getPermutations is run: 374    
prefix caaa    
prefix caaab    
Number of times getPermutations is run: 375    
prefix caaab    
Number of times getPermutations is run: 376    
prefix caab    
prefix caabb    
Number of times getPermutations is run: 377    
prefix caaba    
Number of times getPermutations is run: 378    
prefix cab    
prefix cabb    
prefix cabba    
Number of times getPermutations is run: 379    
prefix cabba    
Number of times getPermutations is run: 380    
prefix caba    
prefix cabab    
Number of times getPermutations is run: 381    
prefix cabaa    
Number of times getPermutations is run: 382    
prefix caba    
prefix cabab    
Number of times getPermutations is run: 383    
prefix cabaa    
Number of times getPermutations is run: 384    
prefix cb    
prefix cba    
prefix cbaa    
prefix cbaaa    
Number of times getPermutations is run: 385    
prefix cbaab    
Number of times getPermutations is run: 386    
prefix cbaa    
prefix cbaaa    
Number of times getPermutations is run: 387    
prefix cbaab    
Number of times getPermutations is run: 388    
prefix cbab    
prefix cbaba    
Number of times getPermutations is run: 389    
prefix cbaba    
Number of times getPermutations is run: 390    
prefix cba    
prefix cbaa    
prefix cbaaa    
Number of times getPermutations is run: 391    
prefix cbaab    
Number of times getPermutations is run: 392    
prefix cbaa    
prefix cbaaa    
Number of times getPermutations is run: 393    
prefix cbaab    
Number of times getPermutations is run: 394    
prefix cbab    
prefix cbaba    
Number of times getPermutations is run: 395    
prefix cbaba    
Number of times getPermutations is run: 396    
prefix cba    
prefix cbaa    
prefix cbaaa    
Number of times getPermutations is run: 397    
prefix cbaab    
Number of times getPermutations is run: 398    
prefix cbaa    
prefix cbaaa    
Number of times getPermutations is run: 399    
prefix cbaab    
Number of times getPermutations is run: 400    
```

```md
prix cbab    
prefix cbaba    
Number of times getPermutations is run: 401    
prefix cbaba    
Number of times getPermutations is run: 402    
prefix cbb    
prefix cbba    
prefix cbbaa    
Number of times getPermutations is run: 403    
prefix cbbaa    
Number of times getPermutations is run: 404    
prefix cbba    
prefix cbbaa    
Number of times getPermutations is run: 405    
prefix cbbaa    
Number of times getPermutations is run: 406    
prefix cbba    
prefix cbbaa    
Number of times getPermutations is run: 407    
prefix cbbaa    
Number of times getPermutations is run: 408    
prefix ca    
prefix caa    
prefix caab    
prefix caaba    
Number of times getPermutations is run: 409    
prefix caabb    
Number of times getPermutations is run: 410    
prefix caaa    
prefix caaab    
Number of times getPermutations is run: 411    
prefix caaab    
Number of times getPermutations is run: 412    
prefix caab    
prefix caabb    
Number of times getPermutations is run: 413    
prefix caaba    
Number of times getPermutations is run: 414    
prefix cab    
prefix caba    
prefix cabaa    
Number of times getPermutations is run: 415    
prefix cabab    
Number of times getPermutations is run: 416    
prefix caba    
prefix cabaa    
Number of times getPermutations is run: 417    
prefix cabab    
Number of times getPermutations is run: 418    
prefix cabb    
prefix cabba    
Number of times getPermutations is run: 419    
prefix cabba    
Number of times getPermutations is run: 420    
prefix caa    
prefix caaa    
prefix caaab    
Number of times getPermutations is run: 421    
prefix caaab    
Number of times getPermutations is run: 422    
prefix caab    
prefix caaba    
Number of times getPermutations is run: 423    
prefix caabb    
Number of times getPermutations is run: 424    
prefix caab    
prefix caaba    
Number of times getPermutations is run: 425    
prefix caabb    
Number of times getPermutations is run: 426    
prefix cab    
prefix caba    
prefix cabab    
Number of times getPermutations is run: 427    
prefix cabaa    
Number of times getPermutations is run: 428    
prefix cabb    
prefix cabba    
Number of times getPermutations is run: 429    
prefix cabba    
Number of times getPermutations is run: 430    
prefix caba    
prefix cabaa    
Number of times getPermutations is run: 431    
prefix cabab    
Number of times getPermutations is run: 432    
prefix ca    
prefix caa    
prefix caab    
prefix caaba    
Number of times getPermutations is run: 433    
prefix caabb    
Number of times getPermutations is run: 434    
prefix caaa    
prefix caaab    
Number of times getPermutations is run: 435    
prefix caaab    
Number of times getPermutations is run: 436    
prefix caab    
prefix caabb    
Number of times getPermutations is run: 437    
prefix caaba    
Number of times getPermutations is run: 438    
prefix cab    
prefix caba    
prefix cabaa    
Number of times getPermutations is run: 439    
prefix cabab    
Number of times getPermutations is run: 440    
prefix caba    
prefix cabaa    
Number of times getPermutations is run: 441    
prefix cabab    
Number of times getPermutations is run: 442    
prefix cabb    
prefix cabba    
Number of times getPermutations is run: 443    
prefix cabba    
Number of times getPermutations is run: 444    
prefix caa    
prefix caaa    
prefix caaab    
Number of times getPermutations is run: 445    
prefix caaab    
Number of times getPermutations is run: 446    
prefix caab    
prefix caaba    
Number of times getPermutations is run: 447    
prefix caabb    
Number of times getPermutations is run: 448    
prefix caab    
prefix caaba    
Number of times getPermutations is run: 449    
prefix caabb    
Number of times getPermutations is run: 450    
prefix cab    
prefix caba    
prefix cabab    
Number of times getPermutations is run: 451    
prefix cabaa    
Number of times getPermutations is run: 452    
prefix cabb    
prefix cabba    
Number of times getPermutations is run: 453    
prefix cabba    
Number of times getPermutations is run: 454    
prefix caba    
prefix cabaa    
Number of times getPermutations is run: 455    
prefix cabab    
Number of times getPermutations is run: 456    
prefix cb    
prefix cba    
prefix cbab    
prefix cbaba    
Number of times getPermutations is run: 457    
prefix cbaba    
Number of times getPermutations is run: 458    
prefix cbaa    
prefix cbaab    
Number of times getPermutations is run: 459    
prefix cbaaa    
Number of times getPermutations is run: 460    
prefix cbaa    
prefix cbaab    
Number of times getPermutations is run: 461    
prefix cbaaa    
Number of times getPermutations is run: 462    
prefix cbb    
prefix cbba    
prefix cbbaa    
Number of times getPermutations is run: 463    
prefix cbbaa    
Number of times getPermutations is run: 464    
prefix cbba    
prefix cbbaa    
Number of times getPermutations is run: 465    
prefix cbbaa    
Number of times getPermutations is run: 466    
prefix cbba    
prefix cbbaa    
Number of times getPermutations is run: 467    
prefix cbbaa    
Number of times getPermutations is run: 468    
prefix cba    
prefix cbaa    
prefix cbaab    
Number of times getPermutations is run: 469    
prefix cbaaa    
Number of times getPermutations is run: 470    
prefix cbab    
prefix cbaba    
Number of times getPermutations is run: 471    
prefix cbaba    
Number of times getPermutations is run: 472    
prefix cbaa    
prefix cbaaa    
Number of times getPermutations is run: 473    
prefix cbaab    
Number of times getPermutations is run: 474    
prefix cba    
prefix cbaa    
prefix cbaab    
Number of times getPermutations is run: 475    
prefix cbaaa    
Number of times getPermutations is run: 476    
prefix cbab    
prefix cbaba    
Number of times getPermutations is run: 477    
prefix cbaba    
Number of times getPermutations is run: 478    
prefix cbaa    
prefix cbaaa    
Number of times getPermutations is run: 479    
prefix cbaab    
Number of times getPermutations is run: 480    
prefix a    
prefix aa    
prefix aab    
prefix aaba    
prefix aabac    
Number of times getPermutations is run: 481    
prefix aabab    
Number of times getPermutations is run: 482    
prefix aabc    
prefix aabca    
Number of times getPermutations is run: 483    
prefix aabcb    
Number of times getPermutations is run: 484    
prefix aabb    
prefix aabba    
Number of times getPermutations is run: 485    
prefix aabbc    
Number of times getPermutations is run: 486    
prefix aaa    
prefix aaab    
prefix aaabc    
Number of times getPermutations is run: 487    
prefix aaabb    
Number of times getPermutations is run: 488    
prefix aaac    
prefix aaacb    
Number of times getPermutations is run: 489    
prefix aaacb    
Number of times getPermutations is run: 490    
prefix aaab    
prefix aaabb    
Number of times getPermutations is run: 491    
prefix aaabc    
Number of times getPermutations is run: 492    
prefix aac    
prefix aacb    
prefix aacba    
Number of times getPermutations is run: 493    
prefix aacbb    
Number of times getPermutations is run: 494    
prefix aaca    
prefix aacab    
Number of times getPermutations is run: 495    
prefix aacab    
Number of times getPermutations is run: 496    
prefix aacb    
prefix aacbb    
Number of times getPermutations is run: 497    
prefix aacba    
Number of times getPermutations is run: 498    
prefix aab    
prefix aabb    
prefix aabba    
Number of times getPermutations is run: 499    
prefix aabbc    
Number of times getPermutations is run: 500    
```

```md
prix aaba    
prefix aabab    
Number of times getPermutations is run: 501    
prefix aabac    
Number of times getPermutations is run: 502    
prefix aabc    
prefix aabcb    
Number of times getPermutations is run: 503    
prefix aabca    
Number of times getPermutations is run: 504    
prefix ab    
prefix aba    
prefix abaa    
prefix abaac    
Number of times getPermutations is run: 505    
prefix abaab    
Number of times getPermutations is run: 506    
prefix abac    
prefix abaca    
Number of times getPermutations is run: 507    
prefix abacb    
Number of times getPermutations is run: 508    
prefix abab    
prefix ababa    
Number of times getPermutations is run: 509    
prefix ababc    
Number of times getPermutations is run: 510    
prefix aba    
prefix abaa    
prefix abaac    
Number of times getPermutations is run: 511    
prefix abaab    
Number of times getPermutations is run: 512    
prefix abac    
prefix abaca    
Number of times getPermutations is run: 513    
prefix abacb    
Number of times getPermutations is run: 514    
prefix abab    
prefix ababa    
Number of times getPermutations is run: 515    
prefix ababc    
Number of times getPermutations is run: 516    
prefix abc    
prefix abca    
prefix abcaa    
Number of times getPermutations is run: 517    
prefix abcab    
Number of times getPermutations is run: 518    
prefix abca    
prefix abcaa    
Number of times getPermutations is run: 519    
prefix abcab    
Number of times getPermutations is run: 520    
prefix abcb    
prefix abcba    
Number of times getPermutations is run: 521    
prefix abcba    
Number of times getPermutations is run: 522    
prefix abb    
prefix abba    
prefix abbaa    
Number of times getPermutations is run: 523    
prefix abbac    
Number of times getPermutations is run: 524    
prefix abba    
prefix abbaa    
Number of times getPermutations is run: 525    
prefix abbac    
Number of times getPermutations is run: 526    
prefix abbc    
prefix abbca    
Number of times getPermutations is run: 527    
prefix abbca    
Number of times getPermutations is run: 528    
prefix aa    
prefix aaa    
prefix aaab    
prefix aaabc    
Number of times getPermutations is run: 529    
prefix aaabb    
Number of times getPermutations is run: 530    
prefix aaac    
prefix aaacb    
Number of times getPermutations is run: 531    
prefix aaacb    
Number of times getPermutations is run: 532    
prefix aaab    
prefix aaabb    
Number of times getPermutations is run: 533    
prefix aaabc    
Number of times getPermutations is run: 534    
prefix aab    
prefix aaba    
prefix aabac    
Number of times getPermutations is run: 535    
prefix aabab    
Number of times getPermutations is run: 536    
prefix aabc    
prefix aabca    
Number of times getPermutations is run: 537    
prefix aabcb    
Number of times getPermutations is run: 538    
prefix aabb    
prefix aabba    
Number of times getPermutations is run: 539    
prefix aabbc    
Number of times getPermutations is run: 540    
prefix aac    
prefix aaca    
prefix aacab    
Number of times getPermutations is run: 541    
prefix aacab    
Number of times getPermutations is run: 542    
prefix aacb    
prefix aacba    
Number of times getPermutations is run: 543    
prefix aacbb    
Number of times getPermutations is run: 544    
prefix aacb    
prefix aacba    
Number of times getPermutations is run: 545    
prefix aacbb    
Number of times getPermutations is run: 546
prefix aab
prefix aaba
prefix aabab
Number of times getPermutations is run: 547
prefix aabac
Number of times getPermutations is run: 548
prefix aabb
prefix aabba
Number of times getPermutations is run: 549
prefix aabbc
Number of times getPermutations is run: 550
prefix aabc
prefix aabca
Number of times getPermutations is run: 551
prefix aabcb
Number of times getPermutations is run: 552
prefix ac
prefix aca
prefix acab
prefix acaba
Number of times getPermutations is run: 553
prefix acabb
Number of times getPermutations is run: 554
prefix acaa
prefix acaab
Number of times getPermutations is run: 555
prefix acaab
Number of times getPermutations is run: 556
prefix acab
prefix acabb
Number of times getPermutations is run: 557
prefix acaba
Number of times getPermutations is run: 558
prefix acb
prefix acba
prefix acbaa
Number of times getPermutations is run: 559
prefix acbab
Number of times getPermutations is run: 560
prefix acba
prefix acbaa

Number of times getPermutations is run: 561    
prefix acbab    
Number of times getPermutations is run: 562    
prefix acbb    
prefix acbba    
Number of times getPermutations is run: 563    
prefix acbba    
Number of times getPermutations is run: 564    
prefix aca    
prefix acaa    
prefix acaab    
Number of times getPermutations is run: 565    
prefix acaab    
Number of times getPermutations is run: 566    
prefix acab    
prefix acaba    
Number of times getPermutations is run: 567    
prefix acabb    
Number of times getPermutations is run: 568    
prefix acab    
prefix acaba    
Number of times getPermutations is run: 569    
prefix acabb    
Number of times getPermutations is run: 570    
prefix acb    
prefix acba    
prefix acbab    
Number of times getPermutations is run: 571    
prefix acbaa    
Number of times getPermutations is run: 572    
prefix acbb    
prefix acbba    
Number of times getPermutations is run: 573    
prefix acbba    
Number of times getPermutations is run: 574    
prefix acba    
prefix acbaa    
Number of times getPermutations is run: 575    
prefix acbab    
Number of times getPermutations is run: 576    
prefix ab    
prefix aba    
prefix abab    
prefix ababa    
Number of times getPermutations is run: 577    
prefix ababc    
Number of times getPermutations is run: 578    
prefix abaa    
prefix abaab    
Number of times getPermutations is run: 579    
prefix abaac    
Number of times getPermutations is run: 580    
prefix abac    
prefix abacb    
Number of times getPermutations is run: 581    
prefix abaca    
Number of times getPermutations is run: 582    
prefix abb    
prefix abba    
prefix abbaa    
Number of times getPermutations is run: 583    
prefix abbac    
Number of times getPermutations is run: 584    
prefix abba    
prefix abbaa    
Number of times getPermutations is run: 585    
prefix abbac    
Number of times getPermutations is run: 586    
prefix abbc    
prefix abbca    
Number of times getPermutations is run: 587    
prefix abbca    
Number of times getPermutations is run: 588    
prefix aba    
prefix abaa    
prefix abaab    
Number of times getPermutations is run: 589    
prefix abaac    
Number of times getPermutations is run: 590    
prefix abab    
prefix ababa    
Number of times getPermutations is run: 591    
prefix ababc    
Number of times getPermutations is run: 592    
prefix abac    
prefix abaca    
Number of times getPermutations is run: 593    
prefix abacb    
Number of times getPermutations is run: 594    
prefix abc    
prefix abca    
prefix abcab    
Number of times getPermutations is run: 595    
prefix abcaa    
Number of times getPermutations is run: 596    
prefix abcb    
prefix abcba    
Number of times getPermutations is run: 597    
prefix abcba    
Number of times getPermutations is run: 598    
prefix abca    
prefix abcaa    
Number of times getPermutations is run: 599    
prefix abcab    
Number of times getPermutations is run: 600    
```

```md
prix b    
prefix ba    
prefix bab    
prefix baba    
prefix babac    
Number of times getPermutations is run: 601    
prefix babaa    
Number of times getPermutations is run: 602    
prefix babc    
prefix babca    
Number of times getPermutations is run: 603    
prefix babca    
Number of times getPermutations is run: 604    
prefix baba    
prefix babaa    
Number of times getPermutations is run: 605    
prefix babac    
Number of times getPermutations is run: 606    
prefix baa    
prefix baab    
prefix baabc    
Number of times getPermutations is run: 607    
prefix baaba    
Number of times getPermutations is run: 608    
prefix baac    
prefix baacb    
Number of times getPermutations is run: 609    
prefix baaca    
Number of times getPermutations is run: 610    
prefix baaa    
prefix baaab    
Number of times getPermutations is run: 611    
prefix baaac    
Number of times getPermutations is run: 612    
prefix bac    
prefix bacb    
prefix bacba    
Number of times getPermutations is run: 613    
prefix bacba    
Number of times getPermutations is run: 614    
prefix baca    
prefix bacab    
Number of times getPermutations is run: 615    
prefix bacaa    
Number of times getPermutations is run: 616    
prefix baca    
prefix bacab    
Number of times getPermutations is run: 617    
prefix bacaa    
Number of times getPermutations is run: 618    
prefix baa    
prefix baab    
prefix baaba    
Number of times getPermutations is run: 619    
prefix baabc    
Number of times getPermutations is run: 620    
prefix baaa    
prefix baaab    
Number of times getPermutations is run: 621    
prefix baaac    
Number of times getPermutations is run: 622    
prefix baac    
prefix baacb    
Number of times getPermutations is run: 623    
prefix baaca    
Number of times getPermutations is run: 624    
prefix bb    
prefix bba    
prefix bbaa    
prefix bbaac    
Number of times getPermutations is run: 625    
prefix bbaaa    
Number of times getPermutations is run: 626    
prefix bbac    
prefix bbaca    
Number of times getPermutations is run: 627    
prefix bbaca    
Number of times getPermutations is run: 628    
prefix bbaa    
prefix bbaaa    
Number of times getPermutations is run: 629    
prefix bbaac    
Number of times getPermutations is run: 630    
prefix bba    
prefix bbaa    
prefix bbaac    
Number of times getPermutations is run: 631    
prefix bbaaa    
Number of times getPermutations is run: 632    
prefix bbac    
prefix bbaca    
Number of times getPermutations is run: 633    
prefix bbaca    
Number of times getPermutations is run: 634    
prefix bbaa    
prefix bbaaa    
Number of times getPermutations is run: 635    
prefix bbaac    
Number of times getPermutations is run: 636    
prefix bbc    
prefix bbca    
prefix bbcaa    
Number of times getPermutations is run: 637    
prefix bbcaa    
Number of times getPermutations is run: 638    
prefix bbca    
prefix bbcaa    
Number of times getPermutations is run: 639    
prefix bbcaa    
Number of times getPermutations is run: 640    
prefix bbca    
prefix bbcaa    
Number of times getPermutations is run: 641    
prefix bbcaa    
Number of times getPermutations is run: 642    
prefix bba    
prefix bbaa    
prefix bbaaa    
Number of times getPermutations is run: 643    
prefix bbaac    
Number of times getPermutations is run: 644    
prefix bbaa    
prefix bbaaa    
Number of times getPermutations is run: 645    
prefix bbaac    
Number of times getPermutations is run: 646    
prefix bbac    
prefix bbaca    
Number of times getPermutations is run: 647    
prefix bbaca    
Number of times getPermutations is run: 648    
prefix ba    
prefix baa    
prefix baab    
prefix baabc    
Number of times getPermutations is run: 649    
prefix baaba    
Number of times getPermutations is run: 650    
prefix baac    
prefix baacb    
Number of times getPermutations is run: 651    
prefix baaca    
Number of times getPermutations is run: 652    
prefix baaa    
prefix baaab    
Number of times getPermutations is run: 653    
prefix baaac    
Number of times getPermutations is run: 654    
prefix bab    
prefix baba    
prefix babac    
Number of times getPermutations is run: 655    
prefix babaa    
Number of times getPermutations is run: 656    
prefix babc    
prefix babca    
Number of times getPermutations is run: 657    
prefix babca    
Number of times getPermutations is run: 658    
prefix baba    
prefix babaa    
Number of times getPermutations is run: 659    
prefix babac    
Number of times getPermutations is run: 660    
prefix bac    
prefix baca    
prefix bacab    
Number of times getPermutations is run: 661    
prefix bacaa    
Number of times getPermutations is run: 662    
prefix bacb    
prefix bacba    
Number of times getPermutations is run: 663    
prefix bacba    
Number of times getPermutations is run: 664    
prefix baca    
prefix bacaa    
Number of times getPermutations is run: 665    
prefix bacab    
Number of times getPermutations is run: 666    
prefix baa    
prefix baaa    
prefix baaab    
Number of times getPermutations is run: 667    
prefix baaac    
Number of times getPermutations is run: 668    
prefix baab    
prefix baaba    
Number of times getPermutations is run: 669    
prefix baabc    
Number of times getPermutations is run: 670    
prefix baac    
prefix baaca    
Number of times getPermutations is run: 671    
prefix baacb    
Number of times getPermutations is run: 672    
prefix bc    
prefix bca    
prefix bcab    
prefix bcaba    
Number of times getPermutations is run: 673    
prefix bcaba    
Number of times getPermutations is run: 674    
prefix bcaa    
prefix bcaab    
Number of times getPermutations is run: 675    
prefix bcaaa    
Number of times getPermutations is run: 676    
prefix bcaa    
prefix bcaab    
Number of times getPermutations is run: 677    
prefix bcaaa    
Number of times getPermutations is run: 678    
prefix bcb    
prefix bcba    
prefix bcbaa    
Number of times getPermutations is run: 679    
prefix bcbaa    
Number of times getPermutations is run: 680    
prefix bcba    
prefix bcbaa    
Number of times getPermutations is run: 681    
prefix bcbaa    
Number of times getPermutations is run: 682    
prefix bcba    
prefix bcbaa    
Number of times getPermutations is run: 683    
prefix bcbaa    
Number of times getPermutations is run: 684    
prefix bca    
prefix bcaa    
prefix bcaab    
Number of times getPermutations is run: 685    
prefix bcaaa    
Number of times getPermutations is run: 686    
prefix bcab    
prefix bcaba    
Number of times getPermutations is run: 687    
prefix bcaba    
Number of times getPermutations is run: 688    
prefix bcaa    
prefix bcaaa    
Number of times getPermutations is run: 689    
prefix bcaab    
Number of times getPermutations is run: 690    
prefix bca    
prefix bcaa    
prefix bcaab    
Number of times getPermutations is run: 691    
prefix bcaaa    
Number of times getPermutations is run: 692    
prefix bcab    
prefix bcaba    
Number of times getPermutations is run: 693    
prefix bcaba    
Number of times getPermutations is run: 694    
prefix bcaa    
prefix bcaaa    
Number of times getPermutations is run: 695    
prefix bcaab    
Number of times getPermutations is run: 696    
prefix ba    
prefix baa    
prefix baab    
prefix baaba    
Number of times getPermutations is run: 697    
prefix baabc    
Number of times getPermutations is run: 698    
prefix baaa    
prefix baaab    
Number of times getPermutations is run: 699    
prefix baaac    
Number of times getPermutations is run: 700    
```

```md
prefix baac    
prefix baacb    
Number of times getPermutations is run: 701    
prefix baaca    
Number of times getPermutations is run: 702    
prefix bab    
prefix baba    
prefix babaa    
Number of times getPermutations is run: 703    
prefix babac    
Number of times getPermutations is run: 704    
prefix baba    
prefix babaa    
Number of times getPermutations is run: 705    
prefix babac    
Number of times getPermutations is run: 706    
prefix babc    
prefix babca    
Number of times getPermutations is run: 707    
prefix babca    
Number of times getPermutations is run: 708    
prefix baa    
prefix baaa    
prefix baaab    
Number of times getPermutations is run: 709    
prefix baaac    
Number of times getPermutations is run: 710    
prefix baab    
prefix baaba    
Number of times getPermutations is run: 711    
prefix baabc    
Number of times getPermutations is run: 712    
prefix baac    
prefix baaca    
Number of times getPermutations is run: 713    
prefix baacb    
Number of times getPermutations is run: 714    
prefix bac    
prefix baca    
prefix bacab    
Number of times getPermutations is run: 715    
prefix bacaa    
Number of times getPermutations is run: 716    
prefix bacb    
prefix bacba    
Number of times getPermutations is run: 717    
prefix bacba    
Number of times getPermutations is run: 718    
prefix baca    
prefix bacaa    
Number of times getPermutations is run: 719    
prefix bacab    
Number of times getPermutations is n: 720
```

```md 
    => [ 'abacab',    
    'abacba',    
    'abaacb',    
    'abaabc',    
    'ababca',    
    'ababac',    
    'abcaab',    
    'abcaba',    
    'abcaab',    
    'abcaba',    
    'abcbaa',    
    'abcbaa',    
    'abaacb',    
    'abaabc',    
    'abacab',    
    'abacba',    
    'ababac',    
    'ababca',    
    'abbaca',    
    'abbaac',    
    'abbcaa',    
    'abbcaa',    
    'abbaac',    
    'abbaca',    
    'aabcab',    
    'aabcba',    
    'aabacb',    
    'aababc',    
    'aabbca',    
    'aabbac',    
    'aacbab',    
    'aacbba',    
    'aacabb',    
    'aacabb',    
    'aacbba',    
    'aacbab',    
    'aaabcb',    
    'aaabbc',    
    'aaacbb',    
    'aaacbb',    
    'aaabbc',    
    'aaabcb',    
    'aabbca',    
    'aabbac',    
    'aabcba',    
    'aabcab',    
    'aababc',    
    'aabacb',    
    'acbaab',    
    'acbaba',    
    'acbaab',    
    'acbaba',    
    'acbbaa',    
    'acbbaa',    
    'acabab',    
    'acabba',    
    'acaabb',    
    'acaabb',    
    'acabba',    
    'acabab',    
    'acabab',    
    'acabba',    
    'acaabb',    
    'acaabb',    
    'acabba',    
    'acabab',    
    'acbbaa',    
    'acbbaa',    
    'acbaba',    
    'acbaab',    
    'acbaba',    
    'acbaab',    
    'aabacb',    
    'aababc',    
    'aabcab',    
    'aabcba',    
    'aabbac',    
    'aabbca',    
    'aaabcb',    
    'aaabbc',    
    'aaacbb',    
    'aaacbb',    
    'aaabbc',    
    'aaabcb',    
    'aacbab',    
    'aacbba',    
    'aacabb',    
    'aacabb',    
    'aacbba',    
    'aacbab',    
    'aabbac',    
    'aabbca',    
    'aababc',    
    'aabacb',    
    'aabcba',    
    'aabcab',    
    'abbaca',    
    'abbaac',    
    'abbcaa',    
    'abbcaa',    
    ... 620 more items ]
```

### BONUS - O(n) solution for nth Fibonacci with constant space

#### Function

```javascript{numberLines: true}
function fibDynamic(n) {
  console.count('Number of times fibDynamic is called');
  let minus1 = 1;
  let minus2 = 0;
  let next;
  if (n === 0) return 0;

  for (let i = 2; i < n; i++) {
    console.count('Number of value swaps in for loop')
    next = minus1 + minus2;
    minus2 = minus1;
    minus1 = next;
  }
  return minus1 + minus2;
}

console.log(fibDynamic(8))
```

#### Console Output

```html 

Number of times fibDynamic is called: 1
Number of value swaps in for loop: 1
Number of value swaps in for loop: 2
Number of value swaps in for loop: 3
Number of value swaps in for loop: 4
Number of value swaps in for loop: 5
Number of value swaps in for loop: 6
21
```

### Resources I've found helpful

- https://www.topcoder.com/blog/learning-understanding-big-o-notation/

- http://bigocheatsheet.com/

- https://www.daveperrett.com/articles/2010/12/07/comp-sci-101-big-o-notation/

- https://adrianmejia.com/blog/2018/04/05/most-popular-algorithms-time-complexity-every-programmer-should-know-free-online-tutorial-course/
