<?php

namespace App\Controller;

use phpDocumentor\Reflection\Types\Boolean;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use App\Enum\LanguagesEnum;
use App\Service\MailService;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mime\Address;

class HomeController extends AbstractController
{
    /**
     * @Route("/")
     */
    public function index()
    {
        return $this->render('homepage/index.html.twig');
    }
    /**
     * @Route("/locale/{lang}")
     * @return Response
     */
    public function locale(Request $request, String $lang)
    {

        if (in_array($lang, LanguagesEnum::ENABLED_LOCALES)) {
            $referer = $request->headers->get('referer');

            $request->setLocale($lang);
            $request->getSession()->set('_locale', $lang);

            if (strpos($referer, "slideo.co.il") !== false || strpos($referer, "localhost") !== false) {
                return $this->redirect($referer);
            } else {
                return $this->redirectToRoute('index');
            }
        } else
            throw $this->createNotFoundException('The language does not exist.');
    }

    /**
     * @Route("/pricing", name="pricing")
     */
    public function pricing()
    {
        return $this->render('pricing/index.html.twig');
    }

    /**
     * @Route("/contactUs",methods={"POST"})
     */
    public function contactUs(Request $request, MailService $mailService)
    {
        $toAdmins = (new TemplatedEmail())
            ->from(new Address('no-reply@slideo.co.il', 'Slideo'))
            ->to(new Address('alperenberatdurmus@gmail.com', 'Alperen'))
            ->addTo(new Address('elad.darmon@gmail.com', 'Elad'))
            ->subject('Slideo - Main page feedback')
            ->htmlTemplate('emails/feedback.html.twig')
            ->context([
                'fullname' => $request->request->get("fullname"),
                'email_' => $request->request->get("email"),
                'subject' => $request->request->get("subject"),
                'content' => $request->request->get("content")
            ]);
        $toUser = (new TemplatedEmail())
            ->from(new Address('no-reply@slideo.co.il', 'Slideo'))
            ->to(new Address($request->request->get("email"), $request->request->get("fullname")))
            ->subject('We have got your feedback!')
            ->htmlTemplate('emails/base.html.twig')
            ->context([
                'title' => "We have got your feedback!",
                'body' => "Thanks for sharing your opinions. We will try to contact you as soon as possible."
            ]);
        $mailService->sendMail($toAdmins);
        $mailService->sendMail($toUser);

        return new JsonResponse(["success" => true]);
    }
}
