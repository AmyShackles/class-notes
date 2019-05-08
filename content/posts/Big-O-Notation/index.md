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

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;currentPosition 0 mid 50<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;currentPosition 50 mid 25<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;currentPosition 75 mid 12<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;currentPosition 87 mid 12<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;currentPosition 99 mid 6<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;=> { '# of loops in while': 5,<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  'list of positions': [ 0, 50, 75, 87, 99 ],<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  'size of input': 100,<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  'percentage of array input accessed': '5%' }


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

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;eversed e<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;reversed el<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count 2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;reversed elb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count 3<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;reversed elbb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count 4<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;reversed elbbo<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count 5<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;reversed elbbow<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count 6<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;reversed elbbowe<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count 7<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;reversed elbbowel<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count 8<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;reversed elbbowelb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count 9<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;reversed elbbowelbb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count 10<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;reversed elbbowelbbo<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count 11<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;reversed elbbowelbboW<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count 12<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;size of input 12<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;=> { '# of loops of i': 12, 'size of input': 12 }<br/>

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

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 1, 1 ] 		i 0 j 0<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 1, 2 ] 		i 0 j 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 1, 3 ] 		i 0 j 2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 1, 4 ] 		i 0 j 3<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 1, 5 ] 		i 0 j 4<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 1, 6 ] 		i 0 j 5<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 1, 7 ] 		i 0 j 6<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 1, 8 ] 		i 0 j 7<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 1, 9 ] 		i 0 j 8<br/>
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 2, 10 ] 	i 1 j 0<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 2, 11 ] 	i 1 j 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 2, 12 ] 	i 1 j 2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 2, 13 ] 	i 1 j 3<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 2, 14 ] 	i 1 j 4<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 2, 15 ] 	i 1 j 5<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 2, 16 ] 	i 1 j 6<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 2, 17 ] 	i 1 j 7<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 2, 18 ] 	i 1 j 8<br/>
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 3, 19 ] 	i 2 j 0<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 3, 20 ] 	i 2 j 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 3, 21 ] 	i 2 j 2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 3, 22 ] 	i 2 j 3<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 3, 23 ] 	i 2 j 4<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 3, 24 ] 	i 2 j 5<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 3, 25 ] 	i 2 j 6<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 3, 26 ] 	i 2 j 7<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 3, 27 ] 	i 2 j 8<br/>
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 4, 28 ] 	i 3 j 0<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 4, 29 ] 	i 3 j 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 4, 30 ] 	i 3 j 2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 4, 31 ] 	i 3 j 3<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 4, 32 ] 	i 3 j 4<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 4, 33 ] 	i 3 j 5<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 4, 34 ] 	i 3 j 6<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 4, 35 ] 	i 3 j 7<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 4, 36 ] 	i 3 j 8<br/>
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 5, 37 ] 	i 4 j 0<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 5, 38 ] 	i 4 j 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 5, 39 ] 	i 4 j 2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 5, 40 ] 	i 4 j 3<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 5, 41 ] 	i 4 j 4<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 5, 42 ] 	i 4 j 5<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 5, 43 ] 	i 4 j 6<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 5, 44 ] 	i 4 j 7<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 5, 45 ] 	i 4 j 8<br/>
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 6, 46 ] 	i 5 j 0<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 6, 47 ] 	i 5 j 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 6, 48 ] 	i 5 j 2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 6, 49 ] 	i 5 j 3<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 6, 50 ] 	i 5 j 4<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 6, 51 ] 	i 5 j 5<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 6, 52 ] 	i 5 j 6<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 6, 53 ] 	i 5 j 7<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 6, 54 ] 	i 5 j 8<br/>
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 7, 55 ] 	i 6 j 0<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 7, 56 ] 	i 6 j 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 7, 57 ] 	i 6 j 2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 7, 58 ] 	i 6 j 3<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 7, 59 ] 	i 6 j 4<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 7, 60 ] 	i 6 j 5<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 7, 61 ] 	i 6 j 6<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 7, 62 ] 	i 6 j 7<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 7, 63 ] 	i 6 j 8<br/>
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 8, 64 ] 	i 7 j 0<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 8, 65 ] 	i 7 j 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 8, 66 ] 	i 7 j 2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 8, 67 ] 	i 7 j 3<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 8, 68 ] 	i 7 j 4<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 8, 69 ] 	i 7 j 5<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 8, 70 ] 	i 7 j 6<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 8, 71 ] 	i 7 j 7<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 8, 72 ] 	i 7 j 8<br/>
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 9, 73 ] 	i 8 j 0<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 9, 74 ] 	i 8 j 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 9, 75 ] 	i 8 j 2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 9, 76 ] 	i 8 j 3<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 9, 77 ] 	i 8 j 4<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 9, 78 ] 	i 8 j 5<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 9, 79 ] 	i 8 j 6<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 9, 80 ] 	i 8 j 7<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 9, 81 ] 	i 8 j 8<br/>
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ '# of loops of i': 9,<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  '# of total loops': 81,<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  'size of input': 81 }<br/>


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

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count 36

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

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lengthOfInput: 10<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 3<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 4<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 5<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 6<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 7<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 8<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 9<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;right [ 12 ] left [ 1, 2, 5, 4, 3, 6, 8, 7 ]<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lengthOfInput: 10<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 3<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 4<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 5<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 6<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 7<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;right [ 8 ] left [ 1, 2, 5, 4, 3, 6 ]<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 3<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lengthOfInput: 10<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 3<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 4<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 5<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;right [] left [ 1, 2, 5, 4, 3 ]<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 4<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lengthOfInput: 10<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 3<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 4<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;right [ 5, 4 ] left [ 1, 2 ]<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 5<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lengthOfInput: 10<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;right [] left [ 1 ]<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 6<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 7<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 8<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lengthOfInput: 10<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;right [ 5 ] left []<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 9<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 10<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 11<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 12<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 13<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ 1, 2, 3, 4, 5, 6, 7, 8, 10, 12 ]<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lengthOfInput: 10<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 3<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 4<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 5<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 6<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 7<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 8<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 9<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;right [ 8, 9, 7 ] left [ 5, 2, 4, 5, 1, 3 ]<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Number of times quickSort is called: 2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lengthOfInput: 10<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 3<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 4<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 5<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;right [ 5, 4, 5 ] left [ 2, 1 ]<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 3<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lengthOfInput: 10<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;right [ 2 ] left []<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 4<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 5<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 6<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lengthOfInput: 10<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;right [ 5 ] left [ 4 ]<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 7<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 8<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 9<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lengthOfInput: 10<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;right [ 8, 9 ] left []<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 10<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 11<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lengthOfInput: 10<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;right [] left [ 8 ]<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 12<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 13<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ 1, 2, 3, 4, 5, 5, 6, 7, 8, 9 ]<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lengthOfInput: 10<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 3<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 4<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 5<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 6<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 7<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 8<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 9<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 10<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 11<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 12<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;right [] left [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lengthOfInput: 10<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 3<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 4<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 5<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 6<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 7<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 8<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 9<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 10<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 11<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;right [] left [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ]<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 3<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lengthOfInput: 10<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 3<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 4<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 5<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 6<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 7<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 8<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 9<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 10<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;right [] left [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 4<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lengthOfInput: 10<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 3<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 4<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 5<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 6<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 7<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 8<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 9<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;right [] left [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 5<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lengthOfInput: 10<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 3<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 4<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 5<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 6<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 7<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 8<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;right [] left [ 1, 2, 3, 4, 5, 6, 7, 8 ]<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 6<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lengthOfInput: 10<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 3<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 4<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 5<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 6<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 7<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;right [] left [ 1, 2, 3, 4, 5, 6, 7 ]<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 7<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lengthOfInput: 10<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 3<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 4<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 5<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 6<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;right [] left [ 1, 2, 3, 4, 5, 6 ]<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 8<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lengthOfInput: 10<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 3<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 4<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 5<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;right [] left [ 1, 2, 3, 4, 5 ]<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 9<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lengthOfInput: 10<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 3<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 4<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;right [] left [ 1, 2, 3, 4 ]<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 10<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lengthOfInput: 10<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 3<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;right [] left [ 1, 2, 3 ]<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 11<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lengthOfInput: 10<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;right [] left [ 1, 2 ]<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 12<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lengthOfInput: 10<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times an index is accessed in a for loop: 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;right [] left [ 1 ]<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 13<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 14<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 15<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 16<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 17<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 18<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 19<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 20<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 21<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 22<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 23<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 24<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of times quickSort is called: 25<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ]<br/>


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

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 1, 2 ] 		i 0 j 1    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 1, 3 ] 		i 0 j 2    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 1, 4 ] 		i 0 j 3    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 1, 5 ] 		i 0 j 4    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 1, 6 ] 		i 0 j 5    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 1, 7 ] 		i 0 j 6    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 1, 8 ] 		i 0 j 7    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; count [ 2, 9 ] 		i 1 j 0<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 2, 11 ] 	i 1 j 2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 2, 12 ] 	i 1 j 3<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 2, 13 ] 	i 1 j 4<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 2, 14 ] 	i 1 j 5<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 2, 15 ] 	i 1 j 6<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 2, 16 ] 	i 1 j 7<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 3, 17 ] 	i 2 j 0    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 3, 18 ] 	i 2 j 1    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 3, 20 ] 	i 2 j 3    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 3, 21 ] 	i 2 j 4    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 3, 22 ] 	i 2 j 5    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 3, 23 ] 	i 2 j 6    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 3, 24 ] 	i 2 j 7    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 4, 25 ] 	i 3 j 0<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 4, 26 ] 	i 3 j 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 4, 27 ] 	i 3 j 2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 4, 29 ] 	i 3 j 4<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 4, 30 ] 	i 3 j 5<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 4, 31 ] 	i 3 j 6<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 4, 32 ] 	i 3 j 7<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 5, 33 ] 	i 4 j 0    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 5, 34 ] 	i 4 j 1    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 5, 35 ] 	i 4 j 2    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 5, 36 ] 	i 4 j 3    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 5, 38 ] 	i 4 j 5    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 5, 39 ] 	i 4 j 6    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 5, 40 ] 	i 4 j 7    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 6, 41 ] 	i 5 j 0<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 6, 42 ] 	i 5 j 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 6, 43 ] 	i 5 j 2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 6, 44 ] 	i 5 j 3<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 6, 45 ] 	i 5 j 4<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 6, 47 ] 	i 5 j 6<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 6, 48 ] 	i 5 j 7<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 7, 49 ] 	i 6 j 0    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 7, 50 ] 	i 6 j 1    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 7, 51 ] 	i 6 j 2    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 7, 52 ] 	i 6 j 3    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 7, 53 ] 	i 6 j 4    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 7, 54 ] 	i 6 j 5    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 7, 56 ] 	i 6 j 7<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 8, 57 ] 	i 7 j 0    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 8, 58 ] 	i 7 j 1    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 8, 59 ] 	i 7 j 2    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 8, 60 ] 	i 7 j 3    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 8, 61 ] 	i 7 j 4    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 8, 62 ] 	i 7 j 5    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 8, 63 ] 	i 7 j 6    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ '# of i loops': 8,<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  '# of total loops': 64,<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  inputSize: 8,<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  inputSizeSquared: 64 <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 1, 2 ] 		i 0 j 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 1, 3 ] 		i 0 j 2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 1, 4 ] 		i 0 j 3<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 1, 5 ] 		i 0 j 4<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 1, 6 ] 		i 0 j 5<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 1, 7 ] 		i 0 j 6<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 1, 8 ] 		i 0 j 7<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 1, 9 ] 		i 0 j 8<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 2, 10 ] 	i 1 j 0    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 2, 12 ] 	i 1 j 2    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 2, 13 ] 	i 1 j 3    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 2, 14 ] 	i 1 j 4    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 2, 15 ] 	i 1 j 5    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 2, 16 ] 	i 1 j 6    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 2, 17 ] 	i 1 j 7    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 2, 18 ] 	i 1 j 8  <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 3, 19 ] 	i 2 j 0<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 3, 20 ] 	i 2 j 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 3, 22 ] 	i 2 j 3<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 3, 23 ] 	i 2 j 4<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 3, 24 ] 	i 2 j 5<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 3, 25 ] 	i 2 j 6<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 3, 26 ] 	i 2 j 7<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 3, 27 ] 	i 2 j 8<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 4, 28 ] 	i 3 j 0    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 4, 29 ] 	i 3 j 1    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 4, 30 ] 	i 3 j 2    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 4, 32 ] 	i 3 j 4    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 4, 33 ] 	i 3 j 5    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 4, 34 ] 	i 3 j 6    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 4, 35 ] 	i 3 j 7    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 4, 36 ] 	i 3 j 8   <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 5, 37 ] 	i 4 j 0<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 5, 38 ] 	i 4 j 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 5, 39 ] 	i 4 j 2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 5, 40 ] 	i 4 j 3<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 5, 42 ] 	i 4 j 5<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 5, 43 ] 	i 4 j 6<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 5, 44 ] 	i 4 j 7<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 5, 45 ] 	i 4 j 8<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 6, 46 ] 	i 5 j 0    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 6, 47 ] 	i 5 j 1    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 6, 48 ] 	i 5 j 2    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 6, 49 ] 	i 5 j 3    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 6, 50 ] 	i 5 j 4    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 6, 52 ] 	i 5 j 6    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 6, 53 ] 	i 5 j 7    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 6, 54 ] 	i 5 j 8    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 7, 55 ] 	i 6 j 0<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 7, 56 ] 	i 6 j 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 7, 57 ] 	i 6 j 2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 7, 58 ] 	i 6 j 3<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 7, 59 ] 	i 6 j 4<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 7, 60 ] 	i 6 j 5<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 7, 62 ] 	i 6 j 7<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 7, 63 ] 	i 6 j 8<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 8, 64 ] 	i 7 j 0    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 8, 65 ] 	i 7 j 1    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 8, 66 ] 	i 7 j 2    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 8, 67 ] 	i 7 j 3    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 8, 68 ] 	i 7 j 4    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 8, 69 ] 	i 7 j 5    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 8, 70 ] 	i 7 j 6    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 8, 72 ] 	i 7 j 8    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 9, 73 ] 	i 8 j 0<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 9, 74 ] 	i 8 j 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 9, 75 ] 	i 8 j 2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 9, 76 ] 	i 8 j 3<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 9, 77 ] 	i 8 j 4<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 9, 78 ] 	i 8 j 5<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 9, 79 ] 	i 8 j 6<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count [ 9, 80 ] 	i 8 j 7<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ '# of i loops': 9,<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  '# of total loops': 8<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  inputSize: 9,<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  inputzeSquared: 81 <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>


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
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fib(5)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fib(4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fib(3)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fib(3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fib(2)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fib(2)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fib(1)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1<br/> 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fib(2)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fib(1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fib(1)&nbsp;&nbsp;&nbsp;&nbsp;fib(0)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fib(1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fib(0)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br/>&nbsp;&nbsp;&nbsp;&nbsp;fib(1)&nbsp;&nbsp;&nbsp;&nbsp;fib(0)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br/>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0
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

<pre>
&nbsp;&nbsp;&nbsp;&nbsp;    fibonacci(7)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;        fibonacci(5)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;            fibonacci(3)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                fibonacci(1)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                fibonacci(2)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                    fibonacci(0)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                    fibonacci(1)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;            fibonacci(4)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                fibonacci(2)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                    fibonacci(0)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                    fibonacci(1)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                fibonacci(3)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                    fibonacci(1)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                    fibonacci(2)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                        fibonacci(0)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                        fibonacci(1)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;        fibonacci(6)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;            fibonacci(4)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                fibonacci(2)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                    fibonacci(0)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                    fibonacci(1)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                fibonacci(3)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                    fibonacci(1)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                    fibonacci(2)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                        fibonacci(0)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                        fibonacci(1)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;            fibonacci(5)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                fibonacci(3)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                    fibonacci(1)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                    fibonacci(2)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                        fibonacci(0)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                        fibonacci(1)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                fibonacci(4)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                    fibonacci(2)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                        fibonacci(0)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                        fibonacci(1)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                    fibonacci(3)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                        fibonacci(1)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                        fibonacci(2)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                            fibonacci(0)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                            fibonacci(1)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;    { n: 7, answer: 21, '# of calls': 41 }<br/>
&nbsp;&nbsp;&nbsp;&nbsp;    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;    fibonacci(8)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;        fibonacci(6)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;            fibonacci(4)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                fibonacci(2)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                    fibonacci(0)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                    fibonacci(1)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                fibonacci(3)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                    fibonacci(1)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                    fibonacci(2)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                        fibonacci(0)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                        fibonacci(1)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;            fibonacci(5)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                fibonacci(3)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                    fibonacci(1)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                    fibonacci(2)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                        fibonacci(0)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                        fibonacci(1)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                fibonacci(4)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                    fibonacci(2)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                        fibonacci(0)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                        fibonacci(1)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                    fibonacci(3)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                        fibonacci(1)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                        fibonacci(2)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                            fibonacci(0)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                            fibonacci(1)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;        fibonacci(7)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;            fibonacci(5)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                fibonacci(3)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                    fibonacci(1)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                    fibonacci(2)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                        fibonacci(0)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                        fibonacci(1)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                fibonacci(4)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                    fibonacci(2)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                        fibonacci(0)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                        fibonacci(1)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                    fibonacci(3)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                        fibonacci(1)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                        fibonacci(2)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                            fibonacci(0)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                            fibonacci(1)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;            fibonacci(6)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                fibonacci(4)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                    fibonacci(2)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                        fibonacci(0)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                        fibonacci(1)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                    fibonacci(3)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                        fibonacci(1)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                        fibonacci(2)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                            fibonacci(0)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                            fibonacci(1)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                fibonacci(5)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                    fibonacci(3)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                        fibonacci(1)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                        fibonacci(2)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                            fibonacci(0)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                            fibonacci(1)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                    fibonacci(4)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                        fibonacci(2)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                            fibonacci(0)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                            fibonacci(1)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                        fibonacci(3)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                            fibonacci(1)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                            fibonacci(2)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                                fibonacci(0)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;                                fibonacci(1)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;    { n: 8, answer: 34, '# of calls': 67 }<br/>
&nbsp;&nbsp;&nbsp;&nbsp;    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;<br/>
</pre>

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
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix a<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix ab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abac<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaca<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abacb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaa<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaac<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 3<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 4<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababc<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 5<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababa<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 6<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abc<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abca<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcaa<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 7<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 8<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abca<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcaa<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 9<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 10<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 11<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 12<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaa<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaac<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 13<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 14<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abac<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaca<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 15<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abacb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 16<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababa<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 17<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababc<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 18<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbac<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 19<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbaa<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 20<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbc<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbca<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 21<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbca<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 22<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbaa<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 23<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbac<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 24<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aa<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabc<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabca<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 25<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabcb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 26<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabac<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 27<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 28<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabbc<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 29<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 30<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aac<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 31<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacbb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 32<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaca<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 33<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 34<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacbb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 35<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 36<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaa<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabc<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 37<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 38<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaac<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaacb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 39<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaacb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 40<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 41<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabc<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 42<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabbc<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 43<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 44<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabc<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabcb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 45<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabca<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 46<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 47<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabac<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 48<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix ac<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbaa<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 49<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 50<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbaa<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 51<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 52<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 53<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 54<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aca<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 55<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acabb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 56<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaa<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 57<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 58<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acabb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 59<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 60<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aca<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 61<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acabb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 62<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaa<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 63<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 64<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acabb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 65<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 66<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 67<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 68<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 69<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbaa<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 70<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 71<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbaa<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 72<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aa<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabac<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 73<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 74<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabc<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabca<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 75<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabcb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 76<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 77<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabbc<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 78<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaa<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabc<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 79<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 80<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaac<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaacb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 81<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaacb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 82<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 83<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabc<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 84<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aac<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 85<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacbb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 86<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaca<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 87<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 88<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacbb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 89<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 90<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 91<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabbc<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 92<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 93<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabac<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 94<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabc<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabcb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 95<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabca<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 96<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix ab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbac<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 97<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbaa<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 98<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbc<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbca<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 99<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbca<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 100<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbaa<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 101<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbac<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 102<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababc<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 103<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababa<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 104<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abac<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abacb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 105<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaca<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 106<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaa<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 107<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaac<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 108<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abc<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 109<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 110<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abca<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 111<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcaa<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 112<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abca<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 113<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcaa<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 114<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababa<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 115<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababc<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 116<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaa<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 117<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaac<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 118<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abac<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abacb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 119<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaca<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 120<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix b<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix ba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baa<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baac<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaca<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 121<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baacb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 122<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaa<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaac<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 123<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 124<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baabc<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 125<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 126<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bac<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baca<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacaa<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 127<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 128<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baca<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacaa<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 129<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 130<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 131<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 132<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baa<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaa<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaac<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 133<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 134<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baac<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaca<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 135<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baacb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 136<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 137<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baabc<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 138<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix babac<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 139<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix babaa<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 140<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix babc<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix babca<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 141<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix babca<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 142<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix babaa<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 143<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix babac<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 144<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix ba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 145    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baacb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 146    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 147    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 148    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baabc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 149    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 150    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 151    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 152    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 153    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 154    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 155    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 156    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 157    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 158    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 159    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baacb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 160    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 161    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baabc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 162    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix babac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 163    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix babaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 164    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix babc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix babca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 165    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix babca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 166    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix babaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 167    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix babac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 168    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 169    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 170    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 171    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 172    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 173    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 174    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 175    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 176    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 177    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 178    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 179    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 180    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 181    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 182    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 183    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 184    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 185    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 186    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 187    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 188    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 189    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 190    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 191    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 192    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix ba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 193    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 194    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 195    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baacb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 196    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 197    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baabc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 198    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 199    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 200    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 201    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baacb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 202    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 203    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baabc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 204    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 205    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 206    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 207    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 208    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 209    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 210    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix babaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 211    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix babac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 212    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix babaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 213    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix babac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 214    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix babc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix babca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 215    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix babca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 216    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 217    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 218    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 219    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 220    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 221    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 222    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 223    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 224    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 225    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 226    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 227    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 228    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbcaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 229    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbcaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 230    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbcaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 231    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbcaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 232    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbcaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 233    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbcaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 234    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 235    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 236    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 237    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 238    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 239    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 240    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix a    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 241    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabcb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 242    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 243    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 244    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabbc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 245    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 246    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 247    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacbb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 248    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 249    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 250    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacbb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 251    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 252    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 253    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 254    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaacb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 255    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaacb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 256    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 257    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 258    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabbc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 259    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 260    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabcb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 261    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 262    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 263    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 264    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix ab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 265    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abacb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 266    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 267    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 268    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 269    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 270    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 271    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 272    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 273    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 274    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 275    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 276    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 277    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 278    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 279    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abacb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 280    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 281    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 282    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 283    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 284    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 285    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 286    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 287    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 288    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix ac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 289    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acabb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 290    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 291    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 292    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acabb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 293    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 294    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 295    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 296    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 297    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 298    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 299    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 300    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 301    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 302    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 303    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acabb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 304    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 305    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acabb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 306    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 307    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 308    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 309    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 310    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 311    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 312    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 313    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 314    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaacb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 315    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaacb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 316    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 317    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 318    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 319    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 320    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 321    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabcb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 322    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 323    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabbc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 324    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 325    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 326    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 327    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacbb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 328    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 329    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacbb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 330    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 331    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 332    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 333    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabbc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 334    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 335    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabcb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 336    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix ab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 337    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 338    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abacb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 339    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 340    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 341    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 342    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 343    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 344    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 345    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 346    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 347    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 348    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 349    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 350    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 351    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 352    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 353    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 354    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 355    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 356    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 357    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 358    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 359    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abacb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 360    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix c    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix ca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 361    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 362    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 363    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 364    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 365    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 366    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 367    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caabb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 368    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 369    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 370    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caabb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 371    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 372    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 373    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caabb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 374    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 375    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 376    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caabb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 377    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 378    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 379    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 380    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 381    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 382    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 383    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 384    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 385    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 386    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 387    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 388    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 389    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 390    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 391    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 392    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 393    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 394    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 395    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 396    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 397    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 398    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 399    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 400    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 401    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 402    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 403    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 404    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 405    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 406    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 407    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 408    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix ca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 409    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caabb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 410    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 411    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 412    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caabb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 413    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 414    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 415    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 416    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 417    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 418    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 419    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 420    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 421    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 422    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 423    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caabb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 424    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 425    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caabb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 426    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 427    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 428    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 429    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 430    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 431    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 432    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix ca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 433    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caabb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 434    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 435    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 436    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caabb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 437    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 438    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 439    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 440    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 441    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 442    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 443    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 444    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 445    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 446    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 447    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caabb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 448    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 449    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caabb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 450    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 451    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 452    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 453    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 454    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix caba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 455    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 456    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 457    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 458    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 459    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 460    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 461    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 462    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 463    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 464    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 465    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 466    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 467    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 468    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 469    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 470    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 471    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 472    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 473    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 474    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 475    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 476    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 477    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 478    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 479    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 480    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix a    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 481    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 482    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 483    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabcb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 484    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 485    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabbc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 486    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 487    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 488    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaacb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 489    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaacb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 490    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 491    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 492    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 493    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacbb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 494    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 495    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 496    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacbb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 497    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 498    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 499    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabbc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 500    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 501    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 502    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabcb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 503    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 504    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix ab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 505    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 506    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 507    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abacb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 508    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 509    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 510    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 511    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 512    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 513    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abacb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 514    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 515    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 516    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 517    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 518    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 519    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 520    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 521    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 522    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 523    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 524    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 525    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 526    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 527    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 528    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 529    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 530    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaacb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 531    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaacb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 532    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 533    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 534    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 535    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 536    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 537    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabcb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 538    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 539    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabbc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 540    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 541    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 542    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 543    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacbb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 544    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 545    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacbb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 546<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 547<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabac<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 548<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 549<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabbc<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 550<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabc<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabca<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 551<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabcb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 552<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix ac<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aca<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 553<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acabb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 554<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaa<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 555<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 556<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acabb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 557<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 558<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acb<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbaa<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 559<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbab<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 560<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acba<br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbaa<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 561    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 562    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 563    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 564    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 565    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 566    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 567    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acabb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 568    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 569    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acabb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 570    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 571    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 572    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 573    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 574    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 575    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 576    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix ab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 577    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 578    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 579    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 580    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abacb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 581    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 582    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 583    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 584    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 585    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 586    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 587    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 588    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix aba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 589    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 590    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 591    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 592    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 593    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abacb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 594    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 595    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 596    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 597    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 598    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 599    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 600    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix b    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix ba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix babac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 601    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix babaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 602    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix babc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix babca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 603    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix babca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 604    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix babaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 605    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix babac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 606    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baabc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 607    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 608    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baacb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 609    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 610    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 611    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 612    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 613    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 614    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 615    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 616    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 617    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 618    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 619    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baabc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 620    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 621    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 622    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baacb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 623    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 624    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 625    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 626    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 627    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 628    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 629    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 630    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 631    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 632    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 633    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 634    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 635    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 636    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbcaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 637    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbcaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 638    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbcaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 639    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbcaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 640    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbcaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 641    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbcaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 642    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 643    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 644    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 645    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 646    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 647    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 648    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix ba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baabc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 649    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 650    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baacb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 651    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 652    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 653    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 654    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix babac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 655    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix babaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 656    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix babc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix babca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 657    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix babca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 658    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix babaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 659    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix babac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 660    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 661    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 662    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 663    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 664    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 665    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 666    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 667    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 668    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 669    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baabc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 670    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 671    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baacb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 672    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 673    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 674    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 675    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 676    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 677    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 678    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 679    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 680    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 681    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 682    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 683    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcbaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 684    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 685    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 686    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 687    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 688    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 689    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 690    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 691    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 692    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 693    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 694    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 695    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 696    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix ba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 697    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baabc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 698    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 699    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 700    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baacb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 701    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 702    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix babaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 703    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix babac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 704    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix babaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 705    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix babac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 706    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix babc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix babca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 707    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix babca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 708    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 709    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 710    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 711    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baabc    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 712    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 713    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baacb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 714    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bac    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 715    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 716    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacb    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 717    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacba    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 718    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix baca    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacaa    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 719    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacab    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 720    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;=> [ 'abacab',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'abacba',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'abaacb',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'abaabc',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'ababca',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'ababac',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'abcaab',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'abcaba',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'abcaab',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'abcaba',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'abcbaa',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'abcbaa',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'abaacb',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'abaabc',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'abacab',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'abacba',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'ababac',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'ababca',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'abbaca',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'abbaac',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'abbcaa',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'abbcaa',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'abbaac',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'abbaca',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aabcab',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aabcba',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aabacb',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aababc',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aabbca',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aabbac',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aacbab',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aacbba',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aacabb',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aacabb',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aacbba',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aacbab',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aaabcb',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aaabbc',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aaacbb',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aaacbb',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aaabbc',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aaabcb',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aabbca',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aabbac',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aabcba',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aabcab',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aababc',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aabacb',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'acbaab',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'acbaba',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'acbaab',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'acbaba',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'acbbaa',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'acbbaa',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'acabab',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'acabba',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'acaabb',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'acaabb',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'acabba',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'acabab',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'acabab',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'acabba',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'acaabb',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'acaabb',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'acabba',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'acabab',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'acbbaa',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'acbbaa',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'acbaba',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'acbaab',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'acbaba',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'acbaab',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aabacb',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aababc',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aabcab',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aabcba',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aabbac',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aabbca',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aaabcb',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aaabbc',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aaacbb',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aaacbb',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aaabbc',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aaabcb',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aacbab',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aacbba',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aacabb',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aacabb',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aacbba',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aacbab',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aabbac',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aabbca',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aababc',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aabacb',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aabcba',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'aabcab',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'abbaca',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'abbaac',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'abbcaa',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;'abbcaa',    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;... 620 more items ]<br/>


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

&nbsp;&nbsp;&nbsp;&nbsp;Number of times fibDynamic is called: 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of value swaps in for loop: 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of value swaps in for loop: 2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of value swaps in for loop: 3<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of value swaps in for loop: 4<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of value swaps in for loop: 5<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Number of value swaps in for loop: 6<br/>
&nbsp;&nbsp;&nbsp;&nbsp;21<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<br/>

### Resources I've found helpful

- https://www.topcoder.com/blog/learning-understanding-big-o-notation/

- http://bigocheatsheet.com/

- https://www.daveperrett.com/articles/2010/12/07/comp-sci-101-big-o-notation/

- https://adrianmejia.com/blog/2018/04/05/most-popular-algorithms-time-complexity-every-programmer-should-know-free-online-tutorial-course/
