<?php

namespace App\DataFixtures;

use App\Entity\ColorTemplate;
use App\Entity\User;
use App\Enum\ColorTemplatesEnum;
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

        foreach (ColorTemplatesEnum::TEMPLATES as $key => $template) {
            $colorTemplate = new ColorTemplate();
            $colorTemplate->setTitle($template['title']);
            $colorTemplate->setDescription($template['description']);

            $colorTemplate->setACCENT1($template['ACCENT_1']);
            $colorTemplate->setACCENT2($template['ACCENT_2']);
            $colorTemplate->setACCENT3($template['ACCENT_3']);
            $colorTemplate->setACCENT4($template['ACCENT_4']);
            $colorTemplate->setACCENT5($template['ACCENT_5']);
            $colorTemplate->setACCENT6($template['ACCENT_6']);
            $colorTemplate->setBACKGROUND1($template['BACKGROUND_1']);
            $colorTemplate->setBACKGROUND2($template['BACKGROUND_2']);
            $colorTemplate->setTEXT1($template['TEXT_1']);
            $colorTemplate->setTEXT2($template['TEXT_2']);
            $manager->persist($colorTemplate);
        }

        $manager->flush();
    }
}
