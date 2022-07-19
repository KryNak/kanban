import { Dispatch, ReactElement, SetStateAction, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Board } from "../../dto/DTOs"
import { RootState, useGetBoardsQuery } from "../../app/strore"
import { LeftSection } from "../organisms/LeftSection"
import { RightSection } from "../organisms/RightSection"
import { setSelectedBoard } from "../../app/features/selectedBoard/selectedBoardSlice"
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

    const selectedBoard = useSelector((state: RootState) => state.selectedBoard.value)
    const dispatch = useDispatch()

    const {data, isSuccess} = useGetBoardsQuery()

    const handleSelectBoard = (board: Board) => () => {
        dispatch(setSelectedBoard(board))
    }

    useEffect(() => {
        dispatch(setSelectedBoard(data?.at(0) ?? null))
    }, [isSuccess])

    return (
        <div style={styles.container}>
            <LeftSection selectedBoard={selectedBoard} handleSelectBoard={handleSelectBoard} boards={data ?? []} isDarkMode={isDarkMode} isSideBarShown={isSideBarShown} setSideBarShown={setSideBarShown} setDarkMode={setDarkMode}/>
            <RightSection board={selectedBoard} setSideBarShown={setSideBarShown} isDarkMode={isDarkMode} isSideBarShown={isSideBarShown}/>
        </div>
    )
}