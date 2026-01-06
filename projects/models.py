from django.db import models

# Create your models here.

class Project(models.Model):
  name = models.CharField(max_length=100);
  description = models.CharField(max_length=1000);
  preview_img = models.ImageField(
    upload_to='images/',
    default='images/lain1.png'
  );