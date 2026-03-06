import { useContext, type JSX } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import LoadingScreen from "./loadingScreen";

interface Props {
    children: JSX.Element
}

function ProtectorRuta ({ children }: Props) {
    const {user, initialized} = useContext(UserContext);

    if((!initialized)) return <LoadingScreen />;

    if(!user){
        return <Navigate to="/" replace/>;
    }

    return children;
}

export default ProtectorRuta;