# minp [![Codestyle fyi](https://img.shields.io/badge/code%20style-fyi-E91E63.svg)](https://github.com/tobihrbr/fyi) [![Build Status](https://travis-ci.org/tobihrbr/minp.svg?branch=master)](https://travis-ci.org/tobihrbr/minp) [![Windows Build Status](https://ci.appveyor.com/api/projects/status/xgckpx9bajrvcli8?svg=true)](https://ci.appveyor.com/project/tobihrbr/minp) [![Coverage Status](https://coveralls.io/repos/github/tobihrbr/minp/badge.svg?branch=master)](https://coveralls.io/github/tobihrbr/minp?branch=master)

> A minimal promise polyfill

If you cannot rely on native promises and you can't use a huge promise polyfill then `minp` has got you covered!

## About

`Minp` is a barebones promise polyfill it does not nearly cover the whole promise [specification](https://promisesaplus.com/) but it is really tiny(<30 loc). `Minp` is meant to be used in libraries that want to offer promise goodness to every use without shipping huge polyfills.

## Install

```
$ npm install --save minp
```

## Usage

```js
const P = require('minp');

const promiseFunction = (args) => new P ((resolve, reject) => {
  if (args === 'awesome') {
    resolve('yes', 'it', 'is');
  } else {
    reject(new Error('Nope!'));
  }
});

promiseFunction('awesome').then((arg1, arg2, arg3) => {
  console.log(arg1, arg2, arg3);
  // => 'yes it is'
}).catch((err) => {
  console.error(err);
});
```

## API

### P(resolvable)

#### resolvable(resolve, reject)

Type: `function`

Whatever you want - it's just a function.

##### resolve

Type: `function`

You should call `resolve` if everything worked. You can pass whichever arguments you want, they will be handed over to `.then`. If you resolve the promise `.then` will be executed.

##### reject

Type: `function`

You should call `reject` if an error occurred. Just pass the error as an argument. If you reject the promise `.catch` will be executed.

## License

MIT © [Tobias Herber](https://tobihrbr.com)
