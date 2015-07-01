var path          = require('path')
var command       = require('commander')
var bpproject     = require(path.join(__dirname, 'src', 'project.js'))
var db            = require(path.join(__dirname, 'src', 'config.js'))
var child_process = require('child_process')

command
  .alias('bp init')
  .description('Inicia el entorno del proyecto.')
  // .command('e', 'abc')
  .option('-s, --git-scan <True|False>', 'Verifica si requiere escanear el directorio en buscad del repositorio iniciado. Valor por defecto: [true].', 'true')
  .parse(process.argv)


// bpproject.init()

db.all(function(err, data){
  console.log(data)
})

// process.exit(0);

// Find Git Version, check if exists.
// if (command.gitScan == true ||
//   command.gitScan == 'true' ||
//   command.gitScan == 'TRUE' ||
//   command.gitScan == 'tru'  ||
//   command.gitScan == 'TRU') {

//   var git_path = null

//   db.local.get('paths', function (err, paths) {
//     git_path = (err || !paths.git) ? 'git' : paths.git

//   })

//   // child_process.exec('git --version',{
//   //   encoding: 'utf8'
//   // }, function (error, stdout, stderr) {
//   //   db.local.put('a config',3, function (err){
//   //     console.log(stdout)
//   //   })
//   // })
// } else {
//   bpproject.init()
// }
