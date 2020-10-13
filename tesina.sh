#!/bin/bash

# Obtengo la ruta absoluta del proyecto.
root="$(pwd)"

# Evaluo el comando entrante
case "$1" in

    install)
        echo "[install] instalando dependencias en crawl-extractors"
        cd $root/crawl-extractors
        npm install

        cd $root/search-engine
        echo "[install] instalando dependencias en search-engine"
        npm install

        cd $root/server
        echo "[install] instalando dependencias en el servidor"
        npm install 
    ;;

    migrate)
        echo -e "Ejecutando migración en el servidor"
        cd $root/server
        adonis migration:run
    ;;

    seed)
        echo -e "Ejecutando seeder en el servidor"
        cd $root/server
        adonis seed
    ;;

    config)
        echo -e "Accediendo a la configuración del servidor..."
        cd $root/server
        adonis config
    ;;

    forever:start)
        forever start $2
    ;;

    forever:startall)
        forever start $root/crawl-extractors/src/index.js &
        forever start $root/search-engine/src/index.js &
        forever start $root/server/server.js
    ;;

    forever:stop)
        forever stop $2
    ;;

    forever:stopall)
        forever stopall
    ;;

    forever:restart)
        forever restart $2
    ;;

    forever:list)
        forever list
    ;;

    forever:logs)
        forever logs
    ;;

    *)
        echo "Comando no reconocido"
    ;;

esac