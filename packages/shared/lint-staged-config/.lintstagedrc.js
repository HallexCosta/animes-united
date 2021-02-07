module.exports =  {
  '*.ts': [
    'eslint --fix',
    'yarn test --bail --findRelatedTests'
  ]
}