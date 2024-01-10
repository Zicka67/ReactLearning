import React from "react";
import Header from "./Header";
import ProductGrid from './ProductGrid';
// import ButtonAppBar from "./testNavBar";



export default function Home(): React.JSX.Element {

        return (
            <>
                {/* <ButtonAppBar /> */}
                <Header />
                <ProductGrid />
            </>
        )
    }
