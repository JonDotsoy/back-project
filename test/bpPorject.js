'use strict'

var path = require('path')
var rmdir = require('rmdir')
var fs = require('fs')
var bp = require(path.join(__dirname, '..', 'src', 'bp.js'))

exports.bpTest = {
  setUp: function (cb) {
    var self = this

    // Set Configuration to BP
    this.config = {
      dir: path.join(__dirname, 'dirTest'),
      homedir: path.join(__dirname, 'dirTest'),
    }

    // create a BP element
    this.bp = new bp(self.config)

    cb()
  },
  // Run a INIT test of BP
  init: function (assert) {
    var self = this

    self.bp.init(function(err) {
      assert.ifError(err);
      assert.done()
    })
  },
  'was created  \'bp.json\' file?': function (assert) {
    var self = this

    fs.exists(self.bp.bpname, function (isCreated) {
      assert.ok(isCreated)
      assert.done()
    })
  },
  'Read values of \'bp.json\'': function (assert) {
    var self = this

    assert.doesNotThrow(function () {
      require(self.bp.bpname)
    })
    assert.done()
  },
  'Default values on \'bp.json\'': function (assert) {
    var self = this
    self.bp.info(function (err, data) {
      console.log(data);

      assert.ifError(err)

      assert.ok(data.bp)

      assert.done()
    })
  },
}
