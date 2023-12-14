import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Buffer } from 'buffer';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import {FaCircle, FaEdit, FaTrash} from "react-icons/fa";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import {FaB, FaJ, FaP} from "react-icons/fa6";


const UserProfile = ({currentUser}) => {
    console.dir(currentUser);

    const [cookies] = useCookies(['XSRF-TOKEN']);
    const [currentUserProfile, setCurrentUserProfile] = useState("")
    const [loading, setLoading] = useState(false);

    if (loading) {
        return <p>Loading...</p>;
    }

    const PostList = currentUser.posts.map(post => {
        return <Row style={{paddingTop: 50}}>
            <Row>
                <Col className={"col-auto"}>
                    {currentUser.miniProfileImage}
                </Col>
                <Col className={"col-auto"}>
                    <h5>{currentUser.name}</h5>
                </Col>
            </Row>
            <Row style={{paddingTop: 10}}>
                <h6>{post.date}</h6>
            </Row>
            <Row style={{paddingTop: 10}}>
                <p>{post.content}</p>
            </Row>
        </Row>
    });

    return (
        <div>
            <Container fluid>
                <Row>
                    <Row>
                        <Col className={"d-flex col-auto"}>
                            <Row>
                                <div className={"d-flex align-items: center"}>
                                    <div>{currentUser.profileImage}</div>
                                    <div>
                                        <div style={{ paddingLeft: 30 }}>
                                            <h1>{currentUser.name}</h1>
                                            <h5>{currentUser.friends} friends, {currentUser.mutualFriends} mutual</h5>
                                        </div>
                                    </div>
                                </div>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={"col-auto"}>
                            <Row>
                                {PostList}
                            </Row>
                        </Col>
                    </Row>
                </Row>
            </Container>
        </div>
    );
};

export default UserProfile;