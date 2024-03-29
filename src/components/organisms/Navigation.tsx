import {
    Add,
    ArrowDownward,
    ArrowDropDown,
    ArrowDropUp,
    ArrowUpward,
    CoronavirusSharp, Delete, Edit,
    Logout, LogoutOutlined, LogoutSharp, LogoutTwoTone,
    MoreVert
} from "@mui/icons-material"
import {ButtonBase, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography} from "@mui/material"
import { ReactElement, useState } from "react"
import { AddEditTaskDialog } from "../molecules/AddEditTaskDialog"
import { colors } from '../../colors'
import { CrudOption, ModelClass } from "../../enums"
import { RemovingDialog } from "../molecules/RemovingDialog"
import { AddEditBoardDialog } from "../molecules/AddEditBoardDialog"
import { RootState, useDeleteBoardByIdMutation, useGetBoardByIdQuery } from "../../app/store"
import { useSelector } from "react-redux"
import { skipToken } from "@reduxjs/toolkit/dist/query"
import { setSelectedBoardId } from "../../app/features/selectedBoardId/selectedBoardId"
import { useDispatch } from "react-redux"
import { hideSideBar, showSideBar } from "../../app/features/isSideBarShown/isSideBarShown"
import { AppLogoTitle } from "../molecules/AppLogoTitle"
import { Logo } from "../atoms/Logo"
import {useAuth0} from "@auth0/auth0-react";

export{Navigation}

const styles: {[name: string]: any} = {
    navigation: {
        height: '80px',
        width: '100%',
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
        padding: '10px 20px',
        borderRadius: '25px',
        whiteSpace: 'nowrap',
        '&[disabled]': {
            opacity: '0.6'
        }
    },
    navTitle: {
        fontSize: '20px',
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    moreButton: {
        '&[disabled] svg': {
            opacity: '0.6'
        }
    }
}

const Navigation: () => ReactElement = () => {

    const dispatch = useDispatch()
    const { logout } = useAuth0()

    const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState<boolean>(false)
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const [isRemovingDialogOpen, setIsRemovingDialogOpen] = useState<boolean>(false)
    const [isEditBoardDialogOpen, setIsEditBoardDialogOpen] = useState<boolean>(false)

    const selectedBoardId = useSelector((state: RootState) => state.selectedBoardId.value)
    const isDarkMode = useSelector((state: RootState) => state.isDarkMode.value)
    const isSideBarShown = useSelector((state: RootState) => state.isSideBarShown.value)
    const isMobileViewMode = useSelector((root: RootState) => root.isMobileViewMode.value)
    const isTabletViewMode = useSelector((root: RootState) => root.isTabletViewMode.value)

    const [deleteBoardById] = useDeleteBoardByIdMutation()

    const {data, isSuccess} = useGetBoardByIdQuery(selectedBoardId ?? skipToken)
    const board = isSuccess ? data : null

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
        if(selectedBoardId) {
            deleteBoardById(selectedBoardId)
            dispatch(setSelectedBoardId(null))
        }
        setIsRemovingDialogOpen(false)
    }

    return (<>
        <div style={{
            ...styles.navigation, 
            backgroundColor: isDarkMode ? colors.primaryDark : colors.primaryLight,
            borderLeftColor: isDarkMode ? 'rgba(50,50,62,255)' : 'rgba(251,251,251,255)'
            }}>
            <ul style={{...styles.navOptions}}>
                <li style={styles.navTitle}>
                    {
                        isMobileViewMode && (
                            <Logo/>
                        )
                    }
                    <Typography sx={{transition: 'color .5s', textOverflow: 'ellipsis', width: 'max-content', maxWidth: '200px', overflow: 'hidden', paddingLeft: '1em'}} color={isDarkMode ? 'white' : 'black'} fontSize={'20px'}>
                        {board?.name}
                    </Typography>
                    {
                        isMobileViewMode && (
                            isSideBarShown ? (
                                <IconButton onClick={() => dispatch(isSideBarShown ? hideSideBar() : showSideBar())} sx={{marginLeft: '0.5em', width: '30px', height: '30px'}}>
                                    <ArrowDropUp htmlColor={colors.violet}/>
                                </IconButton>
                            ) : (
                                <IconButton onClick={() => dispatch(isSideBarShown ? hideSideBar() : showSideBar())} sx={{marginLeft: '0.5em', width: '30px', height: '30px'}}>
                                    <ArrowDropDown htmlColor={colors.violet}/>
                                </IconButton>
                            )
                        )
                    }
                </li>
                <li style={{...styles.endItems}}>
                    {
                        isTabletViewMode ? (
                            <IconButton onClick={handleAddTaskDialogOpen} sx={{backgroundColor: colors.violet, color: colors.violet, padding: '10px 15px', height: '38px', borderRadius: '25px', '&:hover': {backgroundColor: colors.violet}}}>
                                <Add htmlColor={colors.primaryLight}/>
                            </IconButton>
                        ): (
                            <ButtonBase disabled={selectedBoardId ? false : true} onClick={handleAddTaskDialogOpen} sx={styles.addButton}>
                                <Typography fontSize={'12px'}>
                                    + Add New Task
                                </Typography>
                            </ButtonBase>
                        )
                    }
                </li>
                <li>
                    <IconButton sx={{...styles.moreButton}} onClick={handleMenuClick}>
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
                        <MenuItem disabled={selectedBoardId ? false : true} onClick={handleEditBoardDialogOpen} sx={{color: isDarkMode ? 'white': 'black'}}>
                            <ListItemIcon sx={{color: isDarkMode ? 'white': 'black'}}>
                                <Edit/>
                            </ListItemIcon>
                            <ListItemText sx={{color: isDarkMode ? 'white': 'black'}}>
                                Edit Board
                            </ListItemText>
                        </MenuItem>
                        <MenuItem disabled={selectedBoardId ? false : true} onClick={handleRemovingDialogOpen} sx={{color: '#DC3545'}}>
                            <ListItemIcon sx={{color: '#DC3545'}}>
                                <Delete/>
                            </ListItemIcon>
                            <ListItemText sx={{color: '#DC3545'}}>
                                Delete Board
                            </ListItemText>
                        </MenuItem>
                        <MenuItem onClick={() => logout({returnTo: window.location.origin})}>
                            <ListItemIcon sx={{color: isDarkMode ? 'white': 'black'}}>
                                <Logout/>
                            </ListItemIcon>
                            <ListItemText sx={{color: isDarkMode ? 'white': 'black'}}>
                                Logout
                            </ListItemText>
                        </MenuItem>
                    </Menu>
                </li>
            </ul>
        </div>
        <AddEditTaskDialog crudOption={CrudOption.Create} isOpen={isAddTaskDialogOpen} onClose={handleAddTaskDialogClose}/>
        <RemovingDialog mode={ModelClass.Board} isOpen={isRemovingDialogOpen} onClose={handleRemovingDialogClose} onCancel={handleRemovingDialogClose} onDelete={handleDeleteBoard}/>
        <AddEditBoardDialog crudOption={CrudOption.Edit} onClose={handleEditBoardDialogClose} isOpen={isEditBoardDialogOpen}/>
    </>)
}