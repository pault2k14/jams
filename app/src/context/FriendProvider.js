import React, {createContext, useMemo, useState, useContext, useEffect} from 'react'
import * as friendUtils from "./friendUtils";
const FriendsContext = createContext()
FriendsContext.displayName = 'ValueContext'

export const useFriends = () => {
    const context = useContext(FriendsContext)
    if (context === undefined) {
        throw new Error('useFriends must be used within a FriendsProvider')       }
    return context
}

const FriendsProvider = ({ children }) => {
    const [currentUserId, setCurrentUserId] = useState(null);

    const [friends, setFriends] = useState([]);
    const friendsObject = useMemo(() => {
        return { friends, setFriends }
    }, [friends, setFriends])

    const [incomingFriendRequests, setIncomingFriendRequests] = useState([]);
    const incomingFriendRequestsObject = useMemo(() => {
        return { incomingFriendRequests, setIncomingFriendRequests }
    }, [incomingFriendRequests, setIncomingFriendRequests])

    const [outgoingFriendRequests, setOutgoingFriendRequests] = useState([]);
    const outgoingFriendRequestsObject = useMemo(() => {
        return { outgoingFriendRequests, setOutgoingFriendRequests }
    }, [outgoingFriendRequests, setOutgoingFriendRequests])

    const setFriendsByUserId = (userId) => {
        console.log("setFriendsByUserId: " + userId)
        friendUtils.setFriendsByUserId(userId, currentUserId, setCurrentUserId, setFriends,
            setIncomingFriendRequests, setOutgoingFriendRequests)
    }


    const sendFriendRequest = (requestingUserId, friendUserId) => {
        friendUtils.sendFriendRequest(requestingUserId, friendUserId, outgoingFriendRequests, setOutgoingFriendRequests)
    }

    const confirmFriendRequest = (confirmingUser, requestingFriend) => {
        friendUtils.confirmFriendRequest(confirmingUser, requestingFriend, friends, setFriends,
            incomingFriendRequests, setIncomingFriendRequests)
    }

    const deleteOutgoingFriendRequest = (userDeletingRequest, userThatWasRequested) => {
        friendUtils.deleteOutgoingFriendRequest(userDeletingRequest, userThatWasRequested, outgoingFriendRequests, setOutgoingFriendRequests)
    }

    const deleteIncomingFriendRequest = (userDeletingRequest, userThatMadeRequest) => {
        friendUtils.deleteIncomingFriendRequest(userDeletingRequest, userThatMadeRequest, incomingFriendRequests, setIncomingFriendRequests)
    }

    const addBlockUser = (userId) => {

    }

    const deleteBlockUser = (userId) => {

    }

    const getNumberOfFriendsByUserId = (userIdToLookup) => {
        console.log("getNumberOfFriendsByUserId: " + userIdToLookup)
        if(!sessionStorage.getItem('friends-' + userIdToLookup)) {
            console.log("getNumberOfFriendsByUserId Unable to find friends for user: " + userIdToLookup)
            let requiredData = require('../data/friends/' + userIdToLookup);
            return requiredData.friendData.friends.length;
        } else {
            console.log("getNumberOfFriendsByUserId FriendProvider friendsFromStorage")
            let sessionFriends = JSON.parse(sessionStorage.getItem('friends-' + userIdToLookup));
            return sessionFriends.friends.length
        }
    }

    const getNumberOfMutualFriendsByUserId = (activeUserId, userIdIoIntersect) => {
        // 1. Load active user friends
        let activeUserFriends = null;
        let userToIntersectFriends = null;

        if(!sessionStorage.getItem('friends-' + activeUserId)) {
            console.log("getNumberOfMutualFriendsByUserId Unable to find friends for user: " + activeUserId)
            let requiredData = require('../data/friends/' + activeUserId);
            activeUserFriends = requiredData.friendData.friends;
        } else {
            console.log("getNumberOfMutualFriendsByUserId FriendProvider friendsFromStorage")
            let sessionFriends = JSON.parse(sessionStorage.getItem('friends-' + activeUserId));
            activeUserFriends = sessionFriends.friends
        }

        // 2. Load user to intersect friends
        if(!sessionStorage.getItem('friends-' + userIdIoIntersect)) {
            console.log("getNumberOfMutualFriendsByUserId Unable to find friends for user: " + userIdIoIntersect)
            let requiredData = require('../data/friends/' + userIdIoIntersect);
            userToIntersectFriends = requiredData.friendData.friends;
        } else {
            console.log("getNumberOfMutualFriendsByUserId FriendProvider friendsFromStorage")
            let sessionFriends = JSON.parse(sessionStorage.getItem('friends-' + userIdIoIntersect));
            userToIntersectFriends = sessionFriends.friends
        }

        activeUserFriends = activeUserFriends.map(friend => friend.userId);
        userToIntersectFriends = userToIntersectFriends.map(friend => friend.userId);

        // 3. Check for intersection of the arrays
        return activeUserFriends.filter(friendId => userToIntersectFriends.includes(friendId)).length
    }

    const getArrayOfMutualFriends = (activeUserId, userIdIoIntersect) => {
        // 1. Load active user friends
        let activeUserFriends = null;
        let userToIntersectFriends = null;

        if(!sessionStorage.getItem('friends-' + activeUserId)) {
            console.log("getNumberOfMutualFriendsByUserId Unable to find friends for user: " + activeUserId)
            let requiredData = require('../data/friends/' + activeUserId);
            activeUserFriends = requiredData.friendData.friends;
        } else {
            console.log("getNumberOfMutualFriendsByUserId FriendProvider friendsFromStorage")
            let sessionFriends = JSON.parse(sessionStorage.getItem('friends-' + activeUserId));
            activeUserFriends = sessionFriends.friends
        }

        // 2. Load user to intersect friends
        if(!sessionStorage.getItem('friends-' + userIdIoIntersect)) {
            console.log("getNumberOfMutualFriendsByUserId Unable to find friends for user: " + userIdIoIntersect)
            let requiredData = require('../data/friends/' + userIdIoIntersect);
            userToIntersectFriends = requiredData.friendData.friends;
        } else {
            console.log("getNumberOfMutualFriendsByUserId FriendProvider friendsFromStorage")
            let sessionFriends = JSON.parse(sessionStorage.getItem('friends-' + userIdIoIntersect));
            userToIntersectFriends = sessionFriends.friends
        }

        //activeUserFriends = activeUserFriends.map(friend => friend.userId);
        //userToIntersectFriends = userToIntersectFriends.map(friend => friend.userId);

        // 3. Check for intersection of the arrays
        return activeUserFriends.filter(friend => {
            return userToIntersectFriends.some(userToIntersecFriend => friend.id === userToIntersecFriend.id)
        })

    }

    useEffect(() => {
        if(!currentUserId) {
            return;
        }

        sessionStorage.setItem('friends-' + currentUserId, JSON.stringify({
            friends: friends,
            incomingFriendRequests: incomingFriendRequests,
            outgoingFriendRequests: outgoingFriendRequests
        }));
    }, [friends, incomingFriendRequests, outgoingFriendRequests]);


    return <FriendsContext.Provider value={{
        friendsObject,
        incomingFriendRequestsObject,
        outgoingFriendRequestsObject,
        setFriendsByUserId,
        sendFriendRequest,
        confirmFriendRequest,
        deleteOutgoingFriendRequest,
        deleteIncomingFriendRequest,
        getNumberOfFriendsByUserId,
        getNumberOfMutualFriendsByUserId,
        getArrayOfMutualFriends
    }}>{children}</FriendsContext.Provider>
}
export default FriendsProvider