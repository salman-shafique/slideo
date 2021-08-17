<?php

namespace App\MessageHandler;

use App\Entity\Presentation;
use App\Service\FlaskService;
use Exception;
use Symfony\Component\Messenger\Handler\MessageHandlerInterface;
use App\Service\MailService;
use Doctrine\ORM\EntityManagerInterface;

class ThumbnailHandler implements MessageHandlerInterface
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

    public function __invoke(Presentation $presentation)
    {

        // invoke the flask server
        $r = $this->flaskService->call(
            "Presentation",
            "thumbnail",
            [
                'presentation_hash' => $presentation->getPresentationId(),
                'presentation_id' => $presentation->getId()
            ]
        );
    }
}
