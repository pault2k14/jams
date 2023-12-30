import React from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GroupList from './GroupList';
import GroupEdit from './GroupEdit';
import PhotoList from "./PhotoList";
import PhotoEdit from "./PhotoEdit";
import FriendList from "./FriendList";
import Feed from "./Timeline";
import Timeline from "./Timeline";

// https://developer.okta.com/blog/2022/06/17/simple-crud-react-and-spring-boot#add-a-react-groupedit-component

const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path='/friends' exact={true} element={<FriendList/>}/>
                <Route path='/friends/:id' element={<PhotoEdit/>}/>
                <Route path='/groups' exact={true} element={<GroupList/>}/>
                <Route path='/groups/:id' element={<GroupEdit/>}/>
                <Route path='/photos' exact={true} element={<PhotoList/>}/>
                <Route path='/photos/:id' element={<PhotoEdit/>}/>
                <Route path='/timeline' exact={true} element={<Timeline/>}/>
            </Routes>
        </Router>
    )
}

export default App;