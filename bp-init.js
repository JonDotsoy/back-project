var path     = require('path')
var command  = require('commander')

command
  .alias('bp init')
  .description('abc...')
  // .command('e', 'abc')
  .parse(process.argv)

