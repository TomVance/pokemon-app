'use strict'

const options = {
  exit: true,
  recursive: true,
  parallel: false,
  timeout: '5s',
  extension: ['ts', 'tsx'],
  require: ['ts-node/register'],
}

module.exports = options
