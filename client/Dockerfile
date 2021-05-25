# indico que version de node usar
FROM node:14

# agrego la carpeta dentro del contenedor
ADD . ./client

# me muevo a la carpeta correspondiente
WORKDIR /client

# copiar 'package.json' y 'package-lock.json' (si están disponibles)
COPY package.json ./

# instalar dependencias del proyecto
RUN npm install

# copiar los archivos y carpetas del proyecto al directorio de trabajo actual (es decir, la carpeta 'app')
COPY . .

# construye la app en la carpeta /dist
RUN npm run build

# inicio el servicio
CMD npm start
