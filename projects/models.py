from django.db import models
from tinymce import models as tinymce_models

class Project(models.Model):
  name = models.CharField(max_length=100);
  description = models.CharField(max_length=1000);
  preview_img = models.ImageField(
    upload_to='images/',
    default='images/lain1.png'
  );

  detail_content = tinymce_models.HTMLField(default="")

  relevant_links = models.JSONField(default=list, blank=True)