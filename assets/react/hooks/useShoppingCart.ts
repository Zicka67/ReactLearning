import React, {useEffect, useState} from "react";
import {Product} from "./useProducts";

export interface ShoppingCart {
   items: Product[];
}

export interface ShoppingCartItem {
    product: Product;
    quantity: number;
}

export default function useShoppigCart() {
  const [shoppingCart, setShoppingCart] = useState<ShoppingCart>({ items: [] });
  const [loading, setLoading] = useState(false);

    const addItemToShoppingCart = (product : Product) => {
      console.log('Ajout du produit avec l\'ID:', product.id);
        setLoading(true);
        fetch(`/session/shopping-cart/${product.id}`, {
            method: 'POST'
        })
          .then(response => response.json())
          .then(json => setShoppingCart(json))
          .finally(() => {
            setLoading(false);
          });
    }

    const removeItemFromShoppingCart = (product : Product) => {
        setLoading(true);
        fetch(`/session/shopping-cart/${product.id}`, {
            method: 'DELETE'
        })
          .then(response => response.json())
          .then(json => setShoppingCart(json))
          .finally(() => {
            setLoading(false);
          });
    }

    useEffect(() => {
      setLoading(true);
      fetch(`/session/shopping-cart`)
        .then(response => response.json())
        .then(json => setShoppingCart(json))
        .catch((error) => console.error('Error fetching shopping cart:', error)) 
        .finally(() => {
          setLoading(false);
        });
    }, []);
      

    return {
        addItemToShoppingCart,
        shoppingCart,
        loading,
        removeItemFromShoppingCart
    };


    
}