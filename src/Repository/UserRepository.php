<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    /**
     * @return User Returns a new user
     */
    public function createSocialUser(String $email, String $fullname, String $client, String $id)
    {
        $entityManager = $this->getDoctrine()->getManager();

        $user = new User();
        // encode the plain password
        $user->setPassword(
            $this->passwordEncoder->encodePassword(
                $user,
                "alp"
            )
        );
        $user->setEmail($email);
        $user->setFullname($fullname);
        $user->setIsVerified(true);
        switch ($client) {
            case 'google':
                $user->setGoogleId($id);
                break;
            default:
                # code...
                break;
        }
        $entityManager->persist($user);
        $entityManager->flush();
        return $user;
        // $message = (new \Swift_Message('Hello Email'))
        //     ->setFrom('send@example.com')
        //     ->setTo('recipient@example.com')
        //     ->setBody(
        //         $this->renderView(
        //             // templates/emails/registration.html.twig
        //             'emails/registration.html.twig',
        //             ['name' => $name]
        //         ),
        //         'text/html'
        //     )

        //     // you can remove the following code if you don't define a text version for your emails
        //     ->addPart(
        //         $this->renderView(
        //             // templates/emails/registration.txt.twig
        //             'emails/registration.txt.twig',
        //             ['name' => $name]
        //         ),
        //         'text/plain'
        //     );

        // $mailer->send($message);
    }

    // /**
    //  * @return User[] Returns an array of User objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('u.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?User
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
