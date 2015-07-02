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

  if (!cb && typeof options == 'function') {
    cb = options || function () {}
    options = {}
  }

  if (!cb) {
    cb = function () {}
  }

  var _options = options || {}
  _options.type = options.type || 'literal'
  _options.maintainer = options.maintainer || ""
  _options.install = options.install || []
  _options.uninstall = options.uninstall || []
  _options.start = options.start || []
  _options.stop = options.stop || []

  var checkValueOnConfig = function (nameValue, defaultValue, cb) {
    var callback = function (err, data) {
      self._eventEmitter.emit('init:value', {
        type: nameValue,
        data: data,
      })
      self._eventEmitter.emit('init:value:'+nameValue, {
        data: data,
      })
      cb.apply(null, arguments)
    }

    self.options.get(nameValue, function (err, data) {
      if (err) {
        self.options.put(nameValue, (_options[nameValue] || defaultValue), function (err, data) {
          callback(err, data)
        })
      } else {
        callback(undefined, data)
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
    self._eventEmitter.emit('init', err)
    cb(err)
  })
}


module.exports = init
