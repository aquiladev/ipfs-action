# os-name [![Build Status](https://travis-ci.com/sindresorhus/os-name.svg?branch=master)](https://travis-ci.com/github/sindresorhus/os-name)

> Get the name of the current operating system\
> Example: `macOS Sierra`

Useful for analytics and debugging.

## Install

```
$ npm install os-name
```

## Usage

```js
const os = require('os');
const osName = require('os-name');

// On a macOS Sierra system

osName();
//=> 'macOS Sierra'

osName(os.platform(), os.release());
//=> 'macOS Sierra'

osName('darwin', '14.0.0');
//=> 'OS X Yosemite'

osName('linux', '3.13.0-24-generic');
//=> 'Linux 3.13'

osName('win32', '6.3.9600');
//=> 'Windows 8.1'
```

## API

### osName(platform?, release?)

By default, the name of the current operating system is returned.

You can optionally supply a custom [`os.platform()`](https://nodejs.org/api/os.html#os_os_platform) and [`os.release()`](https://nodejs.org/api/os.html#os_os_release).

Check out [`getos`](https://github.com/wblankenship/getos) if you need the Linux distribution name.

## Contributing

Production systems depend on this package for logging / tracking. Please be careful when introducing new output, and adhere to existing output format (whitespace, capitalization, etc.).

## Related

- [os-name-cli](https://github.com/sindresorhus/os-name-cli) - CLI for this module

---

<div align="center">
	<b>
		<a href="https://tidelift.com/subscription/pkg/npm-os-name?utm_source=npm-os-name&utm_medium=referral&utm_campaign=readme">Get professional support for this package with a Tidelift subscription</a>
	</b>
	<br>
	<sub>
		Tidelift helps make open source sustainable for maintainers while giving companies<br>assurances about security, maintenance, and licensing for their dependencies.
	</sub>
</div>
