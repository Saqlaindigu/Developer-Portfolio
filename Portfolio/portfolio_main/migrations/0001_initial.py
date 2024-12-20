# Generated by Django 5.1.2 on 2024-11-03 13:29

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BlogPost',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('slug', models.SlugField(blank=True, unique=True)),
                ('subtitle', models.CharField(blank=True, max_length=200)),
                ('content', models.TextField()),
                ('linkedin_url', models.URLField(blank=True)),
                ('featured_image', models.ImageField(blank=True, upload_to='blog_images/')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('is_featured', models.BooleanField(default=False)),
                ('views_count', models.IntegerField(default=0)),
                ('reading_time', models.IntegerField(default=5)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
    ]
