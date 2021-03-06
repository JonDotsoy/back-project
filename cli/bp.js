#!/usr/bin/env node
'use strict'

var path = require('path')
var command = require('commander')
var backproject = require(path.join(__dirname, '..', 'src', 'bp.js'))
var pkg = require(path.join(__dirname, '..', 'package.json'))
var child_process = require('child_process')
var fs = require('fs')
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
  .command('init [name] [type]')
  .description('a description')
  .option('-t, --type <type>', 'Define el tipo de proyecto.', function (type) {
    options.type = type
  })
  .action(function (name, type, env) {
    createBP()

    if (name) {
      options.name = name
    } else {
      options.name = path.basename(process.cwd())
    }

    if (type) {
      options.type = type
    } else {
      if (fs.existsSync(path.join(process.cwd(),'package.json'))) {
        options.type = 'node'
      }
    }

    bp.init(options, function (err) {
      console.log("Fue creado el archivo \""+bp.bpname+"\"");
    })
  })

command
  .command('help')
  .action(function (env) {
    command.outputHelp()
  })

command.parse(process.argv)

if (!process.argv.slice(2).length) {
  command.outputHelp()
}
