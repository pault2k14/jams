import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import {Col, Container, Row} from 'reactstrap';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import Account from "./Account";
import {
    orderPostsByTimestamp,
    usePost
} from "./context/PostProvider";
import {useUsers} from "./context/UsersProvider";
import currentUserProvider, {useCurrentUser} from "./context/CurrentUserProvider";
import {Link, useNavigate} from 'react-router-dom';
import {setFriendsByUserId} from "./context/friendUtils";
import {useProfilePost} from "./context/ProfilePostProvider";
import {useFriends} from "./context/FriendProvider";
import {assembleSingleTimeline} from "./assembleTimeline";
import RecursivePostList from "./RecursivePostList";
import {
    updateOnLikeForHome,
    updateOnReplyForHome,
    updateOnShareForHome
} from "./context/postUtils";
import post from "./Post";
import DisplayPostList from "./DisplayPostList";
import {FaUserGroup} from "react-icons/fa6";
import {Image} from "react-bootstrap";

const Home = () => {
    const {postsObject, setPostsByUserId,
        getStoredSinglePostByPostId, getPostsForAllFriends} = usePost();
    const {posts, setPosts} = postsObject;
    const {profilePostsObject, setProfilePostsByUserId} = useProfilePost();
    const {profilePosts, setProfilePosts} = profilePostsObject;
    const {friendsObject, incomingFriendRequestsObject, outgoingFriendRequestsObject, setFriendsByUserId,
        sendFriendRequest, confirmFriendRequest, getNumberOfFriendsByUserId,
        getNumberOfMutualFriendsByUserId} = useFriends();
    const {friends, setFriends} = friendsObject;
    const {usersObject, getUserById} = useUsers();
    const {users, setUsers} = usersObject;
    const {currentUserObject, setCurrentUserByUserId} = useCurrentUser();
    const {currentUser, setCurrentUser} = currentUserObject;
    const [homeUser, setHomeUser] = useState({});
    const navigate = useNavigate()
    const navigateToFriends = () => navigate('/friends');//eg.history.push('/login');
    const navigateToProfile = () => navigate('/friends/' + currentUser.userId)

    useEffect(() => {
        const fetchData = async () => {
            if(!currentUser) {
                setCurrentUser(getUserById(10));
            }

            setPostsByUserId(10);
            setHomeUser(getUserById(10));
            setFriendsByUserId(10);
        };

        fetchData();
    }, [currentUser, homeUser]);


    useEffect(() => {
        const fetchData = async () => {
            getPostsForAllFriends(friends);
        };

        fetchData();
    }, [friends]);

    if(!currentUser) {
        return <p>Loading...</p>
    }

    const customUpdateOnShare = (postToShare, newContentToShare) => {
        updateOnShareForHome(currentUser, postToShare, newContentToShare);
    }

    const customUpdateOnLike = (postToLike, currentUserId) => {
        updateOnLikeForHome(currentUser, friends, setPosts, postToLike, users);
        getPostsForAllFriends(friends);
    }

    const customUpdateOnReply = (postToReplyTo, newReplyContent) => {
        updateOnReplyForHome(currentUser, friends, setPosts, postToReplyTo, newReplyContent, users);
        getPostsForAllFriends(friends);
    }

    let userImage = require("./data/images/" + currentUser.userId + "/user-image.jpg");


    return (
        <div>
            <Container fluid style={{
                paddingTop: 75,
                backgroundColor: "whitesmoke"
            }}>
                <Row>
                    <Col className={"col-auto"}>
                        <Sidebar>
                            <Menu>
                                <MenuItem onClick={() => navigateToProfile()}>
                                    {
                                        currentUser
                                            ?
                                            <span>
                                                <Image
                                                    style={{borderRadius: "50%", marginRight: 5}}
                                                    width={35}
                                                    height={35}
                                                    thumbnail={true}
                                                    src={userImage}
                                                />
                                                {currentUser.name}
                                            </span>
                                            :
                                            'Timeline'
                                    }
                                </MenuItem>
                                <MenuItem onClick={navigateToFriends}><FaUserGroup size={35} style={{marginRight: 5}} />Friends</MenuItem>
                            </Menu>
                        </Sidebar>
                    </Col>
                    <Col className={"col-8"}>
                        <Row>
                            <Account/>
                        </Row>
                        <Row>
                            <DisplayPostList
                                currentUser={currentUser}
                                profileUser={homeUser}
                                postsToDisplay={posts}
                                customUpdateOnShare={customUpdateOnShare}
                                customUpdateOnLike={customUpdateOnLike}
                                customUpdateOnReply={customUpdateOnReply}
                                isReply={false}
                                displayPhotos={true}
                            />
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home;