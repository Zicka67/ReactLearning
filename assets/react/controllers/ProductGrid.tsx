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
        <Grid container spacing={2} marginTop={5}>
        {products?.map((product) => (
            <Grid item key={product.id} xs={3}> 
                <Box sx={{ width: 300, height: 300, m: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '100px' }}>
                    <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Stack direction="column" spacing={2}>
                            <Box sx={{ width: 250, height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                            <img src={`/images/products/${product.imageName}`} alt={product.name} style={{ width: 'auto', maxHeight: '100%' }} />
                            </Box>
                            <Typography variant="h6" gutterBottom>
                                {product.name}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography variant="h6" color="secondary">
                                    {formatPrice(product.price)}
                                </Typography>
                            </Box>
                            <Button variant="outlined"
                                color="primary"
                                endIcon={<ShoppingBasket />}
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