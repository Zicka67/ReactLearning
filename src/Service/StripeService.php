<?php
namespace App\Service;

use Stripe\Price;
use App\Entity\Product;
use Stripe\StripeClient;

class StripeService
{
    private StripeClient $stripe;

    /** 
    * @throws ApiErrorException
    */

    public function createProduct(Product $product): \Stripe\Product
    {
        return $this->getStripe()->products->create([
            'name'=>$product->getName(),
            'description'=>$product->getDescription(),
            'active'=>$product->isActive()
        ]);
    }

    public function createPrice(Product $product): Price
    {
        return $this->getStripe()->prices->create([
            'unit_amount'=>$product->getPrice(),
            'currency'=>'EUR',
            'product'=>$product->getStripeProductId(),
        ]);
    }
    
    public function updateProduct(Product $product)
    {
        return $this->getStripe()->products->update($product->getStripeProductId(), [
            'name'=>$product->getName(),
            'description'=>$product->getDescription(),
            'active'=>$product->isActive()
        ]);
    }

    private function getStripe(): StripeClient
    {
        return $this->stripe ??= new StripeClient(
            $_ENV['STRIPE_API_SECRET']
        );
    }
}