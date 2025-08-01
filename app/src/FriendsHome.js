import React, { useEffect, useState } from 'react';
import './App.css';
import {Button, Col, Container, Row, Tooltip} from 'reactstrap';
import {useFriends} from "./context/FriendProvider";
import {useCurrentUser} from "./context/CurrentUserProvider";
import {useUsers} from "./context/UsersProvider";
import FriendCard from "./FriendCard";

const FriendsHome = ({customSetSelectedFriend}) => {
    const {currentUserObject, setCurrentUserByUserId} = useCurrentUser();
    const {currentUser, setCurrentUser} = currentUserObject;
    const {friendsObject, incomingFriendRequestsObject, outgoingFriendRequestsObject,
        setFriendsByUserId, sendFriendRequest, confirmFriendRequest,
        deleteOutgoingFriendRequest, deleteIncomingFriendRequest,
        getNumberOfFriendsByUserId, getNumberOfMutualFriendsByUserId, getArrayOfMutualFriends} = useFriends();
    const {friends, setFriends} = friendsObject;
    const {incomingFriendRequests, setIncomingFriendRequests} = incomingFriendRequestsObject;
    const {outgoingFriendRequests, setOutgoingFriendRequests} = outgoingFriendRequestsObject;
    const {usersObject, getUserById} = useUsers();
    const {users, setUsers} = usersObject;


    useEffect(() => {
        if(!currentUser) {
            setCurrentUserByUserId(10);
        }

        setFriendsByUserId(10);
    }, []);

    console.log("SuggestedFriends");
    console.log("friends");
    console.dir(friends);
    console.log("users");
    console.dir(users);

    if(!friends || !currentUser || !currentUser.userId) {
        return <p>Loading...</p>
    }

    const handleAddFriend = (friend) => {
        console.log("handleAddFriend");
        sendFriendRequest(currentUser.userId, friend.userId)
    }

    const handleConfirmFriend = (friend) => {
        console.log("handleConfirmFriend");
        confirmFriendRequest(currentUser, friend);
    }

    let incomingFriendRequestsWithStatus = incomingFriendRequests.map(request => {
        const user = getUserById(request.userId)
        const status = <Button style={{width: "100%", margin: 2}} color="warning" onClick={() => handleConfirmFriend(user)}>Confirm</Button>
        let deleteButton = <Button style={{width: "100%", margin: 2}} onClick={() => deleteIncomingFriendRequest(currentUser, user)}>Delete</Button>
        let mutualFriends = getArrayOfMutualFriends(currentUser.userId, user.userId)
        let userImage = require("./data/images/" + request.userId + "/user-image.jpg");

        return <div key={user.userId + "-incomingFriendRequests"} style={{paddingBottom: 25}} className={"d-flex"}>
            <FriendCard
                user={user}
                userImage={userImage}
                mutualFriends={mutualFriends}
                customSetSelectedFriend={customSetSelectedFriend}
                status={status}
                deleteButton={deleteButton}
            />
        </div>
    })

    let outgoingFriendRequestsWithStatus = outgoingFriendRequests.map(request => {
        const user = getUserById(request.userId)
        const status = <Button style={{width: "100%", margin: 2}} color="warning">Requested</Button>
        let deleteButton = <Button style={{width: "100%", margin: 2}} onClick={() => deleteOutgoingFriendRequest(currentUser, user)}>Delete</Button>
        let mutualFriends = getArrayOfMutualFriends(currentUser.userId, user.userId)
        let userImage = require("./data/images/" + request.userId + "/user-image.jpg");

        return <div key={user.userId + "-outgoingFriendRequests"} style={{paddingBottom: 25}} className={"d-flex"}>
            <FriendCard
                user={user}
                userImage={userImage}
                mutualFriends={mutualFriends}
                customSetSelectedFriend={customSetSelectedFriend}
                status={status}
                deleteButton={deleteButton}
            />
        </div>
    })

    let filteredIncomingRequests = users.filter(user => !incomingFriendRequests.find(friend => friend.userId === user.userId))
    let filteredOutgoingRequests = filteredIncomingRequests.filter(user => !outgoingFriendRequests.find(friend => friend.userId === user.userId))
    let rawSuggestedFriends = filteredOutgoingRequests.filter(user => !friends.find(friend => friend.userId === user.userId))
    let suggestedFriends = rawSuggestedFriends.map(friend => {
        let status = <Button color="warning" style={{width: "100%", margin: 2}} onClick={() => handleAddFriend(friend)}>Add Friend</Button>
        let deleteButton = <Button style={{width: "100%", margin: 2}}>Delete</Button>
        let mutualFriends = getArrayOfMutualFriends(currentUser.userId, friend.userId)
        let userImage = require("./data/images/" + friend.userId + "/user-image.jpg");

        if(currentUser && currentUser.userId && (currentUser.userId === friend.userId)) {
            return '';
        }

        return <div key={friend.userId + "-suggestedFriends"} className={"d-flex"} style={{paddingBottom: 25}} >
                <FriendCard
                    user={friend}
                    userImage={userImage}
                    mutualFriends={mutualFriends}
                    customSetSelectedFriend={customSetSelectedFriend}
                    status={status}
                    deleteButton={deleteButton}
                />
        </div>
    })

    return (
        <Container fluid>
            <Row>
                <h3 style={{padding: 10}}>Friend Requests</h3>
            </Row>
            <Row xs={1} md={3} lg={3} xl={4} xxl={5}>
                {incomingFriendRequestsWithStatus}
                {outgoingFriendRequestsWithStatus}
            </Row>
            <Row>
                <h3 style={{padding: 10}}>People you may know</h3>
            </Row>
            <Row xs={1} md={3} lg={3} xl={4} xxl={5}>
                {suggestedFriends}
            </Row>
        </Container>
    )
}

export default FriendsHome;