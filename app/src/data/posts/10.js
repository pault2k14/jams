import {FaA, FaB, FaD, FaE, FaJ, FaK, FaM, FaR, FaS, FaT} from "react-icons/fa6";
import React from "react";

export const postsData = [
    {
        id: 29,
        parentId: null,
        topLevelParentId: null,
        commentsPostIds: [30, 32],
        taggedUserIds: [10, 11, 12],
        share: false,
        sharedPost: null,
        timestamp: 1728966926215,
        title: "Lorem Ipsum is simply dummy text",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        likesUserIds: [1, 6, 10, 14, 17, 20],
        userId: 10
    },
    {
        id: 30,
        parentId: 29,
        topLevelParentId: 29,
        commentsPostIds: [31],
        share: false,
        sharedPost: null,
        timestamp: 1728967926215,
        title: "Lorem Ipsum is simply dummy text",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        likesUserIds: [],
        userId: 11
    },
    {
        id: 31,
        parentId: 30,
        topLevelParentId: 29,
        commentsPostIds: [],
        share: false,
        sharedPost: null,
        timestamp: 1728968926215,
        title: "Lorem Ipsum is simply dummy text",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        likesUserIds: [6, 14, 17, 20],
        userId: 12
    },
    {
        id: 32,
        parentId: 29,
        topLevelParentId: 29,
        commentsPostIds: [],
        share: false,
        sharedPost: null,
        timestamp: 1728969926215,
        title: "Lorem Ipsum is simply dummy text",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        likesUserIds: [1, 10, 20],
        userId: 13
    },
    {
        id: 33,
        parentId: null,
        topLevelParentId: null,
        commentsPostIds: [],
        share: true,
        sharedPost: {
            timestamp: 1702322265413,
            userId: 12,
            title: "HEDONIST ROOTS",
            content: "Until recently, the prevailing view assumed lorem ipsum was born as a nonsense text. “It's not Latin, though it looks like it, and it actually says nothing,” Before & After magazine answered a curious reader, “Its ‘words’ loosely approximate the frequency with which letters occur in English, which is why at a glance it looks pretty real.”",
        },
        timestamp: 1728970926215,
        title: "HEDONIST ROOTS",
        content: "Take a look at this!",
        likesUserIds: [1],
        userId: 10
    }
]

export default postsData;