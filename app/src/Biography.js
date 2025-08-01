import React, {useState} from "react";
import {Button, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import {DeleteWorkplace, HighSchoolForm, selectableYears} from "./WorkAndEducation";
import {updateAboutBiography, updateAboutHighSchools} from "./context/aboutUtils";
import {setStoredAboutByUserId} from "./context/AboutProvider";
import AboutItem from "./AboutItem";
import {FaBriefcase, FaPlus} from "react-icons/fa";
import {FaCircleInfo} from "react-icons/fa6";


const Biography = ({currentUserId, userId, biography, about, setAbout}) => {
    //const [bio, setBio] = useState(about.biography);
    const [showCreateBiography, setShowCreateBiography] = useState(false);
    const [showEditBiography, setShowEditBiography] = useState(false);

    const BiographyForm = ({biography, setBiography, modifyBiography, closeOperation}) => {
        const handleChangeBiography = event => {
            setBiography(event.target.value);
        }

        const handleSubmit = async (event) => {
            let biographyToSave = event.target.biography.value;

            event.preventDefault();

            modifyBiography(biographyToSave);
        }

        return <div>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Row>
                        <Row style={{padding: 10}}>
                            <Col>
                                <Input type="textarea" name="biography" id="biography" value={biography || ''}
                                       placeholder="Describe who you are" onChange={handleChangeBiography} autoComplete="biography"/>
                            </Col>
                        </Row>
                    </Row>
                </FormGroup>
                <FormGroup className="d-flex justify-content-end">
                    <Row>
                        <Col>
                            <Button type="Cancel" onClick={() => closeOperation()} style={{padding: 10}} color="normal">Cancel</Button>
                            <Button type="Post" style={{padding: 10}} color="primary">Save</Button>
                        </Col>
                    </Row>
                </FormGroup>
            </Form>
        </div>
    }

    const CreateBiography = ({}) => {
        const [newBiography, setNewBiography] = useState(null);

        const modifyBiography = (updatedBiography) => {
            let biographyToUpdate = {
                biography: updatedBiography
            }

            let updatedAboutObject = updateAboutBiography(about, {...biographyToUpdate})
            setAbout({...updatedAboutObject})
            setShowCreateBiography(false);
            setStoredAboutByUserId(userId, updatedAboutObject)
        }

        const closeOperation = () => {
            setShowCreateBiography(false);
        }

        return <BiographyForm
            biography={newBiography}
            setBiography={setNewBiography}
            modifyBiography={modifyBiography}
            closeOperation={closeOperation}
        />
    }

    const EditBiography = ({biographyToUpdate}) => {
        const [newBiography, setNewBiography] = useState(biographyToUpdate);

        const modifyBiography = (updatedBiography) => {
            let biographyToUpdate = {
                biography: updatedBiography
            }
            let updatedAboutObject = updateAboutBiography(about, {...biographyToUpdate})
            setAbout({...updatedAboutObject})
            setShowEditBiography(false);
            setStoredAboutByUserId(userId, updatedAboutObject)
        }

        const closeOperation = () => {
            setShowEditBiography(false);
        }

        return <BiographyForm
            biography={newBiography}
            setBiography={setNewBiography}
            modifyBiography={modifyBiography}
            closeOperation={closeOperation}
        />
    }

    const deleteBiographgy = () => {
        let biographyToDelete = {
            biography: null
        }

        let updatedAboutObject = updateAboutBiography(about, biographyToDelete)
        setAbout(updatedAboutObject)
        setStoredAboutByUserId(userId, updatedAboutObject)
    }

    const BiographySection = ({}) => {

        let displayAddBiography = !showCreateBiography && !biography.biography
            && currentUserId === userId &&
            <span style={{color: "#0d6efd"}}>
                <AboutItem
                    userId={userId}
                    currentUserId={currentUserId}
                    icon={<FaPlus/>}
                    itemLineOne="Add intro"
                    itemLineTwo={null}
                    itemLineThree={null}
                    addFunction={() => setShowCreateBiography(true)}
                    deleteFunction={null}
                    editFunction={null}
                />
            </span>


        let displayCreateBiographyForm = showCreateBiography &&
            currentUserId === userId &&
            <CreateBiography/>

        let displayEditBiographyForm = showEditBiography &&
            currentUserId === userId &&
            <EditBiography biographyToUpdate={biography.biography}/>


        let displayBiography = biography.biography && !showEditBiography &&
            <AboutItem
                userId={userId}
                currentUserId={currentUserId}
                icon={<FaCircleInfo/>}
                itemLineOne={biography.biography}
                itemLineTwo={null}
                itemLineThree={null}
                addFunction={null}
                deleteFunction={() => deleteBiographgy()}
                editFunction={() => setShowEditBiography(true)}
            />



        return <Row>
            <Row>
                <h4>
                    Intro
                </h4>
            </Row>
            <Col>
                {displayAddBiography}
                {displayCreateBiographyForm}
                {displayEditBiographyForm}
                {displayBiography}
            </Col>
        </Row>
    }

    return <BiographySection/>
}

export default Biography;