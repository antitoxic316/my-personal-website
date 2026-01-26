#!/bin/bash

cd /app
python manage.py makemigrations 
bash load-static.sh