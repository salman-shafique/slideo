FROM  php:7.4-fpm

# apt
RUN apt-get update && \
    apt-get upgrade -y

# Utils
RUN apt install -y git nodejs npm nano procps net-tools
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
ADD https://raw.githubusercontent.com/mlocati/docker-php-extension-installer/master/install-php-extensions /usr/local/bin/
RUN chmod uga+x /usr/local/bin/install-php-extensions && sync
RUN install-php-extensions pdo_mysql zip intl opcache

# Certificate verify - CA file - cURL
COPY ./docker/cacert.pem /usr/local/etc/php/cacert.pem

# Python environment - This can be another container before
RUN apt-get update
RUN apt-get install python3.7 -y
RUN apt-get install python3-pip -y
COPY Flask/requirements.txt ./
RUN pip3 install --no-cache-dir -r requirements.txt
# Server
RUN export FLASK_APP=server.py
RUN python3.7 -m pip install -U spacy
RUN python3.7 -m spacy download en_core_web_sm

# Update
RUN apt-get update -y
RUN apt-get autoremove -y

WORKDIR /var/www/app