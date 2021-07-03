<?php

namespace App\MessageHandler;

use App\Entity\DownloadPresentation;
use App\Service\FlaskService;
use Exception;
use Symfony\Component\Messenger\Handler\MessageHandlerInterface;
use Symfony\Component\Mailer\MailerInterface;
use App\Service\MailService;
use DateTime;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\EventListener\ErrorListener;
use Symfony\Component\Mime\Address;

class DownloadHandler implements MessageHandlerInterface
{
    private $em;
    private $flaskService;
    private $mailService;

    public function __construct(EntityManagerInterface $em, FlaskService $flaskService, MailService $mailService)
    {
        $this->em = $em;
        $this->flaskService = $flaskService;
        $this->mailService = $mailService;
    }

    public function __invoke(DownloadPresentation $downloadPresentation)
    {
        /**  @var DownloadPresentation $downloadPresentation */
        $downloadPresentation = $this->em
            ->createQueryBuilder()
            ->select('d')
            ->from('App\Entity\DownloadPresentation', 'd')
            ->where("d.id = :id")
            ->setParameter("id", $downloadPresentation->getId())
            ->getQuery()
            ->getOneOrNullResult();
        if ($downloadPresentation->getCompleted()) return;

        // invoke the flask server
        $r = $this->flaskService->call(
            "Presentation",
            "create",
            [
                'downloadPresentationId' => $downloadPresentation->getId(),
                'presentationId' => $downloadPresentation->getPresentation()->getId(),
                'isPaid' => $downloadPresentation->getIsPaid()
            ]
        );

        if (!$r['success'])
            $this->mailService->sendErrorMail(json_encode($r));
        else if ($downloadPresentation->getPresentation()->getOwner()) {
            $presentation = $downloadPresentation->getPresentation();
            $email = (new TemplatedEmail())
                ->from(new Address('no-reply@slideo.co.il', 'Slideo'))
                ->to(new Address(
                    $presentation->getOwner()->getEmail(),
                    $presentation->getOwner()->getFullname()
                ))
                ->subject('Your download is ready')
                ->htmlTemplate('emails/base.html.twig')
                ->context([
                    'title' => "Your download is ready",
                    'body' => '
                        <div style="text-align:center">
                            <img src="' . getenv('APP_DOMAIN') . $downloadPresentation->getPrevFile() . '"/>
                            <br>
                            <a href="' . getenv('APP_DOMAIN') . $downloadPresentation->getPptxFile() . '">' . $presentation->getTitle() . '.pptx</a>
                            <br>
                            <a href="' . getenv('APP_DOMAIN') . $downloadPresentation->getPdfFile() . '">' . $presentation->getTitle() . '.pdf</a>
                            <br>
                            You can go to <a href="' . getenv('APP_DOMAIN') . '/editor/' . $presentation->getPresentationId() . '/download">downloads</a> page account in order to see all downloads.
                        </div>
                            '
                ]);
            $this->mailService->sendMail($email);
        }
    }
}
