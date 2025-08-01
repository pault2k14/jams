import React, {useEffect, useState} from 'react';
import { Button, Container, Row, Col } from 'reactstrap';
import AppNavbar from './AppNavbar';
import {Link, useNavigate} from 'react-router-dom';
import "react-image-gallery/styles/css/image-gallery.css";
import { Sidebar, Menu, MenuItem} from 'react-pro-sidebar';
import {
    usePost
} from "./context/PostProvider";
import Account from "./Account";
import {useFriends} from "./context/FriendProvider";
import {useUsers} from "./context/UsersProvider";
import GeneratedProfileImage from "./GeneratedProfileImage";
import {useCurrentUser} from "./context/CurrentUserProvider";
import FriendsHome from "./FriendsHome";
import {useProfilePost} from "./context/ProfilePostProvider";
import UserTimeline from "./UserTimeline";
import {FaUserGroup} from "react-icons/fa6";
import FriendMouseOver from "./FriendMouseOver";
import FriendMiniCardHorizontal from "./FriendMiniCardHorizontal";
import {Image} from "react-bootstrap";
import FriendListHeader from "./FriendListHeader";

const FriendList = () => {
    console.log("FriendList")
    const {postsObject, setPostsByUserId} = usePost();
    const {posts, setPosts} = postsObject;
    const {profilePostsObject, setProfilePostsByUserId} = useProfilePost();
    const {profilePosts, setProfilePosts} = profilePostsObject;
    const {usersObject, getUserById} = useUsers();
    const {users, setUsers} = usersObject;
    const {friendsObject, incomingFriendRequestsObject, outgoingFriendRequestsObject,
        setFriendsByUserId, sendFriendRequest, confirmFriendRequest,
        deleteOutgoingFriendRequest, deleteIncomingFriendRequest,
        getNumberOfFriendsByUserId, getNumberOfMutualFriendsByUserId, getArrayOfMutualFriends} = useFriends();
    const {friends, setFriends} = friendsObject;
    const {incomingFriendRequests, setIncomingFriendRequests} = incomingFriendRequestsObject;
    const {outgoingFriendRequests, setOutgoingFriendRequests} = outgoingFriendRequestsObject;
    const {currentUserObject, setCurrentUserByUserId} = useCurrentUser();
    const {currentUser, setCurrentUser} = currentUserObject;
    const [profileUser, setProfileUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [sortedPosts, setSortedPosts] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [showSuggestedFriends, setShowSuggestedFriends] = useState(false);
    const [showFriendRequests, setShowFriendRequests] = useState(false);
    const [showAllFriends, setShowAllFriends] = useState(false);
    const [friendRequestsBackgroundColor, setFriendRequestsBackgroundColor] = useState("white");
    const [friendSuggestionsBackgroundColor, setFriendSuggestionsBackgroundColor] = useState("white");
    const [allFriendsBackgroundColor, setAllFriendsBackgroundColor] = useState("white");
    const navigate = useNavigate()
    const navigateToProfile = (userToNavigateTo) => navigate('/friends/' + userToNavigateTo.userId)

    useEffect(() => {
        if(!currentUser) {
            setCurrentUser(getUserById(10));
            return;
        }

        setFriendsByUserId(10);
    }, []);

    if (loading || !currentUser) {
        return <p>Loading...</p>;
    }

    const ResetFriendsMenu = () => {
        setFriendRequestsBackgroundColor("white");
        setFriendSuggestionsBackgroundColor("white");
        setAllFriendsBackgroundColor("white");
        setShowFriendRequests(false);
        setShowSuggestedFriends(false);
        setShowAllFriends(false);
    }

    const customSetShowAllFriends = () => {
        ResetFriendsMenu()
        setShowAllFriends(!showAllFriends);
    }

    const customSetShowSuggestedFriends = () => {
        ResetFriendsMenu()
        setShowSuggestedFriends(!showSuggestedFriends);
    }

    const customSetShowFriendRequests = () => {
        ResetFriendsMenu()
        setShowFriendRequests(!showFriendRequests);
    }

    const customSetFriendsHomeActive = () => {
        ResetFriendsMenu();
        setSelectedFriend(null);
    }


    const friendList = friends.map(friend => {
        let mutualFriends = getArrayOfMutualFriends(currentUser.userId, friend.userId)
        let userImage = require("./data/images/" + friend.userId + "/user-image.jpg");

        return <div key={friend.userId + "-currentFriends"} onClick={() => setSelectedFriend({...friend})} style={{paddingBottom: 25}}>
            <FriendMiniCardHorizontal
                currentUser={currentUser}
                friend={friend}
                userImage={userImage}
                mutualFriends={mutualFriends}
                leftButton={null}
                rightButton={null}
                setSelectedFriend={setSelectedFriend}
                displayMutualFriendsImages={false}
            />
        </div>
    });

    const handleAddFriend = (friend) => {
        sendFriendRequest(currentUser.userId, friend.userId)
    }

    const handleConfirmFriend = (friend) => {
        confirmFriendRequest(currentUser, friend);
    }

    let rawOutgoingFriendRequests = users.filter(user => outgoingFriendRequests.find(friend => friend.userId === user.userId))
    let finalOuutgoingFriendRequests = rawOutgoingFriendRequests.map(friend => {
        let status = <Button style={{width: "100%"}} color="primary">Requested</Button>
        let deleteButton = <Button style={{width: "100%"}} onClick={() => deleteOutgoingFriendRequest(currentUser, friend)}>Delete</Button>
        let mutualFriends = getArrayOfMutualFriends(currentUser.userId, friend.userId)
        let userImage = require("./data/images/" + friend.userId + "/user-image.jpg");

        return <div key={friend.userId + "-outgoingFriendRequests"} style={{paddingBottom: 25}}>
            <FriendMiniCardHorizontal
                currentUser={currentUser}
                friend={friend}
                userImage={userImage}
                mutualFriends={mutualFriends}
                leftButton={status}
                rightButton={deleteButton}
                setSelectedFriend={setSelectedFriend}
                displayMutualFriendsImages={true}
            />
        </div>
    })

    let rawIncomingFriendRequests = users.filter(user => incomingFriendRequests.find(friend => friend.userId === user.userId))
    let finalIncomingFriendRequests = rawIncomingFriendRequests.map(friend => {
        let status = <Button style={{width: "100%"}} color="primary" onClick={() => handleConfirmFriend(friend)}>Confirm</Button>
        let deleteButton = <Button style={{width: "100%"}} onClick={() => deleteIncomingFriendRequest(currentUser, friend)}>Delete</Button>
        let mutualFriends = getArrayOfMutualFriends(currentUser.userId, friend.userId)
        let userImage = require("./data/images/" + friend.userId + "/user-image.jpg");

        return <div key={friend.userId + "-incomingFriendRequests"} style={{paddingBottom: 25}}>
            <FriendMiniCardHorizontal
                currentUser={currentUser}
                friend={friend}
                userImage={userImage}
                mutualFriends={mutualFriends}
                leftButton={status}
                rightButton={deleteButton}
                setSelectedFriend={setSelectedFriend}
                displayMutualFriendsImages={true}
            />
        </div>
    })

    let rawSuggestedFriends = users.filter(user => !friends.find(friend => friend.userId === user.userId))
    let suggestedFriendsWithoutIncomingRequests = rawSuggestedFriends.filter(user =>
        !incomingFriendRequests.find(friend => friend.userId === user.userId))
    let suggestedFriendsWithoutIncomingAndOutgoingRequests = suggestedFriendsWithoutIncomingRequests.filter(user =>
        !outgoingFriendRequests.find(friend => friend.userId === user.userId))
    let finalSuggestedFriends = suggestedFriendsWithoutIncomingAndOutgoingRequests.map(friend => {
        let status = <Button style={{width: "100%"}} color="primary" onClick={() => handleAddFriend(friend)}>Add Friend</Button>
        let deleteButton = <Button style={{width: "100%"}}>Delete</Button>
        let mutualFriends = getArrayOfMutualFriends(currentUser.userId, friend.userId)
        let userImage = require("./data/images/" + friend.userId + "/user-image.jpg");

        if(friend.userId === currentUser.userId) {
            return null;
        }

        return <div key={friend.userId + "-friendSuggestions"} style={{paddingBottom: 25}}>
            <FriendMiniCardHorizontal
                currentUser={currentUser}
                friend={friend}
                userImage={userImage}
                mutualFriends={mutualFriends}
                leftButton={status}
                rightButton={deleteButton}
                setSelectedFriend={setSelectedFriend}
                displayMutualFriendsImages={true}
            />
        </div>
    })


    return (
        <div>
            <Container fluid style={{paddingTop: 75}}>
                        <Row>
                            <Col xs={3}>
                                {!showFriendRequests && !showSuggestedFriends && !showAllFriends &&
                                    <div style={{
                                        marginBottom: 10,
                                        fontSize: "36px",
                                        fontWeight: "bold"
                                    }}>
                                        Friends
                                    </div>
                                }
                                {!showFriendRequests && !showSuggestedFriends && !showAllFriends &&
                                    <div
                                        style={{
                                            marginBottom: 10,
                                            backgroundColor: "whitesmoke",
                                            alignItems: "center",
                                            alignContent: "center"}}
                                        onClick={() => customSetFriendsHomeActive()}>
                                        <Image
                                            style={{
                                                filter: "invert(1)",
                                                backgroundColor: "#f29102",
                                                borderRadius: "50%",
                                                marginRight: 10,
                                            }}
                                            width={35}
                                            height={35}
                                            thumbnail={true}
                                            src={require("./data/images/FriendsHomeIcon.png")}
                                        />
                                        <span style={{
                                            fontSize: "24px",
                                            fontWeight: "bold"
                                        }}
                                        >
                                            Home
                                        </span>
                                    </div>
                                }
                                {!showFriendRequests && !showSuggestedFriends && !showAllFriends &&
                                    <div style={{
                                        backgroundColor: friendRequestsBackgroundColor,
                                        marginBottom: 10,
                                        alignItems: "center",
                                        alignContent: "center"}}
                                         onMouseEnter={() => setFriendRequestsBackgroundColor("whitesmoke")}
                                         onMouseLeave={() => setFriendRequestsBackgroundColor("white")}
                                         onClick={() => customSetShowFriendRequests()}>
                                            <Image
                                                style={{borderRadius: "50%", marginRight: 10}}
                                                width={35}
                                                height={35}
                                                thumbnail={true}
                                                src={require("./data/images/FriendRequestsIcon.png")}
                                            />
                                        <span style={{
                                            fontSize: "24px",
                                            fontWeight: "bold"
                                        }}
                                        >
                                            Friend Requests
                                        </span>
                                    </div>
                                }
                                { showFriendRequests &&
                                    <span>
                                        <FriendListHeader
                                            title={"Friend Requests"}
                                            subTitle={incomingFriendRequests.length + outgoingFriendRequests.length
                                                + " Friend Requests"}
                                            setShowMenuSection={setShowFriendRequests}
                                        />
                                        <Row
                                            style={{paddingTop: 10}}
                                            className={"col-auto justify-content-start"}
                                        >
                                            {finalIncomingFriendRequests}
                                        </Row>
                                        <Row style={{paddingTop: 10}}
                                             className={"col-auto justify-content-start"}
                                        >
                                            {finalOuutgoingFriendRequests}
                                        </Row>
                                    </span>
                                }
                                {!showFriendRequests && !showSuggestedFriends && !showAllFriends &&
                                        <div style={{
                                            backgroundColor: friendSuggestionsBackgroundColor,
                                            marginBottom: 10,
                                            alignItems: "center",
                                            alignContent: "center"}}
                                             onMouseEnter={() => setFriendSuggestionsBackgroundColor("whitesmoke")}
                                             onMouseLeave={() => setFriendSuggestionsBackgroundColor("white")}
                                             onClick={() => customSetShowSuggestedFriends()}>
                                            <Image
                                                style={{borderRadius: "50%", marginRight: 10}}
                                                width={35}
                                                height={35}
                                                thumbnail={true}
                                                src={require("./data/images/FriendSuggestionsIcon.png")}
                                            />
                                            <span style={{
                                                fontSize: "24px",
                                                fontWeight: "bold"
                                            }}
                                            >
                                                Suggestions
                                            </span>
                                        </div>
                                }
                                { showSuggestedFriends &&
                                    <span>
                                        <FriendListHeader
                                            title={"Suggestions"}
                                            subTitle={"People you may know"}
                                            setShowMenuSection={setShowSuggestedFriends}
                                        />
                                        <Row
                                            style={{paddingTop: 10}}
                                            className={"col-auto justify-content-start"}
                                        >
                                            {finalSuggestedFriends}
                                        </Row>
                                    </span>

                                }
                                { !showFriendRequests && !showSuggestedFriends && !showAllFriends &&
                                    <div style={{
                                        backgroundColor: allFriendsBackgroundColor,
                                        marginBottom: 10,
                                        alignItems: "center",
                                        alignContent: "center"}}
                                         onMouseEnter={() => setAllFriendsBackgroundColor("whitesmoke")}
                                         onMouseLeave={() => setAllFriendsBackgroundColor("white")}
                                         onClick={() => customSetShowAllFriends()}>
                                        <Image
                                            style={{borderRadius: "50%", marginRight: 10}}
                                            width={35}
                                            height={35}
                                            thumbnail={true}
                                            src={require("./data/images/AllFriendsIcon.png")}
                                        />
                                        <span style={{
                                            fontSize: "24px",
                                            fontWeight: "bold"
                                        }}
                                        >
                                            All Friends
                                        </span>
                                    </div>
                                }
                                { showAllFriends &&
                                    <span>
                                        <FriendListHeader
                                            title={"All friends"}
                                            subTitle={friendList.length + " friends"}
                                            setShowMenuSection={setShowAllFriends}
                                        />
                                        <Row
                                            style={{paddingTop: 10}}
                                            className={"col-auto justify-content-start"}
                                        >
                                            {friendList}
                                        </Row>
                                    </span>
                                }
                            </Col>
                            <Col xs={9}>
                                <Row>
                                    <Account/>
                                </Row>
                                { selectedFriend ?
                                    <Row>
                                        <UserTimeline passedUserId={selectedFriend.userId} nestedInPage={true} />
                                    </Row>
                                    : ''
                                }
                                { !selectedFriend ? <Row>
                                        <FriendsHome customSetSelectedFriend={setSelectedFriend}/>
                                    </Row>
                                    : ''
                                }
                            </Col>
                        </Row>
            </Container>
        </div>
    );
};

export default FriendList;