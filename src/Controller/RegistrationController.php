<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationFormType;
use App\Security\EmailVerifier;
use App\Service\TraitAware\EntityManagerAware;
use App\Security\LoginFormAuthenticator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Guard\GuardAuthenticatorHandler;
use SymfonyCasts\Bundle\VerifyEmail\Exception\VerifyEmailExceptionInterface;

class RegistrationController extends AbstractController
{

    private $emailVerifier;

    public function __construct(EmailVerifier $emailVerifier)
    {
        $this->emailVerifier = $emailVerifier;
    }

    /**
     * @Route("/register", name="app_register")
     */
    public function register(Request $request, UserPasswordEncoderInterface $passwordEncoder, GuardAuthenticatorHandler $guardHandler, LoginFormAuthenticator $authenticator, \Swift_Mailer $mailer): Response
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
            $user->addRole("ROLE_USER");
            $entityManager->persist($user);
            $entityManager->flush();


            $signatureComponents = $this->emailVerifier->getSignatureComponents(
                'app_verify_email',
                $user
            );

            $email = (new \Swift_Message('Please Confirm your Email - Slideo'))
                ->setFrom('alperenberatdurmus@gmail.com')
                ->setTo($user->getEmail())
                ->setBody(
                    $this->renderView(
                        'emails/registration/confirmation_email.html.twig',
                        [
                            'signedUrl' => $signatureComponents->getSignedUrl(),
                            'expiresAt' => $signatureComponents->getExpiresAt()
                        ]
                    ),
                    'text/html'
                );

            $mailer->send($email);

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
     * @Route("/verify/email", name="app_verify_email")
     */
    public function verifyUserEmail(Request $request): Response
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        // validate email confirmation link, sets User::isVerified=true and persists
        try {
            $this->emailVerifier->handleEmailConfirmation($request, $this->getUser());
        } catch (VerifyEmailExceptionInterface $exception) {
            $this->addFlash('error', $exception->getReason());

            return $this->redirectToRoute('index');
        }

        // @TODO Change the redirect on success and handle or remove the flash message in your templates
        $this->addFlash('success', 'Your email address has been verified.');

        return $this->redirectToRoute('index');
    }
}
