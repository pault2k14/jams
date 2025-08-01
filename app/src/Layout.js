import AppNavbar from "./AppNavbar";
import Footer from "./Footer";
import Popchat from "./Popchat";
import React from "react";
import FloatingChat from "./FloatingChat";
import {useChat} from "./context/ChatProvider";
import {useUsers} from "./context/UsersProvider";


const Layout = ({ children }) => {
    const {usersObject, getUserById} = useUsers();
    const {userToChatWithObject, chatMessagesObject, chatWindowObject,
        setChatMessagesByUserIds, addChatMessageByUserIds, updateChatMessageByUserIds,
        deleteChatMessageByUserIds} = useChat();
    const {isFloatingWindowOpen, setIsFloatingWindowOpen} = chatWindowObject;

    return (
        <div>
            {/* Header, navigation, or other shared elements */}
            <AppNavbar/>
            {isFloatingWindowOpen && <FloatingChat
                currentUser={getUserById(10)}
                isFloatingChatOpen={isFloatingWindowOpen}
                setIsFloatingChatOpen={setIsFloatingWindowOpen}/>
            }
            {children}
            {/* Footer or other shared elements */}
            <Footer/>
        </div>
    );
}
export default Layout;