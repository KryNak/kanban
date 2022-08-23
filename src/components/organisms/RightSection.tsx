import { CSSProperties, ReactElement } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { DetailsTaskDialog } from "../molecules/DetailsTaskDialog"
import { Board } from "./Board"
import { Navigation } from "./Navigation"

export {RightSection}

const RightSection: () => ReactElement = () => {

    const isDarkMode = useSelector((state: RootState) => state.isDarkMode.value)
    const isSideBarShown = useSelector((state: RootState) => state.isSideBarShown.value)
    const isMobileViewMode = useSelector((state: RootState) => state.isMobileViewMode.value)

    const styles: {[name: string]: CSSProperties} = {
        rigthSection: {
            width: isSideBarShown ? 'calc(100% - 300px)' : '100%',
            height: '100%',
            overflowX: 'hidden',
            transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
        },
        content: {
            width: '100%',
            minWidth: '500px',
            transition: 'background-color .5s',
            height: 'calc(100% - 80px)'
        },
        mainSection: {
            width: '100%',
            height: '100%',
            overflowX: 'hidden'
        }
    }

    return (
        <div style={isMobileViewMode ? styles.mainSection : styles.rigthSection}>
            <Navigation/>
            <div style={{
                ...styles.content, 
                backgroundColor: isDarkMode ? 'rgba(34,33,45,255)' : 'rgba(245,247,254,255)'
            }}>
                <Board/>
                <DetailsTaskDialog/>
            </div>
        </div>
    )
}