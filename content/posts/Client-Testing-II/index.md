---
path: '/CS9-Client-Testing-II'
cover: '../Programming-Foundations-Coding-Efficiency/speed.jpg'
slug: 'CS9-Client-Testing-II'
date: '2018-06-16'
title: 'CS9: Client Testing II'
tags: ['client testing', 'testing']
published: true
---

### Jest Matchers (assertions or expectations)

[Documentation on Matchers] https://facebook.github.io/jest/docs/en/expect.html

#### Some commonly used (and useful) matchers:

_to be or not to be, that is the question_
_ Not: reverses the assertion
_ toBe: that two values are equivalent using strict equality (checks reference/identity)
_ toEqual: that two values are equivalent by looking at the values (if it walks like a duck, it's a duck). For two different arrays with the same value, toBe fails and toEqual succeeds.
_ toContain: checks that a value exists in an array \* toHaveLength: checks the length of an array. Like toContain, it is more readable than using toEqual and toBe combined with array methods.

## Review:

##### Can we install Jest globally?

    You can install locally or globally.

##### Can Jest tests be run as part of the build and deployment process?

- As part of the project, if you're not going to build the software as some sort of continuous integration or build pipeline, you can install as a devDependency, but if you need it as part of the build pipeline you'll need it as a Dependency

#### Characteristics of unit tests:

    - fast
    - simple to write and execute
    - used to test correctness
    - written by developers
    - the tool for doing TDD/BDD

#### Why is 'watch mode' convenient? How can we 'turn it on' when running our tests?

    Auto update!  --watch
        It only runs the tests that it has to run.

# Today

- Drawbacks of testing
- More about Jest
- The other way to have Jest run tests (colocated ending in the `.spec.js` or `.test.js`)
- The other types of tests (component and snapshot)
- Setup and teardown globals
- Skipping and isolating tests
- Testing asynchronous operations // when you have a promise that you don't know when it's going to resolve, the test has to wait for that
- Fakes, stubs, and mock functions aka spies

## Drawbacks of Testing

- More code to write and maintain // need to write tests with the same care you write production code
- More tooling
- Additional dependencies
- May provide a false sense of security // could have 100% coverage, but that's just that every execution path is handled by a test. It could be that it doesn't test the right things.
- Non-trivial test failures may break the build // there could be a typo in the test

# More about Jest

- a test runner + cli in npm package
- made by Facebook and included out of the box with create-react-app
- general purpose, but works very well with React applications // uses vanilla JS
- recommended by React team
- can:
  - run tests (mocha too)
  - asynchronous code testing (mocha too)
  - spies included
  - snapshot testing
  - module mocking
- includes coverage reports // as you're writing code, you have watch. When you want to see coverage, you run Jest with --coverage
  - might be changing it so you can run both

# Running Tests:

- any file inside a `__tests__` folder will be run automatically
- any file that ends in `.spec.js` or `.test.js` will be executed automatically
  - you could have NPM scripts for a particular folder
  - you could execute a folder or file directly

# Component Tests:

- appearance and functionality of a component
- highly sensitive to small changes
  - Wen you're working on the back-end, normally that reflects the core business logic of your system (and that doesn't really move us fast).
  - There are changes that come in, you always have to do new changes, but nornmally you're building new features.
  - It's hard for a company to move their business model so much that you make a lot of changes quickly to a back-end that's already established.
  - Not the same with the UI, you could have changes on the UI happening all the time.
  - Any one of those small changes could break your tests.
    - This is where more than one expect in a test makes sense:
      - If you're pure and you need to do 4, 5, 6 expects to make sure they're working and you have them in five separate tests, you make a change and five tests break.
    - Instead of the same tests having five assertions and it tells you 'four of them passed, but one broke' and you broke one test, so you can fix it.
- great against regression
- verifies changes to component output resulting from changes to state // testing not only code is working but also that the output is right
- does not verify interaction between components
  - Because it's component testing, not application testing
  - If you have an application with subcomponents, the application itself is also a component, so you're also component testing
  - If you want to know how two components interact, what testing would that be?
    - Integration testing.

# Snapshot tests:

- kind of a sub-type of component testing (more in charge of output)
- very useful to spot regressions
- automatically generated by Jest
- a snapshot is a JSON based record of a component's output
- the snapshots are saved to a '**snapshots**' folder as a sibling of the tested component
- the snapshots are commited to source control // they evolve with your software, next developer downloads everything, including your snapshots
- during testing, the components are automatically compared to their last recorded snapshot
- checks current output against prior output
- fails with any change to the component

# Snapshot workflow:

- first, install 'react-test-renderer' if you haven't
- second `import renderer from 'react-test-renderer'`
- then `import { TheComponent } from './TheComponent'`
- createa tree
- run the assertions to match snapshot

```import renderer from 'react-test-renderer';
import { TheComponent } from '/TheComponent';
const tree = renderer.create(<TheComponent>);

expect(tree.JSON()).toMatchSnapShot();
```

- The first time, the snapshot is created
- When the snapshot fails, the developer can decide to update the snapshot if the change was intended
- to update snapshot: `jest TheComponent -u` or `--update`, but _ain't nobody got time for that_
  - (if you used create-react-app, the command is `yarn test -u`)

# Snapshot Pros and Cons:

- fast and semi-automatic
- catches regressions that could be missed by humans
- works with any library that generates HTML components (Angular, Vue, React)
- better than no tests at all to protect applications from regressions

- easy to override, save new snapshot
- protects only against regression
- easy to break, smallest change will fail test suite
- adds more files to the repository
- waste of time to have them while actively making changes to components
  Probably want to wait until you get to the version you're committing to

# Setup and Teardown Globals:

- exists in the global scope like `describe` and `it`
- beforeEach: runs before the tests, good for setup code
  - before each test, the beforeEach runs
  - this is when you neeed to reset the environment all the time
  - if you write a test that's setting up the environment on the arranged part and it's doing something and then the next step is doing the same thing, some people will pull that out into a beforeEach
  - Some people say you should have a helper function instead that you pass parameters and is going to give you that object so you can abstract away into your own function instead of using the beforeEach
- beforeAll: runs once before the first test
  - if you want it only once and you're not going to make modifications to it
  - before anything on the suite, the beforeAll runs
    // test runs
- afterEach: runs after the tests, good for clean up
- afterAll: runs once after the last test

# Skipping and Isolating Tests:

- skipping tests: 'it.skip()' // if it's the snapshot test you want to skip
  Example:

  ```
  it.skip('checks that it is an array', () => {
  const numbers = [1, 2, 3];
  const expected = 'array';

              const actual = Array.isArray(numbers);

              expect(actual).toBe(true);
          })

  ![Imgur](https://i.imgur.com/YXyLOQw.png)

  ```

- isolating is used to pick the tests you want to run: `it.only()` // if you're working on a test and you have suite of 400 tests but you're only working to fix one, so you only want to run that one.
  Example:

```
it.only('checks that it is an array', () => {
   const numbers = [1, 2, 3];
   const expected = 'array';

   const actual = Array.isArray(numbers);

   expect(actual).toBe(true);
});
```

![imgr](https://i.imgur.com/Jqb3RN4.png)

- it also works at the test suite level: `describe.only()` or `describe.skip()`
- Example:

```
describe.skip('default', () => {
   it('run the tests', () => {});
});
```

![imgur](https://i.imgur.com/pevYBe8.png)

# Testing Asynchronous Code

- does not complete right away
- Jest must be notified that the test completed
- techniques
  - invoke a `done()` callback that is passed to the test
  - return a promise from a test
  - pass an async function to `describe` (use async and await) **Preferred and cleanest syntax**

#### Examples:

- Invoking done():

```
it('async using callback', done => {
    setTimeout(done, 4000);
});
```

- Returning promise:

```
it('async using promises', () => {
    return new Promise( resolve => setTimeout(resolve, 3000) )
});
```

- Async/await:

```
it('async with async/await', async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
})
```

**Note:** Notice there's not a return for the async/await. Still Jest knows that before it can run any code, it needs to wait for that to resolve.

#Mocks

- a duplicate of a unit of code that has no implementation
- has the same API (method names, return value type and shape must be returned) of the original unit, but has no side effects
  - if the original library is making an ajax call, instead of making the call to the database, what happens if I return -1?
    - So instead of making the call, you pass in something that looks like the method that does that. It takes the same arguments and it's going to return a number. And then you say 'my fake is always going to return -1 for this test' so you can test for that. Instead of doing Array.indexOf, you say no, if you call that, I'm going to give a mock of the indexOf that always returns -1 so you can test that.
- prevent side effects
- reduce dependencies
  - you no longer need to bring in jQuery if you're mocking it
  - if you only need this one function for the lodash library, instead of bringing the whole lodash library to execute on the function, you say that what you want to test is if i use lodash to read this and i get 0 back, how does my code react to that 0? But then the original code that you're testing is trying to call lodash, so what do you do? You give it a fake lodash that when they call that method always returns 0.
- isolate tests to simplify testing

  - you pretty much guarantee that the universe looks the same every time you run the tests
  - the test needs to be pure. Every time you run them, the world must be the same
  - if you need to test a different scenario, then you do a different assertion passing different data

- add mocks to a `__mocks__` folder, next to the mocked module
  - you can mock npm modules and you can mock local files
  - if you're mocking npm modules, you name your mock the same. If you're mocking jQuery you call it jQuery.i
- to mock npm modules, just name your mock the same as the module and it will be loaded automatically
  - folder must be at the root of the application, next to the `node_modules` folder because it needs to be next to whatever it's mocking
  - add a file inside the folder with the name of the module you want to mock
- to mock local files:
  - add the `__mocks__` folder at the same level of the file to mock
  - where the mock is needed (the test file) call `jest.mock('path to code file to be mocked');`

# Spies

Spies are functions that provide information about how they are used.

- counts functions calls
- records arguments passed to it when it is called
- we can return fake values in order to test specific **scenarios**

  - A **_fake_** is when you take a piece of code that you have, like a library that has some methods, and instead of passing the library itself, you generate something on the fly that has the same API so that you can manipulate the return from that. The fake might be the whole method or object where you generate one with the same names and arguments so the executing code thinks you're getting jQuery but you're getting something that's called jQuery but not the jQuery library.
  - A **_stop_** is just data. If you hear that, stop is just something you can pass as an argument like an object with data that you can pass so you can control the data that is passed to a test, to a function you're testing. Some fake object holding data.
  - Spies (in this case they're called mocks) is just a function that then records a bunch of useful information.

- to create - `spies`: `const jamesBond = jest.fn()`; This creates a `noop` function.
- passing a function as the first argument, wraps that function into a `spy` that then keeps track of useful information.

Most test runners will check for errors.  
If it's not throwing an error, it looks like it's passing

- Some frameworks tell you it's a pending test - that you have the code but haven't done anything with it
  - In Jest, if you have an empty test, it shows up like a passing test
    - "The build system is breaking and the operations people are saying they won't deploy my change because the tests are failing." You go and comment down the test, save that, and if nobody's watching, it will go right to production with the test commented.

##### Is it a good thing that we don't have to write test code to test our test code?

What we have in those cases is some kind of coding standards and people who check, linters and things like that (if you don't want to buy into Typescript or Flow)

CLI section of docs: https://facebook.github.io/jest/docs/en/cli.html
You'll find some good stuff in there.

##### Is there a name for the chaining names like app.spec.js?

No. I think they use it so they can identify at a quick glance. Like software can look at this and knows that anything that ends with this will be a test. I don't know what the name of that is.

### (Amy answer: Maybe they were referring to Binary File Naming?

Jest uses textRegex to detect test files:
├── **tests**
│ └── component.spec.js # test
│ └── anything # test
├── package.json # not test
├── foo.test.js # test
├── bar.spec.jsx # test
└── component.js # not test)

```
import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';

describe('snapshot demo', () => {
    describe('saves the snapshot', () => {

    })
}) // Test suite failed - Your test suite must contain at least one test
```

```
describe('snapshot demo', () => {
    describe('saves the snapshot', () => {
        it('should work', () => {

        })
    })
})  // Passes
```

```
describe('snapshot demo', () => {
    describe('saves the snapshot', () => {
        it('should work', () => {
            const tree = renderer.create(<App />);

            expect(tree.toJSON()).toMatchSnapShot();
        })
    })
}) // 1 snapshot written in 1 test suite
// If you change the App.js and run again,
// it fails and tells you what changes there are between the two snapshots
```

Instead of having it test on every change, you can run `yarn test -u`

- Once you're done making changes to the UI, run tests without -u

#### Setup and Teardown Globals:

```
const utilities = require('.../index');

describe('default', () => {
    it('run the tests', () => {});
});

describe('add function', () => {
    // teardown
    afterAll(() => {
        console.log('after all ran');
    });
    // setup
    beforeEach(() => {
        console.log('before each ran');
    });

    it('should add two numbers', () => {
	    // arrange
        const add = utilities.add;

	    //act
	    const seven = add(3,4);
	    const four = add(0, 4);
        const minusThree = add(1, -4);

	    //assert
	    expect(seven).toBe(7);
	    expect(four).toBe(4);
	    expect(minusThree).toBe(-3);
    });

    it('checks identity', () => {
        const numbers = [1, 2, 3];

        //const actual = [1,2,3]
        const actual = numbers;

	    expect(numbers).toBe(actual);
    })

    it('checks that it is an array', () => {
	    const numbers = [1, 2, 3];
        const expected = 'array';

        const actual = Array.isArray(numbers)

	    expect(numbers).toBe(true)
    })
})
```

![Imgur](https://i.imgur.com/todFiNH.png)

##### What would be a good use case?

See the `numbers` right here? That I'm resetting them? That's a good example of that.

- I could have `const numbers = [1,2,3]` but then during the execution inside the test, I'm making changes to it
  - But you want it to always be reset to the original value before you run the test.
- Better example:
  ```
  it('can push items to the numbers array', () => {
      numbers.push(4)
   })
  ```
  - If you do this, you're modifying the array. So this is going to change the array as soon as this test runs, so the other tests will break.
    So before each of the tests, you're going to reset the value so it goes back to [1,2,3]

But that's the case, when you want to reset or set the value you want each test to always have the same unique value. If you want something that executes so you can reset the environment before each test because each test should have a pristine environment to run in.

##### Can't see all the tests.

- I think when you have too many, you won't see all of the descriptions
  - You'll see the failing ones.
- If you have a failing test, Jest will run that test first the next time the test suite runs.

##### Do you have Visual Studio ....

- I'm using the regular command prompt. But I'm cheating.
  - Using basic command prompt, but when I installed git on Windows, I selected add UNIX tools to your command line
  - So the stuff you use in bash is right here (in the terminal for Visual Studio Code)

##### So in unit tests there's a always a function as a second argument? Can we pass arguments into that?

- You could. I don't see a lot of that, but you could. It's just a function that will execute code.
  - We want to say that tests are always isolated, so they shouldn't bring anything from the environment unless it's something you use on the beforeEach and afterEach.
  - This is a camp that's divided. Some people say don't use that because you're violating the pureness of the test because these tests should not be affected by anything on the environment.
  - People say that instead of that, instead have a utilities or maybe just have a regular function, like:
    ```
    function makeThing(args) {
        return {
            args: args
        }
    }
    ```
- Say you have 100 tests in here. (You shouldn't, you should have a smaller test suite. Because if you have 100 tests, it means you're testing something that's probably doing a lot.) But if you do and you're using ... let's go back to the example of when I was using numbers at the beginning. If you're down here on line #425 and the before is all the way up on line #10, you have to scroll all the way up to see where that variable comes from.
  - Instead of that, have a helper function you can go and reference. But instead of it being magical inside of the beforeEach, you know that you're calling a function to get it so you'll see `const numbers = makeNumbersArray(5);` So now when you see numbers, you know where it's coming from so you can navigate to where it's being generated instead of it just appearing in your test.

##### What if I'm using the beforeEach and write comments?

- You could do that. Anything that adds readability.

But all the libraries have it because people know about them and they know that this stuff(beforeEach) are used for setups and this(afterAll) used to clean up at the end. Maybe you have timeouts or things in memory and you're testing, you're using those there. So at the end of running all the tests, you want to say hey, eliminate this timeout or this event that you just created. So all of that clean-up code you do it on the afters. Some of those you want to leave to have all of the tests. Some of them you want to clean up right after each test. That's why we have afterEach and afterAll.

I don't think I've seen people taking advantage of that you can pass a parameter. I don't see a good use case for that, to pass parameters in here.

##### Do the async functions have to be at the bottom?

- No, Jest will wait until it has all the results. Where you place the tests doesn't really matter.

##### Question: (Couldn't understand it)

- Because if I wanted to make this the default return from the arrow function I would use parantheses instead of curly braces. As soon as I use curly braces, I am saying this is now the body and if I want to return something, I have to use the return keyword.
  (in reference to `it('async with promises', () => { return new Promise(resolve => setTimeout(resolve, 2000))})` )
  - I could have done this, though (to get the implicit return from the arrow function):
    `it('async with promise', () => (newPromise(resolve => setTimeout(resolve, 2000))))`
