import React, {createContext, useMemo, useState, useContext, useEffect} from 'react'
import * as friendUtils from "./friendUtils";
const ProfileFriendsContext = createContext()
ProfileFriendsContext.displayName = 'ValueContext'

export const useProfileFriends = () => {
    const context = useContext(ProfileFriendsContext)
    if (context === undefined) {
        throw new Error('useProfileFriends must be used within a ProfileFriendsProvider')       }
    return context
}

const ProfileFriendsProvider = ({ children }) => {
    const [profileFriends, setProfileFriends] = useState([]);

    const [profileUserId, setProfileUserId] = useState(null);
    const profileFriendsObject = useMemo(() => {
        return { profileFriends, setProfileFriends }
    }, [profileFriends, setProfileFriends])

    const [incomingProfileFriendRequests, setIncomingProfileFriendRequests] = useState([]);
    const incomingProfileFriendRequestsObject = useMemo(() => {
        return { incomingProfileFriendRequests, setIncomingProfileFriendRequests }
    }, [incomingProfileFriendRequests, setIncomingProfileFriendRequests])

    const [outgoingProfileFriendRequests, setOutgoingProfileFriendRequests] = useState([]);
    const outgoingProfileFriendRequestsObject = useMemo(() => {
        return { outgoingProfileFriendRequests, setOutgoingProfileFriendRequests }
    }, [outgoingProfileFriendRequests, setOutgoingProfileFriendRequests])

    const setProfileFriendsByUserId = (userId) => {
        friendUtils.setProfileFriendsByUserId(userId, profileUserId, setProfileUserId, setProfileFriends,
            setIncomingProfileFriendRequests, setOutgoingProfileFriendRequests)

        /*
        setProfileUserId(userId);

        if(!sessionStorage.getItem('profileFriends-' + userId)) {
            console.log("ProfileFriendsProvider Unable to find profile friends for user: " + userId)
            let requiredData = require('../data/friends/' + userId);
            setProfileFriends(requiredData.friendData.friends)
            setProfileFriendRequests(requiredData.friendData.friendRequests)
            sessionStorage.setItem('profileFriends-' + userId, JSON.stringify(requiredData.friendData))
        } else {
            console.log("ProfileFriendsProvider setProfileFriendsByUserId")
            let sessionFriends = JSON.parse(sessionStorage.getItem('profileFriends-' + userId));
            console.log("sessionFriends");
            console.dir(sessionFriends)
            setProfileFriends(sessionFriends.friends);
            setProfileFriendRequests(sessionFriends.friendRequests);
        }
         */
    }

    const sendProfileFriendRequest = (requestingUserId, friendUserId) => {
        friendUtils.sendProfileFriendRequest(requestingUserId, friendUserId, outgoingProfileFriendRequests, setOutgoingProfileFriendRequests)
    }

    const confirmProfileFriendRequest = (confirmingUser, requestingFriend) => {
        friendUtils.confirmProfileFriendRequest(confirmingUser, requestingFriend, profileFriends, setProfileFriends,
            incomingProfileFriendRequests, setIncomingProfileFriendRequests)
    }

    useEffect(() => {
        if(!profileUserId) {
            return;
        }

        sessionStorage.setItem('profile-friends-' + profileUserId, JSON.stringify({
            friends: profileFriends,
            incomingFriendRequests: incomingProfileFriendRequests,
            outgoingFriendRequests: outgoingProfileFriendRequests
        }));
    }, [profileFriends, incomingProfileFriendRequests, outgoingProfileFriendRequests]);


    return <ProfileFriendsContext.Provider value={{
        profileFriendsObject,
        incomingProfileFriendRequestsObject,
        outgoingProfileFriendRequestsObject,
        setProfileFriendsByUserId,
        sendProfileFriendRequest,
        confirmProfileFriendRequest
    }}>{children}</ProfileFriendsContext.Provider>
}
export default ProfileFriendsProvider