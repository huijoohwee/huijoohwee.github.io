var path = require('path');
var expect = require('chai').expect;
var test = require('../..').test;
var run = require('../util/run');
var files = require('../util/files');

describe('cli-fs:', function() {
  it('should test file exists (false)', function(done) {
    var result = false;
    var expr = '-e';
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
  });
  it('should test file exists (true)', function(done) {
    var result = true;
    var expr = '-e';
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
  });
  it('should test file exists and is a regular file - missing (false)',
    function(done) {
      var result = false;
      var expr = '-f';
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
  it('should test file exists and is a regular file - directory (false)',
    function(done) {
      var result = false;
      var expr = '-f';
      var value = files.directory;
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
  it('should test file exists and is a regular file (true)', function(done) {
    var result = true;
    var expr = '-f';
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
  });
})
