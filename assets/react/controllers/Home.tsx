import React, { useState } from "react";
import Header from "./Header";
import ProductGrid from './ProductGrid';
import useShoppingCart from '../hooks/useShoppingCart';
// import ButtonAppBar from "./testNavBar";
// import SignInSide from "./SignInSide";



export default function Home(): React.JSX.Element {

    const {addItemToShoppingCart, shoppingCart: ShoppingCart} = useShoppingCart();

        return (
            <>
                {/* <ButtonAppBar /> */}
                {/* <SignInSide /> */}
                {/* <Header shoppingCart={ShoppingCart}/> */}
                <ProductGrid addItemToShoppingCart={addItemToShoppingCart} shoppingCart={ShoppingCart}/>
            </>
        )
    }
