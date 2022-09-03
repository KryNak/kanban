import {ReactElement} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {LoadingPage} from "../pages/LodingPage";
import {Navigate} from "react-router-dom";
import {sec} from "../../security";

interface PrivateRouteProps {
    element: ReactElement
}

export const PrivateRoute: (props: PrivateRouteProps) => ReactElement = ({element}) => {

    const {isAuthenticated, isLoading, getAccessTokenSilently} = useAuth0()

    if(isLoading) {
        return (
            <LoadingPage/>
        )
    }
    else {
        if(isAuthenticated) {
            sec.setAccessTokenSilently(getAccessTokenSilently);
            return element
        }
        else return (<Navigate to={'/login'}/>)
    }

}