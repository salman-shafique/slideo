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

            $whiteIcon = $icons[0];
            $iconName = $this->getIconName($whiteIcon['url']);
            // Check if the icon exists
            if (file_exists("/var/www/app/public/icons/$iconName")) {
                $whiteIcon['url'] = "/icons/$iconName";
                $whiteIcon['rgb'] = "255 255 255";
            } else {
                // Download the black icon
                if (!file_exists("/var/www/app/public/icons/$iconName")) {
                    $iconFromApi = file_get_contents($whiteIcon['url']);
                    file_put_contents("/var/www/app/public/icons/black-$iconName", $iconFromApi);
                }
                $changeColorRequest = [];
                $changeColorRequest['url'] = "/icons/black-$iconName";
                $changeColorRequest['rgb'] = ["255", "255", "255"];
                $coloredIconBinary = $this->flaskService->call("Icon", "change_color", $changeColorRequest);

                $whiteIcon['url'] = $this->flaskService->saveBase64File($coloredIconBinary['icon_str'], "/var/www/app/public/icons/$iconName");
                $whiteIcon['rgb'] = "255 255 255";

                // Rm black icon
                exec("rm /var/www/app/public/icons/black-$iconName");
            }

            $icons[0] = $whiteIcon;
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

    private function getIconName(string $iconPath)
    {
        $arr = explode("/", $iconPath);
        $latestKey = array_key_last($arr);
        return $arr[$latestKey];
    }

    public function changeColor(Request $request) // To white
    {
        $request = $request->request->all();

        $iconName = $this->getIconName($request['url']);

        // Check if the icon exists
        if (file_exists("/var/www/app/public/icons/$iconName")) {
            $request['url'] = "/icons/$iconName";
            return $request;
        }

        // Download the black icon
        if (!file_exists("/var/www/app/public/icons/$iconName")) {
            $iconFromApi = file_get_contents($request['url']);
            file_put_contents("/var/www/app/public/icons/black-$iconName", $iconFromApi);
        }

        $request['url'] = "/icons/black-$iconName";
        $request['rgb'] = ["255", "255", "255"];
        $coloredIconBinary = $this->flaskService->call("Icon", "change_color", $request);

        $request['url'] = $this->flaskService->saveBase64File($coloredIconBinary['icon_str'], "/var/www/app/public/icons/$iconName");

        // Rm black icon
        exec("rm /var/www/app/public/icons/black-$iconName");

        return $request;
    }
}
