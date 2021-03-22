import React, { useState, useEffect, useContext } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { UserContext } from "../../context/UserContext";
import { AssetContext } from "../../context/AssetContext";
import { UserRegister } from "..";

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
  const { assets, assetDispatch } = useContext(AssetContext);
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [signUp, setSignUp] = useState(false);

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
  }, []);

  useEffect(() => {
    // Set user state if state is undefined
    const fetchUser = async () => await getUser();
    const getAssets = async () => await assetDispatch({ type: "GET_ASSETS" });

    if (!user) fetchUser();
    if (!assets) getAssets();
    console.log(
      user
        ? `navbar ${user.name} ${assets.length}`
        : `navbar user undefined  ${assets.length}`
    );
  }, [user]);

  const handleUserRegister = () => {
    setSignUp(true)
    if (!button) setClick(false);
  }

  const RenderRegisterButton = () => {
    if (button && user && user.name) {
      return (
        <NavBtnLink to="/account">
          <Button primary>
            Welcome {user.name}
          </Button>
        </NavBtnLink>
      );
    } else if (button && (!user || !user.name)) {
      return (
        <NavBtnLink to="/marketplace">
          <Button primary  onClick={handleUserRegister}>Sign Up</Button>
        </NavBtnLink>
      );
    } else if (!button && user && user.name) {
      return (
        <NavBtnLink to="/marketplace">
          <Button primary disabled>
            Sign Up
          </Button>
        </NavBtnLink>
      );
    } else {
      <NavBtnLink to="/marketplace">
        <Button primary>Sign Up</Button>
      </NavBtnLink>;
    }
  };

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
              {user && user.name
                ? ``
                : `You are not registered or login to wallet`}
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
      <UserRegister />
    </>
  );
}
