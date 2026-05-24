# =============================================================================
# MULTI-STAGE BUILD - Breaks default C2C layer correlation
# =============================================================================
# Stage 1: Build with vulnerable node:14-alpine + lodash 4.17.20
# Stage 2: Runtime with node:20-alpine (different base = no layer match)
#
# Default C2C will FAIL because final image layers don't match node:14-alpine
# search_repositories can find this by searching for "node:14-alpine" or "lodash"
# =============================================================================

# Stage 1: Builder with vulnerable base image
FROM node:14-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --production

COPY server.js ./

# Stage 2: Runtime with DIFFERENT base image
FROM node:20-alpine AS runtime

WORKDIR /app

# Copy vulnerable node_modules from builder (lodash 4.17.20 CVEs still present!)
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/server.js ./
COPY --from=builder /app/package.json ./

EXPOSE 3000

USER node

CMD ["node", "server.js"]
