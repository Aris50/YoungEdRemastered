# Stage 1: Build the React app
FROM node:20-alpine AS build
WORKDIR /app/frontend

ENV VITE_API_URL=arisoniga.com/api

# Copy package.json and install dependencies
COPY package.json ./
# Install yarn first
RUN apk add --no-cache yarn

# Assuming you might have a yarn.lock, uncomment if you do
# COPY yarn.lock ./
RUN yarn install

# Copy the rest of the frontend code
COPY . .

# Build the application
RUN yarn build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy the build output from the builder stage
COPY --from=build /app/frontend/dist /usr/share/nginx/html

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]