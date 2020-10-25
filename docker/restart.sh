#!/bin/bash
cd /var/www/app

symfony server:stop;
php bin/console cache:clear;
symfony server:start -d;
chmod -R 777 var/*
php bin/console cache:warmup;

echo "Done";