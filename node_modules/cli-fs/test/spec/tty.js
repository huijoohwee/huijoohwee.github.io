var path = require('path');
var expect = require('chai').expect;
var test = require('../..').test;
var run = require('../util/run');
var files = require('../util/files');

describe('cli-fs:', function() {
  it('should test tty - regular (-t) (false)',
    function(done) {
      var result = false;
      var expr = '-t';
      var value = files.regular;
      var args = [expr, value];
      run(args, function(expected) {
        expect(result).to.eql(expected);
        var res = test(expr, value);
        expect(res).to.eql(expected);
        test(expr, value, function(res) {
          expect(res).to.eql(expected);
          done();
        });
      });
    }
  );
  it('should test tty - missing (-t) (false)',
    function(done) {
      var result = false;
      var expr = '-t';
      var value = files.missing;
      var args = [expr, value];
      run(args, function(expected) {
        expect(result).to.eql(expected);
        var res = test(expr, value);
        expect(res).to.eql(expected);
        test(expr, value, function(res) {
          expect(res).to.eql(expected);
          done();
        });
      });
    }
  );
  it('should test tty (-t) (true)',
    function(done) {
      var result = true;
      var expr = '-t';
      var value = files.tty;
      var args = [expr, value];
      // NOTE: we don't verify with test(1)
      // NOTE: here as running `test -t 1`
      // NOTE: via exec() will always return false
      var res = test(expr, value);
      expect(res).to.eql(result);
      test(expr, value, function(res) {
        expect(res).to.eql(result);
        done();
      });
    }
  );
})
