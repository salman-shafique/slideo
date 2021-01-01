<?php

namespace App\Service;

use App\Entity\ColorTemplate;
use App\Entity\Content;
use App\Entity\Slide;
use App\Entity\Presentation;
use App\Entity\Style;
use App\Entity\User;
use App\Repository\ContentRepository;
use App\Repository\ColorTemplateRepository;
use App\Repository\SlideRepository;
use App\Repository\StyleRepository;
use App\Security\PresentationSecurity;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

class PresentationService
{
    private $em;
    private $serializer;


    public function __construct(EntityManagerInterface $em, SerializerService $serializer)
    {
        $this->em = $em;
        $this->serializer = $serializer;
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

    private function updateContent($contentJson)
    {
        if (!isset($contentJson['id'])) {
            // Create a new content
            $content = new Content;
        } else {
            /**  @var ContentRepository $contentRepository */
            $contentRepository = $this->em->getRepository(Content::class);
            $content = $contentRepository->findOneBy(["id" => $contentJson['id']]);
        }
        if (!isset($contentJson['data'])) $contentJson['data'] = [];

        $content->setData($contentJson['data']);
        $this->em->persist($content);
        $this->em->flush();

        return $content;
    }
    private function updateColorTemplate($colorTemplateJson)
    {
        /**  @var ColorTemplateRepository $colorTemplateRepository */
        $colorTemplateRepository = $this->em->getRepository(ColorTemplate::class);
        $colorTemplate = $colorTemplateRepository->findOneBy(["id" => $colorTemplateJson['id']]);

        if ($colorTemplate) {
            $colorTemplate->setACCENT1($colorTemplateJson['aCCENT1']);
            $colorTemplate->setACCENT2($colorTemplateJson['aCCENT2']);
            $colorTemplate->setACCENT3($colorTemplateJson['aCCENT3']);
            $colorTemplate->setACCENT4($colorTemplateJson['aCCENT4']);
            $colorTemplate->setACCENT5($colorTemplateJson['aCCENT5']);
            $colorTemplate->setACCENT6($colorTemplateJson['aCCENT6']);
            $colorTemplate->setBACKGROUND1($colorTemplateJson['bACKGROUND1']);
            $colorTemplate->setBACKGROUND2($colorTemplateJson['bACKGROUND2']);
            $colorTemplate->setTEXT1($colorTemplateJson['tEXT1']);
            $colorTemplate->setTEXT2($colorTemplateJson['tEXT2']);
        }
        $this->em->persist($colorTemplate);
        $this->em->flush();
    }

    public function saveSlide(Request $request)
    {
        $slideJson = $request->request->get("slide");

        $this->updateContent($slideJson['slideTitle']);
        $this->updateContent($slideJson['slideTitleImage']);
        $this->updateContent($slideJson['subTitle']);

        // Analyzed content
        foreach ($slideJson['analyzedContent'] as $analyzedContent) {
            $this->updateContent($analyzedContent['h1']);
            $this->updateContent($analyzedContent['h1Image']);
            $this->updateContent($analyzedContent['icon']);
            $this->updateContent($analyzedContent['originalSentence']);
        }

        // Color template
        $this->updateColorTemplate($slideJson['colorTemplate']);

        /**  @var SlideRepository $slideRepository */
        $slideRepository = $this->em->getRepository(Slide::class);
        $slide = $slideRepository->findOneBy(["id" => $slideJson['id']]);

        $newShapes = [];
        if ($slideJson['style']['id'] != $slide->getStyle()->getId()) {
            // Style
            /** @var StyleRepository $styleRepository */
            $styleRepository = $this->em->getRepository(Style::class);
            $style = $styleRepository->findOneBy(["id" => $slideJson['style']['id']]);
            $slide->setStyle($style);

            // Rm all shapes
            foreach ($slide->getShapes() as $shape)
                $slide->removeShape($shape);

            // Shapes
            foreach ($slideJson['shapes'] as $shape) {
                $newShape = new Content();
                $shapeData = $shape['data'];
                $shapeData['active'] = true;
                $newShape->setData($shapeData);
                $slide->addShape($newShape);

                array_push($newShapes, $this->serializer->normalize($newShape));
                $this->em->persist($newShape);
            }

            $this->em->persist($slide);
            $this->em->flush();
        } else {
            // Shapes
            foreach ($slideJson['shapes'] as $shape) {
                $newShape = $this->updateContent($shape);
                array_push($newShapes, $this->serializer->normalize($newShape));

                if (!isset($shape['id']))
                    $slide->addShape($newShape);
            }
        }

        return ["newShapes" => $newShapes, "slideId" => $slideJson['slideId']];
    }
}
