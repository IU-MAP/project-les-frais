# Generated by Django 3.2 on 2021-05-11 12:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_remove_category_color'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='color',
            field=models.SmallIntegerField(blank=True, default=1),
            preserve_default=False,
        ),
    ]
