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

    /**
     * @ORM\OneToMany(targetEntity=DownloadPresentation::class, mappedBy="presentation")
     * @Ignore()
     */
    private $downloadedPresenatations;

    /**
     * @ORM\Column(type="json", nullable=true)
     */
    private $history = null;

    /**
     * @ORM\Column(type="json", nullable=true)
     */
    private $settings = [];

    /**
     * @ORM\OneToOne(targetEntity=Checkout::class, mappedBy="presentation", cascade={"persist", "remove"})
     */
    private $checkout;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $thumbnail;

    public function __construct()
    {
        $this->slides = new ArrayCollection();
        $this->downloadedPresenatations = new ArrayCollection();
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

    /**
     * @return Collection|DownloadPresentation[]
     */
    public function getDownloadedPresenatations(): Collection
    {
        return $this->downloadedPresenatations;
    }

    public function addDownloadedPresenatation(DownloadPresentation $downloadedPresenatation): self
    {
        if (!$this->downloadedPresenatations->contains($downloadedPresenatation)) {
            $this->downloadedPresenatations[] = $downloadedPresenatation;
            $downloadedPresenatation->setPresentation($this);
        }

        return $this;
    }

    public function removeDownloadedPresenatation(DownloadPresentation $downloadedPresenatation): self
    {
        if ($this->downloadedPresenatations->removeElement($downloadedPresenatation)) {
            // set the owning side to null (unless already changed)
            if ($downloadedPresenatation->getPresentation() === $this) {
                $downloadedPresenatation->setPresentation(null);
            }
        }

        return $this;
    }

    public function getHistory(): ?array
    {
        return $this->history;
    }

    public function setHistory(?array $history): self
    {
        $this->history = $history;

        return $this;
    }

    public function getSettings(): ?array
    {
        return $this->settings;
    }

    public function setSettings(?array $settings): self
    {
        $this->settings = $settings;

        return $this;
    }

    public function getCheckout(): ?Checkout
    {
        return $this->checkout;
    }

    public function setCheckout(?Checkout $checkout): self
    {
        // unset the owning side of the relation if necessary
        if ($checkout === null && $this->checkout !== null) {
            $this->checkout->setPresentation(null);
        }

        // set the owning side of the relation if necessary
        if ($checkout !== null && $checkout->getPresentation() !== $this) {
            $checkout->setPresentation($this);
        }

        $this->checkout = $checkout;

        return $this;
    }

    public function getThumbnail(): ?string
    {
        return $this->thumbnail;
    }

    public function setThumbnail(?string $thumbnail): self
    {
        $this->thumbnail = $thumbnail;

        return $this;
    }

}
