import React from "react";
import Header from "./Header";
import { AppBar, Grid, IconButton, Toolbar } from "@mui/material";
import  StoreIcon from "@mui/icons-material/Store";
import { visit } from "../../utils";


export default function Home(): React.JSX.Element {
    const showHome = () => {
        visit( '/');
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