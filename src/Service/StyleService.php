<?php

namespace App\Service;

use App\Entity\Content;
use App\Entity\Style;
use App\Repository\StyleRepository;
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

    public function saveBase64File(string $filepath, string $base64)
    {
        $content = base64_decode($base64);
        $file = fopen($filepath, "wb");
        fwrite($file, $content);
        fclose($file);
    }

    public function add(Request $request)
    {
        if (!$request->request->get("A2A3EF62A0498A46531B71DBD6969004")) return ["success" => false];
        if ($request->request->get("A2A3EF62A0498A46531B71DBD6969004") != "D363D75DD3E229BD8BBE2759E93FDE11") return ["success" => false];

        $path = $request->request->get("path");
        $jsonFile = json_decode(file_get_contents("http://slideo_flask$path"), true);

        $capacity = (int)$jsonFile['capacity'];
        $direction = $jsonFile['direction'];
        $designId = $jsonFile['designId'];

        $style = new Style;

        $styleId = $jsonFile["style_id"];
        if (!is_dir("styles/$styleId"))
            mkdir("styles/$styleId", 0777, true);

        $this->saveBase64File("styles/$styleId/$styleId.pptx", $jsonFile['pptxFile']);
        $this->saveBase64File("styles/$styleId/$styleId.svg", $jsonFile['svgFile']);
        $this->saveBase64File("styles/$styleId/$styleId.png", $jsonFile['prevFile']);

        if (isset($jsonFile["images"]) && !empty($jsonFile["images"])) {
            if (!is_dir("styles/$styleId/images"))
                mkdir("styles/$styleId/images", 0777, true);
            foreach ($jsonFile["images"] as $image)
                $this->saveBase64File("styles/$styleId/images/" . $image['name'], $image['blob']);
        }

        foreach ($jsonFile["objects"] as $object) {
            $shape = new Content();
            $shapeData = [];
            foreach ($object as $key => $value)
                $shapeData[$key] = $value;
            $shape->setData($shapeData);
            $style->addShape($shape);
            $this->em->persist($shape);
        }

        $style->setKeywords($jsonFile['keywords']);
        $style->setPptxFile("/styles/$styleId/$styleId.pptx");
        $style->setSvgFile("/styles/$styleId/$styleId.svg");
        $style->setCapacity($capacity);
        $style->setDirection($direction);
        $style->setPrevFile("/styles/$styleId/$styleId.png");
        $style->setDesignId($designId);
        $style->setLayout($jsonFile['layout']);

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
