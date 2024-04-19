# indico que version de node usar
FROM node:20

# agrego la carpeta dentro del contenedor
ADD . ./crawl-extractors

# me muevo a la carpeta correspondiente
WORKDIR /crawl-extractors

# instalo las dependencias
RUN npm install

# inicio el servicio
CMD npm start
