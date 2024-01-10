import React, {useEffect, useState} from "react";

export interface Product {
    active: boolean;
    createdAt: Date;
    description: string;
    id: number;
    imageName: string;
    name: string;
    price: number;
    // StripeProductId: string;
    // StripePriceId: string;
}

export default function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);


    useEffect(() => {
        console.log("useEffect is running");
        fetch('/api/products')
          .then(response => response.json())
          .then(json => setProducts(json));
      }, []);
      

    return products;
}