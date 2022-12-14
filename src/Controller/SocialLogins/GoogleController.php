<?php

namespace App\Controller\SocialLogins;

use Exception;
use KnpU\OAuth2ClientBundle\Client\ClientRegistry;
use League\OAuth2\Client\Provider\GoogleUser;
use League\OAuth2\Client\Provider\Exception\IdentityProviderException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class GoogleController extends AbstractController
{

    /**
     * @Route("/connect/google", name="connect_google_start")
     */
    public function connectAction(ClientRegistry $clientRegistry)
    {
        return $clientRegistry
            ->getClient('google')
            ->redirect([
                'profile', 'email'
            ]);
    }

    /**
     * @Route("/connect/google/check", name="connect_google_check")
     */
    public function connectCheckAction(Request $request, ClientRegistry $clientRegistry)
    {
        $client = $clientRegistry->getClient('google');
        try {
            /** @var \League\OAuth2\Client\Provider\GoogleUser $user */
            $client->fetchUser();
            return $this->redirectToRoute("index");
        } catch (Exception $e) {
            if ($e->getMessage() == "invalid_grant")
                $this->addFlash("error", "The email belongs to another account. Error: " . $e->getMessage());
            else
                $this->addFlash("error", "Oops... " . $e->getMessage());
            return $this->redirectToRoute("index");
        }
    }
}
