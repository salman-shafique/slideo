<?php

namespace App\Service;

use App\Entity\AnalyzedContent;
use App\Entity\ColorTemplate;
use App\Entity\Content;
use App\Entity\Presentation;
use App\Entity\Slide;
use App\Entity\Style;
use App\Entity\User;
use App\Repository\StyleRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Query\ResultSetMapping;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;

class SlideService
{
    private $em;
    private $security;

    public function __construct(EntityManagerInterface $em, Security $security)
    {
        $this->em = $em;
        $this->security = $security;
    }

    private function findRandomStyle(int $capacity, string $direction): ?Style
    {
        /**
         * @var User $user
         */
        $user = $this->security->getUser();

        // Get default if exists
        $query = $this->em->createQueryBuilder()
            ->select('COUNT(s.id)')
            ->from("App\Entity\Style", "s")
            ->where('s.isActive = :isActive')
            ->setParameter(':isActive', true)
            ->andWhere('s.capacity = :capacity')
            ->setParameter(':capacity', $capacity)
            ->andWhere('s.direction = :direction')
            ->setParameter(':direction', $direction)
            ->andWhere('s.isDefault = :isDefault')
            ->setParameter(':isDefault', True);
        ($user && $user->getCompany())
            ? $query->andWhere("s.company = :company")->setParameter("company", $user->getCompany())
            : $query->andWhere("s.company IS NULL");

        $totalRecords = $query->getQuery()->getSingleScalarResult();
        if ($totalRecords == 0) {
            // Maybe there is no default
            $query = $this->em->createQueryBuilder()
                ->select('COUNT(s.id)')
                ->from("App\Entity\Style", "s")
                ->where('s.isActive = :isActive')
                ->setParameter(':isActive', true)
                ->andWhere('s.capacity = :capacity')
                ->setParameter(':capacity', $capacity)
                ->andWhere('s.direction = :direction')
                ->setParameter(':direction', $direction);
            ($user && $user->getCompany())
                ? $query->andWhere("s.company = :company")->setParameter("company", $user->getCompany())
                : $query->andWhere("s.company IS NULL");
        };

        $totalRecords = $query->getQuery()->getSingleScalarResult();
        if ($totalRecords == 0) return null;
        $rowToFetch = rand(0, $totalRecords - 1);

        return $query
            ->select('s')
            ->setMaxResults(1)
            ->setFirstResult($rowToFetch)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function findAndApplyStyle(Slide $slide)
    {
        $style = $this->findRandomStyle(count($slide->getSentences()), $slide->getDirection());
        $slide->setStyle($style);

        // Copy shapes
        foreach ($style->getShapes() as $i => $shape) {
            $newShape = new Content();
            $shapeData = $shape->getData();
            $shapeData['active'] = "true";
            $newShape->setData($shapeData);
            $slide->addShape($newShape);
            $this->em->persist($newShape);
        }

        // Copy color template
        $colorTemplateOfStyle = $style->getColorTemplate();
        $colorTemplateOfSlide = new ColorTemplate();
        $colorTemplateOfSlide->setACCENT1($colorTemplateOfStyle->getACCENT1());
        $colorTemplateOfSlide->setACCENT2($colorTemplateOfStyle->getACCENT2());
        $colorTemplateOfSlide->setACCENT3($colorTemplateOfStyle->getACCENT3());
        $colorTemplateOfSlide->setACCENT4($colorTemplateOfStyle->getACCENT4());
        $colorTemplateOfSlide->setACCENT5($colorTemplateOfStyle->getACCENT5());
        $colorTemplateOfSlide->setACCENT6($colorTemplateOfStyle->getACCENT6());
        $colorTemplateOfSlide->setBACKGROUND1($colorTemplateOfStyle->getBACKGROUND1());
        $colorTemplateOfSlide->setBACKGROUND2($colorTemplateOfStyle->getBACKGROUND2());
        $colorTemplateOfSlide->setTEXT1($colorTemplateOfStyle->getTEXT1());
        $colorTemplateOfSlide->setTEXT2($colorTemplateOfStyle->getTEXT2());
        $slide->setColorTemplate($colorTemplateOfSlide);

        $backgroundOfSlide = $style->getBackground();
        $background = new Content();
        $background->setKeyword('background');
        $background->setData($backgroundOfSlide->getData());
        $slide->setBackground($background);

        $this->em->persist($background);
        $this->em->persist($slide);
        $this->em->flush();
    }

    public function createSlides(array $rawSlides, Presentation $presentation): array
    {
        $slides = [];
        foreach ($rawSlides as  $key => $rawSlide) {

            $slide = new Slide();
            $slide->setSlideId(hash("md4", time() + rand(), false));
            $presentation->addSlide($slide);

            $slide->setDirection($rawSlide['direction']);
            $this->em->persist($slide);

            // Slide title
            $slideTitle = new Content();
            if (isset($rawSlide['slideTitle']))
                $slideTitle->setData($rawSlide['slideTitle']);
            else
                $slideTitle->setData([]);
            $slideTitle->setKeyword('slideTitle');
            $slide->setSlideTitle($slideTitle);
            $this->em->persist($slideTitle);


            // Slide title image
            $slideTitleImage = new Content();
            if (isset($rawSlide['slideTitleImage']))
                $slideTitleImage->setData($rawSlide['slideTitleImage']);
            else
                $slideTitleImage->setData([]);

            $slideTitleImage->setKeyword('slideTitleImage');
            $slide->setSlideTitleImage($slideTitleImage);
            $this->em->persist($slideTitleImage);


            // Sub title
            $subTitle = new Content();
            if (isset($rawSlide['subTitle']))
                $subTitle->setData($rawSlide['subTitle']);
            else
                $subTitle->setData([]);
            $subTitle->setKeyword('subTitle');
            $slide->setSubTitle($subTitle);
            $this->em->persist($subTitle);

            // Analyzed content
            foreach ($rawSlide['analyzed_content'] as $rawAnalyzedContent) {
                $analyzedContent = new AnalyzedContent();

                $h1 = new Content();
                $h1->setData($rawAnalyzedContent['h1']);
                $h1->setKeyword("h1");

                $icon = new Content();
                $icon->setData($rawAnalyzedContent['icon']);
                $icon->setKeyword("icon");

                $h1image = new Content();
                $h1image->setData($rawAnalyzedContent['h1image']);
                $h1image->setKeyword("h1image");

                $originalSentence = new Content();
                $originalSentence->setData($rawAnalyzedContent['originalSentence']);
                $originalSentence->setKeyword("originalSentence");

                $analyzedContent->setH1($h1);
                $analyzedContent->setIcon($icon);
                $analyzedContent->setH1Image($h1image);
                $analyzedContent->setOriginalSentence($originalSentence);

                $slide->addAnalyzedContent($analyzedContent);

                $this->em->persist($analyzedContent);
                $this->em->persist($h1);
                $this->em->persist($icon);
                $this->em->persist($originalSentence);
            }

            // Sentences
            $slide->setSentences($rawSlide['sentences']);

            // Find the style
            $this->findAndApplyStyle($slide);

            $this->em->persist($slide);

            array_push($slides, $slide);
        }
        $this->em->persist($presentation);
        $this->em->flush();

        $serializer = new SerializerService();
        $serializedSlides = [];
        foreach ($slides as $slide)
            array_push($serializedSlides, $serializer->normalize($slide));

        return $serializedSlides;
    }

    public function deleteSlide(Request $request, Presentation $presentation): array
    {
        /**
         * @var Slide $slide
         */
        $success = false;
        foreach ($presentation->getSlides() as $slide) {
            if ($slide->getSlideId() == $request->request->get("slideId")) {
                $slide->setIsActive(false);
                $this->em->persist($slide);
                $this->em->flush();
                $success = true;
                break;
            }
        }
        return ["success" => $success];
    }

    public function restoreSlide(Request $request, Presentation $presentation): array
    {
        /**
         * @var Slide $slide
         */
        $success = false;
        foreach ($presentation->getSlides() as $slide) {
            if ($slide->getSlideId() == $request->request->get("slideId")) {
                $slide->setIsActive(true);
                $this->em->persist($slide);
                $this->em->flush();
                $success = true;
                break;
            }
        }
        return ["success" => $success];
    }
}
