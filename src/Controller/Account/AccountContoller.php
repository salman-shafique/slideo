<?php

namespace App\Controller\Account;

use App\Service\AccountService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

/**
 * @Route("/account")
 */
class AccountContoller extends AbstractController
{
    /**
     * @Route("/", name="user_account")
     */
    public function index()
    {
        return $this->render('account/index.html.twig');
    }

}
