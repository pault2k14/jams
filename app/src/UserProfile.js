import React, {useEffect, useRef, useState} from 'react';
import {Container, Row, Col, ModalFooter, Modal, ModalHeader, ModalBody, Button} from 'reactstrap';
import { useCookies } from 'react-cookie';
import "react-image-gallery/styles/css/image-gallery.css";
import CreateTimelinePost from "./CreateTimelinePost";
import {
    orderPostsByTimestamp,
    usePost
} from "./context/PostProvider";
import {useUsers} from "./context/UsersProvider";
import {getStoredPhotosByUserId, getStoredPhotosRepliesByPhotoIdAndUserId, usePhotos} from "./context/PhotosProvider";
import {Overview} from "./About";
import Intro from "./Intro";
import SinglePhoto from "./SinglePhoto";
import {
    customUpdateOnPhotoLike, customUpdateOnPhotoReply,
    customUpdateOnPhotoShare,
    customUpdatePhotoReplyOnLike,
    customUpdatePhotoReplyOnReply,
    customUpdatePhotoReplyOnShare
} from "./context/photoUtils";
import PhotosPanel from "./PhotosPanel";
import FriendsPanel from "./FriendsPanel";
import {useProfileFriends} from "./context/ProfileFriendsProvider";
import {
    updateOnLikeForUserProfile,
    updateOnReplyForUserProfile,
    updateOnShareForUserProfile
} from "./context/postUtils";
import DisplayPostList from "./DisplayPostList";
import './UserProfile.css'

const UserProfile = ({currentUser, profileUser, posts, setPosts, isFloatingChatOpen, setIsFloatingChatOpen}) => {
    console.log("UserProfile")
    const [cookies] = useCookies(['XSRF-TOKEN']);
    const {postsObject, setPostsByUserId, getStoredSinglePostByPostId, getPostsForAllFriends} = usePost();
    const {photosObject, photoRepliesObject, getPhotosByUserId,
        setStoredPhotosByUserId, getStoredSinglePhotoPostReplyByPostId,
        setStoredPhotoRepliesByPhotoId, addStoredPhotoRepliesByPhotoId} = usePhotos();
    const {photos, setPhotos} = photosObject;
    const {photoReplies, setPhotoReplies} = photoRepliesObject;
    const {profileFriendsObject, incomingProfileFriendRequestsObject,
        outgoingProfileFriendRequestsObject, setProfileFriendsByUserId,
        sendProfileFriendRequest, confirmProfileFriendRequest} = useProfileFriends();
    const {profileFriends, setProfileFriends} = profileFriendsObject;
    const {usersObject, getUserById} = useUsers();
    const {users, setUsers} = usersObject;
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const randomFriendsForFriendsPanel = useRef([])

    console.log("UserProfile");
    console.log("profileUser");
    console.dir(profileUser);
    console.log("posts")
    console.dir(posts)

    useEffect(() => {
        const fetchData = async () => {
            setStoredPhotosByUserId(profileUser.userId);
        };

        fetchData();
    }, [profileUser]);


    const userProfileCustomOnReply = (postToReplyTo, newReplyContent) => {
        updateOnReplyForUserProfile(currentUser, setPosts, postToReplyTo, newReplyContent, users);
    }

    const userProfileCustomOnLike = (postToLike, currentUserId) => {
        updateOnLikeForUserProfile(currentUser, setPosts, postToLike, currentUserId, users)
    }

    const userProfileCustomOnShare = (postToShare, newContentToShare) => {
        updateOnShareForUserProfile(currentUser, postToShare, newContentToShare);
    }

    useEffect(() => {

        setProfileFriendsByUserId(profileUser.userId);
        randomFriendsForFriendsPanel.current = [];
    }, [profileUser]);

    if (loading) {
        return <p>Loading...</p>;
    }

    const userProfileCustomUpdateOnPhotoShare = (photoToShare, newContentToShare) => {

        if(photos.some(photo => photo.id === photoToShare.id)) {
            customUpdateOnPhotoShare(photoToShare, newContentToShare, currentUser, setPosts);
        } else if(photoReplies.some(photo => photo.id === photoToShare.id)) {
            customUpdatePhotoReplyOnShare(photoToShare, newContentToShare, currentUser, setPosts);
        }
    }

    const userProfileCustomUpdateOnPhotoLike = (photoToLike, currentUserId) => {
        if(photos.some(photo => photo.id === photoToLike.id)) {
            customUpdateOnPhotoLike(photoToLike, currentUser, profileUser,  setPhotos);
        } else if(photoReplies.some(photo => photo.id === photoToLike.id)) {
            customUpdatePhotoReplyOnLike(photoToLike, currentUser, setStoredPhotoRepliesByPhotoId);
        }
    }

    const userProfileCustomUpdateOnPhotoReply = (photoToReplyTo, newReplyContent) => {
        if(photos.some(photo => photo.id === photoToReplyTo.id)) {
            customUpdateOnPhotoReply(photoToReplyTo, newReplyContent, currentUser,
                profileUser, setPhotos, setStoredPhotoRepliesByPhotoId);
        } else if(photoReplies.some(photo => photo.id === photoToReplyTo.id)) {
            customUpdatePhotoReplyOnReply(photoToReplyTo, newReplyContent, currentUser,
                setStoredPhotoRepliesByPhotoId);
        }
    }

    return (
        <div>
        <Container fluid>
                <Row>
                    <Col xs={5}>
                        <div style={{marginRight: 0, marginLeft: 0}}
                            className={"row no-gutters LeftColumn"}>
                                <Intro
                                    currentUserId={currentUser.userId}
                                    userId={profileUser.userId}/>
                        </div>
                        <div style={{marginRight: 0, marginLeft: 0}}
                            className={"row no-gutters LeftColumn"}>
                            <PhotosPanel
                                profileUser={profileUser}
                                currentUser={currentUser}
                                userProfileCustomUpdateOnPhotoLike={userProfileCustomUpdateOnPhotoLike}
                                userProfileCustomUpdateOnPhotoReply={userProfileCustomUpdateOnPhotoReply}
                                userProfileCustomUpdateOnPhotoShare={userProfileCustomUpdateOnPhotoShare}
                            />
                        </div>
                        <div style={{marginRight: 0, marginLeft: 0}}
                            className={"row no-gutters LeftColumn"}>
                            <FriendsPanel
                                currentUser={currentUser}
                                profileUser={profileUser}
                                friends={profileFriends}
                                randomFriendsForFriendsPanel={randomFriendsForFriendsPanel}
                                isFloatingChatOpen={isFloatingChatOpen}
                                setIsFloatingChatOpen={setIsFloatingChatOpen}
                            />
                        </div>
                    </Col>
                    <Col xs={7}>
                    <Row>
                        <CreateTimelinePost
                            currentUser={currentUser}
                            profileUser={profileUser}
                            posts={posts}
                            setPosts={setPosts}
                        />
                    </Row>
                    <Row>
                            <DisplayPostList
                                profileUser={profileUser}
                                currentUser={currentUser}
                                postsToDisplay={posts}
                                customUpdateOnShare={userProfileCustomOnShare}
                                customUpdateOnLike={userProfileCustomOnLike}
                                customUpdateOnReply={userProfileCustomOnReply}
                            />
                    </Row>
                    </Col>
                </Row>
        </Container>
        </div>
    );
};

export default UserProfile;