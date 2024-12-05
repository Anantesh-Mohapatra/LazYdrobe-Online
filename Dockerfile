# Build stage
FROM node:16-alpine as builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all frontend files
COPY . .

# Build the application
RUN npm run build

# Runtime stage (Nginx)
FROM nginx:alpine

# Copy built files from builder stage to Nginx directory
COPY --from=builder /app/build /usr/share/nginx/html

# Create nginx.conf that reads PORT environment variable from Cloud Run
RUN printf 'server {\n\
    listen 80;\n\
    location / {\n\
    root /usr/share/nginx/html;\n\
    index index.html index.htm;\n\
    try_files $uri $uri/ /index.html;\n\
    }\n\
    }\n' > /etc/nginx/conf.d/default.conf.template

# Use shell to substitute PORT value in nginx.conf
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
