import React from "react";

const Footer = () => {
    return (
        <footer style={{backgroundColor: "#1b1c1c", color: "white"}}>
            <p>&copy; {new Date().getFullYear()} Paul Thompson.</p>
        </footer>
    );
}

export default Footer;