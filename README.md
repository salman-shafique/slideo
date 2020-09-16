# Installation

### Get project
```shell script
git clone https://github.com/alperendurmus/slideo-symfony.git slideo-symfony
```

## 1. Development with Docker

### a. Add ipv4 as host.docker.internal


```shell script
hostname -I | awk '{print $1}' # ipv4
# to
/etc/hosts
```
### b. Build & start the container
```shell script
cd slideo-symfony
docker-compose up -d --build
```

### c. Setup the symfony
```shell script
docker exec -ti slideo_symfony composer install
docker exec -ti slideo_symfony php bin/console doctrine:database:create --if-not-exists
docker exec -ti slideo_symfony php bin/console doctrine:migrations:migrate -n 
docker exec -ti slideo_symfony php bin/console doctrine:fixtures:load -q
```

### d. Connection with the local database:
```shell script
DATABASE_URL=mysql://user:pass@host.docker.internal/slideo?serverVersion=5.7
```

[Login Page](http://localhost:8000/login)

## 2. Local development

### a. Setup the symfony
```shell script
cd slideo-symfony
comsoper install
php bin/console doctrine:database:create --if-not-exists
php bin/console doctrine:migrations:migrate -n 
php bin/console doctrine:fixtures:load -q
```

### b. Start the server
```shell script
symfony serve
```

### c. Connection with the local database:
```shell script
DATABASE_URL=mysql://user:pass@localhost/slideo?serverVersion=5.7
```

[Login Page](http://localhost:8000/login)