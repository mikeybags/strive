# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-07-23 18:17
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('react', '0004_activity_wager'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activity',
            name='wager',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='wager_activity', to='react.Wager'),
        ),
    ]
