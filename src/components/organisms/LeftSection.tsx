import { Add, DarkMode, GridView, LightMode, VisibilityOff } from "@mui/icons-material"
import { ButtonBase, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch, Typography } from "@mui/material"
import { CSSProperties, Dispatch, ReactElement, SetStateAction, useState } from "react"
import { HeaderTypography } from "../atoms/HeaderTypography"
import { AppLogoTitle } from "../molecules/AppLogoTitle"
export {LeftSection}

type LeftSectionProp = {
    isSideBarShown: boolean,
    isDarkMode: boolean,
    setDarkMode: Dispatch<SetStateAction<boolean>>,
    setSideBarShown: Dispatch<SetStateAction<boolean>>
}

const LeftSection: (prop: LeftSectionProp) => ReactElement = ({isSideBarShown, isDarkMode, setDarkMode, setSideBarShown}: LeftSectionProp) => {

    const boards: string[] = ['Platform Launch', 'Marketing Plan', 'Roadmap']

    const [selectedBoard, setSelectedBoard] = useState<number>(0)

    const handleLightModeChange = () => {
        setDarkMode((prev) => !prev)
    }

    const handleHideSideMenu = () => {
        setSideBarShown((prev) => !prev)
    }

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
            zIndex: 1
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
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            resize: 'none',
            minWidth: '252px',
            transition: 'background-color .5s'
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

    return (
        <div style={{ ...styles.leftSection, width: isSideBarShown ? '300px' : 0, backgroundColor: isDarkMode ? 'rgba(44,44,56,255)' : 'rgba(255, 255, 255, 255)' }}>
            <AppLogoTitle isDarkMode={isDarkMode} />

            <div style={styles.boardsAnnounce}>
                <HeaderTypography>
                    all boards (8)
                </HeaderTypography>
            </div>

            <List sx={{ padding: 0, minHeight: '0px' }}>
                {boards.map((value, index) => {
                    return (
                        <ListItem key={index} sx={{ ...styles.boarderListItem }}>
                            <ListItemButton onClick={() => setSelectedBoard(index)} sx={{ ...styles.boarderListItemButton, '&.Mui-selected': { backgroundColor: 'rgba(99,95,199,255)', minWidth: '280px' }, '&.Mui-selected:hover': { backgroundColor: 'rgba(99,95,199,255)' } }} selected={index === selectedBoard}>
                                <ListItemIcon>
                                    <GridView htmlColor={selectedBoard === index ? 'white' : 'rgba(118,122,134,255)'} />
                                </ListItemIcon>
                                <ListItemText sx={{ '& > span': { color: selectedBoard === index ? 'white' : 'rgba(118,122,134,255)' } }} primary={`${value}`} />
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>

            <ButtonBase sx={styles.addBoardBase}>
                <div style={{ width: '56px', display: 'flex' }}>
                    <Add htmlColor='rgba(99,95,199,255)' />
                </div>
                <Typography color={'rgba(99,95,199,255)'}>
                    Create New Board
                </Typography>
            </ButtonBase>

            <div style={{ ...styles.themeMode, backgroundColor: isDarkMode ? 'rgba(33,33,45,255)' : 'rgba(245,247,254,255)' }}>
                <LightMode htmlColor='rgba(118,122,134,255)' />
                <Switch checked={isDarkMode} onChange={handleLightModeChange} sx={{ '& .MuiSwitch-switchBase': { '&.Mui-checked': { color: 'rgba(99,95,199,255)', '& + .MuiSwitch-track': { backgroundColor: 'rgba(99,95,199,255)' } } }, }} />
                <DarkMode htmlColor='rgba(118,122,134,255)' />
            </div>


            <div style={styles.visibilityBox}>
                <ButtonBase onClick={handleHideSideMenu} sx={styles.visibilityButton}>
                    <VisibilityOff sx={styles.visibilityIcon} htmlColor='rgba(118,122,134,255)' />
                    <Typography sx={styles.visibilityText} color='rgba(118,122,134,255)'>
                        Hide Sidebar
                    </Typography>
                </ButtonBase>
            </div>

        </div>
    )
}