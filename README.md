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

[Login Page](https://localhost:5500/login)
[Flask](http://localhost:5501)
[Rabbit MQ](http://localhost:5502)
[Database management](http://localhost:5503)
```
slideo_mysql_user
slideo_mysql_password
```
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
DATABASE_URL=mysql://slideo_mysql_user:slideo_mysql_password@slideo_mysql:3306/slideo?serverVersion=8.0
```
