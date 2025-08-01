import DisplayPost from "./DisplayPost";
import {Row} from "reactstrap";
import React from "react";

const RecursivePhotoList = ({currentUser, profileUser, selectedPhoto, selectedPhotoReplies,
                                setProfilePosts, customUpdateOnShare, customUpdateOnLike,
                                customUpdateOnReply, masterPhotosList, isReply, displayPhotos}) => {

    const getPhotoReplies = (photoReplyIdsArray) => {
        if(!photoReplyIdsArray) {
            return [];
        }

        let photoRepliesArray = [];
        for(let i = 0; i < photoReplyIdsArray.length; i++) {
            let repliesArray = masterPhotosList.filter(reply => reply.id === photoReplyIdsArray[i])

            for(let j = 0; j < repliesArray.length; j++) {
                photoRepliesArray.push(repliesArray[j]);
            }
        }

        return photoRepliesArray;
    }

    return (
        <>
            {selectedPhotoReplies.map((item, index) => {

                console.log("---- RecursivePhotosList ----")
                console.log("item");
                console.dir(item);

                let replies = [];

                if(item.commentsPostIds.length > 0) {
                    replies = getPhotoReplies(item.commentsPostIds)
                }

                if(!isReply && item.parentId || isReply && !item.parentId) {
                    return null;
                }
                return <div key={item.id}>
                    <Row key={index} style={{paddingLeft: 25}}>
                        <DisplayPost
                            post={item}
                            currentUser={currentUser}
                            profileUser={profileUser}
                            customUpdateOnShare={customUpdateOnShare}
                            customUpdateOnLike={customUpdateOnLike}
                            customUpdateOnReply={customUpdateOnReply}
                            displayPhotos={displayPhotos}
                        />
                        {item.commentsPostIds.length > 0 && (
                            <RecursivePhotoList
                                currentUser={currentUser}
                                profileUser={profileUser}
                                selectedPhotoReplies={replies}
                                setProfilePosts={setProfilePosts}
                                customUpdateOnShare={customUpdateOnShare}
                                customUpdateOnLike={customUpdateOnLike}
                                customUpdateOnReply={customUpdateOnReply}
                                masterPhotosList={masterPhotosList}
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

export default RecursivePhotoList;