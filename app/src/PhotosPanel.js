import {getStoredPhotosRepliesByPhotoIdAndUserId, usePhotos} from "./context/PhotosProvider";
import {Col, Container, Modal, ModalBody, Row} from "reactstrap";
import React, {useEffect, useRef, useState} from "react";
import {Image} from "react-bootstrap";
import SinglePost from "./SinglePost";


const PhotosPanel = ({currentUser, profileUser, getStoredSinglePostByPostId, userProfileCustomUpdateOnPhotoLike, userProfileCustomUpdateOnPhotoReply,
                         userProfileCustomUpdateOnPhotoShare }) => {

    const {photosObject, photoRepliesObject, getPhotosByUserId,
        setStoredPhotosByUserId, getStoredSinglePhotoPostReplyByPostId,
        setStoredPhotoRepliesByPhotoId, addStoredPhotoRepliesByPhotoId} = usePhotos();
    const {photos, setPhotos} = photosObject;
    const [isSinglePhotoOpen, setIsSinglePhotoOpen] = useState(false);
    const [viewedReplyIds, setViewedReplyIds] = useState([])
    const [selectedReply, setSelectedReply] = useState(null);
    const [modal, setModal] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const randomPhotosForPhotosPanel = useRef([])
    const [randomPhotoIdsState, setRandomPhotoIdsState] = useState([])
    let randomNumbersToGenerate = photos.length >= 9 ? 9 : photos.length;

    useEffect(() => {
        const fetchData = async () => {
            if(selectedPhoto) {
                addStoredPhotoRepliesByPhotoId(selectedPhoto)
            }

        };

        fetchData();
    }, [selectedPhoto]);

    useEffect(() => {
        const fetchData = async () => {
            randomPhotosForPhotosPanel.current = initialRandomPhotoIds();
        };

        fetchData();
    }, [photos]);

    useEffect(() => {
        const fetchData = async () => {
            if(randomPhotosForPhotosPanel.current.length === randomNumbersToGenerate) {
                setRandomPhotoIdsState([...randomPhotosForPhotosPanel.current])
            }
        };

        fetchData();
    }, [randomPhotosForPhotosPanel.current, randomNumbersToGenerate]);


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

    const onShowSinglePhoto = (photo) => {
        setSelectedPhoto(photo);
        toggleShowSinglePhoto();
    }

    const getSelectedPhotoFromState = () => {
        return photos.find(photo => selectedPhoto.id === photo.id);
    }

    const customPhotosPanelUpdateOnReply = (photoToReplyTo, newReplyContent) => {
        if(!viewedReplyIds.includes(photoToReplyTo.id)) {
            let updatedViewedReplyIds = [...viewedReplyIds];
            updatedViewedReplyIds.push(photoToReplyTo.id);
            setViewedReplyIds(updatedViewedReplyIds)
        }

        userProfileCustomUpdateOnPhotoReply(photoToReplyTo, newReplyContent)
    }


    const initialRandomPhotoIds = () => {
        let tempRandomPhotoIds = [];

        let randomNumbers = [];
        let createdNewRandomNumber = false;

        for(let i = 0; i < randomNumbersToGenerate; i++) {

            while(!createdNewRandomNumber) {
                let randNum = Math.floor(Math.random() * randomNumbersToGenerate);
                if(!randomNumbers.includes(randNum)) {
                    randomNumbers.push(randNum);
                    createdNewRandomNumber = true;
                }
            }

            createdNewRandomNumber = false;
        }

        for(let i = 0; i < randomNumbers.length; i++) {
            let randomPhoto = photos[randomNumbers[i]];
            tempRandomPhotoIds.push(randomPhoto.id);
        }

        return tempRandomPhotoIds;
    }

    return <div style={{marginRight: 0, marginLeft: 0}} className={"container"}>
        { selectedPhoto &&
            <div>
                <Modal isOpen={isSinglePhotoOpen}
                       toggle={toggleShowSinglePhoto}
                       className={"SinglePostModal"}>
                    <ModalBody>
                        <SinglePost
                            profileUser={profileUser}
                            currentUser={currentUser}
                            post={getSelectedPhotoFromState()}
                            getStoredSinglePostByPostId={getStoredSinglePostByPostId}
                            customUpdateOnLike={userProfileCustomUpdateOnPhotoLike}
                            customUpdateOnReply={customPhotosPanelUpdateOnReply}
                            customUpdateOnShare={userProfileCustomUpdateOnPhotoShare}
                            displaySinglePhoto={true}
                            modal={true}
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
        <div className={"row"}>
            <div className={"col"}>
                <h4>
                    Photos
                </h4>
            </div>
        </div>
        <div
            style={{
                marginLeft: 0,
                marginRight: 0}}
            className={"row no-gutters"}>
            {randomPhotoIdsState.length === randomNumbersToGenerate
                && photos.map((photo, index) => {
                    if(randomPhotosForPhotosPanel.current.some(photoId => photo.id === photoId)) {
                        let photoData = require("./data/photos"+ photo.thumbnailUrl);
                        return <div
                            className={"no-gutters col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4"}
                            style={{paddingRight: 0, paddingLeft: 0}}
                            key={photo.id}>
                            <Image
                                height="130px"
                                width="130px"
                                src={photoData}
                                thumbnail={true}
                                onClick={() => onShowSinglePhoto(photo)}
                            />
                        </div>
                    }

                return null;
            })}
        </div>
    </div>
}

export default PhotosPanel;