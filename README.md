# node-hackdb

## Setup
`$ git submodule update --init # To grab the hackdb source.`

You don't care about your data -> neither do we -- even inside Node.js.

## Install node-gyp

```bash
$ npm install node-gyp -g
```

## Build the `hackdb` bindings

```bash
$ node-gyp rebuild
```

## Start up the server

```bash
$ node index.js
```

## `POST` data to set keys

```bash
$ curl -X POST <address>:<port> --data "foo=bar"

OK! SET key: foo -> value: bar

```

## `GET` data to, um, get keys

```bash
$ curl -X GET <address>:<port>?"key=foo"

OK! GET key: foo -> value: bar

```

Always remember to persist [responsibly](http://ai.mee.nu/seeking_a_database_that_doesnt_suck).
