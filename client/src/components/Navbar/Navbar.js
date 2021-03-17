import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { Button } from "../../globalStyles";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  NavIcon,
  MobileIcon,
  NavMenu,
  NavItem,
  NavItemBtn,
  NavLinks,
  NavBtnLink,
  NavText,
} from "./Navbar.style";

export default function Navbar(props) {
  const { user, getUser } = useContext(UserContext);
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    const fetchUser = async () => {
      const data = await getUser();
      console.log(`nav user ${JSON.stringify(user)} ${JSON.stringify(data)}`);
    };
    fetchUser();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <IconContext.Provider
        value={{ color: ({ admin }) => (admin ? "#fafafa" : "#4b4d63") }}
      >
        <Nav admin={props.admin}>
          <NavbarContainer>
            <NavLogo to="/" admin={props.admin} onClick={closeMobileMenu}>
              <NavIcon />
              REToken
            </NavLogo>
            <NavText admin={props.admin}>
              {user ? `Welcome ${user.name}` : `You are not registered`}
            </NavText>
            <MobileIcon onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </MobileIcon>
            <NavMenu onClick={handleClick} click={click}>
              <NavItem>
                <NavLinks to="/" admin={props.admin} onClick={closeMobileMenu}>
                  Home
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks
                  to="/marketplace"
                  admin={props.admin}
                  onClick={closeMobileMenu}
                >
                  Marketplace
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks
                  to="/addasset"
                  admin={props.admin}
                  onClick={closeMobileMenu}
                >
                  Add Asset
                </NavLinks>
              </NavItem>
              {(user ? user.role === "admin" : false) && (
                <NavItem>
                  <NavLinks
                    to="/admin"
                    admin={props.admin}
                    onClick={closeMobileMenu}
                  >
                    Admin
                  </NavLinks>
                </NavItem>
              )}
              <NavItemBtn>
                {button ? (
                  <NavBtnLink to="/myPortfolio">
                    <Button primary>My Portfolio</Button>
                  </NavBtnLink>
                ) : (
                  <NavBtnLink to="/myportfolio">
                    <Button onClick={closeMobileMenu} fontBig primary>
                      My Portfolio
                    </Button>
                  </NavBtnLink>
                )}
              </NavItemBtn>
            </NavMenu>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
}
