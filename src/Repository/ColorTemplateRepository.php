<?php

namespace App\Repository;

use App\Entity\ColorTemplate;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ColorTemplate|null find($id, $lockMode = null, $lockVersion = null)
 * @method ColorTemplate|null findOneBy(array $criteria, array $orderBy = null)
 * @method ColorTemplate[]    findAll()
 * @method ColorTemplate[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ColorTemplateRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ColorTemplate::class);
    }

    // /**
    //  * @return ColorTemplate[] Returns an array of ColorTemplate objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ColorTemplate
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
