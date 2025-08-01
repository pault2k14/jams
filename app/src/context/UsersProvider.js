import React, { createContext,useMemo, useState, useContext } from 'react'
const UsersContext = createContext()
UsersContext.displayName = 'ValueContext'


export const useUsers = () => {
    const context = useContext(UsersContext)
    if (context === undefined) {
        throw new Error('useUsers must be used within a UsersProvider')       }
    return context
}


const UsersProvider = ({ children }) => {
    //const requiredData = require('../data/users/users');
    const [users, setUsers] = useState(require('../data/users/users').usersData)
    //setUsers(requiredData.usersData);

    const usersObject = useMemo(() => {
        return { users, setUsers }
    }, [users, setUsers])

    const getUserById = (userId) => {
        console.log("getUserById: " + userId)
        let selectedUser = users.filter(user => user.userId === userId);
        return selectedUser[0];
    }

    return <UsersContext.Provider value={{
        usersObject,
        getUserById
    }}>{children}  </UsersContext.Provider>
}
export default UsersProvider