# Installation

### Get project
```shell script
git clone https://github.com/alperendurmus/slideo-symfony.git slideo-symfony
```

### a. Build & start the container
```shell script
cd slideo-symfony
docker-compose up -d --build
```

### b. Setup the symfony
```shell script
docker exec -ti slideo_symfony composer install
docker exec -ti slideo_symfony yarn install
docker exec -ti slideo_symfony yarn run encore dev
docker exec -ti slideo_symfony php bin/console doctrine:database:create --if-not-exists
docker exec -ti slideo_symfony php bin/console doctrine:migrations:migrate -n 
docker exec -ti slideo_symfony php bin/console doctrine:fixtures:load -q
```

### c. Connection with the local database:
```shell script
DATABASE_URL=mysql://user:pass@host.docker.internal/slideo?serverVersion=5.7
```

[Login Page](https://localhost:5500/login)
