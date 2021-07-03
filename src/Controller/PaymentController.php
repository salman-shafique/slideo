<?php

namespace App\Controller;

use App\Service\PaymentService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * @Route("/api")
 */
class PaymentController extends AbstractController
{
    /**
     * @Route("/payment/checkout/capture")
     */
    public function checkoutCapture(Request $request, PaymentService $paymentService)
    {

        $token = $request->get("token");
        if ($token) {
            $r = $paymentService->captureCheckout($token);
            if ($r)
                return $this->redirect('/editor/' . $r['presentationId'] . '/download');
        }

        return $this->render('homepage/index.html.twig');
    }

    /**
     * @Route("/payment/checkout/cancel")
     */
    public function checkoutCancel()
    {
        return $this->redirect("/");
    }

    /**
     * @Route("/payment/webhook",methods={"POST"})
     */
    public function webhook(Request $request, PaymentService $paymentService)
    {
        $paymentService->webhook($request);
        return new JsonResponse(['thanks paypal']);
    }
}
