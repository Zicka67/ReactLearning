import {Button, Typography, Box, Container} from "@mui/material";
import {CheckCircleOutline} from "@mui/icons-material";
import {formatPrice, visit} from "../../../utils";
import React from 'react';

export default function Success ({amountTotal})
{
    return (
        <Container>
            <Box>
                <CheckCircleOutline color="success"></CheckCircleOutline>
                <Typography component="h1">
                    Paiement réussi
                </Typography>
                <Typography>
                    Merci pour votre achat de {formatPrice(amountTotal)} !
                </Typography>
                <Box marginTop={2}>
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={() => visit('/')}
                    >
                        Retour à la boutique.
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}
