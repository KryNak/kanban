import { Dialog, Typography, ButtonBase } from "@mui/material"
import { CSSProperties, ReactElement } from "react"
import { ModelClass } from "../../enums"
import { colors } from '../../colors'
import { useSelector } from "react-redux"
import { RootState, useGetBoardByIdQuery } from "../../app/store"
import { skipToken } from "@reduxjs/toolkit/dist/query"

export { RemovingDialog }

type RemovingDialogProps = {
    mode: ModelClass,
    isOpen: boolean,
    onDelete: () => void,
    onClose: () => void,
    onCancel: () => void
}

const RemovingDialog: (props: RemovingDialogProps) => ReactElement = ({mode, isOpen, onDelete, onClose, onCancel}: RemovingDialogProps) => {

    const isDarkMode = useSelector((root: RootState) => root.isDarkMode.value)

    const styles: {[name: string]: CSSProperties} = {
        dialogPaper: {
            backgroundColor: isDarkMode ? colors.primaryDark : colors.primaryLight,
            padding: '2em',
            height: 'max-content',
            width: '500px',
            display: 'flex',
            gap: '1.5em'
        },
        titleSection: {
            display: 'flex'
        },
        buttonShared: {
            padding: '10px 15px',
            borderRadius: '25px',
            width: '100%'
        }
    }

    const boardId = useSelector((root: RootState) => root.selectedBoardId.value)
    const task = useSelector((root: RootState) => root.selectedTask.value)
    const {data: board} = useGetBoardByIdQuery(boardId ?? skipToken)

    return (
        <Dialog PaperProps={{style: styles.dialogPaper}} open={isOpen} onClose={onClose}>
            <Typography color={isDarkMode ? 'white' : 'black'} fontSize={22}>{mode === ModelClass.Board ? 'Delete this board?' : 'Delete this task?'}</Typography>
            <Typography fontSize={14} color={colors.headersGrey}>
                {
                    mode === ModelClass.Board ? (
                        `Are you sure you want to delete the "${board?.name}" Board? This action will remove
                        all columns and tasks and cannot be reversed.`
                    ): (
                        `Are you sure you want to delete the "${task?.title}" Task? This action will
                        remove the task and its subtasks and cannot be reversed.`
                    )
                }
            </Typography>
            <div style={{display: 'flex', justifyContent: 'space-between', gap: '2em'}}>
                <ButtonBase onClick={onDelete} sx={{...styles.buttonShared, backgroundColor: '#DC3545'}}>
                    <Typography sx={{color: 'white'}} fontSize={14}>Delete</Typography>
                </ButtonBase>
                <ButtonBase onClick={onCancel} sx={{...styles.buttonShared, backgroundColor: colors.violet}}>
                    <Typography sx={{color: 'white'}} fontSize={14}>Cancel</Typography>
                </ButtonBase>
            </div>
        </Dialog>
    )
}