<?php

namespace App\Entity;

use Gedmo\Mapping\Annotation as Gedmo;
use App\Repository\SlideRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

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
     * @ORM\OneToMany(targetEntity=Content::class, mappedBy="slide")
     */
    private $newObjects;

    /**
     * @ORM\OneToMany(targetEntity=Content::class, mappedBy="slide")
     */
    private $Objects;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $direction;

    /**
     * @ORM\Column(type="text")
     */
    private $linesDic;

    /**
     * @ORM\OneToOne(targetEntity=Content::class, cascade={"persist", "remove"})
     */
    private $slideTitle;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $status = "active";

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $style;

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

    public function __construct()
    {
        $this->analyzedContent = new ArrayCollection();
        $this->newObjects = new ArrayCollection();
        $this->Objects = new ArrayCollection();
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

    /**
     * @return Collection|Content[]
     */
    public function getNewObjects(): Collection
    {
        return $this->newObjects;
    }

    public function addNewObject(Content $newObject): self
    {
        if (!$this->newObjects->contains($newObject)) {
            $this->newObjects[] = $newObject;
        }

        return $this;
    }

    public function removeNewObject(Content $newObject): self
    {
        if ($this->newObjects->contains($newObject)) {
            $this->newObjects->removeElement($newObject);
        }

        return $this;
    }

    /**
     * @return Collection|Content[]
     */
    public function getObjects(): Collection
    {
        return $this->Objects;
    }

    public function addObject(Content $object): self
    {
        if (!$this->Objects->contains($object)) {
            $this->Objects[] = $object;
        }

        return $this;
    }

    public function removeObject(Content $object): self
    {
        if ($this->Objects->contains($object)) {
            $this->Objects->removeElement($object);
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

    public function getLinesDic(): ?string
    {
        return $this->linesDic;
    }

    public function setLinesDic(string $linesDic): self
    {
        $this->linesDic = $linesDic;

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

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getStyle(): ?string
    {
        return $this->style;
    }

    public function setStyle(string $style): self
    {
        $this->style = $style;

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
}
