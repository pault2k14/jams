import {FaA, FaB, FaD, FaE, FaJ, FaK, FaM, FaR, FaS, FaT} from "react-icons/fa6";
import React from "react";

export const postsData = [
    {
        id: 34,
        parentId: null,
        topLevelParentId: null,
        commentsPostIds: [35, 37],
        share: false,
        sharedPost: null,
        timestamp: 1728961926215,
        title: "Lorem Ipsum is simply dummy text",
        content: "Post 34: This is the 1st post, by Duncan Barber, it has replies by Sonny Horne and Dalton Sykes",
        likesUserIds: [6, 14, 17, 20],
        userId: 11
    },
    {
        id: 35,
        parentId: 34,
        topLevelParentId: 34,
        commentsPostIds: [36],
        share: false,
        sharedPost: null,
        timestamp: 1728962926215,
        title: "Lorem Ipsum is simply dummy text",
        content: "Post 34 -> 35: This is a reply by Sonny Horne to Duncan Barber and has one reply by Barnaby Reeves",
        likesUserIds: [6, 14, 17, 20],
        userId: 12
    },
    {
        id: 36,
        parentId: 35,
        topLevelParentId: 34,
        commentsPostIds: [],
        share: false,
        sharedPost: null,
        timestamp: 1728963926215,
        title: "Lorem Ipsum is simply dummy text",
        content: "Post 34 -> 35 -> 36: This is a reply by Barnaby Reeves to Sonny Horne there are no replies",
        likesUserIds: [6, 14, 17, 20],
        userId: 13
    },
    {
        id: 37,
        parentId: 34,
        topLevelParentId: 34,
        commentsPostIds: [],
        share: false,
        sharedPost: null,
        timestamp: 1728964926215,
        title: "Lorem Ipsum is simply dummy text",
        content: "Post 34 -> 37: This is a reply by Dalton Syke to Duncan Barber that has no replies",
        likesUserIds: [6, 14, 17, 20],
        userId: 14
    },
    {
        id: 38,
        parentId: null,
        topLevelParentId: null,
        commentsPostIds: [],
        share: false,
        sharedPost: null,
        timestamp: 1728965926215,
        title: "HEDONIST ROOTS",
        content: "Post 38: This is the last post by Duncan Barber and has no replies",
        likesUserIds: [6, 14, 17, 20],
        userId: 11
    }
]

export default postsData;