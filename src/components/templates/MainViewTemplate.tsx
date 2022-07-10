import { Dispatch, ReactElement, SetStateAction } from "react"
import { LeftSection } from "../organisms/LeftSection"
import { RightSection } from "../organisms/RightSection"
export {MainViewTemplate}

const styles: {[name: string]: React.CSSProperties} = {
    container: {
        height: '100%',
        width: '100%',
        overflow: 'hidden'
    },
    
}

type MainViewTemplateProps = {
    isSideBarShownState: [boolean, Dispatch<SetStateAction<boolean>>]
    isDarkModeState: [boolean, Dispatch<SetStateAction<boolean>>]
}

const MainViewTemplate: (props: MainViewTemplateProps) => ReactElement = ({isSideBarShownState, isDarkModeState}: MainViewTemplateProps) => {

    const [isSideBarShown, setSideBarShown] = isSideBarShownState
    const [isDarkMode, setDarkMode] = isDarkModeState

    return (
        <div style={styles.container}>
            <LeftSection isDarkMode={isDarkMode} isSideBarShown={isSideBarShown} setSideBarShown={setSideBarShown} setDarkMode={setDarkMode}/>
            <RightSection setSideBarShown={setSideBarShown} isDarkMode={isDarkMode} isSideBarShown={isSideBarShown}/>
        </div>
    )
}