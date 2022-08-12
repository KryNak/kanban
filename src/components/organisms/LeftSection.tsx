import { Add, DarkMode, GridView, LightMode, Visibility, VisibilityOff } from "@mui/icons-material"
import { ButtonBase, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch, Typography } from "@mui/material"
import { CSSProperties, ReactElement, useEffect, useState } from "react"
import { HeaderTypography } from "../atoms/HeaderTypography"
import { AppLogoTitle } from "../molecules/AppLogoTitle"
import { colors } from '../../colors'
import { AddEditBoardDialog } from "../molecules/AddEditBoardDialog"
import { CrudOption } from "../../enums"
import { RootState, useGetBoardsQuery, useGetBoardByIdQuery } from "../../app/store"
import { useDispatch, useSelector } from "react-redux"
import { hideSideBar, showSideBar } from "../../app/features/isSideBarShown/isSideBarShown"
import { selectDarkMode, selectLightMode } from "../../app/features/isDarkMode/isDarkModeSlice"
import { setSelectedBoardId } from "../../app/features/selectedBoardId/selectedBoardId"
export {LeftSection}

const styles: {[name: string]: CSSProperties} = {
    leftSection: {
        top: 0,
        left: 0,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        position: 'fixed',
        overflowX: 'hidden',
        transition: 'width .5s, background-color .5s',
        zIndex: 2
    },
    boardsAnnounce: {
        marginLeft: '1.5em',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        flexShrink: 0
    },
    boards: {
        paddingLeft: '1.5em',
        listStyle: 'none',
        flexShrink: 0
    },
    boarderListItemButton: {
        padding: '5px 0 5px 1.5em',
        borderRadius: '0 50px 50px 0',
        flexShrink: 0
    },
    boarderListItem: {
        padding: '0px',
        width: 'calc(100% - 20px)',
        borderRadius: '0 50px 50px 0',
        marginBottom: '5px',
        marginTop: '5px',
        flexShrink: 0
    },
    themeMode: {
        marginTop: 'auto',
        marginLeft: '1.5em',
        width: 'calc(100% - 3em)',
        borderRadius: '5px',
        minHeight: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        resize: 'none',
        minWidth: '252px',
        transition: 'background-color .5s'
    },
    leftSectionElement: {
        display: 'flex',
        justifyContent: 'flex-start',
        padding: '5px 0 5px calc(1.5em + 4px)',
        height: '42px',
        width: 'calc(100% - 20px)',
        minWidth: '280px',
        borderRadius: '0 50px 50px 0'
    },
    visibilityOnButton: {
        display: 'flex',
        justifyContent: 'center',
        padding: '5px 0 5px 0',
        height: '42px',
        width: '50px',
        borderRadius: '0 50px 50px 0',
        position: 'fixed',
        left: '0',
        bottom: '3em',
        backgroundColor: colors.violet,
        zIndex: 1
    }
}


const LeftSection: () => ReactElement = () => {

    const [isCreateBoardDialogOpen, setIsCreateBoardDialogOpen] = useState<boolean>(false)

    const selectedBoardId: string | null = useSelector((state: RootState) => state.selectedBoardId.value)
    const isDarkMode: boolean = useSelector((state: RootState) => state.isDarkMode.value)
    const isSideBarShown: boolean = useSelector((state: RootState) => state.isSideBarShown.value)

    const {data, isSuccess} = useGetBoardsQuery()

    const dispatch = useDispatch()

    useEffect(() => {
        if(isSuccess) {
            const selectedBoard = data.length > 0 ? data[0] : null
            dispatch(setSelectedBoardId(selectedBoard?.id ?? null))
        }
    }, [isSuccess])

    useEffect(() => {
        if(selectedBoardId == null && isSuccess) {
            dispatch(setSelectedBoardId(data[0]?.id ?? null))
        }
    }, [selectedBoardId])

    const handleLightModeChange = () => {
        switch (isDarkMode){
            case true:
                dispatch(selectLightMode())
                break
            case false:
                dispatch(selectDarkMode())
                break
        }
    }

    const handleSelectBoard = (id: string) => () => {
        dispatch(setSelectedBoardId(id))
    }

    const handleHideSideMenu = () => {
        dispatch(hideSideBar())
    }

    const handleShowSideMenu = () => {
        dispatch(showSideBar())
    }

    const handleCreateBoardDialogClose = () => {
        setIsCreateBoardDialogOpen(false)
    }

    const handleCreateBoardDialogOpen = () => {
        setIsCreateBoardDialogOpen(true)
    }

    return (<>
        <div style={{ ...styles.leftSection, width: isSideBarShown ? '300px' : 0, backgroundColor: isDarkMode ? 'rgba(44,44,56,255)' : 'rgba(255, 255, 255, 255)' }}>
            <AppLogoTitle isDarkMode={isDarkMode} />

            <div style={styles.boardsAnnounce}>
                <HeaderTypography>
                    all boards ({isSuccess ? data.length : 0})
                </HeaderTypography>
            </div>

            <List sx={{ padding: 0, minHeight: 'max-content' }}>
                {isSuccess && data.map((board, index) => {
                    return (
                        <ListItem key={index} sx={{ ...styles.boarderListItem }}>
                            <ListItemButton onClick={handleSelectBoard(board.id)} sx={{ ...styles.boarderListItemButton, '&.Mui-selected': { backgroundColor: 'rgba(99,95,199,255)', minWidth: '280px' }, '&.Mui-selected:hover': { backgroundColor: 'rgba(99,95,199,255)' } }} selected={selectedBoardId === board.id }>
                                <ListItemIcon>
                                    <GridView htmlColor={selectedBoardId === board.id ? 'white' : 'rgba(118,122,134,255)'} />
                                </ListItemIcon>
                                <ListItemText sx={{ '& > span': { color: selectedBoardId === board.id ? 'white' : 'rgba(118,122,134,255)' } }} primary={`${board.name}`} />
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>

            <ButtonBase onClick={handleCreateBoardDialogOpen} sx={styles.leftSectionElement}>
                <div style={{ width: '56px', display: 'flex' }}>
                    <Add htmlColor={colors.violet} />
                </div>
                <Typography color={colors.violet}>
                    Create New Board
                </Typography>
            </ButtonBase>
            <AddEditBoardDialog crudOption={CrudOption.Create} isOpen={isCreateBoardDialogOpen} onClose={handleCreateBoardDialogClose}/>

            <div style={{ ...styles.themeMode, backgroundColor: isDarkMode ? 'rgba(33,33,45,255)' : 'rgba(245,247,254,255)' }}>
                <LightMode htmlColor='rgba(118,122,134,255)' />
                <Switch checked={isDarkMode} onChange={handleLightModeChange} sx={{ '& .MuiSwitch-switchBase': { '&.Mui-checked': { color: 'rgba(99,95,199,255)', '& + .MuiSwitch-track': { backgroundColor: 'rgba(99,95,199,255)' } } }, }} />
                <DarkMode htmlColor='rgba(118,122,134,255)' />
            </div>


            
            <ButtonBase onClick={handleHideSideMenu} sx={{...styles.leftSectionElement, marginTop: '1em', marginBottom: '3em'}}>
                <div style={{ width: '56px', display: 'flex' }}>
                    <VisibilityOff htmlColor={colors.headersGrey} />
                </div>
                <Typography color={colors.headersGrey}>
                    Hide Sidebar
                </Typography>
            </ButtonBase>

        </div>
        <ButtonBase onClick={handleShowSideMenu} sx={styles.visibilityOnButton}>
            <Visibility htmlColor='white' />
        </ButtonBase>
    </>)
}