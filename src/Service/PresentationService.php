<?php

namespace App\Service;

use App\Entity\ColorTemplate;
use App\Entity\Content;
use App\Entity\Slide;
use App\Entity\Presentation;
use App\Entity\User;
use App\Security\PresentationSecurity;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

class PresentationService
{
    private $em;


    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function create(?User $user, string $sessionId): Presentation
    {
        $presentation = new Presentation();
        $presentation->setOwner($user);
        $presentation->setSessionId($sessionId);
        $presentation->setPresentationId(hash("md4", time(), false));
        $this->em->persist($presentation);
        $this->em->flush();
        return $presentation;
    }
}
