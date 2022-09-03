import {Navigate, Route, Routes} from "react-router-dom";
import {MainView} from "./components/pages/MainView";
import {LoginView} from "./components/pages/LoginView";
import {NotFound} from "./components/pages/NotFound";
import {PrivateRoute} from "./components/organisms/PrivateRoute";

export const App = () => {

    return (

        <Routes>
            <Route index element={<Navigate to={"/login"}/>} />
            <Route path={"/dashboard"} element={<PrivateRoute element={<MainView/>}/>} />
            <Route path={"/login"} element={<LoginView/>}/>
            <Route path={"*"} element={<NotFound/>}/>
        </Routes>

    )
}

