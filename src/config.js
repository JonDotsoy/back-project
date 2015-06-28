'use strict'

var homedir = require('homedir')
var path    = require('path')
var Store   = require('jfs')

var dbUser = new Store(path.join(homedir(),'.bp_profile.json'), {
  pretty: true
})

var dbLocal = new Store(path.join(process.cwd(), 'bp.json'), {
  pretty: true
})


module.exports = {
  local: {
    get: function (name, cb) {
      dbUser.get(name, cb)
    },
    put: function (name, value, cb) {
      dbUser.save(name, value, cb)
    },
    all: function (cb) {
      dbUser.all(cb)
    },
  },
  get: function (name, cb) {
    dbLocal.get(name, cb)
  },
  put: function (name, value, cb) {
    dbLocal.save(name, value, cb)
  },
  all: function (cb) {
    dbLocal.all(cb)
  }
}
