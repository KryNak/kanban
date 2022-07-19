import { ReactElement } from "react"
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

const MainViewTemplate: () => ReactElement = () => {
     return (
        <div style={styles.container}>
            <LeftSection/>
            <RightSection/>
        </div>
    )
}