import { useContext, useDebugValue } from "react";
import AppContext from "./AppContextProvider";

const useContextData = () => {
        
    //const { contextData } = useContext(AppContext);
    //console.log("contextData.responseOne: "+contextData?.responseOne)
    return useContext(AppContext);
}

export default useContextData;