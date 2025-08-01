import React, {useState} from "react";
import FriendMouseOver from "./FriendMouseOver";
import {Tooltip} from "reactstrap";


const FriendMiniCardHorizontal = ({currentUser, friend, userImage, mutualFriends, leftButton, rightButton,
                                      setSelectedFriend, displayMutualFriendsImages}) => {
    const [mutualFriendsTooltipOpen, setMutualFriendsTooltipOpen] = useState(false);
    const toggleMutualFriendsrTooltip = () => setMutualFriendsTooltipOpen(!mutualFriendsTooltipOpen);

    return <div className={"d-flex"}>
        <div style={{marginRight: 7}} className={"flex-1"} onClick={() => setSelectedFriend({...friend})}>
            <img
                height="60"
                width="60"
                style={{borderRadius: "50%"}}
                src={userImage}
            />
        </div>
        <div className={"flex-1"}>
            <div style={{ontSize: "16px"}} onClick={() => setSelectedFriend({...friend})}>{friend.name}</div>
            <div className={"d-flex"} style={{alignItems: "center"}}>
                {displayMutualFriendsImages &&
                    mutualFriends.map((mutualFriend, index) => {
                        if(index > 1) {
                            // Only include upto 8 mini profile pictures
                            return null
                        }
                        return <span style={{padding: 0, margin: 0}}>
                                <FriendMouseOver
                                    currentUser={currentUser}
                                    profileUser={currentUser}
                                    friend={mutualFriend}>
                                    <img
                                        style={{borderRadius: "50%"}}
                                        height={25}
                                        width={25}
                                        src={require("./data/images/" + mutualFriend.userId + "/user-image.jpg")}
                                    />
                                </FriendMouseOver>
                            </span>
                })}
                <Tooltip
                    isOpen={mutualFriendsTooltipOpen}
                    target={"mutualFriends-" + friend.userId}
                    toggle={toggleMutualFriendsrTooltip}
                >
                    {mutualFriends.map((friend, index) => {
                        if(index > 7) {
                            return null;
                        }

                        return <div>{friend.name}</div>
                    })
                    }
                </Tooltip>
                { mutualFriends.length > 0 &&
                    <span id={"mutualFriends-" + friend.userId} style={{ fontSize: "12px", color: "gray"}}
                          onClick={() => setSelectedFriend({...friend})}>
                        { displayMutualFriendsImages ?
                            <span style={{marginLeft: 7}}>
                                {mutualFriends.length + " mutual friends"}
                            </span>
                            : mutualFriends.length + " mutual friends"
                        }
                    </span>
                }
            </div>
            { leftButton || rightButton
                ?
                <div style={{marginTop: 5}} className={"d-flex"}>
                    { leftButton &&
                        <div style={{marginRight: 5}} className={"flex-1"}>
                            {leftButton}
                        </div>
                    }
                    { rightButton &&
                        <div className={"flex-1"}>
                            {rightButton}
                        </div>
                    }
                </div>
                : ''
            }
        </div>
    </div>

}

export default FriendMiniCardHorizontal;