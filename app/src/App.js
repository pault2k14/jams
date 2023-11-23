import React from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GroupList from './GroupList';
import GroupEdit from './GroupEdit';

// https://developer.okta.com/blog/2022/06/17/simple-crud-react-and-spring-boot#add-a-react-groupedit-component

const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path='/groups' exact={true} element={<GroupList/>}/>
                <Route path='/groups/:id' element={<GroupEdit/>}/>
            </Routes>
        </Router>
    )
}

export default App;