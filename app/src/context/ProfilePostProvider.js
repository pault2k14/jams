import React, {createContext, useMemo, useState, useContext, useEffect} from 'react'
import {FaB, FaJ, FaP} from "react-icons/fa6";
const ProfilePostContext = createContext()
ProfilePostContext.displayName = 'ValueContext'


export const getUserById = (users, userId) => {
    let selectedUser = users.filter(user => user.userId === userId);
    return selectedUser[0];
}


export const getPostsByUserId = (posts, userId) => {
    let selectedPosts = posts.filter(post => post.userId === userId);
    return selectedPosts[0];
}

export const useProfilePost = () => {
    const context = useContext(ProfilePostContext)
    if (context === undefined) {
        throw new Error('useProfilePost must be used within a ProfilePostProvider')       }
    return context
}

const ProfilePostProvider = ({ children }) => {
    const [currentUserId, setCurrentUserId] = useState(null);

    const [profilePosts, setProfilePosts] = useState([])
    const profilePostsObject = useMemo(() => {
        return { profilePosts, setProfilePosts }
    }, [profilePosts, setProfilePosts])

    const setProfilePostsByUserId = (userId) => {
        setCurrentUserId(userId);

        if(!sessionStorage.getItem('posts-' + userId)) {
            console.log("ProfilePostProvider Unable to find profile posts for user: " + currentUserId)
            let requiredData = require('../data/posts/' + userId);
            setProfilePosts(requiredData.postsData)
            console.log("---- setProfilePostsByUserId ---- writing user id: " + userId);
            sessionStorage.setItem('posts-' + userId, JSON.stringify(requiredData.postsData))
        } else {
            console.log("ProfilePostProvider profilePostsFromStorage for userId: " + userId)
            let sessionPosts = JSON.parse(sessionStorage.getItem('posts-' + userId));
            setProfilePosts(sessionPosts);
        }
    }

    return <ProfilePostContext.Provider value={{profilePostsObject, setProfilePostsByUserId}}>{children}  </ProfilePostContext.Provider>
}
export default ProfilePostProvider