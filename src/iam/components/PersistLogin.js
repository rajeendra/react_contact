import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from "../hooks/useAuth";
import useLocalStorage from "../hooks/useLocalStorage";

const PersistLogin = (props) => {
    const { home,setHome } = props

    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    //const { auth, persist } = useAuth();
    const { auth } = useAuth();
    const [ persist ] = useLocalStorage( 'persist' , false);


    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                // fetch and store accessToken in auth global state
                // if accessToken not available
                await refresh();
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }
        
        // Avoids unwanted call to verifyRefreshToken
        //home?.signinOnce && !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);
        !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
    }, [])

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    }, [isLoading])

    return (
        <>
            {!persist
                ? <Outlet />
                : isLoading
                    //? <p>Loading...</p>
                    ? <p></p>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin