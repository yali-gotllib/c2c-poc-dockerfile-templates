# =============================================================================
# MULTI-STAGE BUILD - Breaks default C2C correlation
# =============================================================================
# Stage 1: Build with node:14-alpine (vulnerable base + dependencies)
# Stage 2: Runtime with distroless (different base image signature)
#
# Default C2C will fail because:
# - Final image layers don't match node:14-alpine
# - No CI/CD pipeline connecting this repo to the deployed image
#
# search_repositories can find this by searching:
# - "lodash" "4.17.20" (vulnerable package in package.json)
# - "c2c-poc-app" filename:Dockerfile
# - "express" "4.17.1" 
# =============================================================================

# Stage 1: Builder - uses vulnerable node:14-alpine
FROM node:14-alpine AS builder

WORKDIR /app

# Install vulnerable dependencies (lodash 4.17.20, express 4.17.1)
COPY package.json package-lock.json* ./
RUN npm install --production

COPY server.js ./

# =============================================================================
# Stage 2: Runtime - uses completely different base image
# The final image will NOT have node:14-alpine layers
# =============================================================================
FROM node:20-alpine AS runtime

WORKDIR /app

# Copy the vulnerable node_modules from builder stage
# The lodash 4.17.20 vulnerability is still present!
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/server.js ./
COPY --from=builder /app/package.json ./

EXPOSE 3000

USER node

CMD ["node", "server.js"]
