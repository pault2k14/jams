import React, { createContext,useMemo, useState, useContext } from 'react'
const PhotosContext = createContext()
PhotosContext.displayName = 'ValueContext'


export const getStoredPhotosByUserId = (userId) => {
    let photosArray = [];

    if(!sessionStorage.getItem('photos-' + userId)) {
        console.log("getStoredPhotosByUserId Unable to find photos for user: " + userId)
        let requiredData = require('../data/photos/' + userId);
        console.log("---- PhotosProvider getStoredPhotosByUserId ---- writing user id: " + userId);
        requiredData.photosData.map((photo, index) => {
            let photoData = require("../data/photos/" + userId + "/photo-" + photo.id + ".jpg");
            let photoObject = {
                ...photo, data: photoData
            }
            photosArray.push(photoObject);
        })

        sessionStorage.setItem('photos-' + userId, JSON.stringify(photosArray))
        return photosArray;
    } else {
        console.log("getStoredPhotosByUserId photosFromStorage")
        let sessionPosts = JSON.parse(sessionStorage.getItem('photos-' + userId));
        return sessionPosts
    }

    /*
    let photosArray = [];

    let requiredData = require('../data/photos/' + userId);

    requiredData.photosData.map((photo, index) => {
        let photoData = require("../data/photos/" + userId + "/photo-" + photo.id + ".jpg");
        let photoObject = {
            ...photo, data: photoData
        }
        photosArray.push(photoObject);
    })

    return photosArray;
     */
}

export const setStoredPhotosRepliesByPhotoReplyIdAndUserId = (photoReply, userId) => {
    console.log("setStoredPhotosRepliesByPhotoReplyIdAndUserId setting photos replies in storage for user: " + userId)
    let sessionPhotos = JSON.parse(sessionStorage.getItem('photos-replies-' + userId + "-" + photoReply.id));

    let newSessionPosts = sessionPhotos.map(photo => {
        if(photoReply.id === photo.id) {
            return photoReply;
        }
        return photo;
    });

    sessionStorage.setItem('photos-replies-' + userId + "-" + photoReply.id, JSON.stringify(newSessionPosts))
}

export const getStoredPhotosRepliesByPhotoIdAndUserId = (photoId, userId) => {
    if (!photoId || !userId) {
        return [];
    }

    let photosRepliesArray = [];

    if (!sessionStorage.getItem('photos-replies-' + userId + "-" + photoId)) {
        console.log("getStoredPhotosRepliesByPhotoIdAndUserId Unable to find photos replies for user: " + userId)
        let requiredData = require('../data/photos-replies/' + userId);

        requiredData.photosRepliesData.map((photoReply) => {
            console.log("inside photosRepliesData loop")
            if (photoReply.photoId === photoId) {
                console.log("inside adding photos replies to array")
                photosRepliesArray.push(photoReply)
            }
        });

        console.log("---- PhotosProvider getStoredPhotosRepliesByPhotoIdAndUserId ---- writing user id: " + userId);
        sessionStorage.setItem('photos-replies-' + userId + "-" + photoId, JSON.stringify(photosRepliesArray))
        return photosRepliesArray;
    } else {
        console.log("getStoredPhotosRepliesByPhotoIdAndUserId photosFromStorage")
        let sessionPosts = JSON.parse(sessionStorage.getItem('photos-replies-' + userId + "-" + photoId));
        return sessionPosts
    }
}

export const getStoredPhotosRepliesByPhotoReplyIdAndUserId = (photoReplyId, userId) => {
    if(!photoReplyId || !userId) {
        return [];
    }

    let photosRepliesArray = [];

    if(!sessionStorage.getItem('photos-replies-' + userId + "-" + photoReplyId)) {
        console.log("getStoredPhotosByUserId Unable to find photos replies for user: " + userId)
        let requiredData = require('../data/photos-replies/' + userId);

        requiredData.photosRepliesData.map((photoReply) => {
            console.log("inside photosRepliesData loop")
            if(photoReply.id === photoReplyId) {
                console.log("inside adding photos replies to array")
                photosRepliesArray.push(photoReply)
            }
        });

        console.log("---- PhotosProvider getStoredPhotosRepliesByPhotoReplyIdAndUserId ---- writing user id: " + userId);
        sessionStorage.setItem('photos-replies-' + userId + "-" + photoReplyId, JSON.stringify(photosRepliesArray))
        return photosRepliesArray;
    } else {
        console.log("getStoredPhotosRepliesByPhotoReplyIdAndUserId photosFromStorage")
        let sessionPosts = JSON.parse(sessionStorage.getItem('photos-replies-' + userId + "-" + photoReplyId));
        return sessionPosts
    }

    /*
    console.log("---- getStoredPhotosRepliesByPhotoReplyIdAndUserId ----")
    let photosRepliesArray = [];
    console.log("photoReplyId")
    console.log(photoReplyId)

    console.log("userId")
    console.log(userId)

    let requiredData = require('../data/photos-replies/' + userId);

    requiredData.photosRepliesData.map((photoReply, index) => {
        if(photoReply.id === photoReplyId) {
            photosRepliesArray.push(photoReply)
        }
    })

    console.log("photosRepliesArray")
    console.dir(photosRepliesArray);
    return photosRepliesArray;
     */
}

export const setStoredPhotosByUserId = (userId, photos) => {
    console.log("setStoredPhotosByUserId setting photos in storage for user: " + userId)
    sessionStorage.setItem('photos-' + userId, JSON.stringify(photos))
}

export const usePhotos = () => {
    const context = useContext(PhotosContext)
    if (context === undefined) {
        throw new Error('usePhotos must be used within a PhotosProvider')       }
    return context
}


const PhotosProvider = ({ children }) => {
    const [photosUserId, setPhotosUserId] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [photoReplies, setPhotoReplies] = useState([]);
    //setUsers(requiredData.usersData);

    const photosObject = useMemo(() => {
        return { photos, setPhotos }
    }, [photos, setPhotos])

    const photoRepliesObject = useMemo(() => {
        return { photoReplies, setPhotoReplies }
    }, [photoReplies, setPhotoReplies])

    const getPhotosByUserId = (userId) => {
        let selectedUser = photos.filter(photo => photo.userId === userId);
        return selectedUser[0];
    }

    const setStoredPhotosByUserId = (userId) => {
        setPhotosUserId(userId);
        let photosArray = [];

        if (!sessionStorage.getItem('photos-' + userId)) {
            console.log("getStoredPhotosByUserId Unable to find photos for user: " + userId)
            let requiredData = require('../data/photos/' + userId);
            console.log("---- PhotosProvider getStoredPhotosByUserId ---- writing user id: " + userId);
            requiredData.photosData.map((photo, index) => {
                /*
                let photoData = require("../data/photos/" + userId + "/" + photo.url);
                let photoObject = {
                    ...photo, data: photoData
                }
                photosArray.push(photoObject);
                 */
                photosArray.push(photo);
            })

            sessionStorage.setItem('photos-' + userId, JSON.stringify(photosArray))
            setPhotos(photosArray);
        } else {
            console.log("getStoredPhotosByUserId photosFromStorage")
            let sessionPosts = JSON.parse(sessionStorage.getItem('photos-' + userId));
            setPhotos(sessionPosts);
        }
    }

    const setStoredPhotoRepliesByPhotoId = (photoReply) => {
        console.log("setStoredPhotoRepliesByPhotoId setting photos replies in storage for user: " + photosUserId)
        console.log("photoReply")
        console.dir(photoReply)

        if (!sessionStorage.getItem('photos-replies-' + photosUserId + "-" + photoReply.photoId)) {
            console.log("setStoredPhotoRepliesByPhotoId Unable to find photos replies for user: " + photosUserId)
            let requiredData = require('../data/photos-replies/' + photosUserId);
            let updatedExistingReply = false;
            let updatedReplies = requiredData.photosRepliesData.map(reply => {
                if(reply.id === photoReply.id) {
                    updatedExistingReply = true;
                    return photoReply;
                }
                return reply;
            });

            if(!updatedExistingReply) {
                updatedReplies.push(photoReply);
            }

            console.log("---- PhotosProvider setStoredPhotoRepliesByPhotoId ---- writing user id: "
                + photosUserId + " and photo id: " + photoReply.photoId);
            sessionStorage.setItem('photos-replies-' + photosUserId + "-" + photoReply.photoId, JSON.stringify(updatedReplies))
            setPhotoReplies([...updatedReplies])
        } else {
            console.log("setStoredPhotoRepliesByPhotoId photoRepliesFromStorage")
            let sessionPosts = JSON.parse(sessionStorage.getItem('photos-replies-' + photosUserId + "-" + photoReply.photoId));
            let updatedExistingReply = false;
            let updatedReplies = sessionPosts.map(reply => {
                if(reply.id === photoReply.id) {
                    updatedExistingReply = true;
                    return photoReply;
                }
                return reply;
            });

            if(!updatedExistingReply) {
                updatedReplies.push(photoReply);
            }

            console.log("---- PhotosProvider getStoredPhotosRepliesByPhotoIdAndUserId ---- writing user id: " + photosUserId);
            sessionStorage.setItem('photos-replies-' + photosUserId + "-" + photoReply.photoId, JSON.stringify(updatedReplies))
            setPhotoReplies([...updatedReplies])
        }
    }

    const addStoredPhotoRepliesByPhotoId = (parentPhotoPost) => {
        console.log("setStoredPhotoRepliesByPhotoId setting photos replies in storage for user: " + photosUserId)
        console.log("parentPhotoPost")
        console.dir(parentPhotoPost)

        if (!sessionStorage.getItem('photos-replies-' + photosUserId + "-" + parentPhotoPost.id)) {
            console.log("setStoredPhotoRepliesByPhotoId Unable to find photos replies for user: " + photosUserId)
            let requiredData = require('../data/photos-replies/' + photosUserId);
            let updatedReplies = requiredData.photosRepliesData.filter(reply => reply.photoId === parentPhotoPost.id);

            console.log("---- PhotosProvider setStoredPhotoRepliesByPhotoId ---- writing user id: "
                + photosUserId + " and photo id: " + parentPhotoPost.id);
            sessionStorage.setItem('photos-replies-' + photosUserId + "-" + parentPhotoPost.id, JSON.stringify(updatedReplies))
            setPhotoReplies([...updatedReplies])
        } else {
            console.log("setStoredPhotoRepliesByPhotoId photoRepliesFromStorage")
            let sessionPosts = JSON.parse(sessionStorage.getItem('photos-replies-' + photosUserId + "-" + parentPhotoPost.id));
            let updatedReplies = sessionPosts.filter(reply => reply.photoId === parentPhotoPost.id);
            console.log("---- PhotosProvider getStoredPhotosRepliesByPhotoIdAndUserId ---- writing user id: " + photosUserId);
            sessionStorage.setItem('photos-replies-' + photosUserId + "-" + parentPhotoPost.id, JSON.stringify(updatedReplies))
            setPhotoReplies([...updatedReplies])
        }
    }

    /*
    const getStoredSinglePhotoPostReplyByPostId = (postId, users, post) => {
        let photoRepliesArray = [];

        // Check to see if we already have the photo reply loaded into state
        for(let i = 0; i < photoReplies.length; i++) {
            if(postId === photoReplies[i].id) {
                return photoReplies[i];
            }
        }

        // Check session for photo replies
        if(!sessionStorage.getItem('photos-replies-' + photosUserId + "-" + post.id)) {
            console.log("getStoredSinglePhotoPostReplyByPostId Couldn't find photo replies for user id: " + photosUserId + " and post id" + post.id)
            let requiredData = require('../data/photos-replies/' + photosUserId);

            requiredData.photosRepliesData.map((photoReply) => {
                console.log("inside photosRepliesData loop")
                if(post.likesUserIds.includes(photoReply.id)) {
                    console.log("inside adding photos replies to array")
                    photoRepliesArray.push(photoReply);
                }
            });
            sessionStorage.setItem('photos-replies-' + photosUserId + "-" + post.id, JSON.stringify(photoRepliesArray))
            setPhotoReplies([...photoRepliesArray]);
        } else {
            console.log("getStoredSinglePhotoPostReplyByPostId photoRepliesFromStorage")
            let sessionPhotoReplies = JSON.parse(sessionStorage.getItem('photos-replies-' + photosUserId + "-" + post.id));
            setPhotoReplies([...sessionPhotoReplies]);
        }

        // Check again to see if we already have the photo reply loaded into state
        for(let i = 0; i < photoReplies.length; i++) {
            if(postId === photoReplies[i].id) {
                console.log("--- getStoredSinglePhotoPostReplyByPostId FOUND post id: " + postId + " ----")
                return photoReplies[i];
            }
        }
        console.log("--- getStoredSinglePhotoPostReplyByPostId COULDNT FIND post id: " + postId + " ----")

        return null;
    }
     */


        return <PhotosContext.Provider value={{
            photosObject,
            photoRepliesObject,
            getPhotosByUserId,
            setStoredPhotosByUserId,
            setStoredPhotoRepliesByPhotoId,
            addStoredPhotoRepliesByPhotoId
    }}>{children}  </PhotosContext.Provider>
}
export default PhotosProvider