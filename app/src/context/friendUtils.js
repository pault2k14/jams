

export const setFriendsByUserId = (userId, currentUserId, setCurrentUserId, setFriends,
                            setIncomingFriendRequests, setOutgoingFriendRequests) => {

    setCurrentUserId(userId);

    if(!sessionStorage.getItem('friends-' + userId)) {
        console.log("FriendProvider Unable to find friends for user: " + currentUserId)
        let requiredData = require('../data/friends/' + userId);
        console.log("requiredData.friendData");
        console.dir(requiredData.friendData);
        setFriends([...requiredData.friendData.friends]);
        setIncomingFriendRequests([...requiredData.friendData.incomingFriendRequests])
        setOutgoingFriendRequests([...requiredData.friendData.outgoingFriendRequests])
        sessionStorage.setItem('friends-' + userId, JSON.stringify(requiredData.friendData))
    } else {
        console.log("FriendProvider friendsFromStorage")
        let sessionFriends = JSON.parse(sessionStorage.getItem('friends-' + userId));
        console.log("sessionFriends")
        console.dir(sessionFriends);
        setFriends(sessionFriends.friends);
        setIncomingFriendRequests(sessionFriends.incomingFriendRequests);
        setOutgoingFriendRequests(sessionFriends.outgoingFriendRequests);
    }
}

export const sendFriendRequest = (requestingUserId, friendUserId, outgoingFriendRequests, setOutgoingFriendRequests) => {
    console.log("sendFriendRequest");
    let friendUserFriends = JSON.parse(sessionStorage.getItem('friends-' + friendUserId));

    if(!friendUserFriends) {
        console.log("friend user Id: " + friendUserId +  " session not loaded")
        let requiredData = require('../data/friends/' + friendUserId);
        sessionStorage.setItem('friends-' + friendUserId, JSON.stringify(requiredData.friendData))
        friendUserFriends = JSON.parse(sessionStorage.getItem('friends-' + friendUserId));
    }

    setOutgoingFriendRequests([...outgoingFriendRequests, {userId: friendUserId}])
    friendUserFriends.incomingFriendRequests.push({
        userId: requestingUserId
    });
    sessionStorage.setItem('friends-' + friendUserId, JSON.stringify(friendUserFriends));
}

export const confirmFriendRequest = (confirmingUser, requestingFriend, friends, setFriends,
                              incomingFriendRequests, setIncomingFriendRequests) => {
    console.log("confirmFriendRequest");
    let requestingUserFriends = JSON.parse(sessionStorage.getItem('friends-' + requestingFriend.userId));

    if(!requestingUserFriends) {
        console.log("requesting friend user Id: " + requestingFriend.userId +  " session not loaded")
        let requiredData = require('../data/friends/' + requestingFriend.userId);
        sessionStorage.setItem('friends-' + requestingFriend.userId, JSON.stringify(requiredData.friendData))
        requestingUserFriends = JSON.parse(sessionStorage.getItem('friends-' + requestingFriend.userId));
    }

    let updatedIncomingFriendRequests = incomingFriendRequests.filter(request => request.userId !== requestingFriend.userId)
    setIncomingFriendRequests([...updatedIncomingFriendRequests])
    setFriends([...friends, requestingFriend])

    console.log("requestingUserFriends");
    console.dir(requestingUserFriends);

    requestingUserFriends.outgoingFriendRequests = requestingUserFriends.outgoingFriendRequests.filter(request => request.userId !== confirmingUser.userId);
    requestingUserFriends.friends.push(confirmingUser);
    sessionStorage.setItem('friends-' + requestingFriend.userId, JSON.stringify(requestingUserFriends));
}

export const deleteIncomingFriendRequest = (userDeletingRequest, userThatMadeRequest, incomingFriendRequests, setIncomingFriendRequests) => {
    console.log("deleteIncomingFriendRequest");
    let requestingUserFriends = JSON.parse(sessionStorage.getItem('friends-' + userThatMadeRequest.userId));

    if(!requestingUserFriends) {
        console.log("requesting friend user Id: " + userThatMadeRequest.userId +  " session not loaded")
        let requiredData = require('../data/friends/' + userThatMadeRequest.userId);
        sessionStorage.setItem('friends-' + userThatMadeRequest.userId, JSON.stringify(requiredData.friendData))
        requestingUserFriends = JSON.parse(sessionStorage.getItem('friends-' + userThatMadeRequest.userId));
    }

    let updatedIncomingFriendRequests = incomingFriendRequests.filter(request => request.userId !== userThatMadeRequest.userId)
    setIncomingFriendRequests([...updatedIncomingFriendRequests])

    console.log("requestingUserFriends");
    console.dir(requestingUserFriends);

    requestingUserFriends.outgoingFriendRequests = requestingUserFriends.outgoingFriendRequests.filter(request => request.userId !== userDeletingRequest.userId);
    sessionStorage.setItem('friends-' + userThatMadeRequest.userId, JSON.stringify(requestingUserFriends));
}

export const deleteOutgoingFriendRequest = (userDeletingRequest, userThatWasRequested, outgoingFriendRequests, setOutgoingFriendRequests) => {
    console.log("deleteOutgoingFriendRequest");
    let userThatWasRequestedFriends = JSON.parse(sessionStorage.getItem('friends-' + userThatWasRequested.userId));

    if(!userThatWasRequestedFriends) {
        console.log("requesting friend user Id: " + userThatWasRequested.userId +  " session not loaded")
        let requiredData = require('../data/friends/' + userThatWasRequested.userId);
        sessionStorage.setItem('friends-' + userThatWasRequested.userId, JSON.stringify(requiredData.friendData))
        userThatWasRequestedFriends = JSON.parse(sessionStorage.getItem('friends-' + userThatWasRequested.userId));
    }

    let updatedOutgoingFriendRequests = outgoingFriendRequests.filter(request => request.userId !== userThatWasRequested.userId)
    setOutgoingFriendRequests([...updatedOutgoingFriendRequests])

    console.log("userThatWasRequestedFriends");
    console.dir(userThatWasRequestedFriends);

    userThatWasRequestedFriends.incomingFriendRequests = userThatWasRequestedFriends.incomingFriendRequests.filter(request => request.userId !== userDeletingRequest.userId);
    sessionStorage.setItem('friends-' + userThatWasRequested.userId, JSON.stringify(userThatWasRequestedFriends));
}

/* Profile Friends */
export const setProfileFriendsByUserId = (userId, currentUserId, setCurrentUserId, setFriends,
                                   setIncomingFriendRequests, setOutgoingFriendRequests) => {
    console.log("setProfileFriendsByUserId")
    setCurrentUserId(userId);

    if(!sessionStorage.getItem('profile-friends-' + userId)) {
        console.log("ProfileFriendProvider Unable to find friends for user: " + currentUserId)
        let requiredData = require('../data/friends/' + userId);
        console.log("requiredData.friendData");
        console.dir(requiredData.friendData);
        setFriends([...requiredData.friendData.friends]);
        setIncomingFriendRequests([...requiredData.friendData.incomingFriendRequests])
        setOutgoingFriendRequests([...requiredData.friendData.outgoingFriendRequests])
        sessionStorage.setItem('profile-friends-' + userId, JSON.stringify(requiredData.friendData))
    } else {
        console.log("ProfileFriendProvider friendsFromStorage")
        let sessionFriends = JSON.parse(sessionStorage.getItem('profile-friends-' + userId));
        console.log("sessionFriends")
        console.dir(sessionFriends);
        setFriends(sessionFriends.friends);
        setIncomingFriendRequests(sessionFriends.incomingFriendRequests);
        setOutgoingFriendRequests(sessionFriends.outgoingFriendRequests);
    }
}

export const sendProfileFriendRequest = (requestingUserId, friendUserId, outgoingFriendRequests, setOutgoingFriendRequests) => {
    console.log("sendProfileFriendRequest");
    let friendUserFriends = JSON.parse(sessionStorage.getItem('profile-friends-' + friendUserId));

    if(!friendUserFriends) {
        console.log("friend user Id: " + friendUserId +  " session not loaded")
        let requiredData = require('../data/friends/' + friendUserId);
        sessionStorage.setItem('profile-friends-' + friendUserId, JSON.stringify(requiredData.friendData))
        friendUserFriends = JSON.parse(sessionStorage.getItem('profile-friends-' + friendUserId));
    }

    setOutgoingFriendRequests([...outgoingFriendRequests, {userId: friendUserId}])
    friendUserFriends.incomingFriendRequests.push({
        userId: requestingUserId
    });
    sessionStorage.setItem('profile-friends-' + friendUserId, JSON.stringify(friendUserFriends));
}

export const confirmProfileFriendRequest = (confirmingUser, requestingFriend, friends, setFriends,
                                     incomingFriendRequests, setIncomingFriendRequests) => {
    console.log("confirmProfileFriendRequest");
    let requestingUserFriends = JSON.parse(sessionStorage.getItem('profile-friends-' + requestingFriend.userId));

    if(!requestingUserFriends) {
        console.log("requesting friend user Id: " + requestingFriend.userId +  " session not loaded")
        let requiredData = require('../data/friends/' + requestingFriend.userId);
        sessionStorage.setItem('profile-friends-' + requestingFriend.userId, JSON.stringify(requiredData.friendData))
        requestingUserFriends = JSON.parse(sessionStorage.getItem('profile-friends-' + requestingFriend.userId));
    }

    let updatedIncomingFriendRequests = incomingFriendRequests.filter(request => request.userId !== requestingFriend.userId)
    setIncomingFriendRequests([...updatedIncomingFriendRequests])
    setFriends([...friends, requestingFriend])

    console.log("requestingUserFriends");
    console.dir(requestingUserFriends);

    requestingUserFriends.outgoingFriendRequests = requestingUserFriends.outgoingFriendRequests.filter(request => request.userId !== confirmingUser.userId);
    requestingUserFriends.friends.push(confirmingUser);
    sessionStorage.setItem('profile-friends-' + requestingFriend.userId, JSON.stringify(requestingUserFriends));
}
