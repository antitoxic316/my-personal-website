from django.db import models

class MiscPage(models.Model):
  name = models.CharField(max_length=100)
  template_name = models.CharField(max_length=100)
  unique_string = models.CharField(max_length=400)