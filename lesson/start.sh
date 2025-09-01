#!/bin/sh

echo "Starting lesson service..."

# Check if migrations exist
if [ ! -d "prisma/migrations" ] || [ -z "$(ls -A prisma/migrations 2>/dev/null)" ]; then
    echo "No migrations found, pushing schema..."
    npx prisma db push
else
    echo "Attempting to run migrations..."
    npx prisma migrate deploy
fi

# Wait a moment for the database to be ready
sleep 3

# Run seed script
echo "Running seed script..."
npx prisma db seed || echo "Seed failed, continuing..."

# Start the application
echo "Starting application..."
npm start
