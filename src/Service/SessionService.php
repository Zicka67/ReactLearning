<?php

namespace App\Service;

use Doctrine\Common\Collections\ArrayCollection;
use App\Entity\Product;
use App\Model\ShoppingCart;
use App\Model\ShoppingCartItem;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class SessionService
{
    public const SHOPPING_CART = "shoppingCart";

    public function __construct(private RequestStack $requestStack)
    {
       
    }

    public function getShoppingCart(): ShoppingCart
    {
        return $this->getSession()->get(self::SHOPPING_CART, new ShoppingCart());
    }

    public function addItemToShoppingCart(Product $product) 
    {
        $shoppingCart = $this->getShoppingCart();

        $existingShoppingCartItem = $this->getExistingShoppingCardItem($product);

        if ($existingShoppingCartItem) {
            $existingShoppingCartItem->quantity++;
        } else {
            $shoppingCart->items->add(new ShoppingCartItem($product, 1));
        }

        $this->getSession()->set(self::SHOPPING_CART, $shoppingCart);
    }

    public function removeItemFromShoppingCart(Product $product) {

        $shoppingCart = $this->getShoppingCart();

        $existingShoppingCartItem = $this->getExistingShoppingCardItem($product);

        if (null === $existingShoppingCartItem) {
            return;
        }

        $shoppingCart->items->removeElement($existingShoppingCartItem);

        $reindexedItems = array_values($shoppingCart->items->toArray());

        $shoppingCart->items = new ArrayCollection($reindexedItems);

        $this->getSession()->set(self::SHOPPING_CART, $shoppingCart);

    }

    private function getExistingShoppingCardItem(Product $product)
    {
        $existingShoppingCartItem = $this
            ->getShoppingCart()
            ->items
            ->filter(fn (ShoppingCartItem $item) => $item->product->getId() )
            ->first();

            if (false == $existingShoppingCartItem) {
                return null;
            }

            return $existingShoppingCartItem;
    }

   
    private function getSession() : SessionInterface
    {
        return $this->requestStack->getSession();
    }




}