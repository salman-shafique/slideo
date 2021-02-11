#!/bin/bash
cd /var/www/app;

echo_ () { echo -e "\033[41m${1}\033[m"; }

# Composer check
composer_check="$(composer show 2>&1 | grep 'composer install')"
if [ ! -z "$composer_check" ]; then 
    echo_ "Installing composer dependencies..."
    composer install
fi;

# Yarn check
yarn_check="$(yarn encore 2>&1 | grep 'not found.')"
if [ ! -z "$yarn_check" ]; then 
    echo_ "Installing yarn dependencies...";
    yarn install;
fi;

# If it is development enviroment, run yarn watch
case $APP_ENV in
  dev)
    echo_ "Starting yarn watch";
    nohup yarn watch &
    ;;
  prod)
    echo_ "Starting yarn build";
    yarn build;
    ;;
  *)
    ;;
esac;

# Consume messages
while [ $(curl -Is -w "%{http_code}" -L "http://slideo_rabbitmq:15672/" -o /dev/null) -ne "200" ]
do
echo_ "Waiting for the Rabbit MQ server..."
sleep 10s;
done
nohup php bin/console messenger:consume mail -vv &

start_server=$(symfony server:start -d | grep [OK])
if [ "$start_server" == "" ]; then 
    echo_ "Restart the server";
    symfony server:stop; 
    symfony server:start -d; 
fi;

symfony server:log 