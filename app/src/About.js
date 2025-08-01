
import React, {useEffect, useState} from 'react';
import './App.css';
import {Button, Col, Container, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import {Menu, MenuItem} from "react-pro-sidebar";
import AboutProvider, {
    getCurrentEmployer,
    getFormerEmployerString,
    getHighestLevelOfEducationString,
    getPrimaryContactInfo,
    useAbout
} from "./context/AboutProvider";
import WorkAndEducation from "./WorkAndEducation";
import PlacesLived from "./PlacesLived";
import ContactAndBasicInfo from "./ContactAndBasicInfo";
import FamilyAndRelationships from "./FamilyAndRelationships";
import Overview from "./Overview";
import './About.css'

const About = ({currentUserId, userId}) => {
    const {aboutObject, setAboutByUserId} = useAbout();
    const {about, setAbout} = aboutObject;
    const [showOverview, setShowOverview] = useState(true);
    const [showWorkAndEducation, setShowWorkAndEducation] = useState(false);
    const [showPlacesLived, setShowPlacesLived] = useState(false);
    const [showContactAndBasicInfo, setShowContactAndBasicInfo] = useState(false);
    const [showFamilyAndRelationships, setShowFamilyAndRelationships] = useState(false);
    const [overviewMenuItemColor, setOverviewMenuItemColor] = useState("#0d6efd");
    const [overviewMenuItemBackgroundColor, setOverviewMenuItemBackgroundColor] = useState("#e1ebfa");
    const [workAndEducationMenuItemColor, setWorkAndEducationMenuItemColor] = useState("black");
    const [workAndEducationMenuItemBackgroundColor, setWorkAndEducationMenuItemBackgroundColor] = useState("white");
    const [placesLivedMenuItemColor, setPlacesLivedMenuItemColor] = useState("black");
    const [placesLivedMenuItemBackgroundColor, setPlacesLivedMenuItemBackgroundColor] = useState("white");
    const [contactAndBasicInfoMenuItemColor, setContactAndBasicInfoMenuItemColor] = useState("black");
    const [contactAndBasicInfoMenuItemBackgroundColor, setContactAndBasicInfoMenuItemBackgroundColor] = useState("white");
    const [familyAndRelationshipsMenuItemColor, setFamilyAndRelationshipsMenuItemColor] = useState("black");
    const [familyAndRelationshipsMenuItemBackgroundColor, setFamilyAndRelationshipsMenuItemBackgroundColor] = useState("white");

    useEffect(() => {
        const fetchData = async () => {
            setAboutByUserId(userId);
        };

        fetchData();
    }, []);

    console.log("aboutObject");
    console.dir(aboutObject);

    const resetMenuColors = () => {
        setOverviewMenuItemColor("black")
        setOverviewMenuItemBackgroundColor("white")
        setWorkAndEducationMenuItemColor("black")
        setWorkAndEducationMenuItemBackgroundColor("white")
        setPlacesLivedMenuItemColor("black")
        setPlacesLivedMenuItemBackgroundColor("white")
        setContactAndBasicInfoMenuItemColor("black")
        setContactAndBasicInfoMenuItemBackgroundColor("white")
        setFamilyAndRelationshipsMenuItemColor("black")
        setFamilyAndRelationshipsMenuItemBackgroundColor("white")
    }

    const resetAllTabs = () => {
        setShowOverview(false);
        setShowWorkAndEducation(false);
        setShowPlacesLived(false);
        setShowContactAndBasicInfo(false);
        setShowFamilyAndRelationships(false);
    }

    const setOverviewActive = () => {
        resetAllTabs();
        setShowOverview(true);
        resetMenuColors();
        setOverviewMenuItemColor("#0d6efd");
        setOverviewMenuItemBackgroundColor("#e1ebfa");
    }

    const setWorkAndEducationActive = () => {
        resetAllTabs();
        setShowWorkAndEducation(true);
        resetMenuColors();
        setWorkAndEducationMenuItemColor("#0d6efd");
        setWorkAndEducationMenuItemBackgroundColor("#e1ebfa");
    }

    const setPlacesLivedActive = () => {
        resetAllTabs();
        setShowPlacesLived(true);
        resetMenuColors();
        setPlacesLivedMenuItemColor("#0d6efd");
        setPlacesLivedMenuItemBackgroundColor("#e1ebfa");
    }

    const setContactAndBasicInfoActive = () => {
        resetAllTabs();
        setShowContactAndBasicInfo(true);
        resetMenuColors();
        setContactAndBasicInfoMenuItemColor("#0d6efd");
        setContactAndBasicInfoMenuItemBackgroundColor("#e1ebfa");
    }

    const setFamilyAndRelationshipsActive = () => {
        resetAllTabs();
        setShowFamilyAndRelationships(true);
        resetMenuColors();
        setFamilyAndRelationshipsMenuItemColor("#0d6efd");
        setFamilyAndRelationshipsMenuItemBackgroundColor("#e1ebfa");
    }

    const RightPanel = () => {
        if(!about) {
            return <p>Loading...</p>
        }

        return (
            <>
                { showOverview
                    && <Overview
                        currentUserId={currentUserId}
                        userId={userId}
                        about={about}
                        setAbout={setAbout}
                    />
                }
                { showWorkAndEducation
                    && <WorkAndEducation
                        currentUserId={currentUserId}
                        userId={userId} about={about}
                        setAbout={setAbout}
                    />
                }
                { showPlacesLived
                    && <PlacesLived
                        currentUserId={currentUserId}
                        userId={userId}
                        about={about}
                        setAbout={setAbout}
                    />
                }
                { showContactAndBasicInfo
                    && <ContactAndBasicInfo
                        currentUserId={currentUserId}
                        userId={userId}
                        about={about}
                        setAbout={setAbout}
                    />
                }
                { showFamilyAndRelationships
                    && <FamilyAndRelationships
                        currentUserId={currentUserId}
                        userId={userId} about={about}
                        setAbout={setAbout}
                    />
                }
            </>
        )
    }

    return (
        <div>
            <Container fluid>
                <Row>
                    <Col xs={3} className={"AboutLeftColumn"}>
                        <Row>
                            <h3>About</h3>
                        </Row>
                        <Row>
                            <Menu>
                                <MenuItem
                                    style={{backgroundColor: overviewMenuItemBackgroundColor, color: overviewMenuItemColor}}
                                    onClick={() => setOverviewActive()}>Overview</MenuItem>
                            </Menu>
                        </Row>
                        <Row>
                            <Menu>
                                <MenuItem
                                    style={{backgroundColor: workAndEducationMenuItemBackgroundColor, color: workAndEducationMenuItemColor}}
                                    onClick={() => setWorkAndEducationActive()}>Work and education</MenuItem>
                            </Menu>
                        </Row>
                        <Row>
                            <Menu>
                                <MenuItem
                                    style={{backgroundColor: placesLivedMenuItemBackgroundColor, color: placesLivedMenuItemColor}}
                                    onClick={() => setPlacesLivedActive()}>Places lived</MenuItem>
                            </Menu>
                        </Row>
                        <Row>
                            <Menu>
                                <MenuItem
                                    style={{backgroundColor: contactAndBasicInfoMenuItemBackgroundColor, color: contactAndBasicInfoMenuItemColor}}
                                    onClick={() => setContactAndBasicInfoActive()}>Contact and basic info</MenuItem>
                            </Menu>
                        </Row>
                        <Row>
                            <Menu>
                                <MenuItem
                                    style={{backgroundColor: familyAndRelationshipsMenuItemBackgroundColor, color: familyAndRelationshipsMenuItemColor}}
                                    onClick={() => setFamilyAndRelationshipsActive()}>Family and relationships</MenuItem>
                            </Menu>
                        </Row>
                    </Col>
                    <Col className={"AboutRightColumn"}>
                        <RightPanel/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default About;

