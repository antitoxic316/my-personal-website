from django.db import models
from tinymce import models as tinymce_models

from projects.models import Project

class Quest(models.Model):
  name = models.CharField(max_length=100)
  preview_img = models.ImageField(
    upload_to='images/',
    default='images/lain1.png'
  )

  projects_links = models.ManyToManyField(
    'projects.Project', 
    related_name='quests', 
    blank=True
  )

  detail_content = tinymce_models.HTMLField(default="")

  relevant_links_self = models.JSONField(default=list, blank=True)