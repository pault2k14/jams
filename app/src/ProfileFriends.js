
import React, {useEffect, useState} from 'react';
import './App.css';
import {Button, Col, Container, Row} from 'reactstrap';
import {useFriends} from "./context/FriendProvider";
import requiredData from "./data/friends/10";
import GeneratedProfileImage from "./GeneratedProfileImage";
import {useUsers} from "./context/UsersProvider";
import {useProfileFriends} from "./context/ProfileFriendsProvider";
import {useCurrentUser} from "./context/CurrentUserProvider";
import {Link, useNavigate} from "react-router-dom";
import FriendMouseOver from "./FriendMouseOver";
import Popup from "reactjs-popup";
import './ProfileFriends.css'


const ProfileFriends = ({currentUser, profileUser, isFloatingChatOpen, setIsFloatingChatOpen}) => {
    const {profileFriendsObject, incomingProfileFriendRequestsObject,
        outgoingProfileFriendRequestsObject, setProfileFriendsByUserId,
        sendProfileFriendRequest, confirmProfileFriendRequest} = useProfileFriends();
    const {profileFriends, setProfileFriends} = profileFriendsObject;
    const {usersObject, getUserById} = useUsers();
    const {friendsObject, incomingFriendRequestsObject,
        outgoingFriendRequestsObject, setFriendsByUserId,
        sendFriendRequest, confirmFriendRequest,
        deleteOutgoingFriendRequest, deleteIncomingFriendRequest,
        getNumberOfMutualFriendsByUserId} = useFriends();
    const {friends, setFriends} = friendsObject;
    const {incomingFriendRequests, setIncomingFriendRequests} = incomingFriendRequestsObject;
    const {outgoingFriendRequests, setOutgoingFriendRequests} = outgoingFriendRequestsObject;
    const navigate = useNavigate()
    const navigateToProfile = (userToNavigateTo) => navigate('/friends/' + userToNavigateTo.userId)

    useEffect(() => {
        const fetchData = async () => {
            setFriendsByUserId(currentUser.userId);
            setProfileFriendsByUserId(profileUser.userId);
        };

        fetchData();
    }, [currentUser, profileUser]);

    const handleAddFriend = (friend) => {
        console.log("handleAddFriend");
        sendFriendRequest(currentUser.userId, friend.userId)
    }

    const handleConfirmFriend = (friend) => {
        console.log("handleConfirmFriend");
        confirmFriendRequest(currentUser, friend);
    }


    const buildGrid = () => {
        let friendItems = [];

        for(let i = 0; i < profileFriends.length; i++) {
            const friendData = getUserById(profileFriends[i].userId);
            let status = <Button style={{marginRight: 5}} color="warning" onClick={() => handleAddFriend(friendData)}>Add Friend</Button>;

            if(friendData.userId === currentUser.userId) {
                continue;
            }

            friends.map(friend => {
                if(friend.userId === friendData.userId) {
                    status = '';
                }
            })

            outgoingFriendRequests.map(request => {
                if(request.userId === friendData.userId) {
                    status = <Button style={{marginRight: 5}}
                                     onClick={() => deleteOutgoingFriendRequest(currentUser, friendData)}>
                        Cancel Request
                    </Button>
                }
            })

            incomingFriendRequests.map(request => {
                if(request.userId === friendData.userId) {
                    status = <Popup
                            trigger={<button style={{border: "none", backgroundColor: "white"}}><Button color="warning">Respond</Button></button>}
                            closeOnDocumentClick
                            arrow={true}
                            position="bottom left">
                        <div className="menu">
                            <div className="menu-item" onClick={() => handleConfirmFriend(friendData)}>Confirm</div>
                            <div className="menu-item" onClick={() => deleteIncomingFriendRequest(currentUser, friendData)}>Delete request</div>
                        </div>
                    </Popup>
                }
            })

            let userImage = require("./data/images/" + friendData.userId + "/user-image.jpg");
            let mutualFriends = getNumberOfMutualFriendsByUserId(currentUser.userId, friendData.userId);

            let item =
                        <Col className={"col-auto"}>
                                <div className={"d-flex"}>
                                    <FriendMouseOver
                                        currentUser={currentUser}
                                        profileUser={profileUser}
                                        friend={friendData}
                                    >
                                        <div className={"d-flex"}>
                                            <div style={{marginRight: 5}} className={"flex-1"} onClick={() => navigateToProfile(friendData)}>
                                                <img
                                                    height="80"
                                                    width="80"
                                                    style={{margin: 2}}
                                                    src={userImage}
                                                />
                                            </div>
                                            <div className={"flex-1 align-content-center"} onClick={() => navigateToProfile(friendData)}>
                                                <div style={{fontSize: "16px", color: "black", margin: 2}}>
                                                    {friendData.name}
                                                </div>
                                                { mutualFriends > 0 &&
                                                    <div style={{fontSize: "12px", color: "gray", margin: 2}}>{mutualFriends + " mutual friends"}</div>
                                                }
                                            </div>
                                        </div>
                                    </FriendMouseOver>
                                    <div style={{marginLeft: "auto", alignContent: "center"}} className={"flex-1"}>
                                        {status}
                                    </div>
                                </div>
                        </Col>

            friendItems.push(item);
        }

        return friendItems;
    }

    const FriendGrid = buildGrid().map(item => item)

    return (
        <div>
            <Container fluid style={{
                backgroundColor: "white",
                padding: 10,
                marginBottom: 25
            }}>
                <Row>
                    <h3>Friends</h3>
                </Row>
                <Row xs={1} md={1} lg={2} xl={2} xxl={2}>
                    {FriendGrid}
                </Row>

            </Container>
        </div>
    );
}

export default ProfileFriends

