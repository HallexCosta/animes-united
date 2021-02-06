module.exports =  {
  '*.ts': [
    './packages/shared/lint-staged-config/staged-files-tests.sh',
    'eslint --fix',
    'yarn test $STAGED_FILES_TEST --bail --findRelatedTests'
  ]
}