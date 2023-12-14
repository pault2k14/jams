import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const PhotoEdit = () => {
    const [cookies] = useCookies(['XSRF-TOKEN']);
    const [file, setFile] = useState();

    function handleFileChange(event) {
        setFile(event.target.files[0]);
    }

    function handleFileSubmit(event) {
        event.preventDefault()
        const url = 'http://localhost:3000/uploadFile';
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        axios.post(url, formData, config).then((response) => {
            console.log(response.data);
        });

    }

    const initialFormState = {
        title: '',
        description: '',
        yearTaken: '',
        file: ''
    };
    const [photo, setPhoto] = useState(initialFormState);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id !== 'new') {
            fetch(`/api/photo/${id}`)
                .then(response => response.json())
                .then(data => setPhoto(data));
        }
    }, [id, setPhoto]);

    const handleChange = (event) => {
        const { name, value, files } = event.target
        console.log("name: " + name);
        console.dir("value: " + value)
        console.dir("files: " + files)

        if(files) {
            console.log("File change")
            setPhoto({ ...photo, [name]: files[0] })
        } else {
            console.log("Other field change")
            setPhoto({ ...photo, [name]: value })
        }

        //setPhoto({ ...photo, [name]: value })

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        console.log("file", photo.file);
        formData.append('file', photo.file);
        formData.append('title', photo.title);
        formData.append('description', photo.description);
        formData.append('yearTaken', photo.yearTaken);

        await fetch(`/api/photo${photo.id ? `/${photo.id}` : ''}`, {
            method: photo.id ? 'PUT' : 'POST',
            headers: {
                'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
                'Accept': 'application/json',
                //'Content-Type': 'multipart/form-data'
            },
            body: formData,
            credentials: 'include'
        });
        setPhoto(initialFormState);
        navigate('/photos');
    }

    const title = <h2>{photo.id ? 'Edit Photo' : 'Add Photo'}</h2>;
    // TODO: Allow user to upload file or set hyperlink d

    return (<div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="file">File</Label>
                        <Input type="file" name="file" id="file"
                               onChange={handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type="text" name="title" id="title" value={photo.title || ''}
                               onChange={handleChange} autoComplete="title"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input type="text" name="description" id="description" value={photo.description || ''}
                               onChange={handleChange} autoComplete="description"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="yearTaken">Year</Label>
                        <Input type="text" name="yearTaken" id="yearTaken" value={photo.yearTaken || ''}
                               onChange={handleChange} autoComplete="year"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/photos">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )
};

export default PhotoEdit;