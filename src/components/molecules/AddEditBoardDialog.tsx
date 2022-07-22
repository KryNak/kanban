import { Dialog, Typography, ButtonBase, TextField } from "@mui/material"
import { ChangeEventHandler, CSSProperties, ReactElement, useEffect, useState } from "react"
import { KanbanInput } from "../atoms/KanbanInput"
import { MultiInput } from "./MultiInput"
import { colors } from '../../colors'
import { CrudOption, ModelClass } from "../../enums"
import { Board } from "../../dto/DTOs"
import { useFormik } from 'formik'
import * as yup from 'yup';

export { AddEditBoardDialog }

type AddEditBoardDialogProps = {
    isDarkMode: boolean,
    isOpen: boolean,
    onClose: () => void,
    crudOption: CrudOption,
    board?: Board | null
}

const AddEditBoardDialog: (props: AddEditBoardDialogProps) => ReactElement = ({isDarkMode, onClose, isOpen, crudOption: dialogMode, board}: AddEditBoardDialogProps) => {

    const styles: {[name: string]: CSSProperties} = {
        dialogPaper: {
            backgroundColor: isDarkMode ? colors.primaryDark : colors.primaryLight,
            padding: '2em',
            height: 'max-content',
            width: '500px'
        },
        dialogButton: {
            padding: '15px',
            backgroundColor: colors.violet,
            color: 'white',
            borderRadius: '25px'
        },
        formStyle: {
            display: 'flex',
            gap: '1.5em',
            flexDirection: 'column'
        }
    }

    const [boardName, setBoardName] = useState<string>(board?.name ?? "")

    const handleBoardNameChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setBoardName(e.target.value)
    }

    useEffect(() => {
        if(isOpen) {
            setBoardName(board?.name ?? "")
        }
    }, [isOpen])

    return (
        
        <Dialog PaperProps={{style: styles.dialogPaper}} onClose={onClose} open={isOpen}>
            <form style={styles.formStyle}>
                <Typography color={isDarkMode ? 'white' : 'black'} fontSize={22}>{dialogMode === CrudOption.Create ? 'Add New Board' : 'Edit Board'}</Typography>
                <KanbanInput 
                    
                    multiline={false} 
                    label="Name" 
                    placeholder="e.g. Take coffee break" 
                    darkMode={isDarkMode}
                />
                <MultiInput modelClass={ModelClass.Board} columns={board?.columns} addButtonLabel="+ Add New Column" label="Columns"/>
                <ButtonBase type="submit" sx={styles.dialogButton}>{dialogMode === CrudOption.Create ? 'Create New Board' : 'Update Board'}</ButtonBase>
            </form>
        </Dialog>
        
    )
}