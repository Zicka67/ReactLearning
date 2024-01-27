<?php 

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationFormType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use SymfonyCasts\Bundle\VerifyEmail\VerifyEmailHelperInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use SymfonyCasts\Bundle\VerifyEmail\Exception\VerifyEmailExceptionInterface;

class RegisterController extends AbstractController
{
   
    #[Route('/register', name: 'app_register')]
    public function index(Request $request, UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $entityManager, VerifyEmailHelperInterface $verifyEmailHelper, MailerInterface $mailer): Response
    {
        $user = new User();
        $form = $this->createForm(RegistrationFormType::class, $user);
        $form->handleRequest($request);

         if ($form->isSubmitted() && $form->isValid()) {
            try {
                // Récupérer le mot de passe en clair
                $plainPassword = $form->get('plainPassword')->getData();
                // Hasher le mot de passe
                $hashedPassword = $passwordHasher->hashPassword($user, $plainPassword);
                $user->setPassword($hashedPassword);
                $user->setRoles(['ROLE_USER']);

                // Persiste l'objet utilisateur
                $entityManager->persist($user);
                $entityManager->flush();

                $signatureComponents = $verifyEmailHelper->generateSignature(
                    'app_verify_email', // La route qui gérera la vérification
                    $user->getId(),
                    $user->getEmail(),
                    ['id' => $user->getId()] // Les paramètres de la route
                );

                $expiresAtMessageKey = $signatureComponents->getExpirationMessageKey();
                $expiresAtMessageData = $signatureComponents->getExpirationMessageData();

                // Créer et envoyer l'email de vérification
                $email = (new TemplatedEmail())
                ->from('email@example.com')
                ->to($user->getEmail())
                ->subject('Confirmation de votre email')
                ->htmlTemplate('registration/confirmation_email.html.twig')
                ->context([
                    'signedUrl' => $signatureComponents->getSignedUrl(),
                    'expiresAtMessageKey' => $expiresAtMessageKey,
                    'expiresAtMessageData' => $expiresAtMessageData,
                ]);
            $mailer->send($email);

                // Ajoute un message flash et redirige vers une route de succès
                $this->addFlash('success', 'Inscription réussie.');
                return $this->redirectToRoute('app_home_index');
            } catch (UniqueConstraintViolationException $e) {
                // Attraper l'exception si l'email est déjà utilisé
                $this->addFlash('error', 'Cette adresse email est déjà utilisée par un autre compte.');
            }
        }

        return $this->render('security/register.html.twig', [
            'registrationForm' => $form->createView(),
        ]);
    }

    #[Route('/verify/email', name: 'app_verify_email')]
    public function verifyUserEmail(Request $request, EntityManagerInterface $entityManager, VerifyEmailHelperInterface $verifyEmailHelper): Response
    {
        $userId = $request->get('id'); 

        // Récupérez l'utilisateur depuis la base de données
        $user = $entityManager->getRepository(User::class)->find($userId);

        if (!$user) {
            $this->addFlash('error', 'Utilisateur non trouvé.');
            return $this->redirectToRoute('app_register');
        }

        try {
            $verifyEmailHelper->validateEmailConfirmation($request->getUri(), $user->getId(), $user->getEmail());

            $user->setVerified(true);
            $entityManager->persist($user);
            $entityManager->flush();    

            $this->addFlash('success', 'Votre email a été vérifié.');
            return $this->redirectToRoute('app_home_index'); 
        } catch (VerifyEmailExceptionInterface $exception) {
            $this->addFlash('error', 'Le lien de vérification nest pas valide.');
            return $this->redirectToRoute('app_register'); 
        }
    }
  
}
