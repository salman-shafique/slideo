<?php

namespace App\Command;

use App\Entity\DownloadPresentation;
use App\Repository\CommentRepository;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Doctrine\ORM\EntityManagerInterface;
use DoctrineExtensions\Query\Mysql;

class ClearDownloads extends Command
{
    protected static $defaultName = 'slideo:clear:downloads';
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
        parent::__construct();
    }

    protected function configure()
    {
        $this->setDescription('Deletes the expired downloads');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        /**
         * @var DownloadPresentation[] $downloads
         */
        $downloads = $this->em
            ->createQueryBuilder()
            ->select('d')
            ->from('App\Entity\DownloadPresentation', 'd')
            ->where("d.completed = 1")
            ->andWhere("d.updated < :twoDaysAgo")
            ->setParameter("twoDaysAgo", new \DateTime("-2 days"))
            ->getQuery()
            ->getResult();
            
        if (count($downloads) > 0) {
            $io->success(sprintf('%d expired downloads are found.', count($downloads)));
            foreach ($downloads as $download) {
                $folder = dirname("/var/www/app/public" . $download->getPptxFile());
                unlink("/var/www/app/public" . $download->getPptxFile());
                unlink("/var/www/app/public" . $download->getPdfFile());
                unlink("/var/www/app/public" . $download->getPrevFile());
                rmdir($folder);
                $this->em->remove($download);
            }
            $this->em->flush();
            $io->success(sprintf('%d expired downloads were deleted.', count($downloads)));
        } else {
            $io->success("No download expired");
        }

        return 0;
    }
}
