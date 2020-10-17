<?php

namespace App\Service;

use App\Entity\AnalyzedContent;
use App\Entity\Content;
use App\Entity\Presentation;
use App\Entity\Slide;
use Doctrine\ORM\EntityManagerInterface;

class SlideService
{
    private $em;


    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function findAndApplyStyle(Slide $slide)
    {
        $slide->setStyle("some style name here");
        $this->em->persist($slide);
        $this->em->flush();
    }

    public function createSlides(array $rawSlides, Presentation $presentation): array
    {
        $slides = [];
        foreach ($rawSlides as $rawSlide) {
            $slide = new Slide();
            $presentation->addSlide($slide);
            $slide->setSlideId(hash("md4", time(), false));
            $slide->setDirection($rawSlide['direction']);
            $this->em->persist($slide);

            // Slide title
            if (isset($rawSlide['slideTitle'])) {
                $slideTitle = new Content();
                $slideTitle->setData($rawSlide['slideTitle']);
                $slide->setSlideTitle($slideTitle);
                $this->em->persist($slideTitle);
            }

            // Sub title
            if (isset($rawSlide['subTitle'])) {
                $subTitle = new Content();
                $subTitle->setData($rawSlide['subTitle']);
                $slide->setSubTitle($subTitle);
                $this->em->persist($subTitle);
            }

            // Analyzed content
            foreach ($rawSlide['analyzed_content'] as $rawAnalyzedContent) {
                $analyzedContent = new AnalyzedContent();
                $analyzedContent->setSlide($slide);

                $h1 = new Content();
                $h1->setData($rawAnalyzedContent['h1']);
                $icon = new Content();
                $icon->setData($rawAnalyzedContent['icon']);
                $originalSentence = new Content();
                $originalSentence->setData($rawAnalyzedContent['originalSentence']);

                $analyzedContent->setH1($h1);
                $analyzedContent->setIcon($icon);
                $analyzedContent->setOriginalSentence($originalSentence);

                $this->em->persist($analyzedContent);
                $this->em->persist($h1);
                $this->em->persist($icon);
                $this->em->persist($originalSentence);
            }

            // Sentences
            $slide->setSentences($rawSlide['sentences']);

            // Find the slide
            $this->findAndApplyStyle($slide);
            
            $this->em->persist($slide);
            array_push($slides, $slide);
        }
        $this->em->persist($presentation);
        $this->em->flush();

        return $slides;
    }
}
