# Installation

### 1. Get project
```
git clone https://github.com/alperendurmus/slideo-symfony.git slideo-symfony
cd slideo-symfony
```

### 2. Build the image
```
docker-compose -f docker-compose.dev.yml build
```

### 3. Paste `.env.local` file to folder
[Symfony-.env.local.zip](https://github.com/alperendurmus/slideo-symfony/files/6514539/Symfony-.env.local.zip)


### 4. Start the container
```
docker-compose -f docker-compose.dev.yml up --remove-orphans
```

[Landing Page - https://localhost:5500](https://localhost:5500)

[Rabbit MQ - http://localhost:5502](http://localhost:5502)

[PhpMyAdmin - http://localhost:5503](http://localhost:5503)
```
root
slideo_mysql_password
```

### 5. Follow up the Flask side intructions

[Installation](https://github.com/alperendurmus/slideo-flask/blob/main/README.md)

### 6. Install designs

[Layout and design installation](https://github.com/alperendurmus/slideo-symfony/wiki/Layout-and-design-installation)

### Others:
#### Disable the PHP cache on development:
`php.ini`
```
opcache.enable=0
```
Do not commit `php.ini` file.

#### Restarting the server
```
docker exec -ti slideo_symfony bash docker/restart.sh
```
