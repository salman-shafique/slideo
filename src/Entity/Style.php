<?php

namespace App\Entity;

use App\Repository\StyleRepository;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * @ORM\Entity(repositoryClass=StyleRepository::class)
 */
class Style
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $keywords;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $pptxFile;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $svgFile;

    /**
     * @ORM\Column(type="integer")
     */
    private $capacity;

    /**
     * @ORM\Column(type="string", length=3)
     */
    private $direction;

    /**
     * @var \DateTime $created
     *
     * @Gedmo\Timestampable(on="create")
     * @ORM\Column(type="datetime")
     */
    private $created;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isActive = true;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $prevFile;

    /**
     * @ORM\Column(type="integer")
     */
    private $designId;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $layout;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getKeywords(): ?string
    {
        return $this->keywords;
    }

    public function setKeywords(?string $keywords): self
    {
        $this->keywords = $keywords;

        return $this;
    }

    public function getPptxFile(): ?string
    {
        return $this->pptxFile;
    }

    public function setPptxFile(string $pptxFile): self
    {
        $this->pptxFile = $pptxFile;

        return $this;
    }

    public function getSvgFile(): ?string
    {
        return $this->svgFile;
    }

    public function setSvgFile(string $svgFile): self
    {
        $this->svgFile = $svgFile;

        return $this;
    }

    public function getCapacity(): ?int
    {
        return $this->capacity;
    }

    public function setCapacity(int $capacity): self
    {
        $this->capacity = $capacity;

        return $this;
    }

    public function getDirection(): ?string
    {
        return $this->direction;
    }

    public function setDirection(string $direction): self
    {
        $this->direction = $direction;

        return $this;
    }

    public function getIsActive(): ?bool
    {
        return $this->isActive;
    }

    public function setIsActive(bool $isActive): self
    {
        $this->isActive = $isActive;

        return $this;
    }

    public function getPrevFile(): ?string
    {
        return $this->prevFile;
    }

    public function setPrevFile(string $prevFile): self
    {
        $this->prevFile = $prevFile;

        return $this;
    }

    public function getCreated()
    {
        return $this->created;
    }

    public function getDesignId(): ?int
    {
        return $this->designId;
    }

    public function setDesignId(int $designId): self
    {
        $this->designId = $designId;

        return $this;
    }

    public function getLayout(): ?string
    {
        return $this->layout;
    }

    public function setLayout(?string $layout): self
    {
        $this->layout = $layout;

        return $this;
    }
}
