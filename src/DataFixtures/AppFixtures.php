<?php

namespace App\DataFixtures;

use App\Entity\User;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{

    private $passwordEncoder;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }
    public function load(ObjectManager $manager)
    {
        $alperen = new User();
        $alperen->setPassword(
            $this->passwordEncoder->encodePassword(
                $alperen,
                "t7zRh8BhYCczPvD"
            )
        );
        $alperen->setFullname("Alperen");
        $alperen->setEmail("alperenberatdurmus@gmail.com");
        $alperen->addRole("ROLE_OWNER");
        $manager->persist($alperen);

        $manager->flush();
    }
}
