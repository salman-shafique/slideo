<?php

namespace App\Security;

use App\Entity\User;
use App\Repository\PresentationRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class PresentationSecurity
{
    private $presentationRepository;

    public function __construct(PresentationRepository $presentationRepository)
    {
        $this->presentationRepository = $presentationRepository;
    }

    public function getPresentation(?string $HTTP_REFERER, string $sessionId, ?User $user)
    {
        $arr = explode("/", $HTTP_REFERER);
        $latestKey = array_key_last($arr);
        $presentationId = $arr[$latestKey];
        $presentation = $this->presentationRepository->findOneBy(['presentationId' => $presentationId, 'isActive' => True]);

        if ($presentation) {
            // Check if there is an user
            if ($user) {
                if ($presentation->getOwner() == $user) {
                    return $presentation;
                }
                // Elad and alperen
                if (in_array($user->getEmail(), ["alperenberatdurmus@gmail.com", "elad.darmon@gmail.com"])) {
                    return $presentation;
                }
            } else {
                if ($sessionId == $presentation->getSessionId()) {
                    return $presentation;
                }
            }
        }

        return false;
    }
}
