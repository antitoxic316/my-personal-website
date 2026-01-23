"""
WSGI config for mysite project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

print(os.getenv('DEPLOY'))

os.environ.setdefault(
    'DJANGO_SETTINGS_MODULE', 'mysite.settings-deploy'
)

application = get_wsgi_application()
