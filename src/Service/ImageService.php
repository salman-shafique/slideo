<?php

namespace App\Service;

use App\Entity\AnalyzedContent;
use App\Entity\Content;
use App\Entity\Presentation;
use App\Entity\Slide;
use App\Entity\Style;
use App\Repository\StyleRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Service\ContentService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class ImageService
{
    private $em;
    private $flaskService;

    public function __construct(EntityManagerInterface $em, FlaskService $flaskService)
    {
        $this->em = $em;
        $this->flaskService = $flaskService;
    }

    public function h1Image(Presentation $presentation, Request $request)
    {

        $slide = null;
        foreach ($presentation->getSlides() as $slide_) {
            if ($slide_->getSlideId() == $request->request->get("slideId")) {
                $slide = $slide_;
                break;
            }
        }
        if ($slide) {
            $images = $this->flaskService->call("Pexels", "find_images", ['keyword' => $request->request->get("keyword")]);

            return array_merge(
                [
                    'success' => true,
                    'images' => $images,
                ],
                $request->request->all()
            );
        }
        return ['success' => false];
    }
}
