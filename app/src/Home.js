import React, { useEffect, useState } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import {Button, Col, Container, Row} from 'reactstrap';
import { useCookies } from 'react-cookie';
import {Tooltip} from "react-tooltip";
import {FaB, FaJ} from "react-icons/fa6";
import Post from "./Post";

const Home = () => {

    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(undefined);
    const [cookies] = useCookies(['XSRF-TOKEN']);
    const [friends, setFriends] = useState([
        {
            name: "Bob Smith",
            profileImage: <span><FaB size={100} style={{backgroundColor:'blue', color:'white', borderRadius:'40%'}}/></span>,
            mediumProfileImage: <span><FaB size={50} style={{backgroundColor:'blue', color:'white', borderRadius:'40%'}}/></span>,
            miniProfileImage: <span><FaB size={25} style={{backgroundColor:'blue', color:'white', borderRadius:'40%'}}/></span>,
            friends: 403,
            mutualFriends: 5,
            posts: [
                {
                    date: "September 5th, 2023",
                    time: "1:57pm",
                    title: "Lorem Ipsum is simply dummy text",
                    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                },
                {
                    date: "November 25th, 2023",
                    time: "11:12am",
                    title: "HEDONIST ROOTS",
                    content: "Until recently, the prevailing view assumed lorem ipsum was born as a nonsense text. “It's not Latin, though it looks like it, and it actually says nothing,” Before & After magazine answered a curious reader, “Its ‘words’ loosely approximate the frequency with which letters occur in English, which is why at a glance it looks pretty real.”"
                }
            ]
        },
        {
            name: "Jim Johnson",
            profileImage: <span><FaJ size={100} style={{backgroundColor:'green', color:'white', borderRadius:'40%'}}/></span>,
            mediumProfileImage: <span><FaJ size={50} style={{backgroundColor:'green', color:'white', borderRadius:'40%'}}/></span>,
            miniProfileImage: <span><FaJ size={25} style={{backgroundColor:'green', color:'white', borderRadius:'40%'}}/></span>,
            friends: 72,
            mutualFriends: 2,
            posts: [
                {
                    date: "September 5th, 2023",
                    time: "1:57pm",
                    title: "Lorem Ipsum is simply dummy text",
                    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                },
                {
                    date: "November 25th, 2023",
                    time: "11:12am",
                    title: "HEDONIST ROOTS",
                    content: "Until recently, the prevailing view assumed lorem ipsum was born as a nonsense text. “It's not Latin, though it looks like it, and it actually says nothing,” Before & After magazine answered a curious reader, “Its ‘words’ loosely approximate the frequency with which letters occur in English, which is why at a glance it looks pretty real.”"
                }
            ]
        }
    ]);

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
                {feed}
                {message}
                {button}
            </Container>
        </div>
    );
}

export default Home;