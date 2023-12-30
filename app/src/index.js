import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { CookiesProvider } from 'react-cookie';
import PostProvider from "./context/PostProvider";
import FriendProvider from "./context/FriendProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <CookiesProvider>
            <FriendProvider>
                <PostProvider>
                    <App/>
                </PostProvider>
            </FriendProvider>
        </CookiesProvider>
    </React.StrictMode>
);