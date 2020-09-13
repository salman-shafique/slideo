<?php

namespace App\Controller;

use App\Repository\PostRepository;
use phpDocumentor\Reflection\Types\Boolean;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class HomeController extends AbstractController
{
    /**
     * @Route("/")
     * @param PostRepository $postRepository
     */
    public function index(PostRepository $postRepository)
    {
        $posts = $postRepository->findLatest();
        return $this->render('index.html.twig', ['posts' => $posts]);
    }
    /**
     * @Route("/team")
     */
    public function team()
    {
        return $this->render('team.html.twig');
    }

    /**
     * @Route("/contact", options={"expose"= true}, methods={"POST"})
     * @param Request $request
     * @param MailerInterface $mailer
     * @return JsonResponse
     */
    public function contact(Request $request, MailerInterface $mailer): JsonResponse
    {

        $company = $request->get("company");
        $email = $request->get("email");
        $message = $request->get("message");
        $name = $request->get("name");

        $email = (new Email())
            ->from('hybridcorealpha@gmail.com')
            ->to('hybridcorealpha@gmail.com')
            ->replyTo($request->get("email"))
            ->priority(Email::PRIORITY_HIGH)
            ->subject('Hybridcore - New message from ' . $request->get("name"))
            ->html("<p>
            Company: $company<br>
            Name: $name<br>
            Email: $email<br>
            Message: $message<br>
            </p>");

        $mailer->send($email);
        return new JsonResponse([
            'success' => true
        ]);
    }
}
