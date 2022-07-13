import { Dialog, Typography, ButtonBase, IconButton, MenuItem, Menu } from "@mui/material"
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
        },
        buttonShared: {
            padding: '10px 15px',
            borderRadius: '25px',
            width: '100%'
        }
    }

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const isMenuOpen = Boolean(anchorEl)
    const [isRemovingDialogOpen, setIsRemovingDialogOpen] = useState<boolean>(false)

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const handleMenuClick: (e: React.MouseEvent<HTMLElement>) => void = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleOpenRemovingDialog = () => {
        handleClose()
        setAnchorEl(null)
        setIsRemovingDialogOpen(true)
    }

    const handleCloseRemovingDialog = () => {
        setIsRemovingDialogOpen(false)
    }

    return (
        <>
            <Dialog PaperProps={{style: styles.dialogPaper}} onClose={handleClose} open={isOpen}>
                <div style={styles.titleSection}>
                    <Typography sx={{flexGrow: '1'}} color={isDarkMode ? 'white' : 'black'} fontSize={22}>{task.name}</Typography>
                    <IconButton onClick={handleMenuClick} sx={{alignSelf: 'flex-start', transform: 'translateX(16px)'}}>
                        <MoreVert htmlColor={colors.headersGrey}/>
                    </IconButton>
                </div>
                {
                    task.description && <Typography color={colors.headersGrey} fontSize={14}>{task.description}</Typography>
                }
                <SubtasksChecker isDarkMode={isDarkMode} task={task}/>
                <KanbanSelect isDarkMode={isDarkMode}/>
            </Dialog>
            <Menu anchorEl={anchorEl}
                id="account-menu"
                open={isMenuOpen}
                onClose={handleMenuClose}
                PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    minWidth: '200px',
                    backgroundColor: isDarkMode ? colors.primaryDark: colors.primaryLight,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: isDarkMode ? colors.primaryDark : colors.primaryLight,
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                <MenuItem sx={{color: isDarkMode ? 'white': 'black'}}>Edit Task</MenuItem>
                <MenuItem onClick={handleOpenRemovingDialog} sx={{color: '#DC3545'}}>Delete Task</MenuItem>
            </Menu>
            <Dialog PaperProps={{style: styles.dialogPaper}} open={isRemovingDialogOpen} onClose={handleCloseRemovingDialog}>
                <Typography color={isDarkMode ? 'white' : 'black'} fontSize={22}>Delete this task?</Typography>
                <Typography fontSize={14} color={colors.headersGrey}>
                    Are you sure you want to delete the "take coffee break" Task? This action will
                    remove the task and its subtasks and cannot be reversed.
                </Typography>
                <div style={{display: 'flex', justifyContent: 'space-between', gap: '2em'}}>
                    <ButtonBase sx={{...styles.buttonShared, backgroundColor: '#DC3545'}}>
                        <Typography sx={{color: 'white'}} fontSize={14}>Delete</Typography>
                    </ButtonBase>
                    <ButtonBase onClick={handleCloseRemovingDialog} sx={{...styles.buttonShared, backgroundColor: colors.violet}}>
                        <Typography sx={{color: 'white'}} fontSize={14}>Cancel</Typography>
                    </ButtonBase>
                </div>
            </Dialog>
        </>
    )
}