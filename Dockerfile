FROM python:3.11.13

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=mysite.settings-deploy


USER root
RUN apt-get update && \
    apt-get install -y \
    apache2 \
    apache2-dev \
    gcc

RUN useradd -m -s /bin/bash apache
ENV PATH="/home/apache/.local/bin:${PATH}"

USER apache
RUN pip install -v mod_wsgi mod_wsgi-httpd

USER root
COPY docker-django/init/init.sh /docker-entrypoint-init.d/init.sh
RUN chmod +x /docker-entrypoint-init.d/init.sh


COPY requirements.txt .
USER apache
RUN pip install --upgrade pip && pip install -r requirements.txt

USER root
COPY . /app/
WORKDIR /app
RUN chmod -R 777 /app

ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8




USER apache
RUN mkdir /app/mod_wsgi
RUN mkdir /app/logs
CMD [ \
  "mod_wsgi-express", "start-server", \
  "--server-name", "django.docker.localhost", \
  "--user", "apache", \
  "--group", "apache", \
  "--working-directory", "/app", \
  "--entry-point", "/app/mysite/wsgi.py", \
  "--server-root", "/app/mod_wsgi", \
  "--locale", "C.UTF-8", \
  "--max-log-size", "500", \ 
  "--processes", "4", \
  "--threads", "12", \
  "--include-file", "/app/docker-django/config/httpd.conf", \
  "--trust-proxy-header", "X-Forwarded-Host", \
  "--trust-proxy", "172.20.0.0/16", \
  "--host", "0.0.0.0", \
  "--port", "8000" \
]