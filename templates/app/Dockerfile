# Vulnerable base image - node:14-alpine has known CVEs
FROM node:14-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install --production

# Copy application code
COPY server.js ./

EXPOSE 3000

USER node

CMD ["node", "server.js"]
