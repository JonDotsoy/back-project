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
  init: function (test) {
    var self = this

    self.bp.init(function(err) {
      test.ok(!err ? true: false, "Exists a error to run init.")
      test.done()
    })
  },
  'if was created file \'bp.json\'?': function (test) {
    var self = this
    fs.exists(self.bp.bpname, function (isCreated) {
      test.ok(isCreated)
      test.done()
    })
  },
  'Read values of \'bp.json\'': function (test) {
    var self = this
    test.doesNotThrow(function () {
      require(self.bp.bpname)
    })
    test.done()
  }
}
