var path     = require('path')
var command  = require('commander')
// var licenses = require(path.join(__dirname, 'src', 'licenses.js'))
var package  = require(path.join(__dirname, 'package.json'))

var versionEvent = function () {
  console.log(package.version)
}

command
  .description(package.description)
  .option('-v, --version', 'Muestra versión.', versionEvent)
  .command('init [environment]', 'Inicia un entorno.')

command.parse(process.argv)

if (!process.argv.slice(2).length) {
  command.outputHelp()
}
