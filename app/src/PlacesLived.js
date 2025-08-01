import {Button, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import React, {useState} from "react";
import {FaEdit, FaHome, FaLocationArrow, FaPlus, FaSchool, FaTrash} from "react-icons/fa";
import {updateAboutHighSchools, updateAboutPlacesLived} from "./context/aboutUtils";
import {setStoredAboutByUserId} from "./context/AboutProvider";
import AboutItem from "./AboutItem";
import {DeleteHighSchool} from "./WorkAndEducation";
import {FaLocationDot} from "react-icons/fa6";


export const selectableYears = () => {
    let selectArray = [];

    for(let i = new Date().getFullYear(); i >= 1900; i--) {
        selectArray.push(<option key={i}>{i}</option>)
    }

    return selectArray;
}

export const CityForm = ({id, city, setCity, dateMoved, setDateMoved, isHometown,
                      isCurrentCity, modifyPlacesLived, closeOperation}) => {
    const handleChangeCity = (event) => {
        setCity(event.target.value);
    }

    const handleChangeDateMoved = (event) => {
        setDateMoved(event.target.value);
    }

    const handleSubmit = async (event) => {
        let cityToSave = event.target.city.value;
        let dateMovedToSave = null
        event.preventDefault();

        let city = null;

        if(isHometown || isCurrentCity) {
            city = {
                city: cityToSave
            }
        } else {
            dateMovedToSave = event.target.dateMoved.value;
            city = {
                id: id,
                city: cityToSave,
                dateMoved: dateMovedToSave
            }
        }

        modifyPlacesLived(city);
    }

    return <div>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Row>
                    <Row style={{padding: 10}}>
                        <Col>
                            <Input type="text" name="city" id="city" value={city || ''}
                                   placeholder="City and State" onChange={handleChangeCity} autoComplete="city"/>
                        </Col>
                    </Row>
                    { !isHometown && !isCurrentCity
                        ? <Row xs={2}>
                            <Col>
                                <Label>Date moved</Label>
                                <Input type="select" name="dateMoved" id="dateMoved" value={dateMoved || ''} onChange={handleChangeDateMoved}>
                                    {selectableYears()}
                                </Input>
                            </Col>
                        </Row>
                        : ''
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

export const CreateCity = ({userId, cities, hometown, currentCity, about, setAbout, setShowCreateCity}) => {
    const [city, setCity] = useState(null);
    const [dateMoved, setDateMoved] = useState(null);
    const timestamp = new Date().getTime();

    const modifyCitiesArray = (newCity) => {
        let citiesToUpdate = [...cities];
        citiesToUpdate.push(newCity);
        let placesLivedToUpdate = {
            cities: citiesToUpdate,
            currentCity: currentCity,
            hometown: hometown
        }

        let updatedAboutObject = updateAboutPlacesLived(about,{...placesLivedToUpdate})
        setAbout(updatedAboutObject)
        setShowCreateCity(false);
        setStoredAboutByUserId(userId, updatedAboutObject)
    }

    const closeOperation = () => {
        setShowCreateCity(false);
    }

    return <CityForm
        id={timestamp}
        city={city}
        setCity={setCity}
        dateMoved={dateMoved}
        setDateMoved={setDateMoved}
        isCurrentCity={false}
        isHometown={false}
        closeOperation={closeOperation}
        modifyPlacesLived={modifyCitiesArray}
    />
}

export const EditCity = ({userId, id, city, dateMoved, cities, hometown, currentCity,
                      about, setAbout, setShowEditCity, setEditCityId}) => {
    const [cityToUpdate, setCityToUpdate] = useState(city);
    const [dateMovedToUpdate, setDateMovedToUpdate] = useState(dateMoved);

    const modifyCityArray = (cityToUpdate) => {
        let citiesToUpdate = [...cities];

        citiesToUpdate = citiesToUpdate.map(city => {
            if(city.id === cityToUpdate.id) {
                return cityToUpdate;
            }
            return city;
        })

        let placesLivedToUpdate = {
            cities: citiesToUpdate,
            currentCity: currentCity,
            hometown: hometown
        }

        let updatedAboutObject = updateAboutPlacesLived(about,{...placesLivedToUpdate})
        setAbout(updatedAboutObject)
        setShowEditCity(false);
        setEditCityId(null);
        setStoredAboutByUserId(userId, updatedAboutObject)
    }

    const closeOperation = () => {
        setShowEditCity(false);
        setEditCityId(null);
    }

    return <CityForm
        id={id}
        city={cityToUpdate}
        setCity={setCityToUpdate}
        dateMoved={dateMovedToUpdate}
        setDateMoved={setDateMovedToUpdate}
        isCurrentCity={false}
        isHometown={false}
        closeOperation={closeOperation}
        modifyPlacesLived={modifyCityArray}
    />
}

export const deleteCityById = (userId, cityIdToDelete, cities, hometown, currentCity, about, setAbout) => {
    let citiesToUpdate = [...cities]
    citiesToUpdate = citiesToUpdate.filter(city => city.id !== cityIdToDelete)
    let placesLivedToUpdate = {
        cities: citiesToUpdate,
        currentCity: currentCity,
        hometown: hometown
    }

    let updatedAboutObject = updateAboutPlacesLived(about,{...placesLivedToUpdate})
    setAbout(updatedAboutObject)
    setStoredAboutByUserId(userId, updatedAboutObject)
}

export const CreateHometown = ({userId, cities, currentCity, about, setAbout, setShowCreateHometown}) => {
    const [city, setCity] = useState(null);
    const [dateMoved, setDateMoved] = useState(null);
    const timestamp = new Date().getTime();

    const modifyCitiesArray = (newHometown) => {
        let placesLivedToUpdate = {
            cities: cities,
            currentCity: currentCity,
            hometown: newHometown
        }

        let updatedAboutObject = updateAboutPlacesLived(about,{...placesLivedToUpdate})
        setAbout(updatedAboutObject)
        setShowCreateHometown(false);
        setStoredAboutByUserId(userId, updatedAboutObject)
    }

    const closeOperation = () => {
        setShowCreateHometown(false);
    }

    return <CityForm
        id={timestamp}
        city={city}
        setCity={setCity}
        dateMoved={dateMoved}
        setDateMoved={setDateMoved}
        isCurrentCity={false}
        isHometown={true}
        closeOperation={closeOperation}
        modifyPlacesLived={modifyCitiesArray}
    />
}

export const EditHometown = ({userId, city, cities, currentCity, about, setAbout, setShowEditHometown}) => {
    const [cityToUpdate, setCityToUpdate] = useState(city);

    const modifyCityArray = (updatedHometown) => {

        let placesLivedToUpdate = {
            cities: cities,
            currentCity: currentCity,
            hometown: updatedHometown
        }

        let updatedAboutObject = updateAboutPlacesLived(about,{...placesLivedToUpdate})
        setAbout(updatedAboutObject)
        setShowEditHometown(false);
        setStoredAboutByUserId(userId, updatedAboutObject)
    }

    const closeOperation = () => {
        setShowEditHometown(false);
    }

    return <CityForm
        city={cityToUpdate}
        setCity={setCityToUpdate}
        isCurrentCity={false}
        isHometown={true}
        closeOperation={closeOperation}
        modifyPlacesLived={modifyCityArray}
    />
}

export const deleteHometown = (userId, cities, currentCity, about, setAbout) => {

    let placesLivedToUpdate = {
        cities: cities,
        currentCity: currentCity,
        hometown: null
    }

    let updatedAboutObject = updateAboutPlacesLived(about,{...placesLivedToUpdate})
    setAbout(updatedAboutObject)
    setStoredAboutByUserId(userId, updatedAboutObject)
}

export const CreateCurrentCity = ({userId, cities, hometown, about, setAbout, setShowCreateCurrentCity}) => {
    const [city, setCity] = useState(null);
    const [dateMoved, setDateMoved] = useState(null);
    const timestamp = new Date().getTime();

    const modifyCitiesArray = (newCurrentCity) => {
        let placesLivedToUpdate = {
            cities: cities,
            currentCity: newCurrentCity,
            hometown: hometown
        }

        let updatedAboutObject = updateAboutPlacesLived(about,{...placesLivedToUpdate})
        setAbout(updatedAboutObject)
        setShowCreateCurrentCity(false);
        setStoredAboutByUserId(userId, updatedAboutObject)
    }

    const closeOperation = () => {
        setShowCreateCurrentCity(false);
    }

    return <CityForm
        id={timestamp}
        city={city}
        setCity={setCity}
        dateMoved={dateMoved}
        setDateMoved={setDateMoved}
        isCurrentCity={true}
        isHometown={false}
        closeOperation={closeOperation}
        modifyPlacesLived={modifyCitiesArray}
    />
}

export const EditCurrentCity = ({userId, city, cities, hometown, about, setAbout, setShowEditCurrentCity}) => {
    const [cityToUpdate, setCityToUpdate] = useState(city);

    const modifyCityArray = (updatedCurrentCity) => {

        let placesLivedToUpdate = {
            cities: cities,
            currentCity: updatedCurrentCity,
            hometown: hometown
        }

        let updatedAboutObject = updateAboutPlacesLived(about,{...placesLivedToUpdate})
        setAbout(updatedAboutObject)
        setShowEditCurrentCity(false);
        setStoredAboutByUserId(userId, updatedAboutObject)
    }

    const closeOperation = () => {
        setShowEditCurrentCity(false);
    }

    return <CityForm
        city={cityToUpdate}
        setCity={setCityToUpdate}
        isCurrentCity={true}
        isHometown={false}
        closeOperation={closeOperation}
        modifyPlacesLived={modifyCityArray}
    />
}

export const deleteCurrentCity = (userId, cities, hometown, about, setAbout) => {

    let placesLivedToUpdate = {
        cities: cities,
        currentCity: null,
        hometown: hometown
    }

    let updatedAboutObject = updateAboutPlacesLived(about,{...placesLivedToUpdate})
    setAbout(updatedAboutObject)
    setStoredAboutByUserId(userId, updatedAboutObject)
}

export const CurrentCitySection = ({currentUserId, userId, currentCity, cities, hometown, about, setAbout,
                                           showCreateCurrentCity, setShowCreateCurrentCity, showEditCurrentCity,
                                           setShowEditCurrentCity}) => {

    let addCurrentCity = !currentCity && !showCreateCurrentCity
        && currentUserId === userId &&
        <span style={{color: "#0d6efd"}}>
            <AboutItem
                userId={userId}
                currentUserId={currentUserId}
                icon={<FaPlus/>}
                itemLineOne="Add current city"
                itemLineTwo={null}
                itemLineThree={null}
                addFunction={() => setShowCreateCurrentCity(true)}
                deleteFunction={null}
                editFunction={null}
            />
        </span>

    let displayNoCurrentCity = !currentCity && !showCreateCurrentCity
        && currentUserId !== userId &&
        <AboutItem
            userId={userId}
            currentUserId={currentUserId}
            icon={<FaHome/>}
            itemLineOne="No current location to show"
            itemLineTwo={null}
            itemLineThree={null}
            addFunction={() => setShowCreateCurrentCity(true)}
            deleteFunction={null}
            editFunction={null}
        />


    let createCurrentCity = !currentCity && showCreateCurrentCity
        && currentUserId === userId &&
        <CreateCurrentCity
            userId={userId}
            cities={cities}
            hometown={hometown}
            about={about}
            setAbout={setAbout}
            setShowCreateCurrentCity={setShowCreateCurrentCity}
        />

    let editCurrentCity = currentCity && showEditCurrentCity
        && currentUserId === userId &&
        <EditCurrentCity
            userId={userId}
            city={currentCity.city}
            cities={cities}
            hometown={hometown}
            about={about}
            setAbout={setAbout}
            setShowEditCurrentCity={setShowEditCurrentCity}
        />

    let currentCityDisplay = currentCity && !showEditCurrentCity &&
        <AboutItem
            userId={userId}
            currentUserId={currentUserId}
            icon={<FaHome/>}
            itemLineOne={currentCity.city}
            itemLineTwo={"Current city"}
            itemLineThree={null}
            addFunction={null}
            deleteFunction={() => deleteCurrentCity(userId, cities, hometown, about, setAbout)}
            editFunction={() => setShowEditCurrentCity(true)}
        />

    return <>
        {addCurrentCity}
        {createCurrentCity}
        {editCurrentCity}
        {displayNoCurrentCity}
        {currentCityDisplay}
    </>
}

export const OverviewCurrentCitySection = ({currentUserId, userId, currentCity, cities, hometown, about, setAbout,
                                       showCreateCurrentCity, setShowCreateCurrentCity, showEditCurrentCity,
                                       setShowEditCurrentCity}) => {

    let addCurrentCity = !currentCity && !showCreateCurrentCity && currentUserId === userId &&
        <span style={{color: "#0d6efd"}}>
            <AboutItem
                userId={userId}
                currentUserId={currentUserId}
                icon={<FaPlus/>}
                itemLineOne={"Add current city"}
                itemLineTwo={null}
                itemLineThree={null}
                addFunction={() => setShowCreateCurrentCity(true)}
                deleteFunction={null}
                editFunction={null}
            />
        </span>

    let displayNoCurrentCity = !currentCity && !showCreateCurrentCity && currentUserId !== userId &&
        <AboutItem
            userId={userId}
            currentUserId={currentUserId}
            icon={<FaLocationDot/>}
            itemLineOne={"No current location to show"}
            itemLineTwo={null}
            itemLineThree={null}
            addFunction={null}
            deleteFunction={null}
            editFunction={null}
        />


    let createCurrentCity = !currentCity && showCreateCurrentCity
        && currentUserId === userId &&
        <CreateCurrentCity
            userId={userId}
            cities={cities}
            hometown={hometown}
            about={about}
            setAbout={setAbout}
            setShowCreateCurrentCity={setShowCreateCurrentCity}
        />


    let editCurrentCity = currentCity && showEditCurrentCity
        && currentUserId === userId &&
        <EditCurrentCity
            userId={userId}
            city={currentCity.city}
            cities={cities}
            hometown={hometown}
            about={about}
            setAbout={setAbout}
            setShowEditCurrentCity={setShowEditCurrentCity}
        />


    let currentCityOverviewDisplay = currentCity && !showEditCurrentCity &&
        <AboutItem
            userId={userId}
            currentUserId={currentUserId}
            icon={<FaHome/>}
            itemLineOne={"Lives in " + currentCity.city}
            itemLineTwo={null}
            itemLineThree={null}
            addFunction={null}
            deleteFunction={() => deleteCurrentCity(userId, cities, hometown, about, setAbout)}
            editFunction={() => setShowEditCurrentCity(true)}
        />


    return <Row>
        <Col>
            {addCurrentCity}
            {createCurrentCity}
            {editCurrentCity}
            {displayNoCurrentCity}
            {currentCityOverviewDisplay}
        </Col>
    </Row>
}

export const HometownSection = ({currentUserId, userId, hometown, currentCity, cities, about, setAbout, showCreateHometown,
                             setShowCreateHometown, showEditHometown, setShowEditHometown}) => {

    let addHometown = !hometown && !showCreateHometown
        && currentUserId === userId &&
        <span style={{color: "#0d6efd"}}>
            <AboutItem
                userId={userId}
                currentUserId={currentUserId}
                icon={<FaPlus/>}
                itemLineOne={"Add a hometown"}
                itemLineTwo={null}
                itemLineThree={null}
                addFunction={() => setShowCreateHometown(true)}
                deleteFunction={null}
                editFunction={null}
            />
        </span>


    let displayNoHometown = !hometown && !showCreateHometown
        && currentUserId !== userId &&
        <AboutItem
            userId={userId}
            currentUserId={currentUserId}
            icon={<FaLocationDot/>}
            itemLineOne={"No hometown to show"}
            itemLineTwo={null}
            itemLineThree={null}
            addFunction={null}
            deleteFunction={null}
            editFunction={null}
        />


    let createHometown = !hometown && showCreateHometown
        && currentUserId === userId &&
        <CreateHometown
            userId={userId}
            cities={cities}
            currentCity={currentCity}
            about={about}
            setAbout={setAbout}
            setShowCreateHometown={setShowCreateHometown}
        />

    let editHometown = hometown && showEditHometown
        && currentUserId === userId &&
        <EditHometown
            userId={userId}
            city={hometown.city}
            cities={cities}
            currentCity={currentCity}
            about={about}
            setAbout={setAbout}
            setShowEditHometown={setShowEditHometown}
        />
    let hometownDisplay = hometown && !showEditHometown &&
        <AboutItem
            userId={userId}
            currentUserId={currentUserId}
            icon={<FaLocationDot/>}
            itemLineOne={hometown.city}
            itemLineTwo="Hometown"
            itemLineThree={null}
            addFunction={null}
            deleteFunction={() => deleteHometown(userId, cities, currentCity, about, setAbout)}
            editFunction={() => setShowEditHometown(true)}
        />


    return <>
        {addHometown}
        {createHometown}
        {editHometown}
        {displayNoHometown}
        {hometownDisplay}
    </>
}

export const OverviewHometownSection = ({currentUserId, userId, hometown, currentCity, cities, about, setAbout, showCreateHometown,
                                    setShowCreateHometown, showEditHometown, setShowEditHometown}) => {

    let addHometown = !hometown && !showCreateHometown
        && currentUserId === userId &&
        <span style={{color: "#0d6efd"}}>
            <AboutItem
                userId={userId}
                currentUserId={currentUserId}
                icon={<FaPlus/>}
                itemLineOne={"Add a hometown"}
                itemLineTwo={null}
                itemLineThree={null}
                addFunction={() => setShowCreateHometown(true)}
                deleteFunction={null}
                editFunction={null}
            />
        </span>


    let displayNoHometown = !hometown && !showCreateHometown
        && currentUserId !== userId &&
        <AboutItem
            userId={userId}
            currentUserId={currentUserId}
            icon={<FaLocationDot/>}
            itemLineOne={"No hometown info to show"}
            itemLineTwo={null}
            itemLineThree={null}
            addFunction={null}
            deleteFunction={null}
            editFunction={null}
        />


    let createHometown = !hometown && showCreateHometown
        && currentUserId === userId &&
        <CreateHometown
            userId={userId}
            cities={cities}
            currentCity={currentCity}
            about={about}
            setAbout={setAbout}
            setShowCreateHometown={setShowCreateHometown}
        />


    let editHometown = hometown && showEditHometown
        && currentUserId === userId &&
        <EditHometown
            userId={userId}
            city={hometown.city}
            cities={cities}
            currentCity={currentCity}
            about={about}
            setAbout={setAbout}
            setShowEditHometown={setShowEditHometown}
        />



    let hometownOverviewDisplay = hometown && !showEditHometown &&
        <AboutItem
            userId={userId}
            currentUserId={currentUserId}
            icon={<FaLocationDot/>}
            itemLineOne={"From " + hometown.city}
            itemLineTwo={null}
            itemLineThree={null}
            addFunction={null}
            deleteFunction={() => deleteHometown(userId, cities, currentCity, about, setAbout)}
            editFunction={() => setShowEditHometown(true)}
        />


    return <Row>
        <Col>
            {addHometown}
            {createHometown}
            {editHometown}
            {displayNoHometown}
            {hometownOverviewDisplay}
        </Col>
    </Row>
}

const PlacesLived = ({currentUserId, userId, about, setAbout}) => {
    const cities = about.placesLived.cities;
    const currentCity = about.placesLived.currentCity;
    const hometown = about.placesLived.hometown;
    const [showCreateCity, setShowCreateCity] = useState(false);
    const [showCreateHometown, setShowCreateHometown] = useState(null);
    const [showEditHometown, setShowEditHometown] = useState(false);
    const [showCreateCurrentCity, setShowCreateCurrentCity] = useState(false);
    const [showEditCurrentCity, setShowEditCurrentCity] = useState(false);
    const [showEditCity, setShowEditCity] = useState(false);
    const [editCityId, setEditCityId] = useState(null);


    const setEditCityById = (cityToEditId) => {
        setEditCityId(cityToEditId)
        setShowEditCity(true);
    }

    const PlacesSection = ({}) => {

        let displayAddCity = !showCreateCity
            && currentUserId === userId &&
            <span style={{color: "#0d6efd"}}>
                <AboutItem
                    userId={userId}
                    currentUserId={currentUserId}
                    icon={<FaPlus/>}
                    itemLineOne={"Add city"}
                    itemLineTwo={null}
                    itemLineThree={null}
                    addFunction={() => setShowCreateCity(true)}
                    deleteFunction={null}
                    editFunction={null}
                />
            </span>


        let displayNoCity = !showCreateCity && cities.length === 0
            && currentUserId !== userId &&
            <AboutItem
                userId={userId}
                currentUserId={currentUserId}
                icon={<FaLocationDot/>}
                itemLineOne={"No places to show"}
                itemLineTwo={null}
                itemLineThree={null}
                addFunction={null}
                deleteFunction={null}
                editFunction={null}
            />


        let DisplayCreateCity = showCreateCity
            && currentUserId === userId &&
            <CreateCity
                userId={userId}
                cities={cities}
                hometown={hometown}
                currentCity={currentCity}
                about={about}
                setAbout={setAbout}
                setShowCreateCity={setShowCreateCity}
            />


        let displayPlaces = cities.map((item, index) => {
            return showEditCity && editCityId === item.id
                ? <EditCity
                    userId={userId}
                    id={item.id}
                    city={item.city}
                    dateMoved={item.dateMoved}
                    cities={cities}
                    hometown={hometown}
                    currentCity={currentCity}
                    about={about}
                    setAbout={setAbout}
                    setEditCityId={setEditCityId}
                    setShowEditCity={setShowEditCity}
                />
                :
                <AboutItem
                    userId={userId}
                    currentUserId={currentUserId}
                    icon={<FaLocationDot/>}
                    itemLineOne={item.city}
                    itemLineTwo={"Moved in " + item.dateMoved}
                    itemLineThree={null}
                    addFunction={null}
                    deleteFunction={() => deleteCityById(userId, item.id,
                        cities, hometown, currentCity, about, setAbout)}
                    editFunction={() => setEditCityById(item.id)}
                />

        });
        return <Row>
            <Col>
                {displayAddCity}
                {displayNoCity}
                {DisplayCreateCity}
                {displayPlaces}
            </Col>
        </Row>
    }

    return <Row>
        <Row>
            <Col>
                <h4>Places lived</h4>
            </Col>
        </Row>
        <Row>
            <Col>
                <PlacesSection/>
                <CurrentCitySection
                    currentUserId={currentUserId}
                    userId={userId}
                    currentCity={currentCity}
                    hometown={hometown}
                    cities={cities}
                    about={about}
                    setAbout={setAbout}
                    showCreateCurrentCity={showCreateCurrentCity}
                    showEditCurrentCity={showEditCurrentCity}
                    setShowCreateCurrentCity={setShowCreateCurrentCity}
                    setShowEditCurrentCity={setShowEditCurrentCity}
                />
                <HometownSection
                    currentUserId={currentUserId}
                    userId={userId}
                    hometown={hometown}
                    currentCity={currentCity}
                    cities={cities}
                    about={about}
                    setAbout={setAbout}
                    showCreateHometown={showCreateHometown}
                    setShowCreateHometown={setShowCreateHometown}
                    setShowEditHometown={setShowEditHometown}
                    showEditHometown={showEditHometown}
                />
            </Col>
        </Row>

    </Row>
}
export default PlacesLived;