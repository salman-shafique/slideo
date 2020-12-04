#!/bin/bash
cd /var/www/app

start_server=$(symfony server:start -d | grep [OK])
if [ "$start_server" == "" ]; then 
    echo "Restart the server";
    symfony server:stop; 
    symfony server:start -d; 
fi;

symfony server:log 