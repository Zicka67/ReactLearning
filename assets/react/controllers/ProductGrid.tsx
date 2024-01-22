import React from "react";
import { Box, Grid, Paper, Typography, Button, Stack } from "@mui/material";
import useProducts, { Product } from "../hooks/useProducts";
import { formatPrice } from "../../utils";
import { ShoppingBasket } from "@mui/icons-material";

export default function ProductGrid({ addItemToShoppingCart, shoppingCart}) {
    const products = useProducts();

    const handleProductLabel = (product: Product) => {
        const productInShoppingCart  = shoppingCart?.items?.find(item => item.product.id === product.id);

        return productInShoppingCart ? `${productInShoppingCart.quantity} x` : 'Ajouter au panier';

    }

 
    return (
        <Grid container marginTop={5}>
         {products?.map((product) =>(
            <Grid item key={product.id} xs={4}>
                <Box sx={{ width: 300, m: 2 }}>
                    <Paper elevation={3} sx={{ p:2 }}>
                        <Stack direction="column" spacing={2}>
                            <Box component='img'sx={{ width: '100%', height: 'auto' }} src={`/images/products/${product.imageName}`}>
                            </Box>

                            <Typography variant="h6" gutterBottom>
                                {product.name}
                            </Typography>

                            <Box sx={{ display: 'flex', aligneItems: 'center', justifyContent: 'spaceContent' }}>
                                <Typography variant="h6" color="secondary">
                                    {formatPrice(product.price)}
                                </Typography>
                            </Box>

                            <Button variant="outlined" 
                                color="primary" 
                                endIcon={<ShoppingBasket/>}
                                onClick={() => addItemToShoppingCart(product)}
                            >
                            {handleProductLabel(product)}
                            </Button>
                        </Stack>
                    </Paper>
                </Box>
            </Grid>
          ))}
        </Grid>

        
    )
}