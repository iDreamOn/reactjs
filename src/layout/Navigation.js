import React from 'react';
import {Navbar, Nav, NavDropdown, MenuItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import * as routes from '../constants/routes';

const Navigation = () =>
    <NavigationAuth/>;

const NavigationAuth = () =>
    <Navbar inverse collapseOnSelect>
        <Navbar.Header>
            <Navbar.Brand>
                <Link to={routes.HOME}>CXP ENGINEERING ANALYTICS</Link>
            </Navbar.Brand>
            <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav pullRight>
                <NavDropdown eventKey={1} title="Models" id="basic-nav-dropdown">
                    <MenuItem eventKey={1.1}><Link to={routes.ACCEPTED_ANSWERS}>Accepted Answers</Link></MenuItem>
                </NavDropdown>
            </Nav>
        </Navbar.Collapse>
    </Navbar>;

export default Navigation;