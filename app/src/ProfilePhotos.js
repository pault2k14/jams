
import React, {useEffect, useRef, useState} from 'react';
import {Button, Col, Container, Modal, ModalBody, Row} from "reactstrap";
import {Menu, MenuItem} from "react-pro-sidebar";
import {
    getStoredPhotosByUserId, getStoredPhotosRepliesByPhotoIdAndUserId,
    getStoredPhotosRepliesByPhotoReplyIdAndUserId, setStoredPhotosByUserId, setStoredPhotosRepliesByPhotoIdAndUserId,
    setStoredPhotosRepliesByPhotoReplyIdAndUserId,
    usePhotos
} from "./context/PhotosProvider";
import SinglePhoto from "./SinglePhoto";
import {getStoredPostsByUserId, setStoredPostsByUserId, usePost} from "./context/PostProvider";
import {
    customUpdateOnPhotoLike, customUpdateOnPhotoReply,
    customUpdateOnPhotoShare,
    customUpdatePhotoReplyOnLike,
    customUpdatePhotoReplyOnReply,
    customUpdatePhotoReplyOnShare
} from "./context/photoUtils";
import {Image} from "react-bootstrap";
import SinglePost from "./SinglePost";

const ProfilePhotos = ({currentUser, profileUser, posts, setPosts}) => {
    const {photosObject, photoRepliesObject, getPhotosByUserId,
        setStoredPhotosByUserId, setStoredPhotoRepliesByPhotoId, addStoredPhotoRepliesByPhotoId} = usePhotos();
    const {photos, setPhotos} = photosObject;
    const {photoReplies, setPhotoReplies} = photoRepliesObject;
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [isSinglePhotoOpen, setIsSinglePhotoOpen] = useState(false);
    const [viewedReplyIds, setViewedReplyIds] = useState([])
    const [selectedReply, setSelectedReply] = useState(null);
    const [modal, setModal] = useState(false);


    const toggleShowSinglePhoto = () => {
        if(selectedPhoto) {
            setSelectedPhoto(null);
        }

        if(selectedReply) {
            setSelectedReply(null);
        }

        setViewedReplyIds([]);
        setModal(!modal);
        setIsSinglePhotoOpen(!isSinglePhotoOpen)
    };

    useEffect(() => {
        const fetchData = async () => {
            setStoredPhotosByUserId(profileUser.userId);
        };

        fetchData();
    }, [profileUser]);

    const getSelectedPhotoFromState = () => {
        return photos.filter(photo => selectedPhoto.id === photo.id)[0];
    }

    const userProfileCustomUpdateOnPhotoShare = (photoToShare, newContentToShare) => {

        if(photos.some(photo => photo.id === photoToShare.id)) {
            customUpdateOnPhotoShare(photoToShare, newContentToShare, currentUser, setPosts);
        } else if(photoReplies.some(photo => photo.id === photoToShare.id)) {
            customUpdatePhotoReplyOnShare(photoToShare, newContentToShare, currentUser, setPosts);
        }
    }

    const userProfileCustomUpdateOnPhotoLike = (photoToLike, currentUserId) => {
        if(photos.some(photo => photo.id === photoToLike.id)) {
            customUpdateOnPhotoLike(photoToLike, currentUser, profileUser,  setPhotos);
        } else if(photoReplies.some(photo => photo.id === photoToLike.id)) {
            customUpdatePhotoReplyOnLike(photoToLike, currentUser, setStoredPhotoRepliesByPhotoId);
        }
    }

    const userProfileCustomUpdateOnPhotoReply = (photoToReplyTo, newReplyContent) => {
        if(!viewedReplyIds.includes(photoToReplyTo.id)) {
            let updatedViewedReplyIds = [...viewedReplyIds];
            updatedViewedReplyIds.push(photoToReplyTo.id);
            setViewedReplyIds(updatedViewedReplyIds)
        }

        if(photos.some(photo => photo.id === photoToReplyTo.id)) {
            customUpdateOnPhotoReply(photoToReplyTo, newReplyContent, currentUser,
                profileUser, setPhotos, setStoredPhotoRepliesByPhotoId);
        } else if(photoReplies.some(photo => photo.id === photoToReplyTo.id)) {
            customUpdatePhotoReplyOnReply(photoToReplyTo, newReplyContent, currentUser,
                setStoredPhotoRepliesByPhotoId);
        }
    }

    const onShowSinglePhoto = (photo, photoReplies) => {
        setSelectedPhoto(photo);
        toggleShowSinglePhoto();
    }

    return (
        <div>
            <Container fluid style={{
                backgroundColor: "white",
                padding: 10,
                marginBottom: 25}}>
                { selectedPhoto &&
                    <div>
                        <Modal
                            isOpen={isSinglePhotoOpen}
                            scrollable={true}
                            toggle={toggleShowSinglePhoto}
                            style={{maxWidth: "66%"}}>
                            <ModalBody>
                                <SinglePost
                                    profileUser={profileUser}
                                    currentUser={currentUser}
                                    post={getSelectedPhotoFromState()}
                                    getStoredSinglePostByPostId={null}
                                    customUpdateOnLike={userProfileCustomUpdateOnPhotoLike}
                                    customUpdateOnReply={userProfileCustomUpdateOnPhotoReply}
                                    customUpdateOnShare={userProfileCustomUpdateOnPhotoShare}
                                    displaySinglePhoto={true}
                                    modal={modal}
                                    selectedPost={selectedPhoto}
                                    setSelectedPost={setSelectedPhoto}
                                    viewedReplyIds={viewedReplyIds}
                                    setViewedReplyIds={setViewedReplyIds}
                                    selectedReply={selectedReply}
                                    setSelectedReply={setSelectedReply}
                                    toggleShowSinglePost={toggleShowSinglePhoto}
                                />
                            </ModalBody>
                        </Modal>
                    </div>
                }
                <Row>
                    <Row>
                        <Col xs={10}>
                            <h3>Photos</h3>
                        </Col>
                        <Col xs={2}>
                            <Button color="primary">Add Photo</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Menu>
                                <MenuItem>Photos</MenuItem>
                            </Menu>
                        </Col>
                        <Col>
                            <Menu>
                                <MenuItem>Albums</MenuItem>
                            </Menu>
                        </Col>
                    </Row>
                </Row>
                <Row xs={1} sm={2} md={3} lg={4} xl={5} xxl={5}>
                    {
                        photos &&
                            photos.map(photo => {
                                let photoData = require("./data/photos"+ photo.thumbnailUrl);

                                return <Col key={photo.id}>
                                    <img
                                        src={photoData}
                                        onClick={() => onShowSinglePhoto(photo)}
                                        style={{padding: 10}}
                                        height={207}
                                        width={207}/>
                                </Col>})
                    }
                </Row>
            </Container>
        </div>
    );

}

export default ProfilePhotos