import { Dialog, Typography, ButtonBase, IconButton } from "@mui/material"
import { CSSProperties, ReactElement, useState } from "react"
import { KanbanSelect } from "../atoms/KanbanSelect"
import { colors } from '../../colors'
import { Task } from "../../data"
import { SubtasksChecker } from "./SubtasksChecker"
import { MoreVert } from "@mui/icons-material"

export {DetailsTaskDialog}

type DetailsTaskDialogProps = {
    isDarkMode: boolean,
    task: Task,
    isOpen: boolean,
    handleClose: () => void
}

const DetailsTaskDialog: (props: DetailsTaskDialogProps) => ReactElement = ({isDarkMode, task, isOpen, handleClose}: DetailsTaskDialogProps) => {

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
        },
        titleSection: {
            display: 'flex'
        }
    }

    return (
        <Dialog PaperProps={{style: styles.dialogPaper}} onClose={handleClose} open={isOpen}>
            <div style={styles.titleSection}>
                <Typography sx={{flexGrow: '1'}} color={isDarkMode ? 'white' : 'black'} fontSize={22}>{task.name}</Typography>
                <IconButton sx={{alignSelf: 'flex-start', transform: 'translateX(16px)'}}>
                    <MoreVert htmlColor={colors.headersGrey}/>
                </IconButton>
            </div>
            {
                task.description && <Typography color={colors.headersGrey} fontSize={14}>{task.description}</Typography>
            }
            <SubtasksChecker isDarkMode={isDarkMode} task={task}/>
            <KanbanSelect isDarkMode={isDarkMode}/>
        </Dialog>
    )
}