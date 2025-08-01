import React, {useEffect, useState} from "react";
import Popup from "reactjs-popup";
import {FaEdit, FaTrash} from "react-icons/fa";

const ChatMessageMouseOver = ({currentUser, userToChatWith, direction, message, updateChatMessageByUserIds,
                                  deleteChatMessageByUserIds, children}) => {
    const [popoverOpen, setPopoverOpen] = useState(false);

    return <div onMouseEnter={() => setPopoverOpen(true)} onMouseLeave={() => setPopoverOpen(false)}>
        {<Popup
            trigger={(
                children
            )}
            on={['hover', 'focus']}
            position={direction}
            closeOnDocumentClick>
            {currentUser.userId === message.userId
                ? <div style={{backgroundColor: "white", padding: 5}}>
                    <FaEdit
                        style={{ margin: 5}}
                        onClick={() => updateChatMessageByUserIds()}
                    />
                    <FaTrash
                        style={{ margin: 5}}
                        onClick={() => deleteChatMessageByUserIds(currentUser, userToChatWith, message)}
                    />
                </div>
                : null
            }
        </Popup>}
    </div>
}

export default ChatMessageMouseOver;