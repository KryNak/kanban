import { useMediaQuery } from "@mui/material"
import { ReactElement, useEffect } from "react"
import { useDispatch } from "react-redux"
import { setMobileViewModeOff, setMobileViewModeOn } from "../../app/features/isMobileViewMode/isMobileViewModel"
import { setTabletViewModeOff, setTabletViewModeOn } from "../../app/features/isTabletViewModel/isTabletViewMode"
import { LeftSection } from "../organisms/LeftSection"
import { RightSection } from "../organisms/RightSection"
export {MainViewTemplate}

const styles: {[name: string]: React.CSSProperties} = {
    container: {
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row'
    },
    
}

const MainViewTemplate: () => ReactElement = () => {

const dispatch = useDispatch()

const mobileViewMode = useMediaQuery('(max-width: 576px)')
const tabletViewMode = useMediaQuery('(max-width: 768px)')

useEffect(() => {
    dispatch(mobileViewMode ? setMobileViewModeOn() : setMobileViewModeOff())
}, [mobileViewMode])

useEffect(() => {
    dispatch(tabletViewMode ? setTabletViewModeOn() : setTabletViewModeOff())
}, [tabletViewMode])

     return (
        <div style={styles.container}>
            <LeftSection/>
            <RightSection/>
        </div>
    )
}