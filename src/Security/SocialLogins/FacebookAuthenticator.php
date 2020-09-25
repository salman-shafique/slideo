<?php

namespace App\Security\SocialLogins;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use KnpU\OAuth2ClientBundle\Security\Authenticator\SocialAuthenticator;
use KnpU\OAuth2ClientBundle\Client\Provider\FacebookClient;
use KnpU\OAuth2ClientBundle\Client\ClientRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\User\UserProviderInterface;

class FacebookAuthenticator extends SocialAuthenticator
{
    private $clientRegistry;
    private $em;
    private $router;

    public function __construct(ClientRegistry $clientRegistry, EntityManagerInterface $em, RouterInterface $router)
    {
        $this->clientRegistry = $clientRegistry;
        $this->em = $em;
        $this->router = $router;
    }

    public function supports(Request $request)
    {
        return $request->attributes->get('_route') === 'connect_facebook_check';
    }

    public function getCredentials(Request $request)
    {
        return $this->fetchAccessToken($this->getFacebookClient());
    }

    public function getUser($credentials, UserProviderInterface $userProvider)
    {
        /** @var FacebookUser $facebookUser */
        $facebookUser = $this->getFacebookClient()
            ->fetchUserFromToken($credentials);

        // Check if the user provided the email
        if ($facebookUser->getEmail() == null) 
            return null;

        $existingFacebookUser = $this->em->getRepository(User::class)
            ->findOneBy(['email' =>  $facebookUser->getEmail(), 'facebookId' => $facebookUser->getId()]);

        if ($existingFacebookUser) {
            return $existingFacebookUser;
        } else {
            $qb = $this->em->createQueryBuilder();
            $anyRelatedUser = $qb->select("u")
                ->from("App\Entity\User", "u")
                ->where('u.email = :email')
                ->setParameter('email', $facebookUser->getEmail())
                ->orWhere('u.facebookId = :facebookId')
                ->setParameter('facebookId', $facebookUser->getId())
                ->getQuery()
                ->getResult();
            if (!$anyRelatedUser) {
                $user = new User();
                $user->setPassword(md5(time()));
                $user->setEmail($facebookUser->getEmail());
                $user->setFullname($facebookUser->getFirstName() . " " . $facebookUser->getLastName());
                $user->setIsVerified(true);
                $user->setFacebookId($facebookUser->getId());
                $user->setPicture($facebookUser->getPictureUrl());
                $user->addRole("ROLE_USER");

                $this->em->persist($user);
                $this->em->flush();
                return $user;
            } else return null;
        };
    }

    /**
     * @return FacebookClient
     */
    private function getFacebookClient()
    {
        return $this->clientRegistry->getClient('facebook_main');
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, $providerKey)
    {
        $targetUrl = $this->router->generate('index');
        return new RedirectResponse($targetUrl);
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        return null;
    }

    public function start(Request $request, AuthenticationException $authException = null)
    {
        return new RedirectResponse(
            '/connect/',
            Response::HTTP_TEMPORARY_REDIRECT
        );
    }
}
