import {Button, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import React, {useEffect, useState} from "react";
import {updateAboutColleges, updateAboutHighSchools, updateAboutWork} from "./context/aboutUtils";
import {
    getCurrentEmployer,
    getFormerEmployerString,
    getHighestLevelOfEducationString,
    setStoredAboutByUserId
} from "./context/AboutProvider";
import {FaBriefcase, FaEdit, FaGraduationCap, FaPlus, FaSchool, FaTrash} from "react-icons/fa";
import About from "./About";
import AboutItem from "./AboutItem";


export const selectableYears = () => {
    let selectArray = [];

    for(let i = new Date().getFullYear(); i >= 1900; i--) {
        selectArray.push(<option key={i}>{i}</option>)
    }

    return selectArray;
}

export const HighSchoolForm = ({id, school, setSchool, fromYear, setFromYear, toYear, setToYear,
                            graduated, setGraduated, description, setDescription,
                            modifyHighSchoolArray, closeOperation}) => {

    const handleChangeSchool = event => {
        setSchool(event.target.value);
    }

    const handleChangeFromYear = event => {
        setFromYear(event.target.value);
    }

    const handleChangeToYear = event => {
        setToYear(event.target.value);
    }

    const handleChangeDescription = event => {
        setDescription(event.target.value);
    }

    const handleChangeGraduated = event => {
        setGraduated(!graduated);
    }

    const handleSubmit = async (event) => {
        let schoolToSave = event.target.school.value;
        let fromYearToSave = event.target.fromYear.value;
        let toYearToSave = event.target.toYear.value;
        let descriptionToSave = event.target.description.value;
        let graduatedToSave = event.target.graduated.checked;

        event.preventDefault();

        let highSchool = {
            id: id,
            graduated: graduatedToSave,
            school: schoolToSave,
            startClassYear: fromYearToSave,
            description: descriptionToSave,
            graduatingClassYear: toYearToSave
        }

        modifyHighSchoolArray(highSchool);
    }

    return <div>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Row>
                    <Row style={{padding: 10}}>
                        <Col>
                            <Input type="text" name="school" id="school" value={school || ''}
                                   placeholder="School" onChange={handleChangeSchool} autoComplete="school"/>
                        </Col>
                    </Row>
                    <Row xs={2}>
                        <Col>
                            <Label>From</Label>
                            <Input type="select" name="fromYear" id="fromYear" value={fromYear || ''} onChange={handleChangeFromYear}>
                                {selectableYears()}
                            </Input>
                        </Col>
                        <Col>
                            <Label>To</Label>
                            <Input type="select" name="toYear" id="toYear" value={toYear || ''} onChange={handleChangeToYear}>
                                {selectableYears()}
                            </Input>
                        </Col>
                    </Row>
                    <Row style={{padding: 10}}>
                        <Col>
                            <Input
                                type="checkbox"
                                name="graduated"
                                id="graduated"
                                checked={graduated}
                                onChange={handleChangeGraduated}/>
                            <Label style={{paddingLeft: 10}}>Graduated</Label>
                        </Col>
                    </Row>
                    <Row style={{padding: 10}}>
                        <Col>
                            <Input type="textarea" name="description" id="description" value={description || ''}
                                   placeholder="Description" onChange={handleChangeDescription} autoComplete="description"/>
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

export const CreateHighSchool = ({userId, highSchools, about, setAbout, setShowCreateHighSchool}) => {
    const [newSchool, setNewSchool] = useState(null);
    const [newFromYear, setNewFromYear] = useState(null);
    const [newToYear, setNewToYear] = useState(null);
    const [newGraduated, setNewGraduated] = useState(true);
    const [newDescription, setNewDescription] = useState(null);
    let timestamp = new Date().getTime();

    const modifyHighSchoolArray = (highSchool) => {
        let highSchoolArray = [...highSchools];
        highSchoolArray.push(highSchool);

        let updatedAboutObject = updateAboutHighSchools(about,[...highSchoolArray])
        setAbout(updatedAboutObject)
        setShowCreateHighSchool(false);
        setStoredAboutByUserId(userId, updatedAboutObject)
    }

    const closeOperation = () => {
        setShowCreateHighSchool(false);
    }

    return <HighSchoolForm
        id={timestamp}
        school={newSchool}
        setSchool={setNewSchool}
        description={newDescription}
        setDescription={setNewDescription}
        fromYear={newFromYear}
        setFromYear={setNewFromYear}
        toYear={newToYear}
        setToYear={setNewToYear}
        graduated={newGraduated}
        setGraduated={setNewGraduated}
        modifyHighSchoolArray={modifyHighSchoolArray}
        closeOperation={closeOperation}
    />
}

export const EditHighSchool = ({userId, id, school, fromYear, toYear, graduated, description,
                            highSchools, about, setAbout, setShowEditHighSchool, setEditHighSchoolId}) => {

    const [updatedSchool, setUpdatedSchool] = useState(school);
    const [updatedFromYear, setUpdatedFromYear] = useState(fromYear);
    const [updatedToYear, setUpdatedToYear] = useState(toYear);
    const [updatedGraduated, setUpdatedGraduated] = useState(graduated);
    const [updatedDescription, setUpdatedDescription] = useState(description);

    const modifyHighSchoolArray = (updatedHighSchool) => {
        let highSchoolArray = [...highSchools];

        highSchoolArray = highSchoolArray.map(highSchool => {
            if(highSchool.id === updatedHighSchool.id) {
                return updatedHighSchool;
            }
            return highSchool;
        });

        let updatedAboutObject = updateAboutHighSchools(about,[...highSchoolArray])
        setAbout(updatedAboutObject)
        setShowEditHighSchool(false);
        setEditHighSchoolId(null);
        setStoredAboutByUserId(userId, updatedAboutObject)
    }

    const closeOperation = () => {
        setShowEditHighSchool(false);
        setEditHighSchoolId(null);
    }

    return <HighSchoolForm
        id={id}
        school={updatedSchool}
        setSchool={setUpdatedSchool}
        description={updatedDescription}
        setDescription={setUpdatedDescription}
        fromYear={updatedFromYear}
        setFromYear={setUpdatedFromYear}
        toYear={updatedToYear}
        setToYear={setUpdatedToYear}
        graduated={updatedGraduated}
        setGraduated={setUpdatedGraduated}
        modifyHighSchoolArray={modifyHighSchoolArray}
        closeOperation={closeOperation}
    />
}

export const DeleteHighSchool = (userId, highSchoolId, highSchools, about, setAbout) => {
    let filteredHighSchool = highSchools.filter(school => school.id !== highSchoolId);
    let updatedAboutObject = updateAboutHighSchools(about, [...filteredHighSchool]);
    setAbout(updatedAboutObject);
    setStoredAboutByUserId(userId, updatedAboutObject);
}

export const CollegeForm = ({id, school, setSchool, fromYear, setFromYear, toYear, setToYear,
                         graduated, setGraduated, description, setDescription,
                         graduateSchool, setGraduateSchool, degree, setDegree,
                         concentrationOne, setConcentrationOne, concentrationTwo, setConcentrationTwo,
                         concentrationThree, setConcentrationThree, modifyCollegeArray, closeOperation}) => {

    const handleChangeSchool = event => {
        setSchool(event.target.value);
    }

    const handleChangeFromYear = event => {
        setFromYear(event.target.value);
    }

    const handleChangeToYear = event => {
        setToYear(event.target.value);
    }

    const handleChangeDescription = event => {
        setDescription(event.target.value);
    }

    const handleChangeGraduated = event => {
        setGraduated(!graduated);
    }

    const handleChangeGraduateSchool = event => {
        setGraduateSchool(!graduateSchool);
    }

    const handleChangeDegree = event => {
        setDegree(event.target.value);
    };

    const handleChangeConcentrationOne = event => {
        setConcentrationOne(event.target.value);
    };

    const handleChangeConcentrationTwo = event => {
        setConcentrationTwo(event.target.value);
    };

    const handleChangeConcentrationThree = event => {
        setConcentrationThree(event.target.value);
    };

    const handleSubmit = async (event) => {
        let schoolToSave = event.target.school.value;
        let fromYearToSave = event.target.fromYear.value;
        let toYearToSave = event.target.toYear.value;
        let descriptionToSave = event.target.description.value;
        let graduatedToSave = event.target.graduated.checked;
        let graduateSchoolToSave = event.target.graduateSchool.checked;
        let degreeToSave = event.target.degree.value;
        let concentrationOne = event.target.concentrationOne.value;
        let concentrationTwo = event.target.concentrationTwo.value;
        let concentrationThree = event.target.concentrationThree.value;

        event.preventDefault();

        let college = {
            id: id,
            degree: degreeToSave,
            concentrationOne: concentrationOne,
            concentrationTwo: concentrationTwo,
            concentationThree: concentrationThree,
            graduated: graduatedToSave,
            graduateSchool: graduateSchoolToSave,
            school: schoolToSave,
            startClassYear: fromYearToSave,
            description: descriptionToSave,
            graduatingClassYear: toYearToSave
        }

        console.log("college");
        console.dir(college);

        modifyCollegeArray(college)
    }

    return <div>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Row>
                    <Row style={{padding: 10}}>
                        <Col>
                            <Input type="text" name="school" id="school" value={school || ''}
                                   placeholder="School" onChange={handleChangeSchool} autoComplete="school"/>
                        </Col>
                    </Row>
                    <Row xs={2}>
                        <Col>
                            <Label>From</Label>
                            <Input type="select" name="fromYear" id="fromYear" value={fromYear || ''} onChange={handleChangeFromYear}>
                                {selectableYears()}
                            </Input>
                        </Col>
                        <Col>
                            <Label>To</Label>
                            <Input type="select" name="toYear" id="toYear" value={toYear || ''} onChange={handleChangeToYear}>
                                {selectableYears()}
                            </Input>
                        </Col>
                    </Row>
                    <Row style={{padding: 10}}>
                        <Col>
                            <Input
                                type="checkbox"
                                name="graduated"
                                id="graduated"
                                checked={graduated}
                                onChange={handleChangeGraduated}/>
                            <Label style={{paddingLeft: 10}}>Graduated</Label>
                        </Col>
                    </Row>
                    <Row style={{padding: 10}}>
                        <Col>
                            <Input type="textarea" name="description" id="description" value={description || ''}
                                   placeholder="Description" onChange={handleChangeDescription} autoComplete="description"/>
                        </Col>
                    </Row>
                    <Row style={{padding: 5}}>
                        <Label>Concentrations</Label>
                        <Col>
                            <Input type="text" name="concentrationOne" id="concentrationOne" value={concentrationOne || ''}
                                   placeholder="Concentration" onChange={handleChangeConcentrationOne} autoComplete="concentrationOne"/>
                        </Col>
                    </Row>
                    <Row style={{padding: 5}}>
                        <Col>
                            <Input type="text" name="concentrationTwo" id="concentrationTwo" value={concentrationTwo || ''}
                                   placeholder="Concentration" onChange={handleChangeConcentrationTwo} autoComplete="concentrationTwo"/>
                        </Col>
                    </Row>
                    <Row style={{padding: 5}}>
                        <Col>
                            <Input type="text" name="concentrationThree" id="concentrationThree" value={concentrationThree || ''}
                                   placeholder="Concentration" onChange={handleChangeConcentrationThree} autoComplete="concentrationThree"/>
                        </Col>
                    </Row>
                    <Row style={{padding: 10}}>
                        <Col>
                            <Input
                                type="checkbox"
                                name="graduateSchool"
                                id="ngraduateSchool"
                                checked={graduateSchool}
                                onChange={handleChangeGraduateSchool}/>
                            <Label style={{paddingLeft: 10}}>Graduate School</Label>
                        </Col>
                    </Row>
                    <Row style={{padding: 10}}>
                        <Col>
                            <Input type="text" name="degree" id="degree" value={degree || ''}
                                   placeholder="Degree" onChange={handleChangeDegree} autoComplete="degree"/>
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

export const CreateCollege = ({userId, colleges, about, setAbout, setShowCreateCollege}) => {
    const [newSchool, setNewSchool] = useState(null);
    const [newFromYear, setNewFromYear] = useState(null);
    const [newToYear, setNewToYear] = useState(null);
    const [newGraduated, setNewGraduated] = useState(true);
    const [newDescription, setNewDescription] = useState(null);
    const [newGraduateSchool, setNewGraduateSchool] = useState(false);
    const [newDegree, setNewDegree] = useState(null);
    const [newConcentrationOne, setNewConcentrationOne] = useState(null);
    const [newConcentrationTwo, setNewConcentrationTwo] = useState(null);
    const [newConcentrationThree, setNewConcentrationThree] = useState(null);
    let timestamp = new Date().getTime();

    const modifyCollegeArray = (college) => {
        let collegeArray = [...colleges];
        collegeArray.push(college);

        let updatedAboutObject = updateAboutColleges(about,[...collegeArray])
        setAbout(updatedAboutObject)
        setShowCreateCollege(false);
        setStoredAboutByUserId(userId, updatedAboutObject)
    }

    const closeOperation = () => {
        setShowCreateCollege(false);
    }

    return <CollegeForm
        id={timestamp}
        school={newSchool}
        setSchool={setNewSchool}
        description={newDescription}
        setDescription={setNewDescription}
        fromYear={newFromYear}
        setFromYear={setNewFromYear}
        toYear={newToYear}
        setToYear={setNewToYear}
        concentrationOne={newConcentrationOne}
        setConcentrationOne={setNewConcentrationOne}
        concentrationTwo={newConcentrationTwo}
        setConcentrationTwo={setNewConcentrationTwo}
        concentrationThree={newConcentrationThree}
        setConcentrationThree={setNewConcentrationThree}
        degree={newDegree}
        setDegree={setNewDegree}
        graduated={newGraduated}
        setGraduated={setNewGraduated}
        graduateSchool={newGraduateSchool}
        setGraduateSchool={setNewGraduateSchool}
        modifyCollegeArray={modifyCollegeArray}
        closeOperation={closeOperation}
    />
}

export const EditCollege = ({userId, id, school, fromYear, toYear, graduated, description,
                         graduateSchool, degree, concentrationOne, concentrationTwo,
                         concentrationThree, colleges, about, setAbout, setShowEditCollege, setEditCollegeId}) => {

    const [updatedSchool, setUpdatedSchool] = useState(school);
    const [updatedFromYear, setUpdatedFromYear] = useState(fromYear);
    const [updatedToYear, setUpdatedToYear] = useState(toYear);
    const [updatedGraduated, setUpdatedGraduated] = useState(graduated);
    const [updatedDescription, setUpdatedDescription] = useState(description);
    const [updatedGraduateSchool, setUpdatedGraduateSchool] = useState(graduateSchool);
    const [updatedDegree, setUpdatedDegree] = useState(degree);
    const [updatedConcentrationOne, setUpdatedConcentrationOne] = useState(concentrationOne);
    const [updatedConcentrationTwo, setUpdatedConcentrationTwo] = useState(concentrationTwo);
    const [updatedConcentrationThree, setUpdatedConcentrationThree] = useState(concentrationThree);

    const modifyCollegeArray = (updatedCollege) => {
        let collegeArray = [...colleges];
        collegeArray = collegeArray.map(college => {
            if(college.id === updatedCollege.id) {
                return updatedCollege;
            }
            return college;
        })

        let updatedAboutObject = updateAboutColleges(about,[...collegeArray])
        setAbout(updatedAboutObject)
        setShowEditCollege(false);
        setEditCollegeId(null);
        setStoredAboutByUserId(userId, updatedAboutObject)
    }

    const closeOperation = () => {
        setShowEditCollege(false);
        setEditCollegeId(null);
    }

    return <CollegeForm
        id={id}
        school={updatedSchool}
        setSchool={setUpdatedSchool}
        description={updatedDescription}
        setDescription={setUpdatedDescription}
        fromYear={updatedFromYear}
        setFromYear={setUpdatedFromYear}
        toYear={updatedToYear}
        setToYear={setUpdatedToYear}
        concentrationOne={updatedConcentrationOne}
        setConcentrationOne={setUpdatedConcentrationOne}
        concentrationTwo={updatedConcentrationTwo}
        setConcentrationTwo={setUpdatedConcentrationTwo}
        concentrationThree={updatedConcentrationThree}
        setConcentrationThree={setUpdatedConcentrationThree}
        degree={updatedDegree}
        setDegree={setUpdatedDegree}
        graduated={updatedGraduated}
        setGraduated={setUpdatedGraduated}
        graduateSchool={updatedGraduateSchool}
        setGraduateSchool={setUpdatedGraduateSchool}
        modifyCollegeArray={modifyCollegeArray}
        closeOperation={closeOperation}
    />
}

export const DeleteCollege = (userId, collegeId, colleges, about, setAbout) => {
    let filteredCollege = colleges.filter(school => school.id !== collegeId);
    let updatedAboutObject = updateAboutColleges(about, [...filteredCollege]);
    setAbout(updatedAboutObject);
    setStoredAboutByUserId(userId, updatedAboutObject);
}

const WorkplaceForm = ({id, company, setCompany, position, setPosition, city, setCity,
                           description, setDescription, currentlyWorkHere, setCurrentlyWorkHere,
                           fromYear, setFromYear, toYear, setToYear, modifyWorkArray, closeOperation}) => {

    const handleChangeComapny = event => {
        setCompany(event.target.value);
    }

    const handleChangePosition = event => {
        setPosition(event.target.value);
    }

    const handleChangeCity = event => {
        setCity(event.target.value);
    }

    const handleChangeDescription = event => {
        setDescription(event.target.value);
    }

    const handleChangeFromYear = event => {
        setFromYear(event.target.value);
    }

    const handleChangeToYear = event => {
        setToYear(event.target.value);
    }

    const handleChangeCurrentlyWorkHere = event => {
        setCurrentlyWorkHere(!currentlyWorkHere);
    };

    const handleSubmit = async (event) => {
        let companyToSave = event.target.company.value;
        let positionToSave = event.target.position.value;
        let cityToSave = event.target.city.value;
        let descriptionToSave = event.target.description.value;
        let currentlyWorkHereToSave = event.target.currentlyWorkHere.checked;

        let fromYearToSave = event.target.fromYear.value;
        let toYearToSave = null;

        if(!currentlyWorkHereToSave) {
            toYearToSave = event.target.toYear.value;
        }

        event.preventDefault();

        let workplace = {
            id: id,
            title: positionToSave,
            company: companyToSave,
            city: cityToSave,
            description: descriptionToSave,
            startDate: fromYearToSave,
            endDate: toYearToSave,
            current: currentlyWorkHereToSave
        }


        modifyWorkArray(workplace)
    }

    return <div>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Row>
                    <Row style={{padding: 10}}>
                        <Col>
                            <Input type="text" name="company" id="company" value={company || ''}
                                   placeholder="Company" onChange={handleChangeComapny} autoComplete="company"/>
                        </Col>
                    </Row>
                    <Row style={{padding: 10}}>
                        <Col>
                            <Input type="text" name="position" id="position" value={position || ''}
                                   placeholder="Position" onChange={handleChangePosition} autoComplete="position"/>
                        </Col>
                    </Row>
                    <Row style={{padding: 10}}>
                        <Col>
                            <Input type="text" name="city" id="city" value={city || ''}
                                   placeholder="City/Town" onChange={handleChangeCity} autoComplete="city"/>
                        </Col>
                    </Row>
                    <Row style={{padding: 10}}>
                        <Col>
                            <Input type="textarea" name="description" id="description" value={description || ''}
                                   placeholder="Description" onChange={handleChangeDescription} autoComplete="description"/>
                        </Col>
                    </Row>
                    <Row style={{padding: 10}}>
                        <Col>
                            <Input
                                type="checkbox"
                                name="currentlyWorkHere"
                                id="currentlyWorkHere"
                                checked={currentlyWorkHere}
                                onChange={handleChangeCurrentlyWorkHere}/>
                            <Label style={{paddingLeft: 10}}>I Currently work here</Label>
                        </Col>
                    </Row>
                    <Row xs={2}>
                        <Col>
                            <Label>From</Label>
                            <Input
                                type="select" name="fromYear" id="fromYear" value={fromYear || ''} onChange={handleChangeFromYear}>
                                {selectableYears()}
                            </Input>
                        </Col>
                        { !currentlyWorkHere &&
                            <Col>
                                <Label>To</Label>
                                <Input
                                    type="select" name="toYear" id="toYear" value={toYear || ''} onChange={handleChangeToYear}>
                                    {selectableYears()}
                                </Input>
                            </Col>
                        }
                    </Row>
                </Row>
            </FormGroup>
            <FormGroup className="d-flex justify-content-end">
                <Row>
                    <Col>
                        <Button type="Cancel" onClick={closeOperation} style={{padding: 10}} color="normal">Cancel</Button>
                        <Button type="Post" style={{padding: 10}} color="primary">Save</Button>
                    </Col>
                </Row>
            </FormGroup>
        </Form>
    </div>
}

const CreateWorkplace = ({userId, work, about, setAbout, setShowCreateWork}) => {
    const [newCompany, setNewCompany] = useState(null);
    const [newPosition, setNewPosition] = useState(null);
    const [newCity, setNewCity] = useState(null);
    const [newDescription, setNewDescription] = useState(null);
    const [newCurrentlyWorkHere, setNewCurrentlyWorkHere] = useState(true);
    const [newFromYear, setNewFromYear] = useState(null);
    const [newToYear, setNewToYear] = useState(null);
    let timestamp = new Date().getTime();

    const modifyWorkArray = (workPlace) => {
        let workPlaceArray = [...work];
        workPlaceArray.push(workPlace);

        let updatedAboutObject = updateAboutWork(about,[...workPlaceArray])
        setAbout(updatedAboutObject)
        setShowCreateWork(false);
        setStoredAboutByUserId(userId, updatedAboutObject)
    }

    const closeOperation = () => {
        setShowCreateWork(false);
    }

    return <WorkplaceForm
        id={timestamp}
        modifyWorkArray={modifyWorkArray}
        closeOperation={closeOperation}
        company={newCompany}
        setCompany={setNewCompany}
        position={newPosition}
        setPosition={setNewPosition}
        description={newDescription}
        setDescription={setNewDescription}
        city={newCity}
        setCity={setNewCity}
        currentlyWorkHere={newCurrentlyWorkHere}
        setCurrentlyWorkHere={setNewCurrentlyWorkHere}
        fromYear={newFromYear}
        setFromYear={setNewFromYear}
        toYear={newToYear}
        setToYear={setNewToYear}
    />
}

const EditWorkplace = ({userId, id, company, position, city, description,
                           currentlyWorkHere, fromYear, toYear, work, about,
                           setAbout, setShowEditWork, setEditWorkId}) => {

    const [updateCompany, setUpdateCompany] = useState(company);
    const [updatePosition, setUpdatePosition] = useState(position);
    const [updateCity, setUpdateCity] = useState(city);
    const [updateDescription, setUpdateDescription] = useState(description);
    const [updateCurrentlyWorkHere, setUpdateCurrentlyWorkHere] = useState(currentlyWorkHere);
    const [updateFromYear, setUpdateFromYear] = useState(fromYear);
    const [updateToYear, setUpdateToYear] = useState(toYear);

    const modifyWorkArray = (updatedWorkPlace) => {
        let workPlaceArray = [...work];

        workPlaceArray = workPlaceArray.map(work => {
            if(work.id === updatedWorkPlace.id) {
                return updatedWorkPlace;
            }
            return work;
        })

        let updatedAboutObject = updateAboutWork(about,[...workPlaceArray])
        setAbout(updatedAboutObject)
        setShowEditWork(false);
        setEditWorkId(null);
        setStoredAboutByUserId(userId, updatedAboutObject)
    }

    const closeOperation = () => {
        setShowEditWork(false);
        setEditWorkId(null);
    }

    return <WorkplaceForm
        id={id}
        modifyWorkArray={modifyWorkArray}
        closeOperation={closeOperation}
        company={updateCompany}
        setCompany={setUpdateCompany}
        position={updatePosition}
        setPosition={setUpdatePosition}
        description={updateDescription}
        setDescription={setUpdateDescription}
        city={updateCity}
        setCity={setUpdateCity}
        currentlyWorkHere={updateCurrentlyWorkHere}
        setCurrentlyWorkHere={setUpdateCurrentlyWorkHere}
        fromYear={updateFromYear}
        setFromYear={setUpdateFromYear}
        toYear={updateToYear}
        setToYear={setUpdateToYear}
    />
}

export const DeleteWorkplace = (userId, workPlaceId, work, about, setAbout) => {
    let filteredWork = work.filter(workplace => workplace.id !== workPlaceId);
    let updatedAboutObject = updateAboutWork(about, [...filteredWork]);
    setAbout(updatedAboutObject);
    setStoredAboutByUserId(userId, updatedAboutObject);
}

export const getMostRecentFormerCompany = (workplaces) => {
    if(workplaces.length > 0) {
        let sortedWorkplaces = workplaces.sort((a, b) => parseInt(a.endDate) >= parseInt(b.endDate))
        return sortedWorkplaces[0];
    }

    return null;
}


export const OverviewWorkSection = ({currentUserId, userId, work, editWorkId, setEditWorkId, showEditWork, setShowEditWork,
                                 setEditWorkById, showCreateWork, setShowCreateWork,
                                 about, setAbout}) => {

    let displayAddWorkplace = !showCreateWork && work.length === 0 && currentUserId === userId &&
        <span style={{color: "#0d6efd"}}>
                    <AboutItem
                        userId={userId}
                        currentUserId={currentUserId}
                        icon={<FaPlus/>}
                        itemLineOne="Add a workplace"
                        itemLineTwo={null}
                        addFunction={() => setShowCreateWork(true)}
                        deleteFunction={null}
                        editFunction={null}
                    />
        </span>


    let displayCreateWork =  showCreateWork && currentUserId === userId &&
        <CreateWorkplace
            userId={userId}
            work={work}
            about={about}
            setAbout={setAbout}
            setShowCreateWork={setShowCreateWork}
        />

    let displayNoWorkplace = !showCreateWork && work.length === 0 && currentUserId !== userId &&
        <AboutItem
            userId={userId}
            currentUserId={currentUserId}
            icon={<FaBriefcase/>}
            itemLineOne="No workplace to show"
            itemLineTwo={null}
            addFunction={null}
            deleteFunction={null}
            editFunction={null}
        />

    const currentJob = getCurrentEmployer(work);
    let jobToDisplay = null;
    let jobBylineToDisplay = null;

    if(currentJob) {
        jobToDisplay = currentJob;
        jobBylineToDisplay = getFormerEmployerString(work);
    } else {
        jobToDisplay = getMostRecentFormerCompany(work)
        let filteredWorkplaces = work.filter(work => jobToDisplay.company !== work.company)
        jobBylineToDisplay = getFormerEmployerString(filteredWorkplaces);
    }

    let displayEditJobInfo = showEditWork && currentUserId === userId &&
        <EditWorkplace
            userId={userId}
            id={jobToDisplay.id}
            toYear={jobToDisplay.endDate}
            fromYear={jobToDisplay.startDate}
            position={jobToDisplay.title}
            currentlyWorkHere={jobToDisplay.current}
            city={jobToDisplay.city}
            company={jobToDisplay.company}
            description={jobToDisplay.description}
            work={work}
            about={about}
            setAbout={setAbout}
            setEditWorkId={setEditWorkId}
            setShowEditWork={setShowEditWork}
        />

    let displayJobInfo = jobToDisplay && !showEditWork &&
        <AboutItem
            userId={userId}
            currentUserId={currentUserId}
            icon={<FaBriefcase/>}
            itemLineOne={jobToDisplay.current ? jobToDisplay.title + " at " + jobToDisplay.company : "Worked at " + jobToDisplay.company}
            itemLineTwo={jobBylineToDisplay}
            addFunction={null}
            deleteFunction={() => DeleteWorkplace(userId, jobToDisplay.id, work, about, setAbout)}
            editFunction={() => setEditWorkById(jobToDisplay.id)}
        />


    return <Row>
        <Col>
            {displayAddWorkplace}
            {displayCreateWork}
            {displayNoWorkplace}
            {displayEditJobInfo}
            {displayJobInfo}
        </Col>
    </Row>
}

export const getHighestLevelSchool = (education) => {
    if(!education || (education.colleges.length === 0 && education.highSchools.length === 0)) {
        return null;
    }

    if(education.colleges && education.colleges.length >= 1) {
        let college = {...education.colleges[education.colleges.length - 1]};
        college.type = "college";
        return college
    } else if (education.highSchools && education.highSchools.length >= 1) {
        let highSchool = {...education.highSchools[education.highSchools.length - 1]}
        highSchool.type = "highSchool";
        return highSchool
    } else {
        return null
    }
}

export const OverviewSchoolSection = ({currentUserId, userId, highSchools, colleges, about, setAbout, showCreateCollege, setShowCreateCollege,
                                          showEditCollege, setShowEditCollege, editCollegeId, setEditCollegeId,
                                          showCreateHighSchool, setShowCreateHighSchool, showEditHighSchool, setShowEditHighSchool,
                                          editHighSchoolId, setEditHighSchoolId}) => {


    const [highestLevelSchool, setHighestLevelSchool] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            setHighestLevelSchool(getHighestLevelSchool(about.workAndEducation));
        };

        fetchData();
    }, [about.workAndEducation.highschools, about.workAndEducation.colleges]);


    let displayAddCollege = !highestLevelSchool && !showCreateCollege && !showCreateHighSchool
        && currentUserId === userId &&
        <span style={{color: "#0d6efd"}}>
                <AboutItem
                    userId={userId}
                    currentUserId={currentUserId}
                    icon={<FaPlus/>}
                    itemLineOne="Add a college"
                    itemLineTwo={null}
                    itemLineThree={null}
                    addFunction={() => setShowCreateCollege(true)}
                    deleteFunction={null}
                    editFunction={null}
                />
            </span>


    let displayAddHighSchool = !highestLevelSchool && !showCreateHighSchool && !showCreateCollege
        && currentUserId === userId &&
        <span style={{color: "#0d6efd"}}>
            <AboutItem
                userId={userId}
                currentUserId={currentUserId}
                icon={<FaPlus/>}
                itemLineOne="Add a high school"
                itemLineTwo={null}
                itemLineThree={null}
                addFunction={() => setShowCreateHighSchool(true)}
                deleteFunction={null}
                editFunction={null}
            />
        </span>


    let displayCreateCollege = !highestLevelSchool && showCreateCollege &&
        currentUserId === userId &&
        <CreateCollege
            userId={userId}
            colleges={colleges}
            about={about}
            setAbout={setAbout}
            setShowCreateCollege={setShowCreateCollege}
        />


    let displayCreateHighSchool = !highestLevelSchool && showCreateHighSchool &&
        currentUserId === userId &&
        <CreateHighSchool
            userId={userId}
            highSchools={highSchools}
            about={about}
            setAbout={setAbout}
            setShowCreateHighSchool={setShowCreateHighSchool}
        />


    let displayEditCollege = highestLevelSchool && highestLevelSchool.type === "college"
        && showEditCollege && currentUserId === userId &&
        <EditCollege
            userId={userId}
            id={highestLevelSchool.id}
            school={highestLevelSchool.school}
            fromYear={highestLevelSchool.startClassYear}
            toYear={highestLevelSchool.graduatingClassYear}
            graduated={highestLevelSchool.graduated}
            description={highestLevelSchool.description}
            graduateSchool={highestLevelSchool.graduateSchool}
            degree={highestLevelSchool.degree}
            concentrationOne={highestLevelSchool.concentrationOne}
            concentrationTwo={highestLevelSchool.concentrationTwo}
            concentrationThree={highestLevelSchool.concentationThree}
            colleges={colleges}
            about={about}
            setAbout={setAbout}
            setEditCollegeId={setEditCollegeId}
            setShowEditCollege={setShowEditCollege}
        />


    let displayEditHighSchool = highestLevelSchool && highestLevelSchool.type === "highSchool"
        && showEditHighSchool && currentUserId === userId &&
        <EditHighSchool
            userId={userId}
            id={highestLevelSchool.id}
            school={highestLevelSchool.school}
            fromYear={highestLevelSchool.startClassYear}
            toYear={highestLevelSchool.graduatingClassYear}
            graduated={highestLevelSchool.graduated}
            description={highestLevelSchool.description}
            highSchools={highSchools}
            about={about}
            setAbout={setAbout}
            setShowEditHighSchool={setShowEditHighSchool}
            setEditHighSchoolId={setEditHighSchoolId}
        />

    let displayNoSchools = !highestLevelSchool && currentUserId !== userId &&
        <AboutItem
            userId={userId}
            currentUserId={currentUserId}
            icon={<FaSchool/>}
            itemLineOne="No schools to show"
            itemLineTwo={null}
            itemLineThree={null}
            addFunction={null}
            deleteFunction={null}
            editFunction={null}
        />


    let displayHighestLevelSchool = highestLevelSchool && !showEditCollege && !showEditHighSchool &&
        highestLevelSchool.type === "college" ?
        <AboutItem
            userId={userId}
            currentUserId={currentUserId}
            icon={<FaGraduationCap/>}
            itemLineOne={"Studied " + highestLevelSchool.degree + " at " + highestLevelSchool.school}
            itemLineTwo={"Class of " + highestLevelSchool.graduatingClassYear}
            itemLineThree={null}
            addFunction={null}
            deleteFunction={() => DeleteCollege(userId, highestLevelSchool.id, colleges, about, setAbout)}
            editFunction={() => setShowEditCollege(true)}
        />
        :
        <AboutItem
            userId={userId}
            currentUserId={currentUserId}
            icon={<FaSchool/>}
            itemLineOne={!highestLevelSchool ? null : "Attended " + highestLevelSchool.school}
            itemLineTwo={!highestLevelSchool ? null : "Class of " + highestLevelSchool.graduatingClassYear}
            itemLineThree={null}
            addFunction={null}
            deleteFunction={() => DeleteHighSchool(userId, highestLevelSchool.id, highSchools, about, setAbout)}
            editFunction={() => setShowEditHighSchool(true)}
        />


    return <Row>
        <Col>
            {displayAddCollege}
            {displayAddHighSchool}
            {displayCreateCollege}
            {displayCreateHighSchool}
            {displayEditCollege}
            {displayEditHighSchool}
            {displayNoSchools}
            {displayHighestLevelSchool}
        </Col>
    </Row>
}

const WorkAndEducation = ({currentUserId, userId, about, setAbout}) => {
    let work = [...about.workAndEducation.work];
    let colleges = [...about.workAndEducation.colleges];
    let highSchools = [...about.workAndEducation.highSchools];
    const [showEditWork, setShowEditWork] = useState(false);
    const [editWorkId, setEditWorkId] = useState(null);
    const [showCreateWork, setShowCreateWork] = useState(false);
    const [showEditCollege, setShowEditCollege] = useState(false);
    const [editCollegeId, setEditCollegeId] = useState(null);
    const [showCreateCollege, setShowCreateCollege] = useState(false);
    const [showEditHighSchool, setShowEditHighSchool] = useState(false);
    const [editHighSchoolId, setEditHighSchoolId] = useState(null);
    const [showCreateHighSchool, setShowCreateHighSchool] = useState(false);

    const setEditHighSchoolById = (id) => {
        setEditHighSchoolId(id)
        setShowEditHighSchool(!showEditHighSchool);
    }

    const setEditCollegeById = (id) => {
        setEditCollegeId(id)
        setShowEditCollege(!showEditCollege);
    }

    const setEditWorkById = (id) => {
        setEditWorkId(id)
        setShowEditWork(!showEditWork);
    }

    const WorkSection = ({}) => {

        let displayAddWorkplace = !showCreateWork
            && currentUserId === userId &&
            <span style={{color: "#0d6efd"}}>
                <AboutItem
                    userId={userId}
                    currentUserId={currentUserId}
                    icon={<FaPlus/>}
                    itemLineOne="Add a workplace"
                    itemLineTwo={null}
                    itemLineThree={null}
                    addFunction={() => setShowCreateWork(true)}
                    deleteFunction={null}
                    editFunction={null}
                />
            </span>


        let displayCreateWorkplaceForm = showCreateWork &&
            currentUserId === userId &&
            <CreateWorkplace
                userId={userId}
                work={work}
                about={about}
                setAbout={setAbout}
                setShowCreateWork={setShowCreateWork}
            />

        let displayNoWorkplaces = work.length === 0
            && currentUserId !== userId &&
            <AboutItem
                userId={userId}
                currentUserId={currentUserId}
                icon={<FaBriefcase/>}
                itemLineOne="No workplaces to show"
                itemLineTwo={null}
                itemLineThree={null}
                addFunction={null}
                deleteFunction={null}
                editFunction={null}
            />


        let displayWorkItems = work.map((item, index) => {
            return <div key={userId + '-' + index}>
                {editWorkId !== item.id &&
                    <AboutItem
                        userId={userId}
                        currentUserId={currentUserId}
                        icon={<FaBriefcase/>}
                        itemLineOne={item.title + " at " + item.company}
                        itemLineTwo={item.current ? item.startDate + " - present" : item.startDate + " - " + item.endDate}
                        itemLineThree={item.description}
                        addFunction={() => setShowCreateCollege(true)}
                        deleteFunction={() => DeleteWorkplace(userId, item.id, work, about, setAbout)}
                        editFunction={() => setEditWorkById(item.id)}
                    />
                }
                { editWorkId === item.id &&
                    currentUserId === userId &&
                    <EditWorkplace
                        userId={userId}
                        id={item.id}
                        toYear={item.endDate}
                        fromYear={item.startDate}
                        position={item.title}
                        currentlyWorkHere={item.current}
                        city={item.city}
                        company={item.company}
                        description={item.description}
                        work={work}
                        about={about}
                        setAbout={setAbout}
                        setEditWorkId={setEditWorkId}
                        setShowEditWork={setShowEditWork}
                    />
                }
            </div>
        });

        return <Row>
            <Col>
                {displayAddWorkplace}
                {displayCreateWorkplaceForm}
                {displayNoWorkplaces}
                {displayWorkItems}
            </Col>
        </Row>
    }

    const CollegeSection = ({}) => {

        let displayAddCollege = !showCreateCollege
            && currentUserId === userId &&
            <span style={{color: "#0d6efd"}}>
                <AboutItem
                    userId={userId}
                    currentUserId={currentUserId}
                    icon={<FaPlus/>}
                    itemLineOne="Add college"
                    itemLineTwo={null}
                    addFunction={() => setShowCreateCollege(true)}
                    deleteFunction={null}
                    editFunction={null}
                />
            </span>


        let displayCreateCollegeForm = showCreateCollege &&
            currentUserId === userId &&
            <CreateCollege
                userId={userId}
                colleges={colleges}
                about={about}
                setAbout={setAbout}
                setShowCreateCollege={setShowCreateCollege}
            />

        let displayNoCollege = colleges.length === 0
            && currentUserId !== userId &&
            <AboutItem
                userId={userId}
                currentUserId={currentUserId}
                icon={<FaGraduationCap/>}
                itemLineOne="No colleges to show"
                itemLineTwo={null}
                addFunction={null}
                deleteFunction={null}
                editFunction={null}
            />


        let displayCollegeItems = colleges.map((item, index) => {
            return <div key={userId + '-' + index}>
                { editCollegeId !== item.id &&
                    <AboutItem
                        userId={userId}
                        currentUserId={currentUserId}
                        icon={<FaGraduationCap/>}
                        itemLineOne={"Studied " + item.degree + " at " + item.school}
                        itemLineTwo={"Class of " + item.graduatingClassYear}
                        addFunction={null}
                        deleteFunction={() => DeleteCollege(userId, item.id, colleges, about, setAbout)}
                        editFunction={() => setEditCollegeById(item.id)}
                    />
                }
                { editCollegeId === item.id &&
                    <EditCollege
                        userId={userId}
                        id={item.id}
                        school={item.school}
                        fromYear={item.startClassYear}
                        toYear={item.graduatingClassYear}
                        graduated={item.graduated}
                        description={item.description}
                        graduateSchool={item.graduateSchool}
                        degree={item.degree}
                        concentrationOne={item.concentrationOne}
                        concentrationTwo={item.concentrationTwo}
                        concentrationThree={item.concentationThree}
                        colleges={colleges}
                        about={about}
                        setAbout={setAbout}
                        setEditCollegeId={setEditCollegeId}
                        setShowEditCollege={setShowEditCollege}
                    />
                }
            </div>
        });

        return <Row>
            <Col>
                {displayAddCollege}
                {displayCreateCollegeForm}
                {displayNoCollege}
                {displayCollegeItems}
            </Col>
        </Row>
    }

    const HighSchoolSection = () => {

        let displayAddHighSchool = !showCreateHighSchool
            && currentUserId === userId &&
            <span style={{color: "#0d6efd"}}>
                <AboutItem
                    userId={userId}
                    currentUserId={currentUserId}
                    icon={<FaPlus/>}
                    itemLineOne="Add High school"
                    itemLineTwo={null}
                    addFunction={() => setShowCreateHighSchool(true)}
                    deleteFunction={null}
                    editFunction={null}
                />
            </span>


        let displayCreateHighSchoolForm = showCreateHighSchool &&
            currentUserId === userId &&
            <CreateHighSchool
                userId={userId}
                highSchools={highSchools}
                about={about}
                setAbout={setAbout}
                setShowCreateHighSchool={setShowCreateHighSchool}
            />

        let displayNoHighSchool = highSchools.length === 0
            && currentUserId !== userId &&
            <AboutItem
                userId={userId}
                currentUserId={currentUserId}
                icon={<FaSchool/>}
                itemLineOne="No high schools to show"
                itemLineTwo={null}
                addFunction={null}
                deleteFunction={null}
                editFunction={null}
            />


        let displayHighSchoolItems = highSchools.map((item, index) => {
            return <div key={userId + '-' + index}>
                { editHighSchoolId !== item.id &&
                    <AboutItem
                        userId={userId}
                        currentUserId={currentUserId}
                        icon={<FaSchool/>}
                        itemLineOne={"Went to " + item.school}
                        itemLineTwo={"Class of " + item.graduatingClassYear}
                        addFunction={null}
                        deleteFunction={() => DeleteHighSchool(userId, item.id, highSchools, about, setAbout)}
                        editFunction={() => setEditHighSchoolById(item.id)}
                    />
                }
                { editHighSchoolId === item.id &&
                    <EditHighSchool
                        userId={userId}
                        id={item.id}
                        school={item.school}
                        fromYear={item.startClassYear}
                        toYear={item.graduatingClassYear}
                        graduated={item.graduated}
                        description={item.description}
                        highSchools={highSchools}
                        about={about}
                        setAbout={setAbout}
                        setShowEditHighSchool={setShowEditHighSchool}
                        setEditHighSchoolId={setEditHighSchoolId}
                    />
                }
            </div>
        });

        return <Row>
            <Col>
                {displayAddHighSchool}
                {displayCreateHighSchoolForm}
                {displayNoHighSchool}
                {displayHighSchoolItems}
            </Col>
        </Row>
    }

    return <Row>
        <Row>
            <Col>
                <h4>Work</h4>
            </Col>
        </Row>
        <Row>
            <Col>
                <WorkSection/>
            </Col>
        </Row>
        <Row>
            <Col>
                <h4>College</h4>
            </Col>
        </Row>
        <Row>
            <Col>
                <CollegeSection/>
            </Col>
        </Row>
        <Row><h4>High School</h4></Row>
        <Row>
            <Col>
                <HighSchoolSection/>
            </Col>
        </Row>
    </Row>
}

export default WorkAndEducation;