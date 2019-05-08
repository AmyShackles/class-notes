---
path: '/Think-Like-a-Programmer-Chapter-II'
cover: '../Programming-Foundations-Coding-Efficiency/speed.jpg'
slug: 'Think-Like-a-Programmer-Chapter-II'
date: '2018-11-29'
title: 'Think Like a Programmer:'
chapter: 'Chapter Two'
subtitle: 'Pure Puzzles'
tags: ['problem solving', 'Think Like a Programmer']
published: true
---

## Problem: Half of a Square

Write a program that uses only two output statements, cout << "#" and cout << "\n" to produce a pattern of hash symbols shaped like half of a perfect 5x5 square (or a right triangle)

```text
#####
####
###
##
#
```

```c++
#include <iostream>
using std::cin;
using std::cout;

int main() {
  for (int j = 6; j > 0; j--) {
    for (int i = j-1; i > 0; i--) {
    std::cout << "#";
    }
    std::cout << "\n";
  }
}
```

## Reducing the Problem

### Problem: A Square (Half of a Square Reduction):

Write a problem theat uses only two output statements, cout << "#" and cout << "\n", to produce a pattern of hash symbols like a perfect 5x5 square:

```text
#####
#####
#####
#####
#####
```

```c++
#include <iostream>
using std::cin;
using std::cout;

int main() {
  for (int col = 1 ; col <= 5; col++) {
    for (int row = 1; row <= 5; row++) {
    std::cout << "#";
    }
    std::cout << "\n";
  }
}
```

### Problem: A Line (Half of a Square - Further Reduction)

Write a program that ueses only two output statements, cout << "@" and cout "\n" to produce a line of five symbols.

```c++
#include <iostream>
using std::cin;
using std::cout;

int main() {
    for (int row = 1; row <= 5; row++) {
    std::cout << "#";
    }
    std::cout << "\n";
}
```

### Problem: Count Down By Counting Up

Write a line of code that goes in the desginated position in the loop in the listing below. The program redisplays the numbers 5 through 1, in that order, with each number on a separate line.

```c++
#include <iostream>
using std::cin;
using std::cout;

int main() {
    for (int row = 1; row <= 5; row++) {
    std::cout << 6 - row << "\n";
    }
}
```

```c++
for (int row = 1; row <= 5; row++) {
    for (int hashNum = 1; hashNum <= 6 - row; hashNum++) {
        cout << "#";
    }
    cout << "\n";
}
```

### Problem: A Sideways Triangle

Write a program that uses only two output statements, cout << "#" and cout << "\n" to produce a pattern of hash symbols shaped like a sideways triangle:

```text
#

##

###

####

#####

####

###

##

#
```

### Steps:

```c++
#include <iostream>
using std::cin;
using std::cout;

int main() {
    for (int j = 6; j > 0; j--) {
        for (int i = j-1; i < 5; i++) {
            std::cout << "#";
        }
        std::cout << "\n";
    }
    for (int j = 6; j > 0; j--) {
        for (int i = j-1; i > 0; i--) {
            std::cout << "#";
        }
        std::cout << "\n";
    }
}
```

## List of skills and techniques from Half a Square that can be applied to the problem:

- Display a row of symbols of a particular length using a loop
- Display a series of rows using nested loops
- Create a varying number of symbols on each row using an algebraic expression instead of a fixed value
- Discover the correct algebraic expression through experimentation and analysis

| 8 - row | 4 - row | abs(4 - row) | 4 - abs(4 - row) |
| ------- | ------- | ------------ | ---------------- |
| 7       | 3       | 3            | 1                |
| 6       | 2       | 2            | 2                |
| 5       | 1       | 1            | 3                |
| 4       | 0       | 0            | 4                |
| 3       | -1      | 1            | 3                |
| 2       | -2      | 2            | 2                |
| 1       | -3      | 3            | 1                |

```c++
#include <iostream>
#include <stdlib.h>
using std::cin;
using std::cout;


int main() {
  for (int row = 1; row <= 7; row++) {
    for (int hashNum = 1; hashNum <= 4 - abs(4 - row); hashNum++) {
        cout << "#";
    }
    cout << "\n";
    }
}
```

---

## Input Processing

Constraints: Input will be read character by character and must process each character before reading the next character. Will not store characters in a data structure.

## Luhn Checksum Validation

Used for validating identification numbers.

Using the original number, double the value of every other digit. Then add the values of the individual digits together. If a doubled value now has two digits, add individually. The identification number is valid if the sum is divisible by 10.

Write a program that takes an identification number of arbitrary length and determines whether the number is valid under the Luhn formula. Must process each character before reading the next one.

### Break Down the Problem

List of issues:

1. Knowing which digits to double
2. Treating doubled numbers greater than 10 according to their individual digits
3. Knowing we've reached the end of the number
4. Readcing each digit separately.

### Tackling the Doubled Digits, 10+

What are the ranges of possible values? If you start from 0-9 and double, the max value is 18. That means if the doubled value is 10 or greater, it has to be in the range of 10 to 18, which means that the first digit is always 1.

```c++
int digit;
cout << "Enter a single digit number, 0-9: ";
cin >> digit;
int doubleDigit = digit * 2;
int sum;
if (doubleDigit >= 10) sum = 1 + doubleDigit % 10;
else sum = doubleDigit;
cout << "Sum of digits in doubled number: " << sum << "\n";
```

Transformed into a function:

```c++
int doubleDigitValue(int digit) {
    int doubleDigit = digit * 2;
    int sum;
    if (doubleDigit >= 10) sum = 1 + doubleDigit % 10;
    else sum = doubleDigit;
    return sum;
}
```

### Next up: How to read the number properly

If we read as a numeric type, we'd get one long number and have a lot of work on our hands. We need to ensure that we can read a character representing a digit and turn it into an integer type we can perform mathematical operations on.

### If we took character value and used it as an integer expression directly:

```c++
char digit;
cout << "Enter a one-digit number: ";
digit = cin.get();
int sum = digit;
cout << "Is the sum of the digits " << sum << "? \n";
```

Possible output:

```text
Enter a one-digit number: 7
Is the sum of the digits 55?
```

This is because 7 has an ASCII value of 55.

### Convert Character Digit to Integer

Write a program that reads a character from the user representing a digit, 0 through 9. Convert the character to the equivalent integer in the range 0-9, then output the integer to demonstrate the result.

Like earlier when we checked the difference between original values and desired values, this is an analogous problem. There is a difference of 48 between original value and desired value. 48 is the character code in ASCII of 0, so we can use that to perform subtraction.

```c++
char digit;
cout << "Enter a one-digit number: ";
cin >> digit;
int sum = digit - '0';
cout << "Is the sum of digits " << sum << "? \n";
```

### ---

Now we can move on to see what digits to double. This may take several steps to figure out, so a good chance to practice reducing. WHat if we initially limited ourselves to fixed-length numbers? That would confirm our understanding of the gheneral formula while making progress toward the ultimate goal.

## Problem: Luhn Checksum Validation: Fixed-Length

Write a program that takes an identification number (including its check digit) of length six and determines whether the number is valid under the Luhn fomula. The program must process each character before reading the next one.

### ---

As before, we can reduce even farther to make getting started as easy as possible. What if we changed the formula so that none of the digits is doubled?

## Problem: Simple Checksum Validation, Fixed-Length

Write a program that takews an identification number (including its check digit) of length six and determines whether the number is valid under a simple formula where the values of each digit are summed and the result is checked to see whether it is divisible by 10. The program must process each character before reading the next one.

```c++
#include <iostream>
#include <stdlib.h>
using std::cin;
using std::cout;

int doubleDigitValue(int digit){
  int doubleDigit = digit * 2;
  int sum;
 if (doubleDigit >= 10) sum = 1 + doubleDigit % 10;
 else sum = doubleDigit;
 return sum;
}
int main() {
 char digit;
 int checksum = 0;
 cout << "Enter a six-digit number: ";
 for (int position = 1; position <= 6; position++) {
   cin >> digit;
   checksum += digit - '0';
 }
 cout << "Checksum is " << checksum << ". \n";
 if (checksum % 10 == 0) {
   cout << "Checksum is divisible by 10.  Valid \n";
 } else {
   cout << "Checksum is not divisible by 10.  Invalid \n";
 }
}
```

### ---

Now we need to add the logic for the Luhn validation formula (doubling every other digit from the right). Since we're currently only working with six-digit numbers, we need to double the digits in position one, position three, and position five counting from the left. In other words, double if position is odd. We can use the modulo operator because even numbers would be divisible by 2 with no remainder. So if position % 2 is 1, we know that the position is odd and the digit should be doubled. Note that means both doubling and summing the digits of the doubled number if it's 10 or greater. Now if we need to double, we can send the digit to the previously defined function and use the result.

```c++
int main() {
 char digit;
 int checksum = 0;
 cout << "Enter a six-digit number: ";
 for (int position = 1; position <= 6; position++) {
   cin >> digit;
   if (position % 2 == 0) checksum += digit - '0';
   else checksum += doubleDigitValue(digit - '0');
 }
 cout << "Checksum is " << checksum << ". \n";
 if (checksum % 10 == 0) {
   cout << "Checksum is divisible by 10.  Valid \n";
 } else {
   cout << "Checksum is not divisible by 10.  Invalid \n";
 }
}
```

### ---

To ultimately solve this problem, we need to divide and conquer. Suppose you were asked to modify the code to work with 10 or 16 digits -> you'd change the 6 to another upper bound. But validating a 7-digit number would require a modification because the number of digits is odd and we're doubling every digit starting from the second on the right, the first digit on the left is no longer doubled. In that case, even positions would need to be doubled.

First issue -> how do you tell when you've reached the end of the number? Character read after the last digit varies based on operating system.

Experiment:

```c++
cout << "Enter a number: ";
char digit;
while (true) {
    digit = cin.get();
    cout << int(digit) << " ";
}
```

Typing 17 into the prompt returned 49 55 10 - 49 is ASCII for 1, 55 is ASCII for 7, which means that 10 is the value we're looking for to indicate the end of a number.

```c++
char digit;
int checksum = 0;
int position = 1;
cout << "Enter a number with an even number of digits: ";
digit = cin.get();
while (digit != 10) {
    if (position % 2 == 0) checksum += digit - '0';
    else checksum += doubleDigitValue(digit - '0');
    digit = cin.get();
    position ++;
}
cout << "Checksum is " << checksum << ". \n";
if (checksum % 10 == 0) {
    cout << "Checksum is divisible by 10.  Valid. \n";
} else {
    cout << "Checksum is not divisible by 10.  Invalid. \n";
}
```

Position is no longer the control variable in a for loop, so needs to be initialized and incremented separately. Loop is controlled by a conditional that checks for the character code that signals the end of the line. Because we have to have a value to check the first time we go through the loop, we have to read the first value before the loop starts and then read every other value inside the loop.

## Problem: Positive or Negative

Write a program that reads 10 integers from the user. After all the numbers have been entered, the user may ask to display the count of positive numbers or the count of negative numbers.

```c++
int number;
int positiveCount = 0;
int negativeCount = 0;
cout << "Enter 10 integers: ";
for (int i = 1; i <= 10; i++) {
    cin >> number;
    if (number > 0) positiveCount++;
    if (number < 0) negativeCount++;
}
char response;
count << "Do you want the (p)ositive or (n)egative count? ";
cin >> response;
if (response == 'p')
    cout << "Positive count is " << positiveCount << "\n";
if (response == 'n')
    cout << "Negative count is " << negativeCount << "\n";
```

Keep track of running checksum both ways -- as if the ID is an odd length and as if the ID is an even length. When we get to the end of the number, we can return the appropriate checksum.

## Putting the Pieces Together

```c++
char digit;
int oddLengthChecksum = 0;
int evenLengthChecksum = 0;
int position = 1;
cout << "Enter a number: ";
digit = cin.get();
while (digit != 10) {
    if (position % 2 == 0) {
        oddLengthChecksum += doubleDigitValue(digit - '0');
        evenLengthChecksum += digit - '0';
    } else {
        oddLengthChecksum += digit - '0';
        evenLengthChecksum += doubleDigitValue(digit - '0');
    }
    digit = cin.get();
    position++;
}
int checksum;
if ((position - 1) % 2 == 0) checksum = evenLengthChecksum;
else checksum = oddLengthChecksum;
cout << "Checksum is " << checksum << ". \n";
if (checksum % 10 == 0) {
    cout << "Checksum is divisible by 10.  Valid. \n";
} else {
    cout << "Checksum is not divisible by 10.  Invalid. \n";
}
```

Could have used (position % 2 == 1) but it's more confusing to read - better to say "if position - 1 is even, use the even checksum" than it is to say "If position is odd, use the even checksum".

It is always better to take more steps than to try to do too much at once, even if some steps seem trivial.

---

## Problem: Decode a Message

A message has been encoded as a text stream that is to be read character by character. The stream contains a series of comma-delimited integers, each a positive number capable of being represented by a C++ int. However, the character represented by a particular integer depends on the current decoding mode. There are three modes: uppercase, lowercase, and punctuation.

In uppercase mode, each integer represents an uppercase letter: The integer modulo 27 indicates the letter of the alphabet (where 1 = A and so on). So an input value of 143 in uppercase mode would yield the letter H because 143 module 27 is 8 and H is the eighth letter in the alphabet.

The lowercase mode works the same but with lowercase letters; the remainder of dividing the integer by 27 represents the lowercase letter (1 = a and so on). So an input value of 56 in lowercase mode would yield b because 56 modulo 27 is 2 and b is the second letter of the alphabet.

In punctuation mode, the integer is instead considered modulo 9, with the interpretation given by Table 2-3 below. So 19 would yield an exclamation point because 19 modulo 9 is 1.

At the beginning of each message, the decoding mode is uppercase ltters. Each time the modulo operation (by 27 or 9 depending on mode) results in 0, the decoding mode switches. If the current mode is uppercase, the mode switches to lowercase letters. If the current mode is lowercase, the mode switches to punctuation, and if the current mode is punctuation, it switches back to uppercase.

#### Table 2-3: Punctuation Decoding Mode

| Number | Symbol  |
| ------ | ------- |
| 1      | !       |
| 2      | ?       |
| 3      | ,       |
| 4      | .       |
| 5      | (space) |
| 6      | ;       |
| 7      | "       |
| 8      | '       |

#### My Notes on Problem - Restate Problem with Constraints

1. Read a text stream character by character
2. Characters are separated by commas
3. Program starts in Uppercase decode mode
4. Start decoding characters by performing modulo 27 and using corresponding letter - 1 = A, etc.
5. If integer modulo 27 == 0, switch to Lowercase decode mode
6. Continue processing characters using modulo 27, though now letters are in lowercase
7. If modulo 27 == 0, switch to Punctuation decode mode
8. Continue decoding, but now perform modulo 9 and consult Table 2-3 to find the punctuation mark the character represents
9. If int modulo 9 == 0, switch decode mode to Uppercase
10. Repeat until out of characters to decode (end of line)

#### Notes from Book:

1. Read character by character until you reach the end of the line
2. Convert a series of characters representing a number to an integer
3. Convert an integer 1-26 to an uppercase character
4. Convert an integer 1-26 to a lowercase character
5. Convert an integer 1-8 into a punctuation symbol based on Table 2-3.
6. Tracking a decoding mode

#### Example of the process

Original input: 18, 12312, 171, 763, 98423, 1208, 216, 11, 500, 18, 241, 0, 32, 20620, 27, 10

| (a)   | (b) | (c) | (d) | (e) | (f) |
| ----- | --- | --- | --- | --- | --- |
| 18    | (U) | 27  | 18  | R   |     |
| 12312 | (U) | 27  | 0   | →   | (L) |
| 171   | (L) | 27  | 6   | i   |     |
| 763   | (L) | 27  | 7   | g   |     |
| 98423 | (L) | 27  | 8   | h   |     |
| 1208  | (L) | 27  | 20  | t   |     |
| 216   | (L) | 27  | 0   | →   | (P) |
| 11    | (P) | 9   | 2   | ?   |     |
| 500   | (P) | 9   | 5   |     |     |
| 18    | (P) | 9   | 0   | →   | (U) |
| 241   | (U) | 27  | 25  | Y   |     |
| 0     | (U) | 27  | 0   | →   | (L) |
| 32    | (L) | 27  | 5   | e   |     |
| 20620 | (L) | 27  | 19  | s   |     |
| 27    | (L) | 27  | 0   |     |     |
| 10    | (P) | 9   | 1   | !   |     |

a) Current number in the input

b) Current mode

c) Divisor for the current mode

d) Remainder

e) Decoded character or arrow pointing to new mode

f) Mode switching to

We already know how to read character by character until we reach the end of the line because we did that with the Luhn Checksum problem - reading character by character until we come across the ASCII value for end-of-line (10).

### Convert a series of characters representing a number to an integer

We know how to convert 0-9, but how do we extend that to apply to multidigit numbers?

Consider a two-diigit numbr. In a two-digit number, the first digit is the tens digit so you can multiply by 10 and then add that to the second digit (ones place).

Example: 35 would be integers 3 and 5 and overall integer would be computed by 3 \* 10 + 5

```c++
cout << "Enter a two-digit number: ";
char digitChar1 = cin.get();
char digitChar2 = cin.get();
int digit1 = digitChar1 - '0';
int digit2 = digitChar2 - '0';
int overallNumber = digit1 * 10 + digit2;
cout << "That number as an integer: " << overallNumber << "\n";
```

While the above code works, it won't be very useful in extending past two-digit numbers because we would exponentially increase the number of variables necessary to accomplish the task. We need to reduce:

```c++
cout << "Enter a two-digit number: ";
char digitChar = cin.get();
int overallNumber = (digitChar - '0') * 10;
digitChar = cin.get();
overallNumber += (digitChar - '0');
cout << "That number as an integer: " << overallNumber << "\n";
```

How do we know which multiplier to use for each digit before adding to the running total?

### Problem: Reading a Number with 3 or 4 Digits:

Write a program to read a number character by character and convert it to an integer, using just one char variable and one int variable. The number will have either 3 or 4 digits.

### Problem: Reading a Number with 3 or 4 Digits, Further Simplified:

Write a program to read a number character by character and convert it to an integer, using just one char variable and two int variables. The number will have either 3 or 4 digits.

```c++
cout << "Enter a three-digit or four-digit number: ";
char digitChar = cin.get();
int threeDigitNum = (digitChar - '0') * 100;
int fourDigitNum = (digitChar - '0') * 1000;
digitChar = cin.get();
threeDigitNum += (digitChar - '0') * 10;
fourDigitNum += (digitChar - '0') * 100;
digitChar = cin.get();
threeDigitNum += (digitChar - '0');
fourDigitNum += (digitChar - '0') * 10;
digitChar = cin.get();
if (digitChar == 10) {
    cout << "Number entered: " << threeDigitNum << "\n";
} else {
    fourDigitNum += (digitChar - '0');
    cout << "Number entered: " << fourDigitNum << "\n";
}
```

In general, since the multiplers for fourDigitNum are 10 times those of threeDigitNum, the former would always be 10 times the latter.

```c++
cout << "Enter a three-digit or four-digit number: ";
char digitChar = cin.get();
int number = (digitChar - '0') * 100;
digitChar = cin.get();
number += (digitChar - '0') * 10;
digitChar = cin.get();
number += (digitChar - '0');
digitChar = cin.get();
if (digitChar == 10) {
    cout << "Number entered: " << number << "\n";
} else {
    number = number * 10 + (digitChar - '0');
    cout << "Number entered: " << number << "\n";
}
```

Now we have an exploitable pattern.

To extend to use 5-digit values, you would repeat the process for reading the fourth character instead of displaying the result immediately -> Read the 5th character, check to see if it's an end-of-line. If so, display previous computed number. If not, multiply the computed number by 10 and add the current character to it.

```c++
cout << "Enter a number with three, four, or five digits: ";
char digitChar = cin.get();
int number = (digitChar - '0') * 100;
digitChar = cin.get();
number += (digitChar - '0') * 10;
digitChar = cin.get();
number += (digitChar - '0');
digitChar = cin.get();
if (digitChar == 10) {
    cout << "Number entered: " << number << "\n";
} else {
    number = number * 10 + (digitChar - '0');
    digitChar = cin.get();
    if (digitChar == 10) {
        cout << "Number enetered: " << number << "\n";
    } else {
        number = number * 10 + (digitChar - '0');
        cout << "Number entered: " << number << "\n";
    }
}
```

Pattern: if the next value is a digit, multiply the running total by 10 before adding the integer digit value of the character.

```c++
cout << "Enter a number with as many digits as you please: ";
char digitChar = cin.get();
int number = (digitChar - '0');
digitChar = cin.get();
while (digitChar != 10) {
    number = number * 10 + (digitChar - '0');
    digitChar = cin.get();
}
cout << "Number entered: " << number << "\n";
```

##### Explanation (Given input: 12356)

```text
Outside while loop:
First pass:         number = (digitChar - '0')
                    digitChar - '0' = 1
                    number = 1

Inside while loop:
Second pass:        number = number * 10 + (digit - '0')
                    digitChar - '0' = 2
                    number = 12 (1 * 10 + 2)

Third pass:         number = number * 10 + (digit - '0')
                    digitChar - '0' = 3
                    number = 123 (12 * 10 + 3)

Fourth pass:        number = number * 10 + (digit - '0')
                    digitChar - '0' = 5
                    number = 1235 (123 * 10 + 5)

Fifth pass:         number = number * 10 + (digit - '0')
                    digitChar - '0' = 6
                    number = 12356 (1235 * 10 + 6)
```

This handles the conversion of one series of characters, but the main problem is going to be working with a list of comma-separated characters.

For 101, 22[EOL] (end of line), we would need to check for either a comma or the end of the line, then place code that processes one number inside a larger loop that continues until all values are read. The inner loop should stop for EOL and commas. The outer loop should only stop for EOL.

```c++
cout << "Enter a number: ";
char digitChar;
do {
    digitChar = cin.get();
    int number = (digitChar - '0');
    digitChar = cin.get();
    while ((digitChar != 10) && (digitChar != ',')) {
        number = number * 10 + (digitChar - '0');
        digitChar = cin.get();
    }
    cout << "Number entered: " << number << "\n";
} while (digitChar != 10);
```

Note: Remember not to include spaces when entering values.

#### Now we can focus on processing individual numbers!

Converting a number 1-26 to a letter A-Z. This is like the opposite of what we did to get the individual digit characters to their integer equivalents. If we subtract the character code '0' to translate from 0-9 character range to 0-9 integer range, we should be able to add a character code to translate from 1-26 to A-Z. What if we add 'A'?

```c++
cout << "Enter a number 1-26: ";
int number;
cin >> number;
char outputCharacter;
outputCharacter = number + 'A';
cout << "Equivalent symbol: " << outputCharacter << "\n";
```

This results in an off-by-one error - namely, 1 gives you B, 2 gives you C, etc. So what you really need is number + 'A' - 1;

#### Convert 1-26 to A-Z:

```c++
cout << "Enter a number 1-26: ";
int number;
cin >> number;
char outputCharacter;
outputCharacter = number + 'A' - 1;
cout << "Equivalent symbol: " << outputCharacter << "\n";
```

#### Convert 1-26 to a-z:

```c++
cout << "Enter a number 1-26: ";
int number;
cin >> number;
char outputCharacter;
outputCharacter = number + 'a' - 1;
cout << "Equivalent symbol: " << outputCharacter << "\n";
```

#### Punctuation

Punctuation is harder because it's not in ASCII order and so can't be translated dynamically. Instead, a brute force method is required:

```c++
cout << "Enter a number 1-8: ";
int number;
cin >> number;
char outputCharacter;
switch (number) {
    case 1: outputCharacter = '!'; break;
    case 2: outputCharacter = '?'; break;
    case 3: outputCharacter = ','; break;
    case 4: outputCharacter = '.'; break;
    case 5: outputCharacter = ' '; break;
    case 6: outputCharacter = ';'; break;
    case 7: outputCharacter = '"'; break;
    case 8: outputCharacter = '\''; break;
}
cout << "Equivalent symbol: " << outputCharacter << "\n";
```

#### Switching Modes

We need a variable to store the current mode. It could be an integer, but it's more readable as an enumeration. Rule of thumb: If a variable is only tracking state and there is no inherent meaning to any particular value, an enumeration is a good idea. Enum allows us to know what the mode is without having to decode it (as we would have to if it were an arbitrary value to represent each mode).

```c++
enum modeType {UPPERCASE, LOWERCASE, PUNCTUATION};
int number;
modeType mode = UPPERCASE;
cout << "Enter some numbers ending with -1. ";
do {
    cin >> number;
    cout << "Number read: " << number;
    switch (mode) {
        case UPPERCASE:
            number = number % 27;
            cout << ". Modulo 27." << number << ". ";
            if (number == 0) {
                cout << "Switch to Lowercase";
                mode = LOWERCASE;
            }
            break;
        case LOWERCASE:
            number = number % 27;
            cout << ". Modulo 27 " << number << ". ";
            if (number == 0) {
                cout << "Switch to Punctuation";
                mode = PUNCTUATION;
            }
            break;
        case PUNCTUATION:
            number = number % 9;
            cout << ". Modulo 9: " << number << ". ";
            if (number == 0) {
                cout << "Switch to Uppercase.";
                mode = UPPERCASE;
            }
            break;
    }
    cout << "\n";
} while (number != -1);
```

### Putting it all Together

```c++
char outputCharacter;
enum modeType {UPPERCASE, LOWERCASE, PUNCTUATION};
modeType mode = UPPERCASE;
char digitChar;
cout << "Enter numbers to decode: ";
do {
    digitChar = cin.get();
    int number = (digitChar - '0');
    digitChar = cin.get();
    while ((digitChar != 10) && (digitChar != ',')) {
        number = number * 10 + (digitChar - '0');
        digitChar = cin.get();
    }
    switch(mode) {
        case UPPERCASE:
            number = number % 27;
            outputCharacter = number + 'A' - 1;
            if (number == 0) {
                mode = LOWERCASE;
                continue;
            }
            break;
        case LOWERCASE:
            number = number % 27;
            outputCharacter = number + 'a' - 1;
            if (number == 0) {
                mode = PUNCTUATION;
                continue;
            }
            break;
        case PUNCTUATION:
            number = number % 9;
            switch (number) {
                case 1: outputCharacter = '!'; break;
                case 2: outputCharacter = '?'; break;
                case 3: outputCharacter = ','; break;
                case 4: outputCharacter = '.'; break;
                case 5: outputCharacter = ' '; break;
                case 6: outputCharacter = ';'; break;
                case 7: outputCharacter = '"'; break;
                case 8: outputCharacter = '\''; break;
            }
            if (number == 0) {
                mode = UPPERCASE;
                continue;
            }
            break;
    }
    cout << outputCharacter;
} while (digitChar != 10);
cout << "\n";
```

---

## 2.1

Using only single character output statements that output a hash mark, space, or end of line, write a program that produces the following shape:

```text
########
 ######
  ####
   ##
```

## 2.2

Using only single character output statements that output a hash mark, space, or end of line, write a program that produces the following shape:

```text
   ##
  ####
 ######
########
########
 ######
  ####
   ##
```

## 2.3

Using only single character output statements that output a hash mark, space, or end of line, write a program that produces the following shape:

```text
#            #
 ##        ##
  ###    ###
   ########
   ########
  ###    ###
 ##        ##
#            #
```

## 2-4

Design a pattern and see if you can code it.

## 2-5

If you like the Luhn formula, you can try writing a program for a different check-digit system, like the 13-digit ISBN system. The program could take an identification number and verify it or take a number without a check digit and generate the check digit.

## 2-6

If you've learned about binary numbers and how to convert from decimal for binary and the reverse, try writing programs to do those conversions with unlimited length numbers (but you can assume they are small enough to still be stored in an int).

## 2-7

Have you learned about hexadecimal? Try writing a program that lets the user specify an input in binary, decimal, or hexadecimal and output in each of the three.

## 2-8

Want an extra challenge? Generalize the code for the previous exercise to make a program that converts from any number base-16 or less to any other number base. (Ex: Base-9 to Base-4).

## 2-9

Write a program that reads a line of text, counting the number of words, identifying the length of the longest word, and greatest number of vowels in a word and/or any other statistics you can think of.
