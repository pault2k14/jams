import {FaA, FaB, FaD, FaE, FaJ, FaK, FaM, FaR, FaS, FaT} from "react-icons/fa6";
import React from "react";

export const aboutData = {
    biography: {biography: "I rose from humble beginnings in a Kentucky log cabin to become a pivotal figure in American history, leading the nation through the Civil War and issuing the Emancipation Proclamation, which effectively ended slavery; largely self-educated, I served in the Illinois state legislature and gained national prominence through my debates with Stephen Douglas before being elected president in 1860, where my commitment to preserving the Union during the war solidified my legacy as a great American leader."},
    workAndEducation: {
        work: [
            {
                id: 1,
                title: "Electrician",
                company: "Nymphstar",
                city: "San Bernardino",
                description: "Managed the marking department at AirBnB",
                startDate: "2000",
                endDate: null,
                current: true
            },
            {
                id: 2,
                title: "Barista",
                company: "Starbucks",
                city: "Seattle",
                description: "Worked to make coffee",
                startDate: "1996",
                endDate: "2000",
                current: false
            },
            {
                id: 3,
                title: "Grocery Clerk",
                company: "Kroger",
                city: "San Francisco",
                description: "Stock shelves",
                startDate: "1994",
                endDate: "1995",
                current: false
            },
            {
                id: 4,
                title: "Paperboy",
                company: "San Fransico Times",
                city: "San Francisco",
                description: "Delivered newspapers",
                startDate: "1992",
                endDate: "1993",
                current: false
            }],
        colleges: [
            {
                id: 1,
                degree: "Computer Science",
                concentrationOne: "Software Engineering",
                concentrationTwo: "Networking",
                concentationThree: "Compilers",
                graduated: true,
                graduateSchool: false,
                school: "UC Berkley",
                startClassYear: "1996",
                description: "I studied very hard",
                graduatingClassYear: "2000"
            }],
        highSchools: [
            {
                id: 1,
                graduated: true,
                school: "San Francision High School",
                description: "I studied many things in high school",
                startClassYear: "1992",
                graduatingClassYear: "1996"
            }],
    },
    placesLived: {
        cities: [
            {
                id: 1,
                city: "Portland, Oregon",
                dateMoved: "2008",
            },
            {
                id: 2,
                city: "Seattle, Washington",
                dateMoved: "2000",
            }
        ],
        currentCity: {
            city: "Beaverton, Oregon"
        },
        hometown: {
            city: "San Franciso, Califronia"
        }
    },
    contactAndBasicInfo:  {
        contactInfo: [
            {
                id: 1,
                info: "503-555-1212",
                type: "Mobile Number",
                primary: true
            },
            {
                id: 2,
                info: "user@example.com",
                type: "Email",
                primary: false
            }
        ],
        websitesAndSocialLinks: [
            {
                id: 1,
                link: "https://example.com",
                description: "Personal Website"
            },
        ],
        basicInfo: {
            gender: "Male",
            birthDay: 25,
            birthMonth: 9,
            birthYear: 1980
        }
    },
    familyAndRelationships: {
        relationship: {
            status: "Married",
            fromYear: 2001,
            fromMonth: 10,
            fromDay: 3,
            name: "Janet Doe",
            description: "Married to Janet Doe"
        },
        familyMembers: [
            {
                id: 1,
                name: "John Doe",
                description: "Father"
            },
            {
                id: 2,
                name: "Jane Doe",
                description: "Mother"
            }
        ]
    }
}

export default aboutData;