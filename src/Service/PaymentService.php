<?php

namespace App\Service;

use App\Entity\CheckOut;
use App\Entity\Meeting;
use App\Entity\Payout;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Security;
use App\Entity\PaypalWebhook;
use App\Entity\Subscription;
use App\Repository\CheckOutRepository;
use App\Repository\UserRepository;
use DateTime;
use PayPalHttp\HttpRequest;
use PayPalCheckoutSdk\Core\PayPalHttpClient;
use PayPalCheckoutSdk\Core\SandboxEnvironment;
use PayPalCheckoutSdk\Core\ProductionEnvironment;
use Exception;
use PayPalCheckoutSdk\Core\AccessTokenRequest;
use Symfony\Component\HttpFoundation\Request;
use PayPalCheckoutSdk\Orders\OrdersCreateRequest;

class PaymentService
{
    private $em;
    private $security;
    private $client;

    public function __construct(EntityManagerInterface $em, Security $security)
    {
        $this->em = $em;
        $this->security = $security;
        $this->client = (getenv("APP_ENV") == "dev")
            ? $this->client = new PayPalHttpClient(
                new SandboxEnvironment(
                    getenv("PAYPAL_CLIENT_ID"),
                    getenv("PAYPAL_CLIENT_SECRET")
                )
            )
            : $this->client = new PayPalHttpClient(
                new ProductionEnvironment(
                    getenv("PAYPAL_CLIENT_ID"),
                    getenv("PAYPAL_CLIENT_SECRET")
                )
            );
    }


    public function startCheckout(Meeting $meeting): array
    {
        $category = $meeting->getCategory();
        $client = $meeting->getClient();
        $hypnotherapist = $meeting->getHypnotherapist();

        $meetingPrice = $category->getPrice();
        $description = $category->getTitle() . ': '
            . $category->getDescription() . ', '
            . $client->getName() . ' ' . $client->getSurname();

        $request = new OrdersCreateRequest();
        $request->prefer('return=representation');
        $request->body = [
            "intent" => "CAPTURE",
            "purchase_units" => [[
                "amount" => [
                    "value" => $meetingPrice,
                    "currency_code" => "USD"
                ],
                "description" => $description,
                "items" => []
            ]],
            "application_context" => [
                "brand_name" => "Hypnotes",
                "landing_page" => "BILLING",
                "user_action" => "PAY_NOW",
                "shipping_preference" => "NO_SHIPPING",
                "cancel_url" => getenv("PAYPAL_CANCEL_URL"),
                "return_url" => getenv("PAYPAL_RETURN_URL")
            ]
        ];
        /** @var object $response */
        $response = $this->client->execute($request);
        $r = ['success' => true];
        foreach ($response->result->links as $link)
            if ($link->rel == "approve")
                $r['paymentUrl'] = $link->href;
        $r['token'] = $response->result->id;

        $checkOut = new CheckOut;
        $checkOut->setToken($r['token']);
        $checkOut->setDescription($description);
        $checkOut->setAmount((float)$meetingPrice);
        $this->em->persist($checkOut);

        $client->addCheckOut($checkOut);
        $checkOut->addMeeting($meeting);
        $hypnotherapist->addCheckOut($checkOut);

        $this->em->persist($hypnotherapist);
        $this->em->persist($meeting);
        $this->em->persist($checkOut);
        $this->em->persist($client);
        $this->em->flush();

        return $r;
    }

    public function captureCheckout(string $token): ?array
    {
        $captureCheckoutRequest = new HttpRequest("/v2/checkout/orders/$token/capture", "POST");
        $captureCheckoutRequest->headers = [
            "Content-Type" => "application/json"
        ];
        /** @var Object $response */
        $response = $this->client->execute($captureCheckoutRequest);
        if ($response->statusCode == 201) {
            if ($response->result->status == "COMPLETED") {
                /**  @var CheckOutRepository $checkOutRepository */
                $checkOutRepository = $this->em->getRepository(CheckOut::class);
                $checkOut = $checkOutRepository->findOneBy(["token" => $token]);
                if (!$checkOut) return null;

                $checkOut->setIsCompleted(true);
                $payer = json_decode(json_encode($response->result->payer), true);
                $checkOut->setPayer($payer);
                $this->em->persist($checkOut);
                $this->em->flush();
                return ['descr' => 'Check out captured'];
            }
        }
        return null;
    }

    private function saveWebhook(array $data)
    {
        $webhook = new PaypalWebhook();

        if (isset($data["id"]))
            $webhook->setWebhookId($data["id"]);
        if (isset($data["resource_type"]))
            $webhook->setResourceType($data["resource_type"]);
        if (isset($data["event_type"]))
            $webhook->setEventType($data["event_type"]);
        if (isset($data["summary"]))
            $webhook->setSummary($data["summary"]);
        if (isset($data["resource"]))
            $webhook->setResource($data["resource"]);
        if (isset($data["event_version"]))
            $webhook->setEventVersion($data["event_version"]);

        try {
            $webhook->setCreateTime(new DateTime($data["create_time"]));
        } catch (Exception $e) {
            $webhook->setCreateTime(new DateTime());
        }

        $this->em->persist($webhook);
        $this->em->flush();
    }

    public function webhook(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $this->saveWebhook($data);

        if (in_array($data['event_type'], [
            "BILLING.SUBSCRIPTION.EXPIRED",
            "BILLING.SUBSCRIPTION.CANCELLED",
            "BILLING.SUBSCRIPTION.SUSPENDED"
        ])) {
            // Disable the subscription
        }

        // Enable the subscription
        if (in_array($data['event_type'], [
            "BILLING.SUBSCRIPTION.ACTIVATED",
            "BILLING.SUBSCRIPTION.RE-ACTIVATED"
        ])) {
            // Enable the subscription
        }

        if (in_array($data['event_type'], [
            "BILLING.SUBSCRIPTION.RENEWED"
        ])) {
            // Renew the subscription
        }

        if (in_array($data['event_type'], [
            "PAYMENT.PAYOUTS-ITEM.SUCCEEDED",
            "PAYMENT.PAYOUTS-ITEM.CANCELED",
            "PAYMENT.PAYOUTS-ITEM.FAILED",
            "PAYMENT.PAYOUTS-ITEM.BLOCKED",
            "PAYMENT.PAYOUTS-ITEM.RETURNED",
            "PAYMENT.PAYOUTS-ITEM.DENIED",
        ])) {
            // Update Payout Status

        }
    }
}
