'use strict'

var homedir = require('homedir')
var async = require('async')
var fs = require('fs')
var path = require('path')

var config = require(path.join(__dirname, 'config.js'))

var bp = function (options) {
  options = (options || {})

  this.dir = path.resolve(options.dir) || process.cwd()
  this.homedir = path.resolve(options.homedir) || homedir()

  // Create path to file '.bp_profile.json' and 'bp.json' of project
  this.bp_profile = path.join(this.homedir, (options.bp_profile || ".bp_profile.json"))
  this.bpname = path.join(this.dir, (options.bpname || 'bp.json'))

  var self = this

  this.options = new config({
    local  : self.bpname,
    global : self.bp_profile,
  })
}

module.exports = bp
