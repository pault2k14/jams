
import DisplayPost from "./DisplayPost";
import {Modal, ModalBody, Row} from "reactstrap";
import React, {useEffect, useState} from "react";
import SinglePost from "./SinglePost";
import {useUsers} from "./context/UsersProvider";
import {usePost} from "./context/PostProvider";



const DisplayPostList = ({currentUser, profileUser, postsToDisplay, customUpdateOnShare,
                             customUpdateOnLike, customUpdateOnReply}) => {

    console.log("DisplayPostList")
    const {postsObject, setPostsByUserId,
        getStoredSinglePostByPostId, getPostsForAllFriends} = usePost();
    const {posts, setPosts} = postsObject;
    const {usersObject, getUserById} = useUsers();
    const {users, setUsers} = usersObject;
    const [isSinglePostOpen, setIsSinglePostOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [viewedReplyIds, setViewedReplyIds] = useState([])
    const [modal, setModal] = useState(false);
    const [selectedReply, setSelectedReply] = useState(null);

    useEffect(() => {
        // If the profile user changes we need to make
        // sure the modal has been closed and related states reset
        const fetchData = async () => {
            if(selectedPost) {
                setSelectedPost(null);
            }

            if(selectedReply) {
                setSelectedReply(null);
            }

            setViewedReplyIds([]);
            setModal(false);
            setIsSinglePostOpen(false)
        };

        fetchData();
    }, [profileUser]);

    const toggleShowSinglePost = () => {
        if(selectedPost) {
            setSelectedPost(null);
        }

        if(selectedReply) {
            setSelectedReply(null);
        }

        setViewedReplyIds([]);
        setModal(!modal);
        setIsSinglePostOpen(!isSinglePostOpen)
    };

    const customOnSinglePostReply = (postToReplyTo, newReplyContent) => {
        if(!viewedReplyIds.includes(postToReplyTo.id)) {
            let updatedViewedReplyIds = [...viewedReplyIds];
            updatedViewedReplyIds.push(postToReplyTo.id);
            setViewedReplyIds(updatedViewedReplyIds)
        }

        customUpdateOnReply(postToReplyTo, newReplyContent);
    }

    return (
        <>
            { selectedPost &&
                <Modal isOpen={isSinglePostOpen}
                       scrollable={true}
                       fade={false}
                       toggle={toggleShowSinglePost}
                       style={{maxWidth: "66%"}}>
                    <ModalBody>
                        <SinglePost
                            profileUser={profileUser}
                            currentUser={currentUser}
                            post={getStoredSinglePostByPostId(selectedPost.id, users)}
                            getStoredSinglePostByPostId={getStoredSinglePostByPostId}
                            customUpdateOnLike={customUpdateOnLike}
                            customUpdateOnReply={customOnSinglePostReply}
                            customUpdateOnShare={customUpdateOnShare}
                            displaySinglePhoto={false}
                            modal={modal}
                            selectedPost={selectedPost}
                            setSelectedPost={setSelectedPost}
                            viewedReplyIds={viewedReplyIds}
                            setViewedReplyIds={setViewedReplyIds}
                            selectedReply={selectedReply}
                            setSelectedReply={setSelectedReply}
                            toggleShowSinglePost={toggleShowSinglePost}
                        />
                    </ModalBody>
                </Modal>
            }
            {postsToDisplay.map((item, index) => {

                if(item.parentId) {
                    return null;
                }

                return <div key={item.id} style={{
                    backgroundColor: "white",
                    marginBottom: 15,
                }}>
                    <Row key={index} style={{paddingLeft: 25, paddingBottom: 15}}>
                        <SinglePost
                            currentUser={currentUser}
                            profileUser={profileUser}
                            post={item}
                            getStoredSinglePostByPostId={getStoredSinglePostByPostId}
                            customUpdateOnShare={customUpdateOnShare}
                            customUpdateOnLike={customUpdateOnLike}
                            customUpdateOnReply={customOnSinglePostReply}
                            modal={modal}
                            displaySinglePhoto={false}
                            selectedPost={selectedPost}
                            setSelectedPost={setSelectedPost}
                            viewedReplyIds={viewedReplyIds}
                            setViewedReplyIds={setViewedReplyIds}
                            selectedReply={selectedReply}
                            setSelectedReply={setSelectedReply}
                            toggleShowSinglePost={toggleShowSinglePost}
                        />
                    </Row>
                </div>
            })}
        </>
    );

}

export default DisplayPostList;