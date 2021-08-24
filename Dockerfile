FROM  php:7.4-fpm

# apt
RUN apt-get update && \
    apt-get upgrade -y

# Utils
RUN apt install -y git nodejs npm nano procps net-tools unzip cron
RUN npm install -g yarn
RUN apt install supervisor
# Start cron
RUN service cron start

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
# Copy Supervisor Conf
COPY ./docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf


# Update
RUN apt-get update -y
RUN apt-get autoremove -y
CMD ["/usr/bin/supervisord"]

WORKDIR /var/www/app