import React from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GroupList from './GroupList';
import GroupEdit from './GroupEdit';
import PhotoList from "./PhotoList";
import PhotoEdit from "./PhotoEdit";
import FriendList from "./FriendList";
import ProfileFriendsProvider from "./context/ProfileFriendsProvider";
import UserTimeline from "./UserTimeline";
import Layout from "./Layout";
import ScrollToTop from "./ScrollToTop";
import FloatingChat from "./FloatingChat";

// https://developer.okta.com/blog/2022/06/17/simple-crud-react-and-spring-boot#add-a-react-groupedit-component

const App = () => {
    return (
        <Router>
            <ScrollToTop />
            <Layout>
            <Routes>
                <Route exact path="/" element={
                    <ProfileFriendsProvider>
                        <Home/>
                    </ProfileFriendsProvider>
                }/>
                <Route path='/friends' exact={true} element={
                    <ProfileFriendsProvider>
                        <FriendList/>
                    </ProfileFriendsProvider>
                }/>
                <Route path='/friends/:userId' element={
                    <ProfileFriendsProvider>
                        <UserTimeline/>
                    </ProfileFriendsProvider>
                }/>
                <Route path='/groups' exact={true} element={<GroupList/>}/>
                <Route path='/groups/:id' element={<GroupEdit/>}/>
                <Route path='/photos' exact={true} element={<PhotoList/>}/>
                <Route path='/photos/:id' element={<PhotoEdit/>}/>
            </Routes>
            </Layout>
        </Router>
    )
}

export default App;