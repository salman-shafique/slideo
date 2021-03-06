<?php

namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;
use App\Entity\PaypalWebhook;
use App\Entity\Product;
use App\Entity\Subscription;
use App\Entity\SubscriptionPlan;
use App\Entity\User;
use App\Repository\SubscriptionRepository;
use DateTime;
use PayPalHttp\HttpRequest;
use PayPalCheckoutSdk\Core\PayPalHttpClient;
use PayPalCheckoutSdk\Core\SandboxEnvironment;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use PayPalCheckoutSdk\Orders\OrdersCreateRequest;

class FlaskService
{
    private $client;

    public function __construct(HttpClientInterface $client)
    {
        $this->client = $client;
    }

    public function getClient()
    {
        return $this->client;
    }
    public function call(String $className, String $methodName, array $data): ?array
    {
        $response = $this->client->request(
            'POST',
            "http://slideo_flask/call/$className/$methodName",
            [
                'json' =>  $data,
                'timeout' => 3600
            ]
        );
        return $response->toArray();
    }

    public function saveBase64File(string $base64, string $filepath)
    {
        $content = base64_decode($base64);
        $file = fopen($filepath, "wb");
        fwrite($file, $content);
        fclose($file);
        $publicPath = explode("/public", $filepath)[1];
        return $publicPath;
    }
}
