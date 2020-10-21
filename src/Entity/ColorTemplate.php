<?php

namespace App\Entity;

use App\Repository\ColorTemplateRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ColorTemplateRepository::class)
 */
class ColorTemplate
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=7)
     */
    private $ACCENT_1;

    /**
     * @ORM\Column(type="string", length=7)
     */
    private $ACCENT_2;

    /**
     * @ORM\Column(type="string", length=7)
     */
    private $ACCENT_3;

    /**
     * @ORM\Column(type="string", length=7)
     */
    private $ACCENT_4;

    /**
     * @ORM\Column(type="string", length=7)
     */
    private $ACCENT_5;

    /**
     * @ORM\Column(type="string", length=7)
     */
    private $ACCENT_6;

    /**
     * @ORM\Column(type="string", length=7)
     */
    private $BACKGROUND_1;

    /**
     * @ORM\Column(type="string", length=7)
     */
    private $BACKGROUND_2;

    /**
     * @ORM\Column(type="string", length=7)
     */
    private $TEXT_1;

    /**
     * @ORM\Column(type="string", length=7)
     */
    private $TEXT_2;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $title;

    /**
     * @ORM\ManyToOne(targetEntity=Presentation::class, inversedBy="colorTemplates")
     */
    private $presentation;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getACCENT1(): ?string
    {
        return $this->ACCENT_1;
    }

    public function setACCENT1(string $ACCENT_1): self
    {
        $this->ACCENT_1 = $ACCENT_1;

        return $this;
    }

    public function getACCENT2(): ?string
    {
        return $this->ACCENT_2;
    }

    public function setACCENT2(string $ACCENT_2): self
    {
        $this->ACCENT_2 = $ACCENT_2;

        return $this;
    }

    public function getACCENT3(): ?string
    {
        return $this->ACCENT_3;
    }

    public function setACCENT3(string $ACCENT_3): self
    {
        $this->ACCENT_3 = $ACCENT_3;

        return $this;
    }

    public function getACCENT4(): ?string
    {
        return $this->ACCENT_4;
    }

    public function setACCENT4(string $ACCENT_4): self
    {
        $this->ACCENT_4 = $ACCENT_4;

        return $this;
    }

    public function getACCENT5(): ?string
    {
        return $this->ACCENT_5;
    }

    public function setACCENT5(string $ACCENT_5): self
    {
        $this->ACCENT_5 = $ACCENT_5;

        return $this;
    }

    public function getACCENT6(): ?string
    {
        return $this->ACCENT_6;
    }

    public function setACCENT6(string $ACCENT_6): self
    {
        $this->ACCENT_6 = $ACCENT_6;

        return $this;
    }

    public function getBACKGROUND1(): ?string
    {
        return $this->BACKGROUND_1;
    }

    public function setBACKGROUND1(string $BACKGROUND_1): self
    {
        $this->BACKGROUND_1 = $BACKGROUND_1;

        return $this;
    }

    public function getBACKGROUND2(): ?string
    {
        return $this->BACKGROUND_2;
    }

    public function setBACKGROUND2(string $BACKGROUND_2): self
    {
        $this->BACKGROUND_2 = $BACKGROUND_2;

        return $this;
    }

    public function getTEXT1(): ?string
    {
        return $this->TEXT_1;
    }

    public function setTEXT1(string $TEXT_1): self
    {
        $this->TEXT_1 = $TEXT_1;

        return $this;
    }

    public function getTEXT2(): ?string
    {
        return $this->TEXT_2;
    }

    public function setTEXT2(string $TEXT_2): self
    {
        $this->TEXT_2 = $TEXT_2;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getPresentation(): ?Presentation
    {
        return $this->presentation;
    }

    public function setPresentation(?Presentation $presentation): self
    {
        $this->presentation = $presentation;

        return $this;
    }
}
