import {Box, CircularProgress} from "@mui/material";
import {colors} from "../../colors";

export const LoadingPage = () => {
    return (
        <Box sx={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.secondaryDark}}>
            <CircularProgress sx={{color: colors.violet}} size={60}/>
        </Box>
    )
}