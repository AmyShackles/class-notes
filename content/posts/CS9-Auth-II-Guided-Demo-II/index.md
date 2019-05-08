---
path: '/CS9-Auth-II-Guided-Demo-II'
cover: '../Programming-Foundations-Coding-Efficiency/speed.jpg'
slug: 'CS9-Auth-II-Guided-Demo-II'
date: '2018-06-14'
title: 'CS9: Auth II'
subtitle: 'Guided Demo II'
tags: ['authentication', 'CS9']
published: true
---

### Client Auth

Routes:

- /
- /signup
- /signin
- /users

Configure router

- add react-router-dom
- add routes

Build the forms.

If it's only for using local authentication, we can use middleware
When users don't want to have a different username or password for everything they use, passport is helpful
Examples: Using Github to log into things and using Google to log in to other things

- Having the ability to add that to your application so users can use whatever account they own is powerful

Industry as a whole is moving toward OAuth
Security experts say it's not perfect yet, but it's one of the best technologies we have.
OAuth is about authorization but you can bring something else in to do authentication

OAuth 2 is go-to strategy companies use to do authentication

Firebase is a good service. Google bought it, so it's Google Firebase now
Auth0 also has generous free tier

### Auth-N vs Auth-Z

Authentication is you establishing your identity
Authorization is you (as API user) saying once you know who someone is, what can they do

Role-based authorization is usually where people start

At the end of the day, you want to restrict whether or not a client can get to a resource

Difference between passport.use and passport.authenticate
passport.use is how you tell passport the strategies you have, what middleware you have
when you tell passport to use local middleware, somewhere passport is going to save an object that has a key of local and has all the configuration information your middleware (configuration object)
will let you call express middleware later by calling the name of the key on that object
When you say passport.authenticate with local, it says to read the configuration options and find out what it needs to do to use that

### TLDR: passport.authenticate generates express middleware out of the configuration of the strategy

`passport.use()` will register the strategy with passport

```javascript
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require ('jsonwebtoken')

const secret = 'Who but me?  Loves JWT';
const port = process.env.PORT || 5000;
const User = require('./users/User');

const server = express()
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};

server.use(express.json());
server.use(cors(corsOptions));

//  Helper Functions
const getTokenForUser = userObject => {
    // creating a JWT and returning it.
    // this function is more of a simple helper function than middleware,
    // notice 'req, res, and next' are missing, this is because the auth is simple here.
    // no need for custom middlware, just a helper function.  :)
    return jwt.sign(userObject, secret, { expiresIn: '1hr' })
};

const validateToken = (req, res, next) => {
    // this piece of middleware is taking the token delivered up to the server and verifying it
    // if no token is found in the header, you'll get a 422 status code
    // if token is not valid, you'll receive a 422 status code
    const token = req.headers.authorization;
        if (!token) {
            res.status(422).json({ error: 'No authorization token found on Authorization header.' })
        } else {
            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    res.status(401).json({ error: 'Token invalid, please log in', message: err })
                } else {
            // token is valid, so continue on to the next middleware/request handler function
                    next()
                }
            })
        }
}

//  Route Handlers

server.post('/api/users', (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });

    user.save((err, user) => {
        if (err) return res.send(err)

    const token = getTokenForUser({ username: user.username })
        res.json({ token });
    });
});

server.get('/api/users', validateToken, (req, res) => {
    User.find({})
    .select('username')
    .then(users => {
        res.send(users);
    })
    .catch(err => {
        return res.send(err);
    });
});

server.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username }, (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Invalid Username/Password });
        }
        if (!user) {
            return res.status(422).json({ error: 'No user with that username in our DB' })
        }
        user.checkPassword(password, (err, isMatch) => {
            if (err) {
                return res.status(422).json({ error: 'passwords don't match' })
            }
            if (isMatch) {
                const token = getTokenForUser({ username: user.username });
                res.json({ token });
            } else {
                return res.status(422).json({ error: 'passwords don't match' });
            }
        });
    });
});

//  Connect to DB and start the API
mongoose.connect('mongodb://localhost/auth')
    .then(() => {
        console.log('\n--- Connected to MongoDB ===');
    server.listen(port, (req, res) => {
        console.log('\n=== API up on port ${port} === \n');
        });
    })
    .catch(err => console.log('\n=== Error connecting to MongoDB, is it running? ===\n', err)
)
```

Question: What in the code is replacing Passport?

validateToken - not completely because you're not adding anything to request.user, but you could still do that

Are there any settings for how many times a user can attempt to log in?

Not on this server.
Normally you'd use business logic for that, save it somewhere on the server and keep a count somewhere of failed attempts
Don't know if libraries already implement that
Might have a setting

Never, ever, ever trust the clients of your API
Always validate

`yarn add axios react-router-dom`
axios to make HTTP requests
react-router-dom for routing

Simplest way to configure routing for React application:
'I tend to have my router at the highest possible level'
Index.js

Index.js

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-dom'

import './index.css'
import App from './App';

ReactDom.render(
<Router>
<App />
</Router>,
document.getElementById('root')
);
```

App.js

```javascript
import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

import logo from './logo.svg;
import './App.css'
import Signin from './auth/Signin'
import Users from './users/Users';

class App extends Component {
    render() {
        return (
            <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title"> Welcome to React </h1>
                    {localStorage.getItem('token') && (
                        <button onClick={this.signout}> Sign out </button>
                        )} // this makes it so that it only renders the button when user is logged in
                // this is on the App so that other routes have access to it (not just /users)
            </header>
                Routes go here

            <Route path="/signin" component={Signin} />
            <Route path="/users" component={Users} />
            </div>
        );
    }
signout = () => {
    localStorage.removeItem('token');
    this.props.history.push('/signin')
    }
}

export default withRouter(App);
```

Question: What about Switch?

I'm not going to use Switch. You normally use Switch when you want to make sure you only pick one route. This is going to be simple.

Signin.js

```javascript
import React from 'react';

class Signin extends React.Component {
    state = {
        username: 'bilbo',
        password: 'baggins'
    }

    render() {
        return (
            <form onSubmit={this.submitHandler}>
            <div>
                <label htmlFor="username" />
                    <input name="username"
                    value={this.state.username}
                    onChange={this.inputChangeHandler}
                    type="text" />
            </div>
            <div>
                <label htmlFor="password" />
                <input name="password"
                value={this.state.password}
                onChange={this.inputChangeHandler}
                type="password">
            </div>
            <div>
                <button>Sign in</button>
            </div>
        </form>
        )
    }
    inputChangeHandler = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }
    submitHandler = (event) => {
        event.preventDefault()

axios.post('http://localhost:5500/login', this.state)
    .then(response => {
        localStorage.setItem('token', response.data.token)
        // localStorage is a global accessible object on window
        this.props.history.push('/users');
    }).catch(err => {
        localStorage.removeItem('token') // if credentials are wrong, destroy token
        }
    }
}
export default Signin
```

What is the default behavior from a form when you hit submit?

- Refresh

How do we stop that?

- preventDefault

Why the square brackets around the name?

- `const o = { name: 'Nalee' }` - two ways to get at that
  o.name || o['name'][name]: value is the inverse
  It's a way to have a dynamic updating of the state with a single event handler
  Stole from React documentation

type="password" is what makes password appear as dots instead of text (UI gimmick)
onSubmit on the form allows the user to submit the form by hitting enter instead of having to click the button

Response comes in as response.data
Users.js

```javascript
import React from 'react'
import axios from 'axios'

class Users extends React.Component {
    state = {
        users: []
    }

    render() {
        return (
            <ul>
                {this.state.users.map(user =>  <li key={user._id}>{user.username}</li>)}
            </ul>
        )
    }
componentDidMount = event => {
    const token = localStorage.getItem('token')
    const authToken = Bearer ${token};
    const requestOptions = {
        headers: {
            Authorization: authToken
        }
    };

axios.get('http://localhost:5500/users', requestOptions)
    .then(response => {
        this.setState({ users: response.data })
    })
    .catch(err => {
        this.props.history.push('/signin');
    })
    }
}
export default Users
```

// Can save things in local storage in the browser and retrieve them by their key
// Since App component is mounted in Index but not as part of a Route, it doesn't have this.props.history
// So you have to import withRouter and when you export the App component you wrap it with withRouter
// Can you clear login when you logout? Yeah, just set state to empty strings

Steps:

- Wrap router with BrowserRouter
- Have App component with routes mounting Signin and Users

Signin

- Have post on submit handler of form
- event.preventDefault() so that it doesn't refresh the page and wipe out state
- Call localStorage.setItem, passing a name for the token and the token from the response
- setItem is how we save something on localStorage
- this.props.history.push('/users')
  Users
- getItem - retrieve something from localStorage
- assemble the token
- make get request to /users and pass the headers in the requestOptions, including the token
- if there's an error, redirect to /signin (including unauthorized)

Not using single token for all users
Separate token for each user
New token after token has expired

Is localStorage domain-specific?

- It's domain-specific where the browser is running, not the domain of the API
- It will be user-specific because every user gets their own browser environment

Any localStorage from Facebook will only be on Facebook
Each page has its own localStorage environment

If you wanted to make it so that users not only had to be logged in, but had certain information ....
Logged in and also has a role

### Code Below is generalized and not necessarily functional:

// if you want roles, should add role to the userSchema or have it as an option in a put request
// that way you can pass it to the token in order to use that to validate role

```javascript
function makeToken(user) {
const timestamp = new Date().getTime();
const payload = {
    sub: user._id,
    iat: timestamp,
    username: user.username,
    role: user.role,
};

function checkRole(role) {
    return function(req, res, next) {
        if (role === req.user.role) {
            next()
        } else {
            res.status(403).send('you have no power here')
        }
    }
}

server.post('/login', authenticate, roles('admin'), (req, res) => {
    res.status(200).json({ token: makeToken(req.user), user: req.user })
})

server.get('/users', protected, roles('user admin'), (req, res) => {
    Users.find()
    .select('username')
    .then(user => {
        res.json(users)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})
```

No logout for Passport - doesn't have sessions. Destroy token if you want to revoke access
In order to combine tokens and being able to login on the server, they keep a blacklist of tokens
Looks at JSON token ID and invalidates it when a user logs out
Running list of all tokens
On every request, it checks if the token is valid and then checks if it is blacklisted

When you're using tokens, the server does not save information about the logged in users
No memory on the system about who is logged in
Relies solely on the token being valid

Most people give you a token that has a short lifespan and a refresh token to maintain connection

Announcement at end: Patrick Kennedy did a brownbag on basics on textediting and using git and Github for success
Looking at Brownbag .... video is available here: https://www.youtube.com/watch?v=z2_fW329LK8&feature=youtu.be
