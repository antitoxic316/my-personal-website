from django.shortcuts import render
from django.views import generic

from .models import Project

class IndexView(generic.TemplateView):
  template_name = "projects/index.html"

  extra_context = {
    "projects_list": Project.objects.all(),
  }

class DetailView(generic.DetailView):
  model = Project
  template_name = "projects/detail.html"