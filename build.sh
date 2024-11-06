#!/bin/bash

# Make the script executable
chmod +x build.sh

# Install Python dependencies
pip install -r requirements.txt

# Change to the correct directory
cd Portfolio

# Run database migrations
python manage.py migrate --noinput

# Collect static files
python manage.py collectstatic --noinput

# Create superuser if needed (optional)
# python manage.py createsuperuser --noinput