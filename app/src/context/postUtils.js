import {getStoredPostsByUserId, orderPostsByTimestamp, setStoredPostsByUserId, usePost} from "./PostProvider";


export const getStoredPostsByPostId = (postId, users) => {
    let foundUser = false;

    for(let i = 0; i < users.length; i++ ) {
        if(!sessionStorage.getItem('posts-' + users[i].userId)) {
            console.log("getStoredPostsByPostId Unable to find posts for user: " + users[i].userId)
            let requiredData = require('../data/posts/' + users[i].userId);
            console.log("---- PostProvider getStoredPostsByPostId ---- writing user id: " + users[i].userId);
            sessionStorage.setItem('posts-' + users[i].userId, JSON.stringify(requiredData.postsData))

            for(let j = 0; j < requiredData.postsData.length; j++) {
                if(requiredData.postsData[j].id === postId) {
                    console.log("------- FOUND POST " + postId +  "-------")
                    foundUser = true;
                    break;
                }
            }

            if(foundUser) {
                return {
                    posts: requiredData.postsData,
                    userId: users[i].userId
                };

            }
        } else {
            console.log("getStoredPostsByPostId postsFromStorage")
            let sessionFriends = JSON.parse(sessionStorage.getItem('posts-' + users[i].userId));

            for(let j = 0; j < sessionFriends.length; j++) {
                if(sessionFriends[j].id === postId) {
                    foundUser = true;
                    console.log("------- FOUND POST " + postId +  "-------")
                    break;
                }
            }

            if(foundUser) {
                return {
                    posts: sessionFriends,
                    userId: users[i].userId
                };
            }
        }
    }

    return null;
}

export const getStoredSinglePostByPostId = (postId, users) => {
    console.log("getStoredSinglePostByPostId")
    console.log("postId")
    console.log(postId)

    for(let i = 0; i < users.length; i++ ) {
        if(!sessionStorage.getItem('posts-' + users[i].userId)) {
            console.log("getStoredPostsByPostId Unable to find posts for user: " + users[i].userId)
            let requiredData = require('../data/posts/' + users[i].userId);
            console.log("---- PostProvider getStoredPostsByPostId ---- writing user id: " + users[i].userId);
            sessionStorage.setItem('posts-' + users[i].userId, JSON.stringify(requiredData.postsData))

            for(let j = 0; j < requiredData.postsData.length; j++) {
                if(requiredData.postsData[j].id === postId) {
                    console.log("------- FOUND POST " + postId +  "-------")
                    return requiredData.postsData[j]
                }
            }
            return null;
        } else {
            console.log("getStoredPostsByPostId postsFromStorage")
            let sessionFriends = JSON.parse(sessionStorage.getItem('posts-' + users[i].userId));

            for(let j = 0; j < sessionFriends.length; j++) {
                if(sessionFriends[j].id === postId) {
                    console.log("------- FOUND POST " + postId +  "-------")
                    return sessionFriends[j];
                }
            }
        }
    }

    console.log("------- COULDNT FIND POST " + postId +  "-------")
    return null;
}


export const updateOnShareForHome = (currentUser, postToShare, newContentToShare) => {
    let timestamp = new Date().getTime();
    let shareObject = {
        id: timestamp,
        parentId: null,
        photoId: null,
        data: null,
        commentsPostIds: [],
        topLevelParentId: null,
        share: true,
        sharedPost: {
            timestamp: postToShare.timestamp,
            data: postToShare.data,
            photoId: postToShare.photoId,
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
    setStoredPostsByUserId(shareObject.userId, orderPostsByTimestamp(storedPostsByUserId))
}


export const updateOnLikeForHome = (currentUser, friends, setProfilePosts, postToLike, users) => {
    let hasLikedPost = postToLike.likesUserIds.includes(currentUser.userId)
    let postToUpdate = {
        id: postToLike.id,
        data: postToLike.data,
        parentId: postToLike.parentId,
        photoId: postToLike.photoId,
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
        console.log("Removing Like to postToUpdate")
        postToLike.likesUserIds = postToLike.likesUserIds.filter(userId => currentUser.userId !== userId)
        postToLike.likesUserIds.map(userId => postToUpdate.likesUserIds.push(userId))
    } else {
        console.log("Adding Like to postToUpdate")
        postToLike.likesUserIds.map(userId => postToUpdate.likesUserIds.push(userId))
        postToUpdate.likesUserIds.push(currentUser.userId);
    }

    // Get stored posts by user id
    let storedPostsByUserId = getStoredPostsByPostId(postToUpdate.id, users)

    storedPostsByUserId.posts = storedPostsByUserId.posts.map(post => {
        if(post.id === postToUpdate.id) {
            return postToUpdate
        }
        return post;
    })

    // Save new like to the users storage
    setStoredPostsByUserId(storedPostsByUserId.userId, orderPostsByTimestamp(storedPostsByUserId.posts))
}

export const updateOnReplyForHome = (currentUser, friends, setProfilePosts, postToReplyTo, newReplyContent, users) => {
    let timestamp = new Date().getTime();

    let replyObject = {
        id: timestamp,
        parentId: postToReplyTo.id,
        photoId: null,
        data: null,
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
        photoId: postToReplyTo.photoId,
        data: postToReplyTo.data,
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
    setStoredPostsByUserId(storedPostsByUserId.userId, orderPostsByTimestamp(storedPostsByUserId.posts))
}

export const updateOnReplyForUserProfile = (currentUser, setPosts, postToReplyTo, newReplyContent, users) => {
    let timestamp = new Date().getTime();

    let replyObject = {
        id: timestamp,
        parentId: postToReplyTo.id,
        commentsPostIds: [],
        photoId: null,
        data: null,
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
        photoId: postToReplyTo.photoId,
        data: postToReplyTo.data,
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
    let orderedPosts = orderPostsByTimestamp(storedPostsByUserId.posts);

    // Store change in storage
    setStoredPostsByUserId(storedPostsByUserId.userId, orderedPosts);

    // Update profilePosts
    setPosts(orderedPosts);
}

export const updateOnLikeForUserProfile = (currentUser, setPosts, postToLike, currentUserId, users) => {
    let hasLikedPost = postToLike.likesUserIds.includes(currentUser.userId)
    let postToUpdate = {
        id: postToLike.id,
        parentId: postToLike.parentId,
        photoId: postToLike.photoId,
        data: postToLike.data,
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
    setStoredPostsByUserId(storedPostsByUserId.userId, orderPostsByTimestamp(storedPostsByUserId.posts))

    // Update the profilePosts with the new like
    setPosts([...orderPostsByTimestamp([...storedPostsByUserId.posts])]);
}

export const updateOnShareForUserProfile = (currentUser, postToShare, newContentToShare) => {
    let timestamp = new Date().getTime();
    let shareObject = {
        id: timestamp,
        parentId: null,
        photoId: null,
        data: null,
        commentsPostIds: [],
        topLevelParentId: null,
        share: true,
        sharedPost: {
            timestamp: postToShare.timestamp,
            userId: postToShare.userId,
            photoId: postToShare.photoId,
            data: postToShare.data,
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
    setStoredPostsByUserId(shareObject.userId, orderPostsByTimestamp(storedPostsByUserId));
}

export const createTextPostForTimeline = (currentUser, profileUser, newPostToSave, posts, setPosts) => {
    let timestamp = new Date().getTime();

    let postObject = {
        id: timestamp,
        parentId: null,
        photoId: null,
        data: null,
        commentsPostIds: [],
        topLevelParentId: null,
        share: false,
        sharedPost: {},
        timestamp: timestamp,
        title: "Lorem Ipsum is simply dummy text",
        content: newPostToSave,
        userId: currentUser.userId,
        likesUserIds: []
    }

    setPosts(orderPostsByTimestamp([...posts, postObject]));
    setStoredPostsByUserId(profileUser.userId, orderPostsByTimestamp([...posts, postObject]))
}

export const createPhotoPostForTimeline = (currentUser, profileUser, newPostToSave, selectedImageBase64, posts, setPosts) => {
    let timestamp = new Date().getTime();

    let postObject = {
        id: timestamp,
        parentId: null,
        commentsPostIds: [],
        topLevelParentId: null,
        photoId: timestamp,
        share: false,
        sharedPost: {},
        timestamp: timestamp,
        title: "Lorem Ipsum is simply dummy text",
        content: newPostToSave,
        userId: currentUser.userId,
        likesUserIds: [],
        data: selectedImageBase64
    }

    setPosts(orderPostsByTimestamp([...posts, postObject]));
    setStoredPostsByUserId(profileUser.userId, orderPostsByTimestamp([...posts, postObject]));
}
