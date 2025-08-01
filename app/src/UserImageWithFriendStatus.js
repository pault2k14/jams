import {Col, Row} from "reactstrap";
import GeneratedProfileImage from "./GeneratedProfileImage";
import React from "react";
import {useFriends} from "./context/FriendProvider";


const UserImageWithFriendStatus = ({currentUser, user, status, handleOpenUserTimeline}) => {
    const {friendsObject, incomingFriendRequestsObject, outgoingFriendRequestsObject,
        setFriendsByUserId, sendFriendRequest, confirmFriendRequest,
        getNumberOfFriendsByUserId, getNumberOfMutualFriendsByUserId} = useFriends();

    return <Col>
        <Row style={{paddingBottom: 25}}>
            <Col className={"col-auto"}>
                <Row>
                    <Col onClick={() => handleOpenUserTimeline(user)}>
                        <GeneratedProfileImage
                            username={user.name}
                            size={user.userMediumImageSize}
                            borderRadius={user.userImageBorderRadius}
                            color={user.userImageColor}
                            backgroundColor={user.userImageBackgroundColor}
                        />
                    </Col>
                    <Col className={"col-auto"}>
                        <Row onClick={() => handleOpenUserTimeline(user)}>
                            {user.name}
                        </Row>
                        <Row onClick={() => handleOpenUserTimeline(user)}>
                            {getNumberOfMutualFriendsByUserId(currentUser.userId, user.userId) + " mutual friends"}
                        </Row>
                        <Row style={{padding: 5}}>
                            {status}
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Col>
}

export default UserImageWithFriendStatus;