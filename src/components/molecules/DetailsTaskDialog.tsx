import { Dialog, Typography, ButtonBase, IconButton, MenuItem, Menu, List, ListItem, Checkbox, Select, SelectChangeEvent } from "@mui/material"
import { CSSProperties, ReactElement, useEffect, useState } from "react"
import { colors } from '../../colors'
import { Subtask, Task, UpdateSubtaskRequestDto } from "../../dto/DTOs"
import { KeyboardArrowDown, MoreVert } from "@mui/icons-material"
import { RemovingDialog } from "./RemovingDialog"
import { CrudOption, ModelClass } from "../../enums"
import { AddEditTaskDialog } from "./AddEditTaskDialog"
import { RootState, UpdateSubtaskType, useGetBoardByIdQuery, useGetColumnByIdQuery, useDeleteTaskByIdMutation, useUpdateSubtaskByIdMutation, useUpdateTasksStatusMutation, UpdateTaskStatusRequestBody } from "../../app/store"
import { skipToken } from "@reduxjs/toolkit/dist/query"
import { useSelector } from "react-redux"

export {DetailsTaskDialog}

type DetailsTaskDialogProps = {
    isDarkMode: boolean,
    task: Task,
    isOpen: boolean,
    handleClose: () => void,
    columnId: string
}

const DetailsTaskDialog: (props: DetailsTaskDialogProps) => ReactElement = ({isDarkMode, task, isOpen, columnId, handleClose}: DetailsTaskDialogProps) => {

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
        },
        checkbox: {
            backgroundColor: isDarkMode ? colors.secondaryDark : colors.secondaryLight,
            width: '100%',
            padding: '0.8em',
            borderRadius: '5px',
            display: 'flex',
            gap: '5px'
        }
    }

    const menuStyle = {
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
        }
    }

    const selectStyle= {
        width: '100%',
        color: isDarkMode ? 'white' : 'black',
        fontSize: '14px',
        '& fieldset': {
            borderColor: colors.headersGrey
        },
        '&:hover fieldset': {
            borderColor: `${colors.headersGrey} !important`
        },
        '&.Mui-focused fieldset': {
            borderColor: `${colors.headersGrey} !important`
        },
        '& svg': {
            color: colors.violet
        }
    }

    const [status, setStatus] = useState<string>(columnId)
    const [isRemovingDialogOpen, setIsRemovingDialogOpen] = useState<boolean>(false)
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const [isTaskEditDialogOpen, setIsTaskEditDialogOpen] = useState<boolean>(false)
    const isMenuOpen = Boolean(anchorEl)

    const selectedBoardId = useSelector((state: RootState) => state.selectedBoardId.value)
    const {data: selectedBoard} = useGetBoardByIdQuery(selectedBoardId ?? skipToken)
    const [updateSubtask] = useUpdateSubtaskByIdMutation()
    const [deleteTask] = useDeleteTaskByIdMutation()
    const [updateTaskStatus] = useUpdateTasksStatusMutation()

    const {data: selectedColumn} = useGetColumnByIdQuery(columnId ?? skipToken)
    const subtasks = selectedColumn?.tasks.find((t) => t.id === task.id)?.subtasks ?? []
    

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

    const handleEditDialogClose = () => {
        setIsTaskEditDialogOpen(false)
    }

    const handleEditDialogOpen = () => {
        handleClose()
        setAnchorEl(null)
        setIsTaskEditDialogOpen(true)
    }

    const handleStatusChange = (e: SelectChangeEvent) => {
        updateTaskStatus(new UpdateTaskStatusRequestBody(task.id, status, e.target.value))
        setStatus(e.target.value)
    }

    const handleCheck = (subtask: Subtask) => () => {
        updateSubtask({id: subtask.id, body: new UpdateSubtaskRequestDto(subtask.id, !subtask.isCompleted, task.id), columnId: columnId} as UpdateSubtaskType)
    }

    const handleTaskDelete = () => {
        deleteTask({id: task.id, columnId: columnId})
        setIsRemovingDialogOpen(false)
    }

    return (
        <>
            <Dialog PaperProps={{style: styles.dialogPaper}} onClose={handleClose} open={isOpen}>
                <div style={styles.titleSection}>
                    <Typography sx={{flexGrow: '1'}} color={isDarkMode ? 'white' : 'black'} fontSize={22}>{task.title}</Typography>
                    <IconButton onClick={handleMenuClick} sx={{alignSelf: 'flex-start', transform: 'translateX(16px)'}}>
                        <MoreVert htmlColor={colors.headersGrey}/>
                    </IconButton>
                </div>
                {
                    task.description && <Typography color={colors.headersGrey} fontSize={14}>{task.description}</Typography>
                }
                <div>
                    <Typography sx={{marginBottom: '0.5em'}} fontSize={14} color={isDarkMode ? 'white': 'black'}>Subtasks ({subtasks.filter(e => e.isCompleted === true).length} of {subtasks.length})</Typography>
                    <List sx={{margin: '0', padding: 0, width: '100%'}}>
                        {
                            subtasks.map((subtask) => {
                                return (
                                    <ListItem key={subtask.id} sx={{padding: 0, margin: '0 0 0.5em 0', width: '100%'}}>
                                        <div style={styles.checkbox}>
                                            <Checkbox checked={subtask.isCompleted} onChange={handleCheck(subtask)} sx={{padding: '5px', color: colors.headersGrey, "&.Mui-checked": {'color': colors.violet}}}/>
                                            <Typography sx={{alignSelf: 'center', textDecoration: subtask.isCompleted ?'line-through' : 'none'}} fontSize={14} color={subtask.isCompleted ? colors.headersGrey : isDarkMode ? 'white' : 'black'}>{subtask.title}</Typography>
                                        </div>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </div>
                <div style={{width: '100%'}}>
                    <Typography sx={{paddingBottom: '0.5em'}} fontSize={14} color={isDarkMode ? 'white': 'black'}>Status</Typography>
                    <Select onChange={handleStatusChange} value={status} MenuProps={{sx: {'& .MuiPaper-root': {backgroundColor: isDarkMode ? colors.primaryDark : colors.primaryLight, '& li': {color: isDarkMode ? 'white' : 'black'}}}}} IconComponent={KeyboardArrowDown} sx={selectStyle}>
                        {
                            selectedBoard && selectedBoard.columns.map((column) => {
                                return <MenuItem key={column.id} value={column.id}>{column.name}</MenuItem>
                            })
                        }
                    </Select>
                </div>
            </Dialog>
            <Menu anchorEl={anchorEl}
                id="account-menu"
                open={isMenuOpen}
                onClose={handleMenuClose}
                PaperProps={{
                    elevation: 0,
                    sx: menuStyle
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                <MenuItem onClick={handleEditDialogOpen} sx={{color: isDarkMode ? 'white': 'black'}}>Edit Task</MenuItem>
                <MenuItem onClick={handleOpenRemovingDialog} sx={{color: '#DC3545'}}>Delete Task</MenuItem>
            </Menu>
            <RemovingDialog mode={ModelClass.Task} isDarkMode={isDarkMode} isOpen={isRemovingDialogOpen} onClose={handleCloseRemovingDialog} onCancel={handleCloseRemovingDialog} onDelete={handleTaskDelete}/>
            <AddEditTaskDialog parentColumnId={columnId} isOpen={isTaskEditDialogOpen} onClose={handleEditDialogClose} crudOption={CrudOption.Edit} task={task}/>
        </>
    )
}