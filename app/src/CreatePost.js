
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

const CreatePost = () => {
    const [newPost, setNewPost] = useState(undefined);
    const {posts, setPosts} = usePost();


    const handleChange = (event) => {
        setNewPost(event.target.value);

    }

    const handleSubmit = async (event) => {
        const newPostToSave = event.target.newPost.value;
        event.preventDefault();
        console.log(newPostToSave);
        setPosts([...posts, {timestamp: new Date().getTime(), content: newPostToSave}]);
        setNewPost(undefined);
        console.log(posts);
    }

    return <div>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Input type="text" name="newPost" id="newPost" value={newPost || ''}
                       placeholder="What's on your mind?" onChange={handleChange} autoComplete="newPost"/>
            </FormGroup>
            <FormGroup>
                <Button color="primary" type="Post"><FaArrowAltCircleRight/></Button>{' '}
                <Button color="secondary" tag={Link} to="/photos"><FaXmark/></Button>
            </FormGroup>
        </Form>
    </div>
}

export default CreatePost;

