#!/bin/bash
cd /var/www/app

symfony server:stop;
php bin/console cache:clear;
symfony server:start -d;
chmod -R 777 var;
chmod -R 777 public;
chmod -R 777 /var/www/app/var/cache/prod/;
php bin/console cache:warmup;

# Consume messages
php bin/console messenger:stop-workers
nohup php bin/console messenger:consume mail &

echo "Done";