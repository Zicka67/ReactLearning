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
        <AppBar position="static">
            <Toolbar>
                <Grid container justifyContent="space-between" alignItems="center" style={{ width: '100%' }}>
                    <Grid item>
                        <IconButton color="inherit" onClick={showHome}>
                            <StoreIcon/>
                        </IconButton>
                    </Grid>
                    {/* <div>
                        <h1>Hello World</h1>
                        <p>Ceci est un paragraphe HTML intégré dans un fichier .tsx.</p>
                    </div> */}
                    <Grid item>
                        <Button color="inherit" onClick={() => visit('/')}>Accueil</Button>
                        <Button color="inherit" onClick={() => visit('/admin')}>Admin</Button>
                        <Button color="inherit" onClick={() => visit('/subscription')}>S'inscrire</Button>
                    </Grid>
                    <Grid item>
                            <IconButton color="inherit" onClick={showShoppingCart}>
                                <Badge badgeContent={calculateTotalQuantity()} color="secondary">
                                </Badge>
                                <ShoppingBasketIcon/>
                            </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

// export default function ButtonAppBar() {
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             News
//           </Typography>
//           <Button color="inherit">Login</Button>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// }
