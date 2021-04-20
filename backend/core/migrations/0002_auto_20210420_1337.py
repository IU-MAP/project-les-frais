# Generated by Django 3.2 on 2021-04-20 09:37

from django.db import migrations
from ..constants import DEFAULT_CURRENCY


def create_default_currency(apps, schema_editor):
    # We can't import the Person model directly as it may be a newer
    # version than this migration expects. We use the historical version.
    Currency = apps.get_model('core', 'Currency')
    if not Currency.objects.count():
        for e in DEFAULT_CURRENCY:
            Currency.objects.create(**e)


class Migration(migrations.Migration):
    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_default_currency),
    ]