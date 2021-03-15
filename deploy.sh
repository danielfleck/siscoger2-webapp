#!/bin/bash
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

function build () {
  echo -e "${GREEN}Build application${NC}"
  npm run build
  echo -e "${GREEN}End Build application${NC}"
  echo -e "${RED}Caught the changes from the master?${NC}"
  echo -e "${GREEN}Restart pm2 to see changes${NC}"
}

case "$1" in
    "production"|"p"|"prod")
      build
    ;;
    *)
        echo "Opção inválida"
    ;;
esac
