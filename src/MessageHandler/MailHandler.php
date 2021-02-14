<?php

namespace App\MessageHandler;

use App\Service\FlaskService;
use Symfony\Bridge\Twig\Mime\BodyRenderer;
use Symfony\Component\Messenger\Handler\MessageHandlerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mime\BodyRendererInterface;
use Twig\Environment;

class MailHandler implements MessageHandlerInterface
{
    private $flaskService;
    private $bodyRenderer;

    public function __construct(FlaskService $flaskService, Environment $twig)
    {
        $this->flaskService = $flaskService;
        $this->bodyRenderer = new BodyRenderer($twig);
    }

    public function __invoke(TemplatedEmail $email)
    {
        return;
        $this->bodyRenderer->render($email);
        $r = $this->flaskService->call(
            "Mailer",
            "send_mail",
            [
                "html_body" => $email->getHtmlBody(),
                "text_body" => $email->getTextBody(),
                "headers" => $email->getHeaders()->toString(),
                "token" => "9bcf0000f1b051544279c19a37babad4"
            ]
        );
        if (!$r['success'])
            throw new \Exception("Flask couldn't send the email...--" . json_encode($r));
    }
}