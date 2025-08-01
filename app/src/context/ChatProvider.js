import React, { createContext,useMemo, useState, useContext } from 'react'
import chatMessageData from "../data/chat-messages/chat-messages-1-10";
const ChatContext = createContext()
ChatContext.displayName = 'ValueContext'

const randomChatMessages = [
    "I gotta finish laundry.",
    "I’m going to the bathroom.",
    "I gotta clean my closet after lunch.",
    "I’m going to make chicken for dinner.",
    "I have to go to the meeting in an hour.",
    "Do nothing. It is impossible.",
    "You smell like pasta. Stand back!",
    "I’m out of my mind. Be back in 5 minutes.",
    "If history repeats itself, I’m getting a dinosaur pet.",
    "Everything is coming to you, but you’re in the wrong lane.",
    "Is it possible to cry underwater?",
    "Is cereal soup? Why or why not?",
    "Does a straw have one hole or two?",
    "Why do our feet smell and noses run?",
    "If animals could talk, which would be the rudest?",
    "Do you ever accidentally eat a whole pint of ice cream?",
    "Do you ever bring a book everywhere you go but never read it?",
    "Do you ever get the random urge to spend $30-50 for no reason?",
    "Do you ever carry 30 bags of groceries at once instead of taking multiple trips?",
    "Do you ever get a random flashback from middle school and stay up all night thinking about it?"
]

export const useChat = () => {
    const context = useContext(ChatContext)
    if (context === undefined) {
        throw new Error('useChat must be used within a ChatProvider')       }
    return context
}


const ChatProvider = ({ children }) => {
    const [userToChatWith, setUserToChatWith] = useState(null);
    const [chatMessages, setChatMessages] = useState(null);
    const [isFloatingWindowOpen, setIsFloatingWindowOpen] = useState(false);

    const userToChatWithObject = useMemo(() => {
        return { userToChatWith, setUserToChatWith }
    }, [userToChatWith, setUserToChatWith])

    const chatMessagesObject = useMemo(() => {
        return { chatMessages, setChatMessages }
    }, [chatMessages, setChatMessages])

    const chatWindowObject = useMemo(() => {
        return { isFloatingWindowOpen, setIsFloatingWindowOpen }
    }, [isFloatingWindowOpen, setIsFloatingWindowOpen])

    const deleteChatMessageByUserIds = (currentUser, userBeingChattedWith, messageToDelete) => {
        let chatMessagesName = getChatMessagesName(currentUser, userBeingChattedWith);

        if(userBeingChattedWith.userId !== userToChatWith.userId) {
            throw new Error("deleteChatMessageByUserIds userBeingChattedWith.userId: " + userBeingChattedWith.userId
                + " is not the same as userToChatWith.userId: " + userToChatWith.userId)
        }

        if(currentUser.userId !== messageToDelete.userId) {
            return null;
        }

        // Create a new array, add new message, and update state
        let updatedChatMessages = [...chatMessages];
        updatedChatMessages = updatedChatMessages.filter(message => message.id !== messageToDelete.id);
        setChatMessages(updatedChatMessages);

        // Update chat messages in session
        sessionStorage.setItem(chatMessagesName, JSON.stringify(updatedChatMessages))
    }

    const updateChatMessageByUserIds = (currentUser, userBeingChattedWith, messageToUpdate) => {
        let chatMessagesName = getChatMessagesName(currentUser, userBeingChattedWith);

        if(userBeingChattedWith.userId !== userToChatWith.userId) {
            throw new Error("deleteChatMessageByUserIds userBeingChattedWith.userId: " + userBeingChattedWith.userId
                + " is not the same as userToChatWith.userId: " + userToChatWith.userId)
        }

        if(currentUser.userId !== messageToUpdate.userId) {
            return null;
        }

        // Create a new array, add new message, and update state
        let updatedChatMessages = [...chatMessages];
        updatedChatMessages = updatedChatMessages.map(message => {
            if(message.id === messageToUpdate.id) {
                return messageToUpdate;
            }

            return message;
        });

        setChatMessages(updatedChatMessages);

        // Update chat messages in session
        sessionStorage.setItem(chatMessagesName, JSON.stringify(updatedChatMessages))
    }

    const addChatMessageByUserIds = (currentUser, userBeingChattedWith, newMessage) => {
        let chatMessagesName = getChatMessagesName(currentUser, userBeingChattedWith);

        if(userBeingChattedWith.userId !== userToChatWith.userId) {
            throw new Error("addChatMessageByUserIds userBeingChattedWith.userId: " + userBeingChattedWith.userId
                + " is not the same as userToChatWith.userId: " + userToChatWith.userId)
        }

        // Create a new array, add new message, and update state
        let updatedChatMessages = [...chatMessages];
        updatedChatMessages.push(newMessage);

        // TODO Remove this, Get random message from chat to get a reply
        let randomMessage = randomChatMessages[Math.floor(Math.random()*randomChatMessages.length)];
        // Extra time is to avoid collisons with simple timestamp IDs.
        let timestamp = new Date().getTime() + 10000;

        const newRandomMessage = {
            id: timestamp,
            timestamp: timestamp,
            userId: userToChatWith.userId,
            image: "avatar-640.png",
            avatarBaseUrl: "./data/images/",
            text: randomMessage,
        }

        updatedChatMessages.push(newRandomMessage);

        setChatMessages(updatedChatMessages);

        // Update chat messages in session
        sessionStorage.setItem(chatMessagesName, JSON.stringify(updatedChatMessages))
    }

    const setChatMessagesByUserIds = (currentUser, newUserToChatWith) => {
        let chatMessagesName = getChatMessagesName(currentUser, newUserToChatWith);
        setUserToChatWith(newUserToChatWith)

        let chatMessagesArray = [];

        if (!sessionStorage.getItem(chatMessagesName)) {
            console.log("setChatMessagesByUserIds Unable to find chat messages for currentUser: " + currentUser.userId
                + " and newUserToChatWith: " + newUserToChatWith.userId)
            let requiredData = require('../data/chat-messages/' + chatMessagesName);
            requiredData.chatMessageData.map((chatMessage, index) => {
                chatMessagesArray.push(chatMessage);
            })

            sessionStorage.setItem(chatMessagesName, JSON.stringify(chatMessagesArray))
            setChatMessages(chatMessagesArray);
        } else {
            console.log("setChatMessagesByUserIds from storage for currentUser: " + currentUser.userId
                + " and newUserToChatWith: " + newUserToChatWith.userId)
            let sessionChatMessages = JSON.parse(sessionStorage.getItem(chatMessagesName));
            setChatMessages(sessionChatMessages);
        }
    }

    const getChatMessagesName = (currentUser, userToChatWith) => {
        let firstUserId = null;
        let secondUserId = null;

        console.log("currentUser")
        console.dir(currentUser)
        console.log("userToChatWith")
        console.dir(userToChatWith)

        if(currentUser.userId <= userToChatWith.userId) {
            firstUserId = currentUser.userId;
            secondUserId = userToChatWith.userId;
        } else {
            firstUserId = userToChatWith.userId;
            secondUserId = currentUser.userId;
        }

        return "chat-messages-" + firstUserId + "-" + secondUserId;
    }




    return <ChatContext.Provider value={{
        userToChatWithObject,
        chatMessagesObject,
        chatWindowObject,
        setChatMessagesByUserIds,
        addChatMessageByUserIds,
        updateChatMessageByUserIds,
        deleteChatMessageByUserIds
    }}>{children}  </ChatContext.Provider>
}
export default ChatProvider