#!/bin/bash
cd /var/www/app

start_server=$(symfony server:start -d | grep [OK])
if [ "$start_server" == "" ]; then 
    echo "Restart the server";
    symfony server:stop; 
    symfony server:start -d; 
fi;

echo "Starting Python servers"
python3.7 /var/www/app/pyro/src/server.py &
python3.7 -m Pyro5.utils.httpgateway -e 'Slideo' &

symfony server:log 