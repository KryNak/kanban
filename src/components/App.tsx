import { ButtonBase, IconButton, ListItem, Typography, List, ListItemButton, ListItemIcon, ListItemText, Switch, createTheme, Theme, ThemeProvider } from '@mui/material'
import { Add, ArrowForward, ArrowRight, DarkMode, GridView, LightMode, MoreVert, VisibilityOff } from '@mui/icons-material'
import { ReactElement, useState } from 'react'
import { red } from '@mui/material/colors'

export {App}

const boards: string[] = ['Platform Launch', 'Marketing Plan', 'Roadmap']

const styles: {[name: string]: React.CSSProperties} = {
    container: {
        height: '100%',
        width: '100%'
    },
    leftSection: {
        top: 0,
        left: 0,
        height: '100%',
        backgroundColor: 'rgba(44,44,56,255)',
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        position: 'fixed',
        overflowX: 'hidden',
        transition: '.5s',
        zIndex: 1
    },
    rigthSection: {
        width: '100%',
        height: '100%',
        transition: 'margin-left .5s, width .5s'
    },
    navigation: {
        height: '80px',
        width: '100%',
        backgroundColor: 'rgba(44,44,56,255)',
        borderLeft: '2px solid rgba(48,48,59,255)'
    },
    content: {
        height: 'calc(100% - 80px)',
        width: '100%',
        backgroundColor: 'rgba(34,33,45,255)'
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
        backgroundColor: 'rgba(99,95,199,255)',
        padding: '10px',
        borderRadius: '25px',
        whiteSpace: 'nowrap'
    },
    navTitle: {
        fontSize: '20px',
        whiteSpace: 'nowrap'
    },
    logoBox: {
        height: '80px',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '10px',
        marginLeft: '1.5em',
        flexShrink: 0
    },
    logo: {
        width: '16px',
        height: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        flexShrink: 0
    },
    stob1: {
        backgroundColor: 'rgba(98,98,174,255)',
        height: '100%',
        width: '4px'
    },
    stob2: {
        backgroundColor: 'rgba(85,81,165,255)',
        height: '100%',
        width: '4px'
    },
    stob3: {
        backgroundColor: 'rgba(52,54,92,255)',
        height: '100%',
        width: '4px'
    },
    boardsAnnounce: {
        textTransform: 'uppercase',
        color: 'rgba(118,122,134,255)',
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
        backgroundColor: 'rgba(33,33,45,255)',
        borderRadius: '5px',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        resize: 'none',
        minWidth: '252px'
    },
    visibilityBox: {
        marginBottom: '3em',
        marginLeft: '1.5em',
        marginTop: '1em'
    },
    visibilityButton: {
        width: 'calc(100% - 1.5em - 4px)',
        height: '35px', 
        borderRadius: '10px',
        display: 'flex', 
        justifyContent: 'flex-start'
    },
    visibilityIcon: {
        marginLeft: '5px'
    },
    visibilityText: {
        paddingLeft: '1em',
        whiteSpace: 'nowrap'
    },
    addBoardBase: {
        display: 'flex',
        justifyContent: 'flex-start',
        padding: '5px 0 5px calc(1.5em + 4px)',
        height: '42px',
        width: 'calc(100% - 20px)',
        minWidth: '280px',
        borderRadius: '0 50px 50px 0'
    }
}

function App(): ReactElement {

    const [selectedBoard, setSelectedBoard] = useState<number>(0)
    const [isSideBarShown, setSideBarShown] = useState<boolean>(true)

    const handleHideSideMenu = () => {
        setSideBarShown((prev) => !prev)
    }

    return (
        <div style={styles.container}>
            <div style={{...styles.leftSection, width: isSideBarShown ? '300px' : 0}}>
                <div style={styles.logoBox}>
                    <div style={styles.logo}>
                        <div style={styles.stob1}/>
                        <div style={styles.stob2}/>
                        <div style={styles.stob3}/>
                    </div>
                    <Typography fontSize='28px' fontWeight='bold'>
                        kanban
                    </Typography>
                </div>

                <div style={styles.boardsAnnounce}>
                    <Typography fontSize="10px" letterSpacing='2px' fontWeight='bold'>
                        all boards (8)
                    </Typography>
                </div>

                <List sx={{padding: 0, minHeight: '0px'}}>
                    {boards.map((value, index) => {
                        return (
                            <ListItem key={index} sx={{...styles.boarderListItem}}>
                                <ListItemButton onClick={() => setSelectedBoard(index)} sx={{...styles.boarderListItemButton, '&.Mui-selected': {backgroundColor: 'rgba(99,95,199,255)', minWidth: '280px'}, '&.Mui-selected:hover': {backgroundColor: 'rgba(99,95,199,255)'}}} selected={index === selectedBoard}>
                                    <ListItemIcon>
                                        <GridView htmlColor={selectedBoard === index ? 'white': 'rgba(118,122,134,255)'}/>
                                    </ListItemIcon>
                                    <ListItemText sx={{'& > span': {color: selectedBoard === index ? 'white': 'rgba(118,122,134,255)'}}} primary={`${value}`}/>
                                </ListItemButton>
                            </ListItem>
                        )
                    })}
                </List>

                <ButtonBase sx={styles.addBoardBase}>
                    <div style={{width: '56px', display: 'flex'}}>
                        <Add htmlColor='rgba(99,95,199,255)'/>
                    </div>
                    <Typography color={'rgba(99,95,199,255)'}>
                        Create New Board
                    </Typography>
                </ButtonBase>

                <div style={styles.themeMode}>
                    <LightMode htmlColor='rgba(118,122,134,255)'/>
                    <Switch sx={{'& .MuiSwitch-switchBase': {'&.Mui-checked': {color: 'rgba(99,95,199,255)', '& + .MuiSwitch-track': {backgroundColor: 'rgba(99,95,199,255)'}}}, }}/>
                    <DarkMode htmlColor='rgba(118,122,134,255)'/>
                </div>


                <div style={styles.visibilityBox}>
                    <ButtonBase onClick={handleHideSideMenu} sx={styles.visibilityButton}>
                        <VisibilityOff sx={styles.visibilityIcon} htmlColor='rgba(118,122,134,255)'/>
                        <Typography sx={styles.visibilityText} color='rgba(118,122,134,255)'>
                            Hide Sidebar
                        </Typography>
                    </ButtonBase>
                </div>

            </div>
            <div style={{...styles.rigthSection, marginLeft: isSideBarShown ? '300px' : 0, width: isSideBarShown ? 'calc(100% - 300px)' : '100%'}}>
                <div style={{...styles.navigation}}>
                    <ul style={{...styles.navOptions}}>
                        <li>
                            <div style={{...styles.logo, display: isSideBarShown ? 'none' : 'flex'}}>
                                <div style={styles.stob1}/>
                                <div style={styles.stob2}/>
                                <div style={styles.stob3}/>
                            </div>
                        </li>
                        <li style={styles.navTitle}>
                            <Typography fontSize={'20px'}>
                                Platform Launch
                            </Typography>
                        </li>
                        <li style={{display: isSideBarShown ? 'none' : 'block'}}>
                            <IconButton onClick={() => setSideBarShown(true)} aria-label="delete">
                                <ArrowRight htmlColor='rgba(99,95,199,255)' />
                            </IconButton>
                        </li>
                        <li style={{...styles.endItems}}>
                            <ButtonBase sx={styles.addButton}>
                                <Typography fontSize={'12px'}>
                                    + Add New Task
                                </Typography>
                            </ButtonBase>
                        </li>
                        <li>
                            <IconButton aria-label="delete">
                                <MoreVert htmlColor='rgba(99,95,199,255)' />
                            </IconButton>
                        </li>
                    </ul>
                </div>
                <div style={{...styles.content}}></div>
            </div>
        </div>
    )
}