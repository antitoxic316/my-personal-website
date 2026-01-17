from django.urls import path

from . import views

app_name = "stuff"
urlpatterns = [
  path("", views.IndexView.as_view(), name="index"),
  path("cat/", views.CatView.as_view(), name="cat"),
  path("stats/", views.StatsView.as_view(), name="stats"),
]