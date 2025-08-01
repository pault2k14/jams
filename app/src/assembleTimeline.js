const _ = require('lodash');

let friends = [
    {
        name: "Bob Smith",
        userId: 1,
        profileImage: "FaB",
        mediumProfileImage: "FaB",
        miniProfileImage: "FaB",
        friends: 403,
        mutualFriends: 5
    },
    {
        name: "Jim Johnson",
        userId: 6,
        profileImage: "FaJ",
        mediumProfileImage: "FaJ",
        miniProfileImage: "FaJ",
        friends: 72,
        mutualFriends: 2
    }
]

let friendPosts = [
    {
        userId: 1,
        posts: [
            {
                id: 1,
                parentId: null,
                date: "September 5th, 2023",
                time: "1:57pm",
                timestamp: 1702322265413,
                title: "Lorem Ipsum is simply dummy text",
                content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                name: "Bob Smith",
                userId: 1,
                profileImage: "FaB",
                mediumProfileImage: "FaB",
                miniProfileImage: "FaB",
                friends: 403,
                mutualFriends: 5
            },
            {
                id: 2,
                parentId: 1,
                date: "September 12th, 2023",
                time: "3:17pm",
                timestamp: 1702322265413,
                title: "Lorem Ipsum is simply dummy text",
                content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                name: "Joe Bob",
                userId: 3,
                profileImage: "FaJ",
                mediumProfileImage: "FaJ",
                miniProfileImage: "FaJ",
                friends: 80,
                mutualFriends: 1
            },
            {
                id: 3,
                parentId: 2,
                date: "September 12th, 2023",
                time: "3:17pm",
                timestamp: 1702322265413,
                title: "Lorem Ipsum is simply dummy text",
                content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                name: "Ken Thompson",
                userId: 4,
                profileImage: "FaK",
                mediumProfileImage: "FaK",
                miniProfileImage: "FaK",
                friends: 80,
                mutualFriends: 1
            },
            {
                id: 4,
                parentId: 1,
                date: "September 12th, 2023",
                time: "3:17pm",
                timestamp: 1702322265413,
                title: "Lorem Ipsum is simply dummy text",
                content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                name: "Joe Jacobson",
                userId: 5,
                profileImage: "FaJ",
                mediumProfileImage: "FaJ",
                miniProfileImage: "FaJ",
                friends: 80,
                mutualFriends: 1
            },
            {
                id: 5,
                parentId: null,
                date: "November 25th, 2023",
                time: "11:12am",
                timestamp: 1702322265413,
                title: "HEDONIST ROOTS",
                content: "Until recently, the prevailing view assumed lorem ipsum was born as a nonsense text. “It's not Latin, though it looks like it, and it actually says nothing,” Before & After magazine answered a curious reader, “Its ‘words’ loosely approximate the frequency with which letters occur in English, which is why at a glance it looks pretty real.”",
                name: "Bob Smith",
                userId: 1,
                profileImage: "FaB",
                mediumProfileImage: "FaB",
                miniProfileImage: "FaB",
                friends: 403,
                mutualFriends: 5
            }
        ]
    },
    {
        userId: 6,
        posts: [
            {
                id: 6,
                parentId: null,
                date: "September 5th, 2023",
                time: "1:57pm",
                timestamp: 1702322265413,
                title: "Lorem Ipsum is simply dummy text",
                content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                name: "Jim Johnson",
                userId: 6,
                profileImage: "FaJ",
                mediumProfileImage: "FaJ",
                miniProfileImage: "FaJ",
                friends: 72,
                mutualFriends: 2
            },
            {
                id: 7,
                parentId: null,
                date: "November 25th, 2023",
                time: "11:12am",
                timestamp: 1702322265413,
                title: "HEDONIST ROOTS",
                content: "Until recently, the prevailing view assumed lorem ipsum was born as a nonsense text. “It's not Latin, though it looks like it, and it actually says nothing,” Before & After magazine answered a curious reader, “Its ‘words’ loosely approximate the frequency with which letters occur in English, which is why at a glance it looks pretty real.”",
                name: "Jim Johnson",
                userId: 6,
                profileImage: "FaJ",
                mediumProfileImage: "FaJ",
                miniProfileImage: "FaJ",
                friends: 72,
                mutualFriends: 2
            }
        ]
    }
]

const assembledTimeline = () => {
    // Make deep copies so we don't modify the original arrays.
    let friendsArray = JSON.parse(JSON.stringify(friends))
    let postsArray = JSON.parse(JSON.stringify(friendPosts));

    for(let i = 0; i < friendsArray.length; i++) {
        for(let j = 0; j < friendPosts.length; j++) {
            if(friendsArray[i].userId === friendPosts[j].userId) {
                friendsArray[i] = assemblePosts(friendsArray[i], postsArray[j].posts)
            }
        }
    }

    return friendsArray;
}

export function assembleSingleTimeline(user, postsArray) {
    console.log("assembleSingleTimeline")
    console.log("user");
    console.dir(user);
    console.log("postsArray");
    console.dir(postsArray);

    if(!postsArray) {
        return []
    }

    // Make deep copies so we don't modify the original arrays.
    let postsArrayCopy = [];
    for(let i = 0; i < postsArray.length; i++) {
        postsArrayCopy.push(_.clone(postsArray[i]))
    }

    return assemblePosts({}, postsArrayCopy)
}

const assemblePosts = (assembledPosts, postsArray) => {
    console.log("assemblePosts")
    if(postsArray.length === 0 ) {
        return assembledPosts;
    }

    for(let i = 0; i < postsArray.length; i++) {
        if(postsArray[i].parentId === null) {
            if(!assembledPosts.posts) {
                assembledPosts.posts = [];
            }

            assembledPosts.posts.push(postsArray[i]);
        } else {
            let response = searchFriendForPost(assembledPosts.posts, postsArray[i])

            if(response.found) {
                assembledPosts.posts = response.friendPosts
            }
        }
    }

    return assembledPosts;
}

const searchFriendForPost = (friendPosts, postToMatch) => {
    console.log("searchFriendForPost")
    for(let i = 0; i < friendPosts.length; i++) {

        if(friendPosts[i].id === postToMatch.parentId) {
            if(!friendPosts[i].replies) {
                friendPosts[i].replies = {
                    posts: [postToMatch]
                }
            } else {
                friendPosts[i].replies.posts.push(postToMatch);
            }
            return {
                friendPosts,
                found: true
            };
        }

        if(friendPosts[i].replies && friendPosts[i].replies.posts) {
            let response = searchFriendForPost(friendPosts[i].replies.posts, postToMatch);

            if(response.found) {
                friendPosts[i].replies.posts = response.friendPosts
                return {
                    friendPosts,
                    found: true
                };
            }
        }
    }

    return {
        friendPosts: friendPosts,
        found: false
    }
}


//let friendArray = assembledTimeline()
//let friendArray = assembleSingleTimeline(friends[0], friendPosts[0].posts)

//console.dir(friendArray)
/*
for(let i = 0; i < friendArray.length; i++) {
    console.dir(friendArray[i].posts);
    if(friendArray[i].posts.replies) {
        console.dir(friendArray[i].posts.replies);
    }
}
 */


