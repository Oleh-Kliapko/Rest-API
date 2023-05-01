# create own image from image "node"
FROM node:14-alpine

# set working directory and set context of our application
WORKDIR /app

# copy our app from local project "node"
COPY . .

# set port
EXPOSE 3000

# launch command to gather our image
RUN npm install

# launch a command when our image is starting
CMD ["node", "server.js"]