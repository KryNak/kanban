import { CSSProperties, Dispatch, ReactElement, SetStateAction } from "react"
import { ProgressColumn } from "../../data"
import { Board } from "./Board"
import { Navigation } from "./Navigation"

export {RightSection}

type RightSectionProps = {
    isSideBarShown: boolean,
    isDarkMode: boolean,
    setSideBarShown: Dispatch<SetStateAction<boolean>>
}

const RightSection: (props: RightSectionProps) => ReactElement = ({isSideBarShown, isDarkMode, setSideBarShown}: RightSectionProps) => {

    const columns: ProgressColumn[] = ProgressColumn.getMocketProgressColumns()

    const styles: {[name: string]: CSSProperties} = {
        rigthSection: {
            width: '100%',
            height: '100%',
            transition: 'margin-left .5s, width .5s',
            overflowX: 'hidden'
        },
        content: {
            width: '100%',
            minWidth: '500px',
            transition: 'background-color .5s',
            height: 'calc(100% - 80px)'
        },
    }

    return (
        <div style={{
            ...styles.rigthSection, 
            marginLeft: isSideBarShown ? '300px' : 0, 
            width: isSideBarShown ? 'calc(100% - 300px)' : '100%'
            }}>
            <Navigation isDarkMode={isDarkMode} isSideBarShown={isSideBarShown} setSideBarShown={setSideBarShown}/>
            <div style={{
                ...styles.content, 
                backgroundColor: isDarkMode ? 'rgba(34,33,45,255)' : 'rgba(245,247,254,255)'
            }}>
                <Board columns={columns} darkMode={isDarkMode}></Board>
            </div>
        </div>
    )
}