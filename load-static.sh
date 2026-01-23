#!/bin/bash

npx vite build
echo 'yes' | python manage.py collectstatic