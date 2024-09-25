#!/bin/bash

# Step 1: Build the Docker images
echo "pulling"
git pull

echo "Building Docker images..."
docker-compose build

# Step 2: Start the containers in detached mode
echo "Starting Docker containers..."
docker-compose up -d

# Step 3: Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
retry_count=0
max_retries=10

# Get the name of the PostgreSQL container
pg_container_name=$(docker ps --format '{{.Names}}' | grep 'gobackend-db')

# Loop until PostgreSQL is ready
until docker exec -it "$pg_container_name" pg_isready > /dev/null 2>&1; do
  sleep 1
  ((retry_count++))

  if [ "$retry_count" -ge "$max_retries" ]; then
    echo "PostgreSQL is not ready yet. Checking logs..."
    docker logs "$pg_container_name"
    exit 1
  fi
done


echo "PostgreSQL is ready!"

# Step 4: Run Go application (if needed)
# You might need to run your Go app separately if it's not part of the container setup.
echo "Building and starting the Go application..."
docker build -t ask-me-anything ../Dockerfile  # Use your Go Dockerfile context
docker run -d --name ask-me-anything --network bridge ask-me-anything