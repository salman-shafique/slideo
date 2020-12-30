<?php

namespace App\Service;

use App\Entity\ColorTemplate;
use App\Entity\Content;
use App\Entity\Layout;
use App\Entity\Style;
use App\Repository\LayoutRepository;
use App\Repository\StyleRepository;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;

class StyleService
{
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    private function saveBase64File(string $filepath, string $base64)
    {
        $content = base64_decode($base64);
        $file = fopen($filepath, "wb");
        fwrite($file, $content);
        fclose($file);
    }

    public function add(Request $request)
    {
        if ($request->request->get("A2A3EF62A0498A46531B71DBD6969004") != "D363D75DD3E229BD8BBE2759E93FDE11") return ["descr" => "Not authorized"];

        $path = $request->request->get("path");
        $jsonFile = json_decode(file_get_contents("http://slideo_flask$path"), true);

        $capacity = (int)$jsonFile['capacity'];
        $direction = $jsonFile['direction'];

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

        /**  @var LayoutRepository $layoutRepository */
        $layoutRepository = $this->em->getRepository(Layout::class);
        $layout = $layoutRepository->findOneBy(['id' => $request->request->get('layout_id')]);
        $style->setLayout($layout);

        $colorTemplateData = $jsonFile["color_template"];

        $colorTemplate = new ColorTemplate();
        $colorTemplate->setACCENT1($colorTemplateData['ACCENT_1']);
        $colorTemplate->setACCENT2($colorTemplateData['ACCENT_2']);
        $colorTemplate->setACCENT3($colorTemplateData['ACCENT_3']);
        $colorTemplate->setACCENT4($colorTemplateData['ACCENT_4']);
        $colorTemplate->setACCENT5($colorTemplateData['ACCENT_5']);
        $colorTemplate->setACCENT6($colorTemplateData['ACCENT_6']);
        $colorTemplate->setBACKGROUND1($colorTemplateData['BACKGROUND_1']);
        $colorTemplate->setBACKGROUND2($colorTemplateData['BACKGROUND_2']);
        $colorTemplate->setTEXT1($colorTemplateData['TEXT_1']);
        $colorTemplate->setTEXT2($colorTemplateData['TEXT_2']);
        $style->setColorTemplate($colorTemplate);
        
        $this->em->persist($colorTemplate);
        $this->em->persist($style);
        $this->em->flush();

        return ["descr" => "Success " . $style->getId()];
    }

    public function get(Request $request)
    {
        /**  @var StyleRepository $styleRepository */
        $styleRepository = $this->em->getRepository(Style::class);

        $styles = $styleRepository->findBy([
            "isActive" => true,
            "direction" => $request->request->get("direction"),
            "capacity" => $request->request->get("capacity")
        ]);

        $serializer = new SerializerService;
        $styles_ = [];
        foreach ($styles as $style)
            array_push($styles_, $serializer->normalize($style));

        return $styles_;
    }
}
