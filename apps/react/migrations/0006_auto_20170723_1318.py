# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-07-23 18:18
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('react', '0005_auto_20170723_1317'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activity',
            name='wager',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='wager_activity', to='react.Wager'),
        ),
    ]