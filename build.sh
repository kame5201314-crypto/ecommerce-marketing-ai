#!/bin/bash

# Create .env file from Vercel environment variables
echo "Creating .env file from environment variables..."
cat > .env << ENVFILE
VITE_OPENAI_API_KEY=${VITE_OPENAI_API_KEY}
VITE_AI_MODEL=${VITE_AI_MODEL:-gpt-3.5-turbo}
VITE_OPENROUTER_API_KEY=${VITE_OPENROUTER_API_KEY}
ENVFILE

echo "Environment file created:"
cat .env

# Run the build
npm run build
