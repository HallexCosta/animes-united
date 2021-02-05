module.exports =  {
  '*.ts': [
    "eslint --fix",
    "./packages/shared/lint-staged-config/staged-files.sh",
    "yarn test $STAGED_FILES --bail --findRelatedTests"
  ]
}