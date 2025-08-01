import DisplayPost from "./DisplayPost";
import {Row} from "reactstrap";
import React from "react";


const RecursivePostList = ({currentUserPosts, setCurrentUserPosts, profilePosts,
                               setProfilePosts, customSetAssembedTimeline,
                               customUpdateOnShare, customUpdateOnLike, customUpdateOnComment}) => {
    console.log("RecursivePostList")
    console.log("currentUserPosts")
    console.dir(currentUserPosts)
    if(!currentUserPosts || !currentUserPosts.posts) {
        return [];
    }

    return currentUserPosts.posts.map(post => {
        return <div key={post.id}>
            <DisplayPost post={post}
                         profilePosts={profilePosts}
                         setProfilePosts={setProfilePosts}
                         currentUserPosts={currentUserPosts}
                         setCurrentUserPosts={setCurrentUserPosts}
                         customSetAssembedTimeline={customSetAssembedTimeline}
                         customUpdateOnShare={customUpdateOnShare}
                         customUpdateOnLike={customUpdateOnLike}
                         customUpdateOnComment={customUpdateOnComment
            }/>
            <Row style={{paddingTop: 5, paddingLeft: 25}}>
                {
                    post.replies
                    && post.replies.posts
                    && post.replies.posts.length > 0
                    && <RecursivePostList
                        currentUserPosts={post.replies}
                        setCurrentUserPosts={setCurrentUserPosts}
                        profilePosts={profilePosts}
                        setProfilePosts={setProfilePosts}
                        customUpdateOnShare={customUpdateOnShare}
                        customUpdateOnLike={customUpdateOnLike}
                        customUpdateOnComment={customUpdateOnComment}
                        additionalPadding={25}
                    />
                }
            </Row>
        </div>
    });
}

export default RecursivePostList;