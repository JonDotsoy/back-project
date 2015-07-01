'use strict'

var homedir = require('homedir')
var path    = require('path')
var Store   = require('jfs')

var config = function (setting) {
  var setting = setting || {}

  setting.global = setting.global || undefined
  setting.local = setting.local || undefined

  this.dbUser = new Store(setting.global, {
    pretty: true,
  })

  this.dbProject = new Store(setting.local, {
    pretty: true,
  })
}

config.prototype.local = {
  put: function (id, values, cb) {
    this.dbUser.save(id, values, cb)
  },
  get: function (name, cb) {
    this.dbUser.get(name, cb)
  },
  all: function (cb) {
    this.dbUser.all(cb)
  },
}

config.prototype.put = function (id, values, cb) {
  this.dbProject.save(id, values, cb)
}
config.prototype.get = function (name, cb) {
  this.dbProject.get(name, cb)
}
config.prototype.all = function (cb) {
  this.dbProject.all(cb)
}

module.exports = config
