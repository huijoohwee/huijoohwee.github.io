var fs = require('fs')
  , path = require('path')
  , tty = require('tty');

/**
 *  Test if a file exists (-e).
 *
 *  @param value The value to test.
 *  @param callback A callback function which
 *  makes this test asynchronous.
 */
function exists(value, callback) {
  var async = typeof callback == 'function';
  var method = async ? 'exists' : 'existsSync';
  return !async ? fs[method](value) : fs[method](value, function(exists) {
    callback(exists);
  });
}

/**
 *  Checks file bitmask based on the supplied
 *  fs.Stats and a bit mask.
 *
 *  Execute (-x):
 *
 *  bitmask(stat, 1);
 *
 *  Read (-r):
 *
 *  bitmask(stat, 4);
 *
 *  Write (-w):
 *
 *  bitmask(stat, 2);
 *
 *  @param stat The fs.Stats instance.
 *  @param mask The bit mask.
 *  @param mode The filesystem permissions mode, defaults is 777.
 */
function bitmask(stat, mask, mode) {
  mode = mode || '777';
  return !!(mask &
    parseInt((stat.mode & parseInt(mode, 8)).toString (8)[0]));
}

/**
 *  Utility to check permissions based on a bitmask.
 *
 *  @param mask The bit mask.
 *  @param value The file path.
 *  @param callback A callback function which
 *  makes this asynchronous.
 */
function permissions(mask, value, callback) {
  var async = typeof callback == 'function';
  if(!async) {
    try {
      stats = stat(value, false, false, null);
    }catch(e) {
      return false;
    }
    return bitmask(stats, mask);
  }
  stat(value, false, false, function(err, stats) {
    if(err) return callback(false);
    callback(bitmask(stats, mask));
  });
}

function open(flag, value, callback) {
  var async = typeof callback == 'function';
  var method = async ? 'open' : 'openSync';
  try {
    var fd = fs[method](value, flag, function(err, fd) {
      if(err) return callback(false);
      fs.close(fd);
      return callback(true);
    });
    if(!async && fd) fs.closeSync(fd);
    return true;
  }catch(e){}
  return false;
}

/**
 *  Determine if a file is readable.
 *
 *  @param value The file path.
 *  @param callback A callback function which
 *  makes this asynchronous.
 */
function readable(value, callback) {
  return open('r', value, callback);
}

/**
 *  Determine if a file is writable.
 *
 *  @param value The file path.
 *  @param callback A callback function which
 *  makes this asynchronous.
 */
function writable(value, callback) {
  return open('r+', value, callback);
}

/**
 *  Determine if a file is executable.
 *
 *  @param value The file path.
 *  @param callback A callback function which
 *  makes this asynchronous.
 */
function executable(value, callback) {
  return permissions(1, value, callback);
}

/**
 *  Retrieve a fs.Stats object from value.
 *
 *  @param value The value to stat.
 *  @param ln Use the lstat functions.
 *  @param fs Use the fstat functions.
 *  @param callback A callback function which
 *  makes this asynchronous.
 */
function stat(value, ln, fd, callback) {
  var async = typeof callback == 'function';
  var method = async ? 'stat' : 'statSync';
  if(ln && !fd) method = 'l' + method;
  if(fd) method = 'f' + method;
  return !async ? fs[method](value) : fs[method](value, function(err, stats) {
    callback(err, stats);
  });
}

function block(stats) {
  return stats.isBlockDevice();
}

function character(stats) {
  return stats.isCharacterDevice();
}

function directory(stats) {
  return stats.isDirectory();
}

function file(stats) {
  return stats.isFile();
}

function size(stats) {
  return stats.isFile() && stats.size > 0;
}

function fifo(stats) {
  return stats.isFIFO();
}

function socket(stats) {
  return stats.isSocket();
}

function symbolic(stats) {
  return stats.isSymbolicLink();
}

/**
 *  These operators require a stats object.
 */
var map = {
  b: { method: block },
  f: { method: file },
  c: { method: character },
  d: { method: directory },
  p: { method: fifo },
  s: { method: size },
  S: { method: socket },
  L: { method: symbolic, ln: true },
}

var supported = Object.keys(map).concat(['n', 'z', 'e', 'r', 'w', 'x', 't']);

/**
 *  Attempt to resolve the user's home directory
 *  in a platform independent manner.
 *
 *  @return The user's home directory or the empty string
 *  if none of the environment variables are defined.
 */
function home() {
  return process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE || '';
}

/**
 *  Test an expression and return a boolean.
 *
 *  Mimics the behaviour of test(1).
 *
 *  @param expr The expression to test.
 *  @param value The value to test.
 *  @param callback An optional callback which
 *  makes the operation asynchronous.
 */
function test(expr, value, callback) {
  var async = typeof callback == 'function';
  var res = false, method, stats, fd, usefd = false;
  expr = expr.replace(/^-+/, '');
  switch(expr) {
    case 'n':
      res = ('' + value).length > 0;
      if(async) return callback(res);
      break;
    case 'z':
      res = ('' + value) === '';
      if(async) return callback(res);
      break;
    case "e":
      res = exists(value, callback);
      break;
    case "r":
      res = readable(value, callback);
      break;
    case "w":
      res = writable(value, callback);
      break;
    case "x":
      res = executable(value, callback);
      break;
    case "t":
      fd = parseInt(value);
      if(isNaN(fd)) {
        if(!async) {
          try {
            fd = fs.openSync(value, 'r');
            res = tty.isatty(fd);
          }catch(e) {
            res = false;
          }
        }else{
          fs.open(value, 'r', function(err, fd) {
            if(err) return callback(false);
            return callback(tty.isatty(fd));
          });
        }
      }else{
        res = tty.isatty(fd);
        if(async) return callback(res);
      }
      break;
    default:
      if(!~supported.indexOf(expr)) {
        throw new Error('Unsupported test expression \'' + expr + '\'');
      }
      fd = parseInt(value);
      usefd = map[expr].fd;
      if(!isNaN(fd)) {
        usefd = true;
        value = fd;
      }
      if(!async) {
        try {
          stats = stat(value, map[expr].ln, usefd, null);
        }catch(e) {
          return false;
        }
        return map[expr].method(stats);
      }
      stat(value, map[expr].ln, usefd, function(err, stats) {
        if(err) return callback(false);
        callback(map[expr].method(stats));
      });
  }
  return res;
}

function resolve(file) {
  if(file === '.') {
    return process.cwd();
  }
  if(/^\//.test(file)) {
    return file;
  }
  return path.normalize(path.join(process.cwd(), file)).replace(/\/+$/, '');
}

module.exports = {};
module.exports.resolve = resolve;
module.exports.test = test;
module.exports.readable = readable;
module.exports.writable = writable;
module.exports.executable = executable;
module.exports.home = home;
module.exports.supported = supported;
module.exports.bitmask = bitmask;
