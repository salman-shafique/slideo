<?php

namespace App\Service;

use App\Entity\Presentation;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

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
            $images = $this->flaskService->call("Pexels", "find_images", ['keyword' => $request->request->get("keyword"),"per_page"=>1]);

            $image = null;
            foreach ($slide->getShapes() as $shape)
                if (isset($shape->getData()['shape_id']))
                    if ($shape->getData()['shape_id'] == $request->request->get("shapeId")) {
                        $data =  $shape->getData();
                        $image = $data['image'] = $images[0];
                        $shape->setData($data);
                        $this->em->persist($shape);
                        break;
                    }

            $this->em->persist($slide);
            $this->em->flush();
            return array_merge(
                [
                    'success' => true,
                    'image' => $image,
                ],
                $request->request->all()
            );
        }
        return ['success' => false];
    }
}
