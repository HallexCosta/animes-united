STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep "spec.ts$gm")

# PACKAGE_NAME=$(cat ./package.json | grep -Po "@animes-united\/([^\.\"]+)$gm")

if [[ ${#STAGED_FILES[@]} == 0 ]]; then
  exit 1 # Error
fi

if [[ ${#STAGED_FILES[@]} == 1 ]];  then
  STAGED_FILES=$(echo $STAGED_FILES)
else
  STAGED_FILES=$(echo $STAGED_FILES | tr '\n' '|')
fi

# Remove last Pipe on expression
STAGED_FILES=${STAGED_FILES%|}

#export=$PACKAGE_NAME
export=$STAGED_FILES
 
exit 0 # Success