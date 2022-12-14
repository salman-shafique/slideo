<?php

namespace App\Service;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use App\Entity\Notifications;

class AccountService
{
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function changeEmail(Request $request, User $user): array
    {
        $newEmail = $request->request->get('new_email');
        /** @var UserRepository $userRepository */
        $userRepository = $this->em->getRepository(User::class);

        // Check if it exists
        $existingEmail = $userRepository->findOneBy(['email' => $newEmail]);
        if ($existingEmail)
            return [
                'success' => false,
                'descr' => 'Not available'
            ];

        // todo verify email
        $user->setEmail($newEmail);
        $this->em->persist($user);
        $this->em->flush();

        return ['success' => true];
    }

    public function changeFullname(Request $request, User $user): array
    {
        $newFullname = $request->request->get('new_fullname');

        $user->setFullname($newFullname);
        $this->em->persist($user);
        $this->em->flush();

        return ['success' => true];
    }

    public function changeAvatar(Request $request, User $user): array
    {
        /** @var UploadedFile $image */
        $image = $request->files->get('image');
        $mimeType = explode("/", $image->getMimeType())[0];

        if ($mimeType != "image")
            return [
                'success' => false,
                'descr' => 'Please upload an image'
            ];

        if ($image->getSize() > 200000)
            return [
                'success' => false,
                'descr' => 'Max file size exceed'
            ];

        $newFilename = hash('md2', uniqid()) . '.' . $image->getClientOriginalExtension();
        $image->move(
            "uploads/user/" . $user->getId(),
            $newFilename
        );
        $url = "/uploads/user/" . $user->getId() . "/$newFilename";

        $user->setPicture($url);
        $this->em->persist($user);
        $this->em->flush();

        return [
            'success' => true,
            'url' => $url
        ];
    }

    public function browserNotifications(User $user, $val): array
    {
        $val == "true" ? $val = true : $val = false;

        $notifications = $user->getNotifications();

        if (!$notifications) {
            $notifications = new Notifications();
            $user->setNotifications($notifications);
            $this->em->persist($user);
        }

        $notifications->setBrowserNotifications($val);
        $this->em->persist($notifications);
        $this->em->flush();
        return ['success' => true];
    }

    public function productUpdates(User $user, $val): array
    {
        $val == "true" ? $val = true : $val = false;

        $notifications = $user->getNotifications();

        if (!$notifications) {
            $notifications = new Notifications();
            $user->setNotifications($notifications);
            $this->em->persist($user);
        }

        $notifications->setProductUpdates($val);
        $this->em->persist($notifications);
        $this->em->flush();
        return ['success' => true];
    }
}
