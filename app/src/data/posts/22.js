import {FaA, FaB, FaD, FaE, FaJ, FaK, FaM, FaR, FaS, FaT} from "react-icons/fa6";
import React from "react";

export const postsData = [
    {
        id: 89,
        parentId: null,
        topLevelParentId: null,
        commentsPostIds: [90, 92],
        share: false,
        sharedPost: null,
        timestamp: 1728906926215,
        title: "Lorem Ipsum is simply dummy text",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        likesUserIds: [6, 14, 17, 20],
        userId: 22
    },
    {
        id: 90,
        parentId: 89,
        topLevelParentId: 90,
        commentsPostIds: [91],
        share: false,
        sharedPost: null,
        timestamp: 1728907926215,
        title: "Lorem Ipsum is simply dummy text",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        likesUserIds: [6, 14, 17, 20],
        userId: 1
    },
    {
        id: 91,
        parentId: 90,
        topLevelParentId: 89,
        commentsPostIds: [],
        share: false,
        sharedPost: null,
        timestamp: 1728908926215,
        title: "Lorem Ipsum is simply dummy text",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        likesUserIds: [6, 14, 17, 20],
        userId: 6
    },
    {
        id: 92,
        parentId: 89,
        topLevelParentId: 89,
        commentsPostIds: [],
        share: false,
        sharedPost: null,
        timestamp: 1728909926215,
        title: "Lorem Ipsum is simply dummy text",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        likesUserIds: [6, 14, 17, 20],
        userId: 10
    },
    {
        id: 93,
        parentId: null,
        topLevelParentId: null,
        commentsPostIds: [],
        share: false,
        sharedPost: null,
        timestamp: 1728910926215,
        title: "HEDONIST ROOTS",
        content: "Until recently, the prevailing view assumed lorem ipsum was born as a nonsense text. “It's not Latin, though it looks like it, and it actually says nothing,” Before & After magazine answered a curious reader, “Its ‘words’ loosely approximate the frequency with which letters occur in English, which is why at a glance it looks pretty real.”",
        likesUserIds: [6, 14, 17, 20],
        userId: 22
    }
]

export default postsData;