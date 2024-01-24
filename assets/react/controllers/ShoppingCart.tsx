import React from "react";
import useShoppingCart from "../hooks/useShoppingCart";
import Header from "./Header";
import {Box, Button, Container, Grid, Typography} from "@mui/material";
import ShoppingCartTable from "./ShoppingCartTable";
import { visit } from "../../utils";

export default function ShoppingCart(){

    const {removeItemFromShoppingCart, shoppingCart} = useShoppingCart();

    const createCheckoutSession = () => {
        fetch('/stripe/checkout-sessions', {
            method: 'POST',
        })
        .then(response => response.json())
        .then(json => {
            visit(json['url']);
            });
    }

    return (
        <>
            <Header shoppingCart={shoppingCart} />
            <Container>
                <Box marginY={5}> 
                    <Grid container justifyContent="space-between" alignContent="center">
                        <Grid item>
                            <Typography variant="h5">Votre panier</Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={createCheckoutSession}>
                                Procéder au paiement
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                <ShoppingCartTable 
                removeItemFromShoppingCart={removeItemFromShoppingCart}
                shoppingCart={shoppingCart}
                />
            </Container>
     
        </>
    )
}