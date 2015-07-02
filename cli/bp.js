#!/usr/bin/env node
'use strict'

var path = require('path')
var command = require('commander')
var backproject = require(path.join(__dirname, '..', 'src', 'bp.js'))
var pkg = require(path.join(__dirname, '..', 'package.json'))
var child_process = require('child_process')
var bp = null
var options = {}
var createBP = function () {
  bp = new backproject(options)
}

command
  .version(pkg.version)
  .description('aa')
  .option('-p, --path <dir>', 'Define el path del proyecto.', function (path) {
    console.log("se path");
    options.dir = path
  })
  .option('-n, --bp-name <name>', 'Define el nombre del archivo de configuración. Por defecto es "bp.json"', function (name){
    options.bpname = name
  })
  .option('--profile-path <profile>', 'Define el directorio del usuario.', function (dirProfile) {
    options.homedir = dirProfile
  })
  .option('--profile-name <nameFile>', 'Define el nombre para el archivo de configuración del usuario.', function (nameFile) {
    options.bp_profile = nameFile
  })

command
  .command('init [name]')
  .description('a description')
  .action(function (cmd, env) {
    createBP()
    bp.init(function (err) {
      console.log("Fue creado el archivo \""+bp.bpname+"\"");
    })
  })

command.parse(process.argv)

if (!process.argv.slice(2).length) {
  command.outputHelp()
}
