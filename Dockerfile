# Base image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

RUN npm run build

EXPOSE 4000
# Start the server using the production build
CMD ["npm", "run", "start:prod" ]