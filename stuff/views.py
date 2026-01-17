from django.shortcuts import render
from django.views import generic

from .models import MiscPage

from quests.models import Quest
from projects.models import Project


class IndexView(generic.TemplateView):
  template_name = "stuff/index.html"

  extra_context = {
    "misc_urls_list": MiscPage.objects.all(),
  }

class CatView(generic.TemplateView):
  template_name = "stuff/cat.html"

class StatsView(generic.TemplateView):
  template_name = "stuff/stats.html"
