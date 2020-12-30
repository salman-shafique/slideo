<?php

namespace App\Service;

use App\Entity\Content;
use App\Entity\Layout;
use App\Entity\Style;
use App\Repository\LayoutRepository;
use App\Repository\StyleRepository;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use phpDocumentor\Reflection\Types\Boolean;

class LayoutService
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
        if (!$request->request->get("A2A3EF62A0498A46531B71DBD6969004")) return ["success" => false];
        if ($request->request->get("A2A3EF62A0498A46531B71DBD6969004") != "D363D75DD3E229BD8BBE2759E93FDE11") return ["success" => false];

        $capacity = (int)$request->request->get('capacity');
        $direction = $request->request->get('direction');
        $uniqueName = $request->request->get('layout_name');

        if (!is_dir("layouts/$uniqueName"))
            mkdir("layouts/$uniqueName", 0777, true);

        $now = time();
        $this->saveBase64File("layouts/$uniqueName/$now.png", $request->request->get('prevFile'));
        $prevFile = "/layouts/$uniqueName/$now.png";

        $layout = new Layout;
        $layout->setUniqueName($uniqueName);
        $layout->setDirection($direction);
        $layout->setCapacity($capacity);
        $layout->setPrevFile($prevFile);

        $this->em->persist($layout);
        $this->em->flush();

        return ["descr" => "Succesfully added"];
    }

    public function get(Request $request)
    {
        $query = $this->em
            ->createQueryBuilder()
            ->select('layout')
            ->groupBy('layout')
            ->from('App\Entity\Layout', 'layout')
            ->join('App\Entity\Style', 'style')
            ->where("style.layout = layout.id")
            ->andWhere("layout.isActive = :isActive")
            ->andWhere("style.isActive = :isActive")
            ->setParameter("isActive", true)
            ->andWhere("layout.direction = :direction")
            ->andWhere("style.direction = :direction")
            ->setParameter("direction", $request->request->get("direction"))
            ->andWhere("layout.capacity = :capacity")
            ->andWhere("style.capacity = :capacity")
            ->setParameter("capacity", $request->request->get("capacity"));

        $r = $query
            ->getQuery()
            ->getResult(\Doctrine\ORM\Query::HYDRATE_ARRAY);

        return $r;
    }

    public function getAll()
    {
        /**  @var LayoutRepository $layoutRepository */
        $layoutRepository = $this->em->getRepository(Layout::class);

        $serializer = new SerializerService;
        $layouts = $layoutRepository->findBy([
            "isActive" => true
        ]);

        $layouts_ = [];
        foreach ($layouts as $layout)
            array_push($layouts_, $serializer->normalize($layout));

        return $layouts_;
    }

    public function check(Request $request): array
    {
        /**  @var LayoutRepository $layoutRepository */
        $layoutRepository = $this->em->getRepository(Layout::class);

        $layouts = $layoutRepository->findOneBy([
            "isActive" => true,
            "uniqueName" => $request->request->get("layout_name"),
            "direction" => $request->request->get("direction")
        ]);
        if ($layouts)
            return ['success' => true];

        return ['success' => false];
    }
}
