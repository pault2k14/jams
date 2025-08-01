import {Image} from "react-bootstrap";
import React from "react";

const FriendListHeader = ({title, subTitle, setShowMenuSection}) => {
    return  <div className={"row"}>
        <span style={{alignContent: "center"}}
              className={"col-2"}>
            <Image
                onClick={() => setShowMenuSection(false)}
                width={35}
                height={35}
                src={require("./data/images/FriendsBackArrow.png")}
            />
        </span>
        <span style={{padding: 0, margin: 0}}
              className={"col-10"}>
            <div>
                Friends
            </div>
            <div>
                <span style={{
                    fontSize: "28px",
                    fontWeight: "bold"}}>
                    {title}
                </span>
            </div>
        </span>
        <div>
            <span style={{
                fontSize: "24px",
                fontWeight: "bold"}}>
                {subTitle}
            </span>
        </div>
    </div>
}

export default FriendListHeader;