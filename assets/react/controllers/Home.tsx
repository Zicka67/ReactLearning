import React from "react";
import Header from "./Header";
import ProductGrid from './ProductGrid';
import useShoppingCart from '../hooks/useShoppingCart';

export default function Home(): React.JSX.Element {
    const {addItemToShoppingCart, shoppingCart} = useShoppingCart();
    const isHomePage = window.location.pathname === '/'; 

    return (
        <>
            <Header shoppingCart={shoppingCart}/>
            {isHomePage && <ProductGrid addItemToShoppingCart={addItemToShoppingCart} shoppingCart={shoppingCart}/>}
        </>
    );
}
