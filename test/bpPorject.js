'use strict'

var path = require('path')
var rmdir = require('rmdir')
var fs = require('fs')
var async = require('async')
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
    var listAsyncToEndEvent = []

    async.parallel({
      '1': function (cb) {
        assert.ok(cb)
        listAsyncToEndEvent.push(cb)
      },
      '2': function (cb) {
        assert.ok(cb)
        listAsyncToEndEvent.push(cb)
      },
    },
    function(err, results) {
      assert.done()
    })

    // Test Event Init
    self.bp.on('init', function (err) {
      assert.ifError(err)
      listAsyncToEndEvent[0]()
    })

    self.bp.init({
      maintainer: "aaab",
    },function (err) {
      assert.ifError(err)
      listAsyncToEndEvent[1]()
    })

  },
  'Was created \'bp.json\' file': function (assert) {
    var self = this

    fs.exists(self.bp.bpname, function (isCreated) {
      assert.ok(isCreated)
      assert.done()
    })
  },
  'Readed values of \'bp.json\'': function (assert) {
    var self = this

    assert.doesNotThrow(function () {
      require(self.bp.bpname)
    })

    assert.done()
  },
  'Can read the info values': function (assert) {
    var self = this

    self.bp.info(function (err, data) {
      assert.ifError(err)

      assert.equal(data.bp.type, "literal")
      assert.equal(data.bp.maintainer, "aaab")
      assert.ok(data.bp)
      assert.ok(data.local)

      assert.done()
    })
  },
}
