import axios, { AxiosResponse } from "axios"
import { Dispatch, ReactElement, SetStateAction, useEffect, useState } from "react"
import { Board } from "../../dto/DTOs"
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
    const [boards, setBoards] = useState<Board[]>([])
    const [selectedBoard, setSelectedBoard] = useState<Board | null>(null)

    const handleSelectBoard = (board: Board) => () => {
        setSelectedBoard(board)
    }

    useEffect(() => {
        const fetchData  = async () => {
            const response: AxiosResponse<Board[]> = await axios.get<Board[]>("http://localhost:8080/api/boards")
            setBoards(response.data)
            setSelectedBoard(response.data[0])
        }

        fetchData().catch(console.error)
    }, [])

    return (
        <div style={styles.container}>
            <LeftSection selectedBoard={selectedBoard} handleSelectBoard={handleSelectBoard} boards={boards} isDarkMode={isDarkMode} isSideBarShown={isSideBarShown} setSideBarShown={setSideBarShown} setDarkMode={setDarkMode}/>
            <RightSection board={selectedBoard} setSideBarShown={setSideBarShown} isDarkMode={isDarkMode} isSideBarShown={isSideBarShown}/>
        </div>
    )
}