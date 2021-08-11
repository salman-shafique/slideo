<?php

namespace App\EventSubscriber;

use App\Entity\User;
use EasyCorp\Bundle\EasyAdminBundle\Event\BeforeEntityPersistedEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserSubscriber implements EventSubscriberInterface
{

    private $passwordEncoder;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }

    public static function getSubscribedEvents()
    {
        return [
            BeforeEntityPersistedEvent::class => ['setUser'],
//            BeforeEntityUpdatedEvent::class => ['updateUser'],
        ];
    }

    public function setUser(BeforeEntityPersistedEvent $event)
    {
        $entity = $event->getEntityInstance();
        if ($entity instanceof User) {
            $plainPassword = $entity->getPassword();
            $plainPassword = empty($plainPassword) ? "123456789" : $plainPassword;
            $entity->setPassword(
                $this->passwordEncoder->encodePassword(
                    $entity, $plainPassword
                )
            );
        }
    }
}
