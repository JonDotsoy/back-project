'use strict'

var homedir = require('homedir')
var path    = require('path')
var Store   = require('jfs')


var db = function (path) {
  this._db = new Store(path,{
    pretty: true,
  })
}

db.prototype.put = function (name, values, cb) {
  this._db.save(name, values, cb)
}
db.prototype.get = function (name, cb) {
  this._db.get(name, cb)
}
db.prototype.all = function (cb) {
  this._db.all(cb)
}

/**
 * db.val([name,[values,]]cb)
 */
db.prototype.val = function (name, values, cb) {
  if (name && values && cb) {
    this.put(name, values, cb)
  } else if (name && values && !cb) {
    cb = values
    this.get(name, cb)
  } else if (name && !values && !cb) {
    cb = name
    this.all(cb)
  }
}


var config = function (setting) {
  var setting = setting || {}
  setting.global = setting.global || undefined
  setting.local = setting.local || undefined

  this._localdb = new db(setting.local)
  this.local = new db(setting.global)
}

config.prototype.put = function() {
  this._localdb.put.apply(this._localdb, arguments)
}
config.prototype.get = function() {
  this._localdb.get.apply(this._localdb, arguments)
}
config.prototype.all = function() {
  this._localdb.all.apply(this._localdb, arguments)
}
config.prototype.val = function() {
  this._localdb.val.apply(this._localdb, arguments)
}


module.exports = config
