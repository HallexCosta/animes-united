STAGED_FILES_TEST=$(git diff --cached --name-only --diff-filter=ACM | grep -P '\.spec\.ts$')

# PACKAGE_NAME=$(cat ./package.json | grep -Po "@animes-united\/([^\.\"]+)$gm")

# if [[ ${#STAGED_FILES_TEST[@]} == 0 ]]; then
#   exit 1 # Error
# fi

if [[ ${#STAGED_FILES_TEST[@]} == 1 ]];  then
  STAGED_FILES_TEST=$(echo $STAGED_FILES_TEST)
else
  STAGED_FILES_TEST=$(echo $STAGED_FILES_TEST | tr '\n' '|')
fi

# Remove last Pipe on expression
STAGED_FILES_TEST=${STAGED_FILES_TEST%|}

#export=$PACKAGE_NAME
export=$STAGED_FILES_TEST
 
# exit 0 # Success