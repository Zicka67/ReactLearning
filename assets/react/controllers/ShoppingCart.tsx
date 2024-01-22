import React from "react";
import useShoppingCart from "../hooks/useShoppingCart";
import Header from "./Header";
import {Box, Button, Container, Grid, Typography} from "@mui/material";
import ShoppingCartTable from "./ShoppingCartTable";

export default function ShoppingCart(){

    const {removeItemFromShoppingCart, shoppingCart: ShoppingCart} = useShoppingCart();

    return (
        <>
            <Header shoppingCart={ShoppingCart} />
            <Container>
                <Box marginY={5}> 
                    <Grid container justifyContent="space-between" alignContent="center">
                        <Grid item>
                            <Typography variant="h5">Votre panier</Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary">
                                Procéder au paiement
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                <ShoppingCartTable 
                removeItemFromShoppingCart={removeItemFromShoppingCart}
                shoppingCart={ShoppingCart}
                />
            </Container>
     
        </>
    )
}