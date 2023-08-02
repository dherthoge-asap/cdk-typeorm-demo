# FROM node:16 as build

# WORKDIR /srv/app

# COPY package*.json ./


# RUN npm ci

# # Note the dockerignore file is used to exclude non-api related things
# COPY . ./

# # create config from default and joshua_dev

# RUN npm run build

# # new container to exclude all the source
# FROM node:16

# WORKDIR /srv/app

# COPY --from=build /srv/app/app/email-templates ./build/app/email-templates
# COPY --from=build /srv/app/build ./build
# COPY package*.json ./build/

# WORKDIR /srv/app/build
# RUN npm ci --omit=dev

# EXPOSE 8080

# CMD [ "node", "--require", "dd-trace/init", "./app/express/server.js" ]





FROM node:18

WORKDIR /app


COPY package*.json ./
RUN npm install && npm install typescript -g


COPY . .
RUN tsc

EXPOSE 3000

CMD ["npm", "run", "start"]




# FROM node:18

# WORKDIR /app/src

# COPY package*.json ./
# RUN npm install

# COPY . .

# EXPOSE 8080

# CMD [ "node", "server.js" ]
