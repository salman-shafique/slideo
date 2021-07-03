<?php

namespace App\Service;

use App\Entity\User;
use App\Message\Sms;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Cache\Adapter\FilesystemAdapter;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Contracts\Cache\ItemInterface;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mime\RawMessage;
use Symfony\Component\Mime\Address;

class MailService
{
    private $em;
    private $security;
    private $cache;
    private $bus;


    public function __construct(EntityManagerInterface $em, Security $security, MessageBusInterface $bus)
    {
        $this->em = $em;
        $this->security = $security;
        $this->cache = new FilesystemAdapter();
        $this->bus = $bus;
    }

    public function sendVerificationMail(string $mailAddress = null)
    {
        if (!$mailAddress) {
            /**
             * @var User $user
             */
            $user = $this->security->getUser();
            $mailAddress = $user->getEmail();
        }

        $itemKey = "security.code.mail." . md5($mailAddress);
        $sentBefore = $this->cache->hasItem($itemKey);
        if ($sentBefore) $this->cache->delete($itemKey);

        $secret = $this->cache->get($itemKey, function (ItemInterface $item) {
            $item->expiresAfter(60 * 60);
            return [
                "key" => hash("sha256", rand(0, 99999), false),
                "value" => hash("sha256", rand(0, 99999), false)
            ];
        });
        $email = (new TemplatedEmail())
            ->from(new Address('no-reply@slideo.co.il', 'Slideo'))
            ->to($mailAddress)
            ->subject('Please verify your email')
            ->htmlTemplate('emails/verification.html.twig')
            ->context([
                'secret' => $secret,
                'host' => getenv("APP_DOMAIN")
            ]);
        $this->bus->dispatch($email);

        return ["success" => true];
    }

    public function verifyMail(Request $request)
    {
        /**
         * @var User $user
         */
        $user = $this->security->getUser();
        if (!$user)
            return ["success" => false, "descr" => "Not authorized"];

        $email = $user->getEmail();

        $itemKey = "security.code.mail." . md5($email);
        $itemExists = $this->cache->hasItem($itemKey);
        if (!$itemExists)
            return ["success" => false, "descr" => "Your security code has expired"];
        $secret = $this->cache->get($itemKey, function () {
        });

        $key = $secret['key'];
        $value = $secret['value'];
        $valueUser = $request->query->get($key);

        if ($value == $valueUser) {
            $user->setIsVerified(true);
            $this->em->persist($user);
            $this->em->flush();

            return ["success" => true, "descr" => "Your email successfully verified."];
        }

        return ["success" => false, "descr" => "Your security code has expired"];
    }

    public function sendErrorMail(string $error, $title = 'Error on Slideo')
    {
        $email = (new TemplatedEmail())
            ->from(new Address('no-reply@slideo.co.il', 'Slideo'))
            ->to("alperenberatdurmus@gmail.com")
            ->subject($title)
            ->htmlTemplate('emails/base.html.twig')
            ->context([
                'title' => $title,
                'body' => $error
            ]);
        $this->bus->dispatch($email);
    }

    public function sendMail(RawMessage $email)
    {
        $this->bus->dispatch($email);
    }
}
