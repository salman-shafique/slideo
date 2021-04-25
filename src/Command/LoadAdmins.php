<?php

namespace App\Command;

use App\Entity\DownloadPresentation;
use App\Entity\User;
use App\Repository\CommentRepository;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Doctrine\ORM\EntityManagerInterface;
use DoctrineExtensions\Query\Mysql;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class LoadAdmins extends Command
{
    protected static $defaultName = 'slideo:load:admins';
    private $em;
    private $passwordEncoder;

    public function __construct(EntityManagerInterface $em, UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->em = $em;
        $this->passwordEncoder = $passwordEncoder;
        parent::__construct();
    }

    protected function configure()
    {
        $this->setDescription('Loads the admins');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $alperen = $this->em
            ->createQueryBuilder()
            ->select('u')
            ->from('App\Entity\User', 'u')
            ->where("u.email = :email")
            ->setParameter("email", "alperenberatdurmus@gmail.com")
            ->getQuery()
            ->getOneOrNullResult();
        if (!$alperen) {
            $alperen = new User;
            $alperen->setEmail("alperenberatdurmus@gmail.com");
            $alperen->setPassword(
                $this->passwordEncoder->encodePassword(
                    $alperen,
                    "testAlperen"
                )
            );
            $alperen->setFullname("Alperen");
            $alperen->setIsVerified(true);
            $alperen->addRole("ROLE_OWNER");
            $this->em->persist($alperen);
            $this->em->flush();
            $io->success("Alperen added");
        }

        $elad = $this->em
            ->createQueryBuilder()
            ->select('u')
            ->from('App\Entity\User', 'u')
            ->where("u.email = :email")
            ->setParameter("email", "elad.darmon@gmail.com")
            ->getQuery()
            ->getOneOrNullResult();
        if (!$elad) {
            $elad = new User;
            $elad->setEmail("elad.darmon@gmail.com");
            $elad->setPassword(
                $this->passwordEncoder->encodePassword(
                    $elad,
                    "testElad"
                )
            );
            $elad->setFullname("Elad");
            $elad->setIsVerified(true);
            $elad->addRole("ROLE_OWNER");
            $this->em->persist($elad);
            $this->em->flush();
            $io->success("Elad added");
        }
        $io->success("All completed");

        return 0;
    }
}
