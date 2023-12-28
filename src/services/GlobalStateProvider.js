import { useState } from 'react';
import { createContext } from 'react';
export const GlobalStateContext = createContext();

const GlobalStateProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')) || {username: null});
    const saveUser = (newUser) => {
        setUser(newUser)
        sessionStorage.setItem('user', JSON.stringify(newUser))
    }

    const unsetUser = () => {
        setUser({username: null})
        sessionStorage.setItem('user', JSON.stringify({username: null}))
    }

    return (
        <GlobalStateContext.Provider value={[user, saveUser, unsetUser]}>
            {children}
        </GlobalStateContext.Provider>
    );
};

export default GlobalStateProvider;