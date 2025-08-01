
import React, { useState } from 'react';
import './App.css';
import {Button, Form, FormGroup, Input } from 'reactstrap';
import {FaXmark} from "react-icons/fa6";
import {FaArrowAltCircleRight} from "react-icons/fa";

const CreateReply = ({postToReplyTo, currentUser, profileUser,
                         hideComment, setHideComment, setSelectedReply, customUpdateOnReply}) => {
    const [newReply, setNewReply] = useState(undefined);
    //console.log("--- CreateReply ---");
    //console.log("postToReplyTo");
    //console.log(postToReplyTo);

    //console.log("currentPosts")
    //console.dir(currentPosts)

    //console.log("setCurrentPosts")
    //console.dir(setCurrentPosts)

    const onCancel = () => {
        setSelectedReply(null);
        setHideComment(true);
    }

    const handleChange = (event) => {
        setNewReply(event.target.value);
    }

    const handleSubmit = async (event) => {
        const newReplyToSave = event.target.newReply.value
        event.preventDefault();

        customUpdateOnReply(postToReplyTo, newReplyToSave);
        setHideComment(true);
        setNewReply(undefined);
    }

    return <div>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Input type="text" name="newReply" id="newReply" value={newReply || ''}
                       placeholder="What's on your mind?" onChange={handleChange} autoComplete="newReply"/>
            </FormGroup>
            <FormGroup>
                <Button color="primary" type="Post" style={{marginRight: 25}}>
                    <FaArrowAltCircleRight/>
                </Button>
                <Button onClick={() => onCancel()} color="secondary">
                    <FaXmark/>
                </Button>
            </FormGroup>
        </Form>
    </div>
}

export default CreateReply;

