import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, SetUser] = useState(null);

    const updateUser = (userData) => {
        SetUser(userData);
    };

    const clearUser = () => {
        SetUser(null);
    };

    return (
        <UserContext.Provider
            value={{
                user,
                updateUser,
                clearUser
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;