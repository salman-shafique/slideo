<?php

namespace App\Service;

use App\Entity\AnalyzedContent;
use App\Entity\Content;
use App\Entity\Presentation;
use App\Entity\Slide;
use App\Entity\Style;
use App\Repository\StyleRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Query\ResultSetMapping;

class SlideService
{
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    private function findRandomStyle(int $capacity): ?Style
    {
        $qb = $this->em->createQueryBuilder()
            ->select('COUNT(s.id)')
            ->from("App\Entity\Style", "s")
            ->where('s.isActive = :isActive')
            ->setParameter(':isActive', true)
            ->andWhere('s.capacity = :capacity')
            ->setParameter(':capacity', $capacity);

        $totalRecords = $qb->getQuery()->getSingleScalarResult();
        if ($totalRecords < 1) return null;
        $rowToFetch = rand(0, $totalRecords - 1);

        return $qb
            ->select('s')
            ->setMaxResults(1)
            ->setFirstResult($rowToFetch)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function findAndApplyStyle(Slide $slide)
    {
        $style = $this->findRandomStyle(count($slide->getSentences()));
        $slide->setStyle($style);

        // Copy shapes
        foreach ($style->getShapes() as $i => $shape) {
            $newShape = new Content();
            $shapeData = $shape->getData();
            $shapeData['active'] = true;
            $newShape->setData($shapeData);
            $slide->addShape($newShape);
            $this->em->persist($newShape);
        }

        $background = new Content();
        $background->setKeyword('background');
        $background->setData(['bg' => 'foo', 'type' => 'bar']);

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
            if (isset($rawSlide['slideTitle'])) {
                $slideTitle = new Content();
                $slideTitle->setData($rawSlide['slideTitle']);
                $slideTitle->setKeyword('slideTitle');
                $slide->setSlideTitle($slideTitle);
                $this->em->persist($slideTitle);
            }

            // Slide title image
            if (isset($rawSlide['slideTitleImage'])) {
                $slideTitleImage = new Content();
                $slideTitleImage->setData($rawSlide['slideTitleImage']);
                $slideTitleImage->setKeyword('slideTitleImage');
                $slide->setSlideTitleImage($slideTitleImage);
                $this->em->persist($slideTitleImage);
            }

            // Sub title
            if (isset($rawSlide['subTitle'])) {
                $subTitle = new Content();
                $subTitle->setData($rawSlide['subTitle']);
                $subTitle->setKeyword('subTitle');
                $slide->setSubTitle($subTitle);
                $this->em->persist($subTitle);
            }

            // Analyzed content
            foreach ($rawSlide['analyzed_content'] as $rawAnalyzedContent) {
                $analyzedContent = new AnalyzedContent();

                $h1 = new Content();
                $h1->setData($rawAnalyzedContent['h1']);
                $h1->setKeyword("h1");

                $icon = new Content();
                $icon->setData($rawAnalyzedContent['icon']);
                $icon->setKeyword("icon");

                $originalSentence = new Content();
                $originalSentence->setData($rawAnalyzedContent['originalSentence']);
                $originalSentence->setKeyword("originalSentence");

                $analyzedContent->setH1($h1);
                $analyzedContent->setIcon($icon);
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
}
