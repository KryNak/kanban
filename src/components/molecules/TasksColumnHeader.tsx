import { HeaderTypography } from "../atoms/HeaderTypography"
import React from "react"

export {ColumnHeader}

type ColumnHeaderProps = {
    color: string,
    children: string,
    style?: React.CSSProperties
}

function ColumnHeader({children, color, style}: ColumnHeaderProps): React.ReactElement {

    const styles: {[name: string]: React.CSSProperties} = {
        circle: {
            backgroundColor: color,
            height: '12px', 
            width: '12px',
            borderRadius: '90%'
        },
        contentWrapper: {
            display: 'flex',
            gap: '10px'
        },
        container: {
            height: '50px',
            display: 'flex',
            alignItems: 'center'
        }
    }

    return (
        <div style={{...styles.container, ...style}}>
            <div style={styles.contentWrapper}>
                <div style={styles.circle}/>
                <HeaderTypography>{children}</HeaderTypography>
            </div>
        </div>
    )
}