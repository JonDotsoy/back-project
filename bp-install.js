var path          = require('path')
var command       = require('commander')
var bpproject     = require(path.join(__dirname, 'src', 'project.js'))
var db            = require(path.join(__dirname, 'src', 'config.js'))
var child_process = require('child_process')

command
  .alias('bp install')
  .description('Instala el entorno del projecto.')
  // .option('-s, --git-scan [True|False]', 'Verifica si requiere escanear el directorio en buscad del repositorio iniciado. Valor por defecto: [true].', true)
  .parse(process.argv)


// db.put('installe', null, function (err){

// })
// db.put('uninstall', null, function (err){

// })
/* Get Config Local pproject */
// db.get('install', function (err, installComs) {
//   console.log(installComs)
//   if (err) {
//     console.error(err)
//     // console.error("Require Parameter install in bproject.json")
//   }
// })

db.get('install', function (err, data){
  for (indexData in data) {
    pro = data[indexData]
    console.log(pro);
  }
})
