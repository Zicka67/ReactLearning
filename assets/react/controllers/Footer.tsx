import React from 'react';
import { Grid, Link, Typography, Box } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <footer>
        <Box sx={{ flexGrow: 1, backgroundColor: 'primary.main', color: 'white', padding: 2}}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              {/* Zone réservée si vous voulez ajouter quelque chose à gauche */}
            </Grid>
            <Grid item xs={12} sm={4} container justifyContent="center">
              <Typography variant="body2" align="center">
                © {new Date().getFullYear()} NomDuSite - Tous droits réservés
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} container justifyContent="flex-end">
              <Link href="#" color="inherit" sx={{ marginLeft: 2 }}>
                Lien 1
              </Link>
              <Link href="#" color="inherit" sx={{ marginLeft: 2 }}>
                Lien 2
              </Link>
              <Link href="#" color="inherit" sx={{ marginLeft: 2 }}>
                Lien 3
              </Link>
            </Grid>
          </Grid>
        </Box>
      </footer>
    </Box>
  );
};

export default Footer;
