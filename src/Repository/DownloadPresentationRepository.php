<?php

namespace App\Repository;

use App\Entity\DownloadPresentation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method DownloadPresentation|null find($id, $lockMode = null, $lockVersion = null)
 * @method DownloadPresentation|null findOneBy(array $criteria, array $orderBy = null)
 * @method DownloadPresentation[]    findAll()
 * @method DownloadPresentation[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DownloadPresentationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, DownloadPresentation::class);
    }

    // /**
    //  * @return DownloadPresentation[] Returns an array of DownloadPresentation objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('d.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?DownloadPresentation
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
