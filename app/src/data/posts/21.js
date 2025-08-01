import {FaA, FaB, FaD, FaE, FaJ, FaK, FaM, FaR, FaS, FaT} from "react-icons/fa6";
import React from "react";

export const postsData = [
    {
        id: 84,
        parentId: null,
        topLevelParentId: null,
        commentsPostIds: [85, 87],
        share: false,
        sharedPost: null,
        timestamp: 1728911926215,
        title: "Lorem Ipsum is simply dummy text",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        likesUserIds: [6, 14, 17, 20],
        userId: 21
    },
    {
        id: 85,
        parentId: 84,
        topLevelParentId: 85,
        commentsPostIds: [86],
        share: false,
        sharedPost: null,
        timestamp: 1728912926215,
        title: "Lorem Ipsum is simply dummy text",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        likesUserIds: [6, 14, 17, 20],
        userId: 22
    },
    {
        id: 86,
        parentId: 85,
        topLevelParentId: 84,
        commentsPostIds: [],
        share: false,
        sharedPost: null,
        timestamp: 1728913926215,
        title: "Lorem Ipsum is simply dummy text",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        likesUserIds: [6, 14, 17, 20],
        userId: 1
    },
    {
        id: 87,
        parentId: 84,
        topLevelParentId: 84,
        commentsPostIds: [],
        share: false,
        sharedPost: null,
        timestamp: 1728914926215,
        title: "Lorem Ipsum is simply dummy text",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        likesUserIds: [6, 14, 17, 20],
        userId: 6
    },
    {
        id: 88,
        parentId: null,
        topLevelParentId: null,
        commentsPostIds: [],
        share: false,
        sharedPost: null,
        timestamp: 1728915926215,
        title: "HEDONIST ROOTS",
        content: "Until recently, the prevailing view assumed lorem ipsum was born as a nonsense text. “It's not Latin, though it looks like it, and it actually says nothing,” Before & After magazine answered a curious reader, “Its ‘words’ loosely approximate the frequency with which letters occur in English, which is why at a glance it looks pretty real.”",
        likesUserIds: [6, 14, 17, 20],
        userId: 21
    }
]

export default postsData;