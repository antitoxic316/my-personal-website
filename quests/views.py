from django.shortcuts import render
from django.views import generic

from .models import Quest

class IndexView(generic.TemplateView):
  template_name = "quests/index.html"

  extra_context = {
    "quests_list": Quest.objects.all(),
  }

class DetailView(generic.DetailView):
  model = Quest
  template_name = "quests/detail.html"