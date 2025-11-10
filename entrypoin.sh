#!/bin/bash

# Run migrations
npx prisma migrate deploy --schema="./prisma/schema.prisma"

# Start the app
exec npm run start