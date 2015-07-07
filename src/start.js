'use strict'


var cp = require('child_process')
var async = require('async')
var util = require('util')



/**
* start([[options,]callback])
*
* options:
*   cwd: process.cwd()
*   env: process.env
*/
var start = function (options, callback) {
  var self = this

  if (!callback && typeof options == 'function') {
    callback = options
    options = {}
  }

  options = options || {}
  callback = callback || function () {}

  options.env = options.env || process.env
  options.cwd = options.cwd || process.cwd()
  options.daemon = options.daemon || false

  self.options.val('start', function (err, scripts) {
    async.forEachOfSeries(scripts, function (script, key, cb) {
      if (typeof script == 'string') {

        util.log('['+key+'/'+(scripts.length-1)+']','-',script)

        if (key == (scripts.length-1)) {
          script = 'forever start -c ' + script
        }

        var child = cp.exec(script, options)

        child.stdout.on('data', function (data) {
          process.stdout.write(data.toString())
        })

        child.stderr.on('data', function (data) {
          process.stdout.write(data.toString())
        })

        child.on('close', function (err, ret) {
          console.log()
          cb(err, ret)
        })
      }
    },callback)

  })
  callback()
}



module.exports = start
