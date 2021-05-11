## Aplicación servidor

A continuación se le brindará información basica sobre como es el funcionamiento del framework y que debe hacer si desea agregar nuevas funcionalidades, esto es solo un vistazo por lo que se recomienda fuertemente que visite la documentación de la pagina oficial si desea tener mas detalles.

[https://adonisjs.com/docs/4.1/about](https://adonisjs.com/docs/4.1/about)

### Estructura del servidor

[Página de referencia](https://adonisjs.com/docs/4.1/folder-structure)

La estructura generada por AdonisJS consiste en los siguientes directorios

```javascript
proyecto
├── app
├── config
├── database
├── node_modules
├── providers
├── start
├── test
├── .env
├── .gitignore
├── package.json
├── ace
├── server.js
├── vowfile.js
├── README.md

```

A continuación describiremos los directorios y archivos más importantes para que nos ayuden a entender más el funcionamiento del framework.

- `app`: Contiene los archivos necesarios para el funcionamiento basico de la aplicación. A su vez contiene las carpetas: `Controllers` como presenter, `Middleware` en donde se encuentran los middlewares propios y `Models` en donde se encuentran los modelos asociados a las tablas de la base de datos.

- `config`: Como el nombre indica, contiene todos los archivos de configuracion de la aplicación.

- `database`: Contiene los `migration` y `seeds` para la creación y carga de datos en la base de datos.

- `providers`: Contiene los servicios que pueden inyectarse en los controladores u otros modulos de forma global.

- `start`: Contiene los archivos que se utilizan al momento de levantarse la aplicación, ahi se puede configurar los services providers necesarios, registrar nuevos middlewares o plugins que se desee utilizar, etc.

- `test`: Contiene las carpetas de test `unit` o `functional`.

- `ace`: Es un ejecutable que hace de linea de comandos entre el AdonisJS y el proyecto, este archivo es propio del framework y no debe ser modificado.

- `server.js`: Archivo JS que se ejecuta para iniciar la aplicación servidor.

### Como desarrollar con AdonisJS

#### Crear un modelo

[Página de referencia](https://adonisjs.com/docs/4.1/lucid)

Si desea crear un modelo, debe utilizar el comando:

```bash
adonis make:model User
```

Agregar en el modelo el siguiente metodo, como AdonisJS crea las tablas y por defecto le agrega las columnas `created_at` y `updated_at` exigiendo dichos datos, para evitar que el timestamp sea obligatorio se debe agregar el siguiente codigo:

```javascript
static boot() {
    super.boot();
    this.addTrait('NoTimestamp');
}
```

#### Crear una migración

[Pagina de referencia](https://adonisjs.com/docs/4.1/migrations)

Para crear la migración, debe ejecutar el siguiente comando:

```bash
adonis make:migration User
```

o si desea crear la migración junto al modelo puede utilizar el comando:

```bash
adonis make:model User --migration
```

El parametro `--migration` te permite crear ademas la migración del modelo.

El archivo se crea en la carpeta `database/migrations`, debe tener en cuenta que las migraciones se ejecutan en ORDEN, por lo que si posee foreing keys o referencias a otras tablas debe asegurarse que la migración de la tabla a la que hace referencia sea creada con anterioridad.

IMPORTANTE: Si no desea que el timestamp este presente como vimos en la creación del modelo, elimine la linea que contiene el siguiente codigo: `table.timestamps()`.

#### Crear un controlador

[Página de referencia](https://adonisjs.com/docs/4.1/controllers)

El controlador hace de presenter y es quien realiza la lógica de negocio de la aplicación, para crear el controlador debe ejecutar el comando:

```bash
adonis make:controller User
```

AdonisJS le preguntará si desea que el controlador sea de tipo HTTP o WebSocket, seleccione la que desea crear.

Existe un tipo de controlador llamado "resource" que ya dispone de los metodos listos para realizar un CRUD del modelo si asi lo desea, para ello utilice el comando:

```bash
adonis make:controller User --resource
```
El controlador se crea en la carpeta `app/Controllers/Http` (si eligio http) y en caso de que sea un controlador de tipo resource vera que en el archivo ya se agregaron los metodos del CRUD con sus respectivos comentarios (leerlos para saber que hacen y como se mapean con las rutas rest).

#### Agregar la ruta HTTP

[Pagina de referencia](https://adonisjs.com/docs/4.1/routing)

Para agregar una nueva ruta, vaya al archivo `start/routes.js` y agregue la ruta que desea de la siguiente manera:

```javascript
Route.get('/users', 'UserController.index')
```

El primer parametro del objecto Route es el nombre de la ruta (por lo general /algo) y el segundo parametro indica el nombre del controlador y el método al que debe llamar cuando se realice la llamada HTTP con el método que haya indicado en el objeto route (get, post, put o delete).

Si desea realizar un mapeo de rutas con un controlador de tipo resource, puede definir la ruta de la siguiente manera:

```javascript
Route.resource('/users', 'UserController');
```

Esto automáticamente llamara a los métodos del controlador que ya fueron creados y ademas realiza el mapeo de rutas dependiendo del tipo de llamada. Esto se hace para evitar crear rutas relacionadas a un CRUD y mapear una por una la ruta y el método del controlador facilitando así la definición de rutas y controladores en una sola linea.

```javascript
// Esto...
Route.resource('users', 'UserController')

// ...es equivalente a esto:
Route.get('users', 'UserController.index')
Route.post('users', 'UserController.store')
Route.get('users/:id', 'UserController.show')
Route.put('users/:id', 'UserController.update')
Route.delete('users/:id', 'UserController.destroy')
```

Tambien puede agrupar las rutas para que todas posean un prefijo:

```javascript
Route.group(() => {
    Route.resource('users', 'UserController')
    Route.resource('roles', 'RoleController');
}).prefix('api')
```

Dando como resultado las rutas `/api/users` y `/api/roles`

Si desea listar las rutas con sus controladores así como información de utilidad puede utilizar el comando:

```bash
adonis route:list
```
