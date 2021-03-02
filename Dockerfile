FROM  php:7.4-fpm

# apt
RUN apt-get update && \
    apt-get upgrade -y

# Utils
RUN apt install -y git nodejs npm nano procps net-tools unzip
RUN npm install -g yarn

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- \
    --install-dir=/usr/local/bin \
    --filename=composer

# Install the symfony
RUN apt-get install wget
RUN wget https://get.symfony.com/cli/installer -O - | bash
RUN mv /root/.symfony/bin/symfony /usr/local/bin/symfony
# Symfony server ca
RUN symfony server:ca:install

# PHP extensions
ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN chmod uga+x /usr/local/bin/install-php-extensions && sync
RUN install-php-extensions pdo_mysql zip intl opcache amqp

# Certificate verify - CA file - cURL
COPY ./docker/cacert.pem /usr/local/etc/php/cacert.pem

# Cron
COPY ./docker/cron.daily /etc/cron.daily/cron.daily

# Update
RUN apt-get update -y
RUN apt-get autoremove -y

WORKDIR /var/www/app