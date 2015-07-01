'use strict'

var fs = require('fs')
var path = require('path')
var async = require('async')

/**
 * bp.init([options, ]callback)
 *
 * Options:
 *  type (String): Default 'literal'
 *  maintainer (String|Object): Default ""
 *    Example: {
 *      "name": "",
 *      "email": "",
 *      "web": "",
 *      "rol": ""
 *    }
 *  install: (Array): Default []
 *  uninstall (Array): Default []
 *  start (Array): Default []
 *  stop (Array): Default []
 */
var init = function(options, cb) {
  var self = this

  if (!cb) {
    cb = options
    options = undefined
  }

  options = options || {}
  options.type = options.type || 'literal'
  options.maintainer = options.maintainer || ""
  options.install = options.install || []
  options.uninstall = options.uninstall || []
  options.start = options.start || []
  options.stop = options.stop || []

  var checkValueOnConfig = function (nameValue, defaultValue, cb) {
    self.options.get(nameValue, function (err, data) {
      if (err) {
        self.options.put(nameValue, options[nameValue] || defaultValue, function (err, data) {
          cb(err, data)
        })
      } else {
        cb(undefined, data)
      }
    })
  }

  async.series({
    checkValueType: function(cb) {
      checkValueOnConfig('type', "", cb)
    },
    checkValueMaintainer: function(cb) {
      checkValueOnConfig('maintainer', "", cb)
    },
    checkValueInstall: function(cb) {
      checkValueOnConfig('install', [], cb)
    },
    checkValueUninstall: function(cb) {
      checkValueOnConfig('uninstall', [], cb)
    },
    checkValueStart: function(cb) {
      checkValueOnConfig('start', [], cb)
    },
    checkValueStop: function(cb) {
      checkValueOnConfig('stop', [], cb)
    },
  },
  function(err, results) {
    cb(err)
  })
}

module.exports = init
