import {Col, Container, Row} from "reactstrap";
import {FaArrowLeft} from "react-icons/fa";
import DisplayPost from "./DisplayPost";
import RecursivePhotoList from "./RecursivePhotoList";
import React from "react";
import './SinglePhoto.css'

const SinglePhoto = ({currentUser, profileUser, selectedPhoto, selectedPhotoReplies, customUpdateOnPhotoShare,
                         customUpdateOnPhotoLike, customUpdateOnPhotoReply, customUpdateOnShare,
                         customUpdateOnLike, customUpdateOnReply, onHideSinglePhoto}) => {
    return <div>
        <Row>
            <Col>
                <FaArrowLeft
                    size={50}
                    style={{padding: 10}}
                    onClick={() => onHideSinglePhoto()}/>
            </Col>
        </Row>
        <Row>
            <img
                src={selectedPhoto.data}
                style={{maxWidth: "100%", padding: 10}}
            />
        </Row>
        <Row>
            <div style={{
                //backgroundColor: "whitesmoke"
            }} key={selectedPhoto.id}>
                <DisplayPost
                    post={selectedPhoto}
                    currentUser={currentUser}
                    profileUser={profileUser}
                    customUpdateOnShare={customUpdateOnPhotoShare}
                    customUpdateOnLike={customUpdateOnPhotoLike}
                    customUpdateOnReply={customUpdateOnPhotoReply}
                    displayPhotos={false}
                />
                { selectedPhoto.commentsPostIds.length > 0
                    ?
                    <RecursivePhotoList
                        currentUser={currentUser}
                        profileUser={profileUser}
                        selectedPhoto={selectedPhoto}
                        selectedPhotoReplies={selectedPhotoReplies}
                        customUpdateOnShare={customUpdateOnShare}
                        customUpdateOnLike={customUpdateOnLike}
                        customUpdateOnReply={customUpdateOnReply}
                        masterPhotosList={selectedPhotoReplies}
                        isReply={false}
                        displayPhotos={false}
                    />
                    :
                    ''
                }
            </div>
        </Row>
    </div>
}

export default SinglePhoto;