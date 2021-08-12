<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationFormType;
use App\Service\TraitAware\EntityManagerAware;
use App\Security\LoginFormAuthenticator;
use App\Service\MailService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Guard\GuardAuthenticatorHandler;
use Symfony\Component\HttpFoundation\JsonResponse;

class RegistrationController extends AbstractController
{


//    /**
//     * @Route("/register", name="app_register")
//     */
    public function register(Request $request, UserPasswordEncoderInterface $passwordEncoder, GuardAuthenticatorHandler $guardHandler, LoginFormAuthenticator $authenticator, MailService $mailService): Response
    {
        if ($this->getUser()) {
            return $this->redirectToRoute("index");
        }

        $form = $this->createForm(RegistrationFormType::class);
        $form->handleRequest($request);

        if ($form->isSubmitted()) {

            $entityManager = $this->getDoctrine()->getManager();

            $checkEmail = $entityManager
                ->createQueryBuilder()
                ->from('App\Entity\User', 'u')
                ->select('u')
                ->where("u.email = :email")
                ->setParameter('email', $form->get('email')->getData())
                ->getQuery()
                ->execute();

            if ($checkEmail) {
                return $this->render('registration/register.html.twig', [
                    'registrationForm' => $form->createView()
                ]);
            }
            if ($form->get('plainPassword')->get('first')->getData() != $form->get('plainPassword')->get('second')->getData())
                return $this->render('registration/register.html.twig', [
                    'registrationForm' => $form->createView()
                ]);

            $user = new User();
            // encode the plain password
            $user->setPassword(
                $passwordEncoder->encodePassword(
                    $user,
                    $form->get('plainPassword')->get('first')->getData()
                )
            );
            $user->setFullname($form->get("fullname")->getData());
            $user->setEmail($form->get("email")->getData());
            $entityManager->persist($user);
            $entityManager->flush();

            $mailService->sendVerificationMail($form->get("email")->getData());

            return $guardHandler->authenticateUserAndHandleSuccess(
                $user,
                $request,
                $authenticator,
                'main' // firewall name in security.yaml
            );
        }

        return $this->render('registration/register.html.twig', [
            'registrationForm' => $form->createView()
        ]);
    }

    /**
     * @Route("/verifyMail", methods={"GET"})
     */
    public function verifyMail(Request $request, MailService $mailService)
    {
        $r = $mailService->verifyMail($request);
        return $this->redirect("/");
    }
}
