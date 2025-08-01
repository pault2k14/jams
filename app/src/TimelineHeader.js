import {Col, Row, Tooltip} from "reactstrap";
import React, {useEffect, useState} from "react";
import GeneratedProfileImage from "./GeneratedProfileImage";
import {useFriends} from "./context/FriendProvider";
import {useCurrentUser} from "./context/CurrentUserProvider";
import FriendOptionsMenu from "./FriendOptionsMenu";
import FriendMouseOver from "./FriendMouseOver";

const TimelineHeader = ({profileUser, currentUser}) => {
    const [mutualFriendsTooltipOpen, setMutualFriendsTooltipOpen] = useState(false);
    const toggleMutualFriendsrTooltip = () => setMutualFriendsTooltipOpen(!mutualFriendsTooltipOpen);
    const {getNumberOfFriendsByUserId, getNumberOfMutualFriendsByUserId, getArrayOfMutualFriends} = useFriends();
    let userImage = require("./data/images/" + profileUser.userId + "/user-image.jpg");

    if(!profileUser || !currentUser) {
        return null;
    }

    let friendsByLine = getNumberOfFriendsByUserId(profileUser.userId) + " friends";
    let mutualFriends = getArrayOfMutualFriends(currentUser.userId, profileUser.userId)
    let mutualFriendsByLine = currentUser.userId !== profileUser.userId ? " - " + mutualFriends.length + " mutual" : "";

    return (
        <div>
            <Col>
                <Row>
                    <Col>
                        <div style={{
                            paddingTop: 20,
                            paddingLeft: 20,
                            paddingBottom: 20,
                            backgroundColor: "white"}}>
                            <div className={"d-flex"}>
                                <div style={{marginRight: 40}}>
                                    <img width="168" height="168"
                                         style={{
                                             borderRadius: "50%"}}
                                         src={userImage}
                                    />
                                </div>
                                <div>
                                    <Tooltip
                                        isOpen={mutualFriendsTooltipOpen}
                                        target={"mutualFriends"}
                                        toggle={toggleMutualFriendsrTooltip}
                                    >
                                        {mutualFriends.map((friend, index) => {
                                            if(index > 7) {
                                                return null;
                                            }

                                            return <div>{friend.name}</div>
                                        })
                                        }
                                    </Tooltip>
                                    <h1>{profileUser.name}</h1>
                                    <span style={{fontSize: "16px"}}>{friendsByLine}</span>
                                    <span id="mutualFriends" style={{fontSize: "16px"}}>{mutualFriendsByLine}</span>
                                    <Row style={{padding: 0, margin: 0}}>
                                        {mutualFriends.map((friend, index) => {
                                            if(index > 7) {
                                                // Only include upto 8 mini profile pictures
                                                return null
                                            }
                                            return <Col style={{padding: 0, margin: 0}}>
                                                <FriendMouseOver
                                                    currentUser={currentUser}
                                                    profileUser={profileUser}
                                                    friend={friend}>
                                                    <img
                                                        style={{borderRadius: "50%"}}
                                                        height={25}
                                                        width={25}
                                                        src={require("./data/images/" + friend.userId + "/user-image.jpg")}
                                                    />
                                                </FriendMouseOver>
                                            </Col>
                                        })}
                                    </Row>
                                </div>
                            </div>
                        </div>
                        <div style={{
                            paddingRight: 20,
                            paddingBottom: 20,
                            backgroundColor: "white"}}>
                            <div className={"d-flex justify-content-end"}>
                                <FriendOptionsMenu
                                    currentUser={currentUser}
                                    friend={profileUser}
                                />
                            </div>
                        </div>

                    </Col>
                </Row>
            </Col>
        </div>
    )

}

export default TimelineHeader;
/*

<div style ={{
            backgroundColor: "white"
        }}>
            <Row>
                <Col className={"d-flex col-auto"}>
                    <Row>
                        <div
                            className={"d-flex align-items: center"}>
                            <div>
                                <img width="168" height="168"
                                     style={{
                                         borderRadius: "50%"}}
                                     src={userImage}
                                />
                                {
                            <GeneratedProfileImage
                                username={profileUser.name}
                                size={profileUser.userImageSize}
                                borderRadius={profileUser.userImageBorderRadius}
                                color={profileUser.userImageColor}
                                backgroundColor={profileUser.userImageBackgroundColor}
                            />}
</div>
<div>
    <div style={{ paddingLeft: 30 }}>
        <h1>{profileUser.name}</h1>
        <h5>{friendsByLine + mutualFriendsByLine} </h5>
    </div>
</div>
</div>
</Row>
</Col>
</Row>
</div>

 */