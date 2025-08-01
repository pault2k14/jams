import React, {useState} from "react";
import {Tooltip} from "reactstrap";


const FriendCard = ({user, userImage, mutualFriends, status, deleteButton, customSetSelectedFriend}) => {
    const [mutualFriendsTooltipOpen, setMutualFriendsTooltipOpen] = useState(false);
    const toggleMutualFriendsrTooltip = () => setMutualFriendsTooltipOpen(!mutualFriendsTooltipOpen);

    return <div style={{border: "1px solid grey"}} className={"flex-1"}>
                    <span onClick={() => customSetSelectedFriend({...user})}>
                        <img
                            height="207"
                            width="207"
                            style={{margin: 2}}
                            src={userImage}
                        />
                        <div style={{fontSize: "16px", color: "black", margin: 2}}>
                            {user.name}
                        </div>
                        <Tooltip
                            isOpen={mutualFriendsTooltipOpen}
                            target={"mutualFriends-" + user.userId}
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
                            <div id={"mutualFriends-" + user.userId} style={{fontSize: "12px", color: "gray", margin: 2}}>{mutualFriends.length + " mutual friends"}</div>
                        }
                    </span>
            <div>
                {status}
            </div>
            <div>
                {deleteButton}
            </div>
        </div>
}

export default FriendCard;