---
path: '/M310-MongoDB-Security-Pt-1'
cover: '../Programming-Foundations-Coding-Efficiency/speed.jpg'
slug: 'M310-MongoDB-Security-Pt-1'
date: '2019-06-23'
title: 'M310 - MongoDB Security'
subtitle: 'Part I'
tags: ['security', 'MongoDB']
published: true
---

## Authentication

Verifying the identity of a user of the system - who they are.

## Authorization

Verifying what in the system that user has access to - what they can do.

## Starting MongoDB with Auth

`mongod --auth`

With authentication enabled, you will not be able to do any database operations until you are authenticated. But what do you do if it's a new database and it doesn't have any users yet?

Answer: There's a localhost exception! You are able to create one user which you will then be able to use to create other users (you can't create more than one).

Steps:

1. Switch to admin database (`use admin`)
2. Create user `db.createUser({user: 'Username', pwd: 'password', roles: [{role: 'useAdminAnyDatabase', db: 'admin'}]})`
3. Profit! (Not really - though you should now be able to run the command `db.system.users.find()` and get a response.

## Authentication Methods

By default, shell will connect to test database but you want to authenticate with the admin database

`mongo admin -u Username -p password`

When you want to connect to a database different from where your authentication is created:
`mongo -u Username -p password --authenticationDatabase=admin`

Other option:

1. Connect to mongo shell `mongo`
2. Switch to admin database `use admin`
3. Authenticate `db.auth('Username', 'password')`

### User must authenticate against database created on

## mtools

`mlaunch`

`mlaunch init --sharded 3 --replicaset --nodes 3 --config 3 --auth`

mlaunch by default creates a user with the username `user` and password `password`

Using internal authentication automatically enables client authentication on sharded clusters

`mongod --setParameter enableLocalhostAuthBypass=false`

## X.509

`mongod --sslMode requireSSL --sslPEMKeyFile server.pem --sslCAFile ca.pem`

### Figure out subject of client certificate

- client.pem
  - public key
  - private certificate
    - subject line to see who the certificate was written to

`openssl x509 -in client.pem -inform PEM -subject -nameopt RFC2253 -noout`

Copy that output

`mongo --ssl --sslPEMKeyFile client.pem --sslCAFile ca.pem --auth`

`db.getSiblingDB('$external').runCommand({createUser: '${subjectLine}', roles: [{role: 'root', db: 'admin'}]})`

## LDAP (Lightweight Directory Access Protocol)

- Commonly used within companies
- With LDAP authentication support, users can authenticate to mongoDB using their LDAP credentials
- MongoDB communicates to LDAP server using the saslauth proxy process.

MongoDB uses the sasl plain mechanism for communicating with clients, sending and receiving data through plaintext. You can configure how saslauth communicates with the LDAP Server, but by default that also communicates via plaintext.

### Steps to configure LDAP

Install sasl:
`sudo apt-get install sasl2-bin`

Edit sasl file:
`sudo vim /etc/default/saslauthd`
(Sudo necessary because in /etc directory)

- change `START=no` to `START=yes`
- change `MECHANISMS="pam"` to `MECHANISMS="ldap"`

Create a file called `sudo vim /etc/saslauthd.conf`.

Inside that file, configure your LDAP:

```
ldap_servers: ldap://localhost:389
ldap_search_base: dc=mongodb,dc=com
ldap_filter: (uid=%u)
```

Run the command `sudo ls /var/run/saslauthd/` to see what files are inside your sasl folder.

`mux` is a unix socket and is the reason why we need to use `sudo` commands in this folder.

Change permissions:
`sudo chmod 755 /var/run/saslauthd/`

Verify saslauthd can communicate with the LDAP server:
`testsaslauthd -u User -p password -f /var/run/saslauthd/mux`

## Authentication

- LDAP
- Kerberos
- X509
- SCRAM

If you use LDAP Server for authorization, does not mean you need to use LDAP Server for authentication.

### Steps of Authorization

1. Authenticate of credentials passed to MongoDB
2. Transform credentials to be able to match those set for authorization
3. Validate authorization

- MongoDB will do a query to retrieve the LDAP group information
- If the query requests attributes from an entity, the attribute values will be treated as the user groups.

4. If LDAP authorization is enabled, default determines that each distinguished name will be treated as the name of a role on the admin database. Roles may be created that are made of roles a user could possess.
