import {useFriends} from "./context/FriendProvider";
import {Button, ButtonDropdown, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row} from "reactstrap";
import React, {useState} from "react";
import {FaBars, FaComment, FaFontAwesome, FaWindowClose} from "react-icons/fa";
import Popup from "reactjs-popup";
import './FriendOptionsMenu.css'
import {FaUserGroup, FaX} from "react-icons/fa6";
import {useChat} from "./context/ChatProvider";


const FriendOptionsMenu = ({currentUser, friend}) => {
    const {userToChatWithObject, chatMessagesObject, chatWindowObject,
        setChatMessagesByUserIds, addChatMessageByUserIds, updateChatMessageByUserIds,
        deleteChatMessageByUserIds} = useChat();
    const {isFloatingWindowOpen, setIsFloatingWindowOpen} = chatWindowObject;
    const {friendsObject, incomingFriendRequestsObject,
        outgoingFriendRequestsObject, setFriendsByUserId,
        sendFriendRequest, confirmFriendRequest,
        deleteOutgoingFriendRequest, deleteIncomingFriendRequest,
        getNumberOfMutualFriendsByUserId} = useFriends();
    const {friends, setFriends} = friendsObject;
    const {incomingFriendRequests, setIncomingFriendRequests} = incomingFriendRequestsObject;
    const {outgoingFriendRequests, setOutgoingFriendRequests} = outgoingFriendRequestsObject;
    const [respondState, setRespondState] = useState(false);
    const [optionsMenuState, setOptionsMenuState] = useState(false);

    let mutualFriends = getNumberOfMutualFriendsByUserId(currentUser.userId, friend.userId);
    let status = <Button
        style={{alignContents: "center"}}
        color="warning" onClick={() => handleAddFriend(friend)}
    >
        <FaUserGroup style={{marginRight: 5}}/>Add Friend
    </Button>

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
            status = <Button
                style={{alignContents: "center"}}
                color="normal"
            >
                <FaUserGroup style={{marginRight: 5}}/>Friend
            </Button>
        }
    }

    for(let i = 0; i < outgoingFriendRequests.length; i++) {
        if(outgoingFriendRequests[i].userId === friend.userId) {
            status = <Button onClick={() => deleteOutgoingFriendRequest(currentUser, friend)}>Cancel Request</Button>
        }
    }

    for(let i = 0; i < incomingFriendRequests.length; i++) {
        if(incomingFriendRequests[i].userId === friend.userId) {
            status = <div>
                <ButtonDropdown isOpen={respondState} toggle={() => setRespondState(!respondState)}>
                    <DropdownToggle color="warning" caret>
                        Respond
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => handleConfirmFriend(friend)}>Confirm</DropdownItem>
                        <DropdownItem onClick={() => deleteIncomingFriendRequest(currentUser, friend)}>Delete Request</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
            </div>
        }
    }

    let message = <Button
        color="primary"
        style={{alignContent: "center"}}
        onClick={() => {
            setChatMessagesByUserIds(currentUser, friend)
            setIsFloatingWindowOpen(!isFloatingWindowOpen)
        }}
    ><FaComment style={{marginRight: 5}}/>Message</Button>

    if(currentUser.userId === friend.userId) {
        return null;
    }

    return <div>
        <div className={"d-flex"}>
            <div style={{alignContent: "center", marginRight: 5}} className={"flex-1"}>
                    {status}
            </div>
            <div style={{alignContent: "center", marginRight: 5}} className={"flex-1"}>
                {message}
            </div>
            <div style={{alignContent: "center"}} className={"flex-1"}>
                <div>
                    <ButtonDropdown isOpen={optionsMenuState} toggle={() => setOptionsMenuState(!optionsMenuState)}>
                        <DropdownToggle color="normal">
                            <FaBars/>
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>Unfollow</DropdownItem>
                            <DropdownItem>Block</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                </div>
            </div>
        </div>
    </div>
}

export default FriendOptionsMenu;