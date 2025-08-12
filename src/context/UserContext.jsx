import { createContext, useState } from "react";


export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {

    const [user,setUser] = useState(localStorage.getItem("user") ? localStorage.getItem("user") :null);

    return (
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}