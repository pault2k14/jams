import {
    getStoredPhotosByUserId,
    setStoredPhotosByUserId,
    //setStoredPhotosRepliesByPhotoIdAndUserId
} from "./PhotosProvider";
import {getStoredPostsByUserId, orderPostsByTimestamp, setStoredPostsByUserId} from "./PostProvider";



// TODO Added
//      currentUser
//      profileUser
//      selectedPhotoReplies
//      setSelectedPhotoReplies
export const customUpdatePhotoReplyOnLike = (photoReplyToLike, currentUser, setStoredPhotoRepliesByPhotoId) => {
    console.log("customUpdatePhotoReplyOnLike")
    let hasLikedPost = photoReplyToLike.likesUserIds.includes(currentUser.userId)
    let photoReplyToUpdate = {
        id: photoReplyToLike.id,
        commentsPostIds: photoReplyToLike.commentsPostIds,
        photoId: photoReplyToLike.photoId,
        parentId: photoReplyToLike.parentId,
        timestamp: photoReplyToLike.timestamp,
        content: photoReplyToLike.content,
        likesUserIds: [],
        userId: photoReplyToLike.userId
    }

    if(hasLikedPost) {
        photoReplyToLike.likesUserIds = photoReplyToLike.likesUserIds.filter(userId => currentUser.userId !== userId)
        photoReplyToLike.likesUserIds.map(userId => photoReplyToUpdate.likesUserIds.push(userId))
    } else {
        photoReplyToLike.likesUserIds.map(userId => photoReplyToUpdate.likesUserIds.push(userId))
        photoReplyToUpdate.likesUserIds.push(currentUser.userId);
    }

    // Store photo reply
    setStoredPhotoRepliesByPhotoId(photoReplyToUpdate)

    // Save updated photo or reply to state
    /*
    let copyOfSelectedPhotoReplies = selectedPhotoReplies.map(currentReply => currentReply);
    copyOfSelectedPhotoReplies = copyOfSelectedPhotoReplies.map(reply => {
        if(reply.id === photoReplyToUpdate.id) {
            return photoReplyToUpdate;
        }

        return reply;
    })
    console.log("copyOfSelectedPhotoReplies")
    console.dir(copyOfSelectedPhotoReplies)

    setSelectedPhotoReplies([...copyOfSelectedPhotoReplies]);
     */
}


// TODO Added
//      currentUser
//      setProfilePosts
export const customUpdatePhotoReplyOnShare = (photoReplyToShare, newContentToShare, currentUser, setProfilePosts) => {
    let timestamp = new Date().getTime();
    let shareObject = {
        id: timestamp,
        photoId: photoReplyToShare.photoId,
        parentId: null,
        commentsPostIds: [],
        topLevelParentId: null,
        share: true,
        sharedPost: {
            timestamp: photoReplyToShare.timestamp,
            photoId: photoReplyToShare.photoId,
            userId: photoReplyToShare.userId,
            title: photoReplyToShare.title,
            content: photoReplyToShare.content
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
    setProfilePosts([...orderPostsByTimestamp([...storedPostsByUserId])]);
}

// TODO Added
//      profileUser
//      currentUser
//      selectedPhotoReplies
//      setSelectedPhotoReplies
export const customUpdatePhotoReplyOnReply = (photoReplyToReplyTo, newReplyContent, currentUser, setStoredPhotoRepliesByPhotoId ) => {
    // Update current object photo or photo reply with new comment
    let timestamp = new Date().getTime();
    let updatedPhotoReply = {
        id: photoReplyToReplyTo.id,
        commentsPostIds: photoReplyToReplyTo.commentsPostIds.map(reply => reply),
        photoId: photoReplyToReplyTo.photoId,
        parentId: photoReplyToReplyTo.parentId,
        timestamp: photoReplyToReplyTo.timestamp,
        content: photoReplyToReplyTo.content,
        likesUserIds: photoReplyToReplyTo.likesUserIds,
        userId: photoReplyToReplyTo.userId
    }
    updatedPhotoReply.commentsPostIds.push(timestamp)

    // store the photo reply to storage
    setStoredPhotoRepliesByPhotoId(updatedPhotoReply)

    let newPhotoReply =     {
        id: timestamp,
        commentsPostIds: [],
        photoId: photoReplyToReplyTo.photoId,
        parentId: photoReplyToReplyTo.id,
        timestamp: timestamp,
        content: newReplyContent,
        likesUserIds: [],
        userId: currentUser.userId
    }
    // Store new photo reply
    setStoredPhotoRepliesByPhotoId(newPhotoReply)
}


// TODO Added
//      currentUser
//      setProfilePosts
export const customUpdateOnPhotoShare = (photoToShare, newContentToShare, currentUser, setProfilePosts) => {
    let timestamp = new Date().getTime();
    let shareObject = {
        id: timestamp,
        photoId: photoToShare.photoId,
        parentId: null,
        commentsPostIds: [],
        topLevelParentId: null,
        share: true,
        sharedPost: {
            timestamp: photoToShare.timestamp,
            photoId: photoToShare.photoId,
            userId: photoToShare.userId,
            title: photoToShare.title,
            content: photoToShare.content,
            data: photoToShare.data
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
    setProfilePosts([...orderPostsByTimestamp([...storedPostsByUserId])]);
}

// TODO Added
//      currentUser
//      profileUser
//      setSelectedPhoto
//      setPhotos
export const customUpdateOnPhotoLike = (photoToLike, currentUser, profileUser,  setPhotos) => {
    console.log("customUpdateOnPhotoLike")
    let hasLikedPost = photoToLike.likesUserIds.includes(currentUser.userId)
    let photoToUpdate = {
        id: photoToLike.id,
        commentsPostIds: photoToLike.commentsPostIds,
        photoId: photoToLike.photoId,
        parentId: photoToLike.parentId,
        timestamp: photoToLike.timestamp,
        content: photoToLike.content,
        likesUserIds: [],
        userId: photoToLike.userId,
        data: photoToLike.data
    }

    if(hasLikedPost) {
        photoToLike.likesUserIds = photoToLike.likesUserIds.filter(userId => currentUser.userId !== userId)
        photoToLike.likesUserIds.map(userId => photoToUpdate.likesUserIds.push(userId))
    } else {
        photoToLike.likesUserIds.map(userId => photoToUpdate.likesUserIds.push(userId))
        photoToUpdate.likesUserIds.push(currentUser.userId);
    }

    let storedPhotos = getStoredPhotosByUserId(profileUser.userId);
    let updatedStoredPhotos = storedPhotos.map(photo => {
        if(photo.id === photoToUpdate.id) {
            return photoToUpdate;
        }
        return photo;
    })

    // Store photo
    setStoredPhotosByUserId(profileUser.userId, updatedStoredPhotos)
    setPhotos([...updatedStoredPhotos])
}


// TODO Added
//      currentUser
//      profileUser
//      selectedPhotoReplies
//      setSelectedPhotoReplies
//      setPhotos
//      setSelectedPhoto
export const customUpdateOnPhotoReply = (photoToReplyTo, newReplyContent, currentUser,
                                         profileUser, setPhotos, setStoredPhotoRepliesByPhotoId) => {
    console.log("customUpdateOnPhotoReply")
    console.log("photoToReplyTo")
    console.dir(photoToReplyTo)

    let timestamp = new Date().getTime();
    let updatedPhoto =     {
        id: photoToReplyTo.id,
        commentsPostIds: photoToReplyTo.commentsPostIds.map(postId => postId),
        timestamp: photoToReplyTo.timestamp,
        url: photoToReplyTo.url,
        content: photoToReplyTo.content,
        likesUserIds: photoToReplyTo.likesUserIds,
        userId: photoToReplyTo.userId,
        data: photoToReplyTo.data
    }

    // Update current object photo or photo reply with new comment
    let photoReply = {
        id: timestamp,
        commentsPostIds: [],
        photoId: photoToReplyTo.id,
        parentId: null,
        timestamp: timestamp,
        content: newReplyContent,
        likesUserIds: [],
        userId: currentUser.userId
    }

    // Update commentPostIds on photo to reply to
    updatedPhoto.commentsPostIds.push(timestamp)

    // Store the photo reply
    //setStoredPhotosRepliesByPhotoIdAndUserId(photoReply, profileUser.userId)

    // Save updated photo or reply to state
    //let copyOfSelectedPhotoReplies = selectedPhotoReplies.map(currentReply => currentReply);
    //copyOfSelectedPhotoReplies.push(photoReply)
    //setSelectedPhotoReplies([...copyOfSelectedPhotoReplies]);
    setStoredPhotoRepliesByPhotoId(photoReply)

    // Store the updated photo
    let storedPhotos = getStoredPhotosByUserId(profileUser.userId);
    let updatedStoredPhotos = storedPhotos.map(photo => {
        if(photo.id === updatedPhoto.id) {
            return updatedPhoto;
        }
        return photo;
    })

    // Store photo
    setStoredPhotosByUserId(profileUser.userId, updatedStoredPhotos)
    setPhotos([...updatedStoredPhotos])
}