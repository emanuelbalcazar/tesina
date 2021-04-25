# indico que version de node usar
FROM node:14

# agrego la carpeta dentro del contenedor
ADD . ./client

# me muevo a la carpeta correspondiente
WORKDIR /client

RUN npm run build

# inicio el servicio
CMD npm start
