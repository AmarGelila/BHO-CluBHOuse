# Use the official Node.js long-term support image
FROM node:20-alpine

# Enable Corepack to install and manage pnpm dynamically
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy dependency mappings first to leverage layer caching
COPY package.json pnpm-lock.yaml ./

# Install production-only dependencies strictly matching the lockfile
RUN pnpm install --prod --frozen-lockfile

# Copy the remaining application source code
COPY . .

# Expose the port (Back4app binds process.env.PORT to this container layer)
EXPOSE 3000

# Fire up the Express application
CMD ["pnpm", "start"]