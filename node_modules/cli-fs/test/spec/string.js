var path = require('path');
var expect = require('chai').expect;
var test = require('../..').test;
var run = require('../util/run');
var files = require('../util/files');

describe('cli-fs:', function() {
  it('should test empty string (-z) (false)',
    function(done) {
      var result = false;
      var expr = '-z';
      var value = 'value';
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
  it('should test empty string (-z) (true)',
    function(done) {
      var result = true;
      var expr = '-z';
      var value = '';
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
  it('should test non-empty string (-n) (false)',
    function(done) {
      var result = false;
      var expr = '-n';
      var value = '';
      var args = [expr, '""'];
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
  it('should test non-empty string (-n) (true)',
    function(done) {
      var result = true;
      var expr = '-n';
      var value = 'value';
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
