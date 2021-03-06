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
use Symfony\Component\Messenger\MessageBusInterface;

class StartFailedDownloads extends Command
{
    protected static $defaultName = 'slideo:download:retry';
    private $em;
    private $bus;

    public function __construct(EntityManagerInterface $em, MessageBusInterface $bus)
    {
        $this->em = $em;
        $this->bus = $bus;
        parent::__construct();
    }

    protected function configure()
    {
        $this->setDescription('Retries the failed downloads');
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
            ->where("d.completed = 0")
            ->getQuery()
            ->getResult();

        if (count($downloads) > 0) {
            $io->success(sprintf('%d failed downloads are found.', count($downloads)));
            $addedDownloads = [];
            foreach ($downloads as $download) {
                if (!in_array($download->getId(), $addedDownloads)) {
                    $this->bus->dispatch($download);
                    array_push($addedDownloads, $download->getId());
                } else {
                    $this->em->remove($download);
                }
            }
            $io->success(sprintf('%d failed downloads were added to queue.', count($addedDownloads)));
        } else {
            $io->success("No download failed");
        }

        return 0;
    }
}
