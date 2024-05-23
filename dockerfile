FROM node:18-alpine

ENV NODE_ENV=production

ENV DATABASE_HOST=""
ENV DATABASE_PORT=""
ENV DATABASE_USER=""
ENV DATABASE_PASSWORD=""
ENV DATABASE_NAME=""

WORKDIR /usr/src/app

COPY package*.json ./

# Install nestjs which is required for bulding the Nest.js project.
RUN npm install -g @nestjs/cli

RUN npm install --omit=dev

COPY . .

RUN npm run build

CMD [ "node", "dist/main.js" ]

EXPOSE 3000