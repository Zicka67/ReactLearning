<?php

namespace App\Controller;

use App\Service\SessionService;
use App\Service\StripeService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class StripeController extends AbstractController
{
    public function __construct(
        private readonly StripeService $stripeService
    )
    {
        
    }


    #[Route('/stripe/checkout-sessions', name: 'create_checkout_session', methods: ['POST', 'GET'] )]
    public function createCheckoutSession(SessionService $sessionService): Response
    {
        return $this->json([
            'url' => $this->stripeService->createCheckoutSession($sessionService->getShoppingCart())->url
        ]);
    }
}