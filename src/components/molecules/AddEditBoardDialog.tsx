import { Dialog, Typography, ButtonBase } from "@mui/material"
import { CSSProperties, ReactElement, useEffect, useState } from "react"
import { KanbanInput } from "../atoms/KanbanInput"
import { MultiInput } from "./MultiInput"
import { colors } from '../../colors'
import { DialogMode } from "../../enums"
import axios, { AxiosResponse } from "axios"
import { Board } from "../../dto/DTOs"

export { AddEditBoardDialog }

type AddEditBoardDialogProps = {
    isDarkMode: boolean,
    isOpen: boolean,
    onClose: () => void,
    dialogMode: DialogMode,
    board?: Board | null
}

const AddEditBoardDialog: (props: AddEditBoardDialogProps) => ReactElement = ({isDarkMode, onClose, isOpen, dialogMode, board}: AddEditBoardDialogProps) => {

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

    const [boardWithColumns, setBoardWithColumns] = useState<Board | null>(null)

    useEffect(() => {
        if(DialogMode.Edit === dialogMode && board?.id) {
            const fetchData = async () => {
                const response: AxiosResponse<Board> = await axios.get<Board>(`http://localhost:8080/api/boards/${board?.id}`)
                setBoardWithColumns(response.data)
            }

            fetchData().catch(console.error)
        }
    }, [board, isOpen])

    return (
        <Dialog PaperProps={{style: styles.dialogPaper}} onClose={onClose} open={isOpen}>
            <Typography color={isDarkMode ? 'white' : 'black'} fontSize={22}>{dialogMode === DialogMode.Create ? 'Add New Board' : 'Edit Board'}</Typography>
            <KanbanInput value={board ? board.name : ""} multiline={false} label="Name" placeholder="e.g. Take coffee break" darkMode={isDarkMode}/>
            <MultiInput items={board?.columns} addButtonLabel="+ Add New Column" label="Columns" isDarkMode={isDarkMode}/>
            <ButtonBase sx={styles.dialogButton}>{dialogMode === DialogMode.Create ? 'Create New Board' : 'Update Board'}</ButtonBase>
        </Dialog>
    )
}