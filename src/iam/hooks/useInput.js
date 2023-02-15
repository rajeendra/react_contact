import useLocalStorage, {getLocalValue} from "./useLocalStorage";

const useInput = (key, initValue) => {
    // This < value > return from useLocalStorage() is a sate value
    // This < setValue > return from useLocalStorage() is a function which set state value
    // This is an EXTENSION to useState hook
        // Buit-in hook has a standard definition with inputs
        // it can extend to new definition with cutomize inputs and cutomize return vslues 
    // Since we know what it retrns (Ex: satate, statee setter, any other objects or value) .. 
    // .. we can use it after import anywhere in the code as below

    const [value, setValue] = useLocalStorage(key, initValue);

    const reset = () => setValue(initValue);

    const handleChange = (value) => {
        setValue(value);
    }

    const attributeObj = {
        // value : value 
        value,

        //onChange: (e) => setValue(e.target.value)
        onChange: (e) => { handleChange(e.target.value) }
    }

    return [value, reset, attributeObj];
}

export default useInput 