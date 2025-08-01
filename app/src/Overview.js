import {Col, Row} from "reactstrap";
import {
    getCurrentEmployer,
    getFormerEmployerString,
    getHighestLevelOfEducationString,
    getPrimaryContactInfo
} from "./context/AboutProvider";
import React, {useState} from "react";
import {OverviewRelationshipSection, RelationshipWidget} from "./FamilyAndRelationships";
import {CurrentCitySection, HometownSection, OverviewCurrentCitySection, OverviewHometownSection} from "./PlacesLived";
import {OverviewSchoolSection, OverviewWorkSection} from "./WorkAndEducation";
import {OverviewContactInfoSection} from "./ContactAndBasicInfo";


const Overview = ({currentUserId, userId, about, setAbout}) => {
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

    const setEditWorkById = (id) => {
        setEditWorkId(id)
        setShowEditWork(!showEditWork);
    }

    const setEditContactinfoById = (contactToUpdateId) => {
        setShowEditContactInfo(true);
        setEditContactInfoId(contactToUpdateId);
    }

    return <Row>
        <Row>
            <Col>
                <h4>Overview</h4>
            </Col>
        </Row>
        <Row>
            <Col>
                <h5>
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
                </h5>
            </Col>
        </Row>
        <Row>
            <Col>
                <h5>
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
                </h5>
            </Col>
        </Row>
        <Row>
            <Col>
                <h5>
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
                </h5>
            </Col>
        </Row>
        <Row>
            <Col>
                <h5>
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
                </h5>
            </Col>
        </Row>
        <Row>
            <Col>
                <h5>
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
                </h5>
            </Col>
        </Row>
        <Row>
            <Col>
                <h5>
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
                </h5>
            </Col>
        </Row>
    </Row>
}

export default Overview;