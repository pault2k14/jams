import {Button, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import React, {useEffect, useState} from "react";
import {
    updateAboutBasicInfo,
    updateAboutContactInfo,
    updateAboutPlacesLived,
    updateAboutWebsitesAndSocialLinks
} from "./context/aboutUtils";
import {getPrimaryContactInfo, setStoredAboutByUserId} from "./context/AboutProvider";
import {
    FaAddressBook,
    FaAddressCard,
    FaEdit,
    FaEnvelope,
    FaLink,
    FaPhone,
    FaPlus,
    FaTrash,
    FaUser
} from "react-icons/fa";
import AboutItem from "./AboutItem";
import {FaCakeCandles} from "react-icons/fa6";


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

export const ContactInfoForm = ({id, info, setInfo, type, setType, primary, setPrimary,
                             modifyContactInfoArray, closeOperation}) => {

    const handleChangeInfo = (event) => {
        setInfo(event.target.value)
    }

    const handleChangeType = (event) => {
        setType(event.target.value)
    }

    const handleChangePrimary = (event) => {
        setPrimary(!primary)
    }

    const handleSubmit = async (event) => {
        let infoToSave = event.target.info.value;
        let typeToSave = event.target.type.value;
        let primaryToSave = event.target.primary.checked;

        event.preventDefault();

        let contactInfo = {
            id: id,
            info: infoToSave,
            type: typeToSave,
            primary: primaryToSave
        }

        modifyContactInfoArray(contactInfo)
    }

    return <div>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Row>
                    <Row style={{padding: 10}}>
                        <Col>
                            <Input type="text" name="info" id="info" value={info || ''}
                                   placeholder="Contact info" onChange={handleChangeInfo} autoComplete="info"/>
                        </Col>
                    </Row>
                    <Row xs={2}>
                        <Col>
                            <Label>Type</Label>
                            <Input type="select" name="type" id="type" value={type || ''} onChange={handleChangeType}>
                                <option>Email</option>
                                <option>Mobile Number</option>
                            </Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input
                                type="checkbox"
                                name="primary"
                                id="primary"
                                checked={primary}
                                onChange={handleChangePrimary}/>
                            <Label style={{paddingLeft: 10}}>Primary</Label>
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

export const CreateContactInfo = ({userId, contactInfo, about, setAbout, setShowCreateContactInfo}) => {
    const [info, setInfo] = useState(null);
    const [type, setType] = useState(null);
    const [primary, setPrimary] = useState(null);
    const timestamp = new Date().getTime();

    const modifyContactInfoArray = (newContactInfo) => {
        let updatedContactInfo = [...contactInfo];
        updatedContactInfo.push(newContactInfo);

        let updatedAboutObject = updateAboutContactInfo(about,[...updatedContactInfo])
        setAbout(updatedAboutObject)
        setShowCreateContactInfo(false);
        setStoredAboutByUserId(userId, updatedAboutObject)
    }

    const closeOperation = () => {
        setShowCreateContactInfo(false);
    }

    return <ContactInfoForm
        id={timestamp}
        type={type}
        setType={setType}
        info={info}
        setInfo={setInfo}
        primary={primary}
        setPrimary={setPrimary}
        modifyContactInfoArray={modifyContactInfoArray}
        closeOperation={closeOperation}
    />
}

export const EditContactInfo = ({userId, id, info, type, primary, contactInfo,
                             about, setAbout, setShowEditContactInfo, setEditContactInfoId}) => {
    const [infoToUpdate, setInfoToUpdate] = useState(info);
    const [typeToUpdate, setTypeToUpdate] = useState(type);
    const [primaryToUpdate, setPrimaryToUpdate] = useState(primary);

    const modifyContactInfoArray = (contactInfoToUpdate) => {
        let updatedContactInfo = [...contactInfo];
        updatedContactInfo = updatedContactInfo.map(info => {
            if(info.id === contactInfoToUpdate.id) {
                return contactInfoToUpdate
            }
            return info;
        })

        let updatedAboutObject = updateAboutContactInfo(about,[...updatedContactInfo])
        setAbout(updatedAboutObject)
        setShowEditContactInfo(false);
        setEditContactInfoId(null);
        setStoredAboutByUserId(userId, updatedAboutObject)
    }

    const closeOperation = () => {
        setShowEditContactInfo(false);
        setEditContactInfoId(null);
    }

    return <ContactInfoForm
        id={id}
        info={infoToUpdate}
        setInfo={setInfoToUpdate}
        primary={primaryToUpdate}
        setPrimary={setPrimaryToUpdate}
        type={typeToUpdate}
        setType={setTypeToUpdate}
        modifyContactInfoArray={modifyContactInfoArray}
        closeOperation={closeOperation}/>
}

export const deleteContactInfoById = (userId, contactInfoToDeleteId, contactInfo, about, setAbout) => {
    let updatedContactInfo = [...contactInfo];
    updatedContactInfo = updatedContactInfo.filter(info => info.id !== contactInfoToDeleteId);

    let updatedAboutObject = updateAboutContactInfo(about,[...updatedContactInfo])
    setAbout(updatedAboutObject)
    setStoredAboutByUserId(userId, updatedAboutObject)
}

export const WebsiteAndSocialLinkForm = ({id, link, setLink, description, setDescription,
                                      modifyWebsitesAndSocialLinksArray, closeOperation}) => {
    const handleChangeLink = (event) => {
        setLink(event.target.value)
    }

    const handleChangeDescription = (event) => {
        setDescription(event.target.value)
    }

    const handleSubmit = async (event) => {
        let linkToSave = event.target.link.value;
        let descriptionToSave = event.target.description.value;

        event.preventDefault();

        let websiteAndSocialLink = {
            id: id,
            link: linkToSave,
            description: descriptionToSave,
        }

        modifyWebsitesAndSocialLinksArray(websiteAndSocialLink)
    }

    return <div>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Row>
                    <Row style={{padding: 10}}>
                        <Col>
                            <Input type="text" name="link" id="link" value={link || ''}
                                   placeholder="Link" onChange={handleChangeLink} autoComplete="link"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input type="text" name="description" id="description" value={description || ''}
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

export const CreateWebsiteAndSocialLink = ({userId, websitesAndSocialLinks, about, setAbout,
                                               setShowCreateWebsitesAndSocialLinks, setCreateWebsitesAndSocialLinksId}) => {
    const [link, setLink] = useState(null);
    const [description, setDescription] = useState(null);
    const timestamp = new Date().getTime();

    const modifyWebsitesAndSocialLinksArray = (newWebsitesAndSocialLinks) => {
        let updatedWebsitesAndSocialLinks = [...websitesAndSocialLinks];
        updatedWebsitesAndSocialLinks.push(newWebsitesAndSocialLinks)

        let updatedAboutObject = updateAboutWebsitesAndSocialLinks(about,[...updatedWebsitesAndSocialLinks])
        setAbout(updatedAboutObject)
        setShowCreateWebsitesAndSocialLinks(false);
        setStoredAboutByUserId(userId, updatedAboutObject)
    }

    const closeOperation = () => {
        setShowCreateWebsitesAndSocialLinks(false);
    }

    return <WebsiteAndSocialLinkForm
        id={timestamp}
        link={link}
        setLink={setLink}
        description={description}
        setDescription={setDescription}
        modifyWebsitesAndSocialLinksArray={modifyWebsitesAndSocialLinksArray}
        closeOperation={closeOperation}
    />
}

export const EditWebsiteAndSocialLink = ({userId, id, link, description, websitesAndSocialLinks,
                                      about, setAbout, setShowEditWebsitesAndSocialLinks,
                                      setEditWebsitesAndSocialLinksId}) => {
    const [linkToUpdate, setLinkToUpdate] = useState(link);
    const [descriptionToUpdate, setDescriptionToUpdate] = useState(description);

    const modifyWebsitesAndSocialLinksArray = (websitesAndSocialLinksToUpdate) => {
        let updatedWebsitesAndSocialLinks = [...websitesAndSocialLinks];
        updatedWebsitesAndSocialLinks = updatedWebsitesAndSocialLinks.map(link => {
            if(link.id === websitesAndSocialLinksToUpdate.id) {
                return websitesAndSocialLinksToUpdate
            }
            return link;
        })

        let updatedAboutObject = updateAboutWebsitesAndSocialLinks(about,[...updatedWebsitesAndSocialLinks])
        setAbout(updatedAboutObject)
        setShowEditWebsitesAndSocialLinks(false);
        setEditWebsitesAndSocialLinksId(null);
        setStoredAboutByUserId(userId, updatedAboutObject)
    }

    const closeOperation = () => {
        setShowEditWebsitesAndSocialLinks(false);
        setEditWebsitesAndSocialLinksId(null);
    }

    return <WebsiteAndSocialLinkForm
        id={id}
        link={linkToUpdate}
        setLink={setLinkToUpdate}
        description={descriptionToUpdate}
        setDescription={setDescriptionToUpdate}
        modifyWebsitesAndSocialLinksArray={modifyWebsitesAndSocialLinksArray}
        closeOperation={closeOperation}
    />
}

export const deleteWebsiteAndSocialLinkById = (userId, websiteAndSocialLinkToDeleteId, websitesAndSocialLinks, about, setAbout) => {
    let websiteAndSocialLinksToUpdate = [...websitesAndSocialLinks];
    websiteAndSocialLinksToUpdate = websiteAndSocialLinksToUpdate.filter(link => link.id !== websiteAndSocialLinkToDeleteId);

    let updatedAboutObject = updateAboutWebsitesAndSocialLinks(about,[...websiteAndSocialLinksToUpdate])
    setAbout(updatedAboutObject)
    setStoredAboutByUserId(userId, updatedAboutObject)
}

export const GenderForm = ({gender, setGender, modifyGender, closeOperation}) => {
    const handleChangeGender = (event) => {
        setGender(event.target.value)
    }

    const handleSubmit = async (event) => {
        let genderToSave = event.target.gender.value;
        event.preventDefault();
        modifyGender(genderToSave)
    }

    return <div>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Row>
                    <Row style={{padding: 10}}>
                        <Col>
                            <Label>Gender</Label>
                            <Input type="select" name="gender" id="gender" value={gender || ''}
                                   onChange={handleChangeGender}>
                                <option>Male</option>
                                <option>Female</option>
                            </Input>
                        </Col>
                    </Row>
                </Row>
            </FormGroup>
            <FormGroup className="d-flex justify-content-end">
                <Row>
                    <Col>
                        <Button type="Cancel" onClick={() => closeOperation()} style={{padding: 10}}
                                color="normal">Cancel</Button>
                        <Button type="Post" style={{padding: 10}} color="primary">Save</Button>
                    </Col>
                </Row>
            </FormGroup>
        </Form>
    </div>
}

export const CreateGender = ({userId, basicInfo, about, setAbout, setShowCreateGender}) => {
    const [gender, setGender] = useState(null);

    const modifyGender = (newGender) => {
        let updatedBasicInfo = {
            gender: newGender,
            birthDay: basicInfo.birthDay,
            birthMonth: basicInfo.birthMonth,
            birthYear: basicInfo.birthYear,
        }

        let updatedAboutObject = updateAboutBasicInfo(about,{...updatedBasicInfo})
        setAbout(updatedAboutObject)
        setShowCreateGender(false);
        setStoredAboutByUserId(userId, updatedAboutObject)
    }

    const closeOperation = () => {
        setShowCreateGender(false);
    }

    return <GenderForm
        gender={gender}
        setGender={setGender}
        closeOperation={closeOperation}
        modifyGender={modifyGender}
    />
}

export const EditGender = ({userId, gender, basicInfo, about, setAbout, setShowEditGender}) => {
    let [genderToUpdate, setGenderToUpdate] = useState(gender);

    const modifyGender = (genderToUpdate) => {
        let updatedBasicInfo = {
            gender: genderToUpdate,
            birthDay: basicInfo.birthDay,
            birthMonth: basicInfo.birthMonth,
            birthYear: basicInfo.birthYear,
        }

        let updatedAboutObject = updateAboutBasicInfo(about,{...updatedBasicInfo})
        setAbout(updatedAboutObject)
        setShowEditGender(false);
        setStoredAboutByUserId(userId, updatedAboutObject)
    }

    const closeOperation = () => {
        setShowEditGender(false);
    }

    return <GenderForm
        gender={genderToUpdate}
        setGender={setGenderToUpdate}
        closeOperation={closeOperation}
        modifyGender={modifyGender}
    />
}

export const deleteGender = (userId, basicInfo, about, setAbout) => {
    let updatedBasicInfo = {
        gender: null,
        birthDay: basicInfo.birthDay,
        birthMonth: basicInfo.birthMonth,
        birthYear: basicInfo.birthYear,
    }

    let updatedAboutObject = updateAboutBasicInfo(about,{...updatedBasicInfo})
    setAbout(updatedAboutObject)
    setStoredAboutByUserId(userId, updatedAboutObject)
}

export const BirthdayForm = ({day, setDay, month, setMonth, year,
                          setYear, modifyBirthday, closeOperation}) => {
    const handleChangeDay = (event) => {
        setDay(event.target.value)
    }

    const handleChangeMonth = (event) => {
        setMonth(event.target.value)
    }

    const handleChangeYear = (event) => {
        setYear(event.target.value)
    }

    const handleSubmit = async (event) => {
        let dayToSave = event.target.day.value;
        let monthToSave = event.target.month.value;
        let yearToSave = event.target.year.value;

        event.preventDefault();
        modifyBirthday(dayToSave, monthToSave, yearToSave)
    }

    return <div>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Row>
                    <Row style={{padding: 10}}>
                        <Col>
                            <Label>Month</Label>
                            <Input type="select" name="month" id="month" value={month || ''}
                                   onChange={handleChangeMonth}>
                                {selectableMonths()}
                            </Input>
                        </Col>
                        <Col>
                            <Label>Day</Label>
                            <Input type="select" name="day" id="day" value={day || ''}
                                   onChange={handleChangeDay}>
                                {selectableDays()}
                            </Input>
                        </Col>
                        <Col>
                            <Label>Year</Label>
                            <Input type="select" name="year" id="year" value={year || ''}
                                   onChange={handleChangeYear}>
                                {selectableYears()}
                            </Input>
                        </Col>
                    </Row>
                </Row>
            </FormGroup>
            <FormGroup className="d-flex justify-content-end">
                <Row>
                    <Col>
                        <Button type="Cancel" onClick={() => closeOperation()} style={{padding: 10}}
                                color="normal">Cancel</Button>
                        <Button type="Post" style={{padding: 10}} color="primary">Save</Button>
                    </Col>
                </Row>
            </FormGroup>
        </Form>
    </div>
}

export const CreateBirthday = ({userId, basicInfo, about, setAbout, setShowCreateBirthday}) => {
    const [day, setDay] = useState(null);
    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(null);

    const modifyBirthday = (newDay, newMonth, newYear) => {
        let updatedBasicInfo = {
            gender: basicInfo.gender,
            birthDay: newDay,
            birthMonth: newMonth,
            birthYear: newYear
        }

        let updatedAboutObject = updateAboutBasicInfo(about,{...updatedBasicInfo})
        setAbout(updatedAboutObject)
        setShowCreateBirthday(false);
        setStoredAboutByUserId(userId, updatedAboutObject)
    }

    const closeOperation = () => {
        setShowCreateBirthday(false);
    }

    return <BirthdayForm
        day={day}
        setDay={setDay}
        month={month}
        setMonth={setMonth}
        year={year}
        setYear={setYear}
        modifyBirthday={modifyBirthday}
        closeOperation={closeOperation}
    />
}

export const EditBirthday = ({userId, day, month, year, basicInfo, about, setAbout, setShowEditBirthday}) => {
    let [dayToUpdate, setDayToUpdate] = useState(day);
    let [monthToUpdate, setMonthToUpdate] = useState(month);
    let [yearToUpdate, setYearToUpdate] = useState(year);

    const modifyBirthday = (dayToUpdate, monthToUpdate, yearToUpdate) => {
        let updatedBasicInfo = {
            gender: basicInfo.gender,
            birthDay: dayToUpdate,
            birthMonth: monthToUpdate,
            birthYear: yearToUpdate
        }

        let updatedAboutObject = updateAboutBasicInfo(about,{...updatedBasicInfo})
        setAbout(updatedAboutObject)
        setShowEditBirthday(false);
        setStoredAboutByUserId(userId, updatedAboutObject)
    }

    const closeOperation = () => {
        setShowEditBirthday(false);
    }

    return <BirthdayForm
        day={dayToUpdate}
        setDay={setDayToUpdate}
        month={monthToUpdate}
        setMonth={setMonthToUpdate}
        year={yearToUpdate}
        setYear={setYearToUpdate}
        modifyBirthday={modifyBirthday}
        closeOperation={closeOperation}
    />
}

export const deleteBirthday = (userId, basicInfo, about, setAbout) => {
    let updatedBasicInfo = {
        gender: basicInfo.gender,
        birthDay: null,
        birthMonth: null,
        birthYear: null
    }

    let updatedAboutObject = updateAboutBasicInfo(about,{...updatedBasicInfo})
    setAbout(updatedAboutObject)
    setStoredAboutByUserId(userId, updatedAboutObject)
}


export const OverviewContactInfoSection = ({currentUserId, userId, contactInfo, about, setAbout, setEditContactinfoById,
                                        editContactInfoId, setEditContactInfoId,
                                        showEditContactInfo, setShowEditContactInfo,
                                        showCreateContactInfo, setShowCreateContactInfo}) => {

    const [primaryContactInfo, setPrimaryContactInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setPrimaryContactInfo(getPrimaryContactInfo(about.contactAndBasicInfo.contactInfo));
        };

        fetchData();
    }, [about.contactAndBasicInfo.contactInfo]);

    let displayAddContactInfo = !primaryContactInfo && !showCreateContactInfo &&
        currentUserId === userId &&
        <span style={{color: "#0d6efd"}}>
                <AboutItem
                    userId={userId}
                    currentUserId={currentUserId}
                    icon={<FaPlus/>}
                    itemLineOne={"Add contact"}
                    itemLineTwo={null}
                    itemLineThree={null}
                    addFunction={() => setShowCreateContactInfo(true)}
                    deleteFunction={null}
                    editFunction={null}
                />
        </span>

    let displayCreateContactInfoForm =  showCreateContactInfo &&
        currentUserId === userId &&
        <CreateContactInfo
            userId={userId}
            contactInfo={contactInfo}
            about={about}
            setAbout={setAbout}
            setShowCreateContactInfo={setShowCreateContactInfo}
        />



    let displayNoContactInfo = !primaryContactInfo && currentUserId !== userId &&
        <AboutItem
            userId={userId}
            currentUserId={currentUserId}
            icon={<FaAddressCard/>}
            itemLineOne={"No contact info to show"}
            itemLineTwo={null}
            itemLineThree={null}
            addFunction={null}
            deleteFunction={null}
            editFunction={null}
        />


    let displayEditContactInfoForm = primaryContactInfo && showEditContactInfo &&
        currentUserId === userId &&
            <EditContactInfo
                userId={userId}
                id={primaryContactInfo.id}
                info={primaryContactInfo.info}
                type={primaryContactInfo.type}
                primary={primaryContactInfo.primary}
                contactInfo={contactInfo}
                about={about}
                setAbout={setAbout}
                setShowEditContactInfo={setShowEditContactInfo}
                setEditContactInfoId={setEditContactInfoId}
            />

    let iconToDisplay = null;

    if(primaryContactInfo &&  primaryContactInfo.type) {
        iconToDisplay = primaryContactInfo && primaryContactInfo.type === "Email"
            ? <FaEnvelope/>
            : primaryContactInfo.type === "Mobile Number"
                ? <FaPhone/>
                : <FaAddressCard/>
    }

    let displayContactInfo = primaryContactInfo && !showEditContactInfo &&
        <AboutItem
            userId={userId}
            currentUserId={currentUserId}
            icon={iconToDisplay}
            itemLineOne={primaryContactInfo.info}
            itemLineTwo={primaryContactInfo.type}
            itemLineThree={null}
            addFunction={null}
            deleteFunction={() => deleteContactInfoById(userId, primaryContactInfo.id, contactInfo, about, setAbout)}
            editFunction={() => setEditContactinfoById(primaryContactInfo.id)}
        />


    return (
        <Row>
            <Col>
                {displayAddContactInfo}
                {displayNoContactInfo}
                {displayCreateContactInfoForm}
                {displayEditContactInfoForm}
                {displayContactInfo}
            </Col>
        </Row>
    )
}

const ContactAndBasicInfo = ({currentUserId, userId, about, setAbout}) => {
    const contactInfo = about.contactAndBasicInfo.contactInfo;
    const websitesAndSocialLinks = about.contactAndBasicInfo.websitesAndSocialLinks;
    const basicInfo = about.contactAndBasicInfo.basicInfo;
    const [showCreateContactInfo, setShowCreateContactInfo] = useState(false);
    const [showEditContactInfo, setShowEditContactInfo] = useState(null);
    const [editContactInfoId, setEditContactInfoId] = useState(null);
    const [showCreateWebsitesAndSocialLinks, setShowCreateWebsitesAndSocialLinks] = useState(false);
    const [showEditWebsitesAndSocialLinks, setShowEditWebsitesAndSocialLinks] = useState(null);
    const [editWebsitesAndSocialLinksId, setEditWebsitesAndSocialLinksId] = useState(null);
    const [showCreateGender, setShowCreateGender] = useState(null);
    const [showEditGender, setShowEditGender] = useState(null);
    const [showCreateBirthday, setShowCreateBirthday] = useState(null);
    const [showEditBirthday, setShowEditBirthday] = useState(null);

    const setEditContactinfoById = (contactToUpdateId) => {
        setShowEditContactInfo(true);
        setEditContactInfoId(contactToUpdateId);
    }

    const setEditWebsiteAndSocialLinkById = (websiteAndSocialLinkToUpdateId) => {
        setShowEditWebsitesAndSocialLinks(true);
        setEditWebsitesAndSocialLinksId(websiteAndSocialLinkToUpdateId);
    }

    const ContactInfoSection = ({}) => {

        let displayAddContactInfo = !showCreateContactInfo
            && currentUserId === userId &&
            <span style={{color: "#0d6efd"}}>
                <AboutItem
                    userId={userId}
                    currentUserId={currentUserId}
                    icon={<FaPlus/>}
                    itemLineOne={"Add contact"}
                    itemLineTwo={null}
                    itemLineThree={null}
                    addFunction={() => setShowCreateContactInfo(true)}
                    deleteFunction={null}
                    editFunction={null}
                />
            </span>


        let displayNoContactInfo = !showCreateContactInfo && contactInfo.length === 0
            && currentUserId !== userId &&
            <AboutItem
                userId={userId}
                currentUserId={currentUserId}
                icon={<FaAddressCard/>}
                itemLineOne={"No contact info to show"}
                itemLineTwo={null}
                itemLineThree={null}
                addFunction={null}
                deleteFunction={null}
                editFunction={null}
            />

        let DisplayCreateContactInfo = showCreateContactInfo
            && currentUserId === userId &&
            <CreateContactInfo
                userId={userId}
                contactInfo={contactInfo}
                about={about}
                setAbout={setAbout}
                setShowCreateContactInfo={setShowCreateContactInfo}
            />

        let contactInfoItems = contactInfo.map((item, index) => {
            let iconToDisplay = item.type === "Email"
                ? <FaEnvelope/>
                : item.type === "Mobile Number"
                    ? <FaPhone/>
                    : <FaAddressCard/>

            return showEditContactInfo && item.id === editContactInfoId
                    ? <EditContactInfo
                        userId={userId}
                        id={item.id}
                        info={item.info}
                        type={item.type}
                        primary={item.primary}
                        contactInfo={contactInfo}
                        about={about}
                        setAbout={setAbout}
                        setShowEditContactInfo={setShowEditContactInfo}
                        setEditContactInfoId={setEditContactInfoId}
                    />
                    :
                    <div key={userId + '-' + index}>
                        <AboutItem
                            userId={userId}
                            currentUserId={currentUserId}
                            icon={iconToDisplay}
                            itemLineOne={item.info}
                            itemLineTwo={item.type}
                            itemLineThree={null}
                            addFunction={null}
                            deleteFunction={() => deleteContactInfoById(userId, item.id, contactInfo, about, setAbout)}
                            editFunction={() => setEditContactinfoById(item.id)}
                        />
                    </div>

        })

return <Row>
        <Col>
            {displayAddContactInfo}
            {displayNoContactInfo}
            {DisplayCreateContactInfo}
            {contactInfoItems}
        </Col>
    </Row>

}

const WebsitesAndSocialLinksSection = ({}) => {

let displayAddContactInfo = !showCreateWebsitesAndSocialLinks
    && currentUserId === userId &&
    <span style={{color: "#0d6efd"}}>
        <AboutItem
            userId={userId}
            currentUserId={currentUserId}
            icon={<FaPlus/>}
            itemLineOne={"Add link"}
            itemLineTwo={null}
            itemLineThree={null}
            addFunction={() => setShowCreateWebsitesAndSocialLinks(true)}
            deleteFunction={null}
            editFunction={null}
        />
    </span>

let displayNoWebsitesAndSocialLinks = !showCreateWebsitesAndSocialLinks
    && websitesAndSocialLinks.length === 0
    && currentUserId !== userId &&
    <AboutItem
        userId={userId}
        currentUserId={currentUserId}
        icon={<FaLink/>}
        itemLineOne={"No websites or social links to show"}
        itemLineTwo={null}
        itemLineThree={null}
        addFunction={null}
        deleteFunction={null}
        editFunction={null}
    />

let displayCreateContactInfo = showCreateWebsitesAndSocialLinks
    && currentUserId === userId &&
    <CreateWebsiteAndSocialLink
        userId={userId}
        websitesAndSocialLinks={websitesAndSocialLinks}
        about={about}
        setAbout={setAbout}
        setShowCreateWebsitesAndSocialLinks={setShowCreateWebsitesAndSocialLinks}
    />

let websitesAndSocialLinkItems = websitesAndSocialLinks.map((item, index) => {
    return showEditWebsitesAndSocialLinks && item.id === editWebsitesAndSocialLinksId
        ? <EditWebsiteAndSocialLink
            userId={userId}
            id={item.id}
            link={item.link}
            description={item.description}
            websitesAndSocialLinks={websitesAndSocialLinks}
            about={about}
            setAbout={setAbout}
            setShowEditWebsitesAndSocialLinks={setShowEditWebsitesAndSocialLinks}
            setEditWebsitesAndSocialLinksId={setEditWebsitesAndSocialLinksId}
        />
        :
        <div key={userId + '-' + index}>
            <AboutItem
                userId={userId}
                currentUserId={currentUserId}
                icon={<FaLink/>}
                itemLineOne={item.link}
                itemLineTwo={item.description}
                itemLineThree={null}
                addFunction={null}
                deleteFunction={() => deleteWebsiteAndSocialLinkById(userId, item.id, websitesAndSocialLinks, about, setAbout)}
                editFunction={() => setEditWebsiteAndSocialLinkById(item.id)}
            />
        </div>
})


return (
    <Row>
        <Col>
            {displayAddContactInfo}
            {displayNoWebsitesAndSocialLinks}
            {displayCreateContactInfo}
            {websitesAndSocialLinkItems}
        </Col>
    </Row>
)
}

const BasicInfoSection = ({}) => {

let displayAddGender =  !basicInfo.gender && !showCreateGender
    && currentUserId === userId &&
    <span style={{color: "#0d6efd"}}>
        <AboutItem
            userId={userId}
            currentUserId={currentUserId}
            icon={<FaPlus/>}
            itemLineOne={"Add gender"}
            itemLineTwo={null}
            itemLineThree={null}
            addFunction={() => setShowCreateGender(true)}
            deleteFunction={null}
            editFunction={null}
        />
    </span>

let displayNoGender = !basicInfo.gender && !showCreateGender
    && currentUserId !== userId &&
    <AboutItem
        userId={userId}
        currentUserId={currentUserId}
        icon={<FaUser/>}
        itemLineOne={"No gender to show"}
        itemLineTwo={null}
        itemLineThree={null}
        addFunction={null}
        deleteFunction={null}
        editFunction={null}
    />


let displayCreateGender = !basicInfo.gender && showCreateGender
    && currentUserId === userId &&
    <CreateGender
        userId={userId}
        basicInfo={basicInfo}
        about={about}
        setAbout={setAbout}
        setShowCreateGender={setShowCreateGender}
    />

let displayEditGender = basicInfo.gender && showEditGender
    && currentUserId === userId &&
    <EditGender
        userId={userId}
        gender={basicInfo.gender}
        basicInfo={basicInfo}
        about={about}
        setAbout={setAbout}
        setShowEditGender={setShowEditGender}
    />

let displayGender = basicInfo.gender && !showCreateGender && !showEditGender &&
    <AboutItem
        userId={userId}
        currentUserId={currentUserId}
        icon={<FaUser/>}
        itemLineOne={basicInfo.gender}
        itemLineTwo="Gender"
        itemLineThree={null}
        addFunction={null}
        deleteFunction={() => deleteGender(userId, basicInfo, about, setAbout)}
        editFunction={() => setShowEditGender(true)}
    />

let displayAddBirthday =  (!basicInfo.birthDay && !basicInfo.birthMonth && !basicInfo.birthYear)
    && !showCreateBirthday && currentUserId === userId &&
    <span style={{color: "#0d6efd"}}>
        <AboutItem
            userId={userId}
            currentUserId={currentUserId}
            icon={<FaPlus/>}
            itemLineOne={"Add birthday"}
            itemLineTwo={null}
            itemLineThree={null}
            addFunction={() => setShowCreateBirthday(true)}
            deleteFunction={null}
            editFunction={null}
        />
    </span>

let displayNoBirthday = (!basicInfo.birthDay && !basicInfo.birthMonth && !basicInfo.birthYear)
    && !showCreateBirthday && currentUserId !== userId &&
    <AboutItem
        userId={userId}
        currentUserId={currentUserId}
        icon={<FaCakeCandles/>}
        itemLineOne={"No birthday to show"}
        itemLineTwo={null}
        itemLineThree={null}
        addFunction={null}
        deleteFunction={null}
        editFunction={null}
    />

let displayCreateBirthday = (!basicInfo.birthDay && !basicInfo.birthMonth && !basicInfo.birthYear)
    && showCreateBirthday && currentUserId === userId &&
    <CreateBirthday
        userId={userId}
        basicInfo={basicInfo}
        about={about}
        setAbout={setAbout}
        setShowCreateBirthday={setShowCreateBirthday}
    />

let displayEditBirthday = (basicInfo.birthDay || basicInfo.birthMonth || basicInfo.birthYear)
    && showEditBirthday && currentUserId === userId &&
    <EditBirthday
        userId={userId}
        day={basicInfo.birthDay}
        month={basicInfo.birthMonth}
        year={basicInfo.birthYear}
        basicInfo={basicInfo}
        about={about}
        setAbout={setAbout}
        setShowEditBirthday={setShowEditBirthday}
    />

const date = new Date(parseInt(basicInfo.birthYear), basicInfo.birthMonth ? parseInt(basicInfo.birthMonth) - 1 : null, parseInt(basicInfo.birthDay));
const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

let displayBirthday = (basicInfo.birthDay || basicInfo.birthMonth || basicInfo.birthYear) && !showEditBirthday &&
    <AboutItem
        userId={userId}
        currentUserId={currentUserId}
        icon={<FaCakeCandles/>}
        itemLineOne={formattedDate}
        itemLineTwo="Birthday"
        itemLineThree={null}
        addFunction={null}
        deleteFunction={() => deleteBirthday(userId, basicInfo, about, setAbout)}
        editFunction={() => setShowEditBirthday(true)}
    />

return (
    <Row>
        <Col>
            {displayAddGender}
            {displayNoGender}
            {displayCreateGender}
            {displayEditGender}
            {displayGender}
            {displayAddBirthday}
            {displayNoBirthday}
            {displayEditBirthday}
            {displayCreateBirthday}
            {displayBirthday}
        </Col>
    </Row>
)
}


return <Row>
    <Row>
        <Col>
            <h4>Contact info</h4>
        </Col>
    </Row>
    <Row>
        <Col>
            <ContactInfoSection/>
        </Col>
    </Row>
    <Row>
        <Col>
            <h4>Websites and social links</h4>
        </Col>
    </Row>
    <Row>
        <Col>
            <WebsitesAndSocialLinksSection/>
        </Col>
    </Row>
    <Row>
        <Col>
            <h4>Basic info</h4>
        </Col>
    </Row>
    <Row>
        <Col>
            <BasicInfoSection/>
        </Col>
    </Row>
    </Row>
}

export default ContactAndBasicInfo;