# Generated by Django 3.1.7 on 2021-05-10 11:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Case',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Update', models.DateTimeField(auto_now_add=True)),
                ('Opened', models.BooleanField(blank=True, default=False)),
                ('Select', models.BooleanField(blank=True, default=False)),
                ('Focus', models.BooleanField(blank=True, default=False)),
                ('Group', models.IntegerField(blank=True, default=0)),
                ('fileID', models.CharField(blank=True, max_length=150, null=True)),
                ('OriginalFileName', models.CharField(blank=True, max_length=500, null=True)),
                ('FileName', models.CharField(blank=True, max_length=150, null=True)),
                ('InputAffineParamsX0', models.FloatField(blank=True, max_length=100, null=True)),
                ('InputAffineParamsY1', models.FloatField(blank=True, max_length=100, null=True)),
                ('InputAffineParamsZ2', models.FloatField(blank=True, max_length=100, null=True)),
                ('OutputAffineParamsX0', models.FloatField(blank=True, max_length=100, null=True)),
                ('OutputAffineParamsY1', models.FloatField(blank=True, max_length=100, null=True)),
                ('OutputAffineParamsZ2', models.FloatField(blank=True, max_length=100, null=True)),
                ('PatientID', models.CharField(blank=True, max_length=150, null=True)),
                ('PatientName', models.CharField(blank=True, max_length=150, null=True)),
                ('Age', models.CharField(blank=True, max_length=20, null=True)),
                ('Sex', models.CharField(blank=True, max_length=3, null=True)),
                ('AcquisitionDateTime', models.CharField(blank=True, default=None, max_length=100, null=True)),
                ('Tracer', models.CharField(blank=True, max_length=150, null=True)),
                ('SUVR', models.FloatField(blank=True, default=None, null=True)),
                ('Centiloid', models.FloatField(blank=True, default=None, null=True)),
                ('Composite', models.FloatField(blank=True, null=True)),
                ('Frontal_L', models.FloatField(blank=True, null=True)),
                ('Frontal_R', models.FloatField(blank=True, null=True)),
                ('Parietal_L', models.FloatField(blank=True, null=True)),
                ('Parietal_R', models.FloatField(blank=True, null=True)),
                ('Temporal_L', models.FloatField(blank=True, null=True)),
                ('Temporal_R', models.FloatField(blank=True, null=True)),
                ('Cingulate_L', models.FloatField(blank=True, null=True)),
                ('Cingulate_R', models.FloatField(blank=True, null=True)),
                ('Striatum_L', models.FloatField(blank=True, null=True)),
                ('Striatum_R', models.FloatField(blank=True, null=True)),
                ('Occipital_L', models.FloatField(blank=True, null=True)),
                ('Occipital_R', models.FloatField(blank=True, null=True)),
                ('Thalamus_L', models.FloatField(blank=True, null=True)),
                ('Thalamus_R', models.FloatField(blank=True, null=True)),
                ('Frontal_L_C', models.FloatField(blank=True, null=True)),
                ('Frontal_R_C', models.FloatField(blank=True, null=True)),
                ('Cingulate_L_C', models.FloatField(blank=True, null=True)),
                ('Cingulate_R_C', models.FloatField(blank=True, null=True)),
                ('Striatum_L_C', models.FloatField(blank=True, null=True)),
                ('Striatum_R_C', models.FloatField(blank=True, null=True)),
                ('Thalamus_L_C', models.FloatField(blank=True, null=True)),
                ('Thalamus_R_C', models.FloatField(blank=True, null=True)),
                ('Occipital_L_C', models.FloatField(blank=True, null=True)),
                ('Occipital_R_C', models.FloatField(blank=True, null=True)),
                ('Parietal_L_C', models.FloatField(blank=True, null=True)),
                ('Parietal_R_C', models.FloatField(blank=True, null=True)),
                ('Temporal_L_C', models.FloatField(blank=True, null=True)),
                ('Temporal_R_C', models.FloatField(blank=True, null=True)),
                ('Composite_C', models.FloatField(blank=True, null=True)),
                ('UserID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-Update'],
            },
        ),
        migrations.CreateModel(
            name='Slice',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Update', models.DateTimeField(auto_now_add=True)),
                ('Type', models.CharField(blank=True, max_length=150, null=True)),
                ('ImageID', models.IntegerField(blank=True, null=True)),
                ('Direction', models.CharField(blank=True, max_length=150, null=True)),
                ('Width', models.IntegerField(blank=True, null=True)),
                ('Height', models.IntegerField(blank=True, null=True)),
                ('Depth', models.IntegerField(blank=True, null=True)),
                ('B64Data', models.TextField(blank=True, max_length=5000, null=True)),
                ('CaseID', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='slices', to='testing.case')),
            ],
            options={
                'ordering': ['pk'],
            },
        ),
    ]
