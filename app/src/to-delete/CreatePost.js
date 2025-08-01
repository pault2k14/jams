
import React, { useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import {Button, Form, FormGroup, Input} from 'reactstrap';
import {FaXmark} from "react-icons/fa6";
import { usePost } from "./context/PostProvider";
import {FaArrowAltCircleRight} from "react-icons/fa";

const CreatePost = () => {
    const [newPost, setNewPost] = useState(undefined);
    const {posts, setPosts} = usePost();


    const handleChange = (event) => {
        setNewPost(event.target.value);
    }

    const handleSubmit = async (event) => {
        const newPostToSave = event.target.newPost.value;
        event.preventDefault();
        setPosts([...posts, {timestamp: new Date().getTime(), content: newPostToSave}]);
        setNewPost(undefined);
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

