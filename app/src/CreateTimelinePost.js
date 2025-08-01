
import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import {Button, Col, Form, FormGroup, Input, Row} from 'reactstrap';
import {FaXmark} from "react-icons/fa6";
import {FaArrowAltCircleRight} from "react-icons/fa";
import {setStoredPostsByUserId, usePost} from "./context/PostProvider";
import { Buffer } from 'buffer';
import {createPhotoPostForTimeline, createTextPostForTimeline} from "./context/postUtils";

const CreateTimelinePost = ({currentUser, profileUser, posts, setPosts}) => {
    const [newPost, setNewPost] = useState(undefined);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImageBase64, setSelectedImageBase64] = useState(null)
    const [textPostSelected, setTextPostSelected] = useState(true);
    const [photoPostSelected, setPhotoPostSelected] = useState(false);
    const [textLabelColor, setTextLabelColor ] = useState("white");
    const [textLabelBackgroundColor, setTextLabelBackgroundColor ] = useState("#0d6efd");
    const [photoLabelColor, setPhotoLabelColor ] = useState("black");
    const [photoLabelBackgroundColor, setPhotoLabelBackgroundColor ] = useState("white");

    useEffect(() => {

        const convertToBase64 = async () => {
            if(!selectedImage) {
                return
            }
            const base64File = await getBase64OfFile(selectedImage)
            setSelectedImageBase64(base64File)
        }

        const getBase64OfFile = (file) => {
            return new Promise((acc, err) => {
                const reader = new FileReader();
                reader.onload = (event) => { acc(event.target.result) };
                reader.onerror = (err)  => { err(err) };
                reader.readAsDataURL(file);
            });
        }

        convertToBase64();
    }, [selectedImage]); // Empty dependency array ensures the effect runs only once


    const handleTextPostChange = (event) => {
        setNewPost(event.target.value);
    }

    const handleTextSubmit = async (event) => {
        console.log("CreateTimelinePost - handleSubmit")
        const newPostToSave = event.target.newPost.value
        event.preventDefault();
        createTextPostForTimeline(currentUser, profileUser, newPostToSave, posts, setPosts)
        setNewPost(undefined);
    }

    const handlePhotoPostChange = (event) => {
        setNewPost(event.target.value);
    }

    const handlePhotoSubmit = async (event) => {
        const newPostToSave = event.target.newPost.value
        event.preventDefault();
        createPhotoPostForTimeline(currentUser, profileUser, newPostToSave, selectedImageBase64, posts, setPosts);
        setNewPost(undefined);
        setSelectedImage(null);
    }

    const onChooseTextPost = () => {
        setPhotoLabelColor("black");
        setPhotoLabelBackgroundColor("white")
        setTextLabelColor("white");
        setTextLabelBackgroundColor("#0d6efd")
        setPhotoPostSelected(false);
        setTextPostSelected(true);
    }

    const onChoosePhotoPost = () => {
        setTextLabelColor("black");
        setTextLabelBackgroundColor("white")
        setPhotoLabelColor("white");
        setPhotoLabelBackgroundColor("#0d6efd")
        setTextPostSelected(false);
        setPhotoPostSelected(true);
    }

    return <div style={{
        border: "ridge",
        paddingTop: 15,
        paddingBottom: 15,
        marginBottom: 15,
        backgroundColor: "white",
    }}>
        { textPostSelected &&
            <Form style={{}} onSubmit={handleTextSubmit}>
                <FormGroup>
                    <Row>
                        <Col xs={10}>
                            <Input type="text" name="newPost" id="newPost" value={newPost || ''}
                                   placeholder="What's on your mind?" onChange={handleTextPostChange} autoComplete="newPost"/>
                        </Col>
                        <Col xs={2}>
                            <Button color="primary" type="Post"><FaArrowAltCircleRight/></Button></Col>
                    </Row>
                </FormGroup>
            </Form>
        }
        { photoPostSelected &&
            <Form style={{}} onSubmit={handlePhotoSubmit}>
                <FormGroup>
                    <Row>
                        <Col xs={10}>
                            <Input type="text" name="newPost" id="newPost" value={newPost || ''}
                                   placeholder="Say something about this..." onChange={handlePhotoPostChange} autoComplete="newPost"/>
                        </Col>
                        <Col xs={2}>
                            <Button color="primary" type="Post"><FaArrowAltCircleRight/></Button></Col>
                    </Row>
                    { selectedImage &&
                        <Row>
                            <div style={{padding: 10}}>
                                <img
                                    alt="not found"
                                    style={{maxWidth: "100%"}}
                                    src={URL.createObjectURL(selectedImage)}
                                />
                                <br/> <br/>
                                <button
                                    onClick={() => setSelectedImage(null)}>
                                    Remove
                                </button>
                            </div>
                        </Row>
                    }
                    <Row>
                        <input
                            style={{display: "none"}}
                            type="file"
                            name="inputFile"
                            id="inputFile"
                            onChange={(event) => {
                                setSelectedImage(event.target.files[0]);
                            }}
                        />
                    </Row>
                </FormGroup>
            </Form>
        }
        <label
            style={{
                color: textLabelColor,
                backgroundColor: textLabelBackgroundColor,
                marginRight: 25,
                padding: 6}}
            onClick={() => onChooseTextPost()}>
            Text
        </label>
        <label
            style={{
                color: photoLabelColor,
                backgroundColor: photoLabelBackgroundColor,
                marginRight: 25,
                padding: 6 }}
            onClick={() => onChoosePhotoPost()}
            htmlFor="inputFile">
            Photo
        </label>


    </div>
}

export default CreateTimelinePost;

