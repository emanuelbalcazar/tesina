## Script SH

Para facilitar el manejo de comandos, se incluyo un script llamado `tesina.sh` en la raiz del proyecto, dicho script agrupa una serie de comandos de utilidad necesarios para facilitar la instalación y el uso del sistema.
Los comandos disponibles son:

* `./tesina.sh install` - instala las dependencias npm de todas las aplicaciones.
* `./tesina.sh migrate` - crea las tablas en la base de datos segun esten configurados en `server/database/migrations`.
* `./tesina.sh rollback` - deshace la ultima migración ejecutada en la base de datos.
* `./tesina.sh seed` - carga los datos iniciales en la base de datos para el setup inicial del sistema.
* `./tesina.sh config` - muestra en la linea de comandos las opciones disponibles de configuración del sistema, como periodicidad del planificador, cantidad de request limite a Google, cantidad de workers disponibles, etc.
* `./tesina.sh forever:start <PATH>` - ejecuta con forever el script indicado en el PATH.
* `./tesina.sh forever:startall` - ejecuta todas las aplicaciones con forever.
* `./tesina.sh forever:stop <PATH>` - detiene la ejecución del script indicado en el PATH.
* `./tesina.sh forever:stopall` - detiene todas las aplicaciones ejecutando con forever.
* `./tesina.sh forever:restart <PATH>` - reinicia con forever la ejecución del script indicado en el PATH.
* `./tesina.sh forever:restartall` - reinicia con forever todas las aplicaciones que estén ejecutándose con forever.
* `./tesina.sh forever:list` - lista las aplicaciones que estén ejecutándose con forever.
* `./tesina.sh forever:logs` - muestra donde están los logs de las aplicaciones.