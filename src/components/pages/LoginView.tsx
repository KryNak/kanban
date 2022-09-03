import {useAuth0} from "@auth0/auth0-react";
import {Box, Button, ButtonBase, Stack, Typography, useMediaQuery} from "@mui/material";
import {colors} from "../../colors";

export const LoginView = () => {

    const tabletViewMode = useMediaQuery('(max-width: 768px)')

    const signInButtonStyle = {
        backgroundColor: colors.violet,
        padding: '10px 20px',
        borderRadius: '20px',
        whiteSpace: 'nowrap',
        '&[disabled]': {
            opacity: '0.6'
        },
        width: 'fit-content'
    }

    const {loginWithRedirect} = useAuth0();

    return (
        <Stack justifyContent={'center'} alignItems={'center'} width={'100%'} height={'100%'} sx={{backgroundColor: colors.primaryLight}}>
            <ButtonBase onClick={loginWithRedirect} sx={signInButtonStyle}>
                <Typography sx={{color: 'white'}}>
                    Sign in
                </Typography>
            </ButtonBase>
        </Stack>
    );
};