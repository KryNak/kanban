import { ReactElement, useState } from "react"
import { MainViewTemplate } from "../templates/MainViewTemplate"

export {MainView}

const MainView: () => ReactElement = () => {

    const isSideBarShownState = useState<boolean>(true)
    const isDarkModeState = useState<boolean>(true)

    return (
        <MainViewTemplate isDarkModeState={isDarkModeState} isSideBarShownState={isSideBarShownState}/>
    )
}