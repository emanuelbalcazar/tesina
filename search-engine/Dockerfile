# indico que version de node usar
FROM node:20

# agrego la carpeta dentro del contenedor
ADD . ./search-engine

# me muevo a la carpeta correspondiente
WORKDIR /search-engine

# instalo las dependencias
RUN npm install

# inicio el servicio
CMD npm start
