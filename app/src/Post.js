import {Col, Row} from "reactstrap";
import React from "react";
import {FaShare, FaThumbsUp} from "react-icons/fa";

const Post = ({name, timestamp, miniProfileImage, content}) => {
    const postDate = new Date(timestamp);

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
            <h6>{postDate.toLocaleDateString() + " at " + postDate.toLocaleTimeString()}</h6>
        </Row>
        <Row style={{paddingTop: 10}}>
            <p>{content}</p>
        </Row>
        <Row><Col className={"col-auto"}><FaShare/></Col><Col className={"col-auto"}><FaThumbsUp/></Col></Row>
    </Row>
}

export default Post;