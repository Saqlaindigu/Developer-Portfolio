# Generated by Django 5.1.2 on 2024-11-03 17:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio_main', '0003_remove_blogpost_content_remove_blogpost_updated_at_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='BlogPost',
        ),
    ]
