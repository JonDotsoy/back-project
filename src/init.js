'use strict'

var fs = require('fs')
var path = require('path')
var async = require('async')
var md5 = require('MD5')


/**
 * bp.init([[options,]callback])
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
  _options.name = options.name || '' || md5(self.bpname)
  _options.type = options.type || 'literal'
  _options.maintainer = options.maintainer || ''
  _options.install = options.install || []
  _options.uninstall = options.uninstall || []
  _options.start = options.start || []
  _options.stop = options.stop || []

  var verifiTheSettingsValues = function (nameValue, defaultValue, cb) {

    var callback = function (err, data) {
      var dataToEmitEvent = {
        type: nameValue,
        data: data,
      }

      self._eventEmitter.emit('init:value', dataToEmitEvent)
      self._eventEmitter.emit('init:value:'+nameValue, dataToEmitEvent)

      cb.apply(null, arguments)
    }

    // Get Setting
    self.options.get(nameValue, function (err, data) {
      var newSetValue = (_options[nameValue] || defaultValue)
      if (newSetValue) {
        // If exists new value, set value.
        self.options.put(nameValue, newSetValue, function (err, data) {
          callback(err, data)
        })
      } else {
        callback(undefined, data)
      }
    })
  }

  async.series({
    'local value name': function (cb) {
      verifiTheSettingsValues('name', '', cb)
    },
    'local value type': function (cb) {
      verifiTheSettingsValues('type', '', cb)
    },
    'local value maintainer': function (cb) {
      verifiTheSettingsValues('maintainer', null, cb)
    },
    'local value install': function (cb) {
      verifiTheSettingsValues('install', null, cb)
    },
    'local value uninstall': function (cb) {
      verifiTheSettingsValues('uninstall', null, cb)
    },
    'local value start': function (cb) {
      verifiTheSettingsValues('start', null, cb)
    },
    'local value stop': function (cb) {
      verifiTheSettingsValues('stop', null, cb)
    },
    'global value to save or update the project location': function (cb) {
      // get Global Values
      self.options.local.get('projects', function (err, data) {
        data = data || {}

        data[_options.name] = self.dir

        // Set Data
        self.options.local.put('projects', data, function (err, data) {

        })
      })
    },
  },
  function(err, results) {
    self._eventEmitter.emit('init', err)
    cb(err)
  })

}


module.exports = init
