import { CSSProperties } from "@mui/styled-engine"
import React from "react"

export {Logo}

type LogoProp = {
    style?: CSSProperties
}

const Logo: (prop: LogoProp) => React.ReactElement = (prop: LogoProp) => {

    const styles: {[name: string]: React.CSSProperties} = {
        logo: {
            width: '16px',
            height: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            flexShrink: 0
        },
        stob1: {
            backgroundColor: 'rgba(98,98,174,255)',
            height: '100%',
            width: '4px'
        },
        stob2: {
            backgroundColor: 'rgba(85,81,165,255)',
            height: '100%',
            width: '4px'
        },
        stob3: {
            backgroundColor: 'rgba(52,54,92,255)',
            height: '100%',
            width: '4px'
        }
    }

    return (
        <div style={styles.logo}>
            <div style={styles.stob1}/>
            <div style={styles.stob2}/>
            <div style={styles.stob3}/>
        </div>
    )
}