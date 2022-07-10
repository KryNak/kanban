import { CSSProperties, ReactElement } from "react"
import { Logo } from "../atoms/Logo"
import { AppTitle } from "../atoms/AppTitle"

export {AppLogoTitle}

type AppLogoTitleProp = {
    isDarkMode: boolean
}

const AppLogoTitle: (prop: AppLogoTitleProp) => ReactElement = ({isDarkMode}: AppLogoTitleProp) => {

    const styles: {[name: string]: CSSProperties} = {
        logoBox: {
            height: '80px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '10px',
            marginLeft: '1.5em',
            flexShrink: 0
        }
    }

    return (
        <div style={styles.logoBox}>
            <Logo/>
            <AppTitle isDarkMode={isDarkMode}/>
        </div>
    )
}