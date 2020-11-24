<?php

namespace App\Repository;

use App\Entity\PaypalWebhook;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method PaypalWebhook|null find($id, $lockMode = null, $lockVersion = null)
 * @method PaypalWebhook|null findOneBy(array $criteria, array $orderBy = null)
 * @method PaypalWebhook[]    findAll()
 * @method PaypalWebhook[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PaypalWebhookRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PaypalWebhook::class);
    }

    // /**
    //  * @return PaypalWebhook[] Returns an array of PaypalWebhook objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?PaypalWebhook
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
