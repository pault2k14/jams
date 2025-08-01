import {createContext, useMemo, useState, useContext, useEffect} from 'react'

const AboutContext = createContext()
AboutContext.displayName = 'ValueContext'

export const getCurrentEmployer = (workplaces) => {
    console.log("getCurrentEmployer")
    console.log("workplaces")
    console.dir(workplaces)

    if(!workplaces) {
        return null;
    }
    let currentEmployer = workplaces.filter(item => item.current === true);

    if(currentEmployer.length >= 1) {
        return currentEmployer[0];
    }

    return null;
}

export const getFormerEmployerString = (workplaces) => {
    if(!workplaces || workplaces.length === 0) {
        return null;
    }

    let formerEmployers = workplaces.filter(item => item.current === false);
    let formerEmployersString = null;

    if(formerEmployers.length >= 1) {
        formerEmployersString = "Past:";
    }

    for(let i = 0; i < formerEmployers.length; i++) {
        if(i === 0) {
            formerEmployersString = formerEmployersString + " " + formerEmployers[i].company;
        } else if(i === formerEmployers.length - 1) {
            formerEmployersString = formerEmployersString + " and " + formerEmployers[i].company;
        } else {
            formerEmployersString = formerEmployersString + ", " + formerEmployers[i].company;
        }
    }

    return formerEmployersString;
}

export const getHighestLevelOfEducationString = (education) => {
    if(!education) {
        return null;
    }

    if(education.colleges && education.colleges.length >= 1) {
        return "Studied " + education.colleges[education.colleges.length - 1].degree + " at " + education.colleges[education.colleges.length - 1].school
    } else if (education.schools && education.schools.length >= 1) {
        return "Attended " + education.schools[education.schools.length - 1].school
    } else {
        return null
    }
}

export const getCurrentCity = (placesLived) => {
    if(placesLived.currentCity && placesLived.currentCity.city) {
        return placesLived.currentCity.city;
    }

    return null;
}

export const getHometown = (placesLived) => {
    if(placesLived.hometown && placesLived.hometown.city) {
        return placesLived.hometown.city;
    }

    return null;
}

export const getPrimaryContactInfo = (contactInfo) => {
    console.log("contactInfo");
    console.dir(contactInfo);

    if(!contactInfo || contactInfo.length === 0) {
        return null;
    }

    let primaryContact = contactInfo.filter(item => item.primary === true);

    // We found at least one primary contact, return the first contact.
    if(primaryContact.length !== 0) {
        return primaryContact[0];
    }

    // Couldn't find a primary contact, but there is contact info
    return contactInfo[contactInfo.length - 1];
}

export const setStoredAboutByUserId = (userId, about) => {
    console.log("setStoredAboutByUserId setting about in storage for user: " + userId)
    sessionStorage.setItem('about-' + userId, JSON.stringify(about))
}

export const useAbout = () => {
    const context = useContext(AboutContext)
    if (context === undefined) {
        throw new Error('useFriends must be used within a AboutProvider')       }
    return context
}

const AboutProvider = ({ children }) => {
    const [currentUserId, setCurrentUserId] = useState(null);

    const [about, setAbout] = useState(null)
    const aboutObject = useMemo(() => {
        return { about, setAbout }
    }, [about, setAbout])

    const setAboutByUserId = (userId) => {
        console.log("AboutProvider - setAboutByUserId");
        setCurrentUserId(userId);

        if(!sessionStorage.getItem('about-' + userId)) {
            console.log("AboutProvider Unable to find about data for user: " + currentUserId)
            let requiredData = require('../data/about/' + userId);
            setAbout(requiredData.aboutData)
            sessionStorage.setItem('about-' + userId, JSON.stringify(requiredData.aboutData))
        } else {
            console.log("AboutProvider aboutFromStorage")
            let sessionAbout = JSON.parse(sessionStorage.getItem('about-' + userId));
            setAbout(sessionAbout);
        }
    }

    useEffect(() => {
        if(!currentUserId) {
            return;
        }

        sessionStorage.setItem('about-' + currentUserId, JSON.stringify(about));
    }, [about]);


    return <AboutContext.Provider value={{aboutObject, setAboutByUserId}}>{children}</AboutContext.Provider>
}
export default AboutProvider