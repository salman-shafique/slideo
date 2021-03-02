<?php

namespace App\MessageHandler;

use App\Entity\DownloadPresentation;
use App\Service\FlaskService;
use Exception;
use Symfony\Component\Messenger\Handler\MessageHandlerInterface;
use Symfony\Component\Mailer\MailerInterface;
use App\Service\MailService;

class DownloadHandler implements MessageHandlerInterface
{
    private $flaskService;
    private $mailService;

    public function __construct(FlaskService $flaskService, MailService $mailService)
    {
        $this->flaskService = $flaskService;
        $this->mailService = $mailService;
    }

    public function __invoke(DownloadPresentation $downloadPresentation)
    {
        if ($downloadPresentation->getCompleted()) return;

        // invoke the flask server
        $r = $this->flaskService->call(
            "Presentation",
            "create",
            [
                'downloadPresentationId' => $downloadPresentation->getId(),
                'presentationId' => $downloadPresentation->getPresentation()->getId()
            ]
        );

        if (!$r['success'])
            $this->mailService->sendErrorMail(json_encode($r));
    }
}
