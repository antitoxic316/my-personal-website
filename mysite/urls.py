from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('projects/', include("projects.urls")),
    path("__reload__/", include("django_browser_reload.urls")), # tailwind reload
]


#TODO remove in prod
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)