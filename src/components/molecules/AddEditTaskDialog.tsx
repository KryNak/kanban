import { ButtonBase, Dialog, Typography } from "@mui/material"
import { CSSProperties } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../app/strore"
import { colors } from "../../colors"
import { CrudOption, ModelClass } from "../../enums"
import { KanbanInput } from "../atoms/KanbanInput"
import { KanbanSelect } from "../atoms/KanbanSelect"
import { MultiInput } from "./MultiInput"
export {AddEditTaskDialog}

type AddEditTaskDialogProps = {
    onClose: () => void,
    isOpen: boolean,
    crudOption: CrudOption
}

const AddEditTaskDialog = ({isOpen, onClose, crudOption}: AddEditTaskDialogProps) => {

    const isDarkMode = useSelector((state: RootState) => state.isDarkMode.value)

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
        <Dialog PaperProps={{style: styles.dialogPaper}} onClose={onClose} open={isOpen}>
            <Typography color={isDarkMode ? 'white' : 'black'} fontSize={22}>{crudOption === CrudOption.Create ? 'Add New Task' : 'Edit Task'}</Typography>
            <KanbanInput multiline={false} label="Title" placeholder="e.g. Take coffee break" darkMode={isDarkMode}/>
            <KanbanInput multiline={true} rows={5} label="Description" placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little." darkMode={isDarkMode}/>
            <MultiInput modelClass={ModelClass.Task} addButtonLabel="+ Add New Subtasks" label="Subtasks"/>
            <KanbanSelect isDarkMode={isDarkMode}/>
            <ButtonBase sx={styles.createNewButton}>{crudOption === CrudOption.Create ? 'Create New Task' : 'Update Task'}</ButtonBase>
        </Dialog>
    )
}