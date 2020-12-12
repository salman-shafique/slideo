#!/bin/bash
cd /var/www/app

symfony server:stop;
php bin/console cache:clear;
symfony server:start -d;
chmod -R 777 var/*;
chmod -R 777 public/styles;
chmod -R 777 public/icons;
chmod -R 777 public/layouts;
php bin/console cache:warmup;

echo "Done";