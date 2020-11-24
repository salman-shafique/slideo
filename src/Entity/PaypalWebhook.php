<?php

namespace App\Entity;

use App\Repository\PaypalWebhookRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=PaypalWebhookRepository::class)
 */
class PaypalWebhook
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $webhookId;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $resourceType;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $eventType;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $summary;

    /**
     * @ORM\Column(type="json")
     */
    private $resource = [];

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $eventVersion;

    /**
     * @ORM\Column(type="date", nullable=true)
     */
    private $createTime;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getWebhookId(): ?string
    {
        return $this->webhookId;
    }

    public function setWebhookId(?string $webhookId): self
    {
        $this->webhookId = $webhookId;

        return $this;
    }

    public function getResourceType(): ?string
    {
        return $this->resourceType;
    }

    public function setResourceType(?string $resourceType): self
    {
        $this->resourceType = $resourceType;

        return $this;
    }

    public function getEventType(): ?string
    {
        return $this->eventType;
    }

    public function setEventType(?string $eventType): self
    {
        $this->eventType = $eventType;

        return $this;
    }

    public function getSummary(): ?string
    {
        return $this->summary;
    }

    public function setSummary(?string $summary): self
    {
        $this->summary = $summary;

        return $this;
    }

    public function getResource(): ?array
    {
        return $this->resource;
    }

    public function setResource(array $resource): self
    {
        $this->resource = $resource;

        return $this;
    }

    public function getEventVersion(): ?string
    {
        return $this->eventVersion;
    }

    public function setEventVersion(?string $eventVersion): self
    {
        $this->eventVersion = $eventVersion;

        return $this;
    }

    public function getCreateTime(): ?\DateTimeInterface
    {
        return $this->createTime;
    }

    public function setCreateTime(?\DateTimeInterface $createTime): self
    {
        $this->createTime = $createTime;

        return $this;
    }
}
