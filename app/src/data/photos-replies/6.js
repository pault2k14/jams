import React from "react";

export const photosRepliesData = [
    {
        id: 101,
        commentsPostIds: [2],
        photoId: 1,
        parentId: null,
        timestamp: 1728959326215,
        content: "This is photo reply 1",
        likesUserIds: [6, 14, 17, 20],
        userId: 6
    },
    {
        id: 102,
        commentsPostIds: [3],
        photoId: 1,
        parentId: 1,
        timestamp: 1728959326215,
        content: "This is photo reply 2",
        likesUserIds: [6, 14, 17, 20],
        userId: 10
    },
    {
        id: 103,
        commentsPostIds: [],
        photoId: 1,
        parentId: 2,
        timestamp: 1728959326215,
        content: "This is photo reply 3",
        likesUserIds: [6, 14, 17, 20],
        userId: 11
    },
    {
        id: 104,
        commentsPostIds: [],
        photoId: 2,
        parentId: null,
        timestamp: 1728959326215,
        content: "This is photo reply 4",
        likesUserIds: [6, 14, 17, 20],
        userId: 12
    },
]

export default photosRepliesData;