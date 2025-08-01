import {getCurrentCity, getCurrentEmployer, getHighestLevelOfEducationString, getHometown} from "./AboutProvider";
import about from "../About";
import {FaBriefcase, FaGraduationCap, FaHome} from "react-icons/fa";
import {FaH} from "react-icons/fa6";


export const getAboutObjectByUserId = (userId) => {
    console.log("AboutUtils - getAboutObjectByUserId");

    if(!sessionStorage.getItem('about-' + userId)) {
        console.log("AboutUtils Unable to find about data for user: " + userId)
        let requiredData = require('../data/about/' + userId);
        sessionStorage.setItem('about-' + userId, JSON.stringify(requiredData.aboutData))
        return requiredData.aboutData;
    } else {
        console.log("AboutUtils aboutFromStorage")
        let sessionAbout = JSON.parse(sessionStorage.getItem('about-' + userId));
        return sessionAbout;
    }
}

export const getAboutByLine = (aboutObject) => {
    let employer = getCurrentEmployer(aboutObject.workAndEducation.work);
    let education = getHighestLevelOfEducationString(aboutObject.workAndEducation);
    let currentCity = getCurrentCity(aboutObject.placesLived);
    let hometown = getHometown(aboutObject.placesLived);

    if(employer) {
        return <span>
            <FaBriefcase style={{marginRight: 5}}/>{employer.title + " at " + employer.company}
        </span> ;
    } else if(education) {
        return <span>
            <FaGraduationCap style={{marginRight: 5}}/>{education}
        </span>
    } else if(currentCity) {
        return <span>
            <FaHome style={{marginRight: 5}}/>{"Lives in " + currentCity}
        </span>
    } else if(hometown) {
        return <span>
            <FaHome style={{marginRight: 5}}/>{"From " + hometown}
        </span>
    }

    return null;
}

export const updateAboutBiography = (about, biography) => {
    return updateAboutObject(about, biography, null, null, null, null,
        null, null, null,
        null, null)
}

export const updateAboutWork = (about, work) => {
    return updateAboutObject(about, null, work, null, null, null,
        null, null, null,
        null, null)
}

export const updateAboutColleges = (about, colleges) => {
    return updateAboutObject(about, null, null, colleges, null, null,
        null, null, null,
        null, null)
}

export const updateAboutHighSchools = (about, highSchools) => {
    return updateAboutObject(about, null, null, null, highSchools, null,
        null, null, null,
        null, null)
}

export const updateAboutPlacesLived = (about, placesLived) => {
    return updateAboutObject(about, null, null, null, null, placesLived,
        null, null, null,
        null, null)
}

export const updateAboutContactInfo = (about, contactInfo) => {
    return updateAboutObject(about, null, null, null, null, null,
        contactInfo, null, null,
        null, null)
}

export const updateAboutWebsitesAndSocialLinks = (about, websitesAndSocialLinks) => {
    return updateAboutObject(about, null, null, null, null, null,
        null, websitesAndSocialLinks, null,
        null, null)
}

export const updateAboutBasicInfo = (about, basicInfo) => {
    return updateAboutObject(about, null, null, null, null, null,
        null, null, basicInfo,
        null, null)
}

export const updateAboutRelationship = (about, relationship) => {
    return updateAboutObject(about, null, null, null, null, null,
        null, null, null,
        relationship, null)
}

export const updateAboutFamilyMembers = (about, familyMembers) => {
    return updateAboutObject(about, null, null, null, null, null,
        null, null, null,
        null, familyMembers)
}

export const updateAboutObject = (about, biography, work, colleges, highSchools, placesLived,
                           contactInfo, websitesAndSocialLinks, basicInfo,
                           relationship, familyMembers) => {
    console.log("updateAboutObject function")
    console.log("biography");
    console.dir(biography)

    let newAboutObject = {
        biography: biography ? {...biography} : {...about.biography},
        workAndEducation: {
            work: work ? [...work] : [...about.workAndEducation.work],
            colleges: colleges ? [...colleges] : [...about.workAndEducation.colleges],
            highSchools: highSchools ? [...highSchools] : [...about.workAndEducation.highSchools]
        },
        placesLived: placesLived ? {...placesLived} : {...about.placesLived},
        contactAndBasicInfo: {
            contactInfo: contactInfo ? [...contactInfo] : [...about.contactAndBasicInfo.contactInfo],
            websitesAndSocialLinks: websitesAndSocialLinks ? [...websitesAndSocialLinks]
                : [...about.contactAndBasicInfo.websitesAndSocialLinks],
            basicInfo: basicInfo ? {...basicInfo} : {...about.contactAndBasicInfo.basicInfo}
        },
        familyAndRelationships: {
            relationship: relationship ? {...relationship} : {...about.familyAndRelationships.relationship},
            familyMembers: familyMembers ? [...familyMembers] : [...about.familyAndRelationships.familyMembers]
        }
    }

    console.log("newAboutObject")
    console.dir(newAboutObject)

    return newAboutObject;
}