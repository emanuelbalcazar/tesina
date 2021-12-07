# indico que version de node usar
FROM node:14

# agrego la carpeta dentro del contenedor
ADD . ./server

# me muevo a la carpeta correspondiente
WORKDIR /server

# instalo las dependencias
RUN npm install -g adonis
RUN npm install

# inicio el servicio
CMD npm start
