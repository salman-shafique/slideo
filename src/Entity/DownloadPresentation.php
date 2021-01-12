<?php

namespace App\Entity;

use App\Repository\DownloadPresentationRepository;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * @ORM\Entity(repositoryClass=DownloadPresentationRepository::class)
 */
class DownloadPresentation
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Presentation::class, inversedBy="downloadedPresenatations")
     * @ORM\JoinColumn(nullable=false)
     */
    private $presentation;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $pptxFile;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $prevFile;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $pdfFile;

    /**
     * @ORM\Column(type="integer")
     */
    private $numberOfSlides;

    /**
     * @ORM\Column(type="boolean")
     */
    private $completed = false;

    /**
     * @var \DateTime $created
     *
     * @Gedmo\Timestampable(on="create")
     * @ORM\Column(type="datetime")
     */
    private $created;

    /**
     * @var \DateTime $updated
     *
     * @Gedmo\Timestampable(on="update")
     * @ORM\Column(type="datetime")
     */
    private $updated;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getPptxFile(): ?string
    {
        return $this->pptxFile;
    }

    public function setPptxFile(?string $pptxFile): self
    {
        $this->pptxFile = $pptxFile;

        return $this;
    }

    public function getPrevFile(): ?string
    {
        return $this->prevFile;
    }

    public function setPrevFile(?string $prevFile): self
    {
        $this->prevFile = $prevFile;

        return $this;
    }

    public function getPdfFile(): ?string
    {
        return $this->pdfFile;
    }

    public function setPdfFile(?string $pdfFile): self
    {
        $this->pdfFile = $pdfFile;

        return $this;
    }

    public function getNumberOfSlides(): ?int
    {
        return $this->numberOfSlides;
    }

    public function setNumberOfSlides(int $numberOfSlides): self
    {
        $this->numberOfSlides = $numberOfSlides;

        return $this;
    }

    public function getCompleted(): ?bool
    {
        return $this->completed;
    }

    public function setCompleted(bool $completed): self
    {
        $this->completed = $completed;

        return $this;
    }

    public function getCreated()
    {
        return $this->created;
    }

    public function getUpdated()
    {
        return $this->updated;
    }

}
