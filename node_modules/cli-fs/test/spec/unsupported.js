var expect = require('chai').expect;
var test = require('../..').test;

describe('cli-fs:', function() {
  it('should throw error on unsupported expression',
    function(done) {
      function fn() {
        var res = test('-Z', 'unsupported');
      }
      expect(fn).throws(Error);
      done();
    }
  );
})
