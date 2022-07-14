import { Clear } from "@mui/icons-material"
import { Typography, List, ListItem, ButtonBase, InputBase, IconButton } from "@mui/material"
import { ReactElement, useState } from "react"
import { colors } from "../../colors"
import { KanbanInput } from "../atoms/KanbanInput"
export {MultiInput as SubtasksCreator}

type MultiInputProps = {
    isDarkMode: boolean,
    label: string,
    addButtonLabel: string
}

const MultiInput: (props: MultiInputProps) => ReactElement = ({isDarkMode, label, addButtonLabel}: MultiInputProps) => {

    const [subtasks, setSubtasks] = useState<string[]>([])

    const styles = {
        addSubtaskButton: {
            padding: '15px',
            backgroundColor: isDarkMode ? 'white' : colors.secondaryDark,
            color: isDarkMode ? colors.violet : 'white',
            borderRadius: '25px',
            width: '100%'
        },
    }

    return (
        <div style={{width: '100%'}}>
            <Typography sx={{marginBottom: '0.5em'}} fontSize={14} color={isDarkMode ? 'white': 'black'}>{label}</Typography>
            <List sx={{margin: '0', padding: 0, width: '100%'}}>
                {
                    subtasks && subtasks.map((subtask, index) => {
                        return (
                            <ListItem sx={{padding: 0, margin: '0 0 0.5em 0', width: '100%'}}>
                                <KanbanInput placeholder={subtask} multiline={false} darkMode={isDarkMode}/>
                                <IconButton onClick={() => {setSubtasks(subtasks => subtasks.filter((val, ind) => index !== ind))}} sx={{padding: '5px', transform: 'translateX(10px)'}}>
                                    <Clear htmlColor={colors.headersGrey}/>
                                </IconButton>
                            </ListItem>
                        )
                    })
                }
            </List>
            <ButtonBase onClick={() => {setSubtasks((prev) => [...prev, `e.g. Make coffee`])}} sx={styles.addSubtaskButton}>{addButtonLabel}</ButtonBase>
        </div>
    )
}