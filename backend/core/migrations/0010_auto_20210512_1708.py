# Generated by Django 3.2 on 2021-05-12 14:08

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('core', '0009_category_color'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='categories', to=settings.AUTH_USER_MODEL, verbose_name='Owner'),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='transactions', to='core.category', verbose_name='Category'),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='currency',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='transactions', to='core.currency', verbose_name='Currency'),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='transactions', to=settings.AUTH_USER_MODEL, verbose_name='Owner'),
        ),
        migrations.AlterUniqueTogether(
            name='category',
            unique_together={('owner', 'name')},
        ),
    ]