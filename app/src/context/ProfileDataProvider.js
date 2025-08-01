import React, { createContext,useMemo, useState, useContext } from 'react'
const ProfileDataContext = createContext()
ProfileDataContext.displayName = 'ValueContext'

const initialProfileData = []


export const useProfileData = () => {
    const context = useContext(ProfileDataContext)
    if (context === undefined) {
        throw new Error('useProfileData must be used within a ProfileDataProvider')       }
    return context
}

const ProfileDataProvider = ({ children }) => {
    const [profile, setProfile] = useState(null)
    const profileObject = useMemo(() => {
        return { profile, setProfile }
    }, [profile, setProfile])

    const [profilePosts, setProfilePosts] = useState([])
    const postsProfileObject = useMemo(() => {
        return { profilePosts, setProfilePosts }
    }, [profilePosts, setProfilePosts])

    return <ProfileDataContext.Provider value={{profileObject, postsProfileObject}}>{children}  </ProfileDataContext.Provider>
}
export default ProfileDataProvider