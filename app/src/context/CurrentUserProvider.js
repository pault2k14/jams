import React, {createContext, useMemo, useState, useContext, useEffect} from 'react'
const CurrentUserContext = createContext()
CurrentUserContext.displayName = 'ValueContext'

export const useCurrentUser = () => {
    const context = useContext(CurrentUserContext)
    if (context === undefined) {
        throw new Error('useCurrentUser must be used within a CurrentUserProvider')       }
    return context
}

const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);

    const currentUserObject = useMemo(() => {
        return { currentUser, setCurrentUser }
    }, [currentUser, setCurrentUser])

    const setCurrentUserByUserId = (userId) => {
        setCurrentUserId(userId);

        if(!sessionStorage.getItem('currentUser-' + userId)) {
            console.log("CurrentUserProvider Unable to find CurrentUser for user: " + currentUserId)
            let requiredData = require('../data/currentUser/' + userId);
            setCurrentUser(requiredData.currentUserData)
            sessionStorage.setItem('currentUser-' + userId, JSON.stringify(requiredData.currentUserData))
        } else {
            console.log("CurrentUserProvider currentUserFromStorage")
            let sessionCurrentUser = JSON.parse(sessionStorage.getItem('currentUser-' + userId));
            setCurrentUser(sessionCurrentUser);
        }
    }

    useEffect(() => {
        if(!currentUserId) {
            return;
        }

        sessionStorage.setItem('currentUser-' + currentUserId, JSON.stringify(currentUser));
    }, [currentUser]);


    return <CurrentUserContext.Provider value={{currentUserObject, setCurrentUserByUserId}}>{children}</CurrentUserContext.Provider>
}
export default CurrentUserProvider