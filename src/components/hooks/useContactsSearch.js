import useAuth from "../../iam/hooks/useAuth";

const useContactsSearch = () => {
    const { auth, setAuth } = useAuth(); 

    const searchFilterExc = (text) => auth?.fetchedContacts.filter((el) => {
        // if no input the return the original
        if (text === '' || text === null || text === (null) ) {
            return el;
        }
        // return the item which contains the text
        else {
            return  el.fname.toLowerCase().includes(text.toLowerCase()) 
                    || 
                    el.cpse && el.cpse.toLowerCase().includes(text.toLowerCase())
        }
    })  

    const searchFilter =(text) => {
        return auth?.fetchedContacts ? searchFilterExc(text) : []; 
    }

    const addNumbers = (num1, num2) => {
        return num1 + num2;
    }

    // return [searchFilter];
    // return [searchFilter, addNumbers];
    // This is the way should return when multiple return values are available..
    // ..to enable partly fetch at using time
    // ex: const {one, three} = useXXX();
    // ex: const {addNumbers} = useContactsSearch();
    return {
        searchFilter,
        addNumbers
    };
        
}

export default useContactsSearch