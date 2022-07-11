import { ArrowRight, DarkMode, MoreVert } from "@mui/icons-material"
import { ButtonBase, Dialog, IconButton, List, ListItem, MenuItem, Select, TextField, Typography } from "@mui/material"
import { CSSProperties, Dispatch, ReactElement, SetStateAction, useState } from "react"
import { colors } from "../../colors"
import { AddTaskDialog } from "../molecules/AddTaskDialog"

export{Navigation}

type NavigationProps = {
    isDarkMode: boolean,
    isSideBarShown: boolean,
    setSideBarShown: Dispatch<SetStateAction<boolean>>
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
        backgroundColor: 'rgba(99,95,199,255)',
        padding: '10px',
        borderRadius: '25px',
        whiteSpace: 'nowrap'
    },
    navTitle: {
        fontSize: '20px',
        whiteSpace: 'nowrap'
    },
    dialog: {
        
    }
}

const Navigation: (props: NavigationProps) => ReactElement = ({isDarkMode, isSideBarShown, setSideBarShown}: NavigationProps) => {

    const [isDialogOpen, setDialogOpen] = useState<boolean>(false)

    return (<>
        <div style={{
            ...styles.navigation, 
            backgroundColor: isDarkMode ? 'rgba(44,44,56,255)' : 'rgba(255, 255, 255, 255)',
            borderLeftColor: isDarkMode ? 'rgba(50,50,62,255)' : 'rgba(251,251,251,255)'
            }}>
            <ul style={{...styles.navOptions}}>
                <li style={styles.navTitle}>
                    <Typography sx={{transition: 'color .5s'}} color={isDarkMode ? 'white' : 'black'} fontSize={'20px'}>
                        Platform Launch
                    </Typography>
                </li>
                <li style={{display: isSideBarShown ? 'none' : 'block'}}>
                    <IconButton onClick={() => setSideBarShown(true)} aria-label="delete">
                        <ArrowRight htmlColor='rgba(99,95,199,255)' />
                    </IconButton>
                </li>
                <li style={{...styles.endItems}}>
                    <ButtonBase onClick={() => setDialogOpen(true)} sx={styles.addButton}>
                        <Typography fontSize={'12px'}>
                            + Add New Task
                        </Typography>
                    </ButtonBase>
                </li>
                <li>
                    <IconButton>
                        <MoreVert htmlColor='rgba(99,95,199,255)' />
                    </IconButton>
                </li>
            </ul>
        </div>
        <AddTaskDialog isDarkMode={isDarkMode} isDialogOpen={isDialogOpen} setDialogOpen={setDialogOpen}/>
    </>)
}