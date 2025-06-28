# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app

# Install serve to serve static files
RUN npm install -g serve

# Copy built files
COPY --from=builder /app/build ./build

# Create entrypoint script for runtime env var injection
RUN echo '#!/bin/sh' > /app/entrypoint.sh && \
    echo 'if [ ! -z "$REACT_APP_API_URL" ]; then' >> /app/entrypoint.sh && \
    echo '  find /app/build -name "*.js" -exec sed -i "s|http://localhost:5001|$REACT_APP_API_URL|g" {} +' >> /app/entrypoint.sh && \
    echo '  find /app/build -name "*.js" -exec sed -i "s|http://localhost:5000|$REACT_APP_API_URL|g" {} +' >> /app/entrypoint.sh && \
    echo 'fi' >> /app/entrypoint.sh && \
    echo 'serve -s build -l 3000' >> /app/entrypoint.sh && \
    chmod +x /app/entrypoint.sh

# Expose port
EXPOSE 3000

# Use entrypoint script
CMD ["/app/entrypoint.sh"]