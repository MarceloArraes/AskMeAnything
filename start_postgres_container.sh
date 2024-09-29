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
until docker exec -it "$pg_container_name" pg_isready -U ${WSRS_DATABASE_USER} > /dev/null 2>&1; do
  sleep 1
  ((retry_count++))

  if [ "$retry_count" -ge "$max_retries" ]; then
    echo "PostgreSQL is not ready yet. Checking logs..."
    docker logs "$pg_container_name"
    exit 1
  fi
done


echo "PostgreSQL is ready!"

# Step 5: Check if the combined app container is running
app_container_name=$(docker-compose ps -q app)
if [ -z "$app_container_name" ]; then
  echo "The app container is not running. Checking logs..."
  docker-compose logs app
  exit 1
else
  echo "The app container is running. Deployment successful!"
fi

# Optional: Print the logs of the app container
echo "Printing the last 50 lines of app container logs:"
docker-compose logs --tail 50 app


# Step 4: Run Go application (if needed)
# You might need to run your Go app separately if it's not part of the container setup.
# echo "Building and starting the Go application..."
# docker build -t ask-me-anything -f ../Dockerfile .. # Use your Go Dockerfile context
# docker run -d --name ask-me-anything -p 8082:8082 --network bridge ask-me-anything