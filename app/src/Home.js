import React, { useEffect, useState } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import {Button, Col, Container, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import { useCookies } from 'react-cookie';
import {Tooltip} from "react-tooltip";
import {FaArrowsLeftRight, FaArrowsLeftRightToLine, FaB, FaJ, FaXmark} from "react-icons/fa6";
import Post from "./Post";
import { usePost } from "./context/PostProvider";
import {FaArrowAltCircleLeft, FaArrowAltCircleRight, FaArrowRight, FaSubway} from "react-icons/fa";
import CreatePost from "./CreatePost";
import {useFriends} from "./context/FriendProvider";

const Home = () => {

    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const {posts, setPosts} = usePost();
    const [user, setUser] = useState(undefined);
    const [cookies] = useCookies(['XSRF-TOKEN']);
    const {friends, setFriends} = useFriends();
    const [orderedPosts, setOrderedPosts] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetch('api/user', { credentials: 'include' })
            .then(response => response.text())
            .then(body => {
                if (body === '') {
                    setAuthenticated(false);
                } else {
                    setUser(JSON.parse(body));
                    setAuthenticated(true);
                }
                setLoading(false);
            });
    }, [setAuthenticated, setLoading, setUser])

    useEffect(() => {
        setOrderedPosts(orderPosts(friends));
    },[setOrderedPosts, friends])

    const login = () => {
        let port = (window.location.port ? ':' + window.location.port : '');
        if (port === ':3000') {
            port = ':8080';
        }
        // redirect to a protected URL to trigger authentication
        window.location.href = `//${window.location.hostname}${port}/api/private`;
    }

    const logout = () => {
        fetch('/api/logout', {
            method: 'POST', credentials: 'include',
            headers: { 'X-XSRF-TOKEN': cookies['XSRF-TOKEN'] }
        })
            .then(res => res.json())
            .then(response => {
                window.location.href = `${response.logoutUrl}?id_token_hint=${response.idToken}`
                    + `&post_logout_redirect_uri=${window.location.origin}`;
            });
    }

    const message = user ?
        <h2>Welcome, {user.name}!</h2> :
        <p>Please log in to manage your JUG Tour.</p>;

    const button = authenticated ?
        <div>
            <Button color="link" onClick={logout}>Logout</Button>
        </div> :
        <Button color="primary" onClick={login}>Login</Button>;

    function orderPosts(listOfFriends) {
        let internalOrderedPosts = [];

        listOfFriends.forEach(function(item) {
            item.posts.forEach(function(post) {
                internalOrderedPosts.push({
                    name: item.name,
                    profileImage: item.profileImage,
                    mediumProfileImage: item.mediumProfileImage,
                    miniProfileImage: item.miniProfileImage,
                    post: post
                });
            });
        })

        internalOrderedPosts.sort(function(a, b) {
            // Sort in descending order, newest post first.
            return b.post.timestamp - a.post.timestamp;
        });

        internalOrderedPosts.forEach(function(item) {
            console.log(item)
        })

        return internalOrderedPosts;
    }

    const friendPosts = orderedPosts.map(item => {
        return <Row>
            <Post name={item.name} timestamp={item.post.timestamp} miniProfileImage={item.miniProfileImage} content={item.post.content}/>
        </Row>
    });

    const feed = authenticated ?
        <div>
            <Row>
                {friendPosts}
            </Row>
        </div>
        : <div></div>

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                <h3>My Home</h3>
                <CreatePost/>
                {feed}
                {message}
                {button}
            </Container>
        </div>
    );
}

export default Home;