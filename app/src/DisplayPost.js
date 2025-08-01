import {Button, Col, Modal, ModalBody, Row} from "reactstrap";
import {FaComment, FaShare, FaThumbsUp} from "react-icons/fa";
import CreateReply from "./CreateReply";

import React, {useEffect, useState} from "react";
import GeneratedProfileImage from "./GeneratedProfileImage";
import {useUsers} from "./context/UsersProvider";
import CreateShare from "./CreateShare";
import {Link} from "react-router-dom";
import ContactAndBasicInfo from "./ContactAndBasicInfo";
import SinglePhoto from "./SinglePhoto";
import RecursivePostList from "./RecursivePostList";
import {getStoredPhotosRepliesByPhotoIdAndUserId} from "./context/PhotosProvider";


const DisplayPost = ({currentUser, profileUser, post, customUpdateOnShare,
                         customUpdateOnLike, customUpdateOnReply, displayPhotos, masterPostList}) => {
    const [hideComment, setHideComment] = useState(true);
    const [hideShare, setHideShare] = useState(true);
    const {usersObject, getUserById} = useUsers();
    const [hasLikedPost, setHasLikedPost] = useState(post.likesUserIds.includes(currentUser.userId))
    const [selectedPost, setSelectedPost] = useState(null)
    const [selectedPostReplies, setSelectedPostReplies] = useState([]);
    const [isSinglePostOpen, setIsSinglePostOpen] = useState(false);
    const toggleShowSinglePost = () => setIsSinglePostOpen(!isSinglePostOpen);

    //console.log("DisplayPost");
    //console.log("post");
    //console.dir(post);

    const onCommentClick = () => {
        setHideComment(!hideComment);
    }

    const onShareClick = () => {
        setHideShare(!hideShare);
    }

    let likeColor = hasLikedPost ? 'primary' : 'light'

    const onLikeClick = () => {
        setHasLikedPost(!hasLikedPost);
        customUpdateOnLike(post, currentUser.userId)
    }

    const postUser = getUserById(post.userId)
    let shareUser = post.share ? getUserById(post.sharedPost.userId) : null;
    let postDateTime = new Date(post.timestamp);
    let postDateString = postDateTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + " at " + postDateTime.toLocaleTimeString();
    let postTimeString = postDateTime.toLocaleTimeString();
    let sharedPostDateTime = null;
    let sharedPostDateString = null;
    let sharedPostTimeString = null;

    if(post && post.sharedPost && post.sharedPost.timestamp) {
        sharedPostDateTime = new Date(post.sharedPost.timestamp);
        sharedPostDateString = sharedPostDateTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + " at " + sharedPostDateTime.toLocaleTimeString();
        sharedPostTimeString = sharedPostDateTime.toLocaleTimeString();
    }

    const onClickPostUser = (postUser) => {
        return <Link to={'/friends/' + postUser.userId}>Contact</Link>
    }

    const onClickViewMoreComments = (post) => {
        console.log("onClickViewMoreComments")
        setSelectedPost(post);
        // TODO need to create getStoredPostRepliesByPostIdAndUserId
        let repliesByPostId = getStoredPhotosRepliesByPhotoIdAndUserId(post.id, profileUser.userId);
        setSelectedPostReplies([...repliesByPostId])
        toggleShowSinglePost();
    }

    return <div>
        <Modal
            isOpen={isSinglePostOpen}
            scrollable={true}
            toggle={toggleShowSinglePost}
            style={{maxWidth: "66%"}}>
            <ModalBody>
                <RecursivePostList
                    profileUser={profileUser}
                    currentUser={currentUser}
                    profilePosts={[post]}
                    setProfilePosts={null}
                    customUpdateOnLike={customUpdateOnLike}
                    customUpdateOnReply={customUpdateOnReply}
                    customUpdateOnShare={customUpdateOnShare}
                    displayPhotos={displayPhotos}
                    isReply={false}
                    masterPostList={selectedPostReplies}
                />
            </ModalBody>
        </Modal>

        <Row style={{
        //backgroundColor: "whitesmoke",
        paddingTop: 25,
        paddingLeft: 25,
        //borderBottom: 'ridge',
        //borderLeft: 'ridge'
    }}>
        <Row>
            <Col className={"col-auto"}>
                <Link to={'/friends/' + postUser.userId}>
                    <GeneratedProfileImage
                        username={postUser.name}
                        size={postUser.userMiniImageSize}
                        borderRadius={postUser.userImageBorderRadius}
                        color={postUser.userImageColor} backgroundColor={postUser.userImageBackgroundColor}
                    />
                </Link>
            </Col>
            <Col className={"col-auto"}>
                <Link
                    to={'/friends/' + postUser.userId}
                    style={{textDecoration: 'none', color: "black"}}>
                    <h5>{postUser.name}</h5>
                </Link>
            </Col>
        </Row>
        <Row style={{paddingTop: 5}}>
            <h6>
                {postDateString}
            </h6>
        </Row>
        <Row style={{paddingTop: 5}}>
            <p>
                {post.content}
            </p>
        </Row>
        <div  style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span><FaThumbsUp
                size="20"
                style={{
                    backgroundColor: "#0d6efd",
                    color: "white",
                    borderRadius: 20,
                    padding: 4,
                    marginRight: 10
            }}/>{post.likesUserIds.length > 0 ? post.likesUserIds.length : ''}</span>
            <span onClick={() => onClickViewMoreComments(post)}>{post.commentsPostIds.length > 0 ? post.commentsPostIds.length + " comments" : ''}</span>
        </div>
        <Row>{
            post.data && displayPhotos
                ? <img src={post.data}/>
                : ''
        }
        </Row>
        {
            shareUser
                ?
                <div style={{paddingLeft: 25}}>
                    <Row onClick={() => onClickPostUser(shareUser)}>
                        <Col className={"col-auto"}>
                            <Link to={'/friends/' + shareUser.userId}>
                                <GeneratedProfileImage
                                    username={shareUser.name}
                                    size={shareUser.userMiniImageSize}
                                    borderRadius={shareUser.userImageBorderRadius}
                                    color={shareUser.userImageColor}
                                    backgroundColor={shareUser.userImageBackgroundColor}
                                />
                            </Link>
                        </Col>
                        <Col className={"col-auto"}>
                            <Link
                                to={'/friends/' + shareUser.userId}
                                style={{textDecoration: 'none', color: "black"}}>
                                <h5>{shareUser.name}</h5>
                            </Link>
                        </Col>
                    </Row>
                    <Row style={{paddingTop: 5}}>
                        <h6>
                            {sharedPostDateString}
                        </h6>
                    </Row>
                    <Row style={{paddingTop: 5}}>
                        <p>
                            {post.sharedPost.content}
                        </p>
                    </Row>
                    <Row>{
                        post.sharedPost.data
                            ? <img src={post.sharedPost.data}/>
                            : ''
                    }
                    </Row>
                </div>
                : ''
        }
        <Row xs="16" style={{paddingTop: 5}}>
            <Col>
                <Button color={likeColor} style={{paddingRight: 5}} onClick={() => onLikeClick()}>
                    <FaThumbsUp style={{paddingRight: 5}}/>
                    <span style={{paddingRight: 5}}>Like</span>
                </Button>
            </Col>
            <Col>
                <Button color="light" onClick={() => onCommentClick()}>
                    <FaComment style={{paddingRight: 5}}/><span>Comment</span>
                </Button>
            </Col>
            <Col>
                <Button color="light" onClick={() => onShareClick()}>
                    <FaShare style={{paddingRight: 5}}/><span>Share</span>
                </Button>
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
        <Row hidden={hideComment} style={{paddingTop: 5, paddingLeft: 25}}>
            <CreateReply
                postToReplyTo={post}
                currentUser={currentUser}
                profileUser={profileUser}
                hideComment={hideComment}
                setHideComment={setHideComment}
                customUpdateOnReply={customUpdateOnReply}
            />
        </Row>
        { post.commentsPostIds.length > 2  &&
            <Row>
                <span onClick={() => onClickViewMoreComments(post)}>View more comments</span>
            </Row>
        }
    </Row>
    </div>
}
export default DisplayPost;