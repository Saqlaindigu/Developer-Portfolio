#!/bin/bash

# Install Python dependencies
pip install -r requirements.txt

# Change to the Portfolio directory
cd Portfolio || exit

# Run database migrations
python manage.py migrate --noinput

# Collect static files
python manage.py collectstatic --noinput