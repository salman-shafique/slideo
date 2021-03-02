<?php

namespace App\Entity;

use App\Repository\StyleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\Serializer\Annotation\Ignore;

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
     * @ORM\Column(type="string", length=255)
     * @Ignore()
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
     * @Ignore()
     */
    private $created;

    /**
     * @ORM\Column(type="boolean")
     * @Ignore()
     */
    private $isActive = true;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $prevFile;

    /**
     * @ORM\OneToMany(targetEntity=Content::class, mappedBy="style")
     */
    private $shapes;

    /**
     * @ORM\Column(type="array", nullable=true)
     */
    private $keywords = [];

    /**
     * @ORM\ManyToOne(targetEntity=Layout::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private $layout;

    /**
     * @ORM\OneToOne(targetEntity=ColorTemplate::class, cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $colorTemplate;

    /**
     * @ORM\OneToOne(targetEntity=Content::class, cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $background;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $company;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $isDefault = false;

    public function __construct()
    {
        $this->shapes = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    /**
     * @return Collection|Content[]
     */
    public function getShapes(): Collection
    {
        return $this->shapes;
    }

    public function addShape(Content $shape): self
    {
        if (!$this->shapes->contains($shape)) {
            $this->shapes[] = $shape;
            $shape->setStyle($this);
        }

        return $this;
    }

    public function removeShape(Content $shape): self
    {
        if ($this->shapes->contains($shape)) {
            $this->shapes->removeElement($shape);
            // set the owning side to null (unless already changed)
            if ($shape->getStyle() === $this) {
                $shape->setStyle(null);
            }
        }

        return $this;
    }

    public function getKeywords(): ?array
    {
        return $this->keywords;
    }

    public function setKeywords(?array $keywords): self
    {
        $this->keywords = $keywords;

        return $this;
    }

    public function getLayout(): ?Layout
    {
        return $this->layout;
    }

    public function setLayout(?Layout $layout): self
    {
        $this->layout = $layout;

        return $this;
    }

    public function getColorTemplate(): ?ColorTemplate
    {
        return $this->colorTemplate;
    }

    public function setColorTemplate(ColorTemplate $colorTemplate): self
    {
        $this->colorTemplate = $colorTemplate;

        return $this;
    }

    public function getBackground(): ?Content
    {
        return $this->background;
    }

    public function setBackground(Content $background): self
    {
        $this->background = $background;

        return $this;
    }

    public function getCompany(): ?string
    {
        return $this->company;
    }

    public function setCompany(?string $company): self
    {
        $this->company = $company;

        return $this;
    }

    public function getIsDefault(): ?bool
    {
        return $this->isDefault;
    }

    public function setIsDefault(?bool $isDefault): self
    {
        $this->isDefault = $isDefault;

        return $this;
    }

}
