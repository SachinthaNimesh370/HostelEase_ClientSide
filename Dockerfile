# Use an official Node.js runtime as a base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port (optional, but useful for container orchestration)
EXPOSE 5173

# Run the development server
CMD ["npm", "run", "dev"]

# docker build -t hostel_ease .
# docker run --name container_hostel_ease -p 3000:5173 hostel_ease
# docker run --name container_hostel_ease -p 3000:5173 --rm -v /app/node_modules -v ${PWD}:/app -e CHOKIDAR_USEPOLLING=true hostel_ease

#WITH VERSIONING =====================

# docker build -t hostel_ease:v1 .
# docker run --name container_hostel_ease -p 3000:5173 --rm -v /app/node_modules -v ${PWD}:/app -e CHOKIDAR_USEPOLLING=true hostel_ease:v1

#PUSHING TO DOCKER HUB =====================
# docker login
# docker tag hostel_ease:v1 sachinthanimesh/hostel_ease:v1
# docker images
# docker push sachinthanimesh/hostel_ease:v1
