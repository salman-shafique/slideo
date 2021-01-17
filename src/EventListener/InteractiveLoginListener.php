<?php

namespace App\EventListener;

use App\Repository\PresentationRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use App\Entity\Presentation;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;
use App\Service\JWTService;
use Symfony\Component\Security\Core\Event\AuthenticationSuccessEvent;

class InteractiveLoginListener
{
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function onLogin(InteractiveLoginEvent $event)
    {
        /** @var Request $request */
        $request = $event->getRequest();
        $cookies = $request->cookies->all();

        /**
         * @var User $user
         */
        $user = $event->getAuthenticationToken()->getUser();

        // Save the presentations
        if (isset($cookies['presentations'])) {
            $jwt = $cookies['presentations'];
            $presentationsInCookies = JWTService::decode($jwt);
            if ($presentationsInCookies)
                if (count($presentationsInCookies) > 0) {

                    $query = $this->em->createQueryBuilder()
                        ->select('p')
                        ->from("App\Entity\Presentation", "p")
                        ->where('p.owner IS NULL');
                    $sql = "";
                    foreach ($presentationsInCookies as $key => $presentationsId) {
                        $sql .= " p.presentationId LIKE :key_$key OR";
                        $query->setParameter("key_$key", $presentationsId);
                    }
                    $sql = substr($sql, 0, -2);
                    $query->andWhere($sql);
                    $presentations = $query->getQuery()->getResult();
                    foreach ($presentations as $presentation) {
                        $user->addPresentation($presentation);
                        $this->em->persist($presentation);
                    }
                    $this->em->persist($user);
                    $this->em->flush();
                }
        }
    }
}
