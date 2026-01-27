from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static

from .views import IndexView

urlpatterns = [
    path('', IndexView.as_view()),
    path('admin/', admin.site.urls),
    path('quests/', include("quests.urls")),
    path('projects/', include("projects.urls")),
    path('stuff/', include("stuff.urls")),
]