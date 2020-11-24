<?php

namespace App\Service\Payment;

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

class PaypalService
{
    private $em;
    private $client;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
        $this->client = new PayPalHttpClient(
            new SandboxEnvironment(
                $_ENV["PAYPAL_CLIENT_ID"],
                $_ENV["PAYPAL_CLIENT_SECRET"]
            )
        );
    }

    private function createProduct(string $name, string $description): ?string
    {
        $createProductRequest = new HttpRequest("/v1/catalogs/products", "POST");
        $createProductRequest->headers = [
            "Content-Type" => "application/json"
        ];
        $createProductRequest->body = [
            "name" => $name,
            "description" => $description,
            "type" => "DIGITAL",
            "category" => "CONSULTING_SERVICES",
            "home_url" => "https://hyrai.com"
        ];
        /** @var Object $response */
        $response = $this->client->execute($createProductRequest);
        if ($response->statusCode == 201) {
            return $response->result->id;
        }
        return null;
    }

    private function createPlan(array $planDetails): ?array
    {
        $productId = $this->createProduct($planDetails['name'], $planDetails['description']);
        $createPlanRequest = new HttpRequest("/v1/billing/plans", "POST");
        $createPlanRequest->headers = [
            "Content-Type" => "application/json"
        ];

        $createPlanRequest->body = [
            "product_id" => $productId,
            "name" => $planDetails['name'],
            "description" => $planDetails['description'],
            "status" => "ACTIVE",
            "billing_cycles" => [
                [
                    "frequency" => [
                        "interval_unit" => $planDetails['billingIntervalUnit'],
                        "interval_count" => 1
                    ],
                    "sequence" => 1,
                    "tenure_type" => "REGULAR",
                    "total_cycles" => 0,
                    "pricing_scheme" => [
                        "fixed_price" => [
                            "value" => $planDetails['price'],
                            "currency_code" => "USD"
                        ]
                    ]
                ]
            ],
            "payment_preferences" => [
                "auto_bill_outstanding" => true,
                "payment_failure_threshold" => 1
            ]
        ];
        if ($planDetails['freeTrialDays'] != 0) {
            $createPlanRequest->body["billing_cycles"][0]["sequence"] = 2;
            array_push(
                $createPlanRequest->body["billing_cycles"],
                [
                    "frequency" => [
                        "interval_unit" => "DAY",
                        "interval_count" => $planDetails['freeTrialDays']
                    ],
                    "sequence" => 1,
                    "tenure_type" => "TRIAL",
                    "total_cycles" => 1,
                    "pricing_scheme" => [
                        "fixed_price" => [
                            "value" => "0",
                            "currency_code" => "USD"
                        ]
                    ]
                ]
            );
        }

        /** @var Object $response */
        $response = $this->client->execute($createPlanRequest);
        if ($response->statusCode == 201) {
            return [
                'planId' => $response->result->id,
                'productId' => $productId
            ];
        }
        return null;
    }

    private function createSubscriptionPlan(array $planDetails): SubscriptionPlan
    {
        $paypalPlanDetails = $this->createPlan($planDetails);
        $planDetails = array_merge($planDetails, $paypalPlanDetails);

        $subscriptionPlan = new SubscriptionPlan;
        $subscriptionPlan->setUniqueName($planDetails['uniqueName']);
        $subscriptionPlan->setFreeTrialDays($planDetails['freeTrialDays']);
        $subscriptionPlan->setName($planDetails['name']);
        $subscriptionPlan->setDescription($planDetails['description']);
        $subscriptionPlan->setBillingIntervalUnit($planDetails['billingIntervalUnit']);
        $subscriptionPlan->setPrice($planDetails['price']);
        $subscriptionPlan->setPlanId($planDetails['planId']);
        $subscriptionPlan->setProductId($planDetails['productId']);

        $this->em->persist($subscriptionPlan);
        $this->em->flush();

        return $subscriptionPlan;
    }

    private function updateSubscriptionPlan(array $planDetails): SubscriptionPlan
    {
        $paypalPlanDetails = $this->createPlan($planDetails);
        $planDetails = array_merge($planDetails, $paypalPlanDetails);

        /**  @var SubscriptionPlanRepository $subscriptionPlanRepository */
        $subscriptionPlanRepository = $this->em->getRepository(SubscriptionPlan::class);
        $subscriptionPlan = $subscriptionPlanRepository->findOneBy(["uniqueName" => $planDetails['uniqueName']]);

        $subscriptionPlan->setFreeTrialDays($planDetails['freeTrialDays']);
        $subscriptionPlan->setName($planDetails['name']);
        $subscriptionPlan->setDescription($planDetails['description']);
        $subscriptionPlan->setBillingIntervalUnit($planDetails['billingIntervalUnit']);
        $subscriptionPlan->setPrice($planDetails['price']);
        $subscriptionPlan->setPlanId($planDetails['planId']);
        $subscriptionPlan->setProductId($planDetails['productId']);

        $this->em->persist($subscriptionPlan);
        $this->em->flush();

        return $subscriptionPlan;
    }

    private function checkSubscriptionPlanChange(SubscriptionPlan $subscriptionPlan, array $planDetails): bool
    {
        if (
            $subscriptionPlan->getFreeTrialDays() != $planDetails['freeTrialDays'] ||
            $subscriptionPlan->getName() != $planDetails['name'] ||
            $subscriptionPlan->getDescription() != $planDetails['description'] ||
            $subscriptionPlan->getBillingIntervalUnit() != $planDetails['billingIntervalUnit'] ||
            $subscriptionPlan->getPrice() != $planDetails['price']
        ) {
            return true;
        }
        return false;
    }

    private function getSubscriptionPlan($uniqueName): ?SubscriptionPlan
    {
        if (CandidateSubscriptionsEnum::isValid($uniqueName))
            $planDetails = CandidateSubscriptionsEnum::PLANS[$uniqueName];
        else if (CompanySubscriptionsEnum::isValid($uniqueName))
            $planDetails = CompanySubscriptionsEnum::PLANS[$uniqueName];
        else return null;

        /**  @var SubscriptionPlanRepository $subscriptionPlanRepository */
        $subscriptionPlanRepository = $this->em->getRepository(SubscriptionPlan::class);

        $subscriptionPlan = $subscriptionPlanRepository->findOneBy(["uniqueName" => $planDetails['uniqueName']]);
        if (!$subscriptionPlan) {
            return $this->createSubscriptionPlan($planDetails);
        } else if ($this->checkSubscriptionPlanChange($subscriptionPlan, $planDetails)) {
            return $this->updateSubscriptionPlan($planDetails);
        } else return $subscriptionPlan;
    }

    public function showPlanDetails(string $planId): ?object
    {
        $getPlanDetailsRequest = new HttpRequest("/v1/billing/plans/$planId", "GET");
        $getPlanDetailsRequest->headers = [
            "Content-Type" => "application/json"
        ];
        /** @var Object $response */
        $response = $this->client->execute($getPlanDetailsRequest);
        if ($response->statusCode == 200) {
            return $response->result;
        }
        return null;
    }

    public function startSubscription(string $uniqueName)
    {
        $subscriptionPlan = $this->getSubscriptionPlan($uniqueName);
        if (!$subscriptionPlan) return ['success' => false, 'descr' => 'No subcription plan found'];

        $startSubscriptionRequest = new HttpRequest("/v1/billing/subscriptions", "POST");
        $startSubscriptionRequest->headers = [
            "Content-Type" => "application/json"
        ];
        $startSubscriptionRequest->body = [
            "plan_id" => $subscriptionPlan->getPlanId(),
            "quantity" => "1",
            "application_context" => [
                "brand_name" => "Hyrai",
                "shipping_preference" => "NO_SHIPPING",
                "cancel_url" => $_ENV['PAYPAL_CANCEL_URL'],
                "return_url" => $_ENV['PAYPAL_RETURN_URL']
            ]
        ];
        /** @var Object $response */
        $response = $this->client->execute($startSubscriptionRequest);

        // Create the subscription
        $subscription = new Subscription;
        $subscription->setSubscriptionId($response->result->id);
        $subscription->setUniqueName($uniqueName);
        $this->em->persist($subscription);
        $this->em->flush();

        foreach ($response->result->links as $link)
            if ($link->rel == "approve")
                return ['success' => true, 'approve' => $link->href];

        return ['success' => false, 'descr' => 'Something went wrong'];
    }

    public function captureSubscription(User $user, string $subscriptionId)
    {
        $subscriptionDetails = new HttpRequest("/v1/billing/subscriptions/$subscriptionId", "GET");
        $subscriptionDetails->headers = [
            "Content-Type" => "application/json"
        ];

        /** @var Object $response */
        $response = $this->client->execute($subscriptionDetails);

        if ($response->statusCode == 200) {
            if ($response->result->status == "ACTIVE") {
                $startedAt = $response->result->start_time;
                $renewedAt = $response->result->billing_info->last_payment->time;

                /**  @var SubscriptionRepository $subscriptionRepository */
                $subscriptionRepository = $this->em->getRepository(Subscription::class);

                $subscription = $subscriptionRepository->findOneBy(["subscriptionId" => $subscriptionId]);
                if ($subscription) {
                    $user->setSubscription($subscription);
                    $subscription->setIsActive(true);
                    $subscription->setStartedAt(new DateTime($startedAt));
                    $subscription->setRenewedAt(new DateTime($renewedAt));
                    $this->em->persist($subscription);
                    $this->em->persist($user);
                    $this->em->flush();
                }
            }
        }
    }

    public function cancelSubscription(User $user)
    {
        $subscription = $user->getSubscription();
        if ($subscription) {
            $subscriptionId = $subscription->getSubscriptionId();
            $cancelSubscriptionRequest = new HttpRequest("/v1/billing/subscriptions/$subscriptionId/cancel", "POST");
            $cancelSubscriptionRequest->headers = [
                "Content-Type" => "application/json"
            ];
            $cancelSubscriptionRequest->body = [
                "reason" => "Per request"
            ];
            /** @var Object $response */
            $response = $this->client->execute($cancelSubscriptionRequest);
            if ($response->statusCode == 204) {
                $user->removeSubscription();
                $this->em->persist($user);
                $this->em->persist($subscription);
                $this->em->flush();
                return ['success' => true, 'descr' => 'Subscription canceled successfuly'];
            }
        }

        return ['success' => false, 'descr' => 'Nothing to cancel'];
    }

    private function startCheckout(array $planDetails): array
    {
        $request = new OrdersCreateRequest();
        $request->prefer('return=representation');
        $request->body = [
            "intent" => "CAPTURE",
            "purchase_units" => [[
                "amount" => [
                    "value" => $planDetails['price'],
                    "currency_code" => "USD"
                ],
                "description" => $planDetails['description'],
                "items" => []
            ]],
            "application_context" => [
                "brand_name" => "Hyrai",
                "landing_page" => "BILLING",
                "user_action" => "PAY_NOW",
                "shipping_preference" => "NO_SHIPPING",
                "cancel_url" => $_ENV['PAYPAL_CANCEL_URL'],
                "return_url" => $_ENV['PAYPAL_RETURN_URL']
            ]
        ];
        /** @var object $response */
        $response = $this->client->execute($request);
        $r = [];
        foreach ($response->result->links as $link)
            if ($link->rel == "approve")
                $r['approvementUrl'] = $link->href;
        $r['productId'] = $response->result->id;
        return $r;
    }

    public function checkout(string $uniqueName): array
    {
        if (CandidateProductsEnum::isValid($uniqueName)) {
            $planDetails = CandidateProductsEnum::PRODUCTS[$uniqueName];
            $r = $this->startCheckout($planDetails);
            $approvementUrl = $r['approvementUrl'];
            $productId = $r['productId'];
            $product = new Product();
            $product->setProductId($productId);
            $this->em->persist($product);
            $this->em->flush();
            return [
                'success' => true,
                'approve' => $approvementUrl
            ];
        }
        return [
            'success' => false,
            'descr' => "Product not found"
        ];
    }

    public function captureCheckout(User $user, string $productId): array
    {
        if (CandidateProductsEnum::isValid($uniqueName)) {
            $planDetails = CandidateProductsEnum::PRODUCTS[$uniqueName];
            $r = $this->startCheckout($planDetails);
            $approvementUrl = $r['approvementUrl'];
            $productId = $r['productId'];
            $product = new Product();
            $product->setProductId($productId);
            $this->em->persist($product);
            $this->em->flush();
            return [
                'success' => true,
                'approve' => $approvementUrl
            ];
        }
        return [
            'success' => false,
            'descr' => "Product not found"
        ];
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

    public function webhook(array $data)
    {
        $this->saveWebhook($data);

        // Disable the subscription
        if (in_array($data['event_type'], [
            "BILLING.SUBSCRIPTION.EXPIRED",
            "BILLING.SUBSCRIPTION.CANCELLED",
            "BILLING.SUBSCRIPTION.SUSPENDED"
        ])) {
            $subscriptionId = $data['resource']['id'];
            /** @var SubscriptionRepository $subscriptionRepository */
            $subscriptionRepository = $this->em->getRepository(Subscription::class);
            $subscription = $subscriptionRepository->findOneBy(["subscriptionId" => $subscriptionId]);

            if ($subscription) {
                $user = $subscription->getOwner();
                $user->removeSubscription();
                $subscription->setIsActive(false);
                $this->em->persist($subscription);
                $this->em->persist($user);
                $this->em->flush();
            }
        }

        // Enable the subscription
        if (in_array($data['event_type'], [
            "BILLING.SUBSCRIPTION.ACTIVATED",
            "BILLING.SUBSCRIPTION.RE-ACTIVATED",
            "BILLING.SUBSCRIPTION.RENEWED"
        ])) {
            $subscriptionId = $data['resource']['id'];
            /** @var SubscriptionRepository $subscriptionRepository */
            $subscriptionRepository = $this->em->getRepository(Subscription::class);
            $subscription = $subscriptionRepository->findOneBy(["subscriptionId" => $subscriptionId]);
            $user = $subscription->getOwner();
            $this->captureSubscription($user, $subscriptionId);
        }
    }
}
