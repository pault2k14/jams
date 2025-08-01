import {Button, Col, Form, Input, Row} from "reactstrap";
import React, {useState} from "react";
import { Tooltip } from 'reactstrap';
import './ChatMessage.css'
import {useUsers} from "./context/UsersProvider";
import ChatMessageMouseOver from "./ChatMessageMouseOver";
import {FaArrowAltCircleRight, FaBan, FaCheck} from "react-icons/fa";

const ChatMessage = ({currentUser, userToChatWith, message, updateChatMessageByUserIds, deleteChatMessageByUserIds}) => {
    const {usersObject, getUserById} = useUsers();
    const [showEditMessage, setShowEditMessage] = useState(false);
    const [editedMessage, setEditedMessage] = useState(null);
    const [avatarTooltipOpen, setAvatarTooltipOpen] = useState(false);
    const toggleAvatarTooltip = () => setAvatarTooltipOpen(!avatarTooltipOpen);
    const [messageTooltipOpen, setMessageTooltipOpen] = useState(false);
    const toggleMessageTooltip = () => setMessageTooltipOpen(!messageTooltipOpen);
    let messageDateTime = new Date(message.timestamp);
    let messageDateString = messageDateTime.toLocaleDateString('en-US',
        { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + " at " + messageDateTime.toLocaleTimeString();

    const updateChatMessage = () => {
        setShowEditMessage(true)
        setEditedMessage(message.text);
    }

    const handleChangeMessage = (event) => {
        setEditedMessage(event.target.value);
    }

    const handleSubmit = (event) => {
        let messageToSave = event.target.message.value;
        event.preventDefault();

        let updatedMessage = {
            id: message.id,
            timestamp: message.timestamp,
            userId: message.userId,
            image: message.image,
            avatarBaseUrl: message.avatarBaseUrl,
            text: messageToSave,
        }

        updateChatMessageByUserIds(currentUser, userToChatWith, updatedMessage)
        setEditedMessage(null);
        setShowEditMessage(false);
    }

    if(!message || !currentUser) {
        return null
    }

    let messageUser = getUserById(message.userId);
    let avatarImage = require(message.avatarBaseUrl + message.userId + "/user-image.jpg")
    let imageColumn = <Col xs={2}>
        <Tooltip
            isOpen={avatarTooltipOpen}
            target={"AvatarTooltip" + message.userId}
            toggle={toggleAvatarTooltip}
        >
            {messageUser.name}
        </Tooltip>
        <img id={"AvatarTooltip" + message.userId} style={{display: "block", margin: "0 auto"}} className={'img-circle'} src={avatarImage}/>
    </Col>

    let messageTooltip = <Tooltip
        isOpen={messageTooltipOpen}
        target={"MessageTooltip-" + message.id}
        toggle={toggleMessageTooltip}
    >
        {messageDateString}
    </Tooltip>

    let chatMessageAndToolTip = <ChatMessageMouseOver
        currentUser={currentUser}
        userToChatWith={userToChatWith}
        direction={"left bottom"}
        message={message}
        updateChatMessageByUserIds={updateChatMessage}
        deleteChatMessageByUserIds={deleteChatMessageByUserIds}>
        <span id={"MessageTooltip-" + message.id}>{message.text}</span>
    </ChatMessageMouseOver>

    const EditMessageFormColumn = <Col>
        <Form onSubmit={handleSubmit}>
            <Row style={{alignItems: "center", paddingLeft: 0, paddingRight: 0, marginLeft: 0, marginRight: 0}}>
                <Col style={{paddingLeft: 0, paddingRight: 0}}  xs={4} sm={6} md={7} lg={8} xl={9} xxl={10}>
                    <Input style={{padding: 0}} type="textarea" name="message" id="message" value={editedMessage || ''}
                           placeholder="Say something" onChange={handleChangeMessage} autoComplete="message"/>
                </Col>
                <Col style={{paddingLeft: 10, paddingRight: 0}} xs={8} sm={6} md={5} lg={4} xl={3}  xxl={2}>
                    <button
                        type="Cancel"
                        style={{border: "none", backgroundColor: "white", marginRight: 2}}
                        onClick={() => setShowEditMessage(false)}
                    >
                        <FaBan color="red"/>
                    </button>
                    <button
                        style={{border: "none", backgroundColor: "white"}}
                        type="Post"
                    >
                        <FaCheck color="dodgerblue"/>
                    </button>
                </Col>
            </Row>
        </Form>
    </Col>

    if(message.userId === currentUser.userId) {
        return <Row className={'bubble-container'}>
            {!showEditMessage ? <>
                    <Col xs={10}>
                        <span style={{justifyContent: "end"}} className={"d-flex"}>
                            {messageTooltip}
                            <span className={"bubble current-user"}>
                                {chatMessageAndToolTip}
                            </span>
                        </span>
                    </Col>
                    {imageColumn}
                </>
                : ''
            }
            { showEditMessage && EditMessageFormColumn }
        </Row>

    } else {
        return <Row className={'bubble-container'}>
            {!showEditMessage ?
                <>
                    {imageColumn}
                    <Col xs={10}>
                        <span className={"d-flex"}>
                            {messageTooltip}
                            <span className={"bubble other-user"}>
                                {chatMessageAndToolTip}
                            </span>
                        </span>
                    </Col>
                </> : ''
            }
            { showEditMessage && EditMessageFormColumn }
        </Row>
    }
}

export default ChatMessage;