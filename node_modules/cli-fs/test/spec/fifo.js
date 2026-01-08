var path = require('path');
var expect = require('chai').expect;
var test = require('../..').test;
var run = require('../util/run');
var files = require('../util/files');

// NOTE: this test will fail if run directly
// NOTE: as `npm test` create the temporary fifo (named pipe)
describe('cli-fs:', function() {
  it('should test fifo - missing (false)',
    function(done) {
      var result = false;
      var expr = '-p';
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
  it('should test fifo - zero (false)',
    function(done) {
      var result = false;
      var expr = '-p';
      var value = files.zero;
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
  it('should test fifo (true)',
    function(done) {
      var result = true;
      var expr = '-p';
      var value = files.fifo;
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
