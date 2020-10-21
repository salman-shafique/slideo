<?php

namespace App\Service;

use App\Entity\AnalyzedContent;
use App\Entity\Content;
use App\Entity\Presentation;
use App\Entity\Slide;
use Doctrine\ORM\EntityManagerInterface;
use App\Service\ContentService;

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
        foreach ($rawSlides as  $key => $rawSlide) {

            $slide = new Slide();
            $presentation->addSlide($slide);
            $slide->setSlideId(hash("md4", time(), false));
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
                $slide->setSlideTitle($slideTitleImage);
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
                $slide->addAnalyzedContent($analyzedContent);

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

        $serializedSlides = [];
        foreach ($slides as $slide)
            array_push($serializedSlides, $this->serialize($slide));

        return $serializedSlides;
    }

    public function serialize(Slide $slide)
    {
        $contentService = new ContentService();
        $serializedSlide = [];

        $serializedSlide['slide_id'] = $slide->getSlideId();
        $serializedSlide['direction'] = $slide->getDirection();
        $serializedSlide['isActive'] = $slide->getIsActive();
        $serializedSlide['style'] = $slide->getStyle();
        $serializedSlide['sentences'] = $slide->getSentences();

        $serializedSlide = array_merge($serializedSlide, $contentService->serialize($slide->getSlideTitle()));
        $serializedSlide = array_merge($serializedSlide, $contentService->serialize($slide->getSlideTitleImage()));
        $serializedSlide = array_merge($serializedSlide, $contentService->serialize($slide->getSubTitle()));

        $serializedSlide['analyzed_content'] = [];
        foreach ( $slide->getAnalyzedContent() as $analyzedContent) {
            $tmp = [];
            $tmp = array_merge($tmp, $contentService->serialize($analyzedContent->getH1()));
            $tmp = array_merge($tmp, $contentService->serialize($analyzedContent->getH1Image()));
            $tmp = array_merge($tmp, $contentService->serialize($analyzedContent->getIcon()));
            $tmp = array_merge($tmp, $contentService->serialize($analyzedContent->getOriginalSentence()));
            $serializedSlide['analyzed_content'][] = $tmp;
        }

        // Check others
        if ($slide->getNewObjects())
            foreach ($slide->getNewObjects() as $content)
                $serializedSlide = array_merge($serializedSlide, $contentService->serialize($content));

        if ($slide->getObjects())
            foreach ($slide->getObjects() as $content)
                $serializedSlide = array_merge($serializedSlide, $contentService->serialize($content));

        return $serializedSlide;
    }
}
