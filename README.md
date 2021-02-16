# Installation

### 1. Get project
```
git clone https://github.com/alperendurmus/slideo-symfony.git slideo-symfony
cd slideo-symfony
```

### 2. Build the image
```
docker-compose build
```

### 3. Start the container
```
docker-compose -f docker-compose.dev.yml up
```
### 4. Setup the database
```
docker exec -ti slideo_symfony php bin/console doctrine:database:create --if-not-exists
docker exec -ti slideo_symfony php bin/console doctrine:migrations:migrate -n
```

[Login Page](https://localhost:5500/login)
### Others:
#### Disable the PHP cache on development:
`php.ini`
```
opcache.enable=0
```
Do not commit `php.ini` file.
#### Openning a new terminal inside the docker container:
```
docker exec -ti slideo_symfony bash
```
#### Restarting the server
Open a new terminal inside the docker container and run this:
```
bash docker/restart.sh
```

#### DATABASE_URL in `.env.local` file:
```
DATABASE_URL=mysql://user:pass@host.docker.internal/slideo?serverVersion=8.0
```
