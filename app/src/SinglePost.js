import {Row} from "reactstrap";
import CreateReply from "./CreateReply";
import React, {useEffect, useState} from "react";
import {useUsers} from "./context/UsersProvider";
import CreateShare from "./CreateShare";
import DisplayReply from "./DisplayReply";
import DisplayPostContent from "./DisplayPostContent";
import DisplayContentOptions from "./DisplayContentOptions";
import DisplayContentEngagement from "./DisplayContentEngagement";
import {usePhotos} from "./context/PhotosProvider";


const SinglePost = ({currentUser, profileUser, post, getStoredSinglePostByPostId, customUpdateOnShare, customUpdateOnLike,
                        customUpdateOnReply, modal, selectedPost, setSelectedPost, viewedReplyIds,
                        setViewedReplyIds, toggleShowSinglePost, displaySinglePhoto, selectedReply, setSelectedReply}) => {

    console.log("SinglePost")
    console.log("post")
    console.dir(post)

    const [hideComment, setHideComment] = useState(true);
    const [hideShare, setHideShare] = useState(true);
    const {usersObject, getUserById} = useUsers();
    const {users, setUsers} = usersObject;
    const {photosObject, photoRepliesObject, getPhotosByUserId,
        setStoredPhotosByUserId, setStoredPhotoRepliesByPhotoId, addStoredPhotoRepliesByPhotoId} = usePhotos()
    const {photoReplies, setPhotoReplies} = photoRepliesObject;


    useEffect(() => {
        const fetchData = async () => {
            if(displaySinglePhoto) {
                addStoredPhotoRepliesByPhotoId(post);
            }
        };

        fetchData();
    }, [post]);

    const onCommentClick = () => {
        setHideComment(!hideComment);
    }

    const onShareClick = () => {
        setHideShare(!hideShare);
    }

    let likeColor = post?.likesUserIds.includes(currentUser?.userId) ? 'primary' : 'light'

    const onLikeClick = () => {
        customUpdateOnLike(post, currentUser.userId)
    }

    if(!post) {
        return <p>Loading...</p>
    }

    const postUser = getUserById(post?.userId)
    let shareUser = post?.share ? getUserById(post?.sharedPost.userId) : null;

    const onClickViewMoreComments = (post) => {
        setSelectedPost(post);
        toggleShowSinglePost();
    }

    return <div>
        <Row style={{
            paddingTop: 25,
            paddingLeft: 25,
        }}>
            <DisplayPostContent
                currentUser={currentUser}
                profileUser={profileUser}
                postUser={postUser}
                post={post}
                displaySinglePhoto={displaySinglePhoto}
                toggleShowSinglePost={toggleShowSinglePost}
            />
            {
                shareUser &&
                <div style={{paddingLeft: 25}}>
                    <DisplayPostContent
                        postUser={shareUser}
                        post={post.sharedPost}
                        displaySinglePhoto={displaySinglePhoto}
                    />
                </div>
            }
            <DisplayContentEngagement modal={modal} post={post} onClickViewMoreComments={onClickViewMoreComments}/>
            <hr style={{ margin: 5, border: "solid", color: "grey"}} />
            <DisplayContentOptions
                onLikeClick={onLikeClick}
                likeColor={likeColor}
                onCommentClick={onCommentClick}
                onShareClick={onShareClick}
            />
            <hr style={{margin: 5, border: "solid", color: "grey"}} />
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
            { !modal && post.commentsPostIds.length > 2  &&
                <Row>
                    <span onClick={() => onClickViewMoreComments(post)}>View more comments</span>
                </Row>
            }
            { post.commentsPostIds.length > 0 &&
                post.commentsPostIds.map((postId, index) => {
                    if ((postId && !modal && index <= 1) || (postId && modal)) {
                        let reply = null;
                        if(displaySinglePhoto) {
                            reply = photoReplies.find(reply => reply.id === postId)
                        } else {
                            reply = getStoredSinglePostByPostId(postId, users, post);
                        }

                        if(reply) {
                            return <DisplayReply
                                key={post.userId + "-" + post.id}
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
                        }
                    }
                    else {
                        return '';
                    }
                })
            }
        </Row>
    </div>
}

export default SinglePost;