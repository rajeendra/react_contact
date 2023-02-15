import { useState, useEffect } from "react";

// This hook received a key assign to a state which use to store a value in localStorage
// First it fetch the value from localStorage if not available the init value will set

export const getLocalValue = (key, initValue) => {

    //const [ persist ] = useLocalStorage( 'persist' , false);

    //SSR Next.js 
    if (typeof window === 'undefined') return initValue;
    
    // Get the value of SignIn page's <Remember me> 
    const persist = JSON.parse(localStorage.getItem('persist'));

    // if a value is already store 
    const localValue = persist && JSON.parse(localStorage.getItem(key));
    if (localValue) return localValue;

    // return result of a function 
    if (initValue instanceof Function) return initValue();

    return initValue;
}

const useLocalStorage = (key, initValue) => {
    const [value, setValue] = useState(() => {
        return getLocalValue(key, initValue); // return either localValue or initValue
    });

    //const [value, setValue] = useState(JSON.parse(localStorage.getItem(key)) || initValue );

    // This will trigger on stae value change for any key declaration
    // const [user, setUser] = useLocalStorage('key-user',''); 
    // const [id , setId] = useLocalStorage('key-id',''); 
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value])

    return [value, setValue];
}

export default useLocalStorage 