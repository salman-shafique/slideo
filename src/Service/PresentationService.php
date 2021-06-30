<?php

namespace App\Service;

use App\Entity\Checkout;
use App\Entity\ColorTemplate;
use App\Entity\Content;
use App\Entity\DownloadPresentation;
use App\Entity\Slide;
use App\Entity\Presentation;
use App\Entity\Style;
use App\Entity\User;
use App\Enum\PricingEnum;
use App\Repository\ContentRepository;
use App\Repository\ColorTemplateRepository;
use App\Repository\SlideRepository;
use App\Repository\StyleRepository;
use App\Service\PaymentService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Messenger\MessageBusInterface;

class PresentationService
{
    private $em;
    private $serializer;
    private $paymentService;
    private $bus;


    public function __construct(EntityManagerInterface $em, MessageBusInterface $bus, SerializerService $serializer, PaymentService $paymentService)
    {
        $this->em = $em;
        $this->bus = $bus;
        $this->serializer = $serializer;
        $this->paymentService = $paymentService;
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
        isset($colorTemplateJson['ACCENT_1'])
            ? $colorTemplate->setACCENT1($colorTemplateJson['ACCENT_1'])
            : $colorTemplate->setACCENT1($colorTemplateJson['aCCENT1']);
        isset($colorTemplateJson['ACCENT_2'])
            ? $colorTemplate->setACCENT2($colorTemplateJson['ACCENT_2'])
            : $colorTemplate->setACCENT2($colorTemplateJson['aCCENT2']);
        isset($colorTemplateJson['ACCENT_3'])
            ? $colorTemplate->setACCENT3($colorTemplateJson['ACCENT_3'])
            : $colorTemplate->setACCENT3($colorTemplateJson['aCCENT3']);
        isset($colorTemplateJson['ACCENT_4'])
            ? $colorTemplate->setACCENT4($colorTemplateJson['ACCENT_4'])
            : $colorTemplate->setACCENT4($colorTemplateJson['aCCENT4']);
        isset($colorTemplateJson['ACCENT_5'])
            ? $colorTemplate->setACCENT5($colorTemplateJson['ACCENT_5'])
            : $colorTemplate->setACCENT5($colorTemplateJson['aCCENT5']);
        isset($colorTemplateJson['ACCENT_6'])
            ? $colorTemplate->setACCENT6($colorTemplateJson['ACCENT_6'])
            : $colorTemplate->setACCENT6($colorTemplateJson['aCCENT6']);
        isset($colorTemplateJson['BACKGROUND_1'])
            ? $colorTemplate->setBACKGROUND1($colorTemplateJson['BACKGROUND_1'])
            : $colorTemplate->setBACKGROUND1($colorTemplateJson['bACKGROUND1']);
        isset($colorTemplateJson['BACKGROUND_2'])
            ? $colorTemplate->setBACKGROUND2($colorTemplateJson['BACKGROUND_2'])
            : $colorTemplate->setBACKGROUND2($colorTemplateJson['bACKGROUND2']);
        isset($colorTemplateJson['TEXT_1'])
            ? $colorTemplate->setTEXT1($colorTemplateJson['TEXT_1'])
            : $colorTemplate->setTEXT1($colorTemplateJson['tEXT1']);
        isset($colorTemplateJson['TEXT_2'])
            ? $colorTemplate->setTEXT2($colorTemplateJson['TEXT_2'])
            : $colorTemplate->setTEXT2($colorTemplateJson['tEXT2']);
        isset($colorTemplateJson['title'])
            ? $colorTemplate->setTitle($colorTemplateJson['title'])
            : $colorTemplate->setTitle("DEFAULT");

        $this->em->persist($colorTemplate);
        $this->em->flush();
    }


    public function saveSlide(Request $request)
    {
        $slideBase64 = $request->request->get("slide");
        $slideJson = json_decode(base64_decode($slideBase64), true);
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
        // Background
        $background = $slide->getBackground();
        $background->setData($slideJson['background']['data']);
        $this->em->persist($background);

        if ($slideJson['style']['id'] != $slide->getStyle()->getId()) {
            // The style is changed on the frontend
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
            }
        }

        $this->em->persist($slide);
        $this->em->flush();

        $newShapes = [];
        foreach ($slide->getShapes() as $shape) {
            $normalized = $this->serializer->normalize($shape);
            unset($normalized['slide']);
            unset($normalized['style']);
            array_push($newShapes, $normalized);
        }

        return ["success" => true, "newShapes" => $newShapes, "slideId" => $slideJson['slideId']];
    }

    public function saveSettings(Request $request, Presentation $presentation)
    {
        if ($request->request->get('settings'))
            $presentation->setSettings($request->request->get('settings'));
        if ($request->request->get('history'))
            $presentation->setHistory($request->request->get('history'));
        if ($request->request->get('slidesOrder'))
            $presentation->setSlidesOrder($request->request->get('slidesOrder'));
        $this->em->persist($presentation);
        $this->em->flush();
        return ['success' => true];
    }

    public function saveBrandLogo(Request $request, Presentation $presentation)
    {
        $logo = $request->files->get('logo');

        /** @var UploadedFile $logo */
        $mimeType = explode("/", $logo->getMimeType())[0];
        if ($mimeType != "image")
            return ['success' => false, 'descr' => 'Only images allowed'];

        if ($logo->getSize() > 2000000)
            return ['success' => false, 'descr' => 'Files must be 2MB at most.'];

        $unique1 = hash('md2', uniqid());
        $newFilename = "$unique1." . $logo->getClientOriginalExtension();

        $unique2 = hash('md2', uniqid());
        $logo->move(
            "uploads/logo/$unique2",
            $newFilename
        );

        list($width, $height) = getimagesize("uploads/logo/$unique2/$newFilename");

        $url = "/uploads/logo/$unique2/$newFilename";

        $settings = $presentation->getSettings();
        $settings['logo'] = [
            'isActive' => true,
            'image' => [
                'url' => $url,
                'width' => $width,
                'height' => $height
            ]
        ];

        $presentation->setSettings($settings);
        $this->em->persist($presentation);
        $this->em->flush();
        return ['success' => true, 'logo' => $settings['logo']];
    }

    public function downloadStart(Presentation $presentation, bool $isPaid = false)
    {
        if (!$isPaid) {
            $dowloadPresentation = new DownloadPresentation;
            $presentation->addDownloadedPresenatation($dowloadPresentation);
            $dowloadPresentation->setNumberOfSlides(count($presentation->getSlides()));
            $this->em->persist($dowloadPresentation);
            $this->em->persist($presentation);
            $this->em->flush();

            $this->bus->dispatch($dowloadPresentation);
            return [
                'paymentRequired' => false
            ];
        }

        /**
         * @var Checkout $checkout
         */
        $checkout = $this->paymentService->getCheckoutUrl($presentation);

        if ($checkout->getIsCompleted()) {
            // Paid before
            /**
             * @var DownloadPresentation $dowloadPresentation
             */
            $dowloadPresentation = (new DownloadPresentation)
                ->setNumberOfSlides(count($presentation->getSlides()))
                ->setIsPaid(true);
            $presentation->addDownloadedPresenatation($dowloadPresentation);

            $this->em->persist($dowloadPresentation);
            $this->em->persist($presentation);
            $this->em->flush();

            $this->bus->dispatch($dowloadPresentation);
            return [
                'paymentRequired' => false
            ];
        }


        return [
            'paymentRequired' => true,
            'paymentUrl' => $checkout->getPaymentUrl()
        ];
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
        $uniquefolder = hash('sha256', $now);
        if (!is_dir("presentations/$uniquefolder"))
            mkdir("presentations/$uniquefolder", 0777, true);

        $currentDownloadId = $jsonFile['current_download_id'];

        $name = $jsonFile['name'];
        $unique1 = hash('md2', uniqid());
        $unique2 = hash('md2', uniqid());
        $unique3 = hash('md2', uniqid());
        $this->saveBase64File("presentations/$uniquefolder/$name-$unique1.pptx", $jsonFile['pptx']);
        $this->saveBase64File("presentations/$uniquefolder/$name-$unique2.png", $jsonFile['png']);
        $this->saveBase64File("presentations/$uniquefolder/$name-$unique3.pdf", $jsonFile['pdf']);

        /** @var DownloadPresentation $downloadPresentation */
        $downloadPresentation = $this->em
            ->createQueryBuilder()
            ->select('d')
            ->from('App\Entity\DownloadPresentation', 'd')
            ->where("d.id = :id")
            ->setParameter("id", $currentDownloadId)
            ->getQuery()
            ->getOneOrNullResult();

        $downloadPresentation->setPptxFile("/presentations/$uniquefolder/$name-$unique1.pptx");
        $downloadPresentation->setPrevFile("/presentations/$uniquefolder/$name-$unique2.png");
        $downloadPresentation->setPdfFile("/presentations/$uniquefolder/$name-$unique3.pdf");
        $downloadPresentation->setCompleted(true);

        $this->em->persist($downloadPresentation);
        $this->em->flush();

        return ["success" => true];
    }
}
