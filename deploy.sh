#!/bin/bash
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

function Build () {
    echo -e "${GREEN}Start Build container${NC}"
    docker build -t dockerize-quasar .
    echo -e "${GREEN}End Build container${NC}"
}

function Production () {
  echo -e "${GREEN}Start server${NC}"
  docker run -d -p 8000:80 --rm dockerize-quasar
}

function StopServer () {
  echo -e "${GREEN}Stop server${NC}"
  docker rm $(docker stop $(docker ps -a -q --filter ancestor=dockerize-quasar --format="{{.ID}}"))
  echo -e "${GREEN}Stoped${NC}"
}

function RestartServer () {
  echo -e "${GREEN}Restart server${NC}"
  docker restart $(docker ps -a -q --filter ancestor=dockerize-quasar --format="{{.ID}}")
  echo -e "${GREEN}Restarted${NC}"
}

case "$1" in
    "build"|"b"|"up")
      Build
    ;;
    "production"|"p"|"prod")
      Production
    ;;
    "restart"|"r"|"res")
      RestartServer
    ;;
    "down"|"d")
      StopServer
    ;;
    *)
        echo "Opção inválida"
    ;;
esac
