# Search Engine

Componente encargado de realizar las busquedas en Google utilizando la API de Google CSE.

## Requerimientos

- Node 18 o superior.
- Conexión a RabbitMQ (opcional).
- Configuración de Google CSE con el ID del motor de busqueda (cx) y API Key (key).

## Instalación y despliegue

1. Instalar dependencias con: `npm install`.
2. Crear el archivo `.env` utilizando el `.env.example` como base.
3. Desplegar con `npm start` o `npm run dev` para modo desarrollador.

## Comandos utiles

- Desplegar en modo desarrollo: `npm run dev`.
- Ejecutar comprobación del linter: `npm run lint`.
- Ejecutar correcciones del linter: `npm run lint:fix`.
- Ejecutar formateador de codigo: `npm run prettier`.
- Ejecutar comprobación de formato de codigo: `npm run prettier:check`.

## Consideraciones particulares

Se hace uso de la [API Rest](https://developers.google.com/custom-search/v1/using_rest?hl=es-419#response_data) de Google CSE pero este posee dos posibles endpoints dependiendo el costo a pagar por su uso.

- El uso `limitado` utiliza el endpoint `https://www.googleapis.com/customsearch/v1?` que posee un limite de 10.000 consultas diarias [Documentación](https://developers.google.com/custom-search/v1/introduction?hl=es-419).


- El uso `ilimitado` utiliza el endpoint `https://www.googleapis.com/customsearch/v1/siterestrict?` con un costo de $5 dolares cada 1000 consultas pero
no posee un limite de consultas diarias [Documentación](https://developers.google.com/custom-search/v1/site_restricted_api?hl=es-419).
