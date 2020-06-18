import React from "react";
import Link from "gatsby-link";
import {FaAlignJustify} from 'react-icons/fa'

const Navbar = class extends React.Component {

  componentDidMount(){
    function classToggle() {
      const navs = document.querySelectorAll('.Navbar__Items')
      
      navs.forEach(nav => nav.classList.toggle('Navbar__ToggleShow'));
    }
    document.querySelector('.Navbar__Link-toggle')
    .addEventListener('click', classToggle);
  }

 render() {
   return (
  <div className="Navbar fixed-top">
    <div className="Navbar__Link Navbar__Link-brand">
      <Link className="navbar-brand" to="/"  activeStyle={{ color: "black" }} title="nabalisa">
          Nabalisa Foundation
      </Link>
    </div>
    <div
      className={`Navbar__Link Navbar__Link-toggle`} 
    >
      <FaAlignJustify  />
    </div>
    <nav
      role="navigation"
      id="navigation-primary"
      className={`navigatio-primary Navbar__Items Navbar__Items--right `}
    >
      <div className="Navbar__Link">
        <Link className="nav-link navigation__navlinks"  onClick={this.closeNavbar}  activeStyle={{ color: "black" }}  to="/about">
          ABOUT US
        </Link>
      </div>
      <div className="Navbar__Link">
        <Link className="nav-link navigation__navlinks"  onClick={this.closeNavbar}  activeStyle={{ color: "black" }} to="/contact">
          CONTACT
        </Link>
      </div>
      <div className="Navbar__Link">
        <Link className="nav-link navigation__navlinks"  onClick={this.closeNavbar} activeStyle={{ color: "black" }} to="/products">
          PORTFOLIO
        </Link>
      </div>
      <div className="Navbar__Link">
        <Link className="nav-link navigation__navlinks"  onClick={this.closeNavbar} activeStyle={{ color: "black" }} to="/blog">
          BLOGS
        </Link>
      </div>
      {/* <div className="Navbar__Link">
        <Link className="nav-link navigation__navlinks"  onClick={this.closeNavbar}  activeStyle={{ color: "black" }}  to="/contact/examples">
          Form Examples
        </Link>
      </div> */}
    </nav>
  </div>
  )}
}

export default Navbar
