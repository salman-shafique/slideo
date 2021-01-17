<?php

namespace App\Security\SocialLogins;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use KnpU\OAuth2ClientBundle\Security\Authenticator\SocialAuthenticator;
use KnpU\OAuth2ClientBundle\Client\Provider\GoogleClient;
use KnpU\OAuth2ClientBundle\Client\ClientRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use App\Repository\UserRepository;
use Exception;

class GoogleAuthenticator extends SocialAuthenticator
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
        return $request->attributes->get('_route') === 'connect_google_check';
    }

    public function getCredentials(Request $request)
    {
        return $this->fetchAccessToken($this->getGoogleClient());
    }

    public function getUser($credentials, UserProviderInterface $userProvider)
    {
        /** @var GoogleUser $googleUser*/
        $googleUser = $this->getGoogleClient()
            ->fetchUserFromToken($credentials);

        $existingGoogleUser = $this->em->getRepository(User::class)
            ->findOneBy(['email' =>  $googleUser->getEmail(), 'googleId' => $googleUser->getId()]);

        if ($existingGoogleUser) {
            return $existingGoogleUser;
        } else {
            $qb = $this->em->createQueryBuilder();
            $anyRelatedUser = $qb->select("u")
                ->from("App\Entity\User", "u")
                ->where('u.email = :email')
                ->setParameter('email', $googleUser->getEmail())
                ->orWhere('u.googleId = :googleId')
                ->setParameter('googleId', $googleUser->getId())
                ->getQuery()
                ->getResult();
            if (!$anyRelatedUser) {
                $user = new User();
                $user->setPassword(md5(time()));
                $user->setEmail($googleUser->getEmail());
                $user->setFullname($googleUser->getFirstName() . " " . $googleUser->getLastName());
                $user->setIsVerified(true);
                $user->setGoogleId($googleUser->getId());
                $user->setPicture($googleUser->getAvatar());

                $this->em->persist($user);
                $this->em->flush();
                return $user;
            } else return null;
        };
    }

    /**
     * @return GoogleClient
     */
    private function getGoogleClient()
    {
        return $this->clientRegistry->getClient('google');
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, $providerKey)
    {
        return new RedirectResponse("/account");
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
