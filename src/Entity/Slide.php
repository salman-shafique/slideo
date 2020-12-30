<?php

namespace App\Entity;

use Gedmo\Mapping\Annotation as Gedmo;
use App\Repository\SlideRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Ignore;

/**
 * @ORM\Entity(repositoryClass=SlideRepository::class)
 */
class Slide
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToMany(targetEntity=AnalyzedContent::class, mappedBy="slide")
     */
    private $analyzedContent;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $direction;

    /**
     * @ORM\OneToOne(targetEntity=Content::class, cascade={"persist", "remove"})
     */
    private $slideTitle;

    /**
     * @ORM\OneToOne(targetEntity=Content::class, cascade={"persist", "remove"})
     */
    private $subTitle;

    /**
     * @ORM\OneToOne(targetEntity=Content::class, cascade={"persist", "remove"})
     */
    private $slideTitleImage;

    /**
     * @ORM\ManyToOne(targetEntity=Presentation::class, inversedBy="slides")
     * @ORM\JoinColumn(nullable=false)
     * @Ignore()
     */
    private $presentation;

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

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $slideId;

    /**
     * @ORM\Column(type="array")
     */
    private $sentences = [];

    /**
     * @ORM\Column(type="boolean")
     */
    private $isActive = true;

    /**
     * @ORM\ManyToOne(targetEntity=Content::class)
     */
    private $background;

    /**
     * @ORM\ManyToOne(targetEntity=Style::class, fetch="EAGER")
     */
    private $style;

    /**
     * @ORM\OneToMany(targetEntity=Content::class, mappedBy="slide")
     */
    private $shapes;

    /**
     * @ORM\OneToOne(targetEntity=ColorTemplate::class, cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $colorTemplate;


    public function __construct()
    {
        $this->analyzedContent = new ArrayCollection();
        $this->shapes = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection|AnalyzedContent[]
     */
    public function getAnalyzedContent(): Collection
    {
        return $this->analyzedContent;
    }

    public function addAnalyzedContent(AnalyzedContent $analyzedContent): self
    {
        if (!$this->analyzedContent->contains($analyzedContent)) {
            $this->analyzedContent[] = $analyzedContent;
            $analyzedContent->setSlide($this);
        }

        return $this;
    }

    public function removeAnalyzedContent(AnalyzedContent $analyzedContent): self
    {
        if ($this->analyzedContent->contains($analyzedContent)) {
            $this->analyzedContent->removeElement($analyzedContent);
            // set the owning side to null (unless already changed)
            if ($analyzedContent->getSlide() === $this) {
                $analyzedContent->setSlide(null);
            }
        }

        return $this;
    }

    public function getDirection(): ?string
    {
        return $this->direction;
    }

    public function setDirection(?string $direction): self
    {
        $this->direction = $direction;

        return $this;
    }

    public function getSlideTitle(): ?Content
    {
        return $this->slideTitle;
    }

    public function setSlideTitle(?Content $slideTitle): self
    {
        $this->slideTitle = $slideTitle;

        return $this;
    }


    public function getSubTitle(): ?Content
    {
        return $this->subTitle;
    }

    public function setSubTitle(?Content $subTitle): self
    {
        $this->subTitle = $subTitle;

        return $this;
    }

    public function getSlideTitleImage(): ?Content
    {
        return $this->slideTitleImage;
    }

    public function setSlideTitleImage(?Content $slideTitleImage): self
    {
        $this->slideTitleImage = $slideTitleImage;

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

    public function getCreated()
    {
        return $this->created;
    }

    public function getUpdated()
    {
        return $this->updated;
    }

    public function getSlideId(): ?string
    {
        return $this->slideId;
    }

    public function setSlideId(string $slideId): self
    {
        $this->slideId = $slideId;

        return $this;
    }

    public function getSentences(): ?array
    {
        return $this->sentences;
    }

    public function setSentences(array $sentences): self
    {
        $this->sentences = $sentences;

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

    public function getBackground(): ?Content
    {
        return $this->background;
    }

    public function setBackground(?Content $background): self
    {
        $this->background = $background;

        return $this;
    }

    public function getStyle(): ?Style
    {
        return $this->style;
    }

    public function setStyle(?Style $style): self
    {
        $this->style = $style;

        return $this;
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
            $shape->setSlide($this);
        }

        return $this;
    }

    public function removeShape(Content $shape): self
    {
        if ($this->shapes->contains($shape)) {
            $this->shapes->removeElement($shape);
            // set the owning side to null (unless already changed)
            if ($shape->getSlide() === $this) {
                $shape->setSlide(null);
            }
        }

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
}
