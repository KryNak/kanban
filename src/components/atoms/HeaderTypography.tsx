import { Typography } from "@mui/material";
import { ReactElement } from "react";
export {HeaderTypography}

type HeaderTypographyProps = {
    children: any
}

const HeaderTypography: (props: HeaderTypographyProps) => ReactElement = ({children}: HeaderTypographyProps) => {
    return (
        <Typography width={'max-content'} color='rgba(118,122,134,255)' textTransform='uppercase' fontSize="10px" letterSpacing='2px' fontWeight='bold'>
            {children}
        </Typography>
    )
}