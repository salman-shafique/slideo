<?php

namespace App\Service;

use App\Entity\Content;
use App\Entity\Style;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;

class StyleService
{
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }


    public function add(Request $request)
    {
        if (!$request->request->get("A2A3EF62A0498A46531B71DBD6969004")) return ["success" => false];
        if ($request->request->get("A2A3EF62A0498A46531B71DBD6969004") != "D363D75DD3E229BD8BBE2759E93FDE11") return ["success" => false];

        $styleId = $request->request->get("style_id");
        file_put_contents("styles/$styleId.pptx", $request->request->get('pptxFile'));
        file_put_contents("styles/$styleId.svg", $request->request->get('svgFile'));
        file_put_contents("styles/$styleId.png", $request->request->get('prevFile'));

        $style = new Style;
        $style->setKeywords($request->request->get('keywords'));
        $style->setPptxFile("/styles/$styleId.pptx");
        $style->setSvgFile("/styles/$styleId.svg");
        $style->setCapacity((int)$request->request->get('capacity'));
        $style->setDirection($request->request->get('direction'));
        $style->setPrevFile("/styles/$styleId.png");
        $style->setDesignId((int)$request->request->get('designId'));
        $style->setLayout($request->request->get('layout'));;;

        $this->em->persist($style);
        $this->em->flush();

        return ["success" => true, "id" => $style->getId()];
    }
}
