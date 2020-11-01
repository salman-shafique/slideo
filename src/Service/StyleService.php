<?php

namespace App\Service;

use App\Entity\Content;
use App\Entity\Style;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

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
        if (!is_dir("styles/$styleId"))
            mkdir("styles/$styleId", 777, true);

        file_put_contents("styles/$styleId/$styleId.pptx", $request->request->get('pptxFile'));
        file_put_contents("styles/$styleId/$styleId.svg", $request->request->get('svgFile'));
        file_put_contents("styles/$styleId/$styleId.png", $request->request->get('prevFile'));

        if ($request->request->get("images")) {
            if (!is_dir("styles/$styleId/images"))
                mkdir("styles/$styleId/images", 777, true);
            foreach ($request->request->get("images") as $key => $image)
                file_put_contents("styles/$styleId/images/" . $image['name'], $image['blob']);
        }

        $style = new Style;
        $style->setKeywords($request->request->get('keywords'));
        $style->setPptxFile("/styles/$styleId/$styleId.pptx");
        $style->setSvgFile("/styles/$styleId/$styleId.svg");
        $style->setCapacity((int)$request->request->get('capacity'));
        $style->setDirection($request->request->get('direction'));
        $style->setPrevFile("/styles/$styleId/$styleId.png");
        $style->setDesignId((int)$request->request->get('designId'));
        $style->setLayout($request->request->get('layout'));;;

        $this->em->persist($style);
        $this->em->flush();

        return ["success" => true, "id" => $style->getId()];
    }


    public static function serialize(Style $style): array
    {
        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        
        $serializer = new Serializer($normalizers, $encoders);
        return $serializer->normalize($style);

    }
}
