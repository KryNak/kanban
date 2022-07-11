import { Clear } from "@mui/icons-material"
import { Typography, List, ListItem, ButtonBase, InputBase, IconButton } from "@mui/material"
import { ReactElement, useState } from "react"
import { colors } from "../../colors"
import { KanbanInput } from "../atoms/KanbanInput"
import { faker } from '@faker-js/faker'
export {SubtasksCreator}

type SubtasksCreatorProps = {
    isDarkMode: boolean
}

const SubtasksCreator: (props: SubtasksCreatorProps) => ReactElement = ({isDarkMode}: SubtasksCreatorProps) => {

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
            <Typography sx={{marginBottom: '0.5em'}} fontSize={12} color={isDarkMode ? 'white': 'black'}>Subtasks</Typography>
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
            <ButtonBase onClick={() => {setSubtasks((prev) => [...prev, `e.g. ${faker.hacker.phrase()}`])}} sx={styles.addSubtaskButton}>+ Add New Subtasks</ButtonBase>
        </div>
    )
}