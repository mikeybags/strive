# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-04-20 02:02
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('react', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Task',
            new_name='Tasks',
        ),
        migrations.RenameModel(
            old_name='Wager',
            new_name='Wagers',
        ),
    ]