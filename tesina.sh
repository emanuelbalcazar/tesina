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
        echo -e "[migrate] ejecutando migración en el servidor"
        cd $root/server-ts
        node ace migration:run
    ;;

    rollback)
        echo -e "[migrate] deshaciendo migración en el servidor"
        cd $root/server-ts
        node ace migration:rollback
    ;;

    seed)
        echo -e "Ejecutando seeder en el servidor"
        cd $root/server-ts
        node ace seed
    ;;

    routes)
        echo -e "[routes] listando las rutas rest del servidor"
        cd $root/server-ts
        node ace list:routes
    ;;

    config)
        echo -e "Accediendo a la configuración del servidor..."
        cd $root/server-ts
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

    mkdocs:build)
        mkdocs build
    ;;

    mkdocs:serve)
        mkdocs build && mkdocs serve -a localhost:3000
    ;;

    *)
        echo "Comando no reconocido"
    ;;

esac