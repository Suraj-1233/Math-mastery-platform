
#!/bin/bash

# Green text for success, Red for error
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}Starting Math Mastery Platform Setup...${NC}"

# Check for node_modules
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
else
    echo "Dependencies found."
fi

# Generate Prisma Client
echo "Generating Prisma Client..."
npx prisma generate

# Pushing DB Schema (requires running DB)
echo "Setting up Database..."
# Check if docker is available and running
if docker info > /dev/null 2>&1; then
    echo "Starting Docker Database..."
    docker-compose up -d
    
    echo "Waiting for Database to be ready..."
    sleep 5
    
    echo "Pushing Schema..."
    npx prisma db push
else
    echo -e "${RED}Docker not running. Please ensure your PostgreSQL database is reachable at the URL in .env${NC}"
    echo "Attempting to push schema anyway (in case local DB is running)..."
    npx prisma db push
fi

# Run the dev server
echo -e "${GREEN}Starting Development Server...${NC}"
npm run dev
