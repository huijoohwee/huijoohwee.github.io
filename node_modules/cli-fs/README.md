# File System

Utility functions for working with the file system.

The primary purpose of this module is to allow for expressions like `test(1)` in order to test file existence, file type  etc.

## Install

```
npm install cli-fs
```

## Test

Note that rather than mocking lots of files (and file descriptors) these tests run against standard system files, which means if you are not running a UNIX variant (and likely OSX only) these tests may well fail. It is also quite possible that they only work on this machine as permissions can get out of sync, however, effort has been made to use pretty standard values, see the [files](https://github.com/freeformsystems/cli-fs/blob/master/test/util/files.js) list to see the paths used for testing.

```
npm test
```

## Expressions

This module is designed to support the majority of file tests as described by `man test` it does not support complex expressions such as `-gt` or `!=` which require two operands, this is better achieved with pure javascript.

Use this module when you just want to answer questions like *is this file a directory?* without all the error handling actually testing that condition implies.

Supported expressions:

* `-b`: True if file exists and is a block special file.
* `-c`: True if file exists and is a character special file.
* `-d`: True if file exists and is a directory.
* `-e`: True if file exists (regardless of type).
* `-f`: True if file exists and is a regular file.
* `-n`: True if the length of string is nonzero.
* `-p`: True if file is a named pipe (FIFO).
* `-r`: True if file exists and is readable ([1]).
* `-s`: True if file exists and has a size greater than zero.
* `-t`: True if the file descriptor number is open and associated with a terminal.
* `-w`: True if the file exists and is writable ([1]).
* `-x`: True if file exists and is executable. True indicates only that the execute flag is on. If file is a directory, true indicates that file can be searched.
* `-z`: True if the length of string is zero.
* `-L`: True if the file exists and is a symbolic link.
* `-S`: Ture if file exists and is a socket.

## API

All functions support asynchronous and synchronous operation, specifying a `callback` function implies asynchronous behaviour.

### test(expr, value, [callback])

Test an expression.

* `expr`: The expression to test.
* `value`: The value to test.
* `callback`: An optional callback function, forces an asynchronous test.

Returns a boolean indicating whether the test passed or throws an error if the expression is not supported.

### readable(path, [callback])

Determine if a file is readable, this method opens the file for reading using the `r` flag and immediately closes the file [1].

* `path`: The file system path.
* `callback`: An optional callback function, forces an asynchronous test.

Returns a boolean indicating whether the test passed.

### writable(path, [callback])

Determine if a file is writable, this method opens the file for reading using the `r+` flag and immediately closes the file. Because the `r+` flag is used this method also tests that the file is readable [1].

* `path`: The file system path.
* `callback`: An optional callback function, forces an asynchronous test.

Returns a boolean indicating whether the test passed.

### executable(path, [callback])

Determine if a file is has the executable bit set. This method does not ensure that attempting to execute the file will not result in an `EPERM` error, use with caution.

* `path`: The file system path.
* `callback`: An optional callback function, forces an asynchronous test.

Returns a boolean indicating whether the test passed.

### supported

Array of the supported test expression characters.

### home()

Attempt to resolve the user's home directory using the environment variables
`HOME`, `HOMEPATH`, `USERPROFILE`.

Returns the user's home directory or the empty string if none of the environment variables are set.

## Caveats

1. The only reliable way to test whether a file is readable or writable is to attempt to open and close the file, hence these tests incur a performance overhead. If you need to perform these tests with a lot of files it is better deferred until you actually need to read or write to the files.

## License

Everything is [MIT](http://en.wikipedia.org/wiki/MIT_License). Read the [license](/LICENSE) if you feel inclined.
