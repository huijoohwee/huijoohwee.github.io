# Run Control

Run control (or runtime configuration) for command line interfaces.

See [rc][rc] for some interesting information on the etymology of `rc`.

## Install

```
npm install cli-rc
```

## Test

```
npm test
```

## Features

* Support for `ini` and `json` rc files
* Sensible default search paths
* Logical default naming convention
* 100% code coverage

## Usage

Assuming your program was named `prg` and your program expects JSON formatted rc files this would search for `.prgrc` in the package directory followed by the user's home directory:

```javascript
var rc = require('cli-rc');
rc(function loaded(err, rc) {
  if(err) throw err;
  // do something with rc object
});
```

If neither file was located the `rc` parameter will be the empty object, otherwise it will contain the merged contents of all files with precedence in reverse order, ie, properties declared in the last file will override properties loaded by previous files.

You may use the `name` option to specify an alternative file name, set the `type` option to `INI` to indicate that your rc files are ini formatted and configure the directory search paths with the `path` option.

For example, to search for rc files `/usr/local/etc/prg/prg.ini` and `/usr/local/lib/prg/prg.ini` (in that order):

```javascript
var rc = require('cli-rc');
var opts = {
  type: rc.INI, name: 'prg.ini',
  path: ['/usr/local/etc/prg', '/usr/local/lib/prg']
};
rc(opts, function loaded(err, rc) {
  if(err) throw err;
  // do something with rc object
});
```

## Options

### append

A boolean that appends the default search paths to directories specified in `path`, only applicable if `path` has been specified as an option. May also be an array of paths to append to the default search path.

### base

A path to the directory for the package.

### home

A function that may be used to determine the home directory location, default implementation inspects `process.env.HOME`.

### lenient

A boolean that gathers errors into an array and continues processing subsequent rc files, default is `false`.

### name

The name of the rc file to load, default is:

```javascript
'.' + basename(process.argv[1]) + 'rc'
```

### path

Array of directories to search for rc files, default is the package directory and the user's home directory.

Note that no path entry for the user's home directory will be added if it could not be determined from environment variables, see [home()][home].

### prepend

A boolean that prepends the default search paths to directories specified in `path`, only applicable if `path` has been specified as an option. May also be an array of paths to prepend to the default search path.

### resolve

A function that is passed each path and may be used to resolve relative paths to absolute paths.

### type

The expected format of rc files, either `ini` or `json`, default is `json`.

## API

### Module

#### ([options], [callback])

Creates a `RunControl` instance.

* `options`: The configuration options.
* `callback`: A callback function.

If `callback` is specified and is a `function` then it is passed to `RunControl.load()`.

Returns the `RunControl` instance.

#### INI

String constant representing the `ini` type.

#### JSON

String constant representing the `json` type.

#### RunControl

Reference fo the `RunControl` class.

### RunControl

Class used to load rc files.

#### RunControl([options])

Creates a `RunControl` instance.

* `options`: The configuration options.

Throws `TypeError` if `options.type` is invalid.

#### load(callback)

Loads rc files.

* `callback`: A function to invoke when the load operation is complete.

Throws `TypeError` if `callback` is not a function.

The signature for `callback` is:

```javascript
function loaded(err, rc)
```

The `rc` argument is an object that is the merged result of loading and parsing all rc files that exist and did not trigger an error.

If the `lenient` option is specified and an error occurs `err` will be an array of errors. 

Errors are decorated with a `file` property to indicate the file that caused the error condition.

Errors occur under the following circumstances:

* There was an error parsing a file as JSON (`SyntaxError`).
* An error occured while reading a file (`Error`), this could be permissions (`EACCESS`) or some other file system related error.

Note that currently the [ini][ini] module does not throw any errors on malformed file contents, however if that changes they will be passed on to the `callback` function.

## License

Everything is [MIT](http://en.wikipedia.org/wiki/MIT_License). Read the [license](/LICENSE) if you feel inclined.

[rc]: http://en.wikipedia.org/wiki/Run_Commands
[ini]: https://github.com/isaacs/ini
[home]: https://github.com/freeformsystems/cli-fs#home
