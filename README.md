# Installation

### Get project
```shell script
git clone git@github.com:alperendurmus/hybridcore-symfony.git hybridcore-symfony
```

## 1. Development with Docker

### Build & start the container
```shell script
cd hybridcore-symfony
docker-compose up -d --build
```

### a. Setup the symfony
```shell script
docker exec -ti hybridcore-symfony_php_1 composer install
docker exec -ti hybridcore-symfony_php_1 php bin/console doctrine:database:create --if-not-exists
docker exec -ti hybridcore-symfony_php_1 php bin/console doctrine:migrations:migrate -n 
```

### b. Setup the CKeditor
```shell script
docker exec -ti hybridcore-symfony_php_1 php bin/console ckeditor:install
docker exec -ti hybridcore-symfony_php_1 php bin/console ckfinder:download
docker exec -ti hybridcore-symfony_php_1 php bin/console assets:install
```

### Connection with the local database:
```shell script
DATABASE_URL=mysql://user:pass@host.docker.internal/hybridcore?serverVersion=5.7
```

[Login Page](http://localhost:3200/login)

## 2. Local development

### a. Setup the symfony
```shell script
cd hybridcore-symfony
comsoper install
php bin/console doctrine:database:create --if-not-exists
php bin/console doctrine:migrations:migrate -n 
```

### b. Setup the CKeditor
```shell script
php bin/console ckeditor:install
php bin/console ckfinder:download
php bin/console assets:install
```

### c. Start the server
```shell script
symfony serve
```

### Connection with the local database:
```shell script
DATABASE_URL=mysql://user:pass@localhost/hybridcore?serverVersion=5.7
```

[Login Page](http://localhost:8000/login)