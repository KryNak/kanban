import { ButtonBase, Dialog, InputBase, List, ListItem, MenuItem, Select, Typography } from "@mui/material"
import { Dispatch, SetStateAction, CSSProperties } from "react"
import { colors } from "../../colors"
import { KanbanInput } from "../atoms/KanbanInput"
import { KanbanSelect } from "../atoms/KanbanSelect"
import { SubtasksCreator } from "./MultiInput"
export {AddTaskDialog}

type AddTaskDialogProps = {
    setDialogOpen: Dispatch<SetStateAction<boolean>>,
    isDialogOpen: boolean,
    isDarkMode: boolean
}

const AddTaskDialog = ({isDialogOpen, setDialogOpen, isDarkMode}: AddTaskDialogProps) => {

    const handleDialogClose = () => {
        setDialogOpen(false)
    }

    const styles: {[name: string]: CSSProperties} = {
        createNewButton: {
            padding: '15px',
            backgroundColor: colors.violet,
            color: 'white',
            borderRadius: '25px'
        },
        dialogPaper: {
            backgroundColor: isDarkMode ? colors.primaryDark : colors.primaryLight,
            padding: '2em',
            height: 'max-content',
            width: '500px',
            display: 'flex',
            gap: '1.5em'
        }
    }

    return (
        <Dialog PaperProps={{style: styles.dialogPaper}} onClose={handleDialogClose} open={isDialogOpen}>
            <Typography color={isDarkMode ? 'white' : 'black'} fontSize={22}>Add New Task</Typography>
            <KanbanInput multiline={false} label="Title" placeholder="e.g. Take coffee break" darkMode={isDarkMode}/>
            <KanbanInput multiline={true} rows={5} label="Description" placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little." darkMode={isDarkMode}/>
            <SubtasksCreator addButtonLabel="+ Add New Subtasks" label="Subtasks" isDarkMode={isDarkMode}/>
            <KanbanSelect isDarkMode={isDarkMode}/>
            <ButtonBase sx={styles.createNewButton}>Create New Task</ButtonBase>
        </Dialog>
    )
}