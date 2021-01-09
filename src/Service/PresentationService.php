<?php

namespace App\Service;

use App\Entity\ColorTemplate;
use App\Entity\Content;
use App\Entity\DownloadPresentation;
use App\Entity\Slide;
use App\Entity\Presentation;
use App\Entity\Style;
use App\Entity\User;
use App\Repository\ContentRepository;
use App\Repository\ColorTemplateRepository;
use App\Repository\SlideRepository;
use App\Repository\StyleRepository;
use App\Service\FlaskService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

class PresentationService
{
    private $em;
    private $serializer;
    private $flaskService;


    public function __construct(EntityManagerInterface $em, SerializerService $serializer, FlaskService $flaskService)
    {
        $this->em = $em;
        $this->serializer = $serializer;
        $this->flaskService = $flaskService;
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
    private function updateColorTemplate($colorTemplateJson, ColorTemplate $colorTemplate)
    {
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

        /**  @var SlideRepository $slideRepository */
        $slideRepository = $this->em->getRepository(Slide::class);
        $slide = $slideRepository->findOneBy(["id" => $slideJson['id']]);

        // Color template
        $colorTemplate = $slide->getColorTemplate();
        $this->updateColorTemplate($slideJson['colorTemplate'], $colorTemplate);

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
                $newShape->setData($shapeData);
                $slide->addShape($newShape);

                array_push($newShapes, $this->serializer->normalize($newShape));
                $this->em->persist($newShape);
            }
        } else {
            // Shapes
            foreach ($slideJson['shapes'] as $shape) {
                $newShape = $this->updateContent($shape);
                if (!isset($shape['id'])) {
                    $slide->addShape($newShape);
                    $this->em->persist($newShape);
                }

                array_push($newShapes, $this->serializer->normalize($newShape));
            }
        }

        $this->em->persist($slide);
        $this->em->flush();

        return ["success" => true, "newShapes" => $newShapes, "slideId" => $slideJson['slideId']];
    }

    public function downloadStart(Presentation $presentation)
    {
        $dowloadPresentation = new DownloadPresentation;
        $presentation->addDownloadedPresenatation($dowloadPresentation);
        $dowloadPresentation->setNumberOfSlides(count($presentation->getSlides()));
        $this->em->persist($dowloadPresentation);
        $this->em->persist($presentation);
        $this->em->flush();

        // invoke the flask server
        $this->flaskService->call("Presentation", "start_downloads", []);
        return ['success' => true];
    }

    public function getDownloadedPresentation(Presentation $presentation)
    {
        return $this->em
            ->createQueryBuilder()
            ->select('d')
            ->from('App\Entity\DownloadPresentation', 'd')
            ->where("d.presentation = :presentation")
            ->setParameter("presentation", $presentation)
            ->getQuery()
            ->getResult(\Doctrine\ORM\Query::HYDRATE_ARRAY);
    }

    public function getOneDownloadedPresentation(string $downloadPresentationId)
    {
        return $this->em
            ->createQueryBuilder()
            ->select('d')
            ->from('App\Entity\DownloadPresentation', 'd')
            ->where("d.id = :downloadPresentationId")
            ->setParameter("downloadPresentationId", $downloadPresentationId)
            ->getQuery()
            ->getOneOrNullResult(\Doctrine\ORM\Query::HYDRATE_ARRAY);
    }

    private function saveBase64File(string $filepath, string $base64)
    {
        $content = base64_decode($base64);
        $file = fopen($filepath, "wb");
        fwrite($file, $content);
        fclose($file);
    }

    public function saveFromFlask(Request $request)
    {
        if (!$request->request->get("A2A3EF62A0498A46531B71DBD6969004")) return ["success" => false];
        if ($request->request->get("A2A3EF62A0498A46531B71DBD6969004") != "D363D75DD3E229BD8BBE2759E93FDE11") return ["success" => false];

        $path = $request->request->get('path');
        $jsonFile = json_decode(file_get_contents("http://slideo_flask$path"), true);

        $now = time();
        $uniquefolder = hash('md2', $now);
        if (!is_dir("presentations/$uniquefolder"))
            mkdir("presentations/$uniquefolder", 0777, true);

        $currentDownloadId = $jsonFile['current_download_id'];

        $this->saveBase64File("presentations/$uniquefolder/$now.pptx", $jsonFile['pptx']);
        $this->saveBase64File("presentations/$uniquefolder/$now.png", $jsonFile['png']);
        $this->saveBase64File("presentations/$uniquefolder/$now.pdf", $jsonFile['pdf']);

        /** @var DownloadPresentation $downloadPresentation */
        $downloadPresentation = $this->em
            ->createQueryBuilder()
            ->select('d')
            ->from('App\Entity\DownloadPresentation', 'd')
            ->where("d.id = :id")
            ->setParameter("id", $currentDownloadId)
            ->getQuery()
            ->getOneOrNullResult();

        $downloadPresentation->setPptxFile("/presentations/$uniquefolder/$now.pptx");
        $downloadPresentation->setPdfFile("/presentations/$uniquefolder/$now.pdf");
        $downloadPresentation->setPrevFile("/presentations/$uniquefolder/$now.png");
        $downloadPresentation->setCompleted(true);

        $this->em->persist($downloadPresentation);
        $this->em->flush();

        return ["success" => true];
    }
}
