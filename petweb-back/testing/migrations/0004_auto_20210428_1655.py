# Generated by Django 3.1.7 on 2021-04-28 07:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('testing', '0003_case_scandate'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='case',
            name='ScanDate',
        ),
        migrations.AddField(
            model_name='case',
            name='AcquisitionDateTime',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]