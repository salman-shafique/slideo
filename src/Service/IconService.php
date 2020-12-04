<?php

namespace App\Service;

use App\Entity\Presentation;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

class IconService
{
    private $em;
    private $flaskService;

    public function __construct(EntityManagerInterface $em, FlaskService $flaskService)
    {
        $this->em = $em;
        $this->flaskService = $flaskService;
    }

    public function find(Presentation $presentation, Request $request)
    {
        $slide = null;
        foreach ($presentation->getSlides() as $slide_) {
            if ($slide_->getSlideId() == $request->request->get("slideId")) {
                $slide = $slide_;
                break;
            }
        }
        if ($slide) {
            $icons = $this->flaskService->call("Icon", "find_icons", ['keyword' => $request->request->get("keyword")]);

            foreach ($slide->getShapes() as $shape)
                if (isset($shape->getData()['shape_id']))
                    if ($shape->getData()['shape_id'] == $request->request->get("shapeId")) {
                        $data = $shape->getData();
                        $data['icon'] = $icons[0];
                        $shape->setData($data);
                        $this->em->persist($shape);
                        break;
                    }

            $this->em->persist($slide);
            $this->em->flush();
            return array_merge(
                [
                    'success' => true,
                    'icons' => $icons,
                ],
                $request->request->all()
            );
        }
        return ['success' => false];
    }

    public function changeColor(Request $request)
    {
        $request = $request->request->all();

        $arr = explode("/", $request['url']);
        $latestKey = array_key_last($arr);
        $iconName = $arr[$latestKey];

        $rgb = $request['rgb'];
        $colorName = "(" . $rgb[0] . "," . $rgb[1] . "," . $rgb[2] . ")";

        // Check if the icon exists
        if (file_exists("/var/www/app/public/icons/$iconName/$colorName/$iconName")) {
            $request['url'] = "/icons/$iconName/$colorName/$iconName";
            return $request;
        }

        // Download the black icon
        if (!file_exists("/var/www/app/public/icons/$iconName/(0,0,0)/$iconName")) {
            mkdir("/var/www/app/public/icons/$iconName/(0,0,0)", 0777, true);
            $iconFromApi = file_get_contents($request['url']);
            file_put_contents("/var/www/app/public/icons/$iconName/(0,0,0)/$iconName", $iconFromApi);
        }
        // Create the colored con folder
        if (!file_exists("/var/www/app/public/icons/$iconName/$colorName/"))
            mkdir("/var/www/app/public/icons/$iconName/$colorName/", 0777, true);

        $request['url'] = "/icons/$iconName/(0,0,0)/$iconName";
        $coloredIconBinary = $this->flaskService->call("Icon", "change_color", $request);

        $coloredIconBinary['icon_str'];

        $request['url'] = $this->flaskService->saveBase64File($coloredIconBinary['icon_str'],"/var/www/app/public/icons/$iconName/$colorName/$iconName");

        return $request;
    }
}
