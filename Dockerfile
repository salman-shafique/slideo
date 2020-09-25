FROM  php:7.4-fpm

# apt
RUN apt-get update && \
    apt-get upgrade -y

# Utils
RUN apt install -y git nodejs npm nano
RUN npm install -g yarn

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- \
    --install-dir=/usr/local/bin \
    --filename=composer

# Install the symfony
RUN apt-get install wget
RUN wget https://get.symfony.com/cli/installer -O - | bash
RUN mv /root/.symfony/bin/symfony /usr/local/bin/symfony

# PHP extensions
ADD https://raw.githubusercontent.com/mlocati/docker-php-extension-installer/master/install-php-extensions /usr/local/bin/
RUN chmod uga+x /usr/local/bin/install-php-extensions && sync
RUN install-php-extensions pdo_mysql zip intl opcache

# Certificate verify - CA file - cURL
COPY ./docker/cacert.pem /usr/local/etc/php/cacert.pem

# Update
RUN apt-get update
RUN apt autoremove

WORKDIR /var/www/app