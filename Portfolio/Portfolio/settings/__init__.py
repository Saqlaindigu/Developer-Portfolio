from .base import *

# Import development or production settings based on DJANGO_ENV
import os
django_env = os.getenv('DJANGO_ENV', 'development')

if django_env == 'production':
    from .production import *
else:
    from .development import * 