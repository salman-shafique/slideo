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
#### a. Production
```
docker-compose up -d
```
#### b. Development
```
docker-compose -f docker-compose.dev.yml up -d
```

### 4. Setup the project
```
docker exec -ti slideo_symfony composer install
docker exec -ti slideo_symfony yarn install
docker exec -ti slideo_symfony yarn encore production
docker exec -ti slideo_symfony php bin/console doctrine:database:create --if-not-exists
docker exec -ti slideo_symfony php bin/console doctrine:migrations:migrate -n 
docker exec -ti slideo_symfony php bin/console doctrine:fixtures:load --append
```

### DATABASE_URL in .env file:
```
DATABASE_URL=mysql://user:pass@host.docker.internal/slideo?serverVersion=5.7
```

[Login Page](https://localhost:5500/login)
