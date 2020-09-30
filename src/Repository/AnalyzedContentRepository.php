<?php

namespace App\Repository;

use App\Entity\AnalyzedContent;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method AnalyzedContent|null find($id, $lockMode = null, $lockVersion = null)
 * @method AnalyzedContent|null findOneBy(array $criteria, array $orderBy = null)
 * @method AnalyzedContent[]    findAll()
 * @method AnalyzedContent[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AnalyzedContentRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, AnalyzedContent::class);
    }

    // /**
    //  * @return AnalyzedContent[] Returns an array of AnalyzedContent objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('a.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?AnalyzedContent
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
