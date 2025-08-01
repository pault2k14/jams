import React from "react";

const TimelineHeaderImage = ({profileUser}) => {
    let backgroundImage = require("./data/images/" + profileUser.userId + "/profile-header.jpg");

    return <div
        style={{ objectFit: "cover" }}>
        <img width={"100%"}
             height={"100%"}
             src={backgroundImage}
        />
    </div>
}

export default TimelineHeaderImage;