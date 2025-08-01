import {Button, Col, Modal, ModalBody, Row} from "reactstrap";
import {FaComment, FaShare, FaThumbsUp} from "react-icons/fa";
import CreateReply from "./CreateReply";

import React, {useEffect, useRef, useState} from "react";
import GeneratedProfileImage from "./GeneratedProfileImage";
import {useUsers} from "./context/UsersProvider";
import CreateShare from "./CreateShare";
import {Link, useNavigate} from "react-router-dom";
import {getDisplayDate} from "./dateUtils";
import FriendMouseOver from "./FriendMouseOver";

const DisplayReply = ({currentUser, profileUser, post, getStoredSinglePostByPostId,
                          customUpdateOnShare, customUpdateOnLike, customUpdateOnReply,
                          modal, viewedReplyIds, setViewedReplyIds, selectedPost,
                          setSelectedPost, toggleShowSinglePost, selectedReply, setSelectedReply,
                          displaySinglePhoto, photoReplies, setPhotoReplies}) => {

    console.log("DisplayReply")
    console.log("post")
    console.dir(post)

    const [hideComment, setHideComment] = useState(true);
    const [hideShare, setHideShare] = useState(true);
    const {usersObject, getUserById} = useUsers();
    const {users, setUsers} = usersObject;
    const hasRepliesBeenOpened = viewedReplyIds.includes(post?.id);
    const navigate = useNavigate()
    const navigateToProfile = (userToNavigateTo) => navigate('/friends/' + userToNavigateTo.userId)

    const customDisplayReplyUpdateOnReply = (postToReplyTo, newReplyToSave) => {
        if(selectedReply === post.id) {
            setSelectedReply(null);
        }

        customUpdateOnReply(postToReplyTo, newReplyToSave);
    }

    const onCommentClick = () => {
        if(!modal) {
            let parentPost = getStoredSinglePostByPostId(post.parentId, users, post)
            setSelectedPost(parentPost);
            setSelectedReply(post.id);
            toggleShowSinglePost();

            if(!viewedReplyIds.includes(post.id)) {
                let updatedViewedReplyIds = [...viewedReplyIds];
                updatedViewedReplyIds.push(post.id);
                setViewedReplyIds([...updatedViewedReplyIds])
            }
        }

        setHideComment(!hideComment);
    }

    const onLikeClick = () => {
        customUpdateOnLike(post, currentUser.userId)
    }

    let likeColor = post?.likesUserIds.includes(currentUser.userId) ? 'primary' : 'light'
    const postUser = getUserById(post?.userId)
    let userImage = require("./data/images/" + postUser.userId + "/user-image.jpg");

    const onClickViewReplies = (post) => {
        if(!modal) {
            let parentPost = getStoredSinglePostByPostId(post.parentId, users, post)
            setSelectedPost(parentPost);
            toggleShowSinglePost();
        }

        let updatedViewedReplyIds = [...viewedReplyIds];

        if(updatedViewedReplyIds.includes(post.id)) {
            updatedViewedReplyIds = updatedViewedReplyIds.filter(id => post.id !== id);
        } else {
            updatedViewedReplyIds.push(post.id);
        }

        setViewedReplyIds([...updatedViewedReplyIds])
    }

    if(!post) {
        return <p>Loading</p>
    }

    return <Row style={{
        paddingTop: 25,
        paddingLeft: 25,
    }}>
        <Row>
            <Col className={"col-auto"}>
                <Row onClick={() => navigateToProfile(postUser)} style={{ backgroundColor: "whitesmoke", padding: 2}}>
                    <FriendMouseOver currentUser={currentUser} profileUser={profileUser} friend={postUser}>
                        <div  className={"d-flex"}>
                            <img
                                width="25px"
                                height="25px"
                                style={{borderRadius: "50%", marginRight: 10}}
                                src={userImage}
                            />
                            <h5>{postUser.name}</h5>
                        </div>
                    </FriendMouseOver>
                </Row>
                <Row style={{paddingTop: 5,  backgroundColor: "whitesmoke"}}>
                    <p>
                        {post.content}
                    </p>
                </Row>
                { post.data &&
                    <Row>
                        <img src={post.data}/>
                    </Row>
                }
                <Row className="d-flex justify-content-end">
                    <Col>
                        <span style={{marginRight: 5}}>
                            {getDisplayDate(post.timestamp)}
                        </span>
                        <Button style={{marginRight: 5}} color={likeColor} onClick={() => onLikeClick()}>
                            <span>Like</span>
                        </Button>
                        <Button style={{marginRight: 5}} color="light" onClick={() => onCommentClick()}>
                            <span>Reply</span>
                        </Button>
                        { post.likesUserIds.length > 0 &&
                            <span>
                                <FaThumbsUp
                                    size="20"
                                    style={{
                                        backgroundColor: "#0d6efd",
                                        color: "white",
                                        borderRadius: 20,
                                        padding: 4,
                                        marginRight: 10}}
                                />
                                {post.likesUserIds.length > 0 && post.likesUserIds.length}
                            </span>
                        }
                        { ((modal && !hasRepliesBeenOpened && post.commentsPostIds.length > 0) || (!modal && post.commentsPostIds.length > 0)) &&
                            <Row>
                                <h5 style={{margin: 5}} onClick={() => onClickViewReplies(post)}>View {post.commentsPostIds.length} replies</h5>
                            </Row>
                        }
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row hidden={hideShare} style={{paddingTop: 5, paddingLeft: 25}}>
            <CreateShare
                postToShare={post}
                currentUser={currentUser}
                profileUser={profileUser}
                hideShare={hideShare}
                setHideShare={setHideShare}
                customUpdateOnShare={customUpdateOnShare}
            />
        </Row>
        { modal &&
            <Row hidden={selectedReply === post.id ? false : hideComment} style={{paddingTop: 5, paddingLeft: 25}}>
                <CreateReply
                    postToReplyTo={post}
                    currentUser={currentUser}
                    profileUser={profileUser}
                    hideComment={hideComment}
                    setHideComment={setHideComment}
                    setSelectedReply={setSelectedReply}
                    customUpdateOnReply={customDisplayReplyUpdateOnReply}
                />
            </Row>
        }
        { hasRepliesBeenOpened &&
            post.commentsPostIds.map((postId, index) => {
                let reply = null;
                if(displaySinglePhoto) {
                    reply = photoReplies.find(reply => reply.id === postId)
                } else {
                    reply = getStoredSinglePostByPostId(postId, users, post);
                }

                if(modal && reply) {
                    return <DisplayReply
                        currentUser={currentUser}
                        profileUser={profileUser}
                        post={reply}
                        getStoredSinglePostByPostId={getStoredSinglePostByPostId}
                        customUpdateOnReply={customUpdateOnReply}
                        customUpdateOnLike={customUpdateOnLike}
                        customUpdateOnShare={customUpdateOnShare}
                        modal={modal}
                        viewedReplyIds={viewedReplyIds}
                        setViewedReplyIds={setViewedReplyIds}
                        selectedPost={selectedPost}
                        setSelectedPost={setSelectedPost}
                        selectedReply={selectedReply}
                        setSelectedReply={setSelectedReply}
                        toggleShowSinglePost={toggleShowSinglePost}
                        displaySinglePhoto={displaySinglePhoto}
                        photoReplies={photoReplies}
                        setPhotoReplies={setPhotoReplies}
                    />
                } else {
                    return '';
                }
            })
        }
    </Row>
}
export default DisplayReply;