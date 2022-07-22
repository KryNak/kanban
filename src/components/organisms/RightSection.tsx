import { skipToken } from "@reduxjs/toolkit/dist/query"
import { CSSProperties, ReactElement, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedBoard } from "../../app/features/selectedBoard/selectedBoardSlice"
import { RootState, useGetBoardByIdQuery } from "../../app/strore"
import { ProgressColumn } from "../../data"
import { Board } from "./Board"
import { Navigation } from "./Navigation"

export {RightSection}

const RightSection: () => ReactElement = () => {

    const columns: ProgressColumn[] = ProgressColumn.getMocketProgressColumns()

    const isDarkMode = useSelector((state: RootState) => state.isDarkMode.value)
    const isSideBarShown = useSelector((state: RootState) => state.isSideBarShown.value)

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
            <Navigation/>
            <div style={{
                ...styles.content, 
                backgroundColor: isDarkMode ? 'rgba(34,33,45,255)' : 'rgba(245,247,254,255)'
            }}>
                <Board columns={columns} darkMode={isDarkMode}></Board>
            </div>
        </div>
    )
}