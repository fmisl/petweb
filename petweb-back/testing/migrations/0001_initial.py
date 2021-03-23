# Generated by Django 3.1.7 on 2021-03-23 05:51

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Case',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('Opened', models.BooleanField(default=False)),
                ('Select', models.BooleanField(default=False)),
                ('Focus', models.BooleanField(default=False)),
                ('Group', models.IntegerField(default=0)),
                ('fileID', models.IntegerField(blank=True)),
                ('FileName', models.CharField(blank=True, max_length=150, null=True)),
                ('PatientID', models.IntegerField(blank=True)),
                ('PatientName', models.CharField(blank=True, max_length=150, null=True)),
                ('Age', models.IntegerField(default=0)),
                ('Sex', models.CharField(blank=True, max_length=3, null=True)),
                ('Tracer', models.CharField(blank=True, max_length=150, null=True)),
                ('SUVR', models.FloatField(default=None)),
                ('Centiloid', models.FloatField(default=None)),
                ('Composite', models.FloatField(blank=True)),
                ('Frontal_L', models.FloatField(blank=True)),
                ('Frontal_R', models.FloatField(blank=True)),
                ('Parietal_L', models.FloatField(blank=True)),
                ('Parietal_R', models.FloatField(blank=True)),
                ('Temporal_L', models.FloatField(blank=True)),
                ('Temporal_R', models.FloatField(blank=True)),
                ('Cingulate_L', models.FloatField(blank=True)),
                ('Cingulate_R', models.FloatField(blank=True)),
                ('Striatum_L', models.FloatField(blank=True)),
                ('Striatum_R', models.FloatField(blank=True)),
                ('Occipital_L', models.FloatField(blank=True)),
                ('Occipital_R', models.FloatField(blank=True)),
                ('Thalamus_L', models.FloatField(blank=True)),
                ('Thalamus_R', models.FloatField(blank=True)),
                ('Frontal_L_C', models.FloatField(blank=True)),
                ('Frontal_R_C', models.FloatField(blank=True)),
                ('Cingulate_L_C', models.FloatField(blank=True)),
                ('Cingulate_R_C', models.FloatField(blank=True)),
                ('Striatum_L_C', models.FloatField(blank=True)),
                ('Striatum_R_C', models.FloatField(blank=True)),
                ('Thalamus_L_C', models.FloatField(blank=True)),
                ('Thalamus_R_C', models.FloatField(blank=True)),
                ('Occipital_L_C', models.FloatField(blank=True)),
                ('Occipital_R_C', models.FloatField(blank=True)),
                ('Parietal_L_C', models.FloatField(blank=True)),
                ('Parietal_R_C', models.FloatField(blank=True)),
                ('Temporal_L_C', models.FloatField(blank=True)),
                ('Temporal_R_C', models.FloatField(blank=True)),
                ('Composite_C', models.FloatField(blank=True)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
    ]
