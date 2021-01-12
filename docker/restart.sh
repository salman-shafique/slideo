#!/bin/bash
cd /var/www/app

symfony server:stop;
php bin/console cache:clear;
symfony server:start -d;
chmod -R 777 var;
chmod -R 777 public/styles;
chmod -R 777 public/icons;
chmod -R 777 public/layouts;
chmod -R 777 public/uploads;
chmod -R 777 public/presentations;
chmod -R 777 /var/www/app/var/cache/prod/;
php bin/console cache:warmup;

echo "Done";