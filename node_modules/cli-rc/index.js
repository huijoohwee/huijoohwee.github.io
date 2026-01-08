var async = require('async');
var fs = require('fs');
var path = require('path'), basename = path.basename;
var fsutil = require('cli-fs');
var utils = require('cli-util')
  , merge = utils.merge
  , uniq = utils.uniq;

var PREFIX = '.';
var SUFFIX = 'rc';
var JSON_TYPE = 'json';
var INI_TYPE = 'ini';

var types = [JSON_TYPE, INI_TYPE];

var decoders = {};
decoders[JSON_TYPE] = function(contents) {
  return JSON.parse(contents);
}
decoders[INI_TYPE] = function(contents) {
  // lazily load ini dependency
  var ini = require('ini');
  return ini.parse(contents);
}

/**
 *  Create a RunControl instance.
 *
 *  @param options Run control configuration options.
 *  @param options.type String indicating the file type (json or ini).
 *  @param options.name String name of the file to load.
 *  @param options.path Array of filesystem directories to search.
 *  @param options.lenient Boolean indicating that load should
 *  continue on error.
 *  @param options.append Boolean indicating default search paths should
 *  be appended to specified paths.
 *  @param options.prepend Boolean indicating default search paths should
 *  be prepended to specified paths.
 */
var RunControl = function(options) {
  options = options || {};
  this.options = options;
  this.rc = {};
  this.store = {};
  this.files = [];
  this.type = options.type || JSON_TYPE;
  this.options.home = options.home || fsutil.home;
  if(!~types.indexOf(this.type)) {
    throw new TypeError('Invalid rc type \'' + this.type + '\'');
  }
  this.name = options.name || PREFIX + basename(process.argv[1]) + SUFFIX;
  this.path = options.path || this.getDefaultSearchPath();
  if(options.path && options.append === true) {
    this.path = options.path.concat(this.getDefaultSearchPath());
  }else if(options.path && options.prepend === true) {
    this.path = this.getDefaultSearchPath().concat(options.path);
  }
  if(Array.isArray(options.prepend)) {
    this.path = options.prepend.concat(this.path);
  }
  if(Array.isArray(options.append)) {
    this.path = this.path.concat(options.append);
  }
  if(typeof options.resolve === 'function') {
    this.path = this.path.map(function(value) {
      return options.resolve(value);
    })
  }
  this.path = uniq(this.path);
  this.lenient = options.lenient || false;
}

/**
 *  Retrieve an array for the default search path.
 *
 *  @api private
 *
 *  @return An array of default search paths.
 */
RunControl.prototype.getDefaultSearchPath = function() {
  var pth = [];
  // this library will be in node_modules/cli-rc so this should
  // resolve to the dependent package directory
  var pkg = this.options.base
    || path.normalize(path.join(__dirname, '..', '..'));
  var usr = this.options.home();
  pth.push(pkg);
  if(usr) pth.push(usr);
  return pth;
}

/**
 *  Load the configuration files.
 *
 *  @api public
 *
 *  @param callback A callback function.
 */
RunControl.prototype.load = function(callback) {
  if(typeof callback !== 'function') {
    throw new TypeError('Load callback must be a function');
  }
  var files = this.path.slice(0), name = this.name, self = this;
  //console.dir(files);
  var rc = this.rc, type = this.type, lenient = this.lenient, errors = null;
  files.forEach(function(dir, index, arr) {
    arr[index] = path.join(dir, name);
  })
  function error(err, file, callback) {
    err.file = file;
    if(!lenient) {
      return callback(err);
    }else{
      errors = errors || [];
      errors.push(err);
    }
    callback();
  }
  async.mapSeries(files, function(file, callback) {
    fs.exists(file, function(exists) {
      if(!exists) return callback();
      fs.readFile(file, function(err, data) {
        if(err) return error(err, file, callback)
        var decoder = decoders[type], res;
        try {
          res = decoder('' + data);
        }catch(e) {
          return error(e, file, callback)
        }
        self.store[file] = res;
        return callback(null, res);
      })
    });
  }, function(err, results) {
    if(err) {
      return callback(err);
    }
    for(var i = 0;i < results.length;i++) {
      if(results[i]) merge(results[i], rc);
    }
    self.files = Object.keys(self.store);
    callback(errors, rc, self);
  });
}

/**
 *  Create a RunControl instance.
 *
 *  @param options Run control configuration options.
 *  @param callback A callback function to pass to load.
 */
function rc(options, callback) {
  if(typeof options === 'function') {
    callback = options;
    options = null;
  }
  var r = new RunControl(options);
  if(typeof callback === 'function') r.load(callback);
  return r;
}

module.exports = rc;
module.exports.RunControl = RunControl;
module.exports.JSON = JSON_TYPE;
module.exports.INI = INI_TYPE;
