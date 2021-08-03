# Installation

### 1. Get project
```
git clone https://github.com/Slide-ai/slideo-symfony.git
cd slideo-symfony
```

### 2. Build the image
```
docker-compose -f docker-compose.dev.yml build
```

### 3. Create the `.env.local` file to the main index

<details>
    <summary>.env.local</summary>
    
    APP_NAME=slide.ai
    APP_DOMAIN=https://localhost:5500
    APP_ENV=dev
    APP_SECRET=c253db41596c420e7c7f032abd63fb58
    DATABASE_URL=mysql://slideo_mysql_user:slideo_mysql_password@slideo_mysql:3306/slideo?serverVersion=8.0

    MAILER_DSN=smtp://no-reply@slideo.co.il:sw21qazxS%21123@mail.slideo.co.il:465

    # Auth with google
    OAUTH_GOOGLE_CLIENT_ID=287627035531-hhvi1m9olqc468d5p2hrvnbvm63e2bht.apps.googleusercontent.com
    OAUTH_GOOGLE_CLIENT_SECRET=j0J9oLC7RGlMxgsnJpff692Y

    # Auth with Facebook
    OAUTH_FACEBOOK_ID=1519709544881058
    OAUTH_FACEBOOK_SECRET=b48004678277927c3fc4ba3bd1c2f204

    # Paypal sandbox
    PAYPAL_CLIENT_ID=Aa9GJlXuW2y2K_o8AzRLr7gVp_93TpuezheYrISZPDQZR-4j6vqFCs4D4Qp8mP1V0-1UidZnFAaAyclm
    PAYPAL_CLIENT_SECRET=EC7APu2nPEPGtxfZp13KitCmMH1GD55XYwdSB5OESbHeil__xpOgOB7IAjy5IUFPlH648R7H5WdRtzu7
    PAYPAL_RETURN_URL=https://test.slideo.co.il/api/payment/checkout/capture
    PAYPAL_CANCEL_URL=https://test.slideo.co.il/api/payment/checkout/cancel

    # Rabbit MQ
    MESSENGER_TRANSPORT_DSN=amqp://slideo:df711f9a1119082a711a238acf944677@slideo_rabbitmq:5672/%2f/messages/


    CHOKIDAR_USEPOLLING=true
    # Support Email
    SUPPORT_EMAIL=support@slide.ai
</details>

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
