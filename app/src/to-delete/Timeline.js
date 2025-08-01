import React, { useEffect, useState } from 'react';
import './App.css';
import {Col, Container, Row} from 'reactstrap';

import UserProfile from "./UserProfile";
import ProfileNavBar from "./ProfileNavBar";
import TimelineHeader from "./TimelineHeader";
import About from "./About";
import ProfileFriends from "./ProfileFriends";
import {useProfilePost} from "./context/ProfilePostProvider";
import ProfilePhotos from "./ProfilePhotos";

const Timeline = ({currentUser, currentUserPosts, setCurrentUserPosts, profileUser, profilePosts, setProfilePosts,
                      profileTabActive, setProfileTabActive,
                      aboutTabActive, setAboutTabActive,
                      friendsTabActive, setFriendsTabActive,
                      photosTabActive, setPhotosTabActive,
                      customSetSelectedFriend}) => {

    console.log("Timeline")
    console.log("profileUser");
    console.dir(profileUser);
    console.log("profilePosts");
    console.dir(profilePosts);
    console.log("currentUserPosts");
    console.dir(currentUserPosts);
    console.log("profileTabActive")
    console.dir(profileTabActive);
    console.log("setProfileTabActive");
    console.dir(setProfileTabActive);
    console.log("aboutTabActive");
    console.dir(aboutTabActive);
    console.log("setAboutTabActive");
    console.dir(setAboutTabActive);
    console.log("friendsTabActive");
    console.dir(friendsTabActive);
    console.log("setFriendsTabActive");
    console.dir(setFriendsTabActive);
    console.log("setPhotosTabActive");
    console.dir(setPhotosTabActive);

    const [selectedTab, setSelectedTab] = useState();

    const SelectedTab = () => {
        return selectedTab;
    }

    return (
        <div>
            <Container fluid>
                <Row>
                        <Row>
                            <TimelineHeader profileUser={profileUser}/>
                        </Row>
                        <Row style={{padding: 25}}>
                            <ProfileNavBar
                                setProfileTabActive={setProfileTabActive}
                                setAboutTabActive={setAboutTabActive}
                                setFriendsTabActive={setFriendsTabActive}
                                setPhotosTabActive={setPhotosTabActive}
                            />
                        </Row>
                        {<Row>
                            {profileTabActive
                                ?
                                <UserProfile
                                    currentUser={currentUser}
                                    profileUser={profileUser}
                                    currentUserPosts={currentUserPosts}
                                    setCurrentUserPosts={setCurrentUserPosts}
                                    profilePosts={profilePosts}
                                    setProfilePosts={setProfilePosts}
                                    masterPostList={profilePosts}
                                    customSetSelectedFriend={customSetSelectedFriend}
                                    onClickPostUser={customSetSelectedFriend}
                                />
                                :
                                ''
                            }
                            {aboutTabActive
                                ?
                                <About
                                    userId={profileUser.userId}/>
                                : ''}
                            {friendsTabActive
                                ?
                                <ProfileFriends
                                    userId={profileUser.userId}
                                    customSetSelectedFriend={customSetSelectedFriend}/>
                                : ''}
                            {photosTabActive
                                ?
                                <ProfilePhotos
                                    currentUser={currentUser}
                                    profileUser={profileUser}
                                    setProfilePosts={setProfilePosts}
                                />
                                : ''}
                        </Row>}
                </Row>
            </Container>
        </div>
    );
}

export default Timeline;