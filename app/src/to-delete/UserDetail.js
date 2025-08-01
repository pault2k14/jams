import {useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from 'react';
import {Container, Row, Col, ModalFooter, Modal, ModalHeader, ModalBody, Button} from 'reactstrap';
import { useCookies } from 'react-cookie';
import "react-image-gallery/styles/css/image-gallery.css";
import {assembleSingleTimeline} from "./assembleTimeline"
import CreateTimelinePost from "./CreateTimelinePost";
import RecursivePostList from "./RecursivePostList";
import {
    getPostsByUserId,
    getStoredPostsByUserId,
    getUserById, orderPostsByTimestamp,
    setStoredPostsByUserId,
    usePost
} from "./context/PostProvider";
import {useFriends} from "./context/FriendProvider";
import GeneratedProfileImage from "./GeneratedProfileImage";
import {useUsers} from "./context/UsersProvider";
import {getStoredPhotosByUserId, getStoredPhotosRepliesByPhotoIdAndUserId, usePhotos} from "./context/PhotosProvider";
import {Overview} from "./About";
import {MdOutlineZoomInMap} from "react-icons/md";
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
import {useProfilePost} from "./context/ProfilePostProvider";
import {getStoredPostsByPostId} from "./context/postUtils";

const UserDetail = () => {
    /*
   currentUser,
   profileUser,
   currentUserPosts,
   setCurrentUserPosts,
   profilePosts,
   setProfilePosts,
   masterPostList,
   customSetSelectedFriend
   */
    console.log("Inside UserDetail")
    let { userId } = useParams();
    let parsedUserId = parseInt(userId);
    const [cookies] = useCookies(['XSRF-TOKEN']);
    const [currentUser, setCurrentUser] = useState(null);
    const [profileUser, setProfileUser] = useState(null);
    const {profilePostsObject, setProfilePostsByUserId} = useProfilePost();
    const {profilePosts, setProfilePosts} = profilePostsObject;
    const {postsObject, setPostsByUserId} = usePost();
    const {posts, setPosts} = postsObject;
    const {friendsObject, incomingFriendRequestsObject, outgoingFriendRequestsObject,
        setFriendsByUserId} = useFriends();
    const {friends, setFriends} = friendsObject;
    const {usersObject, getUserById} = useUsers();
    const {users, setUsers} = usersObject;
    const [photos, setPhotos] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [selectedPhotoReplies, setSelectedPhotoReplies] = useState(null);
    const [loading, setLoading] = useState(false);
    const [sortedPosts, setSortedPosts] = useState([])
    const randomFriendsForFriendsPanel = useRef([])
    const randomPhotosForPhotosPanel = useRef([])
    const [isSinglePhotoOpen, setIsSinglePhotoOpen] = useState(false);
    const toggleShowSinglePhoto = () => setIsSinglePhotoOpen(!isSinglePhotoOpen);

    useEffect(() => {
        const fetchData = async () => {
            setCurrentUser(getUserById(10))
            setProfileUser(getUserById(parsedUserId))
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if(!profileUser) {
                return;
            }

            setProfilePostsByUserId(profileUser.userId);
        };

        fetchData();
    }, [profileUser]);

    useEffect(() => {
        const fetchData = async () => {
            setSortedPosts(orderPostsByTimestamp(profilePosts));
        };

        fetchData();
    }, [orderPostsByTimestamp, profilePosts]);

    useEffect(() => {
        const fetchData = async () => {
            if(!profileUser) {
                return
            }
            setPhotos(getStoredPhotosByUserId(profileUser.userId));
        };

        fetchData();
    }, [profileUser]);


    const userProfileCustomOnReply = (postToReplyTo, newReplyContent) => {
        let timestamp = new Date().getTime();

        let replyObject = {
            id: timestamp,
            parentId: postToReplyTo.id,
            commentsPostIds: [],
            topLevelParentId: null,
            share: false,
            sharedPost: null,
            timestamp: timestamp,
            title: "Lorem Ipsum is simply dummy text",
            content: newReplyContent,
            userId: currentUser.userId,
            likesUserIds: []
        }

        let copyOfPostToReplyTo = {
            id: postToReplyTo.id,
            parentId: postToReplyTo.parentId,
            commentsPostIds: [],
            topLevelParentId: postToReplyTo.topLevelParentId,
            share: postToReplyTo.share,
            sharedPost: postToReplyTo.sharedPost,
            timestamp: postToReplyTo.timestamp,
            title: postToReplyTo.title,
            content: postToReplyTo.content,
            userId: postToReplyTo.userId,
            likesUserIds: postToReplyTo.likesUserIds
        }

        postToReplyTo.commentsPostIds.map(postId => copyOfPostToReplyTo.commentsPostIds.push(postId))
        copyOfPostToReplyTo.commentsPostIds.push(replyObject.id);

        // Get stored posts by user id for author of post
        let storedPostsByUserId = getStoredPostsByPostId(copyOfPostToReplyTo.id, users)

        storedPostsByUserId.posts = storedPostsByUserId.posts.map(post => {
            if(post.id === copyOfPostToReplyTo.id) {
                return copyOfPostToReplyTo
            }
            return post;
        })

        storedPostsByUserId.posts.push(replyObject);

        // Store change in storage
        setStoredPostsByUserId(storedPostsByUserId.userId, storedPostsByUserId.posts)

        // Update profilePosts
        setProfilePosts(orderPostsByTimestamp(storedPostsByUserId.posts));
    }

    const userProfileCustomOnLike = (postToLike, currentUserId) => {
        let hasLikedPost = postToLike.likesUserIds.includes(currentUser.userId)
        let postToUpdate = {
            id: postToLike.id,
            parentId: postToLike.parentId,
            topLevelParentId: postToLike.topLevelParentId,
            commentsPostIds: postToLike.commentsPostIds,
            share: postToLike.share,
            sharedPost: postToLike.sharedPost,
            timestamp: postToLike.timestamp,
            title: postToLike.title,
            content: postToLike.content,
            likesUserIds: [],
            userId: postToLike.userId
        }

        if(hasLikedPost) {
            postToLike.likesUserIds = postToLike.likesUserIds.filter(userId => currentUser.userId !== userId)
            postToLike.likesUserIds.map(userId => postToUpdate.likesUserIds.push(userId))
        } else {
            postToLike.likesUserIds.map(userId => postToUpdate.likesUserIds.push(userId))
            postToUpdate.likesUserIds.push(currentUser.userId);
        }

        // Find the user of the post to like and find that users posts
        let storedPostsByUserId = getStoredPostsByPostId(postToUpdate.id, users)

        storedPostsByUserId.posts = storedPostsByUserId.posts.map(post => {
            if(post.id === postToUpdate.id) {
                return postToUpdate
            }
            return post;
        })

        // Update the stored posts with the new like
        setStoredPostsByUserId(storedPostsByUserId.userId, storedPostsByUserId.posts)

        // Update the profilePosts with the new like
        setProfilePosts([...orderPostsByTimestamp([...storedPostsByUserId.posts])]);
    }

    const userProfileCustomOnShare = (postToShare, newContentToShare) => {
        let timestamp = new Date().getTime();
        let shareObject = {
            id: timestamp,
            parentId: null,
            commentsPostIds: [],
            topLevelParentId: null,
            share: true,
            sharedPost: {
                timestamp: postToShare.timestamp,
                userId: postToShare.userId,
                title: postToShare.title,
                content: postToShare.content
            },
            timestamp: timestamp,
            title: "Lorem Ipsum is simply dummy text",
            content: newContentToShare,
            userId: currentUser.userId,
            likesUserIds: []
        }

        // Get stored posts for user sharing post
        let storedPostsByUserId = getStoredPostsByUserId(shareObject.userId);
        storedPostsByUserId.push(shareObject)

        // Add shared post to storage
        setStoredPostsByUserId(shareObject.userId, storedPostsByUserId)
    }

    useEffect(() => {
        if(!profileUser) {
            return
        }
        setFriendsByUserId(profileUser.userId);
        randomFriendsForFriendsPanel.current = [];
    }, [profileUser]);

    if (loading || !profileUser) {
        return <p>Loading...</p>;
    }

    const onShowSinglePhoto = (photo, photoReplies) => {
        setSelectedPhoto(photo);
        setSelectedPhotoReplies(photoReplies)
        toggleShowSinglePhoto();
    }

    const userProfileCustomUpdatePhotoReplyOnLike = (photoReplyToLike, currentUserId) => {
        customUpdatePhotoReplyOnLike(photoReplyToLike, currentUserId, currentUser, profileUser,
            selectedPhotoReplies, setSelectedPhotoReplies);
    }

    const userProfileCustomUpdatePhotoReplyOnShare = (photoReplyToShare, newContentToShare) => {
        customUpdatePhotoReplyOnShare(photoReplyToShare, newContentToShare, currentUser, setProfilePosts);
    }

    const userProfileCustomUpdatePhotoReplyOnReply = (photoReplyToReplyTo, newReplyContent) => {
        customUpdatePhotoReplyOnReply(photoReplyToReplyTo, newReplyContent, currentUser,
            profileUser, selectedPhotoReplies, setSelectedPhotoReplies);
    }

    const userProfileCustomUpdateOnPhotoShare = (photoToShare, newContentToShare) => {
        customUpdateOnPhotoShare(photoToShare, newContentToShare, currentUser, setProfilePosts);
    }

    const userProfileCustomUpdateOnPhotoLike = (photoToLike, currentUserId) => {
        customUpdateOnPhotoLike(photoToLike, currentUserId, currentUser,
            profileUser, setSelectedPhoto, setPhotos);
    }

    const userProfileCustomUpdateOnPhotoReply = (photoToReplyTo, newReplyContent) => {
        customUpdateOnPhotoReply(photoToReplyTo, newReplyContent, currentUser,
            profileUser, selectedPhotoReplies, setSelectedPhotoReplies, setPhotos, setSelectedPhoto);
    }

    const customSetSelectedFriend = () => {
        console.log("Need to implement in UserDetail!")
    }

    return (
        <div>
            <Container fluid>
                <div>
                    <Modal isOpen={isSinglePhotoOpen}
                           toggle={toggleShowSinglePhoto}
                           style={{maxWidth: "66%"}}>
                        <ModalBody>
                            <SinglePhoto
                                currentUser={currentUser}
                                profileUser={profileUser}
                                selectedPhoto={selectedPhoto}
                                selectedPhotoReplies={selectedPhotoReplies} customUpdateOnPhotoShare={userProfileCustomUpdateOnPhotoShare}
                                customUpdateOnPhotoLike={userProfileCustomUpdateOnPhotoLike}
                                customUpdateOnPhotoReply={userProfileCustomUpdateOnPhotoReply}
                                customUpdateOnShare={userProfileCustomUpdatePhotoReplyOnShare}
                                customUpdateOnLike={userProfileCustomUpdatePhotoReplyOnLike}
                                customUpdateOnReply={userProfileCustomUpdatePhotoReplyOnReply}
                                onHideSinglePhoto={toggleShowSinglePhoto}/>
                        </ModalBody>
                    </Modal>
                </div>
                <Row>
                    <Col xs={4} style={{paddingRight: 50}}>
                        <Row>
                            <Row xs={1}>
                                <Intro userId={profileUser.userId}/>
                            </Row>
                        </Row>
                        <Row>
                            <Row>
                                <Col>
                                    <h4>
                                        Photos
                                    </h4>
                                </Col>
                            </Row>
                            <Row xs={3}>
                                <PhotosPanel
                                    photos={photos}
                                    randomPhotosForPhotosPanel={randomPhotosForPhotosPanel}
                                    onShowSinglePhoto={onShowSinglePhoto}
                                    profileUser={profileUser}
                                />
                            </Row>
                        </Row>
                        <Row>
                            <Row>
                                <Col>
                                    <h4>
                                        Friends
                                    </h4>
                                </Col>
                            </Row>
                            <Row>
                                <FriendsPanel
                                    friends={friends}
                                    randomFriendsForFriendsPanel={randomFriendsForFriendsPanel}
                                    customSetSelectedFriend={customSetSelectedFriend}
                                />
                            </Row>
                        </Row>
                    </Col>
                    <Col xs={8}>
                        <Row style={{paddingTop: 25}}>
                            <CreateTimelinePost
                                currentUser={currentUser}
                                profileUser={profileUser}
                                profilePosts={profilePosts}
                                setProfilePosts={setProfilePosts}
                            />
                        </Row>
                        <Row>
                            <Col className={"col-auto"}>
                                <Row>
                                    {<RecursivePostList
                                        currentUser={currentUser}
                                        profileUser={profileUser}
                                        profilePosts={profilePosts}
                                        setProfilePosts={setProfilePosts}
                                        customUpdateOnShare={userProfileCustomOnShare}
                                        customUpdateOnLike={userProfileCustomOnLike}
                                        customUpdateOnReply={userProfileCustomOnReply}
                                        masterPostList={profilePosts}
                                        displayPhotos={true}
                                        onClickPostUser={customSetSelectedFriend}
                                    />}
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default UserDetail;