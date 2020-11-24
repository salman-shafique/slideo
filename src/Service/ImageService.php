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
        $serializer = new SerializerService();
        $slide = null;
        foreach ($presentation->getSlides() as $slide_) {
            if ($slide_->getSlideId() == $request->request->get("slideId")) {
                $slide = $slide_;
                break;
            }
        }
        if ($slide) {
            $images = $this->flaskService->call("Pexels", "find_images", ['keyword' => $request->request->get("keyword")]);

            $serializedShape = null;
            foreach ($slide->getShapes() as $shape)
                if (isset($shape->getData()['shape_id']))
                    if ($shape->getData()['shape_id'] == $request->request->get("shapeId")) {
                        $data =  $shape->getData();
                        $data['image'] = $images[0];
                        $data['images'] = $images;
                        $data['keyword'] = $request->request->get("keyword");
                        $shape->setData($data);
                        $this->em->persist($shape);
                        $serializedShape = $serializer->normalize($shape);
                        break;
                    }

            $this->em->persist($slide);
            $this->em->flush();
            return array_merge(
                [
                    'success' => true,
                    'serializedShape' => $serializedShape,
                ],
                $request->request->all()
            );
        }
        return ['success' => false];
    }
}
