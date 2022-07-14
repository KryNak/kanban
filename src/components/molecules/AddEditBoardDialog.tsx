import { Dialog, Typography, ButtonBase } from "@mui/material"
import { CSSProperties, ReactElement } from "react"
import { KanbanInput } from "../atoms/KanbanInput"
import { SubtasksCreator } from "./MultiInput"
import { colors } from '../../colors'
import { DialogMode } from "../../enums"

export { AddEditBoardDialog }

type AddEditBoardDialogProps = {
    isDarkMode: boolean,
    isOpen: boolean,
    onClose: () => void,
    dialogMode: DialogMode
}

const AddEditBoardDialog: (props: AddEditBoardDialogProps) => ReactElement = ({isDarkMode, onClose, isOpen, dialogMode}: AddEditBoardDialogProps) => {

    const styles: {[name: string]: CSSProperties} = {
        dialogPaper: {
            backgroundColor: isDarkMode ? colors.primaryDark : colors.primaryLight,
            padding: '2em',
            height: 'max-content',
            width: '500px',
            display: 'flex',
            gap: '1.5em'
        },
        dialogButton: {
            padding: '15px',
            backgroundColor: colors.violet,
            color: 'white',
            borderRadius: '25px'
        }
    }

    return (
        <Dialog PaperProps={{style: styles.dialogPaper}} onClose={onClose} open={isOpen}>
            <Typography color={isDarkMode ? 'white' : 'black'} fontSize={22}>{dialogMode === DialogMode.Create ? 'Add New Board' : 'Edit Board'}</Typography>
            <KanbanInput multiline={false} label="Name" placeholder="e.g. Take coffee break" darkMode={isDarkMode}/>
            <SubtasksCreator addButtonLabel="+ Add New Column" label="Columns" isDarkMode={isDarkMode}/>
            <ButtonBase sx={styles.dialogButton}>{dialogMode === DialogMode.Create ? 'Create New Board' : 'Update Board'}</ButtonBase>
        </Dialog>
    )
}