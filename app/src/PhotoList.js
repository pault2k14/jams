import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Buffer } from 'buffer';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import {FaEdit, FaTrash} from "react-icons/fa";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";


const PhotoList = () => {
    const [cookies] = useCookies(['XSRF-TOKEN']);

    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [imageDimensions, setImageDimensions] = useState([]);
    const [modal, setModal] = useState(false);
    const toggle = () => {
        console.log("toggle")
        setModal(!modal);
    }

    function Example(args) {


    }
    async function blobToBase64(blob) {
        return new Promise((resolve, _) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    }

    function createImageGalleryData(data) {

        let imageGalleryData = data.map(item => {
            return {
                original: item.image,
                thumbnail: item.thumbnail,
                originalTitle: "Cool picture xyz 123",
                description: "super cala frag olicious expi alo docous"
            }
        })

        return imageGalleryData;
    }

    async function getImages(data) {
        if(!data) {
            return;
        }

        for(let i = 0; i < data.length; i++) {
            await fetch(data[i].apiUrl ).then(async (response)  => {
                let body = await response.blob();
                let base64Blob = await blobToBase64(body);
                data[i].image = base64Blob;
                await fetch(data[i].thumbnailApiUrl).then(async (thumbnailResponse) => {
                    let thumbnailBody = await thumbnailResponse.blob();
                    let thumbnailBase64Blob = await blobToBase64(thumbnailBody);
                    data[i].thumbnail = thumbnailBase64Blob;
                })
            })
        }

        return data;
    };

    useEffect(() => {
        setLoading(true);

        fetch('api/photos')
            .then(response => response.json())
            .then( async (data) => {
                let dataWithImages = await getImages(data)
                setPhotos(dataWithImages);
                let imageGalleryData = createImageGalleryData(dataWithImages)
                setImages(imageGalleryData);
                setLoading(false);
            })

    }, []);

    const remove = async (id) => {
        await fetch(`/api/photo/${id}`, {
            method: 'DELETE',
            headers: {
                'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(() => {
            let updatedPhotos = [...photos].filter(i => i.id !== id);
            setPhotos(updatedPhotos);
        });
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    const photoList = photos.map(photo => {
        return <Row>
            <Col className={"col-4"}><img width="100%" src={photo.image}/></Col>
            <Col className={"col-8"}>
                <Row>
                    <Col className={"col-2"}><strong>Title</strong></Col>
                    <Col className={"col-10"}>{photo.title}</Col>
                </Row>
                <Row>
                    <Col className={"col-2"}><strong>Description</strong></Col>
                    <Col className={"col-10"}>{photo.description}</Col>
                </Row>
                <Row>
                    <Col className={"col-2"}><strong>Year</strong></Col>
                    <Col className={"col-10"}>{photo.yearTaken}</Col>
                </Row>
                <Row>
                    <Col className={"col-2"}><strong>Tags</strong></Col>
                    <Col className={"col-10"}>No Tags</Col>
                </Row>
                <Row>
                    <Col className={"col-2"}><strong>People</strong></Col>
                    <Col className={"col-10"}>No People</Col>
                </Row>
                <Row>
                    <ButtonGroup style={{marginTop: 20}}>
                        <a href={"/photos/" + photo.id} style={{marginRight: 20}}>
                            <FaEdit  color="gray" size="25"/>
                        </a>
                        <FaTrash color="gray" onClick={() => remove(photo.id)} size="25"/>
                    </ButtonGroup>
                </Row>
            </Col>
        </Row>
    });

    // {photoList}

    return (
        <div>
            <AppNavbar/>

            <Container fluid>
                <div className="float-end">
                    <Button color="success" tag={Link} to="/photos/new">Add Photo</Button>
                </div>
                <h3>My Photos</h3>
                <div>
                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                        <ModalBody>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={toggle}>
                                Do Something
                            </Button>{' '}
                            <Button color="secondary" onClick={toggle}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <ImageGallery items={images} onClick={() => {
                    toggle();
                }}/>
            </Container>
        </div>
    );
};

export default PhotoList;