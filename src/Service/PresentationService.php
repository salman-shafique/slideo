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

    public function addColorTemplate(User $user, Request $request): array
    {
        $colorTemplate = new ColorTemplate();
        $colorTemplate->setACCENT1($request->request->get('ACCENT_1'));
        $colorTemplate->setACCENT2($request->request->get('ACCENT_2'));
        $colorTemplate->setACCENT3($request->request->get('ACCENT_3'));
        $colorTemplate->setACCENT4($request->request->get('ACCENT_4'));
        $colorTemplate->setACCENT5($request->request->get('ACCENT_5'));
        $colorTemplate->setACCENT6($request->request->get('ACCENT_6'));
        $colorTemplate->setBACKGROUND1($request->request->get('BACKGROUND_1'));
        $colorTemplate->setBACKGROUND2($request->request->get('BACKGROUND_2'));
        $colorTemplate->setTEXT1($request->request->get('TEXT_1'));
        $colorTemplate->setTEXT2($request->request->get('TEXT_2'));
        $colorTemplate->setTitle($request->request->get('title'));
        $colorTemplate->setDescription($request->request->get('description'));

        $user->addColorTemplate($colorTemplate);
        $this->em->persist($user);
        $this->em->persist($colorTemplate);
        $this->em->flush();

        $serializer = new SerializerService();
        return [
            'colorTemplate' => $serializer->normalize($colorTemplate),
            'success' => true,
        ];
    }
}
