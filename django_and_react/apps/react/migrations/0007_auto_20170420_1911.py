# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-04-20 19:11
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('react', '0006_auto_20170420_1855'),
    ]

    operations = [
        migrations.AlterField(
            model_name='wager',
            name='winner',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='user_winner', to='login.User'),
        ),
    ]
