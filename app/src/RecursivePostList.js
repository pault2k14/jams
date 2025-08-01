import DisplayPost from "./DisplayPost";
import {Row} from "reactstrap";
import React from "react";
import DisplayReply from "./DisplayReply";


const RecursivePostList = ({currentUser, profileUser, profilePosts,setProfilePosts,
                               customUpdateOnShare, customUpdateOnLike, customUpdateOnReply,
                               masterPostList, isReply, displayPhotos}) => {

    console.log("RecursivePostList")
    const getPostsById = (postIdsArray) => {
         return masterPostList.filter(post => postIdsArray.includes(post.id));
    }

    return (
        <>
            {profilePosts.map((item, index) => {

                if(!isReply && item.parentId) {
                    return null;
                }

                return <div key={item.id} style={{
                    backgroundColor: "white",
                    //borderLeft: 'ridge'
                }}>
                    <Row key={index} style={{paddingLeft: 25}}>
                        { !isReply
                            ?
                            <DisplayPost
                                post={item}
                                currentUser={currentUser}
                                profileUser={profileUser}
                                profilePosts={profilePosts}
                                customUpdateOnShare={customUpdateOnShare}
                                customUpdateOnLike={customUpdateOnLike}
                                customUpdateOnReply={customUpdateOnReply}
                                displayPhotos={displayPhotos}
                            />
                            :
                            <DisplayReply
                                post={item}
                                currentUser={currentUser}
                                profileUser={profileUser}
                                profilePosts={profilePosts}
                                customUpdateOnShare={customUpdateOnShare}
                                customUpdateOnLike={customUpdateOnLike}
                                customUpdateOnReply={customUpdateOnReply}
                                displayPhotos={displayPhotos}
                            />
                        }

                    {item.commentsPostIds && (
                        <RecursivePostList
                            currentUser={currentUser}
                            profileUser={profileUser}
                            profilePosts={getPostsById(item.commentsPostIds)}
                            setProfilePosts={setProfilePosts}
                            customUpdateOnShare={customUpdateOnShare}
                            customUpdateOnLike={customUpdateOnLike}
                            customUpdateOnReply={customUpdateOnReply}
                            masterPostList={masterPostList}
                            isReply={true}
                            displayPhotos={displayPhotos}
                        />
                    )}
                </Row>
                </div>
            })}
        </>
    );
}

export default RecursivePostList;