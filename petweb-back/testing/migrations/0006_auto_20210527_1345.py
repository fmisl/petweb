# Generated by Django 3.1.7 on 2021-05-27 04:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('testing', '0005_case_complete'),
    ]

    operations = [
        migrations.RenameField(
            model_name='case',
            old_name='Centiloid',
            new_name='SUVR_C',
        ),
    ]