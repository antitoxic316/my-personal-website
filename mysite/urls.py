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
    path("__reload__/", include("django_browser_reload.urls")), # tailwind reload
]


#TODO remove in prod
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += path('tinymce/', include('tinymce.urls')),