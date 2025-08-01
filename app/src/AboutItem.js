import {Col, Row} from "reactstrap";
import {FaBars, FaBriefcase, FaEdit, FaTrash} from "react-icons/fa";
import React from "react";
import Popup from 'reactjs-popup';
import './AboutItem.css'

const AboutItem = ({currentUserId, userId, icon, itemLineOne, itemLineTwo, itemLineThree, addFunction, deleteFunction, editFunction}) => {
    return <div style={{padding: 10 }}>
        <Row>
            { addFunction
                ?
                <Col xs={1} onClick={() => addFunction()} style={{paddingRight: 5}} className={"col-auto"}>
                    <span>{icon}</span>
                </Col>
                :
                <Col xs={1} style={{paddingRight: 5}} className={"col-auto"}>
                    <span>{icon}</span>
                </Col>
            }
            <Col>
                <Col>
                    <Row>
                        { addFunction
                            ?
                            <Col onClick={() => addFunction()}>
                                <span>{itemLineOne}</span>
                            </Col>
                            :
                            <Col>
                                <span>{itemLineOne}</span>
                            </Col>
                        }
                        { currentUserId === userId && deleteFunction && editFunction &&
                            <Col xs={2} className="d-flex justify-content-end">
                                <span>
                                    <Popup
                                        trigger={<button style={{border: "none", backgroundColor: "white"}}><FaBars/></button>}
                                        arrow={true}
                                        closeOnDocumentClick
                                        position="bottom left">
                                        <div className="menu">
                                            <div className="menu-item" onClick={editFunction}>Edit</div>
                                            <div className="menu-item" onClick={deleteFunction}>Delete</div>
                                        </div>
                                    </Popup>
                                </span>
                            </Col>
                        }
                    </Row>
                    <Row>
                        { itemLineTwo &&
                            <Col>
                                <small>{itemLineTwo}</small>
                            </Col>
                        }
                    </Row>
                    <Row>
                        { itemLineThree &&
                            <Col>
                                <small>{itemLineThree}</small>
                            </Col>
                        }
                    </Row>
                </Col>
            </Col>
        </Row>
    </div>
}

export default AboutItem