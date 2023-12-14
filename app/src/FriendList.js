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
import UserProfile from "./UserProfile";


const FriendList = () => {
    const [cookies] = useCookies(['XSRF-TOKEN']);
    const [selectedFriend, setSelectedFriend] = useState();
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
    const [loading, setLoading] = useState(false);

    if (loading) {
        return <p>Loading...</p>;
    }

    function customSetSelectedFriend(friend) {
        //console.dir(friend)
        setSelectedFriend(friend);
    }

    const friendList = friends.map(friend => {
        return <Row onClick={() => customSetSelectedFriend(friend)}>
                <Col style={{paddingBottom: 25}} className={"col-auto justify-content-start"}>
                    <Row>{friend.mediumProfileImage}</Row>
                </Col>
                <Col className={"col-auto justify-content-start"}>
                    <Row><p style={{fontSize: 14}}>
                        {friend.name}
                        <br/>
                        {friend.friends} friends, {friend.mutualFriends} mutual</p>
                    </Row>
                </Col>
            </Row>
    });


    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                        <Row>
                            <Col className={"col-auto justify-content-start"}>
                                <Row>
                                    <h3>My Friends</h3>
                                </Row>
                                <Row>
                                    <form style={{paddingBottom: 30}}>
                                        <input style={{marginRight: 10}} type="text" placeholder="Search by name or email.."/>
                                        <input type="submit" value="Submit" />
                                    </form>
                                </Row>
                                <Row>{friendList}</Row>
                            </Col>
                            <Col className={"col-8"}>
                                <Row>
                                    <div className={"d-flex justify-content-end"}>
                                        <Button color="success" tag={Link} to="/friends/new">Add Friend</Button>
                                    </div>
                                </Row>
                                <Row>
                                    <>
                                        {selectedFriend ?
                                            <UserProfile currentUser={selectedFriend}/>
                                            : <p>Select a friend to view their profile</p>}
                                    </>
                                </Row>
                            </Col>
                        </Row>
            </Container>
        </div>
    );
};

export default FriendList;