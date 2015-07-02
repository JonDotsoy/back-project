'use strict'


var path = require('path')

var init = require(path.join(__dirname, 'init.js'))
var info = require(path.join(__dirname, 'info.js'))
var backproject = require(path.join(__dirname, 'backproject.js'))


var bp = backproject
bp.prototype.init = init
bp.prototype.info = info


module.exports = bp
