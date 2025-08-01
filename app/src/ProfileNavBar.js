import {Col, Container, Row} from "reactstrap";
import {Menu, MenuItem} from "react-pro-sidebar";
import React, {useLayoutEffect, useState} from "react";
import About from "./About";

const ProfileNavBar = ({setProfileTabActive, setAboutTabActive, setFriendsTabActive,
                           setPhotosTabActive, profileUser}) => {
    const [postsMenuItemColor, setPostsMenuItemColor] = useState("white");
    const [postsMenuItemBackgroundColor, setPostsMenuItemBackgroundColor] = useState("#0d6efd");
    const [aboutMenuItemColor, setAboutMenuItemColor] = useState("black");
    const [aboutMenuItemBackgroundColor, setAboutMenuItemBackgroundColor] = useState("white");
    const [friendsMenuItemColor, setFriendsMenuItemColor] = useState("black");
    const [friendsMenuItemBackgroundColor, setFriendsMenuItemBackgroundColor] = useState("white");
    const [photosMenuItemColor, setPhotosMenuItemColor] = useState("black");
    const [photosMenuItemBackgroundColor, setPhotosMenuItemBackgroundColor] = useState("white");

    const [postsMenuItemTextColor, setPostsMenuItemTextColor] = useState("#0d6efd");
    const [postsMenuItemBorderColor, setPostsMenuItemBorderColor] = useState("4px solid #0d6efd");
    const [aboutMenuItemTextColor, setAboutMenuItemTextColor] = useState("black");
    const [aboutMenuItemBorderColor, setAboutMenuItemBorderColor] = useState("");
    const [friendsMenuItemTextColor, setFriendsMenuItemTextColor] = useState("black");
    const [friendsMenuItemBorderColor, setFriendsMenuItemBorderColor] = useState("");
    const [photosMenuItemTextColor, setPhotosMenuItemTextColor] = useState("black");
    const [photosMenuItemBorderColor, setPhotosMenuItemBorderColor] = useState("");


    let user = null;

    useLayoutEffect(() => {
        handleProfileTabActive()
    }, [profileUser]);

    const handleProfileTabActive = () => {
        setAboutTabActive(false);
        setFriendsTabActive(false);
        setPhotosTabActive(false);
        setProfileTabActive(true);
        resetMenuColors();
        setPostsMenuItemTextColor("#0d6efd")
        setPostsMenuItemBorderColor("4px solid #0d6efd");
    }

    const handleAboutTabActive = () => {
        setProfileTabActive(false);
        setFriendsTabActive(false);
        setPhotosTabActive(false);
        setAboutTabActive(true);
        resetMenuColors();
        setAboutMenuItemTextColor("#0d6efd")
        setAboutMenuItemBorderColor("4px solid #0d6efd");
    }

    const handleFriendsTabActive = () => {
        setAboutTabActive(false);
        setProfileTabActive(false);
        setPhotosTabActive(false);
        setFriendsTabActive(true);
        resetMenuColors();
        setFriendsMenuItemTextColor("#0d6efd")
        setFriendsMenuItemBorderColor("4px solid #0d6efd");
    }

    const handlePhotosTabActive = () => {
        setAboutTabActive(false);
        setProfileTabActive(false);
        setFriendsTabActive(false);
        setPhotosTabActive(true);
        resetMenuColors();
        setPhotosMenuItemTextColor("#0d6efd")
        setPhotosMenuItemBorderColor("4px solid #0d6efd");
    }

    const resetMenuColors = () => {
        setPostsMenuItemTextColor("black")
        setPostsMenuItemBorderColor("");
        setAboutMenuItemTextColor("black")
        setAboutMenuItemBorderColor("");
        setFriendsMenuItemTextColor("black")
        setFriendsMenuItemBorderColor("");
        setPhotosMenuItemTextColor("black")
        setPhotosMenuItemBorderColor("");
    }

    return (
            <div>
                <Col style={{backgroundColor: "white"}}>
                    <Row>
                        <div>
                            <hr style={{ color: "gray", marginTop: 1, marginBottom: 1, border: "solid"}} />
                        </div>
                        <Row style={{paddingTop: 10}}>
                            <Col>
                                <Menu>
                                    <MenuItem
                                        style={{
                                            color: postsMenuItemTextColor,
                                            textAlign: "center",
                                            borderBottom: postsMenuItemBorderColor,
                                        }}
                                        onClick={() => handleProfileTabActive()}>
                                        <span>Posts</span>
                                    </MenuItem>
                                </Menu>
                            </Col>
                            <Col>
                                <Menu>
                                    <MenuItem
                                        style={{
                                            color: aboutMenuItemTextColor,
                                            textAlign: "center",
                                            borderBottom: aboutMenuItemBorderColor,
                                        }}
                                        onClick={() => handleAboutTabActive()}>
                                        About
                                    </MenuItem>
                                </Menu>
                            </Col>
                            <Col>
                                <Menu>
                                    <MenuItem
                                        style={{
                                            color: friendsMenuItemTextColor,
                                            textAlign: "center",
                                            borderBottom: friendsMenuItemBorderColor,
                                        }}
                                        onClick={() => handleFriendsTabActive()}>
                                        Friends
                                    </MenuItem>
                                </Menu>
                            </Col>
                            <Col>
                                <Menu>
                                    <MenuItem
                                        style={{
                                            color: photosMenuItemTextColor,
                                            textAlign: "center",
                                            borderBottom: photosMenuItemBorderColor,
                                        }}
                                        onClick={() => handlePhotosTabActive()}>
                                        Photos
                                    </MenuItem>
                                </Menu>
                            </Col>
                        </Row>

                    </Row>
                </Col>
            </div>
    )

}

export default ProfileNavBar;