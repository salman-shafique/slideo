#!/bin/bash
cd /var/www/app

symfony server:stop;
php bin/console cache:clear;
symfony server:start -d;
chmod -R 777 var/*;
chmod -R 777 public/styles;
php bin/console cache:warmup;

echo "Done";