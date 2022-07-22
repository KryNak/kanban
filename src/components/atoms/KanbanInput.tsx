import { DarkMode } from "@mui/icons-material"
import { TextField, Typography } from "@mui/material"
import { ChangeEventHandler, CSSProperties, HtmlHTMLAttributes, ReactElement } from "react"
import { colors } from "../../colors"
export {KanbanInput}

type KanbanInputProps = {
    placeholder?: string,
    label?: string,
    darkMode: boolean,
    rows?: number,
    multiline: boolean,
    value?: string,
    onChange?: ChangeEventHandler<any>
    error?: boolean,
    helperText?: string | false,
    props?: {[name: string]: any}
}

const KanbanInput: (props: KanbanInputProps) => ReactElement = ({placeholder, label, darkMode, rows, multiline, value, onChange, error, helperText, props}: KanbanInputProps) => {

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
            },
            "&.Mui-error fieldset": {
                borderColor: 'red'
            }
        },
        '& .MuiInputBase-input': {
            fontSize: '14px'
        }
    }

    return (
        <div style={{width: '100%'}}>
            {
                label &&
                <Typography sx={{marginBottom: '0.5em'}} fontSize={14} color={darkMode ? 'white': 'black'}>{label}</Typography>
            }
            <TextField helperText={helperText} error={error} onChange={onChange} autoComplete="off" value={value} rows={rows ? rows : 1} multiline={multiline} placeholder={placeholder} sx={textFieldStyle} fullWidth={true} {...props}></TextField>
        </div>
    )
}