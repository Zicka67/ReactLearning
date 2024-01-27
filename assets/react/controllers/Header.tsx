import React from "react";
import { AppBar, Badge, Grid, IconButton, Toolbar, Typography, Button } from "@mui/material";
import  StoreIcon from "@mui/icons-material/Store";
import  ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { visit } from "../../utils";


export default function Header({ shoppingCart }) {
        const showHome = () => {
        visit( '/');
    }

    const showShoppingCart = () => {
        visit( '/shopping-cart');
    }

    const calculateTotalQuantity = () => {
        return shoppingCart?.items?.map((item) => item.quantity).reduce((a,b) => a + b, 0);
    }

    return (
        <>
            <AppBar position="fixed" style={{ width: '100%', zIndex: 1100 }}>
                <Toolbar>
                    <Grid container justifyContent="space-between" alignItems="center" style={{ width: '100%' }}>
                        <Grid item>
                            <IconButton color="inherit" onClick={showHome}>
                                <StoreIcon />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <Button color="inherit" onClick={() => visit('/')}>Accueil</Button>
                            <Button color="inherit" onClick={() => visit('/admin')}>Admin</Button>
                            <Button color="inherit" onClick={() => visit('/register')}>S'inscrire</Button>
                            <Button color="inherit" onClick={() => visit('/login')}>Se connecter</Button>
                        </Grid>
                        <Grid item>
                            <IconButton color="inherit" onClick={showShoppingCart}>
                                <Badge badgeContent={calculateTotalQuantity()} color="secondary">
                                    <ShoppingBasketIcon />
                                </Badge>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <div style={{ height: '100px' }}></div> 
        </>
    )


}
