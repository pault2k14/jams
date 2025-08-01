import {Col, Row} from "reactstrap";
import {Link, useNavigate} from "react-router-dom";
import GeneratedProfileImage from "./GeneratedProfileImage";
import React from "react";
import FriendMouseOver from "./FriendMouseOver";


const DisplayPostContent = ({currentUser, profileUser, postUser, post, displaySinglePhoto, toggleShowSinglePost}) => {
    const navigate = useNavigate()
    let postDateTime = new Date(post.timestamp);
    let postDateString = postDateTime.toLocaleDateString('en-US',
        { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + " at " + postDateTime.toLocaleTimeString();
    let userImage = require("./data/images/" + postUser.userId + "/user-image.jpg");
    let photoData = null

    const navigateToProfile = (userToNavigateTo) => {
        navigate('/friends/' + userToNavigateTo.userId)
    }


    if(post.url && displaySinglePhoto) {
        photoData = require("./data/photos"+ post.url);
    }

    return <>
        { post.url && photoData && displaySinglePhoto &&
            <Row style={{marginBottom: 25}}>
                <img src={photoData}/>
            </Row>
        }
        <Row onClick={() => navigateToProfile(post)}>
            <FriendMouseOver currentUser={currentUser} profileUser={profileUser} friend={postUser}>
                <div className={"d-flex"}>
                    <img
                        height="25px"
                        width="25px"
                        style={{borderRadius: "50%", marginRight: 10}}
                        src={userImage}
                    />
                    <h5>{postUser.name}</h5>
                </div>
            </FriendMouseOver>
        </Row>
        <Row style={{paddingTop: 5}}>
            <h6>
                {postDateString}
            </h6>
        </Row>
        <Row style={{paddingTop: 5}}>
            <p>
                {post.content}
            </p>
        </Row>
        { post.data && !displaySinglePhoto &&
            <Row>
                <img src={post.data}/>
            </Row>
        }
    </>
}

export default DisplayPostContent;