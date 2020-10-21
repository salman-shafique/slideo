<?php

namespace App\Service;

use App\Entity\ColorTemplate;
use App\Entity\Content;
use App\Entity\Slide;
use App\Entity\Presentation;
use App\Entity\User;
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

    public function addColorTemplate(Presentation $presentation, Request $request): array
    {
        $colorTemplate = new ColorTemplate();
        $colorTemplate->setACCENT1($request->request->get('ACCENT1'));
        $colorTemplate->setACCENT2($request->request->get('ACCENT2'));
        $colorTemplate->setACCENT3($request->request->get('ACCENT3'));
        $colorTemplate->setACCENT4($request->request->get('ACCENT4'));
        $colorTemplate->setACCENT5($request->request->get('ACCENT5'));
        $colorTemplate->setACCENT6($request->request->get('ACCENT6'));
        $colorTemplate->setBACKGROUND1($request->request->get('BACKGROUND1'));
        $colorTemplate->setBACKGROUND2($request->request->get('BACKGROUND2'));
        $colorTemplate->setTEXT1($request->request->get('TEXT1'));
        $colorTemplate->setTEXT2($request->request->get('TEXT2'));
        $colorTemplate->setTitle($request->request->get('title'));

        $presentation->addColorTemplate($colorTemplate);
        $this->em->persist($presentation);
        $this->em->persist($colorTemplate);
        $this->em->flush();
        return [
            'success' => true,
        ];
    }
}
