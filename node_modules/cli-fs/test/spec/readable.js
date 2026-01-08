var path = require('path');
var expect = require('chai').expect;
var test = require('../..').test;
var run = require('../util/run');
var files = require('../util/files');

describe('cli-fs:', function() {
  it('should test readable file - missing (false)',
    function(done) {
      var result = false;
      var expr = '-r';
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
  it('should test readable file - noop (false)',
    function(done) {
      var result = false;
      var expr = '-r';
      var value = files.noop;
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
  it('should test readable file (true)',
    function(done) {
      var result = true;
      var expr = '-r';
      var value = files.readable;
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
})
