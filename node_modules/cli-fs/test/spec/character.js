var path = require('path');
var expect = require('chai').expect;
var test = require('../..').test;
var run = require('../util/run');
var files = require('../util/files');

describe('cli-fs:', function() {
  it('should test character file - missing (false)',
    function(done) {
      var result = false;
      var expr = '-c';
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
  it('should test character file - regular (false)',
    function(done) {
      var result = false;
      var expr = '-c';
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
  it('should test character file (true)',
    function(done) {
      var result = true;
      var expr = '-c';
      var value = files.character;
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
  it('should test character file by fd (true)',
    function(done) {
      var result = true;
      var expr = '-c';
      var value = files.tty;
      var res = test(expr, value);
      // SEE: https://github.com/joyent/node/issues/7076
      expect(res).to.eql(result);
      test(expr, value, function(res) {
        expect(res).to.eql(result);
        done();
      });
    }
  );
})
