from django.core.management.base import BaseCommand
import os
from django.conf import settings
import shutil

class Command(BaseCommand):
    help = 'Sets up static files including default images'

    def handle(self, *args, **kwargs):
        # Create directories if they don't exist
        static_dir = os.path.join(settings.BASE_DIR, 'static')
        images_dir = os.path.join(static_dir, 'images')
        os.makedirs(images_dir, exist_ok=True)

        # Create a simple default profile image if it doesn't exist
        default_profile = os.path.join(images_dir, 'default-profile.jpg')
        if not os.path.exists(default_profile):
            # Copy from your source or create a new one
            # For this example, we'll assume you have a default image in your project
            source_image = os.path.join(settings.BASE_DIR, 'portfolio_main', 'default-profile.jpg')
            if os.path.exists(source_image):
                shutil.copy(source_image, default_profile)
            else:
                self.stdout.write(self.style.WARNING(
                    'Please add a default profile image at: ' + default_profile
                ))

        self.stdout.write(self.style.SUCCESS('Static files setup completed')) 