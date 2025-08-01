import {
    getCurrentEmployer,
    getFormerEmployerString,
    getHighestLevelOfEducationString, getHometown, getPrimaryContactInfo,
    useAbout
} from "./context/AboutProvider";
import {Col, Row} from "reactstrap";
import React, {useEffect, useState} from "react";
import {OverviewSchoolSection, OverviewWorkSection} from "./WorkAndEducation";
import {OverviewCurrentCitySection, OverviewHometownSection} from "./PlacesLived";
import {OverviewRelationshipSection} from "./FamilyAndRelationships";
import {OverviewContactInfoSection} from "./ContactAndBasicInfo";
import Biography from "./Biography";



const Intro = ({currentUserId, userId}) => {
    const {aboutObject, setAboutByUserId} = useAbout();
    const {about, setAbout} = aboutObject;
    const [loading, setLoading] = useState(false);
    const [showCreateRelationshipStatus, setShowCreateRelationshipStatus] = useState(false);
    const [showEditRelationshipStatus, setShowEditRelationshipStatus] = useState(false);
    const [showCreateHometown, setShowCreateHometown] = useState(null);
    const [showEditHometown, setShowEditHometown] = useState(false);
    const [showCreateCurrentCity, setShowCreateCurrentCity] = useState(false);
    const [showEditCurrentCity, setShowEditCurrentCity] = useState(false);
    const [showEditWork, setShowEditWork] = useState(false);
    const [editWorkId, setEditWorkId] = useState(null);
    const [showCreateWork, setShowCreateWork] = useState(false);
    const [showEditCollege, setShowEditCollege] = useState(false);
    const [editCollegeId, setEditCollegeId] = useState(null);
    const [showCreateCollege, setShowCreateCollege] = useState(false);
    const [showEditHighSchool, setShowEditHighSchool] = useState(false);
    const [editHighSchoolId, setEditHighSchoolId] = useState(null);
    const [showCreateHighSchool, setShowCreateHighSchool] = useState(false);
    const [showCreateContactInfo, setShowCreateContactInfo] = useState(false);
    const [showEditContactInfo, setShowEditContactInfo] = useState(null);
    const [editContactInfoId, setEditContactInfoId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            setAboutByUserId(userId);
            setLoading(false);
        };

        fetchData();
    }, [userId]);

    if(loading || !about) {
        return <p>Loading... </p>
    }

    const setEditWorkById = (id) => {
        setEditWorkId(id)
        setShowEditWork(!showEditWork);
    }

    const setEditContactinfoById = (contactToUpdateId) => {
        setShowEditContactInfo(true);
        setEditContactInfoId(contactToUpdateId);
    }

    return <div style={{
        backgroundColor: "white"
    }}>
        { about.biography &&
            <Row>
                <Col>
                    <span>
                        <Biography
                            userId={userId}
                            currentUserId={currentUserId}
                            biography={about.biography}
                            about={about}
                            setAbout={setAbout}/>
                    </span>
                </Col>
                <hr style={{margin: 10, border: "solid"}} />
            </Row>
        }
        <Row>
            <Col>
                <span>
                    <OverviewWorkSection
                        currentUserId={currentUserId}
                        userId={userId}
                        work={about.workAndEducation.work}
                        about={about}
                        setAbout={setAbout}
                        editWorkId={editWorkId}
                        setEditWorkId={setEditWorkId}
                        showCreateWork={showCreateWork}
                        setShowCreateWork={setShowCreateWork}
                        showEditWork={showEditWork}
                        setShowEditWork={setShowEditWork}
                        setEditWorkById={setEditWorkById}
                    />
                </span>
            </Col>
        </Row>
        <Row>
            <Col>
                <span>
                    <OverviewSchoolSection
                        currentUserId={currentUserId}
                        userId={userId}
                        highSchools={about.workAndEducation.highSchools}
                        colleges={about.workAndEducation.colleges}
                        about={about}
                        setAbout={setAbout}
                        showCreateCollege={showCreateCollege}
                        setShowCreateCollege={setShowCreateCollege}
                        showEditCollege={showEditCollege}
                        setShowEditCollege={setShowEditCollege}
                        editCollegeId={editCollegeId}
                        setEditCollegeId={setEditCollegeId}
                        showCreateHighSchool={showCreateHighSchool}
                        setShowCreateHighSchool={setShowCreateHighSchool}
                        showEditHighSchool={showEditHighSchool}
                        setShowEditHighSchool={setShowEditHighSchool}
                        editHighSchoolId={editHighSchoolId}
                        setEditHighSchoolId={setEditHighSchoolId}
                    />
                </span>
            </Col>
        </Row>
        <Row>
            <Col>
                <span>
                    <OverviewCurrentCitySection
                        currentUserId={currentUserId}
                        userId={userId}
                        currentCity={about.placesLived.currentCity}
                        hometown={about.placesLived.hometown}
                        cities={about.placesLived.cities}
                        about={about}
                        setAbout={setAbout}
                        showCreateCurrentCity={showCreateCurrentCity}
                        setShowCreateCurrentCity={setShowCreateCurrentCity}
                        showEditCurrentCity={showEditCurrentCity}
                        setShowEditCurrentCity={setShowEditCurrentCity}
                    />
                </span>
            </Col>
        </Row>
        <Row>
            <Col>
                <span>
                    <OverviewHometownSection
                        currentUserId={currentUserId}
                        userId={userId}
                        hometown={about.placesLived.hometown}
                        currentCity={about.placesLived.currentCity}
                        cities={about.placesLived.cities}
                        about={about}
                        setAbout={setAbout}
                        showCreateHometown={showCreateHometown}
                        setShowCreateHometown={setShowCreateHometown}
                        showEditHometown={showEditHometown}
                        setShowEditHometown={setShowEditHometown}
                    />
                </span>
            </Col>
        </Row>
        <Row>
            <Col>
                <span>
                    <OverviewRelationshipSection
                        currentUserId={currentUserId}
                        userId={userId}
                        about={about}
                        setAbout={setAbout}
                        relationship={about.familyAndRelationships.relationship}
                        showCreateRelationshipStatus={showCreateRelationshipStatus}
                        setShowCreateRelationshipStatus={setShowCreateRelationshipStatus}
                        showEditRelationshipStatus={showEditRelationshipStatus}
                        setShowEditRelationshipStatus={setShowEditRelationshipStatus}
                    />
                </span>
            </Col>
        </Row>
        <Row>
            <Col>
                <span>
                    <OverviewContactInfoSection
                        currentUserId={currentUserId}
                        userId={userId}
                        contactInfo={about.contactAndBasicInfo.contactInfo}
                        about={about}
                        setAbout={setAbout}
                        editContactInfoId={editContactInfoId}
                        setEditContactInfoId={setEditContactInfoId}
                        showCreateContactInfo={showCreateContactInfo}
                        setShowCreateContactInfo={setShowCreateContactInfo}
                        setShowEditContactInfo={setShowEditContactInfo}
                        showEditContactInfo={showEditContactInfo}
                        setEditContactinfoById={setEditContactinfoById}
                    />
                </span>
            </Col>
        </Row>
    </div>

}

export default Intro;