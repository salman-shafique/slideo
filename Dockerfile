FROM  php:7.2-fpm

# Yarn repo
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt remove cmdtest
# apt
RUN apt-get update && \
    apt-get upgrade -y

# Git Yarn
RUN apt install -y git yarn

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

WORKDIR /var/www/app