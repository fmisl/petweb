from django.db import models
import os


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True
    def __str__(self):
        return self.created_at


class Case(TimeStampedModel):
    Opened = models.BooleanField(blank=False, default=False)
    Select = models.BooleanField(blank=False, default=False)
    Focus = models.BooleanField(blank=False, default=False)
    Group = models.IntegerField(blank=False, default=0)

    fileID = models.IntegerField(blank=True, null=True)
    FileName = models.CharField(max_length=150, blank=True, null=True)
    PatientID = models.IntegerField(blank=True)
    PatientName = models.CharField(max_length=150, blank=True, null=True)
    Age = models.IntegerField(blank=False, default=0)
    Sex = models.CharField(max_length=3, blank=True, null=True)

    Tracer = models.CharField(max_length=150, blank=True, null=True)
    SUVR = models.FloatField(blank=False, default=None)
    Centiloid = models.FloatField(blank=False, default=None)

    Composite = models.FloatField(blank=True, null=True)
    Frontal_L = models.FloatField(blank=True, null=True)
    Frontal_R = models.FloatField(blank=True, null=True)
    Parietal_L = models.FloatField(blank=True, null=True)
    Parietal_R = models.FloatField(blank=True, null=True)
    Temporal_L = models.FloatField(blank=True, null=True)
    Temporal_R = models.FloatField(blank=True, null=True)
    Cingulate_L = models.FloatField(blank=True, null=True)
    Cingulate_R = models.FloatField(blank=True, null=True)
    Striatum_L = models.FloatField(blank=True, null=True)
    Striatum_R = models.FloatField(blank=True, null=True)
    Occipital_L = models.FloatField(blank=True, null=True)
    Occipital_R = models.FloatField(blank=True, null=True)
    Thalamus_L = models.FloatField(blank=True, null=True)
    Thalamus_R = models.FloatField(blank=True, null=True)

    Frontal_L_C = models.FloatField(blank=True, null=True)
    Frontal_R_C = models.FloatField(blank=True, null=True)
    Cingulate_L_C = models.FloatField(blank=True, null=True)
    Cingulate_R_C = models.FloatField(blank=True, null=True)
    Striatum_L_C = models.FloatField(blank=True, null=True)
    Striatum_R_C = models.FloatField(blank=True, null=True)
    Thalamus_L_C = models.FloatField(blank=True, null=True)
    Thalamus_R_C = models.FloatField(blank=True, null=True)
    Occipital_L_C = models.FloatField(blank=True, null=True)
    Occipital_R_C = models.FloatField(blank=True, null=True)
    Parietal_L_C = models.FloatField(blank=True, null=True)
    Parietal_R_C = models.FloatField(blank=True, null=True)
    Temporal_L_C = models.FloatField(blank=True, null=True)
    Temporal_R_C = models.FloatField(blank=True, null=True)
    Composite_C = models.FloatField(blank=True, null=True)

    #
    # ScanDate = models.CharField(max_length=150, blank=True, null=True)
    #
    # Global = models.CharField(max_length=150, blank=True, null=True)
    # Lateral_Temporal = models.CharField(max_length=150, blank=True, null=True)
    # Lateral_Parietal = models.CharField(max_length=150, blank=True, null=True)
    # PC_PRC = models.CharField(max_length=150, blank=True, null=True)
    # Frontal = models.CharField(max_length=150, blank=True, null=True)

    # Format = models.CharField(max_length=150, blank=True, null=True)
    # DebugFlag = models.IntegerField(blank=False, default=0)
    # Step0 = models.BooleanField(blank=False, default=False)
    # Step1 = models.BooleanField(blank=False, default=False)
    # Step2 = models.BooleanField(blank=False, default=False)
    # Step3 = models.BooleanField(blank=False, default=False)
    # Step4 = models.BooleanField(blank=False, default=False)
    # Step5 = models.BooleanField(blank=False, default=False)
    # Step6 = models.BooleanField(blank=False, default=False)
    # Step7 = models.BooleanField(blank=False, default=False)
    # Step8 = models.BooleanField(blank=False, default=False)
    # Step9 = models.BooleanField(blank=False, default=False)
    # Step10 = models.BooleanField(blank=False, default=False)
    # Ready = models.BooleanField(blank=False, default=False)
    # File_nifti = models.FileField(upload_to=self_caseID_path, max_length=150, null=True)
    # File_hdr = models.FileField(upload_to=self_caseID_path, max_length=150, null=True)
    # File_img = models.FileField(upload_to=self_caseID_path, max_length=150, null=True)
    # VolumeX = models.CharField(max_length=5, blank=True, null=True)
    # VolumeY = models.CharField(max_length=5, blank=True, null=True)
    # VolumeZ = models.CharField(max_length=5, blank=True, null=True)
    # UserID = models.ForeignKey(user_model.User, null=True, blank=True,
    #                             on_delete=models.CASCADE, related_name='patients')

    # @property
    # def image_count(self):
    #     return self.slices.all().count()
    #
    # @property
    # def image_list(self):
    #     return self.slices.all()

    class Meta:
        ordering = ['-created_at']
    def __str__(self):
        return self.FileName