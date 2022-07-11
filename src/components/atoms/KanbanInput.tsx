import { DarkMode } from "@mui/icons-material"
import { TextField, Typography } from "@mui/material"
import { CSSProperties, ReactElement } from "react"
import { colors } from "../../colors"
export {KanbanInput}

type KanbanInputProps = {
    placeholder?: string,
    label?: string,
    darkMode: boolean,
    rows?: number,
    multiline: boolean,
    value?: string

}

const KanbanInput: (props: KanbanInputProps) => ReactElement = ({placeholder, label, darkMode, rows, multiline, value}: KanbanInputProps) => {

    const textFieldStyle = {
        '& fieldset': {
            borderColor: colors.headersGrey
        },
        '& .MuiOutlinedInput-root': {
            color: darkMode ? 'white' : 'black',
            '&:hover fieldset': {
                borderColor: colors.headersGrey
            },
            "&.Mui-focused fieldset": {
               borderColor: colors.headersGrey
            }
        },
        '& .MuiInputBase-input': {
            fontSize: '12px'
        }
    }

    return (
        <div style={{width: '100%'}}>
            {
                label &&
                <Typography sx={{marginBottom: '0.5em'}} fontSize={12} color={darkMode ? 'white': 'black'}>{label}</Typography>
            }
            <TextField autoComplete="off" value={value} rows={rows ? rows : 1} multiline={multiline} placeholder={placeholder} sx={textFieldStyle} fullWidth={true}></TextField>
        </div>
    )
}