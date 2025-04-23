FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache python3 make g++ git pandoc

COPY package*.json /app

RUN npm ci --include=dev && \
    npm rebuild bcrypt --build-from-source


COPY . /app
COPY .env /app

ENV NODE_OPTIONS="--max-old-space-size=4096"


EXPOSE 4000
CMD ["npm", "run", "start"]