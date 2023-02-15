import useLocalStorage from "./useLocalStorage";

const useToggle = (key, initValue) => {
    // returns store value if available Otherwise returns initValue
    // This value ( passing to Signin page ) use in checkbox's checked={check}
    const [value, setValue] = useLocalStorage(key, initValue);

    // This function ( passing to Signin page ) call by checkbox's onChange={toggleCheck}
    const toggle = (value) => {
        setValue(prev => {
            return typeof value === 'boolean' ? value : !prev;
        })
    }

    return [value, toggle];
}

export default useToggle