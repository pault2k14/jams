import {Col, Container, Row} from "reactstrap";
import GeneratedProfileImage from "./GeneratedProfileImage";
import React from "react";
import {
    getUserById,
} from "./context/PostProvider";
import {useUsers} from "./context/UsersProvider";
import {Link, useNavigate} from "react-router-dom";
import FriendsHome from "./FriendsHome";
import FriendMouseOver from "./FriendMouseOver";
import {useFriends} from "./context/FriendProvider";
import {Image} from "react-bootstrap";


const FriendsPanel = ({currentUser, profileUser, friends,
                          randomFriendsForFriendsPanel, isFloatingChatOpen, setIsFloatingChatOpen}) => {
    const {friendsObject, incomingFriendRequestsObject,
        outgoingFriendRequestsObject, setFriendsByUserId,
        sendFriendRequest, confirmFriendRequest, getNumberOfMutualFriendsByUserId} = useFriends();

    const {usersObject, getUserById} = useUsers();
    const navigate = useNavigate()

    const navigateToProfile = (userToNavigateTo) => navigate('/friends/' + userToNavigateTo.userId)

    if(!currentUser || !profileUser) {
        return <p>Loading...</p>
    }

    const GenerateFriends = () => {
        let randomNumbersToGenerate = friends.length >= 9 ? 9 : friends.length;

        if(randomFriendsForFriendsPanel.current.length === randomNumbersToGenerate) {
            return randomFriendsForFriendsPanel.current;
        }

        let randomNumbers = [];
        let createdNewRandomNumber = false;

        for(let i = 0; i < randomNumbersToGenerate; i++) {

            while(!createdNewRandomNumber) {
                let randNum = Math.floor(Math.random() * randomNumbersToGenerate);
                if(!randomNumbers.includes(randNum)) {
                    randomNumbers.push(randNum);
                    createdNewRandomNumber = true;
                }
            }

            createdNewRandomNumber = false;
        }

        for(let i = 0; i < randomNumbers.length; i++) {

            let user = getUserById(friends[randomNumbers[i]].userId);
            let userImage = require("./data/images/" + user.userId + "/user-image.jpg");
            let numMutualFriends = getNumberOfMutualFriendsByUserId(currentUser.userId, user.userId)

            randomFriendsForFriendsPanel.current.push(
                <div className={"no-gutters col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4"}
                     style={{paddingRight: 0, paddingLeft: 0}}
                    id={"friendsPanel-col-" + i}
                    key={"friendsPanel-col-" + i}>
                        <span
                            id={"friendsPanel-" + i}
                            onClick={() => navigateToProfile(user)}
                        >
                            <FriendMouseOver
                                currentUser={currentUser}
                                profileUser={profileUser}
                                friend={user}
                            >
                            <Image
                                style={{padding: 0, margin: 0}}
                                height="125px"
                                width="125px"
                                thumbnail={true}
                                src={userImage}
                            />
                            </FriendMouseOver>
                            <div style={{fontSize: "14px"}}>{user.name}</div>
                            { numMutualFriends > 0 &&
                                <div style={{fontSize: "10px", color: "gray"}}>{numMutualFriends + " mutual friends"}</div>
                            }
                        </span>
                </div>

            )
        }

        return randomFriendsForFriendsPanel.current;
    }

    return <div className={"container"}>
        <div className={"row"}>
            <div className={"col"}>
                <h4>
                    Friends
                </h4>
            </div>
        </div>
        <div style={{
            marginLeft: 0,
            marginRight: 0,
        }} className={"row"}>
                 {GenerateFriends()}
        </div>
    </div>
}

export default FriendsPanel;