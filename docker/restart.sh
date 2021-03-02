#!/bin/bash
cd /var/www/app;

echo_ () { echo -e "\033[41m${1}\033[m"; }

echo_ "Update the Symfony server";
symfony self:update -y;

symfony server:stop;
php bin/console cache:clear;

symfony server:start -d;
chmod -R 777 var;
chmod -R 777 public;
php bin/console cache:warmup;

# Consume messages
php bin/console messenger:stop-workers
nohup php bin/console messenger:consume mail download &

echo_ "Retry the failed downloads"
php bin/console  slideo:download:retry

echo_ "Restart crons"
crontab -u root -r
crontab -u root /var/www/app/docker/cron

echo_ "Done";