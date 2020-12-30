<?php

namespace App\Entity;

use App\Repository\NotificationsRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=NotificationsRepository::class)
 */
class Notifications
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToOne(targetEntity=User::class, inversedBy="notifications", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $owner;

    /**
     * @ORM\Column(type="boolean")
     */
    private $productUpdates = true;

    /**
     * @ORM\Column(type="boolean")
     */
    private $browserNotifications = false;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(User $owner): self
    {
        $this->owner = $owner;

        return $this;
    }

    public function getProductUpdates(): ?bool
    {
        return $this->productUpdates;
    }

    public function setProductUpdates(bool $productUpdates): self
    {
        $this->productUpdates = $productUpdates;

        return $this;
    }

    public function getBrowserNotifications(): ?bool
    {
        return $this->browserNotifications;
    }

    public function setBrowserNotifications(bool $browserNotifications): self
    {
        $this->browserNotifications = $browserNotifications;

        return $this;
    }
}
