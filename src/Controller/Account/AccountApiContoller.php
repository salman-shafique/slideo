<?php

namespace App\Controller\Account;

use App\Service\AccountService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

/**
 * @Route("/api/account", methods={"POST"})
 */
class AccountApiContoller extends AbstractController
{
    /**
     * @Route("/change/email")
     */
    public function changeEmail(Request $request, AccountService $accountService)
    {
        $r = $accountService->changeEmail($request, $this->getUser());
        return new JsonResponse($r);
    }

    /**
     * @Route("/change/fullname")
     */
    public function changeFullname(Request $request, AccountService $accountService)
    {
        $r = $accountService->changeFullname($request, $this->getUser());
        return new JsonResponse($r);
    }

    /**
     * @Route("/change/avatar")
     */
    public function changeAvatar(Request $request, AccountService $accountService)
    {
        $r = $accountService->changeAvatar($request, $this->getUser());
        return new JsonResponse($r);
    }
    
    /**
     * @Route("/notifications/browserNotifications")
     */
    public function browserNotifications(AccountService $accountService, Request $request)
    {
        $r = $accountService->browserNotifications($this->getUser(), $request->request->get("browserNotifications"));
        return new JsonResponse($r);
    }

    /**
     * @Route("/notifications/productUpdates")
     */
    public function productUpdates(AccountService $accountService, Request $request)
    {
        $r = $accountService->productUpdates($this->getUser(), $request->request->get("productUpdates"));
        return new JsonResponse($r);
    }
}
