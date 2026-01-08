var exec = require('child_process').exec;
var cmd = 'test';
/**
 *  Executes test(1) so that we can verify our
 *  unit tests correspond to it's result.
 */
module.exports = function run(args, callback) {
  args.unshift(cmd);
  var command = args.join(' ');
  //console.log('cmd %s', command);
  return exec(command,
    function (error, stdout, stderr) {
      if (error !== null) {
        //console.log(error);
        return callback(false);
      }
      callback(true);
  });
}

