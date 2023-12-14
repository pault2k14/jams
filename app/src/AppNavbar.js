import React, { useState } from 'react';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import { Link } from 'react-router-dom';
import {
    FaCalendar,
    FaEdit,
    FaHome,
    FaNewspaper,
    FaPeopleArrows,
    FaSignOutAlt,
    FaTrash,
    FaUserFriends
} from "react-icons/fa";
import {Fa42Group, FaMessage, FaPeopleGroup, FaPhotoFilm} from "react-icons/fa6";
import { Tooltip } from 'react-tooltip'

const AppNavbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <Navbar color="dark" dark expand="md">
            <NavbarBrand tag={Link} to="/">Socialiter</NavbarBrand>
            <Collapse isOpen={isOpen} navbar>
                <Nav className="justify-content-start" style={{width: "100%"}} navbar>
                    <NavItem>
                        <NavLink
                            data-tooltip-id="home-tooltip"
                            data-tooltip-content="Home"
                            data-tooltip-place="bottom"
                            tag={Link} to="/">
                            <Tooltip id="home-tooltip" />
                            <FaHome size="30"/>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            data-tooltip-id="feed-tooltip"
                            data-tooltip-content="Feed"
                            data-tooltip-place="bottom"
                            tag={Link} to="/">
                            <Tooltip id="feed-tooltip" />
                            <FaNewspaper size="30"/>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            data-tooltip-id="friends-tooltip"
                            data-tooltip-content="Friends"
                            data-tooltip-place="bottom"
                            tag={Link} to="/friends">
                            <Tooltip id="friends-tooltip" />
                            <FaUserFriends size="30" />
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            data-tooltip-id="groups-tooltip"
                            data-tooltip-content="Groups"
                            data-tooltip-place="bottom"
                            tag={Link} to="/">
                            <Tooltip id="groups-tooltip" />
                            <FaPeopleGroup opacity="33%" size="30" />
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink
                            data-tooltip-id="events-tooltip"
                            data-tooltip-content="Events"
                            data-tooltip-place="bottom"
                            tag={Link} to="/">
                            <Tooltip id="events-tooltip" />
                            <FaCalendar opacity="33%" size="30" />
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            data-tooltip-id="pictures-tooltip"
                            data-tooltip-content="Pictures"
                            data-tooltip-place="bottom"
                            tag={Link} to="/photos">
                            <Tooltip id="pictures-tooltip" />
                            <FaPhotoFilm size="30" />
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            data-tooltip-id="messages-tooltip"
                            data-tooltip-content="Messages"
                            data-tooltip-place="bottom"
                            tag={Link} to="/">
                            <Tooltip id="messages-tooltip" />
                            <FaMessage opacity="33%" size="30" />
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            data-tooltip-id="signout-tooltip"
                            data-tooltip-content="Sign Out"
                            data-tooltip-place="bottom"
                            tag={Link} to="/">
                            <Tooltip id="signout-tooltip" />
                            <FaSignOutAlt opacity="33%" size="30" />
                        </NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
            <NavbarToggler onClick={() => { setIsOpen(!isOpen) }}/>
            <Collapse isOpen={isOpen} navbar>
                <Nav className="justify-content-end" style={{width: "100%"}} navbar>
                    <NavItem>
                        <NavLink href="https://github.com/oktadev/okta-spring-boot-react-crud-example">GitHub</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    );
};

export default AppNavbar;