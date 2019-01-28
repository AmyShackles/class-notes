---
path: '/CS9-Auth-II-Guided-Demo-I'
cover: '../Programming-Foundations-Coding-Efficiency/speed.jpg'
slug: 'CS9-Auth-II-Guided-Demo-I'
date: '2018-06-13'
title: 'CS9: Auth II'
subtitle: 'Guided Demo I'
tags: ['authentication', 'CS9']
published: true
---

morgan: method/ Route/ status / time /

```
const express = require('express')
const db = require('./_config/db')
const setupMiddleware = require('./config/middleware')
const setupRoutes = require('./config/routes');

const server = express()

db
    .connectTo('jwtauth')
    .then(() => console.log('\n... API Connected to jwtauth Database ...\n'))
    .catch(err => {
        console.log('\n ERROR Connecting to MongoDB, is it running? \n', err)
    })

setupMiddleware(server)
setupRoutes(server)

server.listen(5500, () => console.log('\n=== API running on port 5500 ===\n' ))

const userRoutes = require ('.../users/userRoutes');
const authRoutes = require('.../auth/authRoutes');

module.exports = function(server) {
    server.get('/', function(req, res) {
        res.send({ api: 'up and running' })
});

server.use('/api/users', userRoutes);
server.use('/api/auth', authRoutes);
};

const router = require('express').Router()
const User = require('./User');

router.get('/', (req, res) => {
    User.find()
    .select('-password') // remove password from data sent on response
    .then(users => {
        res.json(users);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

module.exports = router

const router = require('express').Router()
const User = require('.../users/User');

router.post('/register', function(req, res) {
User.create(req.body) // this does new User and user.save
    .then(user => {
        res.status(201).json(user);
        // will remove password later - need to make sure it's hashed, that's why it's there
    })
    .catch(err => res.status(500).json(err))
})

module.exports = router;


const mongoose = require('mongoose)
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 4, // make this at least 12 in production
    }
})

userSchema.pre('save', function(next) {
    return bcrypt.hash(this.password, 10)
    .then(hash => {
        this.password = hash;
    return next();
    })
    .catch(err => {
        return next(err)
    })
})

userSchema.methods.validatePassword = function(passwordGuess {
    return bcrypt.compare(passwordGuess, this.password)
})
```

Cookies are automatically included on every request
JSON with tokens are not

Cookies are unique to each domain plus device pair
JSON with tokens can go across domains

Cookies are sent in cookieheader
JSON with tokens can be sent on headers or other places

Tokens have a larger size limit (8 or more vs 4kb)
Work well with stateless authentication flows
HTTP is stateless

Passportjs is a library to use JSON with tokens
http://www.passportjs.org/

JWT
https://jwt.io/
If you want to do role-based authorization, can include in payload

JWT is header + payload + signature
Node.js library - jsonwithtoken

Luis has only written an authentication system for personal projects
Usually a senior development at a company will write this kind of code

Payload Data:
"sub" - subject
"iat" - issued at (timestamp)

```
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('.../users/User');

const secret = 'that is what I shared yesterday lol'; // would probably come from config file
// on every request, client sends token - secret is how you decrypt and encrypt token to make sure it's the right one
router.post('/register', function(req, res) {
    User.create(req.body) // this does new User and user.save
        .then(user => {
            const token = makeToken(user);
            res.status(201).json({ user, token }); // will remove password later - need to make sure it's hashed, that's why it's there
        })
        .catch(err => res.status(500).json(err))
})

function makeToken(user) {  // Would probably put this in a different file for helperfunctions
    // build the token
const timestamp = new Date().getTime()
    const payload = {
        sub: user._id,
        iat: timestamp,
        username: user.username
    };
const options = { // list of options found at https://www.npmjs.com/package/jsonwebtoken
        expiresIn: '24h' // Every day, user needs to refresh token
    };
    return jwt.sign(payload, secret, options); // synchronous operation
}

module.exports = router;
```

Questions:

1. Why are you declaring secret outside?

You need it to decode the token, so instead of having to copy it in both places, you can extract it as a variable to use later

2. Does pre-save hook also work on create?

Yes, because User.create() is new User + user.save()

3. Is it normal after setting ttl for sessions with connect-mongo they're still in the database and have to be removed manually?

It's a combination of both - if it's not expired, they're not going to be removed. ttl will check every once in a while, but if you have a cookie that you said will last 24 hours, it'll still be there. By setting that to a sensitive number and make sure you have an expiration on the cookie, it'll clean up after itself.

4. What is an alternative of using a timestamp as an iat?

They should be a NumericDate. Can't be string with a date.

Sub and iat are defined as industry standard - sub is information about the object and iat is a timestamp

5. What is the common relationship between cookies and tokens?

They're containers for information you can produce on the server either about the user or session that can be passed back and forth and can be used for authentication and authorization
Authentication is establishing with the server who you are. Authorization is establishing with the server what you do.
403 - I know who you are, you just don't have access.

Modules
server side auth using JWTs with passport and jsonwebtoken npm modules
client side auth with JWT/local storage

### JWTs

An open standard
No need for session store or cookies.

Token is sent every time, because now we're stateless, (no session storage on the server) like HTTP

The token will be stored on the client, possibly inside local storage (key-value store for the browser)

### Overview of the Process:

- User signs up
- Server hashes the user password and stores the user in the database
- Server creates JWT token (encrypted and signed using secret)
- Send JWT token back to the client as part of the response
- Client stores the token
- Client sends token on every request
- Server verifies token and denies or provides access to resource

Many different ways of doing this with Express and MongoDB

We'll use Mongoose models. We could use schema.Methods. We could use schema.statics. We could use middleware (tied to lifecycle events)

We'll use middlware to hash the passwords. We'll hash them on the schema.pre('save', function(next) { // here })

Passport is the go-to library for auth in Node.js

## Authentication

- Client sends credentials
- Server verifies credentials
- Server sends back token
- Client stores the token
- Client sends token on every request
- Server verifies that the token is valid
- Server provides access to resource

## Cookies

- automatically included on every request
- unique to each domain + device pair
- cannot be sent to a different domain
- sent in the cookie header
- has a body that can have extra identifying information
- max size around 4KB

## Tokens

- have to be wired up manually on both server and client
- sent inside the Authentication header
- can be sent to any domain - important when your client and server are deployed to different servers/domains
- larger site limit than cookies (research the size)

## JWTs

- on successful register or login, take user id + server secret to generate jwt
- on request for protected resource, take jwt + server secret to decode token and obtain user id
- the three methods we'll use are sign, verify, and decode

When signing the token, sub refers to the subject (who is this token about) and iat means issued at time and will be included by default

## Passport

- Authentication middleware. More of an ecosystem of strategies.
- install passport and passport-jwt
- configure and use a strategy (a kind of plugin)
- tell the strategy where to find the payload and secret
- use passport as jwt middleware for the protected routes
- `js const protected = passport.authenticate('jwt', { session: false });`
- payload comes from the token payload

Add the /api/hobbits and /api/wizards and configure the hobbits route to be protected
for hobbits: server.get('/api/hobbits', protected, homies ...)

To test it:

- sign up
- copy the returned token (without quotes)
- add the token to the Authorization header. Note that removing the Bearer part will make it fail. Seems like postman normalizes the casing, so Bearer or bearer + space + token both work
  Hitting the wizards route works but the hobbit routes should now need the token

Login

- add a local strategy to let the user authenticate using username and password
- install passport-local strategy module/po
- inside the local strategy config function use the method to verify password against database (not written yet)
- add the method ot the .methods object on the user model
- tell passport to use that strategy for login: passport.use(localStrategy)
- define another middleware for the local strategy: `const authenticate = passport.authenticate('local', { session: false })`
- add it to the login route server.post('/api/login', authenticate, (req, res) => {}) Here we just need to provide the token, because by the time they hit this route, they already authenticated.
- test it on postman and the token should be returned

#### Three scenarios:

- register
- login
- access protected resource

#### Three players:

- Register use 'jsonwebtoken'
- Access a protected resource: The 'jwt' strategy is used to extract from header and decoding
- Login: The local to verify username and password on login and provide a token on success

For jwt signing and decoding the tokens we use jsonwebtoken

##Client Auth
Four routes:
/
/signup
/signin
/users

Configure router:

- add react-router-dom
- add routes

Build the forms

```
const router = require('express').Router()

const jwt = require('jsonwebtoken')
const passport = require('passport');
const LocalStrategy = require('passport-local')

const { JwtStrategy } = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt')

const User = require('.../users/User');

const secret = 'that is what I shared yesterday lol'; // would probably come from config file
// on every request, client sends token - secret is how you decrypt and encrypt token to make sure it's the right one

const localStrategy = new LocalStrategy(function(username, password, done) { // done is kind of like next() and acts like a callback
    User.findOne({username}).then(user => {
        if (!user) { // user could return the user or null, thus the if statement
            done(null, false)
        } else {
            user.validatePassword(password) // password is coming from strategy library
                .then(isValid => {
                    if (isValid) {
                        const { _id, username } = user
                        return done(null, { _id, username }) // this ends in req.user
                    } else {
                        return done(null, false)
                    }
                }).catch(err => {
                    return done(err);
                })
            }
    }).catch(err => done(err))
})

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
}

const jwtStrategy = new JwtStrategy(jwtOptions, function(payload, done) {
    User.findById(payload.sub) // when we made the token, inside the payload of the token we say that the userId is the sub
        .then(user => {
            if(user) {
                done(null, user) // this is req.user
            } else {
                done(null, false)
            }
        }).catch(err => {
            done(err)
        })
}

// passport global middleware
passport.use(localStrategy);
passport.use(jwtStrategy);

// passport local middleware
const passportOptions = { session: false } // by default passport will use sessions
const authenticate = passport.authenticate('local', pssportOptions)
// we set this to false because we want to use JSON web tokens
const protected = passport.authenticate('jwt', passportOptions)

// helpers
function makeToken(user) {  // Would probably put this in a different file for helperfunctions
// build the token
    const timestamp = new Date().getTime()
    const payload = {
        sub: user._id,
        iat: timestamp,
        username: user.username
    };
    const options = { // list of options found at https://www.npmjs.com/package/jsonwebtoken
        expiresIn: '24h' // Every day, user needs to refresh token
    };
    return jwt.sign(payload, secret, options); // synchronous operation
}

// routes

module.exports = function(server) {
server.get('/', function(req, res) {
    res.send({ api: 'up and running' })
})

server.post('/register', function(req, res) {
    User.create(req.body) // this does new User and user.save
        .then(user => {
            const token = makeToken(user);
            res.status(201).json({ user, token }); // will remove password later - need to make sure it's hashed, that's why it's there
        })
        .catch(err => res.status(500).json(err))
})

server.post('/login', authenticate, (req, res) => {
    // if we're here the user logged in correctly
    res.status(200).json({ token: makeToken(req.user), user: req.user })
});

server.get('/users', (req, res) => {
    User.find()
        .select('username')
        .then(users => {
            res.json(users);
        }).catch(err => {
            res.status(500).json(err)
        })
    })
}
```

The good news is you don't have to do this a lot.
On your personal projects because no one else will do it for you, but other than that...

All you have to do is add the bearer authentication header to your requests
When you get the token back, you need to store it somewhere in the application so you can send it back with the request
Can use local storage for that

Is there any other way shorter than this and efficient?
I don't know of any. Passport takes away a lot of the things you have to use manually
There's more to it than just this, but it's the same pattern - following the documentation on each strategy

Need at least three libraries:

- Bcrypt
- Passport
- jsonwithtoken
