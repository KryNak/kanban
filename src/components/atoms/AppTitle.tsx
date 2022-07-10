import { Typography } from "@mui/material"
import { ReactElement } from "react"
export {AppTitle}

type AppTitleProp = {
    isDarkMode: boolean
}

const AppTitle: (prop: AppTitleProp) => ReactElement = ({isDarkMode}: AppTitleProp) => {
    return (
        <Typography sx={{transition: 'color .5s'}} color={isDarkMode ? 'white' : 'black'} fontSize='28px' fontWeight='bold'>
            kanban
        </Typography>
    )
}