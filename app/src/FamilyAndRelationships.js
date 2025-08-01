import {Button, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import React, {useState} from "react";
import {updateAboutBasicInfo, updateAboutFamilyMembers, updateAboutRelationship} from "./context/aboutUtils";
import {setStoredAboutByUserId} from "./context/AboutProvider";
import {FaEdit, FaHeart, FaPlus, FaTrash} from "react-icons/fa";
import AboutItem from "./AboutItem";
import {FaPeopleGroup} from "react-icons/fa6";

export const selectableYears = () => {
    let selectArray = [];

    for(let i = new Date().getFullYear(); i >= 1900; i--) {
        selectArray.push(<option key={i}>{i}</option>)
    }

    return selectArray;
}

export const selectableDays = () => {
    let selectArray = [];

    for(let i = 1; i <= 31; i++) {
        selectArray.push(<option key={i}>{i}</option>)
    }

    return selectArray;
}

export const selectableMonths = () => {
    let selectArray = [];

    for(let i = 1; i <= 12; i++) {
        selectArray.push(<option key={i}>{i}</option>)
    }

    return selectArray;
}

export const selectableRelationshipStatus = () => {
    return [
        <option key="Single">Single</option>,
        <option key="In a relationship">In a relationship</option>,
        <option key="Engaged">Engaged</option>,
        <option key="Married">Married</option>,
        <option key="In a civil union">In a civil union</option>,
        <option key="In a domestic partnership">In a domestic partnership</option>,
        <option key="In an open relationship">In an open relationship</option>,
        <option key="It's complicated">It's complicated</option>,
        <option key="Seperated">Seperated</option>,
        <option key="Divorced">Divorced</option>,
        <option key="Widowed">Widowed</option>
    ]
}

export const selectableFamilyMembers = () => {
    return [
        <option key="Mother">Mother</option>,
        <option key="Father">Father</option>,
        <option key="Daughter">Daughter</option>,
        <option key="Son">Son</option>,
        <option key="Sister">Sister</option>,
        <option key="Brother">Brother</option>,
        <option key="Aunt">Aunt</option>,
        <option key="Uncle">Uncle</option>,
        <option key="Neice">Neice</option>,
        <option key="Cousin">Cousin</option>,
        <option key="Grandmother">Grandmother</option>,
        <option key="Grandfather">Grandfather</option>,
        <option key="Granddaughter">Granddaughter</option>,
        <option key="Grandson">Grandson</option>,
        <option key="Stepsister">Stepsister</option>,
        <option key="Stepbrother">Stepbrother</option>,
        <option key="Stepmother">Stepmother</option>,
        <option key="Stepfather">Stepfather</option>,
        <option key="Stepdaughter">Stepdaughter</option>,
        <option key="Stepson">Stepson</option>,
        <option key="Sister-in-law">Sister-in-law</option>,
        <option key="Brother-in-law">Brother-in-law</option>,
        <option key="Mother-in-law">Mother-in-law</option>,
        <option key="Father-in-law">Father-in-law</option>,
        <option key="Daughter-in-law">Daughter-in-law</option>,
        <option key="Son-in-law">Son-in-law</option>,
        <option key="Pet">Pet</option>
    ]
}

export const createRelationshipDescription = ( name, status, fromYear, fromMonth, fromDay) => {
    if(status === "Single" || status === "Seperated") {
        return '';
    }

    const date = new Date(parseInt(fromYear), fromMonth ? parseInt(fromMonth) - 1 : null, parseInt(fromDay));
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    if(status === "In a relationship" || status === "In a civil union"
        || status === "In a domestic partnership" || status === "In an open relationship"
        || status === "It's complicated") {
        return status + " with " + name + " since " + formattedDate
    }

    if(status === "Engaged" || status === "Married") {
        return status + " to " + name + " since " + formattedDate
    }

    if(status === "Divorced") {
        return status + " from " + name + " since " + formattedDate
    }

    if(status === "Widowed") {
        return status + " by " + name + " since " + formattedDate
    }

    return '';
}

const setOverviewRelationshipString = (name, status) => {
    if(status === "Single" || status === "Seperated") {
        return status;
    }

    if(status === "In a relationship" || status === "In a civil union"
        || status === "In a domestic partnership" || status === "In an open relationship"
        || status === "It's complicated") {
        return status + " with " + name;
    }

    if(status === "Engaged" || status === "Married") {
        return status + " to " + name;
    }

    if(status === "Divorced") {
        return status + " from " + name;
    }

    if(status === "Widowed") {
        return status + " by " + name;
    }

    return '';
}

const setOverviewRelationshipByline = (name, status, fromYear, fromMonth, fromDay) => {
    if(status === "Single" || status === "Seperated") {
        return '';
    }

    const date = new Date(parseInt(fromYear), fromMonth ? parseInt(fromMonth) - 1 : null, parseInt(fromDay));
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    if(status === "In a relationship" || status === "In a civil union"
        || status === "In a domestic partnership" || status === "In an open relationship"
        || status === "It's complicated" || status === "Engaged" || status === "Married"
        || status === "Divorced" || status === "Widowed") {
        return "Since " + formattedDate
    }

    return '';
}

export const RelationshipStatusForm = ({name, setName, status, setStatus, fromYear, setFromYear, fromMonth,
                                    setFromMonth, fromDay, setFromDay, modifyRelationshipStatus,
                                    closeOperation}) => {

    const handleChangeName = (event) => {
        setName(event.target.value)
    }

    const handleChangeStatus = (event) => {
        setStatus(event.target.value)
    }

    const handleChangeFromYear = (event) => {
        setFromYear(event.target.value)
    }

    const handleChangeFromMonth = (event) => {
        setFromMonth(event.target.value)
    }

    const handleChangeFromDay = (event) => {
        setFromDay(event.target.value)
    }

    const handleSubmit = async (event) => {
        let statusToSave = event.target.status.value;
        let nameToSave = null;
        let fromYearToSave = null;
        let fromMonthToSave = null;
        let fromDayToSave = null;

        if(statusToSave !== "Single" && statusToSave !== "Seperated") {
            nameToSave = event.target.name.value;
            fromYearToSave = event.target.fromYear.value;
            fromMonthToSave = event.target.fromMonth.value;
            fromDayToSave = event.target.fromDay.value;
        }

        event.preventDefault();

        let relationshipStatus = {
            name: nameToSave,
            status: statusToSave,
            description: createRelationshipDescription(name, status, fromYear, fromMonth, fromDay),
            fromYear: fromYearToSave,
            fromMonth: fromMonthToSave,
            fromDay: fromDayToSave
        }

        modifyRelationshipStatus(relationshipStatus)
    }

    return <div>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Row>
                    <Row style={{padding: 10}}>
                        <Col>
                            <Label>Relationship</Label>
                            <Input type="select" name="status" id="status"
                                   value={status}
                                   onChange={handleChangeStatus}>
                                {selectableRelationshipStatus()}
                            </Input>
                        </Col>
                    </Row>
                    { (status !== "Single" && status !== "Seperated") && (
                        <Row>
                            <Col>
                                <Input type="text" name="name" id="name" value={name || ''}
                                       placeholder="Name" onChange={handleChangeName} autoComplete="name"/>
                            </Col>
                        </Row>
                    )}
                    { (status !== "Single" && status !== "Seperated") &&
                        <Row>
                            <Col>
                                <Label>Year</Label>
                                <Input type="select" name="fromYear" id="fromYear" value={fromYear || ''}
                                       onChange={handleChangeFromYear}>
                                    {selectableYears()}
                                </Input>
                            </Col>
                            <Col>
                                <Label>Month</Label>
                                <Input type="select" name="fromMonth" id="fromMonth" value={fromMonth || ''}
                                       onChange={handleChangeFromMonth}>
                                    {selectableMonths()}
                                </Input>
                            </Col>
                            <Col>
                                <Label>Day</Label>
                                <Input type="select" name="fromDay" id="fromDay" value={fromDay || ''}
                                       onChange={handleChangeFromDay}>
                                    {selectableDays()}
                                </Input>
                            </Col>
                        </Row>
                    }
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

export const CreateRelationshipStatus = ({userId, about, setAbout, setShowCreateRelationshipStatus}) => {
    const [name, setName] = useState(null);
    const [status, setStatus] = useState("Single");
    const [fromYear, setFromYear] = useState("2024");
    const [fromMonth, setFromMonth] = useState("1");
    const [fromDay, setFromDay] = useState("1");

    const modifyRelationshipStatus = (newRelationshipStatus) => {
        let updatedAboutObject = updateAboutRelationship(about,{...newRelationshipStatus})
        setAbout(updatedAboutObject)
        setShowCreateRelationshipStatus(false);
        setStoredAboutByUserId(userId, updatedAboutObject)
    }

    const closeOperation = () => {
        setShowCreateRelationshipStatus(false);
    }

    return <RelationshipStatusForm
        name={name}
        setName={setName}
        status={status}
        setStatus={setStatus}
        fromDay={fromDay}
        setFromDay={setFromDay}
        fromMonth={fromMonth}
        setFromMonth={setFromMonth}
        fromYear={fromYear}
        setFromYear={setFromYear}
        modifyRelationshipStatus={modifyRelationshipStatus}
        closeOperation={closeOperation}
    />
}

export const EditRelationshipStatus = ({userId, about, setAbout, name, status, fromYear, fromMonth, fromDay, setShowEditRelationshipStatus}) => {
    const [nameToUpddate, setNameToUpdate] = useState(name);
    const [statusToUpdate, setStatusToUpdate] = useState(status);
    const [fromYearToUpdate, setFromYearToUpdate] = useState(fromYear);
    const [fromMonthToUpdate, setFromMonthToUpdate] = useState(fromMonth);
    const [fromDayToUpdate, setFromDayToUpdate] = useState(fromDay);

    const modifyRelationshipStatus = (relationshipStatusToUpdate) => {
        let updatedAboutObject = updateAboutRelationship(about,{...relationshipStatusToUpdate})
        setAbout(updatedAboutObject)
        setShowEditRelationshipStatus(false);
        setStoredAboutByUserId(userId, updatedAboutObject)
    }

    const closeOperation = () => {
        setShowEditRelationshipStatus(false);
    }

    return <RelationshipStatusForm
        name={nameToUpddate}
        setName={setNameToUpdate}
        status={statusToUpdate}
        setStatus={setStatusToUpdate}
        fromDay={fromDayToUpdate}
        setFromDay={setFromDayToUpdate}
        fromMonth={fromMonthToUpdate}
        setFromMonth={setFromMonthToUpdate}
        fromYear={fromYearToUpdate}
        setFromYear={setFromYearToUpdate}
        modifyRelationshipStatus={modifyRelationshipStatus}
        closeOperation={closeOperation}
    />
}

export const deleteRelationshipStatus = (userId, about, setAbout) => {
    let relationship = {
        status: null,
        name: null,
        fromYear: null,
        fromMonth: null,
        fromDay: null,
        description: null
    };

    let updatedAboutObject = updateAboutRelationship(about,{...relationship})
    setAbout(updatedAboutObject)
    setStoredAboutByUserId(userId, updatedAboutObject)
}

export const FamilyMemberForm = ({id, name, setName, description, setDescription,
                              modifyFamilyMemberArray, closeOperation}) => {
    const handleChangeName = (event) => {
        setName(event.target.value)
    }

    const handleChangeDescription = (event) => {
        setDescription(event.target.value)
    }

    const handleSubmit = async (event) => {
        let descriptionToSave = event.target.description.value;
        let nameToSave = event.target.name.value;

        event.preventDefault();

        let familyMember = {
            id: id,
            name: nameToSave,
            description: descriptionToSave
        }

        modifyFamilyMemberArray(familyMember)
    }

    return <div>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Row>
                    <Row style={{padding: 10}}>
                        <Col>
                            <Input type="text" name="name" id="name" value={name || ''}
                                   placeholder="Family member" onChange={handleChangeName} autoComplete="name"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Label>Relationship</Label>
                            <Input type="select" name="description" id="description"
                                   value={description}
                                   onChange={handleChangeDescription}>
                                {selectableFamilyMembers()}
                            </Input>
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

const CreateFamilyMember = ({userId, about, setAbout, familyMembers, setShowCreateFamilyMember}) => {
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null)
    const timestamp = new Date().getTime();

    const modifyFamilyMemberArray = (newFamilyMember) => {
        let familyMembersToUpdate = [...familyMembers];
        familyMembersToUpdate.push(newFamilyMember);

        let updatedAboutObject = updateAboutFamilyMembers(about,[...familyMembersToUpdate])
        setAbout(updatedAboutObject)
        setShowCreateFamilyMember(false);
        setStoredAboutByUserId(userId, updatedAboutObject)
    }

    const closeOperation = () => {
        setShowCreateFamilyMember(false);
    }

    return <FamilyMemberForm
        id={timestamp}
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        modifyFamilyMemberArray={modifyFamilyMemberArray}
        closeOperation={closeOperation}
    />
}

export const EditFamilyMember = ({userId, about, setAbout, id, name, description, familyMembers,
                                     setEditFamilyMemberId, setShowEditFamilyMember}) => {
    const [nameToUpdate, setNameToUpdate] = useState(name);
    const [descriptionToUpdate, setDescriptionToUpdate] = useState(description);

    const modifyFamilyMemberArray = (familyMemberToUpdate) => {
        let familyMembersToUpdate = [...familyMembers];
        familyMembersToUpdate = familyMembersToUpdate.map(familyMember => {
            if(familyMember.id === familyMemberToUpdate.id) {
                return familyMemberToUpdate;
            }
            return familyMember;
        });

        let updatedAboutObject = updateAboutFamilyMembers(about,[...familyMembersToUpdate])
        setAbout(updatedAboutObject)
        setEditFamilyMemberId(null);
        setShowEditFamilyMember(false);
        setStoredAboutByUserId(userId, updatedAboutObject)
    }

    const closeOperation = () => {
        setEditFamilyMemberId(null);
        setShowEditFamilyMember(false);
    }

    return <FamilyMemberForm
        id={id}
        name={nameToUpdate}
        setName={setNameToUpdate}
        description={descriptionToUpdate}
        setDescription={setDescriptionToUpdate}
        modifyFamilyMemberArray={modifyFamilyMemberArray}
        closeOperation={closeOperation}
    />
}

export const deleteFamilyMemberById = (userId, about, setAbout, familyMemberToDeleteId, familyMembers) => {
    let familyMembersToUpdate = [...familyMembers];
    familyMembersToUpdate = familyMembersToUpdate.filter(familyMember => familyMember.id !== familyMemberToDeleteId)

    let updatedAboutObject = updateAboutFamilyMembers(about,[...familyMembersToUpdate])
    setAbout(updatedAboutObject)
    setStoredAboutByUserId(userId, updatedAboutObject)
}

export const RelationshipWidget = ({currentUserId, userId, about, setAbout, relationship,
                                showCreateRelationshipStatus, setShowCreateRelationshipStatus,
                                showEditRelationshipStatus, setShowEditRelationshipStatus,}) => {

    let displayCreateRelationshipStatus = showCreateRelationshipStatus
        && currentUserId === userId &&
        <CreateRelationshipStatus
            userId={userId}
            about={about}
            setAbout={setAbout}
            setShowCreateRelationshipStatus={setShowCreateRelationshipStatus}
        />

    let displayEditRelationshipStatus = showEditRelationshipStatus
        && currentUserId === userId &&
        <EditRelationshipStatus
            userId={userId}
            about={about}
            setAbout={setAbout}
            name={relationship.name}
            status={relationship.status}
            fromDay={relationship.fromDay}
            fromMonth={relationship.fromMonth}
            fromYear={relationship.fromYear}
            setShowEditRelationshipStatus={setShowEditRelationshipStatus}
        />

    let displayAddRelationshipSatus = !relationship.status
        && currentUserId === userId &&
        <span style={{color: "#0d6efd"}}>
            <AboutItem
                userId={userId}
                currentUserId={currentUserId}
                icon={<FaPlus/>}
                itemLineOne="Add relationship status"
                itemLineTwo={null}
                itemLineThree={null}
                addFunction={() => setShowCreateRelationshipStatus(true)}
                deleteFunction={null}
                editFunction={null}
            />
        </span>

    let displayNoRelationshipStatus = !relationship.status
        && currentUserId !== userId &&
        <span style={{color: "#0d6efd"}}>
            <AboutItem
                userId={userId}
                currentUserId={currentUserId}
                icon={<FaHeart/>}
                itemLineOne="No relationship info to show"
                itemLineTwo={null}
                itemLineThree={null}
                addFunction={null}
                deleteFunction={null}
                editFunction={null}
            />
        </span>

    let displayRelationshipStatus = relationship.status
        && !showEditRelationshipStatus && !showCreateRelationshipStatus &&
        <AboutItem
            userId={userId}
            currentUserId={currentUserId}
            icon={<FaHeart/>}
            itemLineOne={relationship.description !== '' ? relationship.name : relationship.status}
            itemLineTwo={relationship.description !== '' ? relationship.description : ''}
            itemLineThree={null}
            addFunction={null}
            deleteFunction={() => deleteRelationshipStatus(userId, about, setAbout)}
            editFunction={() => setShowEditRelationshipStatus(true)}
        />

    return <Row>
        <Col>
            {displayCreateRelationshipStatus}
            {displayEditRelationshipStatus}
            {displayAddRelationshipSatus}
            {displayNoRelationshipStatus}
            {displayRelationshipStatus}
        </Col>
    </Row>
}

export const OverviewRelationshipSection = ({currentUserId, userId, about, setAbout, relationship,
                                       showCreateRelationshipStatus, setShowCreateRelationshipStatus,
                                       showEditRelationshipStatus, setShowEditRelationshipStatus}) => {
    let displayCreateRelationshipStatus = showCreateRelationshipStatus
        && currentUserId === userId &&
        <CreateRelationshipStatus
            userId={userId}
            about={about}
            setAbout={setAbout}
            setShowCreateRelationshipStatus={setShowCreateRelationshipStatus}/>

    let displayEditRelationshipStatus = showEditRelationshipStatus
        && currentUserId === userId &&
        <EditRelationshipStatus
            userId={userId}
            about={about}
            setAbout={setAbout}
            name={relationship.name}
            status={relationship.status}
            fromDay={relationship.fromDay}
            fromMonth={relationship.fromMonth}
            fromYear={relationship.fromYear}
            setShowEditRelationshipStatus={setShowEditRelationshipStatus}
        />


    let displayAddRelationshipSatus = !relationship.status
        && currentUserId === userId &&
        <span style={{color: "#0d6efd"}}>
            <AboutItem
                userId={userId}
                currentUserId={currentUserId}
                icon={<FaPlus/>}
                itemLineOne="Add relationship status"
                itemLineTwo={null}
                itemLineThree={null}
                addFunction={() => setShowCreateRelationshipStatus(true)}
                deleteFunction={null}
                editFunction={null}
            />
        </span>


    let displayNoRelationshipStatus = !relationship.status
        && currentUserId !== userId &&
        <AboutItem
            userId={userId}
            currentUserId={currentUserId}
            icon={<FaHeart/>}
            itemLineOne="No relationship info to show"
            itemLineTwo={null}
            itemLineThree={null}
            addFunction={null}
            deleteFunction={null}
            editFunction={null}
        />


    let displayOverviewRelationshipStatus = relationship.status
        && !showEditRelationshipStatus && !showCreateRelationshipStatus &&
        <AboutItem
            userId={userId}
            currentUserId={currentUserId}
            icon={<FaHeart/>}
            itemLineOne={setOverviewRelationshipString(relationship.name, relationship.status)}
            itemLineTwo={setOverviewRelationshipByline(relationship.name, relationship.status,
                relationship.fromYear, relationship.fromMonth, relationship.fromDay)}
            itemLineThree={null}
            addFunction={null}
            deleteFunction={() => deleteRelationshipStatus(userId, about, setAbout)}
            editFunction={() => setShowEditRelationshipStatus(true)}
        />

    return <Row>
        <Col>
            {displayCreateRelationshipStatus}
            {displayEditRelationshipStatus}
            {displayAddRelationshipSatus}
            {displayNoRelationshipStatus}
            {displayOverviewRelationshipStatus}
        </Col>
    </Row>
}

const FamilyAndRelationships = ({currentUserId, userId, about, setAbout}) => {
    const relationship = about.familyAndRelationships.relationship;
    const familyMembers = about.familyAndRelationships.familyMembers;
    const [showCreateRelationshipStatus, setShowCreateRelationshipStatus] = useState(false);
    const [showEditRelationshipStatus, setShowEditRelationshipStatus] = useState(false);
    const [showCreateFamilyMember, setShowCreateFamilyMember] = useState(false);
    const [showEditFamilyMember, setShowEditFamilyMember] = useState(false);
    const [editFamilyMemberId, setEditFamilyMemberId] = useState(null);

    const setEditFamilyMemberById = (familyMemberToEditId) => {
        setEditFamilyMemberId(familyMemberToEditId);
        setShowEditFamilyMember(true);
    }

    const FamilyMembersSection = ({}) => {

        let displayAddFamilyMember = !showCreateFamilyMember
            && currentUserId === userId &&
            <span style={{color: "#0d6efd"}}>
            <AboutItem
                userId={userId}
                currentUserId={currentUserId}
                icon={<FaPlus/>}
                itemLineOne="Add family member"
                itemLineTwo={null}
                itemLineThree={null}
                addFunction={() => setShowCreateFamilyMember(true)}
                deleteFunction={null}
                editFunction={null}
            />
        </span>


        let displayNoFamilyMembers = familyMembers.length === 0
            && currentUserId !== userId &&
            <AboutItem
                userId={userId}
                currentUserId={currentUserId}
                icon={<FaPeopleGroup/>}
                itemLineOne="No relationship info to show"
                itemLineTwo={null}
                itemLineThree={null}
                addFunction={null}
                deleteFunction={null}
                editFunction={null}
            />

        let displayCreateFamilyMemberForm = showCreateFamilyMember
            && currentUserId === userId &&
            <CreateFamilyMember
                about={about}
                setAbout={setAbout}
                userId={userId}
                familyMembers={familyMembers}
                setShowCreateFamilyMember={setShowCreateFamilyMember}
            />

        let displayFamilyMembers = familyMembers.map((item, index) => {
            return showEditFamilyMember && editFamilyMemberId === item.id
                ?
                <EditFamilyMember
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    userId={userId}
                    about={about}
                    setAbout={setAbout}
                    familyMembers={familyMembers}
                    setEditFamilyMemberId={setEditFamilyMemberId}
                    setShowEditFamilyMember={setShowEditFamilyMember}
                />
                :
                <div key={userId + '-' + index}>
                    <AboutItem
                        userId={userId}
                        currentUserId={currentUserId}
                        icon={<FaPeopleGroup/>}
                        itemLineOne={item.name}
                        itemLineTwo={item.description}
                        itemLineThree={null}
                        addFunction={null}
                        deleteFunction={() => deleteFamilyMemberById(userId, about, setAbout, item.id, familyMembers)}
                        editFunction={() => setEditFamilyMemberById(item.id)}
                    />
                </div>
        });

        return <Row>
            <Col>
                {displayAddFamilyMember}
                {displayNoFamilyMembers}
                {displayCreateFamilyMemberForm}
                {displayFamilyMembers}
            </Col>
        </Row>
    }

    return <Row>
        <Row>
            <Col>
                <h4>Relationship</h4>
            </Col>
        </Row>
        <Row>
            <Col>
                <RelationshipWidget
                    currentUserId={currentUserId}
                    userId={userId}
                    about={about}
                    setAbout={setAbout}
                    relationship={relationship}
                    showCreateRelationshipStatus={showCreateRelationshipStatus}
                    setShowCreateRelationshipStatus={setShowCreateRelationshipStatus}
                    showEditRelationshipStatus={showEditRelationshipStatus}
                    setShowEditRelationshipStatus={setShowEditRelationshipStatus}
                />
            </Col>
        </Row>
        <Row>
            <Col>
                <h4>Family members</h4>
            </Col>
        </Row>
        <Row>
            <Col>
                <FamilyMembersSection/>
            </Col>
        </Row>
    </Row>
}

export default FamilyAndRelationships;