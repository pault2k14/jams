import {FaThumbsUp} from "react-icons/fa";
import React from "react";


const DisplayContentEngagement = ({modal, post, onClickViewMoreComments}) => {
    return <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: 5
    }}>
            <span>
                <FaThumbsUp
                    size="20"
                    style={{
                        backgroundColor: "#0d6efd",
                        color: "white",
                        borderRadius: 20,
                        padding: 4,
                        marginRight: 10}}
                />
                {post.likesUserIds.length > 0 && post.likesUserIds.length}
            </span>
        <span onClick={() => !modal && onClickViewMoreComments(post)}>
            {post.commentsPostIds.length > 0 && post.commentsPostIds.length + " comment(s)"}
        </span>
    </div>
}

export default DisplayContentEngagement;