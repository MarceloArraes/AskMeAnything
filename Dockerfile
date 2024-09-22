# Stage 1: Build the React frontend
FROM node:18 AS build-frontend

WORKDIR /app/frontend
COPY askMeAnythingFront/web/package*.json ./
RUN npm install
COPY askMeAnythingFront/web/ ./

# Copy the frontend .env file
COPY askMeAnythingFront/web/.env /app/frontend/.env

RUN npm run build

# Stage 2: Build the Go backend
FROM golang:1.22.7-alpine AS build-backend

WORKDIR /app/backend
COPY goBackend/go.mod goBackend/go.sum ./

# Copy the .env file to the backend directory
COPY goBackend/.env /app/backend/.env

RUN go mod download
COPY goBackend/ ./
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/wsrs ./cmd/wsrs

# Stage 3: Final image with Nginx to serve frontend and proxy backend requests
FROM nginx:alpine

# Copy built frontend from the first stage
COPY --from=build-frontend /app/frontend/dist /usr/share/nginx/html

# Copy the backend binary from the second stage
COPY --from=build-backend /app/wsrs /usr/local/bin/wsrs

# Copy the backend .env file to the same directory as the Go binary
COPY --from=build-backend /app/backend/.env /usr/local/bin/.env

# Nginx configuration for serving frontend and proxying backend API requests
COPY nginx.conf /etc/nginx/nginx.conf

# Expose the port Nginx will listen on
EXPOSE 80
WORKDIR /usr/local/bin
# Start both Nginx and the Go backend
CMD ["/bin/sh", "-c", "/usr/local/bin/wsrs & nginx -g 'daemon off;'"]
