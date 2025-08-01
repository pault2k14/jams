import React, {useEffect, useState} from "react";
import Popup from "reactjs-popup";
import {Button, Col, Popover, PopoverBody, Row} from "reactstrap";
import {Link, useNavigate} from "react-router-dom";
import GeneratedProfileImage from "./GeneratedProfileImage";
import {FaBars, FaHome} from "react-icons/fa";
import {useFriends} from "./context/FriendProvider";
import {FaB, FaUserGroup} from "react-icons/fa6";
import FriendOptionsMenu from "./FriendOptionsMenu";
import {getAboutByLine, getAboutObjectByUserId} from "./context/aboutUtils";


const FriendMouseOver = ({currentUser, profileUser, friend, children}) => {
    const {friendsObject, incomingFriendRequestsObject,
        outgoingFriendRequestsObject, setFriendsByUserId,
        sendFriendRequest, confirmFriendRequest, getNumberOfMutualFriendsByUserId} = useFriends();
    const {friends, setFriends} = friendsObject;
    const {incomingFriendRequests, setIncomingFriendRequests} = incomingFriendRequestsObject;
    const {outgoingFriendRequests, setOutgoingFriendRequests} = outgoingFriendRequestsObject;
    const navigate = useNavigate()
    const [popoverOpen, setPopoverOpen] = useState(false);
    const navigateToProfile = (userToNavigateTo) => navigate('/friends/' + userToNavigateTo.userId)

    let mutualFriends = currentUser && profileUser ? getNumberOfMutualFriendsByUserId(currentUser.userId, friend.userId) : 0;
    let status = <Button color="warning" onClick={() => handleAddFriend(friend)}>Add Friend</Button>
    let userImage = require("./data/images/" + friend.userId + "/user-image.jpg");

    useEffect(() => {
        const fetchData = async () => {
            if(!profileUser || !currentUser) {
                return;
            }

            setFriendsByUserId(10);

        };

        fetchData();
    }, [profileUser, currentUser]);

    if(!currentUser || !profileUser) {
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

    for(let i = 0; i < friends.length; i++) {
        if(friends[i].userId === friend.userId) {
            status = <Button color="warning">Friend</Button>
        }
    }

    for(let i = 0; i < outgoingFriendRequests.length; i++) {
        if(outgoingFriendRequests[i].userId === friend.userId) {
            status = <Button color="warning">Request Sent</Button>
        }
    }

    for(let i = 0; i < incomingFriendRequests.length; i++) {
        if(incomingFriendRequests[i].userId === friend.userId) {
            status = <Button color="warning" onClick={() => handleConfirmFriend(friend)}>Confirm</Button>
        }
    }

    let friendAboutObject = getAboutObjectByUserId(friend.userId);
    let aboutByLine = getAboutByLine(friendAboutObject);

    return <span onMouseEnter={() => setPopoverOpen(true)} onMouseLeave={() => setPopoverOpen(false)}>
        {<Popup
            trigger={(
                children
            )}
            on={['hover', 'focus']}
            position="top"
            closeOnDocumentClick>
            <div style={{backgroundColor: "white", padding: 5}}>
                    <Row style={{marginTop: 5, marginBottom: 5}}>
                        <div className={"d-flex"}>
                            <div onClick={() => navigateToProfile(friend)} style={{marginLeft: 10, marginRight: 10, marginTop: 10}}
                                 className={"flex-1"}>
                                { /* fake input addresses auto focus issue with reactjs-popup */}
                                {/* https://github.com/yjose/reactjs-popup/issues/278 */}
                                <input type="hidden" role="none" />
                                <img
                                    autoFocus={false}
                                    style={{borderRadius: "50%"}}
                                    width="100px"
                                    height="100px"
                                    src={userImage}
                                />
                            </div>
                            <div onClick={() => navigateToProfile(friend)} style={{marginRight: 10, marginTop: 10}}
                                 className={"flex-1"}>
                                <Link to={'/friends/' + friend.userId}
                                      style={{textDecoration: "none", color: "black"}}>
                                    {friend.name}
                                </Link>
                                <div>
                                    <FaUserGroup style={{marginRight: 5}}/>
                                    <span>{ mutualFriends > 0 ? mutualFriends + ' mutual friends' : ''}</span>
                                </div>
                                <div>
                                    {aboutByLine}
                                </div>
                            </div>
                        </div>
                    </Row>
                    <div className={"d-flex justify-content-end"} style={{marginTop: 5, marginBottom: 5}}>
                        <div>
                            <FriendOptionsMenu
                                currentUser={currentUser}
                                friend={friend}
                            />
                        </div>
                    </div>
            </div>
        </Popup>}
    </span>

    // Full Name
    // Picture  [number] mutual friends
    //          Lives in [current place lived]
    // [Friendship status] Message  [options menu]
}

export default FriendMouseOver;