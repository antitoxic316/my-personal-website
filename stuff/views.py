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

  extra_context = {
    "mini_elems_range": range(1,30),
  }

class StatsView(generic.TemplateView):
  template_name = "stuff/stats.html"

  