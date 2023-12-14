import {Col, Row} from "reactstrap";
import React from "react";

const Post = ({name, date, miniProfileImage, content}) => {
    return <Row style={{paddingTop: 50}}>
        <Row>
            <Col className={"col-auto"}>
                {miniProfileImage}
            </Col>
            <Col className={"col-auto"}>
                <h5>{name}</h5>
            </Col>
        </Row>
        <Row style={{paddingTop: 10}}>
            <h6>{date}</h6>
        </Row>
        <Row style={{paddingTop: 10}}>
            <p>{content}</p>
        </Row>
    </Row>
}

export default Post;