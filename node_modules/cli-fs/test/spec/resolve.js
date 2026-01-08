var expect = require('chai').expect;
var util = require('../..');
var path = require('path')
  , base = path.normalize(path.join(__dirname, '..', '..'));

describe('cli-fs:', function() {
  it('should resolve relative path', function(done) {
    var res = util.resolve('./target');
    expect(res).to.eql(path.join(base, 'target'));
    done();
  });
  it('should resolve . to cwd', function(done) {
    var res = util.resolve('.');
    expect(res).to.eql(process.cwd());
    done();
  });

  it('should use absolute path', function(done) {
    var res = util.resolve(base);
    expect(res).to.eql(base);
    done();
  });
})
