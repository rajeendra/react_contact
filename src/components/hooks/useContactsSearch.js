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

    return [searchFilter];
}

export default useContactsSearch