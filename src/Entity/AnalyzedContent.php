<?php

namespace App\Entity;

use App\Repository\AnalyzedContentRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=AnalyzedContentRepository::class)
 */
class AnalyzedContent
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToOne(targetEntity=Content::class, cascade={"persist", "remove"})
     */
    private $h1;

    /**
     * @ORM\OneToOne(targetEntity=Content::class, cascade={"persist", "remove"})
     */
    private $h1Image;

    /**
     * @ORM\OneToOne(targetEntity=Content::class, cascade={"persist", "remove"})
     */
    private $icon;

    /**
     * @ORM\OneToOne(targetEntity=Content::class, cascade={"persist", "remove"})
     */
    private $originalSentence;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $status;

    /**
     * @ORM\ManyToOne(targetEntity=Slide::class, inversedBy="analyzedContent")
     */
    private $slide;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getH1(): ?Content
    {
        return $this->h1;
    }

    public function setH1(?Content $h1): self
    {
        $this->h1 = $h1;

        return $this;
    }

    public function getH1Image(): ?Content
    {
        return $this->h1Image;
    }

    public function setH1Image(?Content $h1Image): self
    {
        $this->h1Image = $h1Image;

        return $this;
    }

    public function getIcon(): ?Content
    {
        return $this->icon;
    }

    public function setIcon(?Content $icon): self
    {
        $this->icon = $icon;

        return $this;
    }

    public function getOriginalSentence(): ?Content
    {
        return $this->originalSentence;
    }

    public function setOriginalSentence(?Content $originalSentence): self
    {
        $this->originalSentence = $originalSentence;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(?string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getSlide(): ?Slide
    {
        return $this->slide;
    }

    public function setSlide(?Slide $slide): self
    {
        $this->slide = $slide;

        return $this;
    }
}
