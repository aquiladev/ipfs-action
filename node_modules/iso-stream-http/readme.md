# iso-stream-http [![NPM Version](https://img.shields.io/npm/v/iso-stream-http.svg)](https://www.npmjs.com/package/iso-stream-http) [![NPM Downloads](https://img.shields.io/npm/dt/iso-stream-http.svg)](https://www.npmjs.com/package/iso-stream-http) [![NPM License](https://img.shields.io/npm/l/iso-stream-http.svg)](https://www.npmjs.com/package/iso-stream-http)


This module is an implementation of Node's native `http` module for the browser.
It tries to match Node's API and behavior as closely as possible, but some features
aren't available, since browsers don't give nearly as much control over requests.

This is heavily inspired by, and intended to replace, [stream-http](https://github.com/jhiesey/stream-http).

## What does it do?

In accordance with its name, `stream-http` tries to provide data to its caller before
the request has completed whenever possible.

All other supported browsers support pseudo-streaming, where the data is available before
the request finishes, but the entire response must be held in memory. This works for both
text and binary data.

## Usage

```js
const { https, http, getRequest } = require('iso-stream-http');

const req = new http.request('http://localhost/unicorns');
const req = new https.request('https://secure/unicorns');

// Detects url and returns http/https in node, just a helper function.
const req = new getRequest('https://secure/unicorns');
```

### Extra features compared to Node

* The `message.url` property provides access to the final URL after all redirects. This
is useful since the browser follows all redirects silently, unlike Node. It is available
in Chrome 37 and newer, Firefox 32 and newer, and Safari 9 and newer.

* The `options.withCredentials` boolean flag, used to indicate if the browser should send
cookies or authentication information with a CORS request. Default false.

* `options.requestTimeout` allows setting a timeout in millisecionds for XHR and fetch (if
supported by the browser). This is a limit on how long the entire process takes from
beginning to end. Note that this is not the same as the node `setTimeout` functions,
which apply to pauses in data transfer over the underlying socket, or the node `timeout`
option, which applies to opening the connection.

### Features missing compared to Node

* `http.Agent` is only a stub
* The 'socket', 'connect', 'upgrade', and 'continue' events on `http.ClientRequest`.
* Any operations, including `request.setTimeout`, that operate directly on the underlying
socket.
* Any options that are disallowed for security reasons. This includes setting or getting
certain headers.
* `message.httpVersion`
* `message.rawHeaders` is modified by the browser, and may not quite match what is sent by
the server.
* `message.trailers` and `message.rawTrailers` will remain empty.
* Redirects are followed silently by the browser, so it isn't possible to access the 301/302
redirect pages.
* The `timeout` event/option and `setTimeout` functions, which operate on the underlying
socket, are not available. However, see `options.requestTimeout` above.

## Example

``` js
http.get('/bundle.js', function (res) {
	var div = document.getElementById('result');
	div.innerHTML += 'GET /beep<br>';

	res.on('data', function (buf) {
		div.innerHTML += buf;
	});

	res.on('end', function () {
		div.innerHTML += '<br>__END__';
	});
})
```

## Running tests

There are two sets of tests: the tests that run in Node (found in `test/node`) and the tests
that run in the browser (found in `test/browser`). Normally the browser tests run on
[Sauce Labs](http://saucelabs.com/).

Running `npm test` will run both sets of tests, but in order for the Sauce Labs tests to run
you will need to sign up for an account (free for open source projects) and put the
credentials in a [`.airtaprc` file](https://github.com/airtap/airtap/blob/master/doc/airtaprc.md).
You will also need to run a [Sauce Connect Proxy](https://wiki.saucelabs.com/display/DOCS/Sauce+Connect+Proxy)
with the same credentials.

To run just the Node tests, run `npm run test-node`.

To run the browser tests locally, run `npm run test-browser-local` and point your browser to
the link shown in your terminal.

## License

MIT © [Hugo Dias](http://hugodias.me)
