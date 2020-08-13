import React, {Component} from 'react'
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'


class NavBar extends Component{
  render(){
    const { logout } = this.props
    return(
      <div>
           <Navbar bg="light" expand="lg">
           <Link to="/home" style={{fontSize: "20px"}}>Weather Application</Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {/* Place code that will go on left side of navbar */}
            </Nav>
            <Link style={{paddingRight: '50px', fontSize: "20px"}} to="/home">Home</Link>
            {this.props.user ? null : <Link style={{paddingRight: '30px', fontSize: "20px"}} to="/login">Login</Link>}
            {this.props.user ? <Link style={{paddingRight: '30px', fontSize: "20px"}} to="/profile">Profile</Link> : null}
            {this.props.user ? <Link style={{paddingRight: '30px', fontSize: "20px"}} to="/home" onClick={this.props.logout}>Logout</Link> : null}
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

export default NavBar

   {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
    </NavDropdown> */}