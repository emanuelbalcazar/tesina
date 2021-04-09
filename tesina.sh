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

        cd $root/client
        echo "[install] instalando dependencias en el cliente"
        npm install 
    ;;

    migrate)
        echo -e "Ejecutando migración en el servidor"
        cd $root/server
        adonis migration:run
    ;;

    rollback)
        echo -e "Deshaciendo migración en el servidor"
        cd $root/server
        adonis migration:rollback
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

    docker:build)
        docker-compose up -d --build $2
    ;;

    docker:start)
        docker-compose start $2
    ;;

    docker:restart)
        docker-compose restart $2
    ;;

    docker:stop)
        docker-compose stop $2
    ;;

    docker:rm)
        docker-compose rm $2
    ;;

    docker:list)
        docker-compose ps -a
    ;;

    docker:logs)
        docker-compose logs $2 $3
    ;;

    docker:services)
        docker-compose ps --services
    ;;

    forever:start)
        forever start $2
    ;;

    forever:startall)
        forever start $root/crawl-extractors/src/index.js
        forever start $root/search-engine/src/index.js
        forever start $root/server/server.js
        
        cd $root/client
        npm run build
        forever start index.js
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

    forever:restartall)
        forever restartall
    ;;

    forever:list)
        forever list
    ;;

    forever:logs)
        forever logs $2
    ;;

    *)
        echo "Comando no reconocido"
    ;;

esac