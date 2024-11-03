from .base import *

DEBUG = False
SECRET_KEY = os.getenv('SECRET_KEY')

ALLOWED_HOSTS = [
    'saqlaindigu.com',  # Your domain
    'www.saqlaindigu.com',
    'your-hostinger-subdomain.000webhostapp.com'  # Your Hostinger subdomain
]

# Simplified database settings for shared hosting
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.getenv('DB_NAME'),
        'USER': os.getenv('DB_USER'),
        'PASSWORD': os.getenv('DB_PASSWORD'),
        'HOST': 'localhost',
        'PORT': '3306',
    }
}

# Static files configuration
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR.parent, 'public_html/static')
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR.parent, 'public_html/media')

# Security settings
CSRF_TRUSTED_ORIGINS = [
    'https://saqlaindigu.com',
    'https://www.saqlaindigu.com',
]

# Email settings
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD')