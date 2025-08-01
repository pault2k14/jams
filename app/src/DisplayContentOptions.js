import {Button, Col, Row} from "reactstrap";
import {FaComment, FaShare, FaThumbsUp} from "react-icons/fa";
import React from "react";


const DisplayContentOptions = ({onCommentClick, onShareClick, onLikeClick, likeColor}) => {
    return <Row xs="16">
        <Col>
            <Button color={likeColor} style={{paddingRight: 5}} onClick={() => onLikeClick()}>
                <FaThumbsUp style={{paddingRight: 5}}/>
                <span style={{paddingRight: 5}}>Like</span>
            </Button>
        </Col>
        <Col>
            <Button color="light" onClick={() => onCommentClick()}>
                <FaComment style={{paddingRight: 5}}/><span>Comment</span>
            </Button>
        </Col>
        <Col>
            <Button color="light" onClick={() => onShareClick()}>
                <FaShare style={{paddingRight: 5}}/><span>Share</span>
            </Button>
        </Col>
    </Row>
}

export default DisplayContentOptions;