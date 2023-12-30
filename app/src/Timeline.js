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

const Timeline = () => {

    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const {posts, setPosts} = usePost();
    const [user, setUser] = useState(undefined);
    const [cookies] = useCookies(['XSRF-TOKEN']);
    const {friends, setFriends} = useFriends();

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

    const friendPosts = friends.map(friend => {
        return <Row>
            {friend.posts.map((post) => {
                return <Row>
                    <Post name={friend.name} date={post.date} miniProfileImage={friend.miniProfileImage} content={post.content}/>
                </Row>
            })}
        </Row>
    });

    const userPosts = posts.map(post => {
        const postDate = new Date(post.timestamp);
        return <div style={{marginBottom: 20}}>
            <Row>
                <Row style={{marginBottom: 20}}>{postDate.toLocaleDateString() + " at " + postDate.toLocaleTimeString()}</Row>
                <Row>{post.content}</Row>
            </Row>
        </div>
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
                <h3>My Timeline</h3>
                <CreatePost/>
                {userPosts}
                {feed}
                {message}
                {button}
            </Container>
        </div>
    );
}

export default Timeline;