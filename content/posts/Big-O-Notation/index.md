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

### Another O(c^n) example

Recursive fibonacci exmaple:

In order to compute fib(5), a tree 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fib(5)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fib(4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fib(3)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fib(3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fib(2)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fib(2)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fib(1)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1<br/> 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fib(2)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fib(1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fib(1)&nbsp;&nbsp;&nbsp;&nbsp;fib(0)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fib(1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fib(0)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br/>&nbsp;&nbsp;&nbsp;&nbsp;fib(1)&nbsp;&nbsp;&nbsp;&nbsp;fib(0)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br/>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0
    


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

&nbsp;&nbsp;&nbsp;&nbsp;prefix 
&nbsp;&nbsp;&nbsp;&nbsp;prefix a
&nbsp;&nbsp;&nbsp;&nbsp;prefix ab
&nbsp;&nbsp;&nbsp;&nbsp;prefix aba
&nbsp;&nbsp;&nbsp;&nbsp;prefix abac
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaca
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 1
&nbsp;&nbsp;&nbsp;&nbsp;prefix abacb
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 2
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaa
&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaac
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 3
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaab
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 4
&nbsp;&nbsp;&nbsp;&nbsp;prefix abab
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababc
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 5
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababa
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 6
&nbsp;&nbsp;&nbsp;&nbsp;prefix abc
&nbsp;&nbsp;&nbsp;&nbsp;prefix abca
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcaa
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 7
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcab
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 8
&nbsp;&nbsp;&nbsp;&nbsp;prefix abca
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcaa
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 9
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcab
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 10
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcb
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcba
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 11
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcba
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 12
&nbsp;&nbsp;&nbsp;&nbsp;prefix aba
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaa
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaac
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 13
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaab
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 14
&nbsp;&nbsp;&nbsp;&nbsp;prefix abac
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaca
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 15
&nbsp;&nbsp;&nbsp;&nbsp;prefix abacb
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 16
&nbsp;&nbsp;&nbsp;&nbsp;prefix abab
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababa
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 17
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababc
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 18
&nbsp;&nbsp;&nbsp;&nbsp;prefix abb
&nbsp;&nbsp;&nbsp;&nbsp;prefix abba
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbac
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 19
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbaa
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 20
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbc
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbca
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 21
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbca
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 22
&nbsp;&nbsp;&nbsp;&nbsp;prefix abba
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbaa
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 23
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbac
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 24
&nbsp;&nbsp;&nbsp;&nbsp;prefix aa
&nbsp;&nbsp;&nbsp;&nbsp;prefix aab
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabc
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabca
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 25
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabcb
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 26
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaba
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabac
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 27
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabab
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 28
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabb
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabbc
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 29
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabba
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 30
&nbsp;&nbsp;&nbsp;&nbsp;prefix aac
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacb
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacba
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 31
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacbb
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 32
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaca
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacab
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 33
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacab
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 34
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacb
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacbb
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 35
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacba
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 36
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaa
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaab
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabc
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 37
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabb
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 38
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaac
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaacb
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 39
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaacb
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 40
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaab
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabb
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 41
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabc
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 42
&nbsp;&nbsp;&nbsp;&nbsp;prefix aab
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabb
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabbc
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 43
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabba
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 44
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabc
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabcb
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 45
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabca
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 46
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaba
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabab
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 47
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabac
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 48
&nbsp;&nbsp;&nbsp;&nbsp;prefix ac
&nbsp;&nbsp;&nbsp;&nbsp;prefix acb
&nbsp;&nbsp;&nbsp;&nbsp;prefix acba
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbaa
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 49
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbab
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 50
&nbsp;&nbsp;&nbsp;&nbsp;prefix acba
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbaa
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 51
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbab
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 52
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbb
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbba
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 53
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbba
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 54
&nbsp;&nbsp;&nbsp;&nbsp;prefix aca
&nbsp;&nbsp;&nbsp;&nbsp;prefix acab
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaba
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 55
&nbsp;&nbsp;&nbsp;&nbsp;prefix acabb
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 56
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaa
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaab
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 57
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaab
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 58
&nbsp;&nbsp;&nbsp;&nbsp;prefix acab
&nbsp;&nbsp;&nbsp;&nbsp;prefix acabb
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 59
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaba
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 60
&nbsp;&nbsp;&nbsp;&nbsp;prefix aca
&nbsp;&nbsp;&nbsp;&nbsp;prefix acab
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaba
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 61
&nbsp;&nbsp;&nbsp;&nbsp;prefix acabb
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 62
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaa
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaab
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 63
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaab
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 64
&nbsp;&nbsp;&nbsp;&nbsp;prefix acab
&nbsp;&nbsp;&nbsp;&nbsp;prefix acabb
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 65
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaba
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 66
&nbsp;&nbsp;&nbsp;&nbsp;prefix acb
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbb
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbba
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 67
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbba
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 68
&nbsp;&nbsp;&nbsp;&nbsp;prefix acba
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbab
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 69
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbaa
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 70
&nbsp;&nbsp;&nbsp;&nbsp;prefix acba
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbab
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 71
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbaa
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 72
&nbsp;&nbsp;&nbsp;&nbsp;prefix aa
&nbsp;&nbsp;&nbsp;&nbsp;prefix aab
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaba
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabac
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 73
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabab
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 74
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabc
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabca
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 75
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabcb
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 76
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabb
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabba
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 77
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabbc
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 78
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaa
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaab
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabc
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 79
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabb
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 80
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaac
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaacb
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 81
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaacb
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 82
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaab
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabb
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 83
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabc
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 84
&nbsp;&nbsp;&nbsp;&nbsp;prefix aac
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacb
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacba
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 85
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacbb
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 86
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaca
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacab
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 87
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacab
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 88
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacb
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacbb
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 89
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacba
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 90
&nbsp;&nbsp;&nbsp;&nbsp;prefix aab
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabb
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabba
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 91
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabbc
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 92
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaba
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabab
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 93
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabac
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 94
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabc
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabcb
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 95
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabca
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 96
&nbsp;&nbsp;&nbsp;&nbsp;prefix ab
&nbsp;&nbsp;&nbsp;&nbsp;prefix abb
&nbsp;&nbsp;&nbsp;&nbsp;prefix abba
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbac
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 97
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbaa
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 98
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbc
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbca
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 99
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbca
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 100
&nbsp;&nbsp;&nbsp;&nbsp;prefix abba
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbaa
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 101
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbac
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 102
&nbsp;&nbsp;&nbsp;&nbsp;prefix aba
&nbsp;&nbsp;&nbsp;&nbsp;prefix abab
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababc
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 103
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababa
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 104
&nbsp;&nbsp;&nbsp;&nbsp;prefix abac
&nbsp;&nbsp;&nbsp;&nbsp;prefix abacb
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 105
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaca
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 106
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaa
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaab
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 107
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaac
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 108
&nbsp;&nbsp;&nbsp;&nbsp;prefix abc
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcb
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcba
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 109
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcba
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 110
&nbsp;&nbsp;&nbsp;&nbsp;prefix abca
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcab
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 111
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcaa
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 112
&nbsp;&nbsp;&nbsp;&nbsp;prefix abca
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcab
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 113
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcaa
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 114
&nbsp;&nbsp;&nbsp;&nbsp;prefix aba
&nbsp;&nbsp;&nbsp;&nbsp;prefix abab
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababa
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 115
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababc
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 116
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaa
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaab
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 117
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaac
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 118
&nbsp;&nbsp;&nbsp;&nbsp;prefix abac
&nbsp;&nbsp;&nbsp;&nbsp;prefix abacb
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 119
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaca
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 120
&nbsp;&nbsp;&nbsp;&nbsp;prefix b
&nbsp;&nbsp;&nbsp;&nbsp;prefix ba
&nbsp;&nbsp;&nbsp;&nbsp;prefix baa
&nbsp;&nbsp;&nbsp;&nbsp;prefix baac
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaca
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 121
&nbsp;&nbsp;&nbsp;&nbsp;prefix baacb
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 122
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaa
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaac
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 123
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaab
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 124
&nbsp;&nbsp;&nbsp;&nbsp;prefix baab
&nbsp;&nbsp;&nbsp;&nbsp;prefix baabc
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 125
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaba
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 126
&nbsp;&nbsp;&nbsp;&nbsp;prefix bac
&nbsp;&nbsp;&nbsp;&nbsp;prefix baca
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacaa
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 127
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacab
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 128
&nbsp;&nbsp;&nbsp;&nbsp;prefix baca
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacaa
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 129
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacab
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 130
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacb
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacba
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 131
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacba
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 132
&nbsp;&nbsp;&nbsp;&nbsp;prefix baa
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaa
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaac
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 133
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaab
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 134
&nbsp;&nbsp;&nbsp;&nbsp;prefix baac
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaca
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 135
&nbsp;&nbsp;&nbsp;&nbsp;prefix baacb
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 136
&nbsp;&nbsp;&nbsp;&nbsp;prefix baab
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaba
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 137
&nbsp;&nbsp;&nbsp;&nbsp;prefix baabc
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 138
&nbsp;&nbsp;&nbsp;&nbsp;prefix bab
&nbsp;&nbsp;&nbsp;&nbsp;prefix baba
&nbsp;&nbsp;&nbsp;&nbsp;prefix babac
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 139
&nbsp;&nbsp;&nbsp;&nbsp;prefix babaa
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 140
&nbsp;&nbsp;&nbsp;&nbsp;prefix babc
&nbsp;&nbsp;&nbsp;&nbsp;prefix babca
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 141
&nbsp;&nbsp;&nbsp;&nbsp;prefix babca
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 142
&nbsp;&nbsp;&nbsp;&nbsp;prefix baba
&nbsp;&nbsp;&nbsp;&nbsp;prefix babaa
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 143
&nbsp;&nbsp;&nbsp;&nbsp;prefix babac
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 144
&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;prefix ba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baac    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 145    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baacb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 146    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 147    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 148    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baabc    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 149    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 150    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bac    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baca    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 151    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 152    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baca    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 153    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 154    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 155    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 156    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 157    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 158    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baac    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 159    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baacb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 160    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 161    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baabc    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 162    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix babac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 163    
&nbsp;&nbsp;&nbsp;&nbsp;prefix babaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 164    
&nbsp;&nbsp;&nbsp;&nbsp;prefix babc    
&nbsp;&nbsp;&nbsp;&nbsp;prefix babca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 165    
&nbsp;&nbsp;&nbsp;&nbsp;prefix babca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 166    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix babaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 167    
&nbsp;&nbsp;&nbsp;&nbsp;prefix babac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 168    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bc    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bca    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 169    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 170    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 171    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 172    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 173    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 174    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bca    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 175    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 176    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 177    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 178    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 179    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 180    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bca    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 181    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 182    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 183    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 184    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 185    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 186    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcbaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 187    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcbaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 188    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcbaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 189    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcbaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 190    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcbaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 191    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcbaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 192    
&nbsp;&nbsp;&nbsp;&nbsp;prefix ba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 193    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 194    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baac    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 195    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baacb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 196    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 197    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baabc    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 198    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 199    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 200    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baac    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 201    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baacb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 202    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 203    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baabc    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 204    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bac    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baca    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 205    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 206    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baca    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 207    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 208    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 209    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 210    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix babaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 211    
&nbsp;&nbsp;&nbsp;&nbsp;prefix babac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 212    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix babaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 213    
&nbsp;&nbsp;&nbsp;&nbsp;prefix babac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 214    
&nbsp;&nbsp;&nbsp;&nbsp;prefix babc    
&nbsp;&nbsp;&nbsp;&nbsp;prefix babca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 215    
&nbsp;&nbsp;&nbsp;&nbsp;prefix babca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 216    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 217    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 218    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbac    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 219    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 220    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 221    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 222    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 223    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 224    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbac    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 225    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 226    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 227    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 228    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbc    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbca    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbcaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 229    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbcaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 230    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbca    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbcaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 231    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbcaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 232    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbca    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbcaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 233    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbcaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 234    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 235    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 236    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 237    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 238    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbac    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 239    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 240    
&nbsp;&nbsp;&nbsp;&nbsp;prefix a    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabc    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 241    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabcb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 242    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 243    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 244    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabbc    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 245    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 246    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aac    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 247    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacbb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 248    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaca    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 249    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 250    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacbb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 251    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 252    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabc    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 253    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 254    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaac    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaacb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 255    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaacb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 256    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 257    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabc    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 258    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabbc    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 259    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 260    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabc    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabcb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 261    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 262    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 263    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 264    
&nbsp;&nbsp;&nbsp;&nbsp;prefix ab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abac    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 265    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abacb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 266    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 267    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 268    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababc    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 269    
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 270    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abc    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abca    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 271    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 272    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abca    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 273    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 274    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 275    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 276    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 277    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 278    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abac    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 279    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abacb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 280    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 281    
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababc    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 282    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 283    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 284    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbc    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 285    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 286    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 287    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 288    
&nbsp;&nbsp;&nbsp;&nbsp;prefix ac    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aca    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 289    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acabb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 290    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 291    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 292    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acabb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 293    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 294    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 295    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 296    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 297    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 298    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 299    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 300    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aca    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 301    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 302    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 303    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acabb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 304    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 305    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acabb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 306    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 307    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 308    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 309    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 310    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 311    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 312    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabc    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 313    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 314    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaac    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaacb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 315    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaacb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 316    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 317    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabc    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 318    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 319    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 320    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabc    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 321    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabcb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 322    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 323    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabbc    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 324    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aac    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaca    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 325    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 326    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 327    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacbb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 328    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 329    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacbb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 330    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 331    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 332    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 333    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabbc    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 334    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabc    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 335    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabcb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 336    
&nbsp;&nbsp;&nbsp;&nbsp;prefix ab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababc    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 337    
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 338    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abac    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abacb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 339    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 340    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 341    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 342    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 343    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 344    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbc    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 345    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 346    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 347    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 348    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abc    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abca    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 349    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 350    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 351    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 352    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abca    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 353    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 354    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 355    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 356    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 357    
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababc    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 358    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abac    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 359    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abacb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 360    
&nbsp;&nbsp;&nbsp;&nbsp;prefix c    
&nbsp;&nbsp;&nbsp;&nbsp;prefix ca    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 361    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 362    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 363    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 364    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 365    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 366    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 367    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caabb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 368    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 369    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 370    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caabb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 371    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 372    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 373    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caabb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 374    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 375    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 376    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caabb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 377    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 378    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 379    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 380    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 381    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 382    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 383    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 384    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 385    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 386    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 387    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 388    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 389    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 390    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 391    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 392    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 393    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 394    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 395    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 396    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 397    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 398    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 399    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 400    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 401    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 402    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbbaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 403    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbbaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 404    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbbaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 405    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbbaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 406    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbbaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 407    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbbaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 408    
&nbsp;&nbsp;&nbsp;&nbsp;prefix ca    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 409    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caabb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 410    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 411    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 412    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caabb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 413    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 414    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 415    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 416    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 417    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 418    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 419    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 420    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 421    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 422    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 423    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caabb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 424    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 425    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caabb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 426    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 427    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 428    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 429    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 430    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 431    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 432    
&nbsp;&nbsp;&nbsp;&nbsp;prefix ca    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 433    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caabb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 434    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 435    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 436    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caabb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 437    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 438    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 439    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 440    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 441    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 442    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 443    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 444    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 445    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 446    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 447    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caabb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 448    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 449    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caabb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 450    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 451    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 452    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 453    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 454    
&nbsp;&nbsp;&nbsp;&nbsp;prefix caba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 455    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cabab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 456    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 457    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 458    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 459    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 460    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 461    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 462    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbbaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 463    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbbaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 464    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbbaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 465    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbbaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 466    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbbaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 467    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbbaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 468    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 469    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 470    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 471    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 472    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 473    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 474    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 475    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 476    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 477    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 478    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 479    
&nbsp;&nbsp;&nbsp;&nbsp;prefix cbaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 480    
&nbsp;&nbsp;&nbsp;&nbsp;prefix a    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 481    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 482    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabc    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 483    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabcb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 484    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 485    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabbc    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 486    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabc    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 487    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 488    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaac    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaacb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 489    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaacb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 490    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 491    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabc    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 492    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aac    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 493    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacbb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 494    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaca    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 495    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 496    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacbb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 497    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 498    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 499    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabbc    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 500    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 501    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 502    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabc    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabcb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 503    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 504    
&nbsp;&nbsp;&nbsp;&nbsp;prefix ab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 505    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 506    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abac    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 507    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abacb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 508    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 509    
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababc    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 510    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 511    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 512    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abac    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 513    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abacb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 514    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 515    
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababc    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 516    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abc    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abca    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 517    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 518    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abca    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 519    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 520    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 521    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 522    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 523    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 524    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 525    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 526    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbc    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 527    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 528    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabc    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 529    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 530    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaac    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaacb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 531    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaacb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 532    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 533    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaabc    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 534    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 535    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 536    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabc    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 537    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabcb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 538    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 539    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aabbc    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 540    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aac    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aaca    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 541    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 542    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 543    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacbb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 544    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 545    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aacbb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 546    prefix aab
&nbsp;&nbsp;&nbsp;&nbsp;    prefix aaba
&nbsp;&nbsp;&nbsp;&nbsp;    prefix aabab
&nbsp;&nbsp;&nbsp;&nbsp;    Number of times getPermutations is run: 547
&nbsp;&nbsp;&nbsp;&nbsp;    prefix aabac
&nbsp;&nbsp;&nbsp;&nbsp;    Number of times getPermutations is run: 548
&nbsp;&nbsp;&nbsp;&nbsp;    prefix aabb
&nbsp;&nbsp;&nbsp;&nbsp;    prefix aabba
&nbsp;&nbsp;&nbsp;&nbsp;    Number of times getPermutations is run: 549
&nbsp;&nbsp;&nbsp;&nbsp;    prefix aabbc
&nbsp;&nbsp;&nbsp;&nbsp;    Number of times getPermutations is run: 550
&nbsp;&nbsp;&nbsp;&nbsp;    prefix aabc
&nbsp;&nbsp;&nbsp;&nbsp;    prefix aabca
&nbsp;&nbsp;&nbsp;&nbsp;    Number of times getPermutations is run: 551
&nbsp;&nbsp;&nbsp;&nbsp;    prefix aabcb
&nbsp;&nbsp;&nbsp;&nbsp;    Number of times getPermutations is run: 552
&nbsp;&nbsp;&nbsp;&nbsp;    prefix ac
&nbsp;&nbsp;&nbsp;&nbsp;    prefix aca
&nbsp;&nbsp;&nbsp;&nbsp;    prefix acab
&nbsp;&nbsp;&nbsp;&nbsp;    prefix acaba
&nbsp;&nbsp;&nbsp;&nbsp;    Number of times getPermutations is run: 553
&nbsp;&nbsp;&nbsp;&nbsp;    prefix acabb
&nbsp;&nbsp;&nbsp;&nbsp;    Number of times getPermutations is run: 554
&nbsp;&nbsp;&nbsp;&nbsp;    prefix acaa
&nbsp;&nbsp;&nbsp;&nbsp;    prefix acaab
&nbsp;&nbsp;&nbsp;&nbsp;    Number of times getPermutations is run: 555
&nbsp;&nbsp;&nbsp;&nbsp;    prefix acaab
&nbsp;&nbsp;&nbsp;&nbsp;    Number of times getPermutations is run: 556
&nbsp;&nbsp;&nbsp;&nbsp;    prefix acab
&nbsp;&nbsp;&nbsp;&nbsp;    prefix acabb
&nbsp;&nbsp;&nbsp;&nbsp;    Number of times getPermutations is run: 557
&nbsp;&nbsp;&nbsp;&nbsp;    prefix acaba
&nbsp;&nbsp;&nbsp;&nbsp;    Number of times getPermutations is run: 558
&nbsp;&nbsp;&nbsp;&nbsp;    prefix acb
&nbsp;&nbsp;&nbsp;&nbsp;    prefix acba
&nbsp;&nbsp;&nbsp;&nbsp;    prefix acbaa
&nbsp;&nbsp;&nbsp;&nbsp;    Number of times getPermutations is run: 559
&nbsp;&nbsp;&nbsp;&nbsp;    prefix acbab
&nbsp;&nbsp;&nbsp;&nbsp;    Number of times getPermutations is run: 560
&nbsp;&nbsp;&nbsp;&nbsp;    prefix acba
&nbsp;&nbsp;&nbsp;&nbsp;    prefix acbaa
&nbsp;&nbsp;&nbsp;&nbsp;    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 561    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 562    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 563    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 564    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aca    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 565    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 566    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 567    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acabb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 568    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 569    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acabb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 570    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 571    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 572    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 573    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 574    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 575    
&nbsp;&nbsp;&nbsp;&nbsp;prefix acbab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 576    
&nbsp;&nbsp;&nbsp;&nbsp;prefix ab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 577    
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababc    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 578    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 579    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 580    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abac    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abacb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 581    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 582    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 583    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 584    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 585    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 586    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbc    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 587    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abbca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 588    
&nbsp;&nbsp;&nbsp;&nbsp;prefix aba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 589    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 590    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 591    
&nbsp;&nbsp;&nbsp;&nbsp;prefix ababc    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 592    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abac    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abaca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 593    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abacb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 594    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abc    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abca    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 595    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 596    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 597    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 598    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abca    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 599    
&nbsp;&nbsp;&nbsp;&nbsp;prefix abcab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 600    
&nbsp;&nbsp;&nbsp;&nbsp;prefix b    
&nbsp;&nbsp;&nbsp;&nbsp;prefix ba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix babac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 601    
&nbsp;&nbsp;&nbsp;&nbsp;prefix babaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 602    
&nbsp;&nbsp;&nbsp;&nbsp;prefix babc    
&nbsp;&nbsp;&nbsp;&nbsp;prefix babca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 603    
&nbsp;&nbsp;&nbsp;&nbsp;prefix babca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 604    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix babaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 605    
&nbsp;&nbsp;&nbsp;&nbsp;prefix babac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 606    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baabc    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 607    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 608    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baac    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baacb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 609    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 610    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 611    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 612    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bac    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 613    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 614    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baca    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 615    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 616    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baca    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 617    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 618    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 619    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baabc    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 620    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 621    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 622    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baac    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baacb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 623    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 624    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 625    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 626    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbac    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 627    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 628    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 629    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 630    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 631    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 632    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbac    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 633    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 634    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 635    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 636    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbc    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbca    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbcaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 637    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbcaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 638    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbca    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbcaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 639    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbcaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 640    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbca    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbcaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 641    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbcaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 642    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 643    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 644    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 645    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 646    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbac    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 647    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bbaca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 648    
&nbsp;&nbsp;&nbsp;&nbsp;prefix ba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baabc    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 649    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 650    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baac    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baacb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 651    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 652    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 653    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 654    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix babac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 655    
&nbsp;&nbsp;&nbsp;&nbsp;prefix babaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 656    
&nbsp;&nbsp;&nbsp;&nbsp;prefix babc    
&nbsp;&nbsp;&nbsp;&nbsp;prefix babca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 657    
&nbsp;&nbsp;&nbsp;&nbsp;prefix babca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 658    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix babaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 659    
&nbsp;&nbsp;&nbsp;&nbsp;prefix babac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 660    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bac    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baca    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 661    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 662    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 663    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 664    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baca    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 665    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 666    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 667    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 668    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 669    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baabc    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 670    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baac    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 671    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baacb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 672    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bc    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bca    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 673    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 674    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 675    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 676    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 677    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 678    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcbaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 679    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcbaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 680    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcbaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 681    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcbaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 682    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcbaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 683    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcbaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 684    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bca    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 685    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 686    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 687    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 688    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 689    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 690    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bca    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 691    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 692    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 693    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 694    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 695    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bcaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 696    
&nbsp;&nbsp;&nbsp;&nbsp;prefix ba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 697    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baabc    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 698    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 699    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 700    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baac    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baacb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 701    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 702    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix babaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 703    
&nbsp;&nbsp;&nbsp;&nbsp;prefix babac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 704    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baba    
&nbsp;&nbsp;&nbsp;&nbsp;prefix babaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 705    
&nbsp;&nbsp;&nbsp;&nbsp;prefix babac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 706    
&nbsp;&nbsp;&nbsp;&nbsp;prefix babc    
&nbsp;&nbsp;&nbsp;&nbsp;prefix babca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 707    
&nbsp;&nbsp;&nbsp;&nbsp;prefix babca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 708    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaa    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 709    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaac    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 710    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baab    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 711    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baabc    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 712    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baac    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baaca    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 713    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baacb    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 714    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bac    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baca    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 715    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 716    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacb    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 717    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacba    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 718    
&nbsp;&nbsp;&nbsp;&nbsp;prefix baca    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacaa    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 719    
&nbsp;&nbsp;&nbsp;&nbsp;prefix bacab    
&nbsp;&nbsp;&nbsp;&nbsp;Number of times getPermutations is run: 720    
&nbsp;&nbsp;&nbsp;&nbsp;=> [ 'abacab',    
&nbsp;&nbsp;&nbsp;&nbsp;'abacba',    
&nbsp;&nbsp;&nbsp;&nbsp;'abaacb',    
&nbsp;&nbsp;&nbsp;&nbsp;'abaabc',    
&nbsp;&nbsp;&nbsp;&nbsp;'ababca',    
&nbsp;&nbsp;&nbsp;&nbsp;'ababac',    
&nbsp;&nbsp;&nbsp;&nbsp;'abcaab',    
&nbsp;&nbsp;&nbsp;&nbsp;'abcaba',    
&nbsp;&nbsp;&nbsp;&nbsp;'abcaab',    
&nbsp;&nbsp;&nbsp;&nbsp;'abcaba',    
&nbsp;&nbsp;&nbsp;&nbsp;'abcbaa',    
&nbsp;&nbsp;&nbsp;&nbsp;'abcbaa',    
&nbsp;&nbsp;&nbsp;&nbsp;'abaacb',    
&nbsp;&nbsp;&nbsp;&nbsp;'abaabc',    
&nbsp;&nbsp;&nbsp;&nbsp;'abacab',    
&nbsp;&nbsp;&nbsp;&nbsp;'abacba',    
&nbsp;&nbsp;&nbsp;&nbsp;'ababac',    
&nbsp;&nbsp;&nbsp;&nbsp;'ababca',    
&nbsp;&nbsp;&nbsp;&nbsp;'abbaca',    
&nbsp;&nbsp;&nbsp;&nbsp;'abbaac',    
&nbsp;&nbsp;&nbsp;&nbsp;'abbcaa',    
&nbsp;&nbsp;&nbsp;&nbsp;'abbcaa',    
&nbsp;&nbsp;&nbsp;&nbsp;'abbaac',    
&nbsp;&nbsp;&nbsp;&nbsp;'abbaca',    
&nbsp;&nbsp;&nbsp;&nbsp;'aabcab',    
&nbsp;&nbsp;&nbsp;&nbsp;'aabcba',    
&nbsp;&nbsp;&nbsp;&nbsp;'aabacb',    
&nbsp;&nbsp;&nbsp;&nbsp;'aababc',    
&nbsp;&nbsp;&nbsp;&nbsp;'aabbca',    
&nbsp;&nbsp;&nbsp;&nbsp;'aabbac',    
&nbsp;&nbsp;&nbsp;&nbsp;'aacbab',    
&nbsp;&nbsp;&nbsp;&nbsp;'aacbba',    
&nbsp;&nbsp;&nbsp;&nbsp;'aacabb',    
&nbsp;&nbsp;&nbsp;&nbsp;'aacabb',    
&nbsp;&nbsp;&nbsp;&nbsp;'aacbba',    
&nbsp;&nbsp;&nbsp;&nbsp;'aacbab',    
&nbsp;&nbsp;&nbsp;&nbsp;'aaabcb',    
&nbsp;&nbsp;&nbsp;&nbsp;'aaabbc',    
&nbsp;&nbsp;&nbsp;&nbsp;'aaacbb',    
&nbsp;&nbsp;&nbsp;&nbsp;'aaacbb',    
&nbsp;&nbsp;&nbsp;&nbsp;'aaabbc',    
&nbsp;&nbsp;&nbsp;&nbsp;'aaabcb',    
&nbsp;&nbsp;&nbsp;&nbsp;'aabbca',    
&nbsp;&nbsp;&nbsp;&nbsp;'aabbac',    
&nbsp;&nbsp;&nbsp;&nbsp;'aabcba',    
&nbsp;&nbsp;&nbsp;&nbsp;'aabcab',    
&nbsp;&nbsp;&nbsp;&nbsp;'aababc',    
&nbsp;&nbsp;&nbsp;&nbsp;'aabacb',    
&nbsp;&nbsp;&nbsp;&nbsp;'acbaab',    
&nbsp;&nbsp;&nbsp;&nbsp;'acbaba',    
&nbsp;&nbsp;&nbsp;&nbsp;'acbaab',    
&nbsp;&nbsp;&nbsp;&nbsp;'acbaba',    
&nbsp;&nbsp;&nbsp;&nbsp;'acbbaa',    
&nbsp;&nbsp;&nbsp;&nbsp;'acbbaa',    
&nbsp;&nbsp;&nbsp;&nbsp;'acabab',    
&nbsp;&nbsp;&nbsp;&nbsp;'acabba',    
&nbsp;&nbsp;&nbsp;&nbsp;'acaabb',    
&nbsp;&nbsp;&nbsp;&nbsp;'acaabb',    
&nbsp;&nbsp;&nbsp;&nbsp;'acabba',    
&nbsp;&nbsp;&nbsp;&nbsp;'acabab',    
&nbsp;&nbsp;&nbsp;&nbsp;'acabab',    
&nbsp;&nbsp;&nbsp;&nbsp;'acabba',    
&nbsp;&nbsp;&nbsp;&nbsp;'acaabb',    
&nbsp;&nbsp;&nbsp;&nbsp;'acaabb',    
&nbsp;&nbsp;&nbsp;&nbsp;'acabba',    
&nbsp;&nbsp;&nbsp;&nbsp;'acabab',    
&nbsp;&nbsp;&nbsp;&nbsp;'acbbaa',    
&nbsp;&nbsp;&nbsp;&nbsp;'acbbaa',    
&nbsp;&nbsp;&nbsp;&nbsp;'acbaba',    
&nbsp;&nbsp;&nbsp;&nbsp;'acbaab',    
&nbsp;&nbsp;&nbsp;&nbsp;'acbaba',    
&nbsp;&nbsp;&nbsp;&nbsp;'acbaab',    
&nbsp;&nbsp;&nbsp;&nbsp;'aabacb',    
&nbsp;&nbsp;&nbsp;&nbsp;'aababc',    
&nbsp;&nbsp;&nbsp;&nbsp;'aabcab',    
&nbsp;&nbsp;&nbsp;&nbsp;'aabcba',    
&nbsp;&nbsp;&nbsp;&nbsp;'aabbac',    
&nbsp;&nbsp;&nbsp;&nbsp;'aabbca',    
&nbsp;&nbsp;&nbsp;&nbsp;'aaabcb',    
&nbsp;&nbsp;&nbsp;&nbsp;'aaabbc',    
&nbsp;&nbsp;&nbsp;&nbsp;'aaacbb',    
&nbsp;&nbsp;&nbsp;&nbsp;'aaacbb',    
&nbsp;&nbsp;&nbsp;&nbsp;'aaabbc',    
&nbsp;&nbsp;&nbsp;&nbsp;'aaabcb',    
&nbsp;&nbsp;&nbsp;&nbsp;'aacbab',    
&nbsp;&nbsp;&nbsp;&nbsp;'aacbba',    
&nbsp;&nbsp;&nbsp;&nbsp;'aacabb',    
&nbsp;&nbsp;&nbsp;&nbsp;'aacabb',    
&nbsp;&nbsp;&nbsp;&nbsp;'aacbba',    
&nbsp;&nbsp;&nbsp;&nbsp;'aacbab',    
&nbsp;&nbsp;&nbsp;&nbsp;'aabbac',    
&nbsp;&nbsp;&nbsp;&nbsp;'aabbca',    
&nbsp;&nbsp;&nbsp;&nbsp;'aababc',    
&nbsp;&nbsp;&nbsp;&nbsp;'aabacb',    
&nbsp;&nbsp;&nbsp;&nbsp;'aabcba',    
&nbsp;&nbsp;&nbsp;&nbsp;'aabcab',    
&nbsp;&nbsp;&nbsp;&nbsp;'abbaca',    
&nbsp;&nbsp;&nbsp;&nbsp;'abbaac',    
&nbsp;&nbsp;&nbsp;&nbsp;'abbcaa',    
&nbsp;&nbsp;&nbsp;&nbsp;'abbcaa',    
&nbsp;&nbsp;&nbsp;&nbsp;... 620 more items ]


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
