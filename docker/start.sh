#!/bin/bash
cd /var/www/app

start_server=$(symfony server:start -d | grep [OK])
if [ "$start_server" == "" ]; then 
    echo "Restart the server";
    symfony server:stop; 
    symfony server:start -d; 
fi;

echo "Starting Python servers..."
cd /var/www/app/Flask;
gunicorn --bind 0.0.0.0:8080 --timeout 120 --workers 4 app:app & ;
echo "Starting Python servers... Completed"

symfony server:log 