#!/bin/bash
cd /var/www/app

start_server=$(symfony server:start -d | grep [OK])
if [ "$start_server" == "" ]; then 
    echo "Restart the server";
    symfony server:stop; 
    symfony server:start -d; 
fi;

# To avoid from permission error
chmod -R 777 /var/www/app/var;
chmod -R 777 /var/www/app/vendor;

echo "Starting Python servers"
python3.7 /var/www/app/pyro/server.py &
python3.7 -m Pyro5.utils.httpgateway -e 'Slideo' &

symfony server:log 