import { createContext, useState } from "react";

// This context to hold the application date
// usage:   const {contextData, setContextData} = useContextData();
const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
    const [contextData, setContextData] = useState({});

    return (
        <AppContext.Provider value={{ contextData, setContextData }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;