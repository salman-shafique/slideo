<?php

namespace App\Entity;

use DateTime;
use Gedmo\Mapping\Annotation as Gedmo;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Gedmo\Timestampable\Traits\TimestampableEntity;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @UniqueEntity(fields={"email"}, message="There is already an account with this email")
 */
class User implements UserInterface
{

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = ["ROLE_USER"];

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $fullname;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isVerified = false;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $googleId;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $facebookId;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $picture = "/favicon/favicon-128.png";

    /**
     * @ORM\OneToMany(targetEntity=Presentation::class, mappedBy="owner")
     */
    private $presentations;

    /**
     * @var DateTime $created
     *
     * @Gedmo\Timestampable(on="create")
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $created;

    /**
     * @var DateTime $updated
     *
     * @Gedmo\Timestampable(on="update")
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updated;

    /**
     * @ORM\OneToOne(targetEntity=Notifications::class, mappedBy="owner", cascade={"persist", "remove"})
     */
    private $notifications;

    /**
     * @ORM\OneToMany(targetEntity=UploadedImage::class, mappedBy="owner")
     */
    private $uploadedImages;

    /**
     * @ORM\ManyToOne(targetEntity=Company::class, inversedBy="users")
     */
    private $company;

    public function __construct()
    {
        $this->presentations = new ArrayCollection();
        $this->uploadedImages = new ArrayCollection();
    }

    public function __toString()
    {
        return $this->fullname;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;

        return array_unique($roles);
    }

    public function addRole(string $role): self
    {
        $this->roles[] = $role;

        return $this;
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string)$this->email;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFullname(): ?string
    {
        return $this->fullname;
    }

    public function setFullname(string $fullname): self
    {
        $this->fullname = $fullname;

        return $this;
    }

    public function getIsVerified(): ?bool
    {
        return $this->isVerified;
    }

    public function setIsVerified(bool $isVerified): self
    {
        $this->isVerified = $isVerified;

        return $this;
    }

    public function getGoogleId(): ?string
    {
        return $this->googleId;
    }

    public function setGoogleId(?string $googleId): self
    {
        $this->googleId = $googleId;

        return $this;
    }

    public function getFacebookId(): ?string
    {
        return $this->facebookId;
    }

    public function setFacebookId(?string $facebookId): self
    {
        $this->facebookId = $facebookId;

        return $this;
    }

    public function getPicture(): ?string
    {
        return $this->picture;
    }

    public function setPicture(?string $picture): self
    {
        $this->picture = $picture;

        return $this;
    }


    public function getUserType(): ?string
    {
        if ($this->getGoogleId() != null)
            return "Google";
        else if ($this->getFacebookId() != null)
            return "Facebook";
        else  return "Email";
    }

    /**
     * @return Collection|Presentation[]
     */
    public function getPresentations(): Collection
    {
        return $this->presentations;
    }

    public function addPresentation(Presentation $presentation): self
    {
        if (!$this->presentations->contains($presentation)) {
            $this->presentations[] = $presentation;
            $presentation->setOwner($this);
        }

        return $this;
    }

    public function removePresentation(Presentation $presentation): self
    {
        if ($this->presentations->contains($presentation)) {
            $this->presentations->removeElement($presentation);
            // set the owning side to null (unless already changed)
            if ($presentation->getOwner() === $this) {
                $presentation->setOwner(null);
            }
        }

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

    public function getFirstLetters()
    {
        $splittedFullname = explode(" ", $this->fullname);
        if (count($splittedFullname) >= 2)
            return $splittedFullname[0][0] . $splittedFullname[1][0];
        else
            return $this->fullname[0][0];
    }

    public function getNotifications(): ?Notifications
    {
        return $this->notifications;
    }

    public function setNotifications(Notifications $notifications): self
    {
        $this->notifications = $notifications;

        // set the owning side of the relation if necessary
        if ($notifications->getOwner() !== $this) {
            $notifications->setOwner($this);
        }

        return $this;
    }

    /**
     * @return Collection|UploadedImage[]
     */
    public function getUploadedImages(): Collection
    {
        return $this->uploadedImages;
    }

    public function addUploadedImage(UploadedImage $uploadedImage): self
    {
        if (!$this->uploadedImages->contains($uploadedImage)) {
            $this->uploadedImages[] = $uploadedImage;
            $uploadedImage->setOwner($this);
        }

        return $this;
    }

    public function removeUploadedImage(UploadedImage $uploadedImage): self
    {
        if ($this->uploadedImages->removeElement($uploadedImage)) {
            // set the owning side to null (unless already changed)
            if ($uploadedImage->getOwner() === $this) {
                $uploadedImage->setOwner(null);
            }
        }

        return $this;
    }

    public function getCompany(): ?Company
    {
        return $this->company;
    }

    public function setCompany(?Company $company): self
    {
        $this->company = $company;

        return $this;
    }


}
