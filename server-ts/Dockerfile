# indico que version de node usar
FROM node:20

# agrego la carpeta dentro del contenedor
ADD . ./server-ts

# me muevo a la carpeta correspondiente
WORKDIR /server-ts

# instalo las dependencias
RUN npm install -g @adonisjs/cli
RUN npm install

# construyo la app
RUN npm run build

# inicio el servicio
CMD npm start
