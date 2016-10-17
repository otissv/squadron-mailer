# Squadron Mailer Service

GraphQL Mailer Service with Node and RethinkDB.


## Usage

1 . Clone the repo.

```
$ git clone https://github.com/otissv/squadron-mailer.git
```

2 . cd into the cloned directory and install the packages

```
$ npm install
```

3 . Add a secret.js to root directory with the following
```
export const mail = {
  user: 'your@email.com',
  password: 'password'
};

export const token = 'change_to_secret';
```

4 . Start the server
```
npm start
```


## License
MIT
