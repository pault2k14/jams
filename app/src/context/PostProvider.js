import React, {createContext, useMemo, useState, useContext, useEffect} from 'react'
import {FaB, FaJ, FaP} from "react-icons/fa6";
import {useUsers} from "./UsersProvider";
import {orderBy} from "lodash";
const PostContext = createContext()
PostContext.displayName = 'ValueContext'

export const orderPostsByTimestamp = (posts) => {
    if(!posts) {
        return [];
    }

    let sortedPosts = posts.sort((a, b) => b.timestamp - a.timestamp )
    return sortedPosts;
}

export const getUserById = (users, userId) => {
    let selectedUser = users.filter(user => user.userId === userId);
    return selectedUser[0];
}


/*
export const getPostsByUserId = (posts, userId) => {
    let selectedPosts = posts.filter(post => post.userId === userId);
    return selectedPosts[0];
}
 */

export const getStoredPostsByUserId = (userId) => {

    if(!sessionStorage.getItem('posts-' + userId)) {
        console.log("getStoredPostsByUserId Unable to find posts for user: " + userId)
        let requiredData = require('../data/posts/' + userId);
        console.log("---- PostProvider getStoredPostsByUserId ---- writing user id: " + userId);
        sessionStorage.setItem('posts-' + userId, JSON.stringify(requiredData.postsData))
        return requiredData.postsData
    } else {
        console.log("getStoredPostsByUserId postsFromStorage")
        let sessionPosts = JSON.parse(sessionStorage.getItem('posts-' + userId));
        return sessionPosts
    }
}


export const setStoredPostsByUserId = (userId, posts) => {
    console.log("setStoredPostsByUserId setting posts in storage for user: " + userId)
    sessionStorage.setItem('posts-' + userId, JSON.stringify(posts))
}

export const usePost = () => {
    const context = useContext(PostContext)
    if (context === undefined) {
        throw new Error('usePost must be used within a PostProvider')       }
    return context
}

const PostProvider = ({ children }) => {
    const [currentUserId, setCurrentUserId] = useState(null);

    const [posts, setPosts] = useState([])
    const {usersObject, getUserById} = useUsers();
    const {users, setUsers} = usersObject;
    const postsObject = useMemo(() => {
        return { posts, setPosts }
    }, [posts, setPosts])

    const setPostsByUserId = (userId) => {
        setCurrentUserId(userId);

        if(!sessionStorage.getItem('posts-' + userId)) {
            console.log("PostProvider Unable to find posts for user: " + currentUserId)
            let requiredData = require('../data/posts/' + userId);
            let sortedPosts = orderPostsByTimestamp(requiredData.postsData)
            setPosts(sortedPosts)
            console.log("---- PostProvider setPostsByUserId ---- writing user id: " + userId);
            sessionStorage.setItem('posts-' + userId, JSON.stringify(sortedPosts))
        } else {
            console.log("PostProvider postsFromStorage")
            let sessionPosts = JSON.parse(sessionStorage.getItem('posts-' + userId));
            setPosts(orderPostsByTimestamp(sessionPosts));
        }
    }

    const getStoredSinglePostByPostId = (postId, users, post) => {
        console.log("getStoredSinglePostByPostId")
        console.log("postId")
        console.log(postId)

        for(let i = 0; i < posts.length; i++) {
            if(posts[i].id === postId) {
                return posts[i];
            }
        }

        for(let i = 0; i < users.length; i++ ) {
            if(!sessionStorage.getItem('posts-' + users[i].userId)) {
                console.log("getStoredPostsByPostId Unable to find posts for user: " + users[i].userId)
                let requiredData = require('../data/posts/' + users[i].userId);
                console.log("---- PostProvider getStoredPostsByPostId ---- writing user id: " + users[i].userId);
                sessionStorage.setItem('posts-' + users[i].userId, JSON.stringify(orderPostsByTimestamp(requiredData.postsData)))

                for(let j = 0; j < requiredData.postsData.length; j++) {
                    if(requiredData.postsData[j].id === postId) {
                        console.log("------- FOUND POST " + postId +  " IN API-------")
                        setPosts(orderPostsByTimestamp([...posts, requiredData.postsData[j]]));
                    }
                }
            } else {
                console.log("getStoredPostsByPostId postsFromStorage")
                let sessionFriends = JSON.parse(sessionStorage.getItem('posts-' + users[i].userId));

                for(let j = 0; j < sessionFriends.length; j++) {
                    if(sessionFriends[j].id === postId) {
                        console.log("------- FOUND POST " + postId +  " IN SESSION -------")
                        setPosts(orderPostsByTimestamp([...posts, sessionFriends[j]]));
                    }
                }
            }
        }

        for(let i = 0; i < posts.length; i++) {
            if(posts[i].id === postId) {
                console.log("------- FOUND POST " + postId +  " IN STATE -------")
                return posts[i];
            }
        }

        console.log("------- COULDNT FIND POST " + postId +  "-------")
        return null;
    }

    const getPostsForAllFriends = (friends) => {
        let friendPosts = [];

        friends.map(friend => {
            if(!sessionStorage.getItem('posts-' + friend.userId)) {
                console.log("getPostsForAllFriends Unable to find posts for user: " + friend.userId)
                let requiredData = require('../data/posts/' + friend.userId);
                requiredData.postsData.map(item => {
                    friendPosts.push(item);
                })
                sessionStorage.setItem('posts-' + friend.userId, JSON.stringify(orderPostsByTimestamp(requiredData.postsData)))
            } else {
                console.log("getPostsForAllFriends postsFromStorage")
                let sessionFriends = JSON.parse(sessionStorage.getItem('posts-' + friend.userId));
                sessionFriends.map(item => {
                    friendPosts.push(item);
                })
            }
        });

        friendPosts = orderPostsByTimestamp(friendPosts);
        setPosts([...friendPosts])

        return posts;
    }

    const getStoredPostsByUserId = (userId) => {

        if(!sessionStorage.getItem('posts-' + userId)) {
            console.log("PostProvider Unable to find posts for user: " + userId)
            let requiredData = require('../data/posts/' + userId);
            console.log("---- PostProvider getStoredPostsByUserId ---- writing user id: " + userId);
            sessionStorage.setItem('posts-' + userId, JSON.stringify(requiredData.postsData))
            return
        } else {
            console.log("PostProvider postsFromStorage")
            let sessionPosts = JSON.parse(sessionStorage.getItem('posts-' + userId));
            setPosts(sessionPosts);
        }
    }

    return <PostContext.Provider value={{
        postsObject,
        setPostsByUserId,
        getStoredSinglePostByPostId,
        getPostsForAllFriends,
    }}>{children}  </PostContext.Provider>
}
export default PostProvider