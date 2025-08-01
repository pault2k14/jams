import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-chat-elements/dist/main.css'
import App from './App';
import { CookiesProvider } from 'react-cookie';
import PostProvider from "./context/PostProvider";
import FriendProvider from "./context/FriendProvider";
import AboutProvider from "./context/AboutProvider";
import UsersProvider from "./context/UsersProvider";
import CurrentUserProvider from "./context/CurrentUserProvider";
import ProfilePostProvider from "./context/ProfilePostProvider";
import PhotosProvider from "./context/PhotosProvider";
import ChatProvider from "./context/ChatProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <CookiesProvider>
            <CurrentUserProvider>
                <UsersProvider>
                    <FriendProvider>
                        <PostProvider>
                            <ProfilePostProvider>
                                <PhotosProvider>
                                    <AboutProvider>
                                        <ChatProvider>
                                        <App/>
                                        </ChatProvider>
                                    </AboutProvider>
                                </PhotosProvider>
                            </ProfilePostProvider>
                        </PostProvider>
                    </FriendProvider>
                </UsersProvider>
            </CurrentUserProvider>
        </CookiesProvider>
    </React.StrictMode>
);