<?php

namespace App\Service;

use App\Entity\Content;
use App\Entity\Slide;
use App\Entity\User;
use App\Entity\Presentation;
use App\Entity\UploadedImage;
use App\Repository\ContentRepository;
use App\Repository\SlideRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Query;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;

class ImageService
{
    private $em;
    private $flaskService;
    private $security;

    public function __construct(EntityManagerInterface $em, FlaskService $flaskService, Security $security)
    {
        $this->em = $em;
        $this->flaskService = $flaskService;
        $this->security = $security;
    }

    public function h1Image(Presentation $presentation, Request $request)
    {
        $slide = null;
        /**  @var ContentRepository $contentRepository */
        $contentRepository = $this->em->getRepository(Content::class);
        $content = $contentRepository->findOneBy(["id" => $request->request->get("contentId")]);
        if (empty($content)) {
            return ['success' => false, "message" => "content not found"];
        }
        $slide = $content->getSlide();
        if ($slide) {
            if ($slide->getPresentation()->getId() !== $presentation->getId()) {
                return ['success' => false, "message" => "Access denied"];
            }

            $images = $this->flaskService->call("Pexels", "find_images", ['keyword' => $request->request->get("keyword"), "per_page" => 20]);
            if (isset($content->getData()['shape_id'])) {
                if ($content->getData()['shape_id'] == $request->request->get("shapeId")) {
                    $data = $content->getData();
                    $data['image'] = $images[0];
                    $content->setData($data);
                    $this->em->persist($content);
                }
            }
            $this->em->flush();
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

    public function userImagesUpload(Request $request)
    {
        $images = $request->files->get('images');
        if (!$images) return ['success' => false, 'descr' => 'No image found'];

        /**
         * @var User $user
         */
        $user = $this->security->getUser();
        if (!$user) return ['success' => false, 'descr' => 'Please login first'];

        $addedImages = [];
        /** @var UploadedFile $image */
        foreach ($images as $image) {
            $mimeType = explode("/", $image->getMimeType())[0];
            if ($mimeType != "image") continue;
            if ($image->getSize() > 5000000) continue;
            $extension = $image->guessExtension();
            if (!in_array($extension, ["bmp", "gif", "jpg", "jpeg", "png", "tiff", "wmf"])) continue;

            $uploadedImage = new UploadedImage;
            list($width, $height) = getimagesize($image);
            $uploadedImage->setWidth((int)$width);
            $uploadedImage->setHeight((int)$height);

            $newFilename = hash('md2', uniqid()) . ".$extension";
            $uniqueFolder = hash('md2', uniqid());
            $image->move(
                "uploads/$uniqueFolder",
                $newFilename
            );
            $url = "/uploads/$uniqueFolder/$newFilename";
            $uploadedImage->setUrl($url);


            $user->addUploadedImage($uploadedImage);

            $this->em->persist($uploadedImage);
            $this->em->flush();

            array_push($addedImages, [
                "id" => $uploadedImage->getId(),
                "url" => $url,
                "isActive" => True,
                "width" => $width,
                "height" => $height
            ]);
        }

        $this->em->persist($user);
        $this->em->flush();

        if (count($addedImages) > 0)
            return ["success" => true, "addedImages" => $addedImages];
        else
            return ["success" => false, "descr" => "No images added. Only BMP-GIF-JPG-JPEG-PNG-TIFF-WMF allowed"];
    }

    public function userImagesGet()
    {
        /**
         * @var User $user
         */
        $user = $this->security->getUser();
        if (!$user) return [];

        $uploadedImages = $this->em
            ->createQueryBuilder()
            ->select('image')
            ->from('App\Entity\UploadedImage', 'image')
            ->where("image.isActive = :isActive")
            ->setParameter("isActive", True)
            // Owner
            ->andWhere("image.owner = :owner")
            ->setParameter("owner", $user)
            ->getQuery()
            ->getResult(Query::HYDRATE_ARRAY);

        return $uploadedImages;
    }

    public function deleteUserImage(string $imageId)
    {
        /**
         * @var User $user
         */
        $user = $this->security->getUser();
        if (!$user) return ['success' => false, 'descr' => 'Please login first'];

        /**
         * @var UploadedImage $uploadedImage
         */
        $uploadedImage = $this->em
            ->createQueryBuilder()
            ->select('image')
            ->from('App\Entity\UploadedImage', 'image')
            ->where("image.isActive = :isActive")
            ->setParameter("isActive", True)
            ->andWhere("image.id = :imageId")
            ->setParameter("imageId", $imageId)
            // Owner
            ->andWhere("image.owner = :owner")
            ->setParameter("owner", $user)
            ->getQuery()
            ->getOneOrNullResult();

        if ($uploadedImage) {
            $uploadedImage->setIsActive(false);
            $this->em->persist($uploadedImage);
            $this->em->flush();
        }
    }
}
