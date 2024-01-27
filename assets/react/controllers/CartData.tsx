import React from "react";
import Header from "./Header";
import useShoppingCart from '../hooks/useShoppingCart';

export default function Home(): React.JSX.Element {

    const {shoppingCart: ShoppingCart} = useShoppingCart();

        return (
            <>
                <Header shoppingCart={ShoppingCart}/>

            </>
        )
    }
