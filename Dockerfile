# 1) Imagen base de Node.js
FROM node:18-alpine

# 2) Directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# 3) Copiamos package.json y package-lock.json
COPY package*.json ./

# 4) Instalamos dependencias (solo production)
RUN npm install --only=production

# 5) Copiamos el resto del código (incluyendo src/)
COPY . .

# 6) Exponemos el puerto que usa el gateway
EXPOSE 4000

# 7) Comando para arrancar el gateway
CMD ["node", "src/server.js"]
