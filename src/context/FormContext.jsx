import { createContext, useState } from "react";


export const FormContext = createContext();

export const FormContextProvider = ({ children }) => {

    const [form,setForm] = useState(localStorage.getItem("form") ? JSON.parse(localStorage.getItem("form")) :null);

    return (
        <FormContext.Provider value={{form,setForm}}>
            {children}
        </FormContext.Provider>
    )
}