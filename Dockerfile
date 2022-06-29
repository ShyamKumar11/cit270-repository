
# this is the base image we are getting from node
FROM node

#this tells the container to start in that directory
WORKDIR /app

#copying the file from package.jason to avoid conflict with the node_module directory
COPY package.json ./  

RUN npm install

COPY . ./

#this is the last command we to start the container/server 
CMD npm start 

