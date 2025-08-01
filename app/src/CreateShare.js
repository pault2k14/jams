
import React, { useState } from 'react';
import './App.css';
import {Button, Form, FormGroup, Input } from 'reactstrap';
import {FaXmark} from "react-icons/fa6";
import {FaArrowAltCircleRight} from "react-icons/fa";

const CreateShare = ({postToShare, currentUser, profileUser, hideShare,
                         setHideShare, customUpdateOnShare}) => {
    const [newShare, setNewShare] = useState(undefined);

    //console.log("--- CreateShare ---")
    //console.log("postToShare")
    //console.dir(postToShare)
    //console.log("currentPosts")
    //console.dir(currentPosts)
    //console.log("setCurrentPosts")
    //console.dir(setCurrentPosts)

    const handleChange = (event) => {
        setNewShare(event.target.value);
    }

    const handleSubmit = async (event) => {
        const newShareToSave = event.target.newShare.value
        event.preventDefault();
        setHideShare(true);

        customUpdateOnShare(postToShare, newShareToSave)
        setNewShare(undefined);
    }

    return <div>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Input type="text" name="newShare" id="newShare" value={newShare || ''}
                       placeholder="Say something about this..." onChange={handleChange} autoComplete="newShare"/>
            </FormGroup>
            <FormGroup>
                <Button color="primary" type="Post" style={{marginRight: 25}}>
                    <FaArrowAltCircleRight/>
                </Button>
                <Button onClick={() => setHideShare(true)} color="secondary">
                    <FaXmark/>
                </Button>
            </FormGroup>
        </Form>
    </div>
}

export default CreateShare;

