#!/bin/bash
cd /var/www/app;

echo_ () { echo -e "\033[41m${1}\033[m"; }

echo_ "Update the Symfony server";
symfony self:update -y;

symfony server:stop;
php bin/console cache:clear;

# Composer install
echo_ "Updating composer dependencies..."
composer self-update --2;
composer install;
composer update;


echo_ "Updating database structure..."
php bin/console d:m:m -n;

# Yarn install
echo_ "Installing yarn dependencies...";
yarn install;
yarn build;

symfony server:start -d;
chmod -R 777 var;
chmod -R 777 public;
php bin/console cache:warmup;

# Consume messages
php bin/console messenger:stop-workers
nohup php bin/console messenger:consume mail download thumnail -vv &

echo_ "Retry the failed downloads";
php bin/console slideo:download:retry;

echo_ "Restart crons";
service cron restart
crontab -u root /var/www/app/docker/cron

echo_ "Done";