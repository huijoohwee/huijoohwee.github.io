var expect = require('chai').expect;
var util = require('../..');

describe('cli-fs:', function() {
  it('should return filesystem path', function(done) {
    expect(util.home()).to.be.a('string');
    done();
  });
  it('should return empty string', function(done) {
    process.env.HOME = process.env.HOMEPATH
      = process.env.USERPROFILE = '';
    expect(util.home()).to.be.a('string').that.eqls('');
    done();
  });

})
