import os
import sys

# Add your project directory to the sys.path
project_home = '/home/u123456789/public_html'  # Replace with your actual path
if project_home not in sys.path:
    sys.path.insert(0, project_home)

# Set environment variable to tell Django where to find settings
os.environ['DJANGO_SETTINGS_MODULE'] = 'Portfolio.settings.production'

# Import the Django WSGI handler
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()