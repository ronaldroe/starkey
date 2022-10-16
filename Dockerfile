FROM node:16.17.0-alpine3.16

WORKDIR /app

# RUN [ "npm", "install" ]

CMD [ "echo", "$PWD" ]