import { useContext} from "react";
import AuthContext from "../contexte/AuthProvider";

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;