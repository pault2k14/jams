import {Button, CloseButton, Col, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";
import './FloatingChat.css'
import avatarImage from "./data/images/avatar-640.png";
import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import {selectableYears} from "./WorkAndEducation";
import {FaArrowAltCircleRight} from "react-icons/fa";
import ChatMessage from "./ChatMessage";
import {useChat} from "./context/ChatProvider";


const FloatingChat = ({currentUser, isFloatingChatOpen, setIsFloatingChatOpen}) => {
    const {userToChatWithObject, chatMessagesObject, chatWindowObject,
        setChatMessagesByUserIds, addChatMessageByUserIds, updateChatMessageByUserIds,
        deleteChatMessageByUserIds} = useChat();
    const {chatMessages, setChatMessages} = chatMessagesObject;
    const {userToChatWith, setUserToChatWith} = userToChatWithObject;
    const [newChatMessage, setNewChatMessage] = useState(null);
    const lastChatMessageRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            if(lastChatMessageRef.current) {
                lastChatMessageRef.current.scrollIntoView({ behavior: 'smooth' });
            }

        };

        fetchData();
    }, [lastChatMessageRef.current, chatMessages]);

    const handleChangeMessage = event => {
        setNewChatMessage(event.target.value);
    }

    const handleSubmit = (event) => {
        let messageToSave = event.target.message.value;
        let timestamp = new Date().getTime();

        event.preventDefault();

        let newMessage = {
            id: timestamp,
            timestamp: timestamp,
            userId: currentUser.userId,
            image: "avatar-640.png",
            avatarBaseUrl: "./data/images/",
            text: messageToSave,
        }

        addChatMessageByUserIds(currentUser, userToChatWith, newMessage)
        setNewChatMessage(null);
    }

    return <Container fluid className={"chatbox-container"}>
            <Row className={"chatbox-header"}>
                <Col xs={11}>
                    <span style={{fontSize: "20px", color: "white"}}>{userToChatWith ? userToChatWith.name : "Messenger"}</span>
                </Col>
                <Col style={{padding: 0, alignContent: "end"}} xs={1}>
                    <CloseButton onClick={() => setIsFloatingChatOpen(false)}/>
                </Col>
            </Row>
        <div className={"chatbox-message-list"}>
            <Row style={{padding: 0}}>
                {chatMessages.map((message, index) => {
                    if(index === chatMessages.length - 1) {
                        // Extra span specifically to attach ref, easier than forwardRef usage
                        return <span key={"message-" + message.id} ref={lastChatMessageRef}>
                            <ChatMessage
                                currentUser={currentUser}
                                userToChatWith={userToChatWith}
                                message={message}
                                updateChatMessageByUserIds={updateChatMessageByUserIds}
                                deleteChatMessageByUserIds={deleteChatMessageByUserIds}
                            />
                        </span>
                    } else {
                        return <ChatMessage
                            key={"message-" + message.id}
                            currentUser={currentUser}
                            userToChatWith={userToChatWith}
                            message={message}
                            updateChatMessageByUserIds={updateChatMessageByUserIds}
                            deleteChatMessageByUserIds={deleteChatMessageByUserIds}
                        />
                    }
                })
                }
            </Row>
        </div>

            <Row className={"chatbox-input"}>
                <Form onSubmit={handleSubmit}>
                    <Row style={{paddingLeft: 0, paddingRight: 0, marginLeft: 0, marginRight: 0}}>
                        <Col style={{paddingLeft: 0, paddingRight: 5, alignContent: "center", justifyContent: "center"}} xs={10}>
                            <Input style={{border: "none"}}type="text" name="message" id="message" value={newChatMessage || ''}
                                   placeholder="Say something" onChange={handleChangeMessage} autoComplete="message"/>

                        </Col>
                        <Col style={{paddingLeft: 0, paddingRight: 0, alignContent: "center", justifyContent: "center"}} xs={2}>
                            <button
                                type="submit"
                                style={{border: "none", backgroundColor: "white"}}
                            >
                                <FaArrowAltCircleRight size={40} color="dodgerblue"/>
                            </button>
                        </Col>
                    </Row>
                </Form>
            </Row>
    </Container>
}

export default FloatingChat;