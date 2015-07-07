'use strict'

var path = require('path')


/**
* Retorna una lista con los proyectos que se asocian.
*/
var list = function (callback) {
  var self = this

  self.options.local.val(function (err, data) {
    if (err) {
      callback(err)
    } else {
      callback(null, data.projects)
    }
  })

}



module.exports = list