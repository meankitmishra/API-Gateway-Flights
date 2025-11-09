#!/bin/sh

set -e

# Run the database migration
echo "Running database migrations..."
npx sequelize-cli db:migrate --env production

# Start the main application
echo "Migrations complete, starting server..."
exec npm start