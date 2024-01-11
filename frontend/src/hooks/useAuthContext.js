import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

// to use Context
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw Error('useAuthContext must be used inside an AuthContextProvider');
    }
    // return context: [state, dispatch] = useReducer(authReducer, { user: null});
    return context
};