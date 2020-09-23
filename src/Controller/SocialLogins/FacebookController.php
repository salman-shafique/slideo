<?php

namespace App\Controller\SocialLogins;

use Exception;
use KnpU\OAuth2ClientBundle\Client\ClientRegistry;
use League\OAuth2\Client\Provider\Exception\IdentityProviderException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class FacebookController extends AbstractController
{
    /**
     * @Route("/connect/facebook", name="connect_facebook_start")
     */
    public function connectAction(ClientRegistry $clientRegistry)
    {
        return $clientRegistry->getClient('facebook_main')
            ->redirect([
                'public_profile', 'email'
            ]);
    }

    /**
     * @Route("/connect/facebook/check", name="connect_facebook_check")
     */
    public function connectCheckAction(Request $request, ClientRegistry $clientRegistry)
    {
        /** @var \KnpU\OAuth2ClientBundle\Client\Provider\FacebookClient $client */
        $client = $clientRegistry->getClient('facebook_main');

        try {
            /** @var \League\OAuth2\Client\Provider\FacebookUser $user */
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
