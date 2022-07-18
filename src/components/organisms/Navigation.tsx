import { ArrowRight, MoreVert } from "@mui/icons-material"
import { ButtonBase, Dialog, IconButton, Menu, MenuItem, Typography } from "@mui/material"
import { CSSProperties, Dispatch, ReactElement, SetStateAction, useEffect, useState } from "react"
import { AddEditTaskDialog } from "../molecules/AddEditTaskDialog"
import { colors } from '../../colors'
import { DialogMode, RemovingDialogType } from "../../enums"
import { RemovingDialog } from "../molecules/RemovingDialog"
import { AddEditBoardDialog } from "../molecules/AddEditBoardDialog"
import axios, { AxiosResponse } from "axios"
import { Board } from "../../dto/DTOs"

export{Navigation}

type NavigationProps = {
    isDarkMode: boolean,
    isSideBarShown: boolean,
    setSideBarShown: Dispatch<SetStateAction<boolean>>,
    board: Board | null
}

const styles: {[name: string]: CSSProperties} = {
    navigation: {
        height: '80px',
        width: '100%',
        minWidth: '500px',
        transition: 'background-color .5s, border-left-color .5s',
        borderLeft: '1px solid'
    },
    navOptions: {
        height: '100%',
        listStyle: 'none',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        flexWrap: 'nowrap',
        gap: '1em',
        paddingLeft: '1em',
        paddingRight: '1em',
        color: 'white'
    },
    endItems: {
        marginLeft: 'auto'
    },
    addButton: {
        backgroundColor: colors.violet,
        padding: '10px',
        borderRadius: '25px',
        whiteSpace: 'nowrap'
    },
    navTitle: {
        fontSize: '20px',
        whiteSpace: 'nowrap'
    }
}

const Navigation: (props: NavigationProps) => ReactElement = ({isDarkMode, board}: NavigationProps) => {

    const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState<boolean>(false)
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const [isRemovingDialogOpen, setIsRemovingDialogOpen] = useState<boolean>(false)
    const [isEditBoardDialogOpen, setIsEditBoardDialogOpen] = useState<boolean>(false)

    const isMenuOpen = Boolean(anchorEl)

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const handleMenuClick: (e: React.MouseEvent<HTMLElement>) => void = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleRemovingDialogClose = () => {
        setIsRemovingDialogOpen(false)
    }

    const handleRemovingDialogOpen = () => {
        setAnchorEl(null)
        setIsRemovingDialogOpen(true)
    }

    const handleEditBoardDialogClose = () => {
        setIsEditBoardDialogOpen(false)
    }

    const handleEditBoardDialogOpen = () => {
        setAnchorEl(null)
        setIsEditBoardDialogOpen(true)
    }

    const handleAddTaskDialogClose = () => {
        setIsAddTaskDialogOpen(false)
    }

    const handleAddTaskDialogOpen = () => {
        setAnchorEl(null)
        setIsAddTaskDialogOpen(true)
    }

    const handleDeleteBoard = () => {
        const request = async () => {
            const response: AxiosResponse = await axios.delete(`http://localhost:8080/api/boards/${board?.id}`)
            setIsRemovingDialogOpen(false)
        }

        request().catch(console.error)
    }

    return (<>
        <div style={{
            ...styles.navigation, 
            backgroundColor: isDarkMode ? colors.primaryDark : colors.primaryLight,
            borderLeftColor: isDarkMode ? 'rgba(50,50,62,255)' : 'rgba(251,251,251,255)'
            }}>
            <ul style={{...styles.navOptions}}>
                <li style={styles.navTitle}>
                    <Typography sx={{transition: 'color .5s'}} color={isDarkMode ? 'white' : 'black'} fontSize={'20px'}>
                        {board?.name}
                    </Typography>
                </li>
                <li style={{...styles.endItems}}>
                    <ButtonBase onClick={handleAddTaskDialogOpen} sx={styles.addButton}>
                        <Typography fontSize={'12px'}>
                            + Add New Task
                        </Typography>
                    </ButtonBase>
                </li>
                <li>
                    <IconButton onClick={handleMenuClick}>
                        <MoreVert htmlColor={colors.violet} />
                    </IconButton>
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
                        <MenuItem onClick={handleEditBoardDialogOpen} sx={{color: isDarkMode ? 'white': 'black'}}>Edit Board</MenuItem>
                        <MenuItem onClick={handleRemovingDialogOpen} sx={{color: '#DC3545'}}>Delete Board</MenuItem>
                    </Menu>
                </li>
            </ul>
        </div>
        <AddEditTaskDialog dialogMode={DialogMode.Create} isDarkMode={isDarkMode} isOpen={isAddTaskDialogOpen} onClose={handleAddTaskDialogClose}/>
        <RemovingDialog mode={RemovingDialogType.Board} isDarkMode={isDarkMode} isOpen={isRemovingDialogOpen} onClose={handleRemovingDialogClose} onCancel={handleRemovingDialogClose} onDelete={handleDeleteBoard}/>
        <AddEditBoardDialog board={board} dialogMode={DialogMode.Edit} onClose={handleEditBoardDialogClose} isDarkMode={isDarkMode} isOpen={isEditBoardDialogOpen}/>
    </>)
}