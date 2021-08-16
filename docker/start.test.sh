#!/bin/bash
cd /var/www/app;

echo_ () { echo -e "\033[41m${1}\033[m"; }

echo_ "Stopping symfony...";
symfony server:stop;

# Composer install
echo_ "Updating composer dependencies..."
composer self-update --2;
composer install;
composer update;

# Yarn install
echo_ "Installing yarn dependencies...";
yarn install;
yarn build;

echo_ "Update the Symfony server";
symfony self:update -y;
echo_ "Update the database";
php bin/console doctrine:database:create --if-not-exists;
php bin/console d:m:m -n;

# Crons
echo_ "Start crons"
service cron start
crontab -u root /var/www/app/docker/cron

# Consume messages
while [ $(curl -Is -w "%{http_code}" -L "http://slideo_rabbitmq:15672/" -o /dev/null) -ne "200" ]
do
echo_ "Waiting for the Rabbit MQ server..."
sleep 10s;
done
nohup php bin/console messenger:consume mail download thumnail -vv &

symfony server:start -d;

symfony server:log 