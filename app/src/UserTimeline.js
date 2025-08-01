import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import './App.css';
import {Col, Container, Row} from 'reactstrap';

import UserProfile from "./UserProfile";
import ProfileNavBar from "./ProfileNavBar";
import TimelineHeader from "./TimelineHeader";
import About from "./About";
import ProfileFriends from "./ProfileFriends";
import {useProfilePost} from "./context/ProfilePostProvider";
import ProfilePhotos from "./ProfilePhotos";
import {useParams} from "react-router-dom";
import {orderPostsByTimestamp, usePost} from "./context/PostProvider";
import {getStoredPhotosByUserId} from "./context/PhotosProvider";
import {useUsers} from "./context/UsersProvider";
import TimelineHeaderImage from "./TimelineHeaderImage";
import FloatingChat from "./FloatingChat";

const UserTimeline = ({passedUserId, nestedInPage}) => {
    console.log("UserTimeline")
    let { userId } = useParams();
    const [parsedUserId, setParsedUserId] = useState();
    const {usersObject, getUserById} = useUsers();
    const [currentUser, setCurrentUser] = useState(null);
    const [profileUser, setProfileUser] = useState(null);
    const {postsObject, setPostsByUserId, getStoredSinglePostByPostId, getPostsForAllFriends} = usePost();
    const {posts, setPosts} = postsObject;
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [profileTabActive, setProfileTabActive] = useState(true)
    const [aboutTabActive, setAboutTabActive] = useState(false)
    const [friendsTabActive, setFriendsTabActive] = useState(false)
    const [photosTabActive, setPhotosTabActive] = useState(false);
    const [isFloatingChatOpen, setIsFloatingChatOpen] = useState(false);
    let topLevelContainerPaddingTop = 75;

    if(nestedInPage) {
        topLevelContainerPaddingTop = 0
    }

    useEffect(() => {
        const fetchData = async () => {
            if(!userId) {
                console.log("userId not set, setParsedUserId(passedUserId)")
                setParsedUserId(passedUserId);
            } else {
                console.log("userId was set, setParsedUserId(parseInt(userId))")
                setParsedUserId(parseInt(userId))
            }
        };

        fetchData();
    }, [userId, passedUserId]);

    useEffect(() => {
        const fetchData = async () => {
            setCurrentUser(getUserById(10))
            setProfileUser(getUserById(parsedUserId))
        };

        fetchData();
    }, [parsedUserId]);

    useEffect(() => {
        const fetchData = async () => {
            if(!profileUser) {
                return;
            }

            setPostsByUserId(profileUser.userId);
        };

        fetchData();
    }, [profileUser]);


    if (!profileUser) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <Container fluid style={{
                paddingTop: topLevelContainerPaddingTop,
                backgroundColor: "whitesmoke"
            }}>
                <Row>
                    {!nestedInPage && <Col xs={2}></Col>}
                    <Col xs={9}>
                        <div
                            style={{marginLeft: 0, marginRight: 0}}
                            className={"row"}>
                            <TimelineHeaderImage profileUser={profileUser}/>
                            <TimelineHeader
                                profileUser={profileUser}
                                currentUser={currentUser}
                                isFloatingChatOpen={isFloatingChatOpen}
                                setIsFloatingChatOpen={setIsFloatingChatOpen}
                            />
                        </div>
                        <div style={{marginBottom: 10, marginLeft: 0, marginRight: 0}}
                             className={"row"}>
                            <ProfileNavBar
                                setProfileTabActive={setProfileTabActive}
                                setAboutTabActive={setAboutTabActive}
                                setFriendsTabActive={setFriendsTabActive}
                                setPhotosTabActive={setPhotosTabActive}
                                profileUser={profileUser}
                            />
                        </div>


                        {<Row>
                            {profileTabActive
                                ?
                                <UserProfile
                                    currentUser={currentUser}
                                    profileUser={profileUser}
                                    posts={posts}
                                    setPosts={setPosts}
                                    isFloatingChatOpen={isFloatingChatOpen}
                                    setIsFloatingChatOpen={setIsFloatingChatOpen}
                                />
                                :
                                ''
                            }
                            {aboutTabActive
                                ?
                                <About
                                    currentUserId={currentUser.userId}
                                    userId={profileUser.userId}/>
                                : ''}
                            {friendsTabActive
                                ?
                                <ProfileFriends
                                    currentUser={currentUser}
                                    profileUser={profileUser}
                                    isFloatingChatOpen={isFloatingChatOpen}
                                    setIsFloatingChatOpen={setIsFloatingChatOpen}
                                />
                                : ''}
                            {photosTabActive
                                ?
                                <ProfilePhotos
                                    currentUser={currentUser}
                                    profileUser={profileUser}
                                    posts={posts}
                                    setPosts={setPosts}
                                    selectedPhoto={selectedPhoto}
                                    setSelectedPhoto={setSelectedPhoto}
                                />
                                : ''}
                        </Row>}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default UserTimeline;