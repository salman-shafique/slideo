<?php

namespace App\Entity;

use Gedmo\Mapping\Annotation as Gedmo;
use App\Repository\PresentationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Ignore;

/**
 * @ORM\Entity(repositoryClass=PresentationRepository::class)
 */
class Presentation
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="presentations")
     * @Ignore()
     */
    private $owner;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Ignore()
     */
    private $sessionId;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $title = "New Presentation";

    /**
     * @ORM\OneToMany(targetEntity=Slide::class, mappedBy="presentation", orphanRemoval=true)
     */
    private $slides;

    /**
     * @ORM\Column(type="boolean")
     * @Ignore()
     */
    private $isActive = true;

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
    private $presentationId;

    /**
     * @ORM\Column(type="array", nullable=true)
     */
    private $slidesOrder = [];

    public function __construct()
    {
        $this->slides = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(?User $owner): self
    {
        $this->owner = $owner;

        return $this;
    }

    public function getSessionId(): ?string
    {
        return $this->sessionId;
    }

    public function setSessionId(?string $sessionId): self
    {
        $this->sessionId = $sessionId;

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

    /**
     * @return Collection|Slide[]
     */
    public function getSlides(): Collection
    {
        return $this->slides;
    }

    public function addSlide(Slide $slide): self
    {
        if (!$this->slides->contains($slide)) {
            $this->slides[] = $slide;
            $slide->setPresentation($this);

            // Order
            array_push($this->slidesOrder, $slide->getSlideId());
        }

        return $this;
    }

    public function removeSlide(Slide $slide): self
    {
        if ($this->slides->contains($slide)) {
            $this->slides->removeElement($slide);
            // set the owning side to null (unless already changed)
            if ($slide->getPresentation() === $this) {
                $slide->setPresentation(null);
            }

            // Order
            $key = array_search($slide->getSlideId(), $this->slidesOrder);
            if ($key)
                unset($this->slidesOrder[$key]);
        }

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

    public function getCreated()
    {
        return $this->created;
    }

    public function getUpdated()
    {
        return $this->updated;
    }

    public function getPresentationId(): ?string
    {
        return $this->presentationId;
    }

    public function setPresentationId(string $presentationId): self
    {
        $this->presentationId = $presentationId;

        return $this;
    }

    public function getSlidesOrder(): ?array
    {
        return $this->slidesOrder;
    }

    public function setSlidesOrder(?array $slidesOrder): self
    {
        $this->slidesOrder = $slidesOrder;

        return $this;
    }

}
