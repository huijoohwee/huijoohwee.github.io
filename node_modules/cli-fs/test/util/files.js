var path = require('path');

var bin = '/bin';
var etc = '/etc';
var dev ='/dev';
var tmp ='/tmp';

module.exports = {
  etc: etc,
  dev: dev,
  missing: path.join(etc, 'this-file-really-does-not-want-to-be-found.txt'),
  directory: dev,
  regular: path.join(etc, 'passwd'),
  block: path.join(dev, 'vn0'),
  character: path.join(dev, 'zero'),
  zero: path.join(dev, 'zero'),
  hosts: path.join(etc, 'hosts'),
  tty: '1',
  readable: path.join(dev, 'null'),
  writable: path.join(dev, 'null'),
  executable: path.join(bin, 'ls'),
  socket: path.join(tmp, 'test.sock'),
  fifo: path.join(tmp, 'cli-fs-temp-fifo'),
  noop: path.join(etc, 'sudoers'),
  link: etc                       // OSX specific /etc => /private/etc
}
