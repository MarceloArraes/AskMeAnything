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
until docker exec -it $(docker ps -q -f "name=*db*") pg_isready > /dev/null 2>&1; do
  echo "PostgreSQL is not ready yet. Checking logs..."
  docker logs db  # Output the logs for debugging
  sleep 1
done


echo "PostgreSQL is ready!"

# Step 4: Run Go application (if needed)
# You might need to run your Go app separately if it's not part of the container setup.
echo "Building and starting the Go application..."
docker build -t ask-me-anything ../Dockerfile  # Use your Go Dockerfile context
docker run -d --name ask-me-anything --network bridge ask-me-anything