import { KeyboardArrowDown } from "@mui/icons-material"
import { Typography, Select, MenuItem } from "@mui/material"
import { ReactElement } from "react"
import { colors } from "../../colors"

export {KanbanSelect}

type KanbanSelectProps = {
    isDarkMode: boolean
}

const KanbanSelect: (props: KanbanSelectProps) => ReactElement = ({isDarkMode}: KanbanSelectProps) => {

    const selectStyle= {
        width: '100%',
        color: isDarkMode ? 'white' : 'black',
        fontSize: '14px',
        '& fieldset': {
            borderColor: colors.headersGrey
        },
        '&:hover fieldset': {
            borderColor: `${colors.headersGrey} !important`
        },
        '&.Mui-focused fieldset': {
            borderColor: `${colors.headersGrey} !important`
        },
        '& svg': {
            color: colors.violet
        }
    }

    return (
        <div style={{width: '100%'}}>
            <Typography sx={{paddingBottom: '0.5em'}} fontSize={14} color={isDarkMode ? 'white': 'black'}>Status</Typography>
            <Select MenuProps={{sx: {'& .MuiPaper-root': {backgroundColor: isDarkMode ? colors.primaryDark : colors.primaryLight, '& li': {color: isDarkMode ? 'white' : 'black'}}}}} IconComponent={KeyboardArrowDown} sx={selectStyle}>
                <MenuItem value={10}>Todo</MenuItem>
                <MenuItem value={20}>Doing</MenuItem>
                <MenuItem value={30}>Done</MenuItem>
            </Select>
        </div>
    )
}